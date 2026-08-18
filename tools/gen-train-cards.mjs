#!/usr/bin/env node
// Generate the printable 18Dragon train deck from trains.json.
//
// Usage: node tools/gen-train-cards.mjs [data/trains.json] [print/train-cards.html] [out-content.html]
//
// US Letter LANDSCAPE, 3x4 = 12 cards/page, 67x44mm, duplex (long-edge -> mirror rows).
// Deck trains only (L/2, 3, 4, 5, 6, 7, E); all physical copies. The L card is
// two-sided (L front / 2 back); other cards get a uniform back. Same print recipe as
// the private cards (crop marks, print-color-adjust). Perm/prize trains (2P/LP/5P/P+)
// are NOT here — they render on their private backs (gen-private-cards.mjs).

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { COIN_CSS, TRAIN_CSS, trainFace, FONT_FACE, CARD_ROOT_CSS } from "./cardkit.mjs";

// Standalone/preview output only — the printable train deck is part of the unified
// print/cards-duplex.html from gen-cards.mjs. Default writes to the gitignored preview/.
const [, , inPath = "data/trains.json", outPath = "preview/train-cards.html", contentPath] =
  process.argv;

// ---- layout (matches the private deck) ----
const ORIENT = "landscape";
const COLS = 3;
const ROWS = 4;
const PER_PAGE = COLS * ROWS;
const CARD_W = 67;
const CARD_H = 44;
const MIRROR = "rows"; // landscape + long-edge
const PAGE_W = 279.4;
const PAGE_H = 215.9;
const GRID_W = COLS * CARD_W;
const GRID_H = ROWS * CARD_H;
const ML = (PAGE_W - GRID_W) / 2;
const MT = (PAGE_H - GRID_H) / 2;

const data = JSON.parse(readFileSync(inPath, "utf8"));
const deck = data.trains.filter((t) => t.deck);

// One physical card per copy: { front: trainFace, back: 2-face (L) or uniform }.
const cards = [];
for (const t of deck) {
  for (let i = 0; i < t.quantity; i++) cards.push(t);
}

// Back of L = the 2; back of 3-E = the same face reprinted (designer 2026-07-29).
// trainFace() returns a full 67×44 `.tc` card, so it IS the grid cell (no wrapper).
const faceCard = (t) => trainFace(t);
const backCard = (t) => trainFace(t.back ?? t);

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}
function mirror(cells) {
  const grid = [];
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) row.push(cells[r * COLS + c] ?? null);
    grid.push(row);
  }
  if (MIRROR === "cols") grid.forEach((row) => row.reverse());
  else grid.reverse();
  return grid.flat();
}
function cropMarks() {
  const T = 4;
  let m = "";
  for (let i = 0; i <= COLS; i++) {
    const x = ML + i * CARD_W;
    m += `<div class="crop v" style="left:${x}mm;top:${MT - T - 1}mm"></div>`;
    m += `<div class="crop v" style="left:${x}mm;top:${MT + GRID_H + 1}mm"></div>`;
  }
  for (let j = 0; j <= ROWS; j++) {
    const y = MT + j * CARD_H;
    m += `<div class="crop h" style="top:${y}mm;left:${ML - T - 1}mm"></div>`;
    m += `<div class="crop h" style="top:${y}mm;left:${ML + GRID_W + 1}mm"></div>`;
  }
  return m;
}
function sheetHtml(cells, label, kind) {
  const inner = cells
    .map((t) => {
      if (!t) return `<div class="blank"></div>`;
      return kind === "front" ? faceCard(t) : backCard(t);
    })
    .join("");
  return `
  <section class="sheet">
    <div class="sheet-label">${label}</div>
    ${cropMarks()}
    <div class="grid">${inner}</div>
  </section>`;
}

const pages = chunk(cards, PER_PAGE);
let sheets = "";
pages.forEach((page, i) => {
  sheets += sheetHtml(page, `Sheet ${i + 1} — FRONT`, "front");
  sheets += sheetHtml(
    mirror(page),
    `Sheet ${i + 1} — BACK (rows mirrored for landscape long-edge duplex)`,
    "back",
  );
});

const style = `
  :root { color-scheme: light; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  ${FONT_FACE}
  ${CARD_ROOT_CSS}
  ${COIN_CSS}
  ${TRAIN_CSS}
  body { margin: 0; background: #ccc; font-family: var(--serif); }
  .sheet-label { position: absolute; top: 9mm; left: 0; right: 0; text-align: center;
    font-family: system-ui, sans-serif; font-size: 8pt; color: #666; }
  .sheet { position: relative; width: ${PAGE_W}mm; height: ${PAGE_H}mm; background: #fff;
    margin: 6mm auto; padding: ${MT}mm ${ML}mm; box-shadow: 0 1px 6px rgba(0,0,0,.3); }
  .crop { position: absolute; background: #000; }
  .crop.v { width: 0.15mm; height: 4mm; }
  .crop.h { height: 0.15mm; width: 4mm; }
  .grid { display: grid; width: ${GRID_W}mm;
    grid-template-columns: repeat(${COLS}, ${CARD_W}mm); grid-auto-rows: ${CARD_H}mm; }
  .blank { width: ${CARD_W}mm; height: ${CARD_H}mm; }
  @media print {
    body { background: #fff; }
    .sheet-label { display: none; }
    .sheet { margin: 0; box-shadow: none; page-break-after: always; }
    @page { size: letter ${ORIENT}; margin: 0; }
  }
`;

const content = `<style>${style}</style>\n<main>${sheets}\n</main>\n`;
const standalone = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>18Dragon — Train Cards</title>
</head>
<body>
${content}</body>
</html>
`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, standalone);
if (contentPath) writeFileSync(contentPath, content);

console.log(
  `Wrote ${outPath}: ${cards.length} physical cards (${deck.length} types), ` +
    `${pages.length} front + ${pages.length} back sheets (${PER_PAGE}/page, ${ORIENT}).`,
);
