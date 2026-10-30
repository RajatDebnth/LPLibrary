import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { exec } from 'child_process';

// Custom plugin to watch public/landing-pages in dev and rerun scanner automatically
function watchLandingPages() {
  let isScanning = false;
  return {
    name: 'watch-landing-pages',
    configureServer(server) {
      const runScan = () => {
        if (isScanning) return;
        isScanning = true;
        exec('node scripts/scan-pages.mjs', (err, stdout, stderr) => {
          isScanning = false;
          if (err) {
            console.error('[Scanner] Error:', stderr || err.message);
          } else {
            console.log('[Scanner] Manifest updated.');
            server.ws.send({ type: 'full-reload' });
          }
        });
      };

      // Watch public/landing-pages directory
      server.watcher.add(path.resolve(__dirname, 'public/landing-pages'));
      server.watcher.on('add', (filePath) => {
        if (filePath.endsWith('.html')) runScan();
      });
      server.watcher.on('unlink', (filePath) => {
        if (filePath.endsWith('.html')) runScan();
      });
      server.watcher.on('change', (filePath) => {
        if (filePath.endsWith('.html')) runScan();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), watchLandingPages()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});

