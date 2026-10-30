import { useState, useMemo } from 'react';
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
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [previewPage, setPreviewPage] = useState<LandingPage | null>(null);

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
        // Category filter
        if (
          selectedCategory !== 'all' &&
          page.category.toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          return false;
        }

        // Search term filter
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchTitle = page.title.toLowerCase().includes(query);
          const matchDesc = page.description.toLowerCase().includes(query);
          const matchCat = page.category.toLowerCase().includes(query);
          const matchFolder = page.folder.toLowerCase().includes(query);
          const matchTags = page.tags.some((tag) => tag.toLowerCase().includes(query));

          return matchTitle || matchDesc || matchCat || matchFolder || matchTags;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'alphabetical') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'oldest') {
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        }
        // newest (default)
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [searchTerm, selectedCategory, sortBy]);

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
  };

  return (
    <div className="min-h-screen bg-[#050608] bg-showroom-grid text-slate-100 flex flex-col antialiased">
      {/* Top Glass Header */}
      <ShowroomHeader
        totalCount={manifest.totalCount}
        categoriesCount={manifest.categories.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Editorial Hero */}
        <ShowroomHero
          totalCount={manifest.totalCount}
          categoriesCount={manifest.categories.length}
        />

        {/* Search, Filter Pills & Sort Controls */}
        <div className="pt-10">
          <FilterBar
            categories={manifest.categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            categoryCounts={categoryCounts}
            totalCount={manifest.totalCount}
          />
        </div>

        {/* Gallery Grid or Empty State */}
        {filteredPages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPages.map((page) => (
              <ShowroomCard
                key={page.id}
                page={page}
                onPreview={(p) => setPreviewPage(p)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onReset={handleResetFilters}
          />
        )}
      </main>

      {/* Showroom Fullscreen Inspection Modal */}
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
        />
      )}

      {/* Minimalist Apple/Sony Footer */}
      <footer className="border-t border-white/[0.06] bg-[#050608] py-10 px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-400 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00F5FF]"></span>
            <span className="text-zinc-300 font-semibold tracking-tight">LANDING PAGE LIBRARY</span>
            <span className="text-zinc-400">— Digital Showroom Edition</span>
          </div>
          <div>
            Built with React, TypeScript & Tailwind CSS • Powered by Git & Vercel
          </div>
        </div>
      </footer>
    </div>
  );
}

