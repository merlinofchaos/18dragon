# C54: Rulebook render pipeline (markdown → 2-column PDF + EPUB)

- **ID:** C54
- **Type:** content
- **Epics:** Rulebook
- **Sprint:** sprint-19
- **Status:** done
- **Created:** 2026-08-21

## Story

As the designer,
I want a build pipeline that turns the rulebook markdown into a **2-column US-Letter PDF**
(matching the original 1822 rulebook's quality) and an **EPUB**,
so that C23 can author `docs/rulebook.md` and see it render as the real deliverable —
authoring into a proven target, not a hope.

## Acceptance Criteria

1. **Pipeline (new `tools/gen-rulebook.mjs`)** turns `docs/rulebook.md` → styled
   **2-column HTML** → **`docs/rulebook.pdf`** via headless Chrome (the house mechanism,
   `render-pdfs.sh`). Reuses Chrome; no npm/node_modules added.
2. **US-Letter, book-quality layout:** 2 columns, proper page margins (not the
   bleed-zero component style), a **running header**, **page numbers**, and a generated
   **table of contents** — via **Paged.js** (vendored locally; no CDN, per the offline
   rule). Chrome native @page can't do running headers/page numbers; Paged.js can.
3. **EPUB:** `docs/rulebook.epub` from the same markdown via **Pandoc** (single-column
   reflow; the delta color carried by an embedded stylesheet).
4. **Delta-marking convention (the contract C23 authors against):** 1822-differing rules
   are marked in markdown with **Pandoc-native attributes** — inline `[changed text]{.delta}`
   and block `::: {.delta} … :::` — which render as **neutral blue** in *both* the PDF and
   the EPUB. Documented where C23 will see it.
5. **Figures embed:** images referenced from the markdown (relative paths to existing
   renders — the map, a tile, the board mat) appear correctly in the PDF. Assets are
   local/self-contained (no network fetch).
6. **Proof — the pipeline renders end-to-end now.** With a short **stub `docs/rulebook.md`**
   (a couple of sections), produce `rulebook.pdf` + `rulebook.epub` demonstrating: 2-column
   body, running header + page number, a TOC entry, one embedded figure, and one
   neutral-blue delta passage. C23 later replaces the stub with the real rulebook.
7. **Documented:** a short header comment in `gen-rulebook.mjs` + a note (README or the
   story) covering the `brew install pandoc` prerequisite, the delta convention, and the
   build command(s).

## Tasks / Subtasks

- [x] **Prereq:** Pandoc installed (3.10.2) (AC: 3)
- [x] Vendor Paged.js locally (`tools/vendor/paged.polyfill.js`, v0.4.3) — no CDN (AC: 2)
- [x] `tools/gen-rulebook.mjs`: Pandoc (`rulebook.md` → HTML body + TOC via
  `tools/rulebook/fragment.html` template, keep `.delta`) → wrap in book template
  (Paged.js + `book.css`: US-Letter, 2-col, running header, page numbers, TOC,
  neutral-blue `.delta`) → `docs/rulebook.html` (AC: 1, 2, 4)
- [x] Render PDF via **CDP** (`tools/rulebook/print-cdp.mjs`) — waits for Paged.js's
  completion hook before printing (raw `--print-to-pdf` truncated the PDF) (AC: 1, 2)
- [x] EPUB: `pandoc … -o docs/rulebook.epub` with `epub.css` (`.delta` blue) (AC: 3, 4)
- [x] Figure embed proven with `print/tiles/tiles_p1.png` (AC: 5)
- [x] Stub `docs/rulebook.md` + build both; proof checklist verified via rendered PNGs
  (AC: 6)
- [x] Documented: header comment in `gen-rulebook.mjs` (prereqs, delta convention, build)
  (AC: 7)

## Dev Notes

**Decisions (designer, 2026-08-21):** **US Letter**; deltas in **neutral blue**.
**Toolchain (mine, documented):** Pandoc (md→HTML fragment + md→EPUB) + **Paged.js**
(paged-media: 2-col, running headers, page numbers, TOC) + headless Chrome (PDF) — chosen
to reuse the house Chrome pipeline (`tools/render-pdfs.sh`) and stay npm-free. Node v25 +
Chrome are present; **Pandoc must be installed** (`brew install pandoc`).

**Why Paged.js:** Chrome's native print supports @page size/margin + CSS `columns` +
page-breaks, but **not** @page margin-boxes (running headers/footers/page numbers) or a
paginated TOC. Paged.js polyfills full CSS Paged Media in the browser; Chrome then prints
its output. Load it locally and give Chrome a `--virtual-time-budget` so async pagination
completes before print. *Fallback:* if Paged.js is too fiddly, ship a simpler Chrome-native
2-column layout (no running headers) and revisit — but try Paged.js first for the quality bar.

**Delta convention (contract for C23):** Pandoc native spans/divs —
`[text]{.delta}` inline, `::: {.delta} … :::` block — map to CSS `.delta { color: <blue> }`
in both `book.css` (PDF) and the epub stylesheet. C23 marks every 1822-differing rule this
way; the differences **appendix** (from the C06 divergences doc) is a normal section.

**Assets:** figures are local files referenced by relative path; the pipeline must inline
or copy them so the PDF/EPUB are self-contained (no network). Reuse existing generated
renders where possible (C55 produces the rest).

**Output location:** `docs/` (the rulebook is a ship deliverable): `docs/rulebook.md`
(source, C23), `docs/rulebook.html` (build intermediate), `docs/rulebook.pdf`,
`docs/rulebook.epub`. Consider gitignoring the `.html` intermediate.

**Not this story:** the rulebook *content* (C23) and the *figures* (C55). C54 ships the
pipeline + a stub-driven proof.

## Validation

- `tools/gen-rulebook.mjs` builds `docs/rulebook.pdf` (2-col US-Letter, running header,
  page numbers, TOC, an embedded figure, a blue delta passage) and `docs/rulebook.epub`
  from a stub `docs/rulebook.md`. Self-contained (no network). Designer eyeballs the proof
  PDF for quality direction.

## References

- [Source: _artifacts/sprints/sprint-19.md] (pipeline decision: HTML/CSS paged → PDF + EPUB)
- [Source: tools/render-pdfs.sh] (the house headless-Chrome print mechanism to reuse)
- [Source: _artifacts/prd-game.md#10.1 Rulebook]
- [Related: C22 (base), C23 (authors docs/rulebook.md), C55 (figures)]

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

**Pipeline works end-to-end.** `node tools/gen-rulebook.mjs` turns `docs/rulebook.md` into
a **2-column US-Letter `docs/rulebook.pdf`** (4-page proof: centered title page, TOC with
resolved page numbers, 2-column body with running headers + page numbers, an embedded tile
figure, neutral-blue deltas — inline and bordered block) plus `docs/rulebook.epub`.
Verified by rendering the PDF pages to PNG and eyeballing.

**Toolchain (npm-free):** Pandoc (md→HTML fragment via `tools/rulebook/fragment.html`
template; md→EPUB) + **Paged.js** vendored at `tools/vendor/paged.polyfill.js` (CSS Paged
Media: 2-col, running headers, page numbers, TOC page numbers via `target-counter`) +
headless Chrome for the PDF.

**Key fix — Chrome must be driven over CDP, not `--print-to-pdf`.** Raw
`chrome --headless --print-to-pdf` (even with `--virtual-time-budget`) **snapshots the page
before Paged.js's async pagination finishes**, silently truncating the PDF (title + TOC
only, content dropped; and `target-counter` made it worse by adding a second pass). The DOM
was correct (Paged.js produced all pages) but the print fired early.
`tools/rulebook/print-cdp.mjs` launches Chrome with `--remote-debugging-port`, connects via
Node's built-in `WebSocket`/`fetch` (Node 22+), **polls a Paged.js `after` hook
(`window.__pagedDone`)**, then calls `Page.printToPDF` with `preferCSSPageSize`. Dep-free
and reliable. *(This burned the most time — the failure was invisible: valid-looking PDF,
just missing pages.)*

**Delta convention (contract for C23):** `[text]{.delta}` inline and `::: {.delta} … :::`
block → neutral blue (`#1f5fbf`) in both PDF (`book.css`) and EPUB (`epub.css`).

**Prereqs:** Pandoc (`brew install pandoc`) + Google Chrome. Build intermediate
`docs/rulebook.html` is gitignored; `.md`/`.pdf`/`.epub` are tracked. The stub
`docs/rulebook.md` is placeholder proof content — **C23 replaces it** with the real rulebook.

### Files Changed

- `tools/gen-rulebook.mjs` — **new**, the build orchestrator.
- `tools/rulebook/book.css`, `epub.css`, `fragment.html` — **new**, styles + pandoc template.
- `tools/rulebook/print-cdp.mjs` — **new**, the CDP printer (waits for Paged.js).
- `tools/vendor/paged.polyfill.js` — **new**, vendored Paged.js v0.4.3.
- `.gitignore` — ignore `docs/rulebook.html` (build intermediate).
- *(Not committed — proof artifacts, owned by C23:* `docs/rulebook.md` stub + the generated
  `docs/rulebook.pdf` / `docs/rulebook.epub`. C23 authors the real `rulebook.md` and the
  committed PDF/EPUB.)*
