import React from 'react';
import { Layers, Sparkles, Terminal } from 'lucide-react';

interface ShowroomHeaderProps {
  totalCount: number;
  categoriesCount: number;
}

export const ShowroomHeader: React.FC<ShowroomHeaderProps> = ({
  totalCount,
  categoriesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#050608]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 p-[1px] shadow-[0_0_20px_-3px_rgba(0,245,255,0.4)]">
            <div className="w-full h-full bg-[#050608] rounded-[7px] flex items-center justify-center">
              <Layers className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold tracking-tight text-sm text-white">
                SHOWROOM
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-normal">
              Curated Landing Page Library
            </p>
          </div>
        </div>

        {/* Center Indicator */}
        <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-zinc-400 border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{totalCount} Pages Live</span>
          <span className="text-zinc-600">•</span>
          <span>{categoriesCount} Categories</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-300">Static / Zero DB</span>
        </div>

        {/* Right Info Badges */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-zinc-400">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-mono text-[11px]">Git-Driven Workflow</span>
          </div>

          <div className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">Vercel Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
};

