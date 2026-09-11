import { SITE_ORIGIN } from './site.ts';

export const DEVELOPMENT_FIXTURE_PREFIX = 'development-sample-';

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

  return pathname !== '/404/' && !segments.some((segment) => segment.startsWith(DEVELOPMENT_FIXTURE_PREFIX));
}
