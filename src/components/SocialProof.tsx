import React from "react";

interface PartnerCompany {
  name: string;
  logo: React.ReactNode;
}

const PARTNERS_LIST: PartnerCompany[] = [
  {
    name: "Газпром",
    logo: (
      <svg className="h-8 w-auto text-white/30 group-hover:text-[#3B90F4] transition-all duration-300 shrink-0" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 28C6 26 4 21 5 16C5.5 12 8 8 13 4C14 7 13 10 11 12C9 14 8 16 8 18C8 22 11 25 14 25C17.5 25 20.5 22 19 18C18.5 16.5 17 15.5 17 14C17 12 18 10.5 19 10C19.5 12.5 21 14 21.5 16C22 18 22 20 21 21.5C20.5 22.5 19 23 18.5 24C20 25.5 23 25 25 21C26.5 18 25.5 14.5 24.5 12C23.5 10 24 8 24.5 7C25.5 9 27.5 10.5 28.5 13C29.5 16 29 19.5 28 21.5C25.5 26.5 19 29.5 12 28Z" fill="currentColor" />
        <text x="36" y="25" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="15.5" letterSpacing="0.08em" fill="currentColor">ГАЗПРОМ</text>
      </svg>
    )
  },
  {
    name: "АЛРОСА",
    logo: (
      <svg className="h-8 w-auto text-white/30 group-hover:text-[#00AEEF] transition-all duration-300 shrink-0" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 6 L26 18 L16 30 L6 18 Z" fill="none" strokeWidth="2" />
          <path d="M6 18 H26 M16 6 V30" strokeWidth="1" strokeDasharray="3,3" />
          <polygon points="16,13 19,18 16,23 13,18" fill="currentColor" opacity="0.8" />
        </g>
        <text x="36" y="25" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="15" letterSpacing="0.1em" fill="currentColor">АЛРОСА</text>
      </svg>
    )
  },
  {
    name: "Kinross",
    logo: (
      <svg className="h-8 w-auto text-white/30 group-hover:text-[#E5A93B] transition-all duration-300 shrink-0" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 26 L8 10 L14 18 L20 8 L26 18 L32 10 L35 26 Z" fill="none" />
          <line x1="3" y1="28" x2="37" y2="28" />
        </g>
        <text x="44" y="20" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.14em" fill="currentColor">KINROSS</text>
        <text x="44" y="28" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="5.5" letterSpacing="0.25em" fill="currentColor" opacity="0.8">GOLD CORP</text>
      </svg>
    )
  },
  {
    name: "Evergreen",
    logo: (
      <svg className="h-8 w-auto text-white/30 group-hover:text-[#00A163] transition-all duration-300 shrink-0" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="19" r="10" fill="none" />
          <path d="M8 19 H28 M18 9 V29 M10 13 A10 10 0 0 0 10 25 M26 13 A10 10 0 0 1 26 25" strokeWidth="1" />
        </g>
        <text x="36" y="24" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11.5" letterSpacing="0.08em" fill="currentColor">EVERGREEN</text>
      </svg>
    )
  },
  {
    name: "КМП",
    logo: (
      <svg className="h-8 w-auto text-white/30 group-hover:text-[#4A90E2] transition-all duration-300 shrink-0" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="17" cy="19" r="10" fill="none" />
          <path d="M17 13 V25 M13 17 H21 M11 20.5 C11 23.5 23 23.5 23 20.5" strokeWidth="1.6" />
          <circle cx="17" cy="11.5" r="1.5" fill="currentColor" />
        </g>
        <text x="34" y="20.5" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.08em" fill="currentColor">КМП</text>
        <text x="34" y="28.5" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="5.5" letterSpacing="0.08em" fill="currentColor" opacity="0.8">КАМЧАТСКОЕ ПАРОХОДСТВО</text>
      </svg>
    )
  }
];

export default function SocialProof() {
  return (
    <section className="bg-brand-blue-hover border-y border-white/5 py-8 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Label */}
          <div className="text-center lg:text-left shrink-0">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-orange">
              Нам доверяют лидеры отраслей
            </h4>
            <p className="text-[11.5px] text-gray-400 mt-0.5">
              Поставляем оборудование для крупнейших корпораций РФ и СНГ
            </p>
          </div>

          {/* Logos Row with subtle transparent capsules */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 max-w-4xl">
            {PARTNERS_LIST.map((partner) => (
              <div 
                key={partner.name}
                className="group flex items-center justify-center transition-all duration-300 transform hover:scale-[1.05] cursor-pointer"
              >
                {partner.logo}
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
