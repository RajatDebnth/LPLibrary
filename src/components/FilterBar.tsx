import React from 'react';
import { Search, X, ArrowDownUp } from 'lucide-react';
import { SortOption } from '../types';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  categoryCounts,
  totalCount,
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Top row: Search and Sort controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search bar */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search templates, categories, or keywords..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0B0D13] border border-white/[0.08] text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40 transition"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2 self-end sm:self-auto">
          <div className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#0B0D13] border border-white/[0.08] text-xs text-zinc-400">
            <ArrowDownUp className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-zinc-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Sort templates"
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-[#0B0D13] text-white">Newest First</option>
              <option value="alphabetical" className="bg-[#0B0D13] text-white">Alphabetical (A-Z)</option>
              <option value="oldest" className="bg-[#0B0D13] text-white">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom row: Category Pills Rail */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center space-x-2 ${
            selectedCategory === 'all'
              ? 'bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_-3px_rgba(0,245,255,0.25)]'
              : 'bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/10'
          }`}
        >
          <span>All Templates</span>
          <span
            className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
              selectedCategory === 'all'
                ? 'bg-cyan-400/20 text-cyan-200'
                : 'bg-white/5 text-zinc-400'
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
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center space-x-2 ${
                isSelected
                  ? 'bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_-3px_rgba(0,245,255,0.25)]'
                  : 'bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/10'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected
                    ? 'bg-cyan-400/20 text-cyan-200'
                    : 'bg-white/5 text-zinc-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

