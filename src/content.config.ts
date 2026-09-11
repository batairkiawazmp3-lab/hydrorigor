import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { articleSchema, comparisonSchema, reviewSchema } from './content/schemas.ts';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: articleSchema,
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: reviewSchema,
});

const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comparisons' }),
  schema: comparisonSchema,
});

export const collections = { articles, reviews, comparisons };
