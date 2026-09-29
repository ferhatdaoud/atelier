import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onOpenOrderModal: () => void;
  onOpenOrdersDrawer: () => void;
  orderCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOrderModal,
  onOpenOrdersDrawer,
  orderCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        {/* Zone 2: 4-5 Navigation Links (Clean text links with subtle hover underlines) */}
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
          <a href="#process" className="hover:text-neutral-100 transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="hover:text-neutral-100 transition-colors">
            Pricing
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenOrdersDrawer}
            className="relative flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-xs font-medium text-neutral-300 hover:border-neutral-700 hover:text-neutral-100 transition-colors whitespace-nowrap"
            title="View placed orders & inquiry tracker"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Orders</span>
            {orderCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-neutral-950 tabular-nums">
                {orderCount}
              </span>
            )}
          </button>

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
            href="#process" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-amber-400"
          >
            How It Works
          </a>
          <a 
            href="#pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-amber-400"
          >
            Pricing
          </a>
        </div>
      )}
    </header>
  );
};
