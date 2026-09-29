import React, { useState } from 'react';
import { Code2, Cpu, Database, CreditCard, Shield, Rocket, Check, ArrowRight, Zap } from 'lucide-react';

interface MvpCalculatorProps {
  onScopeCustomMvp: (total: number, summary: string[]) => void;
}

export const MvpCalculator: React.FC<MvpCalculatorProps> = ({ onScopeCustomMvp }) => {
  // Config state
  const [productType, setProductType] = useState<'saas' | 'marketplace' | 'ai-tool' | 'mobile-pwa'>('saas');
  const [authType, setAuthType] = useState<'simple' | 'rbac'>('simple');
  const [payments, setPayments] = useState<'none' | 'stripe-basic' | 'stripe-sub'>('stripe-sub');
  const [database, setDatabase] = useState<'supabase' | 'realtime'>('supabase');
  const [aiIntegration, setAiIntegration] = useState<'none' | 'gemini' | 'advanced-rag'>('gemini');
  const [speed, setSpeed] = useState<'standard' | 'rush'>('standard');

  // Compute pricing
  let basePrice = 2500;
  let deliveryDays = 14;
  const summary: string[] = [];

  if (productType === 'saas') {
    basePrice = 2600;
    summary.push('B2B SaaS Web Application');
  } else if (productType === 'marketplace') {
    basePrice = 3400;
    deliveryDays += 4;
    summary.push('Two-Sided Marketplace & Multi-Role Portal');
  } else if (productType === 'ai-tool') {
    basePrice = 2900;
    deliveryDays += 2;
    summary.push('AI Intelligent Workflow Application');
  } else if (productType === 'mobile-pwa') {
    basePrice = 2700;
    summary.push('Cross-Platform Mobile Web App (PWA)');
  }

  if (authType === 'rbac') {
    basePrice += 450;
    summary.push('Enterprise RBAC (SuperAdmin, Org, Member)');
  } else {
    summary.push('Standard Supabase / Firebase Auth');
  }

  if (payments === 'stripe-basic') {
    basePrice += 300;
    summary.push('Stripe One-Time Checkout');
  } else if (payments === 'stripe-sub') {
    basePrice += 550;
    deliveryDays += 1;
    summary.push('Stripe Recurring Tier Subscriptions & Webhooks');
  }

  if (database === 'realtime') {
    basePrice += 400;
    summary.push('Live Real-Time WebSockets & Sync Engine');
  } else {
    summary.push('Relational PostgreSQL / Supabase Schema');
  }

  if (aiIntegration === 'gemini') {
    basePrice += 450;
    summary.push('Gemini 2.5 Flash AI API Pipeline');
  } else if (aiIntegration === 'advanced-rag') {
    basePrice += 850;
    deliveryDays += 3;
    summary.push('Vector Embeddings & RAG Document Intelligence');
  }

  if (speed === 'rush') {
    basePrice += 750;
    deliveryDays = Math.max(7, Math.floor(deliveryDays * 0.7));
    summary.push('Priority Rush Engineering (7-9 Days)');
  }

  return (
    <section id="startup-mvp" className="py-20 md:py-28 border-b border-neutral-800/80 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-3">
            <span>Primary Focus</span>
            <span aria-hidden="true">·</span>
            <span>Founder-Grade Engineering</span>
            <span aria-hidden="true">·</span>
            <span>Zero Slop Code</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-100 font-display">
            The 14-Day Custom Startup MVP Sprint
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            Stop waiting 6 months and spending $40,000 with slow traditional agencies. We build your production-ready, investor-grade MVP in 2 weeks with clean, scalable code you own 100%.
          </p>
        </div>

        {/* 4-Phase Sprint Architecture Banner */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="text-xs font-mono text-amber-400 font-semibold mb-1">01. Days 1–3</div>
            <div className="text-sm font-bold text-neutral-100 font-display">Scope & Architecture</div>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Database schema, API routing specs, interactive wireframes, and design system lockup.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="text-xs font-mono text-amber-400 font-semibold mb-1">02. Days 4–8</div>
            <div className="text-sm font-bold text-neutral-100 font-display">Full-Stack Core Build</div>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Next.js 15, PostgreSQL database, authentication, API integrations, and core user workflows.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="text-xs font-mono text-amber-400 font-semibold mb-1">03. Days 9–12</div>
            <div className="text-sm font-bold text-neutral-100 font-display">Billing & Polish</div>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Stripe customer portal, transactional emails, responsive mobile audit, and edge caching.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="text-xs font-mono text-amber-400 font-semibold mb-1">04. Days 13–14</div>
            <div className="text-sm font-bold text-neutral-100 font-display">Launch & Repository Handoff</div>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Production deployment on Vercel/Cloud Run, DNS transfer, GitHub repo ownership, and 30-day warranty.
            </p>
          </div>
        </div>

        {/* Interactive Scope & Price Estimator Box */}
        <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-xl font-bold text-neutral-100 font-display">Interactive MVP Scope & Budget Calculator</h3>
              </div>
              <p className="text-xs text-neutral-400 mt-1">Configure your product requirements to see instantaneous sprint timeline and fixed pricing.</p>
            </div>
            
            {/* Real-time calculated price */}
            <div className="text-right">
              <div className="text-xs text-neutral-400">Guaranteed Fixed Quote</div>
              <div className="text-3xl font-bold text-amber-400 font-display tabular-nums">
                ${basePrice.toLocaleString()}
                <span className="text-xs font-normal text-neutral-400 ml-2">/ ~{deliveryDays} Business Days</span>
              </div>
            </div>
          </div>

          {/* Configuration Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            
            {/* 1. Product Type */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span>1. Core Architecture</span>
              </label>
              <div className="space-y-2">
                {[
                  { id: 'saas', label: 'B2B SaaS Web Application', sub: 'Standard single-tenant SaaS platform' },
                  { id: 'marketplace', label: 'Multi-Role Marketplace', sub: 'Buyers, sellers, admin split dashboards (+$800)' },
                  { id: 'ai-tool', label: 'AI Workflow App', sub: 'Generative AI pipeline & prompts (+$300)' },
                  { id: 'mobile-pwa', label: 'Mobile PWA Platform', sub: 'Native app feel for mobile users (+$100)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setProductType(item.id as any)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-colors ${
                      productType === item.id 
                        ? 'border-amber-400 bg-amber-500/10 text-white font-medium'
                        : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-neutral-200">{item.label}</div>
                    <div className="text-[11px] text-neutral-400">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Monetization & Database */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                <span>2. Monetization & Database</span>
              </label>
              <div className="space-y-2">
                {[
                  { id: 'stripe-sub', label: 'Stripe Subscriptions & Portal', sub: 'Tiered billing, invoices & webhooks (+$550)' },
                  { id: 'stripe-basic', label: 'One-Time Checkout', sub: 'Simple paywall or consultation fee (+$300)' },
                  { id: 'none', label: 'Free / Pre-Revenue Validation', sub: 'Waitlist & self-serve signup (+$0)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPayments(item.id as any)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-colors ${
                      payments === item.id 
                        ? 'border-amber-400 bg-amber-500/10 text-white font-medium'
                        : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-neutral-200">{item.label}</div>
                    <div className="text-[11px] text-neutral-400">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. AI Intelligence & Delivery Speed */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>3. AI Features & Delivery Velocity</span>
              </label>
              <div className="space-y-2">
                {[
                  { id: 'gemini', label: 'Gemini 2.5 Flash Integration', sub: 'Automated synthesis, text generation, insights (+$450)' },
                  { id: 'advanced-rag', label: 'Advanced Vector RAG Engine', sub: 'Custom document search & embeddings (+$850)' },
                  { id: 'none', label: 'No AI Capabilities Needed', sub: 'Standard deterministic application logic (+$0)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAiIntegration(item.id as any)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-colors ${
                      aiIntegration === item.id 
                        ? 'border-amber-400 bg-amber-500/10 text-white font-medium'
                        : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-neutral-200">{item.label}</div>
                    <div className="text-[11px] text-neutral-400">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Includes 30 days post-launch warranty & 100% intellectual property transfer</span>
            </div>

            <button
              onClick={() => onScopeCustomMvp(basePrice, summary)}
              className="flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-xs font-bold text-neutral-950 hover:bg-amber-300 active:scale-[0.98] transition-all shadow-md shadow-amber-400/20 whitespace-nowrap"
            >
              <span>Lock This Scope & Schedule Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
