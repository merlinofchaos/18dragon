#!/usr/bin/env python3
"""Pre-flight validator for designer-supplied hex coordinates (18Dragon map).

The designer places from a mental map and hexes don't always land on the grid's
parity: odd-position rows (A,C,E,G,I,K,M,O,Q,S) use EVEN columns; even-position
rows (B,D,F,H,J,L,N,P,R) use ODD columns. A coordinate that breaks this doesn't
exist. Run this on a WHOLE batch of coords BEFORE scripting map edits, then
batch-confirm any typos with the designer in one question (retro-5 workflow rule).

Usage:  python3 check-parity.py A1 B2 C3 O25 N24 R34 ...
Prints VALID / INVALID per coord; for invalid ones, the two nearest valid columns.
Exit code 1 if any coord is invalid.
"""
import re, sys

def row_idx(letter):  # A->1 ... (single-letter rows on this map)
    return ord(letter.upper()) - ord("A") + 1

def check(coord):
    m = re.fullmatch(r"([A-Za-z])(\d+)", coord.strip())
    if not m:
        return coord, None, None
    r, c = m.group(1).upper(), int(m.group(2))
    valid = (row_idx(r) + c) % 2 == 1  # opposite parity == on-grid
    nearest = None if valid else (f"{r}{c-1}", f"{r}{c+1}")
    return f"{r}{c}", valid, nearest

def main(args):
    if not args:
        print(__doc__)
        return 0
    bad = 0
    for a in args:
        coord, valid, nearest = check(a)
        if valid is None:
            print(f"  {a:<6} ??  unparseable")
            bad += 1
        elif valid:
            print(f"  {coord:<6} VALID")
        else:
            print(f"  {coord:<6} INVALID  -> nearest valid: {nearest[0]} or {nearest[1]}")
            bad += 1
    if bad:
        print(f"\n{bad} coord(s) need fixing — confirm the intended hex with the designer.")
    return 1 if bad else 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
