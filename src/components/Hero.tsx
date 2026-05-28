import { motion } from "motion/react";
import { ArrowDown, ClipboardList, Shield, Award, MapPin } from "lucide-react";
import containerImg from "../conteiner.png";
import containerImg2 from "../container2.png";

export default function Hero() {
  const handleScrollToQuiz = () => {
    const element = document.getElementById("quiz");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToWhy = () => {
    const element = document.getElementById("why-us");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-brand-blue text-white py-12 lg:py-24">
      {/* Container Terminal background overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-25" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80')` 
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/95 to-brand-blue/70" />

      {/* Grid Pattern overlay for tech B2B look */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f25a24_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Texts and Action buttons (lg:col-span-7) */}
          <div className="lg:col-span-7 mt-4">
            {/* Accent Label */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-brand-orange text-xs font-display font-extrabold uppercase tracking-wide mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              Склады в 10+ городах РФ • Официальный импортер
            </motion.div>

            {/* H1 Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-tight uppercase mb-6"
            >
              Универсальные контейнеры <span className="text-brand-orange">20 и 40 футов</span> напрямую от производителя с доставкой по ВСЕЙ России
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-8 font-sans"
            >
              Новые сертифицированные сухогрузные контейнеры в наличии на терминалах в крупнейших транспортных узлах. 
              Предоставляем полный пакет документов и сертификаты соответствия. Оперативная доставка в любой регион России собственной транспортной компанией.
            </motion.p>

            {/* UTP-badges */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            >
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/10 hover:border-brand-orange/30 transition duration-300">
                <Award className="w-7 h-7 text-brand-orange shrink-0" />
                <div className="leading-tight">
                  <span className="block font-display font-extrabold text-brand-orange uppercase text-xs">12 лет</span>
                  <span className="text-xs text-gray-300">опыта на рынке РФ</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/10 hover:border-brand-orange/30 transition duration-300">
                <ClipboardList className="w-7 h-7 text-brand-orange shrink-0" />
                <div className="leading-tight">
                  <span className="block font-display font-extrabold text-brand-orange uppercase text-xs">800+ шт</span>
                  <span className="text-xs text-gray-300">в обороте ежегодно</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/10 hover:border-brand-orange/30 transition duration-300">
                <MapPin className="w-7 h-7 text-brand-orange shrink-0" />
                <div className="leading-tight">
                  <span className="block font-display font-extrabold text-brand-orange uppercase text-xs">Вся Россия</span>
                  <span className="text-xs text-gray-300">транспортировка ТК</span>
                </div>
              </div>
            </motion.div>

            {/* CTA & Trust tag */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4"
            >
              <button
                onClick={handleScrollToQuiz}
                className="px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-extrabold text-sm uppercase rounded-md shadow-xl hover:shadow-brand-orange/20 cursor-pointer transition-all hover:translate-y-[-1px] active:translate-y-0 text-center flex items-center justify-center gap-2 select-none"
              >
                <span>Подобрать контейнер и получить каталог →</span>
              </button>
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-200 font-bold">1200+ компаний уже скачали</span>
                <span className="text-[11px] text-gray-400 font-sans">PDF-каталог отправляется за 15 минут</span>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-gray-400 italic font-sans"
            >
              * Бесплатно — вышлем подборку в мессенджер или на email актуальные цены и фотографии.
            </motion.p>
          </div>

          {/* RIGHT COLUMN: GORGEOUS CONTAINER PHOTOS GRID (lg:col-span-5) */}
          <div className="lg:col-span-5 w-full flex flex-col gap-4">
            <span className="text-xs text-gray-300 uppercase tracking-widest font-display font-extrabold block text-center lg:text-left mb-1">
              Реальные фото поставляемых контейнеров
            </span>

            {/* Container Type 1 Product Frame */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 hover:border-brand-orange/40 transition duration-300 relative group overflow-hidden shadow-lg">
              <div className="relative h-44 rounded-lg overflow-hidden bg-gray-900">
                <img 
                  src={containerImg} 
                  alt="Сухогрузный контейнер РефЭкспресс" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                />
                {/* Visual Badges overlay */}
                <div className="absolute top-2 left-2 bg-brand-orange text-brand-blue font-display font-extrabold text-[10px] uppercase px-2 py-0.5 rounded tracking-wide shadow-sm">
                  В наличии на терминалах
                </div>
                <div className="absolute bottom-2 right-2 bg-brand-blue text-white font-mono text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                  20 футов • Стандарт (33 м³)
                </div>
              </div>
              <div className="mt-2.5 flex justify-between items-center px-1">
                <span className="font-display font-bold text-xs uppercase text-white">
                  Сухогрузный контейнер 20 фт (Новый)
                </span>
                <span className="text-brand-orange font-bold text-xs font-mono">
                  Заводское качество
                </span>
              </div>
            </div>

            {/* Container Type 2 Product Frame */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 hover:border-brand-orange/40 transition duration-300 relative group overflow-hidden shadow-lg">
              <div className="relative h-44 rounded-lg overflow-hidden bg-gray-900">
                <img 
                  src={containerImg2} 
                  alt="Сухогрузный контейнер 40 HC РефЭкспресс" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                />
                {/* Visual Badges overlay */}
                <div className="absolute top-2 left-2 bg-brand-orange text-brand-blue font-display font-extrabold text-[10px] uppercase px-2 py-0.5 rounded tracking-wide shadow-sm">
                  Под заказ и в наличии
                </div>
                <div className="absolute bottom-2 right-2 bg-brand-blue text-white font-mono text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                  40 HC • Увеличенный (76 м³)
                </div>
              </div>
              <div className="mt-2.5 flex justify-between items-center px-1">
                <span className="font-display font-bold text-xs uppercase text-white">
                  Сухогрузный контейнер 40 HC (Новый)
                </span>
                <span className="text-brand-orange font-bold text-xs font-mono">
                  Сертификат РС
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Scroll down anchor */}
        <div className="mt-14 flex justify-center lg:justify-start">
          <button
            onClick={handleScrollToWhy}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-brand-orange transition duration-200 cursor-pointer group"
          >
            <span>Узнать подробнее о преимуществах</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-brand-orange group-hover:scale-110" />
          </button>
        </div>

      </div>
    </section>
  );
}
