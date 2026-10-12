#!/usr/bin/env python3
"""
Mass update booking bars for all 13 hotels
Generates update commands for all CSS, HTML, and JS files
"""

import os
import subprocess
import json

# Define all hotels with their configurations
HOTELS = [
    {"folder": "roam-inn", "phone": "+19063878000", "phone_display": "(906) 387-8000", 
     "booking_url": "https://roam-inn.com/accommodations/", "engine": "link-only", "status": "done"},
    {"folder": "open-hearth-inn", "phone": "+18556957070", "phone_display": "(855) 695-7070",
     "booking_url": "https://openhearthinn.ohanainns.com", "engine": "link-only", "status": "done"},
    {"folder": "north-vancouver-hotel", "phone": "+16049887878", "phone_display": "(604) 988-7878",
     "booking_url": "https://secure.guestcentric.net/api/bg/book.php?apikey=dd316346d1bac05fb6c4f288787dac0c&s=default&l=en_US", "engine": "link-only", "status": "html-done"},
    {"folder": "general-palmer-hotel", "phone": "+19703689557", "phone_display": "(970) 368-9557",
     "booking_url": "https://hotels.cloudbeds.com/en/reservation/cwKUgx", "engine": "cloudbeds", "status": "html-done"},
    {"folder": "ocean-club-hotel", "phone": "+19499225000", "phone_display": "(949) 922-5000",
     "booking_url": "https://www.reseze.net/servlet/WebresResDesk?hotelid=1620", "engine": "link-only"},
    {"folder": "hotel-chalet", "phone": "+19709633625", "phone_display": "(970) 963-3625",
     "booking_url": "https://reservations.thehotelchalet.com/?chain=31107&hotel=42145", "engine": "synxis"},
    {"folder": "rsvp-hotel", "phone": "+14014301300", "phone_display": "(401) 430-1300",
     "booking_url": "https://direct-book.com/properties/RSVPMotelDirect", "engine": "siteminder"},
    {"folder": "dutchland-motel", "phone": "+17177682600", "phone_display": "(717) 768-2600",
     "booking_url": "https://direct-book.com/properties/dutchlandmoteldirect", "engine": "siteminder"},
    {"folder": "coyote-mountain-lodge", "phone": "+19704067654", "phone_display": "(970) 406-7654",
     "booking_url": "https://hotels.cloudbeds.com/reservation/4CMdnA", "engine": "cloudbeds"},
    {"folder": "ocean-sands-resort", "phone": "+17574916001", "phone_display": "(757) 491-6001",
     "booking_url": "https://vacatia.com/virginia-beach-williamsburg-vacation-resort-rentals/ocean-sands-resort/virginia-beach-virginia?adcid=2417", "engine": "link-only"},
    {"folder": "silver-creek-hotel", "phone": "+18149430803", "phone_display": "(814) 943-0803",
     "booking_url": "https://www.bookonthenet.net/east/premium/eresmain.aspx?id=SoHIAPY3vGKJm%2f%2biCJ2PaguzeQNoVLAwdNa964N9f6JUOjOnC9807ZK1%2frszwHoHF6wsVpY3eUSd3Lh8NnKwsw%3d%3d#/search", "engine": "link-only"},
    {"folder": "applewood-inn", "phone": "+12078659705", "phone_display": "(207) 865-9705",
     "booking_url": "mailto:applewoodusa@hotmail.com", "engine": "link-only", "special": "bottom-nav"},
    {"folder": "forest-springs-resort", "phone": "+19282883568", "phone_display": "(928) 288-3568",
     "booking_url": "https://us2.cloudbeds.com/reservation/fhGss7", "engine": "cloudbeds"}
]

def find_files(folder):
    """Find CSS, JS, and HTML files for a hotel"""
    files = {"css": None, "js": None, "html": f"{folder}/index.html"}
    
    # Find CSS
    css_candidates = [f"{folder}/css/styles.css", f"{folder}/css/style.css", f"{folder}/css/main.css"]
    for css_file in css_candidates:
        if os.path.exists(css_file):
            files["css"] = css_file
            break
    
    # Find JS
    js_candidates = [f"{folder}/js/main.js", f"{folder}/js/script.js", f"{folder}/js/scripts.js"]
    for js_file in js_candidates:
        if os.path.exists(js_file):
            files["js"] = js_file
            break
    
    return files

# Generate file inventory
print("Hotel File Inventory:")
print("=" * 80)
for hotel in HOTELS:
    if hotel.get("status") in ["done"]:
        continue
    
    files = find_files(hotel["folder"])
    print(f"\n{hotel['folder']}:")
    print(f"  Engine: {hotel['engine']}")
    print(f"  HTML: {files['html']}")
    print(f"  CSS:  {files['css']}")
    print(f"  JS:   {files['js']}")

print("\n" + "=" * 80)
print(f"Total hotels to update: {len([h for h in HOTELS if h.get('status') not in ['done']])}")
