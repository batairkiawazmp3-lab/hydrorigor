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
    sourceIds: ['vt-nft-systems', 'vt-dwc-systems-spes464', 'uky-hydroponic-lettuce', 'ifas-kratky-set-and-forget', 'ctahr-kratky-vc1', 'umass-subirrigation-systems', 'umass-sizing-greenhouse-water', 'ifas-water-nutrient-management-hs1274', 'mu-high-tunnel-tomato-water-g6462', 'osu-hydro-hints-dwc', 'umn-small-scale-hydroponics', 'unh-home-hydroponics', 'ohio-state-root-zone-leafy-greens-2019', 'mu-nutrient-solutions', 'aces-greenhouse-lettuce-anr2903', 'okstate-algae-control-greenhouse'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 35,
    collection: 'articles',
    category: 'equipment',
    title: 'Hydroponic Water Pumps: GPH, Head Height & Sizing',
    route: 'hydroponic-water-pumps',
    primaryIntent: 'informational',
    primaryTopic: 'hydroponic system pumps',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['vt-nft-systems', 'umn-small-scale-hydroponics', 'purdue-hydroponics-opportunities-2016', 'sato-modified-nft-2007', 'aces-greenhouse-lettuce-anr2903', 'tamu-lettuce-aeroponics-nft-2018', 'okstate-hydroponics-hla6442', 'okstate-vertical-tower-hla6724', 'illinois-hydroponics-handouts', 'umass-subirrigation-systems', 'osu-hydro-hints-ebb-flow', 'vt-system-crop-comparisons', 'okstate-drip-irrigation-systems', 'uga-arugula-lettuce-systems-2025', 'ifas-kratky-set-and-forget', 'ifas-water-nutrient-management-hs1274', 'liu-organic-nft-lettuce-2025', 'mu-hydroponic-farming', 'osu-hydro-hints-nft', 'ndsu-irrigation-water-pumps-ae1057', 'lsu-pump-curves-3241h', 'ifas-aquaculture-centrifugal-pumps-ae579', 'umaine-farm-electrical-safety-2311'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 36,
    collection: 'articles',
    category: 'equipment',
    title: 'Air Pump for DWC Hydroponics: Sizing, Stones & Oxygen',
    route: 'air-pump-for-dwc-hydroponics',
    primaryIntent: 'informational',
    primaryTopic: 'air pump for dwc hydroponics',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['vt-system-crop-comparisons', 'sdsu-small-scale-hydroponics-p00337', 'osu-hydro-hints-dwc', 'uky-hydroponic-lettuce', 'ifas-lettuce-small-systems', 'ohio-state-root-zone-leafy-greens-2019', 'uga-dissolved-oxygen-kale-arugula-2025', 'ifas-do-fish-production-fa27', 'ifas-volusia-dwc-bucket', 'illinois-hydroponics-at-home', 'mu-hydroponic-farming', 'tamu-aquaponics-presentation-sawyer', 'umaine-farm-electrical-safety-2311', 'ifas-kratky-set-and-forget'],
    toolLinks: ['/tools/ph-ec-targets/'],
  },
  {
    id: 38,
    collection: 'articles',
    category: 'equipment',
    title: 'Hydroponic Growing Media: Rockwool, Coir, Clay & Perlite',
    route: 'hydroponic-growing-media',
    primaryIntent: 'informational',
    primaryTopic: 'hydroponic growing media',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['okstate-soilless-growing-mediums', 'ifas-common-hydroponic-media-ep623', 'uky-selecting-growing-media-ccd-ta-02', 'ifas-water-nutrient-management-hs1274', 'ifas-greenhouse-irrigation-cv264', 'illinois-hydroponics-handouts', 'vt-nft-systems', 'osu-hydro-hints-ebb-flow', 'osu-hydro-hints-buckets', 'ifas-hydroponic-methods-part2-2025', 'ifas-perlite-tomato-cucumber-hs169', 'yang-dutch-bucket-cucumber-substrates-2022', 'wortman-vertical-strawberry-2016'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 37,
    collection: 'articles',
    category: 'equipment',
    title: 'Hydroponic Net Pots: Sizes, Hole Saws, Depth & Reuse',
    route: 'hydroponic-net-pots',
    primaryIntent: 'informational',
    primaryTopic: 'hydroponic net pots',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['ifas-floating-hydroponic-garden-hs943', 'kysu-hands-free-hydroponics', 'umn-small-scale-hydroponics', 'ifas-kratky-set-and-forget', 'ctahr-kratky-vc1', 'kratky-suspended-pot-2004', 'okstate-vertical-tower-hla6724', 'ifas-volusia-dwc-bucket', 'vt-nft-systems', 'uky-hydroponic-lettuce', 'tennessee-fruiting-crops', 'okstate-soilless-growing-mediums', 'osu-hydro-hints-buckets', 'isu-clean-disinfect-containers', 'ucanr-cleaning-plant-pots', 'okstate-algae-control-greenhouse', 'ucanr-kratky-starter-kits'],
    toolLinks: ['/tools/ph-ec-targets/'],
  },
  {
    id: 39,
    collection: 'articles',
    category: 'equipment',
    title: 'Rockwool vs Coco Coir: pH, Water, Yield & Which to Use',
    route: 'rockwool-vs-coco-coir',
    primaryIntent: 'informational',
    primaryTopic: 'rockwool vs coco coir hydroponics',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['xiong-coir-rockwool-peat-tomato-2017', 'he-rockwool-coir-cucumber-heliyon-2022', 'arizona-ceac-strawberry-substrates', 'okstate-soilless-growing-mediums', 'ifas-common-hydroponic-media-ep623', 'uky-selecting-growing-media-ccd-ta-02', 'ifas-water-nutrient-management-hs1274', 'illinois-hydroponics-handouts', 'vt-nft-systems', 'aafc-rockwool-tomato-irrigation-2008'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 40,
    collection: 'articles',
    category: 'equipment',
    title: 'LECA for Hydroponics: pH, Best Systems, Rinsing & Reuse',
    route: 'leca-hydroponics',
    primaryIntent: 'informational',
    primaryTopic: 'hydroponic leca',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['okstate-soilless-growing-mediums', 'ifas-common-hydroponic-media-ep623', 'illinois-hydroponics-handouts', 'slezak-vegetables-expanded-clay-2011', 'pickens-leca-thesis-2008', 'osu-hydro-hints-ebb-flow', 'osu-hydro-hints-buckets', 'umass-subirrigation-systems', 'vt-nft-systems', 'uky-selecting-growing-media-ccd-ta-02'],
    toolLinks: ['/tools/ph-ec-targets/'],
  },
  {
    id: 42,
    collection: 'articles',
    category: 'crops',
    title: 'Hydroponic Peppers: pH, EC, Temperature & Harvest Guide',
    route: 'hydroponic-peppers',
    primaryIntent: 'informational',
    primaryTopic: 'hydroponic peppers',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['osu-ph-ec-guide', 'tennessee-fruiting-crops', 'jovicich-pepper-density-trellis-2004', 'ifas-shade-pepper-hs1113', 'okstate-pepper-production', 'vt-peppers-spes-684', 'runkle-lighting-greenhouse-vegetables-2011', 'lanoue-pepper-far-red-2022', 'ifas-water-nutrient-management-hs1274', 'vt-system-crop-comparisons', 'sdsu-small-scale-hydroponics-p00337', 'ifas-volusia-dwc-bucket', 'osu-hydro-hints-buckets', 'msstate-blossom-end-rot'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 43,
    collection: 'articles',
    category: 'crops',
    title: 'Hydroponic Cucumbers: pH, EC, Temperature & Pruning Guide',
    route: 'hydroponic-cucumbers',
    primaryIntent: 'informational',
    primaryTopic: 'hydroponic cucumbers',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['ifas-greenhouse-cucumber-cv268', 'aces-greenhouse-cucumber-anr2926', 'uaf-greenhouse-cucumbers-hga00434', 'osu-ph-ec-guide', 'tennessee-fruiting-crops', 'runkle-lighting-greenhouse-vegetables-2011', 'ifas-water-nutrient-management-hs1274', 'ifas-perlite-tomato-cucumber-hs169', 'yang-dutch-bucket-cucumber-substrates-2022', 'he-rockwool-coir-cucumber-heliyon-2022', 'mu-hydroponics-for-beginners', 'ifas-volusia-dwc-bucket'],
    toolLinks: ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  },
  {
    id: 44,
    collection: 'articles',
    category: 'crops',
    title: 'Hydroponic Microgreens: Seed Rates, Light, EC & Harvest Days',
    route: 'hydroponic-microgreens',
    primaryIntent: 'informational',
    primaryTopic: 'microgreen hydroponic system',
    metricStatus: 'NOT_MEASURED',
    sourceIds: ['vt-microgreens-spes-756', 'psu-growing-microgreens', 'psu-abcs-of-microgreens', 'ifas-microgreens-hs1164', 'usu-grow-your-own-microgreens', 'umd-microgreens-indoors', 'alberta-commercial-microgreens', 'moraru-microgreens-hydroponic-protocol-2022', 'sfa-home-growing-kit'],
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
