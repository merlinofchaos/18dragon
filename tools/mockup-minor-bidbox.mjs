#!/usr/bin/env node
// MOCKUP: a single MINOR bid box, matching samples/minorbidboxexample.jpg.
// Perimeter bid track 100..195 (+5), numbers facing OUTWARD (roulette style),
// start corner (100, bottom-right) dark. Center = the card being bid on
// (67x44 cert, landscape) + 1mm gap all round -> 69x46mm opening.
// Writes docs/mockups/minor-bidbox-mockup.html.

import { readFileSync, writeFileSync } from "node:fs";

// kind: "minor" (track 100..195) or "private" (0..95). Same box otherwise.
const KIND = process.argv[2] === "private" ? "private" : "minor";
const START_VAL = KIND === "private" ? 0 : 100;
const KLABEL = KIND === "private" ? "PRIVATE" : "MINOR";
const OUT = `docs/mockups/${KIND}-bidbox-mockup.html`;

// embed the designer's font (self-contained data URI)
const fontB64 = readFileSync("fonts/LeftfieldSerif-Regular.otf").toString("base64");
const FONT_FACE = `@font-face{ font-family:"Leftfield Serif"; src:url(data:font/otf;base64,${fontB64}) format("opentype"); font-weight:400; }`;

const CARD_W = 67, CARD_H = 44, GAP = 1; // 67x44 cert (landscape) + 1mm gap each side
const CW = CARD_W + 2 * GAP; // 69  center opening width
const CH = CARD_H + 2 * GAP; // 46  center opening height
const T = 15; // perimeter track depth
const cols = 7, rows = 5;
const colW = CW / (cols - 2); // top/bottom edge cell width
const rowH = CH / (rows - 2); // left/right edge cell height

// perimeter walk (CCW from bottom-right): bottom R->L, left B->T, top L->R, right T->B
const path = [];
for (let c = cols; c >= 1; c--) path.push([rows, c]);
for (let r = rows - 1; r >= 1; r--) path.push([r, 1]);
for (let c = 2; c <= cols; c++) path.push([1, c]);
for (let r = 2; r <= rows - 1; r++) path.push([r, cols]);

// rotation so each number reads from outside — counterclockwise sense (designer).
function rot(r, c) {
  const top = r === 1, bot = r === rows, left = c === 1, right = c === cols;
  if (top && left) return 135;
  if (top && right) return -135;
  if (bot && left) return 45;
  if (bot && right) return -45;
  if (top) return 180;
  if (bot) return 0;
  if (left) return 90;
  if (right) return -90;
  return 0;
}

// SVG number: text anchored + centered on the glyph (dominant-baseline:central),
// rotated about its own box center — reliably centered regardless of font metrics.
// dy tunes the vertical centering for THIS font's metrics (dominant-baseline
// relies on declared metrics, which are off for this display face). transform
// rotates about the glyph's own box center, so a centered glyph stays centered.
const DY = "0.25em";
// per-POSITION anchor + letter-spacing (designer-tuned): each edge/corner rotates
// differently, so each region needs its own x/y to read visually centered.
function anchor(r, c) {
  const top = r === 1, bot = r === rows, left = c === 1, right = c === cols;
  if (bot && left) return { x: "57%", y: "52%", ls: "-0.02em" }; // bottom-left corner
  if (top && left) return { x: "57%", y: "63%", ls: "-0.02em" }; // top-left corner
  if (top && right) return { x: "45%", y: "66%", ls: "-0.02em" }; // top-right corner
  if (bot && right) return { x: "42%", y: "53%", ls: "-0.04em" }; // bottom-right corner (100 disc)
  if (left) return { x: "57%", y: "55%", ls: "-0.01em" }; // left side
  if (top) return { x: "50%", y: "64%", ls: "-0.01em" }; // top
  if (right) return { x: "41%", y: "57%", ls: "-0.01em" }; // right side
  if (bot) return { x: "47%", y: "50%", ls: "-0.01em" }; // bottom (kept from prior)
  return { x: "50%", y: "50%", ls: "-0.01em" };
}
const numSvg = (val, deg, color, a) =>
  `<svg class="ns"><text x="${a.x}" y="${a.y}" dy="${DY}" fill="${color}" style="letter-spacing:${a.ls};transform:rotate(${deg}deg);transform-box:fill-box;transform-origin:center">${val}</text></svg>`;

// box-within-box: the CELL stays axis-aligned (border unrotated); only the number
// rotates. Start cell (100) = black cell + white disc + black number.
const cells = path
  .map(([r, c], i) => {
    const val = START_VAL + i * 5;
    const deg = rot(r, c);
    const a = anchor(r, c);
    if (i === 0) {
      return `<div class="tk start" style="grid-row:${r};grid-column:${c}"><span class="disc">${numSvg(val, deg, "#000", a)}</span></div>`;
    }
    return `<div class="tk" style="grid-row:${r};grid-column:${c}">${numSvg(val, deg, "#000", a)}</div>`;
  })
  .join("");

const center =
  `<div class="slot" style="grid-row:2/${rows};grid-column:2/${cols}">` +
  `<div class="label">${KLABEL}<br>COMPANY 1</div>` +
  `</div>`;

const html = `<!doctype html><html><head><meta charset="utf-8">
<title>Minor Bidbox — mockup</title>
<style>
  ${FONT_FACE}
  body{ margin:0; background:#d9d6cf; font-family:"Helvetica Neue",Arial,sans-serif; color:#1c1a16;
    display:flex; flex-direction:column; align-items:center; gap:6mm; padding:16mm; }
  .cap{ font-size:11pt; color:#4a453d; }
  .box{ display:grid; background:#fff; border:0.6mm solid #000;
    grid-template-columns:${T}mm repeat(${cols - 2},${colW}mm) ${T}mm;
    grid-template-rows:${T}mm repeat(${rows - 2},${rowH}mm) ${T}mm; }
  .tk{ border:0.3mm solid #000; background:#fff; position:relative;
    display:flex; align-items:center; justify-content:center; }
  .ns{ position:absolute; inset:0; width:100%; height:100%; overflow:visible; display:block; }
  .ns text{ font-family:"Leftfield Serif",Georgia,serif; font-weight:400;
    font-size:32pt; letter-spacing:-0.01em; text-anchor:middle; }
  .tk.start{ background:#000; }
  .disc{ position:relative; width:13mm; height:13mm; border-radius:50%; background:#fff; }
  .slot{ display:flex; align-items:center; justify-content:center; padding:${GAP}mm; }
  .label{ font-family:"Leftfield Serif",Georgia,serif; text-align:center; line-height:1.05;
    font-size:40pt; letter-spacing:0; color:#000; }
</style></head>
<body>
  <div class="cap">${KLABEL} bidbox — mockup (center sized to the card + 1mm gap)</div>
  <div class="box">${cells}${center}</div>
</body></html>`;

writeFileSync(OUT, html);
console.log(`box ${T * 2 + CW} x ${T * 2 + CH} mm; center ${CW}x${CH} mm (card ${CARD_W}x${CARD_H} + ${GAP}mm)`);
