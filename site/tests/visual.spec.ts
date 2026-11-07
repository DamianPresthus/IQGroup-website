import { test, expect } from '@playwright/test';

// Visual lock. Baselines were captured from the v5 prototype (git tag design-v5-final) by running this file with
// BASE_URL pointing at source/ served statically and LOCK=v5; every later run compares the Astro build against them.
// Intentional design changes: review the diff, then `npm run test:update`.
const pages = [
  { name: 'home', path: '/', v5: '/v5/index.html' },
  { name: 'sectors', path: '/sectors/', v5: '/v5/sectors.html' },
  { name: 'about', path: '/about/', v5: '/v5/about.html' },
];
const widths = [1440, 820, 390];
const still = '*, *::before, *::after { animation: none !important; transition: none !important; }';

for (const page of pages) {
  for (const width of widths) {
    test(`${page.name} @${width}`, async ({ page: tab }) => {
      await tab.setViewportSize({ width, height: 900 });
      await tab.goto(process.env.LOCK === 'v5' ? page.v5 : page.path);
      await tab.addStyleTag({ content: still });
      await tab.evaluate(() => document.fonts.ready);
      await expect(tab).toHaveScreenshot(`${page.name}-${width}.png`, { fullPage: true });
    });
  }
}
