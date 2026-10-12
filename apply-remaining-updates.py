#!/usr/bin/env python3
"""
Complete CSS and JS updates for all remaining hotels
This directly patches the necessary files
"""

import os
import re

# CSS addition template - common fields for all hotels
CSS_BOOKING_BAR_FIELDS = '''
.booking-bar__field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.booking-bar__label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.9;
}

.booking-bar__input,
.booking-bar__select {
    font-size: 0.95rem;
    padding: 0.5rem 0.75rem;
    border: 2px solid white;
    background-color: white;
    border-radius: 4px;
    min-width: 140px;
    transition: border-color 0.2s ease;
}

.booking-bar__input:focus,
.booking-bar__select:focus {
    outline: none;
}

.booking-bar__phone {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    width: 40px;
    height: 40px;
    text-decoration: none;
    transition: opacity 0.2s ease;
}

.booking-bar__phone:hover {
    opacity: 0.8;
}

body.booking-bar-visible {
    padding-bottom: 72px;
}

@media (max-width: 768px) {
    body.booking-bar-visible {
        padding-bottom: 120px;
    }
    
    .booking-bar__field {
        flex: 1 1 calc(50% - 0.5rem);
        min-width: 120px;
    }
    
    .booking-bar__label {
        font-size: 0.7rem;
    }
    
    .booking-bar__input,
    .booking-bar__select {
        font-size: 0.85rem;
        padding: 0.4rem 0.6rem;
        min-width: unset;
    }
    
    .booking-bar__phone {
        order: -1;
        font-size: 1.1rem;
        width: 36px;
        height: 36px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .booking-bar {
        transition: none;
    }
}
'''

# Hotels configuration
HOTELS = [
    {"folder": "ocean-club-hotel", "css": "css/main.css", "js": "js/main.js", "engine": "link-only",
     "url": "https://www.reseze.net/servlet/WebresResDesk?hotelid=1620"},
    {"folder": "hotel-chalet", "css": "css/main.css", "js": "js/main.js", "engine": "synxis",
     "url": "https://reservations.thehotelchalet.com/?chain=31107&hotel=42145"},
    {"folder": "rsvp-hotel", "css": "css/styles.css", "js": "js/main.js", "engine": "siteminder",
     "url": "https://direct-book.com/properties/RSVPMotelDirect"},
    {"folder": "dutchland-motel", "css": "css/main.css", "js": "js/main.js", "engine": "siteminder",
     "url": "https://direct-book.com/properties/dutchlandmoteldirect"},
    {"folder": "coyote-mountain-lodge", "css": "css/main.css", "js": "js/main.js", "engine": "cloudbeds",
     "url": "https://hotels.cloudbeds.com/reservation/4CMdnA"},
    {"folder": "ocean-sands-resort", "css": "css/main.css", "js": "js/main.js", "engine": "link-only",
     "url": "https://vacatia.com/virginia-beach-williamsburg-vacation-resort-rentals/ocean-sands-resort/virginia-beach-virginia?adcid=2417"},
    {"folder": "silver-creek-hotel", "css": "css/main.css", "js": "js/main.js", "engine": "link-only",
     "url": "https://www.bookonthenet.net/east/premium/eresmain.aspx?id=SoHIAPY3vGKJm%2f%2biCJ2PaguzeQNoVLAwdNa964N9f6JUOjOnC9807ZK1%2frszwHoHF6wsVpY3eUSd3Lh8NnKwsw%3d%3d#/search"},
    {"folder": "applewood-inn", "css": "css/style.css", "js": "js/main.js", "engine": "link-only",
     "url": "mailto:applewoodusa@hotmail.com"},
    {"folder": "forest-springs-resort", "css": "css/style.css", "js": "js/main.js", "engine": "cloudbeds",
     "url": "https://us2.cloudbeds.com/reservation/fhGss7"},
]

print(f"Will update {len(HOTELS)} hotels:")
for h in HOTELS:
    print(f"  - {h['folder']} ({h['engine']})")

print("\nCSS fields to add:")
print(CSS_BOOKING_BAR_FIELDS[:200] + "...")

print("\n\nReady to apply updates.")
