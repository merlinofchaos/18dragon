# Sprint 06: Varstova (region E) laid out — map complete

- **Status:** complete
- **Created:** 2026-07-29
- **Goal:** Varstova (region E, the northeast hills) is laid out as a wedge east of Gördum — its hexes with **V** permit letters, hills terrain with dits, and its cities including the capital Varstgrad — **completing the five-region 18Dragon map**.

## Committed stories

View of `sprints.sprint-06.stories` in `sprint-status.yaml` (canonical). All
`stub` — flesh each with `agile-story` before building. **8 points total.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C38 | Varstova (V) — hexes & permit letters (region footprint) | content | 3 | ✅ done |
| 2 | C39 | Varstova (V) — hills terrain & dits | content | 2 | ✅ done |
| 3 | C40 | Varstova (V) — cities (capital Varstgrad + settlements) | content | 3 | ✅ done |

## Scope notes

**Why these together.** The **fifth and final** region — completes the map. Reuses
the proven geo → terrain → cities pattern (Caelimor/Gördum/Muravel). Varstova (E) is
the **northeast** region (world-bible: Slavic-ish mercantile **hills**, capital
**Varstgrad**, teal `#009E73`), placed as a **wedge east of Gördum** with **V**
permits.

**Placement (designer elicitation, 2026-07-29):**
- **NE wedge east of Gördum's diagonal east edge** (C36 in the north → L41 in the
  south). **~4 hexes wide on the south**, **wider at the top**; the **eastmost
  border can run straight N/S** (a clean vertical east edge). Grid extends **east**.
- **Anchored at L43** — already promised by Muravel's M42/Tarseem offboard NE spike
  (that spike points at Varstova land).
- **Sea hexes in row M** (south edge); the **east side is the map edge** (no sea
  there — just the grid boundary). Otherwise landlocked hills.

**Split (3-way, per pattern):**
- **C38 (3pts)** — footprint hexes + **V** permit letters + the west tie-in to
  Gördum's diagonal + row-M sea + region border where it abuts Gördum land.
- **C39 (2pts)** — **hills** terrain + dits. Lighter (2pts) because Varstova can
  **reuse the existing `hills`/`hillsLarge` icons** (built for Caelimor) — no new
  fork art expected.
- **C40 (3pts)** — cities incl. capital **Varstgrad** (special-tile city) +
  settlements; region-E minor homes as numbered tokens **19–24** (the reserved
  block: Verantum 1–6 · Caelimor 7–12 · Gördum 13–18 · **Varstova 19–24** ·
  Muravel 25–30).

**Sequencing.** C38 → C39 → C40 (same order as every region).

**Permit-letter note.** Permit **V** shares the glyph with **Kalavar's special-tile
"V"** (Muravel/C37) — different hexes/regions, designer-confirmed acceptable.

**⚠ First elicitation item for C38:** the exact wedge silhouette (north width, the
straight east edge's column, how row-M sea meets it) and the Gördum tie-in — draw
against the doodle map with the designer before laying hexes. Pre-flight any
supplied coords with `check-parity.py`.

**Deferred / out of scope:** company/minor *rosters* (C03/C04) — C40 only places
cities; the region-permit *mechanic* (C07). After this sprint the **map is complete**
and the **privates/companies track** (designer already drafting) can begin.

## In-flight changes

- **2026-07-29 · C38** M48 sea hex removed after first render (designer).
- **2026-07-29 · C40** added a NE offboard **Novgorov** (C48, 40/40/60/60) and Varstgrad landed as a
  **plain city + R marker on the I44 river hex** (keeps 20gp) — build-time designer calls. Also fixed
  all offboards' gray tier (see retro).

## Retrospective

### What went well

- **The parity checker (retro-5 tool) paid off across the whole sprint.** Every coord batch — C38's
  50 footprint hexes, C39's river+dits, C40's 9 cities — ran clean through `check-parity.py` before
  scripting: **zero parity round-trips**, vs ~7 late catches in Sprint 5. The tool did its job.
- **Heavy asset reuse, zero new fork art** — river/bridge/offboard formats and the per-region pattern
  all reused. Varstova was the fastest region to lay.
- **Milestone: the five-region map is complete** (Verantum · Caelimor · Gördum · Muravel · Varstova;
  minor homes 1–30 all placed), closing the Sprint 2→6 map arc.

### What didn't

- **A hallucinated example propagated silently across two sprints.** The gray-tier offboard revenue
  was written as `{"color":"black","textColor":"white"}` on all of Muravel's offboards (Sprint 5) and
  Varstova's (this sprint) — four offboards — before the designer caught it. **Root cause (designer's
  diagnosis): a wrong example got written into `CLAUDE.md` with no validation** — the black colour was
  hallucinated and never checked against the known-working **Atlanteum** instance (which uses
  `color:gray`). The build then faithfully followed the bad reference.

### Lessons / workflow adjustments (made real)

1. **Fixed the source.** `CLAUDE.md`'s offboard example now matches the validated Atlanteum instance
   (yellow/green/brown/**gray**; no hallucinated black/white). `docs/18xxmaker-cookbook.md` §
   *Offboard hexes* already corrected to say use `color:gray`, not black.
2. **Takeaway (per designer): reference examples must be *validated when written*** — checked against a
   working instance or a render — not authored from memory. This is a doc-quality principle, **not a
   new build-workflow step** (the build process itself is fine and stays unchanged).
3. **Affirmed working (kept):** the parity checker; the per-region geo→terrain→cities pattern.

### Action items

- [x] Correct the offboard example in `CLAUDE.md` (gray tier → `color:gray`, matching Atlanteum).
- [x] Cookbook offboard note corrected (already done in C40).
- [ ] **Map is complete** — next track is **privates/companies** (designer drafting `author-privates.md`).
      Optional checkpoint: commit the finished `18dragon.json` map before that track begins.
