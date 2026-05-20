# Image Assets — Migration Notes

For the concept pitch this homepage references the client's existing
CDN URLs on annegouldcollegeadvisor.com directly so the live preview
renders her actual brand assets without any hotlink workaround.

## On WordPress conversion, swap to local paths:

| Asset                 | Concept URL (current)                                                                                            | Migrated path           |
|-----------------------|------------------------------------------------------------------------------------------------------------------|-------------------------|
| Logo                  | annegouldcollegeadvisor.com/.../Screen-Shot-2016-03-21-at-6.44.29-PM.png                                         | img/logo.png            |
| Hero — group photo    | annegouldcollegeadvisor.com/wp-content/uploads/group1.jpg                                                        | img/hero-group.jpg      |
| Meet Anne portrait    | annegouldcollegeadvisor.com/wp-content/uploads/annTich.jpg                                                       | img/anne-portrait.jpg   |
| CTA greeting          | annegouldcollegeadvisor.com/wp-content/uploads/greeting.jpg                                                      | img/cta-greeting.jpg    |
| IECA logo             | annegouldcollegeadvisor.com/.../IECA_ProfessionalMember1-300x85.png                                              | img/assoc-ieca.png      |
| NACAC logo            | annegouldcollegeadvisor.com/.../NACAC_wName_rgb_whitespace-460x300-300x196.jpg                                   | img/assoc-nacac.jpg     |
| NYSACAC logo          | annegouldcollegeadvisor.com/wp-content/uploads/nysacac.jpg                                                       | img/assoc-nysacac.jpg   |
| NYSSCA logo           | annegouldcollegeadvisor.com/.../cropped-NYSSCA-LOGO-Banner-300x65.jpg                                            | img/assoc-nyssca.jpg    |

When converting to WordPress, replace absolute URLs with PHP template
helpers, e.g. `<?php echo get_template_directory_uri(); ?>/img/...`
or `wp_get_attachment_image()` for proper srcset/lazy-loading.

Recommended next pass:
- Re-export hero photo at ~1800px max width, progressive JPEG q82
- Replace legacy `Screen-Shot-2016-...png` logo with cleanly vectorized
  SVG and an optimized PNG fallback
- Compress association logos to small PNGs (~10KB each)
