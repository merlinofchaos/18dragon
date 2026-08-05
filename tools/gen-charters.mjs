#!/usr/bin/env node
// Generate 18Dragon company charters from companies.json (via cardkit).
// Phase 1: MAJOR charters (C17a). Minor charters (C17b) are added next.
//
// Usage: node tools/gen-charters.mjs [data/companies.json] [print/charters-major.html] [out-content.html]
//
// Major mat: 178 x 127 mm (7x5in landscape). US Letter PORTRAIT, 2 mats/page.
// Design = docs/mockups/charter-mockup.html (approved). Serif, coin glyph.

import { readFileSync, writeFileSync } from "node:fs";
import { gp, coinize, COIN_CSS, companyLogo, LOGO_CSS } from "./cardkit.mjs";

const [, , inPath = "data/companies.json", outMajor = "print/charters-major.html", contentMajor,
  outMinor = "print/charters-minor.html", contentMinor] = process.argv;

const esc = (s) =>
  String(s ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const data = JSON.parse(readFileSync(inPath, "utf8"));
const majors = data.majors;
const minors = data.minors || [];

const REGION = { A: "Verantum", N: "Caelimor", G: "Gördum", M: "Muravel", V: "Varstova" };
const REGION_COLOR = { A: "#7B2D8B", N: "#56B4E9", G: "#E69F00", M: "#D55E00", V: "#009E73" };

// Shared phase/train reference table (identical on every charter).
const PHASES = [
  { ph: "1 / L", cls: "yellow", lim: "2/4", num: "22", cost: 60, rust: null, notes: () => `Upgrades to 2 for ${gp(80)} · minors only` },
  { ph: "2", cls: "yellow", lim: "2/4", num: "(22)", cost: 120, rust: null, notes: () => "Majors form via merger · incremental cap · 1 yellow tile" },
  { ph: "3", cls: "green", lim: "2/4", num: "9", cost: 200, rust: { t: "L", cls: "yellow" }, notes: () => "2 yellow tiles or 1 upgrade" },
  { ph: "4", cls: "green", lim: "1/3", num: "6", cost: 300, rust: { t: "2", cls: "yellow" }, notes: () => "" },
  { ph: "5", cls: "brown", lim: "1/2", num: "3", cost: 500, rust: null, notes: () => "Majors may form directly · float on 50% (incremental cap)" },
  { ph: "6", cls: "brown", lim: "1/2", num: "3", cost: 600, rust: { t: "3", cls: "green" }, notes: () => "Majors float on 50% · full capitalisation" },
  { ph: "7", cls: "gray", lim: "1/2", num: "20", cost: 750, rust: { t: "4", cls: "green" }, notes: () => "gray tiles" },
  { ph: "E", cls: "gray", lim: "1/2", num: "20", cost: 1000, rust: null, notes: () => "" },
];

const OR_ACTIONS = [
  "First-turn housekeeping",
  "Acquire private companies",
  `Lay or upgrade track <span class="hl">(new yellow requires region permit)</span>`,
  "Check for connection to destination",
  `Place one station marker (${gp(100)})`,
  "Run trains",
  "Pay, split, or withhold dividends",
  "Buy trains",
  "Acquire a minor",
  "Issue or redeem shares",
];

function trainsTable() {
  const rows = PHASES.map((p) => {
    const rust = p.rust ? `<td class="ph ${p.rust.cls}">${p.rust.t}</td>` : "<td></td>";
    return `<tr><td class="ph ${p.cls}">${p.ph}</td><td>${p.lim}</td><td>${p.num}</td>` +
      `<td>${gp(p.cost)}</td>${rust}<td class="notes">${p.notes()}</td></tr>`;
  }).join("");
  return `<table class="tr"><tr><th>Phase</th><th>Limit</th><th>#</th><th>Cost</th><th>Rust</th><th>Notes</th></tr>${rows}</table>`;
}

// shared company logo (cardkit) — same code as certs/stickers; C45 makes it real
const disc = (m, extra = "") => companyLogo(m, extra);

function majorMat(m) {
  const avail = [disc(m), ...Array(m.tokens.available - 1).fill(`<div class="disc ring">–</div>`)]
    .map((d) => `<div class="tcol">${d}<small>${gp(100)}</small></div>`)
    .join("");
  const exch = Array(m.tokens.exchange).fill(disc(m, "opacity:.5;")).join("");
  const dest = m.destination;
  return `
  <div class="mat major">
    <div class="hdr" style="background:${m.colors.primary};">
      <div class="nm">${esc(m.name)}</div><div class="ab">${esc(m.abbrev)}</div>
    </div>
    <div class="tok">
      <div class="cell">
        <div class="rglabel" style="color:${REGION_COLOR[m.region]};"><b>${esc(m.region)}</b> ${esc(REGION[m.region])}</div>
        <div class="tcol">${disc(m)}<small>Home</small></div>
        <div class="tcol"><div class="disc dest">★</div><small>Dest · <b>${esc(dest.hex)}</b></small></div>
      </div>
      <div class="cell"><span class="sec-label">Available</span>${avail}</div>
      <div class="cell" style="margin-left:auto;">
        <div class="exch"><div class="row">${exch}</div><div class="bracket">⌞ Exchange Tokens ⌟</div></div>
      </div>
    </div>
    <div class="body">
      <div class="left"><div class="sect">Trains</div>${trainsTable()}</div>
      <div class="right">
        <div class="sect">Treasury</div>
        <div class="orh">Operating Round Actions</div>
        <ul class="act">${OR_ACTIONS.map((a) => `<li>${a}</li>`).join("")}</ul>
        <div class="dest-note"><b>Destination:</b> ${esc(dest.city)} (${esc(dest.region)}). A Home→Destination run <b>doubles</b> ${esc(dest.city)}'s value.</div>
      </div>
    </div>
  </div>`;
}

// ---- minor charter (152x76mm) ----
function minorTrainsTable() {
  const rows = PHASES.map((p) => {
    const rust = p.rust ? `<td class="ph ${p.rust.cls}">${p.rust.t}</td>` : "<td></td>";
    return `<tr><td class="ph ${p.cls}">${p.ph}</td><td>${p.lim}</td><td>${p.num}</td><td>${gp(p.cost)}</td>${rust}</tr>`;
  }).join("");
  return `<table class="tr mini"><tr><th>Ph</th><th>Lim</th><th>#</th><th>Cost</th><th>Rust</th></tr>${rows}</table>`;
}
function minorMat(m) {
  const rc = REGION_COLOR[m.region];
  const power = m.power
    ? `<div class="power"><b>⚙ Power:</b> ${coinize(esc(m.power.text))}</div>` : "";
  return `
  <div class="mat minor">
    <div class="top">
      <div class="numbadge" style="background:${rc};">${esc(m.number)}</div>
      <div class="spine">${esc(m.name)}</div>
      <div class="mid">
        <div class="start"><small>Starts at</small> <span class="city">${esc(m.home_city)}</span> <small>· <b>${esc(m.hex)}</b></small></div>
        ${minorTrainsTable()}
      </div>
      <div class="permit" style="background:${rc};">
        <div class="lbl">PERMIT</div><div class="let">${esc(m.region)}</div><div class="rg">${esc(REGION[m.region])}</div>
      </div>
    </div>
    ${power}
  </div>`;
}

// ---- print-cut layout: N mats stacked & touching per US Letter portrait page,
// square corners, no printed border, crop marks in the margins ----
const PAGE_W = 216, PAGE_H = 279, T = 4;
function makePages(items, matFn, matW, matH, per) {
  const ml = (PAGE_W - matW) / 2, blockH = matH * per, mt = (PAGE_H - blockH) / 2;
  const crop = () => {
    let s = "";
    for (let r = 0; r <= per; r++) {
      const y = mt + r * matH;
      s += `<div class="crop h" style="top:${y}mm;left:${ml - T - 1}mm"></div><div class="crop h" style="top:${y}mm;left:${ml + matW + 1}mm"></div>`;
    }
    for (const x of [ml, ml + matW]) {
      s += `<div class="crop v" style="left:${x}mm;top:${mt - T - 1}mm"></div><div class="crop v" style="left:${x}mm;top:${mt + blockH + 1}mm"></div>`;
    }
    return s;
  };
  const pages = [];
  for (let i = 0; i < items.length; i += per) {
    const stack = items.slice(i, i + per).map(matFn).join("");
    pages.push(`<section class="page">${crop()}<div class="stack" style="top:${mt}mm;left:${ml}mm">${stack}</div></section>`);
  }
  return pages.join("\n");
}
const majorPages = makePages(majors, majorMat, 178, 127, 2);
const minorPages = makePages(minors, minorMat, 152, 76, 3);

const style = `
  :root{ --ink:#1c1a17; --line:#2a2723; --paper:#fbf9f4;
    --serif:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif; }
  *{ box-sizing:border-box; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  ${COIN_CSS}
  body{ margin:0; background:#c9ccd2; color:var(--ink); font-family:var(--serif); }
  .page{ position:relative; width:216mm; height:279mm; background:#fff; margin:8mm auto; box-shadow:0 2px 10px rgba(0,0,0,.25); }
  .stack{ position:absolute; display:flex; flex-direction:column; }
  .crop{ position:absolute; background:#000; }
  .crop.v{ width:0.15mm; height:4mm; } .crop.h{ height:0.15mm; width:4mm; }
  /* no printed border / rounded corners — cut on the crop marks */
  .mat{ background:var(--paper); overflow:hidden; }
  .major{ width:178mm; height:127mm; display:flex; flex-direction:column; }
  .hdr{ padding:8px 16px; color:#fff; display:flex; align-items:center; justify-content:space-between; gap:16px; flex:0 0 auto; }
  .hdr .nm{ font-size:30px; font-weight:800; text-shadow:0 1px 0 rgba(0,0,0,.28); }
  .hdr .ab{ font-weight:800; font-size:18px; letter-spacing:.05em; background:rgba(255,255,255,.94); color:#111; border-radius:7px; padding:4px 12px; border:1px solid rgba(0,0,0,.15); }
  .tok{ display:flex; align-items:stretch; border-top:2px solid var(--line); border-bottom:2px solid var(--line); flex:0 0 auto; }
  .tok .cell{ padding:6px 14px; display:flex; align-items:center; gap:14px; border-right:1.5px solid #cfc8ba; }
  .tok .cell:last-child{ border-right:0; }
  .tcol{ display:flex; flex-direction:column; align-items:center; gap:2px; }
  .tcol small{ font-size:11px; color:#5a554d; } .tcol small b{ color:#26221c; }
  ${LOGO_CSS}
  .clogo{ width:38px; height:38px; font-size:12px; }
  .disc{ width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center;
    font-weight:800; font-size:12px; color:#fff; border:2px solid rgba(0,0,0,.28); }
  .disc.ring{ background:#fff; color:#b0a99e; border:2px dashed #b3ada2; }
  .disc.dest{ background:#111; }
  .rglabel{ writing-mode:vertical-rl; transform:rotate(180deg); font-weight:700; font-size:11px; letter-spacing:.02em;
    white-space:nowrap; align-self:center; padding-left:1mm; } .rglabel b{ font-size:15px; }
  .sec-label{ writing-mode:vertical-rl; transform:rotate(180deg); font-size:12px; letter-spacing:.06em; text-transform:uppercase; color:#5a554d; }
  .exch{ display:flex; flex-direction:column; align-items:center; gap:5px; }
  .exch .row{ display:flex; gap:10px; }
  .exch .bracket{ font-size:11px; letter-spacing:.05em; text-transform:uppercase; color:#5a554d; }
  .body{ display:grid; grid-template-columns:1.4fr 1fr; flex:1 1 auto; min-height:0; overflow:hidden; }
  .body > div{ padding:8px 16px 5mm; overflow:hidden; }
  .body .left{ border-right:2px solid var(--line); }
  .sect{ font-size:21px; font-weight:800; text-align:center; margin:0 0 5px; }
  .orh{ font-weight:700; font-size:13px; }
  table.tr{ width:100%; border-collapse:collapse; font-family:var(--serif); font-size:11.5px; }
  table.tr th{ background:#efe9dc; border:1px solid #b9b2a2; padding:2px 6px; font-size:10.5px; }
  table.tr td{ border:1px solid #cfc8ba; padding:2px 6px; text-align:center; }
  table.tr td.notes{ text-align:left; font-size:10.5px; line-height:1.2; }
  .ph{ font-weight:800; }
  .yellow{ background:#f3d34e; } .green{ background:#5aa84b; color:#fff; }
  .brown{ background:#c07a3c; color:#fff; } .gray{ background:#9a958c; color:#fff; }
  ul.act{ font-size:11.5px; line-height:1.32; margin:3px 0 0; padding-left:17px; }
  ul.act li{ margin:1px 0; } .hl{ color:#7a5a10; }
  .dest-note{ font-size:11px; color:#4a4436; margin-top:6px; background:#f0ece1; border-left:3px solid #b9b2a2; padding:5px 8px; }

  /* minor 152x76mm */
  .minor{ width:152mm; height:76mm; display:flex; flex-direction:column; }
  .minor .top{ display:flex; align-items:stretch; flex:1 1 auto; min-height:0; }
  .minor .numbadge{ width:52px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:30px; color:#fff; border-right:2px solid var(--line); flex:0 0 auto; }
  .minor .spine{ writing-mode:vertical-rl; transform:rotate(180deg); padding:6px 3px; font-weight:800; font-size:14px; text-align:center; border-right:1.5px solid #cfc8ba; flex:0 0 auto; display:flex; align-items:center; justify-content:center; }
  .minor .mid{ flex:1 1 auto; padding:7px 10px; display:flex; flex-direction:column; gap:5px; min-width:0; }
  .minor .start small{ font-size:10px; color:#5a554d; } .minor .start .city{ font-size:16px; font-weight:800; } .minor .start b{ color:#26221c; }
  table.tr.mini{ font-size:10px; } table.tr.mini td, table.tr.mini th{ padding:1.5px 4px; }
  .minor .permit{ flex:0 0 auto; width:78px; border-left:2px solid var(--line); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; }
  .minor .permit .lbl{ font-size:12px; font-weight:800; letter-spacing:.12em; }
  .minor .permit .let{ font-size:46px; font-weight:800; line-height:1; text-shadow:0 1px 0 rgba(0,0,0,.3); }
  .minor .permit .rg{ font-size:9px; opacity:.9; }
  .minor .power{ flex:0 0 auto; padding:6px 10px; border-top:2px solid var(--line); background:#fdf6e3; font-size:10.5px; line-height:1.4; }
  .minor .power b{ color:#7a5a10; }
  @media print{
    body{ background:#fff; }
    .page{ margin:0; box-shadow:none; page-break-after:always; }
    @page{ size:letter portrait; margin:0; }
  }
`;

function emit(title, pagesHtml) {
  const content = `<style>${style}</style>\n<main>${pagesHtml}\n</main>\n`;
  const standalone = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>18Dragon — ${title}</title></head>
<body>\n${content}</body></html>\n`;
  return { content, standalone };
}

const maj = emit("Major Charters", majorPages);
writeFileSync(outMajor, maj.standalone);
if (contentMajor) writeFileSync(contentMajor, maj.content);

const min = emit("Minor Charters", minorPages);
writeFileSync(outMinor, min.standalone);
if (contentMinor) writeFileSync(contentMinor, min.content);

console.log(
  `Wrote ${outMajor}: ${majors.length} major charters (2/page, 178x127mm); ` +
    `${outMinor}: ${minors.length} minor charters (3/page, 152x76mm).`,
);
