#!/usr/bin/env bash
# Launch the 18Dragon sprint board. Creates an isolated venv on first run so
# nothing is installed into the global Python.
set -euo pipefail
cd "$(dirname "$0")"

VENV=".venv"
if [ ! -d "$VENV" ]; then
  echo "Creating venv + installing deps (first run only)…"
  python3 -m venv "$VENV"
  "$VENV/bin/pip" install --quiet --upgrade pip
  "$VENV/bin/pip" install --quiet -r requirements.txt
fi

exec "$VENV/bin/python" app.py
