# Structure Ledger (Phase 2.5)

Machine-readable structure history for the anti-sameness roll. **This file — not README.md — is what Phase 2.5 reads and appends.** The README stays the human-facing prose tracker.

## Rules

1. **Read before rolling.** Load the last 5 rows. History-filtered axes (hero, section-order, grid, nav, motion) must not match any of the last 3 rows.
2. **Append immediately after every concept push, before starting the next build.** A concept without a ledger row is an incomplete delivery. In same-day batches, siblings already built count toward the last-3 filter.
3. **Numbering:** next `#` = top row's `#` + 1. Never reuse or share a number.
4. Newest first. Use `—` for unknown backfilled fields; never leave a field blank on a new row.

Columns: `# | slug | date | hero | section-order | grid | nav | motion | type-treatment | display-font | body-font | palette-key`

## Ledger

| # | slug | date | hero | section-order | grid | nav | motion | type-treatment | display-font | body-font | palette-key |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 125 | black-hills-luxury-suites | 2026-09-12 | editorial-open | type-open,photo-band,story-amenities,suites-pair,trail-distances,gallery,map,cta | symmetric-12col | centered-split-logo | subtle-fade | poster-slab | Bevan | Public Sans | pine+park-brown+bh-gold |
| 124 | 16-bay-view | 2026-09-12 | asymmetric-collage | hero,story-badges,street-level,rooms,rooftop,camden-map,cta | broken-asymmetric | top-sticky | staggered-reveal | slab-display | Besley | Albert Sans | harbor-ink+facade-brick+brass |
| 123 | imperial-500 | 2026-09-11 | split-screen | hero,pool-bento,rooms-af,story,phone-bar | bento-overlapping | hamburger-only | — | — | Righteous | Nunito Sans | dusk-indigo+aqua+imperial-gold |
| 122 | tc-smith | 2026-09-11 | off-center-framed | — | single-column-editorial | — | — | serif-editorial | Libre Caslon Display | Old Standard TT | — |
| 121 | long-hollow-ranch | 2026-09-11 | split-screen | editorial-timeline | — | — | — | — | Hepta Slab | Crimson Pro | — |
| 120 | farmers-guest-house | 2026-09-11 | split-screen | ledger-register | single-column-editorial | centered-split-logo | parallax | — | Libre Caslon Display | Libre Caslon Text | ink-green+claret+brick |
| 119 | the-mooring | 2026-09-11 | split-screen | breakfast-led | — | — | — | — | Prata | Mulish | walnut+gold+haint-blue |
| 118 | escobars-farmhouse-inn | 2026-09-11 | off-center-framed | — | single-column-editorial | centered-split-logo | none | — | Young Serif | Alegreya Sans | hydrangea+door-green |
| 117 | earthbox-inn | 2026-09-11 | off-center-framed | — | single-column-editorial | — | none | — | Anybody | Atkinson Hyperlegible | sun-mustard+retro-postcard |
| 116 | coombs-inn-suites | 2026-09-11 | off-center-framed | — | gilt-framed-editorial | — | — | — | — | — | — |
| 115 | fairbridge-coeur-dalene | 2026-09-11 | split-screen | mileage-board | — | — | — | — | Barlow Condensed | Source Serif 4 | — |
| 114 | spring-house-hotel | 2026-09-02 | video-parallax | video,intro,collection,music,dine,weddings,press,visit,cta | symmetric-12col | top-sticky | subtle-fade | — | Cormorant Garamond | Outfit | atlantic-navy+cream+mansard-red |
| 113 | lighthouse-gulf-shores | 2026-08-26 | editorial-open | type-hero,ticker,stats,suites,day-narrative,reviews,location,cta | broken-asymmetric | top-sticky | marquee-ticker | type-led | Bricolage Grotesque | Hanken Grotesk | gulf-navy+glass-teal+sand |
| 112 | fleur-de-lis | 2026-08-24 | full-bleed | hero,chips,guest-voice,pool-bento,rooms-af,beach-map,amenities,good-to-know,cta | bento-overlapping | top-sticky | staggered-reveal | — | EB Garamond | Albert Sans | cobalt+deep-marine+turquoise |

## Backfill note (2026-09-12)

Rows 115–123 were backfilled from commit messages after the fact. The 2026-09-11 batch was built **without** this ledger (it didn't exist yet): all eight commits self-labeled "#115", the Imperial 500 redesign self-labeled "#116", and the history filter was violated — 5 of 9 builds used a split-screen hero and 4 of 9 used the identical off-center-framed + single-column-editorial + centered-split-logo recipe. Numbers above are the corrected sequence and are authoritative over the commit messages. Fields marked `—` were not recoverable from commits; fill them if the concept is revisited.

## Correction note (2026-09-12)

`black-hills-luxury-suites` was first pushed self-labeled "#124" with an asymmetric-collage / broken-asymmetric / top-sticky / staggered-reveal / Besley structure, colliding with the concurrent `16-bay-view` build that claimed #124 first. It was re-rolled and re-pushed as #125 with the structure recorded above; the ledger is authoritative over both commit messages.
