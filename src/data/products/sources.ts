import { commercialEvidenceSourceRegistrySchema } from '../../lib/commercial/models.ts';

export const productEvidenceSources = commercialEvidenceSourceRegistrySchema.parse([
  {
    id: 'masterblend-mixing-instructions',
    title: '4-18-38 Tomato Formula Mixing Instructions',
    publisher: 'Masterblend International',
    url: 'https://www.masterblend.com/wp-content/uploads/2022/09/Masterblend-4-18-38-Mixing-Instructions-092922.pdf',
    accessedDate: '2026-09-12',
    locator: 'Manufacturer mixing order and component-specific directions',
    supports: ['manufacturer-specification'],
    notes: 'Manufacturer evidence only; it does not establish independent performance or a HydroRigor recommendation.',
  },
  {
    id: 'masterblend-hydroponics',
    title: 'Fertilizers for Hydroponics',
    publisher: 'Masterblend International',
    url: 'https://www.masterblend.com/commercial-growing-applications/hydroponics/',
    accessedDate: '2026-09-12',
    locator: 'Manufacturer description of hydroponic formula scope',
    supports: ['manufacturer-specification'],
    notes: 'Manufacturer claims are labeled as such and are not treated as hands-on evidence.',
  },
  {
    id: 'gh-floraseries',
    title: 'FloraSeries',
    publisher: 'General Hydroponics',
    url: 'https://generalhydroponics.com/collections/flora-series',
    accessedDate: '2026-09-12',
    locator: 'Manufacturer overview of the three base components',
    supports: ['manufacturer-specification'],
    notes: 'Manufacturer evidence only; no product performance conclusion is inferred.',
  },
  {
    id: 'gh-floraseries-program',
    title: 'FloraSeries 3-Part Feed Program',
    publisher: 'General Hydroponics',
    url: 'https://generalhydroponics.com/pages/flora-series-3-part-feed-program',
    accessedDate: '2026-09-12',
    locator: 'Manufacturer mixing sequence and feed-chart boundary',
    supports: ['manufacturer-specification'],
    notes: 'The current program page is the source of record; rates are not duplicated by HydroRigor.',
  },
]);
