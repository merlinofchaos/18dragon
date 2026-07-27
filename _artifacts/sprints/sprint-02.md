# Sprint 02: Verantum board detail

- **Status:** complete
- **Created:** 2026-07-24
- **Completed:** 2026-07-27
- **Goal:** The Verantum island board is fully laid out — cities, the 6 minor homes, dits, ruins markers, and bridge hexes — ready to render. Rules/features (ruins/metro values C08, the bridge-enabling private) are deferred.

## Committed stories

View of `sprints.sprint-02.stories` in `sprint-status.yaml` (canonical). All
`stub` — flesh each with `agile-story` before building. **6 points total.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C27 | Verantum island — cities & the 6 minor homes | content | 3 | ✅ done |
| 2 | C01 | Verantum island — geography (dits, ruins markers, terrain) | content | 2 | ✅ done |
| 3 | C28 | Verantum bridge hexes (native bridge rendering) | content | 1 | ✅ done |

**Outcome: 3/3 done.** The Verantum island is fully laid out — 4 named cities (Verantia +
Corvium/Ostia/Lavinia) with 6 numbered minor homes, a 12-hex ruins cluster, 3 named dits
(Velia/Larium/Calvia), 2 bridge hexes, Atlanteum revenue (0/10/50/60), and Verantia's $10 base.

## Scope notes

**Why these together.** Sprint 1 unblocked the renderer; Sprint 2 starts laying
the real board — beginning with the Verantum island (region A), which is already
drafted in `18dragon.json`. Scope is the **physical board only** — the designer's
concrete list: finish the central ruins-city, place the 6 region-A minor homes,
add dits, apply the ruins markers, and mark the 2 bridge hexes.

**Story mapping (from the designer's list):**
- **C27** — finish the center city (4 slots, **one kept open**); add a **3rd outer
  city**; reserve the **6 minor home** locations. Math: center ×3 (1 slot left
  open) + 3 single outer cities (F17, L11, + one new) = 6.
- **C01** — add the **dits** we want; apply the **ruins marker** to the ruins hexes
  (finalize D07's styling into the real file).
- **C28** — mark the **2 bridge hexes** using 18xxMaker's **native** bridge
  rendering (`hex.bridges` / Bridge atom). No custom SVG.

**Sequencing.** C27 first (sets the island's city/minor structure), then C01
(terrain fill), then C28 (small, independent). Worked **section-by-section** — every
placement decision goes to the designer before it's written.

**Deliberately deferred (features, not board):**
- **C08** — ruins/metro value system (the central-city value, metro bonuses). C27
  only *places* the center city and its open slot; values are undesigned.
- **Bridge-enabling private** — C28 marks the bridge hexes; the private that lets a
  company build a bridge is a later Privates story.
- **Mainland regions** (N/D/E/S) — each splits geo+cities on top of the C02 skeleton
  when scheduled (see backlog note).

**PRD reconciliation (resolved 2026-07-24).** PRD §6.2 previously said F17/L11 must
be *reworked* because the second city "must emerge from the ruins." Corrected: the
second city is an **optional, emergent play-time** development (not on the starting
map, not guaranteed), so the pre-placed cities are legitimate minor-home cities and
need no rework. PRD §6.2 updated accordingly.

## In-flight changes

- **2026-07-24 · Board stubs split (finer granularity).** Old C01/C02 (island + "4 mainland
  regions") were too coarse; per designer, each region = geography + cities pass. Verantum → C01
  (geography) + C27 (cities/minors) + C28 (bridges); C02 repurposed to the deferred map skeleton;
  mainland regions to be split when scheduled.
- **2026-07-24 · PRD §6.2 corrected.** The emergent "second city" is optional/play-time, not a
  map fixture — pre-placed cities are legitimate minor homes (no rework).
- **2026-07-27 · Designer map iteration (in-session).** Ruins reduced to a 12-hex cluster; Ostia
  moved to I14 (east coast); water trimmed (B7/B9, H1); bridges rendered as the `bridge` icon +
  offboard-style spikes (not the cost triangle); Atlanteum revenue + Verantia $10 base added.

## Retrospective

### What went well

- **Propose → render → iterate nailed it for map content.** Every change was
  screenshotted in the real app immediately, so the designer steered by what they
  *saw* — 4 ruins-cluster passes, bridge-style rework, value repositioning. The
  `verify-screenshot.mjs` harness from the Sprint-1 retro paid off directly.
- **Section-by-section with designer input** kept the creative calls (city/dit
  names, 3rd-city location) with the designer while mechanics were handled inline.
- **Cross-track discipline held** — minor names/certs (C04), ruins values (C08),
  and the bridge private were deferred cleanly instead of bleeding in.
- **Backlog refined mid-planning** — the oversized C01/C02 were split into
  finer, honestly-sized stories when the designer flagged the volume.

### What didn't

- **Renderer conventions cost repeated guess-and-check** — the value-angle
  convention (`0`=bottom), bridge `Bridge`-atom-vs-`bridge`-icon, and dit naming
  (needs one group per name) each took render cycles to pin.
- **Story boundaries blurred under live iteration** — Atlanteum revenue and the
  Verantia value landed in C01; water trims spanned C27/C28. *(Designer: this is
  inherent — much design lives only in their head and surfaces by seeing the map.)*
- **`18dragon.json` wasn't version-controlled** — the whole detailed island
  existed only as a working file with no history.

### Lessons / workflow adjustments (made real)

1. **Rendering cookbook** — new `docs/18xxmaker-cookbook.md` captures the
   conventions we paid to learn (value-angle, numbered tokens, dits, bridges, the
   render-iterate loop); referenced from `CLAUDE.md`.
2. **Front-load elicitation** — `agile-story` gained a step to actively draw out
   the designer's full mental model for a section/region before drafting, so more
   lands in the AC up front (won't kill emergent tweaks, but shrinks the
   only-in-my-head gap).
3. **Version control** — `git init` on the 18Dragon project so the game file +
   artifacts have history.

### Action items

- [x] Write `docs/18xxmaker-cookbook.md`; reference from `CLAUDE.md`.
- [x] Add the elicitation step to `agile-story`.
- [x] `git init` the project + `.gitignore` + initial commit.
- [ ] **Next sprint:** mainland — **C02** (map skeleton placing all 5 regions),
      then per-region geo+cities splits.
