# Spring House — 301 redirect map (old WordPress site -> new build)

Every URL on the current springhouseblockisland.com (full menu inventory pulled from the live site Nov 14, 2026, plus deep URLs the new site itself links to). New slugs assume WordPress pages named after the concept pages; if a slug changes at build time, update one row.

Rows marked CARRY OVER are pages the NEW site links to — they must keep working, not redirect.

| Old URL | New URL | What it is | Note |
|---|---|---|---|
| / | / | Home |  |
| /stay/ | /stay/ | Stay |  |
| /dine/ | /dine/ | Dine |  |
| /our-hotel/ | /hotel/ | About & History |  |
| /our-hotel/history/ | /hotel/#history | History section (merged into About & History) |  |
| /our-hotel/reviews/ | /press/#reviews | Reviews (merged into Press & Reviews) |  |
| /press/ | /press/ | Press & Reviews |  |
| /weddings-events/ | /private-events/ | Weddings merged into Private Events |  |
| /weddings-events/venues/ | /private-events/#venues | Venues section |  |
| /weddings-events/meetings-conferences/ | /private-events/#meetings | Meetings section |  |
| /weddings-events/wedding-booking-form/ | /weddings-events/wedding-booking-form/ | KEEP LIVE — wedding inquiry form the new site links to (Molly) | CARRY OVER |
| /shop/ | /gift-cards/ | Shop -> Gift Cards (Givex) | VERIFY: confirm /shop/ sold only gift cards |
| /contact/ | /contact/ | Contact |  |
| /cyber-monday/ | /cyber-monday/ | Cyber Monday promo page |  |
| /spa/ | /spa/ | Spa (page exists, hidden from nav) |  |
| /music-on-the-lawn/ | /music-on-the-lawn/ | Music on the Lawn (hidden from nav) |  |
| /weekly-newsletter/ | /weekly-happenings/ | Weekly newsletter -> Weekly Happenings |  |
| /restaurant-item/the-barn/ | /dine/#barn | Old Barn restaurant detail page |  |
| /the-main-restaurant-reservation/ | /dine/ | Main Restaurant reservation form | FLAG: carry form over or point at new reservations flow (restaurant reopens spring 2027) |
| /barn-reservation/ | /dine/#barn | Barn reservation form | FLAG: carry form over or point at new reservations flow |
| /seawindsrentals/seawinds-house-rental-inquiry/ | /seawindsrentals/seawinds-house-rental-inquiry/ | KEEP LIVE — Seawinds rental inquiry form the new site links to | CARRY OVER |
| /join-our-team/ | /join-our-team/ | KEEP LIVE — careers page the new Contact page links to | CARRY OVER |
| /hotel-policies/ | /hotel-policies/ | KEEP LIVE — policies page (FAQ answers reference it) | CARRY OVER |
| /privacy-policies/ | /privacy-policies/ | KEEP LIVE — legal/privacy page | CARRY OVER |

Catch-all: after the mapped rules, send any other old URL (e.g. stray blog/attachment pages) to `/` with a 301.

Import: the CSV beside this file loads straight into the WordPress **Redirection** plugin (Tools -> Redirection -> Import).
