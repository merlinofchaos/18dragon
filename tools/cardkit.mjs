// Shared helpers for 18Dragon card generators (privates, trains, …).

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

// ---- shared train-card faces (used by the train deck AND private perm-train backs) ----
// Inner HTML for a train face. `t` = a trains.json train (or its `back`):
//   { name, phase_color: yellow|green|brown|gray, cost, rust, rust_color, permanent, note }
export function trainFace(t) {
  const cost = t.cost ? `<div class="tcost">${gp(t.cost)}</div>` : "";
  const note = t.note ? `<div class="tnote">${coinize(esc(t.note))}</div>` : "";
  const banner = t.permanent
    ? `<span class="tbanner perm">Permanent</span>`
    : `<span class="tbanner rust-${t.rust_color}">Rusted by ${esc(t.rust)}</span>`;
  return (
    `<div class="tnum ${t.phase_color}">${esc(t.name)}</div>${cost}` +
    `<div class="tbottom">${note}${banner}</div>`
  );
}

// Uniform reverse for non-two-sided deck cards, so duplex sheets print cleanly.
export function trainBackUniform() {
  return `<div class="tback"><span class="tback-name">18Dragon</span><span class="tback-sub">Train</span></div>`;
}

// Train-card styling. Include once in each generator's <style>.
export const TRAIN_CSS = `
  .tcard { background: #fff; position: relative; display: flex; flex-direction: column; }
  .tnum { position: absolute; top: 2mm; left: 3mm; font-size: 20pt; font-weight: 800;
    line-height: 1; -webkit-text-stroke: 0.45mm #000; paint-order: stroke fill; }
  .tnum.yellow { color: #f4c518; } .tnum.green { color: #34992f; }
  .tnum.brown { color: #9a6427; } .tnum.gray { color: #7d7d7d; }
  .tcost { position: absolute; top: 2.6mm; right: 3mm; font-size: 12pt; font-weight: 700; color: #2a2010; }
  .tbottom { flex: 1; display: flex; flex-direction: column; align-items: center;
    justify-content: flex-end; gap: 0.8mm; padding-bottom: 3.5mm; }
  .tnote { text-align: center; font-family: system-ui, sans-serif; font-size: 4.4pt; color: #555; margin: 0 3mm; }
  .tbanner { display: inline-block; font-family: system-ui, sans-serif; font-weight: 700; font-size: 6.5pt;
    letter-spacing: .5px; text-transform: uppercase; padding: 0.9mm 3mm; border-radius: 1.2mm; }
  .tbanner.perm { background: #f2cf4c; color: #141210; }
  .tbanner.rust-yellow { background: #f2cf4c; color: #141210; }
  .tbanner.rust-green { background: #3a7d1e; color: #fff; }
  .tbanner.rust-brown { background: #8a5a2b; color: #fff; }
  .tbanner.rust-gray { background: #6b6b6b; color: #fff; }
  .tback { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 0.5mm; background: #f7f3e8; }
  .tback-name { font-size: 10pt; font-weight: 700; color: #8a5a2b; letter-spacing: .5px; }
  .tback-sub { font-family: system-ui, sans-serif; font-size: 5pt; letter-spacing: 2px;
    text-transform: uppercase; color: #b08a4a; }
`;
