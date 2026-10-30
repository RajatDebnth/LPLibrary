import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const landingPagesDir = path.join(rootDir, 'public', 'landing-pages');
const outputDir = path.join(rootDir, 'src', 'data');
const outputFile = path.join(outputDir, 'pages-manifest.json');

// Ensure directories exist
if (!fs.existsSync(landingPagesDir)) {
  fs.mkdirSync(landingPagesDir, { recursive: true });
}
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function cleanTitle(rawTitle, fallback) {
  if (rawTitle && rawTitle.trim().length > 0) {
    return rawTitle
      .replace(/[\r\n\t]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }
  return fallback
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function formatCategory(folderName) {
  return folderName
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function extractMetadata(htmlContent, fallbackName) {
  // Title regex
  const titleMatch = htmlContent.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const rawTitle = titleMatch ? titleMatch[1] : '';
  const title = cleanTitle(rawTitle, fallbackName);

  // Description regex
  const descMatch =
    htmlContent.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
    htmlContent.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i) ||
    htmlContent.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const description = descMatch ? descMatch[1].trim() : '';

  // Keywords regex
  const keywordsMatch =
    htmlContent.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
    htmlContent.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']keywords["'][^>]*>/i);
  const tags = keywordsMatch
    ? keywordsMatch[1].split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return { title, description, tags };
}

function stringToHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getAuthorInfo(id, category, fallbackName) {
  const hash = stringToHash(id);
  const avatars = [
    'from-pink-500 to-rose-500',
    'from-purple-500 to-indigo-500',
    'from-cyan-400 to-blue-500',
    'from-amber-400 to-orange-500',
    'from-emerald-400 to-teal-500',
  ];
  const avatarGradient = avatars[hash % avatars.length];
  const initialLikes = (hash % 180) + 48;
  const initialViews = ((hash % 38) + 12) / 10; // e.g. 1.2k - 4.9k

  const names = {
    SaaS: ['Apex Studio', 'Nexus Labs', 'LinearCraft', 'HyperCloud'],
    Ecommerce: ['Maison Horology', 'Atelier Mode', 'Verve Retail', 'Luxe Collective'],
    Portfolio: ['Elena Rostova', 'Julian Thorne', 'Studio Koto', 'Arlo Vance'],
    Business: ['Vanguard Capital', 'Aether Advisory', 'Stratos Group', 'Monolith Ventures'],
  };

  const pool = names[category] || ['Creative Studio', 'Design Lab', 'Pixel Co'];
  const authorName = pool[hash % pool.length];

  return {
    author: authorName,
    avatarGradient,
    initialLikes,
    viewsCount: `${initialViews.toFixed(1)}k`,
    isPro: hash % 2 === 0,
  };
}

function scanDirectory(baseDir) {
  const pages = [];
  const categoriesSet = new Set();

  if (!fs.existsSync(baseDir)) return { pages, categories: [] };

  const entries = fs.readdirSync(baseDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;

    const fullPath = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      const categoryRaw = entry.name;
      const category = formatCategory(categoryRaw);
      categoriesSet.add(category);

      const subEntries = fs.readdirSync(fullPath, { withFileTypes: true });

      for (const sub of subEntries) {
        if (sub.name.startsWith('.')) continue;
        const subPath = path.join(fullPath, sub.name);

        if (sub.isFile() && sub.name.toLowerCase().endsWith('.html')) {
          const stats = fs.statSync(subPath);
          const content = fs.readFileSync(subPath, 'utf8');
          const fallbackName = path.basename(sub.name, '.html');
          const meta = extractMetadata(content, fallbackName);

          const relativeUrl = `/landing-pages/${encodeURIComponent(categoryRaw)}/${encodeURIComponent(sub.name)}`;
          const id = `${categoryRaw}-${fallbackName}`.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
          const authorInfo = getAuthorInfo(id, category, fallbackName);

          pages.push({
            id,
            title: meta.title,
            description: meta.description || `Modern ${category} landing page template.`,
            category,
            categorySlug: categoryRaw.toLowerCase(),
            url: relativeUrl,
            fileName: sub.name,
            folder: categoryRaw,
            tags: meta.tags,
            updatedAt: stats.mtime.toISOString(),
            ...authorInfo,
          });
        } else if (sub.isDirectory()) {
          const indexHtmlPath = path.join(subPath, 'index.html');
          let targetHtmlPath = fs.existsSync(indexHtmlPath) ? indexHtmlPath : null;

          if (!targetHtmlPath) {
            const nestedFiles = fs.readdirSync(subPath).filter(f => f.toLowerCase().endsWith('.html'));
            if (nestedFiles.length > 0) {
              targetHtmlPath = path.join(subPath, nestedFiles[0]);
            }
          }

          if (targetHtmlPath) {
            const stats = fs.statSync(targetHtmlPath);
            const content = fs.readFileSync(targetHtmlPath, 'utf8');
            const targetHtmlName = path.basename(targetHtmlPath);
            const fallbackName = sub.name;
            const meta = extractMetadata(content, fallbackName);

            const relativeUrl = `/landing-pages/${encodeURIComponent(categoryRaw)}/${encodeURIComponent(sub.name)}/${encodeURIComponent(targetHtmlName)}`;
            const id = `${categoryRaw}-${sub.name}`.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
            const authorInfo = getAuthorInfo(id, category, fallbackName);

            pages.push({
              id,
              title: meta.title,
              description: meta.description || `Modern ${category} landing page template.`,
              category,
              categorySlug: categoryRaw.toLowerCase(),
              url: relativeUrl,
              fileName: targetHtmlName,
              folder: `${categoryRaw}/${sub.name}`,
              tags: meta.tags,
              updatedAt: stats.mtime.toISOString(),
              ...authorInfo,
            });
          }
        }
      }
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      const category = 'General';
      categoriesSet.add(category);
      const stats = fs.statSync(fullPath);
      const content = fs.readFileSync(fullPath, 'utf8');
      const fallbackName = path.basename(entry.name, '.html');
      const meta = extractMetadata(content, fallbackName);

      const relativeUrl = `/landing-pages/${encodeURIComponent(entry.name)}`;
      const id = `general-${fallbackName}`.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
      const authorInfo = getAuthorInfo(id, category, fallbackName);

      pages.push({
        id,
        title: meta.title,
        description: meta.description || 'Modern standalone landing page.',
        category,
        categorySlug: 'general',
        url: relativeUrl,
        fileName: entry.name,
        folder: '',
        tags: meta.tags,
        updatedAt: stats.mtime.toISOString(),
        ...authorInfo,
      });
    }
  }

  // Sort newest first
  pages.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const categories = Array.from(categoriesSet).sort();

  return {
    scannedAt: new Date().toISOString(),
    totalCount: pages.length,
    categories,
    pages,
  };
}

try {
  const result = scanDirectory(landingPagesDir);
  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf8');
  console.log(`[AutoScanner] Scanned ${result.totalCount} page(s) across ${result.categories.length} category/categories.`);
  console.log(`[AutoScanner] Manifest written to: ${outputFile}`);
} catch (error) {
  console.error('[AutoScanner] Error scanning directory:', error);
  process.exit(1);
}
