import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-12 lg:px-16 pt-8 pb-4">
      {/* Brand logo: KZFR */}
      <a 
        href="#" 
        className="flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity"
        aria-label="KZFR Web Development Studio"
      >
        <svg width="130" height="28" viewBox="0 0 200 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 sm:h-7 w-auto">
          {/* Stylized K / geometric mark */}
          <path d="M6 6H13V36H6V6Z" fill="#ff6b2c"/>
          <path d="M14 21L27 6H36L21 21L36 36H27L14 21Z" fill="#FFFFFF"/>
          {/* Wordmark KZFR */}
          <text x="46" y="30" fill="#FFFFFF" fontFamily="var(--font-display), Inter, sans-serif" fontSize="26" fontWeight="900" letterSpacing="3">KZFR</text>
        </svg>
      </a>

      {/* Nav links on right */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs font-bold tracking-widest uppercase">
        <a href="#home" className="text-[#ff6b2c] hover:text-[#ff824d] transition-colors">
          HOME
        </a>
        <a href="#about" className="text-white hover:text-[#ff6b2c] transition-colors">
          ABOUT
        </a>
        <a href="#work" className="text-white hover:text-[#ff6b2c] transition-colors">
          WORKS
        </a>
        <a href="#pricing" className="text-white hover:text-[#ff6b2c] transition-colors">
          PRICING
        </a>
        <button
          onClick={onOpenOrderModal}
          className="text-white hover:text-[#ff6b2c] transition-colors uppercase tracking-widest text-xs font-bold"
        >
          CONTACT
        </button>
      </nav>

      {/* Mobile menu trigger */}
      <div className="md:hidden flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg border border-white/10 text-zinc-300 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-20 inset-x-4 rounded-2xl glass-card bg-[#0d0d0d]/95 p-6 border border-white/15 space-y-4 text-center shadow-2xl z-50">
          <a 
            href="#home" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-bold tracking-widest uppercase text-[#ff6b2c]"
          >
            HOME
          </a>
          <a 
            href="#about" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-bold tracking-widest uppercase text-white hover:text-[#ff6b2c]"
          >
            ABOUT
          </a>
          <a 
            href="#work" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-bold tracking-widest uppercase text-white hover:text-[#ff6b2c]"
          >
            WORKS
          </a>
          <a 
            href="#pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-bold tracking-widest uppercase text-white hover:text-[#ff6b2c]"
          >
            PRICING
          </a>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenOrderModal(); }}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#ff6b2c] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#ff6b2c]/20"
          >
            <span>LET'S TALK</span>
          </button>
        </div>
      )}
    </header>
  );
};
