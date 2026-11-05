// Renders branded share images (1200x630) and Pinterest pins (1000x1500) for every guide,
// plus share images for the homepage, Start Here and each section.
// Run after adding a guide or changing a title:  npm run images:share
// Output: public/og/*.jpg, public/pins/*.jpg and public/og/manifest.json (titles used).
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { contentItems } from '../src/data/content-manifest.ts';
import { sectionDefinitions } from '../src/lib/sections.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = (...parts) => join(root, 'public', ...parts);

// Map photo keys to their JPEG files by reading src/data/photos.ts (it imports images, so Node
// cannot load it directly).
const photosSource = await readFile(join(root, 'src/data/photos.ts'), 'utf8');
const importFiles = new Map([...photosSource.matchAll(/^import (\w+) from '\.\.\/assets\/photos\/([a-z0-9-]+\.jpg)';$/gmu)].map((m) => [m[1], m[2]]));
const keyFiles = new Map([...photosSource.matchAll(/^ {2}'([a-z0-9-]+)': photo\((\w+),/gmu)].map((m) => [m[1], importFiles.get(m[2])]));
const mapBlock = (name) => {
  const start = photosSource.indexOf(`export const ${name}`);
  const block = photosSource.slice(start, photosSource.indexOf('};', start));
  return new Map([...block.matchAll(/^ {2}'?([a-z0-9-]+)'?: '([a-z0-9-]+)',$/gmu)].map((m) => [m[1], m[2]]));
};
const guideKeys = mapBlock('guidePhotoKeys');
const sectionKeys = mapBlock('sectionPhotoKeys');
const photoUrl = (key) => {
  const file = keyFiles.get(key);
  if (!file) throw new Error(`No photo file for key ${key}`);
  return pathToFileURL(join(root, 'src/assets/photos', file)).href;
};

const font = (file) => pathToFileURL(join(root, 'public/fonts', file)).href;
const escape = (text) => text.replace(/[&<>"]/gu, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const mark = `<svg viewBox="0 0 56 56" width="56" height="56"><rect width="56" height="56" rx="16" fill="#0F6B4F"/><path d="M18 14v28M38 14v28" fill="none" stroke="#F5F7F2" stroke-width="4" stroke-linecap="round"/><path d="M18 30c6-6 14-6 20 0" fill="none" stroke="#C6F35E" stroke-width="4" stroke-linecap="round"/><circle cx="28" cy="22" r="3.5" fill="#C6F35E"/></svg>`;

const css = `
@font-face { font-family: Jakarta; src: url('${font('plus-jakarta-sans-latin-wght-normal.woff2')}') format('woff2'); font-weight: 200 800; }
@font-face { font-family: Inter; src: url('${font('inter-latin-wght-normal.woff2')}') format('woff2'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
body { width: var(--w); height: var(--h); overflow: hidden; font-family: Inter, sans-serif; background: #0E1A14; }
.photo { position: absolute; inset: 0; background-size: cover; background-position: center; }
.shade { position: absolute; inset: 0; }
.brand { display: flex; align-items: center; gap: 16px; color: #fff; font-family: Jakarta; font-weight: 800; font-size: 34px; letter-spacing: -0.03em; }
.brand b { color: #C6F35E; font-weight: 800; }
.pill { display: inline-block; background: #C6F35E; color: #0E1A14; font-weight: 700; border-radius: 999px; }
.title { font-family: Jakarta; font-weight: 800; color: #fff; letter-spacing: -0.035em; line-height: 1.04; }
.foot { color: rgba(255,255,255,.82); font-weight: 600; }
`;

const shareHtml = ({ title, label, photo }) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}
:root { --w: 1200px; --h: 630px; }
.shade { background: linear-gradient(90deg, rgba(14,26,20,.94) 0%, rgba(14,26,20,.84) 48%, rgba(14,26,20,.2) 100%); }
.wrap { position: absolute; inset: 0; padding: 56px 64px; display: flex; flex-direction: column; justify-content: space-between; width: 820px; }
.pill { font-size: 22px; padding: 8px 18px; margin-bottom: 22px; }
.title { font-size: ${title.length > 48 ? 56 : 64}px; }
.foot { font-size: 24px; }
</style></head><body>
<div class="photo" style="background-image:url('${photo}')"></div><div class="shade"></div>
<div class="wrap"><div class="brand">${mark}<span>Hydro<b>Rigor</b></span></div>
<div><span class="pill">${escape(label)}</span><h1 class="title">${escape(title)}</h1></div>
<p class="foot">Sourced targets for home growers · hydrorigor.com</p></div></body></html>`;

const pinHtml = ({ title, label, photo }) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}
:root { --w: 1000px; --h: 1500px; }
.photo { bottom: 560px; }
.shade { top: auto; height: 640px; background: #0E1A14; }
.fade { position: absolute; left: 0; right: 0; top: 760px; height: 180px; background: linear-gradient(180deg, rgba(14,26,20,0), #0E1A14); }
.top { position: absolute; top: 48px; left: 56px; }
.brand { background: rgba(14,26,20,.82); padding: 14px 24px 14px 16px; border-radius: 22px; }
.wrap { position: absolute; left: 64px; right: 64px; bottom: 0; height: 640px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
.pill { font-size: 28px; padding: 10px 24px; margin-bottom: 28px; }
.title { font-size: ${title.length > 48 ? 76 : 86}px; }
.foot { margin-top: 40px; font-size: 32px; }
</style></head><body>
<div class="photo" style="background-image:url('${photo}')"></div><div class="fade"></div><div class="shade"></div>
<div class="top"><div class="brand">${mark}<span>Hydro<b>Rigor</b></span></div></div>
<div class="wrap"><span class="pill">${escape(label)}</span><h1 class="title">${escape(title)}</h1>
<p class="foot">Read the sourced guide at hydrorigor.com</p></div></body></html>`;

const sectionLabel = (category) => {
  if (category === 'reviews') return 'Reviews';
  if (category === 'compare') return 'Comparisons';
  return sectionDefinitions.find(({ id }) => id === category)?.navLabel ?? 'Guide';
};

const jobs = [];
for (const item of contentItems) {
  const key = guideKeys.get(item.route);
  if (!key) throw new Error(`${item.route} has no photo key in src/data/photos.ts`);
  const data = { title: item.title, label: sectionLabel(item.category), photo: photoUrl(key) };
  jobs.push({ file: out('og', `${item.route}.jpg`), html: shareHtml(data), width: 1200, height: 630, title: item.title, id: item.route });
  jobs.push({ file: out('pins', `${item.route}.jpg`), html: pinHtml(data), width: 1000, height: 1500 });
}
for (const section of sectionDefinitions) {
  const key = sectionKeys.get(section.id);
  if (!key) throw new Error(`Section ${section.id} has no photo key`);
  jobs.push({ file: out('og', `section-${section.id}.jpg`), html: shareHtml({ title: section.title, label: section.eyebrow, photo: photoUrl(key) }), width: 1200, height: 630, title: section.title, id: `section-${section.id}` });
}
jobs.push({ file: out('og', 'home.jpg'), html: shareHtml({ title: 'Grow indoors with evidence, not guesswork.', label: 'Hydroponics for home growers', photo: photoUrl('systems-home-nft-lights') }), width: 1200, height: 630, title: 'home', id: 'home' });
jobs.push({ file: out('og', 'start.jpg'), html: shareHtml({ title: 'Start with the decision you need to make.', label: 'New to hydroponics', photo: photoUrl('lettuce-net-pots-clay') }), width: 1200, height: 630, title: 'start', id: 'start' });

await mkdir(out('og'), { recursive: true });
await mkdir(out('pins'), { recursive: true });
const work = await mkdtemp(join(tmpdir(), 'hr-share-'));
const browser = await chromium.launch();
const page = await browser.newPage();
const manifest = {};
try {
  for (const [index, job] of jobs.entries()) {
    await page.setViewportSize({ width: job.width, height: job.height });
    const htmlFile = join(work, `${index}.html`);
    await writeFile(htmlFile, job.html);
    await page.goto(pathToFileURL(htmlFile).href, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: job.file, type: 'jpeg', quality: 82 });
    if (job.id) manifest[job.id] = job.title;
  }
} finally {
  await browser.close();
  await rm(work, { recursive: true, force: true });
}
await writeFile(out('og', 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
process.stdout.write(`Rendered ${jobs.length} images into public/og and public/pins.\n`);
