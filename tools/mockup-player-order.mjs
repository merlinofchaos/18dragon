#!/usr/bin/env node
// MOCKUP (C19, player-order half): the player-order cards, 1-6.
//
//   node tools/mockup-player-order.mjs          -> docs/mockups/player-order-mockup.html
//   node tools/mockup-player-order.mjs square   -> print-true square corners
//
// PORTRAIT 44x67mm — the only portrait card in the game; every other deck is 67x44
// landscape. That is deliberate: a card standing the other way up on the table is
// read as "not a train, not a private, not a cert" before the number is even read.
// The number is the card.

import { writeFileSync, readFileSync } from "node:fs";

const ROUNDED = process.argv[2] !== "square";
const OUT = "docs/mockups/player-order-mockup.html";

const fontB64 = readFileSync("fonts/LeftfieldSerif-Regular.otf").toString("base64");
const FONT_FACE = `@font-face{font-family:"Leftfield Serif";src:url(data:font/otf;base64,${fontB64}) format("opentype");font-weight:400;font-style:normal;}`;

const SEATS = [1, 2, 3, 4, 5, 6];

// Optical centering, MEASURED not guessed: each glyph was rendered headless at 300pt
// inside the card and its ink bounding box compared with the card's center. NUDGE is
// the correction that puts the INK box (not the line box) in the middle of the card —
// Leftfield Serif sits ~9.4mm low in its line box at this size, and "1" carries an
// asymmetric side bearing. [dx, dy] in mm. Re-measure if the size changes.
const NUDGE = {
  // dy is one value for every digit (they are all cap-height, no descenders).
  // Horizontal: NO correction, on the box not the ink. Centering "1" on its ink box
  // pushed it 1.33mm right of where the other digits sit and the designer could see
  // it (2026-08-17) — the font's own side bearing is the better reference here.
  1: [0, -9.4],
  2: [0, -9.4],
  3: [0, -9.4],
  4: [0, -9.4],
  5: [0, -9.4],
  6: [0, -9.4],
};

// The face: the number, nothing else. Ink is ~50mm tall on a 67mm card (75%).
const face = (n) =>
  `<div class="po"><span class="n" style="transform:translate(${NUDGE[n][0]}mm,${NUDGE[n][1]}mm)">${n}</span></div>`;

// The back: ONE design for all six, so a face-down row is genuinely random — nothing
// on it distinguishes seat 1 from seat 6.
const back = () => `
  <div class="po bk">
    <div class="bk-rule"></div>
    <div class="bk-mark">
      <span class="bk-title">18Dragon</span>
      <span class="bk-sub">Player Order</span>
    </div>
    <div class="bk-rule"></div>
  </div>`;

const row = (fn) => `<div class="row">${SEATS.map(fn).join("")}</div>`;

const style = `
${FONT_FACE}
:root{
  --ink:#1c1a17; --paper:#f6f1e3; --paper-2:#efe7d3; --line:#b9ae94;
  --disp:"Leftfield Serif",Georgia,serif;
  --sans:"Helvetica Neue",Arial,system-ui,sans-serif;
}
*{ box-sizing:border-box; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
body{ margin:0; background:#d8d4cb; color:var(--ink); font-family:var(--sans); }
.wrap{ max-width:1180px; margin:0 auto; padding:26px 22px 80px; }
h1{ font-family:var(--disp); font-size:30px; margin:0 0 6px; font-weight:400; }
.lede{ font-size:13.5px; line-height:1.6; color:#3f3b35; max-width:74ch; margin:0 0 8px; }
section{ margin:32px 0 0; }
h2{ font-size:15px; letter-spacing:.09em; text-transform:uppercase; color:#332f29; margin:0 0 4px; }
.blurb{ font-size:13px; line-height:1.6; color:#413c35; max-width:78ch; margin:0 0 14px; }
.note-box{ background:#fff8e6; border:1px solid #e4d08a; border-radius:8px; padding:12px 15px;
  margin:20px 0 0; font-size:13px; line-height:1.65; color:#4a4436; max-width:78ch; }
.note-box b{ color:#7a5a10; }
.row{ display:flex; flex-wrap:wrap; gap:12px; }

/* ---- the card: PORTRAIT 44 x 67mm ---- */
.po{ width:44mm; height:67mm; position:relative; overflow:hidden;
  border:0.3mm solid #17150f; border-radius:${ROUNDED ? "1.6mm" : "0"};
  background:linear-gradient(180deg,#fffdf6 0%,var(--paper) 55%,var(--paper-2) 100%);
  display:flex; align-items:center; justify-content:center;
  box-shadow:0 2px 7px rgba(0,0,0,.28); }
.po .n{ font-family:var(--disp); font-size:300pt; line-height:.7; color:var(--ink);
  display:block; }

/* ---- the uniform back ---- */
.po.bk{ flex-direction:column; justify-content:center; gap:3.4mm; padding:6mm 5mm;
  background:
    repeating-linear-gradient(45deg, #0000 0 2.4mm, #1c1a170a 2.4mm 2.9mm),
    linear-gradient(180deg,#fffdf6 0%,var(--paper) 55%,var(--paper-2) 100%); }
.po.bk::before{ content:""; position:absolute; inset:2.6mm; border:0.3mm solid var(--line);
  border-radius:1mm; opacity:.8; }
.po.bk .bk-rule{ width:22mm; border-top:0.3mm solid var(--line); }
.po.bk .bk-mark{ display:flex; flex-direction:column; align-items:center; gap:1.6mm;
  text-align:center; }
.po.bk .bk-title{ font-family:var(--disp); font-size:19pt; line-height:.9; color:var(--ink); }
.po.bk .bk-sub{ font-family:var(--sans); font-size:6pt; letter-spacing:.24em;
  text-transform:uppercase; color:#6a6357; }

@media print{ body{ background:#fff; } }
`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>18Dragon — Player Order Cards (mockup)</title>
<style>${style}</style></head><body>
<div class="wrap">
  <h1>Player order cards — 1 to 6</h1>
  <p class="lede"><b>Portrait 44 × 67 mm</b> — the same card stock turned the other way up.
  Every other deck in the game is 67 × 44 landscape, so a player-order card is identifiable
  by its orientation before anyone reads it. The number <i>is</i> the card: Leftfield Serif at
  300pt, ink ≈ 50mm tall on a 67mm card. Actual size; corners are a preview (print is square —
  <code>node tools/mockup-player-order.mjs square</code>).</p>

  <section>
    <h2>The face</h2>
    <p class="blurb">Nothing to read, nothing to align, nothing to get wrong.</p>
    ${row(face)}
  </section>

  <section>
    <h2>The back — one design, all six</h2>
    <p class="blurb">Identical on every card, so a face-down row deals out genuinely random:
    nothing on the back separates seat 1 from seat 6. Shown next to a face for the pair.</p>
    <div class="row">${back()}${back()}${back()}${face(4)}</div>
  </section>

  <div class="note-box">
    <b>Centering is measured, not eyeballed:</b> each glyph was rendered headless at 300pt in
    the card and its <i>ink</i> bounding box compared with the card center. Leftfield Serif
    sits about 9.4mm low in its line box at this size, and "1" carries an asymmetric side
    bearing — so the digits are pushed up 9.4mm and the "1" right 1.33mm (see <code>NUDGE</code> in
    <code>tools/mockup-player-order.mjs</code>). Centering on the line box, which is what CSS
    does by default, is visibly wrong at this size. <b>Carry the table into the generator.</b> Horizontally the digits are
    left alone: ink-centering the "1" shifted it visibly right of its neighbours, so the
    font's own side bearing wins.
  </div>

  <div class="note-box">
    <b>Notes for the story (C19):</b> six cards, single deck, portrait 44 × 67 — fits 6-up on
    US Letter with room to share a sheet with the other misc cards. Two-sided: the number on
    the front, this uniform back on all six. Two other faces were mocked and dropped — one
    with a "Player Order" caption at the foot, one with the number repeated upside-down for
    the player opposite; the plain number won.
  </div>
</div>
</body></html>`;

writeFileSync(OUT, html);
console.log(`Wrote ${OUT}: ${SEATS.length} faces + uniform back, 44x67mm portrait${ROUNDED ? "" : " (square corners)"}.`);
