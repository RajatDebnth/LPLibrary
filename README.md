# LandingVault — Personal Landing Page Showcase & Archive

A personal digital showcase to organize, present, and inspect all my standalone HTML landing pages in one live library. Open for everyone to explore and take inspiration. 

Built with **React**, **TypeScript**, **Tailwind CSS**, **Git**, and **Vercel**. Designed with Apple minimalism, Sony luxury dark surfaces, Linear micro-interactions, and Awwwards-level visual polish.

---

## ⚡ Key Highlights

- **Zero Backend & Zero Database:** No CMS, no server, no SQL, and no complex configuration.
- **100% Code Fidelity:** Every landing page preserves its exact original HTML, CSS, JavaScript, fonts, and animations.
- **Automated Detection:** Simply drop an HTML file or folder into `public/landing-pages/`. The build engine automatically parses `<title>`, descriptions, categories, and tags.
- **Cinematic Showroom View:** Scaled live sandboxed iframes for cards, plus an immersive full-screen modal with responsive viewport switchers (**Desktop 1440px**, **Tablet 768px**, **Mobile 375px**).
- **Search & Filter:** Instant client-side search across titles, descriptions, categories, and tags, with dynamic folder-derived category tabs.

---

## 📁 How to Add New Landing Pages

Simply create a folder under `public/landing-pages/` named after your category, and drop your HTML page inside:

```text
public/landing-pages/
├── SaaS/
│   └── apex-ai/
│       ├── index.html
│       ├── style.css (optional)
│       └── script.js (optional)
├── Ecommerce/
│   └── chronos-luxury/
│       └── index.html
├── Portfolio/
│   └── elena-rostova/
│       └── index.html
└── Business/
    └── vanguard-capital/
        └── index.html
```

> **Tip:** You can either drop a single `.html` file (e.g. `public/landing-pages/SaaS/my-page.html`) or a dedicated directory with an `index.html` and assets. The `<title>` and `<meta name="description">` tags are extracted automatically.

---

## 🚀 Development & Build

### 1. Run Locally
```bash
npm run dev
```
The development server will scan your folders, start Vite at `http://localhost:3000`, and hot-reload whenever you add or modify HTML files.

### 2. Manual Scan (Optional)
```bash
npm run scan
```

### 3. Production Build
```bash
npm run build
```
This automatically runs `npm run scan` before `vite build`, writing the production bundle and all landing page assets directly into `dist/`.

---

## 🌐 Deploy to Vercel

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Landing Page Showroom"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Import the repository in [Vercel](https://vercel.com).
3. Vercel automatically detects Vite and runs `npm run build`.
4. Done! Every future `git push` will automatically update the showroom with your latest landing pages.

