import { useState, useEffect } from "react";
import { ListCollapse, ClipboardCheck } from "lucide-react";

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show ONLY if user has scrolled down past the Hero section (e.g. 500px)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToQuiz = () => {
    const element = document.getElementById("quiz");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-brand-blue/95 backdrop-blur-md border-t border-white/10 p-3 sm:p-4 lg:hidden shadow-[0_-5px_15px_rgba(0,0,0,0.15)] flex justify-between items-center gap-3 animate-fade-in">
      <div className="flex-1">
        <button
          onClick={handleScrollToQuiz}
          className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-3 px-4 rounded-md font-display font-extrabold text-xs sm:text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer select-none"
        >
          <ClipboardCheck className="w-4 h-4 shrink-0" />
          <span>Пройти квиз — Получить каталог</span>
        </button>
      </div>
    </div>
  );
}
