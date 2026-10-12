#!/usr/bin/env python3
"""
Generate booking bar code for all 13 hotels
"""

import json
import os

# Hotel configurations
HOTELS = [
    {
        "folder": "roam-inn",
        "phone": "+19063878000",
        "phone_display": "(906) 387-8000",
        "booking_url": "https://roam-inn.com/accommodations/",
        "engine": "link-only",
        "status": "done"
    },
    {
        "folder": "open-hearth-inn",
        "phone": "+18556957070",
        "phone_display": "(855) 695-7070",
        "booking_url": "https://openhearthinn.ohanainns.com",
        "engine": "link-only"
    },
    {
        "folder": "north-vancouver-hotel",
        "phone": "+16049887878",
        "phone_display": "(604) 988-7878",
        "booking_url": "https://secure.guestcentric.net/api/bg/book.php?apikey=dd316346d1bac05fb6c4f288787dac0c&s=default&l=en_US",
        "engine": "link-only"
    },
    {
        "folder": "general-palmer-hotel",
        "phone": "+19703689557",
        "phone_display": "(970) 368-9557",
        "booking_url": "https://hotels.cloudbeds.com/en/reservation/cwKUgx",
        "engine": "cloudbeds"
    },
    {
        "folder": "ocean-club-hotel",
        "phone": "+19499225000",
        "phone_display": "(949) 922-5000",
        "booking_url": "https://www.reseze.net/servlet/WebresResDesk?hotelid=1620",
        "engine": "link-only"
    },
    {
        "folder": "hotel-chalet",
        "phone": "+19709633625",
        "phone_display": "(970) 963-3625",
        "booking_url": "https://reservations.thehotelchalet.com/?chain=31107&hotel=42145",
        "engine": "synxis"
    },
    {
        "folder": "rsvp-hotel",
        "phone": "+14014301300",
        "phone_display": "(401) 430-1300",
        "booking_url": "https://direct-book.com/properties/RSVPMotelDirect",
        "engine": "siteminder"
    },
    {
        "folder": "dutchland-motel",
        "phone": "+17177682600",
        "phone_display": "(717) 768-2600",
        "booking_url": "https://direct-book.com/properties/dutchlandmoteldirect",
        "engine": "siteminder"
    },
    {
        "folder": "coyote-mountain-lodge",
        "phone": "+19704067654",
        "phone_display": "(970) 406-7654",
        "booking_url": "https://hotels.cloudbeds.com/reservation/4CMdnA",
        "engine": "cloudbeds"
    },
    {
        "folder": "ocean-sands-resort",
        "phone": "+17574916001",
        "phone_display": "(757) 491-6001",
        "booking_url": "https://vacatia.com/virginia-beach-williamsburg-vacation-resort-rentals/ocean-sands-resort/virginia-beach-virginia?adcid=2417",
        "engine": "link-only"
    },
    {
        "folder": "silver-creek-hotel",
        "phone": "+18149430803",
        "phone_display": "(814) 943-0803",
        "booking_url": "https://www.bookonthenet.net/east/premium/eresmain.aspx?id=SoHIAPY3vGKJm%2f%2biCJ2PaguzeQNoVLAwdNa964N9f6JUOjOnC9807ZK1%2frszwHoHF6wsVpY3eUSd3Lh8NnKwsw%3d%3d#/search",
        "engine": "link-only"
    },
    {
        "folder": "applewood-inn",
        "phone": "+12078659705",
        "phone_display": "(207) 865-9705",
        "booking_url": "mailto:applewoodusa@hotmail.com",
        "engine": "link-only",
        "special": "bottom-nav"
    },
    {
        "folder": "forest-springs-resort",
        "phone": "+19282883568",
        "phone_display": "(928) 288-3568",
        "booking_url": "https://us2.cloudbeds.com/reservation/fhGss7",
        "engine": "cloudbeds"
    }
]

def generate_booking_url_js(hotel):
    """Generate JavaScript code to build the booking URL with dates"""
    engine = hotel['engine']
    base_url = hotel['booking_url']
    
    if engine == 'cloudbeds':
        return f'''                const checkin = checkinInput.value;
                const checkout = checkoutInput.value;
                const adults = guestsSelect.value;
                const bookingUrl = '{base_url}#checkin=' + checkin + '&checkout=' + checkout + '&adults=' + adults;
                console.log('Booking URL (Cloudbeds):', bookingUrl);
                window.open(bookingUrl, '_blank', 'noopener,noreferrer');'''
    
    elif engine == 'siteminder':
        return f'''                const checkin = checkinInput.value;
                const checkout = checkoutInput.value;
                const adults = guestsSelect.value;
                const bookingUrl = '{base_url}?locale=en&checkInDate=' + checkin + 
                    '&checkOutDate=' + checkout + 
                    '&items%5B0%5D%5Badults%5D=' + adults + 
                    '&items%5B0%5D%5Bchildren%5D=0&items%5B0%5D%5Binfants%5D=0&currency=USD';
                console.log('Booking URL (SiteMinder):', bookingUrl);
                window.open(bookingUrl, '_blank', 'noopener,noreferrer');'''
    
    elif engine == 'synxis':
        return f'''                const checkin = checkinInput.value;
                const checkout = checkoutInput.value;
                const adults = guestsSelect.value;
                const bookingUrl = '{base_url}&arrive=' + checkin + '&depart=' + checkout + '&adult=' + adults + '&rooms=1';
                console.log('Booking URL (SynXis):', bookingUrl);
                window.open(bookingUrl, '_blank', 'noopener,noreferrer');'''
    
    else:  # link-only
        return f'''                const bookingUrl = '{base_url}';
                console.log('Booking URL (link only):', bookingUrl);
                window.open(bookingUrl, '_blank', 'noopener,noreferrer');'''

# Print out example for verification
for hotel in HOTELS[:3]:
    print(f"\n{hotel['folder']} ({hotel['engine']}):")
    print(generate_booking_url_js(hotel))
