import { GUARANTEES_ITEMS } from "../data";
import { ShieldCheck, Image, ClipboardCheck } from "lucide-react";

export default function Guarantees() {
  const selectIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-8 h-8 text-brand-orange" />;
      case "Image":
        return <Image className="w-8 h-8 text-brand-orange" />;
      case "ClipboardCheck":
        return <ClipboardCheck className="w-8 h-8 text-brand-orange" />;
      default:
        return <ShieldCheck className="w-8 h-8 text-brand-orange" />;
    }
  };

  return (
    <section className="py-20 bg-brand-light text-brand-dark border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-brand-blue/5 text-brand-blue font-display font-extrabold text-xs uppercase tracking-wider rounded-md mb-3">
            Надёжность сделок
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight uppercase leading-tight text-brand-blue">
            Ваша уверенность — <span className="text-brand-orange">наша ответственность</span>
          </h2>
          <div className="w-12 h-1 bg-brand-orange mx-auto mt-4 rounded" />
          <p className="text-brand-grey max-w-xl mx-auto text-sm md:text-base mt-4">
            Покупка промышленного оборудования сопряжена с рисками. Мы устранили их все, гарантируя полную юридическую и техническую прозрачность.
          </p>
        </div>

        {/* 3 Horizontal/Grid styled cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {GUARANTEES_ITEMS.map((item, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-xl bg-brand-orange/5 flex items-center justify-center shrink-0 border border-brand-orange/15">
                {selectIcon(item.icon)}
              </div>

              {/* Text content details */}
              <div>
                <h3 className="text-lg md:text-xl font-display font-bold text-brand-blue mb-2">
                  {item.title}
                </h3>
                <p className="text-brand-grey text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
