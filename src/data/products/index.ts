import { productRegistrySchema } from '../../lib/commercial/models.ts';

export const products = productRegistrySchema.parse([
  {
    id: 'masterblend-4-18-38-tomato-formula',
    name: '4-18-38 Tomato Formula',
    brand: 'Masterblend',
    category: 'hydroponic-nutrients',
    status: 'editorial-ready',
    evidenceBasis: 'manufacturer-spec-only',
    evidenceClaims: [{
      type: 'manufacturer-specification',
      summary: 'The manufacturer documents this as a water-soluble formula used with separately dissolved components according to its instructions.',
      sourceRefs: ['masterblend-mixing-instructions', 'masterblend-hydroponics'],
    }],
    manufacturerUrl: 'https://www.masterblend.com/commercial-growing-applications/hydroponics/',
    sourceRefs: ['masterblend-mixing-instructions', 'masterblend-hydroponics'],
    lastVerified: '2026-09-12',
    notes: 'M06 records manufacturer documentation only; HydroRigor has not acquired, used, or tested this product.',
  },
  {
    id: 'general-hydroponics-floraseries',
    name: 'FloraSeries 3-Part Nutrient System',
    brand: 'General Hydroponics',
    category: 'hydroponic-nutrients',
    status: 'editorial-ready',
    evidenceBasis: 'manufacturer-spec-only',
    evidenceClaims: [{
      type: 'manufacturer-specification',
      summary: 'The manufacturer documents a three-component base program with a defined addition order and current feed-chart guidance.',
      sourceRefs: ['gh-floraseries', 'gh-floraseries-program'],
    }],
    manufacturerUrl: 'https://generalhydroponics.com/collections/flora-series',
    sourceRefs: ['gh-floraseries', 'gh-floraseries-program'],
    lastVerified: '2026-09-12',
    notes: 'M06 records manufacturer documentation only; HydroRigor has not acquired, used, or tested this product.',
  },
]);
