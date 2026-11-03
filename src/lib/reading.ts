/** Estimated reading time in whole minutes at 230 words per minute, minimum 1. */
export function readingMinutes(body: string | undefined): number {
  if (!body) return 1;
  const text = body
    .replace(/^---[\s\S]*?---/u, '')
    .replace(/```[\s\S]*?```/gu, '')
    .replace(/<[^>]+>/gu, ' ')
    .replace(/[#>*_`|[\]()-]/gu, ' ');
  const words = text.split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}
