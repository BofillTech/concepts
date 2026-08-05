# 13 Miles Out — image manifest

**15 of the 17 photographs are self-hosted here**, optimised from the files Steve
supplied (EXIF-transposed, LANCZOS-resized, progressive JPEG q84, ~1.3 MB total).
Only two slots still hotlink the client's own Weebly uploads, because no local
copy exists for them.

## Self-hosted in `/img/`

| File | Shows | Used as |
|---|---|---|
| `macgregor-porch.jpg` | The MacGregor wrap-around porch looking out to the ocean | **Hero collage, tall left plate** |
| `macgregor-sunset.jpg` | The MacGregor alone on its lawn at sunset | Hero collage inset, over the seam |
| `macgregor-east.jpg` | The MacGregor front elevation, Mansard roof, blue sky | MacGregor card lead *(fallback — see below)* |
| `macgregor-living.jpg` | MacGregor living room, navy sectional, printed map | MacGregor card, second plate |
| `macgregor-kitchen.jpg` | MacGregor kitchen, double sink, stacked washer/dryer | Gallery |
| `macgregor-bath.jpg` | MacGregor bath under the eaves | *held in reserve — not currently placed* |
| `beach-living.jpg` | Beach House living room, wall of windows | Beach House card, second plate |
| `beach-nook.jpg` | Corner sitting room, wicker chairs, rope anchor | Gallery |
| `beach-master.jpg` | Bedroom with striped duvet + ensuite through the door | Gallery |
| `beach-fourposter.jpg` | Four-poster bed in dark wood | Gallery |
| `beach-bedroom-pink.jpg` | Bedroom with three windows + painted canvas | Gallery |
| `beach-shower.jpg` | Tiled walk-in shower, pedestal sink, nautical curtain | Gallery |
| `beach-bath.jpg` | Bath with marble hex-tile floor | Gallery |
| `aerial-point.jpg` | Aerial: both houses on the point, pond, beach, ocean | **"The View" parallax band** + CTA band fallback layer |
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

Everything supplied is modest: the largest file is 1067px wide, the two aerials
are 776 and 800px, and the two MacGregor exteriors are only **400×300**. The
parallax bands upscale their aerial roughly 1.9× at 1440px, so they are soft on a
large screen. Nothing is upscaled in the markup — every plate is displayed at or
below its native width.

## What's still needed

1. **A wide exterior of The Beach House.** It is the only slot on the page with no
   local file at all, and it sits in the hero.
2. **High-resolution versions of the two aerials** — they carry two full-bleed
   bands and are the best images in the set.
3. **A frame from the widow's walk**, which the copy sells and no photo shows.
4. The `img-####.jpg` files still on their gallery page that weren't supplied —
   worth a look for anything better than the current gallery eight.

## Deliberately not used

- The two floor plans and the two magazine screenshots. The *Coastal Living* /
  *Elle* credential is carried in copy, with no borrowed artwork.
