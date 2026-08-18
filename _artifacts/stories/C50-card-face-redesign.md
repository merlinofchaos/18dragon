# C50: Redesign train + private card faces (mockup-driven)

- **ID:** C50
- **Type:** content
- **Epics:** Game Components, Privates
- **Sprint:** — (set by sprint planning)
- **Status:** ready
- **Created:** 2026-08-17

## Story

As the designer,
I want the private and train card faces redrawn to the quality bar the mockup-driven
certificates set,
so that the whole 67×44 deck reads as one game — and a player can sort a bid box by
shape and color instead of squinting at 6pt text.

## Acceptance Criteria

1. **Private fronts (player-owned) match the agreed face** — direction **A "Ledger"**,
   as rendered in `docs/mockups/private-card-mockup.html`:
   - Cream stock (`#f6f1e3`, the cert paper), hairline inner frame. **No pastel body
     tint** — the old green/red fill is gone.
   - **Colored spine** down the left edge (6.2mm) carrying the card number (`P5`,
     vertical) and the player-count gate (`3+`) at its foot. Spine color = buy-in class:
     **green `#3f6b34`** = a minor may buy it in, **red `#8e2b22`** = majors only.
   - **Function label is the headline** (Leftfield Serif, ~15pt), flavor name the italic
     subhead, buy-in class as the eyebrow.
   - **Sigil watermark** behind the type (see AC 3).
   - Footer is **one rail**: phase chip · cadence · revenue. The three stacked chips
     (PLAYER-OWNED / PRIVATE COMPANY / class+id) are gone — the spine carries identity.
2. **Private backs (company-owned)** — same spine and shell; head row = sigil + function
   label + `IN COMPANY` chip over a rule; rules text justified in the body; foot rail =
   cadence + company revenue.
3. **Sigils — one mark per private, all 30 already drawn.** Placeholder line art exists
   for every card (see the sigil plate in the mockup); it ships as-is and is replaced when
   real art happens. Stroke-only on a 24×24 grid so one path serves both the 20mm front
   watermark and the 4.6mm chip on the back. Twins that share a rule differ by flavor —
   the two Mail Contracts are a raven and a post horn, the two Pullmans a gilded coach and
   a winged one. The `id → mark` map is exhaustive and **throws** on a missing id, so a
   new private is a visible gap rather than a silent generic fallback.
4. **Phase chip** — a hex clipped chip filled with the **tile color** of the phase
   (yellow ≤2, green 3–4, brown 5+) holding the numeral alone, with the word **PHASE**
   spelled out above it in the same small-caps label style as the revenue block.
   *"PH" inside the hex was rejected — too cryptic for a new player.*
5. **Revenue is labelled** — `TO PLAYER` on the front, `TO COMPANY` on the back, each
   over the coin glyph + value. The two faces' revenues must never be confusable.
6. **Region permits (P5–P9) lead with the region, not the ability:**
   - A ~16.4mm disc holding the **region letter at ~42pt in the region's map color**,
     taken from the permit labels in `18dragon.json` (A `#7B2D8B` Verantum,
     N `#56B4E9` Caelimor, G `#E69F00` Gördum, M `#D55E00` Muravel,
     V `#009E73` Varstova) so card and hex always agree. Letter carries a 0.18mm
     hairline of its own hue darkened ~28% so the lighter regions (N, G) hold on cream.
   - Headline reads **"VERANTUM PERMIT"** (13pt, one line for the longest name);
     eyebrow carries only the buy-in class. No sigil on these cards.
   - The back repeats the letter as a small colored chip beside the same headline.
7. **Square corners in print.** The generator emits square-cornered cards — the designer
   rounds the stock by hand. (The mockup previews rounded corners; `node
   tools/mockup-privates.mjs square` renders the print-true version.)
8. **No reserved art hole.** The dashed art placeholder is removed; the sigil watermark
   occupies that space, so the deck is finishable without waiting on illustration.
9. **Train faces are re-measured, not redesigned** — same anatomy the deck already has
   (phase-colored numeral, price, note, rust/permanent banner), set on one grid, per
   `docs/mockups/train-card-mockup.html`:
   - **Margin box `3.5mm`** all round → 60 × 37mm safe area; only the phase bar and the
     card edge live outside it.
   - **Header band `15mm`**, numeral and price bottom-aligned to one optical line (today
     they sit at absolute `top:2mm` / `top:2.6mm` at different sizes and don't align).
   - **Numeral slot fixed `26 × 15mm`, every name at `48pt`** — one glyph or two. The slot
     is cut wide enough for `2P` / `P+` rather than shrinking them, so the whole deck's
     numerals are one size, start at the same left edge and share one baseline. *(The
     numeral is the card's identity at arm's length in the train supply — it takes the
     room. Do not reintroduce a size step for two-glyph names.)*
   - **Price** gains the privates' labelled-value component (`COST` over coin + value);
     prize trains read *not for sale* there instead of leaving the slot empty.
   - **Note** fixed `44mm` measure, reserving `3.4mm` whether or not the card has one, so
     the banner never shifts between cards.
   - **Banner** fixed `5.6mm` tall, `24mm` min width, `3mm` side padding — "Permanent" and
     "Rusts with 7/E" are one component at two widths.
   - **Phase color** also rides a `1.6mm` top edge bar, so a fanned deck sorts by phase.
   - Cream stock, matching the privates and certs (the face is white today).
   **The perm-train privates (P1–P4, P29, P30) keep showing the actual train card on their
   back** via `trainFace()` / the `on_private` wiring in `data/trains.json` — unchanged, and
   not up for redesign here. Those faces inherit this same grid.
10. **`print/private-cards.html` and `print/train-cards.html` re-render** from the
    generators with no layout regressions: 30 privates, duplex mirroring intact, crop
    marks intact, nothing overflowing at actual size.

## Tasks / Subtasks

- [ ] Fold the mockup's card CSS + markup into `tools/gen-private-cards.mjs`, replacing
      the current `faceHtml()` (AC: 1, 2, 10)
  - [ ] Move the 30-mark `ART` map (and its missing-id check) into `tools/cardkit.mjs` so
        the train deck can share the same marks (AC: 3, 9)
  - [ ] Move the phase chip, labelled revenue block and spine into `cardkit.mjs` too
        (AC: 4, 5, 9)
- [ ] Add the region palette (letter → color/name) to `cardkit.mjs`, sourced from the
      `18dragon.json` permit labels; permit fronts/backs use it (AC: 6)
- [ ] Set square corners in the generator; keep the rounded preview in the mockup only
      (AC: 7)
- [ ] Fold the train mockup's spacing system into `TRAIN_CSS` / `trainFace()` in
      `cardkit.mjs`, so the deck cards and the perm-train private backs share it
      (AC: 9)
- [ ] Re-render `tools/gen-train-cards.mjs` and check the L/2 duplex pair still
      registers (AC: 9, 10)
- [ ] Re-render both decks, proof at actual size, spot-check a duplex test print
      (AC: 10)
- [ ] Delete the dashed `.img` placeholder rule and any now-dead CSS (AC: 8)

## Dev Notes

**Design decisions (designer review, 2026-08-17).** Three directions were mocked and two
dropped:

| Direction | Why not |
|---|---|
| **A "Ledger"** — cream, colored spine, function-as-headline | **Chosen.** Quiet enough that the certs stay the loudest thing on the table, and the spine gives every card a fat colored edge that reads when the deck is stacked or fanned — which is how privates actually get handled. |
| B "Illuminated" — parchment, medallion, gold ornaments | Warmest, but eats the horizontal room the long function labels need. |
| C "Banner" — ink banner, gold display type, dark stat rail | Best across-the-table read; least family resemblance to the certs. Keep in mind as the fallback if bid-box legibility ever beats family resemblance. |

Refinements after the pick, in order: permits led by the map letter rather than a sigil →
letter enlarged and disc shrunk (42pt in a 16.4mm disc) because the glyph was floating →
headline changed from bare region name to "VERANTUM PERMIT" → letter nudged up 0.8mm
(`margin-top:-1.5mm`) because Leftfield Serif sits low in its line box at display sizes,
so it was baseline-centered rather than optically centered → "PH" spelled out to "PHASE".
**Keep that optical nudge when this moves into the generator — it is a font metric, not a
typo.**

**Type.** Leftfield Serif (`fonts/LeftfieldSerif-Regular.otf`) for display, Iowan Old
Style / Palatino for body — the pairing already used by the board mat, bid boxes and
certs. Embed as a data URI as the mockup does.

**Settled, not open:** P1–P4 keep the real train card on the back (existing `backTrain`
behavior). Placeholder line art is acceptable for the whole roster — all 30 marks are drawn
in the mockup and can move to the generator as-is; a real-art pass is a later story and does
not block this one.

**Trains are a measurement pass only** (designer, 2026-08-17): "not a full redesign, just
careful attention to sizing and spacing." Don't restyle the train anatomy — keep the
numeral/price/note/banner and fix where they sit. Two things do change beyond position, to
match the other components: the stock becomes cream (it was white) and the numeral is set
in Leftfield Serif.

**Data fix along the way (2026-08-17):** the E train's note in `data/trains.json` lost its
"(variant of 7)" tail — it now reads "Doubles city revenue". `print/train-cards.html` was
re-rendered; the diff is that phrase and nothing else.

**Do not** change card *size* here — 67×44 is settled (C48) and C49 owns the print
plumbing; this story is faces only, and the sheets simply re-render after.

## Validation

Design review against `docs/mockups/private-card-mockup.html` at actual size — the mockup
now renders **all 30 fronts**, so the review is the whole deck, not a sample — plus a
duplex test print to confirm the backs still register behind their fronts and the spine
survives hand-cutting. Check the gallery cases specifically: longest name
(*Varstov Railwrights' Artel*), longest function label (*Hill/Mountain Discount*), both
accents, and all three phase colors in one deck.

## References

- Mockups (both take a `square` arg for print-true corners):
  - privates — `docs/mockups/private-card-mockup.html` via `tools/mockup-privates.mjs`
  - trains — `docs/mockups/train-card-mockup.html` via `tools/mockup-trains.mjs`
    (anatomy overlay + spacing spec, full deck and prize trains at actual size,
    12-up sheet check)
- Data master: `data/privates.json` · [Source: _artifacts/prd-game.md#6.1] (region permits)
- Region letters/colors: permit labels in `18dragon.json`
- Sibling stories: C42 (private card renderer), C48 (cert resize — the quality bar),
  C49 (unified print plumbing), C45 (company logos)

## Work Log

### Model Used

Claude Opus 5 (1M context) — mockup exploration, 2026-08-17.

### Completion Notes

Mockup complete and signed off by the designer; implementation not started.

### Files Changed

- `tools/mockup-privates.mjs` (new) — mockup generator; holds the 30 placeholder sigils
  (`ART`) and the region palette until they move into `cardkit.mjs`
- `docs/mockups/private-card-mockup.html` (new) — the agreed face, sigil plate,
  region permits, and all 30 fronts at actual size
- `tools/mockup-trains.mjs` + `docs/mockups/train-card-mockup.html` (new) — the train
  spacing system (same anatomy, measured)
