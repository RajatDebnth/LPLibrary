import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  ChevronLeft,
  ChevronRight,
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
  isLiked?: boolean;
  isSaved?: boolean;
  likeCount?: number;
  onToggleLike?: (e: React.MouseEvent, pageId: string) => void;
  onToggleSave?: (e: React.MouseEvent, pageId: string) => void;
  onSelectTag?: (tag: string) => void;
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
}) => {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');

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

  // Viewport width styling
  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return 'w-[375px] h-[812px] max-h-[calc(100vh-140px)] rounded-3xl border-4 border-zinc-700 shadow-2xl';
      case 'tablet':
        return 'w-[768px] h-[1024px] max-h-[calc(100vh-140px)] rounded-2xl border-4 border-zinc-700 shadow-2xl';
      case 'desktop':
      default:
        return 'w-full h-full rounded-none border-0';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0D0C22]/95 backdrop-blur-2xl text-white animate-fade-in overflow-hidden">
      {/* Top Dribbble-Style Shot Header */}
      <div className="h-14 px-4 sm:px-6 border-b border-white/[0.08] bg-[#151426] flex items-center justify-between shrink-0 gap-4">
        {/* Left: Author Profile & Shot Title */}
        <div className="flex items-center space-x-3 min-w-0">
          <div
            className={`w-8 h-8 rounded-full bg-gradient-to-tr ${page.avatarGradient} flex items-center justify-center text-xs font-bold text-white shadow-md shrink-0`}
          >
            {page.author.charAt(0)}
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-[220px] sm:max-w-md">
                {page.title}
              </h2>
              {page.isPro && (
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#EA4C89]/20 text-[#EA4C89] border border-[#EA4C89]/30 shrink-0">
                  ORIGINAL
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-zinc-400">
              <span className="font-medium text-white hover:text-[#EA4C89] transition">
                {page.author}
              </span>
              <span>•</span>
              <span className="text-[#EA4C89] font-medium">{page.category}</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">Open for Inspiration</span>
            </div>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="hidden md:flex items-center p-0.5 rounded-full bg-[#0D0C22] border border-white/[0.08]">
          <button
            onClick={() => setViewport('desktop')}
            title="Desktop View (1440px)"
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${viewport === 'desktop'
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
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${viewport === 'tablet'
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
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${viewport === 'mobile'
              ? 'bg-white text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
              }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right: Dribbble Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Previous / Next buttons */}
          <div className="hidden lg:flex items-center space-x-1 border-r border-white/10 pr-2 mr-1">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Previous template (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-zinc-500 px-1">
              {currentIndex + 1}/{totalCount}
            </span>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Next template (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Visit Live Page Button */}
          <a
            href={page.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#EA4C89] hover:bg-[#F06292] text-white text-xs font-bold transition shadow-lg shadow-[#EA4C89]/30"
          >
            <span>Visit Live Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Close Modal */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#0D0C22] border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition ml-1"
            title="Close Preview (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage - Full space for preview site */}
      <div
        className={`flex-1 w-full bg-[#0A0915] flex flex-col items-center overflow-auto ${viewport === 'desktop' ? 'p-0 justify-stretch' : 'p-4 sm:p-8 justify-center'
          }`}
      >
        {/* Canvas Frame */}
        <div
          className={`transition-all duration-300 bg-black overflow-hidden flex flex-col ${viewport === 'desktop'
            ? 'w-full h-full rounded-none border-0'
            : `my-auto shrink-0 ${getViewportWidth()}`
            }`}
        >
          <iframe
            key={page.id}
            src={`${page.url}?v=${Date.parse(page.updatedAt) || '1'}`}
            title={page.title}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
};
