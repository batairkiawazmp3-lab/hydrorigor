import { getImage } from 'astro:assets';
import type { SitePhoto } from '../data/photos.ts';
import type { SeoImage } from './seo.ts';

/** A 1200x630 JPEG crop of a site photo for Open Graph and Twitter cards. */
export async function socialImage(photo: SitePhoto | undefined): Promise<SeoImage | undefined> {
  if (!photo) return undefined;
  const result = await getImage({ src: photo.image, width: 1200, height: 630, format: 'jpg', quality: 78 });
  return { src: result.src, alt: photo.alt };
}

/**
 * Article images for Google in the three aspect ratios it recommends (16:9, 4:3, 1:1),
 * each at least 50,000 pixels, cropped from the site photo.
 */
export async function schemaImages(photo: SitePhoto | undefined): Promise<string[] | undefined> {
  if (!photo) return undefined;
  const sizes: Array<[number, number]> = [[1200, 675], [1200, 900], [900, 900]];
  const results = await Promise.all(sizes.map(([width, height]) => getImage({ src: photo.image, width, height, format: 'jpg', quality: 76 })));
  return results.map((result) => result.src);
}
