#!/usr/bin/env node
// MOCKUP (C50): private card faces — look & feel exploration.
//
//   node tools/mockup-privates.mjs   ->  docs/mockups/private-card-mockup.html
//
// Not a print sheet: a single scrollable page showing the agreed face (direction A
// "Ledger") front + company-owned back, the five region permits, and a gallery
// across the roster's variety. Card box is the real 67x44mm. Two alternates
// ("Illuminated", "Banner") were explored on 2026-08-17 and dropped.
// Once a direction is chosen, it folds into tools/gen-private-cards.mjs.

import { readFileSync, writeFileSync } from "node:fs";
import { gp, COIN_CSS } from "./cardkit.mjs";

// Print output is SQUARE-cornered (the designer rounds the stock by hand); the
// mockup draws the rounded corner only to preview the finished card.
const ROUNDED = process.argv[2] !== "square";
const OUT = "docs/mockups/private-card-mockup.html";
const cards = JSON.parse(readFileSync("data/privates.json", "utf8")).privates;
const byId = Object.fromEntries(cards.map((c) => [c.id, c]));

const fontB64 = readFileSync("fonts/LeftfieldSerif-Regular.otf").toString("base64");
const FONT_FACE = `@font-face{font-family:"Leftfield Serif";src:url(data:font/otf;base64,${fontB64}) format("opentype");font-weight:400;font-style:normal;}`;

const esc = (s) =>
  String(s ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

// ---------------------------------------------------------------- sigils ----
// One line-art mark PER PRIVATE (placeholder art, designer-approved 2026-08-17 —
// real art is a later pass). Stroke-only on a 24x24 grid so the same path works
// at 4.6mm (back head row) and 20mm (front watermark). Twins that share a rule
// still get their own mark, from their flavor: two Mail Contracts = raven vs
// post horn, two Pullmans = gilded coach vs winged coach.
const S = (d) => `<svg viewBox="0 0 24 24" class="sig">${d}</svg>`;
const PERMIT_SEAL = S(
  `<circle cx="12" cy="9.5" r="6"/><path d="M12 4.6l1.3 2.9 3.1.3-2.3 2.1.7 3-2.8-1.6-2.8 1.6.7-3-2.3-2.1 3.1-.3z"/><path d="M8.6 14.6L7 21l5-2.2L17 21l-1.6-6.4"/>`,
);
const ART = {
  // P1-P4 perm-trains — each a different vehicle so the four read apart
  P1: S(`<rect x="2.6" y="9" width="9" height="7" rx="1"/><path d="M11.6 9h4l2.6 3.2V16h-6.6z"/><circle cx="6" cy="18.6" r="1.8"/><circle cx="15.4" cy="18.6" r="1.8"/><path d="M4.8 9V6.4h2.4V9"/><path d="M6 6.2c.2-1.4 1.7-1.6 1.5-3.1.9.9 1.5 2.1.7 3.1"/><path d="M1.6 20.6h20.8"/>`),
  P2: S(`<rect x="3" y="9" width="13.6" height="7" rx="1"/><path d="M3 12.4h13.6"/><circle cx="7" cy="18.4" r="1.7"/><circle cx="13.4" cy="18.4" r="1.7"/><path d="M16.6 12.4h2.2"/><circle cx="20.4" cy="12.4" r="1.5"/><path d="M1.6 20.8h20.8"/>`),
  P3: S(`<path d="M4 9.4h15l-2.2 6.2H6.2z"/><path d="M4 12.4h15"/><circle cx="8.4" cy="18.2" r="1.6"/><circle cx="14.6" cy="18.2" r="1.6"/><path d="M4 9.4L2.2 5.6"/><path d="M1.6 20.8h20.8"/>`),
  P4: S(`<rect x="4.6" y="11" width="10" height="5" rx="1"/><circle cx="7.4" cy="18.2" r="1.6"/><circle cx="12.8" cy="18.2" r="1.6"/><path d="M14.6 13.4h3"/><path d="M7.4 11V8.4h2.2V11"/><path d="M12.4 7.6c1.3 0 1.3-1.7 2.6-1.7M14.4 10c1.4 0 1.4-1.9 2.8-1.9"/><path d="M1.6 20.8h20.8"/>`),
  // P5-P9 region permits — the map letter is the art on the card; the seal only
  // appears where a mark is still needed (back head row).
  P5: PERMIT_SEAL, P6: PERMIT_SEAL, P7: PERMIT_SEAL, P8: PERMIT_SEAL, P9: PERMIT_SEAL,
  // P10/P11 bridges — an arch and a trestle
  P10: S(`<path d="M2 16.6h20"/><path d="M4 16.6c0-5 3.6-8.2 8-8.2s8 3.2 8 8.2"/><path d="M8 16.6v-3.2M16 16.6v-3.2"/><circle cx="12" cy="5" r="2.2"/><path d="M12 1.4v1.2M15.4 3.2l-.8.9M8.6 3.2l.8.9"/><path d="M2 16.6v3.8M22 16.6v3.8"/>`),
  P11: S(`<path d="M2 10.4h20"/><path d="M4.6 10.4v9M12 10.4v9M19.4 10.4v9"/><path d="M4.6 19.4l7.4-9 7.4 9"/><path d="M1.6 21.4h20.8"/><path d="M6.4 7.4h11.2"/>`),
  // P12-P15 terrain discounts — hills/hammer, crag/rope, twin picks, chisel
  P12: S(`<path d="M1.6 20h20.8"/><path d="M3 20l4.8-7.4 3.2 5"/><path d="M11 8.6l3.4-3.4 4.8 4.8-3.4 3.4z"/><path d="M12.8 10.4l-4.4 4.4"/>`),
  P13: S(`<path d="M1.6 20.6h20.8"/><path d="M4.6 20.6L11 6.4l5.8 14.2"/><path d="M11 6.8l4.2 2.6-3.2 2.4 3.6 2.4"/><circle cx="11" cy="4.6" r="1.4"/>`),
  P14: S(`<path d="M3.4 5.4c3-1.7 7-1.7 10 0"/><path d="M8.4 5.8L17.6 20"/><path d="M20.6 5.4c-3-1.7-7-1.7-10 0"/><path d="M15.6 5.8L6.4 20"/>`),
  P15: S(`<path d="M1.6 20.6h20.8"/><path d="M3.4 20.6l6-9.4 4.2 6.4"/><path d="M14.4 20.6l4.6-10.4"/><path d="M16.2 7.4c2.4-1.6 4.8-.8 5.8 1.2-2 .2-2.8 1.1-3.2 2.4-1.2-1-2.2-1.8-2.6-3.6z"/>`),
  // P16-P22 originals
  P16: S(`<circle cx="8.6" cy="12" r="5.6"/><circle cx="15.4" cy="12" r="5.6"/>`),
  P17: S(`<path d="M1.6 20.4h20.8"/><path d="M3.4 20.4l5.6-8.6 3.4 5.2"/><path d="M15 5.6l3.6 3.6-3.6 7.4-3.6-7.4z"/><path d="M11.4 9.2h7.2"/>`),
  P18: S(`<rect x="4.6" y="7.6" width="14.8" height="12.4" rx="1.2"/><path d="M4.6 11h14.8"/><path d="M9 7.6V5.4h6v2.2"/><path d="M12 19c-2.2-1.3-2.8-2.9-1.6-4.6.2 1 .8 1.3 1.4 1.1-.6-1.7.4-2.9 2-3.5-.6 1.5.4 1.9 1 2.7.6.8.6 1.9-.2 2.9-.5.6-1.4 1.1-2.6 1.4z"/>`),
  P19: S(`<path d="M4 10.4h14v6.8H4z"/><path d="M6.4 10.4c1.8-2.4 7.4-2.4 9.2 0"/><circle cx="7.2" cy="19.4" r="1.6"/><circle cx="14.8" cy="19.4" r="1.6"/><path d="M8.6 7.6l1-1.8 1 1.8M13 7.2l1-1.8 1 1.8"/>`),
  P20: S(`<path d="M4.4 19.6L15 9"/><path d="M17.6 6.4l-2.4 2.4"/><path d="M19 2.6l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z"/><path d="M8.4 4.2l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7z"/>`),
  P21: S(`<path d="M1.6 21h20.8"/><circle cx="5.2" cy="17.4" r="2.2"/><path d="M9 17.4h3.4"/><path d="M11.6 15.6l2 1.8-2 1.8"/><path d="M15 21V10.6l3.2-2.2 3.2 2.2V21"/><path d="M17.2 21v-3.4h2.2V21"/>`),
  P22: S(`<circle cx="9.6" cy="12" r="6"/><circle cx="9.6" cy="12" r="2.4"/><path d="M19 6.4v6M16 9.4h6"/>`),
  // P23-P30 sourced
  P23: S(`<circle cx="8" cy="14.4" r="3.6"/><path d="M13.4 8.6h6.4M12.6 12h5.4M14 15.4h4.4M15.4 18.8h3"/>`),
  P24: S(`<circle cx="11.4" cy="12.4" r="6"/><path d="M7.2 8.2l8.4 8.4"/><path d="M18.6 5.4l2.6-2.6M19.4 8.6h3"/>`),
  P25: S(`<rect x="9" y="5.4" width="6" height="4.2" rx=".8"/><path d="M15 7.4h2.6"/><path d="M12 9.6v3.2"/><path d="M12 12.8L6 21M12 12.8L18 21M12 12.8v8.2"/><path d="M4 21h16"/>`),
  P26: S(`<path d="M3 8.6h12.4v8.8H3z"/><path d="M3 8.6l6.2 4.8 6.2-4.8"/><path d="M17 4.4c3 1.8 3.8 6 1.4 9-1.4-2-2.8-2.8-4.2-3"/><path d="M17.6 6.6c-.6 2.2-1.6 4-3.4 5.4"/>`),
  P27: S(`<path d="M4.4 15.4c0-3.6 3.4-6.2 7.4-6.2 3 0 5 1.8 5 3.9 0 2-1.6 3.4-3.4 3.4-1.6 0-2.8-1-2.8-2.4 0-1.1.8-1.9 1.8-1.9"/><path d="M11.6 9.4l5.2-3.8"/><path d="M15.8 3.4l4.8 1.4-1.6 4.4z"/>`),
  P28: S(`<circle cx="6.6" cy="15.8" r="3.4"/><circle cx="17.4" cy="8.2" r="3.4"/><path d="M6.6 10.8V6.2h4.2"/><path d="M8.6 4.2l2.4 2-2.4 2"/><path d="M17.4 13.2v4.6h-4.2"/><path d="M15.4 19.8l-2.4-2 2.4-2"/>`),
  P29: S(`<rect x="3.4" y="8.6" width="17.2" height="7.6" rx="2"/><path d="M7.6 8.6v7.6M12 8.6v7.6M16.4 8.6v7.6"/><circle cx="7.4" cy="18.8" r="1.6"/><circle cx="16.6" cy="18.8" r="1.6"/><path d="M6 6.6l1.6-1.8L9.2 6.6M14.8 6.6l1.6-1.8L18 6.6"/>`),
  P30: S(`<rect x="3.4" y="10.4" width="13.4" height="6.8" rx="1.4"/><path d="M7.8 10.4v6.8M12.4 10.4v6.8"/><circle cx="7.4" cy="19.4" r="1.5"/><circle cx="14.4" cy="19.4" r="1.5"/><path d="M17 10c1.6-3.2 3.6-4.4 5.6-4.2-.8 1.8-.6 3.2.2 4.4-1.8-.2-3.2.4-4.2 1.6"/>`),
};
// Every private must have a mark — a missing one is a design gap, not a fallback.
const missing = cards.filter((c) => !ART[c.id]).map((c) => c.id);
if (missing.length) throw new Error(`No sigil for: ${missing.join(", ")}`);
const sigil = (c, cls = "") => `<span class="sigwrap ${cls}">${ART[c.id]}</span>`;

// ------------------------------------------------------------- regions ----
// Permit letters + their map colors, taken from the permit labels in 18dragon.json
// (the same letter/color a player reads off the hexes).
const REGION = {
  A: { color: "#7B2D8B", name: "Verantum" },
  N: { color: "#56B4E9", name: "Caelimor" },
  G: { color: "#E69F00", name: "Gordum" },
  M: { color: "#D55E00", name: "Muravel" },
  V: { color: "#009E73", name: "Varstova" },
};
const isPermit = (c) => c.category === "permit" && c.extra && REGION[c.extra.region];
const region = (c) => REGION[c.extra.region];
const regionName = (c) => c.extra.grants_permit || region(c).name;

// ------------------------------------------------------------- shared bits ----
const accent = (c) => (c.badge === "green" ? "acc-green" : "acc-red");
const classText = (c) =>
  c.class === "major" ? "Majors only" : c.class === "minor" ? "Minors only" : "Minor / Major";
const classShort = (c) =>
  c.class === "major" ? "MAJOR" : c.class === "minor" ? "MINOR" : "MINOR · MAJOR";
const cadence = (c) =>
  ({ "one-time": "One time", "each-or": "Each OR", ongoing: "Ongoing" })[c.cadence] || "";
const phaseCls = (p) => (p <= 2 ? "ph-y" : p <= 4 ? "ph-g" : "ph-b");
const phaseChip = (c) =>
  `<span class="phblk"><i>PHASE</i><span class="ph ${phaseCls(c.phase)}">${c.phase}</span></span>`;
const revBlock = (v, label) =>
  `<span class="rev"><i>${label}</i><b>${gp(v)}</b></span>`;
// coinize but for rules text on a small card: keep it quiet, not sparkly
const rules = (c) => esc(c.rules_text).replace(/\$(\d+)/g, "$1gp");

// ----------------------------------------------------- direction A: Ledger ----
// Cream stock, hairline frame, colored spine carrying identity. Function label is
// the headline (bid-box scanning); flavor name is the subhead. Sigil watermark.
const frontA = (c) => {
  // Region permits swap the sigil watermark for the region's own letter, at the
  // size and color it has on the map — the card must say WHICH region at a glance.
  if (isPermit(c)) {
    const r = region(c);
    return `
<div class="card A permit ${accent(c)}" style="--reg:${r.color}">
  <div class="spine"><span class="sid">${c.id}</span><span class="gate">${c.players_required}+</span></div>
  <div class="body">
    <div class="regmark"><span class="rl">${esc(c.extra.region)}</span></div>
    <div class="eyebrow">${classShort(c)}</div>
    <div class="fn reg">${esc(regionName(c))} Permit</div>
    <div class="nm">${esc(c.name)}</div>
    <div class="rail">
      ${phaseChip(c)}
      <span class="cad">${cadence(c)}</span>
      ${revBlock(c.player_revenue, "TO PLAYER")}
    </div>
  </div>
</div>`;
  }
  return `
<div class="card A ${accent(c)}">
  <div class="spine"><span class="sid">${c.id}</span><span class="gate">${c.players_required}+</span></div>
  <div class="body">
    ${sigil(c, "wm")}
    <div class="eyebrow">${classShort(c)}</div>
    <div class="fn">${esc(c.function_label)}</div>
    <div class="nm">${esc(c.name)}</div>
    <div class="rail">
      ${phaseChip(c)}
      <span class="cad">${cadence(c)}</span>
      ${revBlock(c.player_revenue, "TO PLAYER")}
    </div>
  </div>
</div>`;
};

const backA = (c) => `
<div class="card A back ${accent(c)}"${isPermit(c) ? ` style="--reg:${region(c).color}"` : ""}>
  <div class="spine"><span class="sid">${c.id}</span><span class="gate">${c.players_required}+</span></div>
  <div class="body">
    <div class="bhead">${isPermit(c) ? `<span class="rchip" style="background:${region(c).color}">${esc(c.extra.region)}</span>` : sigil(c, "in")}<span class="bfn">${isPermit(c) ? esc(regionName(c)) + " Permit" : esc(c.function_label)}</span><span class="bown">IN COMPANY</span></div>
    <div class="rtext">${rules(c)}</div>
    <div class="rail tight">
      <span class="cad">${cadence(c) || "—"}</span>
      ${revBlock(c.company_revenue, "TO COMPANY")}
    </div>
  </div>
</div>`;

const DIRS = { A: { front: frontA, back: backA } };

// --------------------------------------------------------------- assembly ----
const pair = (c, d) =>
  `<div class="pair"><div class="pl">
     <div class="tag">${c.id} front — player-owned</div>${DIRS[d].front(c)}
   </div><div class="pl">
     <div class="tag">${c.id} back — company-owned</div>${DIRS[d].back(c)}
   </div></div>`;

const SAMPLE = ["P5", "P26"]; // a green minor/major permit + a red majors-only contract
const GALLERY = cards.map((c) => c.id); // the whole deck, actual size

const section = (d, title, blurb) => `
<section>
  <h2>${title}</h2>
  <p class="blurb">${blurb}</p>
  <div class="zoom">${SAMPLE.map((id) => pair(byId[id], d)).join("")}</div>
</section>`;

const PERMITS = ["P5", "P6", "P7", "P8", "P9"];
const platePlate = () => `
<section>
  <h2>Sigil plate — one mark per private</h2>
  <p class="blurb">Placeholder line art for all 30, drawn stroke-only on a 24×24 grid so the
  same path serves the 20mm watermark and the 4.6mm chip on the back. Twins that share a
  rule still differ by flavor — the two Mail Contracts are a raven and a post horn, the two
  Pullmans a gilded coach and a winged one. The five permits carry the seal, but on the card
  itself their region letter is the art. Real art is a later pass (C45-era).</p>
  <div class="plate">${cards
    .map(
      (c) => `<figure class="pm ${accent(c)}">
      <div class="pmk">${sigil(c)}</div>
      <figcaption><b>${c.id}</b> ${esc(c.function_label)}<br><i>${esc(c.name)}</i></figcaption>
    </figure>`,
    )
    .join("")}</div>
</section>`;
const permitsSection = () => `
<section>
  <h2>Region permits — the letter is the art</h2>
  <p class="blurb">All five permit fronts, at 1.25×. The letter and its color are lifted
  straight off the map (18dragon.json permit labels), so the card matches what a player
  reads on the hexes. The headline names the permit outright — <i>Verantum Permit</i> —
  and the eyebrow carries only the buy-in class. The company-owned back repeats the letter
  as a small chip.</p>
  <div class="perms">${PERMITS.map((id) => frontA(byId[id])).join("")}</div>
  <div class="perms" style="margin-top:14px">${DIRS.A.back(byId["P5"])}${DIRS.A.back(byId["P8"])}</div>
</section>`;

const gallery = (d) => `
<section>
  <h2>Gallery — across the roster</h2>
  <p class="blurb">All 30 fronts at actual size (67 × 44 mm) — checks that every name,
  function label, accent, phase color and sigil holds up in one deck.</p>
  <div class="gal">${GALLERY.map((id) => DIRS[d].front(byId[id])).join("")}</div>
</section>`;

const style = `
${FONT_FACE}
${COIN_CSS}
:root{
  --ink:#1c1a17; --ink-2:#4a443b; --paper:#f6f1e3; --paper-2:#efe7d3;
  --line:#b9ae94; --gold:#c9a227; --gold-lt:#f2cf4c;
  --serif:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif;
  --disp:"Leftfield Serif",Georgia,serif;
  --sans:"Helvetica Neue",Arial,system-ui,sans-serif;
}
*{ box-sizing:border-box; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
body{ margin:0; background:#d8d4cb; color:var(--ink); font-family:var(--sans); }
.wrap{ max-width:1180px; margin:0 auto; padding:26px 22px 80px; }
h1{ font-family:var(--disp); font-size:30px; margin:0 0 6px; font-weight:400; }
.lede{ font-size:13.5px; line-height:1.6; color:#3f3b35; max-width:70ch; margin:0 0 8px; }
section{ margin:34px 0 0; }
h2{ font-size:15px; letter-spacing:.09em; text-transform:uppercase; color:#332f29; margin:0 0 4px;
  display:flex; align-items:center; gap:9px; }
.blurb{ font-size:13px; line-height:1.6; color:#413c35; max-width:78ch; margin:0 0 14px; }
.note{ background:#fff8e6; border:1px solid #e4d08a; border-radius:8px; padding:12px 15px;
  margin:14px 0 0; font-size:13px; line-height:1.65; color:#4a4436; max-width:78ch; }
.note b{ color:#7a5a10; }
.tag{ font-size:10.5px; letter-spacing:.08em; text-transform:uppercase; color:#5a544a; margin-bottom:5px; }
.zoom{ display:flex; flex-wrap:wrap; gap:26px 34px; }
.pair{ display:flex; gap:16px; zoom:1.5; margin:0 0 16px; }
.gal{ display:flex; flex-wrap:wrap; gap:9px; }
.perms{ display:flex; flex-wrap:wrap; gap:14px; zoom:1.25; }
.plate{ display:grid; grid-template-columns:repeat(6,1fr); gap:10px; }
.pm{ margin:0; background:var(--paper); border:1px solid #c3bba6; border-radius:6px;
  padding:9px 6px 7px; text-align:center; }
.pm .pmk{ width:17mm; height:17mm; margin:0 auto 5px; color:var(--acc); }
.pm figcaption{ font-size:9.5px; line-height:1.35; color:#4a443b; }
.pm figcaption b{ font-family:var(--disp); font-weight:400; font-size:11px; }
.pm figcaption i{ color:#6d6558; }

/* ---------- card shell ---------- */
.card{ width:67mm; height:44mm; position:relative; overflow:hidden; border-radius:${ROUNDED ? "1.6mm" : "0"};
  background:var(--paper); color:var(--ink); font-family:var(--serif);
  box-shadow:0 2px 7px rgba(0,0,0,.28); }
.acc-green{ --acc:#3f6b34; --acc-dk:#2c4b24; --acc-lt:#e4eeda; }
.acc-red{   --acc:#8e2b22; --acc-dk:#6a1e18; --acc-lt:#f5e2de; }

.sig{ width:100%; height:100%; fill:none; stroke:currentColor; stroke-width:1.5;
  stroke-linecap:round; stroke-linejoin:round; display:block; }
.sigwrap{ display:block; }

/* phase chip = hex, colored by tile phase; the word PHASE sits above it (same
   label treatment as the revenue block) — "PH" inside the hex read as noise. */
.phblk{ display:inline-flex; flex-direction:column; align-items:center; line-height:1; }
.phblk i{ font-family:var(--sans); font-style:normal; font-size:3.4pt; letter-spacing:.1em;
  color:#6a6357; margin-bottom:.6mm; }
.ph{ display:inline-flex; align-items:center; justify-content:center;
  width:7.4mm; height:8.4mm; clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);
  font-family:var(--disp); font-size:12pt; line-height:1; color:#1c1a17; padding-bottom:.4mm; }
.ph-y{ background:#f0cf5c; } .ph-g{ background:#8ec27f; } .ph-b{ background:#c39a6b; }

.rev{ display:inline-flex; flex-direction:column; align-items:flex-end; line-height:1; }
.rev i{ font-family:var(--sans); font-style:normal; font-size:3.4pt; letter-spacing:.1em;
  color:#6a6357; margin-bottom:.6mm; }
.rev b{ font-family:var(--disp); font-weight:400; font-size:12.5pt; }
.rev .gp-coin{ width:.8em; height:.8em; }
.cad{ font-family:var(--sans); font-size:5pt; letter-spacing:.11em; text-transform:uppercase;
  color:#5d564a; }

/* ---------- A · Ledger ---------- */
.card.A{ border:0.35mm solid var(--acc-dk); display:flex; }
.card.A .spine{ flex:0 0 6.2mm; background:var(--acc); color:#fff; position:relative;
  display:flex; flex-direction:column; align-items:center; justify-content:space-between;
  padding:2mm 0; border-right:0.3mm solid var(--acc-dk); }
.card.A .sid{ font-family:var(--disp); font-size:11pt; writing-mode:vertical-rl; transform:rotate(180deg); }
.card.A .gate{ font-family:var(--sans); font-size:5pt; font-weight:700; letter-spacing:.05em;
  background:rgba(255,255,255,.9); color:var(--acc-dk); border-radius:.8mm; padding:.2mm 1mm; }
.card.A .body{ flex:1; position:relative; padding:2.6mm 3.4mm 2.4mm; display:flex; flex-direction:column;
  background:
    linear-gradient(180deg,#fffdf6 0%,var(--paper) 46%,var(--paper-2) 100%);
  box-shadow:inset 0 0 0 0.28mm rgba(0,0,0,.06); }
.card.A .body::after{ content:""; position:absolute; inset:1.2mm; border:0.22mm solid var(--line);
  border-radius:.8mm; opacity:.55; pointer-events:none; }
.card.A .wm{ position:absolute; right:2.4mm; top:50%; width:22mm; height:22mm;
  transform:translateY(-52%); color:var(--acc); opacity:.11; }
.card.A .wm .sig{ stroke-width:1.1; }
/* region permit: the letter IS the art — map color, map letter, full strength */
.card.A.permit .regmark{ position:absolute; right:3mm; top:50%; transform:translateY(-54%);
  width:16.4mm; height:16.4mm; display:flex; align-items:center; justify-content:center;
  border-radius:50%; background:color-mix(in srgb, var(--reg) 12%, #fff);
  border:0.35mm solid color-mix(in srgb, var(--reg) 55%, #fff); }
.card.A.permit .rl{ font-family:var(--disp); font-size:42pt; line-height:.72; color:var(--reg);
  /* Leftfield Serif sits low in its line box at this size — nudge the cap up so the
     glyph is optically centered in the disc, not baseline-centered. */
  margin-top:-1.5mm;
  /* hairline of the same hue, darkened — keeps the map color while giving the
     lighter regions (N, G) enough weight on cream stock */
  -webkit-text-stroke:0.18mm color-mix(in srgb, var(--reg) 72%, #000); paint-order:stroke fill; }
.card.A .fn.reg{ text-transform:uppercase; letter-spacing:.005em; font-size:13pt; max-width:38mm; }
.card.A .rchip{ font-family:var(--disp); font-size:8pt; color:#fff; line-height:1;
  padding:.5mm 1.5mm .8mm; border-radius:.8mm; }
.card.A .eyebrow{ font-family:var(--sans); font-size:4.2pt; letter-spacing:.16em; color:var(--acc);
  text-transform:uppercase; }
.card.A .fn{ font-family:var(--disp); font-size:15pt; line-height:1.02; margin:.8mm 0 .4mm;
  text-wrap:balance; max-width:44mm; }
.card.A .nm{ font-style:italic; font-size:7.2pt; color:#4b4438; max-width:42mm; line-height:1.15; }
.card.A .rail{ margin-top:auto; display:flex; align-items:center; gap:2.4mm; }
.card.A .rail .cad{ margin-right:auto; }
.card.A.back .body{ padding:2.4mm 3.2mm 2.2mm; }
.card.A .bhead{ display:flex; align-items:center; gap:1.4mm; border-bottom:0.25mm solid var(--line);
  padding-bottom:1mm; }
.card.A .bhead .in{ width:4.6mm; height:4.6mm; color:var(--acc); }
.card.A .bfn{ font-family:var(--disp); font-size:9.5pt; line-height:1; }
.card.A .bown{ margin-left:auto; font-family:var(--sans); font-size:3.9pt; letter-spacing:.12em;
  background:var(--acc); color:#fff; padding:.5mm 1.3mm; border-radius:.7mm; }
.card.A .rtext{ flex:1; display:flex; align-items:center; font-size:5.3pt; line-height:1.3;
  padding:1.2mm .4mm; text-align:justify; hyphens:auto; }
.card.A .rail.tight{ border-top:0.22mm solid var(--line); padding-top:.8mm; }

@media print{ body{ background:#fff; } .pair{ transform:none; margin:0 0 8mm; } }
`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>18Dragon — Private Card Faces (C50 mockup)</title>
<style>${style}</style></head><body>
<div class="wrap">
  <h1>Private card faces — look &amp; feel</h1>
  <p class="lede">The agreed private-card face — direction <b>A "Ledger"</b>, chosen 2026-08-17
  (two alternates were explored and dropped). Real 67 × 44 mm card, front (player-owned) and
  back (company-owned). Shown at 1.5× for reading; the gallery at the bottom is actual size.
  Corners are drawn rounded here to preview the finished card; the print generator will emit
  <b>square</b> corners (rounding happens on paper) — <code>node tools/mockup-privates.mjs square</code>
  renders it that way.
  Type is the deck's existing pair — <b>Leftfield Serif</b> for display (as on the board mat
  and bid boxes), Iowan/Palatino for body — so privates sit in the same family as the certs.</p>

  <div class="note">
    <b>What changed from the current cards:</b> the flat pastel tint is gone
    (cream stock like the certs; the class color survives as an <i>accent</i> — green = a minor
    may buy it in, red = majors only). Each ability family gets a <b>line-art sigil</b>, so the
    box sorts by shape as well as by text. Phase is a <b>tile-colored hex chip</b> instead of an
    outlined numeral; revenue is a labelled coin, so player-side and company-side revenue can
    never be confused. The three stacked footer chips collapse into one rail, and the dashed
    art placeholder is replaced by the sigil watermark (no reserved hole waiting on art).
  </div>

${section("A", "The face", "Cream stock, hairline inner frame, a colored spine carrying the card number and the player-count gate. The function label is the headline — what you scan in a bid box — with the flavor name as an italic subhead. The sigil sits behind the type as a watermark. Quietest and closest to the certificate deck.")}
${platePlate()}
${permitsSection()}
${gallery("A")}

  <div class="note">
    <b>Settled (2026-08-17):</b> this face, square corners in print (rounded here only as a
    preview), the region permits led by the map letter in the map color at disc-filling size,
    and PHASE spelled out above the hex chip. <b>Placeholder line art now exists for all 30
    privates</b> (sigil plate above) — good enough to ship, replaceable when real art happens.
    The perm-train privates (P1–P4) keep showing the actual train card on their back, as they
    do today. Full decision record: the C50 story.
  </div>
</div>
</body></html>`;

writeFileSync(OUT, html);
console.log(
  `Wrote ${OUT}: ${SAMPLE.length} cards (front+back) + ${PERMITS.length} permits + ` +
    `${GALLERY.length}-card gallery${ROUNDED ? "" : " (square corners)"}.`,
);
