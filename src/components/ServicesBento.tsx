import React from 'react';
import { Laptop, PenTool, LayoutTemplate, Zap, CheckCircle2 } from 'lucide-react';

export const ServicesBento: React.FC = () => {
  const services = [
    {
      icon: <Laptop className="w-5 h-5 text-white" />,
      title: 'Website Creation',
      subtitle: 'High-performance websites built for speed',
      bullets: [
        'Responsive layouts',
        'Landing pages',
        'Custom visuals & layouts'
      ]
    },
    {
      icon: <PenTool className="w-5 h-5 text-white" />,
      title: 'Brand Identity',
      subtitle: 'Brands designed to stand out for the people',
      bullets: [
        'Logo systems & visuals',
        'Packaging & design tokens',
        'Tone of voice & copy'
      ]
    },
    {
      icon: <LayoutTemplate className="w-5 h-5 text-white" />,
      title: 'Product Design',
      subtitle: 'Interfaces designed for clarity, usability, and flow.',
      bullets: [
        'Intuitive user journeys',
        'Wireframes & prototypes',
        'Mobile-first experiences'
      ]
    },
    {
      icon: <Zap className="w-5 h-5 text-white" />,
      title: 'Scalable Engineering',
      subtitle: 'Clean Next.js architecture built to scale.',
      bullets: [
        'Full code ownership',
        'Chargili & user auth',
        'Sub-second performance'
      ]
    }
  ];

  return (
    <section id="services" className="py-24 sm:py-36 bg-[#000000] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header matching screenshot */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight">
            Creative Services
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans">
            From strategy to execution, we help brands stand out and grow.
          </p>
        </div>

        {/* 4-column card grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-7 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group"
            >
              <div>
                {/* Square Icon Container */}
                <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center mb-6 group-hover:border-[#ff6b2c]/60 group-hover:text-[#ff6b2c] transition-colors">
                  {item.icon}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-bold text-white font-display">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-sans min-h-[36px]">
                  {item.subtitle}
                </p>

                {/* Bullet Points with Orange Check Circle */}
                <ul className="mt-6 space-y-3 pt-6 border-t border-white/[0.08]">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-[#ff6b2c] shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
