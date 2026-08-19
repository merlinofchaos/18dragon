// Shared helpers for 18Dragon card generators (privates, trains, …).

import { readFileSync } from "node:fs";

// ---- shared type + palette (C50) ----
// Leftfield Serif (display face) embedded as a data URI, resolved relative to this
// file so it works regardless of the caller's cwd. Include once per generated doc.
const _leftfieldB64 = readFileSync(
  new URL("../fonts/LeftfieldSerif-Regular.otf", import.meta.url),
).toString("base64");
export const FONT_FACE = `@font-face{font-family:"Leftfield Serif";src:url(data:font/otf;base64,${_leftfieldB64}) format("opentype");font-weight:400;font-style:normal;}`;

// The card family's design tokens (privates, trains, certs share this vocabulary).
export const CARD_ROOT_CSS = `
  :root{
    --ink:#1c1a17; --ink-2:#4a443b; --paper:#f6f1e3; --paper-2:#efe7d3;
    --line:#b9ae94; --gold:#c9a227; --gold-lt:#f2cf4c;
    --serif:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif;
    --disp:"Leftfield Serif",Georgia,serif;
    --sans:"Helvetica Neue",Arial,system-ui,sans-serif;
  }`;

// Gold-coin glyph used as the currency symbol. No value inside — it sits next to
// the number like "$". Sized to the surrounding text via the .gp-coin CSS (1em).
export const COIN = `<svg class="gp-coin" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="gpcoin" x1="0.1" y1="0.05" x2="0.9" y2="0.95"><stop offset="0" stop-color="#fdeeae"/><stop offset="0.4" stop-color="#e8c556"/><stop offset="0.52" stop-color="#f6e08e"/><stop offset="0.62" stop-color="#d7ab34"/><stop offset="1" stop-color="#b28821"/></linearGradient></defs><circle cx="12" cy="12" r="11.2" fill="#9c7419"/><circle cx="12" cy="12" r="9.7" fill="url(#gpcoin)"/><circle cx="12" cy="12" r="9.7" fill="none" stroke="#fbe6ab" stroke-width="0.7" opacity="0.7"/><ellipse cx="8.6" cy="7.8" rx="4.4" ry="2.8" fill="#ffffff" opacity="0.25"/></svg>`;

// gp(v) -> coin glyph followed by the value (replaces "$v" / "v gp").
export const gp = (v) => `<span class="gp">${COIN}<span class="gp-v">${v}</span></span>`;

// coinize(text): filter that swaps currency in arbitrary (already HTML-escaped)
// text for the coin glyph — "$30" -> 🪙30, "80gp" -> 🪙80. Leaves non-currency
// numbers (e.g. "+30", "1 stop") untouched.
export const coinize = (s) =>
  String(s ?? "")
    .replace(/\$(\d+)/g, (_, n) => gp(n))
    .replace(/(\d+)\s*gp\b/g, (_, n) => gp(n));

// CSS for the coin glyph + amount. Include once in each generator's <style>.
export const COIN_CSS = `
  .gp { display: inline-flex; align-items: center; gap: 0.12em; white-space: nowrap; }
  .gp-coin { width: 0.92em; height: 0.92em; flex: 0 0 auto; }
  .gp-v { font-variant-numeric: tabular-nums; }
`;

const esc = (s) =>
  String(s ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

// ---- shared company logo (charters, certs, and later stickers use the SAME code) ----
// Placeholder = a company-color disc with the abbrev; C45 replaces the inner with a
// real generated logo. Size it via the `.clogo` rule in each generator's CSS.
export const companyLogo = (m, extra = "") =>
  `<span class="clogo" style="background:${m.colors.primary};${extra}">${esc(m.abbrev)}</span>`;
export const LOGO_CSS = `
  .clogo{ box-sizing:border-box; border-radius:50%; color:#fff; border:2px solid rgba(0,0,0,.28);
    display:flex; align-items:center; justify-content:center; font-weight:800; }
`;

// ---- train-card face (C50: measured, same anatomy — used by the train deck AND the
//      perm-train private backs). Returns a FULL 67×44 `.tc` card. `t` = a trains.json
//      train (or its `back`): { name, phase_color, cost, rust, rust_color, permanent, note }.
//      One fixed grid: 3.5mm margin box, 15mm header band, 26mm numeral slot @48pt on one
//      baseline, labelled COST, fixed-height note + banner, phase color on a top edge bar.
export function trainFace(t) {
  const banner = t.permanent
    ? `<span class="banner perm">Permanent</span>`
    : `<span class="banner rust-${t.rust_color}">Rusts with ${esc(t.rust)}</span>`;
  const cost = t.cost
    ? `<span class="cost"><i>COST</i><b>${gp(t.cost)}</b></span>`
    : `<span class="cost"><i>&nbsp;</i><b class="nofee">not for sale</b></span>`;
  return `
  <div class="tc c-${t.phase_color}">
    <div class="head">
      <span class="num">${esc(t.name)}</span>
      ${cost}
    </div>
    <div class="mid"></div>
    <div class="foot">
      <div class="note">${t.note ? coinize(esc(t.note)) : ""}</div>
      ${banner}
    </div>
  </div>`;
}

// Train-card styling (C50). Include once per doc; needs FONT_FACE + CARD_ROOT_CSS +
// COIN_CSS alongside it. Square corners, no preview shadow — this is the print face.
export const TRAIN_CSS = `
  /* No outer card border — crop marks are the only cut guides. The phase top-bar stays.
     Padding is 4.5mm so nothing sits inside the 6.5mm corner-rounder arc (C54). */
  .tc{ width:67mm; height:44mm; position:relative; overflow:hidden;
    background:linear-gradient(180deg,#fffdf6 0%,var(--paper) 55%,var(--paper-2) 100%);
    color:var(--ink); font-family:var(--serif); padding:4.5mm; display:flex; flex-direction:column; }
  /* phase color rides a top edge bar + the numeral; nothing else is tinted */
  .tc::before{ content:""; position:absolute; left:0; right:0; top:0; height:1.6mm; background:var(--pc); }
  .c-yellow{ --pc:#f0cf5c; --pcx:#c69b12; }
  .c-green{  --pc:#8ec27f; --pcx:#2f7a2a; }
  .c-brown{  --pc:#c39a6b; --pcx:#8a5a2b; }
  .c-gray{   --pc:#b6b3ab; --pcx:#5f5c56; }
  .tc .head{ display:flex; align-items:flex-end; justify-content:space-between; gap:2mm; height:15mm; }
  .tc .num{ font-family:var(--disp); font-size:48pt; line-height:.72; color:var(--pcx);
    -webkit-text-stroke:0.35mm #1c1a17; paint-order:stroke fill; width:26mm; display:block; }
  .tc .cost{ display:flex; flex-direction:column; align-items:flex-end; line-height:1; }
  .tc .cost i{ font-family:var(--sans); font-style:normal; font-size:5pt; letter-spacing:.12em;
    color:#6a6357; margin-bottom:.8mm; }
  .tc .cost b{ font-family:var(--disp); font-weight:400; font-size:18pt; line-height:.72; }
  .tc .cost .gp-coin{ width:.78em; height:.78em; }
  .tc .cost .nofee{ font-family:var(--sans); font-size:6pt; letter-spacing:.08em;
    text-transform:uppercase; color:#6a6357; padding-bottom:1.2mm; }
  .tc .mid{ flex:1; }
  .tc .foot{ display:flex; flex-direction:column; align-items:center; gap:1.6mm; }
  .tc .note{ width:52mm; min-height:3.6mm; text-align:center; font-size:7pt; line-height:1.25;
    color:#453f34; text-wrap:balance; }
  .tc .banner{ height:7.2mm; min-width:30mm; padding:0 3.4mm; border-radius:1.2mm; display:inline-flex;
    align-items:center; justify-content:center; font-family:var(--sans); font-weight:700; font-size:8.5pt;
    letter-spacing:.05em; text-transform:uppercase; white-space:nowrap; }
  .tc .banner.perm{ background:#1c1a17; color:#f2cf4c; }
  .tc .banner.rust-green{ background:#3a7d1e; color:#fff; }
  .tc .banner.rust-brown{ background:#8a5a2b; color:#fff; }
  .tc .banner.rust-gray{ background:#5f5c56; color:#fff; }
  .tc .banner.rust-yellow{ background:#f2cf4c; color:#1c1a17; }
`;
