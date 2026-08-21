// gen-rulebook.mjs — build the 18Dragon rulebook (C54).
//
//   node tools/gen-rulebook.mjs            # → docs/rulebook.{html,pdf,epub}
//   node tools/gen-rulebook.mjs --no-pdf   # skip the (slow) Chrome PDF step
//
// PIPELINE (markdown source → 2-column US-Letter PDF + reflowable EPUB):
//   docs/rulebook.md
//     ── pandoc → HTML body (+ TOC) ──┐
//                                     ├─ wrap in book template (Paged.js + book.css)
//     tools/rulebook/book.css ────────┘   → docs/rulebook.html
//                                          → headless Chrome --print-to-pdf → rulebook.pdf
//     ── pandoc (+ epub.css) ─────────────→ docs/rulebook.epub
//
// PREREQS: pandoc (`brew install pandoc`), Google Chrome. Paged.js is vendored at
// tools/vendor/paged.polyfill.js (no CDN at build or run time).
//
// DELTA CONVENTION (what C23 authors): mark 1822-differing rules with pandoc attributes —
//   inline  [changed text]{.delta}
//   block   ::: {.delta}\n …\n :::
// They render neutral-blue in both PDF and EPUB.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const p = (...s) => resolve(ROOT, ...s);
const SRC = p("docs/rulebook.md");
const noPdf = process.argv.includes("--no-pdf");

const TITLE = "18Dragon";
const SUBTITLE = "Railways in a Fantasy Land";

// 1. markdown → HTML fragment (TOC + body) via pandoc
const frag = execFileSync(
  "pandoc",
  [SRC, "--toc", "--toc-depth=2", "-f", "markdown", "-t", "html5",
   "-s", "--template", p("tools/rulebook/fragment.html"),
   "--resource-path", p("docs")],
  { encoding: "utf8" },
);

// split the pandoc TOC (<nav id="TOC">…</nav>) from the body
const navEnd = frag.indexOf("</nav>");
const toc = navEnd >= 0 ? frag.slice(0, navEnd + 6) : "";
const bodyHtml = navEnd >= 0 ? frag.slice(navEnd + 6) : frag;

const css = readFileSync(p("tools/rulebook/book.css"), "utf8");

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${TITLE} — Rulebook</title>
<style>${css}</style>
</head><body>
<div class="rb-title"><p class="t">${TITLE}</p><p class="s">${SUBTITLE}</p><p class="m">Rulebook</p></div>
${toc}
<main class="flow">
${bodyHtml}
</main>
<script>window.PagedConfig = { auto: true, after: () => { window.__pagedDone = true; } };</script>
<script src="../tools/vendor/paged.polyfill.js"></script>
</body></html>`;

writeFileSync(p("docs/rulebook.html"), html);
console.log("wrote docs/rulebook.html");

// 2. HTML → PDF via headless Chrome over CDP, WAITING for Paged.js to finish
//    (raw --print-to-pdf snapshots before async pagination completes → truncated PDF)
if (!noPdf) {
  const { printToPdf } = await import("./rulebook/print-cdp.mjs");
  await printToPdf(`file://${p("docs/rulebook.html")}`, p("docs/rulebook.pdf"));
  const info = execFileSync("pdfinfo", [p("docs/rulebook.pdf")], { encoding: "utf8" });
  const pages = (info.match(/^Pages:\s+(\d+)/m) || [])[1];
  console.log(`wrote docs/rulebook.pdf (${pages} pages)`);
}

// 3. markdown → EPUB via pandoc
execFileSync("pandoc", [
  SRC, "-o", p("docs/rulebook.epub"),
  "--toc", "--toc-depth=2",
  "--css", p("tools/rulebook/epub.css"),
  "--resource-path", p("docs"),
  "--metadata", `title=${TITLE} — Rulebook`,
], { stdio: "inherit" });
console.log("wrote docs/rulebook.epub");
