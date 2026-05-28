import { COMPANIES_STATIC } from "../data";

export default function SocialProof() {
  return (
    <section className="bg-brand-blue-hover border-y border-white/5 py-6 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Label */}
          <div className="text-center lg:text-left shrink-0">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-orange">
              Нам доверяют лидеры отраслей
            </h4>
            <p className="text-[11.5px] text-gray-400 mt-0.5">
              Поставляем оборудование для крупнейших корпораций РФ и СНГ
            </p>
          </div>

          {/* Logos Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
            {COMPANIES_STATIC.map((name) => (
              <div 
                key={name}
                className="font-display font-extrabold text-sm sm:text-base text-gray-300 hover:text-white transition-all tracking-tight select-none flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded border border-white/10"
              >
                <span className="text-brand-orange text-xs">◆</span>
                <span>{name}</span>
              </div>
            ))}
          </div>

          {/* Secondary badge count */}
          <div className="shrink-0 text-center lg:text-right bg-white/5 border border-white/10 px-3 py-1.5 rounded">
            <span className="text-xs font-semibold text-gray-200">
              и ещё <strong className="text-brand-orange font-bold font-mono">1 200+</strong> клиентов по всей России
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
