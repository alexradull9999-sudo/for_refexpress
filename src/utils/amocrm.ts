import { QUIZ_QUESTIONS } from "../data";

export interface AmoLeadData {
  name: string;
  phone: string;
  email?: string;
  contactMethod?: string;
  answers?: Record<string, string>;
  utm?: Record<string, string>;
  additionalNote?: string;
}

const AMO_FORM_ID = "1738822";
const AMO_FORM_HASH = "969aa3bef6e04f014b60e571318e2b69";
const AMO_SUBMIT_URL = "https://forms.amocrm.ru/queue/add";

/**
 * Helper to convert quiz option ID to a readable human label
 */
function getAnswerReadableText(questionId: string, optionId: string): string {
  const q = QUIZ_QUESTIONS.find((item) => item.id === questionId);
  if (!q) return optionId;
  const opt = q.options.find((o) => o.id === optionId);
  return opt ? opt.label : optionId;
}

/**
 * Format the lead details into a readable note for amoCRM manager
 */
export function formatAmoNote(data: AmoLeadData): string {
  const lines: string[] = [];

  lines.push("📋 ДАННЫЕ ЗАЯВКИ С САЙТА (Квиз-калькулятор)");
  lines.push(`👤 Имя: ${data.name || "Не указано"}`);
  lines.push(`📞 Телефон: ${data.phone || "Не указан"}`);

  if (data.email) {
    lines.push(`✉️ Email: ${data.email}`);
  }

  if (data.contactMethod) {
    lines.push(`💬 Предпочтительный способ связи: ${data.contactMethod}`);
  }

  if (data.answers && Object.keys(data.answers).length > 0) {
    lines.push("\n🎯 Ответы на вопросы опроса:");
    for (const [qId, optId] of Object.entries(data.answers)) {
      const q = QUIZ_QUESTIONS.find((item) => item.id === qId);
      const qTitle = q ? q.stepName || q.question : qId;
      const aText = getAnswerReadableText(qId, optId);
      lines.push(` • ${qTitle}: ${aText}`);
    }
  }

  if (data.additionalNote) {
    lines.push(`\n📝 Дополнительно: ${data.additionalNote}`);
  }

  if (data.utm && Object.keys(data.utm).some((k) => !!data.utm?.[k])) {
    lines.push("\n🌐 UTM-метки:");
    if (data.utm.utm_source) lines.push(` • utm_source: ${data.utm.utm_source}`);
    if (data.utm.utm_medium) lines.push(` • utm_medium: ${data.utm.utm_medium}`);
    if (data.utm.utm_campaign) lines.push(` • utm_campaign: ${data.utm.utm_campaign}`);
  }

  lines.push(`\n🕒 Время отправки: ${new Date().toLocaleString("ru-RU")}`);

  return lines.join("\n");
}

/**
 * Submits lead data to amoCRM.
 * First calls the server-side proxy (/api/lead) which guarantees CORS-free,
 * adblock-safe delivery directly to amoCRM queue/add.
 */
export async function submitToAmoCrm(data: AmoLeadData): Promise<boolean> {
  const noteText = formatAmoNote(data);

  console.log("%c🚀 [amoCRM] Отправка заявки...", "color: #007AD0; font-weight: bold;", {
    name: data.name,
    phone: data.phone,
    method: data.contactMethod
  });

  // 1. Primary method: Server-side route /api/lead
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        contactMethod: data.contactMethod,
        answers: data.answers,
        utm: data.utm,
        note: noteText
      })
    });

    if (res.ok) {
      const responseData = await res.json();
      console.log("%c✅ [amoCRM] Заявка успешно принята сервером и отправлена в amoCRM!", "color: #10B981; font-weight: bold;", responseData);
      return true;
    } else {
      console.warn("[amoCRM] Сервер вернул код:", res.status);
    }
  } catch (apiErr) {
    console.warn("[amoCRM] Ошибка при обращении к /api/lead, используем прямой шлюз:", apiErr);
  }

  // 2. Fallback method: Direct POST via FormData
  try {
    const formData = new FormData();
    formData.append("form_id", AMO_FORM_ID);
    formData.append("hash", AMO_FORM_HASH);
    formData.append("fields[name_1]", data.name.trim());
    formData.append("fields[80355_1][121429]", data.phone.trim());
    formData.append("fields[note_2]", noteText);

    const originInfo = {
      datetime: new Date().toISOString(),
      referer: typeof document !== "undefined" ? document.referrer || window.location.href : "",
      location: typeof window !== "undefined" ? window.location.href : "",
      ...(data.utm || {})
    };
    formData.append("user_origin", JSON.stringify(originInfo));

    await fetch(AMO_SUBMIT_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors"
    });
    return true;
  } catch (directErr) {
    console.warn("[amoCRM] Прямой fetch не удался:", directErr);
  }

  return false;
}
