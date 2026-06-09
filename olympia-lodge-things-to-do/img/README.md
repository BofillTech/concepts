# Image assets — Olympia Lodge "Things to Do" concept (#79)

This page currently **hotlinks the client's own live photos** from
`olympia-vt.com/wp-content/uploads/` with `referrerpolicy="no-referrer"`.
Because they are served from the client's own active WordPress site, they
render reliably in a real browser and on GitHub Pages.

## Images used (hotlinked)
| Slot | Source URL |
|---|---|
| Hero | https://olympia-vt.com/wp-content/uploads/2021/06/experience.jpg |
| Interlude band | https://olympia-vt.com/wp-content/uploads/2021/06/accommodation.jpg |
| Ski feature | https://olympia-vt.com/wp-content/uploads/2021/06/gallery-3.jpg |
| Dining | https://olympia-vt.com/wp-content/uploads/2021/06/gallery-02.jpg |
| Gallery 1 | https://olympia-vt.com/wp-content/uploads/2021/06/gallery-1.jpg |
| Gallery 2 | https://olympia-vt.com/wp-content/uploads/2021/06/gallery-2.jpg |
| Gallery 3 | https://olympia-vt.com/wp-content/uploads/2021/06/gallery-4.jpg |
| Gallery 4 | https://olympia-vt.com/wp-content/uploads/2021/06/card-2-635x376.jpg |
| Gallery 5 | https://olympia-vt.com/wp-content/uploads/2021/06/card-3-635x376.jpg |
| Gallery 6 | https://olympia-vt.com/wp-content/uploads/2021/06/gallery-5.jpg |
| Nav logo | https://olympia-vt.com/wp-content/uploads/OL-Logo-3.png |
| Map | https://olympia-vt.com/wp-content/uploads/map1.png |

## To make bulletproof / for the WordPress build
Re-host via `wp_upload_media` to `bofilltech.com/wp-content/uploads/` (server-side
fetch) or download the originals into this `/img/` folder, optimize with Pillow
(hero ≤1800px, gallery ≤1200px, JPEG q82 progressive), and update the `src`
paths in `index.html` to local `img/…` references.
