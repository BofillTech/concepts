# Hotel Captain Cook - Homepage Concept

A modern homepage concept for The Hotel Captain Cook in Anchorage, Alaska.

## Property Details

- **Name:** Hotel Captain Cook
- **Location:** 939 W. 5th Avenue, Anchorage, Alaska 99501
- **Phone:** 907-276-6000 | 800-843-1950
- **Website:** https://captaincook.com
- **Type:** Independent luxury hotel (not a chain)
- **Rooms:** 557 rooms and suites

## Booking Engine

AZDS Booking Engine - dates prefill via URL hash parameters:
- Format: `#checkin=YYYY-MM-DD&checkout=YYYY-MM-DD&adults=N`
- Base URL: `https://newbooking.azds.com/captain-cook/`

## Features

- Full-bleed hero with exterior photo
- Sticky booking bar with native date inputs
- Clickable phone number in header
- Book Now button always visible
- Image-heavy layout with real property photos
- Semantic HTML with BEM methodology
- LodgingBusiness JSON-LD schema
- Responsive design (1440px and 390px tested)

## Images

All images are sourced from the official Hotel Captain Cook website:
- `hero-exterior.jpg` - Hotel exterior
- `room-1.jpg` - Deluxe room
- `room-2.jpg` - Junior suite
- `view.jpg` - Mountain views
- `lobby.jpg` - Interior/lobby

## Structure

```
hotel-captain-cook/
├── index.html          Main HTML file
├── css/
│   └── main.css       Styles with BEM naming
├── js/
│   └── main.js        Booking bar and interactions
├── img/               Property photos
└── README.md          This file
```

## Testing

Verified with Playwright at:
- Desktop: 1440px width
- Mobile: 390px width

All functionality working:
✓ Booking bar visible and styled
✓ Book Now URL correct with date prefill
✓ No console errors
✓ Responsive layout
