export interface HandsOnClaimMatch {
  pattern: string;
  phrase: string;
  index: number;
}

const unmistakableHandsOnClaimPatterns = [
  {
    pattern: 'first-person test or measurement',
    expression: /\bwe(?:\s+have|'ve|’ve)?\s+(?:personally\s+|directly\s+)?(?:tested|measured|evaluated|trialed|tried)\b/iu,
  },
  {
    pattern: 'first-person product use',
    expression: /\bwe(?:\s+have|'ve|’ve)?\s+(?:personally\s+|directly\s+)?used\s+(?:(?:both|this|the|these|those|each)\s+)?(?:product|products|device|devices|unit|units|model|models|system|systems|item|items)\b/iu,
  },
  {
    pattern: 'first-person test result',
    expression: /\bour\s+(?:hands-on\s+)?(?:testing|tests?|measurements?|evaluation|trial)\s+(?:showed|shows|found|confirmed|demonstrated|revealed|indicated|recorded)\b/iu,
  },
  {
    pattern: 'first-person test period',
    expression: /\b(?:during|in)\s+our\s+(?:hands-on\s+)?(?:test|tests|testing|measurements?|evaluation|trial)\b/iu,
  },
  {
    pattern: 'HydroRigor test or measurement',
    expression: /\bHydroRigor\s+(?:has\s+|had\s+)?(?:personally\s+|directly\s+)?(?:tested|measured|used|evaluated|trialed|tried)\b/iu,
  },
] as const;

export function findUnmistakableHandsOnClaim(value: string): HandsOnClaimMatch | undefined {
  for (const candidate of unmistakableHandsOnClaimPatterns) {
    const match = candidate.expression.exec(value);
    if (match) {
      return {
        pattern: candidate.pattern,
        phrase: match[0],
        index: match.index,
      };
    }
  }
  return undefined;
}

export function assertNoUnmistakableHandsOnClaim(value: string, context: string): void {
  const match = findUnmistakableHandsOnClaim(value);
  if (match) {
    throw new Error(`${context} contains an unsupported hands-on claim: “${match.phrase}”.`);
  }
}

interface MdxParts {
  frontmatter: string;
  body: string;
}

function splitMdx(source: string): MdxParts | undefined {
  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/u);
  if (!match?.[1] || match[2] === undefined) return undefined;
  return { frontmatter: match[1], body: match[2] };
}

function frontmatterHasHandsOnEvidence(frontmatter: string): boolean {
  return /^\s*evidenceBasis:\s*["']?hands-on-tested["']?\s*$/imu.test(frontmatter);
}

export function validateCommercialMdxSource(relativePath: string, source: string): string[] {
  const normalizedPath = relativePath.replaceAll('\\', '/');
  const collection = normalizedPath.split('/')[0];
  if (collection !== 'reviews' && collection !== 'comparisons') return [];

  const parts = splitMdx(source);
  if (!parts || frontmatterHasHandsOnEvidence(parts.frontmatter)) return [];

  const match = findUnmistakableHandsOnClaim(parts.body);
  return match
    ? [`${normalizedPath}: non-hands-on ${collection} body contains an unsupported hands-on claim: “${match.phrase}”.`]
    : [];
}
