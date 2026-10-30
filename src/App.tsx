import { useState, useMemo, useEffect } from 'react';
import manifestData from './data/pages-manifest.json';
import { PagesManifest, LandingPage, SortOption } from './types';
import { ShowroomHeader } from './components/ShowroomHeader';
import { ShowroomHero } from './components/ShowroomHero';
import { FilterBar } from './components/FilterBar';
import { ShowroomCard } from './components/ShowroomCard';
import { ShowroomModal } from './components/ShowroomModal';
import { EmptyState } from './components/EmptyState';

const manifest = manifestData as PagesManifest;

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [previewPage, setPreviewPage] = useState<LandingPage | null>(null);
  const [isSavedActive, setIsSavedActive] = useState(false);

  // Likes & Saves persisted in localStorage
  const [likedPages, setLikedPages] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('landingvault_likes');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [savedPages, setSavedPages] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('landingvault_saved');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Dynamic like counts based on base counts + user's like
  const [customLikes, setCustomLikes] = useState<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    for (const page of manifest.pages) {
      counts[page.id] = page.initialLikes;
    }
    return counts;
  });

  // Save to localStorage when likedPages changes
  useEffect(() => {
    try {
      localStorage.setItem('landingvault_likes', JSON.stringify(Array.from(likedPages)));
    } catch (e) {
      console.error(e);
    }
  }, [likedPages]);

  // Save to localStorage when savedPages changes
  useEffect(() => {
    try {
      localStorage.setItem('landingvault_saved', JSON.stringify(Array.from(savedPages)));
    } catch (e) {
      console.error(e);
    }
  }, [savedPages]);

  const toggleLike = (e: React.MouseEvent, pageId: string) => {
    e.stopPropagation();
    setLikedPages((prev) => {
      const next = new Set(prev);
      const isCurrentlyLiked = next.has(pageId);
      if (isCurrentlyLiked) {
        next.delete(pageId);
        setCustomLikes((current) => ({
          ...current,
          [pageId]: Math.max(0, (current[pageId] || 1) - 1),
        }));
      } else {
        next.add(pageId);
        setCustomLikes((current) => ({
          ...current,
          [pageId]: (current[pageId] || 0) + 1,
        }));
      }
      return next;
    });
  };

  const toggleSave = (e: React.MouseEvent, pageId: string) => {
    e.stopPropagation();
    setSavedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageId)) {
        next.delete(pageId);
      } else {
        next.add(pageId);
      }
      return next;
    });
  };

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const page of manifest.pages) {
      counts[page.category] = (counts[page.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Filtered and sorted pages
  const filteredPages = useMemo(() => {
    return manifest.pages
      .filter((page) => {
        // Saved filter
        if (isSavedActive && !savedPages.has(page.id)) {
          return false;
        }

        // Category filter
        if (
          selectedCategory !== 'all' &&
          page.category.toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          return false;
        }

        // Search filter
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchTitle = page.title.toLowerCase().includes(query);
          const matchDesc = page.description.toLowerCase().includes(query);
          const matchCat = page.category.toLowerCase().includes(query);
          const matchAuthor = page.author.toLowerCase().includes(query);
          const matchTags = page.tags.some((tag) => tag.toLowerCase().includes(query));

          return matchTitle || matchDesc || matchCat || matchAuthor || matchTags;
        }

        return true;
      })
      .sort((a, b) => {
        const likesA = customLikes[a.id] || a.initialLikes;
        const likesB = customLikes[b.id] || b.initialLikes;

        if (sortBy === 'popular') {
          return likesB - likesA;
        }
        if (sortBy === 'alphabetical') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'oldest') {
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        }
        // newest
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [searchTerm, selectedCategory, sortBy, isSavedActive, savedPages, customLikes]);

  // Modal navigation index
  const currentIndex = useMemo(() => {
    if (!previewPage) return -1;
    return filteredPages.findIndex((p) => p.id === previewPage.id);
  }, [previewPage, filteredPages]);

  const handlePrevModal = () => {
    if (currentIndex > 0) {
      setPreviewPage(filteredPages[currentIndex - 1]);
    }
  };

  const handleNextModal = () => {
    if (currentIndex < filteredPages.length - 1) {
      setPreviewPage(filteredPages[currentIndex + 1]);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setIsSavedActive(false);
  };

  const handleSelectTag = (tag: string) => {
    setSearchTerm(tag);
  };

  return (
    <div className="min-h-screen bg-[#0D0C22] bg-dribbble-mesh text-[#F3F4F6] flex flex-col antialiased selection:bg-[#EA4C89]/30 selection:text-[#EA4C89]">
      {/* Dribbble Top Navigation */}
      <ShowroomHeader
        totalCount={manifest.totalCount}
        savedCount={savedPages.size}
        likedCount={likedPages.size}
        onFilterSaved={() => setIsSavedActive((prev) => !prev)}
        isSavedActive={isSavedActive}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Dribbble Hero */}
        <ShowroomHero
          totalCount={manifest.totalCount}
          categoriesCount={manifest.categories.length}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSelectTag={handleSelectTag}
        />

        {/* Filter Pills & Sort Dropdown */}
        <FilterBar
          categories={manifest.categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setIsSavedActive(false);
          }}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categoryCounts={categoryCounts}
          totalCount={manifest.totalCount}
        />

        {/* Active Filter Indicator banner if in Saved Mode */}
        {isSavedActive && (
          <div className="mb-6 p-4 rounded-2xl bg-[#EA4C89]/10 border border-[#EA4C89]/30 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#EA4C89]">
              Viewing your Saved Collection ({savedPages.size} templates)
            </span>
            <button
              onClick={() => setIsSavedActive(false)}
              className="text-xs font-semibold text-white hover:underline"
            >
              Show all templates →
            </button>
          </div>
        )}

        {/* Dribbble Shots 3-column / 4-column Grid */}
        {filteredPages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredPages.map((page) => (
              <ShowroomCard
                key={page.id}
                page={page}
                isLiked={likedPages.has(page.id)}
                isSaved={savedPages.has(page.id)}
                likeCount={customLikes[page.id] || page.initialLikes}
                onToggleLike={toggleLike}
                onToggleSave={toggleSave}
                onPreview={(p) => setPreviewPage(p)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            isSavedActive={isSavedActive}
            onReset={handleResetFilters}
          />
        )}
      </main>

      {/* Dribbble Shot Inspection Modal */}
      {previewPage && (
        <ShowroomModal
          page={previewPage}
          onClose={() => setPreviewPage(null)}
          onPrev={handlePrevModal}
          onNext={handleNextModal}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < filteredPages.length - 1}
          currentIndex={currentIndex}
          totalCount={filteredPages.length}
          isLiked={likedPages.has(previewPage.id)}
          isSaved={savedPages.has(previewPage.id)}
          likeCount={customLikes[previewPage.id] || previewPage.initialLikes}
          onToggleLike={toggleLike}
          onToggleSave={toggleSave}
          onSelectTag={handleSelectTag}
        />
      )}

      {/* Showcase Footer */}
      <footer className="border-t border-white/[0.08] bg-[#0A0915] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#EA4C89] flex items-center justify-center text-white">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                    <circle cx="6" cy="7" r="1" fill="currentColor" />
                    <circle cx="9" cy="7" r="1" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  Landing<span className="text-[#EA4C89]">Vault</span>
                </span>
              </div>
              <p className="text-sm text-zinc-400 max-w-sm">
                My personal landing page library & archive. Handcrafted, live-coded HTML templates open for everyone to explore and take inspiration.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 text-sm text-zinc-400 font-medium">
              <span className="hover:text-white transition cursor-pointer">All Templates</span>
              <span className="hover:text-white transition cursor-pointer">My Work</span>
              <span className="hover:text-white transition cursor-pointer">Live Demos</span>
              <span className="hover:text-white transition cursor-pointer">Responsive Tests</span>
              <span className="hover:text-white transition cursor-pointer">Inspiration</span>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div>
              © 2026 LandingVault • Personal Showcase. All rights reserved.
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#EA4C89] animate-pulse"></span>
              <span>100% Coded HTML Fidelity • Zero Database • Git & Vercel Driven</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
