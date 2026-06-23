import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, DollarSign, Info, Layers, Maximize2, ShieldCheck, HelpCircle } from "lucide-react";

// Import locally uploaded container images
import img20ft from "../20 fut.webp";
import img40ft1 from "../40 fut.avif";
import img40ft2 from "../40 fut 2.webp";
import img40ft4 from "../40 fut 4.webp";
import img40ft5 from "../40 fut 5.webp";

// Inline SVG CIMC logo implementation
export function CimcLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="32" fill="#1c497d" fontSize="30" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="-1">
        CIMC
      </text>
      {/* Dynamic slanted corporate shapes representing container transport */}
      <rect x="100" y="10" width="22" height="6" fill="#f25a24" transform="skewX(-20)" />
      <rect x="110" y="20" width="22" height="6" fill="#1c497d" transform="skewX(-20)" />
    </svg>
  );
}

interface ContainerItem {
  id: string;
  type: "dry" | "reefer";
  name: string;
  alias: string;
  image: string;
  volume: string;
  payload: string;
  extDimensions: string;
  intDimensions: string;
  features: string[];
}

const CONTAINERS_DATA: ContainerItem[] = [
  {
    id: "20gp",
    type: "dry",
    name: 'Сухогрузный контейнер 20\'',
    alias: "20-футовый стандартный контейнер (33.2 м³)",
    image: img20ft,
    volume: "33.2 м³",
    payload: "До 28 200 кг",
    extDimensions: "6.06 х 2.44 х 2.59 м",
    intDimensions: "5.90 х 2.35 х 2.39 м",
    features: ["Прочный гофрированный металл", "Герметичные резиновые уплотнители", "Ровный деревянный пол из фанеры"],
  },
  {
    id: "40gp",
    type: "dry",
    name: 'Сухогрузный контейнер 40\'',
    alias: "40-футовый стандартный контейнер (67.7 м³)",
    image: img40ft1,
    volume: "67.7 м³",
    payload: "До 26 780 кг",
    extDimensions: "12.19 х 2.44 х 2.59 м",
    intDimensions: "12.03 х 2.35 х 2.39 м",
    features: ["Идеален для объемных легких грузов", "Подходит для складских нужд", "Удобные запорные устройства"],
  },
  {
    id: "40hc",
    type: "dry",
    name: 'Сухогрузный контейнер 40\' (увеличенный)',
    alias: "40-футовый High Cube — увеличенный по высоте (76.2 м³)",
    image: img40ft2,
    volume: "76.2 м³",
    payload: "До 26 500 кг",
    extDimensions: "12.19 х 2.44 х 2.89 м",
    intDimensions: "12.03 х 2.35 х 2.69 м",
    features: ["Увеличена высота на 30 см", "Проходит под стандартные автопоезда", "Рекомендован для высоких паллет"],
  },
  {
    id: "20re",
    type: "reefer",
    name: 'Рефрижераторный контейнер 20\'',
    alias: "20-футовый реф-контейнер (Термос + Холод)",
    image: img40ft4,
    volume: "28.3 м³",
    payload: "До 24 000 кг",
    extDimensions: "6.06 х 2.44 х 2.59 м",
    intDimensions: "5.45 х 2.28 х 2.26 м",
    features: ["Диапазон: от -30°C до +25°C", "Стенки из сэндвич-панелей", "Установка Thermo King / Carrier"],
  },
  {
    id: "40re",
    type: "reefer",
    name: 'Рефрижераторный контейнер 40\' (увеличенный)',
    alias: "40-футовый High Cube Reefer (увеличенный объём)",
    image: img40ft5,
    volume: "68.0 м³",
    payload: "До 29 400 кг",
    extDimensions: "12.19 х 2.44 х 2.89 м",
    intDimensions: "11.56 х 2.28 х 2.50 м",
    features: ["Микропроцессорный контроль температур", "T-образный профильный алюминиевый пол", "Защита от перегрузок сети"],
  }
];

export default function Catalog() {
  const [activeTab, setActiveTab ] = useState<"all" | "dry" | "reefer">("all");

  const filteredContainers = CONTAINERS_DATA.filter(
    (c) => activeTab === "all" || c.type === activeTab
  );

  const handleScrollToQuiz = () => {
    const element = document.getElementById("quiz");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="catalog" className="py-20 bg-white border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* CIMC Top Partnership Promo Badge Container */}
        <div className="mb-14 bg-gradient-to-r from-brand-blue/5 via-brand-light to-brand-blue/5 rounded-2xl p-6 md:p-8 border border-brand-blue/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4.5">
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-xs shrink-0">
              <CimcLogo className="h-9 md:h-11 w-auto" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-brand-orange/10 px-2.5 py-0.5 rounded text-[10px] md:text-xs font-bold text-brand-orange uppercase tracking-wide">
                Официальный дилер
              </div>
              <h4 className="text-sm md:text-base font-display font-bold text-brand-blue uppercase tracking-tight mt-1">
                Поставки контейнеров от мирового лидера CIMC
              </h4>
              <p className="text-xs md:text-sm text-brand-grey max-w-xl leading-snug">
                Мы являемся прямым представителем холдинга CIMC в РФ. Поставляем абсолютно оригинальные новые контейнеры заводского качества с полным комплектом документов, гарантией производителя и сертификатами РС (Российского Морского Регистра Судоходства).
              </p>
            </div>
          </div>
          <div className="flex flex-row md:flex-col items-center md:items-end gap-2 text-right shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-brand-blue font-bold">
              <ShieldCheck className="w-4.5 h-4.5 text-brand-orange" />
              <span>100% Заводская гарантия</span>
            </div>
            <span className="text-[10px] md:text-xs text-brand-grey font-mono block">
              Прямые договора • Без посредников
            </span>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-brand-blue uppercase tracking-tight">
            Каталог сертифицированных контейнеров
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 mb-3 rounded" />
          <p className="text-brand-grey text-sm md:text-base">
            Выберите необходимый тип оборудования. Ниже представлены реальные габариты, характеристики и ключевые особенности поставляемых моделей.
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 select-none">
          {[
            { id: "all", label: "Все контейнеры" },
            { id: "dry", label: "Сухогрузные (Универсальные)" },
            { id: "reefer", label: "Рефрижераторные (С охлаждением)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-lg font-display text-xs md:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/15"
                  : "bg-brand-light text-brand-grey hover:bg-gray-200 hover:text-brand-dark"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Container Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContainers.map((container, index) => (
            <motion.div
              layout
              key={container.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-brand-light rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg hover:border-brand-orange/30 transition-all flex flex-col group"
            >
              
              {/* Image Frame */}
              <div className="relative h-56 bg-gray-950 overflow-hidden">
                <img
                  src={container.image}
                  alt={container.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                
                {/* Specific features on image */}
                <div className="absolute top-3 left-3 bg-brand-blue/90 backdrop-blur-xs text-white font-display font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow-xs">
                  {container.type === "dry" ? "Сухогрузный" : "Рефрижератор"}
                </div>

                <div className="absolute bottom-3 right-3 bg-brand-dark/85 backdrop-blur-xs text-amber-300 font-mono text-xs font-bold px-2.5 py-1 rounded">
                  Объём: {container.volume}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-brand-blue uppercase tracking-tight group-hover:text-brand-orange transition-colors mb-4">
                    {container.name}
                  </h3>

                  {/* Character specs list */}
                  <div className="space-y-2 border-t border-b border-gray-200/60 py-3 mb-4 font-sans text-xs">
                    <div className="flex justify-between">
                      <span className="text-brand-grey">Внешние габариты (ДхШхВ):</span>
                      <strong className="text-brand-dark font-semibold">{container.extDimensions}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-grey">Внутренние габариты (ДхШхВ):</span>
                      <strong className="text-brand-dark font-semibold">{container.intDimensions}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-grey">Грузоподъёмность:</span>
                      <strong className="text-brand-dark font-semibold">{container.payload}</strong>
                    </div>
                  </div>

                  {/* Features mini checklist */}
                  <ul className="space-y-1.5 mb-5">
                    {container.features.map((feat, fi) => (
                      <li key={fi} className="flex items-start gap-1.5 text-[11.5px] text-brand-dark/95 leading-normal">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Status Block and Actions */}
                <div className="mt-auto">
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/50 flex flex-col justify-center gap-1 mb-4 text-center">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center justify-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      В наличии на терминалах
                    </span>
                    <span className="text-[11px] text-brand-grey font-sans">
                      Новые контейнеры с заводской гарантией CIMC
                    </span>
                  </div>

                  <button
                    onClick={handleScrollToQuiz}
                    className="w-full py-2.5 bg-brand-blue hover:bg-brand-blue-hover text-white font-display font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Рассчитать стоимость доставки</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

        {/* Notice */}
        <div className="mt-12 max-w-2xl mx-auto text-center flex items-center justify-center gap-2 bg-brand-light p-4 rounded-xl border border-gray-100 text-xs text-brand-grey leading-relaxed">
          <Info className="w-5 h-5 text-brand-orange shrink-0" />
          <span>
            * Все поставляемые контейнеры являются абсолютно новыми и сертифицированы по международным стандартам. Наличие на терминалах в РФ и подбор подходящих вариантов можно уточнить в интерактивном калькуляторе ниже.
          </span>
        </div>

      </div>
    </section>
  );
}
