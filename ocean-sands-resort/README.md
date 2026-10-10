# The Ocean Sands Resort — Virginia Beach, VA

**Homepage redesign concept** built Oct 10, 2026  
**Ledger:** #170  
**Live concept:** https://bofilltech.github.io/concepts/ocean-sands-resort/

---

## Property Profile

**The Ocean Sands Resort**  
2207 Atlantic Ave, Virginia Beach, VA 23451  
(757) 428-5141  
[vsaresorts.com/ocean-sands-resort-virginia-beach/](https://vsaresorts.com/ocean-sands-resort-virginia-beach/)

A **VSA Resorts** oceanfront vacation-ownership property on the Virginia Beach boardwalk.

- **104 oceanfront vacation suites** with private balconies
- Newly refurbished with full kitchens, queen beds, and full-size sleeper sofas
- Indoor pool with retractable roof, sauna, fitness center, jacuzzi
- PURE™ Allergy Friendly suites available
- Seasonal full-service restaurant
- On-site parking garage, complimentary Wi-Fi
- Direct boardwalk access with shopping and dining steps away

**Check-in:** 4:00 PM  
**Check-out:** 10:00 AM  
**Book Now:** [Vacatia](https://vacatia.com/virginia-beach-williamsburg-vacation-resort-rentals/ocean-sands-resort/virginia-beach-virginia?adcid=2417)

---

## Concept Design

### Ledger #170 Structure

**Hero:** `full-bleed-slideshow-dots` — three-image auto-advancing slideshow (balcony view, exterior tower, renovated bedroom) with dot navigation  
**Grid:** `tiled-mosaic` — asymmetric overlapping tile layouts in suites, gallery, and rooms sections  
**Nav:** `top-sticky-shrink` — fixed header that compresses on scroll, with phone + Book Now always visible  
**Motion:** `slide-in-sides` — elements animate from left and right alternating as they enter viewport

### Typography & Color

**Fonts:** Sora (display, 400/600/700/800) + Karla (body, 300/400/600)  
**Palette:** `atlantic-slate-seafoam-sunset` 
- Atlantic Slate `#2b3d4f` (primary text, header)
- Seafoam Teal `#4a9b8e` (accent, CTAs)
- Sunset Amber `#d4985f` (warm accent)
- Dune Cream `#f5ebe0` (section backgrounds)
- Whitecap `#ffffff` (base)

Fresh vs last 5 rows: avoids Crimson Pro/Montserrat (#165), Teko/Work Sans (#166), Epilogue/Inter (#167), and their color schemes.

### Images

31 self-hosted real property photos from vsaresorts.com, extracted from `ocean-sands-resort.tgz`.  
**Lead hero:** `balcony-oceanfront-view.jpg` (2000x1332) — private balcony with straight-on oceanfront view  
Featuring renovated suites first (white/blue coastal décor, wave-art headboards); classic interiors used sparingly.

### Steve's 6 Rules ✓

1. ✓ **Standard top nav** — Fixed header with section links (no side rail)
2. ✓ **Phone + Book Now always visible** — In desktop/mobile header and booking bar
3. ✓ **Sticky bottom booking bar** — JS-triggered after scrolling past hero
4. ✓ **Big full-bleed hero** — 90vh slideshow (balcony, tower, bedroom)
5. ✓ **Image-heavy** — Large photos throughout all sections
6. ✓ **Real self-hosted photos** — 31 property images in `img/`

### Quality Bar ✓

- Flat structure: `index.html` + `css/main.css` + `js/main.js`
- Semantic HTML5 with Hotel/LodgingBusiness JSON-LD schema
- BEM methodology, CSS custom properties
- Mobile-first responsive design
- Zero inline styles
- Vanilla JavaScript (slideshow, scroll animations, booking bar)
- Google Maps iframe for 2207 Atlantic Ave
- `prefers-reduced-motion` support
- Lazy-loaded images below fold

---

## Content Sources

All content verified from:
- vsaresorts.com/ocean-sands-resort-virginia-beach/
- Vacatia listing (check-in/out times, room types)
- BRIEF.md (curated facts, no invented reviews/awards/stats)
- PHOTOS.md (image dimensions, hero recommendations)

**Book Now URL preserved:** `?adcid=2417` (VSA's Vacatia referral code)

---

## Technical Stack

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts: Sora, Karla
- Google Maps Embed API
- Intersection Observer API (scroll animations)
- No frameworks, no dependencies

---

**Built by:** Bofill Tech concept team  
**Date:** October 10, 2026  
**Row:** Ledger #170, README Concept Tracker #170
