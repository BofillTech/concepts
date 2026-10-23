#!/usr/bin/env python3
"""
Accredited Limo Site Builder
Generates all HTML pages from content.json following the page-plan.md specifications
"""

import json
import os
import shutil
from pathlib import Path
from datetime import datetime

# Load content data
CONTENT_FILE = '/home/ubuntu/.cursor/projects/workspace/uploads/extracted/content.json'
with open(CONTENT_FILE, 'r') as f:
    CONTENT = json.load(f)

# Paths
BASE_DIR = Path('/workspace/accredited-limo')
ASSETS_SITE = Path('/home/ubuntu/.cursor/projects/workspace/uploads/extracted/assets/images/site')
ASSETS_DRIVE = Path('/home/ubuntu/.cursor/projects/workspace/uploads/extracted/assets/images/drive')

# Business constants
PHONE_LOCAL = '914-725-9444'
PHONE_TOLL_FREE = '888-444-3108'
EMAIL = 'reservations@accreditedlimo.com'
BOOK_URL = 'https://book.mylimobiz.com/v4/als'
ADDRESS_STREET = '3 International Drive, Suite 140'
ADDRESS_CITY_STATE_ZIP = 'Rye Brook, NY 10573'
CANONICAL_BASE = 'https://accreditedlimo.com'
PREVIEW_BASE = 'https://bofilltech.github.io/concepts/accredited-limo'

def get_page_content(path):
    """Get page content from content.json"""
    for page in CONTENT.get('pages', []):
        if page.get('path') == path:
            return page
    return None

def get_post_content(slug):
    """Get blog post content"""
    for post in CONTENT.get('posts', []):
        if post.get('slug') == slug:
            return post
    return None

def html_header(title, description, canonical_path='/', breadcrumbs=None):
    """Generate HTML header with SEO meta tags"""
    canonical_url = f"{CANONICAL_BASE}{canonical_path}"
    og_image = f"{PREVIEW_BASE}/img/hero-aviator-blue-hour.webp"
    
    breadcrumb_schema = ''
    if breadcrumbs:
        items = []
        for i, (name, url) in enumerate(breadcrumbs, 1):
            items.append(f'''    {{
      "@type": "ListItem",
      "position": {i},
      "name": "{name}",
      "item": "{CANONICAL_BASE}{url}"
    }}''')
        breadcrumb_schema = f'''
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
{','.join(items)}
  ]
}}
</script>'''
    
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{description}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="{canonical_url}">
<meta name="theme-color" content="#16191d">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Accredited Limousine Service">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:url" content="{PREVIEW_BASE}{canonical_path}">
<meta property="og:image" content="{og_image}">
<meta property="og:image:alt" content="Accredited Limousine Service">
<meta name="twitter:card" content="summary_large_image">
<meta name="geo.region" content="US-NY">
<meta name="geo.placename" content="Rye Brook">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&amp;family=Libre+Caslon+Display&amp;display=swap">
<link rel="stylesheet" href="/concepts/accredited-limo/css/style.css">{breadcrumb_schema}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
'''

def site_header(current_page=''):
    """Generate site header with navigation"""
    return f'''<header class="site-header" id="site-header">
  <div class="site-header__inner">
    <a class="brand" href="/concepts/accredited-limo/" aria-label="Accredited Limousine Service, home">
      <span class="brand__word">Accredited</span>
      <span class="brand__swoosh" aria-hidden="true"></span>
      <span class="brand__sub">Limousine Service</span>
    </a>
    
    <nav class="main-navigation" id="site-navigation" aria-label="Main">
      <button class="menu-toggle" type="button" aria-controls="primary-menu" aria-expanded="false">
        <span class="menu-toggle__bars" aria-hidden="true"></span>
        <span class="menu-toggle__label">Menu</span>
      </button>
      <ul class="menu" id="primary-menu">
        <li class="menu-item menu-item-has-children">
          <button class="menu-item__toggle" type="button" aria-expanded="false" aria-controls="submenu-services">Services</button>
          <ul class="sub-menu" id="submenu-services">
            <li class="menu-item"><a href="/concepts/accredited-limo/services/">All services</a></li>
            <li class="menu-item"><a href="/concepts/accredited-limo/services/transfers/">Airport transfers</a></li>
            <li class="menu-item"><a href="/concepts/accredited-limo/services/chauffeured-services/">Corporate &amp; executive</a></li>
            <li class="menu-item"><a href="/concepts/accredited-limo/services/hourly-services/">Hourly service</a></li>
            <li class="menu-item"><a href="/concepts/accredited-limo/services/private-aviation-limo-service/">Private aviation</a></li>
            <li class="menu-item"><a href="/concepts/accredited-limo/services/roadshows/">Roadshows</a></li>
            <li class="menu-item"><a href="/concepts/accredited-limo/services/group-and-event-transportation/">Groups &amp; events</a></li>
          </ul>
        </li>
        <li class="menu-item"><a href="/concepts/accredited-limo/fleet/">Fleet</a></li>
        <li class="menu-item"><a href="/concepts/accredited-limo/wedding-limo/">Weddings</a></li>
        <li class="menu-item"><a href="/concepts/accredited-limo/about-us/">About</a></li>
        <li class="menu-item"><a href="/concepts/accredited-limo/contact/">Contact</a></li>
      </ul>
    </nav>

    <div class="site-header__actions">
      <a class="header-phone js-call" href="tel:+1{PHONE_LOCAL.replace('-', '')}" data-number="{PHONE_LOCAL}">
        <span class="header-phone__label">24/7</span>
        <span class="header-phone__number">{PHONE_LOCAL}</span>
      </a>
      <a class="btn btn--primary btn--sm js-book" href="{BOOK_URL}">Book a ride</a>
    </div>
  </div>
</header>

<main id="main">
'''

def site_footer():
    """Generate site footer"""
    year = datetime.now().year
    return f'''</main>

<footer class="site-footer">
  <div class="site-footer__grid">
    <div class="site-footer__brand">
      <p class="brand brand--light">
        <span class="brand__word">Accredited</span>
        <span class="brand__swoosh" aria-hidden="true"></span>
        <span class="brand__sub">Limousine Service</span>
      </p>
      <address class="site-footer__nap">
        {ADDRESS_STREET}<br>{ADDRESS_CITY_STATE_ZIP}<br>
        Open 24 hours, 7 days a week, 365 days a year
      </address>
    </div>
    <div class="site-footer__col">
      <h2 class="site-footer__h">Services</h2>
      <ul>
        <li><a href="/concepts/accredited-limo/services/chauffeured-services/">Corporate &amp; executive</a></li>
        <li><a href="/concepts/accredited-limo/services/transfers/">Airport transfers</a></li>
        <li><a href="/concepts/accredited-limo/services/private-aviation-limo-service/">Private aviation</a></li>
        <li><a href="/concepts/accredited-limo/services/roadshows/">Roadshows</a></li>
        <li><a href="/concepts/accredited-limo/services/group-and-event-transportation/">Groups &amp; events</a></li>
        <li><a href="/concepts/accredited-limo/wedding-limo/">Weddings</a></li>
        <li><a href="/concepts/accredited-limo/fleet/">Fleet</a></li>
      </ul>
    </div>
    <div class="site-footer__col">
      <h2 class="site-footer__h">Company</h2>
      <ul>
        <li><a href="/concepts/accredited-limo/about-us/">About</a></li>
        <li><a href="/concepts/accredited-limo/duty-of-care/">Duty of care</a></li>
        <li><a href="/concepts/accredited-limo/blog/">Blog</a></li>
        <li><a href="/concepts/accredited-limo/contact/">Contact</a></li>
      </ul>
    </div>
    <div class="site-footer__col">
      <h2 class="site-footer__h">Reach dispatch</h2>
      <ul>
        <li><a class="js-call" href="tel:+1{PHONE_LOCAL.replace('-', '')}" data-number="{PHONE_LOCAL}">{PHONE_LOCAL}</a></li>
        <li><a class="js-call" href="tel:+1{PHONE_TOLL_FREE.replace('-', '')}" data-number="{PHONE_TOLL_FREE}">{PHONE_TOLL_FREE} toll-free</a></li>
        <li><a href="mailto:{EMAIL}">{EMAIL}</a></li>
      </ul>
      <ul class="social">
        <li><a href="https://www.facebook.com/accreditedlimo" rel="noopener" target="_blank">Facebook</a></li>
        <li><a href="https://www.instagram.com/accreditedlimousine" rel="noopener" target="_blank">Instagram</a></li>
        <li><a href="https://www.linkedin.com/company/accredited-limousine-service" rel="noopener" target="_blank">LinkedIn</a></li>
      </ul>
    </div>
  </div>
  <div class="site-footer__base">
    <p>&copy; <span class="js-year">{year}</span> Accredited Limousine Service, LLC</p>
    <ul class="legal">
      <li><a href="/concepts/accredited-limo/privacy-policy/">Privacy</a></li>
      <li><a href="/concepts/accredited-limo/terms-and-conditions/">Terms</a></li>
      <li><a href="/concepts/accredited-limo/cookie-policy/">Cookies</a></li>
      <li><a href="/concepts/accredited-limo/sms-terms-conditions/">SMS terms</a></li>
    </ul>
  </div>
</footer>

<nav class="action-bar" aria-label="Quick actions">
  <a class="action-bar__btn action-bar__btn--call js-call" href="tel:+1{PHONE_LOCAL.replace('-', '')}" data-number="{PHONE_LOCAL}">Call 24/7</a>
  <a class="action-bar__btn action-bar__btn--book js-book" href="{BOOK_URL}">Book a ride</a>
</nav>

<script src="/concepts/accredited-limo/js/main.js" defer></script>
</body>
</html>
'''

def copy_image(filename, dest_subdir=''):
    """Copy image from assets to destination, returns relative path"""
    dest_dir = BASE_DIR / 'img'
    if dest_subdir:
        dest_dir = dest_dir / dest_subdir
        dest_dir.mkdir(parents=True, exist_ok=True)
    
    # Try site images first
    src = ASSETS_SITE / filename
    if not src.exists():
        # Try drive images (AI-generated)
        src = ASSETS_DRIVE / filename
        if not src.exists():
            print(f"Warning: Image not found: {filename}")
            return f"img/{dest_subdir + '/' if dest_subdir else ''}{filename}"
    
    dest = dest_dir / filename
    if not dest.exists():
        shutil.copy2(src, dest)
    
    return f"img/{dest_subdir + '/' if dest_subdir else ''}{filename}"

print("Accredited Limo Site Builder initialized")
print(f"Content pages: {len(CONTENT.get('pages', []))}")
print(f"Blog posts: {len(CONTENT.get('posts', []))}")
print("Ready to build...")
