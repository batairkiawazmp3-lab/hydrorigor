import { SITE_ORIGIN } from './site.ts';

export const DEVELOPMENT_FIXTURE_PREFIX = 'development-sample-';
export const NON_INDEXABLE_PATHS = new Set(['/404/', '/search/', '/nutrients/']);

// Section landings with no published pages yet. Remove a path once its first guide is live.
export const EMPTY_SECTION_PATHS = new Set(['/problems/', '/compare/']);

interface IndexabilityInput {
  draft?: boolean | undefined;
  noindex?: boolean | undefined;
}

export function isIndexable({ draft = false, noindex = false }: IndexabilityInput): boolean {
  return !draft && !noindex;
}

export function shouldIncludeInSitemap(page: string): boolean {
  const pathname = new URL(page, SITE_ORIGIN).pathname;
  const segments = pathname.split('/').filter(Boolean);

  return !NON_INDEXABLE_PATHS.has(pathname)
    && !EMPTY_SECTION_PATHS.has(pathname)
    && !segments.some((segment) => segment.startsWith(DEVELOPMENT_FIXTURE_PREFIX));
}
