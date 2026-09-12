import { productRegistrySchema } from '../../lib/commercial/models.ts';

export const developmentProductFixtures = productRegistrySchema.parse([
  {
    id: 'fixture-reservoir-monitor',
    name: 'SAMPLE Reservoir Monitor Fixture',
    brand: 'HydroRigor Development Fixture',
    category: 'development-fixture',
    status: 'fixture',
    evidenceBasis: 'fixture',
    evidenceClaims: [
      {
        type: 'editorial-interpretation',
        summary: 'Fictional record used only to validate review structure and evidence labels.',
      },
    ],
    developmentFixture: true,
    notes: 'Not a consumer product, recommendation, test subject, or merchant destination.',
  },
  {
    id: 'fixture-system-alpha',
    name: 'SAMPLE System Alpha Fixture',
    brand: 'HydroRigor Development Fixture',
    category: 'development-fixture',
    status: 'fixture',
    evidenceBasis: 'fixture',
    evidenceClaims: [
      {
        type: 'editorial-interpretation',
        summary: 'Fictional record used only to validate comparison structure and evidence labels.',
      },
    ],
    developmentFixture: true,
    notes: 'Not a consumer product, recommendation, test subject, or merchant destination.',
  },
  {
    id: 'fixture-system-beta',
    name: 'SAMPLE System Beta Fixture',
    brand: 'HydroRigor Development Fixture',
    category: 'development-fixture',
    status: 'fixture',
    evidenceBasis: 'fixture',
    evidenceClaims: [
      {
        type: 'editorial-interpretation',
        summary: 'Fictional record used only to validate comparison structure and evidence labels.',
      },
    ],
    developmentFixture: true,
    notes: 'Not a consumer product, recommendation, test subject, or merchant destination.',
  },
]);
