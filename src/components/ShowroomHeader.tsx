import React from 'react';
import { Share2 } from 'lucide-react';

interface ShowroomHeaderProps {
  onOpenShare: () => void;
}

export const ShowroomHeader: React.FC<ShowroomHeaderProps> = ({ onOpenShare }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0D0C22]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Personal Brand Logo */}
        <a href="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#EA4C89] via-[#F06292] to-[#FF8A80] p-[2px] shadow-[0_0_20px_-3px_rgba(234,76,137,0.5)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0D0C22] rounded-[10px] flex items-center justify-center">
              {/* Modern Viewport / Stack Logo */}
              <svg className="w-5 h-5 text-[#EA4C89]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
                <circle cx="6" cy="7" r="1" fill="#EA4C89" />
                <circle cx="9" cy="7" r="1" fill="#EA4C89" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-bold tracking-tight text-white font-sans">
              Landing<span className="text-[#EA4C89]">Vault</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#EA4C89]/20 text-[#EA4C89] border border-[#EA4C89]/30">
              CREATOR
            </span>
          </div>
        </a>

        {/* Right: Social Media Share Button */}
        <div>
          <button
            onClick={onOpenShare}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#EA4C89] hover:bg-[#F06292] text-white text-xs font-bold shadow-[0_4px_20px_-4px_rgba(234,76,137,0.5)] transition transform hover:-translate-y-0.5"
            title="Share this showcase"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </header>
  );
};
