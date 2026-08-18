#!/usr/bin/env node
// Generate 18Dragon certificates from companies.json (via cardkit).
// Major certs (C25a): 1 President's 20%/2-share + 8 regular 10%/1-share per major.
// Minor certs (C25b): 1 per minor, single card = Two Shares / 50%.
//
// Usage: node tools/gen-certs.mjs [data/companies.json] [print/certs-major.html] [maj-content] [print/certs-minor.html] [min-content]
//
// Card 67x44mm; US Letter LANDSCAPE, 3x4 = 12/page grid, print-cut (no border, crop marks).
// Design = docs/mockups/cert-mockup.html (approved v8).

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { companyLogo, LOGO_CSS } from "./cardkit.mjs";

// Standalone/preview output only — the printable cert deck is the unified
// print/cards-single.html from gen-cards.mjs. Defaults write to the gitignored
// preview/ so they don't clutter print/ (which holds deliverables only).
const [, , inPath = "data/companies.json",
  outMajor = "preview/certs-major.html", cMajor,
  outMinor = "preview/certs-minor.html", cMinor] = process.argv;

const esc = (s) =>
  String(s ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const data = JSON.parse(readFileSync(inPath, "utf8"));
const REGION = { A: "Verantum", N: "Caelimor", G: "Gördum", M: "Muravel", V: "Varstova" };
const REGION_COLOR = { A: "#7B2D8B", N: "#56B4E9", G: "#E69F00", M: "#D55E00", V: "#009E73" };

// ---- card faces ----
export function majorCert(m, president) {
  const logos = president ? companyLogo(m) + companyLogo(m) : companyLogo(m);
  const banner = president ? `<div class="presbar">President's Certificate</div>` : "";
  const shares = president ? "Two Shares" : "One Share";
  const pct = president ? "20%" : "10%";
  return `
  <div class="cert">
    <div class="band">
      <div class="stripes"><div class="stripe" style="background:${m.colors.primary};"></div></div>
      <div class="logos">${logos}</div>
    </div>
    <div class="main">
      <div class="cname">${esc(m.name)}</div>
      ${banner}
      <div class="foot"><div class="shares">${shares}</div><div class="pct">${pct}</div></div>
    </div>
  </div>`;
}
export function minorCert(mn) {
  const rc = REGION_COLOR[mn.region];
  const twoDigit = String(mn.number).length > 1 ? " two" : "";
  return `
  <div class="cert">
    <div class="band">
      <div class="stripes minor-band"><div class="g1"></div><div class="rc" style="background:${rc};"></div><div class="g2"></div></div>
      <div class="logos"><div class="numbadge${twoDigit}">${esc(mn.number)}</div></div>
    </div>
    <div class="main">
      <div class="cname">${esc(mn.name)}</div>
      <div class="permitbar" style="background:${rc};"><span class="pl">${esc(mn.region)}</span> Permit · ${esc(REGION[mn.region])}</div>
      <div class="foot"><div class="shares">Two Shares</div><div class="pct">50%</div></div>
    </div>
  </div>`;
}

// ---- print-cut grid: 3x4 = 12 cards / US Letter LANDSCAPE (safe margins;
//      matches gen-private/train orientation for the C49 unified print) ----
// US Letter landscape, EXACT: 216mm is 0.1mm TALLER than the page (215.9) and made
// every sheet spill onto a blank following page.
const PAGE_W = 279.4, PAGE_H = 215.9, COLS = 3, ROWS = 4, CW = 67, CH = 44, T = 4;
const ML = (PAGE_W - COLS * CW) / 2, GW = COLS * CW, GH = ROWS * CH, MT = (PAGE_H - GH) / 2;
function cropMarks() {
  let s = "";
  for (let c = 0; c <= COLS; c++) {
    const x = ML + c * CW;
    s += `<div class="crop v" style="left:${x}mm;top:${MT - T - 1}mm"></div><div class="crop v" style="left:${x}mm;top:${MT + GH + 1}mm"></div>`;
  }
  for (let r = 0; r <= ROWS; r++) {
    const y = MT + r * CH;
    s += `<div class="crop h" style="top:${y}mm;left:${ML - T - 1}mm"></div><div class="crop h" style="top:${y}mm;left:${ML + GW + 1}mm"></div>`;
  }
  return s;
}
export function makePages(cards) {
  const per = COLS * ROWS, pages = [];
  for (let i = 0; i < cards.length; i += per) {
    const cells = cards.slice(i, i + per).join("");
    pages.push(`<section class="page">${cropMarks()}<div class="grid" style="top:${MT}mm;left:${ML}mm">${cells}</div></section>`);
  }
  return pages.join("\n");
}

const majorCards = data.majors.flatMap((m) => [
  majorCert(m, true),
  ...Array(8).fill(0).map(() => majorCert(m, false)),
]);
const minorCards = data.minors.map(minorCert);

export const CERT_STYLE = `
  :root{ --ink:#1c1a17; --paper:#f7f4ec; --serif:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif; }
  *{ box-sizing:border-box; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  ${LOGO_CSS}
  body{ margin:0; background:#c9ccd2; color:var(--ink); font-family:var(--serif); }
  .page{ position:relative; width:${PAGE_W}mm; height:${PAGE_H}mm; background:#fff; margin:8mm auto; box-shadow:0 2px 10px rgba(0,0,0,.25); }
  .grid{ position:absolute; display:grid; grid-template-columns:repeat(${COLS}, ${CW}mm); grid-auto-rows:${CH}mm; }
  .crop{ position:absolute; background:#000; } .crop.v{ width:0.15mm; height:${T}mm; } .crop.h{ height:0.15mm; width:${T}mm; }

  .cert{ width:${CW}mm; height:${CH}mm; background:var(--paper); overflow:hidden; display:flex; gap:0; }
  .band{ position:relative; flex:0 0 auto; width:12mm; height:100%; overflow:hidden; margin-left:3mm; }
  .stripes{ position:absolute; inset:0; display:flex; justify-content:center; gap:1.4mm; }
  .stripe{ width:4.5mm; height:100%; }
  .stripes.minor-band{ gap:0; }
  .stripes.minor-band .g1{ width:3.4mm; background:#c8c5bd; border-left:1px solid #000; }
  .stripes.minor-band .rc{ width:2mm; border-left:1px solid #000; border-right:1px solid #000; }
  .stripes.minor-band .g2{ width:1.9mm; background:#c8c5bd; border-right:1px solid #000; }
  .logos{ position:absolute; inset:0; padding:2mm 0; display:flex; flex-direction:column; align-items:center; justify-content:space-evenly; }
  .clogo{ width:10mm; height:10mm; font-size:9px; }
  .numbadge{ width:9.5mm; height:9.5mm; border-radius:50%; background:#fff; border:1.4px solid #333;
    display:flex; align-items:center; justify-content:center; font-weight:800; font-size:17px; }
  .numbadge.two{ font-size:13px; }

  .main{ position:relative; flex:1 1 auto; padding:3mm 4mm; display:flex; flex-direction:column; min-width:0; }
  .cname{ flex:1 1 auto; display:flex; align-items:center; justify-content:center; text-align:center; font-size:15px; font-weight:800; line-height:1.14; }
  /* the bar is absolute + centered so the title/foot lay out the SAME with or
     without it — the title never gets pushed up. */
  .presbar{ position:absolute; left:0; right:0; bottom:10.5mm; margin-inline:auto; width:fit-content;
    background:#f2cf4c; color:#141210; font-weight:800; font-size:8px;
    white-space:nowrap; letter-spacing:.03em; text-transform:uppercase; padding:0.8mm 2.4mm; border-radius:1mm; }
  .permitbar{ position:absolute; left:0; right:0; bottom:10.5mm; margin-inline:auto; width:fit-content;
    color:#fff; font-weight:800; font-size:9px; letter-spacing:.04em;
    text-transform:uppercase; padding:0.7mm 2.4mm; border-radius:1mm; display:flex; align-items:center; gap:1.2mm; }
  .permitbar .pl{ font-size:13px; line-height:1; }
  .foot{ display:flex; justify-content:space-between; align-items:baseline; }
  .foot .shares{ font-size:11px; } .foot .pct{ font-size:16px; font-weight:800; }
  @media print{ body{ background:#fff; } .page{ margin:0; box-shadow:none; break-after:page; } .page:last-child{ break-after:auto; } @page{ size:letter landscape; margin:0; } }
`;

function emit(title, pagesHtml) {
  const content = `<style>${CERT_STYLE}</style>\n<main>${pagesHtml}\n</main>\n`;
  const standalone = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>18Dragon — ${title}</title></head>
<body>\n${content}</body></html>\n`;
  return { content, standalone };
}

// Run the file writes only when invoked directly (not when imported by gen-cards.mjs).
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  mkdirSync(dirname(outMajor), { recursive: true });
  mkdirSync(dirname(outMinor), { recursive: true });
  const maj = emit("Major Certificates", makePages(majorCards));
  writeFileSync(outMajor, maj.standalone);
  if (cMajor) writeFileSync(cMajor, maj.content);
  const min = emit("Minor Certificates", makePages(minorCards));
  writeFileSync(outMinor, min.standalone);
  if (cMinor) writeFileSync(cMinor, min.content);

  console.log(
    `Wrote ${outMajor}: ${majorCards.length} major certs; ${outMinor}: ${minorCards.length} minor certs (67x44mm, 12/page landscape).`,
  );
}
