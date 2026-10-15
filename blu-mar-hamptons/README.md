# Harpoon House (Blu Mar Hamptons) — Concept Redesign

**Property:** Harpoon House  
**Location:** Southampton, NY  
**Current site:** https://www.blumarhamptons.com/ (restaurant site) / https://www.harpoonhousehamptons.com/ (hotel site)  
**Concept URL:** https://bofilltech.github.io/concepts/blu-mar-hamptons/

## Overview

Homepage redesign concept for a historic boutique hotel built in 1648 in the heart of Southampton, NY. Features 9 guest rooms, seasonal Michelin-starred Mediterranean dining at Blu Mar, and coastal Hamptons sophistication on Main Street.

## Key Features

- **Hero:** Full-bleed exterior/gardens photo with bottom overlay title — lead image `hero-exterior.jpg`
- **Navigation:** Sticky white top bar with visible phone + Book Now on all screen sizes
- **Sticky booking bar:** Appears after scrolling past hero with native date inputs and guest select
- **Layout:** Symmetric two-column alternating grid for rooms and content sections
- **Motion:** Sticky booking bar reveal on scroll, subtle image hover transforms
- **Typography:** Playfair Display (serif display) + Lato (sans-serif body)
- **Palette:** Navy ink, sand cream, seafoam teal, gold brass

## Design Differentiation

Built to contrast with recent concepts:
- Different hero treatment (editorial-open vs asymmetric-collage, full-bleed-center-overlay, full-bleed-centered-overlay)
- Different grid system (symmetric-two-col-alternating vs four-col-card-grid, three-col-card-lift, card-grid-equal)
- Different typefaces (Playfair Display/Lato vs Archivo Black/Outfit, Crimson Text/Montserrat, Georgia/System)
- Different palette (navy+sand+seafoam+gold vs forest/mountain palettes and midnight/brass)
- Different nav (top-sticky vs split-logo-actions, top-fixed-phone-book, top-fixed-white)

## Technical Implementation

- Flat HTML + vanilla CSS/JS
- Semantic HTML5 with LodgingBusiness JSON-LD
- BEM naming convention
- CSS custom properties for theming
- Mobile-first responsive design
- Real self-hosted property photos (12 images from official site)
- Google Maps iframe for location
- Zero inline styles, zero external dependencies

## Steve's Non-Negotiable Rules ✓

1. ✓ Standard top navigation bar (sticky)
2. ✓ Clickable phone number AND Book Now button always visible (desktop + mobile header)
3. ✓ Slim sticky bottom booking bar (appears after hero scroll)
4. ✓ Hero = big, beautiful, full-bleed photo (85vh) of exterior and gardens
5. ✓ Image-heavy throughout with large real property photos
6. ✓ Real photos only, self-hosted from `img/` directory
7. ✓ Booking bar with native date inputs defaulting to tomorrow and day after
8. ✓ Dates passed to LuxuryRes booking engine: `?h=10149&a=YYYY-MM-DD&d=YYYY-MM-DD&ad=N`

## Contact Information

- **Address:** 136 Main Street, Southampton, NY 11968
- **Phone:** (631) 488-4570
- **Email:** harpoonhouse136@gmail.com
- **Booking Engine:** LuxuryRes (https://www.luxuryres.com/BookingEngines/V16/index.asp?h=10149)
- **Check-in:** 3:00 PM
- **Check-out:** 12:00 PM
- **Guest Policy:** Adults only (18+)

## Booking Engine

**LuxuryRes V16** with date prefill support:
- Base URL: `https://www.luxuryres.com/BookingEngines/V16/index.asp`
- Hotel ID: `h=10149`
- Arrival: `a=YYYY-MM-DD`
- Departure: `d=YYYY-MM-DD`
- Adults: `ad=N`

Example: `https://www.luxuryres.com/BookingEngines/V16/index.asp?h=10149&a=2026-10-16&d=2026-10-17&ad=2`

## Concept Tracker

| # | Property | Location | Hero Image | Layout | Notes |
|---|---|---|---|---|---|
| 177 | Harpoon House (Blu Mar Hamptons) | Southampton, NY | `hero-exterior.jpg` | editorial-open, symmetric-two-col-alternating, top-sticky, sticky-booking-bar | Playfair Display/Lato, navy+sand+seafoam+gold palette. Historic 1648 boutique hotel with Blu Mar dining. LuxuryRes booking with date prefill. |

---

*Concept redesign for demonstration purposes. All photos sourced from the property's official website.*
