# 18Dragon — Sprint Board

A live, native-window viewer for the agile board. Reads the canonical YAML in
`_artifacts/` and the story markdown files, and refreshes in real time as the
`agile-*` skills edit those files.

## Run

```sh
tools/sprint-board/run.sh
```

First run creates an isolated `.venv` and installs deps (pywebview, watchdog,
pyyaml, markdown) — nothing touches your global Python. Later runs just launch.

## What it shows

- **Left sidebar** — every sprint (with % complete), and the **Backlog** at the
  bottom. Opens on the current active sprint (or the backlog if there are none).
- **Sprint view** — a kanban across the status lifecycle
  (`stub → ready → in-progress → review → done`), a donut **completion gauge**,
  sprint goal/status, story count, total points, and datestamps.
- **Cards** — id, title, type (dev/content), points, and epic tags. A card with a
  `●` has a story file and is **clickable** → opens a rendered markdown viewer of
  `_artifacts/stories/<id>-*.md`. Cards without a file aren't clickable.

## How it works

- `app.py` — reads `backlog.yaml` (catalog + points), `epics.yaml`, and
  `sprint-status.yaml` (buckets + status), joins them by story ID, and exposes the
  board to the UI via pywebview's JS bridge. Watchdog watches `_artifacts/` and
  pushes a refresh on any `.yaml`/`.md` change.
- `index.html` — the self-contained UI (no external resources).

Completion is measured by **points** when stories are pointed, else by story
count. Points are assigned during sprint planning (`agile-sprint-plan`).
