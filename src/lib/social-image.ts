import { getImage } from 'astro:assets';
import type { SitePhoto } from '../data/photos.ts';
import type { SeoImage } from './seo.ts';

/**
 * Branded 1200x630 share image rendered by `npm run images:share` into public/og/.
 * `name` is a guide route, `section-<id>`, `home` or `start`.
 */
export function brandedShareImage(name: string, title: string, photo?: SitePhoto): SeoImage {
  return {
    src: `/og/${name}.jpg`,
    alt: photo ? `${title}, over a photo: ${photo.alt}` : `${title} — HydroRigor`,
  };
}

/** Tall Pinterest image rendered by `npm run images:share` into public/pins/. */
export function pinImagePath(route: string): string {
  return `/pins/${route}.jpg`;
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
