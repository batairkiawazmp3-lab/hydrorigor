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

type CommercialContentCollection = 'reviews' | 'comparisons';

function simpleYamlScalar(rawValue: string): string {
  const commentIndex = rawValue.search(/\s+#/u);
  const withoutComment = (commentIndex >= 0 ? rawValue.slice(0, commentIndex) : rawValue).trim();
  const quote = withoutComment[0];
  return quote && (quote === '"' || quote === "'") && withoutComment.endsWith(quote)
    ? withoutComment.slice(1, -1)
    : withoutComment;
}

function reviewHasHandsOnEvidence(frontmatter: string): boolean {
  const match = frontmatter.match(/^evidenceBasis:\s*(.*?)\s*$/mu);
  return match?.[1] !== undefined && simpleYamlScalar(match[1]) === 'hands-on-tested';
}

function comparisonHasCompleteHandsOnSet(frontmatter: string): boolean {
  const lines = frontmatter.split(/\r?\n/u);
  const sectionStart = lines.findIndex((line) => /^itemEvidence:\s*(?:#.*)?$/u.test(line));
  if (sectionStart < 0) return false;

  const section: string[] = [];
  for (const line of lines.slice(sectionStart + 1)) {
    if (/^[A-Za-z_][\w-]*\s*:/u.test(line)) break;
    section.push(line);
  }

  const itemIndents = section.flatMap((line) => {
    const match = line.match(/^(\s*)-\s*/u);
    return match?.[1] !== undefined ? [match[1].length] : [];
  });
  if (itemIndents.length === 0) return false;

  const itemIndent = Math.min(...itemIndents);
  const records: string[][] = [];
  for (const line of section) {
    const itemStart = line.match(/^(\s*)-\s*/u);
    if (itemStart?.[1]?.length === itemIndent) records.push([line]);
    else if (records.length > 0) records.at(-1)?.push(line);
  }

  return records.length > 0 && records.every((record) => {
    const evidenceBases = record.flatMap((line, index) => {
      const itemPrefix = index === 0
        ? line.match(/^\s*-\s*evidenceBasis:\s*(.*?)\s*$/u)
        : undefined;
      const property = line.match(/^\s+evidenceBasis:\s*(.*?)\s*$/u);
      const rawValue = itemPrefix?.[1] ?? property?.[1];
      return rawValue === undefined ? [] : [simpleYamlScalar(rawValue)];
    });
    return evidenceBases.length === 1 && evidenceBases[0] === 'hands-on-tested';
  });
}

function frontmatterAllowsHandsOnClaims(
  collection: CommercialContentCollection,
  frontmatter: string,
): boolean {
  return collection === 'reviews'
    ? reviewHasHandsOnEvidence(frontmatter)
    : comparisonHasCompleteHandsOnSet(frontmatter);
}

export function validateCommercialMdxSource(relativePath: string, source: string): string[] {
  const normalizedPath = relativePath.replaceAll('\\', '/');
  const collection = normalizedPath.split('/')[0];
  if (collection !== 'reviews' && collection !== 'comparisons') return [];

  const parts = splitMdx(source);
  if (!parts || frontmatterAllowsHandsOnClaims(collection, parts.frontmatter)) return [];

  const match = findUnmistakableHandsOnClaim(parts.body);
  return match
    ? [`${normalizedPath}: non-hands-on ${collection} body contains an unsupported hands-on claim: “${match.phrase}”.`]
    : [];
}
