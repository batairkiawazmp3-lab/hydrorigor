import { sourceRegistrySchema } from '../models.ts';

const sourceRecords = [
  {
    id: 'okstate-hla-6722',
    title: 'Electrical Conductivity and pH Guide for Hydroponics',
    publisher: 'Oklahoma State University Extension',
    authors: ['Bruce Dunn', 'Hardeep Singh'],
    publicationYear: 2017,
    url: 'https://extension.okstate.edu/fact-sheets/electrical-conductivity-and-ph-guide-for-hydroponics',
    accessedDate: '2026-09-11',
    locator: 'HLA-6722, Table 2: crop EC and pH ranges',
    sourceType: 'university-extension',
    evidenceScope: 'General hydroponic crop reference table; cultivar, growth stage, climate, and system are not specified per row.',
    notes: 'The publication identifies EC as mS/cm. Values are retained as published and are not blended with narrower sources.',
  },
  {
    id: 'uf-ifas-hs1422',
    title: 'Growing Lettuce in Small Hydroponic Systems',
    publisher: 'University of Florida IFAS Extension',
    authors: ['Germán V. Sandoya', 'Jonael Bosques', 'Francisco P. Rivera Meléndez', 'E. Vanessa Vassilaros'],
    url: 'https://ask.ifas.ufl.edu/publication/HS1422',
    accessedDate: '2026-09-12',
    locator: 'Specific Considerations — Plant nutrition (lettuce EC 1.4–1.8 mS/cm and pH 6.0–7.0); Further Considerations (nutritive-solution EC 1.2–1.8 mS/cm)',
    sourceType: 'university-extension',
    evidenceScope: 'The lettuce-specific Plant nutrition statement supplies EC 1.4–1.8 mS/cm together with pH 6.0–7.0 for small residential or at-home hydroponic settings. A later general nutritive-solution statement gives EC 1.2–1.8 mS/cm without a paired pH.',
    notes: 'HydroRigor retains the explicitly lettuce-specific “ideal” 1.4–1.8 mS/cm statement because it supplies EC and pH together. The later 1.2–1.8 mS/cm statement remains disclosed; the two statements are not averaged or otherwise reconciled into an invented range.',
  },
  {
    id: 'virginia-tech-spes-466',
    title: 'Hydroponic Production of Edible Crops: System and Crop Comparisons',
    publisher: 'Virginia Cooperative Extension',
    authors: ['Toni Sperry', 'Amber Vallotton', 'Chris Mullins', 'Joyce Latimer', 'Holly Scoggins'],
    publicationYear: 2023,
    url: 'https://www.pubs.ext.vt.edu/content/dam/pubs_ext_vt_edu/spes/spes-466/SPES-466.pdf',
    accessedDate: '2026-09-12',
    locator: 'SPES-466NP, pages 5–6, System Control Parameters — Nutrients',
    sourceType: 'university-research',
    evidenceScope: 'Reported nutrient-solution settings for mature tomato and pepper plants in Virginia Tech/Virginia State hydroponic trials.',
    notes: 'The publication says it is not intended to provide exact parameters for a specific crop/system; these values are therefore labeled trial settings, not universal targets.',
  },
] as const;

export const sources = sourceRegistrySchema.parse(sourceRecords);
export const sourceById = new Map(sources.map((source) => [source.id, source]));
