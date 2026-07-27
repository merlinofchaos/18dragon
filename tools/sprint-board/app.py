#!/usr/bin/env python3
"""18Dragon sprint board — a live native-window viewer for the _artifacts YAML.

Reads the canonical agile data (backlog.yaml, epics.yaml, sprint-status.yaml) and
the story markdown files, and renders a kanban board in a native macOS window
(pywebview). Watches _artifacts/ for changes and pushes a refresh so the board
updates in real time as the skills edit the files.

Run via ./run.sh (creates an isolated venv). Data functions are importable and
testable without launching the GUI.
"""

import glob
import json
import os
import threading
import time

import yaml
import markdown as md

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
HERE = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
ARTIFACTS = os.path.join(PROJECT_ROOT, "_artifacts")
STORIES_DIR = os.path.join(ARTIFACTS, "stories")

BACKLOG_YAML = os.path.join(ARTIFACTS, "backlog.yaml")
EPICS_YAML = os.path.join(ARTIFACTS, "epics.yaml")
STATUS_YAML = os.path.join(ARTIFACTS, "sprint-status.yaml")

STATUS_ORDER = ["stub", "ready", "in-progress", "review", "done"]
# statuses that count as "complete" for the gauge
DONE_STATUSES = {"done"}

APP_NAME = "18Dragon"  # shown in the Dock / app menu instead of "Python"


# ---------------------------------------------------------------------------
# Data layer (pure — no GUI)
# ---------------------------------------------------------------------------
def _load_yaml(path):
    try:
        with open(path, "r") as f:
            return yaml.safe_load(f) or {}
    except FileNotFoundError:
        return {}


def _story_file(story_id):
    """Return the path to a story's markdown file, or None if absent.

    Stories are named `<ID>-slug.md` in _artifacts/stories/. The template
    (_template.md) is excluded.
    """
    for path in sorted(glob.glob(os.path.join(STORIES_DIR, f"{story_id}-*.md"))):
        base = os.path.basename(path)
        if base.startswith("_"):
            continue
        return path
    return None


def _enrich(story_id, status, catalog):
    """Merge a bucket entry (id + status) with its catalog descriptive data."""
    cat = catalog.get(story_id, {})
    return {
        "id": story_id,
        "status": status,
        "title": cat.get("title", story_id),
        "type": cat.get("type", "?"),
        "epics": cat.get("epics", []),
        "points": cat.get("points"),
        "hasFile": _story_file(story_id) is not None,
    }


def build_board():
    """Assemble the full board state the UI needs, as a plain dict."""
    backlog_cat = _load_yaml(BACKLOG_YAML).get("stories", {})
    epics = _load_yaml(EPICS_YAML).get("epics", {})
    status = _load_yaml(STATUS_YAML)

    meta = status.get("meta", {})
    backlog_bucket = status.get("backlog", {}) or {}
    sprints_raw = status.get("sprints", {}) or {}

    backlog = [_enrich(sid, st, backlog_cat) for sid, st in backlog_bucket.items()]

    sprints = []
    for sprint_id, sp in sprints_raw.items():
        sp = sp or {}
        stories = [
            _enrich(sid, st, backlog_cat)
            for sid, st in (sp.get("stories", {}) or {}).items()
        ]
        sprints.append(
            {
                "id": sprint_id,
                "status": sp.get("status", "planning"),
                "goal": sp.get("goal", ""),
                "created": sp.get("created"),
                "stories": stories,
            }
        )

    return {
        "meta": meta,
        "sprints": sprints,
        "backlog": backlog,
        "epics": epics,
        "statusOrder": STATUS_ORDER,
        "doneStatuses": sorted(DONE_STATUSES),
    }


def build_story_html(story_id):
    """Render a story's markdown file to HTML, or None if it doesn't exist."""
    path = _story_file(story_id)
    if not path:
        return None
    with open(path, "r") as f:
        text = f.read()
    html = md.markdown(
        text, extensions=["tables", "fenced_code", "sane_lists", "toc"]
    )
    return {"id": story_id, "file": os.path.basename(path), "html": html}


# ---------------------------------------------------------------------------
# JS API bridge (pywebview)
# ---------------------------------------------------------------------------
class Api:
    def get_board(self):
        return build_board()

    def get_story(self, story_id):
        return build_story_html(story_id)


# ---------------------------------------------------------------------------
# macOS app identity (Dock name + icon) — override the default "Python"/rocket
# ---------------------------------------------------------------------------
def _set_app_identity(name=APP_NAME):
    """Set the Dock/menu name and a drawn icon. Best-effort; never fatal."""
    # Name: override CFBundleName + process name (menu/app title).
    try:
        from Foundation import NSBundle, NSProcessInfo

        info = NSBundle.mainBundle().infoDictionary()
        if info is not None:
            info["CFBundleName"] = name
        NSProcessInfo.processInfo().setProcessName_(name)
    except Exception:
        pass

    # Icon: draw the board's purple ◆ mark and set it as the Dock icon.
    try:
        from AppKit import (
            NSApplication,
            NSBezierPath,
            NSColor,
            NSImage,
        )
        from Foundation import NSMakeRect, NSMakeSize

        s = 512.0
        img = NSImage.alloc().initWithSize_(NSMakeSize(s, s))
        img.lockFocus()
        # rounded-rect background in accent purple (#7B2D8B)
        bg = NSBezierPath.bezierPathWithRoundedRect_xRadius_yRadius_(
            NSMakeRect(24, 24, s - 48, s - 48), 96, 96
        )
        NSColor.colorWithSRGBRed_green_blue_alpha_(
            0x7B / 255.0, 0x2D / 255.0, 0x8B / 255.0, 1.0
        ).set()
        bg.fill()
        # white diamond
        cx, cy, r = s / 2, s / 2, s * 0.24
        dia = NSBezierPath.bezierPath()
        dia.moveToPoint_((cx, cy + r))
        dia.lineToPoint_((cx + r, cy))
        dia.lineToPoint_((cx, cy - r))
        dia.lineToPoint_((cx - r, cy))
        dia.closePath()
        NSColor.whiteColor().set()
        dia.fill()
        img.unlockFocus()
        NSApplication.sharedApplication().setApplicationIconImage_(img)
    except Exception:
        pass


# ---------------------------------------------------------------------------
# File watching → push refresh
# ---------------------------------------------------------------------------
def _start_watcher(window):
    from watchdog.events import FileSystemEventHandler
    from watchdog.observers import Observer

    class Handler(FileSystemEventHandler):
        def __init__(self):
            self._last = 0.0

        def on_any_event(self, event):
            if event.is_directory:
                return
            if not event.src_path.endswith((".yaml", ".md")):
                return
            now = time.time()
            if now - self._last < 0.25:  # debounce burst writes
                return
            self._last = now
            try:
                window.evaluate_js("window.refreshBoard && window.refreshBoard()")
            except Exception:
                pass

    observer = Observer()
    observer.schedule(Handler(), ARTIFACTS, recursive=True)
    observer.daemon = True
    observer.start()
    return observer


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    import webview

    with open(os.path.join(HERE, "index.html"), "r") as f:
        html = f.read()

    window = webview.create_window(
        "18Dragon — Sprint Board",
        html=html,
        js_api=Api(),
        width=1180,
        height=820,
        min_size=(820, 560),
    )

    def on_start():
        _set_app_identity()
        _start_watcher(window)

    webview.start(on_start)


if __name__ == "__main__":
    main()
