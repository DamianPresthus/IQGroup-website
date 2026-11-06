// Generates the v4 hero dotted footprint map (inline SVG). Run: cd tools/v4-map && npm i && node dots.mjs > map.svg, then paste the SVG into .hero-map in source/v4/index.html

import * as d3 from 'd3-geo';
import { feature } from 'topojson-client';
import fs from 'fs';
const here = new URL('.', import.meta.url).pathname;
const topo = JSON.parse(fs.readFileSync(here + 'node_modules/world-atlas/land-110m.json'));
const land = feature(topo, topo.objects.land);
const W = 640, H = 560, STEP = 8;
const proj = d3.geoNaturalEarth1().rotate([-58, 0]).fitExtent([[0, 0], [W, H]], { type: 'MultiPoint', coordinates: [[-4, 64], [112, 56], [2, -2], [108, -4], [58, 70]] });
let d = '';
for (let y = STEP / 2; y < H; y += STEP) for (let x = STEP / 2; x < W; x += STEP) {
  const ll = proj.invert([x, y]);
  if (ll && d3.geoContains(land, ll)) d += `M${x} ${y}h0`;
}
const cities = [['Mumbai', 72.88, 19.08, 'l', true], ['New Delhi', 77.21, 28.61, 'r'], ['Kolkata', 88.36, 22.57, 'r'], ['Bangalore', 77.59, 12.97, 'r'], ['Dubai', 55.27, 25.2, 'l'], ['Singapore', 103.82, 1.35, 'l'], ['Oslo', 10.75, 59.91, 'r']];
const [mx, my] = proj([72.88, 19.08]);
let arcs = '', marks = '';
cities.forEach(([n, lo, la, side, hq], i) => {
  const [x, y] = proj([lo, la]);
  if (!hq) {
    const cx = (mx + x) / 2, cy = (my + y) / 2 - Math.hypot(x - mx, y - my) * 0.28;
    arcs += `<path class="arc" style="--i:${i}" d="M${mx.toFixed(1)} ${my.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}" pathLength="1"/>`;
  }
  marks += hq
    ? `<circle class="pulse" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6"/><circle class="hq" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5"/>`
    : `<circle class="city" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4"/>`;
  const dx = side === 'r' ? 10 : -10;
  marks += `<text x="${(x + dx).toFixed(1)}" y="${(y + 4.5).toFixed(1)}" text-anchor="${side === 'r' ? 'start' : 'end'}"${hq ? ' class="hq-label"' : ''}>${n}</text>`;
});
process.stdout.write(`<svg class="map" viewBox="0 0 ${W} ${H}" role="img" aria-label="Map: headquartered in Mumbai, with search across New Delhi, Kolkata, Bangalore, Dubai, Singapore and Oslo"><path class="dots" d="${d}"/>${arcs}${marks}</svg>`);
