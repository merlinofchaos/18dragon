# C11b: Detail the 11 externally-sourced privates (PNW/1822CA text)

- **ID:** C11b
- **Type:** content
- **Epics:** Privates
- **Sprint:** sprint-08
- **Status:** done
- **Created:** 2026-07-29

## Story

As the designer,
I want the 11 privates that reuse 1822PNW / 1822CA effects captured with their
**exact source rules text** (and any 18Dragon divergences noted),
so that the roster's inherited privates are specified precisely — not paraphrased
— and ready to render as cards (C42).

## Acceptance Criteria

1. All **11 externally-sourced privates** are documented in
   `docs/privates-roster.md` with full card fields, using their **P#** from the
   master numbering (C11a): **P2–P4** (perm trains) and **P23–P30** (the rest).
2. Rules text is pulled **verbatim from the engine source** (not paraphrased),
   then adjusted only where 18Dragon deliberately diverges — each divergence
   noted. The 11:
   - **Permanent 2-Train ×2** (P2, P3) — PNW `entities.rb` P2 text. Special
     permanent 2-train; doesn't count to train limit; can't be sold; one special
     train per company; dividend-separation rules; does not close. **Reverse side
     = the actual 2P train card** (card-anatomy train exception).
   - **Permanent L-Train ×1** (P4) — PNW P3/P4 text. Permanent L-train, "special
     train." **Reverse = the LP train card.**
   - **Dit-removal / Remove Town ×2** (P23, P24) — PNW P7/P8 "Dit Crusher"
     (Remove Town): Minor/Major, Phase 1; lay a plain yellow track tile over a
     dit/town removing it. Full text from source.
   - **Extra Track Lay ×1** (P25) — PNW "Extra Tile Lay": Minor/Major, Phase 3;
     one additional yellow tile (two for majors from Phase 3) or one extra
     upgrade. Full text.
   - **Mail Contract ×2** (P26, P27) — PNW P9 "USPS Mail Service": Major, Phase 3;
     after running trains the company receives mail income; multiple Mail
     Contracts restrictions. Full text.
   - **Station Token Swap ×1** (P28) — 1822CA P28 "Station Token Swap" text.
   - **Pullman ×2** (P29, P30) — **1822CA** P5/P6 Pullman ("NOT the PNW version"
     per the draft): Major, Phase 5; a Pullman carriage added to a train. Full
     1822CA text.
3. For each, record: class (badge + text), phase, player revenue, company
   revenue, cadence, Players required (default **3+**; C12 may raise), and the
   verbatim company-owned rules text.
4. **18Dragon flavor names** decided with the designer — either keep the source
   names or rename to fit the roster (the perm trains, like the opener, may keep
   train-style titles). Flag as an open item; don't invent unilaterally.
5. **Divergences captured explicitly**, e.g. player revenue normalized to the
   18Dragon roster if it differs from source; phase/class changes; the Pullman
   sourced from 1822CA not PNW. Note each.
6. Scope: no JSON; player-count gates → C12; layout → C42; numbering already set
   (C11a). Doc in `docs/`.

## Tasks / Subtasks

- [ ] Add an **Externally-Sourced Privates (C11b)** section to
  `docs/privates-roster.md` (AC: 1, 3)
- [ ] Pull verbatim text for each from source (AC: 2):
  - [ ] PNW `entities.rb`: P2 (perm-2), P3/P4 (perm-L), P7/P8 (Dit Crusher),
    Extra Tile Lay, P9 (Mail Service)
  - [ ] 1822CA `entities.rb`: P28 (Station Token Swap), P5/P6 (Pullman)
- [ ] Note the **train-card reverse** for perm-2 / perm-L (AC: 2)
- [ ] Decide flavor names with the designer (or keep source) (AC: 4)
- [ ] List divergences (revenue normalization, phase/class, CA-not-PNW Pullman)
  (AC: 5)

## Dev Notes

- **Sources (confirmed present):**
  - PNW `/Users/earlmiles/Projects/18xx/lib/engine/game/g_1822_pnw/entities.rb`
    — P2 (perm-2, line 22), P3/P4 (perm-L, lines 40/58), P7/P8 (Dit Crusher /
    Remove Town, lines 100/126), Extra Tile Lay (~line 196), P9 (USPS Mail
    Service / Mail Contract, line 152).
  - 1822CA `/Users/earlmiles/Projects/18xx/lib/engine/game/g_1822_ca/entities.rb`
    — P28 (Station Token Swap, line 558), P5/P6 (Pullman, lines 78/90).
- **Pullman:** use the **1822CA** version explicitly (`author-privates.md` line
  16: "NOT the PNW version"). 1822CA Pullman = Major, Phase 5.
- **Perm trains reverse:** per the card anatomy, perm-2/perm-L show the **actual
  train card** on the company-owned side (like the opener's 5P). The base-1822
  train roster (CLAUDE.md) already lists 2P / LP permanents — the JSON train pass
  handles the train objects; this story documents the *privates*.
- **Revenue:** the draft implies these carry the roster-standard **$10** player
  revenue except the perm trains (typically $0, like the opener/PNW). Confirm and
  note any divergence from source values.
- Depends on **C11a** (the master P# numbering) being approved first.

## Validation

- Design review: 11 cards present with verbatim source text + explicit divergence
  notes; names decided; numbering matches C11a. No JSON touched; `18dragon.json`
  still loads. Doc in `docs/`.

## References

- [Source: /Users/earlmiles/Projects/18xx/lib/engine/game/g_1822_pnw/entities.rb]
- [Source: /Users/earlmiles/Projects/18xx/lib/engine/game/g_1822_ca/entities.rb]
- [Source: _artifacts/author-privates.md] (lines 2–5, 13–16)
- [Source: docs/privates-roster.md] (card anatomy + C11a numbering)

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- Added the **Externally-Sourced Privates (C11b)** section to
  `docs/privates-roster.md`: fields table (P2–P4, P23–P30), **verbatim source
  rules text** for all 11, a divergences block, and a proposed-names table.
- Sources quoted: PNW `entities.rb` P2 (perm-2), P3/P4 (perm-L), P7/P8 (Dit
  Crusher / Remove Town), P11 (Surveyors / Extra Tile Lay), P9 (USPS Mail
  Service); 1822CA `entities.rb` P28 (Station Token Swap), P5/P6 (Pullman).
- **Divergences noted:** Pullman uses **1822CA** (Major, Phase 5, +train) not PNW;
  perm-2 Major-only vs perm-L Minor/Major; 18Dragon copy-counts; PNW builder-cube
  combo refs dropped. No revenue divergence ($10; perm trains $0).
- Perm-2/perm-L reverse = the **2P / LP train card** (card-anatomy train exception).
- **In-game names approved** (designer, 2026-07-29): Ironhaul, Deepdelver,
  Dampcart, Dustfall Company, The Hollowing, The Surveyors, Raven Post, Courier's
  Guild, Concord Charter, Gilded Carriage, Wyvern Coachworks. No open items.
- No JSON touched; `18dragon.json` unchanged and still parses.

### Files Changed

- `docs/privates-roster.md` — added the Externally-Sourced Privates (C11b) section.
