#!/usr/bin/env node
// Generate the 18Dragon combined board mat (C18): the 1D stock market (top), the
// 4 minor bid boxes (middle), and the 3 private bid boxes (bottom), on a
// continuous ~490x260mm board meant to print as 3 hinged letter segments.
//
// Usage: node tools/gen-board-mat.mjs [18dragon.json] [print/board-mat.html]
//   Emits the 3 single-page segments to print/board-mat-segments/board-mat-{1,2,3}.html
//   (the 2nd arg only supplies the base name/dir; no combined file is written). Render
//   each to PDF and run tools/merge-board-mat.sh to build print/board-mat.pdf.
//
// Bid box = the approved design: perimeter bid track (+5) facing outward, start
// corner in a white disc on black, Leftfield-Serif numbers with per-position
// anchors, center = a card-sized slot labelled MINOR/PRIVATE COMPANY n.
//   minor track 100..195, private 0..95 (same 7x5 box, values -100).
// Market = one long row of 28 price cells (17mm wide x 80mm tall, ~6 tokens).

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, basename } from "node:path";

const [, , inPath = "18dragon.json", outPath = "print/board-mat.html"] = process.argv;
const game = JSON.parse(readFileSync(inPath, "utf8"));

const fontB64 = readFileSync("fonts/LeftfieldSerif-Regular.otf").toString("base64");
const FONT_FACE = `@font-face{font-family:"Leftfield Serif";src:url(data:font/otf;base64,${fontB64}) format("opentype");font-weight:400;}`;

// ---- box geometry (mm) ----
// minor/private cert = 44x67mm; sits LANDSCAPE in the box (67 wide x 44 tall).
const CARD_W = 67, CARD_H = 44, GAP = 1;
const CW = CARD_W + 2 * GAP, CH = CARD_H + 2 * GAP; // 69 x 46 center opening
const T = 15; // track depth
const BORDER = 0.6; // .box outer border — adds to the rendered box footprint
const cols = 7, rows = 5;
const colW = CW / (cols - 2); // 18.2
const rowH = CH / (rows - 2); // 19
const BOX_W = 2 * T + CW + 2 * BORDER; // 122.2 (grid tracks + outer border)
const BOX_H = 2 * T + CH + 2 * BORDER; // 88.2
const BOX_GAP = 2;

// ---- market geometry ----
const MK_W = 17, MK_H = 80;
const market = game.stock.market;

// ---- board geometry ----
const BAND_GAP = 3;
const MINOR_ROW_W = 4 * BOX_W + 3 * BOX_GAP; // 490
const PRIV_ROW_W = 3 * BOX_W + 2 * BOX_GAP; // 367
const MK_ROW_W = market.length * MK_W; // 476
const BOARD_W = Math.max(MINOR_ROW_W, MK_ROW_W); // now the market is widest
const BOARD_H = MK_H + BAND_GAP + BOX_H + BAND_GAP + BOX_H;
const SEG_W = BOARD_W / 3;

// ---- perimeter walk (CCW from bottom-right) for the 7x5 box ----
function perim(rows, cols) {
  const p = [];
  for (let c = cols; c >= 1; c--) p.push([rows, c]);
  for (let r = rows - 1; r >= 1; r--) p.push([r, 1]);
  for (let c = 2; c <= cols; c++) p.push([1, c]);
  for (let r = 2; r <= rows - 1; r++) p.push([r, cols]);
  return p;
}
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
// per-position anchor + letter-spacing (designer-tuned)
function anchor(r, c) {
  const top = r === 1, bot = r === rows, left = c === 1, right = c === cols;
  if (bot && left) return { x: "57%", y: "52%", ls: "-0.02em" };
  if (top && left) return { x: "57%", y: "63%", ls: "-0.02em" };
  if (top && right) return { x: "45%", y: "66%", ls: "-0.02em" };
  if (bot && right) return { x: "42%", y: "53%", ls: "-0.04em" };
  if (left) return { x: "57%", y: "55%", ls: "-0.01em" };
  if (top) return { x: "50%", y: "64%", ls: "-0.01em" };
  if (right) return { x: "41%", y: "57%", ls: "-0.01em" };
  if (bot) return { x: "47%", y: "50%", ls: "-0.01em" };
  return { x: "50%", y: "50%", ls: "-0.01em" };
}
const DY = "0.25em";
const numSvg = (val, deg, a) =>
  `<svg class="ns"><text x="${a.x}" y="${a.y}" dy="${DY}" style="letter-spacing:${a.ls};transform:rotate(${deg}deg);transform-box:fill-box;transform-origin:center">${val}</text></svg>`;

function bidBox(kind, n) {
  const startVal = kind === "private" ? 0 : 100;
  const label = kind === "private" ? "PRIVATE" : "MINOR";
  const cells = perim(rows, cols)
    .map(([r, c], i) => {
      const val = startVal + i * 5;
      const a = anchor(r, c);
      const inner = numSvg(val, rot(r, c), a);
      if (i === 0) {
        return `<div class="tk start" style="grid-row:${r};grid-column:${c}"><span class="disc">${inner}</span></div>`;
      }
      return `<div class="tk" style="grid-row:${r};grid-column:${c}">${inner}</div>`;
    })
    .join("");
  const center =
    `<div class="slot" style="grid-row:2/${rows};grid-column:2/${cols}"><div class="label">${label}<br>COMPANY ${n}</div></div>`;
  return `<div class="box">${cells}${center}</div>`;
}

// ---- market ----
function marketRow() {
  const cells = market
    .map((cell, i) => {
      const v = typeof cell === "object" ? cell.value : cell;
      let cls = "mk";
      if (i === 1) cls += " red"; // 50 shaded red
      if (i === 13) cls += " yl-r"; // 150: drop black divider (yellow lives on 165)
      if (i === 14) cls += " yl-l"; // 165: thick yellow border between 150 and 165
      if (i === market.length - 1) cls += " end"; // 600 = light blue End Game
      const body =
        i === market.length - 1
          ? `<div class="mkv">${v}</div><div class="endg">END GAME</div>`
          : `<div class="mkv">${v}</div>`;
      return `<div class="${cls}">${body}</div>`;
    })
    .join("");
  // single red border around the 50..100 group (cells 1..9), and a yellow line
  // between 150 (idx 13) and 165 (idx 14).
  const redX = 1 * MK_W, redW = 9 * MK_W;
  const overlays = `<div class="redbox" style="left:${redX}mm;width:${redW}mm"></div>`;
  return cells + overlays;
}

// ---- assemble continuous board content ----
const minorRow = [1, 2, 3, 4].map((n) => bidBox("minor", n)).join("");
const privRow = [1, 2, 3].map((n) => bidBox("private", n)).join("");

const mkLeft = (BOARD_W - MK_ROW_W) / 2;
const minorLeft = (BOARD_W - MINOR_ROW_W) / 2;
const privLeft = (BOARD_W - PRIV_ROW_W) / 2;
const minorsTop = MK_H + BAND_GAP;
const privTop = MK_H + BAND_GAP + BOX_H + BAND_GAP;

const boardInner =
  `<div class="band market" style="left:${mkLeft}mm;top:0">${marketRow()}</div>` +
  `<div class="band minorrow" style="left:${minorLeft}mm;top:${minorsTop}mm">${minorRow}</div>` +
  `<div class="band privrow" style="left:${privLeft}mm;top:${privTop}mm">${privRow}</div>`;

// ---- 3 print pages: each shows one segment, centered on Letter, with bleed +
//      crop marks at the four trim corners. Internal edges bleed into the
//      neighbor's content; outer edges bleed white. ----
const BLEED = 3;
const PAGE_W = 215.9, PAGE_H = 279.4; // US Letter, EXACT (216x279 overflowed -> blank pages)
const trimL = (PAGE_W - SEG_W) / 2;
const trimT = (PAGE_H - BOARD_H) / 2;

function cropTicks(cx, cy, hDir, vDir) {
  const GAP = 1.5, LEN = 4, TH = 0.2;
  const vy = vDir < 0 ? cy - GAP - LEN : cy + GAP;
  const hx = hDir < 0 ? cx - GAP - LEN : cx + GAP;
  return (
    `<div class="cm" style="left:${(cx - TH / 2).toFixed(2)}mm;top:${vy.toFixed(2)}mm;width:${TH}mm;height:${LEN}mm"></div>` +
    `<div class="cm" style="left:${hx.toFixed(2)}mm;top:${(cy - TH / 2).toFixed(2)}mm;width:${LEN}mm;height:${TH}mm"></div>`
  );
}

const section = (i) => {
  const winL = trimL - BLEED, winT = trimT - BLEED;
  const winW = SEG_W + 2 * BLEED, winH = BOARD_H + 2 * BLEED;
  const boardLeft = -i * SEG_W + BLEED;
  const x0 = trimL, x1 = trimL + SEG_W, y0 = trimT, y1 = trimT + BOARD_H;
  const marks =
    cropTicks(x0, y0, -1, -1) + cropTicks(x1, y0, 1, -1) +
    cropTicks(x0, y1, -1, 1) + cropTicks(x1, y1, 1, 1);
  return (
    `<section class="page">` +
    `<div class="bleedwin" style="left:${winL.toFixed(2)}mm;top:${winT.toFixed(2)}mm;width:${winW.toFixed(2)}mm;height:${winH.toFixed(2)}mm">` +
    `<div class="board" style="left:${boardLeft.toFixed(2)}mm;top:${BLEED}mm">${boardInner}</div>` +
    `</div>${marks}` +
    `<div class="pagelbl">18Dragon board mat — segment ${i + 1} of 3</div>` +
    `</section>`
  );
};

const HEAD = `<!doctype html><html><head><meta charset="utf-8">
<title>18Dragon — Board Mat (print, 3 segments)</title>
<style>
  ${FONT_FACE}
  @page { size: letter portrait; margin: 0; }
  *{ box-sizing:border-box; }
  body{ margin:0; background:#fff; font-family:"Leftfield Serif",Georgia,serif; color:#000; }
  .page{ position:relative; width:${PAGE_W}mm; height:${PAGE_H}mm; background:#fff; overflow:hidden;
    break-after:page; }
  .page:last-child{ break-after:auto; }
  /* on-screen preview only — never printed */
  @media screen{
    body{ background:#c8c5bf; }
    .page{ margin:0 auto 8mm; box-shadow:0 2px 10px rgba(0,0,0,.2); }
  }
  .bleedwin{ position:absolute; overflow:hidden; background:#fff; }
  .board{ position:absolute; width:${BOARD_W}mm; height:${BOARD_H}mm; background:#fff; }
  .band{ position:absolute; }
  .cm{ position:absolute; background:#000; z-index:50; }
  .pagelbl{ position:absolute; left:0; bottom:2mm; width:100%; text-align:center;
    font-family:Arial,sans-serif; font-size:7pt; color:#8a857c; }

  /* bid box */
  .box{ display:grid; background:#fff; border:0.6mm solid #000;
    grid-template-columns:${T}mm repeat(${cols - 2},${colW}mm) ${T}mm;
    grid-template-rows:${T}mm repeat(${rows - 2},${rowH}mm) ${T}mm; }
  .tk{ border:0.3mm solid #000; background:#fff; position:relative;
    display:flex; align-items:center; justify-content:center; }
  .ns{ position:absolute; inset:0; width:100%; height:100%; overflow:visible; display:block; }
  .ns text{ font-family:"Leftfield Serif",Georgia,serif; font-size:32pt; text-anchor:middle; }
  .tk.start{ background:#000; }
  .disc{ position:relative; width:13mm; height:13mm; border-radius:50%; background:#fff; }
  .slot{ display:flex; align-items:center; justify-content:center; padding:${GAP}mm; }
  .label{ text-align:center; line-height:1.05; font-size:40pt; letter-spacing:0; }
  .minorrow,.privrow{ display:flex; gap:${BOX_GAP}mm; }

  /* market */
  .market{ display:flex; }
  .mk{ width:${MK_W}mm; height:${MK_H}mm; border:0.3mm solid #000; background:#fff;
    display:flex; flex-direction:column; align-items:center; }
  .mkv{ font-family:"Leftfield Serif",Georgia,serif; font-size:35pt; padding-top:1mm;
    line-height:1; font-variant-numeric:tabular-nums; }
  .mk.red{ background:#d98c85; }
  .mk.end{ background:#bcd6ec; }
  .endg{ writing-mode:vertical-rl; transform:rotate(180deg); margin-top:2mm;
    font-size:12pt; letter-spacing:0.05em; }
  .redbox{ position:absolute; top:0; height:${MK_H}mm; border:1mm solid #c0392b; pointer-events:none; }
  .mk.yl-r{ border-right:none; }
  .mk.yl-l{ border-left:1.4mm solid #e8c000; }
</style></head>`;

// Single-page files — one segment each — go in a segments/ subdir to keep print/
// uncluttered. These print/PDF at TRUE size; a combined multi-page file scales down
// in some browsers' print + in headless page.pdf, so we don't emit one. Deliverable:
// render each segment .html to .pdf, then merge with pdfunite (or run
// tools/merge-board-mat.sh) into print/board-mat.pdf — the single file you print.
const stem = basename(outPath).replace(/\.html$/, ""); // "board-mat"
const segDir = `${dirname(outPath)}/${stem}-segments`;
mkdirSync(segDir, { recursive: true });
[0, 1, 2].forEach((i) =>
  writeFileSync(`${segDir}/${stem}-${i + 1}.html`, `${HEAD}<body>${section(i)}</body></html>`),
);
console.log(
  `wrote ${segDir}/${stem}-{1,2,3}.html (print, single-page, true size); ` +
    `seg ${SEG_W.toFixed(1)}x${BOARD_H.toFixed(1)}mm + ${BLEED}mm bleed + crop marks (board ${BOARD_W}x${BOARD_H.toFixed(1)}mm). ` +
    `Render each to PDF, then merge with tools/merge-board-mat.sh -> ${dirname(outPath)}/${stem}.pdf`,
);
