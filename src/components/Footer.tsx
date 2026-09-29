import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 py-12 text-xs text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          <div>
            <a href="#" className="text-base font-bold text-neutral-100 font-display hover:text-amber-400 transition-colors">
              Vektora Studio
            </a>
            <p className="mt-1 text-xs text-neutral-400 max-w-md">
              High-performance web agency delivering production-grade MVP software for funded startups and turnkey bespoke websites for specialized clinics and practices.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-neutral-400">
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#startup-mvp" className="hover:text-white transition-colors">Startup MVP Lab</a>
            <a href="#doctor-cabinets" className="hover:text-white transition-colors">Doctor Cabinets</a>
            <a href="#process" className="hover:text-white transition-colors">Workflow</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="mailto:hello@vektora.studio" className="hover:text-amber-400 transition-colors">
              hello@vektora.studio
            </a>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            © {new Date().getFullYear()} Vektora Studio. All rights reserved. 100% intellectual property ownership to our clients.
          </div>
          <div className="flex items-center gap-4">
            <span>Built with React 19 & Next.js Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Zero Lock-In Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
