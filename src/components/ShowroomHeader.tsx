import React from 'react';
import { Search, Heart, Bookmark, Upload } from 'lucide-react';

interface ShowroomHeaderProps {
  totalCount: number;
  savedCount: number;
  likedCount: number;
  onFilterSaved: () => void;
  isSavedActive: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const ShowroomHeader: React.FC<ShowroomHeaderProps> = ({
  totalCount,
  savedCount,
  likedCount,
  onFilterSaved,
  isSavedActive,
  searchTerm,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0D0C22]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Dribbble-Style Brand & Nav */}
        <div className="flex items-center space-x-8">
          <a href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#EA4C89] via-[#F06292] to-[#FF8A80] p-[2px] shadow-[0_0_20px_-3px_rgba(234,76,137,0.5)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0D0C22] rounded-full flex items-center justify-center">
                {/* Dribbble basketball silhouette */}
                <svg className="w-5 h-5 text-[#EA4C89]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                  <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                  <path d="M8.5 2.5c2 4 2.5 9 1 14.5" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold tracking-tight text-white font-sans">
                Landing<span className="text-[#EA4C89]">bble</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#EA4C89]/20 text-[#EA4C89] border border-[#EA4C89]/30">
                PRO
              </span>
            </div>
          </a>

          {/* Dribbble Top Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-zinc-300">
            <span className="text-white hover:text-[#EA4C89] transition cursor-pointer flex items-center space-x-1.5">
              <span>Explore</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#EA4C89]/20 text-[#EA4C89]">
                {totalCount}
              </span>
            </span>
            <span className="hover:text-white transition cursor-pointer text-zinc-400">
              Shots
            </span>
            <span className="hover:text-white transition cursor-pointer text-zinc-400">
              Designers
            </span>
            <span className="hover:text-white transition cursor-pointer text-zinc-400">
              Inspiration
            </span>
          </nav>
        </div>

        {/* Center: Search Bar in Header for medium+ screens */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search 18M+ creative shots..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#18172E] border border-white/[0.08] text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-[#EA4C89] focus:ring-2 focus:ring-[#EA4C89]/20 transition"
            />
          </div>
        </div>

        {/* Right: Actions, Saved Collection, Stats & Upload */}
        <div className="flex items-center space-x-3">
          {/* Saved Collection Toggle */}
          <button
            onClick={onFilterSaved}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition ${
              isSavedActive
                ? 'bg-[#EA4C89] text-white shadow-[0_0_15px_-3px_rgba(234,76,137,0.4)]'
                : 'bg-[#18172E] text-zinc-300 border border-white/[0.08] hover:text-white hover:border-white/20'
            }`}
            title="View saved collection"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSavedActive ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">Saved</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/30 text-[10px] font-mono">
              {savedCount}
            </span>
          </button>

          {/* Likes Counter Badge */}
          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-full bg-[#18172E] border border-white/[0.08] text-xs text-zinc-300">
            <Heart className="w-3.5 h-3.5 text-[#EA4C89] fill-[#EA4C89]" />
            <span className="font-mono text-[11px]">{likedCount} Liked</span>
          </div>

          {/* Share / Dropdown Pill */}
          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#EA4C89] hover:bg-[#F06292] text-white text-xs font-semibold shadow-[0_4px_20px_-4px_rgba(234,76,137,0.5)] transition transform hover:-translate-y-0.5">
              <Upload className="w-3.5 h-3.5" />
              <span>Share Work</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
