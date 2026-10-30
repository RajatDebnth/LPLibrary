import React from 'react';
import { Sparkles, Cpu, Globe2, ShieldCheck } from 'lucide-react';

interface ShowroomHeroProps {
  totalCount: number;
  categoriesCount: number;
}

export const ShowroomHero: React.FC<ShowroomHeroProps> = ({
  totalCount,
  categoriesCount,
}) => {
  return (
    <section className="relative pt-16 pb-12 overflow-hidden border-b border-white/[0.05]">
      {/* Ambient Radial Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(0,245,255,0.12)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-3xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-300 text-xs font-mono mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Architectural Digital Showroom</span>
            </div>

            {/* Editorial Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-6">
              Digital Showroom for{' '}
              <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                Landing Pages.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-light">
              An uncompromised catalog of standalone HTML templates. Drop any page into your folders, push to GitHub, and let the showroom curate the rest.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 sm:gap-4 shrink-0">
            <div className="p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-md">
              <div className="flex items-center space-x-2 text-zinc-400 text-xs mb-1">
                <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono uppercase text-[10px] tracking-wider text-zinc-400">Templates</span>
              </div>
              <div className="text-2xl font-bold text-white font-mono">{totalCount}</div>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-md">
              <div className="flex items-center space-x-2 text-zinc-400 text-xs mb-1">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-mono uppercase text-[10px] tracking-wider text-zinc-400">Categories</span>
              </div>
              <div className="text-2xl font-bold text-white font-mono">{categoriesCount}</div>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-md">
              <div className="flex items-center space-x-2 text-zinc-400 text-xs mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono uppercase text-[10px] tracking-wider text-zinc-400">Backend</span>
              </div>
              <div className="text-sm font-semibold text-zinc-200 mt-1">0% / Zero DB</div>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-md">
              <div className="flex items-center space-x-2 text-zinc-400 text-xs mb-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono uppercase text-[10px] tracking-wider text-zinc-400">Engine</span>
              </div>
              <div className="text-sm font-semibold text-zinc-200 mt-1">Auto-Detect</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

