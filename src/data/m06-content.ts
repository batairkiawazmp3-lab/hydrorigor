export type M06Category = 'systems' | 'crops' | 'nutrients' | 'best' | 'reviews';
export type M06Collection = 'articles' | 'reviews';
export type M06Intent = 'informational' | 'commercial research' | 'transactional research';

export interface M06ContentItem {
  id: number;
  collection: M06Collection;
  category: M06Category;
  title: string;
  route: string;
  primaryIntent: M06Intent;
  primaryTopic: string;
  metricStatus: 'VERIFIED_2026-09-12' | 'METRIC_NOT_REVERIFIED';
  volume?: number;
  seoDifficulty?: number;
  sourceIds: readonly string[];
  toolLinks: readonly string[];
}

const items = [
  [1, 'articles', 'systems', 'Indoor Hydroponic Systems for Home: Complete Beginner-to-Buyer Guide', 'indoor-hydroponic-systems-for-home', 'commercial research', 'indoor hydroponic system', 'VERIFIED_2026-09-12', 2900, 33, ['mu-hydroponic-farming', 'uga-home-hydroponics', 'unh-home-hydroponics'], []],
  [2, 'articles', 'best', 'Best Hydroponic Systems for Beginners: What Actually Matters', 'hydroponic-systems-for-beginners', 'commercial research', 'best hydroponic system for beginners', 'METRIC_NOT_REVERIFIED', undefined, undefined, ['mu-hydroponic-farming', 'uga-home-hydroponics'], []],
  [3, 'articles', 'best', 'Indoor Hydroponic System Kits: What to Buy and What to Skip', 'indoor-hydroponic-system-kits', 'transactional research', 'indoor hydroponic system kit', 'METRIC_NOT_REVERIFIED', undefined, undefined, ['uga-home-hydroponics', 'unh-home-hydroponics'], []],
  [4, 'articles', 'systems', 'Deep Water Culture Hydroponics: Complete DWC System Guide', 'deep-water-culture-hydroponics', 'transactional research', 'hydroponic system deep water culture', 'METRIC_NOT_REVERIFIED', undefined, undefined, ['mu-hydroponic-farming', 'unh-home-hydroponics'], ['/tools/ph-ec-targets/']],
  [5, 'articles', 'systems', 'DIY Hydroponic System for Beginners: A Simple Home Build', 'diy-hydroponic-system-for-beginners', 'informational', 'do it yourself hydroponic system', 'METRIC_NOT_REVERIFIED', undefined, undefined, ['uga-home-hydroponics', 'unh-home-hydroponics'], ['/tools/nutrient-mixing-calculator/']],
  [6, 'articles', 'crops', 'Hydroponic Strawberries: Complete Indoor Growing Guide', 'hydroponic-strawberries', 'informational', 'hydroponic strawberries', 'VERIFIED_2026-09-12', 8100, 14, ['mu-hydroponic-farming', 'illinois-strawberry-observations', 'cornell-strawberry-runners', 'umn-day-neutral-strawberries', 'umn-strawberry-plant-growth'], ['/tools/ph-ec-targets/']],
  [7, 'articles', 'crops', 'NFT Hydroponic Strawberries: Setup, Flow and Plant Care', 'nft-hydroponic-strawberries', 'informational', 'nft hydroponic strawberries', 'VERIFIED_2026-09-12', 390, 15, ['mu-hydroponic-farming', 'vt-nft-systems', 'illinois-strawberry-observations'], ['/tools/ph-ec-targets/']],
  [8, 'articles', 'crops', 'Hydroponic Lettuce: Complete Home Growing Guide', 'hydroponic-lettuce', 'informational', 'hydroponic lettuce', 'VERIFIED_2026-09-12', 4400, 27, ['ifas-lettuce-small-systems', 'ifas-lettuce-cultivars', 'mu-hydroponic-farming'], ['/tools/ph-ec-targets/']],
  [9, 'articles', 'crops', 'Hydroponic Lettuce Systems Compared: DWC, NFT and Kratky', 'hydroponic-lettuce-systems', 'transactional research', 'hydroponic lettuce systems', 'VERIFIED_2026-09-12', 1000, 28, ['ifas-lettuce-small-systems', 'ifas-lettuce-cultivars', 'mu-hydroponic-farming'], []],
  [10, 'articles', 'crops', 'Hydroponic Lettuce Seeds: How to Choose Indoor Varieties', 'hydroponic-lettuce-seeds', 'transactional research', 'hydroponic lettuce seed', 'VERIFIED_2026-09-12', 2400, 20, ['ifas-lettuce-small-systems', 'ifas-lettuce-cultivars'], []],
  [11, 'articles', 'crops', 'Hydroponic Tomatoes: Complete Indoor Growing Guide', 'hydroponic-tomatoes', 'transactional research', 'hydroponic tomatoes', 'VERIFIED_2026-09-12', 1900, 29, ['tennessee-fruiting-crops', 'vt-system-crop-comparisons', 'mu-hydroponic-farming'], ['/tools/ph-ec-targets/']],
  [12, 'articles', 'crops', 'Hydroponic Tomato Seeds: Varieties That Fit Indoor Systems', 'hydroponic-tomato-seeds', 'transactional research', 'hydroponic tomatoes seeds', 'VERIFIED_2026-09-12', 480, 16, ['ifas-tomato-cultivars', 'usu-indoor-tomatoes', 'tennessee-fruiting-crops'], []],
  [13, 'articles', 'nutrients', "Hydroponic Nutrients: Complete Beginner's Guide", 'hydroponic-nutrients', 'informational', 'hydroponic nutrients', 'VERIFIED_2026-09-12', 3600, 22, ['psu-plant-nutrition', 'mu-nutrient-solutions', 'osu-ph-ec-guide'], ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/']],
  [14, 'articles', 'nutrients', 'Hydroponic Nutrient Solution: How to Choose, Mix and Use It', 'hydroponic-nutrient-solution', 'transactional research', 'hydroponic nutrients solution', 'VERIFIED_2026-09-12', 720, 25, ['mu-nutrient-solutions', 'psu-nutrient-programs', 'osu-ph-ec-guide'], ['/tools/nutrient-mixing-calculator/']],
  [15, 'articles', 'nutrients', 'Organic Hydroponic Nutrients: What Works and What to Know', 'organic-hydroponic-nutrients', 'transactional research', 'hydroponic nutrients organic', 'VERIFIED_2026-09-12', 590, 20, ['usda-organic-certification', 'psu-organic-nutrient-study', 'mu-nutrient-solutions'], []],
  [16, 'articles', 'best', 'Best Hydroponic Nutrients for Home Growers', 'hydroponic-nutrients-for-home-growers', 'commercial research', 'best hydroponic nutrients', 'METRIC_NOT_REVERIFIED', undefined, undefined, ['psu-nutrient-programs', 'mu-nutrient-solutions', 'psu-plant-nutrition'], ['/tools/nutrient-mixing-calculator/']],
  [17, 'articles', 'nutrients', 'Powder vs Liquid Hydroponic Nutrients: Which Should You Buy?', 'powder-vs-liquid-hydroponic-nutrients', 'commercial research', 'hydroponic nutrients powder', 'METRIC_NOT_REVERIFIED', undefined, undefined, ['psu-nutrient-programs', 'mu-nutrient-solutions'], ['/tools/nutrient-mixing-calculator/']],
  [18, 'articles', 'nutrients', 'Hydroponic Nutrients for Vegetables: A Practical Feeding Guide', 'hydroponic-nutrients-for-vegetables', 'transactional research', 'hydroponic nutrients vegetables', 'METRIC_NOT_REVERIFIED', undefined, undefined, ['psu-plant-nutrition', 'mu-nutrient-solutions', 'vt-system-crop-comparisons'], ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/']],
  [19, 'articles', 'nutrients', 'Hydroponic Nutrients for Tomatoes: Feeding by Growth Stage', 'hydroponic-nutrients-for-tomatoes', 'informational', 'hydroponic tomatoes nutrient solution', 'VERIFIED_2026-09-12', 170, 18, ['tennessee-fruiting-crops', 'psu-nutrient-programs', 'mu-nutrient-solutions'], ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/']],
  [20, 'articles', 'nutrients', 'How to Mix Hydroponic Nutrients Correctly', 'how-to-mix-hydroponic-nutrients', 'informational', 'mixing hydroponic nutrients', 'METRIC_NOT_REVERIFIED', undefined, undefined, ['psu-nutrient-programs', 'mu-nutrient-solutions', 'osu-ph-ec-guide'], ['/tools/nutrient-mixing-calculator/']],
  [21, 'reviews', 'reviews', 'Masterblend Hydroponic Nutrients: Beginner Setup Guide', 'masterblend-hydroponic-nutrients', 'transactional research', 'masterblend hydroponic nutrients', 'METRIC_NOT_REVERIFIED', undefined, undefined, ['masterblend-mixing-instructions', 'masterblend-hydroponics'], ['/tools/nutrient-mixing-calculator/']],
  [22, 'reviews', 'reviews', 'General Hydroponics Nutrients: How the System Works', 'general-hydroponics-nutrients', 'transactional research', 'general hydroponics hydroponic nutrients', 'METRIC_NOT_REVERIFIED', undefined, undefined, ['gh-floraseries', 'gh-floraseries-program'], ['/tools/nutrient-mixing-calculator/']],
  [23, 'articles', 'best', 'Hydroponic Systems for Sale: How to Compare Before Buying', 'hydroponic-systems-for-sale', 'transactional research', 'hydroponic system sale', 'METRIC_NOT_REVERIFIED', undefined, undefined, ['mu-hydroponic-farming', 'uga-home-hydroponics', 'unh-home-hydroponics'], []],
  [24, 'articles', 'best', 'What Is the Best Hydroponic System for Home Growers?', 'hydroponic-system-for-home-growers', 'commercial research', 'what is the best hydroponic system', 'METRIC_NOT_REVERIFIED', undefined, undefined, ['mu-hydroponic-farming', 'uga-home-hydroponics', 'vt-system-crop-comparisons'], []],
  [25, 'articles', 'systems', 'Smart Indoor Hydroponic Systems: Features Worth Paying For', 'smart-indoor-hydroponic-systems', 'transactional research', 'smart indoor hydroponic system', 'METRIC_NOT_REVERIFIED', undefined, undefined, ['mu-hydroponic-farming', 'osu-ph-ec-guide'], []],
] as const;

export const m06ContentItems: readonly M06ContentItem[] = items.map(([
  id, collection, category, title, route, primaryIntent, primaryTopic,
  metricStatus, volume, seoDifficulty, sourceIds, toolLinks,
]) => ({
  id,
  collection,
  category,
  title,
  route,
  primaryIntent,
  primaryTopic,
  metricStatus,
  ...(volume === undefined ? {} : { volume }),
  ...(seoDifficulty === undefined ? {} : { seoDifficulty }),
  sourceIds,
  toolLinks,
}));

export function getM06Path(item: M06ContentItem): string {
  const section = item.category === 'nutrients' ? 'nutrients-water' : item.category;
  return `/${section}/${item.route}/`;
}
