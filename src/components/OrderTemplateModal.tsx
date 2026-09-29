import React, { useState, useEffect } from 'react';
import { TemplateItem, ClientOrder } from '../types';
import { ORDER_ADDONS } from '../data/templates';
import { X, Check, ArrowRight, ShieldCheck, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface OrderTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplate: TemplateItem | null;
  isCustomMvpMode?: boolean;
  customScopeTotal?: number;
  customScopeSummary?: string[];
  onOrderSubmitted: (order: ClientOrder) => void;
}

export const OrderTemplateModal: React.FC<OrderTemplateModalProps> = ({
  isOpen,
  onClose,
  selectedTemplate,
  isCustomMvpMode = false,
  customScopeTotal = 3200,
  customScopeSummary = [],
  onOrderSubmitted
}) => {
  const [step, setStep] = useState<'configure' | 'details' | 'success'>('configure');
  const [tier, setTier] = useState<'turnkey' | 'raw'>('turnkey');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['brand-colors']);
  
  // Client details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [hasBranding, setHasBranding] = useState<'ready' | 'need-logo' | 'complete-rebrand'>('ready');
  const [timeline, setTimeline] = useState('Within 48-72 hours');
  const [notes, setNotes] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<ClientOrder | null>(null);

  // Reset or configure when opened
  useEffect(() => {
    if (isOpen) {
      setStep('configure');
      setTier('turnkey');
      setSelectedAddons(['brand-colors']);
      setSubmittedOrder(null);
    }
  }, [isOpen, selectedTemplate, isCustomMvpMode]);

  if (!isOpen) return null;

  // Calculate pricing
  const basePrice = isCustomMvpMode 
    ? customScopeTotal 
    : (tier === 'turnkey' ? (selectedTemplate?.turnkeyPrice || 750) : (selectedTemplate?.rawPrice || 199));

  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const addon = ORDER_ADDONS.find(a => a.id === addonId);
    return acc + (addon ? addon.price : 0);
  }, 0);

  const totalPrice = basePrice + (isCustomMvpMode ? 0 : addonsTotal);

  const toggleAddon = (id: string) => {
    if (id === 'brand-colors' && tier === 'turnkey') return; // Always included free
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !companyName) return;

    const newOrder: ClientOrder = {
      id: `VK-${Math.floor(1000 + Math.random() * 9000)}`,
      orderType: isCustomMvpMode ? 'custom-mvp' : 'template',
      templateId: selectedTemplate?.id,
      templateTitle: isCustomMvpMode ? 'Custom Startup MVP Build' : selectedTemplate?.title,
      tier: isCustomMvpMode ? 'custom-sprint' : tier,
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
              {isCustomMvpMode ? 'Custom MVP Engagement' : 'Productized Template Order'}
            </div>
            <h2 className="text-base font-bold text-neutral-100 font-display">
              {isCustomMvpMode ? 'Scope & Kickoff Custom MVP' : `Order ${selectedTemplate?.title || 'Template'}`}
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
              
              {/* Product overview banner */}
              {!isCustomMvpMode && selectedTemplate && (
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
                    <div className="mt-1 text-[11px] text-amber-400 font-medium">Turnaround: {selectedTemplate.turnaroundTime}</div>
                  </div>
                </div>
              )}

              {/* Custom MVP Scoping summary banner */}
              {isCustomMvpMode && (
                <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4">
                  <div className="text-xs font-semibold text-neutral-200">Custom 14-Day MVP Sprint Selected:</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {customScopeSummary.length > 0 ? (
                      customScopeSummary.map((item, i) => (
                        <span key={i} className="text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-neutral-400">Full-stack React/Node MVP, Supabase database, responsive UI</span>
                    )}
                  </div>
                </div>
              )}

              {/* TIER SELECTION (FOR TEMPLATES) */}
              {!isCustomMvpMode && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Choose Service Tier</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Option 1: Turnkey (Recommended) */}
                    <div
                      onClick={() => setTier('turnkey')}
                      className={`cursor-pointer rounded-xl border p-4 transition-all ${
                        tier === 'turnkey'
                          ? 'border-amber-400 bg-amber-500/5 ring-1 ring-amber-400'
                          : 'border-neutral-800 bg-neutral-950/40 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Turnkey Customization</span>
                        <span className="text-sm font-bold text-amber-400 tabular-nums">
                          ${selectedTemplate?.turnkeyPrice || 750}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
                        We insert your branding, logos, copy, images, and launch it live in {selectedTemplate?.turnaroundTime || '48h'}.
                      </p>
                      <div className="mt-3 text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                        <Check className="w-3.5 h-3.5" />
                        <span>Zero code required by you</span>
                      </div>
                    </div>

                    {/* Option 2: Raw Codebase */}
                    <div
                      onClick={() => setTier('raw')}
                      className={`cursor-pointer rounded-xl border p-4 transition-all ${
                        tier === 'raw'
                          ? 'border-amber-400 bg-amber-500/5 ring-1 ring-amber-400'
                          : 'border-neutral-800 bg-neutral-950/40 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Raw Source Codebase</span>
                        <span className="text-sm font-bold text-neutral-200 tabular-nums">
                          ${selectedTemplate?.rawPrice || 199}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
                        Clean Next.js 15 + Tailwind CSS repo with TypeScript & setup documentation.
                      </p>
                      <div className="mt-3 text-[11px] text-neutral-400 flex items-center gap-1">
                        <span>For developers building their own stack</span>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* OPTIONAL ADDONS (FOR TEMPLATES) */}
              {!isCustomMvpMode && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Optional Integrations & Add-ons</label>
                  <div className="space-y-2">
                    {ORDER_ADDONS.map((addon) => {
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
                            {addon.price === 0 ? 'Included' : `+$${addon.price}`}
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
                <span>Summary: {isCustomMvpMode ? 'Custom MVP' : selectedTemplate?.title} ({tier})</span>
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
