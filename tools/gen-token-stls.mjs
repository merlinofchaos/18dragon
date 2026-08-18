#!/usr/bin/env node
// C52 — 3D-printable STL masters for the 18Dragon token pieces. One master per type;
// the designer arrays copies on the print bed (no plated set). Pure Node, no deps.
//
// Usage: node tools/gen-token-stls.mjs   ->  print/stl/*.stl
//
// Pieces (mm; STL units = mm, the slicer default), all sitting on the Z=0 build plate:
//   station-token.stl  cylinder  Ø10 x 10   (carries the 10mm station sticker)
//   market-token.stl   cylinder  Ø12 x 5    (market marker AND round marker — same disc)
//   bid-cube.stl       cube      8 x 8 x 8   (no sticker)
// Flat tops, no recess, no chamfer. Binary STL, watertight/manifold.

import { writeFileSync, mkdirSync } from "node:fs";

const SEGMENTS = 128; // cylinder facets — smooth for a 10–12mm part

// A triangle is [ [x,y,z], [x,y,z], [x,y,z] ] with CCW winding when viewed from
// outside (so the computed normal points outward).
const tri = (a, b, c) => [a, b, c];

// ---- solids (base centered on origin, sitting on Z=0) ----
function cylinder(diameter, height, seg = SEGMENTS) {
  const r = diameter / 2;
  const tris = [];
  const ring = (z) =>
    Array.from({ length: seg }, (_, i) => {
      const t = (2 * Math.PI * i) / seg;
      return [r * Math.cos(t), r * Math.sin(t), z];
    });
  const bot = ring(0), top = ring(height);
  const cBot = [0, 0, 0], cTop = [0, 0, height];
  for (let i = 0; i < seg; i++) {
    const j = (i + 1) % seg;
    // bottom cap (faces -Z: winding so normal points down → center, j, i)
    tris.push(tri(cBot, bot[j], bot[i]));
    // top cap (faces +Z)
    tris.push(tri(cTop, top[i], top[j]));
    // side wall (two triangles per quad, outward normal)
    tris.push(tri(bot[i], bot[j], top[j]));
    tris.push(tri(bot[i], top[j], top[i]));
  }
  return tris;
}

function cube(size) {
  const s = size;
  // 8 corners: base on Z=0, footprint centered on origin
  const h = s / 2;
  const v = [
    [-h, -h, 0], [h, -h, 0], [h, h, 0], [-h, h, 0], // bottom
    [-h, -h, s], [h, -h, s], [h, h, s], [-h, h, s], // top
  ];
  const quad = (a, b, c, d) => [tri(v[a], v[b], v[c]), tri(v[a], v[c], v[d])];
  return [
    ...quad(0, 3, 2, 1), // bottom (-Z)
    ...quad(4, 5, 6, 7), // top (+Z)
    ...quad(0, 1, 5, 4), // -Y
    ...quad(1, 2, 6, 5), // +X
    ...quad(2, 3, 7, 6), // +Y
    ...quad(3, 0, 4, 7), // -X
  ];
}

// ---- binary STL ----
function normal(t) {
  const [a, b, c] = t;
  const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const w = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]];
  const len = Math.hypot(...n) || 1;
  return [n[0] / len, n[1] / len, n[2] / len];
}
function binaryStl(tris, name) {
  const buf = Buffer.alloc(84 + tris.length * 50);
  buf.write(`18Dragon ${name}`.slice(0, 79), 0, "ascii"); // 80-byte header
  buf.writeUInt32LE(tris.length, 80);
  let o = 84;
  for (const t of tris) {
    const n = normal(t);
    for (const c of n) { buf.writeFloatLE(c, o); o += 4; }
    for (const p of t) for (const c of p) { buf.writeFloatLE(c, o); o += 4; }
    buf.writeUInt16LE(0, o); o += 2;
  }
  return buf;
}

const parts = [
  { file: "station-token.stl", name: "station token (10x10)", tris: cylinder(10, 10) },
  { file: "market-token.stl", name: "market/round marker (12x5)", tris: cylinder(12, 5) },
  { file: "bid-cube.stl", name: "bid cube (8)", tris: cube(8) },
];

mkdirSync("print/stl", { recursive: true });
for (const p of parts) {
  writeFileSync(`print/stl/${p.file}`, binaryStl(p.tris, p.name));
  console.log(`wrote print/stl/${p.file}  (${p.tris.length} triangles)`);
}
