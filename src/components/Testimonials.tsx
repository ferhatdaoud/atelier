import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      quote: "KZFR delivered our SaaS MVP in exactly 12 days. The code quality, animation finesse, and Supabase integration blew our seed investors away. We raised $1.8M three weeks later.",
      name: "Marcus Vance",
      role: "Co-Founder & CEO",
      company: "OrbitPulse Analytics",
      avatar: "MV",
      rating: "5.0 ★★★★★",
      project: "Startup MVP Sprint"
    },
    {
      quote: "As a private clinic director, I needed clinical authority without technical headaches. KZFR launched our doctor cabinet with patient intake and Calendly sync in 48 hours. Our bookings doubled.",
      name: "Dr. Elena Rostova",
      role: "Chief Medical Officer",
      company: "Sanora Medical Group",
      avatar: "ER",
      rating: "5.0 ★★★★★",
      project: "Doctor Cabinet & Profile"
    },
    {
      quote: "The visual polish and micro-interactions match what you'd expect from a $50k Manhattan design agency. They are our go-to partner for all web engineering and scaling.",
      name: "David Sterling",
      role: "Head of Product",
      company: "Sonder Digital Brand",
      avatar: "DS",
      rating: "5.0 ★★★★★",
      project: "Scalable E-Commerce Web App"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const current = reviews[currentIndex];

  return (
    <section className="py-24 md:py-36 border-t border-white/[0.08] bg-[#080808] relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="text-xs font-mono uppercase text-[#ff6b2c] mb-2 tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b2c]" />
              <span>CLIENT ENDORSEMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Endorsed by Founders.
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:border-[#ff6b2c] hover:text-[#ff6b2c] text-zinc-400 transition-colors"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:border-[#ff6b2c] hover:text-[#ff6b2c] text-zinc-400 transition-colors"
              aria-label="Next Review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="rounded-3xl border border-white/10 glass-card bg-[#0d0d0d] p-8 sm:p-12 relative shadow-2xl transition-all">
          <Quote className="w-12 h-12 text-[#ff6b2c]/20 absolute top-8 right-8" />
          
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ff6b2c]/30 bg-[#ff6b2c]/5 px-3 py-1 text-[11px] font-mono text-[#ff6b2c] mb-6">
            <span>{current.rating}</span>
            <span>·</span>
            <span>{current.project}</span>
          </div>

          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-white font-display leading-snug">
            "{current.quote}"
          </p>

          <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#ff6b2c] text-white font-bold flex items-center justify-center text-sm font-display shadow-md shadow-[#ff6b2c]/20">
              {current.avatar}
            </div>
            <div>
              <div className="text-base font-bold text-white font-display">{current.name}</div>
              <div className="text-xs text-zinc-400">{current.role} · <span className="text-zinc-200">{current.company}</span></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
