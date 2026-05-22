/**
 * Terrace By The Sea — main.js
 * Vanilla ES6+ · No jQuery · No inline handlers
 * WordPress/Genesis nav class conventions applied
 */

'use strict';

/* ============================================================
   CONSTANTS
   ============================================================ */
// BASE path kept for reference; nav uses relative links
const IMG    = `https://bofilltech.github.io${BASE}/img`;
const BOOK_URL = 'https://terracebythesea.client.innroad.com/';

/* ============================================================
   NAV HTML (WordPress/Genesis class conventions)
   .nav-primary  → primary nav wrapper
   .menu + .genesis-nav-menu + .menu-primary → ul classes
   .menu-item    → every li
   .menu-item-has-children → li with sub-menu
   .sub-menu     → dropdown ul
   ============================================================ */
const buildNav = () => `
<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header" role="banner" itemscope itemtype="https://schema.org/WPHeader">
  <a href="index.html" class="site-logo" aria-label="Terrace By The Sea — Home">
    <img src="${IMG}/logo-primary.png" alt="Terrace By The Sea — Ogunquit, Maine" class="site-logo__img" width="180" height="50">
  </a>
  <nav class="nav-primary" role="navigation" aria-label="Primary" itemscope itemtype="https://schema.org/SiteNavigationElement">
    <ul class="menu genesis-nav-menu menu-primary" role="menubar">
      <li class="menu-item menu-item-type-post_type menu-item-has-children" role="none">
        <a href="buildings.html" role="menuitem" aria-haspopup="true" aria-expanded="false" itemprop="url">
          <span itemprop="name">Accommodations</span>
        </a>
        <ul class="sub-menu" role="menu" aria-label="Accommodations submenu">
          <li class="menu-item menu-item-type-post_type" role="none"><a href="buildings.html" role="menuitem" itemprop="url"><span itemprop="name">All Buildings</span></a></li>
          <li class="menu-item menu-item-type-post_type" role="none"><a href="buildings-main-inn.html" role="menuitem" itemprop="url"><span itemprop="name">The Main Inn</span></a></li>
          <li class="menu-item menu-item-type-post_type" role="none"><a href="buildings-deluxe-motel.html" role="menuitem" itemprop="url"><span itemprop="name">Deluxe Motel</span></a></li>
          <li class="menu-item menu-item-type-post_type" role="none"><a href="buildings-suites.html" role="menuitem" itemprop="url"><span itemprop="name">The Suites</span></a></li>
          <li class="menu-item menu-item-type-post_type" role="none"><a href="buildings-side-motel-cottage.html" role="menuitem" itemprop="url"><span itemprop="name">Side Motel &amp; Cottage</span></a></li>
          <li class="menu-item menu-item-type-post_type" role="none"><a href="buildings-court-motel.html" role="menuitem" itemprop="url"><span itemprop="name">Court Motel</span></a></li>
        </ul>
      </li>
      <li class="menu-item menu-item-type-post_type" role="none"><a href="amenities.html" role="menuitem" itemprop="url"><span itemprop="name">Amenities</span></a></li>
      <li class="menu-item menu-item-type-post_type menu-item-has-children" role="none">
        <a href="gallery.html" role="menuitem" aria-haspopup="true" aria-expanded="false" itemprop="url">
          <span itemprop="name">Gallery</span>
        </a>
        <ul class="sub-menu" role="menu" aria-label="Gallery submenu">
          <li class="menu-item menu-item-type-post_type" role="none"><a href="gallery.html#buildings" role="menuitem">Buildings</a></li>
          <li class="menu-item menu-item-type-post_type" role="none"><a href="gallery.html#rooms" role="menuitem">Rooms</a></li>
          <li class="menu-item menu-item-type-post_type" role="none"><a href="gallery.html#grounds" role="menuitem">Grounds</a></li>
          <li class="menu-item menu-item-type-post_type" role="none"><a href="gallery.html#video" role="menuitem">Video</a></li>
        </ul>
      </li>
      <li class="menu-item menu-item-type-post_type" role="none"><a href="attractions.html" role="menuitem" itemprop="url"><span itemprop="name">Attractions</span></a></li>
      <li class="menu-item menu-item-type-post_type" role="none"><a href="virtual-tour.html" role="menuitem" itemprop="url"><span itemprop="name">Virtual Tour</span></a></li>
      <li class="menu-item menu-item-type-post_type" role="none"><a href="gift-certificates.html" role="menuitem" itemprop="url"><span itemprop="name">Gift Certificates</span></a></li>
      <li class="menu-item menu-item-type-post_type" role="none"><a href="weddings.html" role="menuitem" itemprop="url"><span itemprop="name">Weddings</span></a></li>
      <li class="menu-item menu-item-type-post_type" role="none"><a href="contact.html" role="menuitem" itemprop="url"><span itemprop="name">Contact</span></a></li>
    </ul>
  </nav>
  <div class="site-header__actions">
    <a href="tel:2076463232" class="site-header__phone" aria-label="Call us: 207-646-3232">207-646-3232</a>
    <a href="${BOOK_URL}" class="btn btn--book-now" target="_blank" rel="noopener" aria-label="Book your stay (opens booking system)">Book Now</a>
  </div>
  <button class="nav-toggle" id="navToggle" aria-controls="mobileMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="nav-toggle__bar" aria-hidden="true"></span>
    <span class="nav-toggle__bar" aria-hidden="true"></span>
    <span class="nav-toggle__bar" aria-hidden="true"></span>
  </button>
</header>`;

const buildMobileMenu = () => `
<nav class="nav-secondary" id="mobileMenu" role="navigation" aria-label="Mobile navigation">
  <span class="nav-secondary__heading" aria-hidden="true">Accommodations</span>
  <ul class="menu">
    <li class="menu-item sub-menu-item" role="none"><a href="buildings.html">All Buildings</a></li>
    <li class="menu-item sub-menu-item" role="none"><a href="buildings-main-inn.html">The Main Inn</a></li>
    <li class="menu-item sub-menu-item" role="none"><a href="buildings-deluxe-motel.html">Deluxe Motel</a></li>
    <li class="menu-item sub-menu-item" role="none"><a href="buildings-suites.html">The Suites</a></li>
    <li class="menu-item sub-menu-item" role="none"><a href="buildings-side-motel-cottage.html">Side Motel &amp; Cottage</a></li>
    <li class="menu-item sub-menu-item" role="none"><a href="buildings-court-motel.html">Court Motel</a></li>
    <li class="menu-item" role="none"><a href="amenities.html">Amenities</a></li>
  </ul>
  <span class="nav-secondary__heading" aria-hidden="true">Gallery</span>
  <ul class="menu">
    <li class="menu-item sub-menu-item" role="none"><a href="gallery.html#buildings">Buildings</a></li>
    <li class="menu-item sub-menu-item" role="none"><a href="gallery.html#rooms">Rooms</a></li>
    <li class="menu-item sub-menu-item" role="none"><a href="gallery.html#grounds">Grounds</a></li>
    <li class="menu-item sub-menu-item" role="none"><a href="gallery.html#video">Video</a></li>
  </ul>
  <ul class="menu">
    <li class="menu-item" role="none"><a href="attractions.html">Attractions</a></li>
    <li class="menu-item" role="none"><a href="virtual-tour.html">Virtual Tour</a></li>
    <li class="menu-item" role="none"><a href="gift-certificates.html">Gift Certificates</a></li>
    <li class="menu-item" role="none"><a href="weddings.html">Weddings</a></li>
    <li class="menu-item" role="none"><a href="contact.html">Contact</a></li>
    <li class="menu-item" role="none"><a href="tel:2076463232">207-646-3232</a></li>
    <li class="menu-item" role="none"><a href="${BOOK_URL}" target="_blank" rel="noopener">Book Now</a></li>
  </ul>
</nav>`;

const buildFooter = () => `
<footer class="site-footer" role="contentinfo" itemscope itemtype="https://schema.org/WPFooter">
  <div class="site-footer__brand">
    <img src="${IMG}/logo-circle.png" class="site-footer__seal" alt="Terrace By The Sea Est. 1920 seal" width="80" height="80">
    <p class="site-footer__tagline">A special place on the Maine coast since 1920. Deluxe motel comfort with colonial inn elegance, directly overlooking Ogunquit Beach.</p>
  </div>
  <div class="site-footer__col">
    <span class="site-footer__col-heading">Accommodations</span>
    <ul>
      <li><a href="buildings-main-inn.html">The Main Inn</a></li>
      <li><a href="buildings-deluxe-motel.html">Deluxe Motel</a></li>
      <li><a href="buildings-side-motel-cottage.html">Side Motel &amp; Cottage</a></li>
      <li><a href="buildings-court-motel.html">Court Motel</a></li>
      <li><a href="buildings-suites.html">The Suites</a></li>
    </ul>
  </div>
  <div class="site-footer__col">
    <span class="site-footer__col-heading">Explore</span>
    <ul>
      <li><a href="amenities.html">Amenities</a></li>
      <li><a href="gallery.html">Gallery</a></li>
      <li><a href="virtual-tour.html">Virtual Tour</a></li>
      <li><a href="gift-certificates.html">Gift Certificates</a></li>
      <li><a href="weddings.html">Weddings &amp; Events</a></li>
      <li><a href="attractions.html">Nearby Attractions</a></li>
    </ul>
  </div>
  <div class="site-footer__col">
    <span class="site-footer__col-heading">Find Us</span>
    <address class="site-footer__address" itemscope itemtype="https://schema.org/PostalAddress">
      <span itemprop="streetAddress">23 Wharf Lane</span><br>
      <span itemprop="addressLocality">Ogunquit</span>, <span itemprop="addressRegion">Maine</span> <span itemprop="postalCode">03907</span><br><br>
      <a href="tel:2076463232" itemprop="telephone">207-646-3232</a><br>
      <a href="mailto:info@terracebythesea.com" itemprop="email">info@terracebythesea.com</a>
    </address>
  </div>
</footer>
<div class="site-footer__bottom">
  <span>&copy; 2025 Terrace By The Sea. All rights reserved.</span>
  <div class="site-footer__social">
    <a href="https://www.facebook.com/TerraceOgunquit" target="_blank" rel="noopener noreferrer" aria-label="Terrace By The Sea on Facebook">Facebook</a>
    <a href="https://www.youtube.com/watch?v=Gek-lAB1DSM" target="_blank" rel="noopener noreferrer" aria-label="Terrace By The Sea on YouTube">YouTube</a>
  </div>
</div>`;

const buildBookingBar = () => `
<div class="booking-bar" role="search" aria-label="Room availability search">
  <div class="booking-bar__field">
    <label class="booking-bar__label" for="checkinDate">Check In</label>
    <input class="booking-bar__input" type="date" id="checkinDate" name="checkin" aria-label="Check-in date">
  </div>
  <div class="booking-bar__field">
    <label class="booking-bar__label" for="checkoutDate">Check Out</label>
    <input class="booking-bar__input" type="date" id="checkoutDate" name="checkout" aria-label="Check-out date">
  </div>
  <button class="booking-bar__btn" id="bookNowBtn" aria-label="Book now — opens booking system in new tab">Book Now</button>
</div>`;

/* ============================================================
   INJECT SHARED CHROME
   ============================================================ */
const injectChrome = () => {
  if (!document.querySelector('.site-header')) {
    document.body.insertAdjacentHTML('afterbegin', buildNav() + buildMobileMenu());
  }
  if (!document.querySelector('.site-footer')) {
    document.body.insertAdjacentHTML('beforeend', buildFooter());
  }
  if (!document.querySelector('.booking-bar')) {
    document.body.insertAdjacentHTML('beforeend', buildBookingBar());
  }
};

/* ============================================================
   DROPDOWN NAVIGATION
   ============================================================ */
const initDropdowns = () => {
  const items = document.querySelectorAll('.nav-primary .menu-item-has-children');

  items.forEach(li => {
    if (li.dataset.navBound) return;
    li.dataset.navBound = '1';

    const trigger = li.querySelector(':scope > a');
    const submenu = li.querySelector('.sub-menu');
    if (!trigger || !submenu) return;

    trigger.addEventListener('click', e => {
      e.preventDefault();
      const isOpen = li.classList.contains('open');
      // Close all
      items.forEach(el => {
        el.classList.remove('open');
        const t = el.querySelector(':scope > a');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      // Toggle clicked
      if (!isOpen) {
        li.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard: close on Escape, navigate submenu with arrows
    li.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        li.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    });
  });

  // Close on outside interaction
  if (!document.body.dataset.navGlobalBound) {
    document.body.dataset.navGlobalBound = '1';

    document.addEventListener('click', e => {
      if (!e.target.closest('.nav-primary')) {
        items.forEach(el => {
          el.classList.remove('open');
          const t = el.querySelector(':scope > a');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        items.forEach(el => {
          el.classList.remove('open');
          const t = el.querySelector(':scope > a');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }
};

/* ============================================================
   MOBILE MENU TOGGLE
   ============================================================ */
const initMobileMenu = () => {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
};

/* ============================================================
   ACTIVE NAV STATE
   ============================================================ */
const setActiveNavItem = () => {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-primary .menu-item > a').forEach(a => {
    const href = a.getAttribute('href') || '';
    // Match current page path segment
    const segment = href.replace(BASE, '').replace(/\/$/, '').split('/').filter(Boolean).pop();
    if (segment && path.includes(segment)) {
      a.closest('.menu-item').classList.add('current-menu-item');
      const parent = a.closest('.menu-item-has-children');
      if (parent && parent !== a.closest('.menu-item')) {
        parent.classList.add('current-menu-ancestor');
      }
    }
  });
};

/* ============================================================
   BOOKING BAR
   ============================================================ */
const initBookingBar = () => {
  const ci = document.getElementById('checkinDate');
  const co = document.getElementById('checkoutDate');
  const btn = document.getElementById('bookNowBtn');

  if (!ci || !co) return;
  if (ci.dataset.barBound) return;
  ci.dataset.barBound = '1';

  const today    = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const fmt = d => d.toISOString().split('T')[0];

  ci.value = fmt(today);
  co.value = fmt(tomorrow);
  ci.min   = fmt(today);
  co.min   = fmt(tomorrow);

  ci.addEventListener('change', () => {
    const next = new Date(ci.value);
    next.setDate(next.getDate() + 1);
    co.min = fmt(next);
    if (co.value <= ci.value) co.value = fmt(next);
  });

  if (btn) {
    btn.addEventListener('click', () => window.open(BOOK_URL, '_blank', 'noopener'));
  }
};

/* ============================================================
   HERO SLIDESHOW
   ============================================================ */
const initHero = () => {
  const slides = document.querySelectorAll('.hero__slide');
  const dots   = document.querySelectorAll('.hero__dot');
  if (!slides.length || !dots.length) return;

  let current = 0;
  let timer;

  const goTo = n => {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    dots[current].setAttribute('aria-selected', 'false');
    current = n;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-selected', 'true');
    clearInterval(timer);
    timer = setInterval(() => goTo((current + 1) % slides.length), 5500);
  };

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  timer = setInterval(() => goTo((current + 1) % slides.length), 5500);
};

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const initReveal = () => {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
};

/* ============================================================
   GALLERY TAB SWITCHER
   ============================================================ */
const initGalleryTabs = () => {
  const tabs = document.querySelectorAll('.gallery-tab[data-tab]');
  if (!tabs.length) return;

  const showPanel = (tab, btn) => {
    document.querySelectorAll('.gallery-panel').forEach(p => {
      p.classList.remove('is-active');
      p.setAttribute('hidden', '');
    });
    document.querySelectorAll('.gallery-tab').forEach(t => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    const panel = document.getElementById('panel-' + tab);
    if (panel) {
      panel.classList.add('is-active');
      panel.removeAttribute('hidden');
    }
    if (btn) {
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
    }
    history.replaceState(null, null, '#' + tab);
  };

  tabs.forEach(btn => {
    btn.addEventListener('click', () => showPanel(btn.dataset.tab, btn));
  });

  const restoreFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const match = document.querySelector(`.gallery-tab[data-tab="${hash}"]`);
      if (match) showPanel(hash, match);
    }
  };

  if (document.readyState === 'complete') restoreFromHash();
  else window.addEventListener('load', restoreFromHash);
  window.addEventListener('hashchange', restoreFromHash);
};

/* ============================================================
   INIT ON DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  injectChrome();
  initDropdowns();
  initMobileMenu();
  setActiveNavItem();
  initBookingBar();
  initHero();
  initReveal();
  initGalleryTabs();
});

/* ============================================================
   HERO SLIDE BACKGROUND IMAGES — applied from data-bg attr
   (avoids inline style= in HTML, keeping SOP compliant)
   ============================================================ */
(function () {
  document.querySelectorAll('.hero__slide[data-bg]').forEach(function (slide) {
    var bg = slide.getAttribute('data-bg');
    if (bg) slide.style.backgroundImage = 'url("' + bg + '")';
  });
}());
