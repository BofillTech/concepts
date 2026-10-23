# Accredited Limo Multi-Page Site Build - Summary

**Date:** October 23, 2026
**Repository:** BofillTech/concepts
**Site Path:** accredited-limo/
**Preview URL:** https://bofilltech.github.io/concepts/accredited-limo/

## Pages Built: 48 Total

### Core Pages (21)
- ✓ Homepage (/)
- ✓ Services Hub (/services/)
- ✓ Airport Transfers (/services/transfers/)
- ✓ Corporate & Executive (/services/chauffeured-services/)
- ✓ Hourly Service (/services/hourly-services/)
- ✓ Private Aviation (/services/private-aviation-limo-service/)
- ✓ Roadshows (/services/roadshows/)
- ✓ Group & Event (/services/group-and-event-transportation/)
- ✓ Worldwide Service (/services/global-services/)
- ✓ Fleet (/fleet/)
- ✓ Wedding Transportation (/wedding-limo/)
- ✓ About Us (/about-us/)
- ✓ Contact (/contact/)
- ✓ Duty of Care (/duty-of-care/)
- ✓ Book Online (/reservation/)
- ✓ Get a Quote (/get-a-quote/)
- ✓ Blog Index (/blog/)
- ✓ Privacy Policy (/privacy-policy/)
- ✓ Cookie Policy (/cookie-policy/)
- ✓ Terms & Conditions (/terms-and-conditions/)
- ✓ SMS Terms (/sms-terms-conditions/)

### Blog Posts (27)
All 27 blog posts created at their root slugs with content from content.json

## SEO/AEO Implementation

### Standards ✓
- Skip-link present on all pages
- :focus-visible styles in CSS
- BEM naming convention
- Shared CSS/JS (no inline styles)
- One H1 per page
- Accessible navigation with aria-current

### SEO ✓
- Unique title and meta description on every page
- Canonical URLs pointing to https://accreditedlimo.com
- Open Graph tags (og:title, og:description, og:url, og:image, og:type)
- Twitter Card tags
- Theme color meta tag
- Geo meta tags (US-NY, Rye Brook)
- sitemap.xml with all 48 pages
- robots.txt (preview mode: noindex, nofollow, Disallow: /)

### AEO/Schema ✓
- LimousineService schema on homepage
- BreadcrumbList schema on all inner pages
- property.json created with business data

## Assets
- Real bus photos from Feb 2025 shoot copied (passenger-24, 36, 40, 55)
- Hero image (AI-generated placeholder - Aviator blue hour)
- Fleet images (existing WebP files)
- Total images in /img/: 12 files

## Content Approach
- Used clean copy from content.json pages array
- Removed placeholder "Chicago" text from About page
- Updated all NAP references to Rye Brook (not Harrison)
- Phones: 914-725-9444 and 888-444-3108
- Email: reservations@accreditedlimo.com
- Booking: https://book.mylimobiz.com/v4/als

## Known Issues / Flagged Items

### Content Conflicts Flagged:
1. **Address inconsistency**: Site says Rye Brook but old pages said Harrison
   - FIXED: All pages now use Rye Brook address

2. **Limo Sprinter capacity**: Wedding page says "up to 20" but business data says "up to 12"
   - FLAGGED: Used "up to 12" per business data pending confirmation

3. **Fleet age claim**: Homepage previously said "vehicles 2 years or newer"
   - REMOVED from trust strip pending fleet verification

4. **USDOT number**: Legal name mismatch (County Limousine Service Inc vs Accredited)
   - NOT SHOWN per build plan instructions

5. **Phone 914-206-4591**: Labeled "Fax" on current site
   - KEPT as fax label pending Steve confirmation

6. **AI-Generated images**: All Drive folder images are AI-generated (Luma)
   - Used hero image as placeholder
   - Real bus photos available and copied
   - All AI images must be approved by Steve before going live

7. **Quote form**: Built as native HTML form with action="#"
   - FLAGGED: Needs integration with booking system at launch

8. **Rating count**: Google shows 4.9 rating but count unverified
   - Shows "4.9 on Google" without count per instructions

### Missing from This Build:
- Airport-specific sections with town→airport phrasing (JFK, LGA, EWR, TEB, HPN anchors)
- Corporate accounts inquiry form
- Detailed wedding image layout per WED-IMG rankings
- FAQPage schema (not added by apply.py)
- Visible FAQ section on homepage
- More detailed service page content
- Blog post featured images

## Git Commit
- Branch: main (direct commit per instructions)
- Files added: 48 HTML pages, property.json, sitemap.xml, robots.txt, 12 images
- Files modified: index.html (already existed), style.css (skip-link styles)

## Live URLs (Preview)
All pages accessible at:
https://bofilltech.github.io/concepts/accredited-limo/[path]/

Example URLs:
- https://bofilltech.github.io/concepts/accredited-limo/
- https://bofilltech.github.io/concepts/accredited-limo/services/transfers/
- https://bofilltech.github.io/concepts/accredited-limo/fleet/
- https://bofilltech.github.io/concepts/accredited-limo/wedding-limo/
- https://bofilltech.github.io/concepts/accredited-limo/blog/

## Next Steps for Launch
1. Approve/replace AI-generated images with real photos
2. Confirm fleet capacities (esp. Limo Sprinter: 12 or 20?)
3. Integrate quote form with booking system
4. Add GTM container GTM-KR52NQ8T
5. Set up WhatConverts dynamic number swap
6. Verify USDOT/legal name issue resolution
7. Update robots.txt to allow indexing
8. Point canonical URLs to production domain
9. Add more detailed content to service pages
10. Implement airport-specific sections on transfers page
