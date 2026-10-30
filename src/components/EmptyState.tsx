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
      {/* Playful Dribbble Ball Icon / Illustration */}
      <div className="w-20 h-20 rounded-full border border-white/10 bg-[#18172E] mx-auto flex items-center justify-center mb-6 text-zinc-400 shadow-2xl shadow-[#EA4C89]/10">
        <svg className="w-10 h-10 text-[#EA4C89]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
          <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
          <path d="M8.5 2.5c2 4 2.5 9 1 14.5" />
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-white mb-2 font-sans">
        {isSavedActive ? 'No saved shots yet' : 'No landing pages found'}
      </h3>

      <p className="text-sm text-zinc-400 leading-relaxed mb-8">
        {isSavedActive
          ? 'Hover over any landing page shot and click the bookmark icon to curate your personal inspiration collection.'
          : searchTerm
          ? `We couldn't find any shots matching "${searchTerm}". Try a broader keyword or reset the filter.`
          : `No landing pages found under "${selectedCategory}".`}
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
