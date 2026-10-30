import React from 'react';
import { Search, Sparkles, TrendingUp } from 'lucide-react';

interface ShowroomHeroProps {
  totalCount: number;
  categoriesCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSelectTag: (tag: string) => void;
}

export const ShowroomHero: React.FC<ShowroomHeroProps> = ({
  totalCount,
  categoriesCount,
  searchTerm,
  onSearchChange,
  onSelectTag,
}) => {
  const trendingTags = ['SaaS', 'AI', 'Ecommerce', 'Portfolio', 'Business', 'Luxury', 'Minimal'];

  return (
    <section className="relative pt-16 pb-12 overflow-hidden text-center">
      {/* Ambient Radial Pink & Violet Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(234,76,137,0.14)_0%,rgba(99,102,241,0.08)_40%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Playful Pill Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#EA4C89]/30 bg-[#EA4C89]/10 text-[#EA4C89] text-xs font-medium mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Landing Page Showcase</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-300 font-mono">{totalCount} Live Templates</span>
        </div>

        {/* Big Editorial Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
          Discover the world’s top{' '}
          <span className="bg-gradient-to-r from-[#EA4C89] via-[#FF8A80] to-[#F48FB1] bg-clip-text text-transparent">
            landing pages.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#9E9EA7] max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
          Explore inspiring, live-coded HTML templates with zero database overhead. Coded for production, tested for responsiveness, and ready to deploy.
        </p>

        {/* Large Dribbble-Style Search Pill (Visible especially on mobile or hero focus) */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative group">
            <Search className="w-5 h-5 text-zinc-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-[#EA4C89] transition-colors" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search landing pages, tags, or categories (e.g., 'SaaS', 'Dark Mode')..."
              className="w-full pl-14 pr-32 py-4 rounded-full bg-[#18172E] border border-white/[0.1] text-base text-white placeholder-zinc-400 focus:outline-none focus:border-[#EA4C89] focus:ring-4 focus:ring-[#EA4C89]/15 shadow-2xl transition"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#0D0C22] text-zinc-400 border border-white/10 hidden sm:inline-block">
                {categoriesCount} Categories
              </span>
            </div>
          </div>
        </div>

        {/* Trending Tags Row */}
        <div className="flex items-center justify-center flex-wrap gap-2 text-xs text-zinc-400">
          <span className="flex items-center space-x-1 text-zinc-500 mr-1">
            <TrendingUp className="w-3.5 h-3.5 text-[#EA4C89]" />
            <span>Trending:</span>
          </span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className="px-3 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/[0.06] transition text-zinc-300"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
