import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const products = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/products.json'), 'utf8'));
const manifestFile = path.join(rootDir, 'src/data/visualizerManifest.js');
const manifestContent = fs.readFileSync(manifestFile, 'utf8');

console.log('=== KANHA GRANITE AND MARBLE AUDIT & INTEGRITY REPORT ===');
console.log(`Total Products in Catalogue: ${products.length}`);

const categoryCounts = {};
let missingImages = 0;
let missingTextures = 0;
let verifiedCount = 0;
let illustrativeCount = 0;

products.forEach((p) => {
  categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;

  const imagePath = path.join(rootDir, 'public', p.image);
  const texturePath = path.join(rootDir, 'public', p.textureImage);

  if (!fs.existsSync(imagePath)) {
    console.error(`[MISSING IMAGE] Product ${p.id}: ${p.image}`);
    missingImages++;
  }

  if (!fs.existsSync(texturePath)) {
    console.error(`[MISSING TEXTURE] Product ${p.id}: ${p.textureImage}`);
    missingTextures++;
  }

  if (p.isIllustrative) {
    illustrativeCount++;
  } else {
    verifiedCount++;
  }
});

console.log('Breakdown by Category:');
Object.entries(categoryCounts).forEach(([cat, count]) => {
  console.log(`  - ${cat}: ${count} varieties`);
});

console.log(`Verified Material Photography: ${verifiedCount}`);
console.log(`Illustrative Samples Identified: ${illustrativeCount}`);
console.log(`Missing Image Files: ${missingImages}`);
console.log(`Missing Texture Files: ${missingTextures}`);

// Count Visualizer Prepared Combinations
const matches = manifestContent.match(/'([a-z0-9-]+__[a-z0-9-]+__[a-z0-9-]+)':/g);
console.log(`Visualizer Explicit Photographic Combinations: ${matches ? matches.length : 0}`);

if (missingImages === 0 && missingTextures === 0) {
  console.log('>>> ALL PRODUCT & TEXTURE FILES VERIFIED ON DISK (100% PASS) <<<');
} else {
  process.exit(1);
}
