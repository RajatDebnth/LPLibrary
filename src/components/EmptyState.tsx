import React from 'react';
import { SearchX, FolderPlus } from 'lucide-react';

interface EmptyStateProps {
  searchTerm: string;
  selectedCategory: string;
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchTerm,
  selectedCategory,
  onReset,
}) => {
  return (
    <div className="py-24 text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.02] mx-auto flex items-center justify-center mb-6 text-zinc-500 shadow-xl">
        {searchTerm ? <SearchX className="w-8 h-8 text-cyan-400/80" /> : <FolderPlus className="w-8 h-8 text-cyan-400/80" />}
      </div>

      <h3 className="text-xl font-bold text-white mb-2">No landing pages found</h3>

      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
        {searchTerm
          ? `We couldn't find any templates matching "${searchTerm}". Try another search term or clear the filter.`
          : `No landing pages found in the "${selectedCategory}" category.`}
      </p>

      <button
        onClick={onReset}
        className="px-5 py-2.5 rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/20 transition shadow-[0_0_20px_-5px_rgba(0,245,255,0.3)]"
      >
        Reset Filters
      </button>
    </div>
  );
};

