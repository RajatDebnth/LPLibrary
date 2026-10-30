import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SocialPlatform = 'linkedin' | 'x' | 'instagram' | 'link';

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [platform, setPlatform] = useState<SocialPlatform>('linkedin');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://landingvault.dev';
  const creatorLinkedin = 'https://www.linkedin.com/in/rajat-debnath/';

  // Hooked copy written from a visitor's perspective praising Rajat Debnath
  const posts = {
    linkedin: `Found this incredible Landing Page Library built by Rajat Debnath (${creatorLinkedin}) 🚀\n\nIt features clean, live-coded HTML & CSS landing pages with 100% code fidelity, live sandbox viewports, and zero backend bloat. Huge design and frontend inspiration for web developers, founders, and designers!\n\nCheck it out here: ${currentUrl}`,
    x: `Just stumbled upon this slick Landing Page Library built by Rajat Debnath ⚡\n\nCurated live-coded HTML templates with zero database overhead and responsive device viewports. Pure design inspiration for frontend builders!\n\nExplore it here: ${currentUrl} #webdesign #frontend #buildinpublic`,
    instagram: `Obsessed with this landing page showcase built by Rajat Debnath (${creatorLinkedin}) ✨\n\nCurated library of live-coded HTML/CSS landing pages with responsive viewports. Huge design inspiration for developers & founders!\n\nCheck it out: ${currentUrl}\n.\n.\n#webdesign #landingpage #frontend #developer #uidesign #inspiration #buildinpublic`,
  };

  const activePostText = platform !== 'link' ? posts[platform] : currentUrl;

  const handleCopyText = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShareLinkedIn = () => {
    handleCopyText(posts.linkedin);
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(linkedinUrl, '_blank', 'width=650,height=600');
  };

  const handleShareX = () => {
    const tweetText = `Just stumbled upon this slick Landing Page Library built by Rajat Debnath (${creatorLinkedin}) ⚡\n\nLive-coded HTML templates with zero DB overhead & responsive viewports. Pure inspiration!\n\n${currentUrl}`;
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(xUrl, '_blank', 'width=600,height=500');
  };

  const handleShareInstagram = () => {
    handleCopyText(posts.instagram);
    window.open('https://www.instagram.com', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-xl rounded-3xl bg-[#151426] border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EA4C89]/20 border border-[#EA4C89]/30 flex items-center justify-center text-[#EA4C89]">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-sans">
                Share this Showcase
              </h3>
              <p className="text-xs text-zinc-400">
                Crafted & curated by <span className="text-white font-medium">Rajat Debnath</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Platform Selector Tabs */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-[#0D0C22] border border-white/[0.06]">
            {/* LinkedIn */}
            <button
              onClick={() => setPlatform('linkedin')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                platform === 'linkedin'
                  ? 'bg-[#0077B5] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </button>

            {/* X (Twitter) */}
            <button
              onClick={() => setPlatform('x')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                platform === 'x'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <span className="font-bold text-xs">𝕏</span>
              <span className="hidden sm:inline">Twitter</span>
            </button>

            {/* Instagram */}
            <button
              onClick={() => setPlatform('instagram')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                platform === 'instagram'
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Instagram</span>
            </button>

            {/* Quick Link */}
            <button
              onClick={() => setPlatform('link')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                platform === 'link'
                  ? 'bg-[#EA4C89] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Direct Link</span>
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-6 space-y-4">
          {/* Creator Attribution Note */}
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-400">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-[#EA4C89]" />
              <span>
                Crediting creator:{' '}
                <a
                  href={creatorLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#EA4C89] underline underline-offset-2 font-medium transition"
                >
                  Rajat Debnath
                </a>
              </span>
            </div>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#EA4C89]/20 text-[#EA4C89]">
              Linked
            </span>
          </div>

          {/* Post Preview Box */}
          <div className="relative rounded-2xl bg-[#0D0C22] border border-white/[0.08] p-4 text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto selection:bg-[#EA4C89]/30">
            {activePostText}
          </div>

          {/* Toast Alert when Copied */}
          {copied && (
            <div className="flex items-center justify-center space-x-1.5 text-xs font-semibold text-emerald-400 py-1 animate-fade-in">
              <Check className="w-4 h-4" />
              <span>Hooked post copied to clipboard! Paste directly into your post.</span>
            </div>
          )}

          {/* Primary Action Button Based on Platform */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            {platform === 'linkedin' && (
              <>
                <button
                  onClick={handleShareLinkedIn}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-full bg-[#0077B5] hover:bg-[#006097] text-white text-xs font-bold transition shadow-lg shadow-[#0077B5]/30"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  <span>Copy Post & Open LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </button>

                <button
                  onClick={() => handleCopyText(posts.linkedin)}
                  className="px-5 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold transition"
                >
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
              </>
            )}

            {platform === 'x' && (
              <>
                <button
                  onClick={handleShareX}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold transition shadow-lg shadow-white/20"
                >
                  <span className="font-bold text-sm">𝕏</span>
                  <span>Post on Twitter / X</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </button>

                <button
                  onClick={() => handleCopyText(posts.x)}
                  className="px-5 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold transition"
                >
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
              </>
            )}

            {platform === 'instagram' && (
              <>
                <button
                  onClick={handleShareInstagram}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:opacity-95 text-white text-xs font-bold transition shadow-lg shadow-pink-500/25"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Copy Caption & Open Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </button>

                <button
                  onClick={() => handleCopyText(posts.instagram)}
                  className="px-5 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold transition"
                >
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
              </>
            )}

            {platform === 'link' && (
              <button
                onClick={() => handleCopyText(currentUrl)}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-[#EA4C89] hover:bg-[#F06292] text-white text-xs font-bold transition shadow-lg shadow-[#EA4C89]/30"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Direct Link'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
