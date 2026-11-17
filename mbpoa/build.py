#!/usr/bin/env python3
"""MBPOA site generator.
Reads data/events.json and writes every HTML page + js/events-data.js.
Run:  python3 build.py        (from the mbpoa/ folder)
Updating the site = edit data/events.json or the copy below, run this, push.
"""
import html, json, os, re
from datetime import date

ROOT = os.path.dirname(os.path.abspath(__file__))
TODAY = date.fromisoformat(os.environ.get("MBPOA_TODAY", date.today().isoformat()))

# ---- Shopify links (all purchases live at shop.mbpoa.com) -----------------------
SHOP_URL = "https://shop.mbpoa.com/"
MERCH_URL = SHOP_URL
DONATE_URL = SHOP_URL  # TODO: point at the Shopify donation product once it is created
SITE = "https://bofilltech.github.io/concepts/mbpoa/"
EMAIL = "MBPOAINC@gmail.com"
IG = "https://www.instagram.com/mbpoa.montauk/"
LOGO = "https://mbpoa.com/wp-content/uploads/MBPOA-2-01.png"
OCEAN = "https://mbpoa.com/wp-content/uploads/shutterstock_728974066-scaled.jpg"
HISTORY_PHOTO = "https://mbpoa.com/wp-content/uploads/shutterstock_652348687-scaled.jpg"
MIRROR1 = "https://mbpoa.com/wp-content/uploads/2020/12/525_Montauk_property_offer_2-241x300.jpg"
MIRROR2 = "https://mbpoa.com/wp-content/uploads/2020/12/525_Montauk_property_offer_1-228x300.jpg"
RULES_PDF = "https://mbpoa.com/wp-content/uploads/MBPOA-Beach-Rules-6.11.2025.pdf"
QR = open(os.path.join(ROOT, "_src", "qr_datauri.txt")).read().strip()
GMAP = "https://www." + open(os.path.join(ROOT, "_src", "gmap_embed.txt")).read().strip()

NAV = [
    ("index.html", "Home", ""),
    ("welcome.html", "Welcome", "Letter from your Board"),
    ("mission-history.html", "Mission &amp; History", "What we do · Since 1942"),
    ("beach-rules.html", "Beach Rules &amp; Party Guidelines", ""),
    ("resources.html", "Resources", ""),
    ("galleries.html", "Events &amp; Galleries", "Upcoming events and every album"),
    ("contact.html", "Contact", ""),
]

data = json.load(open(os.path.join(ROOT, "data", "events.json")))
UP = data["upcoming"]
ARCH = data["archive"]
esc = html.escape


def fmt_date(ev):
    a = date.fromisoformat(ev["start"]); b = date.fromisoformat(ev.get("end") or ev["start"])
    if a == b:
        return a.strftime("%A, %B ") + str(a.day)
    if a.month == b.month:
        return f"{a.strftime('%B')} {a.day}–{b.day}"
    return f"{a.strftime('%b')} {a.day} – {b.strftime('%b')} {b.day}"


def fmt_full(ev):
    a = date.fromisoformat(ev["start"])
    return a.strftime("%A, %B ") + f"{a.day}, {a.year}"


# ---------------------------------------------------------------- shell ---------
def head(title, desc, page, *, leaflet=False, extra=""):
    lf = ('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css">\n'
          if leaflet else "")
    return f"""<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="theme-color" content="#14324A">
<link rel="canonical" href="{SITE}{page}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:image" content="{OCEAN}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Besley:wght@600;700&amp;family=Public+Sans:wght@400;600;700&amp;display=swap">
{lf}<link rel="stylesheet" href="css/style.css">
{extra}</head>
<body>
<a class="skip" href="#main">Skip to main content</a>
"""


def header(current):
    items = []
    for href, label, sub in NAV:
        cur = ' aria-current="page"' if href == current else ""
        s = f"<small>{sub}</small>" if sub else ""
        items.append(f'<li><a href="{href}"{cur}>{label}{s}</a></li>')
    nav = "\n      ".join(items)
    return f"""<header class="site-head">
  <div class="wrap site-head__inner">
    <a class="brand" href="index.html" aria-label="MBPOA home">
      <img src="{LOGO}" alt="MBPOA logo" width="102" height="46">
      <span class="brand__name">Montauk Beach Property Owners Association</span>
    </a>
    <div class="head-actions">
      <a class="btn btn--solid" href="{DONATE_URL}" aria-label="Make a Donation (opens the MBPOA shop)"><span class="hide-sm">Make a Donation</span><span class="show-sm">Donate</span></a>
      <a class="btn btn--ink" href="{MERCH_URL}">Merch</a>
      <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="drawer">
        <span class="menu-btn__bars" aria-hidden="true"><span></span><span></span><span></span></span>
        <span class="menu-btn__label">Menu</span>
      </button>
    </div>
  </div>
</header>

<nav class="drawer" id="drawer" aria-label="Main menu">
  <div class="wrap">
    <div class="drawer__top">
      <span class="drawer__title">MBPOA</span>
      <button class="menu-btn" id="menuClose" type="button"><span aria-hidden="true">✕</span> Close</button>
    </div>
    <ul>
      {nav}
    </ul>
    <div class="drawer__foot">
      <span>Beach emergencies: <a href="tel:631-537-7575">631-537-7575</a></span>
      <span>MBPOA Inc. · PO Box 792, Montauk, NY 11954</span>
    </div>
  </div>
</nav>

"""


def footer(leaflet=False):
    lj = '<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"></script>\n' if leaflet else ""
    return f"""
<footer class="site-foot" aria-label="Site footer">
  <div class="wrap">
    <div class="foot">
      <div class="foot__brand">
        <img src="{LOGO}" alt="MBPOA logo" width="118" height="54" loading="lazy">
        <p>Montauk Beach Property Owners Association — a 501(c)(7) social organization and steward of the Ocean View Beach since 1942.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="mission-history.html">Mission &amp; History</a></li>
          <li><a href="galleries.html">Events &amp; Galleries</a></li>
          <li><a href="beach-rules.html">Beach Rules &amp; Party Guidelines</a></li>
          <li><a href="resources.html">Resources</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Support &amp; follow</h4>
        <ul>
          <li><a href="{DONATE_URL}">Make a Donation</a></li>
          <li><a href="{MERCH_URL}">Merch</a></li>
          <li><a href="{IG}">Instagram — @mbpoa.montauk</a></li>
          <li>Beach emergencies: <a href="tel:631-537-7575">631-537-7575</a></li>
        </ul>
      </div>
    </div>
    <div class="foot__bottom">
      <p>© <span id="year">2026</span> Montauk Beach Property Owners Association. All rights reserved.</p>
      <p>Website design by <a href="https://www.bofilltech.com/">Bofill Tech</a></p>
    </div>
  </div>
</footer>
{lj}<script src="js/events-data.js"></script>
<script src="js/site.js"></script>
</body>
</html>
"""


def page_head(h1, lede, crumb_label=None):
    crumb = (f'<nav class="crumb" aria-label="Breadcrumb"><a href="index.html">Home</a> / {crumb_label}</nav>'
             if crumb_label else "")
    return f"""<div class="page-head">
  <div class="wrap">
    {crumb}
    <h1>{h1}</h1>
    <p>{lede}</p>
  </div>
</div>
"""


def write(name, content):
    with open(os.path.join(ROOT, name), "w", encoding="utf-8") as f:
        f.write(content)


# ------------------------------------------------------------ event cards -------
def static_cards():
    live = [e for e in UP if (e.get("end") or e["start"]) >= TODAY.isoformat()]
    live.sort(key=lambda e: e["start"])
    out = []
    for e in live[:4]:
        img = (f'<img src="{esc(e["image"])}" alt="" width="400" height="224" loading="lazy" data-plate>'
               if e.get("image") else "")
        samp = '<span class="badge badge--sample">Sample event</span>' if e.get("sample") else ""
        meta = (e.get("time", "") + " · " if e.get("time") else "") + e.get("place", "")
        out.append(f"""<article class="ecard ecard--{e['type']}">
          <div class="ecard__img">{img}</div>
          <div class="ecard__body">
            <span class="ecard__date">{fmt_date(e)}</span>
            <h3><a href="event-{e['slug']}.html">{esc(e['title'])}</a></h3>
            <p class="ecard__meta">{esc(meta)}</p>
            {samp}
            <span class="ecard__cta">Details &amp; gallery →</span>
          </div>
        </article>""")
    return "\n        ".join(out)


# ---------------------------------------------------------------- HOME ----------
def build_home():
    ld = json.dumps({
        "@context": "https://schema.org", "@type": "Organization",
        "name": "Montauk Beach Property Owners Association", "alternateName": "MBPOA",
        "url": "https://mbpoa.com/", "logo": LOGO, "foundingDate": "1942-06-17",
        "email": EMAIL,
        "address": {"@type": "PostalAddress", "streetAddress": "PO Box 792", "addressLocality": "Montauk",
                    "addressRegion": "NY", "postalCode": "11954", "addressCountry": "US"},
        "sameAs": [SHOP_URL, IG]}, indent=2)
    extra = f'<script type="application/ld+json">\n{ld}\n</script>\n'
    h = head("Montauk Beach Property Owners Association — MBPOA",
             "MBPOA has been the steward of 30+ acres of deeded Montauk oceanfront since 1942. Events, beach rules, resources and more.",
             "index.html", leaflet=True, extra=extra)
    h += header("index.html")
    h += f"""<main id="main">

  <!-- HERO: ocean photo is the background; copy sits in a solid panel -->
  <section class="hero" aria-label="Welcome">
    <img class="hero__bg" src="{OCEAN}" alt="The ocean beach below the bluffs at Hither Hills, Montauk" width="2560" height="1707" fetchpriority="high">
    <div class="wrap hero__inner">
      <div class="hero__panel">
        <span class="eyebrow"><span class="m-glyph" aria-hidden="true">M</span>Hither Hills · Montauk · Est. 1942</span>
        <h1>It cannot be bought, sold, or <em>given away.</em></h1>
        <p>For 84 years our association has been the sole steward of 30+ acres of oceanfront. Our beach, as deeded, is for all to enjoy all the time.</p>
      </div>
      <div class="hotspots">
        <a class="hot hot--events" href="#events"><span class="hot__label">Events</span><small>What’s coming up</small><span class="hot__arrow" aria-hidden="true">↓</span></a>
        <a class="hot hot--merch" href="{MERCH_URL}"><span class="hot__label">Merch</span><small>MBPOA shop</small><span class="hot__arrow" aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>

  <!-- EVENTS: the next 4 active events; each drops off at midnight after it ends -->
  <section class="events" id="events" aria-labelledby="events-h">
    <div class="wrap">
      <div class="sec__head">
        <h2 id="events-h">Upcoming events</h2>
        <a class="btn btn--ghost" href="galleries.html">All events &amp; galleries</a>
      </div>
      <div class="event-grid" id="eventGrid" aria-live="polite">
        {static_cards()}
      </div>
    </div>
  </section>

  <!-- MISSION & HISTORY teaser -->
  <section class="sec sec--mist" aria-labelledby="mh-h">
    <div class="wrap teaser">
      <div>
        <span class="eyebrow"><span class="m-glyph" aria-hidden="true">M</span>Mission &amp; history</span>
        <h2 id="mh-h">A safe, enjoyable beach — held in trust since 1942.</h2>
        <p>Our mission is to afford a safe and enjoyable beach experience for all, to preserve and protect the environment we love, and to bring members together. The association took title to the Ocean View Beach on July 15, 1942, and our dues have kept it ours ever since.</p>
        <blockquote class="pull">We are the only homeowners in Montauk with access to our own privately deeded ocean beach — right down the street.</blockquote>
        <a class="btn btn--solid" href="mission-history.html">Read More</a>
      </div>
      <div class="teaser__art">
        <figure>
          <div class="art-plate"><img src="{HISTORY_PHOTO}" alt="The MBPOA oceanfront bluffs at Hither Hills" width="640" height="480" loading="lazy" data-plate></div>
          <figcaption>The Ocean View Beach, Old Montauk Highway.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <!-- BEACH RULES teaser -->
  <section class="sec" aria-labelledby="rules-h">
    <div class="wrap teaser teaser--flip">
      <div>
        <span class="eyebrow"><span class="m-glyph" aria-hidden="true">M</span>Members &amp; guests</span>
        <h2 id="rules-h">Beach rules &amp; party guidelines.</h2>
        <p>Leave no trace. No animals on the beach 10 AM–6 PM, May 15–September 15. Fires in a metal container, out by midnight. Parking lots need a valid, visible MBPOA permit. Planning a party? Read the permit and insurance rules first.</p>
        <a class="btn btn--solid" href="beach-rules.html">Read More</a>
      </div>
      <div class="teaser__art">
        <ul class="facts">
          <li><strong>Dogs</strong>Not on the beach 10 AM–6 PM, May 15–Sep 15</li>
          <li><strong>Fires</strong>Metal container, out by midnight</li>
          <li><strong>Parking</strong>Valid, visible MBPOA permit only</li>
          <li><strong>Parties</strong>Town permit at 20+ guests</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- ORANGE M -->
  <section class="safety" aria-label="Beach emergencies">
    <div class="wrap safety__in">
      <div class="safety__m" aria-hidden="true">M</div>
      <div>
        <h2>Look for the Orange M.</h2>
        <p>Orange M Beach Location Signs stand at the top and bottom of all beach paths and parking lots. Use the sign nearest you to relay your location to Public Safety.</p>
      </div>
      <div class="safety__call">
        <span class="safety__num">631-537-7575</span>
        <a class="btn btn--white" href="tel:631-537-7575">Call for beach emergencies</a>
      </div>
    </div>
  </section>

  <!-- MAP -->
  <section class="sec" aria-labelledby="map-h">
    <div class="wrap">
      <div class="sec__head">
        <div>
          <span class="eyebrow"><span class="m-glyph" aria-hidden="true">M</span>One mile of oceanfront</span>
          <h2 id="map-h">Know your beach — every entrance, lot, and project.</h2>
        </div>
      </div>
      <p class="coast__intro">Nine numbered beach entrances (the Orange M signs), four member parking lots, and the SUNY marine erosion study sites. Tap any marker for details.</p>
      <div class="coast__map" id="coastMap" role="region" aria-label="Interactive map of the MBPOA coastline">
        <div class="coast__fallback" id="coastFallback">
          <h3>The coastline at a glance</h3>
          <ul>
            <li><strong>1M – 9M</strong> — nine numbered beach entrances with Orange M location signs</li>
            <li><strong>P1 – P4</strong> — four MBPOA member parking lots</li>
            <li><strong>S1 – S2</strong> — SUNY marine erosion study sites along the bluffs</li>
          </ul>
        </div>
      </div>
      <div class="coast__legend" aria-hidden="true">
        <span><span class="pin pin--m">M</span> Beach entrance</span>
        <span><span class="pin pin--p">P</span> Member parking lot</span>
        <span><span class="pin pin--s">S</span> SUNY erosion study site</span>
      </div>
      <p class="coast__note">Draft map — marker positions and numbering are approximate until the Communications committee confirms the sign inventory.</p>
    </div>
  </section>

  <!-- WELCOME + RESOURCES teasers -->
  <section class="sec sec--mist" aria-label="Welcome and resources">
    <div class="wrap twin">
      <div class="tcard">
        <span class="eyebrow"><span class="m-glyph" aria-hidden="true">M</span>Welcome</span>
        <h2>Letter from your Board</h2>
        <p>The MBPOA is an assembly of approximately 500 property owners along Old Montauk Highway in Hither Hills. This year we are fortifying the beach with sand fences and beach grass to protect our bluffs.</p>
        <a class="btn btn--ghost" href="welcome.html">Read More</a>
      </div>
      <div class="tcard">
        <span class="eyebrow"><span class="m-glyph" aria-hidden="true">M</span>Resources</span>
        <h2>Montauk information you need</h2>
        <p>Town code on beach fires, noise and rentals, emergency alert sign-up, local organizations and helpful hints — gathered in one place.</p>
        <a class="btn btn--ghost" href="resources.html">Read More</a>
      </div>
    </div>
  </section>

  <!-- INSTAGRAM -->
  <section class="sec" aria-labelledby="ig-h">
    <div class="wrap insta">
      <div class="insta__panel">
        <span class="eyebrow"><span class="m-glyph" aria-hidden="true">M</span>@mbpoa.montauk</span>
        <h2 id="ig-h">Follow the beach, all year long.</h2>
        <p>Clean-ups, sunrises, socials and storm reports. Scan the code with your phone camera to follow us on Instagram.</p>
        <div class="insta__qr">
          <img src="{QR}" alt="QR code linking to the MBPOA Instagram page" width="128" height="128">
          <p>Point your phone camera here.</p>
        </div>
        <a class="btn btn--white" href="{IG}">Follow on Instagram</a>
      </div>
      <div class="insta__feed" aria-label="Latest Instagram posts">
        <!-- IG-FEED-HOOK: replace with a live feed embed (Behold / LightWidget / Smash Balloon) at launch -->
        {''.join('<div class="insta__tile"><span class="m-glyph" aria-hidden="true">M</span></div>' for _ in range(6))}
        <p class="insta__note">The six most recent @mbpoa.montauk posts appear here automatically at launch.</p>
      </div>
    </div>
  </section>

  <!-- SUPPORT: buttons only — purchases happen in Shopify -->
  <section class="support" aria-label="Support the association">
    <div class="wrap support__in">
      <div>
        <h2>Help protect our beach and bluffs.</h2>
        <p>Donations go to taxes, insurance, maintenance and advocacy. Merch supports the beach too.</p>
      </div>
      <div class="support__btns">
        <a class="btn btn--solid" href="{DONATE_URL}">Make a Donation</a>
        <a class="btn btn--white" href="{MERCH_URL}">Merch</a>
      </div>
    </div>
  </section>

</main>
"""
    h += footer(leaflet=True)
    write("index.html", h)


# ---------------------------------------------------------- INNER PAGES ---------
def aside_default():
    return f"""<aside class="aside" aria-label="Quick links">
        <div class="box box--ink">
          <h3>Beach emergencies</h3>
          <p>Call <a href="tel:631-537-7575"><strong>631-537-7575</strong></a>. Use the Orange M sign nearest you to relay your location.</p>
        </div>
        <div class="box">
          <h3>Support the beach</h3>
          <ul>
            <li><a href="{DONATE_URL}">Make a Donation</a></li>
            <li><a href="{MERCH_URL}">Merch</a></li>
          </ul>
        </div>
        <div class="box">
          <h3>Questions?</h3>
          <p><a href="contact.html">Contact the association</a></p>
        </div>
      </aside>"""


def inner(name, title, desc, h1, lede, body, current, crumb=None):
    s = head(f"{title} — MBPOA", desc, name)
    s += header(current)
    s += f'<main id="main">\n{page_head(h1, lede, crumb or h1)}'
    s += f'<div class="wrap page-grid">\n      <div class="prose">\n{body}\n      </div>\n      {aside_default()}\n</div>\n</main>\n'
    s += footer()
    write(name, s)


def build_welcome():
    body = """<p><strong>Dear MBPOA Members and Families:</strong></p>
        <p>Welcome to the 2026 Summer Season!</p>
        <p>We look forward to enjoying the natural beauty, good weather, and beautiful ocean beaches in Montauk! Let’s hope the whales return this summer!</p>
        <p>The Montauk Beach Property Owners Association is an assembly of approximately 500 property owners along the Old Montauk Highway in Hither Hills. Hopefully, you agree that our part of Montauk in Hither Hills, with our oceanfront cliffs, is an extraordinary place.</p>
        <p>The MBPOA’s purposes are to 1) steward and maintain, as needed, the land owned by the Association for the benefit of the members. 2) encourage the social and civic engagement of the members and foster a sense of community through annual activities.</p>
        <p>This year we are making a concerted effort to help fortify our beach by placing sand fences and planting beach grass to protect our precious bluffs.</p>
        <p>Please avail yourself of the treasure of Montauk information &amp; resources and MBPOA history on this website.</p>
        <p>Thank you.</p>
        <p><strong>MBPOA Board of Directors</strong></p>
        <p><a class="btn btn--ghost" href="mission-history.html">Our mission &amp; history</a></p>"""
    inner("welcome.html", "Welcome — Letter from Your Board",
          "A welcome letter to MBPOA members and families from the Board of Directors.",
          "Letter from Your Board", "A welcome to MBPOA members and families.", body, "welcome.html", "Welcome")


def build_mission():
    body = f"""<h2 id="mission">Mission</h2>
        <ul>
          <li>Afford a safe and enjoyable beach experience for all.</li>
          <li>Preserve and protect the environment that we all love. Promote the preservation and availability of natural resources for the benefit of members.</li>
          <li>Encourage our members’ social and civic interaction through, when possible, a summer beach party and a members’ cocktail party, along with communications to members of activities and civic concerns.</li>
        </ul>
        <h2>What we do</h2>
        <div class="workgrid">
          <div class="box"><h3>Maintenance</h3><ul>
            <li>Regular preventive maintenance of pathways and steps leading to the beach and ongoing repairs when needed.</li>
            <li>Maintain parking lot locks, provide keys to members, and replace chains as needed.</li>
            <li>Provide, update, and maintain MBPOA signage.</li></ul></div>
          <div class="box"><h3>Social events</h3><ul>
            <li>Organize beach and property cleanups. Board Directors participate, and volunteers from the member base are requested to volunteer.</li>
            <li>Organize social events for MBPOA Members and their guests.</li></ul></div>
          <div class="box"><h3>Legal</h3><ul>
            <li>Retain when needed representation to protect the property rights of the MBPOA-owned property.</li></ul></div>
          <div class="box"><h3>Local government &amp; civic organizations</h3><ul>
            <li>Engage with our local government to understand laws and possible developments impacting the property rights of our Association.</li></ul></div>
        </div>
        <h2 id="history">History</h2>
        <ul class="facts">
          <li><strong>July 15, 1942</strong>Title taken to the “Ocean View Beach”</li>
          <li><strong>June 17, 1942</strong>MBPOA incorporated</li>
          <li><strong>500+</strong>Paid member home and property owners</li>
        </ul>
        <p>Montauk Beach Property Owner’s Association took title to what was then known as the “Ocean View Beach” on July 15, 1942 and were incorporated on June 17, 1942. The original plan for our area of Montauk — as envisioned by developer Carl Fisher — was for an 18-hole golf course. Due to the great depression, his plans to make Montauk the “Miami Beach of the North” crumbled. Montauk Beach Development Corporation were the next owners of the property in 1926. The Mirror Holding Corporation who sold 100′ x 25′ lots for $100 each, subsequently owned the area. The Mirror Holding Corporation eventually became The Montauk Improvement Company, which today is the Tuma Agency.</p>
        <p>When MBPOA took title to the Ocean View Beach it also took title to the building below the Montauk Manor known as the Playhouse. Yes, at one time our association owned the Playhouse. When the MBPOA was unable to maintain the building due to the cost of upkeep and taxes, it reverted back to the original deed holder.</p>
        <p>The history of our beachfront property also shows that the MBPOA almost gave the property to the Town of East Hampton. Again, the problem was the lack of money for upkeep. However, just prior to the transfer of the property to the town, the deal was cancelled. Our dues allow us to maintain the property and advocate for our homeowners.</p>
        <p>Because of our unique beachfront rights, MBPOA members should be aware that the value of their homes / property could be higher than that of a similar house in almost any other area in Montauk. We are the only homeowners in Montauk who have access to our own privately deeded ocean beach right down the street. MBPOA pays taxes, insurance, and other costs to maintain the property. Our organization is also known for our active civic participation in the Montauk community. MBPOA is always alert to the environmental and other concerns that affect our area and the value of your property.</p>
        <p>At this time, our paid membership encompasses over 500 home / property owners. MBPOA is the largest active civic association in Montauk.</p>
        <p>We would like to thank all of you for the outstanding support you have given this association throughout the years. For new members, we would like to welcome you to the MBPOA and encourage your active participation in our association. With your involvement, the MBPOA and our ocean beach will be a source of pleasure and pride for many generations to come.</p>
        <h3>Early Montauk Beach property offers</h3>
        <p>One of the members shared this “artifact”, an offer from “The Daily Mirror” to purchase property for as little as $100 a lot. Bring back “The Daily Mirror” offer please.</p>
        <p><img src="{MIRROR1}" alt="A Daily Mirror offer to purchase Montauk property for as little as $100 a lot" width="241" height="300" loading="lazy" data-plate> </p>
        <p><img src="{MIRROR2}" alt="An early Montauk Beach property offer advertisement" width="228" height="300" loading="lazy" data-plate></p>"""
    inner("mission-history.html", "Mission & History",
          "The MBPOA mission, what the association does, and its history since 1942.",
          "Mission &amp; History", "What we do, and how a beach came to be held in trust since 1942.", body,
          "mission-history.html", "Mission &amp; History")


def build_rules():
    body = f"""<h2>Beach rules</h2>
        <ol class="rules">
          <li><strong>Trash.</strong> Take all your items and trash back home with you (“Leave No Trace”).</li>
          <li><strong>Dogs and animals.</strong> Animals are not allowed on the beach from 10 AM to 6 PM, May 15 to September 15. Bag dog waste and put it only in the designated parking lot receptacles.</li>
          <li><strong>Fires.</strong> Keep fires in a metal container at least 50 feet from beach grass, vegetation, and staircases. Put them out by midnight and fully extinguish them with water. The Town of East Hampton’s Beach Fire Regulations apply.</li>
          <li><strong>Cliffs and beach grass.</strong> Do not climb or play on the cliffs or the rocks at their base, and do not harm or damage them. Keep beach blankets, chairs, umbrellas, equipment, and structures off the beach grass and away from the cliff base. Do not drive or park vehicles within 10 feet of the grass or cliffs. Members are planting grass near the bluffs, and donations support this work.</li>
          <li><strong>Parking lots.</strong> Only cars with a valid, visible MBPOA permit may park there. Secure the chain lock when entering or leaving. Overnight parking is prohibited year-round. Commercial vehicles are never allowed.</li>
          <li><strong>Enforcement.</strong> Breaking these rules may prevent a property owner’s membership from being renewed. Members must share these rules with anyone using their MBPOA property.</li>
        </ol>
        <h2>Parties and gatherings</h2>
        <ul>
          <li><strong>Jurisdiction.</strong> MBPOA owns the beach above the Mean High-Water (debris) line.</li>
          <li><strong>Permits.</strong> A <a href="https://ehamptonny.gov/641/Special-Event-Applications">Town of East Hampton Special Events permit</a> is required if any of these apply: 20 or more guests, catered service (including drop-offs to the beach or parking lots), or structures on the beach or parking lots (including chairs and wedding arches or chuppahs). MBPOA also requires its own authorization if any of these apply. Events held in the parking lots always need MBPOA authorization.</li>
          <li><strong>Guest limits.</strong> A catered beach event or wedding ceremony on the beach is capped at 50 attendees.</li>
          <li><strong>Insurance.</strong> Member hosts and their renters need Special Event Insurance of at least $2,000,000 per occurrence, naming MBPOA as an additional insured and including Host Liquor Liability. This applies whether or not alcohol is served. Certificates are due two weeks before the event.</li>
          <li><strong>Music.</strong> Amplified music is not allowed.</li>
          <li><strong>Vehicles.</strong> Commercial vehicles are never allowed in the parking lots.</li>
          <li><strong>Responsibility.</strong> The responsible member pays for any damage to MBPOA property and for cleanup.</li>
          <li><strong>Enforcement.</strong> Violations may prevent membership renewal.</li>
        </ul>
        <h2>Reserving your party</h2>
        <p>Members in good standing need MBPOA authorization before the event. Email <a href="mailto:{EMAIL}?subject=Beach%20Party%20Authorization%20Request">{EMAIL}</a> with the event date, the location, whether the event is for renters, and your insurance documents attached. Please confirm that you have read the Beach Rules. We will reply by email.</p>
        <p><a class="btn btn--solid" href="mailto:{EMAIL}?subject=Beach%20Party%20Authorization%20Request">Email an authorization request</a>
           <a class="btn btn--ghost" href="{RULES_PDF}">Download the rules (PDF)</a></p>
        <p><a href="https://t.co/XxTmOJ2yzJ?amp=1">Town of East Hampton Beach Fire Regulations</a></p>"""
    inner("beach-rules.html", "Beach Rules & Party Guidelines",
          "MBPOA beach rules for members and guests, plus permit and insurance guidelines for parties and gatherings.",
          "Beach Rules &amp; Party Guidelines", "For members and their guests. Please share these rules with anyone using your MBPOA property.",
          body, "beach-rules.html", "Beach Rules &amp; Party Guidelines")


RES = [
    ("Community resources", [
        ("Register to vote in Montauk", "https://www.ny.gov/services/register-vote", "Encourages homeowners to register to vote in Montauk, where each vote carries more weight than in larger towns. Registration needs to be completed 30 days before an election."),
        ("Local government contact", "https://www.ehamptonny.gov", "The East Hampton Town website, with information on departments, finances, permits, town code, and archived Town Board meetings and work sessions.")]),
    ("Need to know", [
        ("Beach fires", "https://www.ecode360.com/9230199", "Town code for beach fires. Unattended fires and fires left burning overnight are prohibited. The code also covers fire size, distance from cliffs, use of a metal fire pit, permitted materials, and keeping a water bucket nearby."),
        ("Excessive noise", "https://ehamptonny.gov", "Explains the 7:00 PM limit on excessive noise under Chapter 185 of the town code. Contact the homeowner or guests first, then call the Montauk Police Precinct if the problem continues. Please allow reasonable everyday noise."),
        ("Dog restrictions", "", "From May 15 to September 15, dogs are not allowed on beaches from 10 AM to 6 PM (Town Code chapter 91, Section 4L). The restrictions lift in the off-season. Owners must keep dogs under control and take waste bags with them, not leaving them on the beach or at path tops."),
        ("House numbers must be visible from the road", "https://ecode360.com/EA0658?needHash=true", "Town law requires 4-inch address numbers that are visible from the road, to support emergency response.")]),
    ("East Hampton alerts", [
        ("Emergency alert sign-up", "https://public.alertsense.com/SignUp/publicUser.aspx?RegionId=1922", "Receive emergency and severe weather alerts by text, email, pager, or voice mail. Not meant for routine information."),
        ("Special needs emergency contact list", "https://ehamptonny.gov/839/Special-Needs-Emergency-Contact-List", "For people who need extra help during an evacuation to submit contact details to the Human Services Department.")]),
    ("Community organizations", [
        ("Concerned Citizens of Montauk", "https://www.preservemontauk.org/", "Active since 1970, working to protect Montauk’s environment and character through education, advocacy, and citizen action."),
        ("Montauk Library", "https://montauklibrary.org/", "Books, technology, and cultural and educational programs for the community."),
        ("Grouper laws (rental occupancy)", "https://ecode360.com/10416302#10416302", "No more than four unrelated people may rent a house, and no more than four cars may be parked there. Also covers single-family zoning and rental frequency and duration limits under Chapter 195. Report violations to East Hampton Code Enforcement at (631) 354-3858."),
        ("Ordinance issues complaint form", "http://ehamptonny.gov/formcenter/ordinance-enforcement-4/online-complaint-form-43", "An online form on the town website for reporting ordinance violations."),
        ("Montauk Chamber of Commerce", "https://montaukchamber.com", "A visitor’s guide to Montauk’s hotels, restaurants, and activities.")]),
    ("Helpful hints", [
        ("Ticks", "http://www.eastendtickresource.org", "Guidance on protecting yourself from ticks, removing a bite, and saving the tick for identification. Not a medical source — consult a doctor when needed.")]),
]


def build_resources():
    parts = []
    for sect, items in RES:
        lis = []
        for t, u, d in items:
            link = f'<a href="{u}">{t}</a>' if u else t
            lis.append(f"<li><strong>{link}</strong><br>{d}</li>")
        parts.append(f"<h2>{sect}</h2>\n<ul>\n" + "\n".join(lis) + "\n</ul>")
    parts.append("""<h2>Assistance or emergency help</h2>
        <ul>
          <li>Montauk Police Precinct: <a href="tel:631-668-3707">(631) 668-3707</a></li>
          <li>East Hampton Police Precinct: <a href="tel:631-324-3018">(631) 324-3018</a></li>
          <li>East Hampton Marine Patrol: <a href="tel:631-537-7575">(631) 537-7575</a></li>
        </ul>
        <p>These numbers are also used to report fights, prohibited animals on the beach, and illegal fires.</p>
        <h2>Being a good neighbor</h2>
        <p>Our community is residential, not commercial, and residents and renters should be able to enjoy peaceful surroundings. Renters should tell their guests the rules, ideally in a posted page of rules, and share their contact information with neighbors. Please be considerate of neighbors and follow the code of neighborliness.</p>""")
    inner("resources.html", "Resources",
          "Montauk community resources: town code, emergency alerts, local organizations and helpful hints for MBPOA members.",
          "Resources", "Town information, emergency alerts, local organizations and helpful hints.", "\n".join(parts),
          "resources.html", "Resources")


def build_contact():
    body = f"""<div class="contact-grid">
          <div class="box"><h3>Officers</h3><ul class="roles">
            <li><span>Bruce Curtis</span><span class="role">President</span></li>
            <li><span>Brian Harris</span><span class="role">Vice-President</span></li>
            <li><span>Nick Walsh</span><span class="role">Secretary</span></li>
            <li><span>Steve Byrne</span><span class="role">Treasurer</span></li></ul></div>
          <div class="box"><h3>Committee chairs</h3><ul class="roles">
            <li><span>Christopher Yula</span><span class="role">Communications</span></li>
            <li><span>Andy Ring</span><span class="role">Maintenance</span></li>
            <li><span>Anne Eipper</span><span class="role">Social</span></li></ul></div>
          <div class="box"><h3>Mail &amp; email</h3>
            <p>MBPOA Inc.<br>PO Box 792<br>Montauk, NY 11954</p>
            <p><a class="btn btn--solid" href="mailto:{EMAIL}">Email {EMAIL}</a></p>
            <p>Merch, donations or any other question — email us and we will reply.</p></div>
          <div class="box"><h3>Useful local numbers</h3><ul>
            <li>Marine Patrol (beach emergencies) — <a href="tel:631-537-7575">631-537-7575</a></li>
            <li>Montauk Police Department — <a href="tel:631-668-3707">631-668-3707</a></li>
            <li>David Lys, EH Town Board / Montauk Liaison — <a href="tel:631-324-3187">631-324-3187</a></li>
            <li>Animal Control — <a href="tel:631-324-0085">631-324-0085</a></li></ul></div>
        </div>
        <div class="visit__map"><iframe src="{GMAP}" loading="lazy" title="Map of Montauk, New York" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>"""
    s = head("Contact — MBPOA", "Contact the Montauk Beach Property Owners Association: officers, committee chairs, mailing address, email and local emergency numbers.", "contact.html")
    s += header("contact.html")
    s += f'<main id="main">\n{page_head("Contact", "Montauk Beach Property Owners Association, Montauk, New York.", "Contact")}'
    s += f'<div class="wrap sec">\n{body}\n</div>\n</main>\n'
    s += footer()
    write("contact.html", s)


# ---------------------------------------------------- GALLERIES / EVENTS ---------
def build_galleries():
    # Coming up (live-filtered by JS as well; static copy as fallback)
    s = head("Events & Galleries — MBPOA",
             "Upcoming MBPOA events and every photo album — socials, clean-ups, beach grass plantings and anniversary parties since 2002.",
             "galleries.html")
    s += header("galleries.html")
    s += f'<main id="main">\n{page_head("Events &amp; Galleries", "What is coming up, and every album from the beach — one place.", "Events &amp; Galleries")}'
    s += f"""<section class="events" aria-labelledby="up-h">
  <div class="wrap">
    <div class="sec__head"><h2 id="up-h">Coming up</h2></div>
    <div class="event-grid" id="eventGrid" aria-live="polite">
        {static_cards()}
    </div>
  </div>
</section>
<section aria-labelledby="arch-h">
  <div class="wrap">
    <div class="sec__head"><h2 id="arch-h">Past events &amp; photo albums</h2></div>
    <div class="filters" role="group" aria-label="Filter albums">
      <button class="chip" type="button" data-filter="all" aria-pressed="true">All</button>
      <button class="chip" type="button" data-filter="social" aria-pressed="false">Socials</button>
      <button class="chip" type="button" data-filter="cleanup" aria-pressed="false">Clean-ups &amp; planting</button>
      <button class="chip" type="button" data-filter="info" aria-pressed="false">Updates</button>
      <span class="filters__count" id="albCount" aria-live="polite">{len(ARCH)} albums</span>
    </div>
"""
    years = []
    for a in ARCH:
        if a["year"] not in years:
            years.append(a["year"])
    for y in years:
        items = "\n".join(
            f'<li class="alb" data-type="{a["type"]}"><h3><a href="event-{a["slug"]}.html">{esc(a["title"])}</a></h3><p>{esc(a["date_label"] or "Date to be added")}</p></li>'
            for a in ARCH if a["year"] == y)
        s += f'    <div class="year-block"><h2>{y}</h2><ul class="alb-list">\n{items}\n</ul></div>\n'
    s += """  </div>
</section>
</main>
"""
    s += footer()
    write("galleries.html", s)


SHOT = ["l", "", "", "p", "", "w", "", "", "p", "", "w", ""]


def build_event_pages():
    for e in UP:
        end = e.get("end") or e["start"]
        meta = [("When", fmt_full(e)), ("Time", e.get("time") or "To be announced"), ("Where", e.get("place") or "To be announced")]
        build_event_page(e, end, meta, upcoming=True, prev=None, nxt=None)
    for i, a in enumerate(ARCH):
        meta = [("When", a["date_label"] or "Date to be added")]
        if a.get("time"): meta.append(("Time", a["time"]))
        if a.get("place"): meta.append(("Where", a["place"]))
        prev = ARCH[i + 1] if i + 1 < len(ARCH) else None  # older
        nxt = ARCH[i - 1] if i > 0 else None               # newer
        build_event_page(a, a["start"], meta, upcoming=False, prev=prev, nxt=nxt)


def build_event_page(e, end, meta, upcoming, prev, nxt):
    t = e["title"]
    name = f"event-{e['slug']}.html"
    s = head(f"{t} — MBPOA Events & Galleries", e["summary"], name)
    s += header("galleries.html")
    s += f'<main id="main">\n{page_head(esc(t), esc(e["summary"]), "<a href=galleries.html>Events &amp; Galleries</a> / " + esc(t))}'
    s = s.replace("<a href=galleries.html>", '<a href="galleries.html">')
    mt = "\n".join(f"<li><strong>{k}</strong>{esc(v)}</li>" for k, v in meta)
    sample = ('<p class="note-flag">Sample event for the design concept — dates and details are placeholders.</p>' if e.get("sample") else "")
    s += f'<div class="wrap" id="eventStatus" data-end="{end}">\n    <ul class="album-meta">\n{mt}\n    </ul>\n'
    # upcoming block
    hidden_up = "" if upcoming else " hidden"
    hidden_al = " hidden" if upcoming else ""
    s += f"""    <section id="eventUpcoming" class="sec"{hidden_up} aria-label="About this event">
      {sample}
      <div class="prose">
        <p>{esc(e['summary'])}</p>
        <p>Photos from this event are added to a gallery on this page after it ends.</p>
        <p><a class="btn btn--solid" href="{SHOP_URL}">Tickets &amp; merch in the MBPOA shop</a> <a class="btn btn--ghost" href="galleries.html">All events &amp; galleries</a></p>
      </div>
    </section>
    <section id="eventAlbum" class="sec"{hidden_al} aria-label="Photo gallery">
"""
    photos = e.get("photos") or []
    if photos:
        figs = []
        for i, u in enumerate(photos):
            cls = SHOT[i % len(SHOT)]
            c = f" shot--{cls}" if cls else ""
            figs.append(f'<figure class="shot{c}"><button type="button" aria-label="View photo {i+1} of {len(photos)}"><img src="{esc(u)}" alt="{esc(t)} — photo {i+1}" loading="lazy" data-plate></button></figure>')
        s += '      <div class="bento">\n        ' + "\n        ".join(figs) + "\n      </div>\n"
        s += '      <p class="album__note">Tap any photo to view it full-screen. Photos load from the association’s existing website.</p>\n'
    else:
        s += f"""      <div class="prose">
        <p class="note-flag">The photos for this album are moved over from the current MBPOA website when the new site launches.</p>
        <p><a class="btn btn--ghost" href="https://mbpoa.com/galleries/">See the current gallery page</a></p>
      </div>
"""
    s += "    </section>\n"
    if prev or nxt:
        s += '    <nav class="album-nav" aria-label="More albums">\n'
        s += (f'      <a href="event-{prev["slug"]}.html"><span class="album-nav__dir">← Older</span><span class="album-nav__title">{esc(prev["title"])}</span></a>\n' if prev else "<span></span>\n")
        s += (f'      <a href="event-{nxt["slug"]}.html"><span class="album-nav__dir">Newer →</span><span class="album-nav__title">{esc(nxt["title"])}</span></a>\n' if nxt else "<span></span>\n")
        s += "    </nav>\n"
    s += "  </div>\n</main>\n"
    if photos:
        s += """<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
  <button class="lightbox__btn lightbox__close" type="button" aria-label="Close photo viewer">✕</button>
  <button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous photo">←</button>
  <img src="data:," alt="">
  <button class="lightbox__btn lightbox__next" type="button" aria-label="Next photo">→</button>
  <p class="lightbox__cap"></p>
</div>
"""
    s += footer()
    write(name, s)


def write_events_js():
    items = []
    for e in UP:
        items.append({k: e.get(k) for k in ("slug", "title", "type", "start", "end", "time", "place", "image", "sample")}
                     | {"end": e.get("end") or e["start"]})
    with open(os.path.join(ROOT, "js", "events-data.js"), "w", encoding="utf-8") as f:
        f.write("/* Generated by build.py from data/events.json — do not edit by hand. */\n")
        f.write("window.MBPOA_EVENTS = " + json.dumps(items, indent=2, ensure_ascii=False) + ";\n")


def clean_old():
    for n in os.listdir(ROOT):
        if n.startswith("event-") and n.endswith(".html"):
            os.remove(os.path.join(ROOT, n))
    for n in ("gallery-ray-tauk.html",):
        p = os.path.join(ROOT, n)
        if os.path.exists(p):
            os.remove(p)


if __name__ == "__main__":
    clean_old()
    write_events_js()
    build_home(); build_welcome(); build_mission(); build_rules(); build_resources(); build_contact()
    build_galleries(); build_event_pages()
    print("built", len([n for n in os.listdir(ROOT) if n.endswith('.html')]), "pages; today =", TODAY)
