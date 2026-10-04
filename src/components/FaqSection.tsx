import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We specialize in two core offerings: Rapid 3–7 day Startup MVPs (Next.js 15, Stripe, user auth, database) and high-converting websites for people (doctors, clinics, private practices, and modern brands). We also engineer full scalable web applications with complete cloud infrastructure."
    },
    {
      question: "How long does a typical project take?",
      answer: "High-Converting Websites & Doctor Cabinets are delivered live turnkey in 48 to 72 hours. Startup MVPs are engineered in a focused 3 to 7-day sprint. Full scalable applications take 3 to 4 weeks depending on database schemas and integrations."
    },
    {
      question: "Can you work with existing brands and websites?",
      answer: "Yes, absolutely. We can redesign existing products, migrate legacy stacks to Next.js 15 and Tailwind CSS, or build out new features and user journeys on top of your existing design system."
    },
    {
      question: "Do you provide custom solutions or use templates?",
      answer: "Both. We design bespoke solutions from the ground up for custom clients, and we also provide battle-tested, high-converting architecture templates that allow us to launch investor-ready products in record time at accessible pricing."
    },
    {
      question: "What is your design process?",
      answer: "We follow an agile, high-velocity process: 1) Strategy & Wireframing (Day 1), 2) High-fidelity interactive UI in Figma (Day 2), 3) Full-stack implementation in React/Next.js with zero placeholder slop (Days 3–5), and 4) Polish, SEO, and deployment handover."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-36 bg-[#000000] relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header matching screenshot */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight">
            Questions?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans">
            Find answers to the most common questions about our services
          </p>
        </div>

        {/* Clean Accordion List matching screenshot */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-[#0d0d0d] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm sm:text-base font-medium text-white font-sans">
                    {faq.question}
                  </span>
                  <div className="text-zinc-400 ml-4 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans border-t border-white/[0.05]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
