import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { comparisonSchema, reviewSchema } from '../src/content/schemas.ts';
import { developmentProductFixtures } from '../src/data/commercial/fixtures.ts';
import { commercialDestinations, merchants } from '../src/data/merchants/index.ts';
import { products } from '../src/data/products/index.ts';
import { productEvidenceSources } from '../src/data/products/sources.ts';
import {
  findUnmistakableHandsOnClaim,
  validateCommercialMdxSource,
} from '../src/lib/commercial/content-integrity.ts';
import {
  commercialDestinationSchema,
  evidenceClaimSchema,
  merchantRecordSchema,
  productRecordSchema,
} from '../src/lib/commercial/models.ts';
import {
  assertProductEvidenceBasis,
  getCommercialLinkAttributes,
  resolveCommercialDestination,
  resolveCommercialDestinationFromRegistry,
  validateCommercialPageState,
  validateCommercialRegistry,
} from '../src/lib/commercial/registry.ts';
import { buildCommercialReviewJsonLd } from '../src/lib/commercial/structured-data.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const editorialSource = {
  id: 'source-record',
  title: 'Documented source used in a schema test',
  url: 'https://example.edu/source-record',
  publisher: 'Example University',
  accessedDate: '2026-09-12',
};

const common = {
  title: 'Commercial integrity schema fixture',
  description: 'A sufficiently descriptive fixture used to validate commercial editorial integrity constraints.',
  route: 'commercial-integrity-fixture',
  publishDate: '2026-09-12',
  author: 'HydroRigor Test Fixture',
  sources: [editorialSource],
  affiliateDisclosure: false,
  commercialDestinationIds: [],
};

const fixtureReview = {
  ...common,
  productId: 'fixture-product',
  verdict: 'This fictional fixture makes no recommendation about any real product.',
  methodology: 'Schema validation only; no product was acquired, used, measured, or tested.',
  pros: ['Validates a structured positive field.'],
  cons: ['Represents no real product limitation.'],
  evidenceBasis: 'fixture',
  evidenceClaims: [{
    type: 'editorial-interpretation',
    summary: 'A fictional claim used only to validate the review evidence model.',
  }],
  acquisitionRelationship: 'not-applicable',
  structuredDataEnabled: false,
  draft: true,
};

const handsOnReview = {
  ...fixtureReview,
  productId: 'documented-product',
  evidenceBasis: 'hands-on-tested',
  evidenceClaims: [{
    type: 'hydrorigor-observation',
    summary: 'A documented observation recorded under the stated test methodology.',
  }],
  acquisitionRelationship: 'purchased',
  testedBy: 'HydroRigor Test Operator',
  testPeriod: { started: '2026-08-01', completed: '2026-08-15' },
  structuredDataEnabled: true,
  draft: false,
};

const researchedProduct = {
  id: 'documented-product',
  name: 'Documented Product',
  brand: 'Documented Brand',
  category: 'measurement-device',
  status: 'editorial-ready',
  evidenceBasis: 'externally-researched',
  evidenceClaims: [{
    type: 'third-party-evidence',
    summary: 'An identified external source supports this test-only product record.',
    sourceRefs: ['source-record'],
  }],
  sourceRefs: ['source-record'],
  lastVerified: '2026-09-12',
};

const commercialEvidenceSource = {
  id: 'source-record',
  title: 'Test-only commercial evidence source',
  publisher: 'Example University',
  url: 'https://example.edu/commercial-source',
  accessedDate: '2026-09-12',
  supports: ['third-party-evidence'],
};

const handsOnProduct = {
  ...researchedProduct,
  evidenceBasis: 'hands-on-tested',
  evidenceClaims: [{
    type: 'hydrorigor-observation',
    summary: 'A documented HydroRigor observation supports this schema-only test record.',
  }],
};

const affiliateMerchant = {
  id: 'test-merchant',
  name: 'Test Merchant',
  homepage: 'https://merchant.invalid/',
  relationshipStatus: 'affiliate',
  affiliateProgramStatus: 'active',
  lastVerified: '2026-09-12',
};

const affiliateDestination = {
  id: 'test-affiliate-destination',
  merchantId: 'test-merchant',
  label: 'Test destination',
  destination: 'https://merchant.invalid/product',
  relationship: 'affiliate',
  lastVerified: '2026-09-12',
};

test('production commercial registries intentionally contain no active records', () => {
  assert.deepEqual(products, []);
  assert.deepEqual(productEvidenceSources, []);
  assert.deepEqual(merchants, []);
  assert.deepEqual(commercialDestinations, []);
  assert.doesNotThrow(() => validateCommercialRegistry({
    products,
    sources: productEvidenceSources,
    merchants,
    destinations: commercialDestinations,
  }));
});

test('development product fixtures are fictional and isolated from the production registry', () => {
  assert.deepEqual(
    developmentProductFixtures.map(({ id }) => id),
    ['fixture-reservoir-monitor', 'fixture-system-alpha', 'fixture-system-beta'],
  );
  for (const fixture of developmentProductFixtures) {
    assert.equal(fixture.status, 'fixture');
    assert.equal(fixture.evidenceBasis, 'fixture');
    assert.equal(fixture.developmentFixture, true);
    assert.equal(fixture.manufacturerUrl, undefined);
  }
});

test('product records require provenance and reject undeclared commercial fields', () => {
  assert.doesNotThrow(() => productRecordSchema.parse(researchedProduct));
  assert.throws(() => productRecordSchema.parse({ ...researchedProduct, sourceRefs: [] }));
  assert.throws(() => productRecordSchema.parse({ ...researchedProduct, lastVerified: undefined }));
  assert.throws(() => productRecordSchema.parse({ ...researchedProduct, price: 49.99 }));
  assert.throws(() => productRecordSchema.parse({ ...researchedProduct, rating: 5 }));
  assert.throws(() => productRecordSchema.parse({ ...researchedProduct, availability: 'in-stock' }));
});

test('manufacturer and third-party claims require explicit source references', () => {
  assert.throws(() => evidenceClaimSchema.parse({
    type: 'manufacturer-specification',
    summary: 'A manufacturer claim without a source reference must fail validation.',
  }));
  assert.doesNotThrow(() => evidenceClaimSchema.parse({
    type: 'third-party-evidence',
    summary: 'An external claim with an identified source reference passes validation.',
    sourceRefs: ['source-record'],
  }));
});

test('hands-on product status requires a HydroRigor observation claim', () => {
  assert.doesNotThrow(() => productRecordSchema.parse(handsOnProduct));
  assert.throws(() => productRecordSchema.parse({
    ...handsOnProduct,
    evidenceClaims: researchedProduct.evidenceClaims,
  }));
});

test('hands-on review claims require tester, test period, acquisition, and observation evidence', () => {
  assert.doesNotThrow(() => reviewSchema.parse(handsOnReview));
  for (const field of ['testedBy', 'testPeriod']) {
    const invalid = { ...handsOnReview };
    delete invalid[field];
    assert.throws(() => reviewSchema.parse(invalid));
  }
  assert.throws(() => reviewSchema.parse({ ...handsOnReview, acquisitionRelationship: 'not-applicable' }));
  assert.throws(() => reviewSchema.parse({
    ...handsOnReview,
    evidenceClaims: [{ type: 'editorial-interpretation', summary: 'No direct observation is represented here.' }],
  }));
});

test('non-hands-on reviews cannot render testing or acquisition claims', () => {
  const researched = {
    ...fixtureReview,
    productId: 'documented-product',
    evidenceBasis: 'externally-researched',
    evidenceClaims: [{
      type: 'third-party-evidence',
      summary: 'This test review uses one identified third-party source record.',
      sourceRefs: ['source-record'],
    }],
    draft: false,
  };
  assert.doesNotThrow(() => reviewSchema.parse(researched));
  assert.throws(() => reviewSchema.parse({ ...researched, testedBy: 'Unsupported tester' }));
  assert.throws(() => reviewSchema.parse({ ...researched, acquisitionRelationship: 'purchased' }));
  assert.throws(() => reviewSchema.parse({
    ...researched,
    evidenceClaims: [{ type: 'hydrorigor-observation', summary: 'An unsupported observation claim must fail.' }],
  }));
  assert.throws(() => reviewSchema.parse({ ...researched, structuredDataEnabled: true }));
});

test('non-hands-on structured review prose rejects unmistakable HydroRigor testing claims', () => {
  const researched = {
    ...fixtureReview,
    productId: 'documented-product',
    evidenceBasis: 'externally-researched',
    evidenceClaims: [{
      type: 'third-party-evidence',
      summary: 'This test review uses one identified third-party source record.',
      sourceRefs: ['source-record'],
    }],
    draft: false,
  };
  const manufacturer = {
    ...researched,
    evidenceBasis: 'manufacturer-spec-only',
    evidenceClaims: [{
      type: 'manufacturer-specification',
      summary: 'This claim records one identified manufacturer specification source.',
      sourceRefs: ['source-record'],
    }],
  };

  assert.throws(() => reviewSchema.parse({ ...researched, verdict: 'We tested this product and recorded a result for this review.' }));
  assert.throws(() => reviewSchema.parse({ ...manufacturer, methodology: 'Our testing showed a repeatable result for this product.' }));
  assert.throws(() => reviewSchema.parse({ ...researched, pros: ['We measured this product during direct evaluation.'] }));
  assert.throws(() => reviewSchema.parse({ ...researched, cons: ['During our test, this product showed a limitation.'] }));
  assert.throws(() => reviewSchema.parse({
    ...fixtureReview,
    verdict: 'HydroRigor tested this fictional item despite its non-hands-on evidence state.',
  }));

  assert.doesNotThrow(() => reviewSchema.parse({
    ...researched,
    methodology: 'Manufacturer testing is cited as external evidence. Our testing methodology requires separate hands-on records.',
  }));
  assert.doesNotThrow(() => reviewSchema.parse({
    ...handsOnReview,
    verdict: 'We tested this product under the complete methodology and acquisition record shown here.',
  }));
});

test('hands-on claim matching stays narrow around methodology and third-party language', () => {
  assert.ok(findUnmistakableHandsOnClaim('We tested this product under a documented setup.'));
  assert.ok(findUnmistakableHandsOnClaim('HydroRigor measured the device directly.'));
  assert.equal(findUnmistakableHandsOnClaim('Manufacturer testing is cited as third-party evidence.'), undefined);
  assert.equal(findUnmistakableHandsOnClaim('Our testing methodology requires a dated test period.'), undefined);
  assert.equal(findUnmistakableHandsOnClaim('The source describes third-party tests and measurements.'), undefined);
});

test('commercial MDX validation rejects non-hands-on first-person test claims', () => {
  const review = `---\nevidenceBasis: "externally-researched"\n---\n\nWe tested this product in a reservoir.`;
  const comparison = `---\nitemEvidence:\n  - evidenceBasis: "fixture"\n  - evidenceBasis: "externally-researched"\n---\n\nWe tested both products under the same setup.`;
  const allowed = `---\nevidenceBasis: "manufacturer-spec-only"\n---\n\nManufacturer testing is cited here. Our testing methodology requires a separate evidence record.`;
  const handsOn = `---\nevidenceBasis: "hands-on-tested"\n---\n\nWe tested this product under the disclosed method.`;

  assert.match(validateCommercialMdxSource('reviews/researched.mdx', review)[0] ?? '', /unsupported hands-on claim/i);
  assert.match(validateCommercialMdxSource('comparisons/researched.mdx', comparison)[0] ?? '', /unsupported hands-on claim/i);
  assert.deepEqual(validateCommercialMdxSource('reviews/manufacturer.mdx', allowed), []);
  assert.deepEqual(validateCommercialMdxSource('reviews/hands-on.mdx', handsOn), []);
  assert.deepEqual(validateCommercialMdxSource('articles/methodology.mdx', review), []);
});

test('comparison MDX hands-on claims require every item to be hands-on-tested', () => {
  const noHandsOn = `---\nitemEvidence:\n  - productId: fixture-alpha\n    evidenceBasis: fixture\n  - productId: documented-beta\n    evidenceBasis: externally-researched\n---\n\nWe tested both products under the same setup.`;
  const mixed = `---\nitemEvidence:\n  - productId: documented-alpha\n    evidenceBasis: hands-on-tested\n  - productId: documented-beta\n    evidenceBasis: externally-researched\n---\n\nWe tested both products under the same setup.`;
  const fullyHandsOn = `---\nitemEvidence:\n  - productId: documented-alpha\n    evidenceBasis: "hands-on-tested"\n    evidenceClaims:\n      - type: hydrorigor-observation\n        summary: A documented observation for item alpha.\n    sourceRefs:\n      - source-record\n    acquisitionRelationship: purchased\n    testedBy: HydroRigor Test Operator\n    methodology: A documented comparison method for item alpha.\n    testPeriod:\n      started: 2026-08-01\n      completed: 2026-08-15\n  - productId: documented-beta\n    evidenceBasis: 'hands-on-tested'\n    evidenceClaims:\n      - type: hydrorigor-observation\n        summary: A documented observation for item beta.\n    sourceRefs:\n      - source-record\n    acquisitionRelationship: purchased\n    testedBy: HydroRigor Test Operator\n    methodology: A documented comparison method for item beta.\n    testPeriod:\n      started: 2026-08-01\n      completed: 2026-08-15\n---\n\nWe tested both products under the disclosed comparison method.`;
  const externalLanguage = `---\nitemEvidence:\n  - productId: documented-alpha\n    evidenceBasis: manufacturer-spec-only\n  - productId: documented-beta\n    evidenceBasis: externally-researched\n---\n\nManufacturer testing and third-party measurements are discussed as external evidence.`;
  const reviewWithNestedHandsOn = `---\nevidenceBasis: externally-researched\nitemEvidence:\n  - evidenceBasis: hands-on-tested\n---\n\nWe tested this product.`;

  assert.match(validateCommercialMdxSource('comparisons/no-hands-on.mdx', noHandsOn)[0] ?? '', /unsupported hands-on claim/i);
  assert.match(validateCommercialMdxSource('comparisons/mixed.mdx', mixed)[0] ?? '', /unsupported hands-on claim/i);
  assert.deepEqual(validateCommercialMdxSource('comparisons/fully-hands-on.mdx', fullyHandsOn), []);
  assert.deepEqual(validateCommercialMdxSource('comparisons/external-language.mdx', externalLanguage), []);
  assert.match(validateCommercialMdxSource('reviews/nested-evidence.mdx', reviewWithNestedHandsOn)[0] ?? '', /unsupported hands-on claim/i);
});

test('supplied, loaned, and discounted acquisition states require separate disclosure', () => {
  for (const acquisitionRelationship of ['supplied', 'loaned', 'discounted']) {
    assert.throws(() => reviewSchema.parse({ ...handsOnReview, acquisitionRelationship }));
    assert.doesNotThrow(() => reviewSchema.parse({
      ...handsOnReview,
      acquisitionRelationship,
      acquisitionDisclosure: `The schema-only test product was ${acquisitionRelationship} under a documented arrangement.`,
    }));
  }
});

test('review schema rejects numeric scores, star ratings, prices, and availability', () => {
  assert.doesNotThrow(() => reviewSchema.parse(fixtureReview));
  for (const extra of [{ rating: 4.5 }, { stars: 5 }, { score: 91 }, { price: 20 }, { availability: true }]) {
    assert.throws(() => reviewSchema.parse({ ...fixtureReview, ...extra }));
  }
});

test('comparison evidence must map one-to-one to compared product identifiers', () => {
  const comparison = {
    ...common,
    comparedItemIds: ['fixture-alpha', 'fixture-beta'],
    itemEvidence: [
      {
        productId: 'fixture-alpha',
        evidenceBasis: 'fixture',
        evidenceClaims: [{ type: 'editorial-interpretation', summary: 'Fictional evidence for the first comparison item.' }],
      },
      {
        productId: 'fixture-beta',
        evidenceBasis: 'fixture',
        evidenceClaims: [{ type: 'editorial-interpretation', summary: 'Fictional evidence for the second comparison item.' }],
      },
    ],
    criteria: [{ name: 'Documented criterion', description: 'The same criterion applies to both fictional items.' }],
    useCaseConclusions: [{ useCase: 'Schema validation', conclusion: 'Neither fictional item is recommended for a real use case.' }],
    draft: true,
  };
  assert.doesNotThrow(() => comparisonSchema.parse(comparison));
  assert.throws(() => comparisonSchema.parse({
    ...comparison,
    itemEvidence: [{
      productId: 'fixture-alpha',
      evidenceBasis: 'fixture',
      evidenceClaims: [{ type: 'editorial-interpretation', summary: 'Only one fictional evidence record is present.' }],
    }],
  }));
  assert.throws(() => comparisonSchema.parse({
    ...comparison,
    useCaseConclusions: [{ useCase: 'Everyone', conclusion: 'Fixture Alpha is the overall winner for every possible reader.' }],
  }));
  assert.throws(() => comparisonSchema.parse({
    ...comparison,
    useCaseConclusions: [{ useCase: 'Development', conclusion: 'We tested both products and selected one for this use case.' }],
  }));
});

test('hands-on comparison evidence requires complete per-item testing metadata', () => {
  const item = (productId) => ({
    productId,
    evidenceBasis: 'hands-on-tested',
    evidenceClaims: [{
      type: 'hydrorigor-observation',
      summary: 'A documented test observation for this schema-only comparison item.',
    }],
    sourceRefs: ['source-record'],
    acquisitionRelationship: 'purchased',
    testedBy: 'HydroRigor Test Operator',
    methodology: 'A documented comparison method used solely for this schema validation test.',
    testPeriod: { started: '2026-08-01', completed: '2026-08-15' },
  });
  const comparison = {
    ...common,
    comparedItemIds: ['documented-alpha', 'documented-beta'],
    itemEvidence: [item('documented-alpha'), item('documented-beta')],
    criteria: [{ name: 'Shared criterion', description: 'One documented criterion is applied to both records.' }],
    useCaseConclusions: [{ useCase: 'Defined test use case', conclusion: 'The conclusion remains bounded to this documented test scenario.' }],
    draft: false,
  };
  assert.doesNotThrow(() => comparisonSchema.parse({
    ...comparison,
    useCaseConclusions: [{
      useCase: 'Defined test use case',
      conclusion: 'We tested both products and bounded this conclusion to the documented scenario.',
    }],
  }));

  for (const field of ['testedBy', 'methodology', 'testPeriod']) {
    const invalid = structuredClone(comparison);
    delete invalid.itemEvidence[0][field];
    assert.throws(() => comparisonSchema.parse(invalid));
  }

  const missingAcquisition = structuredClone(comparison);
  missingAcquisition.itemEvidence[0].acquisitionRelationship = 'not-applicable';
  assert.throws(() => comparisonSchema.parse(missingAcquisition));

  const missingObservation = structuredClone(comparison);
  missingObservation.itemEvidence[0].evidenceClaims = [{
    type: 'editorial-interpretation',
    summary: 'This deliberately lacks the required HydroRigor observation.',
  }];
  assert.throws(() => comparisonSchema.parse(missingObservation));
});

test('mixed comparison structured prose cannot imply both products were tested', () => {
  const handsOnItem = {
    productId: 'documented-alpha',
    evidenceBasis: 'hands-on-tested',
    evidenceClaims: [{
      type: 'hydrorigor-observation',
      summary: 'A documented observation for the hands-on schema test item.',
    }],
    sourceRefs: ['source-record'],
    acquisitionRelationship: 'purchased',
    testedBy: 'HydroRigor Test Operator',
    methodology: 'A documented comparison method used solely for this schema validation test.',
    testPeriod: { started: '2026-08-01', completed: '2026-08-15' },
  };
  const externalItem = {
    productId: 'documented-beta',
    evidenceBasis: 'externally-researched',
    evidenceClaims: [{
      type: 'third-party-evidence',
      summary: 'An identified external source supports this test-only comparison record.',
      sourceRefs: ['source-record'],
    }],
    sourceRefs: ['source-record'],
  };
  const comparison = {
    ...common,
    comparedItemIds: ['documented-alpha', 'documented-beta'],
    itemEvidence: [handsOnItem, externalItem],
    criteria: [{
      name: 'Evidence boundary',
      description: 'Manufacturer testing and third-party measurements may be described as external evidence.',
    }],
    useCaseConclusions: [{
      useCase: 'Mixed evidence',
      conclusion: 'The conclusion remains limited to the disclosed evidence for each item.',
    }],
    draft: false,
  };

  assert.doesNotThrow(() => comparisonSchema.parse(comparison));
  assert.throws(() => comparisonSchema.parse({
    ...comparison,
    useCaseConclusions: [{
      useCase: 'Mixed evidence',
      conclusion: 'We tested both products and selected one for this specific use case.',
    }],
  }));
});

test('merchant records reject implied or incomplete affiliate relationships', () => {
  assert.doesNotThrow(() => merchantRecordSchema.parse(affiliateMerchant));
  assert.throws(() => merchantRecordSchema.parse({
    ...affiliateMerchant,
    relationshipStatus: 'none',
  }));
  assert.throws(() => merchantRecordSchema.parse({
    ...affiliateMerchant,
    affiliateProgramStatus: 'not-enrolled',
  }));
});

test('commercial registry rejects dangling merchants and inactive affiliate destinations', () => {
  assert.throws(() => validateCommercialRegistry({
    products: [],
    sources: [],
    merchants: [],
    destinations: [affiliateDestination],
  }));
  assert.throws(() => validateCommercialRegistry({
    products: [],
    sources: [],
    merchants: [{ ...affiliateMerchant, relationshipStatus: 'editorial', affiliateProgramStatus: 'inactive' }],
    destinations: [affiliateDestination],
  }));
  assert.doesNotThrow(() => validateCommercialRegistry({
    products: [],
    sources: [],
    merchants: [affiliateMerchant],
    destinations: [affiliateDestination],
  }));
});

test('product and claim source references must resolve to a compatible evidence source', () => {
  assert.doesNotThrow(() => validateCommercialRegistry({
    products: [researchedProduct],
    sources: [commercialEvidenceSource],
    merchants: [],
    destinations: [],
  }));
  assert.throws(() => validateCommercialRegistry({
    products: [researchedProduct],
    sources: [],
    merchants: [],
    destinations: [],
  }));
  assert.throws(() => validateCommercialRegistry({
    products: [researchedProduct],
    sources: [{ ...commercialEvidenceSource, supports: ['manufacturer-specification'] }],
    merchants: [],
    destinations: [],
  }));
});

test('affiliate destinations require disclosure and disclosure-only states require a reason', () => {
  assert.throws(() => validateCommercialPageState({
    affiliateDisclosure: false,
    commercialDestinationIds: [affiliateDestination.id],
  }, [affiliateDestination]));
  assert.doesNotThrow(() => validateCommercialPageState({
    affiliateDisclosure: true,
    commercialDestinationIds: [affiliateDestination.id],
  }, [affiliateDestination]));
  assert.throws(() => validateCommercialPageState({
    affiliateDisclosure: true,
    commercialDestinationIds: [],
  }, []));
  assert.doesNotThrow(() => validateCommercialPageState({
    affiliateDisclosure: true,
    affiliateDisclosureReason: 'This page retains a disclosure because compensated links were removed pending reverification.',
    commercialDestinationIds: [],
  }, []));
});

test('affiliate link attributes are sponsored and safe while editorial links are not sponsored', () => {
  const editorialDestination = commercialDestinationSchema.parse({
    ...affiliateDestination,
    id: 'test-editorial-destination',
    relationship: 'editorial',
  });
  const registry = validateCommercialRegistry({
    products: [],
    sources: [],
    merchants: [affiliateMerchant],
    destinations: [affiliateDestination, editorialDestination],
  });
  const affiliate = getCommercialLinkAttributes(resolveCommercialDestinationFromRegistry(
    affiliateDestination.id,
    registry.destinations,
  ));
  const editorial = getCommercialLinkAttributes(resolveCommercialDestinationFromRegistry(
    editorialDestination.id,
    registry.destinations,
  ));

  assert.equal(affiliate.target, '_blank');
  for (const token of ['sponsored', 'nofollow', 'noopener', 'noreferrer']) assert.match(affiliate.rel, new RegExp(`\\b${token}\\b`));
  assert.doesNotMatch(editorial.rel, /\bsponsored\b|\bnofollow\b/);
  assert.match(editorial.rel, /\bnoopener\b/);
  assert.match(editorial.rel, /\bnoreferrer\b/);
});

test('commercial destination resolution fails closed for unknown IDs', () => {
  assert.throws(() => resolveCommercialDestination('unregistered-destination'), /Unknown commercial destination ID/);
  assert.throws(() => resolveCommercialDestinationFromRegistry('missing-destination', [affiliateDestination]));
});

test('product and page evidence bases must match exactly', () => {
  const product = productRecordSchema.parse(researchedProduct);
  assert.doesNotThrow(() => assertProductEvidenceBasis(product, 'externally-researched'));
  assert.throws(() => assertProductEvidenceBasis(product, 'hands-on-tested'));
});

test('commercial Review JSON-LD is gated and omits ratings, offers, prices, and availability', () => {
  const fixtureProduct = developmentProductFixtures[0];
  assert.ok(fixtureProduct);
  assert.equal(buildCommercialReviewJsonLd({
    product: fixtureProduct,
    headline: fixtureReview.title,
    verdict: fixtureReview.verdict,
    author: fixtureReview.author,
    publishDate: fixtureReview.publishDate,
    evidenceBasis: 'fixture',
    evidenceClaims: fixtureReview.evidenceClaims,
    methodology: fixtureReview.methodology,
    acquisitionRelationship: 'not-applicable',
    draft: true,
    structuredDataEnabled: false,
  }), null);

  const jsonLd = buildCommercialReviewJsonLd({
    product: productRecordSchema.parse(handsOnProduct),
    headline: handsOnReview.title,
    verdict: handsOnReview.verdict,
    author: handsOnReview.author,
    publishDate: handsOnReview.publishDate,
    evidenceBasis: 'hands-on-tested',
    evidenceClaims: handsOnReview.evidenceClaims,
    testedBy: handsOnReview.testedBy,
    methodology: handsOnReview.methodology,
    testPeriod: handsOnReview.testPeriod,
    acquisitionRelationship: 'purchased',
    draft: false,
    structuredDataEnabled: true,
  });
  const serialized = JSON.stringify(jsonLd);
  assert.equal(jsonLd?.['@type'], 'Review');
  assert.equal(jsonLd?.itemReviewed?.['@type'], 'Product');
  assert.doesNotMatch(serialized, /aggregateRating|reviewRating|Offer|price|availability/i);
});

test('commercial components render relationship-aware links, disclosures, and honest empty states', async () => {
  const affiliateLink = await read('src/components/commercial/AffiliateLink.astro');
  const disclosure = await read('src/components/commercial/CommercialDisclosure.astro');
  const destinations = await read('src/components/commercial/MerchantDestinations.astro');
  const evidence = await read('src/components/commercial/EvidenceBasis.astro');

  assert.match(affiliateLink, /data-commercial-relationship/);
  assert.match(affiliateLink, /getCommercialLinkAttributes/);
  assert.match(affiliateLink, /destinationId: string/);
  assert.match(affiliateLink, /resolveCommercialDestination\(destinationId\)/);
  assert.doesNotMatch(affiliateLink, /destination:\s*CommercialDestination/);
  assert.match(destinations, /<AffiliateLink destinationId=\{destination\.id\}/);
  assert.match(disclosure, /Affiliate disclosure/);
  assert.match(disclosure, /Product acquisition disclosure/);
  assert.match(destinations, /No merchant destination is configured/);
  assert.match(evidence, /not HydroRigor hands-on testing/i);
});

test('review and comparison layouts resolve typed records without unsupported winner or rating UI', async () => {
  const reviewLayout = await read('src/layouts/content/ReviewLayout.astro');
  const comparisonLayout = await read('src/layouts/content/ComparisonLayout.astro');
  const layouts = `${reviewLayout}\n${comparisonLayout}`;

  assert.match(reviewLayout, /assertProductEvidenceBasis/);
  assert.match(reviewLayout, /CommercialDisclosure/);
  assert.match(comparisonLayout, /itemEvidence/);
  assert.match(comparisonLayout, /Use-case conclusions/);
  assert.doesNotMatch(layouts, /star rating|numeric score|aggregateRating|reviewRating|<Offer/i);
});

test('buyer guide, review, and comparison landings use honest commercial empty states', async () => {
  const landing = await read('src/components/content/SectionLanding.astro');
  const status = await read('src/components/commercial/CommercialSectionStatus.astro');
  assert.match(landing, /CommercialSectionStatus/);
  assert.match(status, /No buyer guide entries yet/);
  assert.match(status, /No public product reviews yet/);
  assert.match(status, /No public product comparisons yet/);
  assert.match(status, /No price, availability, numeric rating, affiliate destination, or real product recommendation/);
});

test('development review and comparison remain draft, fictional, and non-commercial', async () => {
  for (const file of [
    'src/content/reviews/development-sample-review.mdx',
    'src/content/comparisons/development-sample-comparison.mdx',
  ]) {
    const source = await read(file);
    assert.match(source, /^title:\s*["']SAMPLE\b/im);
    assert.match(source, /evidenceBasis:\s*["']fixture["']/i);
    assert.match(source, /affiliateDisclosure:\s*false/i);
    assert.match(source, /commercialDestinationIds:\s*\[\]/i);
    assert.match(source, /draft:\s*true/i);
    assert.doesNotMatch(source, /\bprice\s*:|\brating\s*:|\bstars\s*:|amazon|amzn|affiliateUrl/i);
  }
});

test('M05 production source contains no ratings, offers, tracking IDs, or real recommendations', async () => {
  const files = [
    'src/data/products/index.ts',
    'src/data/merchants/index.ts',
    'src/lib/commercial/structured-data.ts',
  ];
  const sources = (await Promise.all(files.map(read))).join('\n');
  assert.doesNotMatch(sources, /aggregateRating|reviewRating|['"]Offer['"]|trackingId|amazon|amzn/i);
  assert.doesNotMatch(sources, /\bprice\s*:/i);
});
