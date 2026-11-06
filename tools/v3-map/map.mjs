import * as d3 from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import fs from 'fs';
const topo = JSON.parse(fs.readFileSync('node_modules/world-atlas/land-110m.json'));
const land = feature(topo, topo.objects.land);
const W = 640, H = 540;
const extent = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[-14,-6],[114,-6],[114,70],[-14,70],[-14,-6]].reverse()] } };
const proj = d3.geoConicEquidistant().rotate([-52, 0]).center([0, 32]).parallels([10, 50]).fitExtent([[6,6],[W-6,H-6]], { type:'MultiPoint', coordinates:[[-6,61],[106,56],[2,2],[106,-2]] }).clipExtent([[0,0],[W,H]]);
const path = d3.geoPath(proj).digits(1);
const grat = d3.geoGraticule().step([15, 15])();
const cities = [['Oslo',10.75,59.91,'r'],['Dubai',55.27,25.20,'l'],['Mumbai',72.88,19.08,'l'],['New Delhi',77.21,28.61,'r'],['Kolkata',88.36,22.57,'r'],['Bangalore',77.59,12.97,'l'],['Singapore',103.82,1.35,'l']];
let c = '';
for (const [n, lo, la, side] of cities) {
  const [x, y] = proj([lo, la]); const hq = n === 'Mumbai';
  c += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${hq?5:3.4}" class="m${hq?' hq':''}"/>` + (hq?`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="10.5" class="ring"/>`:'');
  c += `<text x="${(x + (side==='r'?11:-11)).toFixed(1)}" y="${(y+5.5).toFixed(1)}" text-anchor="${side==='r'?'start':'end'}">${n}</text>`;
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="map" role="img" aria-label="Map: Mumbai headquarters; search across New Delhi, Bangalore, Kolkata, Dubai, Singapore and Oslo">
<defs><pattern id="hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><line x1="0" y1="0" x2="0" y2="3" class="hatch"/></pattern></defs>
<path d="${path(grat)}" class="grat"/>
<path d="${path(land)}" class="land"/>
${c}
</svg>`;
fs.writeFileSync('map.svg', svg); console.log((svg.length/1024).toFixed(0)+' KB');
