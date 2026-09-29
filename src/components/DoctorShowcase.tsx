import React from 'react';
import { HeartPulse, CalendarCheck, ShieldCheck, Stethoscope, PhoneCall, ArrowRight, Eye } from 'lucide-react';
import { TemplateItem } from '../types';

interface DoctorShowcaseProps {
  doctorTemplate: TemplateItem | undefined;
  onOpenDemo: (template: TemplateItem) => void;
  onOrderTemplate: (template: TemplateItem) => void;
}

export const DoctorShowcase: React.FC<DoctorShowcaseProps> = ({
  doctorTemplate,
  onOpenDemo,
  onOrderTemplate
}) => {
  return (
    <section id="doctor-cabinets" className="py-20 md:py-28 border-b border-neutral-800/80 bg-neutral-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-3">
            <span>Specialized Healthcare Vertical</span>
            <span aria-hidden="true">·</span>
            <span>48h Turnaround</span>
            <span aria-hidden="true">·</span>
            <span>Zero Tech Headaches</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-100 font-display">
            Medical Cabinets & Doctor Practice Websites
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            Most doctors have outdated websites that lose patients before they ever step through the clinic door. We build serene, trustworthy, mobile-first websites with direct appointment scheduling in 48 hours.
          </p>
        </div>

        {/* Feature Grid for Medical Cabinets */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-neutral-100 font-display">Frictionless Patient Booking</h4>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Patients select their specialty, pick an available slot, and receive instant confirmation. Routed directly to your reception desk or Google/Outlook calendar.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-neutral-100 font-display">Credential & Authority Presentation</h4>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Highlight your medical degrees, board certifications, peer-reviewed clinical history, and accepted insurance providers with unmistakable professionalism.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-neutral-100 font-display">Urgent Patient Care & WhatsApp</h4>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              One-tap calling and WhatsApp direct dispatch for emergency inquiries, pediatric urgency, or after-hours clinical guidance.
            </p>
          </div>
        </div>

        {/* Doctor Template Showcase Spotlight */}
        {doctorTemplate && (
          <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2 aspect-[4/3] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900">
              <img
                src={doctorTemplate.image}
                alt={doctorTemplate.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-between">
              <div>
                <div className="text-xs text-emerald-400 font-medium mb-1">Featured Turnkey Solution for Healthcare</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-100 font-display">
                  {doctorTemplate.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {doctorTemplate.description}
                </p>

                <div className="mt-6 space-y-2 border-t border-neutral-800/80 pt-4">
                  {doctorTemplate.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <Stethoscope className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-neutral-400">Turnkey Fixed Price (Live in 48h)</div>
                  <div className="text-2xl font-bold text-neutral-100 font-display tabular-nums">
                    ${doctorTemplate.turnkeyPrice}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenDemo(doctorTemplate)}
                    className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-neutral-200 hover:border-neutral-500 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live Interactive Demo</span>
                  </button>

                  <button
                    onClick={() => onOrderTemplate(doctorTemplate)}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-neutral-950 hover:bg-emerald-400 transition-colors whitespace-nowrap"
                  >
                    <span>Order for Your Clinic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
