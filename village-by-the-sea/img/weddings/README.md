# Weddings page — image manifest

All 19 images on `weddings.html` are **real Village by the Sea wedding photos**
supplied by the client (Aug 2026 upload). Nothing is stock, hotlinked, or AI-generated.
Self-hosted in this folder rather than hotlinked, so they render everywhere including
in build QA.

Pipeline: `ImageOps.exif_transpose()` → optional border crop → LANCZOS resize →
progressive JPEG q84, optimized. **44.2 MB in → 3.9 MB out.**

| Slot | Where it appears | Source file |
|---|---|---|
| `hero-ceremony` | Hero main plate + homepage weddings section | `CKPChrisMarkceremony-102.jpg` |
| `hero-pergola-night` | Hero inset + Inquire section background | `Kristen___Kory_2021.jpg` |
| `pergola-party` | Ch. 01 — The pergola & gardens (lead) | `ParkerWedding2021_233.JPG` |
| `groomsmen-pergola` | Ch. 01 (trail) | `Groomsmen.JPG` |
| `g-drone` | Ch. 02 — The stone terrace (lead) | `Jackie_and_Dan_Drone.jpeg` |
| `recessional` | Ch. 02 (trail) | `wedding_couple_2.jpg` |
| `ballroom-set` | Ch. 03 — Maine Ballroom (lead) + homepage | `African_wedding_2023.jpeg` |
| `first-dance` | Ch. 03 (trail) | `VBTS-Wells-Wedding-142-2-1200x805.jpg` |
| `dancefloor` | Ch. 04 — And then, home (lead) | `CKPChrisMarkReception-67.jpg` |
| `grand-entrance` | Ch. 04 (trail) | `Michaud___Weeman_3.jpg` |
| `getting-ready` | The rest of the weekend | `ParkerWedding2021_092.JPG` |
| `bridal-suite` | The rest of the weekend | `IMG-1549.JPG` |
| `g-arbor-fun` | Gallery (wide) | `M_M-0621.jpg` |
| `g-party-indoor` | Gallery (wide) | `_DSC5710-Edit.jpg` |
| `g-parents-aisle` | Gallery | `ParkerWedding2021_402.JPG` |
| `g-beach-bride` | Gallery | `ParkerWedding2021_770.JPG` |
| `g-celebrate` | Gallery | `CKPChrisMarkReception-68.jpg` |
| `g-dance-bw` | Gallery | `CKPChrisMarkReception-106.jpg` |

## Held back — needs a decision

**`patrick_mcnamara_photo_0288__1_.jpg` — NOT PUBLISHED.** Carries a visible
"Patrick McNamara Photography" watermark bottom-right. It's a lovely recessional shot,
but a watermarked frame on a client's own venue page reads as unlicensed. Get an
unwatermarked file (and written permission) from the photographer, or leave it out.

**`CKPChrisMarkceremony-2.jpg` — NOT PUBLISHED.** Good ceremony-arrival photo, but the
guest in the foreground is wearing a COVID-era face mask, which date-stamps the page.
Fine to add back if the client doesn't mind.

**`VBTS-Wells-Wedding-142-2-1200x805.jpg`** had a ~2.5% white border baked in; cropped off.

## Photo credit

Several of these are clearly professional wedding photography (CKP, Patrick McNamara,
and the Parker/Michaud/Kristen & Kory sets). Before go-live, confirm VBTS has usage
rights for web, and ask whether photographer credit is expected in the gallery — some
contracts require it.

## Still missing

There is no clean, dedicated shot of the **stone terrace during cocktail hour** at ground
level — the drone frame is standing in for it. A single wide terrace photo with guests and
high-tops would strengthen Chapter 02 more than anything else here. A **York Room** photo
is also missing entirely; that section is currently text-only.
