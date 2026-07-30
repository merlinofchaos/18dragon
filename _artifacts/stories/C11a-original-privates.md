# C11a: Detail the 13 18Dragon-original privates (+ master P# numbering)

- **ID:** C11a
- **Type:** content
- **Epics:** Privates, Mergers
- **Sprint:** sprint-08
- **Status:** done
- **Created:** 2026-07-29

## Story

As the designer,
I want the 13 privates whose text I've already drafted captured cleanly in the
roster doc — plus a master P1–P30 numbering assigned to the whole roster,
so that the 18Dragon-original privates are fully specified and every card has a
stable number the later stories (C11b/C12/C42) can reference.

## Acceptance Criteria

1. All **13 18Dragon-original privates** are documented in
   `docs/privates-roster.md`, each with the full card fields (card-anatomy
   preamble): function label, in-game title, class (badge color + text), phase,
   player revenue, company revenue, cadence, Players required (default **3+** —
   C12 may raise), and the company-owned **rules text**.
2. Text is captured from `author-privates.md` (the designer's own draft) verbatim
   in meaning, tidied for card use. The 13:
   - **Bridge ×2** — $10 player rev; Minor/Major; Phase 2; on buy-in place a
     special bridge tile on **one of the 3 bridge locations (M12, F19, R23)**;
     other companies may run the track but pay the owner **10** from route revenue.
   - **Wands Delivery ×1** — $10; Minor/Major; Phase 3; on buy-in place a $30
     token in any city **not** in Verantum; any train including **both Verantia
     and that city** gets **+30**.
   - **Phlogiston Mine ×1** — $10; Minor/Major; Phase 3; company may **close** it
     to place a +30 token on any **mountain** hex; any train through that hex
     gains **+30**.
   - **Phlogiston Car ×2** — $10 player / $0 company; **Major**; Phase 3; may be
     attached to a 2–7 train; that train may make **1 additional stop**.
   - **Mining Troupe ×2** — $10 / $0; Minor/Major; Phase 1; owning **company**
     gets a **40gp** discount building on **hill or mountain** terrain; multiple
     Mining Troupes stack.
   - **Dwarven Mining Troupe ×2** — $10; **Major, Phase 2**; owning company gets an
     **80gp** discount building on **mountain** terrain; stacks with Mining Troupes.
   - **Verantum Recolonization ×1** — $10 / $0; **Minor/Major, Phase 3**; company
     may **close** it to upgrade a Verantum **dit → city** of the same color
     (yellow if no track laid) and place an Exchange token there free; counts as
     the company's track lay.
   - **Brekheim Locomotive Corporation ×1** — $10; **Major**; Phase 3; on buy-in
     the company may immediately place an exchange token in **Brekheim even with
     no slot available**.
   - **Merger Negotiations ×1** — $10; **Minor/Major**; Phase 2; while owned by a
     **minor**, may **close** it to **initiate a merger with another minor** even
     with no connecting track; **if bought into a major, closes for no effect**
     (no dead cert). *(Ties to the C13 merger mechanic.)*
3. A **master P1–P30 numbering table** is added to the roster doc covering **all
   30 privates** (opener, permits, these 13, and the C11b sourced ones by name),
   for the designer's approval. Once approved, backfill the `P#` into the C05
   (permits) and C10 (opener) sections.
4. **Cadence** assigned per card (One Time vs Each OR / ongoing) and flagged where
   uncertain. **Company-owned side** noted per card (most are close/one-shot
   effects; none are trains here).
5. **Gaps surfaced, not silently filled** — the draft leaves class/phase blank for
   Dwarven Mining Troupe and Verantum Recolonization, and says "owning player"
   where "owning company" is likely meant for the Mining Troupes. Raise these for
   the designer rather than deciding.
6. Scope: no JSON; player-count gates → C12; exact external text → C11b; layout →
   C42. Doc in `docs/`.

## Tasks / Subtasks

- [ ] Add an **18Dragon-Original Privates (C11a)** section to
  `docs/privates-roster.md`; one entry per private with full fields (AC: 1, 2, 4)
- [ ] Capture the bridge toll + the 3 locations M12/F19/R23 (AC: 2)
- [ ] Propose + record the **master P1–P30 numbering** table (AC: 3)
  - [ ] Backfill P# into the C05 and C10 sections once approved (AC: 3)
- [ ] Assign cadence per card; flag uncertain ones (AC: 4)
- [ ] List the open gaps (Dwarven class/phase, Verantum Recol class/phase,
  player-vs-company wording) as a short "to confirm" block (AC: 5)

## Dev Notes

- **Source:** `author-privates.md` lines 6–12, 17–18 (the 13 originals). These are
  the designer's own 18Dragon text — capture, don't invent; only tidy wording and
  surface gaps.
- **Proposed master numbering (P1–P30)** — grouped, opener first; for approval:
  - P1 Eldrok Phlogiston Werk (opener 5P) · P2–P4 perm-2 / perm-2 / perm-L ·
    P5–P9 permits (Verantum, Caelimor, Gördum, Muravel, Varstova) ·
    **P10–P11 Bridge ×2 · P12–P13 Mining Troupe ×2 · P14–P15 Dwarven Mining ×2 ·
    P16 Merger Negotiations · P17 Phlogiston Mine · P18–P19 Phlogiston Car ×2 ·
    P20 Wands Delivery · P21 Verantum Recolonization · P22 Brekheim Locomotive** ·
    P23–P24 Dit-removal ×2 · P25 Extra Track Lay · P26–P27 Mail Contract ×2 ·
    P28 Station Token Swap · P29–P30 Pullman ×2.
  - C11a owns P10–P22 (its 13); C05 = P5–P9; C10 = P1; C11b = P2–P4 + P23–P30.
- **Bridge cross-ref:** M12 & F19 are the Verantum bridge hexes (C28); R23 is the
  Muravel bridge (C36). Toll 10, matching the "2 in off Verantum" wording.
- **Cadence proposals:** Bridge/Wands/Brekheim Loco = **One Time** (place on
  buy-in); Phlogiston Mine/Verantum Recol/Coal Mine = **One Time** (close to
  activate); Phlogiston Car = **ongoing** (attached, each run); Mining/Dwarven
  Mining = **ongoing** build discount (not per-OR revenue). Confirm with designer.

## Validation

- Design review: 13 cards match the draft, master numbering approved (and
  backfilled to C05/C10), gaps explicitly listed for decision. No JSON touched;
  `18dragon.json` still loads. Doc in `docs/`.

## References

- [Source: _artifacts/author-privates.md] (lines 6–12, 17–18)
- [Source: _artifacts/prd-game.md#4.3 Privates]
- [Source: docs/privates-roster.md] (card anatomy; extend it)

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- Added to `docs/privates-roster.md`: the **Master numbering (P1–P30)** table
  (whole roster, owning-story column) and the **18Dragon-Original Privates (C11a)**
  section — a fields table (P10–P22) + verbatim-meaning company-owned rules text +
  a "To confirm" open-items block.
- **Backfilled P#** into the earlier sections: opener → **P1**; region permits →
  **P5–P9**.
- **Coal Mine → Merger Negotiations** applied (designer swap 2026-07-29): P16,
  Minor-only, Phase 2, close to force a merger with another minor even without
  connecting track. Flagged Minor-only as a new class value; added Mergers epic to
  this story.
- **Designer resolutions (2026-07-29):** Dwarven Mining = **Major, Phase 2**;
  Mining Troupe discount = **owning company**; Merger Negotiations = **Minor/Major**
  (minor-only effect; closes for no effect in a major); all four Troupes share
  top-line "Mining Troupe" with **unique in-game names** (*Rockbreakers*,
  *Cragmen*, *Durgrok Delvers*, *Stonebeard Hewers* — proposals). Gate steer for
  C12: gate 1 Bridge + 1 Dwarven Mining; keep **both regular Mining Troupes
  ungated** (expensive center needs contestable discounts).
- **Verantum Recolonization (P21):** resolved — **Minor/Major, Phase 3**.
- **Troupe names approved.** No open items remain in C11a.
- **Naming pass (2026-07-29):** Bridges named *The Aurelian Span* (P10) /
  *Halvard's Crossing* (P11), functional "Bridge Tile". Phlogiston Cars named
  *The Firebox* (P18) / *The Emberwain* (P19), functional top-line kept as
  "Phlogiston Car" (designer wanted "Phlogiston" retained). P16/P17/P20/P21
  in-game titles kept as-is (designer approved).
- Function labels are proposed (top-band wording is a C42 detail).
- No JSON touched; `18dragon.json` unchanged and still parses.

### Files Changed

- `docs/privates-roster.md` — master numbering table; 18Dragon-Original Privates
  section; P# backfilled into the opener + permits sections.
