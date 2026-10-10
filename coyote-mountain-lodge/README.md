# Coyote Mountain Lodge — Concept Redesign

**Property:** Coyote Mountain Lodge  
**Location:** Estes Park, Colorado  
**Current site:** https://www.coyotemountainlodge.com/  
**Concept URL:** https://bofilltech.github.io/concepts/coyote-mountain-lodge/

## Overview

Homepage redesign concept for a mid-century modern mountain lodge in Estes Park with 49 rooms, seasonal heated pool, and direct views of the Rocky Mountains. Minutes from Rocky Mountain National Park.

## Key Features

- **Hero:** Full-bleed panorama with bottom title overlay — lead image `exterior-balcony-rocky-mountain-view.jpg`
- **Navigation:** Solid dark top bar with visible phone + Book Now on all screen sizes
- **Sticky booking bar:** Appears after scrolling past hero
- **Layout:** Split 50-50 alternating grid for rooms and amenities sections
- **Motion:** Parallax layers throughout (hero slow-scroll, content elements with layered depth)
- **Typography:** Sora (display) + Lora (body serif)
- **Palette:** Rocky Mountain inspired — charcoal ink, sky blue, aspen gold, evergreen, stone, snow cream

## Design Differentiation

Built to contrast with sibling property `mountain-shadows-estes/`:
- Different typefaces (Sora/Lora vs Cormorant Garamond/Outfit)
- Different palette (sky blue + aspen gold + evergreen vs teal + amber + pine)
- Different hero treatment (full-bleed panorama bottom title vs their approach)
- Different grid system (split 50-50 alternating vs their layout)

## Technical Implementation

- Flat HTML + vanilla CSS/JS
- Semantic HTML5 with Hotel/LodgingBusiness JSON-LD
- BEM naming convention
- CSS custom properties for theming
- Mobile-first responsive design
- Parallax scroll effects with `prefers-reduced-motion` support
- Real self-hosted property photos (31 images)
- Google Maps iframe for location
- Zero inline styles, zero external dependencies

## Steve's Non-Negotiable Rules ✓

1. ✓ Standard top navigation bar
2. ✓ Clickable phone number AND Book Now button always visible (desktop + mobile header)
3. ✓ Slim sticky bottom booking bar (appears after hero scroll)
4. ✓ Hero = big, beautiful, full-bleed photo (92vh) of exterior balcony view
5. ✓ Image-heavy throughout with large real property photos
6. ✓ Real photos only, self-hosted from `img/` directory

## Contact Information

- **Address:** 1340 Big Thompson Ave., Estes Park, CO 80517
- **Phone:** (970) 586-4376
- **Book Now:** https://hotels.cloudbeds.com/reservation/4CMdnA
- **Check-in:** After 4:00 PM
- **Check-out:** 11:00 AM

## Concept Tracker

| # | Property | Location | Hero Image | Layout | Notes |
|---|---|---|---|---|---|
| 169 | Coyote Mountain Lodge | Estes Park, CO | `exterior-balcony-rocky-mountain-view.jpg` | full-bleed-panorama-bottom-title, split-50-50-alternating, top-solid-dark, parallax-layers | Sora/Lora, sky+aspen+evergreen palette. Sister property to mountain-shadows-estes (deliberately differentiated). |

---

*Concept redesign for demonstration purposes. All photos sourced from the property's official website.*
