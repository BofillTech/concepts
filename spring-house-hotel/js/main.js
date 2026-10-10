/* The Spring House Hotel — homepage concept
   Vanilla ES6+, no libraries. Zero inline handlers; all state via classes. */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  /* ---------- Sticky header shadow ---------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  const burger = document.querySelector('.site-header__burger');
  const drawer = document.getElementById('mobile-drawer');
  const closeDrawer = () => {
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    drawer.hidden = true;
    document.body.classList.remove('u-lock');
  };
  const openDrawer = () => {
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    drawer.hidden = false;
    document.body.classList.add('u-lock');
  };
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      (burger.getAttribute('aria-expanded') === 'true') ? closeDrawer() : openDrawer();
    });
    drawer.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeDrawer();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') closeDrawer();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) closeDrawer();
    });
  }

  /* ---------- Logo fallback: swap in the text wordmark if the file fails ---------- */
  const logo = document.querySelector('.site-header__logo');
  const wordmark = document.querySelector('.site-header__wordmark');
  if (logo && wordmark) {
    const swapLogo = () => {
      logo.hidden = true;
      wordmark.hidden = false;
    };
    logo.addEventListener('error', swapLogo);
    if (logo.complete && logo.naturalWidth === 0) swapLogo(); /* failed before listener attached */
  }

  /* ---------- Photo fallbacks: full-size guess -> documented thumbnail ---------- */
  document.querySelectorAll('img[data-fallback]').forEach((img) => {
    const swap = () => {
      if (img.src !== img.dataset.fallback) img.src = img.dataset.fallback;
    };
    img.addEventListener('error', swap, { once: true });
    if (img.complete && img.naturalWidth === 0) swap();
  });

  /* ---------- Scroll reveals (subtle fade) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Bottom booking bar ---------- */
  const bar = document.getElementById('book-bar');
  const inEl = document.getElementById('bb-in');
  const outEl = document.getElementById('bb-out');
  const guestsEl = document.getElementById('bb-guests');
  const goBtn = document.getElementById('bb-go');
  const fmt = (d) => d.toISOString().slice(0, 10);

  if (inEl && outEl) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    inEl.value = fmt(today);
    inEl.min = fmt(today);
    outEl.value = fmt(tomorrow);
    outEl.min = fmt(tomorrow);
    inEl.addEventListener('change', () => {
      const next = new Date(inEl.value);
      next.setDate(next.getDate() + 1);
      outEl.min = fmt(next);
      if (outEl.value <= inEl.value) outEl.value = fmt(next);
    });
  }

  if (goBtn) {
    goBtn.addEventListener('click', () => {
      /* ENGINE HOOK: direct-book.com accepts the property slug; the date/guest
         param names below are the engine's common format — confirm against a
         live booking and correct here if it rewrites them upstream. */
      const base = 'https://direct-book.com/properties/SpringHouseHotelDIRECT';
      const params = new URLSearchParams({
        locale: 'en',
        checkInDate: inEl ? inEl.value : '',
        checkOutDate: outEl ? outEl.value : ''
      });
      if (guestsEl) params.set('items[0][adults]', guestsEl.value);
      window.open(base + '?' + params.toString(), '_blank', 'noopener');
    });
  }

  if (bar) {
    const hero = document.querySelector('.hero');
    if ('IntersectionObserver' in window && hero) {
      const barIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          bar.classList.toggle('is-visible', !entry.isIntersecting);
        });
      }, { threshold: 0.05 });
      barIO.observe(hero);
    } else {
      bar.classList.add('is-visible');
    }
  }

  /* ---------- Dynamic year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}());

/* ==========================================================================
   Rev 3 — property-grid ordering, slideshows, lazy video embeds, nav dropdowns
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- PROPERTY ORDER (EDIT ME) ----------
     One config array controls the order of the property grid on BOTH the
     homepage and the Stay page. Cards carry data-prop="<key>"; list keys
     here closest-to-the-main-Spring-House first. */
  var PROPERTY_ORDER = [
    'main',      // Spring House Main Building (the anchor)
    'barn',      // Barn Apartments — on the hotel property
    'seaside',   // Seaside Homes — on the property
    'mott',      // Mott House — directly across from the main building
    'inn',       // The Inn at Spring House — just down the driveway
    'seawinds',  // Seawinds Townhouses — 5-minute walk, High Street
    'newharbor', // Spring House in New Harbor — 585 Beach Ave
    'cooneymus'  // The Cooneymus Cottage — west side of the island
  ];

  document.querySelectorAll('[data-ordered-grid]').forEach(function (grid) {
    var cards = {};
    grid.querySelectorAll('[data-prop]').forEach(function (c) { cards[c.getAttribute('data-prop')] = c; });
    PROPERTY_ORDER.forEach(function (key) { if (cards[key]) grid.appendChild(cards[key]); });
  });

  /* ---------- Crossfade slideshows ----------
     <div class="slideshow" data-interval="4500"><img class="is-active">… */
  document.querySelectorAll('.slideshow').forEach(function (show) {
    var slides = show.querySelectorAll('img');
    if (slides.length < 2) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var i = 0;
    var delay = parseInt(show.getAttribute('data-interval') || '4500', 10);
    slides[0].classList.add('is-active');
    setInterval(function () {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
    }, delay);
  });

  /* ---------- Lazy video embeds ----------
     <div class="video-embed" data-src="https://drive.google.com/file/d/ID/preview">
     The iframe is only created when scrolled near the viewport. */
  var embeds = document.querySelectorAll('.video-embed[data-src]');
  function loadEmbed(el) {
    if (el.dataset.loaded) return;
    el.dataset.loaded = '1';
    var f = document.createElement('iframe');
    f.src = el.getAttribute('data-src');
    f.setAttribute('title', el.getAttribute('data-title') || 'Video');
    f.setAttribute('allow', 'autoplay; fullscreen');
    f.setAttribute('allowfullscreen', '');
    f.setAttribute('loading', 'lazy');
    el.appendChild(f);
    el.classList.add('is-loaded');
  }
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { loadEmbed(e.target); vio.unobserve(e.target); } });
    }, { rootMargin: '300px' });
    embeds.forEach(function (e) { vio.observe(e); });
  } else {
    embeds.forEach(loadEmbed);
  }

  /* ---------- Lazy autoplay loop stubs (short dining clips) ----------
     <video class="loop-clip" data-clip-src="TODO.mp4" poster="…" muted loop playsinline> */
  var clips = document.querySelectorAll('video.loop-clip[data-clip-src]');
  function loadClip(v) {
    var src = v.getAttribute('data-clip-src');
    if (!src || src.indexOf('TODO') === 0 || v.dataset.loaded) return;
    v.dataset.loaded = '1';
    v.src = src;
    v.muted = true;
    v.play().catch(function () {});
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { loadClip(e.target); cio.unobserve(e.target); } });
    }, { rootMargin: '200px' });
    clips.forEach(function (c) { cio.observe(c); });
  }

  /* ---------- Nav dropdowns (touch/click toggle; hover handled in CSS) ---------- */
  document.querySelectorAll('.menu-item--has-sub > a').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var li = a.parentElement;
      var isDesktopHover = window.matchMedia('(min-width: 1024px) and (hover: hover)').matches;
      if (!isDesktopHover) {
        if (!li.classList.contains('is-open')) {
          ev.preventDefault();
          document.querySelectorAll('.menu-item--has-sub.is-open').forEach(function (o) { o.classList.remove('is-open'); });
          li.classList.add('is-open');
        }
      }
    });
  });
  document.addEventListener('click', function (ev) {
    if (!ev.target.closest('.menu-item--has-sub')) {
      document.querySelectorAll('.menu-item--has-sub.is-open').forEach(function (o) { o.classList.remove('is-open'); });
    }
  });

  /* ---------- Gift card checkout hook ---------- */
  var gcForm = document.getElementById('gc-form');
  if (gcForm) {
    var gcAmount = { value: 100 };
    gcForm.querySelectorAll('.gc-amounts button').forEach(function (b) {
      b.addEventListener('click', function () {
        gcForm.querySelectorAll('.gc-amounts button').forEach(function (x) { x.classList.remove('is-selected'); });
        b.classList.add('is-selected');
        var custom = document.getElementById('gc-custom');
        if (b.dataset.amount === 'custom') { custom.hidden = false; custom.focus(); }
        else { document.getElementById('gc-custom').hidden = true; gcAmount.value = parseInt(b.dataset.amount, 10); }
      });
    });
    gcForm.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var custom = document.getElementById('gc-custom');
      var amount = (!custom.hidden && custom.value) ? parseFloat(custom.value) : gcAmount.value;
      var payload = {
        amount: amount,
        quantity: parseInt(document.getElementById('gc-qty').value, 10) || 1,
        recipientName: document.getElementById('gc-to').value,
        recipientEmail: document.getElementById('gc-email').value,
        message: document.getElementById('gc-msg').value
      };
      /* TODO (PAYMENT INTEGRATION): wire this payload into the payment provider.
         The hotel currently sells gift cards through Givex:
         https://wwws-usa2.givex.com/cws4.0/springhouse/
         Options: (a) keep Givex and deep-link/redirect with amount,
         (b) Stripe Checkout session via a small serverless endpoint,
         (c) the booking engine's voucher module if direct-book supports it.
         Until then we hand off to the live Givex storefront: */
      console.log('GIFT CARD CHECKOUT PAYLOAD (stub):', payload);
      window.open('https://wwws-usa2.givex.com/cws4.0/springhouse/', '_blank', 'noopener');
    });
  }
}());
