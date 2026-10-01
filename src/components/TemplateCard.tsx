import React from 'react';
import { TemplateItem } from '../types';
import { Eye, ArrowUpRight, Check, Clock } from 'lucide-react';

interface TemplateCardProps {
  template: TemplateItem;
  onOpenDemo: (template: TemplateItem) => void;
  onOrderTemplate: (template: TemplateItem) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onOpenDemo,
  onOrderTemplate
}) => {
  return (
    <article className="group flex flex-col rounded-xl border border-neutral-800/90 bg-neutral-900/40 hover:border-neutral-700/80 transition-all duration-300 overflow-hidden">
      
      {/* Image Container with subtle zoom & quick view action */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950 border-b border-neutral-800/60">
        <img
          src={template.image}
          alt={template.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/10 transition-colors" />

        {/* Hover quick demo overlay button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-950/60 backdrop-blur-[2px]">
          <button
            onClick={() => onOpenDemo(template)}
            className="flex items-center gap-2 rounded-lg bg-neutral-900/95 border border-neutral-700 px-4 py-2 text-xs font-semibold text-neutral-100 hover:border-amber-400 hover:text-amber-400 shadow-xl transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Open Interactive Demo</span>
          </button>
        </div>

        {/* Quiet Delivery Time tag in top right */}
        <div className="absolute top-3 right-3 rounded bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-neutral-300 border border-neutral-800 flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>{template.turnaroundTime}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Unboxed metadata line with typographic separator */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
          <span className="text-amber-400 font-medium">{template.categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{template.ordersCount} launched</span>
          <span aria-hidden="true">·</span>
          <span>Turnkey in {template.turnaroundTime}</span>
        </div>

        {/* Primary Title */}
        <h3 className="text-lg font-bold text-neutral-100 font-display group-hover:text-amber-400 transition-colors">
          {template.title}
        </h3>

        {/* Subtitle / Description */}
        <p className="mt-2 text-xs text-neutral-400 leading-relaxed line-clamp-2">
          {template.subtitle}
        </p>

        {/* Key Features Bullet List */}
        <ul className="mt-4 space-y-1.5 border-t border-neutral-800/80 pt-3">
          {template.features.slice(0, 3).map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feat}</span>
            </li>
          ))}
        </ul>

        {/* Unboxed tech stack line */}
        <div className="mt-4 pt-3 border-t border-neutral-800/60 text-[11px] text-neutral-400 line-clamp-1">
          {template.tags.join(' · ')}
        </div>

        {/* Price & Action Footer */}
        <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-neutral-400">Turnkey (Done-For-You)</div>
            <div className="text-lg font-bold text-neutral-100 font-display tabular-nums">
              ${template.turnkeyPrice}
              <span className="text-xs font-normal text-neutral-400 ml-1">or raw code ${template.rawPrice}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDemo(template)}
              className="p-2 rounded-lg border border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
              title="Preview Live Demo"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOrderTemplate(template)}
              className="flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3.5 py-2 text-xs font-semibold text-neutral-950 hover:bg-amber-400 active:scale-[0.98] transition-all whitespace-nowrap"
            >
              <span>Order</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};
