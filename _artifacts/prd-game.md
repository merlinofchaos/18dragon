# 18Dragon — Game Design Requirements (PRD: Game)

**Designer:** E. Halsey Miles
**Status:** 🚧 skeleton — to be written in a focused pass
**Base game:** 1822 (variant)

> This is the source of truth for the *game's* requirements. Design content
> currently in `CLAUDE.md` (World Design, regions, minor distribution, Verantum
> mechanics) will be consolidated here. Until then, `CLAUDE.md` remains the
> working reference — see it for details not yet migrated.

---

## 1. Vision & Pillars

**Pitch.** *18Dragon* is an 1822-lineage 18xx set in a fantasy land of five
regions, used as a testbed for several design ideas layered onto the 1822
chassis: **permit-gated building**, **mergers in place of concessions**, a
**modular board that scales to player count** by switching regions on and off,
and standout regional mechanics like the **Verantum ruins**. It asks how far the
1822 spine can stretch to support a more flexible, scalable, fantasy-flavored game.

**Design pillars** (the bets every decision serves):

1. **Modified 1822 chassis.** Inherit the 1822 spine — minors, majors, bidboxes,
   the full train roster, and the 1822 auction system. **No concessions**; their
   role is replaced by mergers (see Pillar 3). Every divergence from 1822 is
   deliberate and stated.
2. **Permit-gated building.** Laying a **new yellow tile** in a region requires
   that region's permit. **Upgrading** an existing tile does **not**. Permits
   arrive with minors (each minor holds a permit for its home region) and via
   some privates (additional permits). This governs where and how fast companies
   expand.
3. **Mergers in place of concessions.** A merger mechanism in the spirit of
   1822PNW but **less restrictive**. Mergers replace 1822's concession system as
   the path by which majors come into being and grow. *(Mechanical detail — how a
   major forms without concessions — is resolved in § 5.)*
4. **Player-count scaling via a modular board.** Regions can be made unavailable
   to fit fewer players, removing their companies, privates, and minors along
   with the map area.
5. **Distinct fantasy regions.** Five colorblind-safe regions, each with its own
   terrain, phonetics, and identity; Verantum's ruins/metro is one such regional
   showcase, not the headline.

**Tie-breaker.** When two pillars conflict, **player experience at the table
wins** — the 1822 chassis and the new mechanisms are both negotiable in service
of the best play.

## 2. Players & Session

- **Players:** 3–6. Base 1822 supports 3–7; 18Dragon caps at **6** (7-player out
  of scope). 2-player is also out of scope — the game isn't expected to work at
  that count.
- **Currency:** `#gp` (gold pieces; name provisional — see § 8 / Open Questions).
- **Bank:** 12,000 gp.
- **Expected length:** _open question — target play time TBD._

**Starting capital & certificate limits** — 18Dragon-specific (diverged from both
1822 and PNW), **provisional** pending playtest (§ 7). Derivation in § 6.3.

| Players | 3 | 4 | 5 | 6 |
|---------|---|---|---|---|
| Cert limit | 16 | 16 | 16 | 13 |
| Starting cash (gp) | 375 | 375 | 375 | 300 |

- **Cert limits** scale with the number of **active majors** (§ 6.3), set so some
  major shares always go unpurchased — not with headcount as in 1822.
- **Starting cash** is deliberately low at small player counts (fewer regions to
  fund); anchored below PNW's constant ~1500 total. Game totals: 1125 / 1500 /
  1875 / 1800 for 3 / 4 / 5 / 6 players.

## 3. The World

Worldbuilding (capitals, culture, naming/phonetics, lore) lives in the `docs/`
world bible (`docs/world-bible.md`). This section keeps only the game-mechanical
structure of the world.

### 3.1 Regions

The map is five regions; each is permit-gated for building (§ 6). Region identity
appears on every hex as a colorblind-safe colored letter, rendered even under
placed tiles (see `prd-tooling.md § 2.2`). Colors are Okabe-Ito + purple.

| Letter | Region | Color | Terrain | Role |
|--------|--------|-------|---------|------|
| A | Verantum | Purple `#7B2D8B` | Ruins (island) | **Core** |
| N | Caelimor | Sky blue `#56B4E9` | Coastal / plains | **Core** |
| D | Gördum | Amber `#E69F00` | Mountains | **Core** |
| E | Varstova | Teal `#009E73` | Hills | Scaling (4+) |
| S | Muravel | Vermillion `#D55E00` | Plains | Scaling (5+) |

- **Core regions (A, N, D)** are always in play.
- **Scaling regions (E, S)** are added as player count rises (§ 3.2).
- Terrain drives building/upgrade costs (mountains, hills) per the schema's
  terrain system.

### 3.2 Region availability & player scaling

The modular board scales by **adding** regions as players increase. What exactly
is removed with a dropped region — its companies, privates, minors, and map
area — is specified in § 6.

| Players | Live regions | # regions |
|---------|--------------|-----------|
| 3 | A, N, D | 3 |
| 4 | A, N, D, **E** | 4 |
| 5 | A, N, D, E, **S** | 5 |
| 6 | A, N, D, E, S | 5 |

(5- and 6-player both play the full five-region map.)

### 3.3 Map

- **Verantum (island)** — drafted in `18dragon.json` (water ring, purple ruins
  hexes, central gray 4-slot ruins city, two outer cities, offboard Atlanteum).
- **Four mainland regions** — to be laid out from the doodle map
  (`18xx_Dragon doodle map.jpg`).

## 4. Companies

Company **structure** (counts, distribution, special roles) is fixed here; the
**named rosters** (company names, abbreviations, colors, token counts, home
hexes) are generated later as content stories.

### 4.1 Major companies

- **10 majors, 2 per region.** Region-associated (§ 5.1): a merger needs an
  available major for the home minor's region.
- Named roster, abbreviations, colors, token counts → content stories.

### 4.2 Minor companies

- **30 minors, 6 per region.** Each automatically carries a permit for its **home
  region** (§ 6.1).
- The per-region count of 6 is a **starting point** — playtest may revise it.
- Named roster → content stories.

### 4.3 Privates

**30 privates total.** Notable roles:

- **Region permit privates (5).** One per region (§ 6.1). $10 revenue while
  player-owned; when bought into a company they close and become that region's
  permanent permit.
- **The opener private (phlogiston engine).** Represents the company that invents
  the phlogiston engine and builds the first train. Always starts in **bid box 1**
  (replacing 1822's always-first minor), begins in the **Gördum (D) capital,
  Brekheim**, and carries a **permanent 5-train (5P)**. It **cannot be bought into
  a company until phase 5**, so it lingers with its owner — the classic 1822
  pattern of investing early (funds tied up) in exchange for a free permanent
  train later.
- **Player-count-gated privates.** Some privates are marked **4+** or **5+** and
  are removed if that player count is not present (ties to § 6.3 scaling).

The named private roster, and exactly which privates carry the 4+/5+ gates →
content / balance stories.

## 5. Core Mechanics

18Dragon keeps the 1822 spine — minors, majors, bidboxes, the full train roster,
and the 1822 auction system — drafted in `18dragon.json` (trains, phases,
market). The subsections below capture where 18Dragon diverges. **The headline
divergence is § 5.1: concessions are gone, replaced by mergers.**

### 5.1 Mergers (majors form here; concessions removed)

18Dragon has **no concessions**. A major exists only by merging two minors,
following **1822PNW** with these changes:

- **No associated minors** — majors aren't pre-tied to minors as in PNW.
- **Timing & order.** Mergers occur in a dedicated **merger round after each
  operating round** (as in PNW), from phase 2 onward, resolved in **descending
  share-price order** (highest-valued eligible minor first — PNW §6.1.2).
- **Initiator.** A single player must be **president of both** minors merged.
- **The two minors.** Their tracks must be **connected** by a route not blocked
  by tokens (as in PNW), and they must be in **different regions**.
- **Home token & major.** Choose one minor to provide the major's **home token**
  (placed at that minor's location). Choose an available major **associated with
  the home minor's region**; if that region has no available major, that minor
  can't be the home token.
- **Absorption.** All assets (treasury, trains, tokens, privates) of both minors
  transfer to the major; both minors are removed from play.
- **Tokens.** The major ends with its placed **home token**, **2 exchange tokens**
  in reserve, and a **destination token** (base-1822 destination rules). The
  **non-home minor's board token** is the **president's choice** (PNW step 7): remove
  it and either place a major token there (from exchange) **or** vacate the hex and
  move a token from exchange → available.
  - An **exchange token** is a reserve token (not on the board) that converts to
    a placeable token when the major later **acquires a minor**, or via the **P28
    Station Token Swap** private *(C13 — resolves the §9 "other means")*.
- **Stock & money (as 1822PNW).** Take each minor's **market price**, double it,
  sum the two, and divide by the **chosen par price**; round up or down = major
  shares the player receives. Round **up** → the player pays the company the
  difference; round **down** → the company pays the player. **Par** is chosen from
  the major values **55–100**, must be **≥ the doubled sum ÷ 6**, and **must be 100**
  if the sum exceeds 600 *(C13)*.

- **Capitalisation is formation-based, not phase-based** *(C06, 2026-08-18)*.
  1822 gates capitalisation by phase (incremental in 2–5, full in 6–7). 18Dragon
  keys it to **how the company came to be**: a **merged** company always takes
  **incremental** capitalisation; **full (100%)** capitalisation applies only to a
  company floated during a **stock round**.
- **Acquiring a minor from a bid box** keeps 1822's **200gp** price *(C06)*.

> **Divergence from 1822:** concessions removed entirely; mergers are the sole
> path to majors. Implication for § 4: **majors are region-associated** (a pool
> per region; a merger needs an available major for the home minor's region).

### 5.2 Auction & bidbox

The **1822 auction/bidbox** system, unchanged. Each stock round, items are bid via
the bidboxes as in 1822. **Items are minors and privates** (no concessions); the
**opener private** always occupies **bid box 1** at game start (§ 4.3). The bid
boxes are therefore **4 minor + 3 private** (1822's 3 concession boxes are gone).

- **Bid cubes: a flat 4 per player at every count** *(C06, 2026-08-18; provisional
  — § 7)*, replacing 1822's 6 / 5 / 4 / 3 / 3 by player count. This and the item
  mix are the only changes to the auction; the bidding mechanics themselves are
  unchanged.

### 5.3 Trains & phases

Train roster and phase structure are inherited from **base 1822** — as currently
drafted in `18dragon.json` — **not** PNW. (PNW's roster was considered but its very
small number of 4-trains plays poorly; base 1822's counts are preferred.)

This makes 18Dragon a deliberate hybrid: **mergers and round structure from PNW
(§ 5.1, § 5.4), but the train roster from base 1822.**

- The **5P** permanent 5-train is the one carried by the **opener private**,
  buyable into a company only from **phase 5** (§ 4.3).
- Phase table (colors, tile limits, OR counts) as drafted; capture any further
  divergence here as it arises.
- **Possible low-count adjustment (note):** at **3–4 players** we may remove some
  **3- and 4-trains** (fewer companies need fewer trains). To validate in
  playtest — see § 6.3 / § 7.

### 5.4 Round structure

Follows **PNW**: each **Stock Round** → the phase's **Operating Rounds**, with a
**Merger Round after every Operating Round from phase 2 onward** (§ 5.1). Phase 1's
single OR (starting packet) has no merger round. OR counts per phase come from the
phases table (1 in phase 1, 2 in phases 2–7).

- *(Correction 2026-08-18, C06: base 1822 has **no** separate "Choices round" —
  concession conversion happens inside the Stock Round (§4.6–4.7). With concessions
  gone there is simply nothing of the sort to carry over; the earlier "drops the
  choices round" note was an error and is removed.)*
- *Reconcile:* the `rounds` tracker in `18dragon.json` (OR1/OR2/SR) should add the
  **Merger** round (content task).

### 5.5 Track laying & permits in play

Track-laying follows 1822 (tile colors gated by phase). The **permit gate (§ 6.1)**
applies in every OR: laying a **new yellow tile** in a region requires the
operating company to hold that region's permit; **upgrades are permit-free**, and
once a hex is opened any company may upgrade it. On **Verantum**, ruins hexes use
the **special ruins tile lays** (§ 6.2).

## 6. Special Mechanics

### 6.1 Region permits

Breaking new ground is permit-gated by region.

- **Rule.** Laying a **new yellow tile** in a region requires the acting company
  to hold a **permit** for that region. **Upgrading** an existing tile requires
  **no** permit. Once a hex is opened with yellow, **any** company may upgrade it
  regardless of permit — only new yellow ground is gated.
- **Companies hold permits, permanently** — never consumed, no cap; a company may
  hold permits for multiple regions.
- **Minors.** Each minor automatically holds a permit for its **home region**.
- **Permits into majors.** When a minor is **merged into** or **acquired by** a
  major, that **minor's certificate acts as a permit** for the minor's region
  within the major. (A merger absorbs two minors in different regions → a freshly
  merged major holds **both** regions' permits; each later minor acquired adds
  that minor's region.)
- **Permit privates.** One **region-specific permit private per region** (5
  total). While owned by a **player**, it pays **$10 revenue**. When **bought into
  a company**, it **immediately closes** and becomes a **permanent permit** for
  its region in that company — the way a **minor** (or major) gains a permit for a
  non-home region.
- **Cross-ref § 5.1:** because a minor's cert acts as a permit inside a major,
  acquiring a minor both grants its region permit **and** converts an exchange
  token toward an available token.

> The 5 permit privates are rostered in § 4.3.

### 6.2 Verantum island — ruins & metros

Verantum (region A) is an isolated island whose ruined cities start nearly
worthless but can grow into the map's richest destinations. Isolation + the
permit gate are offset by cheap early entry and dual high-value-city upside.

- **Central ruins city.** Gray, permanent, **4 token slots**, base value **10gp**
  — the high slot count makes early entry cheap.
- **Developing a ruins hex** *(finalized in C08 — full spec in
  `docs/signature-mechanics.md` §2).* A ruins hex may become **plain track**, a **dit**,
  a **city** (regular yellow city tile, **20gp**, has a token slot), or a **metro** (the
  only *special* ruins tile). All follow normal track rules + the region-A permit for new
  yellow (§6.1). Once a yellow tile is laid, the hex is committed to its type and only
  **upgrades** along normal paths. *(Dits do **not** upgrade into cities.)*
- **Metro** = the special dead-end **stub tile** (C15), laid for **10gp**, that **raises
  the printed value of the adjacent ruins city** by its amount: **+10gp** yellow →
  **+20gp** green (value) or **+10/+10** green (branch, boosting two adjacent cities).
- **No forced plain-track rule (emergent).** Metros are dead-ends, so a route to a ruins
  city needs a non-metro approach; ringing the central city in metros on all 6 adjacent
  hexes strands it (no runnable route once L-trains rust). Self-defeating, **not
  prohibited** — players leave an approach open by choice.
- **Second city (optional, emergent).** Not a subsystem — a ruins hex developed with a
  **yellow city tile** (above) upgrades normally, takes metros, and shares the same
  100gp cap; it can rival the central city late game. **Never pre-placed, not
  guaranteed.**
- **Coastal hexes** carry dits/towns (vestigial inhabitants).
- **Value cap.** A ruins city's value is **hard-capped at 100gp** (base 10 + metros; vs
  40/50/60 elsewhere).

> **Starting-map cities.** The island's pre-placed cities (F17, L11, plus a 3rd
> added in C27) are legitimate starting cities that host **minor company homes** —
> they do **not** need reworking. They are separate from the optional "second city"
> above, which is an emergent play-time development and is never pre-placed.

### 6.3 Player-count scaling (modular board)

18Dragon scales to player count by switching regions on/off (§ 3.2: A/N/D core;
+E at 4p; +S at 5p). The scaling is largely **emergent**, not a bolt-on subsystem.

- **Dropping a region removes:** its **6 minors**, its **2 region-associated
  majors**, and its **permit private** — plus any **privates gated 4+/5+** that
  the player count excludes.
- **Map area needs no explicit removal.** With a region's permit private and home
  minors gone, **no company can hold that region's permit** and none starts there
  — so its hexes are **never buildable** (can't lay yellow without the permit;
  nothing to upgrade). The area just sits inaccessible. *(A double-sided board
  physically omitting E/S is a possible production nicety, not a rules need.)*
- **Self-constraining geography.** The three core regions **A, N, D all border
  each other**, so removing **S** (south) and **E** (east) leaves only
  inaccessible dead space at the edges — the core stays a valid connected board,
  no sealing mechanism required.
- **What stays fixed:** **bank size** and the **number of ORs** do **not** scale
  with player count. The **train roster** is fixed too, with one caveat under
  evaluation: at **3–4 players** some **3- and 4-trains may be removed** (fewer
  companies need fewer trains) — see § 5.3 / § 7.

**Cert limits scale with active majors.** Because majors are region-associated
(§ 4.1), the number of majors in play scales with the active regions — 6 / 8 / 10
/ 10 majors at 3 / 4 / 5 / 6 players (≈9 certs each). Cert limits are set so that
**some major shares always go unpurchased** at game end:

| Players | Majors | Major certs (≈9×) | Cert limit total | Per-player |
|---------|--------|-------------------|------------------|------------|
| 3 | 6 | 54 | ~48 | 16 |
| 4 | 8 | 72 | ~64 | 16 |
| 5 | 10 | 90 | ~80 | 16 |
| 6 | 10 | 90 | ~78 | 13 |

**Cash scaling — a deliberate experiment.** Unlike 1822 (constant ~2100 total)
and even PNW (constant ~1500 total), 18Dragon lets the **total** starting cash
**fall at low player counts**, because there's less board to fund. Anchored below
PNW's per-player figures: **375 / 375 / 375 / 300** (3–6p), for game totals of
1125 / 1500 / 1875 / 1800. This is one of the game's chief balance experiments;
values are provisional (§ 2, § 7).

## 7. Balance Targets

18Dragon is an experiment; several numbers are deliberately unusual and must be
validated at the table. This is the register of what we're least sure of and how
we'll know it's wrong. Validation is **on-table playtest first** (not digital);
findings feed retrospectives → PRD number updates.

1. **Cash under-scaling at low counts** — 375/375/375/300 (totals
   1125/1500/1875/1800). *Watch:* are 3–4p players cash-starved, or is it healthy
   tension? Loosen if games stall early.
2. **Cert limits via active majors** — 16/16/16/13. *Watch:* do some major shares
   actually go unsold at end (intended)? Is game length right?
3. **6 minors per region (30)** — *Watch:* enough merger fodder + auction variety
   without bloat; per-region count may change.
4. **Metro value increments (§ 6.2)** — unset. *Watch:* Verantum should be able to
   *rival* but not trivially dominate (cap ~100).
5. **Low-count train removal (§ 5.3 / 6.3)** — possibly cut some 3s/4s at 3–4p.
   *Watch:* train gluts at low counts.
6. **Merger economics (§ 5.1)** — the double-market-price ÷ par formula + 2
   exchange tokens. *Watch:* mergers attractive but not dominant over running minors.
7. **Permit scarcity** — 5 permit privates + home permits. *Watch:* cross-region
   building achievable but meaningfully gated.

## 8. Out of Scope

- **2- and 7-player counts** (§ 2). Play range is **3–6**.
- **Rules enforcement in the 18xxMaker fork** — it renders and annotates only; no
  upgrade-legality, metro-value math, or permit-gating validation
  (`prd-tooling.md § 3`). *(That would come from a digital engine — a possible
  future phase, § 10.3 — not the reference tool.)*
- **Upstreaming the fork** — the 18xxMaker changes remain a private fork.

## 9. Open Questions

**Mergers (§ 5.1):** ✅ *Resolved (C13, 2026-08-20 — see `docs/signature-mechanics.md`
§3).* Exchange tokens also become available via the **P28 Station Token Swap** private;
par is chosen from **55–100**, **≥ doubled-sum ÷ 6**, forced to 100 if the sum > 600; the
**non-home minor's hex is the president's choice** (re-token from exchange, or vacate and
move exchange → available).

**Verantum (§ 6.2):** ✅ *Resolved (C08, 2026-08-19 — see `docs/signature-mechanics.md`
§2).* Metro increments +10/+20/+10+10 (C15 tiles), raising the adjacent city's printed
value, hard-capped at 100gp; ruins lays cost 10gp (metro) / 20gp (city); the second city
is just a normal yellow city tile; the "≥1 plain track" constraint is emergent, not a
rule.

**General:**
- Currency name (`#gp` provisional).
- Target play length (§ 2).

## 10. Deliverables

Player- and reference-facing outputs 18Dragon must ship. These live in `docs/`
(deliverable documentation), not `_artifacts/`.

### 10.1 Rulebook

Authored the standard 1822-variant way: **start from the base 1822 rulebook, then
mark what 18Dragon adds / removes / changes, each with a reference back to the
1822 rule it modifies.** A reader who already knows 1822 should be able to read
only the highlighted deltas.

Known deltas to fold in (this PRD is the source of truth):
- **Concessions removed; mergers added** (§ 5.1) — the largest change.
- **Region permits gate new yellow-tile building** (§ 6.1).
- **Modular board / player-count scaling** (§ 6.3); players **3–6**.
- **Verantum ruins & metros** (§ 6.2).
- **Cash and cert-limit divergences** (§ 2, § 7).
- **No Choices round; merger round after each OR** (§ 5.4).

This is a content epic; the rulebook itself goes in `docs/`.

### 10.2 Game reference (18xxMaker output)

The 18xxMaker reference document (map, tiles, market, roster/reference cards)
produced by the fork — see `prd-tooling.md`. A play aid, not a rules engine.

### 10.3 Digital implementation (future, optional)

Not required for the game, but a **possible later phase**: once the design is
settled in 18xxMaker, implement 18Dragon as an **18xx.games** engine for **online
playtesting**. A local 18xx.games copy exists, runnable via **Docker** on an
available server (previously working; exact setup to be rediscovered). The
abandoned `g_1822_dragon` dir (a stale 1822PNW copy in the 18xx engine) could seed
it. Sequenced **after** the reference tooling and on-table playtesting.

## 11. Components (production manifest)

The immediate goal of the whole project is to produce the **18xxMaker files** that
generate the physical pieces needed to **playtest 18Dragon on the table**. This is
the manifest of what must be produced and how. Most are 18xxMaker outputs;
**stickers are produced separately** via a Silhouette Cameo workflow (18xxMaker
does stickers poorly).

| Component | Produced via | Notes |
|-----------|--------------|-------|
| **Board (map)** | 18xxMaker | `map.hexes` — 4 mainland regions + Verantum island; permit letters + ruins (fork work: `prd-tooling.md § 2`). **Phase/round track lives on the board.** |
| **Tiles** | 18xxMaker | track tile sheet(s) |
| **Tile manifest** | 18xxMaker | tile inventory / quantities |
| **Stock market** | 18xxMaker | 1D market (drafted in `18dragon.json`) |
| **Major charters** | 18xxMaker | 10 (2 per region) |
| **Minor charters** | 18xxMaker | 30 (6 per region) |
| **Certificates** | 18xxMaker | major shares (president + singles) + minor certs (a minor cert also acts as a permit, § 6.1) |
| **Privates** | 18xxMaker | 30 private cards |
| **Trains** | 18xxMaker | train cards (base-1822 roster in `18dragon.json`) |
| **Bid boxes** | 18xxMaker | for the auction (§ 5.2) |
| **Misc cards** | 18xxMaker | player-order card; turn/reference cards |
| **Stickers** | **Silhouette Cameo** (not 18xxMaker) | station tokens, stock-market tokens, revenue-tracker tokens, **destination tokens**, misc private-power tokens |

**Not produced:** currency (use **poker chips**; `#gp` is only the value shown on
charters/market), a **par chart** (unnecessary), and **destination cards**
(destinations are token stickers only).
