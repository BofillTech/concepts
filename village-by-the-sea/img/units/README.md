# Unit photos — manifest & provenance

**Source:** client Drive folder *"Unit Photos - Village by the Sea"*
(`1vkCZ222pfBkUntBs79QNUnZ-ik6wavad`, owner `jrobie981@gmail.com`, shared 2026-08-13).

**303 real photographs across 50 units in 11 buildings.** Nothing stock, nothing AI,
nothing hotlinked — all self-hosted here.

Pipeline: `exif_transpose` → per-unit perceptual dedupe → LANCZOS to max 1100px →
progressive JPEG q80. **284.7 MB in → 40.9 MB out** (~138 KB average).

Naming: `{unit}-{nn}.jpg`, lowercased, sequence preserved from the source folder
(interiors first, exterior deck views last).

## Units by building

| Bldg | Units |
|---|---|
| 1 | B, E |
| 2 | A, B, C, D, E, F |
| 3 | B, C, D, E |
| 4 | B, C, D, E |
| 5 | A, B, C, D, E, F |
| 6 | A, C, F |
| 7 | C, E, F |
| 8 | A, B, C, D, E, F, H |
| 9 | A, E, F, G, H |
| 10 | A, B, C, D, G |
| 11 | B, E, F, G, H |

## The "view from the deck" shots

Every source set ends with one or two exterior photographs taken from that unit's own
deck or patio — this turned out to be the most valuable thing in the folder and the
unit pages are built around it.

These were classified automatically (vegetation + sky saturation heuristic, threshold
0.25) and are flagged per unit as `v` in `js/units.js`. **40 of 50 units** got a
confident detection; the gold dot on a unit button marks them.

**10 units where no view shot was detected** — `2E, 4B, 4E, 5F, 7C, 7E, 8C, 8F, 9F, 10B`.
Some genuinely have none; others (7C especially) *do* have deck shots that the heuristic
missed because they were taken on an overcast day from a covered deck, so they read dark
and grey. Worth a manual pass — flipping a unit's `v` value is a one-character edit.

## Gaps

- **7E has only 2 photos**, both bedrooms — no kitchen, living room, or view. Needs a reshoot.
- Thin sets (4 photos): **8B, 9A, 11B**.
- Several source folders contained nested `OLD` / `old` / `resized` / `New folder`
  subfolders that were **not** crawled. If a unit needs more frames, look there first.
- `Thumbs.db` files in every folder were ignored.

## Not yet in the data model

`js/units.js` deliberately carries **no bedroom count, tier, or floor** per unit. Those
are not derivable from the photos with any confidence and must come from the property's
unit roster. When that lands, add them to the `UNITS` object and the unit pages and
filters can use them immediately.

The Knot lists VBTS as having **72 suites**; 50 are photographed here. The remaining ~22
are either outside the rental program or simply unphotographed.
