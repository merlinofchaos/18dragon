# C24: Token stickers

- **ID:** C24
- **Type:** content
- **Epics:** Stickers
- **Sprint:** sprint-13
- **Status:** done
- **Created:** 2026-08-05

## Story

As the designer,
I want token stickers generated for Silhouette Cameo Print & Cut, driven by
`companies.json`,
so that the company/minor/market/misc tokens can be printed and cut to size.

## Acceptance Criteria

1. A **generalized `stickers.py`** (18Dragon) reading the roster/colors from
   **`companies.json`** (+ a small in-script sticker **config** for counts / token
   types) — not a hardcoded `COMPANIES` list. Keeps the reference's pipeline:
   per sheet a **PNG** print image (US Letter @300dpi) + a **registered cut SVG**
   of circles, respecting the Cameo **no-cut zones**.
2. **Major company tokens — 6 per major** (1 **home** + 1 **destination** + **4
   regular**). "Exchange" is a board **state** of the 4 regular tokens (moved between
   the available and exchange areas), **not** a distinct sticker type.
   - The **company color lives only in the LOGO** (the shared company logo — same as
     certs/charters). **Ring and star are NOT company-colored** (neutral).
   - **Home**: logo + a (neutral) **star**.
   - **Destination**: logo + a **black stripe**.
   - **4 regular**: logo only.
3. **Minor number tokens** (30): **white** disc with the minor's **number** (no
   company color).
4. **Market marker — one share-price marker per major** (10): a small **logo disc**
   that rides the stock-market track.
5. **Misc tokens:** **two "+30gp"** tokens (match the privates' +30 tokens —
   Phlogiston Mine / Wands) and **one round marker** — the round marker is **exactly
   as in `stickers_friend.py`** (white disc + the `round.png` icon; copy the asset).
6. Output ready for Cameo Print & Cut (PNG + cut SVG per sheet), sticker radius
   inset from the token edge with bleed (as in the reference).

## Tasks / Subtasks

- [ ] Port `stickers.py` into the repo (e.g. `tools/stickers.py`); replace the
  hardcoded roster with a `companies.json` import (AC: 1)
- [ ] Sticker config: token types + counts + diameters; two-tone/logo rules (AC: 1, 2)
- [ ] Company logo on the token = the shared logo look (color + abbrev now; **C45**
  swaps in the real SVG). Ring/star neutral; destination black stripe (AC: 2)
- [ ] Minor white number tokens (AC: 3)
- [ ] Market/par markers + the misc +30gp ×2 and round marker (AC: 4, 5)
- [ ] Generate a **sample sheet** (mockup-first) → approve → generate all sheets (AC: 6)

## Dev Notes

- **Reference:** `/Users/earlmiles/Projects/3d printing/18xx/1862/stickers.py` — PIL
  raster + cut SVG, Cameo no-cut zones, per-company station/home/revenue/par/market
  + generic tokens. Reuse its geometry/knobs; swap the data source to
  `companies.json`.
- **Logo consistency:** the sticker logo must match `cardkit`'s `companyLogo()`
  (certs/charters). It's Python vs JS, so real unification is **C45** (a per-company
  logo **SVG** every tool embeds). Until then, render the matching placeholder
  (company-color disc + abbrev) from `companies.json`.
- **Colors are the placeholder palette** — the designer tweaks per-company after
  seeing them on tokens (the deferred palette call). Feeds back into `companies.json`.
- **Silhouette Cameo** (not 18xxMaker), per PRD §11.

## Open

- ~~Final per-major color tweaks (designer, after seeing them on tokens).~~ **Closed
  (won't-do):** colors are locked to the existing `companies.json` palette — the
  charters and certs were already generated with these, so a late change would desync
  the printed decks.

*(Note: the charter's available/exchange slots are **areas** the 4 standard tokens
move between — some empty at any time — not extra tokens. 6 physical tokens/major
total: 1 home, 1 destination, 4 standard. Charter stays as-is; no reconciliation
needed.)*

## Validation

- `python3 tools/stickers.py` reads `data/companies.json` (not hardcoded) and writes
  **one combined Letter Print & Cut sheet** to `print/` (`stickers.{png,_cut.svg,
  _print_and_cut.svg}`) — 173 stickers: 60 major (6/major = 4 logo + home-star +
  dest-stripe), 30 minor numbers, 2× "+30gp" + 1 round marker (all 12mm), plus 40
  market markers (10 major logo discs + 30 minor numbers, each with a plain front and
  a red→black-barred back, 15mm). The mixed-size band packer keeps all cut margins
  (bleed/safety) intact; no art or cut falls in the Cameo no-cut zones. Reviewed and
  approved by the designer.

## References

- [Source: data/companies.json], [Source: /Users/earlmiles/Projects/3d printing/18xx/1862/stickers.py]
- [Source: _artifacts/prd-game.md#11 components], [Source: tools/cardkit.mjs] (companyLogo)

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- Generalized the 1862 `stickers.py` into `tools/stickers.py`, sourcing the roster and
  colors from `data/companies.json`; the company logo matches `cardkit`'s placeholder
  (company-color disc + abbrev) — real SVG unification stays deferred to **C45**.
- Home token = big white background star + a **full-width translucent white stripe**
  behind a dark abbrev (mirrors the dest black stripe height, same abbrev size as the
  plain tokens). Destination = **black stripe** band. Minors = white disc + number.
- Market/share-price markers are **double-sided** (front logo/number + a red→black
  gradient **back** bar), one pair per company, all on the shared sheet.
- **Single combined sheet**: a mixed-size (12mm + 15mm) band packer fits all 173
  stickers on one Letter page (~97% of usable height) with margins unchanged — no
  separate market sheet.
- **Colors are locked** to the existing `companies.json` palette (matches the already
  generated charters/certs); the deferred per-major palette tweak was **not** taken —
  changing colors this late would desync the printed decks. Open item closed as
  won't-do.

### Files Changed

- `tools/stickers.py` (new — reads `data/companies.json`, writes `print/stickers.*`)
- `tools/sticker-assets/round.png` (new — round-marker icon, copied from 1862)
- `print/stickers.png`, `print/stickers_cut.svg`, `print/stickers_print_and_cut.svg` (generated)
