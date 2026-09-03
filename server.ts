import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const AMO_FORM_ID = "1738822";
const AMO_FORM_HASH = "969aa3bef6e04f014b60e571318e2b69";
const AMO_SUBMIT_URL = "https://forms.amocrm.ru/queue/add";

interface SubmissionLogItem {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  note: string;
  status: "success" | "error";
  amoResponse: any;
}

const submissionHistory: SubmissionLogItem[] = [];

/**
 * Normalizes phone numbers to standard E.164 (+79213937705)
 */
function normalizePhone(rawPhone: string): string {
  if (!rawPhone) return "";
  const cleaned = rawPhone.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+")) {
    return cleaned;
  }
  if (cleaned.startsWith("8") && cleaned.length === 11) {
    return "+7" + cleaned.slice(1);
  }
  if (cleaned.startsWith("7") && cleaned.length === 11) {
    return "+" + cleaned;
  }
  if (cleaned.length === 10) {
    return "+7" + cleaned;
  }
  return cleaned.startsWith("+") ? cleaned : "+" + cleaned;
}

/**
 * Sends lead to amoCRM queue/add endpoint
 */
async function sendLeadToAmoCrm(params: {
  name: string;
  phone: string;
  note: string;
  userOrigin?: any;
}) {
  const normalizedPhone = normalizePhone(params.phone);
  
  const formData = new FormData();
  formData.append("form_id", AMO_FORM_ID);
  formData.append("hash", AMO_FORM_HASH);
  formData.append("fields[name_1]", params.name.trim());
  formData.append("fields[80355_1][121429]", normalizedPhone);
  formData.append("fields[note_2]", params.note);

  const origin = params.userOrigin || {
    datetime: new Date().toISOString(),
    referer: "https://refexpress.ru",
    location: "https://refexpress.ru"
  };
  formData.append("user_origin", JSON.stringify(origin));

  console.log(`[amoCRM Server] Отправка заявки: ${params.name} (${normalizedPhone})`);

  const response = await fetch(AMO_SUBMIT_URL, {
    method: "POST",
    body: formData,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Referer": "https://forms.amocrm.ru/forms/html/form_1738822_969aa3bef6e04f014b60e571318e2b69.html"
    }
  });

  const responseText = await response.text();
  let parsed: any = null;
  try {
    parsed = JSON.parse(responseText);
  } catch {
    parsed = { raw: responseText };
  }

  const isSuccess = response.ok && parsed && parsed.error_code === 0;

  const logItem: SubmissionLogItem = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }),
    name: params.name,
    phone: normalizedPhone,
    note: params.note,
    status: isSuccess ? "success" : "error",
    amoResponse: parsed
  };

  submissionHistory.unshift(logItem);
  if (submissionHistory.length > 50) submissionHistory.pop();

  return { isSuccess, responseText, parsed, logItem };
}

// 1. Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 2. Submission log check
app.get("/api/submissions", (_req, res) => {
  res.json({
    total: submissionHistory.length,
    items: submissionHistory
  });
});

// 3. Lead submission endpoint (receives user form from React app)
app.post("/api/lead", async (req, res) => {
  try {
    const { name, phone, email, contactMethod, answers, utm, note } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: "Имя и номер телефона обязательны для заполнения"
      });
    }

    // Build comprehensive manager note
    const lines: string[] = [];
    lines.push("📋 ЗАЯВКА С САЙТА (Квиз-калькулятор контейнеров)");
    lines.push(`👤 Имя: ${name}`);
    lines.push(`📞 Телефон: ${normalizePhone(phone)}`);
    if (email) lines.push(`✉️ Email: ${email}`);
    if (contactMethod) lines.push(`💬 Предпочтительный канал связи: ${contactMethod}`);

    if (answers && typeof answers === "object" && Object.keys(answers).length > 0) {
      lines.push("\n🎯 Ответы пользователя в квизе:");
      const questionLabels: Record<string, string> = {
        type: "Тип контейнера",
        size: "Размер контейнера",
        condition: "Формат приобретения",
        timeline: "Планируемые сроки"
      };

      for (const [k, v] of Object.entries(answers)) {
        const qTitle = questionLabels[k] || k;
        lines.push(` • ${qTitle}: ${v}`);
      }
    }

    if (note) {
      lines.push(`\n📝 Комментарий: ${note}`);
    }

    if (utm && typeof utm === "object") {
      const utmLines = Object.entries(utm)
        .filter(([_, v]) => Boolean(v))
        .map(([k, v]) => ` • ${k}: ${v}`);
      if (utmLines.length > 0) {
        lines.push("\n🌐 UTM-метки:");
        lines.push(...utmLines);
      }
    }

    lines.push(`\n🕒 Время отправки (МСК): ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`);

    const fullNote = lines.join("\n");

    const result = await sendLeadToAmoCrm({
      name,
      phone,
      note: fullNote,
      userOrigin: {
        datetime: new Date().toISOString(),
        referer: req.headers.referer || "https://refexpress.ru",
        location: req.headers.referer || "https://refexpress.ru",
        ...(utm || {})
      }
    });

    if (result.isSuccess) {
      console.log(`[amoCRM Server] ✅ Заявка успешно передана в amoCRM! ID: ${result.logItem.id}`);
      return res.json({
        success: true,
        message: "Заявка успешно зарегистрирована в amoCRM",
        leadId: result.logItem.id,
        crmResponse: result.parsed
      });
    } else {
      console.warn(`[amoCRM Server] ⚠️ amoCRM ответил с ошибкой:`, result.responseText);
      return res.status(502).json({
        success: false,
        error: "amoCRM вернул ошибку при приеме заявки",
        details: result.parsed
      });
    }
  } catch (error: any) {
    console.error("[amoCRM Server] Внутренняя ошибка при отправке заявки:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Ошибка сервера"
    });
  }
});

// 4. Test Lead Trigger endpoint for fast diagnostics
app.post("/api/test-lead", async (req, res) => {
  try {
    const testName = req.body?.name || "ТЕСТОВАЯ ЗАЯВКА (Контейнеры Сайт)";
    const testPhone = req.body?.phone || "+79213937705";
    const testNote = `🧪 ТЕСТОВАЯ ЗАЯВКА ДЛЯ ПРОВЕРКИ ИНТЕГРАЦИИ amoCRM\n👤 Имя: ${testName}\n📞 Телефон: ${testPhone}\n💬 Канал: WhatsApp\n📦 Выбран контейнер: 40 футов High Cube (Новый)\n⏱ Сроки: Срочно (1-2 недели)\n🕒 Отправлено в: ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`;

    const result = await sendLeadToAmoCrm({
      name: testName,
      phone: testPhone,
      note: testNote
    });

    res.json({
      success: result.isSuccess,
      message: result.isSuccess ? "Тестовая заявка отправлена в amoCRM" : "Ошибка отправки",
      result: result.parsed,
      log: result.logItem
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Сервер запущен на http://0.0.0.0:${PORT}`);
  });
}

startServer();
