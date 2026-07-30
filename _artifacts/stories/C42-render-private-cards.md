# C42: Produce the rendered private cards (2-sided, all 30)

- **ID:** C42
- **Type:** content
- **Epics:** Privates, Game Components
- **Sprint:** sprint-08
- **Status:** done
- **Created:** 2026-07-29

## Story

As the designer,
I want all 30 privates rendered as printable **two-sided cards** from
`privates.json`,
so that the finished roster becomes a physical, playtestable deliverable — a
player-owned face and a company-owned face per card.

## Decision (made 2026-07-29)

**Renderer = a standalone HTML/print-CSS page generated from `privates.json`**, not
18xxMaker. 18xxMaker's card pipeline renders only **one face** per private (no
back/duplex anywhere) and its stock fields (`name/note/description/price/revenue/
bid/players/id`) don't match our card anatomy (function-label vs in-game-title,
phase, cadence, player-vs-company faces). Rebuilding that in the fork fights its
fixed single-face model; a small standalone renderer reads our schema directly and
gives full control over the busy 2-sided layout. (18xxMaker stays the *map/board*
tool.)

## Acceptance Criteria

1. A **generator** (`tools/gen-private-cards.mjs`, Node, no external deps) reads
   `privates.json` and emits a **self-contained** `private-cards.html` (data
   inlined — no fetch/CORS; opens from `file://`, prints, and can publish as an
   Artifact). Re-running regenerates when `privates.json` changes.
2. Every private renders **two faces** per the card anatomy
   (`docs/privates-roster.md`):
   - **Player-owned face:** yellow **function-label** band (top) · **in-game
     title** · **Phase** (left) · **player revenue** (right) · blank **image** box
     (center — deferred until post-playtest) · **cadence** (bottom-left, One
     Time/Each OR/blank) · `PLAYER-OWNED` / `PRIVATE COMPANY` (bottom-middle) ·
     **P# badge** (bottom-right) colored **green (minor) / red (major)** + the
     class printed as text.
   - **Company-owned face:** function label · in-game title · **rules text** ·
     **company revenue** · P# badge · `COMPANY-OWNED` / `PRIVATE COMPANY`.
3. **Card body tint = class** (from `badge`): **green** body = a minor may buy in;
   **red/pink** body = major-only. (Matches the 1822PNW reference.)
4. **Reverse handling from the `reverse` field:**
   - Perm-train privates (P1–P4): back shows the **train card** (placeholder art:
     the train name, e.g. "5P" / "2P" / "LP" — real art later).
   - Close-on-buy-in privates (permits, one-shots): back per `reverse` (rules text,
     or a "permit granted" marker for permits) — render what `reverse` says.
5. **Players-required** shown on each card (the 3+/4+/5+ gate), so 3/4-player setup
   is a physical "pull these" step.
6. **Print-ready duplex (final spec):** **US Letter LANDSCAPE**; card **67 × 44 mm**;
   grid **3 cols × 4 rows = 12/page** → **~39 mm side, ~20 mm top/bottom margins**
   (clears the 0.5" safety zone). 30 cards → **3 sheets** (12/12/6). **Long-edge
   flip in landscape = vertical flip → back sheets mirror ROWS** (config `MIRROR`;
   flip to `"cols"` for short-edge). Pages interleaved **F1,B1,F2,B2** for
   auto-duplex. Crop marks in the margins at every card boundary; card borders =
   cut lines. Orientation/grid/mirror parameterized at the top of the script.
7. Output covers **all 30** privates; a quick count/tally check passes.

## Tasks / Subtasks

- [ ] Write `tools/gen-private-cards.mjs`: read `privates.json`, build the HTML
  string (inline `<style>` + the card DOM), write `private-cards.html` (AC: 1)
- [ ] Card component (HTML/CSS) — player-owned face (AC: 2, 3, 5)
- [ ] Card component — company-owned face + `reverse` handling (AC: 2, 4)
- [ ] Body-tint-by-class + yellow function band (AC: 3)
- [ ] Duplex sheet layout + cut guides + card size var (AC: 6)
- [ ] Generate, open, eyeball all 30 × 2 faces; tally = 30 (AC: 7)
- [ ] (Optional) publish `private-cards.html` as an Artifact for review

## Dev Notes

- **Source data:** `privates.json` (C43) — the fields map 1:1 to the faces:
  `function_label`, `name`, `phase`, `player_revenue`, `company_revenue`, `cadence`,
  `class`/`badge`, `players_required`, `rules_text`, `reverse`, `id`.
- **Self-contained** so it can be an Artifact (CSP-safe: inline CSS/JS, no external
  assets; the blank image box needs no network).
- **Location:** generator in `tools/`; output `private-cards.html` at repo root (or
  `tools/`). It is a *production artifact*, not game JSON — do not touch
  `18dragon.json`.
- **First cut vs print-perfect:** the goal is a correct, legible, print-to-PDF
  deliverable; exact duplex registration / bleed can be tuned in review (flag if it
  needs a follow-up).
- **Print spec settled (2026-07-29):** US Letter; 67×44 mm landscape cards;
  long-edge flip → mirror back **columns**; interleaved F/B pages. Cards-per-page
  is the one open number: **18** (3×6, max) vs **15** (3×5, roomier). Card order:
  default **by P#** (P1→P30).
- **Cards-per-page = 12** (3×4 **landscape**, designer 2026-07-29): 15/page (3×5
  portrait) gave only ~7.5 mm side margins — under the 0.5" safety zone — so moved
  to landscape 12/page for ~39 mm sides. 30 cards → 3 sheets.
- **Verify duplex with a test print** (front + its back, hold to light): if the
  back is flipped the wrong way, switch `MIRROR` between `"rows"`/`"cols"`.
- **Open at review:** the permit/one-shot back treatment (marker vs full rules
  text).
- **Follow-up = C44** (backlog): professional-print output — individual per-card
  files with correct bleed + crop marks. C42 targets **home/proof duplex sheets**
  (borders as cut lines); pro bleed is out of scope here. *(Designer: pro card
  printing is expensive, so a good home-print result matters — prefer the offset
  knob below before paying for C44.)*
- **Possible follow-up — `BACK_OFFSET_X/Y`:** home-printer duplex registration
  drifts ~1–2mm; if the designer's printer drifts *consistently*, add a mm nudge to
  the back sheets to compensate. Not built yet — designer may want to try it.
- **Follow-up (needs C26 train cards):** the permanent special trains (P1 opener
  5P, P2/P3 perm-2, P4 perm-L) currently render a **placeholder** train back; once
  train cards are produced (C26), embed the **actual train card** on those backs
  instead of the placeholder text.

## Validation

- `node tools/gen-private-cards.mjs` runs clean; `private-cards.html` opens in a
  browser showing 30 cards × 2 faces with correct data, class tints, gates, and
  reverses; print preview shows aligned duplex at the chosen size. `privates.json`
  and `18dragon.json` unchanged. Design review with the designer.

## References

- [Source: privates.json] (data master)
- [Source: docs/privates-roster.md#Card anatomy]
- [Source: _artifacts/prd-game.md#4.3 Privates], [#11 components]

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- Built `tools/gen-private-cards.mjs` (Node, no deps): reads `privates.json`, emits
  a self-contained standalone `private-cards.html` (+ optional content-only file).
- Layout: US Letter portrait, 67×44mm landscape cards, **3×5 = 15/page**; 30 cards
  → 2 front + 2 back sheets, order F1,B1,F2,B2 for auto-duplex; **long-edge flip →
  back columns mirrored** per row. `@page`/print CSS strips screen labels; card
  borders double as cut lines.
- Both faces per anatomy: player (yellow function band · title · Phase/image/
  revenue · cadence · PLAYER-OWNED · P# badge green/red + class · players-req tag);
  company (rules text · COMPANY-OWNED · badge). Perm-trains (P1–P4) render a train
  back. Body tint = class (green minor / red major).
- Sanity: 30 fronts + 30 backs, 30 PLAYER-OWNED / 30 COMPANY-OWNED, 4 sheets.
- Published preview Artifact:
  https://claude.ai/code/artifact/79083cda-a535-47ff-a310-5efc7d579522
- Orientation/grid/mirror/size parameterized at the top of the script.
- **Design-review revisions (applied to the cards + `privates.json`):** bigger
  function title; phase = black-outlined numeral filled by phase (yellow 1–2 /
  green 3–4 / brown 5); gold-coin revenue (no `$`); corners cleared for future
  rounding; separated PLAYER/COMPANY-OWNED pills + yellow PRIVATE-COMPANY pill;
  bigger centered rules; crop marks + `print-color-adjust: exact`; **final layout
  12/page US Letter landscape (~39mm sides)**. Data: company revenue $10 "until
  used" on the close-to-act powers (P16/P17/P20/P21/P22/P23/P24/P25/P28), P22
  reworded to close-pattern, region permits → Ongoing, Mining Troupe →
  Hill/Mountain & Mountain Discount with unified stacking text.
- **Verified:** colors print (with `print-color-adjust` + Background-graphics).
  Duplex front/back is ~1–2mm off — home-printer registration tolerance; content
  insets cushion it. Accepted for proofs; pro alignment = C44 (or the offset knob).
- `18dragon.json` unchanged.

### Files Changed

- `tools/gen-private-cards.mjs` (new) — the generator.
- `private-cards.html` (new) — generated 2-sided duplex sheets (deliverable).
- `privates.json` (updated during review) — company-revenue-until-used on the
  close powers, permit cadence → ongoing, discount renames/unified text.
- `docs/privates-roster.md` (updated to match).
