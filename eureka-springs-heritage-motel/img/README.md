# Image Sources — Eureka Springs Heritage Motel concept

This concept hotlinks property photography directly from the live booking-listing
CDN (Booking.com `bstatic.com`) and the property's own Weebly uploads, using
`referrerpolicy="no-referrer"`. No binaries are stored in this folder.

For a production WordPress build, **re-host every image** via `wp_upload_media`
(server-side URL fetch) so the site does not depend on third-party CDNs.

## Hero / Exterior (also OG image + final CTA + wide gallery tile)
- 593811771 — https://q-xx.bstatic.com/xdata/images/hotel/max1280/593811771.jpg?k=562e5e3e5c4f098721e7bf8f526ba158819ebda0fa98414f6df89850408af07c&o=&a=2325679

## Room photography
- Double Queen — 593852657.jpg?k=c94fd5dd60502238de232fedb9c54fc398e40c8993202bb158245dd8e0d68fd6&o=&a=2325679
- King Jacuzzi — 593852835.jpg?k=720459b190e0046452f01c325200dc42863fde89dde29b34ab0274acfba5543b&o=&a=2325679
- King — 593878490.jpg?k=e07479fb1d28cadc344f609ff87096bed098cbbea9593531316573cb014d4929&o=&a=2325679

## Additional gallery tiles (same CDN pattern: /xdata/images/hotel/max1280/ + &o=&a=2325679)
- 593852756 · k=116c74393bba0a8b350cd96293a9a44e693b65b0a8271b4514d09b053b55371a
- 593852798 · k=a1cc37e8217c930993e9e4404b515c3975ad14fc67aee15ab80e41c58c6e1693
- 593878623 · k=a03dcb7126744e9483743c3bc88e9f0c3e92786574044f906d8e842496f5fe7e
- 593878630 · k=8caa0de0a1c8a0aa7540fabb83f9ebeaaccaa37a3ba591dace46137c1760545c
- 593852849 · k=a6cfe406cc19c45e7290481b646d516575fead9fe3d8b4e807e3bf8804ab0f35

## Property Weebly uploads (https)
Base: https://www.eurekaspringsheritagemotel.com/uploads/1/3/8/9/138935611/
- welcome figure — editor/img-9450.jpg?1630185309
- breakfast feature — published/img-1373.jpg?1682024667
- gallery — img-4655_orig.jpg

## Notes / caveats
- King Jacuzzi tile uses a real room photo not independently confirmed to be the
  jacuzzi unit specifically — swap if the owner provides the exact shot.
- Logo: live site uses a text site-title (no image logo); concept renders a styled
  wordmark + atomic starburst mark. Drop in a real logo to swap.
- bstatic URLs include signed `k=` tokens; if they expire, re-pull from the live
  Booking.com listing or re-host originals supplied by the owner.
