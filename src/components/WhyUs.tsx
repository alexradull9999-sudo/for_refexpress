import { WHY_US_CARDS } from "../data";
import * as Icons from "lucide-react";

export default function WhyUs() {
  // Render lucide icons dynamically or safely fall back to standard icons
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Package":
        return <Icons.Package className="w-6 h-6 text-brand-orange" />;
      case "Wrench":
        return <Icons.Wrench className="w-6 h-6 text-brand-orange" />;
      case "ShieldAlert":
        return <Icons.ShieldCheck className="w-6 h-6 text-brand-orange" />;
      case "Truck":
        return <Icons.Truck className="w-6 h-6 text-brand-orange" />;
      case "Camera":
        return <Icons.Camera className="w-6 h-6 text-brand-orange" />;
      case "CalendarCheck":
        return <Icons.Award className="w-6 h-6 text-brand-orange" />;
      default:
        return <Icons.CheckCircle2 className="w-6 h-6 text-brand-orange" />;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-brand-light text-brand-dark scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-brand-blue/5 text-brand-blue font-display font-extrabold text-xs uppercase tracking-wider rounded-md mb-3">
            Наши преимущества
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight uppercase leading-tight text-brand-blue">
            Почему <span className="text-brand-orange">1 200+ компаний</span> выбирают нас
          </h2>
          <div className="w-12 h-1 bg-brand-orange mx-auto mt-4 rounded" />
          <p className="text-brand-grey max-w-xl mx-auto text-sm md:text-base mt-4">
            Мы выстроили бизнес-процессы так, чтобы покупка контейнера была понятной, безопасной и сопровождалась минимумом согласований.
          </p>
        </div>

        {/* Cards Grid: 3 columns on lg, 2 on md, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_US_CARDS.map((card) => (
            <div 
              key={card.id}
              className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/15 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon box */}
                <div className="w-12 h-12 rounded-lg bg-brand-blue/5 flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 transition-colors">
                  {renderIcon(card.icon)}
                </div>

                {/* Card Title */}
                <h3 className="text-lg md:text-xl font-display font-bold text-brand-blue mb-3">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-brand-grey text-sm md:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Action decoration/indicator */}
              <div className="w-6 h-1.5 bg-gray-100 rounded-full mt-6 group-hover:bg-brand-orange transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
