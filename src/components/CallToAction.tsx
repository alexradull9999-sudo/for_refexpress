import { ClipboardCheck } from "lucide-react";

export default function CallToAction() {
  const handleScrollToQuiz = () => {
    const element = document.getElementById("quiz");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-brand-blue py-20 text-white relative overflow-hidden">
      {/* Visual glowing overlay for premium finish */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        {/* Decorative Badge */}
        <div className="w-16 h-16 bg-white/5 border border-white/15 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-orange">
          <ClipboardCheck className="w-8 h-8" />
        </div>

        {/* H2 Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight uppercase leading-tight mb-4">
          Не уверены, какой контейнер вам <span className="text-brand-orange">лучше подойдет?</span>
        </h2>

        {/* Paragraph Description */}
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 font-sans">
          Пройдите быстрый интерактивный тест за 1 минуту. Наш специалист сделает точный расчет стоимости и пришлет персональный каталог с реальными фото.
        </p>

        {/* Large CTA Button */}
        <button
          onClick={handleScrollToQuiz}
          className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-extrabold uppercase text-sm md:text-base rounded-md shadow-xl hover:shadow-brand-orange/30 transform hover:-translate-y-0.5 active:translate-y-0 transition cursor-pointer select-none"
        >
          <span>Подобрать контейнер и получить каталог →</span>
        </button>

        {/* Supporting proof sub-label */}
        <p className="text-xs text-gray-400 mt-4 italic">
          * Цены действительны на сегодня. Вы ничего не оплачиваете — квиз бесплатный и ни к чему не обязывает.
        </p>
      </div>
    </section>
  );
}
