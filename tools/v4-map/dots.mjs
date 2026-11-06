// Generates the v4 hero footprint map (inline SVG): a staggered dot grid of land from the Atlantic to the
// South China Sea, IQ's footprint countries picked out in accent dots, and arcs from Mumbai to each search city.
// Run: cd tools/v4-map && npm i && node dots.mjs > map.svg, then paste the SVG into .hero-map in source/v4/index.html
import * as d3 from 'd3-geo';
import { feature } from 'topojson-client';
import fs from 'fs';
const here = new URL('.', import.meta.url).pathname;
const read = (f) => JSON.parse(fs.readFileSync(here + 'node_modules/world-atlas/' + f));
const landTopo = read('land-110m.json'), countriesTopo = read('countries-50m.json');
const land = feature(landTopo, landTopo.objects.land);
const countries = feature(countriesTopo, countriesTopo.objects.countries).features;
// Footprint: India, United Arab Emirates, Singapore, Norway (ISO 3166-1 numeric ids in world-atlas).
const footprint = countries.filter((c) => ['356', '784', '702', '578'].includes(c.id));

const W = 1200, H = 760, STEP = 9;
const proj = d3.geoNaturalEarth1().rotate([-40, 0])
  .fitExtent([[0, 0], [W, H]], { type: 'MultiPoint', coordinates: [[-22, 66], [118, 58], [-20, -36], [118, -12], [50, 72]] });

let base = '', lit = '';
for (let row = 0, y = STEP / 2; y < H; y += STEP * 0.866, row++) {
  for (let x = (row % 2 ? STEP : STEP / 2); x < W; x += STEP) {
    const ll = proj.invert([x, y]);
    if (!ll || !d3.geoContains(land, ll)) continue;
    const seg = `M${Math.round(x)} ${Math.round(y)}h0`;
    if (footprint.some((c) => d3.geoContains(c, ll))) lit += seg; else base += seg;
  }
}

const cities = [
  ['Mumbai', 72.88, 19.08, 'l', true], ['New Delhi', 77.21, 28.61, 'r'], ['Kolkata', 88.36, 22.57, 'r'],
  ['Bangalore', 77.59, 12.97, 'r'], ['Dubai', 55.27, 25.2, 'l'], ['Singapore', 103.82, 1.35, 'b'], ['Oslo', 10.75, 59.91, 't'],
];
const f = (n) => n.toFixed(1);
const [mx, my] = proj([72.88, 19.08]);
let arcs = '', marks = '', labels = '';
cities.forEach(([name, lon, lat, side, hq], i) => {
  const [x, y] = proj([lon, lat]);
  if (!hq) {
    const dist = Math.hypot(x - mx, y - my), lift = Math.min(dist * 0.32, 140);
    const cx = (mx + x) / 2, cy = (my + y) / 2 - lift;
    arcs += `<path class="arc" style="--i:${i}" d="M${f(mx)} ${f(my)}Q${f(cx)} ${f(cy)} ${f(x)} ${f(y)}" pathLength="1"/>`;
    marks += `<circle class="halo" cx="${f(x)}" cy="${f(y)}" r="7"/><circle class="city" cx="${f(x)}" cy="${f(y)}" r="3.2"/>`;
  } else {
    marks += `<circle class="pulse" cx="${f(x)}" cy="${f(y)}" r="7"/><circle class="halo hq-halo" cx="${f(x)}" cy="${f(y)}" r="11"/><circle class="hq" cx="${f(x)}" cy="${f(y)}" r="5"/>`;
  }
  const off = { l: [-14, 5, 'end'], r: [14, 5, 'start'], t: [0, -14, 'middle'], b: [0, 22, 'middle'] }[side];
  labels += `<text x="${f(x + off[0])}" y="${f(y + off[1])}" text-anchor="${off[2]}"${hq ? ' class="hq-label"' : ''}>${name}</text>`;
});

// Dots fade out westwards and towards the top/bottom edges; arcs, markers and labels stay crisp.
const defs = `<defs>
<linearGradient id="fade-x" x1="0" x2="1" y1="0" y2="0"><stop offset="0.16" stop-color="#fff" stop-opacity="0"/><stop offset="0.56" stop-color="#fff" stop-opacity="1"/><stop offset="0.88" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<linearGradient id="fade-y" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.14" stop-color="#fff" stop-opacity="1"/><stop offset="0.82" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="mask-x" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#fade-x)"/></mask>
<mask id="mask-y" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#fade-y)"/></mask>
</defs>`;
process.stdout.write(`<svg class="map" viewBox="0 0 ${W} ${H}" role="img" aria-label="Map: headquartered in Mumbai, with search across New Delhi, Kolkata, Bangalore, Dubai, Singapore and Oslo">${defs}<g mask="url(#mask-x)"><g mask="url(#mask-y)"><path class="dots" d="${base}"/><path class="dots-lit" d="${lit}"/></g></g><g class="arcs">${arcs}</g><g class="marks">${marks}</g><g class="labels">${labels}</g></svg>`);
