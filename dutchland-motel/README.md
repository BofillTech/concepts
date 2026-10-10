# Dutchland Motel — Lancaster, PA

Homepage-only redesign concept for Dutchland Motel, located at 1492 Lititz Pike, Lancaster, PA 17601.

**Live Concept:** [https://bofilltech.github.io/concepts/dutchland-motel/](https://bofilltech.github.io/concepts/dutchland-motel/)

**Current Website:** [https://dutchlandhotel.com/](https://dutchlandhotel.com/)

## Property Overview

Dutchland Motel offers clean, friendly, and welcoming accommodations in the heart of Lancaster County. Previously known as Days Inn & Suites Lancaster, Clarion Inn, Hammock, and Rodeway Inn, the property is now independently operated by Golden Lancaster LLC.

**Key Facts:**
- **50 rooms:** Standard Double Room (2 queen beds) and Single King Room (1 king bed)
- **Check-in:** 3:00 PM
- **Check-out:** 11:00 AM
- **Phone:** 717-293-8400
- **Direct Booking:** [https://direct-book.com/properties/dutchlandmoteldirect](https://direct-book.com/properties/dutchlandmoteldirect)

## Concept Design

**Ledger Row #168**

### Structure Axes (Anti-Sameness Roll)
- **Hero:** `fullbleed-ken-burns` — Full-bleed hero image with subtle Ken Burns zoom animation
- **Navigation:** `top-two-tier-centered` — Standard top navigation bar with centered logo, menu, and always-visible phone + Book Now button
- **Grid:** `card-masonry` — Masonry-style card grid for rooms and gallery
- **Motion:** `fade-up` — Fade-up entrance animations triggered by scroll intersection

### Design System
- **Display Font:** Lora (serif) — Warm and elegant, perfect for Lancaster County hospitality
- **Body Font:** Open Sans (sans-serif) — Clean and highly readable
- **Color Palette:** `hex-barn-red + pennsylvania-gold + amish-cream + farmland-green + ink-charcoal`
  - Hex Barn Red: `#A63F3F` (primary brand color)
  - Pennsylvania Gold: `#D4A24F` (accent)
  - Amish Cream: `#F9F6F0` (background)
  - Farmland Green: `#4A6741` (secondary CTA)
  - Ink Charcoal: `#2B2B2B` (text)

### Steve's 6 Non-Negotiable Rules — Compliance Checklist

✅ **Rule 1: Standard top navigation bar** — Top nav with logo, menu links, and action buttons. Hamburger flyout on mobile.

✅ **Rule 2: Phone + Book Now always visible** — Both `717-293-8400` (clickable tel: link) and "Book Now" button are present in the top header on desktop AND mobile (not hidden inside the flyout).

✅ **Rule 3: Sticky bottom booking bar** — Slim booking bar appears after scrolling past the hero (JavaScript-triggered via Intersection Observer), with phone and Book Now button.

✅ **Rule 4: Hero is big, beautiful, full-bleed photo** — 90vh full-bleed hero using `exterior-balcony-courtyard.jpg` (2000×1333, courtyard and motel wings). Ken Burns animation for subtle motion.

✅ **Rule 5: Image-heavy throughout** — Large real property photos in rooms grid, amenities section, and masonry gallery. 21 self-hosted photos used.

✅ **Rule 6: Real photos only, self-hosted** — All 21 photos extracted from the provided archive into `dutchland-motel/img/`. No stock images, no external hotlinks.

### Web Architect SOP Compliance

- ✅ Flat structure: `index.html`, `css/main.css`, `js/main.js`
- ✅ Semantic HTML5 with proper landmarks
- ✅ BEM naming convention for CSS classes
- ✅ CSS custom properties for design tokens
- ✅ Mobile-first responsive design
- ✅ Zero inline styles
- ✅ Vanilla JavaScript (no dependencies)
- ✅ JSON-LD structured data (Hotel/LodgingBusiness schema)
- ✅ Real Google Maps iframe for the address
- ✅ `prefers-reduced-motion` support for animations
- ✅ Lazy-loaded images below the fold (`loading="lazy"`)
- ✅ Proper image dimensions and alt text
- ✅ Accessible ARIA labels where needed

## Photo Credits

All 21 photos sourced from the property's Expedia listing (3840px originals), WordPress uploads, and Booking.com listing. Downscaled to max 2000px for web optimization. See `PHOTOS.md` and `SOURCES.tsv` in the research pack for full attribution.

**Lead Hero:** `exterior-balcony-courtyard.jpg` (2000×1333) — Patio deck with courtyard view and both motel wings.

## Technical Notes

- Hero Ken Burns animation is CSS-based and respects `prefers-reduced-motion`
- Booking bar visibility is JavaScript-triggered after hero scroll
- Intersection Observer used for fade-up animations on cards and gallery images
- Mobile navigation uses a hamburger menu with smooth toggle animation
- All images are self-hosted in `img/` directory
- Fonts loaded from Google Fonts (Lora + Open Sans)

## Ledger Position

**Row #168** — Built in parallel with sibling concepts #169–#171. All structure axes (hero, nav, grid, motion) are fresh vs. the last 3 ledger rows per anti-sameness rules. Fonts and palette avoid duplication with the last 5 rows.

---

**Built:** October 2026  
**Concept by:** Bofill Tech  
**Copyright:** © 2026 Golden Lancaster LLC
