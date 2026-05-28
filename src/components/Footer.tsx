import React, { useState } from "react";
import { Mail, MapPin, Phone, Shield, X } from "lucide-react";
import { trackGoal } from "../utils/analytics";
import Logo from "./Logo";

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handlePhoneClick = () => {
    trackGoal("phone_click");
  };

  const handleSocialClick = () => {
    trackGoal("whatsapp_click");
  };

  return (
    <footer className="bg-brand-blue-hover text-gray-400 py-12 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          {/* Brand/Logo Area */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-block mb-3">
                <Logo size="lg" />
              </div>
              <p className="text-xs text-gray-400 max-w-sm mb-4 leading-relaxed font-sans">
                Продажа, аренда и обслуживание рефрижераторных и универсальных сухогрузных контейнеров 20 и 40 футов. Прямые поставки от производителей с 2012 года.
              </p>
            </div>
            
            <div className="text-xs text-brand-grey font-mono leading-none">
              Юридическое лицо: ООО «Р.Э.С.»<br />
              ИНН: 7810398453 • КПП: 781001001 • ОГРН: 1157847425129
            </div>
          </div>

          {/* Contacts info Grid block */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-white">
              Контактные данные
            </h4>
            
            <div className="space-y-3 text-sm">
              <a
                href="tel:+78124253674"
                onClick={handlePhoneClick}
                className="flex items-center gap-2.5 hover:text-white transition duration-200"
              >
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="font-mono font-bold text-white">+7 (812) 425-36-74</span>
              </a>

              <a
                href="mailto:sales@refexpress.ru"
                className="flex items-center gap-2.5 hover:text-white transition duration-200"
              >
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="font-mono text-gray-300">sales@refexpress.ru</span>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed text-gray-300">
                  Санкт-Петербург, ул. Новорощинская, д.4, бизнес-центр «Ренессанс», офис 1114-2
                </span>
              </div>
            </div>
          </div>

          {/* Instant messengers & Social badges */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-white">
              Мессенджеры
            </h4>
            
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/79500022306"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSocialClick}
                className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-all hover:scale-110"
                title="WhatsApp"
              >
                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.019-5.101-2.871-6.956C16.611 1.93 14.14 .912 11.52.912 6.082.912 1.655 5.337 1.652 10.781c-.001 1.745.469 3.447 1.359 4.951l-1.02 3.722 3.817-.999zM18.17 14.9c-.334-.167-1.977-.975-2.28-1.085-.303-.11-.524-.167-.745.167-.221.332-.857 1.085-1.05 1.306-.192.221-.385.247-.719.08-1.536-.77-2.527-1.282-3.535-3.003-.266-.452.266-.42.76-1.416.08-.167.04-.313-.02-.48-.06-.167-.524-1.262-.719-1.728-.19-.456-.385-.393-.524-.4l-.448-.006c-.156 0-.41.058-.624.293-.215.234-.818.8-.818 1.95 0 1.15.836 2.262.95 2.417.114.156 1.644 2.512 4.022 3.486.565.233 1.008.371 1.353.481.568.181 1.085.155 1.493.094.455-.068 1.48-.605 1.688-1.162.208-.557.208-1.034.146-1.14-.06-.104-.22-.167-.556-.334z" stroke="none" />
                </svg>
              </a>
              <a
                href="https://t.me/Refexpress25_bot"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSocialClick}
                className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center transition-all hover:scale-110"
                title="Telegram"
              >
                <svg className="w-4.5 h-4.5 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M24 2.22c-.15.93-4.57 19.34-5.32 22.38-.11.45-.44.75-.89.79-.05.01-.1.01-.15.01-.4 0-.77-.19-1-.53l-6.28-5.34-3.13 2.91c-.24.23-.57.35-.91.32-.4-.03-.74-.29-.87-.67L2.1 12.39c-.58-.19-.94-.74-.86-1.35.08-.6 1-.95 1.55-1.15L22.62.06c.64-.23 1.34.02 1.54.67.09.28.09.58.01.86l-.17.63zm-4.3 2.11L3.92 11.23l2.84 1.83 11.33-7.2c.11-.07.24-.03.3.08.06.11.02.24-.08.31L7.54 13.91l6.19 3.99 3.65-13.31c.01-.06.01-.12 0-.17-.03-.1-.1-.13-.15-.13-.05 0-.09.01-.13.03z" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Separator and Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            © 2012–2026 ООО «Р.Э.С.». Все права защищены. Сайт является собственностью компании.
          </p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-white underline cursor-pointer select-none text-[11px] flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-brand-orange" />
              <span>Политика конфиденциальности</span>
            </button>
          </div>
        </div>
      </div>

      {/* PRIVACY POLICY IN-APP OVERLAY MODAL */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white text-brand-dark rounded-xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative select-text">
            
            {/* Header */}
            <div className="px-6 py-4.5 border-b border-gray-100 flex items-center justify-between bg-brand-light">
              <div className="flex items-center gap-2 font-display font-extrabold text-brand-blue uppercase text-xs md:text-sm">
                <span>Политика конфиденциальности</span>
              </div>
              <button 
                onClick={() => setIsPrivacyOpen(false)}
                className="p-1 rounded-full text-brand-grey hover:bg-gray-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable contents */}
            <div className="px-6 py-6 overflow-y-auto space-y-4 text-xs md:text-sm text-brand-grey leading-relaxed">
              <h4 className="font-display font-bold text-brand-blue mb-1">
                1. Сбор и обработка персональных данных
              </h4>
              <p>
                Компания ООО «Р.Э.С.» (РефЭкспресс) собирает только минимально необходимые данные для отправки информационных и рекламных каталогов, расчетов доставки по вашему запросу: Имя, Номер Телефона, E-mail и выбранный способ отправки (мессенджеры).
              </p>

              <h4 className="font-display font-bold text-brand-blue mb-1">
                2. Защита и хранение персональных данных
              </h4>
              <p>
                Мы гарантируем, что персональные данные не передаются третьим лицам за исключением случаев, предусмотренных законодательством РФ. Данные шифруются и передаются в закрытые системы CRM для обработки менеджерами Refexpress.
              </p>

              <h4 className="font-display font-bold text-brand-blue mb-1">
                3. Согласие на обработку данных
              </h4>
              <p>
                Оставляя заявку на настоящем ресурсе или отвечая на вопросы интерактивного квиза, вы подтверждаете свое добровольное согласие на обработку персональных данных. Вы можете отозвать согласие в любое время, обратившись на наш адрес электронной почты: sales@refexpress.ru.
              </p>

              <h4 className="font-display font-bold text-brand-blue mb-1">
                4. Использование файлов Cookies и UTM меток
              </h4>
              <p>
                Наш сайт сохраняет временные файлы Cookie и маркетинговые UTM-метки Яндекс Директ для улучшения пользовательского опыта, отслеживания целей в Яндекс.Метрике и контроля эффективности работы операторов.
              </p>
            </div>

            {/* Footer buttons screen */}
            <div className="px-6 py-4.5 border-t border-gray-100 flex justify-end bg-brand-light">
              <button
                onClick={() => setIsPrivacyOpen(false)}
                className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold font-display uppercase tracking-wider rounded-md transition cursor-pointer"
              >
                Закрыть окно
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
