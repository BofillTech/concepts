#!/usr/bin/env python3
"""
Accredited Limo Page Builder - PHASE 1
Generates pages with reusable partials in the index.html visual system
"""
import json
import yaml
import re
from pathlib import Path
from datetime import datetime

# Paths
BASE_DIR = Path('/workspace/accredited-limo')
TOOLS_DIR = Path('/workspace/tools/accredited-limo')
CONTENT_FILE = Path('/home/ubuntu/.cursor/projects/workspace/uploads/extracted/content.json')

# Load content.json
with open(CONTENT_FILE, 'r') as f:
    CONTENT = json.load(f)

# Constants
PHONE = '914-725-9444'
PHONE_TF = '888-444-3108'
EMAIL = 'reservations@accreditedlimo.com'
BOOK_URL = 'https://book.mylimobiz.com/v4/als'
MAPS_URL = 'https://www.google.com/maps/place/Accredited+Limousine+Service/@41.049582,-73.6891018,17z'
CANONICAL_BASE = 'https://accreditedlimo.com'
PREVIEW_BASE = 'https://bofilltech.github.io/concepts/accredited-limo'

# FAQs and Reviews from content.json
FAQS_ALL = CONTENT.get('faqs', [])
REVIEWS_ALL = CONTENT.get('reviews', [])

def clean_text(txt):
    """Clean text from content.json"""
    if not txt:
        return ''
    txt = str(txt)
    txt = re.sub(r'^H\d+:\s*', '', txt)
    txt = txt.replace('\u2019', "'").replace('\u2018', "'")
    txt = txt.replace('\u201c', '"').replace('\u201d', '"')
    txt = txt.replace('\u2013', '-').replace('\u2014', ' - ')
    return txt.strip()

def get_page_data(path):
    """Get page content from content.json"""
    for page in CONTENT.get('pages', []):
        if page.get('path') == path:
            return page
    return None

# ============================================================
# REUSABLE PARTIALS
# ============================================================

def html_head(title, description, canonical_path, schemas=None):
    """Generate <head> with SEO meta and optional schemas"""
    schemas_html = ''
    if schemas:
        for schema in schemas:
            schemas_html += f'\n<script type="application/ld+json">\n{json.dumps(schema, indent=2)}\n</script>'
    
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{description}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="{CANONICAL_BASE}{canonical_path}">
<meta name="theme-color" content="#16191d">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Accredited Limousine Service">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:url" content="{PREVIEW_BASE}{canonical_path}">
<meta property="og:image" content="{PREVIEW_BASE}/img/hero-aviator-blue-hour.webp">
<meta property="og:image:alt" content="Accredited Limousine Service">
<meta name="twitter:card" content="summary_large_image">
<meta name="geo.region" content="US-NY">
<meta name="geo.placename" content="Rye Brook">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&amp;family=Libre+Caslon+Display&amp;display=swap">
<link rel="stylesheet" href="/concepts/accredited-limo/css/style.css">{schemas_html}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
'''

def site_header(current_path=''):
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
      <a class="header-phone js-call" href="tel:+1{PHONE.replace('-', '')}" data-number="{PHONE}">
        <span class="header-phone__label">24/7</span>
        <span class="header-phone__number">{PHONE}</span>
      </a>
      <a class="btn btn--primary btn--sm js-book" href="{BOOK_URL}">Book a ride</a>
    </div>
  </div>
</header>

<main id="main">
'''

def breadcrumb(items):
    """Generate visible breadcrumb + BreadcrumbList schema
    items: list of (name, path) tuples, last one is current page
    """
    # Visible breadcrumb
    links = []
    for i, (name, path) in enumerate(items):
        if i == len(items) - 1:
            links.append(f'<span>{name}</span>')
        else:
            links.append(f'<a href="/concepts/accredited-limo{path}">{name}</a>')
    
    visible = f'<nav class="breadcrumb" aria-label="Breadcrumb"><p>{" / ".join(links)}</p></nav>'
    
    # Schema
    schema_items = []
    for i, (name, path) in enumerate(items, 1):
        schema_items.append({
            "@type": "ListItem",
            "position": i,
            "name": name,
            "item": f"{CANONICAL_BASE}{path}"
        })
    
    schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": schema_items
    }
    
    return visible, schema

def trust_strip(items):
    """Generate trust/credential strip"""
    item_html = ''.join([f'<li class="trust__item">{item}</li>' for item in items])
    return f'''<section class="trust" aria-label="Why choose Accredited">
    <ul class="trust__list">
      {item_html}
    </ul>
  </section>'''

def testimonials_section(title, reviews_subset):
    """Generate testimonials section
    reviews_subset: list of review dicts with 'author' and 'text'
    """
    reviews_html = []
    for review in reviews_subset:
        author = review.get('author', 'Anonymous')
        text = clean_text(review.get('text', ''))
        reviews_html.append(f'''<figure class="review">
        <blockquote class="review__quote"><p>{text}</p></blockquote>
        <figcaption class="review__who">{author}</figcaption>
      </figure>''')
    
    return f'''<section class="reviews" aria-labelledby="reviews-title">
    <div class="reviews__head">
      <h2 class="section-title" id="reviews-title">{title}</h2>
      <p class="section-lede">What riders say on Google.</p>
      <a class="text-link" href="{MAPS_URL}" rel="noopener" target="_blank">Read our Google reviews (4.9 rating)</a>
    </div>
    <div class="reviews__grid">
      {''.join(reviews_html)}
    </div>
  </section>'''

def faq_section(title, faqs_subset):
    """Generate visible FAQ section + FAQPage schema
    faqs_subset: list of FAQ dicts with 'question' and 'answer'
    """
    faq_items_html = []
    schema_items = []
    
    for faq in faqs_subset:
        question = clean_text(faq.get('question', ''))
        answer = clean_text(faq.get('answer', ''))
        
        faq_items_html.append(f'''<div class="faq__item">
        <dt class="faq__question">{question}</dt>
        <dd class="faq__answer">{answer}</dd>
      </div>''')
        
        schema_items.append({
            "@type": "Question",
            "name": question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": answer
            }
        })
    
    visible = f'''<section class="faq" aria-labelledby="faq-title">
    <h2 class="section-title" id="faq-title">{title}</h2>
    <dl class="faq__list">
      {''.join(faq_items_html)}
    </dl>
  </section>'''
    
    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": schema_items
    }
    
    return visible, schema

def cta_band(heading, primary_cta, secondary_cta=None):
    """Generate final CTA band
    primary_cta: (text, url, class)
    secondary_cta: (text, url, class) or None
    """
    primary_html = f'<a class="btn {primary_cta[2]}" href="{primary_cta[1]}">{primary_cta[0]}</a>'
    secondary_html = f'<a class="btn {secondary_cta[2]}" href="{secondary_cta[1]}">{secondary_cta[0]}</a>' if secondary_cta else ''
    
    return f'''<section class="cta-band">
    <h2>{heading}</h2>
    <div class="cta-band__actions">
      {primary_html}
      {secondary_html}
    </div>
  </section>'''

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
        3 International Drive, Suite 140<br>Rye Brook, NY 10573<br>
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
        <li><a class="js-call" href="tel:+1{PHONE.replace('-', '')}" data-number="{PHONE}">{PHONE}</a></li>
        <li><a class="js-call" href="tel:+1{PHONE_TF.replace('-', '')}" data-number="{PHONE_TF}">{PHONE_TF} toll-free</a></li>
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
  <a class="action-bar__btn action-bar__btn--call js-call" href="tel:+1{PHONE.replace('-', '')}" data-number="{PHONE}">Call 24/7</a>
  <a class="action-bar__btn action-bar__btn--book js-book" href="{BOOK_URL}">Book a ride</a>
</nav>

<script src="/concepts/accredited-limo/js/main.js" defer></script>
</body>
</html>'''

# ============================================================
# PAGE BUILDERS
# ============================================================

def build_page_from_data(page_data_file):
    """Build a page from its YAML data file"""
    with open(TOOLS_DIR / 'pages' / page_data_file, 'r') as f:
        data = yaml.safe_load(f)
    
    # Build schemas list
    schemas = []
    
    # Add breadcrumb if specified
    breadcrumb_html = ''
    if 'breadcrumb' in data:
        breadcrumb_html, bc_schema = breadcrumb(data['breadcrumb'])
        schemas.append(bc_schema)
    
    # Add FAQ schema if FAQ section exists
    if 'faq' in data:
        faq_html, faq_schema = faq_section(data['faq']['title'], data['faq']['items'])
        schemas.append(faq_schema)
    
    # Build HTML
    html = html_head(data['title'], data['description'], data['path'], schemas)
    html += site_header(data['path'])
    
    if breadcrumb_html:
        html += '\n  ' + breadcrumb_html
    
    # Add sections from data
    html += '\n  ' + data.get('body_html', '<p>Content loading...</p>')
    
    html += '\n' + site_footer()
    
    # Write file
    path_parts = [p for p in data['path'].strip('/').split('/') if p]
    dest_dir = BASE_DIR
    for part in path_parts:
        dest_dir = dest_dir / part
    dest_dir.mkdir(parents=True, exist_ok=True)
    
    (dest_dir / 'index.html').write_text(html)
    print(f"✓ Built {data['path']}")

# ============================================================
# MAIN
# ============================================================

if __name__ == '__main__':
    print("Accredited Limo Page Builder - PHASE 1")
    print("=" * 60)
    print("Partials system initialized")
    print(f"Content loaded: {len(CONTENT.get('pages', []))} pages, {len(FAQS_ALL)} FAQs, {len(REVIEWS_ALL)} reviews")
    print("\nReady to build pages from data files in tools/accredited-limo/pages/")
