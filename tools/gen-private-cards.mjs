#!/usr/bin/env node
// Generate printable 2-sided private cards for 18Dragon from privates.json.
//
// Usage:
//   node tools/gen-private-cards.mjs [data/privates.json] [out-standalone.html] [out-content.html]
// Defaults: data/privates.json -> print/private-cards.html (+ content-only file if a 3rd arg given).
//
// US Letter portrait, 67x44mm landscape cards. Grid COLS x ROWS per page.
// 30 cards -> N front sheets + N back sheets, interleaved F1,B1,F2,B2 for auto-duplex.
// LONG-EDGE flip: back sheets mirror COLUMNS per row so each reverse sits behind its front.
// Home/proof quality (card borders + margin crop marks are cut guides). Pro bleed = C44.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { gp, COIN_CSS, trainFace, TRAIN_CSS, FONT_FACE, CARD_ROOT_CSS } from "./cardkit.mjs";

// Standalone/preview output only — the printable private deck is part of the unified
// print/cards-duplex.html from gen-cards.mjs. Default writes to the gitignored preview/.
const [, , inPath = "data/privates.json", outPath = "preview/private-cards.html", contentPath] =
  process.argv;

// ---- layout config (all tunable) ----
const ORIENT = "landscape"; // "landscape" | "portrait"
const COLS = 3;
const ROWS = 4; // 3x4 = 12/page; landscape leaves ~39mm side + ~20mm top/bottom margins
export const PER_PAGE = COLS * ROWS;
const CARD_W = 67; // mm
const CARD_H = 44; // mm
// Back-sheet mirror axis for duplex alignment:
//   "cols" = horizontal flip  (portrait + long-edge, or landscape + short-edge)
//   "rows" = vertical flip    (portrait + short-edge, or landscape + long-edge)
const MIRROR = "rows"; // landscape + long-edge binding (verify with a test print)
const PAGE_W = ORIENT === "landscape" ? 279.4 : 215.9; // US Letter
const PAGE_H = ORIENT === "landscape" ? 215.9 : 279.4;
const GRID_W = COLS * CARD_W;
const GRID_H = ROWS * CARD_H;
const ML = (PAGE_W - GRID_W) / 2; // centered
const MT = (PAGE_H - GRID_H) / 2; // centered

const esc = (s) =>
  String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const data = JSON.parse(readFileSync(inPath, "utf8"));
const cards = data.privates;

// Map private id -> its perm-train face (from trains.json deck:false trains). These
// privates show the real train card on their back instead of a company face.
const backTrain = {};
try {
  const trains = JSON.parse(readFileSync("data/trains.json", "utf8")).trains;
  for (const t of trains) {
    for (const pid of t.on_private || []) backTrain[pid] = t;
  }
} catch {
  // trains.json not present yet — perm-train backs fall back to the text placeholder.
}

// ============================ C50 face (direction A "Ledger") ============================
// Cream stock, hairline frame, a colored spine carrying identity; the function label is the
// headline; a line-art sigil watermark behind the type; one footer rail. Region permits lead
// with the map letter in the map color. Ported from docs/mockups/private-card-mockup.html.

// ---- sigils: one line-art mark per private (placeholder art, designer-approved). Stroke-only
//      on a 24x24 grid so one path serves the 20mm front watermark and the 4.6mm back chip. ----
const S = (d) => `<svg viewBox="0 0 24 24" class="sig">${d}</svg>`;
const PERMIT_SEAL = S(
  `<circle cx="12" cy="9.5" r="6"/><path d="M12 4.6l1.3 2.9 3.1.3-2.3 2.1.7 3-2.8-1.6-2.8 1.6.7-3-2.3-2.1 3.1-.3z"/><path d="M8.6 14.6L7 21l5-2.2L17 21l-1.6-6.4"/>`,
);
const ART = {
  P1: S(`<rect x="2.6" y="9" width="9" height="7" rx="1"/><path d="M11.6 9h4l2.6 3.2V16h-6.6z"/><circle cx="6" cy="18.6" r="1.8"/><circle cx="15.4" cy="18.6" r="1.8"/><path d="M4.8 9V6.4h2.4V9"/><path d="M6 6.2c.2-1.4 1.7-1.6 1.5-3.1.9.9 1.5 2.1.7 3.1"/><path d="M1.6 20.6h20.8"/>`),
  P2: S(`<rect x="3" y="9" width="13.6" height="7" rx="1"/><path d="M3 12.4h13.6"/><circle cx="7" cy="18.4" r="1.7"/><circle cx="13.4" cy="18.4" r="1.7"/><path d="M16.6 12.4h2.2"/><circle cx="20.4" cy="12.4" r="1.5"/><path d="M1.6 20.8h20.8"/>`),
  P3: S(`<path d="M4 9.4h15l-2.2 6.2H6.2z"/><path d="M4 12.4h15"/><circle cx="8.4" cy="18.2" r="1.6"/><circle cx="14.6" cy="18.2" r="1.6"/><path d="M4 9.4L2.2 5.6"/><path d="M1.6 20.8h20.8"/>`),
  P4: S(`<rect x="4.6" y="11" width="10" height="5" rx="1"/><circle cx="7.4" cy="18.2" r="1.6"/><circle cx="12.8" cy="18.2" r="1.6"/><path d="M14.6 13.4h3"/><path d="M7.4 11V8.4h2.2V11"/><path d="M12.4 7.6c1.3 0 1.3-1.7 2.6-1.7M14.4 10c1.4 0 1.4-1.9 2.8-1.9"/><path d="M1.6 20.8h20.8"/>`),
  P5: PERMIT_SEAL, P6: PERMIT_SEAL, P7: PERMIT_SEAL, P8: PERMIT_SEAL, P9: PERMIT_SEAL,
  P10: S(`<path d="M2 16.6h20"/><path d="M4 16.6c0-5 3.6-8.2 8-8.2s8 3.2 8 8.2"/><path d="M8 16.6v-3.2M16 16.6v-3.2"/><circle cx="12" cy="5" r="2.2"/><path d="M12 1.4v1.2M15.4 3.2l-.8.9M8.6 3.2l.8.9"/><path d="M2 16.6v3.8M22 16.6v3.8"/>`),
  P11: S(`<path d="M2 10.4h20"/><path d="M4.6 10.4v9M12 10.4v9M19.4 10.4v9"/><path d="M4.6 19.4l7.4-9 7.4 9"/><path d="M1.6 21.4h20.8"/><path d="M6.4 7.4h11.2"/>`),
  P12: S(`<path d="M1.6 20h20.8"/><path d="M3 20l4.8-7.4 3.2 5"/><path d="M11 8.6l3.4-3.4 4.8 4.8-3.4 3.4z"/><path d="M12.8 10.4l-4.4 4.4"/>`),
  P13: S(`<path d="M1.6 20.6h20.8"/><path d="M4.6 20.6L11 6.4l5.8 14.2"/><path d="M11 6.8l4.2 2.6-3.2 2.4 3.6 2.4"/><circle cx="11" cy="4.6" r="1.4"/>`),
  P14: S(`<path d="M3.4 5.4c3-1.7 7-1.7 10 0"/><path d="M8.4 5.8L17.6 20"/><path d="M20.6 5.4c-3-1.7-7-1.7-10 0"/><path d="M15.6 5.8L6.4 20"/>`),
  P15: S(`<path d="M1.6 20.6h20.8"/><path d="M3.4 20.6l6-9.4 4.2 6.4"/><path d="M14.4 20.6l4.6-10.4"/><path d="M16.2 7.4c2.4-1.6 4.8-.8 5.8 1.2-2 .2-2.8 1.1-3.2 2.4-1.2-1-2.2-1.8-2.6-3.6z"/>`),
  P16: S(`<circle cx="8.6" cy="12" r="5.6"/><circle cx="15.4" cy="12" r="5.6"/>`),
  P17: S(`<path d="M1.6 20.4h20.8"/><path d="M3.4 20.4l5.6-8.6 3.4 5.2"/><path d="M15 5.6l3.6 3.6-3.6 7.4-3.6-7.4z"/><path d="M11.4 9.2h7.2"/>`),
  P18: S(`<rect x="4.6" y="7.6" width="14.8" height="12.4" rx="1.2"/><path d="M4.6 11h14.8"/><path d="M9 7.6V5.4h6v2.2"/><path d="M12 19c-2.2-1.3-2.8-2.9-1.6-4.6.2 1 .8 1.3 1.4 1.1-.6-1.7.4-2.9 2-3.5-.6 1.5.4 1.9 1 2.7.6.8.6 1.9-.2 2.9-.5.6-1.4 1.1-2.6 1.4z"/>`),
  P19: S(`<path d="M4 10.4h14v6.8H4z"/><path d="M6.4 10.4c1.8-2.4 7.4-2.4 9.2 0"/><circle cx="7.2" cy="19.4" r="1.6"/><circle cx="14.8" cy="19.4" r="1.6"/><path d="M8.6 7.6l1-1.8 1 1.8M13 7.2l1-1.8 1 1.8"/>`),
  P20: S(`<path d="M4.4 19.6L15 9"/><path d="M17.6 6.4l-2.4 2.4"/><path d="M19 2.6l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z"/><path d="M8.4 4.2l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7z"/>`),
  P21: S(`<path d="M1.6 21h20.8"/><circle cx="5.2" cy="17.4" r="2.2"/><path d="M9 17.4h3.4"/><path d="M11.6 15.6l2 1.8-2 1.8"/><path d="M15 21V10.6l3.2-2.2 3.2 2.2V21"/><path d="M17.2 21v-3.4h2.2V21"/>`),
  P22: S(`<circle cx="9.6" cy="12" r="6"/><circle cx="9.6" cy="12" r="2.4"/><path d="M19 6.4v6M16 9.4h6"/>`),
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
const missingSigils = cards.filter((c) => !ART[c.id]).map((c) => c.id);
if (missingSigils.length) throw new Error(`No sigil for: ${missingSigils.join(", ")}`);
const sigil = (c, cls = "") => `<span class="sigwrap ${cls}">${ART[c.id]}</span>`;

// ---- region permits: letter + map color, from the permit labels in 18dragon.json ----
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

// ---- shared bits ----
const accent = (c) => (c.badge === "green" ? "acc-green" : "acc-red");
const classShort = (c) =>
  c.class === "major" ? "MAJOR" : c.class === "minor" ? "MINOR" : "MINOR · MAJOR";
const cadence = (c) =>
  ({ "one-time": "One time", "each-or": "Each OR", ongoing: "Ongoing" })[c.cadence] || "";
const phaseCls = (p) => (p <= 2 ? "ph-y" : p <= 4 ? "ph-g" : "ph-b");
const phaseChip = (c) =>
  `<span class="phblk"><i>PHASE</i><span class="ph ${phaseCls(c.phase)}">${c.phase}</span></span>`;
const revBlock = (v, label) => `<span class="rev"><i>${label}</i><b>${gp(v)}</b></span>`;
// Type autoscale (C54). The card is 67x44mm and the corner-rounder eats 6.5mm at each
// corner, so the type box is fixed and small. Rather than set one size that fits the
// worst case, each face picks a size by MEASURED fit: the title is set at TITLE_PT
// unless it is genuinely too wide for its slot, and only then does it step down.
const step = (n, steps) => steps.find(([max]) => n <= max)[1];
const TITLE_PT = 20;
// Slot the title may occupy, in mm. The permit faces are a little narrower: a solid
// region medallion sits at the right of the card where the plain faces carry only a
// faint watermark the title is free to cross. 36mm still clears the medallion — it is a
// circle centred lower than the title, so at the title's band it is barely inset.
const TITLE_MM = { plain: 48, permit: 36 };
// Advance widths of the display face (Leftfield Serif) at TITLE_PT, in mm, measured off
// the rendered font — summing these predicts a title's true width to within 1%, where a
// flat per-character average was out by up to 15% and shrank titles that fit fine.
// Regenerate if the face or TITLE_PT changes; unlisted characters fall back to the
// widest measured glyph.
const CHAR_MM = {
  " ": 1.0046, "-": 1.9224, "/": 2.6458, "2": 2.1828, "5": 2.1332, "→": 7.0569,
  B: 2.4267, C: 2.0836, D: 2.4143, E: 2.4061, F: 2.3234, G: 2.1952, H: 2.5756,
  L: 2.0753, M: 3.1213, P: 2.4639, R: 2.6417, S: 2.1539, T: 2.2366, V: 2.435,
  a: 2.4433, c: 2.0836, d: 2.4143, e: 2.4061, g: 2.1952, h: 2.5756, i: 1.1451,
  k: 2.6045, l: 2.0836, m: 3.1213, n: 2.5756, o: 2.373, p: 2.4639, r: 2.6417,
  s: 2.1621, t: 2.2366, u: 2.5756, v: 2.4433, w: 3.6504, x: 2.7616, y: 2.5011,
  "ö": 2.373,
};
const WIDEST_MM = Math.max(...Object.values(CHAR_MM));
// Kerning pulls the set line ~0.5-2% tighter than the sum of advances; 0.99 keeps the
// estimate honest without shrinking a title that would in fact have fit.
const KERN = 0.99;
const titleWidth = (t, pt) =>
  [...String(t)].reduce((w, ch) => w + (CHAR_MM[ch] ?? WIDEST_MM), 0) * KERN * (pt / TITLE_PT);
// Largest half-point size (<= TITLE_PT) whose single line fits the slot, floor 12pt.
const fnSize = (t, kind = "plain") => {
  const fit = (TITLE_PT * TITLE_MM[kind]) / titleWidth(t, TITLE_PT);
  return Math.min(TITLE_PT, Math.max(12, Math.floor(fit * 2) / 2));
};
// …and how many lines that size needs, so the title BLOCK can be reserved at a fixed
// height. A shrunk title must not shift the name/rail under it — the card's title always
// starts at the same place, whatever size it ended up at.
const fnLines = (t, kind = "plain") =>
  titleWidth(t, fnSize(t, kind)) > TITLE_MM[kind] ? 2 : 1;
// company-side rules text: default 7.4pt (was 5.3pt), dropping for the two long
// town-tile privates (P23/P24, ~410 chars) so they still fit the box.
const rtSize = (t) => step(String(t).length, [[150, 7.6], [230, 7.2], [300, 6.8], [360, 6.4], [Infinity, 6]]);

// keep rules text quiet on a small card (no coin glyph, just "10gp")
const rulesText = (c) => esc(c.rules_text).replace(/\$(\d+)/g, "$1gp");

// ---- one card face ----
export function faceHtml(c, side) {
  if (side === "front") {
    if (isPermit(c)) {
      const r = region(c);
      return `
<div class="card A permit ${accent(c)}" style="--reg:${r.color}">
  <div class="spine"><span class="sid">${esc(c.id)}</span><span class="gate">${esc(c.players_required)}+</span></div>
  <div class="body">
    <div class="regmark"><span class="rl">${esc(c.extra.region)}</span></div>
    <div class="eyebrow">${classShort(c)}</div>
    <div class="fn reg" style="font-size:${fnSize(regionName(c) + " Permit", "permit")}pt">${esc(regionName(c))} Permit</div>
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
  <div class="spine"><span class="sid">${esc(c.id)}</span><span class="gate">${esc(c.players_required)}+</span></div>
  <div class="body">
    ${sigil(c, "wm")}
    <div class="eyebrow">${classShort(c)}</div>
    <div class="fn" style="font-size:${fnSize(c.function_label)}pt">${esc(c.function_label)}</div>
    <div class="nm">${esc(c.name)}</div>
    <div class="rail">
      ${phaseChip(c)}
      <span class="cad">${cadence(c)}</span>
      ${revBlock(c.player_revenue, "TO PLAYER")}
    </div>
  </div>
</div>`;
  }

  // back / company-owned face. Perm-train privates show the real train card.
  const train = backTrain[c.id];
  if (train) return trainFace(train);

  // The company side drops the coloured spine and runs on lighter paper so the two
  // sides are tellable apart across the table (C54); the id survives as a small chip.
  const bfn = isPermit(c) ? regionName(c) + " Permit" : c.function_label;
  return `
<div class="card A back ${accent(c)}"${isPermit(c) ? ` style="--reg:${region(c).color}"` : ""}>
  <div class="body">
    <div class="bhead">${isPermit(c) ? `<span class="rchip" style="background:${region(c).color}">${esc(c.extra.region)}</span>` : sigil(c, "in")}<span class="bfn">${esc(bfn)}</span><span class="bid">${esc(c.id)}</span><span class="bown">IN COMPANY</span></div>
    <div class="rtext" style="font-size:${rtSize(c.rules_text)}pt">${rulesText(c)}</div>
    <div class="rail tight">
      <span class="cad">${cadence(c) || "—"}</span>
      ${revBlock(c.company_revenue, "TO COMPANY")}
    </div>
  </div>
</div>`;
}

// ---- pages ----
export function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}
// duplex mirror so each back sits behind its front. Build the full ROWSxCOLS grid
// (pad short pages), then mirror the axis the physical flip reverses.
export function mirror(cells) {
  const grid = [];
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) row.push(cells[r * COLS + c] ?? null);
    grid.push(row);
  }
  if (MIRROR === "cols") grid.forEach((row) => row.reverse());
  else grid.reverse(); // "rows"
  return grid.flat();
}

// crop marks in the page margins, aligned to every card boundary
export function cropMarks() {
  const T = 4; // tick length mm
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

function sheetHtml(cells, label, faces) {
  const inner = cells
    .map((c) => (c ? faceHtml(c, faces) : `<div class="card blank"></div>`))
    .join("");
  return `
  <section class="sheet">
    <div class="sheet-label">${esc(label)}</div>
    ${cropMarks()}
    <div class="grid">${inner}</div>
  </section>`;
}

const pages = chunk(cards, PER_PAGE);
let sheets = "";
pages.forEach((page, i) => {
  sheets += sheetHtml(page, `Sheet ${i + 1} — FRONT (player-owned)`, "front");
  sheets += sheetHtml(
    mirror(page),
    `Sheet ${i + 1} — BACK (company-owned; ${MIRROR} mirrored for ${ORIENT} ${MIRROR === "rows" ? "long" : "short"}-edge duplex)`,
    "back",
  );
});

// Title reserve: the tallest title block anywhere in the deck, applied to EVERY card so
// the name and rail below it sit at the same height on all 30. Data-driven — add a title
// long enough to wrap and the whole deck picks up the two-line reserve together.
const FN_LINES = Math.max(
  ...cards.map((c) =>
    isPermit(c) ? fnLines(regionName(c) + " Permit", "permit") : fnLines(c.function_label),
  ),
);
const FN_H = (FN_LINES * TITLE_PT * 1.02 * 25.4) / 72; // mm

export const PRIVATE_STYLE = `
  :root { color-scheme: light; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  ${FONT_FACE}
  ${CARD_ROOT_CSS}
  ${COIN_CSS}
  ${TRAIN_CSS}
  body { margin: 0; background: #ccc; font-family: var(--serif); }
  .sheet-label { position: absolute; top: 9mm; left: 0; right: 0; text-align: center;
    font-family: system-ui, sans-serif; font-size: 8pt; color: #666; }
  .sheet {
    position: relative; width: ${PAGE_W}mm; height: ${PAGE_H}mm; background: #fff; margin: 6mm auto;
    padding: ${MT}mm ${ML}mm; box-shadow: 0 1px 6px rgba(0,0,0,.3);
  }
  .crop { position: absolute; background: #000; }
  .crop.v { width: 0.15mm; height: 4mm; }
  .crop.h { height: 0.15mm; width: 4mm; }
  .grid {
    display: grid; width: ${GRID_W}mm;
    grid-template-columns: repeat(${COLS}, ${CARD_W}mm);
    grid-auto-rows: ${CARD_H}mm;
  }
  /* ---------- Ledger card shell (C50) — square corners, no preview shadow ---------- */
  .card{ width:${CARD_W}mm; height:${CARD_H}mm; position:relative; overflow:hidden;
    background:var(--paper); color:var(--ink); font-family:var(--serif); }
  .card.blank{ background:none; }
  /* the company side runs lighter than --paper (#f6f1e3) so the two sides read apart */
  :root{ --paper-back:#fdfbf4; }
  .acc-green{ --acc:#3f6b34; --acc-dk:#2c4b24; --acc-lt:#e4eeda; }
  .acc-red{   --acc:#8e2b22; --acc-dk:#6a1e18; --acc-lt:#f5e2de; }

  .sig{ width:100%; height:100%; fill:none; stroke:currentColor; stroke-width:1.5;
    stroke-linecap:round; stroke-linejoin:round; display:block; }
  .sigwrap{ display:block; }

  /* phase chip = hex, tile-colored; PHASE spelled above it (same label as revenue) */
  .phblk{ display:inline-flex; flex-direction:column; align-items:center; line-height:1; }
  .phblk i{ font-family:var(--sans); font-style:normal; font-size:3.4pt; letter-spacing:.1em; color:#6a6357; margin-bottom:.6mm; }
  .ph{ display:inline-flex; align-items:center; justify-content:center; width:7.4mm; height:8.4mm;
    clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);
    font-family:var(--disp); font-size:12pt; line-height:1; color:#1c1a17; padding-bottom:.4mm; }
  .ph-y{ background:#f0cf5c; } .ph-g{ background:#8ec27f; } .ph-b{ background:#c39a6b; }

  .rev{ display:inline-flex; flex-direction:column; align-items:flex-end; line-height:1; }
  .rev i{ font-family:var(--sans); font-style:normal; font-size:3.4pt; letter-spacing:.1em; color:#6a6357; margin-bottom:.6mm; }
  .rev b{ font-family:var(--disp); font-weight:400; font-size:12.5pt; }
  .rev .gp-coin{ width:.8em; height:.8em; }
  .cad{ font-family:var(--sans); font-size:5pt; letter-spacing:.11em; text-transform:uppercase; color:#5d564a; }

  /* ---------- A · Ledger ---------- */
  /* No outer card border — crop marks are the only cut guides. Everything that must
     survive the corner rounder (C54) stays clear of a 6.5mm radius arc at each corner:
     the spine's id/gate are padded 7.5mm in from top and bottom, and the body's own
     padding keeps the eyebrow and the bottom rail out of the arcs. There is deliberately
     NO hairline frame around the card content — any rectangle inset far enough to clear
     a 6.5mm arc sits too far in to look like a frame, so the type sets on bare paper. */
  .card.A{ display:flex; }
  .card.A .spine{ flex:0 0 6.2mm; background:var(--acc); color:#fff; position:relative;
    display:flex; flex-direction:column; align-items:center; justify-content:space-between;
    padding:7.5mm 0; border-right:0.3mm solid var(--acc-dk); }
  .card.A .sid{ font-family:var(--disp); font-size:11pt; writing-mode:vertical-rl; transform:rotate(180deg); }
  .card.A .gate{ font-family:var(--sans); font-size:5pt; font-weight:700; letter-spacing:.05em;
    background:rgba(255,255,255,.9); color:var(--acc-dk); border-radius:.8mm; padding:.2mm 1mm; }
  /* Vertically SYMMETRIC gradient — same warm tone at the top AND bottom edges (light
     only in the interior), so vertically-abutting cards meet at a matching colour and a
     slightly inaccurate cut leaves no mismatched strip. (The body's top/bottom are the
     card edges; a vertical gradient is uniform across x, so left/right already match.) */
  .card.A .body{ flex:1; position:relative; padding:3.4mm 4.2mm 3.2mm; display:flex; flex-direction:column;
    background:linear-gradient(180deg,var(--paper) 0%,#fbf7ec 50%,var(--paper) 100%); }
  .card.A .wm{ position:absolute; right:3.2mm; top:50%; width:21mm; height:21mm; transform:translateY(-52%);
    color:var(--acc); opacity:.11; }
  .card.A .wm .sig{ stroke-width:1.1; }
  /* region permit: the letter IS the art — map color, map letter, full strength */
  .card.A.permit .regmark{ position:absolute; right:3.6mm; top:50%; transform:translateY(-54%);
    width:16.4mm; height:16.4mm; display:flex; align-items:center; justify-content:center;
    border-radius:50%; background:color-mix(in srgb, var(--reg) 12%, #fff);
    border:0.35mm solid color-mix(in srgb, var(--reg) 55%, #fff); }
  .card.A.permit .rl{ font-family:var(--disp); font-size:42pt; line-height:.72; color:var(--reg);
    margin-top:-1.5mm;
    -webkit-text-stroke:0.18mm color-mix(in srgb, var(--reg) 72%, #000); paint-order:stroke fill; }
  .card.A .fn.reg{ text-transform:uppercase; letter-spacing:.005em; max-width:${TITLE_MM.permit}mm; }
  .card.A .rchip{ font-family:var(--disp); font-size:9pt; color:#fff; line-height:1; padding:.5mm 1.6mm .9mm; border-radius:.8mm; }
  .card.A .eyebrow{ font-family:var(--sans); font-size:4.6pt; letter-spacing:.16em; color:var(--acc); text-transform:uppercase; }
  /* .fn font-size is set per card by fnSize(); the block's HEIGHT is fixed deck-wide by
     FN_LINES, so a title that had to shrink still starts on the same line as every other
     card's and never shifts the name/rail beneath it. */
  .card.A .fn{ font-family:var(--disp); font-size:${TITLE_PT}pt; line-height:1.02; margin:.9mm 0 .5mm;
    height:${FN_H.toFixed(2)}mm; text-wrap:balance; max-width:${TITLE_MM.plain}mm; }
  .card.A .nm{ font-style:italic; font-size:7.6pt; color:#4b4438; max-width:40mm; line-height:1.15; }
  .card.A .rail{ margin-top:auto; display:flex; align-items:center; gap:2.4mm; }
  .card.A .rail .cad{ margin-right:auto; }

  /* company-owned side: no spine, lighter paper (tell the sides apart on the table) */
  .card.A.back{ background:var(--paper-back); }
  .card.A.back .body{ padding:4mm 4.4mm 3.6mm;
    background:linear-gradient(180deg,var(--paper-back) 0%,#fffdf8 50%,var(--paper-back) 100%); }
  .card.A .bhead{ display:flex; align-items:center; gap:1.6mm; border-bottom:0.25mm solid var(--line); padding-bottom:1.2mm; }
  .card.A .bhead .in{ width:5.2mm; height:5.2mm; color:var(--acc); }
  .card.A .bfn{ font-family:var(--disp); font-size:11pt; line-height:1; }
  .card.A .bid{ font-family:var(--sans); font-size:5pt; font-weight:700; letter-spacing:.06em;
    color:var(--acc); border:0.22mm solid var(--acc); border-radius:.7mm; padding:.3mm 1mm; }
  .card.A .bown{ margin-left:auto; font-family:var(--sans); font-size:4.2pt; letter-spacing:.12em;
    background:var(--acc); color:#fff; padding:.5mm 1.3mm; border-radius:.7mm; }
  /* .rtext font-size is set per card by rtSize() */
  .card.A .rtext{ flex:1; display:flex; align-items:center; font-size:7.4pt; line-height:1.28;
    padding:1.2mm .2mm; text-align:justify; hyphens:auto; }
  .card.A .rail.tight{ border-top:0.22mm solid var(--line); padding-top:1mm; }

  @media print {
    body { background: #fff; }
    .sheet-label { display: none; }
    .card.blank { border: none; }
    .sheet { margin: 0; box-shadow: none; break-after: page; }
    .sheet:last-child { break-after: auto; }
    @page { size: letter ${ORIENT}; margin: 0; }
  }
`;

// Run the file writes only when invoked directly (not when imported by gen-cards.mjs).
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const content = `<style>${PRIVATE_STYLE}</style>\n<main>${sheets}\n</main>\n`;
  const standalone = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>18Dragon — Private Cards (30, 2-sided)</title>
</head>
<body>
${content}</body>
</html>
`;

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, standalone);
  if (contentPath) writeFileSync(contentPath, content);

  console.log(
    `Wrote ${outPath}: ${cards.length} cards, ${pages.length} front + ${pages.length} back sheets ` +
      `(${PER_PAGE}/page, ${COLS}x${ROWS}, ${CARD_W}x${CARD_H}mm, side margin ${ML.toFixed(1)}mm, long-edge flip).` +
      (contentPath ? ` Content-only: ${contentPath}.` : ""),
  );
}
