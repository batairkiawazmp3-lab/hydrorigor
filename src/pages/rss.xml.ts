/**
 * RSS feed of published guides, newest change first, for readers' feed apps and for Kit's
 * RSS-to-email automation (the newsletter in src/data/newsletter.ts). A rebuilt guide gets a new
 * item (its guid carries the updated date), so subscribers hear about rebuilds as well as new guides.
 */
import { getCollection } from 'astro:content';
import { contentItems, getContentPath } from '../data/content-manifest.ts';
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from '../lib/site.ts';

const escapeXml = (value: string) =>
  value.replace(/&/gu, '&amp;').replace(/</gu, '&lt;').replace(/>/gu, '&gt;').replace(/"/gu, '&quot;').replace(/'/gu, '&apos;');

export async function GET() {
  const entries = [
    ...(await getCollection('articles', ({ data }) => !data.draft)),
    ...(await getCollection('reviews', ({ data }) => !data.draft)),
    ...(await getCollection('comparisons', ({ data }) => !data.draft)),
  ];
  const entryByRoute = new Map(entries.map((entry) => [entry.data.route, entry]));

  const items = contentItems
    .flatMap((item) => {
      const entry = entryByRoute.get(item.route);
      if (!entry) return [];
      const changed: Date = entry.data.updatedDate ?? entry.data.publishDate;
      return [{ item, entry, changed }];
    })
    .sort((a, b) => b.changed.getTime() - a.changed.getTime() || a.item.title.localeCompare(b.item.title))
    .slice(0, 30);

  const lastBuild = items[0]?.changed ?? new Date(0);
  const body = items
    .map(({ item, entry, changed }) => {
      const url = absoluteUrl(getContentPath(item));
      const day = changed.toISOString().slice(0, 10);
      return [
        '    <item>',
        `      <title>${escapeXml(item.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="false">${url}#updated-${day}</guid>`,
        `      <pubDate>${changed.toUTCString()}</pubDate>`,
        `      <description>${escapeXml(entry.data.description)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    `    <title>${SITE_NAME} guides</title>`,
    `    <link>${absoluteUrl('/')}</link>`,
    `    <description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    '    <language>en</language>',
    `    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>`,
    body,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
