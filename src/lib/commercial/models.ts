import { z } from 'astro/zod';

const text = z.string().trim().min(1);
const identifier = z.string().regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  'Use a lowercase kebab-case identifier.',
);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().startsWith(value);
}, 'Use a valid ISO date (YYYY-MM-DD).');

export const productStatusValues = ['fixture', 'research-pending', 'editorial-ready', 'retired'] as const;
export const productEvidenceBasisValues = [
  'fixture',
  'manufacturer-spec-only',
  'externally-researched',
  'hands-on-tested',
] as const;
export const evidenceTypeValues = [
  'manufacturer-specification',
  'third-party-evidence',
  'hydrorigor-observation',
  'editorial-interpretation',
] as const;
export const acquisitionRelationshipValues = [
  'purchased',
  'supplied',
  'loaned',
  'discounted',
  'not-applicable',
] as const;
export const merchantRelationshipValues = ['none', 'editorial', 'affiliate'] as const;
export const affiliateProgramStatusValues = ['not-enrolled', 'inactive', 'active'] as const;
export const commercialRelationshipValues = ['editorial', 'affiliate'] as const;

export const evidenceClaimSchema = z.object({
  type: z.enum(evidenceTypeValues),
  summary: z.string().trim().min(20),
  sourceRefs: z.array(identifier).default([]),
}).strict().superRefine((claim, context) => {
  if (
    ['manufacturer-specification', 'third-party-evidence'].includes(claim.type)
    && claim.sourceRefs.length === 0
  ) {
    context.addIssue({
      code: 'custom',
      path: ['sourceRefs'],
      message: `${claim.type} claims require at least one source reference.`,
    });
  }
});

export const commercialEvidenceSourceSchema = z.object({
  id: identifier,
  title: text,
  publisher: text,
  url: z.url().startsWith('https://'),
  accessedDate: isoDate,
  locator: text.optional(),
  supports: z.array(z.enum(evidenceTypeValues)).min(1),
  notes: text.optional(),
}).strict();

export const productRecordSchema = z.object({
  id: identifier,
  name: text,
  brand: text,
  model: text.optional(),
  category: identifier,
  status: z.enum(productStatusValues),
  evidenceBasis: z.enum(productEvidenceBasisValues),
  evidenceClaims: z.array(evidenceClaimSchema).default([]),
  manufacturerUrl: z.url().startsWith('https://').optional(),
  sourceRefs: z.array(identifier).default([]),
  lastVerified: isoDate.optional(),
  developmentFixture: z.boolean().default(false),
  notes: text.optional(),
}).strict().superRefine((product, context) => {
  const fixture = product.status === 'fixture' || product.evidenceBasis === 'fixture';

  if (fixture && !(product.status === 'fixture' && product.evidenceBasis === 'fixture' && product.developmentFixture)) {
    context.addIssue({
      code: 'custom',
      message: 'Fixture status, fixture evidence, and developmentFixture must be declared together.',
    });
  }

  if (fixture && (product.manufacturerUrl || product.sourceRefs.length > 0 || product.lastVerified)) {
    context.addIssue({
      code: 'custom',
      message: 'Development fixtures cannot carry production manufacturer or verification metadata.',
    });
  }

  if (!fixture && product.developmentFixture) {
    context.addIssue({
      code: 'custom',
      path: ['developmentFixture'],
      message: 'A production product cannot be marked as a development fixture.',
    });
  }

  if (!fixture && (product.sourceRefs.length === 0 || !product.lastVerified)) {
    context.addIssue({
      code: 'custom',
      message: 'Non-fixture products require source references and a verification date.',
    });
  }

  if (product.evidenceBasis === 'hands-on-tested'
    && !product.evidenceClaims.some((claim) => claim.type === 'hydrorigor-observation')) {
    context.addIssue({
      code: 'custom',
      path: ['evidenceClaims'],
      message: 'Hands-on product evidence requires a HydroRigor observation claim.',
    });
  }
  if (product.evidenceBasis === 'manufacturer-spec-only'
    && !product.evidenceClaims.some((claim) => claim.type === 'manufacturer-specification')) {
    context.addIssue({
      code: 'custom',
      path: ['evidenceClaims'],
      message: 'Manufacturer-spec-only evidence requires a manufacturer specification claim.',
    });
  }
  if (product.evidenceBasis === 'externally-researched'
    && !product.evidenceClaims.some((claim) => claim.type === 'third-party-evidence')) {
    context.addIssue({
      code: 'custom',
      path: ['evidenceClaims'],
      message: 'Externally researched evidence requires a third-party evidence claim.',
    });
  }
});

export const merchantRecordSchema = z.object({
  id: identifier,
  name: text,
  homepage: z.url().startsWith('https://'),
  relationshipStatus: z.enum(merchantRelationshipValues),
  affiliateProgramStatus: z.enum(affiliateProgramStatusValues),
  lastVerified: isoDate.optional(),
  notes: text.optional(),
}).strict().superRefine((merchant, context) => {
  if (merchant.affiliateProgramStatus === 'active' && merchant.relationshipStatus !== 'affiliate') {
    context.addIssue({
      code: 'custom',
      message: 'An active affiliate program requires an explicit affiliate relationship.',
    });
  }

  if (merchant.relationshipStatus === 'affiliate' && merchant.affiliateProgramStatus === 'not-enrolled') {
    context.addIssue({
      code: 'custom',
      message: 'An affiliate relationship cannot be marked not enrolled.',
    });
  }
});

export const commercialDestinationSchema = z.object({
  id: identifier,
  merchantId: identifier,
  label: text,
  destination: z.url().startsWith('https://'),
  relationship: z.enum(commercialRelationshipValues),
  lastVerified: isoDate.optional(),
}).strict();

export const productRegistrySchema = z.array(productRecordSchema);
export const commercialEvidenceSourceRegistrySchema = z.array(commercialEvidenceSourceSchema);
export const merchantRegistrySchema = z.array(merchantRecordSchema);
export const commercialDestinationRegistrySchema = z.array(commercialDestinationSchema);

export type ProductRecord = z.infer<typeof productRecordSchema>;
export type ProductEvidenceBasis = z.infer<typeof productRecordSchema>['evidenceBasis'];
export type EvidenceClaim = z.infer<typeof evidenceClaimSchema>;
export type CommercialEvidenceSource = z.infer<typeof commercialEvidenceSourceSchema>;
export type AcquisitionRelationship = (typeof acquisitionRelationshipValues)[number];
export type MerchantRecord = z.infer<typeof merchantRecordSchema>;
export type CommercialDestination = z.infer<typeof commercialDestinationSchema>;
