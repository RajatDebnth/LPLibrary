import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Bookmark,
} from 'lucide-react';
import { LandingPage, ViewportMode } from '../types';

interface ShowroomModalProps {
  page: LandingPage | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  currentIndex: number;
  totalCount: number;
  isLiked: boolean;
  isSaved: boolean;
  likeCount: number;
  onToggleLike: (e: React.MouseEvent, pageId: string) => void;
  onToggleSave: (e: React.MouseEvent, pageId: string) => void;
  onSelectTag: (tag: string) => void;
}

export const ShowroomModal: React.FC<ShowroomModalProps> = ({
  page,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  currentIndex,
  totalCount,
  isLiked,
  isSaved,
  likeCount,
  onToggleLike,
  onToggleSave,
  onSelectTag,
}) => {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [copied, setCopied] = useState(false);

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!page) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page, hasPrev, hasNext, onClose, onPrev, onNext]);

  if (!page) return null;

  const handleCopy = () => {
    const fullUrl = `${window.location.origin}${page.url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Viewport width styling
  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return 'w-[375px] h-[812px] rounded-3xl border-4 border-zinc-700 shadow-2xl';
      case 'tablet':
        return 'w-[768px] h-[1024px] rounded-2xl border-4 border-zinc-700 shadow-2xl';
      case 'desktop':
      default:
        return 'w-full h-full rounded-none border-0';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0D0C22]/95 backdrop-blur-2xl text-white animate-fade-in overflow-hidden">
      {/* Top Dribbble-Style Shot Header */}
      <div className="h-20 px-4 sm:px-8 border-b border-white/[0.08] bg-[#151426] flex items-center justify-between shrink-0 gap-4">
        {/* Left: Author Profile & Shot Title */}
        <div className="flex items-center space-x-3.5 min-w-0">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-tr ${page.avatarGradient} flex items-center justify-center text-sm font-bold text-white shadow-md shrink-0`}
          >
            {page.author.charAt(0)}
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white truncate max-w-[220px] sm:max-w-md">
                {page.title}
              </h2>
              {page.isPro && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/10 shrink-0">
                  PRO
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 text-xs text-zinc-400">
              <span className="font-medium text-white hover:text-[#EA4C89] transition">
                {page.author}
              </span>
              <span>•</span>
              <span className="text-[#EA4C89] font-medium">{page.category}</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">Available for work</span>
            </div>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="hidden md:flex items-center p-1 rounded-full bg-[#0D0C22] border border-white/[0.08]">
          <button
            onClick={() => setViewport('desktop')}
            title="Desktop View (1440px)"
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
              viewport === 'desktop'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>

          <button
            onClick={() => setViewport('tablet')}
            title="Tablet View (768px)"
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
              viewport === 'tablet'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>

          <button
            onClick={() => setViewport('mobile')}
            title="Mobile View (375px)"
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
              viewport === 'mobile'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right: Dribbble Action Buttons */}
        <div className="flex items-center space-x-2.5">
          {/* Previous / Next buttons */}
          <div className="hidden lg:flex items-center space-x-1 border-r border-white/10 pr-2 mr-1">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Previous shot (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-zinc-500 px-1">
              {currentIndex + 1}/{totalCount}
            </span>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Next shot (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bookmark / Save */}
          <button
            onClick={(e) => onToggleSave(e, page.id)}
            className={`p-2.5 rounded-full border transition ${
              isSaved
                ? 'bg-[#EA4C89] border-[#EA4C89] text-white shadow-md shadow-[#EA4C89]/30'
                : 'bg-[#0D0C22] border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
            }`}
            title={isSaved ? 'Saved' : 'Save Shot'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Like Shot with Count */}
          <button
            onClick={(e) => onToggleLike(e, page.id)}
            className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-full border transition ${
              isLiked
                ? 'bg-[#EA4C89] border-[#EA4C89] text-white shadow-md shadow-[#EA4C89]/30'
                : 'bg-[#0D0C22] border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
            }`}
            title="Like this shot"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-white' : 'text-[#EA4C89]'}`} />
            <span className="text-xs font-semibold font-mono">{likeCount}</span>
          </button>

          {/* Visit Site Button */}
          <a
            href={page.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-full bg-[#EA4C89] hover:bg-[#F06292] text-white text-xs font-bold transition shadow-lg shadow-[#EA4C89]/30"
          >
            <span>Visit Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Close Modal */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#0D0C22] border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition ml-1"
            title="Close Shot (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 overflow-auto bg-[#0A0915] flex flex-col items-center justify-start p-4 sm:p-8">
        {/* Canvas Frame */}
        <div className={`transition-all duration-300 bg-black overflow-hidden flex flex-col my-auto ${getViewportWidth()}`}>
          <iframe
            key={page.id}
            src={page.url}
            title={page.title}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>

        {/* Shot Info & Tags bar beneath canvas */}
        <div className="w-full max-w-4xl mt-6 p-6 rounded-2xl bg-[#151426] border border-white/[0.08] shadow-xl shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{page.title}</h3>
              <p className="text-sm text-zinc-400">{page.description}</p>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-full bg-[#0D0C22] border border-white/10 text-xs font-medium text-zinc-300 hover:text-white hover:border-white/20 transition self-start sm:self-auto"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
          </div>

          {/* Tags */}
          {page.tags && page.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.06]">
              <span className="text-xs text-zinc-500 font-medium">Tags:</span>
              {page.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    onSelectTag(tag);
                    onClose();
                  }}
                  className="px-3 py-1 rounded-full bg-white/[0.04] hover:bg-[#EA4C89]/20 hover:text-[#EA4C89] border border-white/[0.08] text-xs text-zinc-300 transition"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
