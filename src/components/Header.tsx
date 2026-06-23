import { trackGoal } from "../utils/analytics";
import { MessageSquare, Phone } from "lucide-react";
import Logo from "./Logo";

export default function Header() {
  const handleScrollToQuiz = () => {
    const element = document.getElementById("quiz");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePhoneClick = () => {
    trackGoal("phone_click");
  };

  const handleSocialClick = () => {
    trackGoal("whatsapp_click");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md text-brand-dark shadow-sm border-b border-gray-100">
      {/* Top desktop utility bar */}
      <div className="bg-brand-blue-hover text-white/90 text-[11px] font-sans py-1.5 px-4 hidden md:block border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 animate-pulse" />
            <span>Санкт-Петербург, ул. Новорощинская, д.4, бизнес-центр «Собрание», офис 1114-2</span>
          </div>
          <div>
            <span>Время работы: Пн–Пт с 9:00 до 18:00</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3.5 md:py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex flex-col py-1 pl-1 md:pl-2.5">
          <Logo size="md" className="mb-0.5" />
          <span className="text-[9px] md:text-[10px] text-brand-grey font-sans tracking-wide mt-1 uppercase font-semibold">
            ООО «Р.Э.С.» • Поставка контейнеров с 2012 г.
          </span>
        </div>

        {/* MIDDLE SECTION - CONTACT INFO */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex flex-col text-right">
            <a
              href="tel:+78124253674"
              onClick={handlePhoneClick}
              className="text-brand-blue hover:text-brand-orange font-bold font-mono text-sm md:text-base transition-colors flex items-center gap-1 justify-end"
            >
              <Phone className="w-3.5 h-3.5 text-brand-orange" />
              +7 (812) 425-36-74
            </a>
            <span className="text-[10px] text-brand-grey font-medium">
              БЦ «Собрание» • пн-пт с 9:00 до 18:00
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Telegram Bot */}
            <a
              href="https://t.me/Refexpress25_bot"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSocialClick}
              className="w-8 h-8 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 text-white"
              title="Написать в Telegram бот"
            >
              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                <path d="M24 2.22c-.15.93-4.57 19.34-5.32 22.38-.11.45-.44.75-.89.79-.05.01-.1.01-.15.01-.4 0-.77-.19-1-.53l-6.28-5.34-3.13 2.91c-.24.23-.57.35-.91.32-.4-.03-.74-.29-.87-.67L2.1 12.39c-.58-.19-.94-.74-.86-1.35.08-.6 1-.95 1.55-1.15L22.62.06c.64-.23 1.34.02 1.54.67.09.28.09.58.01.86l-.17.63zm-4.3 2.11L3.92 11.23l2.84 1.83 11.33-7.2c.11-.07.24-.03.3.08.06.11.02.24-.08.31L7.54 13.91l6.19 3.99 3.65-13.31c.01-.06.01-.12 0-.17-.03-.1-.1-.13-.15-.13-.05 0-.09.01-.13.03z" stroke="none" />
              </svg>
            </a>

            {/* WhatsApp (Макс) */}
            <a
              href="https://wa.me/79500022306"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSocialClick}
              className="w-8 h-8 rounded-full bg-[#25d366] hover:bg-[#22c35e] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 text-white shrink-0"
              title="Написать Максу в WhatsApp"
            >
              <svg className="w-4.5 h-4.5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.019-5.101-2.871-6.956C16.611 1.93 14.14 .912 11.52.912 6.082.912 1.655 5.337 1.652 10.781c-.001 1.745.469 3.447 1.359 4.951l-1.02 3.722 3.817-.999zM18.17 14.9c-.334-.167-1.977-.975-2.28-1.085-.303-.11-.524-.167-.745.167-.221.332-.857 1.085-1.05 1.306-.192.221-.385.247-.719.08-1.536-.77-2.527-1.282-3.535-3.003-.266-.452.266-.42.76-1.416.08-.167.04-.313-.02-.48-.06-.167-.524-1.262-.719-1.728-.19-.456-.385-.393-.524-.4l-.448-.006c-.156 0-.41.058-.624.293-.215.234-.818.8-.818 1.95 0 1.15.836 2.262.95 2.417.114.156 1.644 2.512 4.022 3.486.565.233 1.008.371 1.353.481.568.181 1.085.155 1.493.094.455-.068 1.48-.605 1.688-1.162.208-.557.208-1.034.146-1.14-.06-.104-.22-.167-.556-.334z" stroke="none" />
              </svg>
            </a>

            {/* eXpress (Макс) */}
            <a
              href="https://express.ms"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSocialClick}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#24A1DE] to-[#8E24C2] hover:brightness-110 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 text-white shrink-0 shadow-sm"
              title="Написать в мессенджер МАКС"
            >
              <svg className="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 3c-4.97 0-9 4.03-9 9 0 1.78.51 3.44 1.4 4.85l-1.24 3.72a.5.5 0 00.63.63l3.72-1.24A8.95 8.95 0 0012 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 13.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
              </svg>
            </a>
          </div>
        </div>

        {/* CTA BUTTON */}
        <div className="flex items-center">
          <button
            onClick={handleScrollToQuiz}
            className="hidden md:inline-block bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold text-xs uppercase px-4.5 py-2.5 rounded-md shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none"
          >
            Получить каталог
          </button>
          
          <a
            href="tel:+78124253674"
            className="sm:hidden w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white"
            onClick={handlePhoneClick}
            title="Позвонить нам"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
