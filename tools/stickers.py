#!/usr/bin/env python3
"""
18Dragon token-sticker generator (Silhouette Cameo Print & Cut).

Generalized from the 1862 sticker script — the roster/colors are imported from
companies.json (not hardcoded). For each sheet it writes:
  - <name>.png                : print artwork, US Letter @300 DPI
  - <name>_cut.svg            : cut circles only (registered to the PNG)
  - <name>_print_and_cut.svg  : PNG embedded + cut circles in one file

18Dragon token model (designer): the COMPANY COLOR lives only in the LOGO
(company-color disc + abbrev — same look as cardkit's companyLogo; C45 swaps in
real logo SVGs). Ring/star are NOT company-colored. Home = logo + neutral star;
Destination = logo + black stripe. Minors = white disc + number. Market marker =
logo disc. Misc = two "+30gp" + a round marker (round.png, as in stickers_friend).

Tokens per major = 6 (1 home + 1 destination + 4 regular) + 1 market marker.
"""

import json, math, os, base64
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
COMPANIES = json.load(open(os.path.join(ROOT, "data", "companies.json")))

# ---- geometry knobs (mm), from the reference ----
D_SMALL = 12.0          # station / home / destination / minor / misc
D_LARGE = 15.0          # market marker
REVEAL  = 0.5           # sticker radius this much smaller than the token
BLEED   = 0.6           # art extends this far past the cut edge (kills halos)
DISC_STROKE_MM = 0.35   # thin neutral outline around the logo disc
STAR_STROKE_MM = 0.25
SHEET_W, SHEET_H = 215.9, 279.4     # US Letter portrait
PITCH_PAD = 1.2
SAFETY    = 0.5
DPI = 300
SS  = 3
MM2PX = DPI / 25.4
CUT_STROKE = "#00AEEF"
FONT_PATH = "/Users/earlmiles/Library/Fonts/Lucida Bright Demibold.ttf"

# Cameo no-cut zones (px @ DPI): a border + bigger corner squares.
NOCUT_EDGE_PX, NOCUT_CORNER_PX = 200, 422
EDGE_MM   = NOCUT_EDGE_PX / DPI * 25.4
CORNER_MM = NOCUT_CORNER_PX / DPI * 25.4

REGION_COLOR = {"A": "#7B2D8B", "N": "#56B4E9", "G": "#E69F00", "M": "#D55E00", "V": "#009E73"}
COIN_GOLD = "#d9b23a"

# ---- token records: (label, disc_color, ink, variant, diameter) ----
def major_tokens(m):
    p = m["colors"]["primary"]
    ab = m["abbrev"]
    reg = [(ab, p, "#ffffff", "logo", D_SMALL)] * 4
    return reg + [(ab, p, "#ffffff", "home", D_SMALL),
                  (ab, p, "#ffffff", "dest", D_SMALL)]

def market_tokens(m):
    return [(m["abbrev"], m["colors"]["primary"], "#ffffff", "logo", D_LARGE)]

def minor_market_tokens(mn):
    return [(str(mn["number"]), "#ffffff", "#111111", "minor", D_LARGE)]

def minor_tokens(mn):
    return [(str(mn["number"]), "#ffffff", "#111111", "minor", D_SMALL)]

MISC = [("+30gp", COIN_GOLD, "#3a2c08", "plus30", D_SMALL)] * 2 \
     + [("", "#ffffff", "#111111", "round", D_SMALL)]

def _back(t):
    l, disc, ink, v, d = t
    return (l, disc, ink, v + "_back", d)

def all_tokens():
    """The full 18Dragon sticker inventory, one flat list (mixed diameters).

    12mm tokens: 6/major (4 logo + home + dest), 30 minor numbers, misc.
    15mm markers: per company one share-price marker FRONT + a red->black BACK.
    They share a single Letter sheet via the mixed-size band packer in paginate().
    """
    out = []
    for m in COMPANIES["majors"]:
        out += major_tokens(m)
    for mn in COMPANIES["minors"]:
        out += minor_tokens(mn)
    out += MISC
    for m in COMPANIES["majors"]:
        for t in market_tokens(m):
            out += [t, _back(t)]
    for mn in COMPANIES["minors"]:
        for t in minor_market_tokens(mn):
            out += [t, _back(t)]
    return out

# ---- layout (Cameo-safe grid) ----
def _cuttable(cx, cy, clear):
    if cx - clear < EDGE_MM or cx + clear > SHEET_W - EDGE_MM: return False
    if cy - clear < EDGE_MM or cy + clear > SHEET_H - EDGE_MM: return False
    L = cx - clear < CORNER_MM; R = cx + clear > SHEET_W - CORNER_MM
    T = cy - clear < CORNER_MM; B = cy + clear > SHEET_H - CORNER_MM
    return not ((L or R) and (T or B))

def paginate(tokens):
    """Mixed-size band packer: group tokens by diameter (largest first) and fill
    rows top-down, each group's band starting just below the previous group's last
    row so the two sizes share one sheet. Overflows to a new page only if needed."""
    groups = {}
    for t in tokens:
        groups.setdefault(t[4], []).append(t)
    pages = [[]]
    prev_bottom = EDGE_MM                      # bottom edge (mm) of the last placed row
    for d in sorted(groups, reverse=True):     # 15mm markers, then 12mm tokens
        toks = groups[d]
        pitch = d + PITCH_PAD
        clear = d / 2 + BLEED + SAFETY
        x0, x1 = EDGE_MM + clear, SHEET_W - EDGE_MM - clear
        cols = int((x1 - x0) / pitch) + 1
        startx = (x0 + x1) / 2 - (cols - 1) * pitch / 2
        i = 0
        cy = max(prev_bottom + clear, EDGE_MM + clear)
        while i < len(toks):
            if cy + clear > SHEET_H - EDGE_MM:  # page full -> next page, reset band
                pages.append([]); cy = EDGE_MM + clear; prev_bottom = EDGE_MM
            row = [(startx + c * pitch, cy) for c in range(cols)
                   if _cuttable(startx + c * pitch, cy, clear)]
            for cx, cyy in row:
                if i >= len(toks): break
                pages[-1].append((cx, cyy, toks[i])); i += 1
            prev_bottom = cy + clear
            cy += pitch
    return pages

# ---- rendering ----
_FONT_CACHE = {}
def _font(px):
    k = max(4, int(px))
    if k not in _FONT_CACHE: _FONT_CACHE[k] = ImageFont.truetype(FONT_PATH, k)
    return _FONT_CACHE[k]

def _fit_font(text, max_w, max_h):
    size = int(max_h)
    while size > 6:
        f = _font(size); l, t, r, b = f.getbbox(text)
        if (r - l) <= max_w and (b - t) <= max_h: return f
        size -= max(1, size // 20)
    return _font(6)

def _disc(draw, cx, cy, r, fill, outline=None, w=0):
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill, outline=outline, width=w)

def _star(cx, cy, r_out, r_in, rot=-90):
    p = []
    for i in range(10):
        r = r_out if i % 2 == 0 else r_in
        a = math.radians(rot + i * 36.0)   # 360/10 per point (was 18 -> half star)
        p.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return p

def _strikeout(img, cx, cy, d, scale):
    """Diagonal red->black semi-transparent bar (market-marker back)."""
    L = int(2 * (d / 2 + BLEED) * scale * 1.04)
    W = int(d * 0.17 * scale)
    tile = Image.new("RGBA", (L, W), (0, 0, 0, 0))
    td = ImageDraw.Draw(tile)
    for x in range(L):
        t = x / (L - 1)
        td.line([(x, 0), (x, W)], fill=(int(224 * (1 - t)), int(24 * (1 - t)),
                                        int(24 * (1 - t)), 180))
    td.rectangle([0, 0, L - 1, W - 1], outline=(0, 0, 0, 210), width=max(1, int(0.18 * scale)))
    tile = tile.rotate(45, expand=True, resample=Image.BICUBIC)   # low-left -> up-right
    img.alpha_composite(tile, (int(cx - tile.width / 2), int(cy - tile.height / 2)))

def draw_token(img, draw, cx, cy, tok):
    label, disc, ink, variant, d = tok
    back = variant.endswith("_back")          # market-marker reverse (red->black bar)
    if back:
        variant = variant[:-5]
    scale = MM2PX * SS
    r_art = (d / 2 + BLEED) * scale
    cut_r = (d / 2 - REVEAL) * scale
    stroke = max(1, round(DISC_STROKE_MM * scale))

    # bleed disc (art past the cut edge) then the visible disc with a thin outline
    _disc(draw, cx, cy, r_art, disc)
    _disc(draw, cx, cy, cut_r, disc, outline="#111111", w=stroke)

    if variant == "round":
        ic = ROUND_ICON
        s = int(2 * cut_r * 0.62)
        ic = ic.resize((s, s), Image.LANCZOS)
        img.alpha_composite(ic, (int(cx - s / 2), int(cy - s / 2)))
        return

    # home: a big white star fills the token as a BACKGROUND; the abbrev sits on it,
    # dark. The star's arms leave company-color gaps that the abbrev crosses, so a
    # translucent white stripe spans the full width (mirroring the dest black stripe)
    # to give the text continuous contrast.
    if variant == "home":
        sr = cut_r * 0.94
        pts = _star(cx, cy, sr, sr * 0.40)
        draw.polygon(pts, fill="#ffffff")
        draw.line(pts + [pts[0]], fill="#111111", width=max(2, round(0.35 * scale)), joint="curve")
        bh = cut_r * 0.33   # same height as the dest black stripe
        bx0, by0 = int(cx - r_art), int(cy - bh)
        band = Image.new("RGBA", (int(2 * r_art), int(2 * bh)), (255, 255, 255, 220))
        img.alpha_composite(band, (bx0, by0))
        f = _fit_font(label, 2 * cut_r * 0.74, 2 * cut_r * 0.58)   # match the regular tokens
        draw.text((cx, cy), label, font=f, fill="#141210", anchor="mm")
        return

    # destination: a black stripe BEHIND the logo (background band; logo unchanged)
    if variant == "dest":
        bh = cut_r * 0.33
        draw.rectangle([cx - r_art, cy - bh, cx + r_art, cy + bh], fill="#111111")

    # abbrev / number: centered, same size on every token (logo is not moved/resized)
    f = _fit_font(label, 2 * cut_r * 0.74, 2 * cut_r * 0.58)
    draw.text((cx, cy), label, font=f, fill=ink, anchor="mm")

    if back:                                   # market-marker back overlays the bar
        _strikeout(img, cx, cy, d, scale)

def render_png(page, path):
    W, H = int(SHEET_W * MM2PX * SS), int(SHEET_H * MM2PX * SS)
    img = Image.new("RGBA", (W, H), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img)
    for cx, cy, tok in page:
        draw_token(img, draw, cx * MM2PX * SS, cy * MM2PX * SS, tok)
    img = img.convert("RGB").resize((int(SHEET_W * MM2PX), int(SHEET_H * MM2PX)), Image.LANCZOS)
    img.save(path, dpi=(DPI, DPI))
    return img.size

PT = 72.0 / 25.4
def _cut_circles(page):
    out = []
    for cx, cy, tok in page:
        r = tok[4] / 2 - REVEAL
        out.append(f'<circle cx="{cx*PT:.3f}" cy="{cy*PT:.3f}" r="{r*PT:.3f}" fill="none" stroke="{CUT_STROKE}" stroke-width="0.5"/>')
    return "\n".join(out)

def render_cut_svg(page, path):
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{SHEET_W/25.4:.4f}in" height="{SHEET_H/25.4:.4f}in" '
           f'viewBox="0 0 {SHEET_W*PT:.3f} {SHEET_H*PT:.3f}">\n<g id="cut">\n{_cut_circles(page)}\n</g>\n</svg>\n')
    open(path, "w").write(svg)

def render_combined_svg(page, png_path, path):
    b64 = base64.b64encode(open(png_path, "rb").read()).decode()
    W, H = SHEET_W * PT, SHEET_H * PT
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
           f'width="{SHEET_W/25.4:.4f}in" height="{SHEET_H/25.4:.4f}in" viewBox="0 0 {W:.3f} {H:.3f}">\n'
           f'<image x="0" y="0" width="{W:.3f}" height="{H:.3f}" preserveAspectRatio="none" '
           f'xlink:href="data:image/png;base64,{b64}"/>\n<g id="cut">\n{_cut_circles(page)}\n</g>\n</svg>\n')
    open(path, "w").write(svg)

def _trim(im):
    bb = im.getbbox()
    return im.crop(bb) if bb else im
ROUND_ICON = _trim(Image.open(os.path.join(HERE, "sticker-assets", "round.png")).convert("RGBA"))

if __name__ == "__main__":
    import sys
    outdir = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "print")
    os.makedirs(outdir, exist_ok=True)
    total = 0
    base = "stickers"
    pages = paginate(all_tokens())
    for pi, page in enumerate(pages):
        suffix = "" if len(pages) == 1 else f"_p{pi+1}"
        png = os.path.join(outdir, f"{base}{suffix}.png")
        render_png(page, png)
        render_cut_svg(page, os.path.join(outdir, f"{base}{suffix}_cut.svg"))
        render_combined_svg(page, png, os.path.join(outdir, f"{base}{suffix}_print_and_cut.svg"))
        total += len(page)
        print(f"{png}  ({len(page)} stickers)")
    print(f"total {total} stickers on {len(pages)} sheet(s)")
