// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://comet1885.org/', // Replace with your site URL
  prefetch: true,
  compressHTML: true,
  integrations: [
    tailwind(),
    sitemap(),
  ],
  image: {
    // Quality settings for optimized output
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: 268402705, // ~16384x16384
      }
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  }
});
