import React, { useState, useRef, useEffect } from 'react';
import { Share2, Copy, Check, ChevronDown } from 'lucide-react';

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.53c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.17 1.74 2.65 4.21 3.72.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.18-.48-.3" />
  </svg>
);

const ThreadsIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 24C5.467 24 0 18.533 0 11.814 0 5.094 5.467 0 12.186 0c6.643 0 11.966 5.235 12.012 11.843v.328c0 .54-.438.978-.978.978h-2.186a.978.978 0 0 1-.978-.978v-.328c-.04-4.516-3.708-8.125-8.225-8.125-4.542 0-8.235 3.693-8.235 8.235 0 4.542 3.693 8.235 8.235 8.235 2.502 0 4.79-.115 6.75-3.375a.978.978 0 0 1 1.343-.314l1.83 1.056a.978.978 0 0 1 .314 1.343C19.78 22.84 16.29 24 12.186 24" />
  </svg>
);

export const ShowroomHeader: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://landingvault.dev';

  // Pre-crafted hooked post texts with creator credit & website URL
  const shareData = {
    linkedin: `Found this incredible Landing Page Library crafted by Rajat Debnath 🚀\n\nLive-coded HTML & CSS templates with 100% code fidelity, live sandbox viewports, and zero backend bloat. Pure design and frontend inspiration!\n\n${currentUrl}`,
    x: `Just stumbled upon this slick Landing Page Library crafted by Rajat Debnath ⚡\n\nCurated live-coded HTML templates with zero database overhead and responsive device viewports. Pure inspiration!\n\n${currentUrl} #webdesign #frontend #buildinpublic`,
    whatsapp: `Check out this Landing Page Library crafted by Rajat Debnath — 100% live-coded HTML/CSS templates with instant device viewports: ${currentUrl}`,
    threads: `Obsessed with this landing page showcase crafted by Rajat Debnath ✨ A curated library of live-coded HTML templates with responsive viewports: ${currentUrl}`,
  };

  const handleShare = (platform: 'linkedin' | 'x' | 'whatsapp' | 'threads') => {
    let targetUrl = '';

    switch (platform) {
      case 'linkedin':
        // Copies text to clipboard silently & opens LinkedIn's native post creator pre-filled
        navigator.clipboard.writeText(shareData.linkedin);
        targetUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareData.linkedin)}`;
        break;

      case 'x':
        targetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.x)}`;
        break;

      case 'whatsapp':
        targetUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareData.whatsapp)}`;
        break;

      case 'threads':
        targetUrl = `https://threads.net/intent/post?text=${encodeURIComponent(shareData.threads)}`;
        break;
    }

    if (targetUrl) {
      window.open(targetUrl, '_blank', 'width=650,height=600');
    }
    setIsDropdownOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsDropdownOpen(false);
    }, 1800);
  };

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

        {/* Right: Direct 1-Click Social Share Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#EA4C89] hover:bg-[#F06292] text-white text-xs font-bold shadow-[0_4px_20px_-4px_rgba(234,76,137,0.5)] transition transform hover:-translate-y-0.5 select-none"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Floating Platform Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2.5 w-72 rounded-2xl bg-[#151426] border border-white/[0.1] shadow-2xl p-2 z-50 animate-fade-in text-white backdrop-blur-2xl">
              <div className="px-3 pt-2 pb-1.5">
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#EA4C89]">
                  1-Click Direct Post
                </p>
                <p className="text-xs text-zinc-400">
                  Pre-crafted post ready to publish
                </p>
              </div>

              <div className="space-y-1 pt-1">
                {/* LinkedIn */}
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-[#0077B5]/15 text-left text-xs font-medium hover:text-[#0077B5] transition group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#0077B5] flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <LinkedInIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-white group-hover:text-[#0077B5] transition">Share on LinkedIn</div>
                    <div className="text-[10px] text-zinc-400 truncate">Post box opens pre-filled</div>
                  </div>
                </button>

                {/* X (Twitter) */}
                <button
                  onClick={() => handleShare('x')}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left text-xs font-medium hover:text-white transition group"
                >
                  <div className="w-7 h-7 rounded-lg bg-black border border-white/20 flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <span className="font-bold text-xs">𝕏</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-white transition">Post on Twitter / X</div>
                    <div className="text-[10px] text-zinc-400 truncate">Post box opens pre-filled</div>
                  </div>
                </button>

                {/* WhatsApp */}
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-emerald-500/15 text-left text-xs font-medium hover:text-emerald-400 transition group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-white group-hover:text-emerald-400 transition">Share on WhatsApp</div>
                    <div className="text-[10px] text-zinc-400 truncate">Chat message with preview</div>
                  </div>
                </button>

                {/* Threads */}
                <button
                  onClick={() => handleShare('threads')}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left text-xs font-medium hover:text-white transition group"
                >
                  <div className="w-7 h-7 rounded-lg bg-black border border-white/20 flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <ThreadsIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-white transition">Post on Threads</div>
                    <div className="text-[10px] text-zinc-400 truncate">Threads box opens pre-filled</div>
                  </div>
                </button>

                {/* Divider */}
                <div className="my-1 border-t border-white/[0.06]" />

                {/* Direct Link Copy */}
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-left text-xs font-medium text-zinc-300 hover:text-white transition"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-zinc-300 shrink-0">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-white">{copied ? 'Link Copied!' : 'Copy Direct Link'}</div>
                    <div className="text-[10px] text-zinc-400 truncate">With rich social card preview</div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
