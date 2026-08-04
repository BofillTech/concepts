/* =========================================================================
   Bayshore Resort — homepage concept
   Vanilla ES6+, no libraries. All state changes are class toggles.
   ========================================================================= */
(function () {
  'use strict';

  var doc = document;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------- booking engine */
  /* Live iRM engine. Date format observed on the property's own Book Now
     link is MM-DD-YYYY, e.g.
     .../irmng/#/search?arrival=04-24-2024&departure=04-28-2024&people1=1&target=availability
     If the engine's param names are ever rewritten upstream, correct them here. */
  var ENGINE = 'https://reservations.bayshore-resort.com/irmng/#/search';

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function toEngineDate(iso) {
    if (!iso) { return ''; }
    var p = iso.split('-');
    if (p.length !== 3) { return ''; }
    return p[1] + '-' + p[2] + '-' + p[0];
  }

  function isoOffset(days) {
    var d = new Date();
    d.setDate(d.getDate() + days);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  var checkin  = doc.querySelector('[data-checkin]');
  var checkout = doc.querySelector('[data-checkout]');
  var adults   = doc.querySelector('[data-adults]');

  function openEngine() {
    var params = ['target=availability'];
    var a = checkin && checkin.value ? toEngineDate(checkin.value) : '';
    var b = checkout && checkout.value ? toEngineDate(checkout.value) : '';
    if (a) { params.push('arrival=' + a); }
    if (b) { params.push('departure=' + b); }
    params.push('people1=' + ((adults && adults.value) || '1'));
    window.open(ENGINE + '?' + params.join('&'), '_blank', 'noopener');
  }

  if (checkin && checkout) {
    var today    = isoOffset(0);
    var tomorrow = isoOffset(1);
    checkin.min = today;
    checkin.value = today;
    checkout.min = tomorrow;
    checkout.value = tomorrow;

    checkin.addEventListener('change', function () {
      var d = new Date(checkin.value);
      if (isNaN(d.getTime())) { return; }
      d.setDate(d.getDate() + 1);
      var next = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
      checkout.min = next;
      if (!checkout.value || checkout.value <= checkin.value) { checkout.value = next; }
    });
  }

  var goBtn = doc.querySelector('[data-book-go]');
  if (goBtn) { goBtn.addEventListener('click', openEngine); }

  Array.prototype.forEach.call(doc.querySelectorAll('[data-book]'), function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openEngine();
    });
  });

  /* ----------------------------------------------------- sticky header state */
  var header = doc.querySelector('[data-header]');
  var bookbar = doc.querySelector('[data-bookbar]');
  var hero = doc.querySelector('.hero');

  function onScroll() {
    if (header) { header.classList.toggle('is-stuck', window.scrollY > 12); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------- booking bar reveal */
  if (bookbar && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        bookbar.classList.toggle('is-visible', !entry.isIntersecting);
      });
    }, { threshold: 0, rootMargin: '-70% 0px 0px 0px' }).observe(hero);
  } else if (bookbar) {
    bookbar.classList.add('is-visible');
  }

  /* ----------------------------------------------------- mobile drawer */
  var toggle = doc.querySelector('[data-nav-toggle]');
  var drawer = doc.querySelector('[data-drawer]');

  function setDrawer(open) {
    if (!toggle || !drawer) { return; }
    drawer.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    doc.body.classList.toggle('is-locked', open);
  }

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      setDrawer(toggle.getAttribute('aria-expanded') !== 'true');
    });
    Array.prototype.forEach.call(drawer.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function () { setDrawer(false); });
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setDrawer(false); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) { setDrawer(false); }
    });
  }

  /* ----------------------------------------------------- staggered reveals */
  var targets = doc.querySelectorAll('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-in'); });
  } else {
    var queue = [];
    var flushing = false;

    function flush() {
      if (flushing) { return; }
      flushing = true;
      var i = 0;
      (function step() {
        if (i >= queue.length) { queue = []; flushing = false; return; }
        queue[i].classList.add('is-in');
        i++;
        window.setTimeout(step, 90);
      })();
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        queue.push(entry.target);
        io.unobserve(entry.target);
      });
      if (queue.length) { flush(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  /* ----------------------------------------------------- image fallbacks */
  /* Hotlinked assets live on the property's own server. If one ever fails,
     swap in the self-hosted equivalent rather than showing a broken frame. */
  Array.prototype.forEach.call(doc.querySelectorAll('img[data-fallback]'), function (img) {
    img.addEventListener('error', function handler() {
      img.removeEventListener('error', handler);
      img.src = img.getAttribute('data-fallback');
    });
  });

  var logo = doc.querySelector('[data-logo]');
  var brand = doc.querySelector('[data-brand]');
  if (logo && brand) {
    logo.addEventListener('error', function () { brand.classList.add('is-fallback'); });
  }

  /* ----------------------------------------------------- dynamic year */
  var year = doc.querySelector('[data-year]');
  if (year) { year.textContent = String(new Date().getFullYear()); }
}());
