# Yankee Peddler Inn — Newport, RI

Homepage-only redesign concept for Yankee Peddler Inn, a historic Victorian bed & breakfast in Newport's Historic Hill neighborhood.

## Property Details

- **Address:** 113 Touro Street, Newport, RI 02840
- **Phone:** (401) 846-1323
- **Built:** 1800s (early Victorian home for a Boston mariner)
- **Rooms:** 19 guestrooms with private baths
- **Website:** https://www.yankeepeddlerinn.com/
- **Book Now:** https://guest.rezstream.com/search/yankee-peddler-inn

## Concept Features

### Design Decisions

**Ledger Entry #172:**
- **Hero:** `full-bleed-inline-booking-widget` — Full-bleed hero (85vh) with inline booking form at bottom
- **Grid:** `editorial-overlap-two-col` — Editorial two-column layouts with overlapping elements
- **Nav:** `top-classic-logo-center` — Centered logo with phone left, CTA + hamburger right
- **Motion:** `soft-scale-in` — Gentle scale-in animations on images and sections
- **Fonts:** Merriweather (display serif) + Source Sans 3 (body sans)
- **Palette:** `colonial-navy+newport-brass+fog-pewter+sailcloth-cream+harbor-teal`

### Key Requirements Met

✅ **Steve's Non-Negotiables:**
1. Standard top navigation bar (no side rail) — centered logo, phone + Book Now always visible on desktop + mobile
2. Clickable phone + Book Now button in header on all devices
3. Hero: big, beautiful, full-bleed exterior photo (`exterior-main-house-flag.jpg` 1920×800) at 85vh
4. Image-heavy throughout with large real property photos, self-hosted
5. Real photos only, all self-hosted from the tarball

✅ **Booking Bar (Steve's top priority):**
- Sticky bar fixed to bottom viewport, slides in after scrolling past hero
- Real `<form method="post">` to rezStream with all required hidden fields
- Check-in/Check-out date inputs + Guests select (1-4 adults, default 2)
- Dates default to tomorrow and day after, validated (check-out > check-in, max 21 nights)
- Native `<input type="date">` with JS conversion to MM/DD/YYYY on submit
- Responsive: compact 2-row layout on mobile, single row on desktop
- Body padding added when visible to prevent content overlap
- Z-index above content, no overflow:hidden clipping

✅ **Hero Responsive Image:**
- Desktop: `exterior-main-house-flag.jpg` (1920×800 wide banner)
- Mobile: `<picture>` swaps to `exterior-front-door.jpg` (1920×1251) to avoid bad cropping

✅ **Quality Bar (Web Architect SOP):**
- Flat index.html + css/main.css + js/main.js
- Semantic HTML5, BEM methodology
- CSS custom properties for colors/spacing
- Mobile-first responsive design
- Zero inline styles
- Vanilla JavaScript (no frameworks)
- Hotel/LodgingBusiness JSON-LD structured data
- Real Google Maps iframe for 113 Touro Street
- `prefers-reduced-motion` support
- Lazy-loaded images below the fold

### Section Structure

1. **Hero** — Full-bleed with `<picture>` element for responsive hero images + inline booking widget
2. **Story** — Editorial two-column layout with text + large image
3. **Rooms** — Four room cards in responsive grid (2-col on tablet+)
4. **Amenities** — Two-column split with icon list + dual images
5. **Gallery** — Masonry-style gallery with 5 property photos
6. **Location** — Two-column with details + Google Maps iframe, plus Newport area photos (AREA tagged)
7. **CTA** — Full-width call-to-action with Book Now button

### Photo Usage

All 28 photos from the tarball were copied to `img/` and are self-hosted:

- **Lead hero:** `exterior-main-house-flag.jpg` (1920×800)
- **Mobile hero:** `exterior-front-door.jpg` (1920×1251)
- **SMALL photos** (under 1400px): used in appropriate contexts, not full-bleed
- **AREA photos** (Newport scenery): used only in Location section, clearly labeled as local area

### Technical Implementation

**Booking Forms:**
- Two separate forms: hero inline widget + sticky bottom bar
- Both POST to `https://guest.rezstream.com/search/yankee-peddler-inn`
- Hidden fields: `BusinessSlug`, `SearchType`, `Locale`, `NumberOfRooms`, `SelectedGuests[0].Id`
- Visible fields: Check-in date, Check-out date, Guests select
- JavaScript validation: check-out after check-in, max 21 nights
- Date format conversion: `YYYY-MM-DD` (input) → `MM/DD/YYYY` (rezStream)

**Sticky Bar Logic:**
- Appears when hero bottom edge scrolls above viewport top
- Uses `requestAnimationFrame` for smooth scroll performance
- Adds `booking-bar-visible` class to body for bottom padding
- CSS transform transition for slide-up animation

**Navigation:**
- Sticky top bar, centered logo
- Phone number with SVG icon (text hidden on mobile)
- Book Now CTA button always visible
- Hamburger menu for section links (visible mobile, hidden desktop 1024+)
- Flyout menu with smooth transitions

## Ledger Entry

```
| 172 | yankee-peddler-inn | 2026-10-12 | full-bleed-inline-booking-widget | hero,story,rooms,amenities,gallery,location,cta | editorial-overlap-two-col | top-classic-logo-center | soft-scale-in | colonial-nautical-serif-display | Merriweather | Source Sans 3 | colonial-navy+newport-brass+fog-pewter+sailcloth-cream+harbor-teal |
```

## Concept Tracker Row

| # | Property | Location | URL | Live Concept | Layout Style | Fonts | Date |
|---|---|---|---|---|---|---|---|
| 172 | Yankee Peddler Inn | Newport, RI (**113 Touro Street, Newport, RI 02840** · an **oasis of calm, comfortable, casual charm in Newport's Historic Hill** — built in the 1800s for a Boston mariner, early Victorian home · **19 guestrooms with private baths**, many with canopy beds and decorative fireplaces · **third-story rooftop deck** overlooking Newport rooftops · complimentary continental breakfast · **free on-site parking** (one car per reservation, rare in Newport) · free WiFi · 24-hour front desk · Friday wine hour · Carriage House Queen rooms across the garden · just uphill from the waterfront, downhill from Bellevue Avenue mansions · 401-846-1323) | [yankeepeddlerinn.com](https://www.yankeepeddlerinn.com/) | [View →](https://bofilltech.github.io/concepts/yankee-peddler-inn/) | **FULL-BLEED-INLINE-BOOKING-WIDGET hero (exterior-main-house-flag.jpg 1920×800, swaps to exterior-front-door.jpg on mobile via `<picture>`) + TOP-CLASSIC-LOGO-CENTER nav (phone + Book Now always visible desktop+mobile) + EDITORIAL-OVERLAP-TWO-COL grid + SOFT-SCALE-IN motion + STICKY BOTTOM BOOKING BAR** (Steve's top priority: real `<form method="post">` to rezStream, slides in after hero, check-in/out dates + guests, date validation, MM/DD/YYYY conversion, responsive layout). Homepage-only redesign concept. Ledger #172 — all four history-filtered axes fresh vs last 3 rows (#171/#170/#169). Colonial Newport nautical palette (colonial-navy #1a3a52, newport-brass #b8986f, fog-pewter #8a9ba8, sailcloth-cream #f7f5ed, harbor-teal #4a7c8c) with Merriweather serif display + Source Sans 3 body. Lead hero: exterior-main-house-flag.jpg (1920×800 wide banner). All 28 photos self-hosted from tarball, AREA photos (Newport scenery) in Location section only. | Merriweather + Source Sans 3 | 2026-10-12 |

## Files Delivered

```
yankee-peddler-inn/
├── index.html          # Main homepage
├── css/
│   └── main.css        # All styles (BEM, mobile-first, CSS custom properties)
├── js/
│   └── main.js         # Navigation, booking forms, sticky bar logic
├── img/                # All 28 photos from tarball
│   ├── exterior-main-house-flag.jpg
│   ├── exterior-front-door.jpg
│   ├── room-*.jpg
│   ├── rooftop-*.jpg
│   ├── area-newport-*.jpg
│   └── ...
└── README.md           # This file
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design: mobile (320px+) through desktop (1920px+)
- Graceful degradation with `prefers-reduced-motion`
- Native HTML5 form validation + JavaScript enhancement

---

**Live URL:** https://bofilltech.github.io/concepts/yankee-peddler-inn/
