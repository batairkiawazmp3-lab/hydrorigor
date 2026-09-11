import { z } from 'astro/zod';

const identifier = z.string().regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  'Use a lowercase kebab-case identifier.',
);
const text = z.string().trim().min(1);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().startsWith(value);
}, 'Use a valid ISO date (YYYY-MM-DD).');

export const sourceTypeValues = [
  'university-extension',
  'university-research',
] as const;

export const sourceRecordSchema = z.object({
  id: identifier,
  title: text,
  publisher: text,
  authors: z.array(text).min(1).optional(),
  publicationYear: z.number().int().min(1900).max(2100).optional(),
  url: z.url().refine((value) => value.startsWith('https://'), 'Source URLs must use HTTPS.'),
  accessedDate: isoDate,
  locator: text,
  sourceType: z.enum(sourceTypeValues),
  evidenceScope: text,
  notes: text.optional(),
}).strict();

export const sourceEcUnitValues = ['mS/cm', 'dS/m'] as const;

export const cropTargetSchema = z.object({
  id: identifier,
  crop: text,
  scientificName: text.optional(),
  growthStage: text.optional(),
  systemContext: text,
  phMin: z.number().min(0).max(14),
  phMax: z.number().min(0).max(14),
  ecMin: z.number().nonnegative(),
  ecMax: z.number().nonnegative(),
  ecUnit: z.literal('mS/cm'),
  sourceEcUnit: z.enum(sourceEcUnitValues),
  sourceRefs: z.array(identifier).min(1).refine(
    (values) => new Set(values).size === values.length,
    'Source references must be unique within a target record.',
  ),
  contextNotes: text,
  evidenceNotes: text,
  lastVerified: isoDate,
}).strict().superRefine((record, context) => {
  if (record.phMin > record.phMax) {
    context.addIssue({
      code: 'custom',
      path: ['phMin'],
      message: 'pH minimum must not exceed pH maximum.',
    });
  }
  if (record.ecMin > record.ecMax) {
    context.addIssue({
      code: 'custom',
      path: ['ecMin'],
      message: 'EC minimum must not exceed EC maximum.',
    });
  }
});

export const sourceRegistrySchema = z.array(sourceRecordSchema).min(1);
export const cropTargetRegistrySchema = z.array(cropTargetSchema).min(1);

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type CropTarget = z.infer<typeof cropTargetSchema>;
