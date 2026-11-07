// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.iqgroup.co.in',
  trailingSlash: 'always',
  integrations: [sitemap()],
  // Inline the one stylesheet (~9 KB gzipped): removes a render-blocking request on first visit (LCP budget, brief §10)
  build: { inlineStylesheets: 'always' },
});
