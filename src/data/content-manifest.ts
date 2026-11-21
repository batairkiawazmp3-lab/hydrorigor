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
  },  {
    id: 66,
    collection: 'articles',
    category: 'best',
    title: 'pH Meter for Hydroponics: How to Choose & Calibrate',
    route: 'hydroponic-ph-meter',
    primaryIntent: 'commercial research',
    primaryTopic: 'ph meter hydroponics',
    metricStatus: 'UBERSUGGEST_2026-11-06',
    volume: 590,
    seoDifficulty: 15,
    sourceIds: ['umass-ph-ec-pens', 'msu-calibrate-ph-ec', 'purdue-inhouse-ph-ec', 'osu-ph-ec-guide', 'uky-monitoring-ph-ec'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 26,
    collection: 'articles',
    category: 'systems',
    title: 'What Is Hydroponics? How It Works, Systems & Key Numbers',
    route: 'what-is-hydroponics',
    primaryIntent: 'informational',
    primaryTopic: 'what is a hydroponic system',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['osu-hydro-hints-overview', 'mu-hydroponic-farming', 'mu-nutrient-solutions', 'osu-ph-ec-guide', 'okstate-hydroponics-hla6442', 'vt-system-crop-comparisons', 'uky-hydroponic-lettuce', 'psu-plant-nutrition', 'illinois-hydroponics-at-home', 'ifas-kratky-set-and-forget', 'osu-hydro-hints-nft', 'osu-hydro-hints-buckets', 'barbosa-lettuce-water-energy-2015', 'hoagland-arnon-circular-347-1938'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 27,
    collection: 'articles',
    category: 'systems',
    title: 'Types of Hydroponic Systems: DWC, NFT, Drip & 5 More',
    route: 'types-of-hydroponic-systems',
    primaryIntent: 'informational',
    primaryTopic: 'hydroponic system types',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['okstate-hydroponics-hla6442', 'osu-hydro-hints-overview', 'mu-hydroponic-farming', 'uga-home-hydroponics', 'ifas-kratky-set-and-forget', 'ctahr-kratky-vc1', 'kratky-suspended-pot-2004', 'vt-system-crop-comparisons', 'uky-hydroponic-lettuce', 'ifas-lettuce-small-systems', 'osu-hydro-hints-dwc', 'ifas-volusia-dwc-bucket', 'osu-hydro-hints-nft', 'purdue-hydroponics-opportunities-2016', 'sato-modified-nft-2007', 'osu-hydro-hints-ebb-flow', 'osu-hydro-hints-buckets', 'aces-greenhouse-tomato-anr2955', 'okstate-vertical-tower-hla6724', 'touliatos-vertical-lettuce-2016', 'osu-ph-ec-guide', 'illinois-hydroponics-at-home'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 29,
    collection: 'articles',
    category: 'systems',
    title: 'NFT Hydroponic System: Slope, Flow, Spacing & Setup',
    route: 'nft-hydroponic-system',
    primaryIntent: 'informational',
    primaryTopic: 'nft hydroponic system',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['vt-nft-systems', 'aces-greenhouse-lettuce-anr2903', 'osu-hydro-hints-nft', 'mu-hydroponic-farming', 'purdue-hydroponics-opportunities-2016', 'sato-modified-nft-2007', 'okstate-hydroponics-hla6442', 'osu-ph-ec-guide', 'purdue-lettuce-ec-ho309', 'uky-hydroponic-lettuce', 'vt-system-crop-comparisons', 'ifas-lettuce-small-systems', 'egro-lettuce-tipburn-2023', 'osu-hydro-hints-buckets', 'liu-organic-nft-lettuce-2025', 'osu-hydro-hints-dwc', 'osu-hydro-hints-overview', 'ifas-kratky-set-and-forget', 'illinois-hydroponics-at-home'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 30,
    collection: 'articles',
    category: 'systems',
    title: 'Ebb and Flow Hydroponics: Flood Timing, Media & Setup',
    route: 'ebb-and-flow-hydroponics',
    primaryIntent: 'informational',
    primaryTopic: 'ebb and flow hydroponics',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['osu-hydro-hints-ebb-flow', 'umass-subirrigation-systems', 'uga-subirrigation-poinsettia-2000', 'illinois-hydroponics-handouts', 'vt-system-crop-comparisons', 'okstate-hydroponics-hla6442', 'osu-ph-ec-guide', 'osu-hydro-hints-overview', 'mu-hydroponic-farming', 'uky-hydroponic-lettuce', 'ifas-lettuce-small-systems', 'ifas-kratky-set-and-forget', 'illinois-hydroponics-at-home'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 31,
    collection: 'articles',
    category: 'systems',
    title: 'Dutch Bucket Hydroponics: Setup, Drip Rates & Best Crops',
    route: 'dutch-bucket-hydroponics',
    primaryIntent: 'informational',
    primaryTopic: 'dutch bucket hydroponics',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['osu-hydro-hints-buckets', 'ifas-perlite-tomato-cucumber-hs169', 'uky-irrigation-hydroponic-ccd-sp20', 'vt-system-crop-comparisons', 'yang-dutch-bucket-cucumber-substrates-2022', 'ifas-hydroponic-methods-part2-2025', 'mu-hydroponics-for-beginners', 'tennessee-fruiting-crops', 'aces-greenhouse-tomato-anr2955', 'utk-trust-tomato-density-2012', 'osu-ph-ec-guide', 'ifas-hydroponic-tomato-formulation', 'msstate-tomato-ph', 'msstate-blossom-end-rot', 'vt-management-basics-spes462', 'purdue-supplemental-light-lettuce', 'usu-indoor-tomatoes', 'mu-hydroponic-farming'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 32,
    collection: 'articles',
    category: 'systems',
    title: 'Drip Hydroponic System: Emitters, Timing, Drain & Setup',
    route: 'drip-hydroponic-system',
    primaryIntent: 'informational',
    primaryTopic: 'drip hydroponic system',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['ifas-water-nutrient-management-hs1274', 'ifas-greenhouse-irrigation-cv264', 'ifas-perlite-tomato-cucumber-hs169', 'aafc-rockwool-tomato-irrigation-2008', 'okstate-drip-irrigation-systems', 'okstate-hydroponics-hla6442', 'mu-hydroponic-farming', 'uky-irrigation-hydroponic-ccd-sp20', 'vt-system-crop-comparisons', 'osu-hydro-hints-buckets', 'ohio-state-tomato-nutrient-solution', 'osu-ph-ec-guide', 'tennessee-fruiting-crops', 'aces-greenhouse-tomato-anr2955', 'purdue-supplemental-light-lettuce'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 33,
    collection: 'articles',
    category: 'systems',
    title: 'Aeroponics vs Hydroponics: Yields, Mist Timing & Risks',
    route: 'aeroponics-vs-hydroponics',
    primaryIntent: 'informational',
    primaryTopic: 'aeroponics vs hydroponics',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['tamu-lettuce-aeroponics-nft-2018', 'uga-arugula-lettuce-systems-2025', 'cornell-aeroponic-lettuce-irrigation-2021', 'ttu-aeroponic-lettuce-poster', 'tunio-aeroponic-nozzles-lettuce-2021', 'mu-hydroponic-farming', 'okstate-hydroponics-hla6442', 'vt-system-crop-comparisons', 'ifas-lettuce-small-systems', 'uky-hydroponic-lettuce', 'osu-ph-ec-guide'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 34,
    collection: 'articles',
    category: 'equipment',
    title: 'Hydroponic Reservoir Size: Gallons per Plant by System',
    route: 'hydroponic-reservoir-size',
    primaryIntent: 'informational',
    primaryTopic: 'hydroponic system reservoir',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['vt-nft-systems', 'umn-small-scale-hydroponics', 'ifas-kratky-set-and-forget', 'ctahr-kratky-vc1', 'kratky-noncirculating-lettuce', 'ifas-volusia-dwc-bucket', 'aces-greenhouse-tomato-anr2955', 'mu-high-tunnel-tomato-watering-g6462', 'okstate-vertical-tower-hla6724', 'umass-subirrigation-systems', 'uky-hydroponic-lettuce', 'gomez-basil-small-scale-2020', 'osu-hydro-hints-dwc', 'purdue-heated-solution-lettuce-2019', 'vt-system-crop-comparisons', 'ifas-lettuce-small-systems', 'osu-ph-ec-guide', 'gh-feedchart-usage-guide', 'illinois-hydroponics-handouts'],
    toolLinks: ['/tools/nutrient-mixing-calculator/', '/tools/ph-ec-targets/'],
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
