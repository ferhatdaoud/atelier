import React, { useState, useEffect } from 'react';
import { TemplateItem, ClientOrder } from '../types';
import { ORDER_ADDONS } from '../data/templates';
import { X, Check, ArrowRight, ShieldCheck, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface OrderTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplate: TemplateItem | null;
  initialPackage?: 'landing' | 'mvp' | 'full-app';
  isCustomMvpMode?: boolean;
  customScopeTotal?: number;
  customScopeSummary?: string[];
  onOrderSubmitted: (order: ClientOrder) => void;
}

export const OrderTemplateModal: React.FC<OrderTemplateModalProps> = ({
  isOpen,
  onClose,
  selectedTemplate,
  initialPackage = 'mvp',
  isCustomMvpMode = false,
  customScopeTotal = 1850,
  customScopeSummary = [],
  onOrderSubmitted
}) => {
  const [step, setStep] = useState<'configure' | 'details' | 'success'>('configure');
  const [packageType, setPackageType] = useState<'landing' | 'mvp' | 'full-app'>('mvp');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['brand-colors']);
  
  // Client details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [hasBranding, setHasBranding] = useState<'ready' | 'need-logo' | 'complete-rebrand'>('ready');
  const [timeline, setTimeline] = useState('Within 10–14 days');
  const [notes, setNotes] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<ClientOrder | null>(null);

  // Reset or configure when opened
  useEffect(() => {
    if (isOpen) {
      setStep('configure');
      setPackageType(initialPackage);
      setSelectedAddons(['brand-colors']);
      setSubmittedOrder(null);
      if (initialPackage === 'landing') {
        setTimeline('48–72 Hours');
      } else if (initialPackage === 'mvp') {
        setTimeline('10–14 Days');
      } else {
        setTimeline('3–4 Weeks');
      }
    }
  }, [isOpen, selectedTemplate, isCustomMvpMode, initialPackage]);

  if (!isOpen) return null;

  // Calculate pricing based on package
  let basePrice = 1850;
  if (packageType === 'landing') {
    basePrice = 590;
  } else if (packageType === 'mvp') {
    basePrice = isCustomMvpMode ? customScopeTotal : 1850;
  } else if (packageType === 'full-app') {
    basePrice = 3600;
  }

  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    if (addonId === 'brand-colors') return acc;
    const addon = ORDER_ADDONS.find(a => a.id === addonId);
    return acc + (addon ? addon.price : 0);
  }, 0);

  const totalPrice = basePrice + (packageType === 'full-app' ? 0 : addonsTotal);

  const toggleAddon = (id: string) => {
    if (id === 'brand-colors') return; // Always included
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

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
      selectedAddons,
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
                <label className="block text-xs font-semibold text-neutral-300 mb-2">Choose Investment Package</label>
                <div className="space-y-3">
                  
                  {/* Package 1: Landing Page */}
                  <div
                    onClick={() => { setPackageType('landing'); setTimeline('48–72 Hours'); }}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      packageType === 'landing'
                        ? 'border-amber-400 bg-amber-500/10 ring-1 ring-amber-400'
                        : 'border-neutral-800 bg-neutral-950/40 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white">01. High-Converting Landing Page</span>
                        <div className="text-[11px] text-neutral-400 mt-0.5">Clinics, Cabinets, Waitlists, & Portfolios</div>
                      </div>
                      <span className="text-sm font-bold text-amber-400 tabular-nums">$590</span>
                    </div>
                    <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                      Custom tailored responsive design, appointment booking / lead form, custom domain with SSL, and local SEO setup in 48–72h.
                    </p>
                  </div>

                  {/* Package 2: Startup MVP Sprint */}
                  <div
                    onClick={() => { setPackageType('mvp'); setTimeline('10–14 Days'); }}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      packageType === 'mvp'
                        ? 'border-amber-400 bg-amber-500/10 ring-1 ring-amber-400'
                        : 'border-neutral-800 bg-neutral-950/40 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">02. Startup MVP Sprint</span>
                          <span className="text-[10px] font-bold text-neutral-950 bg-amber-400 px-1.5 py-0.2 rounded">Core Target</span>
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">Rapid 10–14 day build for early validation & pitching</div>
                      </div>
                      <span className="text-sm font-bold text-amber-400 tabular-nums">
                        ${isCustomMvpMode ? customScopeTotal : 1850}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                      Core user workflows, Next.js 15 + Tailwind stack, Stripe payments/checkout, interactive analytics or user journey, and 100% GitHub code transfer.
                    </p>
                  </div>

                  {/* Package 3: Full Scalable Web Application */}
                  <div
                    onClick={() => { setPackageType('full-app'); setTimeline('3–4 Weeks'); }}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      packageType === 'full-app'
                        ? 'border-amber-400 bg-amber-500/10 ring-1 ring-amber-400'
                        : 'border-neutral-800 bg-neutral-950/40 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white">03. Full Scalable Web Application</span>
                        <div className="text-[11px] text-neutral-400 mt-0.5">Production-ready platform & SaaS</div>
                      </div>
                      <span className="text-sm font-bold text-amber-400 tabular-nums">$3,600+</span>
                    </div>
                    <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                      Complete architecture with Multi-user Login Auth, Scalable PostgreSQL/Supabase Database, Cloud Image & Asset Hosting, Custom Domain with Global CDN, and Stripe Subscriptions.
                    </p>
                  </div>

                </div>
              </div>

              {/* OPTIONAL ADDONS */}
              {packageType !== 'full-app' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Optional Integrations</label>
                  <div className="space-y-2">
                    {ORDER_ADDONS.filter(a => a.id !== 'brand-colors').map((addon) => {
                      const isSelected = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`flex items-start justify-between rounded-lg border p-3 cursor-pointer transition-colors ${
                            isSelected
                              ? 'border-amber-400/60 bg-neutral-900'
                              : 'border-neutral-800 bg-neutral-950/30 hover:border-neutral-700'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded border ${
                              isSelected ? 'border-amber-400 bg-amber-400 text-neutral-950' : 'border-neutral-600'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <div>
                              <div className="text-xs font-medium text-neutral-200">{addon.label}</div>
                              <div className="text-[11px] text-neutral-400 leading-tight">{addon.description}</div>
                            </div>
                          </div>
                          <div className="text-xs font-semibold text-neutral-300 tabular-nums shrink-0 ml-3">
                            +${addon.price}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Total Calculation & Next Button */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-neutral-400">Total Project Estimate</div>
                  <div className="text-2xl font-bold text-neutral-100 font-display tabular-nums">
                    ${totalPrice}
                  </div>
                </div>

                <button
                  onClick={() => setStep('details')}
                  className="flex items-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-xs font-semibold text-neutral-950 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20"
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
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Alex Henderson"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Company or Practice Name *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Health Clinic / Pulse AI"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Industry / Niche</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Medical Clinic, SaaS, Fintech, Law"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Do you have branding & copy?</label>
                  <select
                    value={hasBranding}
                    onChange={(e) => setHasBranding(e.target.value as any)}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 focus:border-amber-400 focus:outline-none"
                  >
                    <option value="ready">Yes, logo and content are ready</option>
                    <option value="need-logo">I need logo / brand colors created</option>
                    <option value="complete-rebrand">I need full copywriting and branding</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Target Launch Timeline</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 focus:border-amber-400 focus:outline-none"
                  >
                    <option>Within 48-72 hours (Rush)</option>
                    <option>Within 1-2 weeks</option>
                    <option>Within 1 month</option>
                    <option>Flexible / Exploring options</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Project Notes or Specific Needs</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share any details, special integrations (e.g. Calendly, Stripe, WhatsApp), or links to your current website/docs..."
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-amber-400 focus:outline-none resize-none"
                />
              </div>

              {/* Order total confirmation */}
              <div className="rounded-lg bg-neutral-950/70 border border-neutral-800 p-3 flex items-center justify-between text-xs text-neutral-300">
                <span>
                  Summary: {selectedTemplate?.title || 'Custom Scope'} · {
                    packageType === 'landing' ? 'Landing Page' : 
                    packageType === 'mvp' ? 'Startup MVP' : 
                    'Full Scalable App'
                  }
                </span>
                <span className="font-bold text-amber-400 tabular-nums">${totalPrice}</span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('configure')}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Back to options
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-amber-400 px-6 py-2.5 text-xs font-semibold text-neutral-950 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20"
                >
                  Submit Order & Receive Kickoff
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && submittedOrder && (
            <div className="text-center py-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-neutral-100 font-display">
                Order Ticket #{submittedOrder.id} Received!
              </h3>
              <p className="mt-2 text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{submittedOrder.clientName}</strong>. We have logged your request for <strong>{submittedOrder.companyName}</strong>. 
                Our engineering team will review your specifications and email you the kickoff invite and contract within 4 business hours.
              </p>

              {/* Ticket receipt box */}
              <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950/80 p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-neutral-800/80 pb-2">
                  <span className="text-neutral-400">Project:</span>
                  <span className="font-semibold text-neutral-200">{submittedOrder.templateTitle}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800/80 pb-2">
                  <span className="text-neutral-400">Target Delivery:</span>
                  <span className="text-neutral-200">{submittedOrder.timeline}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800/80 pb-2">
                  <span className="text-neutral-400">Fixed Budget:</span>
                  <span className="font-bold text-amber-400 tabular-nums">${submittedOrder.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Status:</span>
                  <span className="text-emerald-400 font-medium">{submittedOrder.status}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="rounded-lg bg-neutral-800 px-5 py-2.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition-colors"
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
