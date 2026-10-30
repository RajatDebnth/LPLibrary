import React, { useState } from 'react';
import { ExternalLink, Maximize2, Folder, Calendar } from 'lucide-react';
import { LandingPage } from '../types';
import { formatDate } from '../lib/utils';

interface ShowroomCardProps {
  page: LandingPage;
  onPreview: (page: LandingPage) => void;
}

export const ShowroomCard: React.FC<ShowroomCardProps> = ({ page, onPreview }) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Category subtle pill coloring
  const getCategoryTheme = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('saas') || cat.includes('ai')) {
      return 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10';
    }
    if (cat.includes('ecommerce') || cat.includes('shop')) {
      return 'border-amber-500/30 text-amber-300 bg-amber-500/10';
    }
    if (cat.includes('portfolio')) {
      return 'border-purple-500/30 text-purple-300 bg-purple-500/10';
    }
    if (cat.includes('business') || cat.includes('finance')) {
      return 'border-blue-500/30 text-blue-300 bg-blue-500/10';
    }
    return 'border-zinc-500/30 text-zinc-300 bg-zinc-500/10';
  };

  return (
    <div
      onClick={() => onPreview(page)}
      className="group relative flex flex-col rounded-2xl bg-[#0B0D13] border border-white/[0.07] hover:border-cyan-400/40 hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.8),0_0_25px_-5px_rgba(0,245,255,0.2)] transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Visual Preview Container (16:10 aspect ratio) */}
      <div className="relative aspect-[16/10] w-full bg-[#050608] overflow-hidden border-b border-white/[0.05]">
        {/* Shimmer loading skeleton */}
        {!isIframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/40">
            <div className="w-6 h-6 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin"></div>
          </div>
        )}

        {/* Scaled Live Iframe Preview */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <iframe
            src={page.url}
            title={page.title}
            onLoad={() => setIsIframeLoaded(true)}
            sandbox="allow-scripts allow-same-origin"
            tabIndex={-1}
            aria-hidden="true"
            className="w-[1440px] h-[900px] border-0 origin-top-left scale-[0.27] sm:scale-[0.27] md:scale-[0.25] lg:scale-[0.27] xl:scale-[0.28] select-none"
            loading="lazy"
          />
        </div>

        {/* Hover Sheen & Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <div className="flex items-center space-x-3 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview(page);
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-400 text-black text-xs font-semibold shadow-lg shadow-cyan-500/30 hover:bg-cyan-300 transition"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Showroom Preview</span>
            </button>

            <a
              href={page.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 transition"
              title="Open full page in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Top-right direct launch icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-zinc-400 hover:text-white border border-white/10 inline-block">
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Folder path */}
          <div className="flex items-center justify-between mb-3">
            <span
              className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md border ${getCategoryTheme(
                page.category
              )}`}
            >
              {page.category}
            </span>
            <div className="flex items-center space-x-1 text-[11px] text-zinc-400 font-mono">
              <Folder className="w-3 h-3" />
              <span className="truncate max-w-[140px]">{page.folder}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base text-white group-hover:text-cyan-300 transition tracking-tight line-clamp-1 mb-1.5">
            {page.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {page.description}
          </p>
        </div>

        {/* Card Footer: Tags & Date */}
        <div className="mt-4 pt-3.5 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-3 h-3 text-zinc-400" />
            <span>{formatDate(page.updatedAt)}</span>
          </div>

          <div className="flex items-center space-x-1 text-cyan-400/80 group-hover:text-cyan-400 text-xs font-sans font-medium">
            <span>Explore</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

