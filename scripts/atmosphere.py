"""
Atmospheric background images: draped silk ceilings, warm chandelier glow
and lens bokeh — the out-of-focus look of an evening marquee. These are
abstract textures, not depictions of specific events.
Run: python3 scripts/atmosphere.py
"""
import os
import numpy as np
from PIL import Image, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
rng = np.random.default_rng(11)


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def silk(w, h, folds=26, sag=0.32, top=0.0, depth=0.62, warmth=1.0, seed=0):
    """Draped fabric hanging in swags from the top, lit warmly from below-centre."""
    r = np.random.default_rng(seed)
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    u, v = x / w, y / h
    # vertical pleats whose spacing wanders a little
    phase = np.zeros_like(u)
    for k in range(3):
        phase += r.uniform(0.2, 0.6) * np.sin(u * r.uniform(2, 6) * np.pi + r.uniform(0, 6))
    pleat = np.sin((u * folds + phase * 0.6) * 2 * np.pi)
    # swag curve: fabric gathers at intervals and droops between
    swag = np.abs(np.sin(u * np.pi * 3 + 0.3))
    hem = top + depth - (1 - swag) * 0.16
    fabric_mask = 1 - smoothstep(hem - 0.06, hem + 0.02, v)
    # shading: pleats + falloff toward the hem, highlights like satin
    shade = 0.74 + 0.26 * pleat
    sheen = np.power(np.clip(pleat, 0, 1), 12) * 0.3
    light = np.exp(-(((u - 0.5) / 0.55) ** 2) - ((v - 0.55) / 0.55) ** 2)
    base = (0.25 + 0.75 * light) * (0.6 + 0.4 * v / max(depth, 0.01))
    lum = np.clip(base * shade + sheen * light, 0, 1.4) * fabric_mask
    col = np.stack([lum * 1.0, lum * 0.84, lum * 0.6], -1) * warmth
    return col, fabric_mask


def bokeh(w, h, n=140, y_range=(0.0, 1.0), size=(8, 60), seed=1, palette=None, intensity=1.0):
    r = np.random.default_rng(seed)
    palette = palette or [(1.0, 0.82, 0.48), (1.0, 0.7, 0.32), (1.0, 0.92, 0.72), (0.95, 0.75, 0.4)]
    layer = np.zeros((h, w, 3), np.float32)
    for _ in range(n):
        rad = r.uniform(*size)
        cx = r.uniform(-rad, w + rad)
        cy = r.uniform(y_range[0] * h, y_range[1] * h)
        x0, x1 = int(max(0, cx - rad - 2)), int(min(w, cx + rad + 2))
        y0, y1 = int(max(0, cy - rad - 2)), int(min(h, cy + rad + 2))
        if x1 <= x0 or y1 <= y0:
            continue
        yy, xx = np.mgrid[y0:y1, x0:x1].astype(np.float32)
        d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2) / rad
        disc = 1 - smoothstep(0.86, 1.0, d)            # soft-edged disc
        ring = np.exp(-((d - 0.92) / 0.06) ** 2) * 0.18  # lens rim
        a = (disc * 0.55 + ring) * r.uniform(0.15, 0.6) * intensity * (24 / max(rad, 8)) ** 0.35
        c = np.array(palette[r.integers(len(palette))], np.float32)
        layer[y0:y1, x0:x1] += a[..., None] * c
    return layer


def glow(w, h, points, radius=0.12, strength=1.0):
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    out = np.zeros((h, w, 3), np.float32)
    for (px, py, s) in points:
        d2 = ((x / w - px) ** 2) * (w / h) ** 2 + (y / h - py) ** 2
        g = np.exp(-d2 / (radius * s) ** 2) * strength
        out += g[..., None] * np.array([1.0, 0.78, 0.45], np.float32)
    return out


def vignette(w, h, amount=0.75):
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    d = np.sqrt(((x / w - 0.5) * 1.2) ** 2 + ((y / h - 0.5) * 1.0) ** 2)
    return (1 - smoothstep(0.25, 0.85, d) * amount)[..., None]


def grain(img, amount=0.025, seed=3):
    r = np.random.default_rng(seed)
    return img + r.normal(0, amount, img.shape[:2])[..., None]


def finish(arr, path, blur=0.0, quality=80):
    arr = np.clip(arr, 0, 1)
    # gentle filmic tone curve
    arr = 1 - np.exp(-arr * 1.25)
    im = Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8))
    if blur:
        im = im.filter(ImageFilter.GaussianBlur(blur))
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, "WEBP", quality=quality, method=6)
    print("ok", os.path.relpath(path, OUT), os.path.getsize(path) // 1024, "KB")


def base(w, h, top=(0.06, 0.045, 0.03), bottom=(0.02, 0.018, 0.014)):
    t = np.linspace(0, 1, h, dtype=np.float32)[:, None, None]
    return np.broadcast_to(np.array(top) * (1 - t) + np.array(bottom) * t, (h, w, 3)).astype(np.float32).copy()


def marquee_interior(w, h, seed, depth=0.6, chand=None, bokeh_n=160, warm=1.0, dim=1.0):
    img = base(w, h)
    fab, mask = silk(w, h, folds=int(rng.integers(9, 14)), depth=depth, warmth=warm, seed=seed)
    img = img * (1 - mask[..., None]) + fab * 0.5 * dim
    chand = chand or [(0.22, 0.2, 1), (0.5, 0.16, 1.3), (0.78, 0.2, 1)]
    img += glow(w, h, chand, radius=0.16, strength=0.55 * dim)
    img += glow(w, h, [(c[0], c[1], c[2] * 0.25) for c in chand], radius=0.12, strength=1.4 * dim)
    img += bokeh(w, h, int(bokeh_n * 0.3), (0.0, 0.7), (5, 30 * w / 1600), seed=seed + 5, intensity=0.45 * dim)
    img += bokeh(w, h, 9, (0.55, 1.0), (50 * w / 1600, 130 * w / 1600), seed=seed + 9, intensity=0.18 * dim)
    img *= vignette(w, h)
    return grain(img)


def night_bokeh(w, h, seed, n=220):
    img = base(w, h, (0.035, 0.03, 0.022), (0.015, 0.013, 0.01))
    img += glow(w, h, [(0.5, 0.5, 2.2)], radius=0.3, strength=0.12)
    img += bokeh(w, h, int(n * 0.3), (0.0, 1.0), (8 * w / 1600, 60 * w / 1600), seed=seed, intensity=0.45)
    img *= vignette(w, h, 0.85)
    return grain(img)


def main():
    # Hero: wide, light pooled on the right so text on the left stays legible
    w, h = 2400, 1350
    hero = marquee_interior(w, h, seed=21, depth=0.62, chand=[(0.58, 0.18, 1.2), (0.82, 0.24, 1.0), (0.34, 0.22, 0.7)])
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    hero *= (0.35 + 0.65 * smoothstep(0.05, 0.7, x / w))[..., None]
    finish(hero, f"{OUT}/hero/hero-bg.webp", blur=1.2)
    # Mobile hero: portrait crop with its own composition
    w, h = 1080, 1700
    finish(marquee_interior(w, h, seed=33, depth=0.5, chand=[(0.5, 0.14, 1.4), (0.2, 0.2, 0.8), (0.8, 0.2, 0.8)]) * 0.9, f"{OUT}/hero/hero-bg-mobile.webp", blur=1.0)
    # Final CTA + about
    finish(night_bokeh(2000, 1000, seed=41), f"{OUT}/hero/final-cta.webp", blur=1.5)
    finish(marquee_interior(1200, 1500, seed=52, depth=0.72, chand=[(0.5, 0.16, 1.4)]), f"{OUT}/about/about.webp", blur=1.0)
    # Occasion tiles: same family, different light so each card reads distinct
    tiles = {
        "weddings": dict(seed=61, depth=0.6, warm=1.0),
        "walima": dict(seed=62, depth=0.5, warm=0.95),
        "mehndi": dict(seed=63, depth=0.55, warm=1.15),
        "engagements": dict(seed=64, depth=0.45, warm=0.9),
        "family-functions": dict(seed=65, depth=0.4, warm=1.0),
        "private-events": dict(seed=66, depth=0.35, warm=0.85),
        "corporate-events": dict(seed=67, depth=0.3, warm=0.8),
    }
    for name, kw in tiles.items():
        img = marquee_interior(900, 1200, seed=kw["seed"], depth=kw["depth"], warm=kw["warm"], chand=[(0.5, 0.18, 1.3), (0.15, 0.24, 0.7), (0.85, 0.24, 0.7)])
        if name == "mehndi":
            img *= np.array([1.08, 0.92, 0.6], np.float32)  # marigold warmth
        if name == "corporate-events":
            img *= np.array([0.9, 0.9, 0.95], np.float32)
        finish(img, f"{OUT}/events/{name}.webp", blur=1.0, quality=76)
    # Open Graph background
    finish(marquee_interior(1200, 630, seed=71, depth=0.62, chand=[(0.7, 0.2, 1.0), (0.9, 0.25, 0.8)]), f"{OUT}/og-bg.webp", blur=1.0)


if __name__ == "__main__":
    main()
