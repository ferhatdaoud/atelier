import React from 'react';
import { Star, TrendingUp, ShieldCheck, Check } from 'lucide-react';
import { PackageType } from '../types';

interface ProcessTimelineProps {
  onStartProject: (packageType: PackageType) => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onStartProject }) => {
  return (
    <section id="pricing" className="py-24 sm:py-36 bg-[#000000] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header matching screenshot */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight">
            Pricing Plans
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans">
            Flexible plans for every stage
          </p>
        </div>

        {/* 3 Pricing Cards matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          
          {/* Card 1: Starter / Bespoke Website */}
          <div className="rounded-2xl sm:rounded-[22px] border border-white/10 bg-[#0d0d0d] p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white mb-6">
                <Star className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Starter</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-sans min-h-[36px]">
                Perfect for startups and small teams getting started with web dev.
              </p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-extrabold text-white font-display tabular-nums">12,000</span>
                <span className="text-xs text-zinc-400 font-mono">DA / lancement</span>
              </div>

              {/* Checklist */}
              <ul className="mt-8 space-y-3 pt-6 border-t border-white/[0.08] text-xs text-zinc-300 font-sans">
                <li className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-white/20 bg-white/5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Custom responsive layout</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-white/20 bg-white/5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>100% design & asset ownership</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-white/20 bg-white/5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Turnkey live delivery in 48–72h</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onStartProject('landing')}
              className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-[#ff6b2c] hover:bg-white/10 transition-all"
            >
              <span>Get Started</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H8M17 7V16" />
              </svg>
            </button>
          </div>

          {/* Card 2: Growth / Startup MVP (FEATURED WITH ORANGE AMBIENT GLOW) */}
          <div 
            className="rounded-2xl sm:rounded-[22px] border border-[#ff6b2c]/40 bg-[#0d0d0d] p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl transition-all duration-300"
            style={{
              backgroundImage: 'radial-gradient(ellipse at bottom right, rgba(255, 107, 44, 0.25) 0%, rgba(13, 13, 13, 0.95) 70%)'
            }}
          >
            <div>
              <div className="w-10 h-10 rounded-full border border-[#ff6b2c]/40 bg-[#ff6b2c]/10 flex items-center justify-center text-[#ff6b2c] mb-6">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Growth</h3>
              <p className="mt-2 text-xs text-zinc-300 leading-relaxed font-sans min-h-[36px]">
                Everything you need to automate and grow your business.
              </p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-extrabold text-[#ff6b2c] font-display tabular-nums">30,000</span>
                <span className="text-xs text-zinc-400 font-mono">DA / sprint</span>
              </div>

              {/* Checklist */}
              <ul className="mt-8 space-y-3 pt-6 border-t border-white/[0.12] text-xs text-zinc-200 font-sans">
                <li className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#ff6b2c] bg-[#ff6b2c]">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span><strong>3–7 day rapid delivery sprint</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#ff6b2c] bg-[#ff6b2c]">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Next.js 15, React 19 & Tailwind CSS</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#ff6b2c] bg-[#ff6b2c]">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Chargili payments & checkout flow</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#ff6b2c] bg-[#ff6b2c]">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>User auth & database (Supabase / Postgres)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#ff6b2c] bg-[#ff6b2c]">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>100% GitHub repository transfer</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onStartProject('mvp')}
              className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#ff6b2c] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(255,107,44,0.4)] hover:bg-[#ff824d] transition-all"
            >
              <span>Get Started</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H8M17 7V16" />
              </svg>
            </button>
          </div>

          {/* Card 3: Enterprise / Scalable App */}
          <div className="rounded-2xl sm:rounded-[22px] border border-white/10 bg-[#0d0d0d] p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white mb-6">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Enterprise</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-sans min-h-[36px]">
                Custom solutions for large teams and complex operations.
              </p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-extrabold text-white font-display tabular-nums">Custom</span>
                <span className="text-xs text-zinc-400 font-mono">/project</span>
              </div>

              {/* Checklist */}
              <ul className="mt-8 space-y-3 pt-6 border-t border-white/[0.08] text-xs text-zinc-300 font-sans">
                <li className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-white/20 bg-white/5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Full brand strategy & design system</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-white/20 bg-white/5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Custom scalable backend architecture</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-white/20 bg-white/5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>RBAC & enterprise permissions</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-white/20 bg-white/5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>High-traffic load balancing & SLAs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-white/20 bg-white/5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Dedicated Slack channel & support</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onStartProject('full-app')}
              className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-[#ff6b2c] hover:bg-white/10 transition-all"
            >
              <span>Get Started</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H8M17 7V16" />
              </svg>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
