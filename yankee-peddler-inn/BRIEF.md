# Yankee Peddler Inn — concept brief

- **ClickUp task:** 86dz0h2b6 — https://app.clickup.com/t/86dz0h2b6
- **Slug:** `yankee-peddler-inn`
- **Current website:** https://www.yankeepeddlerinn.com/ (WordPress, rezStream-built theme)
- **Independent:** Appears so (no brand affiliation on site). Owner/operator name: UNKNOWN (reviews mention staff "Liz").

## Contact / conversion chrome
- **Address:** 113 Touro Street, Newport, RI 02840 (site footer + JSON-LD)
- **Phone:** (401) 846-1323 → `tel:+14018461323`
- **Email:** reservations@yankeepeddlerinn.com
- **Book Now target (site's Book Now / Check Availability / Book Room buttons):** https://guest.rezstream.com/search/yankee-peddler-inn (rezStream, HTTP 200)
- **Date/guest prefill (tested 2026-10-12):**
  - GET `?Arrival=MM/DD/YYYY` (or YYYY-MM-DD) prefills **arrival only**; Departure/Nights/guest params are ignored on GET (always arrival+1 night, 2 adults).
  - **POST works fully**: form POST to `https://guest.rezstream.com/search/yankee-peddler-inn` with fields `BusinessSlug=yankee-peddler-inn`, `SearchType=ByIndividualUnit`, `Locale=en-us`, `Arrival=11/06/2026`, `Departure=11/08/2026`, `NumberOfRooms=1`, `SelectedGuests[0].Id=d2476b18-f152-41db-9924-e0535d54ff5f`, `SelectedGuests[0].NumberOfGuests=3` (Adults; children = `SelectedGuests[1].Id=f10f6f7e-2c1d-4fbe-afab-02d195441db0`). Returns 302 to `/select/yankee-peddler-inn?CartId=…` showing Nov 6–8, 2 nights, 3 adults. No CartId needed. Use a `<form method="post" target="_blank">` in the booking bar.
  - Limits from engine: max 4 adults, 4 children, 4 rooms, max stay 21 nights, bookable 365 days out.
- **Check-in / check-out times:** UNKNOWN — not stated on site or booking engine (verify on OTA before stating).

## Story / positioning (from site)
- "An oasis of calm, comfortable, casual charm in an ideal in-town location." In Newport's "Historic Hill" neighborhood, a few blocks from the waterfront and Bellevue Avenue; "just uphill from the waterfront, and just downhill from Bellevue Avenue."
- Built in the 1800s for a Boston mariner and naval officer; early Victorian home. (Exact year UNKNOWN; a file is named "1840"/"1897" but not stated as fact.)

## Rooms
- 19 guestrooms, all private baths; many with canopy beds and decorative fireplaces.
- Room types on site: Carriage House Queen (five rooms across the garden from the Main House), Standard Queen, Superior 1 Queen, Superior 2 Queens, Superior 2-Queen Suite (two separate bedrooms with full bath). Rates/sizes: UNKNOWN.

## Amenities (site)
- Third-story rooftop deck overlooking Newport rooftops
- Complimentary self-serve continental breakfast
- Free on-site parking (one car per reservation)
- Free WiFi
- 24-hour front desk
- Complimentary wine hour Friday evenings
- Afternoon cookies/tea/coffee (from reviews, not site copy)

## Reviews
- TripAdvisor: https://www.tripadvisor.com/Hotel_Review-g60978-d118888-Reviews-Yankee_Peddler_Inn-Newport_Rhode_Island.html (2019 Travelers' Choice badge on site; score/count UNKNOWN). Homepage shows 5-star TA review excerpts praising location, free parking, breakfast, rooftop patio, staff.
- Facebook: https://www.facebook.com/YankeePeddlerInn
