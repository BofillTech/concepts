# Hudson Valley Charter Bus & Van Services: Homepage (Phase 1, staging)

Flat HTML. No build step. Open index.html locally or upload the folder to a staging host.
STAGING ONLY: `<meta name="robots" content="noindex, nofollow">` and robots.txt (Disallow: /) block crawlers. Remove both at launch.
`<body data-phase="1">` makes inner-page links show a "coming in Phase 2" notice and makes Get a Quote scroll to the quick-quote strip. Delete `data-phase="1"` once inner pages exist.

## Files
- index.html: homepage, LocalBusiness JSON-LD, Open Graph tags
- css/style.css: all styles (design tokens at the top)
- js/main.js: mobile menu, trip-ideas rail, quick-quote validation and hand-off, footer year, conversion event hooks
- img/: every photo as WebP at 480, 768, 1280 and 1920 px wide, plus og-hero-...-1200x630.jpg for social sharing
- robots.txt: staging version

## Design direction
Plain-spoken, sturdy and local. The headline type is Barlow Semi Condensed, drawn from US highway signage, paired with Source Sans 3 for body text. The one bold moment is "How booking works," built as a road with mile-marker signs, tying back to "one mile at a time." Everything else stays quiet: navy, white and light gray, with photos doing the work.

Palette (client's logo palette, Oct 17, 2026): Hudson Navy #042151 (header text, dark bands, road), Midnight Navy #060E23 (body text, footer), Coach Blue #1F5CAC (buttons, links, mile markers, closing band), Metallic Silver #9CA2A9 (stars, icons and borders on navy), Light Silver #E8E8E9 (alternate section backgrounds), White #FFFFFF.
Supporting shades: #9EC2F0 (light Coach Blue tint for links on navy), #4A5466 (secondary text), #D3D5D8 (hairlines), #6B7280 (form-field borders).
Contrast: white on Coach Blue is 6.59:1 (passes WCAG AA). Metallic Silver is only 2.58:1 on white, so it is never used for text or form-field borders on light backgrounds; silver replaces the old gold for star ratings, which sit on navy (6.08:1).
Buttons: 6px radius, 48 to 54px tall, solid royal or white outline. Cards: 10px radius, thin border, soft navy shadow.
Dark mode: colors follow the visitor's device setting. Remove the two dark-mode blocks in style.css if the client wants light only.

## Logo
Official Hudson Valley Charter Bus & Van Services logo (supplied by the client as a PNG on white). The outer white background was removed and the logo trimmed, then exported as img/hudson-valley-charter-logo-320/640/960 in WebP and PNG (transparent).
- White header: logo shown directly, 146px wide on desktop (about 68px tall), 124px on tablets and phones, 112px on small phones.
- Dark backgrounds (footer, and the header when the visitor's device is in dark mode): logo sits on a white rounded badge, because its navy "CHARTER BUS & VAN SERVICES" line and rules disappear on navy.
- The schema logo points to /img/hudson-valley-charter-logo-640.png on the new site.

## Hero headline variants for the client
Current: "Charter Bus & Van Service for the Hudson Valley, Westchester & Beyond"
Option B: "Your group. Our family's 50-year promise." / Subhead: "Charter buses, minibuses and Sprinter vans for schools, weddings, businesses and community groups. Clean vehicles, on-time drivers and a real person on the phone."
Option C: "Westchester's charter bus and van company for 50+ years" / Subhead: "From a 14-passenger Sprinter to a fleet of 56-passenger coaches, we match the right vehicle to your group and send your driver's name and cell number before every trip."
