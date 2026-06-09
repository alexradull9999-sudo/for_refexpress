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
            ООО «Р.Э.С.» • Доставка контейнеров с 2012 г.
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
            {/* Telegram */}
            <a
              href="https://t.me/Refexpress25_bot"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSocialClick}
              className="w-8 h-8 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
              title="Написать в Telegram"
            >
              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                <path d="M24 2.22c-.15.93-4.57 19.34-5.32 22.38-.11.45-.44.75-.89.79-.05.01-.1.01-.15.01-.4 0-.77-.19-1-.53l-6.28-5.34-3.13 2.91c-.24.23-.57.35-.91.32-.4-.03-.74-.29-.87-.67L2.1 12.39c-.58-.19-.94-.74-.86-1.35.08-.6 1-.95 1.55-1.15L22.62.06c.64-.23 1.34.02 1.54.67.09.28.09.58.01.86l-.17.63zm-4.3 2.11L3.92 11.23l2.84 1.83 11.33-7.2c.11-.07.24-.03.3.08.06.11.02.24-.08.31L7.54 13.91l6.19 3.99 3.65-13.31c.01-.06.01-.12 0-.17-.03-.1-.1-.13-.15-.13-.05 0-.09.01-.13.03z" stroke="none" />
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
