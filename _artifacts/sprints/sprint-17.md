# Sprint 17: Token pieces — STLs + corrected stickers

- **Status:** active
- **Created:** 2026-08-18
- **Goal:** The physical token pieces are producible — **3D-printable STLs** for the
  token pieces at the **correct real-world dimensions**, the **Cameo stickers corrected
  to match** (fixing the earlier wrong sizes), and the **board round-tracker enlarged**
  to hold the marker. Tokens, stickers, and the tracker share one dimension spec.

## Token spec (designer, 2026-08-18)

| Piece | Shape | Sticker |
|-------|-------|---------|
| Station token | **10mm dia × 10mm** cylinder | station-type (logo/number) |
| Market token *and* round marker | **12mm dia × 5mm** disc (one STL serves both) | share-price |
| Bid cube (4 per player) | **8mm cube** | none |

Sticker seats **flat** (no recess). **One master STL per type** — the designer duplicates
on the print bed; no full plated set.

## Committed stories

View of `sprints.sprint-17.stories` in `sprint-status.yaml` (canonical). **10 points.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C51 | Resize stickers to the real token dimensions | content | 3 | done |
| 2 | C52 | Token-piece STL generator (3D-printable) | content | 5 | done |
| 3 | C53 | Enlarge board round tracker to fit the 12mm marker | content | 2 | stub |

## Scope notes

**Why now (designer, 2026-08-18):** the printed components (map, companies, charters,
certs, cards, board mat, tiles) are essentially complete, but the **token pieces** need
producing — 3D-printed discs/cubes the stickers sit on. The designer also flagged the
sticker sizes were wrong, so the dimensions get pinned and everything that depends on
them (stickers, STLs, the round-tracker slot) is corrected together. (The signature
mechanics — permits/ruins/mergers — are part of the rulebook and will be authored
together in a later batch, not split out here.)

**Sequencing:** C51 → C52 / C53 (C51 pins the shared spec; C52 and C53 both consume it).
1. **C51 — resize stickers.** Station-type stickers 12 → **10mm**, share-price 15 →
   **12mm** (REVEAL 0.5mm unchanged); confirm where the "misc" stickers belong. Fix
   `tools/stickers.py`, regenerate `print/stickers.*`.
2. **C52 — token-piece STLs.** New tooling (`tools/gen-token-stls.*`) emitting one master
   STL per type (station 10×10 cyl, market/round 12×5 disc, bid cube 8mm) — simple
   cylinder/cube tessellation, no OpenSCAD dependency. Depends on C51.
3. **C53 — round tracker.** Enlarge the `map.roundTracker` circles (C16) in
   `18dragon.json` to hold the 12mm disc; verify the 18xxMaker render. Depends on C51.

**All three start as stubs** — each is fleshed with `agile-story` before `agile-content`
(C53 is a `content` map change but verified via the 18xxMaker render like C16).

## In-flight changes

<!-- Course-corrections made during the sprint (usually via agile-party PM). -->

## Retrospective

<!-- Filled by agile-retro at sprint end. -->

### What went well

### What didn't

### Lessons / workflow adjustments

### Action items
