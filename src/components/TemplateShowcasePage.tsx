import React from 'react';
import { TemplateItem } from '../types';
import { X, ArrowRight } from 'lucide-react';

interface TemplateShowcasePageProps {
  template: TemplateItem;
  onClose: () => void;
  onOrder: (template: TemplateItem) => void;
}

export const TemplateShowcasePage: React.FC<TemplateShowcasePageProps> = ({ template, onClose, onOrder }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#000000] overflow-y-auto text-white">
      {/* Header */}
      <header className="flex h-16 items-center justify-between px-6 border-b border-white/10">
        <button onClick={onClose} className="text-zinc-400 hover:text-white flex items-center gap-2">
          <X className="w-5 h-5" /> Close
        </button>
        <h1 className="font-bold text-lg">{template.title}</h1>
        <button onClick={() => onOrder(template)} className="bg-[#ff6b2c] px-6 py-2.5 rounded-full text-xs font-bold text-black hover:bg-[#ff824d] transition-all">
          Order Similar Template
        </button>
      </header>
      
      {/* Content */}
      <main className="p-6 md:p-12 max-w-5xl mx-auto">
        <img src={template.image} alt={template.title} className="w-full h-auto rounded-2xl mb-12" />
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">{template.subtitle}</h2>
        <p className="text-zinc-400 text-lg mb-12 max-w-2xl">{template.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
            <div>
                <h3 className="text-xl font-bold mb-6 font-display">Core Features</h3>
                <ul className="space-y-4">
                    {template.features.map(f => <li key={f} className="text-zinc-300 flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b2c] mt-2 shrink-0" />
                        {f}
                    </li>)}
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-bold mb-6 font-display">Recommended For</h3>
                <p className="text-zinc-300 leading-relaxed">{template.recommendedFor}</p>
                <div className="mt-8 flex gap-4">
                    <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4">
                        <div className="text-[11px] text-zinc-500 uppercase tracking-widest font-bold">Turnkey Price</div>
                        <div className="text-xl font-bold text-white mt-1 tabular-nums">{template.turnkeyPrice.toLocaleString()} DA</div>
                    </div>
                    <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4">
                        <div className="text-[11px] text-zinc-500 uppercase tracking-widest font-bold">Turnaround</div>
                        <div className="text-xl font-bold text-white mt-1">{template.turnaroundTime}</div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};
