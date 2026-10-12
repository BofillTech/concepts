#!/usr/bin/env python3
"""
Complete all remaining CSS/JS updates in one go
This script generates the exact patches needed
"""

import os
import subprocess

# Remaining hotels to update
UPDATES = {
    "rsvp-hotel": {
        "engine": "siteminder",
        "url": "https://direct-book.com/properties/RSVPMotelDirect",
        "css_file": "css/styles.css",
        "js_file": "js/main.js"
    },
    "dutchland-motel": {
        "engine": "siteminder",
        "url": "https://direct-book.com/properties/dutchlandmoteldirect",
        "css_file": "css/main.css",
        "js_file": "js/main.js"
    },
    "coyote-mountain-lodge": {
        "engine": "cloudbeds",
        "url": "https://hotels.cloudbeds.com/reservation/4CMdnA",
        "css_file": "css/main.css",
        "js_file": "js/main.js"
    },
    "ocean-sands-resort": {
        "engine": "link-only",
        "url": "https://vacatia.com/virginia-beach-williamsburg-vacation-resort-rentals/ocean-sands-resort/virginia-beach-virginia?adcid=2417",
        "css_file": "css/main.css",
        "js_file": "js/main.js"
    },
    "silver-creek-hotel": {
        "engine": "link-only",
        "url": "https://www.bookonthenet.net/east/premium/eresmain.aspx?id=SoHIAPY3vGKJm%2f%2biCJ2PaguzeQNoVLAwdNa964N9f6JUOjOnC9807ZK1%2frszwHoHF6wsVpY3eUSd3Lh8NnKwsw%3d%3d#/search",
        "css_file": "css/main.css",
        "js_file": "js/main.js"
    },
    "applewood-inn": {
        "engine": "link-only",
        "url": "mailto:applewoodusa@hotmail.com",
        "css_file": "css/style.css",
        "js_file": "js/main.js"
    },
    "forest-springs-resort": {
        "engine": "cloudbeds",
        "url": "https://us2.cloudbeds.com/reservation/fhGss7",
        "css_file": "css/style.css",
        "js_file": "js/main.js"
    }
}

def get_js_booking_code(engine, url):
    """Generate the booking submission code based on engine type"""
    if engine == "cloudbeds":
        return f"""
    // Handle booking submission - Cloudbeds with date params
    const submitButton = document.getElementById('booking-bar-submit');
    if (submitButton) {{
        submitButton.addEventListener('click', function() {{
            const checkin = checkinInput.value;
            const checkout = checkoutInput.value;
            const adults = guestsSelect.value;
            const bookingUrl = '{url}#checkin=' + checkin + '&checkout=' + checkout + '&adults=' + adults;
            console.log('Booking URL (Cloudbeds):', bookingUrl);
            window.open(bookingUrl, '_blank', 'noopener,noreferrer');
        }});
    }}"""
    elif engine == "siteminder":
        return f"""
    // Handle booking submission - SiteMinder with date params
    const submitButton = document.getElementById('booking-bar-submit');
    if (submitButton) {{
        submitButton.addEventListener('click', function() {{
            const checkin = checkinInput.value;
            const checkout = checkoutInput.value;
            const adults = guestsSelect.value;
            const bookingUrl = '{url}?locale=en&checkInDate=' + checkin + 
                '&checkOutDate=' + checkout + 
                '&items%5B0%5D%5Badults%5D=' + adults + 
                '&items%5B0%5D%5Bchildren%5D=0&items%5B0%5D%5Binfants%5D=0&currency=USD';
            console.log('Booking URL (SiteMinder):', bookingUrl);
            window.open(bookingUrl, '_blank', 'noopener,noreferrer');
        }});
    }}"""
    else:  # link-only
        return f"""
    // Handle booking submission - link only (no date params)
    const submitButton = document.getElementById('booking-bar-submit');
    if (submitButton) {{
        submitButton.addEventListener('click', function() {{
            const bookingUrl = '{url}';
            console.log('Booking URL (link only):', bookingUrl);
            window.open(bookingUrl, '_blank', 'noopener,noreferrer');
        }});
    }}"""

print("Remaining hotels to update:")
for hotel, config in UPDATES.items():
    print(f"  - {hotel}: {config['engine']}")

print(f"\nTotal: {len(UPDATES)} hotels")
print("\nReady to apply via StrReplace tool")
