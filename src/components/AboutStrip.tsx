import React from 'react';

export const AboutStrip: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#000000] relative">
      <div className="mx-auto max-w-5xl px-6 text-center">
        
        {/* Large Centered Editorial Statement matching screenshot */}
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-white font-display leading-[1.35] uppercase">
          KZFR® IS A VERSATILE WEB DEVELOPMENT STUDIO SPECIALIZING IN <span className="text-[#ff6b2c]">STARTUP MVPS</span>, CUSTOM WEBSITES & DIGITAL PRODUCTS
        </h2>

      </div>
    </section>
  );
};
