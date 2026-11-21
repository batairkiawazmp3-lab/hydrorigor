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
  /** Shown on the section page only while it has no published guides. */
  availability: string;
  /** Planned topics; shown on the section page only while it has no published guides. */
  groups: readonly SectionTopicGroup[];
  nextSteps: readonly SectionLink[];
}

export const sectionDefinitions = [
  {
    id: 'systems',
    slug: 'systems',
    navLabel: 'Systems',
    title: 'Hydroponic systems',
    description: 'Compare the main ways to grow without soil at home, from deep water culture and Kratky to NFT, towers and drip, and pick one that fits your space.',
    eyebrow: 'Choose a growing method',
    intro: 'Every system gets water, nutrients and oxygen to the roots in a different way. Start with how much space, time and upkeep you have, then read the guide for the method that fits.',
    availability: 'Four guides cover choosing a home system, deep water culture, a simple DIY build, and which smart features are worth paying for.',
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
    description: 'What to grow indoors and how: sourced pH, EC, light and temperature targets for lettuce, strawberries, tomatoes and more.',
    eyebrow: 'Choose what to grow',
    intro: 'Pick a crop that fits your space and light, then follow its guide. Leafy greens are the easiest start; strawberries and tomatoes need more light and closer attention.',
    availability: 'Seven guides cover strawberries, lettuce, and tomatoes. The pH and EC reference tool lists sourced targets for each crop and the conditions they came from.',
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
        title: 'Read the crop guides',
        description: 'Crop guides give sourced targets, practical setup advice, and the limits of the evidence.',
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
    description: 'Mix nutrients, set pH and EC and choose the right water, with targets from university research and a free dose calculator.',
    eyebrow: 'Feed your plants',
    intro: 'Most hydroponic problems start in the reservoir. These guides explain what plants need, how to mix and measure a solution, and how to read what your meters tell you.',
    availability: 'Seven guides cover nutrient basics, mixing, organic options, and feeding by crop. The pH and EC reference and the label-dose calculator help you apply them.',
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
        description: 'Every target range names its source, units, and the context it was measured in.',
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
    description: 'Lights, pumps, air stones, meters and growing media: what each part does and what to look for.',
    eyebrow: 'Gear that does the work',
    intro: 'What each part of a system does and how to size it: start with the reservoir and the water pump. Guides to lights, air pumps, meters and media follow.',
    availability: 'Equipment guides for lights, pumps, meters, and growing media are being written. Until then, the system and nutrient guides cover what each setup needs.',
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
        description: 'Equipment guides separate published specifications, observed behavior, and editorial judgment.',
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
    description: 'Buying guides for hydroponic setups, kits and nutrients, organized by who they suit and what to check before you buy.',
    eyebrow: 'Buy with confidence',
    intro: 'Each guide starts from your situation (space, crops, budget and how hands-on you want to be) and explains what to look for and why.',
    availability: 'Five buyer guides explain what to look for in systems, kits, and nutrients for different home setups.',
    groups: [
      {
        title: 'Define the use case',
        description: 'A useful shortlist starts with the environment, task, constraints, and reader—not a generic winner.',
        topics: ['Space constraints', 'Maintenance tolerance', 'Measurement needs'],
      },
      {
        title: 'Show the evidence',
        description: 'Each guide explains its selection criteria, source limitations, and what was or was not tested.',
        topics: ['Selection criteria', 'Evidence type', 'Known limitations'],
      },
      {
        title: 'Disclose incentives',
        description: 'Any compensated link is disclosed, and compensation never decides an editorial conclusion.',
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
    description: 'How popular nutrient programs are meant to be used, based on their makers\' published instructions.',
    eyebrow: 'Know what you are buying',
    intro: 'These guides explain how a product is meant to be used and what its documentation does and does not establish. Each one says plainly when nothing has been tested hands-on.',
    availability: "Two guides explain how the Masterblend and General Hydroponics nutrient systems work, based on the manufacturers' published documentation.",
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
    description: 'Side-by-side comparisons of setups and products against the same criteria.',
    eyebrow: 'Compare side by side',
    intro: 'Comparison guides are on the way. For now, the lettuce systems guide compares DWC, NFT and Kratky side by side.',
    availability: 'Comparison guides are being written. For now, the hydroponic lettuce systems guide compares DWC, NFT, and Kratky side by side.',
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
    description: 'Fix yellow leaves, root rot, slow growth and pH swings by checking the likely causes in order.',
    eyebrow: 'Fix a problem',
    intro: 'Troubleshooting guides are on the way. The lettuce and strawberry guides already include symptom-and-fix tables.',
    availability: 'Troubleshooting guides are being written. The strawberry guide already includes a symptom-and-fix table for common problems.',
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
    description: 'Free tools: sourced pH and EC targets by crop, and a calculator that scales a nutrient label dose to your reservoir.',
    eyebrow: 'Free tools',
    intro: 'Each tool shows its sources, units and formula, so you can see exactly where a number comes from.',
    availability: 'Two tools: a pH and EC target reference for five crops with their sources, and a calculator that scales a nutrient label dose to your reservoir size.',
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
        description: 'Each tool states what its output can support and what still requires your judgment.',
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
