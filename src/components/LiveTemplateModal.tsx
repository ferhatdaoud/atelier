import React, { useState } from 'react';
import { TemplateItem } from '../types';
import { X, Monitor, Tablet, Smartphone, ExternalLink, Calendar, CheckCircle2, Star, ShieldCheck, HeartPulse, Clock, Sparkles } from 'lucide-react';

interface LiveTemplateModalProps {
  template: TemplateItem | null;
  onClose: () => void;
  onOrder: (template: TemplateItem) => void;
}

export const LiveTemplateModal: React.FC<LiveTemplateModalProps> = ({
  template,
  onClose,
  onOrder
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  // Interactive states inside the demo preview
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  // Doctor clinic booking state
  const [bookingSpecialty, setBookingSpecialty] = useState('Comprehensive Consultation');
  const [bookingDate, setBookingDate] = useState('Tomorrow, 10:00 AM');
  const [bookingName, setBookingName] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // E-Commerce cart demo state
  const [cartCount, setCartCount] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('Oak & Raw Linen');

  if (!template) return null;

  const viewWidthClass = 
    deviceView === 'mobile' ? 'max-w-[390px]' : 
    deviceView === 'tablet' ? 'max-w-[768px]' : 'w-full';

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-neutral-950/95 backdrop-blur-md overflow-hidden">
      
      {/* Top Control Bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 sm:px-6">
        
        {/* Left: Template info */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
            title="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <div className="text-xs font-semibold text-neutral-100 flex items-center gap-2">
              <span>{template.title}</span>
              <span className="text-neutral-500 font-normal">·</span>
              <span className="text-neutral-400 font-normal text-[11px]">{template.categoryLabel}</span>
            </div>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="hidden sm:flex items-center gap-1 rounded-full border border-white/10 bg-black/60 p-1">
          <button
            onClick={() => setDeviceView('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              deviceView === 'desktop' ? 'bg-[#ff6b2c] text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              deviceView === 'tablet' ? 'bg-[#ff6b2c] text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setDeviceView('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              deviceView === 'mobile' ? 'bg-[#ff6b2c] text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right: Direct Order CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <div className="text-[11px] text-zinc-400 font-mono">Turnaround: {template.turnaroundTime}</div>
            <div className="text-xs font-bold text-white tabular-nums">${template.turnkeyPrice} Turnkey</div>
          </div>
          <button
            onClick={() => onOrder(template)}
            className="rounded-full bg-[#ff6b2c] px-4 py-2 text-xs font-bold text-black hover:bg-[#ff824d] hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            Order This Design
          </button>
        </div>
      </header>

      {/* Interactive Preview Canvas */}
      <main className="flex-1 overflow-y-auto bg-neutral-950 p-4 sm:p-6 flex justify-center items-start">
        <div className={`transition-all duration-300 rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden ${viewWidthClass}`}>
          
          {/* Simulated Browser URL bar */}
          <div className="flex items-center gap-2 border-b border-neutral-800 bg-neutral-950/80 px-4 py-2.5 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto flex max-w-sm flex-1 items-center justify-center rounded bg-neutral-900 px-3 py-1 text-[11px] text-neutral-300 font-mono">
              https://demo.vektora.studio/{template.id}
            </div>
          </div>

          {/* SIMULATED TEMPLATE CONTENT BASED ON DEMO TYPE */}
          {template.demoType === 'saas-mvp' && (
            <div className="bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
              
              {/* SaaS Top Bar */}
              <div className="flex items-center justify-between pb-8 border-b border-neutral-800/80">
                <div className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#ff6b2c] text-neutral-950 flex items-center justify-center font-bold text-xs">P</div>
                  <span>Pulse.ai</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-neutral-400">
                  <span className="hover:text-white cursor-pointer">Platform</span>
                  <span className="hover:text-white cursor-pointer">Solutions</span>
                  <span className="hover:text-white cursor-pointer">Pricing</span>
                  <button className="rounded bg-neutral-800 px-3 py-1.5 text-white hover:bg-neutral-700">Sign In</button>
                </div>
              </div>

              {/* SaaS Hero */}
              <div className="py-12 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 text-xs text-[#ff6b2c] font-medium mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Next-Gen Analytics Engine for High-Growth Startups</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display">
                  Turn user telemetry into validated revenue signals.
                </h2>
                <p className="mt-4 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Real-time pipeline analytics, automated cohort retention, and churn forecasting built natively for fast-moving founders.
                </p>

                {/* Interactive Waitlist / Lead Form */}
                <div className="mt-8 max-w-md mx-auto">
                  {waitlistSubmitted ? (
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4 text-xs text-emerald-300 flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Invitation reserved! Welcome to Pulse.ai private beta.</span>
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => { e.preventDefault(); if (waitlistEmail) setWaitlistSubmitted(true); }}
                      className="flex gap-2"
                    >
                      <input
                        type="email"
                        required
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        placeholder="Enter your work email..."
                        className="flex-1 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-[#ff6b2c] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="rounded-lg bg-[#ff6b2c] px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-[#ff824d]"
                      >
                        Get Access
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Interactive Dashboard UI Showcase */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 mt-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4 text-xs">
                  <div className="font-semibold text-neutral-200">Live Retention Cohort Engine</div>
                  <div className="text-neutral-400">MRR Velocity: <span className="text-emerald-400 font-bold tabular-nums">+$18,420 (94.2%)</span></div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-3 bg-neutral-950/60 rounded-lg border border-neutral-800/80">
                    <div className="text-[11px] text-neutral-400">Monthly Active Users</div>
                    <div className="text-lg font-bold text-white tabular-nums mt-1">42,891</div>
                  </div>
                  <div className="p-3 bg-neutral-950/60 rounded-lg border border-neutral-800/80">
                    <div className="text-[11px] text-neutral-400">Net Retention Rate</div>
                    <div className="text-lg font-bold text-emerald-400 tabular-nums mt-1">128.4%</div>
                  </div>
                  <div className="p-3 bg-neutral-950/60 rounded-lg border border-neutral-800/80">
                    <div className="text-[11px] text-neutral-400">Average Contract Value</div>
                    <div className="text-lg font-bold text-white tabular-nums mt-1">$4,850/yr</div>
                  </div>
                </div>

                {/* Simulated Chart Bars */}
                <div className="h-28 flex items-end gap-2 pt-4 px-2 bg-neutral-950/40 rounded-lg">
                  {[40, 55, 48, 65, 78, 85, 92, 110, 130, 145, 170, 195].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                      <div 
                        style={{ height: `${h * 0.45}px` }} 
                        className="w-full bg-[#ff6b2c]/80 group-hover:bg-[#ff824d] rounded-t transition-all"
                      />
                      <span className="text-[9px] text-neutral-500 font-mono">W{i+1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Pricing Toggle */}
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 p-1 bg-neutral-900 rounded-lg border border-neutral-800 text-xs">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-3 py-1 rounded transition-colors ${billingCycle === 'monthly' ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('annual')}
                    className={`px-3 py-1 rounded transition-colors ${billingCycle === 'annual' ? 'bg-neutral-800 text-[#ff6b2c] font-medium' : 'text-neutral-400'}`}
                  >
                    Annual (Save 20%)
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-left max-w-xl mx-auto">
                  <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5">
                    <div className="text-sm font-semibold text-white">Starter Founder</div>
                    <div className="text-2xl font-bold text-white mt-2 tabular-nums">
                      ${billingCycle === 'annual' ? '39' : '49'}<span className="text-xs text-neutral-400">/mo</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-2">Up to 10k monthly active users with full analytics.</p>
                  </div>
                  <div className="rounded-xl border border-[#ff6b2c]/50 bg-neutral-900/80 p-5">
                    <div className="text-sm font-semibold text-[#ff6b2c]">Growth Scale</div>
                    <div className="text-2xl font-bold text-white mt-2 tabular-nums">
                      ${billingCycle === 'annual' ? '99' : '119'}<span className="text-xs text-neutral-400">/mo</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-2">Unlimited tracking, AI forecasting, and dedicated webhook pipeline.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* SIMULATED DOCTOR & CLINIC PREVIEW */}
          {template.demoType === 'doctor-clinic' && (
            <div className="bg-[#FAF9F5] text-neutral-900 p-6 sm:p-10 font-sans">
              
              {/* Doctor Header */}
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-emerald-700" />
                  <span className="font-bold tracking-tight text-neutral-900 font-display">Sanora Medical Cabinet</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-neutral-600">
                  <span className="hidden sm:inline">Mon–Fri: 08:30 – 18:00</span>
                  <a href="#book" className="rounded-lg bg-emerald-800 px-3 py-1.5 text-white font-medium text-xs hover:bg-emerald-700">
                    Book Visit
                  </a>
                </div>
              </div>

              {/* Clinic Hero */}
              <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
                    Board-Certified Practitioners · Zurich & Lausanne
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 font-display leading-snug">
                    Specialized, evidence-based care tailored to your longevity.
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Combining advanced diagnostic equipment with attentive, empathetic consultations in our private modern clinic.
                  </p>
                  
                  <div className="mt-6 flex items-center gap-4 text-xs text-neutral-700">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Swiss Medical Board Certified</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>4.9 / 5.0 (310+ Patients)</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Bio Card */}
                <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center font-bold text-emerald-800 text-lg">
                      DR
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900">Dr. Marc Laurent, MD</h4>
                      <p className="text-xs text-emerald-700 font-medium">Head of Internal Medicine & Preventive Health</p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">Faculty of Medicine, University of Geneva</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100 text-xs text-neutral-600">
                    "Our focus is identifying subtle physiological shifts years before they manifest as chronic conditions."
                  </div>
                </div>
              </div>

              {/* Interactive Booking Module */}
              <div id="book" className="mt-6 rounded-xl border border-emerald-900/10 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-neutral-900 font-display mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  <span>Interactive Patient Appointment Intake</span>
                </h3>
                <p className="text-xs text-neutral-500 mb-4">Experience the real patient booking journey provided in this template:</p>

                {bookingConfirmed ? (
                  <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-5 text-center text-xs text-emerald-900">
                    <CheckCircle2 className="w-6 h-6 text-emerald-700 mx-auto mb-2" />
                    <div className="font-bold text-sm">Consultation Requested Successfully!</div>
                    <div className="mt-1 text-emerald-700">
                      Appointment set for <strong>{bookingName || 'Patient'}</strong> on <strong>{bookingDate}</strong> for <strong>{bookingSpecialty}</strong>.
                    </div>
                    <button
                      onClick={() => setBookingConfirmed(false)}
                      className="mt-3 text-xs text-emerald-800 underline font-medium"
                    >
                      Book Another Test Session
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Select Specialty</label>
                      <select
                        value={bookingSpecialty}
                        onChange={(e) => setBookingSpecialty(e.target.value)}
                        className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-emerald-600 focus:outline-none"
                      >
                        <option>Comprehensive Preventive Checkup</option>
                        <option>Cardiovascular Consultation</option>
                        <option>Dermatology & Skin Screening</option>
                        <option>General Dental Inspection</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Preferred Time Slot</label>
                      <select
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-emerald-600 focus:outline-none"
                      >
                        <option>Tomorrow, 10:00 AM</option>
                        <option>Tomorrow, 02:30 PM</option>
                        <option>Thursday, 11:15 AM</option>
                        <option>Friday, 09:00 AM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Your Full Name</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. Sarah Jenkins"
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-emerald-600 focus:outline-none"
                        />
                        <button
                          onClick={() => setBookingConfirmed(true)}
                          className="rounded-lg bg-emerald-800 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-700 whitespace-nowrap"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* SIMULATED E-COMMERCE / ARCHITECT PREVIEW */}
          {(template.demoType === 'ecommerce-luxury' || template.demoType === 'architect-bespoke') && (
            <div className="bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
              <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
                <span className="font-bold tracking-widest uppercase text-xs text-neutral-300">
                  {template.title}
                </span>
                <div className="text-xs text-neutral-400 flex items-center gap-3">
                  <span>Cart ({cartCount})</span>
                </div>
              </div>

              <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="aspect-[4/3] rounded-lg overflow-hidden border border-neutral-800">
                  <img
                    src={template.image}
                    alt={template.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 mb-1">Curated Series · 2026 Collection</div>
                  <h3 className="text-2xl font-bold font-display text-white">{template.subtitle}</h3>
                  <p className="mt-3 text-xs text-neutral-400 leading-relaxed">{template.description}</p>
                  
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => setCartCount(c => c + 1)}
                      className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-neutral-950 hover:bg-[#ff6b2c] transition-colors"
                    >
                      Test Interactive Action (+{cartCount})
                    </button>
                    <span className="text-xs text-neutral-400">Click to test live reactivity</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
};
