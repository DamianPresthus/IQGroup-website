import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// WCAG 2.2 AA (brief §10: axe, zero serious/critical issues) on every page, plus the open enquiry dialog.
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const serious = (v: { impact?: string | null }) => v.impact === 'serious' || v.impact === 'critical';
const report = (violations: { id: string; help: string; nodes: { target: unknown }[] }[]) =>
  violations.map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => JSON.stringify(n.target)).join(', ')})`);

for (const path of ['/', '/sectors/', '/about/', '/404.html']) {
  test(`axe ${path}`, async ({ page }) => {
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).withTags(tags).analyze();
    expect(report(violations.filter(serious))).toEqual([]);
  });
}

test('axe enquiry dialog', async ({ page }) => {
  await page.goto('/');
  await page.click('.hero-ctas .btn-accent');
  await expect(page.locator('#enquiry')).toBeVisible();
  const { violations } = await new AxeBuilder({ page }).include('#enquiry').withTags(tags).analyze();
  expect(report(violations.filter(serious))).toEqual([]);
});
