#!/usr/bin/env python3
"""
Batch complete remaining 5 hotels CSS/JS
Generates exact patches to apply
"""

import subprocess
import sys

# Remaining hotels with their specific details
HOTELS = [
    {
        'name': 'coyote-mountain-lodge',
        'engine': 'cloudbeds',
        'url': 'https://hotels.cloudbeds.com/reservation/4CMdnA',
        'css_file': 'css/main.css',
        'js_file': 'js/main.js'
    },
    {
        'name': 'ocean-sands-resort',
        'engine': 'link-only',
        'url': 'https://vacatia.com/virginia-beach-williamsburg-vacation-resort-rentals/ocean-sands-resort/virginia-beach-virginia?adcid=2417',
        'css_file': 'css/main.css',
        'js_file': 'js/main.js'
    },
    {
        'name': 'silver-creek-hotel',
        'engine': 'link-only',
        'url': 'https://www.bookonthenet.net/east/premium/eresmain.aspx?id=SoHIAPY3vGKJm%2f%2biCJ2PaguzeQNoVLAwdNa964N9f6JUOjOnC9807ZK1%2frszwHoHF6wsVpY3eUSd3Lh8NnKwsw%3d%3d#/search',
        'css_file': 'css/main.css',
        'js_file': 'js/main.js'
    },
    {
        'name': 'applewood-inn',
        'engine': 'link-only',
        'url': 'mailto:applewoodusa@hotmail.com',
        'css_file': 'css/style.css',
        'js_file': 'js/main.js'
    },
    {
        'name': 'forest-springs-resort',
        'engine': 'cloudbeds',
        'url': 'https://us2.cloudbeds.com/reservation/fhGss7',
        'css_file': 'css/style.css',
        'js_file': 'js/main.js'
    }
]

print("Remaining 5 hotels to complete:")
for hotel in HOTELS:
    print(f"  - {hotel['name']} ({hotel['engine']})")

print("\nEach needs:")
print("  1. CSS: Add booking bar field styles")
print("  2. JS: Add date picker init + booking handler")
print("\nReady to apply via StrReplace tool")
