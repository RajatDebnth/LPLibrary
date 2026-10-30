import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const svgPath = path.join(rootDir, 'public', 'og-image.svg');
const pngPath = path.join(rootDir, 'public', 'og-image.png');

try {
  const svg = fs.readFileSync(svgPath, 'utf8');
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  fs.writeFileSync(pngPath, pngBuffer);
  console.log(`[OG Generator] Successfully generated 1200x630 PNG: ${pngPath}`);
} catch (err) {
  console.error('[OG Generator] Error:', err);
  process.exit(1);
}
