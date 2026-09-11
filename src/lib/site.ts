export const SITE_NAME = 'HydroRigor';
export const SITE_ORIGIN = 'https://hydrorigor.com';
export const SITE_DESCRIPTION = 'Evidence-based hydroponics for home growers.';

export function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, SITE_ORIGIN).toString();
}
