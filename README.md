# 18Dragon

**Railways in a Fantasy Land** — an 18xx game by E. Halsey Miles.

*18Dragon* is an **1822-lineage 18xx** set in a fantasy land of five regions. It keeps the
1822 spine — minor and major companies, the bidbox auction, the full train roster — and
layers on four ideas: permit-gated building, mergers in place of concessions, a modular
board that scales to player count, and the Verantum ruins.

> **Status: in design, not yet playtested.** The map, companies, privates, trains, and
> signature mechanics are specified and the physical components generate cleanly. The
> rulebook is partially written, and the balance numbers are provisional pending play.
> If you print this and try it, you are playtesting an unproven game — which is exactly
> what would help most.

---

## What makes it different from 1822

**Mergers replace concessions.** There are no concession certificates. A major company
comes into being only by merging two minors during a **merger round**, which follows every
operating round from phase 2 on. This is the single largest change from 1822.

**Permit-gated building.** Laying a *new yellow tile* in a region requires the operating
company to hold that region's permit. *Upgrading* an existing tile does not. Permits
arrive with minors — each minor holds a permit for its home region — and with some
privates. This governs where and how fast companies can expand.

**A modular board that scales.** Regions can be switched off to fit fewer players,
removing their map area along with their companies, minors, and privates. 3–6 players.

**Five distinct regions**, each with its own terrain, phonetics, and identity:

| | Region | Terrain | Capital | Flavor |
|---|---|---|---|---|
| **A** | **Verantum** (island) | Ruins | Verantia | A fallen empire; derelict cities worth little today, rebuildable into the richest destinations on the map |
| **N** | **Caelimor** (northwest) | Coastal / plains | Draeven | A maritime realm |
| **D** | **Gördum** (center-north) | Mountains | Brekheim | A dwarven kingdom — the people who invented the trains |
| **E** | **Varstova** (northeast) | Hills | Varstgrad | A mercantile land |
| **S** | **Muravel** (south) | Plains | Kalavar | A wide southern trading zone |

Region colors are from the Okabe-Ito colorblind-safe palette. Currency is **ducats**.

## Start here

| | |
|---|---|
| [`docs/rulebook.pdf`](docs/rulebook.pdf) | The rulebook, written as a **1822 variant** — every rule that differs from base 1822 is marked in blue, so if you know 1822 you can skim to the deltas. *(In progress.)* |
| [`docs/divergences-from-1822.md`](docs/divergences-from-1822.md) | The complete 1822 delta list, with reasoning |
| [`docs/signature-mechanics.md`](docs/signature-mechanics.md) | Permits, the Verantum ruins/metro system, and mergers, specified in detail |
| [`docs/world-bible.md`](docs/world-bible.md) | The five regions — cultures, capitals, naming conventions |
| [`docs/intro-story.md`](docs/intro-story.md) | Flavor fiction |

## Playing it

**On the table.** Everything needed is generated into [`print/`](print/) and committed, so
you can print without running any tooling: card decks and charters as true-size PDFs, hex
tiles and token stickers as Silhouette Cameo Print-&-Cut sheets, a hinged board mat for
the stock market and bid boxes, and STLs for 3D-printing the wooden-bit equivalents. Print
PDFs at **100% / "Actual size"**, never "fit to page" — see the header comment in
`tools/render-pdfs.sh` for why.

**In Tabletop Simulator.** Planned, not built — a generated TTS mod is specified in
`_artifacts/prd-game.md` §12 and scoped as the "Tabletop Simulator" epic.

## Repository layout

| Path | What |
|---|---|
| `18dragon.json` | The **18xxMaker game file** — map, tiles, market, phases. Load via File > Open. |
| `data/` | Tool-agnostic JSON masters the generators read: `companies.json` (10 majors + 30 minors), `privates.json` (30), `trains.json` |
| `tools/` | Component generators — `gen-*.mjs` plus shared `cardkit.mjs`; `stickers.py` for token stickers |
| `print/` | **Generated components**, committed — print these |
| `docs/` | What the game ships: rulebook, mechanics specs, world bible |
| `_artifacts/` | Design requirements and planning — PRDs, epics, backlog, sprints, stories |

`18dragon.json` is a *rendering* of the design, not its source of truth. The masters in
`data/` are.

## Regenerating the components

The JS generators are dependency-free ESM — Node is all you need:

```sh
node tools/gen-cards.mjs        # all card decks -> print/cards-{single,duplex}.html
node tools/gen-charters.mjs     # major + minor charters
node tools/gen-board-mat.mjs    # stock market + bid boxes, 3 hinged segments
node tools/gen-token-stls.mjs   # station token, market disc, bid cube
tools/render-pdfs.sh            # HTML -> true-size PDFs via headless Chrome
python3 tools/stickers.py       # token stickers (Cameo Print & Cut)
node tools/gen-rulebook.mjs     # docs/rulebook.{pdf,epub}
```

The **map** and **hex tiles** are the exception: they render through a fork of
[18xxMaker](https://github.com/18xx-maker/18xx-maker) that adds full-color SVG hex art,
permit-letter overlays that survive tile placement, and a Cameo Print-&-Cut tile-sheet
renderer. That fork is local and unpublished; without it, the committed sheets in
`print/tiles/` are what you print.

## License

**Split** — see [`LICENSE`](LICENSE):

- **`tools/`** is **MIT**. The generators are meant to be reusable; if you are building
  your own 18xx and want a card, charter, or Cameo sticker pipeline, take them.
- **Everything else** — the game design, rules, map, world, art, and generated
  components — is **© E. Halsey Miles, all rights reserved**. You may read it, clone it,
  print it, and play it. You may not redistribute it or publish derivatives.

## Feedback

Playtest reports, rules questions, and "this is broken" are all welcome via
[issues](https://github.com/merlinofchaos/18dragon/issues).
