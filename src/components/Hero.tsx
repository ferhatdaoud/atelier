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
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 overflow-hidden bg-[#000000]"
      style={{
        backgroundImage: `url('/images/home-hero-bg.jpg')`,
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      {/* Subtle overlay gradient to ensure crisp text readability */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent -z-10" 
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 w-full flex-1 flex flex-col justify-center">
        
        {/* Main Hero Copy - Left Aligned */}
        <div className="max-w-3xl pt-8 sm:pt-14">
          
          {/* Pre-title: Tailored for web dev studio */}
          <div className="text-[#ff6b2c] tracking-[0.2em] text-xs font-bold uppercase mb-5 font-mono">
            WEB DEV FOR STARTUPS & BESPOKE WEBSITES
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-tight text-white font-display leading-[1.08]">
            Building websites for people. <br />
            <span className="text-[#ff6b2c]">Fast MVPs for startups.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-300 max-w-lg leading-relaxed font-sans font-normal">
            From 3–7 day production-ready SaaS MVPs with auth, Stripe, and scalable databases, to custom high-converting websites for clinics, founders, and professionals.
          </p>

          {/* Primary CTA Button: LET'S TALK ↗ */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={onBookCall}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#ff6b2c] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_35px_rgba(255,107,44,0.45)] hover:bg-[#ff824d] transition-all hover:scale-105 active:scale-95"
            >
              <span>LET'S TALK</span>
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path d="M7 17L17 7M17 7H8M17 7V16" />
              </svg>
            </button>

            <button
              onClick={onExploreWork}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white hover:border-[#ff6b2c] hover:bg-white/10 transition-all"
            >
              <span>View Works</span>
            </button>
          </div>

        </div>

        {/* Bottom 4 Bento Stat Cards - Tailored for Startups & Websites for People */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-16 sm:mt-24 w-full">
          
          {/* Card 1: STARTUP MVPS */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-md p-6 hover:border-[#ff6b2c]/50 transition-all duration-300 group">
            <div className="w-12 h-12 flex items-center justify-center text-[#ff6b2c]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.52879 16.4712C2.59014 11.5325 0.588351 5.52715 3.05768 3.05782C5.04852 1.06697 9.33779 1.98237 13.5134 5M16.471 7.52894C21.4097 12.4676 23.4115 18.473 20.9421 20.9423C18.9535 22.931 14.6713 22.0198 10.5 19.01M20.9423 3.05768C23.4117 5.52701 21.4099 11.5324 16.4712 16.4711C11.5326 21.4097 5.5272 23.4115 3.05787 20.9422C1.06704 18.9513 1.98242 14.6621 5 10.4865C5.72528 9.48285 6.57199 8.4858 7.52899 7.5288C12.4676 2.59014 18.473 0.588345 20.9423 3.05768Z"
                  stroke="#FF6B2C"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="2.5" stroke="#FF6B2C" strokeWidth="1.3" />
              </svg>
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mt-4 font-display">
              STARTUP MVPS
            </div>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
              3–7 day sprints. Investor-ready code, Stripe payments, and early validation.
            </p>
          </div>

          {/* Card 2: WEBSITES FOR PEOPLE */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-md p-6 hover:border-[#ff6b2c]/50 transition-all duration-300 group">
            <div className="w-12 h-12 flex items-center justify-center text-[#ff6b2c]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.97883 6.31492C2.99294 7.10927 2 7.50645 2 8C2 8.49355 2.99294 8.89073 4.97883 9.68508L7.7873 10.8085C9.77318 11.6028 10.7661 12 12 12C13.2339 12 14.2268 11.6028 16.2127 10.8085L19.0212 9.68508C21.0071 8.89073 22 8.49355 22 8C22 7.50645 21.0071 7.10927 19.0212 6.31492L16.2127 5.19153C14.2268 4.39718 13.2339 4 12 4C11.0461 4 10.2361 4.2374 9 4.71221"
                  stroke="#FF6B2C"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M5.76613 10L4.97883 10.3149C2.99294 11.1093 2 11.5065 2 12C2 12.4935 2.99294 12.8907 4.97883 13.6851L7.7873 14.8085C9.77318 15.6028 10.7661 16 12 16C13.2339 16 14.2268 15.6028 16.2127 14.8085L19.0212 13.6851C21.0071 12.8907 22 12.4935 22 12C22 11.5065 21.0071 11.1093 19.0212 10.3149L18.2339 10"
                  stroke="#FF6B2C"
                  strokeWidth="1.3"
                />
                <path
                  d="M19.0212 17.6851C21.0071 16.8907 22 16.4935 22 16C22 15.5065 21.0071 15.1093 19.0212 14.3149L18.2339 14M5.76613 14L4.97883 14.3149C2.99294 15.1093 2 15.5065 2 16C2 16.4935 2.99294 16.8907 4.97883 17.6851L7.7873 18.8085C9.77318 19.6028 10.7661 20 12 20C12.9539 20 13.7639 19.7626 15 19.2878"
                  stroke="#FF6B2C"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mt-4 font-display">
              WEBSITES FOR PEOPLE
            </div>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
              Bespoke web presence for doctors, clinics, creators, and private businesses in 48h.
            </p>
          </div>

          {/* Card 3: SCALABLE APPS */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-md p-6 hover:border-[#ff6b2c]/50 transition-all duration-300 group">
            <div className="w-12 h-12 flex items-center justify-center text-[#ff6b2c]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="18" r="2.5" stroke="#FF6B2C" strokeWidth="1.3" />
                <circle cx="18" cy="6" r="2.5" stroke="#FF6B2C" strokeWidth="1.3" />
                <circle cx="18" cy="18" r="2.5" stroke="#FF6B2C" strokeWidth="1.3" />
                <path d="M8 16L16 8" stroke="#FF6B2C" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M8.5 18H15.5" stroke="#FF6B2C" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mt-4 font-display">
              SCALABLE APPS
            </div>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
              Auth, PostgreSQL databases, cloud image storage, and enterprise billing.
            </p>
          </div>

          {/* Card 4: FULL CODE OWNERSHIP */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-md p-6 hover:border-[#ff6b2c]/50 transition-all duration-300 group">
            <div className="w-12 h-12 flex items-center justify-center text-[#ff6b2c]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3V7" stroke="#FF6B2C" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M12 17V21" stroke="#FF6B2C" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M3 12H7" stroke="#FF6B2C" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M17 12H21" stroke="#FF6B2C" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="12" cy="12" r="7" stroke="#FF6B2C" strokeWidth="1.3" />
                <circle cx="12" cy="12" r="1.5" fill="#FF6B2C" />
              </svg>
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mt-4 font-display">
              100% CODE OWNERSHIP
            </div>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
              Zero vendor lock-in. Full GitHub repository transfer and Figma design assets.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
