import type { EvidenceClaim, ProductRecord } from './models.ts';

interface CommercialReviewJsonLdInput {
  product: ProductRecord;
  headline: string;
  verdict: string;
  author: string;
  publishDate: Date | string;
  evidenceBasis: ProductRecord['evidenceBasis'];
  evidenceClaims: EvidenceClaim[];
  testedBy?: string | undefined;
  methodology: string;
  testPeriod?: { started: Date | string; completed: Date | string } | undefined;
  acquisitionRelationship: 'purchased' | 'supplied' | 'loaned' | 'discounted' | 'not-applicable';
  acquisitionDisclosure?: string | undefined;
  draft: boolean;
  structuredDataEnabled: boolean;
}

const isoDate = (value: Date | string) => (
  value instanceof Date ? value.toISOString() : new Date(value).toISOString()
);

export function buildCommercialReviewJsonLd(input: CommercialReviewJsonLdInput): object | null {
  if (
    input.draft
    || !input.structuredDataEnabled
    || input.product.developmentFixture
    || input.evidenceBasis !== 'hands-on-tested'
  ) return null;

  if (input.product.evidenceBasis !== input.evidenceBasis) {
    throw new Error('Commercial Review JSON-LD evidence must match the product record.');
  }
  if (!input.testedBy || !input.methodology || !input.testPeriod
    || input.acquisitionRelationship === 'not-applicable'
    || !input.evidenceClaims.some((claim) => claim.type === 'hydrorigor-observation')) {
    throw new Error('Commercial Review JSON-LD requires complete hands-on testing and acquisition evidence.');
  }
  if (['supplied', 'loaned', 'discounted'].includes(input.acquisitionRelationship)
    && !input.acquisitionDisclosure) {
    throw new Error('Commercial Review JSON-LD requires a material acquisition disclosure.');
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: input.headline,
    reviewBody: input.verdict,
    author: { '@type': 'Person', name: input.author },
    datePublished: isoDate(input.publishDate),
    itemReviewed: {
      '@type': 'Product',
      name: input.product.name,
      brand: { '@type': 'Brand', name: input.product.brand },
      ...(input.product.model ? { model: input.product.model } : {}),
    },
  };
}
