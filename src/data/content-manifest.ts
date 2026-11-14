import { getSectionDefinition, type ArticleCategory } from '../lib/sections.ts';
import { getM06Path, m06ContentItems, type M06ContentItem, type M06Intent } from './m06-content.ts';

/**
 * Every published guide on the site: the 25 launch guides (M06, frozen) plus the
 * Phase 2+ guides from the 100-article plan (docs/research/PHASE2_CONTENT_PLAN.md).
 *
 * To publish a new guide:
 *   1. Add one entry to `phase2ContentItems` below, using the plan ID as `id` and the
 *      planned route. Titles follow the CLAUDE.md title rule.
 *   2. Create the MDX file in `src/content/<collection>/<route>.mdx` with the same title,
 *      route and source IDs.
 *   3. Add its photo in `src/data/photos.ts`, and remove its section from
 *      `EMPTY_SECTION_PATHS` if it is the first guide there.
 * `tests/content-manifest.test.mjs` and `npm run test:content` enforce all of this.
 */
export type ContentCollection = 'articles' | 'reviews' | 'comparisons';
export type ContentCategory = ArticleCategory | 'reviews' | 'compare';
export type ContentIntent = M06Intent | 'utility';

export interface ContentItem {
  /** Plan ID from the 100-article plan (1–25 are the launch guides). */
  id: number;
  collection: ContentCollection;
  category: ContentCategory;
  title: string;
  route: string;
  primaryIntent: ContentIntent;
  primaryTopic: string;
  /** Where the keyword figures came from, e.g. "UBERSUGGEST_2026-11-03", or "NOT_MEASURED". */
  metricStatus: string;
  volume?: number;
  seoDifficulty?: number;
  sourceIds: readonly string[];
  toolLinks: readonly string[];
}

export const phase2ContentItems: readonly ContentItem[] = [
  {
    id: 59,
    collection: 'articles',
    category: 'systems',
    title: 'Hydroponic Tower Garden: How It Works, Crops & DIY Build',
    route: 'hydroponic-tower-garden',
    primaryIntent: 'informational',
    primaryTopic: 'hydroponic tower',
    metricStatus: 'UBERSUGGEST_2026-11-06',
    volume: 6600,
    seoDifficulty: 33,
    sourceIds: ['okstate-vertical-tower-hla6724', 'ifas-stlucie-vertical-towers', 'touliatos-vertical-lettuce-2016', 'wortman-vertical-strawberry-2016', 'osu-ph-ec-guide', 'uky-hydroponic-lettuce', 'ua-strawberry-irrigation', 'osu-hydro-hints-nft', 'osu-hydro-hints-dwc', 'ifas-kratky-set-and-forget'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 41,
    collection: 'articles',
    category: 'crops',
    title: 'Hydroponic Basil: pH, EC, Light & Harvest Guide',
    route: 'hydroponic-basil',
    primaryIntent: 'informational',
    primaryTopic: 'hydroponic basil',
    metricStatus: 'UBERSUGGEST_2026-11-03',
    volume: 880,
    seoDifficulty: 11,
    sourceIds: ['osu-ph-ec-guide', 'gomez-basil-small-scale-2020', 'walters-basil-dli-temperature-2023', 'walters-basil-density-2015', 'osu-hydro-hints-nft'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 28,
    collection: 'articles',
    category: 'systems',
    title: 'Kratky Hydroponics: No-Pump Setup, Air Gap & Crops',
    route: 'kratky-hydroponics',
    primaryIntent: 'informational',
    primaryTopic: 'kratky hydroponic system',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['ifas-kratky-set-and-forget', 'kratky-noncirculating-lettuce', 'ctahr-kratky-vc1', 'kratky-suspended-pot-2004', 'uky-hydroponic-lettuce', 'osu-hydro-hints-dwc', 'osu-hydro-hints-nft'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
];

export const contentItems: readonly ContentItem[] = [
  ...m06ContentItems.map((item: M06ContentItem): ContentItem => ({ ...item })),
  ...phase2ContentItems,
];

export function getContentPath(item: ContentItem): string {
  if (item.collection === 'reviews') return `/reviews/${item.route}/`;
  if (item.collection === 'comparisons') return `/compare/${item.route}/`;
  if (item.id <= 25) return getM06Path(item as M06ContentItem);
  return `/${getSectionDefinition(item.category).slug}/${item.route}/`;
}
