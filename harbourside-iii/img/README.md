# Harbourside III — image manifest

All photography in this concept is **real** and hotlinked from either the client's own
WordPress uploads (`harboursideiii.com/wp-content/uploads/`) or the property's own
Tripadvisor listing photos, every `<img>` carrying `referrerpolicy="no-referrer"`.

Nothing is stock and nothing is AI-generated.

To bulletproof for a WordPress build, download each file into this folder (or push it
through `wp_upload_media`) and swap the `src`.

| Slot | Source | File |
|---|---|---|
| Nav logo | harboursideiii.com | `2015/08/logo_new.jpg` |
| Footer logo | harboursideiii.com | `2015/08/logo_footer.png` |
| Hero frame | harboursideiii.com | `2021/10/IMG_3984-2-scaled.jpg` |
| View · direct harbour | Tripadvisor | `13/a7/54/ea/harbor-view-from-our.jpg` |
| View · entertainment pavilion | Tripadvisor | `17/81/01/b6/taken-from-balcony.jpg` |
| View · the market | Tripadvisor | `14/b4/18/b4/each-villa-has-a-different.jpg` |
| The harbour year (21:9 band) | Tripadvisor | `14/b4/1a/2e/from-memorial-day-to.jpg` |
| Beach & trails | harboursideiii.com | `2015/08/beach.jpg` |
| Gallery · master bedroom (tall) | Tripadvisor | `17/81/01/c9/taken-from-master-bedroom.jpg` |
| Gallery · pool (wide) | harboursideiii.com | `2021/03/HS3-Pool-3-scaled.jpg` |
| Gallery · villa interior | Tripadvisor | `03/a4/8d/55/amazing-views.jpg` |
| Gallery · building over the harbour | harboursideiii.com | `2018/07/IMG_5553.jpg` |
| Gallery · island bike trails | harboursideiii.com | `2015/08/bikes.jpg` |
| Gallery · from the water | Tripadvisor | `08/29/e8/fc/harbourside-iii-at-shelter.jpg` |
| Visit · street view | Tripadvisor | `14/b4/18/04/street-view-of-harbourside.jpg` |
| Final CTA background | Tripadvisor | `09/ac/5b/12/harbourside-iii-at-shelter.jpg` |

## Caveats

- The sandbox is firewalled from both `harboursideiii.com` and the Tripadvisor CDN, so
  photos render blank in build QA. They load normally in a real browser / on GitHub Pages.
- **Tripadvisor may block cross-origin hotlinking at any time.** The eight Tripadvisor
  slots are the ones to re-host first. The client's own WordPress uploads are stable.
- The logo (`logo_new.jpg`) could not be opened in-sandbox, so its exact brand colours
  were **not eyedropped**. The header bar is deliberately a light paper colour so the
  logo reads natively whatever its palette is, and the JS falls back to a typographic
  "Harbourside III" wordmark if the file ever fails. Lock the palette against the real
  logo before client-facing use.

## Biggest photography upgrade available

The property's own site has only a handful of images and no confirmed villa interiors at
full resolution. A single half-day shoot would transform this page:

1. **Three balcony frames** — one from a direct-harbour villa, one over the entertainment
   pavilion, one over the market. The whole page is built on that three-way choice, and
   right now two of the three are guest phone photos.
2. **A villa interior set** — kitchen, dining area, living room with the sleeper sofa, and
   the king master. Since every villa is furnished alike, one good set covers all 39.
3. **The pool and the pavilion at dusk**, plus one frame of the Tuesday fireworks from a
   balcony — that is the single most sellable image this property could own.
