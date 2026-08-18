#!/usr/bin/env node
// C19 — the player-order deck, 1–6. Promoted from tools/mockup-player-order.mjs.
//
// Usage: node tools/gen-player-order.mjs [print/cards-player-order.html]
//
// LANDSCAPE 67x44mm — the SAME physical card as every other deck (uniform size, so it
// pools onto the shared sheets). The number is rotated 90°: you turn the card a
// quarter-turn to read it, which also lets the digit span the long 67mm axis so it
// stays huge (~50mm ink). Two-sided: number front, ONE uniform back on all six (a
// face-down row deals out genuinely random). Crop-marks-only, no card border — matches
// the other decks; a slightly inaccurate cut never leaves a line on an edge.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// ---- geometry: landscape card, landscape US-Letter sheet (standalone preview: 3x2) ----
const CARD_W = 67;
const CARD_H = 44;
const COLS = 3;
const ROWS = 2;
const PAGE_W = 279.4; // US Letter landscape
const PAGE_H = 215.9;
const GRID_W = COLS * CARD_W;
const GRID_H = ROWS * CARD_H;
const ML = (PAGE_W - GRID_W) / 2; // ~39.2mm — safe, matches the other decks
const MT = (PAGE_H - GRID_H) / 2; // ~63.95mm
const T = 4; // crop tick length mm

export const SEATS = [1, 2, 3, 4, 5, 6];

// Optical centering, MEASURED not guessed. In the UPRIGHT glyph, Leftfield Serif sits
// ~9.4mm low in its line box at 300pt; translateY(-9.4mm) moves the ink to the box
// centre (the side bearing is left uncorrected, per the designer). We apply that
// verified correction FIRST (in the glyph's own frame), THEN rotate 90° about the
// element centre — rotating a centred ink about the centre keeps it centred. So the
// transform is `rotate(90deg) translateY(-NUDGE)` (translate composes first).
const NUDGE = 9.4; // mm, in the glyph's own (pre-rotation) vertical frame

const fontB64 = readFileSync("fonts/LeftfieldSerif-Regular.otf").toString("base64");
const FONT_FACE = `@font-face{font-family:"Leftfield Serif";src:url(data:font/otf;base64,${fontB64}) format("opentype");font-weight:400;font-style:normal;}`;

// ---- card inners (go inside a shared `.card` 67x44 cell) ----
export const poFront = (n) =>
  `<div class="card po"><span class="n" style="transform:rotate(90deg) translateY(${-NUDGE}mm)">${n}</span></div>`;
export const poBack = () => `
  <div class="card po bk">
    <div class="bk-rule"></div>
    <div class="bk-mark"><span class="bk-title">18Dragon</span><span class="bk-sub">Player Order</span></div>
    <div class="bk-rule"></div>
  </div>`;

// ---- card-content CSS (font + `.po` inners). No `.card` sizing here — the host sheet
//      defines `.card` (67x44). Reused by gen-cards.mjs to pool onto the duplex sheets. ----
// Vertically SYMMETRIC gradient — same warm tone at the top AND bottom edges (the
// light tint sits only in the interior) so vertically-abutting cards meet at a
// matching colour and a slightly inaccurate cut never leaves a mismatched strip on an
// edge. (Horizontal edges already match: a vertical gradient is uniform across x.)
const PAPER_BG = "linear-gradient(180deg,#efe7d3 0%,#fffdf6 50%,#efe7d3 100%)";
export const PLAYER_ORDER_CARD_CSS = `
${FONT_FACE}
.po{ display:flex; align-items:center; justify-content:center; background:${PAPER_BG}; }
.po .n{ font-family:"Leftfield Serif",Georgia,serif; font-size:300pt; line-height:.7;
  color:#1c1a17; display:block; }
/* uniform back — horizontal (mockup layout); it's cosmetic, so it needn't match the
   face's quarter-turn. The host .card is flex-column, so rule / mark / rule stack. */
.po.bk{ flex-direction:column; gap:3.4mm; padding:5mm 6mm;
  background:
    repeating-linear-gradient(45deg, #0000 0 2.4mm, #1c1a170a 2.4mm 2.9mm),
    ${PAPER_BG}; }
.po.bk::before{ content:""; position:absolute; inset:2.6mm; border:0.3mm solid #b9ae94;
  border-radius:1mm; opacity:.8; }
.po.bk .bk-rule{ width:22mm; border-top:0.3mm solid #b9ae94; }
.po.bk .bk-mark{ display:flex; flex-direction:column; align-items:center; gap:1.6mm; text-align:center; }
.po.bk .bk-title{ font-family:"Leftfield Serif",Georgia,serif; font-size:19pt; line-height:.9; color:#1c1a17; }
.po.bk .bk-sub{ font-family:"Helvetica Neue",Arial,sans-serif; font-size:6pt; letter-spacing:.24em;
  text-transform:uppercase; color:#6a6357; }
`;

// ---- standalone sheet scaffold (landscape, crop-marks-only) ----
function cropMarks() {
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
function sheet(label, side) {
  const inner = SEATS.map((n) => (side === "front" ? poFront(n) : poBack())).join("");
  return `\n  <section class="sheet"><div class="sheet-label">${label}</div>${cropMarks()}<div class="grid">${inner}</div></section>`;
}

const PLAYER_ORDER_STYLE = `
*{ box-sizing:border-box; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
body{ margin:0; background:#ccc; color:#1c1a17; font-family:"Helvetica Neue",Arial,sans-serif; }
.sheet-label{ position:absolute; top:9mm; left:0; right:0; text-align:center; font-size:8pt; color:#666; }
.sheet{ position:relative; width:${PAGE_W}mm; height:${PAGE_H}mm; background:#fff;
  margin:6mm auto; padding:${MT}mm ${ML}mm; box-shadow:0 1px 6px rgba(0,0,0,.3); }
.crop{ position:absolute; background:#000; }
.crop.v{ width:0.15mm; height:${T}mm; } .crop.h{ height:0.15mm; width:${T}mm; }
.grid{ display:grid; width:${GRID_W}mm; grid-template-columns:repeat(${COLS}, ${CARD_W}mm); grid-auto-rows:${CARD_H}mm; }
/* no card border — crop marks are the only cut guides */
.card{ width:${CARD_W}mm; height:${CARD_H}mm; position:relative; overflow:hidden; display:flex; flex-direction:column; }
${PLAYER_ORDER_CARD_CSS}
@media print{ body{ background:#fff; } .sheet-label{ display:none; } .sheet{ margin:0; box-shadow:none; page-break-after:always; } @page{ size:letter landscape; margin:0; } }
`;

export function playerOrderHtml() {
  const body = sheet("Sheet 1 — FRONT (numbers 1–6)", "front") +
    sheet("Sheet 1 — BACK (uniform, all six identical)", "back");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>18Dragon — Player Order Cards</title></head>
<body>
<style>${PLAYER_ORDER_STYLE}</style>
<main>${body}
</main>
</body></html>
`;
}

// Run the file write only when invoked directly (not when imported by gen-cards.mjs).
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // Standalone/preview only — the printable player-order cards are pooled into the
  // unified print/cards-duplex.html by gen-cards.mjs. Default writes to gitignored preview/.
  const [, , outPath = "preview/cards-player-order.html"] = process.argv;
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, playerOrderHtml());
  console.log(`Wrote ${outPath}: ${SEATS.length} player-order cards (67x44mm landscape, number rotated 90°, front + uniform back).`);
}
