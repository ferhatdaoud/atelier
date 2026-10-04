import React from 'react';

interface ImpactMetricsProps {
  onStartProject?: () => void;
}

export const ImpactMetrics: React.FC<ImpactMetricsProps> = ({ onStartProject }) => {
  return (
    <section id="impact" className="py-24 sm:py-36 bg-[#000000] relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header matching screenshot */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight">
            Our Impact
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans">
            Skills that drive impactful results
          </p>
        </div>

        {/* 3-Column Metric Box matching screenshot */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          <div className="py-12 sm:py-16 text-center">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white font-display tracking-tight">
              120<span className="text-[#ff6b2c]">+</span>
            </div>
            <div className="mt-4 text-xs font-bold tracking-widest text-zinc-400 uppercase font-mono">
              CLIENTS WORLDWIDE
            </div>
          </div>

          <div className="py-12 sm:py-16 text-center">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white font-display tracking-tight">
              98<span className="text-[#ff6b2c]">+</span>
            </div>
            <div className="mt-4 text-xs font-bold tracking-widest text-zinc-400 uppercase font-mono">
              PROJECTS DELIVERED
            </div>
          </div>

          <div className="py-12 sm:py-16 text-center">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white font-display tracking-tight">
              74<span className="text-[#ff6b2c]">+</span>
            </div>
            <div className="mt-4 text-xs font-bold tracking-widest text-zinc-400 uppercase font-mono">
              EXPERTS
            </div>
          </div>

        </div>

        {/* "Ready to build your next project?" Card matching screenshot */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d0d0d] p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Ready to build <br className="sm:hidden" />
              <span className="text-[#ff6b2c]">your next project?</span>
            </h3>
          </div>

          <button
            onClick={onStartProject}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff6b2c] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(255,107,44,0.4)] hover:bg-[#ff824d] transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <span>LET'S TALK</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H8M17 7V16" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};
