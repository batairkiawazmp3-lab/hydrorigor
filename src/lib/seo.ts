import { isIndexable } from './indexing.ts';
import { SITE_NAME, absoluteUrl } from './site.ts';

/** Browser/search title: adds the brand only when the result stays within 60 characters. */
export function pageTitle(title: string): string {
  const branded = `${title} — HydroRigor`;
  return branded.length <= 60 ? branded : title;
}

export interface SeoImage {
  src: string;
  alt: string;
}

export interface SeoInput {
  title: string;
  description: string;
  pathname: string;
  canonical?: string | undefined;
  draft?: boolean | undefined;
  noindex?: boolean | undefined;
  type?: 'website' | 'article' | undefined;
  publishDate?: Date | string | undefined;
  updatedDate?: Date | string | undefined;
  image?: SeoImage | undefined;
}

export interface SeoMetadata {
  title: string;
  description: string;
  canonical: string;
  robots: 'index, follow' | 'noindex, nofollow';
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: 'website' | 'article';
    siteName: string;
    image?: SeoImage;
  };
  twitter: {
    card: 'summary' | 'summary_large_image';
    title: string;
    description: string;
    image?: SeoImage;
  };
  publishedTime?: string;
  modifiedTime?: string;
}

function isoDate(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.valueOf())) throw new RangeError(`Invalid SEO date: ${value}`);
  return date.toISOString();
}

export function buildSeoMetadata(input: SeoInput): SeoMetadata {
  const canonical = absoluteUrl(input.canonical ?? input.pathname);
  const indexable = isIndexable({ draft: input.draft, noindex: input.noindex });
  const type = input.type ?? 'website';
  const metadata: SeoMetadata = {
    title: input.title,
    description: input.description,
    canonical,
    robots: indexable ? 'index, follow' : 'noindex, nofollow',
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      type,
      siteName: SITE_NAME,
    },
    twitter: {
      card: input.image ? 'summary_large_image' : 'summary',
      title: input.title,
      description: input.description,
    },
  };

  if (input.image) {
    const image = { ...input.image, src: absoluteUrl(input.image.src) };
    metadata.openGraph.image = image;
    metadata.twitter.image = image;
  }
  if (input.publishDate) metadata.publishedTime = isoDate(input.publishDate);
  if (input.updatedDate) metadata.modifiedTime = isoDate(input.updatedDate);

  return metadata;
}
