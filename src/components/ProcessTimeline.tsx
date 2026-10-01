import React from 'react';
import { ArrowRight, Check, Sparkles, ShieldCheck } from 'lucide-react';

interface ProcessTimelineProps {
  onStartProject: (packageType?: 'landing' | 'mvp' | 'full-app') => void;
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
            Whether you need a high-converting landing page, a rapid startup MVP, or a full scalable web application, our process removes friction so you can focus on revenue.
          </p>
        </div>

        {/* 4 Step Visual Flow */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-amber-400 font-bold mb-2">Step 01</div>
              <h4 className="text-base font-bold text-neutral-100 font-display">Select Your Package</h4>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Choose between a fast Landing Page, a 14-day Startup MVP, or a Full Scalable Web Application with custom scope.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-400">
              Immediate fixed pricing
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-amber-400 font-bold mb-2">Step 02</div>
              <h4 className="text-base font-bold text-neutral-100 font-display">Quick Onboarding Intake</h4>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Share your brand assets, logo, copywriting, or book a 25-minute technical discovery call with our lead engineer.
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
                We build the UI, database, authentication, storage, and APIs. Tested across desktop and mobile devices.
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
                We connect your custom domain with SSL, transfer the clean GitHub repository to you, and support your launch.
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
              Clear, Predictable Investment Tiers
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400">
              Guaranteed fixed quotes with zero surprise retainers. Tailored for clinics, startups, and scalable web apps.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Tier 1: Landing Page */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-neutral-400">Clinics, Cabinets & Waitlists</div>
                <h4 className="text-lg font-bold text-neutral-100 font-display mt-1">High-Converting Landing Page</h4>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-neutral-100 font-display tabular-nums">$590</span>
                  <span className="text-xs text-neutral-400">flat fee · 48–72h</span>
                </div>
                <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                  Fast, ultra-clean web presence designed to turn visitors into booked patients, clients, or early adopters.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Delivered live in 48–72 hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Your exact logo, branding & copy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Appointment booking or lead form connected</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Custom domain & automated SSL certificate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mobile responsive & local SEO setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>14 days post-launch revisions</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => onStartProject('landing')}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 py-2.5 text-xs font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white transition-colors"
                >
                  Order Landing Page
                </button>
              </div>
            </div>

            {/* Tier 2: Startup MVP (Our Primary Target) */}
            <div className="rounded-xl border border-amber-400/80 bg-neutral-900/80 p-6 flex flex-col justify-between relative shadow-lg shadow-amber-400/5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold text-neutral-950 uppercase tracking-wide">
                Primary Specialty
              </div>

              <div>
                <div className="text-xs font-semibold text-amber-400">Our Flagship Target</div>
                <h4 className="text-lg font-bold text-neutral-100 font-display mt-1">Startup MVP Sprint</h4>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white font-display tabular-nums">$1,850</span>
                  <span className="text-xs text-neutral-400">fixed sprint · 10–14 days</span>
                </div>
                <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                  Turn your startup idea into a validated, working product in 2 weeks. Tested with real early users & pitch-ready.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-neutral-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>10–14 day rapid delivery sprint</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Next.js 15, React 19, Tailwind CSS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Core user workflows & interactive logic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Stripe checkout or deposit payment gateway</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Custom domain & edge hosting setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>100% intellectual property transfer to your GitHub</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>30 days post-launch warranty support</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => onStartProject('mvp')}
                  className="w-full rounded-lg bg-amber-400 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20"
                >
                  Start Startup MVP Sprint
                </button>
              </div>
            </div>

            {/* Tier 3: Full Scalable Application */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-neutral-400">Complete Production Platform</div>
                <h4 className="text-lg font-bold text-neutral-100 font-display mt-1">Full Scalable Web Application</h4>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-neutral-100 font-display tabular-nums">$3,600+</span>
                  <span className="text-xs text-neutral-400">production build · 3–4 wks</span>
                </div>
                <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                  Enterprise-ready, scalable software with multi-user auth, cloud database, asset hosting & billing.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span><strong>Login & User Auth:</strong> Google OAuth, Email, Magic Links & RBAC</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span><strong>Scalable Database:</strong> PostgreSQL / Supabase with Row-Level Security</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span><strong>Image & Asset Cloud Hosting:</strong> High-speed CDN storage & uploads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span><strong>Custom Domain & SSL:</strong> Global edge CDN & DNS routing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span><strong>Stripe Billing:</strong> Recurring tiered subscriptions & customer portal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin management portal & audit metrics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>CI/CD deployment pipeline + 60 days dedicated warranty</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => onStartProject('full-app')}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 py-2.5 text-xs font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white transition-colors"
                >
                  Scope Scalable Application
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

