import React from 'react';

interface HeroProps {
  onExploreWork: () => void;
  onBookCall: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreWork,
  onBookCall
}) => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 overflow-hidden bg-[#000000]"
    >
      {/* Background Layer: High-Res Fiery Curves matching user uploaded image */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.35)), url('/images/home-hero-user.jpg')`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      />

      {/* SVG Precision Glowing Laser Curves Overlay matching uploaded image */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 w-full h-full object-cover"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Multi-stage fiery bloom filters */}
          <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feGaussianBlur stdDeviation="24" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="ambientSpread" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="65" />
          </filter>
        </defs>

        {/* Ambient atmospheric orange field */}
        <g filter="url(#ambientSpread)" opacity="0.45">
          <path
            d="M 340 0 C 650 250, 1100 540, 1600 780"
            stroke="#FF4500"
            strokeWidth="50"
            strokeLinecap="round"
          />
          <path
            d="M 1050 510 C 1300 555, 1650 575, 1920 575"
            stroke="#FF5500"
            strokeWidth="35"
            strokeLinecap="round"
          />
        </g>

        {/* Middle warm glow */}
        <g filter="url(#coreGlow)" opacity="0.95">
          {/* Main diagonal laser beam */}
          <path
            d="M 340 0 C 640 235, 1080 525, 1620 775 L 1920 870"
            stroke="#FF5A1F"
            strokeWidth="3.5"
          />
          {/* Upper branching curve */}
          <path
            d="M 1030 505 C 1240 548, 1560 572, 1920 572"
            stroke="#FF5A1F"
            strokeWidth="2.2"
          />
          {/* Lower sweeping arc */}
          <path
            d="M 450 1080 C 820 900, 1220 740, 1550 755 C 1720 775, 1850 820, 1920 860"
            stroke="#FF5A1F"
            strokeWidth="1.8"
          />
        </g>

        {/* Razor-sharp intense fiery white-hot core */}
        <path
          d="M 340 0 C 640 235, 1080 525, 1620 775 L 1920 870"
          stroke="#FFF2CC"
          strokeWidth="1.6"
          opacity="0.95"
        />
        <path
          d="M 1030 505 C 1240 548, 1560 572, 1920 572"
          stroke="#FFD599"
          strokeWidth="1.1"
          opacity="0.85"
        />
        <path
          d="M 450 1080 C 820 900, 1220 740, 1550 755 C 1720 775, 1850 820, 1920 860"
          stroke="#FFC080"
          strokeWidth="0.9"
          opacity="0.75"
        />
      </svg>

      {/* Main Content Wrap matching Fleety's width: 90vw; max-width: 1440px; margin: 0 auto; */}
      <div className="relative z-10 w-[90vw] max-w-[1440px] mx-auto flex-1 flex flex-col justify-between">
        
        {/* Hero Texts Container matching Fleety structure */}
        <div className="pt-6 sm:pt-12 max-w-4xl">
          
          {/* Top Label matching Fleety .text12px */}
          <div className="mb-4 sm:mb-5">
            <span className="text-[#ff8142] text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-mono">
              NEXT-GEN EXPERIENCE STUDIO
            </span>
          </div>

          {/* Heading with font size decreased just a bit as requested */}
          <h1 className="text-3xl sm:text-5xl md:text-[3.5vw] lg:text-[3.85vw] font-bold tracking-tight text-white font-display leading-[1.14]">
            Building websites for people. <br />
            <span className="text-[#ff6b2c]">Fast MVPs for startups.</span>
          </h1>

          {/* Subtitle matching Fleety .text-wrap.mw-425 */}
          <p className="mt-5 text-sm sm:text-base md:text-[16px] text-zinc-300 max-w-[420px] leading-[1.65] font-sans font-normal">
            We combine rapid engineering, modern design and scalable architecture to build digital experiences that inspire action and fuel growth.
          </p>

          {/* Primary Action Button matching Fleety .buttoncontact */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={onBookCall}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#ff6b2c] to-[#ff824d] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_35px_rgba(255,107,44,0.45)] border border-black/20 hover:opacity-95 transition-all hover:scale-105 active:scale-95"
            >
              <span>LET'S TALK</span>
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path d="M7 17L17 7M17 7H8M17 7V16" />
              </svg>
            </button>
          </div>

          {/* Trusted By Partner Logos matching Fleety .partnerscontainer */}
          <div className="mt-12 pt-4">
            <div className="text-[11px] font-sans text-zinc-400 uppercase tracking-widest mb-3 font-medium">
              TRUSTED BY
            </div>
            <div className="flex items-center gap-8 sm:gap-12 text-zinc-400 overflow-x-auto py-1 scrollbar-none">
              
              {/* Partner 1: NOVARA */}
              <div className="flex items-center gap-2.5 hover:text-white transition-colors cursor-default opacity-85 hover:opacity-100">
                <svg width="24" height="24" viewBox="0 0 76 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M36 5C36 2.79086 37.7909 1 40 1H58C64.6274 1 70 6.37258 70 13V13C70 16.1826 68.7357 19.2348 66.4853 21.4853L50 38L36 24V5Z" fill="currentColor"/>
                  <path d="M6 29C6 25.8174 7.26428 22.7652 9.51472 20.5147L26 4L40 18V37C40 39.2091 38.2091 41 36 41H18C11.3726 41 6 35.6274 6 29V29Z" fill="currentColor"/>
                </svg>
                <span className="font-display font-bold text-xs tracking-wider uppercase text-zinc-300">NOVARA</span>
              </div>

              {/* Partner 2: VELIX */}
              <div className="flex items-center gap-2.5 hover:text-white transition-colors cursor-default opacity-85 hover:opacity-100">
                <svg width="24" height="24" viewBox="0 0 64 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M21 2L38 19L21 36L4 19L21 2Z" fill="currentColor"/>
                  <path d="M42 2L59 19L42 36L25 19L42 2Z" fill="currentColor" opacity="0.75"/>
                </svg>
                <span className="font-display font-bold text-xs tracking-wider uppercase text-zinc-300">VELIX</span>
              </div>

              {/* Partner 3: KLYRO */}
              <div className="flex items-center gap-2.5 hover:text-white transition-colors cursor-default opacity-85 hover:opacity-100">
                <svg width="22" height="22" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <rect x="4" y="4" width="34" height="34" rx="10" fill="currentColor"/>
                  <path d="M18 13L29 21L18 29V13Z" fill="#000000"/>
                </svg>
                <span className="font-display font-bold text-xs tracking-wider uppercase text-zinc-300">KLYRO</span>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Bottom Cards matching Fleety .statwrapper.hero */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16 sm:mt-24 w-full">
          
          {/* Card 1: STRATEGIC DESIGN */}
          <div className="rounded-[22px] border border-[#ff6b2c]/20 bg-white/[0.03] backdrop-blur-[30px] p-6 hover:border-[#ff6b2c]/50 hover:bg-white/[0.05] transition-all duration-300 group">
            <div className="w-12 h-12 flex items-center justify-start text-[#ff6b2c]">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="fleetyGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.5" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#fleetyGlow)">
                  <path
                    d="M7.52879 16.4712C2.59014 11.5325 0.588351 5.52715 3.05768 3.05782C5.04852 1.06697 9.33779 1.98237 13.5134 5M16.471 7.52894C21.4097 12.4676 23.4115 18.473 20.9421 20.9423C18.9535 22.931 14.6713 22.0198 10.5 19.01M20.9423 3.05768C23.4117 5.52701 21.4099 11.5324 16.4712 16.4711C11.5326 21.4097 5.5272 23.4115 3.05787 20.9422C1.06704 18.9513 1.98242 14.6621 5 10.4865C5.72528 9.48285 6.57199 8.4858 7.52899 7.5288C12.4676 2.59014 18.473 0.588345 20.9423 3.05768Z"
                    stroke="#FF6B2C"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12Z"
                    stroke="#FF6B2C"
                    strokeWidth="1.25"
                  />
                </g>
              </svg>
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mt-4 font-display">
              STRATEGIC DESIGN
            </div>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
              Design systems crafted with purpose and clarity.
            </p>
          </div>

          {/* Card 2: BRAND EXPERIENCES */}
          <div className="rounded-[22px] border border-[#ff6b2c]/20 bg-white/[0.03] backdrop-blur-[30px] p-6 hover:border-[#ff6b2c]/50 hover:bg-white/[0.05] transition-all duration-300 group">
            <div className="w-12 h-12 flex items-center justify-start text-[#ff6b2c]">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.97883 6.31492C2.99294 7.10927 2 7.50645 2 8C2 8.49355 2.99294 8.89073 4.97883 9.68508L7.7873 10.8085C9.77318 11.6028 10.7661 12 12 12C13.2339 12 14.2268 11.6028 16.2127 10.8085L19.0212 9.68508C21.0071 8.89073 22 8.49355 22 8C22 7.50645 21.0071 7.10927 19.0212 6.31492L16.2127 5.19153C14.2268 4.39718 13.2339 4 12 4C11.0461 4 10.2361 4.2374 9 4.71221"
                  stroke="#FF6B2C"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                <path
                  d="M5.76613 10L4.97883 10.3149C2.99294 11.1093 2 11.5065 2 12C2 12.4935 2.99294 12.8907 4.97883 13.6851L7.7873 14.8085C9.77318 15.6028 10.7661 16 12 16C13.2339 16 14.2268 15.6028 16.2127 14.8085L19.0212 13.6851C21.0071 12.8907 22 12.4935 22 12C22 11.5065 21.0071 11.1093 19.0212 10.3149L18.2339 10"
                  stroke="#FF6B2C"
                  strokeWidth="1.25"
                />
                <path
                  d="M19.0212 17.6851C21.0071 16.8907 22 16.4935 22 16C22 15.5065 21.0071 15.1093 19.0212 14.3149L18.2339 14M5.76613 14L4.97883 14.3149C2.99294 15.1093 2 15.5065 2 16C2 16.4935 2.99294 16.8907 4.97883 17.6851L7.7873 18.8085C9.77318 19.6028 10.7661 20 12 20C12.9539 20 13.7639 19.7626 15 19.2878"
                  stroke="#FF6B2C"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mt-4 font-display">
              BRAND EXPERIENCES
            </div>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
              Memorable experiences that build lasting impact.
            </p>
          </div>

          {/* Card 3: MOTION & STORYTELLING */}
          <div className="rounded-[22px] border border-[#ff6b2c]/20 bg-white/[0.03] backdrop-blur-[30px] p-6 hover:border-[#ff6b2c]/50 hover:bg-white/[0.05] transition-all duration-300 group">
            <div className="w-12 h-12 flex items-center justify-start text-[#ff6b2c]">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="18" r="2.5" stroke="#FF6B2C" strokeWidth="1.25" />
                <circle cx="18" cy="6" r="2.5" stroke="#FF6B2C" strokeWidth="1.25" />
                <circle cx="18" cy="18" r="2.5" stroke="#FF6B2C" strokeWidth="1.25" />
                <path d="M8 16L16 8" stroke="#FF6B2C" strokeWidth="1.25" strokeLinecap="round" />
                <path d="M8.5 18H15.5" stroke="#FF6B2C" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mt-4 font-display">
              MOTION & STORYTELLING
            </div>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
              Visual storytelling that moves audiences.
            </p>
          </div>

          {/* Card 4: AI-POWERED SOLUTIONS */}
          <div className="rounded-[22px] border border-[#ff6b2c]/20 bg-white/[0.03] backdrop-blur-[30px] p-6 hover:border-[#ff6b2c]/50 hover:bg-white/[0.05] transition-all duration-300 group">
            <div className="w-12 h-12 flex items-center justify-start text-[#ff6b2c]">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3V7" stroke="#FF6B2C" strokeWidth="1.25" strokeLinecap="round" />
                <path d="M12 17V21" stroke="#FF6B2C" strokeWidth="1.25" strokeLinecap="round" />
                <path d="M3 12H7" stroke="#FF6B2C" strokeWidth="1.25" strokeLinecap="round" />
                <path d="M17 12H21" stroke="#FF6B2C" strokeWidth="1.25" strokeLinecap="round" />
                <circle cx="12" cy="12" r="7" stroke="#FF6B2C" strokeWidth="1.25" />
                <circle cx="12" cy="12" r="1.5" fill="#FF6B2C" />
              </svg>
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mt-4 font-display">
              AI-POWERED SOLUTIONS
            </div>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
              Intelligent solutions for the future of brands.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
