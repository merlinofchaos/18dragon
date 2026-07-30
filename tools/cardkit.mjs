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
