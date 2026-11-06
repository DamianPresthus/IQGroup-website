"""Regenerate source/assets/paper.jpg: a 512px tileable paper texture on #FAF8FA (fibres + mottling).

Run from the repo root: python3 tools/paper.py   (needs numpy and Pillow)
Output statistics at seed 3: mean ~#F9F7F9, standard deviation ~2.3 levels, ~9 KB.
"""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

N = 512
rng = np.random.default_rng(3)


def fnoise(beta):
    """Periodic 1/f^beta noise (tiles seamlessly because it is built in the frequency domain)."""
    f = np.fft.fftfreq(N)
    fx, fy = np.meshgrid(f, f)
    r = np.sqrt(fx**2 + fy**2)
    r[0, 0] = 1
    spec = (rng.normal(size=(N, N)) + 1j * rng.normal(size=(N, N))) / r**beta
    spec[0, 0] = 0
    n = np.real(np.fft.ifft2(spec))
    return (n - n.mean()) / n.std()


low, mid, fine = fnoise(1.6), fnoise(0.9), rng.normal(size=(N, N))

# Fibres: short curved strokes, drawn on a 3x3 canvas so they wrap across tile edges.
fib = Image.new('L', (N * 3, N * 3), 128)
d = ImageDraw.Draw(fib)
for _ in range(1400):
    x, y = rng.random(2) * N + N
    a = rng.random() * np.pi
    length = rng.uniform(6, 26)
    k = rng.choice([-1, 1]) * rng.uniform(6, 16)
    pts = [(x + np.cos(a) * length * t + np.sin(t * 3) * 1.5, y + np.sin(a) * length * t + np.cos(t * 3) * 1.5)
           for t in np.linspace(0, 1, 6)]
    for ox in (-N, 0, N):
        for oy in (-N, 0, N):
            d.line([(px + ox, py + oy) for px, py in pts], fill=int(128 + k), width=1)
fib = np.asarray(fib.filter(ImageFilter.GaussianBlur(0.6))).astype(float)[N:2 * N, N:2 * N] - 128

v = 1.6 * low + 1.0 * mid + 0.9 * fine + 0.55 * fib
base = np.array([0xFA, 0xF8, 0xFA], float)
img = np.clip(base[None, None, :] + v[..., None] * np.array([1.0, 0.95, 1.0]), 0, 255).astype('uint8')
Image.fromarray(img).save('source/assets/paper.jpg', quality=80, optimize=True)
