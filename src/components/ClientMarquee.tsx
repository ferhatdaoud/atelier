import React from 'react';

export const ClientMarquee: React.FC = () => {
  const partners = [
    { name: 'Y COMBINATOR', sub: 'Founders Alumni' },
    { name: 'STRIPE CLOUD', sub: 'Verified Partner' },
    { name: 'SUPABASE', sub: 'Postgres Architecture' },
    { name: 'VERCEL EDGE', sub: 'Next.js Certified' },
    { name: 'LINEAR APP', sub: 'Design System' },
    { name: 'MEDTECH SWISS', sub: 'Clinic Platform' },
    { name: 'RETOOL LABS', sub: 'Internal Engines' },
    { name: 'KHORA HEALTH', sub: 'Telemedicine' },
  ];

  return (
    <section className="py-12 border-y border-white/[0.08] bg-[#090909]/60 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 text-center mb-6">
        <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-semibold font-mono">
          Trusted By Industry Leaders & Category Founders
        </p>
      </div>

      {/* Infinite Marquee Track */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left and right fade scrims */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#080808] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#080808] to-transparent z-10" />

        <div className="flex shrink-0 items-center gap-12 sm:gap-16 animate-marquee py-2">
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-all cursor-pointer whitespace-nowrap group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#ff6b2c] transition-colors" />
              <span className="text-sm sm:text-base font-extrabold tracking-wider font-display text-white group-hover:text-[#ff6b2c] transition-colors">
                {partner.name}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">
                [{partner.sub}]
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
