# Fairfield Technology — Static HTML Build

WordPress-ready static site generated from the Lovable React preview, following the architectural guide:

- **Flat root** for HTML pages: `index.html`, `services.html`, `about.html`, `contact.html`
- **Assets** strictly under `/css`, `/js`, `/img`
- **No inline styles**, no inline scripts, no inline event handlers
- **Semantic HTML5** (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- **BEM** class naming (e.g. `service-card__title`, `nav-primary__phone`)
- **WordPress nav classes** preserved: `.nav-primary`, `.menu.genesis-nav-menu.menu-primary`, `.menu-item`, `.menu-item-type-post_type`, `.menu-item-object-page`
- **Schema.org** structured data: Organization (index), SiteNavigationElement (all pages), Review (testimonial)
- **WCAG 2.1**: skip link, `aria-*` attributes, accessible form labels, alt text, focus styles
- **Mobile-first** CSS with design-token custom properties (colors, spacing, typography)
- **Vanilla ES6 JS** in `/js/main.js` (mobile nav toggle, form submit handler, toast, active nav)

## Pages
| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, services overview, additional & common services, about, why-us, team, testimonial, contact |
| `services.html` | Full services catalog with 9 anchor-linked detail sections (`#managed-it`, `#cybersecurity`, etc.) |
| `about.html` | About, Why Us, Team, Testimonial |
| `contact.html` | Contact form & details |

## WordPress conversion notes
- Header markup is contained inside `<header class="site-header">` — split into `header.php`.
- Footer markup is `<footer class="site-footer">` — split into `footer.php`.
- Replace asset paths with `<?php echo get_template_directory_uri(); ?>/css/style.css` etc.
- Nav menus use `wp_nav_menu()` defaults compatible with `theme_location => 'primary'` and the `genesis-nav-menu` class.
- No CSS selectors are scoped to body classes — components are fully modular.

## Local preview
Just open `index.html` in a browser, or serve the folder:

```bash
cd fftech-static
python3 -m http.server 8000
```
