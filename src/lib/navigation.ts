import { sectionDefinitions } from './sections.ts';

export interface NavigationLink {
  label: string;
  href: `/${string}`;
  description: string;
}

export const startLink = {
  label: 'Start Here',
  href: '/start/',
  description: 'Choose a useful first path through HydroRigor.',
} as const satisfies NavigationLink;

export const searchLink = {
  label: 'Search',
  href: '/search/',
  description: 'Search the public HydroRigor information architecture.',
} as const satisfies NavigationLink;

export const toolNavigation = [
  {
    label: 'pH & EC Target Reference',
    href: '/tools/ph-ec-targets/',
    description: 'Compare source-supported crop pH and EC ranges with their published context.',
  },
  {
    label: 'Nutrient Mixing Calculator',
    href: '/tools/nutrient-mixing-calculator/',
    description: 'Scale a manufacturer-provided label dose to a reservoir volume.',
  },
] as const satisfies readonly NavigationLink[];

export const sectionNavigation = sectionDefinitions.map((section) => ({
  label: section.navLabel,
  href: `/${section.slug}/` as const,
  description: section.description,
})) satisfies NavigationLink[];

export const primaryNavigation = [
  startLink,
  ...sectionNavigation,
  searchLink,
] satisfies NavigationLink[];

export const trustNavigation = [
  {
    label: 'About',
    href: '/about/',
    description: 'Why HydroRigor is being built and how it approaches evidence.',
  },
  {
    label: 'Testing Methodology',
    href: '/testing-methodology/',
    description: 'How future product evaluation will separate plans, evidence, and conclusions.',
  },
  {
    label: 'Editorial Policy',
    href: '/editorial-policy/',
    description: 'Standards for sourcing, corrections, updates, and responsible AI assistance.',
  },
  {
    label: 'Affiliate Disclosure',
    href: '/affiliate-disclosure/',
    description: 'How future compensated links will be disclosed and qualified.',
  },
  {
    label: 'Contact',
    href: '/contact/',
    description: 'The planned path for corrections, feedback, and partnership inquiries.',
  },
] as const satisfies readonly NavigationLink[];

export const requiredPublicRoutes = [
  '/',
  startLink.href,
  ...sectionNavigation.flatMap(({ href }) => (
    href === '/tools/' ? [href, ...toolNavigation.map((tool) => tool.href)] : [href]
  )),
  ...trustNavigation.map(({ href }) => href),
  searchLink.href,
] as const;
