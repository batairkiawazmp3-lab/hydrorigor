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

export interface SectionTopicGroup {
  title: string;
  description: string;
  topics: readonly string[];
}

export interface SectionLink {
  label: string;
  href: string;
}

export interface SectionDefinitionShape {
  id: string;
  slug: string;
  navLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  availability: string;
  groups: readonly SectionTopicGroup[];
  nextSteps: readonly SectionLink[];
}

export const sectionDefinitions = [
  {
    id: 'systems',
    slug: 'systems',
    navLabel: 'Systems',
    title: 'Hydroponic systems',
    description: 'Understand the main ways indoor hydroponic systems support roots, water, nutrients, and airflow.',
    eyebrow: 'Choose a growing method',
    intro: 'Use this section to understand system families, compare their operating demands, and identify the questions to answer before choosing one.',
    availability: 'M06 publishes four source-backed system guides covering home selection, DWC, a simple DIY planning path, and smart-feature evaluation.',
    groups: [
      {
        title: 'System families',
        description: 'Learn the vocabulary behind water culture, media-based, recirculating, passive, and vertical approaches.',
        topics: ['Deep water culture', 'Nutrient film technique', 'Kratky and passive systems'],
      },
      {
        title: 'Operating tradeoffs',
        description: 'Frame a choice around maintenance, moving parts, space, monitoring, and tolerance for interruptions.',
        topics: ['Complexity and maintenance', 'Reservoir access', 'Indoor footprint'],
      },
      {
        title: 'Plan the whole setup',
        description: 'Connect the growing method to crop choice, water management, equipment, and troubleshooting.',
        topics: ['Crop compatibility', 'Nutrient delivery', 'Failure points'],
      },
    ],
    nextSteps: [
      { label: 'Use the beginner path', href: '/start/' },
      { label: 'Explore equipment', href: '/equipment/' },
      { label: 'Plan for troubleshooting', href: '/problems/' },
    ],
  },
  {
    id: 'crops',
    slug: 'crops',
    navLabel: 'Crops',
    title: 'Hydroponic crops',
    description: 'Plan crop choices around space, system fit, growth habits, and the evidence available for each plant.',
    eyebrow: 'Choose what to grow',
    intro: 'This section organizes crop guidance by practical decisions without presenting unsupported target numbers or promising universal results.',
    availability: 'M06 publishes seven source-backed guides for strawberries, lettuce, and tomatoes. M04 continues to provide the source-specific pH and EC reference; it is not a universal prescription.',
    groups: [
      {
        title: 'Start with constraints',
        description: 'Use available light, vertical clearance, time, and system capacity to narrow the crop list.',
        topics: ['Space and growth habit', 'Lighting context', 'Time and maintenance'],
      },
      {
        title: 'Match crop to system',
        description: 'Understand why root space, support, water delivery, and crop duration matter to system fit.',
        topics: ['Leafy crops', 'Herbs', 'Fruiting crops'],
      },
      {
        title: 'Read future crop profiles',
        description: 'Crop pages will separate sourced targets, practical interpretation, and unresolved evidence gaps.',
        topics: ['Source provenance', 'Range context', 'Update history'],
      },
    ],
    nextSteps: [
      { label: 'Compare system families', href: '/systems/' },
      { label: 'Understand nutrients and water', href: '/nutrients-water/' },
      { label: 'Review the editorial policy', href: '/editorial-policy/' },
    ],
  },
  {
    id: 'nutrients',
    slug: 'nutrients-water',
    navLabel: 'Nutrients & Water',
    title: 'Nutrients and water',
    description: 'Build a clear mental model for nutrient solutions, water quality, pH, EC, and responsible measurement.',
    eyebrow: 'Understand the root-zone inputs',
    intro: 'This section explains how to think about nutrients and water and links to the first source-supported reference and volume-scaling tool.',
    availability: 'M06 adds seven nutrient and water guides. M04 still provides the sourced pH/EC reference and label-dose scaler; neither the articles nor tools invent crop recipes, EC predictions, or pH dosing.',
    groups: [
      {
        title: 'Water context',
        description: 'Start with the source water, what is known about it, and which measurements can support a decision.',
        topics: ['Source water', 'Measurement context', 'Change over time'],
      },
      {
        title: 'Nutrient-solution concepts',
        description: 'Separate concentration, acidity, formulation, and crop response instead of treating one reading as the whole story.',
        topics: ['Solution concentration', 'pH context', 'Mixing sequence'],
      },
      {
        title: 'Use evidence carefully',
        description: 'Future target ranges will identify their source, units, assumptions, and limits.',
        topics: ['Units and instruments', 'Source quality', 'Responsible interpretation'],
      },
    ],
    nextSteps: [
      { label: 'Choose a system', href: '/systems/' },
      { label: 'Choose a crop', href: '/crops/' },
      { label: 'Open the pH & EC reference', href: '/tools/ph-ec-targets/' },
    ],
  },
  {
    id: 'equipment',
    slug: 'equipment',
    navLabel: 'Equipment',
    title: 'Hydroponic equipment',
    description: 'Understand equipment roles, specifications, setup questions, and evidence before evaluating products.',
    eyebrow: 'Plan the supporting hardware',
    intro: 'This section helps readers organize equipment decisions without presenting untested products or premature buying recommendations.',
    availability: 'Equipment explainers and evaluated product coverage will arrive only after their content and testing milestones are authorized.',
    groups: [
      {
        title: 'Core setup roles',
        description: 'Map each piece of equipment to a job in the growing environment before comparing models.',
        topics: ['Lighting', 'Water movement', 'Air movement'],
      },
      {
        title: 'Measurement tools',
        description: 'Understand what an instrument reports, how it is maintained, and what its reading does not prove.',
        topics: ['pH measurement', 'Conductivity measurement', 'Calibration planning'],
      },
      {
        title: 'Evaluation questions',
        description: 'Future equipment coverage will distinguish published specifications, observed behavior, and editorial judgment.',
        topics: ['Specification checks', 'Usability criteria', 'Testing evidence'],
      },
    ],
    nextSteps: [
      { label: 'Read the testing methodology', href: '/testing-methodology/' },
      { label: 'Browse editorial reviews', href: '/reviews/' },
      { label: 'Explore comparisons', href: '/compare/' },
    ],
  },
  {
    id: 'best',
    slug: 'best',
    navLabel: 'Buyer Guides',
    title: 'Buyer guides by use case',
    description: 'A transparent framework for future shortlists organized around real use cases and explicit evidence.',
    eyebrow: 'Make a purchase decision carefully',
    intro: 'This section organizes buyer research around constraints and use cases, with clear methods and evidence boundaries.',
    availability: 'M06 publishes five evidence-bounded buyer research guides. They compare system or nutrient-program criteria without a named product shortlist, price, affiliate destination, or unsupported recommendation.',
    groups: [
      {
        title: 'Define the use case',
        description: 'A useful shortlist starts with the environment, task, constraints, and reader—not a generic winner.',
        topics: ['Space constraints', 'Maintenance tolerance', 'Measurement needs'],
      },
      {
        title: 'Show the evidence',
        description: 'Future guides will explain selection criteria, source limitations, and what was or was not tested.',
        topics: ['Selection criteria', 'Evidence type', 'Known limitations'],
      },
      {
        title: 'Disclose incentives',
        description: 'Any future compensated link will be identified without allowing compensation to determine editorial conclusions.',
        topics: ['Material connections', 'Link qualification', 'Corrections'],
      },
    ],
    nextSteps: [
      { label: 'Read the editorial policy', href: '/editorial-policy/' },
      { label: 'Read the affiliate disclosure', href: '/affiliate-disclosure/' },
      { label: 'Understand testing plans', href: '/testing-methodology/' },
    ],
  },
  {
    id: 'reviews',
    slug: 'reviews',
    navLabel: 'Reviews',
    title: 'Editorial reviews',
    description: 'Product-system guides with visible methods, evidence boundaries, disclosures, and update history.',
    eyebrow: 'Understand an evaluation',
    intro: 'The review architecture separates methodology, evidence, verdicts, pros, cons, and sources without using unsupported scores.',
    availability: 'M06 publishes two manufacturer-documentation nutrient-system guides. Both are explicitly manufacturer-specification-only; no hands-on test, rating, price, availability, affiliate destination, or recommendation is published.',
    groups: [
      {
        title: 'Before evaluation',
        description: 'Define the use case and criteria before looking for a conclusion.',
        topics: ['Intended user', 'Evaluation criteria', 'Evidence plan'],
      },
      {
        title: 'During evaluation',
        description: 'Keep manufacturer claims, third-party evidence, direct observation, and interpretation distinct.',
        topics: ['Specification checks', 'Observed behavior', 'Evidence gaps'],
      },
      {
        title: 'After publication',
        description: 'Record updates, corrections, disclosures, and changes that could affect the conclusion.',
        topics: ['Update notes', 'Corrections', 'Material connections'],
      },
    ],
    nextSteps: [
      { label: 'Read the testing methodology', href: '/testing-methodology/' },
      { label: 'Review the editorial policy', href: '/editorial-policy/' },
      { label: 'See comparison structure', href: '/compare/' },
    ],
  },
  {
    id: 'compare',
    slug: 'compare',
    navLabel: 'Comparisons',
    title: 'Hydroponic comparisons',
    description: 'Compare approaches and future evaluated items against explicit criteria and reader use cases.',
    eyebrow: 'Compare without a false universal winner',
    intro: 'This section provides the structure for side-by-side reasoning while keeping conclusions tied to a stated use case.',
    availability: 'The current comparison entry remains a non-indexable fictional fixture. Its evidence-aware structure does not represent a real product comparison, absolute winner, or recommendation.',
    groups: [
      {
        title: 'Set the comparison',
        description: 'Name the alternatives, intended audience, and decision that the comparison is meant to support.',
        topics: ['Compared items', 'Reader context', 'Decision boundary'],
      },
      {
        title: 'Use consistent criteria',
        description: 'Apply the same evidence categories and definitions across every compared option.',
        topics: ['Shared criteria', 'Source parity', 'Missing evidence'],
      },
      {
        title: 'Conclude by use case',
        description: 'Explain tradeoffs and fit rather than manufacturing one overall winner.',
        topics: ['Best fit', 'Tradeoffs', 'No-decision cases'],
      },
    ],
    nextSteps: [
      { label: 'Browse system concepts', href: '/systems/' },
      { label: 'See review methodology', href: '/testing-methodology/' },
      { label: 'Search HydroRigor', href: '/search/' },
    ],
  },
  {
    id: 'problems',
    slug: 'problems',
    navLabel: 'Troubleshooting',
    title: 'Hydroponic troubleshooting',
    description: 'Approach symptoms methodically, separate observations from causes, and choose safe next checks.',
    eyebrow: 'Fix a problem methodically',
    intro: 'This section will organize troubleshooting around observed symptoms, system context, evidence, and reversible checks.',
    availability: 'Detailed diagnostic articles are not yet published. This landing provides the decision structure without pretending to diagnose a live grow.',
    groups: [
      {
        title: 'Record the symptom',
        description: 'Describe what changed, where it appears, and when it began before assigning a cause.',
        topics: ['Visible changes', 'Timing', 'Affected area'],
      },
      {
        title: 'Check the system context',
        description: 'Review recent interventions, equipment state, measurements, and environmental changes.',
        topics: ['Recent changes', 'Instrument confidence', 'System operation'],
      },
      {
        title: 'Act proportionately',
        description: 'Prefer observable, reversible checks and know when the available evidence is insufficient.',
        topics: ['Reversible checks', 'One change at a time', 'Escalation limits'],
      },
    ],
    nextSteps: [
      { label: 'Understand nutrients and water', href: '/nutrients-water/' },
      { label: 'Review equipment roles', href: '/equipment/' },
      { label: 'Search the site', href: '/search/' },
    ],
  },
  {
    id: 'tools',
    slug: 'tools',
    navLabel: 'Tools',
    title: 'Hydroponic tools',
    description: 'Use a sourced crop pH/EC reference and a tested manufacturer label-dose volume scaler.',
    eyebrow: 'Use decision support responsibly',
    intro: 'The first HydroRigor tools make their inputs, units, assumptions, sources, formula behavior, and limits visible.',
    availability: 'M04 provides exactly two outputs: a five-crop source/context reference and a nutrient label-dose scaler. Neither supplies automatic crop dosing or product advice.',
    groups: [
      {
        title: 'Reference tools',
        description: 'The pH and EC reference exposes provenance and context instead of presenting unexplained target numbers.',
        topics: ['Source-linked ranges', 'Units', 'Update history'],
      },
      {
        title: 'Calculation tools',
        description: 'The nutrient mixing calculator shows its assumptions and uses formula tests for normal, boundary, and invalid inputs.',
        topics: ['Visible assumptions', 'Formula tests', 'Input validation'],
      },
      {
        title: 'Decision boundaries',
        description: 'Tools will clarify what their output can support and what still requires judgment or new evidence.',
        topics: ['Interpretation limits', 'Evidence gaps', 'No automatic diagnosis'],
      },
    ],
    nextSteps: [
      { label: 'Open the pH & EC reference', href: '/tools/ph-ec-targets/' },
      { label: 'Scale a label dose', href: '/tools/nutrient-mixing-calculator/' },
      { label: 'Review the editorial policy', href: '/editorial-policy/' },
    ],
  },
] as const satisfies readonly SectionDefinitionShape[];

export type SectionDefinition = (typeof sectionDefinitions)[number];
export type PublicSectionSlug = SectionDefinition['slug'];

export function getSectionDefinition(identifier: string): SectionDefinition {
  const section = sectionDefinitions.find(
    (candidate) => candidate.id === identifier || candidate.slug === identifier,
  );
  if (!section) throw new Error(`Unknown HydroRigor section: ${identifier}`);
  return section;
}

export function getPublicSectionPath(identifier: string): string {
  return `/${getSectionDefinition(identifier).slug}/`;
}
