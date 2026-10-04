import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 inset-x-0 z-50">
      <div className="w-[90vw] max-w-[1440px] mx-auto pt-7 pb-4 flex items-center justify-between">
        
        {/* Brand Logo matching Fleety geometric mark + Wordmark */}
        <a 
          href="#home" 
          className="flex items-center text-white hover:opacity-90 transition-opacity"
          aria-label="KZFR Studio"
        >
          <svg width="170" height="28" viewBox="0 0 220 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 sm:h-7 w-auto">
            {/* Fleety chevron chevron geometric mark */}
            <path d="M8 21C8 11.6 15.6 4 25 4H42L27 21L42 38H25C15.6 38 8 30.4 8 21Z" fill="#ff6b2c"/>
            <path d="M27 21L42 4H60L45 21L60 38H42L27 21Z" fill="#ffffff" opacity="0.65"/>
            {/* Wordmark */}
            <text x="75" y="29" fill="#ffffff" fontFamily="Inter, sans-serif" fontSize="23" fontWeight="800" letterSpacing="3">KZFR</text>
          </svg>
        </a>

        {/* Fleety Nav Links matching exact uppercase styles */}
        <nav className="hidden md:flex items-center gap-9 text-xs font-semibold tracking-[0.14em] uppercase text-zinc-300 font-sans">
          <a href="#home" className="text-white hover:text-[#ff6b2c] transition-colors">
            HOME
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            ABOUT
          </a>
          <a href="#work" className="hover:text-white transition-colors">
            WORKS
          </a>
          <button
            onClick={onOpenOrderModal}
            className="hover:text-white transition-colors uppercase tracking-[0.14em]"
          >
            CONTACT
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 text-xs font-bold tracking-widest uppercase">
          <a 
            href="#home" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white hover:text-[#ff6b2c]"
          >
            HOME
          </a>
          <a 
            href="#about" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-400 hover:text-white"
          >
            ABOUT
          </a>
          <a 
            href="#work" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-400 hover:text-white"
          >
            WORKS
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrderModal();
            }}
            className="block text-left text-zinc-400 hover:text-white uppercase tracking-widest w-full"
          >
            CONTACT
          </button>
        </div>
      )}
    </header>
  );
};
