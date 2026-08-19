#!/usr/bin/env node
// MOCKUP (C50, train half): the train face — NOT a redesign. Same anatomy the deck
// already has (phase-colored numeral, cost, note, rust/permanent banner); what this
// mockup pins down is the sizing and spacing: one margin box, one baseline for the
// header, a fixed-height banner, a fixed note measure, and a numeral slot that holds
// whether the name is "L" or "P+".
//
//   node tools/mockup-trains.mjs           -> docs/mockups/train-card-mockup.html
//   node tools/mockup-trains.mjs square    -> same, print-true square corners
//
// Card box is the real 67x44mm. Folds into tools/gen-train-cards.mjs (+ cardkit's
// TRAIN_CSS) once approved.

import { readFileSync, writeFileSync } from "node:fs";
import { gp, COIN_CSS } from "./cardkit.mjs";

const ROUNDED = process.argv[2] !== "square";
const OUT = "docs/mockups/train-card-mockup.html";
const trains = JSON.parse(readFileSync("data/trains.json", "utf8")).trains;
const byName = Object.fromEntries(trains.map((t) => [t.name, t]));

const fontB64 = readFileSync("fonts/LeftfieldSerif-Regular.otf").toString("base64");
const FONT_FACE = `@font-face{font-family:"Leftfield Serif";src:url(data:font/otf;base64,${fontB64}) format("opentype");font-weight:400;font-style:normal;}`;

const esc = (s) =>
  String(s ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const coinize = (s) => String(s ?? "").replace(/(\d+)\s*gp\b/g, (_, n) => gp(n));

// ---------------------------------------------------------------- the face ----
// SPACING SYSTEM (all of it, in one place — this is the point of the mockup):
//   margin box        3.5mm on every side  -> 60 x 37mm safe area
//   header baseline   numeral cap and cost cap sit on ONE optical line
//   numeral slot      fixed 26mm wide x 15mm tall, every name at ONE size (48pt),
//                     so L / 2 / E / 2P / P+ all occupy the same block
//   note measure      44mm, max 2 lines, centered, 1.5mm above the banner
//   banner            fixed 5.6mm tall, 3mm side padding, min 24mm wide, so
//                     "Permanent" and "Rusted by 7/E" read as the same component
const NAME_SIZE = () => 48; // pt — one size for every name, 1- or 2-glyph
const face = (t) => {
  const banner = t.permanent
    ? `<span class="banner perm">Permanent</span>`
    : `<span class="banner rust-${t.rust_color}">Rusts with ${esc(t.rust)}</span>`;
  const cost = t.cost
    ? `<span class="cost"><i>COST</i><b>${gp(t.cost)}</b></span>`
    : `<span class="cost"><i>&nbsp;</i><b class="nofee">not for sale</b></span>`;
  return `
  <div class="tc c-${t.phase_color}">
    <div class="head">
      <span class="num" style="font-size:${NAME_SIZE()}pt">${esc(t.name)}</span>
      ${cost}
    </div>
    <div class="mid"></div>
    <div class="foot">
      <div class="note">${t.note ? coinize(esc(t.note)) : ""}</div>
      ${banner}
    </div>
  </div>`;
};

// the same face with the spacing system drawn on top
const anatomy = (t) => `
<div class="anat">
  ${face(t)}
  <div class="ov">
    <div class="ov-margin"></div>
    <div class="ov-num"></div>
    <div class="ov-base"></div>
    <div class="ov-note"></div>
    <div class="ov-banner"></div>
  </div>
</div>`;

// ------------------------------------------------------------------ page ----
const DECK = trains.filter((t) => t.deck);
const PRIZE = trains.filter((t) => !t.deck && t.on_private);
const L = byName["L"];

const cell = (t, label) => `<figure class="cellf"><figcaption>${esc(label)}</figcaption>${face(t)}</figure>`;

const style = `
${FONT_FACE}
${COIN_CSS}
:root{
  --ink:#1c1a17; --paper:#f6f1e3; --paper-2:#efe7d3; --line:#b9ae94;
  --serif:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif;
  --disp:"Leftfield Serif",Georgia,serif;
  --sans:"Helvetica Neue",Arial,system-ui,sans-serif;
}
*{ box-sizing:border-box; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
body{ margin:0; background:#d8d4cb; color:var(--ink); font-family:var(--sans); }
.wrap{ max-width:1180px; margin:0 auto; padding:26px 22px 80px; }
h1{ font-family:var(--disp); font-size:30px; margin:0 0 6px; font-weight:400; }
.lede{ font-size:13.5px; line-height:1.6; color:#3f3b35; max-width:74ch; margin:0 0 8px; }
section{ margin:34px 0 0; }
h2{ font-size:15px; letter-spacing:.09em; text-transform:uppercase; color:#332f29; margin:0 0 4px; }
.blurb{ font-size:13px; line-height:1.6; color:#413c35; max-width:78ch; margin:0 0 14px; }
.note-box{ background:#fff8e6; border:1px solid #e4d08a; border-radius:8px; padding:12px 15px;
  margin:14px 0 0; font-size:13px; line-height:1.65; color:#4a4436; max-width:78ch; }
.note-box b{ color:#7a5a10; }
.row{ display:flex; flex-wrap:wrap; gap:14px; align-items:flex-start; }
.row.zoom{ zoom:1.6; gap:10px; }
.cellf{ margin:0; }
.cellf figcaption{ font-size:10px; letter-spacing:.08em; text-transform:uppercase;
  color:#5a544a; margin-bottom:4px; }
.specs{ font-size:12.5px; line-height:1.7; color:#413c35; }
.specs code{ background:#efe7d3; border-radius:3px; padding:1px 4px; font-size:11.5px; }

/* ------------------------------- the card ------------------------------- */
.tc{ width:67mm; height:44mm; position:relative; overflow:hidden;
  border:0.3mm solid #17150f; border-radius:${ROUNDED ? "1.6mm" : "0"};
  background:linear-gradient(180deg,#fffdf6 0%,var(--paper) 55%,var(--paper-2) 100%);
  color:var(--ink); font-family:var(--serif);
  padding:3.5mm;                                  /* THE margin box */
  display:flex; flex-direction:column;
  box-shadow:0 2px 7px rgba(0,0,0,.28); }
/* phase color rides a top edge bar + the numeral; nothing else is tinted */
.tc::before{ content:""; position:absolute; left:0; right:0; top:0; height:1.6mm;
  background:var(--pc); }
.c-yellow{ --pc:#f0cf5c; --pcx:#c69b12; }
.c-green{  --pc:#8ec27f; --pcx:#2f7a2a; }
.c-brown{  --pc:#c39a6b; --pcx:#8a5a2b; }
.c-gray{   --pc:#b6b3ab; --pcx:#5f5c56; }

.head{ display:flex; align-items:flex-end; justify-content:space-between; gap:2mm;
  height:15mm; }                                   /* fixed header band */
.num{ font-family:var(--disp); line-height:.72; color:var(--pcx);
  -webkit-text-stroke:0.35mm #1c1a17; paint-order:stroke fill;
  width:26mm; display:block;                       /* fixed numeral slot */ }
.cost{ display:flex; flex-direction:column; align-items:flex-end; line-height:1; }
.cost i{ font-family:var(--sans); font-style:normal; font-size:3.6pt; letter-spacing:.12em;
  color:#6a6357; margin-bottom:.7mm; }
.cost b{ font-family:var(--disp); font-weight:400; font-size:13pt; line-height:.72; }
.cost .gp-coin{ width:.78em; height:.78em; }
.cost .nofee{ font-family:var(--sans); font-size:4.6pt; letter-spacing:.1em;
  text-transform:uppercase; color:#6a6357; padding-bottom:1.2mm; }

.mid{ flex:1; }                                    /* deliberate breathing room */

.foot{ display:flex; flex-direction:column; align-items:center; gap:1.5mm; }
.note{ width:44mm; min-height:3.4mm; text-align:center; font-size:5.4pt; line-height:1.25;
  color:#4b4438; text-wrap:balance; }
.banner{ height:5.6mm; min-width:24mm; padding:0 3mm; border-radius:1mm;
  display:inline-flex; align-items:center; justify-content:center;
  font-family:var(--sans); font-weight:700; font-size:6.4pt; letter-spacing:.06em;
  text-transform:uppercase; white-space:nowrap; }
.banner.perm{ background:#1c1a17; color:#f2cf4c; }
.banner.rust-green{ background:#3a7d1e; color:#fff; }
.banner.rust-brown{ background:#8a5a2b; color:#fff; }
.banner.rust-gray{ background:#5f5c56; color:#fff; }
.banner.rust-yellow{ background:#f2cf4c; color:#1c1a17; }

/* ------------------------------- overlay -------------------------------- */
.anat{ position:relative; width:67mm; height:44mm; }
.ov{ position:absolute; inset:0; pointer-events:none; }
.ov>div{ position:absolute; }
.ov-margin{ inset:3.5mm; border:0.25mm dashed #c1392b; }
.ov-num{ left:3.5mm; top:3.5mm; width:26mm; height:15mm; background:#c1392b14;
  border:0.25mm solid #c1392b88; }
.ov-base{ left:3.5mm; right:3.5mm; top:18.5mm; border-top:0.25mm solid #2c6fb0; }
.ov-note{ left:50%; transform:translateX(-50%); bottom:12.6mm; width:44mm; height:3.4mm;
  border:0.25mm solid #2c6fb088; background:#2c6fb014; }
.ov-banner{ left:50%; transform:translateX(-50%); bottom:3.5mm; height:5.6mm; width:24mm;
  border:0.25mm solid #2c6fb0; }

/* mini sheet preview — checks the gutter/margin at page scale */
.sheet{ background:#fff; padding:6mm; box-shadow:0 2px 8px rgba(0,0,0,.25); zoom:.62;
  width:fit-content; }
.sheetgrid{ display:grid; grid-template-columns:repeat(3,67mm); grid-auto-rows:44mm; }
.sheetgrid .tc{ border-radius:0; box-shadow:none; }
`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>18Dragon — Train Card Face (C50 mockup)</title>
<style>${style}</style></head><body>
<div class="wrap">
  <h1>Train card face — sizing &amp; spacing</h1>
  <p class="lede">Not a redesign: the anatomy is the one the deck already has — phase-colored
  numeral, price, note, rust/permanent banner. What this mockup fixes is the <b>measurement</b>
  of it, so every card in the deck is set on the same grid instead of each element floating
  where it landed. Real 67 × 44 mm; rounded corners are a preview only (print is square —
  <code>node tools/mockup-trains.mjs square</code>).</p>

  <section>
    <h2>Anatomy — the spacing system</h2>
    <p class="blurb">Left: the face. Right: the same card with the system drawn on it.</p>
    <div class="row zoom">
      ${face(L)}
      ${anatomy(L)}
    </div>
    <div class="note-box specs" style="margin-top:22px">
      <b>Margin box</b> — <code>3.5mm</code> on all four sides, giving a 60 × 37 mm safe
      area. Nothing but the phase bar and the card edge lives outside it.<br>
      <b>Header band</b> — fixed <code>15mm</code> tall. The numeral and the price are
      bottom-aligned to one optical baseline, so a "7" and a "P+" sit on the same line.<br>
      <b>Numeral slot</b> — fixed <code>26 × 15mm</code>, every name at <b>48pt</b>,
      one-glyph or two. The slot is cut wide enough for <code>2P</code> / <code>P+</code>
      rather than shrinking them, so the whole deck's numerals are one size and start at
      the same left edge. The numeral is the card's identity at arm's length in a train
      supply, so it takes the room.<br>
      <b>Price</b> — small-caps <code>COST</code> label over the coin + value, the same
      labelled-value component the private cards use. Prize trains say
      <i>not for sale</i> in that slot rather than leaving a hole.<br>
      <b>Note measure</b> — <code>44mm</code>, centered, reserving <code>3.4mm</code>
      whether or not the card has a note, so the banner never shifts up.<br>
      <b>Banner</b> — fixed <code>5.6mm</code> tall, <code>24mm</code> minimum width,
      <code>3mm</code> side padding. "Permanent" and "Rusts with 7/E" are the same
      component at different widths, not two different-looking chips.<br>
      <b>Middle</b> — deliberately empty. It is the room a numeral this size needs; it is
      also where art would go if the trains ever get any.
    </div>
  </section>

  <section>
    <h2>The deck — actual size</h2>
    <p class="blurb">L (front) and its 2 (back), then 3 → E. The phase bar across the top
    is the same yellow/green/brown/gray language as the privates' phase chip.</p>
    <div class="row">
      ${cell(L, "L — front")}
      ${cell(L.back, "L — back (the 2)")}
      ${DECK.filter((t) => t.name !== "L").map((t) => cell(t, t.name)).join("")}
    </div>
  </section>

  <section>
    <h2>Prize trains — actual size</h2>
    <p class="blurb">2P / LP / 5P / P+ are not in the deck: they print on the back of their
    private (P1–P4, P29, P30). Same face, same grid — the reason the numeral slot is fixed
    is that these are the two-glyph names.</p>
    <div class="row">${PRIZE.map((t) => cell(t, `${t.name} — on ${t.on_private.join(" / ")}`)).join("")}</div>
  </section>

  <section>
    <h2>Sheet check</h2>
    <p class="blurb">Twelve cards at print gutter (3 × 4, square corners, no gap) — confirms
    the 3.5mm margin still reads as a margin when the cards are cut apart by hand.</p>
    <div class="sheet"><div class="sheetgrid">
      ${[L, L.back, ...DECK.filter((t) => t.name !== "L"), ...PRIZE].slice(0, 12).map(face).join("")}
    </div></div>
  </section>

  <div class="note-box">
    <b>Changes from the current train face, all of them measurement:</b> the numeral moves
    off its absolute <code>top:2mm/left:3mm</code> corner into a fixed slot on the header
    baseline (it and the price were optically misaligned at their different sizes); the
    price gains the same <code>COST</code> label the privates use; the banner gets a fixed
    height and minimum width instead of shrink-wrapping its text; the note gets a fixed
    measure and reserved height so the banner sits at the same place on every card; and the
    phase color moves from "numeral only" to a top edge bar as well, so the deck sorts by
    phase face-down-ish in a fan. The white card becomes the same cream stock as the rest
    of the components.
  </div>
</div>
</body></html>`;

writeFileSync(OUT, html);
console.log(
  `Wrote ${OUT}: anatomy + ${DECK.length + 1} deck faces + ${PRIZE.length} prize faces` +
    `${ROUNDED ? "" : " (square corners)"}.`,
);
