import { WORK_PROCESS_STEPS } from "../data";
import { ArrowRight } from "lucide-react";

export default function HowWeWork() {
  const handleScrollToQuiz = () => {
    const element = document.getElementById("quiz");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-white text-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange font-display font-extrabold text-xs uppercase tracking-wider rounded-md mb-3">
            Этапы сотрудничества
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight uppercase leading-tight text-brand-blue">
            Получить контейнер — <span className="text-brand-orange">просто</span>
          </h2>
          <div className="w-12 h-1 bg-brand-orange mx-auto mt-4 rounded" />
          <p className="text-brand-grey max-w-xl mx-auto text-sm md:text-base mt-4">
            Процесс оформления сделки прозрачен на каждом этапе: от первого клика до прибытия контейнера на терминал назначения.
          </p>
        </div>

        {/* Steps Layout */}
        <div className="relative mt-8">
          {/* Subtle horizontal connecting line structure for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-0.5 bg-gray-200 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {WORK_PROCESS_STEPS.map((step, index) => (
              <div 
                key={step.step}
                className="flex flex-col items-center text-center p-6 bg-brand-light rounded-xl border border-gray-100 hover:border-brand-orange/30 transition-all duration-300"
              >
                {/* Step number badge */}
                <div className="w-16 h-16 rounded-full bg-brand-blue text-white flex items-center justify-center font-display font-extrabold text-xl md:text-2xl shadow-md border-4 border-white mb-6 group-hover:bg-brand-orange transition-all relative">
                  <span className="relative z-10">{step.step}</span>
                  {/* Small absolute bullet indicator */}
                  <div className="absolute inset-0 bg-brand-orange rounded-full opacity-0 hover:opacity-100 transition duration-300 transform scale-105" />
                </div>

                {/* Step Title */}
                <h3 className="font-display font-semibold text-brand-blue text-base md:text-lg mb-2">
                  {step.title}
                </h3>

                {/* Step Subtitle */}
                <p className="text-brand-grey text-xs md:text-sm max-w-[200px]">
                  {step.subtitle}
                </p>

                {/* Mobile/Tablet Helper Connecting Arrow */}
                {index < WORK_PROCESS_STEPS.length - 1 && (
                  <div className="lg:hidden mt-4 text-brand-orange opacity-40">
                    <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button underneath */}
        <div className="text-center mt-12">
          <button
            onClick={handleScrollToQuiz}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-orange hover:text-brand-blue text-white font-display font-bold text-xs uppercase tracking-wider rounded-md shadow-md transition duration-300 cursor-pointer select-none"
          >
            <span>Начать подбор контейнера</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
