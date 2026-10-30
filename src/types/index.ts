export interface LandingPage {
  id: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  url: string;
  fileName: string;
  folder: string;
  tags: string[];
  updatedAt: string;
  author: string;
  avatarGradient: string;
  initialLikes: number;
  viewsCount: string;
  isPro: boolean;
}

export interface PagesManifest {
  scannedAt: string;
  totalCount: number;
  categories: string[];
  pages: LandingPage[];
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export type SortOption = 'popular' | 'newest' | 'alphabetical' | 'oldest';
