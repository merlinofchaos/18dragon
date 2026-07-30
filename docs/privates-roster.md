# 18Dragon — Privates Roster (design documentation)

The 30 private companies of 18Dragon, captured as design documentation. This is
the human-readable companion to **`privates.json`** (repo root) — the canonical,
tool-agnostic data master (custom 18Dragon schema) that a renderer consumes. It is
*not* the game JSON — wiring `18dragon.json`'s `privates` is a later components pass.

Built incrementally across Sprint 8:
**C05** region permits (this doc's first section) · **C10** the opener · **C11**
the remaining privates + externally-sourced rules text · **C12** player-count gates.

---

## Card anatomy (applies to every private)

18Dragon privates are **two-sided** 1822-style cards. Each roster entry below
records the field values; layout/rendering is **C42**.

**Player-owned side**
- **Function label** (top, yellow band) — what the private does, in a few words.
- **In-game title** — the flavor name.
- **Phase** (left) — the earliest phase it may be bought in.
- **Player revenue** (right) — what it pays its owning *player* each OR.
- Image (center) — **deferred until after playtesting**; left blank for now.
- **Cadence** (bottom-left) — `One Time` (single-use ability) or `Each OR`
  (recurring), or blank (e.g. trains).
- `PLAYER-OWNED` / `PRIVATE COMPANY` (bottom-middle).
- **Number badge** (bottom-right) — `P#`, **colored by who can buy it in:**
  **green = a Minor may buy it in**, **red = a Major must buy it in**.
  **18Dragon addition:** also print the class in text (`Minor/Major` or `Major`)
  — color alone is too subtle.
- **Players required** (18Dragon-specific field) — `3+`, `4+`, or `5+`. The
  minimum player count at which this private is in the game. In a 3- or 4-player
  game, privates marked above the player count are simply removed from the set —
  the game scales by dropping `4+`/`5+` privates (see **C12**). `3+` = always
  present.

**Company-owned side**
- Function label · in-game title · **rules text** (the in-company ability) ·
  **company revenue** · number badge · `COMPANY-OWNED` / `PRIVATE COMPANY`.
- **Exception — permanent-train privates:** the reverse is the *actual train card*,
  not a company-owned private face.
- **Exception — privates that close on buy-in** (e.g. the region permits below):
  likely **no persistent company-owned face** — the effect fires once and the
  private is gone. *(Open — C42 to confirm the reverse: a "permit granted" marker,
  or omit the back entirely.)*

Class shorthand used below: **Minor/Major** (green badge) = either class may buy
it in; **Major** (red badge) = majors only.

---

## Region Permits (C05)

Five permit privates — **one per region**. All share identical mechanics; they
differ only by the region whose permit they grant.

**Shared mechanics** (PRD §6.1, `author-privates.md`):

| Field | Value |
|---|---|
| Class | **Minor/Major** (green badge) |
| Phase available | **1** |
| Player revenue | **$10** each OR |
| Cadence | **One Time** (the buy-in permit grant fires once) |
| Players required | **varies by region** — a permit is dropped with its region (§6.3): core permits **3+**, **Varstova 4+**, **Muravel 5+** (assigned in C12) |
| Function label | **Region Permit** |

**On buy-in:** the private **immediately closes** and its owning company gains a
**permanent permit for the named region** — identical to how a minor's certificate
grants its home-region permit inside a major (PRD §6.1). Permits are permanent,
never consumed, uncapped; a company may hold permits forB several regions.

**Company-owned side:** none in the usual sense — the private closes on buy-in
(see card-anatomy exception above). *(Open for C42.)*

### The five cards

| P# | Region (letter) | In-game title | Function label | Class | Phase | Player rev. | Players req. | Grants |
|----|------|---------------|----------------|-------|-------|-------------|--------------|--------|
| P5 | **Verantum** (A) | *Collegium Verantium* | Region Permit | Minor/Major | 1 | $10 | 3+ | Verantum permit |
| P6 | **Caelimor** (N) | *Aeldun Wayfinders* | Region Permit | Minor/Major | 1 | $10 | 3+ | Caelimor permit |
| P7 | **Gördum** (G) | *Brekheim Trackgeld* | Region Permit | Minor/Major | 1 | $10 | 3+ | Gördum permit |
| P8 | **Muravel** (M) | *al-Kalavar Caravaneers* | Region Permit | Minor/Major | 1 | $10 | **5+** | Muravel permit |
| P9 | **Varstova** (V) | *Varstov Railwrights' Artel* | Region Permit | Minor/Major | 1 | $10 | **4+** | Varstova permit |

*In-game titles are proposals following each region's naming convention
(world-bible §Naming Conventions) — the in-world chartering body, not the capital.
Plain fallback if any is rejected: "<Region> Permit" (e.g. "Gördum Permit").
Private numbers assigned per the master numbering (C11a): permits are **P5–P9**.*

**Out of scope for C05:** bid-box seeding (permits enter the general randomized
auction row — only the C10 opener and one specific minor are hard-seeded to box 1);
player-count gates (C12); the permit *mechanic* rules (C07); card layout (C42).

---

## The Opener (C10)

One fixed private — the phlogiston-engine company that **always starts in bid box
1** and carries a **permanent 5-train (5P)**. It replaces 1822's always-first
minor as the game's fixed opening item.

**In-game title:** *Eldrok Phlogiston Werk* (Gördum/dwarven — *eldr*, Old Norse
"fire"). The dwarves of Brekheim who invented the phlogiston engine and built the
first train. *(Brekheim is flavor only — no board effect.)*

| Field | Value |
|---|---|
| Private number | **P1** |
| Function label | **Permanent 5-Train** (5P) |
| Class | **Major** (red badge) — a minor cannot buy it in |
| Phase available (buy-in) | **5** — cannot be bought into a company until phase 5 |
| Player revenue | **$5** each OR |
| Cadence | — (train private) |
| Players required | **3+** (always present) |
| Bid box | **Always box 1** at game start |

**The permanent 5-train (5P).** The reverse (company-owned) side **is the 5P
train card** — on buy-in the private is **flipped**, not exchanged; **no train is
taken from the supply**.

- The 5P is **permanent** (never rusts).
- It **counts against the train limit**.
- Acquiring it is an **acquisition action**, so a company may acquire it **even if
  already at train limit**. Once acquired, the company checks the limit and
  **discards any trains held in excess**.
- The phase-5 buy-in gate means the owning player's money is tied up early in
  exchange for a free permanent train later — the classic 1822 opener pattern.

**Deliberate divergence from PNW.** PNW's opener (P1, "The Olympian Hiawatha")
becomes a *normal* 5-train on acquisition (explicitly not a special/permanent
train). 18Dragon keeps PNW's **acquisition/train-limit wording** (acquisition
action, allowed at limit, discard excess) but makes the train **permanent (5P)**
per PRD §4.3. Class (Major-only) and player revenue ($5) match PNW exactly.

**Out of scope for C10:** card layout (C42); the general auction/bid-box *refresh*
mechanics (rules track — only "starts in box 1" is a property of this card).

---

## Master numbering (P1–P30)

The stable card numbers for the whole roster (proposed in C11a). Grouped by kind,
opener first. Owning story in the last column.

| P# | Private | Kind | Story |
|----|---------|------|-------|
| P1 | Eldrok Phlogiston Werk (5P) | opener / perm train | C10 |
| P2 | Permanent 2-Train — *The Ironhaul* | perm train | C11b |
| P3 | Permanent 2-Train — *The Deepdelver* | perm train | C11b |
| P4 | Permanent L-Train — *The Dampcart* | perm train | C11b |
| P5 | *Collegium Verantium* (A permit) | region permit | C05 |
| P6 | *Aeldun Wayfinders* (N permit) | region permit | C05 |
| P7 | *Brekheim Trackgeld* (G permit) | region permit | C05 |
| P8 | *al-Kalavar Caravaneers* (M permit) | region permit | C05 |
| P9 | *Varstov Railwrights' Artel* (V permit) | region permit | C05 |
| P10 | Bridge Tile — *The Aurelian Span* | 18Dragon-original | C11a |
| P11 | Bridge Tile — *Halvard's Crossing* | 18Dragon-original | C11a |
| P12 | Mining Troupe (a) | 18Dragon-original | C11a |
| P13 | Mining Troupe (b) | 18Dragon-original | C11a |
| P14 | Dwarven Mining Troupe (a) | 18Dragon-original | C11a |
| P15 | Dwarven Mining Troupe (b) | 18Dragon-original | C11a |
| P16 | Merger Negotiations | 18Dragon-original | C11a |
| P17 | Phlogiston Mine | 18Dragon-original | C11a |
| P18 | Phlogiston Car — *The Firebox* | 18Dragon-original | C11a |
| P19 | Phlogiston Car — *The Emberwain* | 18Dragon-original | C11a |
| P20 | Wands Delivery | 18Dragon-original | C11a |
| P21 | Verantum Recolonization | 18Dragon-original | C11a |
| P22 | Brekheim Locomotive Corporation | 18Dragon-original | C11a |
| P23 | Remove Town — *Dustfall Company* | sourced (PNW) | C11b |
| P24 | Remove Town — *The Hollowing* | sourced (PNW) | C11b |
| P25 | Extra Track Lay — *The Surveyors* | sourced (PNW) | C11b |
| P26 | Mail Contract — *The Raven Post* | sourced (PNW) | C11b |
| P27 | Mail Contract — *The Courier's Guild* | sourced (PNW) | C11b |
| P28 | Station Token Swap — *The Concord Charter* | sourced (1822CA) | C11b |
| P29 | Pullman — *The Gilded Carriage* | sourced (1822CA) | C11b |
| P30 | Pullman — *Wyvern Coachworks* | sourced (1822CA) | C11b |

*Grouping is loose (numbering is for card identity, not bid-box order). P16 Merger
Negotiations sits in the 18Dragon-original block though it is thematically a merger
card. Bid-box seeding is a separate rules-track concern.*

---

## 18Dragon-Original Privates (C11a)

The 13 privates whose text the designer authored directly (`author-privates.md`).
All pay **$10** player revenue and **$0** company revenue unless noted. Players
required is **3+** except the three gated here: **P11 Bridge → 5+**, **P15 Dwarven
Mining → 4+**, **P19 Phlogiston Car → 5+** (C12). Function labels below are
**proposed** — the exact top-band wording is a C42 layout detail.

| P# | In-game title | Function label | Class | Phase | Cadence | Players req. |
|----|---------------|----------------|-------|-------|---------|--------------|
| P10 | *The Aurelian Span* | Bridge Tile | Minor/Major (green) | 2 | One Time | 3+ |
| P11 | *Halvard's Crossing* | Bridge Tile | Minor/Major (green) | 2 | One Time | **5+** |
| P12 | *The Rockbreakers* | Mining Troupe | Minor/Major (green) | 1 | Ongoing | 3+ |
| P13 | *The Cragmen* | Mining Troupe | Minor/Major (green) | 1 | Ongoing | 3+ |
| P14 | *Durgrok Delvers* | Mining Troupe | **Major** (red) | 2 | Ongoing | 3+ |
| P15 | *Stonebeard Hewers* | Mining Troupe | **Major** (red) | 2 | Ongoing | **4+** |
| P16 | Merger Negotiations | Force Merger | Minor/Major (green) | 2 | One Time | 3+ |
| P17 | Phlogiston Mine | Mountain Route Bonus | Minor/Major (green) | 3 | One Time | 3+ |
| P18 | *The Firebox* | Phlogiston Car | **Major** (red) | 3 | Ongoing | 3+ |
| P19 | *The Emberwain* | Phlogiston Car | **Major** (red) | 3 | Ongoing | **5+** |
| P20 | Wands Delivery | City Route Bonus | Minor/Major (green) | 3 | One Time | 3+ |
| P21 | Verantum Recolonization | Dit → City | Minor/Major (green) | 3 | One Time | 3+ |
| P22 | Brekheim Locomotive Corporation | Free Brekheim Token | **Major** (red) | 3 | One Time | 3+ |

### Company-owned rules text

- **P10 / P11 — Bridge Tile** (*The Aurelian Span* / *Halvard's Crossing*;
  Minor/Major, Phase 2). When bought into a company, place a **special bridge tile**
  on one of the **3 bridge locations (M12, F19, R23)**. Other companies may run
  this track but must pay the owning company **10** from the route revenue.
- **P12 / P13 — Mining Troupe** (*The Rockbreakers* / *The Cragmen*; Minor/Major,
  Phase 1). The owning **company** gets a **40gp discount** when building on **hill
  or mountain** terrain. Troupes may be used together (stack).
- **P14 / P15 — Mining Troupe** (dwarven: *Durgrok Delvers* / *Stonebeard Hewers*;
  **Major, Phase 2**). The owning company gets an **80gp discount** when building on
  **mountain** terrain. Stacks with the other Troupes.
- **P16 — Merger Negotiations** (Minor/Major, Phase 2). While owned by a **minor**,
  the company may **close** this private to **initiate a merger with another minor
  company, even with no connecting track**. **If bought into a *major* it closes
  immediately for no effect** — so a player who can't use it isn't stuck with a
  dead certificate. *(Ties to the merger mechanic, C13.)*

*All four Troupes share the top-line label **"Mining Troupe"**; the italic
in-game names are unique per card (proposals — designer to approve). The dwarven
pair differ by name, the 80gp/mountain effect, and Major/Phase-2 availability.
Keeping the center of the board contestable needs plenty of discount cards, so
the regular Troupes are **not** player-count-gated (see C12 steer below).*
- **P17 — Phlogiston Mine** (Minor/Major, Phase 3). The owning company may **close**
  it to place a **+30 token on any mountain hex**; any train running through that
  hex gains **+30**.
- **P18 / P19 — Phlogiston Car** (*The Firebox* / *The Emberwain*; $10 / **$0**;
  **Major**, Phase 3). May be attached to a **2–7 train**; that train may make **1
  additional stop**.
- **P20 — Wands Delivery** (Minor/Major, Phase 3). When bought into a company, place
  a **$30 token** in **any city not in Verantum**; any train that includes **both
  Verantia and that city** gains **+30**.
- **P21 — Verantum Recolonization** ($10 / **$0**; Minor/Major, Phase 3). The owning
  company may **close** it to upgrade a Verantum **dit → city** of the same color
  (**yellow** if no track laid) and place an **Exchange token** there free; this
  **counts as the company's track lay**.
- **P22 — Brekheim Locomotive Corporation** (**Major**, Phase 3). When bought into a
  company, that company may **immediately place an exchange token in Brekheim, even
  with no slot available**. *(Distinct from the P1 opener — do not confuse.)*

### Resolved (designer, 2026-07-29)

- **Dwarven Mining Troupe (P14/P15):** **Major, Phase 2**, 80gp/mountain.
- **Mining Troupe discount:** applies to the **owning company** (not player).
- **Merger Negotiations (P16):** **Minor/Major**; usable only while owned by a
  **minor**; if bought into a **major** it closes for **no effect** (no dead cert).
- **Troupe names:** unique in-game names, shared top-line "Mining Troupe" —
  approved (*Rockbreakers*, *Cragmen*, *Durgrok Delvers*, *Stonebeard Hewers*).
- **Verantum Recolonization (P21):** **Minor/Major, Phase 3**.

### Player-count-gate steer for C12 (designer, 2026-07-29)

- **Gate 1 Bridge and 1 Dwarven Mining Troupe** (which is 4+ vs 5+ → C12's call).
- **Do NOT gate the regular Mining Troupes** — both stay in at all counts. The
  center of the board is *very* expensive; enough contestable build-discounts must
  be available or the mountains can't be effectively developed.
- The other doubles (the 2nd Bridge, Phlogiston Car ×2) → C12 to decide.

---

## Externally-Sourced Privates (C11b)

The 11 privates that reuse 1822**PNW** / 1822**CA** effects. Rules text is quoted
**verbatim from the engine source** (light 18Dragon adaptation only, each
divergence noted). Player revenue **$10** unless noted; company revenue $0 /
ability. Players required is **3+** except **P30 Pullman → 4+** (C12).

In-game names approved (designer, 2026-07-29). Function labels are the source's
parenthetical.

| P# | In-game title | Function label | Class | Phase | Player rev. | Cadence | Players req. |
|----|--------------------------|----------------|-------|-------|-------------|---------|--------------|
| P2 | *The Ironhaul* | Permanent 2-Train | **Major** (red) | 2 | $0 | — (train) | 3+ |
| P3 | *The Deepdelver* | Permanent 2-Train | **Major** (red) | 2 | $0 | — (train) | 3+ |
| P4 | *The Dampcart* | Permanent L-Train | Minor/Major (green) | 1 | $0 | — (train) | 3+ |
| P23 | *Dustfall Company* | Remove Town | Minor/Major (green) | 1 | $10 | One Time | 3+ |
| P24 | *The Hollowing* | Remove Town | Minor/Major (green) | 1 | $10 | One Time | 3+ |
| P25 | *The Surveyors* | Extra Track Lay | Minor/Major (green) | 3 | $10 | One Time | 3+ |
| P26 | *The Raven Post* | Mail Contract | **Major** (red) | 3 | $10 | Each OR | 3+ |
| P27 | *The Courier's Guild* | Mail Contract | **Major** (red) | 3 | $10 | Each OR | 3+ |
| P28 | *The Concord Charter* | Station Token Swap | Minor/Major (green) | 3 | $10 | One Time | 3+ |
| P29 | *The Gilded Carriage* | Pullman | **Major** (red) | 5 | $10 | Each OR | 3+ |
| P30 | *Wyvern Coachworks* | Pullman | **Major** (red) | 5 | $10 | Each OR | **4+** |

### Company-owned rules text (verbatim from source)

- **P2 / P3 — Permanent 2-Train** (PNW P2; **Major, Phase 2**, revenue 0). *"Permanent
  2-Train. The 2P-train is a permanent 2-train. It is a 'special train.' It cannot
  be sold to another company. It does not count against the train limit. It does not
  count as a train for the purpose of mandatory train ownership and purchase. A
  company cannot own more than one special train. Dividends can be separated from
  other trains and may be split, paid in full, or retained … Does not close."*
  **Reverse side = the actual 2P train card.**
- **P4 — Permanent L-Train** (PNW P3/P4; **Minor/Major, Phase 1**, revenue 0).
  *"Permanent L-Train. It is a 'special train.' It cannot be sold to another company.
  It does not count against the train limit. … A company cannot own more than one
  special train. … Does not close."* **Reverse side = the actual LP train card.**
- **P23 / P24 — Remove Town** (PNW P7/P8 "Dit Crusher"; **Minor/Major, Phase 1**).
  *"Allows the owning company to place a plain yellow track tile directly on an
  undeveloped town hex location or upgrade a town tile of one color to a plain track
  tile of the next color. This closes the company and counts as the company's normal
  track laying step. All other normal track laying restrictions apply. Cannot be used
  in hexes with two small towns. …"*
- **P25 — Extra Track Lay** (PNW P11 "Surveyors"; **Minor/Major, Phase 3**). *"The
  owning company may lay an additional yellow tile (or two for major companies
  beginning in Phase 3), or make one additional tile upgrade in its track laying
  step. … All other normal track laying restrictions apply."*
- **P26 / P27 — Mail Contract** (PNW P9 "USPS Mail Service"; **Major, Phase 3**).
  *"After running trains, the owning company receives income into its treasury equal
  to one half of the base value of the start and end stations from one of the trains
  operated. Modifications to values (for E-trains or destination tokens) do not apply.
  An L-train may deliver mail within a single city. … A company that owns more than
  one Mail Contract may not use more than one on any train."*
- **P28 — Station Token Swap** (1822CA P28 "Great Southern Railway"; **Minor/Major,
  Phase 3**). *"Allows the owning company to move a token from the exchange token area
  of its charter to the available token area, or vice versa. This company closes when
  its power is exercised."*
- **P29 / P30 — Pullman** (1822**CA** P5/P6 — *not* the PNW version; **Major, Phase
  5**). *"A 'Pullman' carriage train that can be added to another train owned by the
  company. It converts the train into a + train. Does not count against train limit
  and does not count as a train for the purposes of train ownership. Can't be sold to
  another company. Does not close. May include a maximum of [2 × the train size]
  number of towns."*

### Divergences from source

- **Pullman = 1822CA, not PNW** (designer directive). CA's Pullman is **Major, Phase
  5** and converts the host to a **+train** (18Dragon already rosters **P+** trains,
  CLAUDE.md) — the PNW Pullman is Major/Minor Phase 3 with different wording. Using CA.
- **Perm-2 class:** PNW P2 is **Major**-only; perm-L (P3/P4) is **Minor/Major** —
  kept as-is.
- **Counts:** 18Dragon takes **2 perm-2, 1 perm-L, 2 Remove Town, 1 Extra Track Lay,
  2 Mail Contract, 1 Station Token Swap, 2 Pullman** (source games have different
  copy-counts).
- **Revenue** matches source ($10; perm trains $0). No revenue divergence.
- **Combo/cube references dropped:** PNW's Remove Town cites builder-cube combos
  (P10/P11 in PNW) that 18Dragon doesn't use — omitted.

### In-game names (approved 2026-07-29)

18Dragon flavor names (source names in parentheses):

| P# | Name | (Source name) |
|----|----------|---------------|
| P2 | *The Ironhaul* | (J.S. Ruckle OSNC 4-4-0) |
| P3 | *The Deepdelver* | (—, 2nd perm-2) |
| P4 | *The Dampcart* | (Portland Streetcar / S. Lake Union Trolley) |
| P23 | *Dustfall Company* | (Dit Crusher / Ghost Town) |
| P24 | *The Hollowing* | (Dit Crusher) |
| P25 | *The Surveyors* | (Surveyors — kept) |
| P26 | *The Raven Post* | (USPS Mail Service) |
| P27 | *The Courier's Guild* | (—, 2nd mail) |
| P28 | *The Concord Charter* | (Great Southern Railway) |
| P29 | *The Gilded Carriage* | (Pullman) |
| P30 | *Wyvern Coachworks* | (Fulton Car Works) |

---

## Player-count gates (C12)

18Dragon scales the private pool with player count, tracking the modular board
(PRD §6.3: **A/N/D core** at 3p, **+Varstova/E** at 4p, **+Muravel/S** at 5p; 6p
shares the 5p region set). The **Players required** field on each card (`3+`/`4+`/
`5+`) is how a 3- or 4-player setup physically pulls the excluded cards.

**Two design rules:**
1. **Permits follow their region.** A region's permit private is removed with the
   region (§6.3), so **Varstova permit = 4+**, **Muravel permit = 5+**; the three
   core permits + the opener are 3+.
2. **Gate only duplicates.** Every gated *non-permit* private is a **2nd copy**;
   its sibling stays 3+. No *ability* ever disappears at low counts — only a
   redundant second copy. (Both regular Mining Troupes stay 3+ deliberately — the
   expensive mountain core needs contestable build-discounts.)

**The 6 gated privates** (3 at each level, incl. the two permits):

| Gate | Privates |
|------|----------|
| **4+** | P9 Varstova permit · P15 Dwarven Mining (*Stonebeard Hewers*) · P30 Pullman (*Wyvern Coachworks*) |
| **5+** | P8 Muravel permit · P11 Bridge (*Halvard's Crossing*) · P19 Phlogiston Car (*The Emberwain*) |

*The 5+ Bridge is apt: the **3rd bridge site (R23) is in Muravel**, present only at
5p — so the 2nd bridge private and its only location arrive together.*

**Pool sizes** (all other 24 privates are 3+):

| Players | Regions | Privates in play |
|---------|---------|------------------|
| 3 | A N D | **24** |
| 4 | A N D E | **27** (+Varstova permit, Dwarven, Pullman) |
| 5 | A N D E S | **30** (+Muravel permit, Bridge, Phlogiston Car) |
| 6 | A N D E S | **30** (same region set as 5p) |

*Balance (24/27/30) is provisional — a playtest tunable (§7).*
