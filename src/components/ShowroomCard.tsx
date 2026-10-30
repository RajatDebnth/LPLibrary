import React, { useState } from 'react';
import { Heart, Eye, Bookmark, Maximize2, ExternalLink } from 'lucide-react';
import { LandingPage } from '../types';

interface ShowroomCardProps {
  page: LandingPage;
  isLiked: boolean;
  isSaved: boolean;
  likeCount: number;
  onToggleLike: (e: React.MouseEvent, pageId: string) => void;
  onToggleSave: (e: React.MouseEvent, pageId: string) => void;
  onPreview: (page: LandingPage) => void;
}

export const ShowroomCard: React.FC<ShowroomCardProps> = ({
  page,
  isLiked,
  isSaved,
  likeCount,
  onToggleLike,
  onToggleSave,
  onPreview,
}) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [likeBurst, setLikeBurst] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLikeBurst(true);
    setTimeout(() => setLikeBurst(false), 450);
    onToggleLike(e, page.id);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(e, page.id);
  };

  return (
    <div
      onClick={() => onPreview(page)}
      className="group flex flex-col cursor-pointer select-none"
    >
      {/* Dribbble Shot Container */}
      <div className="relative aspect-[4/3] w-full rounded-2xl bg-[#18172E] border border-white/[0.08] group-hover:border-[#EA4C89]/50 overflow-hidden shadow-dribbble-shot group-hover:shadow-dribbble-hover transition-all duration-300">
        {/* Loading shimmer */}
        {!isIframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#151426]">
            <div className="w-7 h-7 rounded-full border-2 border-[#EA4C89]/30 border-t-[#EA4C89] animate-spin"></div>
          </div>
        )}

        {/* Live Miniature Iframe */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <iframe
            src={page.url}
            title={page.title}
            onLoad={() => setIsIframeLoaded(true)}
            sandbox="allow-scripts allow-same-origin"
            tabIndex={-1}
            aria-hidden="true"
            className="w-[1440px] h-[1080px] border-0 origin-top-left scale-[0.24] sm:scale-[0.25] md:scale-[0.23] lg:scale-[0.26] select-none"
            loading="lazy"
          />
        </div>

        {/* Dribbble Hover Overlay with Gradient & Quick Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4">
          {/* Top Row: Save & Like Icon Buttons */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10">
              {page.category}
            </span>

            <div className="flex items-center space-x-2">
              {/* Save / Bookmark Button */}
              <button
                onClick={handleSave}
                title={isSaved ? 'Remove from Saved' : 'Save to Collection'}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition backdrop-blur-md ${
                  isSaved
                    ? 'bg-[#EA4C89] text-white shadow-lg shadow-[#EA4C89]/40'
                    : 'bg-white/20 text-white hover:bg-white hover:text-black'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>

              {/* Heart / Like Button */}
              <button
                onClick={handleLike}
                title={isLiked ? 'Unlike Template' : 'Like Template'}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition backdrop-blur-md ${
                  isLiked
                    ? 'bg-[#EA4C89] text-white shadow-lg shadow-[#EA4C89]/40'
                    : 'bg-white/20 text-white hover:bg-white hover:text-[#EA4C89]'
                } ${likeBurst ? 'scale-125' : ''}`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Center: Quick Preview CTA */}
          <div className="flex justify-center items-center">
            <div className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold tracking-tight shadow-xl flex items-center space-x-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Preview Page</span>
            </div>
          </div>

          {/* Bottom of Overlay: Shot Title */}
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white truncate max-w-[80%] drop-shadow-md">
              {page.title}
            </h4>

            <a
              href={page.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition backdrop-blur-md"
              title="Open full page in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Dribbble Shot Footer: Creator Info & Engagement Metrics */}
      <div className="mt-3 px-1 flex items-center justify-between">
        {/* Creator / Author with Avatar */}
        <div className="flex items-center space-x-2 min-w-0">
          <div
            className={`w-6 h-6 rounded-full bg-gradient-to-tr ${page.avatarGradient} flex items-center justify-center text-[10px] font-bold text-white shadow-sm shrink-0`}
          >
            {page.author.charAt(0)}
          </div>

          <span className="text-xs font-semibold text-white group-hover:text-[#EA4C89] transition truncate">
            {page.author}
          </span>

          {page.isPro && (
            <span className="text-[9px] uppercase font-bold tracking-wider px-1 py-0.2 rounded bg-[#EA4C89]/20 text-[#EA4C89] border border-[#EA4C89]/30 shrink-0">
              ORIGINAL
            </span>
          )}
        </div>

        {/* Engagement Stats: Likes & Views */}
        <div className="flex items-center space-x-3 text-xs text-zinc-400 font-medium shrink-0">
          {/* Like button with counter */}
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 transition ${
              isLiked ? 'text-[#EA4C89]' : 'hover:text-[#EA4C89]'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-transform ${
                isLiked ? 'fill-[#EA4C89] text-[#EA4C89]' : 'text-zinc-400'
              } ${likeBurst ? 'scale-125' : ''}`}
            />
            <span className="text-[11px] font-mono">{likeCount}</span>
          </button>

          {/* Views count */}
          <div className="flex items-center space-x-1 text-zinc-400">
            <Eye className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono">{page.viewsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
