import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenOrderModal: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenOrderModal, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Work', id: 'work' },
    { label: 'Services', id: 'services' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Impact', id: 'impact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b2c] to-[#ff824d] flex items-center justify-center">
              <span className="text-sm font-bold text-black font-display">K</span>
            </div>
            <span className="text-lg font-bold text-white font-display tracking-tight group-hover:text-[#ff6b2c] transition-colors">
              KZFR
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenOrderModal}
              className="inline-flex items-center gap-2 rounded-full bg-[#ff6b2c] px-5 py-2.5 text-xs font-bold text-black hover:bg-[#ff824d] transition-all shadow-[0_0_20px_rgba(255,107,44,0.3)]"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 bg-[#080808]">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium text-zinc-300 hover:text-white transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onOpenOrderModal();
                  setIsMobileMenuOpen(false);
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#ff6b2c] px-5 py-2.5 text-xs font-bold text-black"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};