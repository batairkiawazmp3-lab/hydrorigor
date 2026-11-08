import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { shouldIncludeInSitemap } from './src/lib/indexing.ts';
import { SITE_ORIGIN } from './src/lib/site.ts';
import { satteri } from '@astrojs/markdown-satteri';
import { guideMediaPlugin } from './src/lib/guide-media.ts';

export default defineConfig({
  output: 'static',
  site: SITE_ORIGIN,
  integrations: [
    // Phone-friendly guide tables and tap-to-enlarge diagrams (all guides are MDX).
    mdx({ processor: satteri({ hastPlugins: [guideMediaPlugin] }) }),
    sitemap({ filter: shouldIncludeInSitemap }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Never inline assets as data: URIs; the CSP only allows same-origin fonts and images.
    build: { assetsInlineLimit: 0 },
  },
});
