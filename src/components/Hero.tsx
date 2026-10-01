import React from 'react';
import { ArrowRight, Code2, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreTemplates: () => void;
  onScopeCustomMvp: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreTemplates,
  onScopeCustomMvp
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-neutral-800/60">
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-3xl opacity-70"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Editorial kicker (clean unboxed text with subtle separator, no pill capsules) */}
        <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-6">
          <span>Digital Agency & Productized Studio</span>
          <span aria-hidden="true">·</span>
          <span>Zero Bureaucracy</span>
          <span aria-hidden="true">·</span>
          <span>Fixed Timelines</span>
        </div>

        {/* Primary Headline: text-wrap balance to avoid orphaned words */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-100 max-w-4xl font-display leading-[1.12]">
          We build fast, scalable MVPs for startups and premium websites for modern professionals.
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-2xl leading-relaxed">
          Order an industry-tested, conversion-optimized template customized with your branding in 72 hours—or partner with our senior engineers to build a full-stack custom MVP from scratch.
        </p>

        {/* Dual Primary CTA */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreTemplates}
            className="group flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-amber-300 active:scale-[0.98] transition-all shadow-md shadow-amber-400/20 whitespace-nowrap"
          >
            <span>Browse Templates & Live Demos</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onScopeCustomMvp}
            className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/80 px-6 py-3.5 text-sm font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <Code2 className="w-4 h-4 text-neutral-400" />
            <span>Scope Custom Startup MVP</span>
          </button>
        </div>

        {/* Adjacent Quantitative Proof Metrics */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 pt-10 border-t border-neutral-800/80">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-neutral-100 font-display tabular-nums">48–72h</div>
            <div className="mt-1 text-xs text-neutral-400">High-Converting Landing Pages</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-neutral-100 font-display tabular-nums">10–14 Days</div>
            <div className="mt-1 text-xs text-neutral-400">Validated Startup MVP Sprints</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-neutral-100 font-display">Scalable Stack</div>
            <div className="mt-1 text-xs text-neutral-400">Auth, DB, Cloud Hosting, Domain</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-neutral-100 font-display tabular-nums">100%</div>
            <div className="mt-1 text-xs text-neutral-400">Code & IP Transfer on GitHub</div>
          </div>
        </div>

        {/* Studio Hero Image Showcase Banner */}
        <div className="mt-12 relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900/40">
          <div className="aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden">
            <img
              src="/src/assets/images/hero_studio_workspace_1790699149931.jpg"
              alt="Vektora Design & Engineering Studio Workspace"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center filter brightness-[0.88] hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-neutral-300">
            <span className="font-medium text-neutral-200">Engineered with React 19, Next.js, Tailwind CSS & Supabase</span>
            <span className="hidden sm:inline text-neutral-400">Production-ready code delivered directly to your Git repository</span>
          </div>
        </div>

      </div>
    </section>
  );
};
