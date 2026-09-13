import { z } from 'astro/zod';
import {
  acquisitionRelationshipValues,
  evidenceClaimSchema,
  productEvidenceBasisValues,
} from '../lib/commercial/models.ts';
import { findUnmistakableHandsOnClaim } from '../lib/commercial/content-integrity.ts';
import { articleCategoryValues } from '../lib/sections.ts';

const text = z.string().trim().min(1);
const route = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase kebab-case route segment.');
const identifier = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase kebab-case identifier.');
const date = z.coerce.date();
const canonical = z.url().optional();

export const sourceSchema = z.object({
  id: identifier.optional(),
  title: text,
  url: z.url(),
  publisher: text,
  publishedDate: date.optional(),
  accessedDate: date.optional(),
}).strict();

export const heroSchema = z.object({
  src: z.string().startsWith('/'),
  alt: text,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
}).strict();

const editorialFields = {
  title: text,
  description: z.string().trim().min(20).max(180),
  route,
  publishDate: date,
  updatedDate: date.optional(),
  author: text,
  sources: z.array(sourceSchema).min(1),
  affiliateDisclosure: z.boolean().default(false),
  affiliateDisclosureReason: z.string().trim().min(20).optional(),
  commercialDestinationIds: z.array(identifier).default([]).refine(
    (items) => new Set(items).size === items.length,
    'Commercial destination identifiers must be unique.',
  ),
  draft: z.boolean().default(true),
  canonical,
};

type CommonCommercialFields = {
  affiliateDisclosure: boolean;
  affiliateDisclosureReason?: string | undefined;
  commercialDestinationIds: string[];
};

function validateDisclosureFields(data: CommonCommercialFields, context: z.RefinementCtx) {
  if (data.affiliateDisclosure && data.commercialDestinationIds.length === 0 && !data.affiliateDisclosureReason) {
    context.addIssue({
      code: 'custom',
      path: ['affiliateDisclosureReason'],
      message: 'A disclosure with no configured destination requires a truthful explanation.',
    });
  }
  if (!data.affiliateDisclosure && data.affiliateDisclosureReason) {
    context.addIssue({
      code: 'custom',
      path: ['affiliateDisclosureReason'],
      message: 'A disclosure explanation requires affiliateDisclosure: true.',
    });
  }
}

function validateEvidenceSourceRefs(
  sourceRefs: string[],
  sources: z.infer<typeof sourceSchema>[],
  context: z.RefinementCtx,
  path: (string | number)[],
) {
  const sourceIds = new Set(sources.flatMap((source) => source.id ? [source.id] : []));
  for (const sourceRef of sourceRefs) {
    if (!sourceIds.has(sourceRef)) {
      context.addIssue({
        code: 'custom',
        path,
        message: `Unknown editorial source reference: ${sourceRef}`,
      });
    }
  }
}

function validateNonHandsOnProse(
  values: { value: string; path: (string | number)[] }[],
  context: z.RefinementCtx,
) {
  for (const { value, path } of values) {
    const match = findUnmistakableHandsOnClaim(value);
    if (match) {
      context.addIssue({
        code: 'custom',
        path,
        message: `Non-hands-on content cannot claim “${match.phrase}”.`,
      });
    }
  }
}

export const articleSchema = z.object({
  ...editorialFields,
  reviewer: text.optional(),
  category: z.enum(articleCategoryValues),
  tags: z.array(identifier).min(1),
  hero: heroSchema.optional(),
  commercialResearch: z.object({
    evidenceBasis: z.literal('externally-researched'),
    scope: z.string().trim().min(20),
    evidenceClaims: z.array(evidenceClaimSchema).min(1),
  }).strict().optional(),
}).strict().superRefine((data, context) => {
  validateDisclosureFields(data, context);
  data.commercialResearch?.evidenceClaims.forEach((claim, index) => {
    validateEvidenceSourceRefs(
      claim.sourceRefs,
      data.sources,
      context,
      ['commercialResearch', 'evidenceClaims', index, 'sourceRefs'],
    );
  });
});

export const reviewSchema = z.object({
  ...editorialFields,
  productId: identifier,
  verdict: z.string().trim().min(20),
  methodology: z.string().trim().min(20),
  pros: z.array(text).min(1),
  cons: z.array(text).min(1),
  evidenceBasis: z.enum(productEvidenceBasisValues),
  evidenceClaims: z.array(evidenceClaimSchema).min(1),
  acquisitionRelationship: z.enum(acquisitionRelationshipValues),
  acquisitionDisclosure: z.string().trim().min(20).optional(),
  testPeriod: z.object({
    started: date,
    completed: date,
  }).strict().optional(),
  testedBy: text.optional(),
  structuredDataEnabled: z.boolean().default(false),
}).strict().superRefine((data, context) => {
  validateDisclosureFields(data, context);

  const handsOn = data.evidenceBasis === 'hands-on-tested';
  if (handsOn && (!data.testedBy || !data.testPeriod || data.acquisitionRelationship === 'not-applicable')) {
    context.addIssue({
      code: 'custom',
      message: 'Hands-on reviews require testedBy, a test period, and an acquisition relationship.',
    });
  }
  if (!handsOn && (data.testedBy || data.testPeriod || data.acquisitionRelationship !== 'not-applicable')) {
    context.addIssue({
      code: 'custom',
      message: 'Non-hands-on reviews cannot include testing or acquisition metadata.',
    });
  }
  if (!handsOn) {
    validateNonHandsOnProse([
      { value: data.verdict, path: ['verdict'] },
      { value: data.methodology, path: ['methodology'] },
      ...data.pros.map((value, index) => ({ value, path: ['pros', index] })),
      ...data.cons.map((value, index) => ({ value, path: ['cons', index] })),
    ], context);
  }
  if (handsOn && !data.evidenceClaims.some((claim) => claim.type === 'hydrorigor-observation')) {
    context.addIssue({
      code: 'custom',
      path: ['evidenceClaims'],
      message: 'Hands-on reviews require at least one HydroRigor observation claim.',
    });
  }
  if (!handsOn && data.evidenceClaims.some((claim) => claim.type === 'hydrorigor-observation')) {
    context.addIssue({
      code: 'custom',
      path: ['evidenceClaims'],
      message: 'HydroRigor observations are only valid for hands-on reviews.',
    });
  }
  if (data.evidenceBasis === 'manufacturer-spec-only'
    && !data.evidenceClaims.some((claim) => claim.type === 'manufacturer-specification')) {
    context.addIssue({
      code: 'custom',
      path: ['evidenceClaims'],
      message: 'Manufacturer-spec-only reviews require a manufacturer specification claim.',
    });
  }
  if (data.evidenceBasis === 'externally-researched'
    && !data.evidenceClaims.some((claim) => claim.type === 'third-party-evidence')) {
    context.addIssue({
      code: 'custom',
      path: ['evidenceClaims'],
      message: 'Externally researched reviews require a third-party evidence claim.',
    });
  }
  if (data.structuredDataEnabled && (!handsOn || data.draft)) {
    context.addIssue({
      code: 'custom',
      path: ['structuredDataEnabled'],
      message: 'Commercial Review JSON-LD can only be enabled for a publishable hands-on review.',
    });
  }

  const disclosureRequired = ['supplied', 'loaned', 'discounted'].includes(data.acquisitionRelationship);
  if (disclosureRequired && !data.acquisitionDisclosure) {
    context.addIssue({
      code: 'custom',
      path: ['acquisitionDisclosure'],
      message: 'Supplied, loaned, or discounted products require an acquisition disclosure.',
    });
  }
  if (data.acquisitionRelationship === 'not-applicable' && data.acquisitionDisclosure) {
    context.addIssue({
      code: 'custom',
      path: ['acquisitionDisclosure'],
      message: 'No acquisition disclosure is valid when acquisition is not applicable.',
    });
  }
  if (data.testPeriod && data.testPeriod.started > data.testPeriod.completed) {
    context.addIssue({
      code: 'custom',
      path: ['testPeriod'],
      message: 'The test period start date cannot follow the completion date.',
    });
  }

  data.evidenceClaims.forEach((claim, index) => {
    validateEvidenceSourceRefs(claim.sourceRefs, data.sources, context, ['evidenceClaims', index, 'sourceRefs']);
  });

  if (data.evidenceBasis === 'fixture') {
    if (!data.draft || !data.productId.startsWith('fixture-') || data.affiliateDisclosure
      || data.commercialDestinationIds.length > 0 || data.structuredDataEnabled) {
      context.addIssue({
        code: 'custom',
        message: 'Fixture reviews must remain draft, non-commercial, and excluded from Review JSON-LD.',
      });
    }
  }
});

const comparisonItemEvidenceSchema = z.object({
  productId: identifier,
  evidenceBasis: z.enum(productEvidenceBasisValues),
  evidenceClaims: z.array(evidenceClaimSchema).min(1),
  sourceRefs: z.array(identifier).default([]),
  acquisitionRelationship: z.enum(acquisitionRelationshipValues).default('not-applicable'),
  acquisitionDisclosure: z.string().trim().min(20).optional(),
  testedBy: text.optional(),
  methodology: z.string().trim().min(20).optional(),
  testPeriod: z.object({
    started: date,
    completed: date,
  }).strict().optional(),
}).strict().superRefine((item, context) => {
  if (item.evidenceBasis !== 'fixture' && item.sourceRefs.length === 0) {
    context.addIssue({
      code: 'custom',
      path: ['sourceRefs'],
      message: 'Researched comparison evidence requires a source reference.',
    });
  }

  const handsOn = item.evidenceBasis === 'hands-on-tested';
  if (handsOn && (!item.testedBy || !item.methodology || !item.testPeriod
    || item.acquisitionRelationship === 'not-applicable'
    || !item.evidenceClaims.some((claim) => claim.type === 'hydrorigor-observation'))) {
    context.addIssue({
      code: 'custom',
      message: 'Hands-on comparison evidence requires a tester, methodology, test period, acquisition, and observation claim.',
    });
  }
  if (!handsOn && (item.testedBy || item.methodology || item.testPeriod
    || item.acquisitionRelationship !== 'not-applicable'
    || item.evidenceClaims.some((claim) => claim.type === 'hydrorigor-observation'))) {
    context.addIssue({
      code: 'custom',
      message: 'Non-hands-on comparison evidence cannot include testing or acquisition metadata.',
    });
  }
  if (item.evidenceBasis === 'manufacturer-spec-only'
    && !item.evidenceClaims.some((claim) => claim.type === 'manufacturer-specification')) {
    context.addIssue({
      code: 'custom',
      path: ['evidenceClaims'],
      message: 'Manufacturer-spec-only comparison evidence requires a manufacturer specification claim.',
    });
  }
  if (item.evidenceBasis === 'externally-researched'
    && !item.evidenceClaims.some((claim) => claim.type === 'third-party-evidence')) {
    context.addIssue({
      code: 'custom',
      path: ['evidenceClaims'],
      message: 'Externally researched comparison evidence requires a third-party evidence claim.',
    });
  }
  if (['supplied', 'loaned', 'discounted'].includes(item.acquisitionRelationship)
    && !item.acquisitionDisclosure) {
    context.addIssue({
      code: 'custom',
      path: ['acquisitionDisclosure'],
      message: 'Material product acquisition requires a separate disclosure.',
    });
  }
  if (item.acquisitionRelationship === 'not-applicable' && item.acquisitionDisclosure) {
    context.addIssue({
      code: 'custom',
      path: ['acquisitionDisclosure'],
      message: 'No acquisition disclosure is valid when acquisition is not applicable.',
    });
  }
  if (item.testPeriod && item.testPeriod.started > item.testPeriod.completed) {
    context.addIssue({
      code: 'custom',
      path: ['testPeriod'],
      message: 'The test period start date cannot follow the completion date.',
    });
  }
});

export const comparisonSchema = z.object({
  ...editorialFields,
  comparedItemIds: z.array(identifier).min(2).refine(
    (items) => new Set(items).size === items.length,
    'Compared item identifiers must be unique.',
  ),
  itemEvidence: z.array(comparisonItemEvidenceSchema).min(2),
  criteria: z.array(z.object({
    name: text,
    description: z.string().trim().min(10),
  }).strict()).min(1),
  useCaseConclusions: z.array(z.object({
    useCase: text,
    conclusion: z.string().trim().min(20),
  }).strict()).min(1),
}).strict().superRefine((data, context) => {
  validateDisclosureFields(data, context);

  if (!data.itemEvidence.every(({ evidenceBasis }) => evidenceBasis === 'hands-on-tested')) {
    validateNonHandsOnProse([
      ...data.criteria.map(({ description }, index) => ({
        value: description,
        path: ['criteria', index, 'description'],
      })),
      ...data.useCaseConclusions.map(({ conclusion }, index) => ({
        value: conclusion,
        path: ['useCaseConclusions', index, 'conclusion'],
      })),
    ], context);
  }

  const compared = [...data.comparedItemIds].sort();
  const evidenced = [...data.itemEvidence.map(({ productId }) => productId)].sort();
  if (new Set(evidenced).size !== evidenced.length || compared.join('|') !== evidenced.join('|')) {
    context.addIssue({
      code: 'custom',
      path: ['itemEvidence'],
      message: 'Each compared product must have exactly one matching evidence record.',
    });
  }

  data.itemEvidence.forEach((item, index) => {
    validateEvidenceSourceRefs(item.sourceRefs, data.sources, context, ['itemEvidence', index, 'sourceRefs']);
    item.evidenceClaims.forEach((claim, claimIndex) => {
      validateEvidenceSourceRefs(
        claim.sourceRefs,
        data.sources,
        context,
        ['itemEvidence', index, 'evidenceClaims', claimIndex, 'sourceRefs'],
      );
    });
  });

  for (const [index, item] of data.useCaseConclusions.entries()) {
    if (/\b(overall winner|universal winner|best overall|wins for everyone)\b/i.test(item.conclusion)) {
      context.addIssue({
        code: 'custom',
        path: ['useCaseConclusions', index, 'conclusion'],
        message: 'Comparison conclusions must be bounded to a use case, not an absolute winner.',
      });
    }
  }

  if (data.itemEvidence.some(({ evidenceBasis }) => evidenceBasis === 'fixture')
    && (!data.draft || data.affiliateDisclosure || data.commercialDestinationIds.length > 0)) {
    context.addIssue({
      code: 'custom',
      message: 'Fixture comparisons must remain draft and non-commercial.',
    });
  }
});

export type EditorialSource = z.infer<typeof sourceSchema>;
export type ArticleData = z.infer<typeof articleSchema>;
export type ReviewData = z.infer<typeof reviewSchema>;
export type ComparisonData = z.infer<typeof comparisonSchema>;
