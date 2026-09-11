export const articleCategoryValues = [
  'systems',
  'crops',
  'nutrients',
  'equipment',
  'best',
  'problems',
  'tools',
] as const;

export type ArticleCategory = (typeof articleCategoryValues)[number];

export const sectionDefinitions = [
  {
    slug: 'systems',
    title: 'Hydroponic systems',
    description: 'Foundational routes for evidence-led system guides and methods.',
  },
  {
    slug: 'crops',
    title: 'Hydroponic crops',
    description: 'Foundational routes for future source-backed crop guidance.',
  },
  {
    slug: 'nutrients',
    title: 'Nutrients',
    description: 'Foundational routes for nutrient concepts and measurement guidance.',
  },
  {
    slug: 'equipment',
    title: 'Equipment',
    description: 'Foundational routes for equipment explainers and methodology.',
  },
  {
    slug: 'best',
    title: 'Best for a use case',
    description: 'A future home for evidence-led shortlists, not live recommendations yet.',
  },
  {
    slug: 'reviews',
    title: 'Editorial reviews',
    description: 'Typed editorial review foundations without ratings or commerce schema.',
  },
  {
    slug: 'compare',
    title: 'Comparisons',
    description: 'Structured comparison foundations organized around criteria and use cases.',
  },
  {
    slug: 'problems',
    title: 'Troubleshooting',
    description: 'Foundational routes for sourced hydroponic problem-solving guides.',
  },
  {
    slug: 'tools',
    title: 'Tools',
    description: 'A route placeholder for later, separately authorized calculators and data tools.',
  },
] as const;

export type SectionDefinition = (typeof sectionDefinitions)[number];

export function getSectionDefinition(slug: string): SectionDefinition {
  const section = sectionDefinitions.find((candidate) => candidate.slug === slug);
  if (!section) throw new Error(`Unknown HydroRigor section: ${slug}`);
  return section;
}
