import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from './site.ts';

export interface WebsiteJsonLd {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
}

export interface ArticleJsonLdInput {
  headline: string;
  description: string;
  url: string;
  author: string;
  publishDate: Date | string;
  updatedDate?: Date | string | undefined;
  reviewer?: string | undefined;
}

export interface BlogPostingJsonLd {
  '@context': 'https://schema.org';
  '@type': 'BlogPosting';
  headline: string;
  description: string;
  url: string;
  mainEntityOfPage: string;
  datePublished: string;
  dateModified: string;
  author: { '@type': 'Person' | 'Organization'; name: string };
  publisher: { '@type': 'Organization'; name: string; url: string };
  reviewedBy?: { '@type': 'Person'; name: string };
}

export interface BreadcrumbInput {
  name: string;
  url: string;
}

export interface BreadcrumbListJsonLd {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

function isoDate(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.valueOf())) throw new RangeError(`Invalid structured-data date: ${value}`);
  return date.toISOString();
}

export function buildWebsiteJsonLd(): WebsiteJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    description: SITE_DESCRIPTION,
  };
}

export function buildArticleJsonLd(input: ArticleJsonLdInput): BlogPostingJsonLd {
  const published = isoDate(input.publishDate);
  const result: BlogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.url),
    mainEntityOfPage: absoluteUrl(input.url),
    datePublished: published,
    dateModified: input.updatedDate ? isoDate(input.updatedDate) : published,
    author: { '@type': 'Organization', name: input.author },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
  };

  if (input.reviewer) result.reviewedBy = { '@type': 'Person', name: input.reviewer };
  return result;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbInput[]): BreadcrumbListJsonLd {
  if (items.length === 0) throw new RangeError('Breadcrumbs require at least one item.');

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function serializeJsonLd(value: object): string {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}
