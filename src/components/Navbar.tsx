import React, { useState } from 'react';
import { Menu, X, Type, ChevronDown } from 'lucide-react';

export type FontTheme = 'outfit' | 'cabinet' | 'jakarta';

interface NavbarProps {
  onOpenOrderModal: () => void;
  fontTheme: FontTheme;
  onChangeFontTheme: (theme: FontTheme) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOrderModal,
  fontTheme,
  onChangeFontTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fontMenuOpen, setFontMenuOpen] = useState(false);

  const fontOptions: { id: FontTheme; label: string; sub: string }[] = [
    { id: 'outfit', label: 'Outfit (Modern Tech)', sub: 'Sleek SaaS & Startup aesthetic' },
    { id: 'cabinet', label: 'Cabinet Grotesk', sub: 'Punchy editorial agency style' },
    { id: 'jakarta', label: 'Plus Jakarta Sans', sub: 'Crisp clinical & tech precision' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a 
          href="#" 
          className="text-xl font-bold tracking-tight text-neutral-100 hover:text-amber-400 transition-colors font-display"
        >
          Vektora Studio
        </a>

        {/* Zone 2: 4-5 Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <a href="#templates" className="hover:text-neutral-100 transition-colors">
            Templates & Examples
          </a>
          <a href="#startup-mvp" className="hover:text-neutral-100 transition-colors">
            Startup MVP Lab
          </a>
          <a href="#doctor-cabinets" className="hover:text-neutral-100 transition-colors">
            Doctor Cabinets
          </a>
          <a href="#pricing" className="hover:text-neutral-100 transition-colors">
            Pricing
          </a>
          <a href="#process" className="hover:text-neutral-100 transition-colors">
            How It Works
          </a>
        </nav>

        {/* Zone 3: Actions + Font Switcher */}
        <div className="flex items-center gap-2.5">
          
          {/* Interactive Font Selector */}
          <div className="relative">
            <button
              onClick={() => setFontMenuOpen(!fontMenuOpen)}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 px-2.5 py-2 text-xs font-medium text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors"
              title="Change Typography Style"
            >
              <Type className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden lg:inline capitalize">
                {fontTheme === 'outfit' ? 'Outfit' : fontTheme === 'cabinet' ? 'Cabinet' : 'Jakarta'}
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-500" />
            </button>

            {fontMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setFontMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-neutral-800 bg-neutral-900 p-1.5 shadow-2xl z-20">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-800/80 mb-1">
                    Select Typography
                  </div>
                  {fontOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        onChangeFontTheme(opt.id);
                        setFontMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex flex-col ${
                        fontTheme === opt.id
                          ? 'bg-neutral-800 text-amber-400 font-semibold'
                          : 'text-neutral-300 hover:bg-neutral-800/60 hover:text-white'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="text-[10px] text-neutral-400 font-normal">{opt.sub}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={onOpenOrderModal}
            className="rounded-lg bg-amber-400 px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-amber-300 active:scale-[0.98] transition-all whitespace-nowrap shadow-sm shadow-amber-400/20"
          >
            Start Project
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-neutral-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 py-4 space-y-3">
          <a 
            href="#templates" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-amber-400"
          >
            Templates & Examples
          </a>
          <a 
            href="#startup-mvp" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-amber-400"
          >
            Startup MVP Lab
          </a>
          <a 
            href="#doctor-cabinets" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-amber-400"
          >
            Doctor Cabinets
          </a>
          <a 
            href="#pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-amber-400"
          >
            Pricing
          </a>
          <a 
            href="#process" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-amber-400"
          >
            How It Works
          </a>

          {/* Mobile font switcher */}
          <div className="pt-3 border-t border-neutral-800">
            <div className="text-xs text-neutral-400 mb-2 font-medium">Select Typography:</div>
            <div className="flex gap-2">
              {fontOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    onChangeFontTheme(opt.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-medium border ${
                    fontTheme === opt.id
                      ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                      : 'border-neutral-800 text-neutral-400'
                  }`}
                >
                  {opt.id === 'outfit' ? 'Outfit' : opt.id === 'cabinet' ? 'Cabinet' : 'Jakarta'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};


