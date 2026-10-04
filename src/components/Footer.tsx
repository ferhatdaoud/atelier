import React, { useState } from 'react';
import { Instagram, Youtube, Facebook, Twitter, Copy, Check, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onStartProject: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onStartProject }) => {
  const [copied, setCopied] = useState(false);
  const email = 'hello@kzfr.studio';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-white text-black py-16 sm:py-24 px-4 sm:px-8 selection:bg-[#ff6b2c] selection:text-white">
      <div className="w-[90vw] max-w-[1440px] mx-auto flex flex-col justify-between min-h-[460px]">
        
        {/* Top Header Row: High-Impact Copy & Direct Touchpoint */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          
          <div className="max-w-3xl">
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ff6b2c] font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ff6b2c] animate-pulse" />
              <span>NOW BOOKING SPRINTS FOR 2026</span>
            </div>

            {/* Elevated Headline tailored for Startups & Websites for People */}
            <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-black font-display leading-[1.12]">
              Built for founders with vision.{' '}
              <span className="text-zinc-500">Designed for people who care.</span> <br />
              <span className="text-[#ff6b2c]">Launch faster. Convert higher. Own your code.</span>
            </h2>
          </div>

          {/* Quick Direct Inquiries Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.03] px-4 py-2.5 text-xs font-mono text-black hover:border-black hover:bg-black hover:text-white transition-all group"
              title="Click to copy studio email"
            >
              <span>{email}</span>
              {copied ? (
                <span className="flex items-center gap-1 text-[#ff6b2c] font-bold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 text-black/50 group-hover:text-white transition-colors" />
              )}
            </button>

            <button
              onClick={onStartProject}
              className="inline-flex items-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#ff6b2c] transition-all"
            >
              <span>Book Call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Giant Display Wordmark: KZFR matching screenshot */}
        <div className="py-12 sm:py-16 select-none border-t border-black/10 mt-8">
          <h1 className="text-7xl sm:text-9xl md:text-[14vw] font-extrabold tracking-tighter text-black font-display leading-none">
            KZFR
          </h1>
        </div>

        {/* Bottom Content Bar matching screenshot */}
        <div className="pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-medium text-black/70 font-sans">
          
          {/* Important Links & Location */}
          <div className="flex items-center gap-6 flex-wrap">
            <span className="font-bold text-black font-mono">KZFR Studio ™</span>
            <span className="text-black/30">/</span>
            <a href="#work" className="hover:text-black transition-colors">
              Next.js 15
            </a>
            <span className="text-black/30">/</span>
            <a href="#pricing" className="hover:text-black transition-colors">
              Startup MVPs (3–7d)
            </a>
            <span className="text-black/30">/</span>
            <span className="text-black/60">Remote Worldwide</span>
          </div>

          {/* Social Icons matching screenshot */}
          <div className="flex items-center gap-3 text-black">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all"
              aria-label="X / Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};
