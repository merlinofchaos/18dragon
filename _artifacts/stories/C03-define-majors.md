# C03: Define the 10 major companies

- **ID:** C03
- **Type:** content
- **Epics:** Companies
- **Sprint:** sprint-10
- **Status:** review
- **Created:** 2026-07-30

## Story

As the designer,
I want the 10 major companies defined in `companies.json` — region-themed names,
distinct memorable abbreviations, colorblind-safe two-tone token colors, and a
uniform token count,
so that the majors are a fixed roster ready to feed charters (C17), certs (C25),
and stickers (C24).

## Acceptance Criteria

1. **10 majors, 2 per region** (region-associated, PRD §4.1), in `companies.json`
   under a `majors` array. Regions: Verantum (A), Caelimor (N), Gördum (G),
   Muravel (M), Varstova (V).
2. Each major has:
   - **`name`** — old-timey railroad name with a fantasy twist, **themed to its
     home region's culture** (Verantum Latin/Roman, Caelimor Celtic-ish, Gördum
     Germanic/Norse-dwarven, Muravel Mediterranean/Arabic, Varstova Slavic-ish;
     world-bible §Naming).
   - **`abbrev`** — a short (2–4 char) abbreviation, **distinct and unambiguous
     across all 10** (majors are referenced by abbrev in play). No two collide or
     read alike.
   - **`color_primary` + `color_secondary`** — the two-tone token scheme, **visually
     distinct between majors and colorblind-safe** (the pair works for deuteran/
     protan/tritan). Designer specifies/approves the palette.
   - **`tokens`** — **6 each (uniform): 1 home + 4 regular + 1 destination.** The
     destination token is placed at the major's fixed destination city.
   - **`destination`** — the major's **fixed destination city** (see AC 6).
   - **`region`** — home region letter (A/N/G/M/V).
   - **No home hex** (majors form by merging two minors, §5.1).
3. **Abbreviation-distinctness check:** list all 10 abbreviations together and
   confirm none are confusable (the explicit designer priority).
4. **Colorblind check:** the 10 primary colors are separable under common CVD; the
   primary/secondary pair on each token is distinguishable.
6. **Fixed destinations (designer 2026-07-30).** Each major has a **fixed
   destination city**; a **Home → Destination** run scores a bonus. Destinations are
   **1 region away** and must be **available whenever the home major is in play** —
   so a core-region major (A/N/G, present at 3+) destinations to a **core region**,
   while a **Muravel (S = 5+)** major may use **Varstova (E = 4+)** since at 5p all
   regions are present. Region distribution:
   - **Verantum (A)** majors ×2 → **Caelimor (N)**
   - **Gördum (G)** majors ×2 → **Caelimor (N)**
   - **Caelimor (N)** majors → **1 Verantum (A) + 1 Gördum (G)**
   - **Muravel (M)** majors → **1 Verantum (A) + 1 Varstova (V)** (Muravel majors
     exist only at 5p, where Varstova is present — and this gives Varstova a
     destination)
   - **Varstova (V)** majors ×2 → **Gördum (G)** (Muravel may be absent at 4p)
   - Net destination spread: **N = 4, A = 2, G = 3, V = 1**.
   Pick the **specific destination cities** from those regions' existing cities at
   implementation (distinct where possible). **Bonus = the destination city's value
   is doubled** on a Home → Destination run (no separate number to tune).
7. Output is the **`companies.json`** master (tool-agnostic). **No `18dragon.json`
   wiring** this sprint (map home tokens/logos are later). A companion doc is
   optional — keep `companies.json` canonical.

## Tasks / Subtasks

- [ ] Create `companies.json` with a `majors` array + `meta`/`schema` (AC: 1, 5)
- [ ] Propose the 10 majors for designer approval (AC: 2, 3):
  - [ ] Region-themed names (2 per region)
  - [ ] Distinct abbreviations — present the full set together for the collision
    check (AC: 3)
  - [ ] Two-tone colorblind-safe palette (primary+secondary ×10) for approval (AC: 4)
  - [ ] Pick each major's destination city per the AC-6 distribution (AC: 6)
- [ ] Cross-check region association + counts (2×5 = 10; destinations all in A/N/G) (AC: 1, 6)

## Dev Notes

- **Sources:** PRD §4.1 (majors, region-associated, merger-formed), world-bible
  §Naming (per-region conventions), 18dragon.json `tokenTypes` (token cost scheme),
  the region palette (Verantum purple, Caelimor sky-blue, Gördum amber, Varstova
  teal, Muravel vermillion) — but **major token colors are their own distinct
  colorblind-safe palette**, not the region hue (designer 2026-07-30).
- **Abbreviations are the designer's explicit priority** — like 1830's CPR/NYNH.
  Optimize for distinctness first, flavor second.
- **Minors (C04) are separate:** no color (white tokens), referenced by number —
  don't conflate.
- `companies.json` schema mirrors `privates.json`/`trains.json` (meta + schema +
  arrays). Majors and minors can share the one file (`majors`, `minors`).

## Validation

- `companies.json` is valid JSON; 10 majors, 2 per region; abbreviations listed and
  confirmed distinct; palette approved + colorblind-checked; uniform token count set.
  `18dragon.json` unchanged. Design review with the designer.

## References

- [Source: _artifacts/prd-game.md#4.1 Major companies]
- [Source: docs/world-bible.md#Naming Conventions]
- [Source: 18dragon.json tokenTypes], [Source: CLAUDE.md#tokenTypes]

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- Created `companies.json` (majors + empty minors array) with the 10 majors.
- **Abbreviations (distinct, verified unique):** VIR, PAX (Verantum) · DKR, AEL
  (Caelimor) · BRK, GML (Gördum) · KVR, SAB (Muravel) · ZOR, KRM (Varstova).
- **Names** region-themed (Roman / Celtic / Norse-dwarven / Mediterranean / Slavic).
- **Tokens** 6 each (home + 4 + destination). **Destinations** picked from real map
  cities, spread **N=4, A=2, G=3, V=1** (SAB → Varstgrad gives Varstova one). Bonus
  = destination value doubled on a Home→Destination run.
- **Colors are PROPOSED** — a colorblind-safe primary set (Okabe-Ito/Tol) with a
  light/dark secondary, none matching the major's own region hue. **Designer to
  finalize the palette** (they asked to specify colors).
- No `18dragon.json` wiring (later). `companies.json` valid; checks pass.

### Files Changed

- `companies.json` (new) — data master; 10 majors (minors array empty, → C04).
