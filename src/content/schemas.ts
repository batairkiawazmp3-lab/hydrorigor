import { z } from 'astro/zod';
import { articleCategoryValues } from '../lib/sections.ts';

const text = z.string().trim().min(1);
const route = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase kebab-case route segment.');
const identifier = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase kebab-case identifier.');
const date = z.coerce.date();
const canonical = z.url().optional();

export const sourceSchema = z.object({
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
  draft: z.boolean().default(true),
  canonical,
};

export const articleSchema = z.object({
  ...editorialFields,
  reviewer: text.optional(),
  category: z.enum(articleCategoryValues),
  tags: z.array(identifier).min(1),
  hero: heroSchema.optional(),
}).strict();

export const reviewSchema = z.object({
  ...editorialFields,
  productId: identifier,
  verdict: z.string().trim().min(20),
  methodology: z.string().trim().min(20),
  pros: z.array(text).min(1),
  cons: z.array(text).min(1),
  testedBy: text.optional(),
}).strict();

export const comparisonSchema = z.object({
  ...editorialFields,
  comparedItemIds: z.array(identifier).min(2).refine(
    (items) => new Set(items).size === items.length,
    'Compared item identifiers must be unique.',
  ),
  criteria: z.array(z.object({
    name: text,
    description: z.string().trim().min(10),
  }).strict()).min(1),
  useCaseConclusions: z.array(z.object({
    useCase: text,
    conclusion: z.string().trim().min(20),
  }).strict()).min(1),
}).strict();

export type EditorialSource = z.infer<typeof sourceSchema>;
export type ArticleData = z.infer<typeof articleSchema>;
export type ReviewData = z.infer<typeof reviewSchema>;
export type ComparisonData = z.infer<typeof comparisonSchema>;
