#!/usr/bin/env node
// Generate printable 2-sided private cards for 18Dragon from privates.json.
//
// Usage:
//   node tools/gen-private-cards.mjs [privates.json] [out-standalone.html] [out-content.html]
// Defaults: privates.json -> private-cards.html (+ content-only file if a 3rd arg given).
//
// US Letter portrait, 67x44mm landscape cards. Grid COLS x ROWS per page.
// 30 cards -> N front sheets + N back sheets, interleaved F1,B1,F2,B2 for auto-duplex.
// LONG-EDGE flip: back sheets mirror COLUMNS per row so each reverse sits behind its front.
// Home/proof quality (card borders + margin crop marks are cut guides). Pro bleed = C44.

import { readFileSync, writeFileSync } from "node:fs";
import { gp, coinize, COIN_CSS } from "./cardkit.mjs";

const [, , inPath = "privates.json", outPath = "private-cards.html", contentPath] =
  process.argv;

// ---- layout config (all tunable) ----
const ORIENT = "landscape"; // "landscape" | "portrait"
const COLS = 3;
const ROWS = 4; // 3x4 = 12/page; landscape leaves ~39mm side + ~20mm top/bottom margins
const PER_PAGE = COLS * ROWS;
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

const isMinorBuyable = (c) => c.badge === "green";
const classText = (c) =>
  c.class === "major" ? "Major" : c.class === "minor" ? "Minor" : "Minor/Major";
const cadenceText = (c) =>
  c.cadence === "one-time"
    ? "One Time"
    : c.cadence === "each-or"
      ? "Each OR"
      : c.cadence === "ongoing"
        ? "Ongoing"
        : "";
const phaseFill = (p) =>
  p <= 2 ? "p-y" : p <= 4 ? "p-g" : "p-b"; // yellow 1/2, green 3/4, brown 5

const gate = (c) => `<span class="gate">${esc(c.players_required)}+</span>`;
const pid = (c) =>
  `<div class="pid-wrap"><span class="cls">${esc(classText(c))}</span>` +
  `<span class="pid ${isMinorBuyable(c) ? "b-green" : "b-red"}">${esc(c.id)}</span></div>`;
const owner = (label) =>
  `<div class="owner"><span class="own-a">${label}</span><span class="own-b">PRIVATE COMPANY</span></div>`;

// ---- one card face ----
function faceHtml(c, side) {
  const tint = isMinorBuyable(c) ? "tint-green" : "tint-red";
  const head = `
      <div class="band">${esc(c.function_label)}</div>
      <div class="title">${esc(c.name)}</div>`;

  if (side === "front") {
    return `
    <div class="card ${tint}">
      ${gate(c)}
      ${head}
      <div class="mid">
        <div class="stat">
          <small>Phase</small>
          <span class="pnum ${phaseFill(c.phase)}">${esc(c.phase)}</span>
        </div>
        <div class="img"></div>
        <div class="stat">
          <small>Revenue</small>
          <span class="money">${gp(c.player_revenue)}</span>
        </div>
      </div>
      <div class="foot">
        <div class="cadence">${esc(cadenceText(c))}</div>
        ${owner("PLAYER-OWNED")}
        ${pid(c)}
      </div>
    </div>`;
  }

  // back / company-owned face
  const isTrain = c.category === "perm-train" || c.id === "P1";
  const body = isTrain
    ? `<div class="train"><div class="tname">${esc(c.function_label)}</div><small>permanent train card (reverse)</small></div>`
    : `<div class="rules"><p>${coinize(esc(c.rules_text))}</p></div>`;
  return `
    <div class="card ${tint} back">
      ${gate(c)}
      ${head}
      ${body}
      <div class="foot">
        <div class="crev"><small>Revenue</small><span class="money">${gp(c.company_revenue)}</span></div>
        ${owner("COMPANY-OWNED")}
        ${pid(c)}
      </div>
    </div>`;
}

// ---- pages ----
function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}
// duplex mirror so each back sits behind its front. Build the full ROWSxCOLS grid
// (pad short pages), then mirror the axis the physical flip reverses.
function mirror(cells) {
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
function cropMarks() {
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

const style = `
  :root { color-scheme: light; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  ${COIN_CSS}
  body { margin: 0; background: #ccc; font-family: Georgia, "Times New Roman", serif; }
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
  .card {
    width: ${CARD_W}mm; height: ${CARD_H}mm; border: 0.2mm solid #000;
    position: relative; overflow: hidden; display: flex; flex-direction: column;
    color: #141210;
  }
  .card.blank { border: 0.2mm dashed #bbb; }
  .tint-green { background: #dcecc6; }
  .tint-red { background: #f0c7c3; }

  .band { text-align: center; font-weight: 700; font-size: 9pt; line-height: 1.05;
    text-wrap: balance; background: #f2cf4c; padding: 1mm 5mm 0.9mm; border-bottom: 0.2mm solid #0004; }
  .title { text-align: center; font-style: italic; font-size: 6.4pt; line-height: 1.1;
    padding: 0.6mm 5mm 0; }

  .mid { flex: 1; display: grid; grid-template-columns: 1fr 1.35fr 1fr; align-items: center;
    justify-items: center; padding: 0.3mm 2mm; }
  .stat { display: flex; flex-direction: column; align-items: center; line-height: 1; }
  .stat small { font-family: system-ui, sans-serif; font-size: 4pt; letter-spacing: .4px;
    text-transform: uppercase; color: #3a352c; margin-bottom: 0.4mm; }
  .pnum { font-size: 17pt; font-weight: 800; line-height: 1;
    -webkit-text-stroke: 0.4mm #000; paint-order: stroke fill; }
  .p-y { color: #f4c518; } .p-g { color: #34992f; } .p-b { color: #9a6427; }
  .money { font-size: 11pt; font-weight: 700; color: #2a2010; }
  .img { align-self: stretch; height: 92%; border: 0.2mm dashed #a99; border-radius: 0.6mm;
    background: repeating-linear-gradient(45deg,#0000 0 2mm,#0000000a 2mm 2.2mm); }

  .rules { flex: 1; display: flex; align-items: center; justify-content: center;
    padding: 1.5mm 4mm; }
  .rules p { margin: 0; text-align: center; font-size: 6pt; line-height: 1.25; }
  .train { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1mm; }
  .train .tname { font-size: 12pt; font-weight: 700; letter-spacing: .5px; }
  .train small { font-family: system-ui, sans-serif; font-size: 4.6pt; color: #444; }

  .foot { display: grid; grid-template-columns: 1fr auto 1fr; align-items: end;
    padding: 0 3mm 2.6mm; gap: 0.8mm; }
  .cadence { font-family: system-ui, sans-serif; font-size: 4.6pt; text-transform: uppercase;
    letter-spacing: .3px; justify-self: start; }
  .crev { justify-self: start; display: flex; flex-direction: column; align-items: center; line-height: 1; }
  .crev small { font-family: system-ui, sans-serif; font-size: 4pt; letter-spacing: .4px;
    text-transform: uppercase; color: #3a352c; margin-bottom: 0.3mm; }
  .crev .money { font-size: 8.5pt; }
  .owner { display: flex; flex-direction: column; align-items: center; gap: 0.5mm; }
  .own-a, .own-b { font-family: system-ui, sans-serif; letter-spacing: .4px; border-radius: 1mm;
    padding: 0.4mm 1.6mm; line-height: 1; white-space: nowrap; }
  .own-a { background: #141210; color: #fff; font-size: 4.8pt; font-weight: 700; }
  .own-b { background: #f2cf4c; color: #141210; font-size: 3.9pt; }
  .pid-wrap { justify-self: end; display: flex; flex-direction: column; align-items: flex-end; gap: 0.4mm; }
  .cls { font-family: system-ui, sans-serif; font-size: 4pt; color: #2a2620; }
  .pid { font-family: system-ui, sans-serif; font-weight: 700; font-size: 7pt; color: #fff;
    padding: 0.3mm 1.4mm; border-radius: 1mm; }
  .b-green { background: #3a7d1e; } .b-red { background: #b32020; }

  .gate { position: absolute; top: 2.6mm; left: 3mm; z-index: 2;
    font-family: system-ui, sans-serif; font-size: 5pt; font-weight: 700; color: #141210;
    background: #ffffffcc; border: 0.2mm solid #0006; border-radius: 1mm; padding: 0 1mm; }

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
<title>18Dragon — Private Cards (30, 2-sided)</title>
</head>
<body>
${content}</body>
</html>
`;

writeFileSync(outPath, standalone);
if (contentPath) writeFileSync(contentPath, content);

console.log(
  `Wrote ${outPath}: ${cards.length} cards, ${pages.length} front + ${pages.length} back sheets ` +
    `(${PER_PAGE}/page, ${COLS}x${ROWS}, ${CARD_W}x${CARD_H}mm, side margin ${ML.toFixed(1)}mm, long-edge flip).` +
    (contentPath ? ` Content-only: ${contentPath}.` : ""),
);
