import React from 'react';
import { RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  searchTerm: string;
  selectedCategory: string;
  isSavedActive: boolean;
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchTerm,
  selectedCategory,
  isSavedActive,
  onReset,
}) => {
  return (
    <div className="py-28 text-center max-w-md mx-auto">
      {/* Modern Viewport Icon */}
      <div className="w-20 h-20 rounded-2xl border border-white/10 bg-[#18172E] mx-auto flex items-center justify-center mb-6 text-zinc-400 shadow-2xl shadow-[#EA4C89]/10">
        <svg className="w-10 h-10 text-[#EA4C89]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <circle cx="6" cy="7" r="1" fill="#EA4C89" />
          <circle cx="9" cy="7" r="1" fill="#EA4C89" />
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-white mb-2 font-sans">
        {isSavedActive ? 'No saved templates yet' : 'No landing pages found'}
      </h3>

      <p className="text-sm text-zinc-400 leading-relaxed mb-8">
        {isSavedActive
          ? 'Hover over any landing page in my collection and click the bookmark icon to curate your personal inspiration list.'
          : searchTerm
          ? `We couldn't find any templates in my collection matching "${searchTerm}". Try another keyword or reset the filter.`
          : `No landing pages found under the "${selectedCategory}" category.`}
      </p>

      <button
        onClick={onReset}
        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#EA4C89] hover:bg-[#F06292] text-white text-xs font-bold transition shadow-lg shadow-[#EA4C89]/30"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Reset Filters</span>
      </button>
    </div>
  );
};
