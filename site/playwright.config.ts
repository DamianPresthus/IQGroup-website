import { defineConfig, devices } from '@playwright/test';

// Tests run against the production build (`astro preview`). Visual baselines live in tests/__screenshots__ and
// were captured from the locked v5 design (git tag design-v5-final); see tests/visual.spec.ts.
const PORT = 4329; // not Astro's default 4321, so a running `astro dev`/`preview` never collides
export default defineConfig({
  testDir: 'tests',
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  fullyParallel: true,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: process.env.BASE_URL ?? `http://localhost:${PORT}`, ...devices['Desktop Chrome'] },
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' } },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        // --ignore-lock: one-off foreground server (Astro 7 otherwise auto-backgrounds when run by an agent/CI and
        // exits at once). Called via node, not npx, so Playwright owns the process and stops it after the run.
        command: `node node_modules/astro/bin/astro.mjs preview --port ${PORT} --ignore-lock`,
        port: PORT,
        reuseExistingServer: !process.env.CI,
      }, // build first: `npm test` does
});
