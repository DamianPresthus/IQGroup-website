// Generates the favicon, Apple touch icon, logo PNG and the 1200x630 social share image into public/, from the
// outlined IQ mark (src/assets/brand/iq-mark.svg) and the site's own fonts and colours.
// Run after changing the mark, the colours or the headline:  node scripts/brand-images.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(new URL(path, root));
const mark = read('src/assets/brand/iq-mark.svg', 'utf8').toString();
const [, vb] = mark.match(/viewBox="([^"]+)"/);
const [x, y, w, h] = vb.split(' ').map(Number);
const path = mark.match(/ d="([^"]+)"/)[1];
const ink = '#12051A', bg = '#FAF9F5', accent = '#8F1F78';

// Favicon: the mark centred on an alabaster rounded square, so it reads on light and dark browser chrome.
const side = Math.max(w, h) * 1.36;
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}"><rect width="${side}" height="${side}" rx="${side * 0.22}" fill="${bg}"/><g transform="translate(${(side - w) / 2 - x} ${(side - h) / 2 - y})"><path fill="${ink}" d="${path}"/></g></svg>\n`;
writeFileSync(new URL('public/favicon.svg', root), favicon);

const font = (file) => `data:font/woff2;base64,${read(`public/fonts/${file}`).toString('base64')}`;
const css = `
  @font-face { font-family: Newsreader; src: url(${font('newsreader.woff2')}); font-weight: 300 600; }
  @font-face { font-family: Jakarta; src: url(${font('plusjakarta.woff2')}); font-weight: 300 700; }
  * { margin: 0; box-sizing: border-box; } body { background: transparent; }`;
const markImg = (fill) => `data:image/svg+xml;base64,${Buffer.from(mark.replace(/fill="[^"]+"/, `fill="${fill}"`)).toString('base64')}`;

const browser = await chromium.launch();
const shot = async (file, width, height, html, omitBackground = false) => {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(`<style>${css}</style>${html}`);
  await page.evaluate(() => document.fonts.ready);
  writeFileSync(new URL(`public/${file}`, root), await page.screenshot({ omitBackground }));
  await page.close();
};

await shot('apple-touch-icon.png', 180, 180,
  `<div style="width:180px;height:180px;background:${bg};display:grid;place-items:center"><img src="${markImg(ink)}" style="width:118px"></div>`);
await shot('iq-mark.png', 512, 512,
  `<div style="width:512px;height:512px;display:grid;place-items:center"><img src="${markImg(ink)}" style="width:440px"></div>`, true);
await shot('og.png', 1200, 630, `
  <div style="width:1200px;height:630px;background:${bg};padding:72px 84px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden">
    <div style="position:absolute;right:-140px;top:-120px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,color-mix(in oklch,${accent} 16%,transparent),transparent 68%)"></div>
    <div style="display:flex;align-items:baseline;gap:14px;font-family:Jakarta;font-weight:600;font-size:26px;color:#6E4165">
      <img src="${markImg(ink)}" style="height:52px;align-self:center"> Group
    </div>
    <div style="font-family:Newsreader;font-weight:400;font-size:82px;line-height:1.02;letter-spacing:-0.03em;color:${ink};max-width:900px">Hires that move your organisation forward.</div>
    <div style="display:flex;align-items:center;gap:18px;font-family:Jakarta;font-weight:600;font-size:24px;color:#6E4165">
      <span style="width:36px;height:2px;background:${accent}"></span>Executive Search · Mumbai · 30+ years
    </div>
  </div>`);
await browser.close();
console.log('wrote public/favicon.svg, apple-touch-icon.png, iq-mark.png, og.png');
