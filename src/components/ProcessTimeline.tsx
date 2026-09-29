import React from 'react';
import { ArrowRight, Check, Sparkles, ShieldCheck } from 'lucide-react';

interface ProcessTimelineProps {
  onStartProject: () => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onStartProject }) => {
  return (
    <section id="process" className="py-20 md:py-28 border-b border-neutral-800/80 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-3">
            <span>Transparent Workflow</span>
            <span aria-hidden="true">·</span>
            <span>Zero Endless Meetings</span>
            <span aria-hidden="true">·</span>
            <span>Guaranteed Dates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-100 font-display">
            How We Get You Live in Record Time
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            Whether you choose a ready-to-deploy template or a custom full-stack MVP, our process removes friction so you can focus on getting users, patients, and revenue.
          </p>
        </div>

        {/* 4 Step Visual Flow */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-amber-400 font-bold mb-2">Step 01</div>
              <h4 className="text-base font-bold text-neutral-100 font-display">Choose or Scope</h4>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Browse our live examples and select a turnkey template, or lock in your custom MVP parameters via our scope calculator.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-400">
              Immediate fixed pricing
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-amber-400 font-bold mb-2">Step 02</div>
              <h4 className="text-base font-bold text-neutral-100 font-display">5-Minute Onboarding</h4>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Submit your brand logos, copywriting, credentials, or schedule a 25-minute technical discovery call with our lead architect.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-400">
              Zero complicated paperwork
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-amber-400 font-bold mb-2">Step 03</div>
              <h4 className="text-base font-bold text-neutral-100 font-display">Senior Engineering</h4>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                We adapt the codebase, hook up your database, connect Stripe payments, configure SEO, and test responsiveness on real devices.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-400">
              Daily async updates
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-amber-400 font-bold mb-2">Step 04</div>
              <h4 className="text-base font-bold text-neutral-100 font-display">Launch & 100% Ownership</h4>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                We connect your domain with SSL, transfer the clean GitHub repository to your team, and provide 30 days of post-launch support.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-400">
              100% your IP & code
            </div>
          </div>

        </div>

        {/* Pricing Comparison Table */}
        <div id="pricing" className="mt-20 pt-16 border-t border-neutral-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-100 font-display">
              Simple, Predictable Engagement Tiers
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400">
              No hourly overruns, no surprise retainers. Choose the model that matches your current momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Tier 1: Raw Codebase */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-neutral-400">For Developers & Teams</div>
                <h4 className="text-lg font-bold text-neutral-100 font-display mt-1">Raw Codebase License</h4>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-neutral-100 font-display tabular-nums">$179–$299</span>
                  <span className="text-xs text-neutral-400">one-time</span>
                </div>
                <p className="mt-3 text-xs text-neutral-400">
                  Instant access to the complete Next.js 15 repository with TypeScript, Tailwind styling, and components.
                </p>

                <ul className="mt-6 space-y-2 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Full source code repository</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Commercial unlimited license</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Setup documentation & README</span>
                  </li>
                  <li className="flex items-center gap-2 text-neutral-500">
                    <span>Self-hosted & self-customized</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800">
                <button
                  onClick={onStartProject}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 py-2.5 text-xs font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white transition-colors"
                >
                  Browse Codebases
                </button>
              </div>
            </div>

            {/* Tier 2: Turnkey Customized (Most Popular) */}
            <div className="rounded-xl border border-amber-400/80 bg-neutral-900/80 p-6 flex flex-col justify-between relative shadow-lg shadow-amber-400/5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold text-neutral-950 uppercase tracking-wide">
                Most Popular
              </div>

              <div>
                <div className="text-xs font-semibold text-amber-400">Turnkey Productized Service</div>
                <h4 className="text-lg font-bold text-neutral-100 font-display mt-1">Customized Template</h4>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white font-display tabular-nums">$650–$950</span>
                  <span className="text-xs text-neutral-400">flat fee</span>
                </div>
                <p className="mt-3 text-xs text-neutral-400">
                  We customize the template with your branding, copy, and doctor credentials, then launch it on your domain in 48-72h.
                </p>

                <ul className="mt-6 space-y-2 text-xs text-neutral-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Delivered live in 48–72 hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Your exact logo, copy & photography</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Custom domain & SSL deployment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Booking or contact form connected</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>14 days complimentary tweaks</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800">
                <button
                  onClick={onStartProject}
                  className="w-full rounded-lg bg-amber-400 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20"
                >
                  Order Turnkey Website
                </button>
              </div>
            </div>

            {/* Tier 3: Custom MVP Sprint */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-neutral-400">For Startups & Founders</div>
                <h4 className="text-lg font-bold text-neutral-100 font-display mt-1">14-Day Custom MVP</h4>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-neutral-100 font-display tabular-nums">$2,600+</span>
                  <span className="text-xs text-neutral-400">fixed sprint</span>
                </div>
                <p className="mt-3 text-xs text-neutral-400">
                  Tailored full-stack product engineered from ground up. Auth, database, Stripe subscriptions, AI pipelines, and custom UX.
                </p>

                <ul className="mt-6 space-y-2 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-400" />
                    <span>14-day production delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Next.js 15, PostgreSQL, Supabase/Node</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Multi-role permissions & Stripe</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-400" />
                    <span>100% intellectual property transfer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-400" />
                    <span>30 days post-launch warranty</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800">
                <button
                  onClick={onStartProject}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 py-2.5 text-xs font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white transition-colors"
                >
                  Scope Custom Sprint
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
