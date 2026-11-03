import { getImage } from 'astro:assets';
import type { SitePhoto } from '../data/photos.ts';
import type { SeoImage } from './seo.ts';

/** A 1200x630 JPEG crop of a site photo for Open Graph and Twitter cards. */
export async function socialImage(photo: SitePhoto | undefined): Promise<SeoImage | undefined> {
  if (!photo) return undefined;
  const result = await getImage({ src: photo.image, width: 1200, height: 630, format: 'jpg', quality: 78 });
  return { src: result.src, alt: photo.alt };
}
