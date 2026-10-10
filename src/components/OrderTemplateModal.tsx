import React, { useState, useEffect } from 'react';
import { TemplateItem, ClientOrder } from '../types';
import { X, Check, ArrowRight, CheckCircle2 } from 'lucide-react';

interface OrderTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplate: TemplateItem | null;
  initialPackage?: 'landing' | 'mvp' | 'full-app';
  onOrderSubmitted: (order: ClientOrder) => void;
}

export const OrderTemplateModal: React.FC<OrderTemplateModalProps> = ({
  isOpen,
  onClose,
  selectedTemplate,
  initialPackage = 'mvp',
  onOrderSubmitted
}) => {
  const [step, setStep] = useState<'configure' | 'details' | 'success'>('configure');
  const [packageType, setPackageType] = useState<'landing' | 'mvp' | 'full-app'>('mvp');
  
  // Client details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [hasBranding, setHasBranding] = useState<'ready' | 'need-logo' | 'complete-rebrand'>('ready');
  const [timeline, setTimeline] = useState('Within 3–7 days');
  const [notes, setNotes] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<ClientOrder | null>(null);

  // Reset or configure when opened
  useEffect(() => {
    if (isOpen) {
      setStep('configure');
      setPackageType(initialPackage);
      setSubmittedOrder(null);
      if (initialPackage === 'landing') {
        setTimeline('48–72 Hours');
      } else if (initialPackage === 'mvp') {
        setTimeline('3–7 Days');
      } else {
        setTimeline('3–4 Weeks');
      }
    }
  }, [isOpen, selectedTemplate, initialPackage]);

  if (!isOpen) return null;

  // Calculate pricing based on package
  let basePrice = 30000;
  if (packageType === 'landing') {
    basePrice = 12000;
  } else if (packageType === 'mvp') {
    basePrice = 30000;
  } else if (packageType === 'full-app') {
    basePrice = 60000;
  }

  const totalPrice = basePrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !companyName) return;

    const packageNames = {
      landing: 'High-Converting Landing Page',
      mvp: 'Startup MVP Sprint',
      'full-app': 'Full Scalable Web Application (Auth, DB, Cloud Hosting, Domain)'
    };

    const newOrder: ClientOrder = {
      id: `VK-${Math.floor(1000 + Math.random() * 9000)}`,
      orderType: 'package',
      templateId: selectedTemplate?.id,
      templateTitle: selectedTemplate ? `${packageNames[packageType]} (${selectedTemplate.title})` : packageNames[packageType],
      tier: packageType,
      clientName,
      clientEmail,
      companyName,
      industry: industry || (selectedTemplate?.categoryLabel || 'General Business'),
      hasBranding,
      timeline,
      selectedAddons: [],
      totalPrice,
      notes,
      status: 'In Review',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setSubmittedOrder(newOrder);
    onOrderSubmitted(newOrder);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950/60 px-6 py-4">
          <div>
            <div className="text-xs font-medium text-amber-400">
              Project Onboarding & Scope
            </div>
            <h2 className="text-base font-bold text-neutral-100 font-display">
              {packageType === 'landing' ? 'High-Converting Landing Page' :
               packageType === 'mvp' ? 'Startup MVP Sprint' : 
               'Full Scalable Web Application'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: CONFIGURE */}
          {step === 'configure' && (
            <div className="space-y-6">
              
              {/* Product overview banner if template was chosen */}
              {selectedTemplate && (
                <div className="flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-950/40 p-4">
                  <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950">
                    <img
                      src={selectedTemplate.image}
                      alt={selectedTemplate.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-100 font-display">{selectedTemplate.title}</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">{selectedTemplate.subtitle}</p>
                    <div className="mt-1 text-[11px] text-amber-400 font-medium">Selected Design Benchmark</div>
                  </div>
                </div>
              )}

              {/* PACKAGE SELECTION (THE 3 CORE PACKAGES) */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2">Choose Investment Package</label>
                <div className="space-y-3">
                  
                  {/* Package 1: Landing Page */}
                  <div
                    onClick={() => { setPackageType('landing'); setTimeline('48–72 Hours'); }}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      packageType === 'landing'
                        ? 'border-[#ff6b2c] bg-[#ff6b2c]/10 ring-1 ring-[#ff6b2c]'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
<div className="flex items-center justify-between">
                       <div>
                         <span className="text-xs font-bold text-white">01. High-Converting Landing Page</span>
                         <div className="text-[11px] text-zinc-400 mt-0.5">Clinics, Cabinets, Waitlists, & Portfolios</div>
                       </div>
                       <span className="text-sm font-bold text-[#ff6b2c] tabular-nums">12,000 DA</span>
                     </div>
                     <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                       Custom tailored responsive design, lead form, and local SEO setup in 48–72h.
                     </p>
                  </div>

                  {/* Package 2: Startup MVP Sprint */}
                  <div
                    onClick={() => { setPackageType('mvp'); setTimeline('3–7 Days'); }}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      packageType === 'mvp'
                        ? 'border-[#ff6b2c] bg-[#ff6b2c]/10 ring-1 ring-[#ff6b2c]'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">02. Startup MVP Sprint</span>
                          <span className="text-[10px] font-bold text-white bg-[#ff6b2c] px-2 py-0.5 rounded-full">Core Target</span>
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">Rapid 3–7 day build for early validation & pitching</div>
                      </div>
                      <span className="text-sm font-bold text-[#ff6b2c] tabular-nums">
                        30000 DA
                      </span>
                    </div>
<p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                       Core user workflows, Next.js 15 + Tailwind stack, Chargili payments/checkout, interactive analytics or user journey, and 100% GitHub code transfer.
                     </p>
                  </div>

                  {/* Package 3: Full Scalable Web Application */}
                  <div
                    onClick={() => { setPackageType('full-app'); setTimeline('3–4 Weeks'); }}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      packageType === 'full-app'
                        ? 'border-[#ff6b2c] bg-[#ff6b2c]/10 ring-1 ring-[#ff6b2c]'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white">03. Full Scalable Web Application</span>
                        <div className="text-[11px] text-zinc-400 mt-0.5">Production-ready platform & SaaS</div>
                      </div>
                      <span className="text-sm font-bold text-[#ff6b2c] tabular-nums">60,000+ DA</span>
                    </div>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                      Complete architecture with Multi-user Login Auth, Scalable PostgreSQL/Supabase Database, Cloud Image & Asset Hosting, Custom Domain with Global CDN, and Chargili Subscriptions.
                    </p>
                  </div>

                </div>
              </div>

              {/* Total Calculation & Next Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400">Total Project Estimate</div>
                  <div className="text-2xl font-bold text-white font-display tabular-nums">
                    {totalPrice.toLocaleString()} DA
                  </div>
                </div>

                <button
                  onClick={() => setStep('details')}
                  className="flex items-center gap-2 rounded-full bg-[#ff6b2c] px-6 py-3 text-xs font-bold text-white hover:bg-[#ff824d] hover:shadow-[0_0_20px_rgba(255,107,44,0.4)] transition-all"
                >
                  <span>Continue to Project Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Alex Henderson"
                    className="w-full rounded-xl border border-white/15 bg-black px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#ff6b2c] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full rounded-xl border border-white/15 bg-black px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#ff6b2c] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Company or Practice Name *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Health Clinic / Pulse AI"
                    className="w-full rounded-xl border border-white/15 bg-black px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#ff6b2c] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Industry / Niche</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Medical Clinic, SaaS, Fintech, Law"
                    className="w-full rounded-xl border border-white/15 bg-black px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#ff6b2c] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Do you have branding & copy?</label>
                  <select
                    value={hasBranding}
                    onChange={(e) => setHasBranding(e.target.value as any)}
                    className="w-full rounded-xl border border-white/15 bg-black px-3.5 py-2.5 text-xs text-white focus:border-[#ff6b2c] focus:outline-none"
                  >
                    <option value="ready">Yes, logo and content are ready</option>
                    <option value="need-logo">I need logo / brand colors created</option>
                    <option value="complete-rebrand">I need full copywriting and branding</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Target Launch Timeline</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black px-3.5 py-2.5 text-xs text-white focus:border-[#ff6b2c] focus:outline-none"
                  >
                    <option>Within 48-72 hours (Rush)</option>
                    <option>Within 1-2 weeks</option>
                    <option>Within 1 month</option>
                    <option>Flexible / Exploring options</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Project Notes or Specific Needs</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share any details, special integrations (e.g. Calendly, Chargili, WhatsApp), or links to your current website/docs..."
                  className="w-full rounded-xl border border-white/15 bg-black px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#ff6b2c] focus:outline-none resize-none"
                />
              </div>

              {/* Order total confirmation */}
              <div className="rounded-xl bg-black border border-white/15 p-4 flex items-center justify-between text-xs text-zinc-300">
                <span>
                  Summary: {selectedTemplate?.title || 'Custom Scope'} · {
                    packageType === 'landing' ? 'Landing Page' : 
                    packageType === 'mvp' ? 'Startup MVP' : 
                    'Full Scalable App'
                  }
                </span>
                <span className="font-bold text-[#ff6b2c] text-sm tabular-nums">${totalPrice}</span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('configure')}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  Back to options
                </button>

                <button
                  type="submit"
                  className="rounded-full bg-[#ff6b2c] px-7 py-3 text-xs font-bold text-white hover:bg-[#ff824d] hover:shadow-[0_0_25px_rgba(255,107,44,0.4)] transition-all"
                >
                  Submit Order & Receive Kickoff
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && submittedOrder && (
            <div className="text-center py-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ff6b2c]/10 border border-[#ff6b2c]/30 text-[#ff6b2c] mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-white font-display">
                Order Ticket #{submittedOrder.id} Received!
              </h3>
              <p className="mt-2 text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{submittedOrder.clientName}</strong>. We have logged your request for <strong>{submittedOrder.companyName}</strong>. 
                Our engineering team will review your specifications and email you the kickoff invite and contract within 4 business hours.
              </p>

              {/* Ticket receipt box */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/90 p-5 max-w-md mx-auto text-left text-xs space-y-2.5 font-mono">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-zinc-500">Project:</span>
                  <span className="font-semibold text-white">{submittedOrder.templateTitle}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-zinc-500">Target Delivery:</span>
                  <span className="text-zinc-200">{submittedOrder.timeline}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-zinc-500">Fixed Budget:</span>
                  <span className="font-bold text-[#ff6b2c] tabular-nums">${submittedOrder.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Status:</span>
                  <span className="text-[#ff6b2c] font-medium">{submittedOrder.status}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="rounded-full bg-white/10 border border-white/15 px-6 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
