# Asset Replacement Plan - Seth's Real Photos

## Logo Replacements
Current: `hudson-valley-charter-logo-{320,640,960}.{png,webp}`
Replace with: `hudson-valley-coach-logo.jpg` (Seth's official logo)

Need to:
1. Create appropriately sized versions from seth-originals/logo-IMG_3431_0474.jpeg
2. Update all HTML references (header, footer, JSON-LD schema)
3. Update favicon if needed

## Fleet Photo Replacements

### 24-Passenger Minibus
**Exterior:**
- Current: `fleet-minibus-24-pax-wedding-shuttle-v*.webp` (AI/placeholder)
- Replace with: `hvc-24-pax-minibus-exterior-white.png` (Seth's real Unit 812)
- Usage: Fleet index, 24-pax detail page, fleet cards

**Interior:**
- Current: None visible
- Add: `hvc-24-pax-minibus-interior.jpg`
- Usage: 24-pax detail page photos section

### 40-Passenger Coach
**Exterior:**
- Current: `fleet-temsa-ts35-winery-tour-v*.webp` (AI winery scene)
- Replace with: `hvc-40-pax-coach-exterior.png` (Seth's real coach)
- Usage: Fleet index, 40-pax detail page, fleet cards

**Interior:**
- Current: Generic blue seats
- Add: `hvc-40-pax-coach-interior.jpg`
- Usage: 40-pax detail page photos section, interior gallery

### Party Sprinter (13-passenger)
**Exterior:**
- Current: None (mentioned but not shown)
- Add: `hvc-party-sprinter-exterior.png`
- Usage: Fleet index Party Sprinter section

**Interior:**
- Current: "Interior photos coming soon" placeholder callout
- Replace with: `hvc-party-sprinter-interior.jpg` (luxury black leather interior)
- Usage: Fleet index, remove "coming soon" callout

## Pages to Update
1. `/index.html` - Homepage (logo, any fleet cards)
2. `/fleet/index.html` - Fleet overview (logo, all fleet images, Party Sprinter section)
3. `/fleet/24-passenger-minibus/index.html` - 24-pax detail
4. `/fleet/40-passenger-coach-bus/index.html` - 40-pax detail
5. All other pages (logo in header/footer)

## Strategy
Since we can't easily generate webp/responsive versions without image tools:
1. Use the PNG/JPG originals directly for now (acceptable for concept site)
2. Update image references to point to new filenames
3. Adjust alt text to describe real photos (not AI scenes)
4. Keep file sizes reasonable (they're already optimized enough for preview)
