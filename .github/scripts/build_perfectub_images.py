"""Builds perfectub/img/*.webp from the original Brak Tub photos.

Sources are Brak Tub's public pages and the shared Google Drive asset folders.
Run by .github/workflows/perfectub-images.yml.
"""
import io, os, sys, time, urllib.request
import numpy as np
from PIL import Image, ImageOps

OUT = "perfectub/img"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15"


def drive(file_id):
    return f"https://drive.usercontent.google.com/download?id={file_id}&export=download&confirm=t"


def braktub(name):
    return f"https://braktub.com/wp-content/uploads/{name}"


class Missed(Exception):
    pass


def fetch(url, tries=6):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "image/avif,image/webp,image/*,*/*", "Referer": "https://braktub.com/"})
            data = urllib.request.urlopen(req, timeout=60).read()
            im = Image.open(io.BytesIO(data))
            im.load()
            return ImageOps.exif_transpose(im)
        except Exception as e:  # bot check pages come back as HTML, which Pillow rejects
            last = e
            time.sleep(6 + i * 6)
    raise Missed(f"{url}: {last}")


def save(im, name, **kw):
    im.save(os.path.join(OUT, name), "WEBP", **kw)
    print(name, im.size)


def fit(im, maxw, maxh):
    im = im.copy()
    im.thumbnail((maxw, maxh))
    return im


JOBS = []


def job(*names):
    def wrap(fn):
        JOBS.append((names, fn))
        return fn
    return wrap


def main():
    os.makedirs(OUT, exist_ok=True)
    missed = []
    for names, fn in JOBS:
        if all(os.path.exists(os.path.join(OUT, n + ".webp")) for n in names):
            print("have", ", ".join(names))
            continue
        try:
            fn()
        except Missed as e:
            missed.append(str(e))
            print("MISSED", e)
    if missed:
        sys.exit("Still missing:\n" + "\n".join(missed))


@job("logo", "logo-on-dark")
def logo():
    # white background to transparent, plus a light version for dark grounds
    lg = fetch(drive("1JekAffsYUukRWCRuLZeoeJiTikdNTtU7")).convert("RGB")
    lg = lg.resize((720, round(720 * lg.height / lg.width)), Image.LANCZOS)
    a = np.asarray(lg).astype(float) / 255
    alpha = np.clip(((1 - a.min(axis=2)) - 0.04) / 0.96, 0, 1)
    rgb = np.where(alpha[..., None] > 0, (a - (1 - alpha[..., None])) / np.maximum(alpha[..., None], 1e-4), 0)
    light = Image.fromarray((np.dstack([np.clip(rgb, 0, 1), alpha]) * 255).astype("uint8"), "RGBA")
    light = light.crop(light.getbbox())
    d = np.asarray(light).copy()
    mask = (d[..., :3].max(axis=2) < 110) & (d[..., 3] > 0)
    d[mask, :3] = (236, 243, 245)
    save(light, "logo.webp", lossless=True)
    save(Image.fromarray(d, "RGBA"), "logo-on-dark.webp", lossless=True)


@job("compare-step-perfectub", "compare-step-typical", "compare-chair-perfectub", "compare-chair-typical")
def compare():
    s = fetch(drive("17-OZVdsOPJe4ptNIKw53h3pSpM__TtIs")).convert("RGB")
    w = s.width / 4
    for i, n in enumerate(["compare-step-perfectub", "compare-step-typical", "compare-chair-perfectub", "compare-chair-typical"]):
        save(s.crop((round(i * w) + 6, 4, round((i + 1) * w) - 6, s.height - 6)), n + ".webp", quality=80)


@job("installed-marble-bathroom")
def marble():
    save(fit(fetch(drive("1DNo7ncrSihKnV9ilyY4imtOIHqycdEtA")).convert("RGB"), 1000, 2000), "installed-marble-bathroom.webp", quality=72)


@job("installed-blue-green-tile")
def bluegreen():
    save(fit(fetch(drive("1Cn7Xlpz8Lf5UlamDPRFJwtdtBIVsJS4m")).convert("RGB"), 640, 1280), "installed-blue-green-tile.webp", quality=76)


@job("lifestyle-bubble-bath")
def bubble():
    save(fit(fetch(drive("1y2TYGP5p3S0YxHfMRQlHSpGaHYplcdk7")).convert("RGB"), 646, 1292), "lifestyle-bubble-bath.webp", quality=74)


@job("founders-convention")
def founders():
    save(fit(fetch(drive("1YJ1jpeBhp3whckoCaw3PyZPFEaSuthuR")).convert("RGB"), 720, 960), "founders-convention.webp", quality=70)


# braktub.com sits behind a bot check, so these go last and retry patiently
@job("hero-cutaway")
def hero():
    save(fetch(braktub("bbg.jpg")).convert("RGB"), "hero-cutaway.webp", quality=78)


@job("studpak-paul-selleck")
def studpak():
    save(fetch(braktub("Studpack-Paul-Birdseye.jpeg")).convert("RGB"), "studpak-paul-selleck.webp", quality=78)


@job("review-install-gray-tile")
def review_a():
    save(fit(fetch(braktub("ec89ee184bbcff7e1fc3d885a86b15fb954c7548-1.jpg")).convert("RGB"), 640, 640), "review-install-gray-tile.webp", quality=76)


@job("review-install-marble")
def review_b():
    save(fit(fetch(braktub("e449c09956465fbd774a017a02e9582ed3a7efa9-scaled-1.jpg")).convert("RGB"), 640, 640), "review-install-marble.webp", quality=76)


if __name__ == "__main__":
    main()
