import React from 'react';
import { ExternalLink } from 'lucide-react';

export const ShowroomHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0D0C22]/15 backdrop-blur-2xl backdrop-saturate-150 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left: Personal Brand Logo */}
        <a href="/" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#EA4C89] via-[#F06292] to-[#FF8A80] p-[2px] shadow-[0_0_16px_-3px_rgba(234,76,137,0.5)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0D0C22]/80 backdrop-blur-sm rounded-[6px] flex items-center justify-center">
              {/* Modern Viewport / Stack Logo */}
              <svg className="w-4 h-4 text-[#EA4C89]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
                <circle cx="6" cy="7" r="1" fill="#EA4C89" />
                <circle cx="9" cy="7" r="1" fill="#EA4C89" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              Landing<span className="text-[#EA4C89]">Vault</span>
            </span>
            <span className="hidden sm:inline-block text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#EA4C89]/20 text-[#EA4C89] border border-[#EA4C89]/30">
              CREATOR
            </span>
          </div>
        </a>

        {/* Right: Creator Profile Badge with frosted glass */}
        <div className="flex items-center space-x-3">
          <a
            href="https://www.linkedin.com/in/rajat-debnath/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.15] text-xs font-medium text-zinc-300 hover:text-white transition shadow-sm"
            title="Connect with Rajat Debnath on LinkedIn"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Rajat Debnath</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        </div>
      </div>
    </header>
  );
};
