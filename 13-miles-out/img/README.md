# 13 Miles Out — image manifest

**19 of the 21 photographs are self-hosted here** (EXIF-transposed, LANCZOS-resized,
progressive JPEG q84, ~3.3 MB total). Four of them are the **high-resolution
4000x3000 golden-hour drone frames** Steve supplied in the third pass — they now
carry the hero, the MacGregor card lead, and both of the page's biggest bands,
and they replaced every low-resolution aerial the earlier passes were leaning on.

Only **three slots** still hotlink the client's own Weebly uploads, and all three
are Beach House images for which no local file exists.

## The drone set (DJI, 4000x3000 originals)

| File | From | Shows | Used as |
|---|---|---|---|
| `scene-house.jpg` | `DJI_0153` | The whole MacGregor with the mooring field behind it | **Hero slide 1** |
| `scene-harbour.jpg` | `DJI_0148` | The house and lawn above a harbour thick with sailboats | **Hero slide 2** |
| `scene-sunset.jpg` | `DJI_0120` | Sunset over the Salt Pond, the town and the open ocean | **Hero slide 3** + the final CTA band |
| `macgregor-air-tall.jpg` | `DJI_0153` | 4:5 crop, box `(1320, 100, 3400, 2700)` | *held in reserve since the hero went full-bleed* |
| `macgregor-air-harbour.jpg` | `DJI_0156` | The house on its bluff with the marina and the full mooring field beyond | **"Graceful porches, commanding views" band** |

All four are unmistakably **The MacGregor House**. None of them shows The Beach
House — do not caption them as such.

## Self-hosted in `/img/`

| File | Shows | Used as |
|---|---|---|
| `macgregor-porch.jpg` | The MacGregor wrap-around porch looking out to the ocean | Gallery *(moved out of the hero when the drone set arrived)* |
| `macgregor-sunset.jpg` | The MacGregor alone on its lawn at sunset | Hero collage inset, over the seam |
| `macgregor-east.jpg` | The MacGregor front elevation, Mansard roof, blue sky | MacGregor card lead — 400x300, displayed at ~326px |
| `macgregor-living.jpg` | MacGregor living room, navy sectional, printed map | MacGregor card, second plate |
| `macgregor-kitchen.jpg` | MacGregor kitchen, double sink, stacked washer/dryer | Gallery |
| `macgregor-bath.jpg` | MacGregor bath under the eaves | *held in reserve — not currently placed* |
| `beach-living.jpg` | Beach House living room, wall of windows | Beach House card, second plate |
| `beach-nook.jpg` | Corner sitting room, wicker chairs, rope anchor | Gallery |
| `beach-master.jpg` | Bedroom with striped duvet + ensuite through the door | Gallery |
| `beach-fourposter.jpg` | Four-poster bed in dark wood | Gallery |
| `beach-bedroom-pink.jpg` | Bedroom with three windows + painted canvas | Gallery |
| `beach-shower.jpg` | Tiled walk-in shower, pedestal sink, nautical curtain | Gallery |
| `beach-bath.jpg` | Bath with marble hex-tile floor | *held in reserve — a third bathroom was one too many* |
| `aerial-point.jpg` | Aerial: both houses on the point, pond, beach, ocean | *held in reserve — 776px, too soft for a full-bleed band* |
| `aerial-crescent.jpg` | Aerial: Crescent Beach curve and Old Harbour | **"Crescent Beach" parallax band** |

## Still hotlinked from Weebly

| Slot | File | Fallback |
|---|---|---|
| Hero collage, right plate | `beach-house-1_orig.jpg` | *none — no local copy supplied* |
| Beach House card lead | `beach-house_1_orig.jpg` | *none — no local copy supplied* |
| MacGregor card lead | `macgregor-exterior-east_orig.jpg` | → `img/macgregor-east.jpg` |
| Gallery, Beach House kitchen | `kitchen_orig.jpg` | → `img/macgregor-kitchen.jpg` |
| CTA band (CSS) | `bi-aerial-macgregor_orig.jpg` | → `img/aerial-point.jpg` (painted underneath) |

Hotlinked slots carry `referrerpolicy="no-referrer"` and, where a local copy
exists, a `data-fallback` attribute wired up in `js/main.js`. The higher-resolution
`_orig` file loads live and the local copy only appears if it ever fails.

## Known resolution limits

**Resolved for The MacGregor.** The drone set is 4000x3000 and carries every large
slot, so the hero, the card lead and both big bands are now sharp at any width.

**Still open for The Beach House and the interiors.** The interior files top out at
1067px wide and the Crescent Beach aerial is 800px, so the beach band is still
upscaled roughly 1.8× at 1440px and is soft on a large screen. Nothing is upscaled
in the markup — every plate displays at or below its native width.

## What's still needed

1. **A drone pass over The Beach House.** After three photo drops it is still the
   only property on the page with no local file at all — the hero's right plate and
   its card lead both hotlink Weebly. The MacGregor now has four superb aerials and
   the Beach House has none, which makes the two halves of the diptych unequal.
2. **A high-resolution Crescent Beach frame** to replace the 800px aerial under the
   beach band.
3. **A frame from the widow's walk**, which the copy sells and no photo shows.
4. The `img-####.jpg` files still on their gallery page that weren't supplied —
   worth a look for anything better than the current gallery eight.

## Deliberately not used

- The two floor plans and the two magazine screenshots. The *Coastal Living* /
  *Elle* credential is carried in copy, with no borrowed artwork.
