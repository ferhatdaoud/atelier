import React from 'react';

interface CtaBannerProps {
  onStartProject: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onStartProject }) => {
  return (
    <section 
      className="relative min-h-[500px] sm:min-h-[580px] flex items-center justify-center overflow-hidden bg-[#000000] py-24"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.45)), url('/images/home-hero-user.jpg')`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white font-display tracking-tight leading-tight">
          Start your project
        </h2>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onStartProject}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider text-black shadow-2xl hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95"
          >
            <span>Let's Talk</span>
          </button>
        </div>
      </div>
    </section>
  );
};
