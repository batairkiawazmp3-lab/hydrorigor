import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { contentItems as m06ContentItems, getContentPath as getM06Path } from '../src/data/content-manifest.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distRoot = join(projectRoot, 'dist');
const siteOrigin = 'https://hydrorigor.com';
const forbiddenPublicPaths = [
  '/nutrients/',
  '/best/best-hydroponic-system-for-home-growers/',
];
const fixturePaths = [
  '/systems/development-sample-system-article/',
  '/reviews/development-sample-review/',
  '/compare/development-sample-comparison/',
];

const failures = [];
let internalPageReferences = 0;
let sameSiteAssetReferences = 0;
let fragmentReferences = 0;

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

function toPosix(value) {
  return value.split(sep).join('/');
}

function htmlRoute(file) {
  const rel = toPosix(relative(distRoot, file));
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel}`;
}

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&#x2F;', '/')
    .replaceAll('&#47;', '/')
    .replaceAll('&quot;', '"');
}

function extractAttribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, 'i'))?.[1];
}

function extractRobots(html) {
  return html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] ?? '';
}

function extractCanonical(html) {
  const tag = html.match(/<link\b[^>]*\brel="canonical"[^>]*>/i)?.[0];
  return tag ? extractAttribute(tag, 'href') : undefined;
}

function extractIds(html) {
  return new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => decodeHtml(match[1])));
}

async function existingDestination(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    failures.push(`Invalid percent-encoding in internal path: ${pathname}`);
    return undefined;
  }

  const relativePath = decoded.replace(/^\/+/, '');
  const candidates = decoded.endsWith('/')
    ? [join(distRoot, relativePath, 'index.html')]
    : [
        join(distRoot, relativePath),
        join(distRoot, `${relativePath}.html`),
        join(distRoot, relativePath, 'index.html'),
      ];

  for (const candidate of candidates) {
    const resolved = resolve(candidate);
    if (!resolved.startsWith(resolve(distRoot) + sep) && resolved !== resolve(distRoot)) continue;
    try {
      if ((await stat(resolved)).isFile()) return resolved;
    } catch {
      // Try the next static-output shape.
    }
  }
  return undefined;
}

function classify(pathname, destinationFile) {
  return extname(pathname) === '' || destinationFile.endsWith('.html') ? 'page' : 'asset';
}

async function validateReference(rawValue, sourceRoute, sourceFile, sourceHtml, kind) {
  const value = decodeHtml(rawValue.trim());
  if (!value || value === '#' || /^(?:mailto|tel|data|javascript):/i.test(value)) return;

  let url;
  try {
    url = new URL(value, `${siteOrigin}${sourceRoute}`);
  } catch {
    failures.push(`${sourceRoute}: invalid ${kind} URL ${value}`);
    return;
  }

  if (url.origin !== siteOrigin) {
    if (url.protocol !== 'https:') failures.push(`${sourceRoute}: external ${kind} must use HTTPS: ${value}`);
    return;
  }
  if (extractRobots(sourceHtml) === 'index, follow' && fixturePaths.includes(url.pathname)) {
    failures.push(`${sourceRoute}: public page links to development fixture ${url.pathname}`);
  }
  const destinationFile = await existingDestination(url.pathname);
  if (!destinationFile) {
    failures.push(`${sourceRoute}: ${kind} ${value} does not resolve in dist`);
    return;
  }

  const referenceType = classify(url.pathname, destinationFile);
  if (referenceType === 'page') internalPageReferences += 1;
  else sameSiteAssetReferences += 1;

  if (forbiddenPublicPaths.some((path) => url.pathname === path || url.pathname.startsWith(path))) {
    failures.push(`${sourceRoute}: links to forbidden legacy path ${url.pathname}`);
  }

  if (url.hash && url.hash !== '#') {
    fragmentReferences += 1;
    const targetHtml = destinationFile === sourceFile ? sourceHtml : await readFile(destinationFile, 'utf8');
    const fragment = decodeURIComponent(url.hash.slice(1));
    if (!extractIds(targetHtml).has(fragment)) {
      failures.push(`${sourceRoute}: fragment ${url.hash} is missing from ${url.pathname}`);
    }
  }
}

const distFiles = await walk(distRoot);
const htmlFiles = distFiles.filter((file) => file.endsWith('.html'));
const htmlByRoute = new Map();

for (const file of htmlFiles) {
  const route = htmlRoute(file);
  const html = await readFile(file, 'utf8');
  htmlByRoute.set(route, { file, html });

  for (const match of html.matchAll(/<(?:a|link|script|img|source)\b[^>]*>/gi)) {
    const tag = match[0];
    for (const attribute of ['href', 'src']) {
      const value = extractAttribute(tag, attribute);
      if (value) await validateReference(value, route, file, html, `${attribute} reference`);
    }
    const srcset = extractAttribute(tag, 'srcset');
    if (srcset) {
      for (const candidate of srcset.split(',').map((entry) => entry.trim().split(/\s+/)[0]).filter(Boolean)) {
        await validateReference(candidate, route, file, html, 'srcset reference');
      }
    }
  }

  const canonical = extractCanonical(html);
  const indexable = extractRobots(html) === 'index, follow';
  if (!canonical && indexable) {
    failures.push(`${route}: canonical link is missing`);
  } else if (canonical) {
    if (indexable && canonical !== `${siteOrigin}${route}`) {
      failures.push(`${route}: canonical does not match its public route`);
    }
    await validateReference(canonical, route, file, html, 'canonical');
  }

  if (indexable && fixturePaths.includes(route)) {
    failures.push(`${route}: development fixture is indexable`);
  }
}

for (const file of distFiles.filter((candidate) => candidate.endsWith('.css'))) {
  const source = await readFile(file, 'utf8');
  const route = `/${toPosix(relative(distRoot, file))}`;
  for (const match of source.matchAll(/url\((['"]?)([^)'"\s]+)\1\)/gi)) {
    await validateReference(match[2], route, file, source, 'CSS asset');
  }
}

for (const file of distFiles.filter((candidate) => candidate.endsWith('.js'))) {
  const source = await readFile(file, 'utf8');
  const route = `/${toPosix(relative(distRoot, file))}`;
  for (const match of source.matchAll(/(?:import\s*\(|from\s*)["'](\/[^"]+?)["']/g)) {
    await validateReference(match[1], route, file, source, 'JavaScript module');
  }
}

const sitemapFiles = distFiles.filter((file) => /sitemap.*\.xml$/i.test(file));
const sitemapUrls = new Set();
for (const file of sitemapFiles) {
  const xml = await readFile(file, 'utf8');
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const value = decodeHtml(match[1]);
    sitemapUrls.add(value);
    const sourceRoute = `/${toPosix(relative(distRoot, file))}`;
    await validateReference(value, sourceRoute, file, xml, 'sitemap URL');
  }
}

for (const [route, { html }] of htmlByRoute) {
  if (extractRobots(html) !== 'index, follow') continue;
  const canonical = extractCanonical(html);
  if (canonical && !sitemapUrls.has(canonical)) {
    failures.push(`${route}: indexable canonical is absent from the sitemap`);
  }
}

for (const fixturePath of fixturePaths) {
  const fixture = htmlByRoute.get(fixturePath);
  if (!fixture) failures.push(`${fixturePath}: expected noindex fixture output is missing`);
  else if (extractRobots(fixture.html) !== 'noindex, nofollow') failures.push(`${fixturePath}: fixture must remain noindex, nofollow`);
  if (sitemapUrls.has(`${siteOrigin}${fixturePath}`)) failures.push(`${fixturePath}: fixture appears in sitemap`);
}

for (const item of m06ContentItems) {
  const route = getM06Path(item);
  const page = htmlByRoute.get(route);
  if (!page) failures.push(`${route}: M06 production output is missing`);
  else if (extractRobots(page.html) !== 'index, follow') failures.push(`${route}: M06 page is not indexable`);
  if (!sitemapUrls.has(`${siteOrigin}${route}`)) failures.push(`${route}: M06 page is absent from sitemap`);
}

if (failures.length > 0) {
  process.stderr.write(`${failures.join('\n')}\n`);
  process.exit(1);
}

process.stdout.write(
  `Built link integrity passed: ${htmlFiles.length} HTML files, ${internalPageReferences} internal page references, `
  + `${sameSiteAssetReferences} same-site asset references, ${fragmentReferences} fragment references, `
  + `${sitemapUrls.size} sitemap locations, and ${m06ContentItems.length} M06 production pages.\n`,
);
