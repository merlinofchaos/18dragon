---
name: agile-dev
description: 'Implement a dev story against the 18xxMaker fork. Use when the user says "implement story D02", "work the dev story", or "build the renderer change".'
---

# agile-dev — Implement a dev story (18xxMaker fork)

Implement a `Type: dev` story: a change to the forked 18xxMaker renderer.
See `_artifacts/workflow.md`.

## Preconditions

- Fork: `/Users/earlmiles/Projects/18xx-maker`, branch `18dragon`
  (verify `git branch --show-current`; if not on it, stop and ask).
- Dev server on http://localhost:3000 (`pnpm start` in the fork). Start it if not
  running so changes verify by hot-reload.
- Test game file: `/Users/earlmiles/Projects/18dragon/18dragon.json`.

## Steps

1. **Read the story** in `_artifacts/stories/`. Confirm `Type: dev`. If it's
   `content`, redirect to `agile-content`.
2. Set this story's status to `in-progress` in `_artifacts/sprint-status.yaml`
   (canonical); update the story file's `Status:` snapshot to match.
3. **Implement** the tasks. Guidance:
   - Prefer **additive** changes (new atoms / new `Shape` types / new registries)
     over invasive rewrites — keep the fork upstream-mergeable where cheap.
   - Follow existing conventions: `components/atoms/shapes/*`, `components/Hex.jsx`,
     `components/Position.jsx`. Match surrounding code.
   - Custom art pipeline: `.svg` in `src/data/art/` auto-compile to React
     components via `vite-plugin-fast-react-svg`; `art` registry is exported from
     `src/data/index.js`.
4. **Verify** on the running app: renders correctly with 18Dragon loaded; check the
   browser console. For visual changes, capture/describe what renders. If a JSON
   change is needed to exercise the feature, make it in `18dragon.json`.
   - **Headless harness (preferred — the app has no File>Open automation):** the
     fork serves any `src/data/games/*.json` at `/games/<slug>/map`. TEMPORARILY
     `cp 18dragon.json` into the fork's `src/data/games/`, screenshot with
     `verify-screenshot.mjs` (in this skill dir — reports console errors, does an
     A/B via `clip`), then **remove the copy**. Never leave it behind, and never
     put demo/test hexes in the real `18dragon.json` — build them in the temp copy.
   - Chromium once: `npx playwright install chromium`. Wait out vite recompiles
     (use `domcontentloaded`, not `networkidle`).
5. **Close out:** check tasks, fill **Files Changed** (fork repo-relative paths),
   add **Completion Notes** + model used. Set this story's status to `review` in
   `_artifacts/sprint-status.yaml`; update the story file's `Status:` snapshot.
6. **Report** what changed and how to see it. Do not commit unless asked; if
   asked, commit on `18dragon`. **The fork enforces `commitlint`** — the message
   must be a conventional commit (`feat|fix|chore|docs|refactor|perf|test|build|
   ci|style|revert: subject`), or the commit is rejected. (A pre-commit hook also
   runs prettier/eslint/tests.)

## Rules

- Never modify upstream `main`; all work stays on `18dragon`.
- No runtime network fetches — assets committed, self-contained.
- If implementation reveals the AC was wrong/incomplete, pause and reconcile with
  the user (or raise it for `agile-party` course-correction) before plowing ahead.
