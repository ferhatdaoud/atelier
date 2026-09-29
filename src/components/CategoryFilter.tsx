import React from 'react';
import { Category } from '../types';
import { Search } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: Record<Category, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  counts
}) => {
  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Templates' },
    { id: 'startup-mvp', label: 'Startup MVPs' },
    { id: 'medical-clinic', label: 'Doctors & Clinics' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'custom-bespoke', label: 'Custom Bespoke' }
  ];

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Category Segmented Controls (functional buttons with click handlers) */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-neutral-900/90 rounded-xl border border-neutral-800/80 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = counts[cat.id] || 0;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-neutral-800 text-amber-400 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[11px] tabular-nums ${isActive ? 'text-amber-400/80' : 'text-neutral-500'}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input Filter */}
      <div className="relative min-w-[240px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter by feature, stack, or niche..."
          className="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 pl-10 pr-4 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:border-amber-400 focus:outline-none transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 hover:text-neutral-300"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};
