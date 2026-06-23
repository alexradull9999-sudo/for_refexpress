import React from "react";

interface PartnerCompany {
  name: string;
  sub: string;
  logo: React.ReactNode;
}

const PARTNERS_LIST: PartnerCompany[] = [
  {
    name: "Газпром",
    sub: "ПАО",
    logo: (
      <svg className="w-5 h-5 text-sky-400 shrink-0 fill-current" viewBox="0 0 24 24">
        <path d="M12 2c.11 2.34-1.2 4.47-3 5.5C7.2 8.53 6 10.38 6 12.5c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5c0-1.78-.71-3.41-1.88-4.59-.2-.2-.51-.12-.6.14-.52 1.54-1.97 2.37-3.49 1.95-1.12-.31-1.92-1.32-2.03-2.48l-.06-.52V2z" />
      </svg>
    )
  },
  {
    name: "АЛРОСА",
    sub: "АК",
    logo: (
      <svg className="w-5 h-5 text-blue-400 shrink-0 fill-current" viewBox="0 0 24 24">
        <path d="M12 2L2 9l10 13 10-13L12 2zm-8.2 6.6L12 3.5l8.2 5.1L12 20.2 3.8 8.6z" />
      </svg>
    )
  },
  {
    name: "Kinross",
    sub: "Gold Corp",
    logo: (
      <svg className="w-5 h-5 text-amber-400 shrink-0 fill-current" viewBox="0 0 24 24">
        <path d="M2 19h20v2H2v-2zm3-4l3-9 4 5 4-5 3 9H5z" />
      </svg>
    )
  },
  {
    name: "Evergreen",
    sub: "Marine",
    logo: (
      <svg className="w-5 h-5 text-emerald-400 shrink-0 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H11V8h2c.55 0 1-.45 1-1V5h1.5c.78 0 1.49-.44 1.83-1.14C18.7 5.76 20 8.73 20 12c0 2.2-.62 4.25-1.1 5.39z" />
      </svg>
    )
  },
  {
    name: "КМП",
    sub: "Камчатское Пароходство",
    logo: (
      <svg className="w-5 h-5 text-indigo-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3M12 2a3 3 0 110 6 3 3 0 010-6z" />
      </svg>
    )
  }
];

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
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3.5 max-w-3xl">
            {PARTNERS_LIST.map((partner) => (
              <div 
                key={partner.name}
                className="font-sans text-xs text-gray-200 bg-white/5 px-3.5 py-2 rounded-lg border border-white/10 hover:border-brand-orange/40 hover:bg-white-[8%] transition-all select-none flex items-center gap-2.5 group shadow-xs"
              >
                <div className="bg-white/5 p-1 rounded-md group-hover:scale-110 transition-transform duration-200 shrink-0">
                  {partner.logo}
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-white">{partner.name}</span>
                  <span className="text-[9px] text-gray-400 font-mono mt-0.5 uppercase tracking-wider">{partner.sub}</span>
                </div>
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
