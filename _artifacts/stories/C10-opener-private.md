# C10: Define opener private (phlogiston / 5P / bid box 1)

- **ID:** C10
- **Type:** content
- **Epics:** Privates, Companies
- **Sprint:** sprint-08
- **Status:** done
- **Created:** 2026-07-29

## Story

As the designer,
I want the opener private — the phlogiston-engine company that always starts in
bid box 1 and carries a permanent 5-train — captured in the privates roster doc,
so that the game's fixed opening item is fully specified alongside the rest of the
roster, ready to render as a card (C42) later.

## Acceptance Criteria

1. The opener is documented as a single private in `docs/privates-roster.md` (its
   own section), with the shared card fields (card-anatomy preamble) filled in.
2. **Fixed mechanics** (PRD §4.3, designer-confirmed 2026-07-29):
   - **Always starts in bid box 1** at game start — the fixed opener, replacing
     1822's always-first minor. (It is *always present*: Players required **3+**.)
   - **Class:** **Major-only** (red badge) — a minor cannot buy it in.
   - **Player revenue:** **$5** each OR while player-owned.
   - **Buy-in gate:** cannot be bought into a company **until phase 5**. So it
     lingers with its owner — the classic 1822 early-tie-up-for-a-free-permanent-
     train pattern.
   - **Function label:** "Permanent 5-Train" (5P).
3. **The 5-train (5P) behavior** (designer-confirmed; matches PNW's P1):
   - The train is **permanent** (a 5P — the 5-train is the first non-rusting train,
     so this is inherent, not special).
   - **No train is taken from the supply.** On buy-in the private is **flipped**
     to its reverse, which **is** the 5P train card (per the card-anatomy
     permanent-train exception — the company-owned side is the train itself).
   - It **counts against the train limit**.
   - Acquisition is an **acquisition action**, so a company may acquire it **even
     if already at train limit**; but once acquired the company must check the
     limit and **discard any trains held in excess**.
4. **Brekheim / "builds the first train" is flavor only** — no board effect, no
   home token, no special first-build. Mechanically it is just the bid-box-1
   private carrying the 5P.
5. **In-game name** proposed for designer review, Gördum convention (Germanic/
   Norse), evoking the phlogiston-engine inventors — and **distinct from the
   existing "Brekheim Locomotive Corporation" private** (no collision).
6. Scope boundaries noted: card layout → C42; the general auction/bid-box refresh
   *mechanics* are rules-track (not restated here — only "starts in box 1" is a
   property of this card); `P#` number assigned once roster order is set (C11).

## Tasks / Subtasks

- [ ] Add an **Opener** section to `docs/privates-roster.md` (AC: 1)
  - [ ] Shared card fields: function label, in-game title, phase, player revenue,
    cadence, class badge (red / "Major"), Players required 3+ (AC: 1, 2)
- [ ] Write the **fixed mechanics** (bid box 1, major-only, $5, phase-5 buy-in
  gate) (AC: 2)
- [ ] Write the **5P behavior** paragraph — permanent, flip-not-take, counts to
  limit, acquisition-action-even-at-limit + discard-excess (AC: 3)
- [ ] Note **Brekheim = flavor only** (AC: 4)
- [ ] Propose the in-game name (Gördum convention; not "Brekheim Locomotive")
  (AC: 5). Candidates: *Eldrok Phlogiston Werk* / *Dampgeld Enginewrights* /
  *Fyrrok Locomotive Guild*
- [ ] Note the company-owned "side" is the **5P train card** (AC: 3)
- [ ] Scope-boundary line (C42 layout, C11 numbering) (AC: 6)

## Dev Notes

- **Sources:** PRD §4.3 (opener paragraph) + `author-privates.md` ("1 permanent 5
  — see PNW for text") + PNW `entities.rb` P1 "The Olympian Hiawatha" (`value:0,
  revenue:5`, "MAJOR, Phase 5", acquisition-action-even-at-limit + discard-excess
  text). **Matches PNW (no divergence):** a 5-train is the first non-rusting train,
  so PNW's "normal 5-train" P1 *is* a permanent 5 (5P) — same as 18Dragon's opener.
  Counts to train limit; acquisition action, allowed at limit, discard excess.
  (Corrected 2026-07-29 — an earlier draft wrongly called this a divergence.)
- **Class/revenue** match PNW exactly (Major-only, $5). The permit privates pay
  $10, but the opener is $5 — intentional, not a typo.
- **Naming collision guard:** `author-privates.md` line 17 already has a
  "Brekheim Locomotive Corporation" (a *different* Phase-3 exchange-token private,
  → C11). The opener must not reuse "Brekheim Locomotive".
- The 5P train roster line itself is a trains/JSON concern (base-1822 train set) —
  this story documents the *private*, not the train roster (that's the trains
  pass; CLAUDE.md notes base-1822 has 5P/permanent trains).

## Validation

- Design review with the designer: opener mechanics match PRD §4.3 + the
  confirmed 5P behavior; name approved (or replaced); no collision with the
  Brekheim Locomotive private. Docs-only — `18dragon.json` untouched and still
  loads. Doc lives in `docs/`.

## References

- [Source: _artifacts/prd-game.md#4.3 Privates] (opener paragraph)
- [Source: _artifacts/author-privates.md] (line 3 — "1 permanent 5, see PNW")
- [Source: /Users/earlmiles/Projects/18xx/lib/engine/game/g_1822_pnw/entities.rb] (P1)
- [Source: docs/world-bible.md#Naming Conventions] (Gördum: Germanic/Norse)

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- Added **The Opener (C10)** section to `docs/privates-roster.md`: in-game title
  *Eldrok Phlogiston Werk* (designer-chosen), fields table, the 5P-behavior
  paragraph, a matches-PNW note, and the scope-boundary line.
- *(Correction 2026-07-29: an earlier draft called the permanent-5 a "divergence
  from PNW." It isn't — a 5-train is the first non-rusting train, so PNW's normal
  5-train is already permanent. Fixed in the doc, privates.json, and here.)*
- Fixed mechanics: bid box 1 always, Major-only (red), $5 player rev, phase-5
  buy-in gate, Players required 3+.
- 5P: permanent, flip-not-take (reverse = the 5P train card), counts to train
  limit, acquisition-action-even-at-limit + discard-excess.
- Brekheim recorded as flavor only. No collision with the separate "Brekheim
  Locomotive Corporation" private (→ C11).
- **Open item for C11:** assign the `P#` number once full roster order is set.
- No JSON touched; `18dragon.json` unchanged and still parses.

### Files Changed

- `docs/privates-roster.md` — added "The Opener (C10)" section.
