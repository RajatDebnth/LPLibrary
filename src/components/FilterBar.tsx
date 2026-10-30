import React from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { SortOption } from '../types';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  categoryCounts,
  totalCount,
}) => {
  return (
    <div className="pt-6 pb-8 border-b border-white/[0.06] mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Dribbble Sort Dropdown Capsule */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Sort templates"
              className="appearance-none pl-4 pr-10 py-2.5 rounded-full bg-[#18172E] border border-white/[0.1] text-xs font-semibold text-white cursor-pointer hover:border-white/20 focus:outline-none focus:border-[#EA4C89] transition shadow-sm"
            >
              <option value="popular" className="bg-[#18172E] text-white">Popular</option>
              <option value="newest" className="bg-[#18172E] text-white">Newest First</option>
              <option value="alphabetical" className="bg-[#18172E] text-white">Alphabetical (A-Z)</option>
              <option value="oldest" className="bg-[#18172E] text-white">Oldest</option>
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Center: Dribbble Category Pills Rail */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none flex-1 justify-start lg:justify-center">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex items-center space-x-2 ${
              selectedCategory === 'all'
                ? 'bg-white text-black shadow-lg shadow-white/10'
                : 'bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
            }`}
          >
            <span>All</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedCategory === 'all' ? 'bg-black/10 text-black' : 'bg-white/10 text-zinc-400'
              }`}
            >
              {totalCount}
            </span>
          </button>

          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-white text-black shadow-lg shadow-white/10'
                    : 'bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-black/10 text-black' : 'bg-white/10 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Filter Badge / Indicator */}
        <div className="hidden sm:flex items-center space-x-2 shrink-0 self-end lg:self-auto">
          <div className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-[#18172E] border border-white/[0.08] text-xs font-medium text-zinc-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#EA4C89]" />
            <span>Interactive Previews</span>
          </div>
        </div>
      </div>
    </div>
  );
};
