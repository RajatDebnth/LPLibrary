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
  Folder,
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
        return 'w-[375px] h-[812px] rounded-3xl border-4 border-zinc-800 shadow-2xl';
      case 'tablet':
        return 'w-[768px] h-[1024px] rounded-2xl border-4 border-zinc-800 shadow-2xl';
      case 'desktop':
      default:
        return 'w-full h-full rounded-none border-0';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#050608]/95 backdrop-blur-2xl text-white animate-fade-in">
      {/* Top Navigation & Controls Bar */}
      <div className="h-16 px-4 sm:px-6 border-b border-white/[0.08] bg-[#08090D] flex items-center justify-between shrink-0">
        {/* Left: Title & Metadata */}
        <div className="flex items-center space-x-4 min-w-0">
          <div className="hidden sm:flex items-center space-x-1.5 font-mono text-xs text-zinc-400">
            <span>{currentIndex + 1}</span>
            <span>/</span>
            <span>{totalCount}</span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                {page.category}
              </span>
              <h2 className="text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-md">
                {page.title}
              </h2>
            </div>
            <div className="hidden sm:flex items-center space-x-1 text-[11px] text-zinc-400 font-mono">
              <Folder className="w-3 h-3" />
              <span>{page.folder}</span>
            </div>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/[0.08]">
          <button
            onClick={() => setViewport('desktop')}
            title="Desktop View (1440px)"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              viewport === 'desktop'
                ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Desktop</span>
          </button>

          <button
            onClick={() => setViewport('tablet')}
            title="Tablet View (768px)"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              viewport === 'tablet'
                ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>

          <button
            onClick={() => setViewport('mobile')}
            title="Mobile View (375px)"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              viewport === 'mobile'
                ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          {/* Previous / Next buttons */}
          <div className="hidden sm:flex items-center space-x-1 border-r border-white/10 pr-2 mr-2">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Previous page (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Next page (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Copy link */}
          <button
            onClick={handleCopy}
            title="Copy URL"
            className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] text-zinc-300 hover:text-white transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Open full in new tab */}
          <a
            href={page.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 text-black text-xs font-semibold hover:bg-cyan-300 transition shadow-lg shadow-cyan-500/20"
          >
            <span>Open Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-red-500/20 hover:border-red-500/40 text-zinc-400 hover:text-red-300 transition"
            title="Close Showroom (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Viewer Stage */}
      <div className="flex-1 overflow-auto bg-[#030406] flex items-center justify-center p-2 sm:p-6 relative">
        <div className={`transition-all duration-300 bg-black overflow-hidden flex flex-col ${getViewportWidth()}`}>
          <iframe
            key={page.id}
            src={page.url}
            title={page.title}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
};

