# Silver Creek Hotel — Homepage Redesign Concept

**Live concept:** https://bofilltech.github.io/concepts/silver-creek-hotel/

A homepage-only redesign concept for **Silver Creek Hotel** (Bellevue, ID, Wood River Valley), built to showcase modern mountain hospitality with clean design and authentic photography.

## Property Overview

- **Location:** 721 N. Main Street, Bellevue, ID 83313 (Wood River Valley, south of Sun Valley)
- **Phone:** [208-725-8282](tel:+12087258282)
- **Email:** silvercreekhotel@gmail.com
- **Rooms:** 56 comfortable rooms in a boutique hotel built 2017
- **Current website:** https://silvercreeksunvalley.com/

### Key Features
- Solar-heated outdoor pool (swimmable year-round)
- Hot tub with mountain views
- Tesla/EV charging stations
- Pet-friendly rooms with sliding glass doors
- Free continental breakfast (6-9 AM) + $10 omelette bar upgrade
- Free Wi-Fi, fitness center, meeting rooms, 24-hour front desk
- Check-in 3:00 PM | Check-out 11:00 AM

### Location
- **Sun Valley Ski Resort:** 37-minute drive
- **Friedman Memorial Airport (SUN):** 10-minute drive
- **Bellevue City Park:** 11-minute walk

## Design Approach

**Ledger #171** — Mountain-modern design following the anti-sameness roll:

### Assigned Axes
- **Hero:** `full-bleed-left-title-gradient` — Full-bleed hero image with left-aligned title over dark gradient
- **Grid:** `three-col-uniform-cards` — Three-column uniform card grid (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
- **Nav:** `top-sticky-logo-left-cta-right` — Top sticky navigation with logo left, links center, phone + Book Now right
- **Motion:** `hover-zoom-reveal` — Card hover with subtle image zoom and lift effect

### Typography & Color
- **Display font:** Raleway (clean geometric, mountain-modern)
- **Body font:** Open Sans (readable, friendly)
- **Palette:** `wood-river-slate+aspen-gold+creek-blue+sage-meadow+snow-cream+timber-ink`
  - Timber Ink: `#2c3e3f` (primary text)
  - Wood River Slate: `#536878` (secondary text)
  - Creek Blue: `#5b8a9d` (accent)
  - Sage Meadow: `#8b9d8a` (tertiary)
  - Aspen Gold: `#d4a745` (CTA, highlights)
  - Snow Cream: `#faf8f5` (backgrounds)

### Steve's Non-Negotiable Rules ✓
1. ✓ Standard top navigation bar (not side rail)
2. ✓ Clickable phone number AND Book Now button always visible in top header on desktop AND mobile
3. ✓ Slim, minimal-height sticky bottom booking bar that appears after scrolling past hero (JS-triggered)
4. ✓ Hero = big, beautiful, full-bleed photo (90vh) — `exterior-front-sign-sunset.jpg` cropped high
5. ✓ Image-heavy throughout with large real property photos
6. ✓ Real photos only, self-hosted in `img/` folder (29 photos from BRIEF.md research pack)

### Web Architect SOP Standards
- Flat file structure: `index.html` + `css/main.css` + `js/main.js`
- Semantic HTML5 with ARIA labels
- BEM naming methodology
- CSS custom properties (variables)
- Mobile-first responsive design
- Zero inline styles
- Vanilla JavaScript (no dependencies)
- Hotel/LodgingBusiness JSON-LD structured data
- Real Google Maps iframe embed
- `prefers-reduced-motion` support
- Lazy-loaded images below the fold

## Content Structure

1. **Hero** — Full-bleed `exterior-front-sign-sunset.jpg` with gradient overlay, left-aligned title
2. **Story** — Introduction to location and pet-friendly policy
3. **Rooms** — 6 uniform cards: Double Queen, Single King, Queen Garden Tub Suite, King Garden Tub Suite, Executive King Suite, + room amenities overview
4. **Amenities** — 6 uniform cards: Pool & hot tub, breakfast, pet-friendly, sustainability, guest services, common spaces
5. **Gallery** — 9-photo grid showcasing property
6. **Location** — Contact info, hours, nearby attractions, embedded Google Maps
7. **Final CTA** — Gradient background call-to-action
8. **Footer** — Property details, contact, hours

## Photography

All 29 photos sourced from the property's WordPress media library and Expedia listing (verified real hotel photography, no stock images):

- **Lead hero:** `exterior-front-sign-sunset.jpg` (2000×1333) — front facade at sunset, cropped high (`object-position: center 20%`) to hide parking lot
- **Backup heroes:** `exterior-corner-sunset.jpg`, `room-double-queen-window.jpg`
- Full photo list in `PHOTOS.md`

## Technical Details

- **Book Now URL:** https://www.bookonthenet.net/east/premium/eresmain.aspx?id=SoHIAPY3vGKJm%2f%2biCJ2PaguzeQNoVLAwdNa964N9f6JUOjOnC9807ZK1%2frszwHoHF6wsVpY3eUSd3Lh8NnKwsw%3d%3d#/search (BookOnTheNet/SkyTouch eRes engine)
- **Phone:** `tel:+12087258282`
- **Address for Maps:** 721 N. Main Street, Bellevue, ID 83313

## Files

```
silver-creek-hotel/
├── index.html          # Main homepage
├── css/
│   └── main.css       # All styles (BEM, custom properties, mobile-first)
├── js/
│   └── main.js        # Vanilla JS (menu toggle, booking bar, smooth scroll)
├── img/               # 29 self-hosted photos (no stock/Unsplash)
│   ├── exterior-front-sign-sunset.jpg (hero)
│   ├── exterior-corner-sunset.jpg
│   ├── room-double-queen-window.jpg
│   └── ... (26 more)
├── BRIEF.md           # Research brief (verified facts only)
├── PHOTOS.md          # Photo inventory with dimensions & tags
├── SOURCES.tsv        # Photo source URLs
└── README.md          # This file
```

## Ledger Entry

```
| # | slug | date | hero | section-order | grid | nav | motion | type-treatment | display-font | body-font | palette-key |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 171 | silver-creek-hotel | 2026-10-10 | full-bleed-left-title-gradient | hero,story,rooms,amenities,gallery,location,cta | three-col-uniform-cards | top-sticky-logo-left-cta-right | hover-zoom-reveal | mountain-modern-clean | Raleway | Open Sans | wood-river-slate+aspen-gold+creek-blue+sage-meadow+snow-cream+timber-ink |
```

## Concept Tracker Entry

**#171 | Silver Creek Hotel | Bellevue, ID** (721 N. Main Street, Bellevue, ID 83313 · Wood River Valley's newest boutique hotel · 56 comfortable rooms built 2017 · minutes from Sun Valley ski resort, fly fishing, hiking, dining, music festivals · solar-heated pool swimmable year-round · hot tub with mountain views · Tesla/EV charging · pet-friendly rooms with sliding glass doors · free continental breakfast 6-9 AM + $10 omelette bar · 208-725-8282) | [silvercreeksunvalley.com](https://silvercreeksunvalley.com/) | [View →](https://bofilltech.github.io/concepts/silver-creek-hotel/) | **FULL-BLEED-LEFT-TITLE-GRADIENT hero + TOP-STICKY-LOGO-LEFT-CTA-RIGHT nav + three-col-uniform-cards grid + hover-zoom-reveal motion.** Homepage-only redesign concept. Ledger #171 — all four history-filtered axes fresh vs last 3 rows. Mountain-modern design with Raleway + Open Sans, wood-river-slate/aspen-gold/creek-blue/sage-meadow/snow-cream/timber-ink palette. Lead hero: exterior-front-sign-sunset.jpg (cropped high to hide parking lot). 29 self-hosted real photos. | Raleway + Open Sans | 2026-10-10 |

---

**Built by Bofill Tech** — Homepage redesign concept, not affiliated with Silver Creek Hotel.
