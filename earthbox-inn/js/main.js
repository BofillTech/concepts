/* Earthbox Inn & Spa concept — main.js
   Vanilla ES6+ IIFE. No inline handlers, no .style assignments — state via class toggles + [hidden]. */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var BOOKING_ENGINE = 'https://secure.webrez.com/hotel/584';
  /* ENGINE HOOK: WebRez date query-param names are unconfirmed for this property.
     Once a live booking is watched, wire the chosen dates in here, e.g.:
     url += '?date_from=' + inEl.value + '&date_to=' + outEl.value;               */
  var ENGINE_ACCEPTS_DATES = false;

  /* Sticky nav shadow */
  var nav = document.getElementById('site-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('is-stuck', window.scrollY > 10);
    }, { passive: true });
  }

  /* Mobile drawer */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('mobile-drawer');
  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    drawer.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
  }
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = drawer.hidden;
      drawer.hidden = !open;
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('is-locked', open);
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeDrawer();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) closeDrawer();
    });
  }

  /* Logo fallback — swap to the styled-text wordmark if the hotlinked logo ever fails */
  var logo = document.getElementById('nav-logo');
  if (logo) {
    logo.addEventListener('error', function () {
      logo.hidden = true;
      var wordmark = logo.nextElementSibling;
      if (wordmark) wordmark.hidden = false;
    });
  }

  /* Broken-image safety — hide failed hotlinks so the brand-colored plate shows */
  Array.prototype.forEach.call(document.querySelectorAll('main img, footer img'), function (img) {
    img.addEventListener('error', function () {
      img.classList.add('is-broken');
    });
  });

  /* Bottom booking bar — reveals once the hero scrolls out of view */
  var bookbar = document.getElementById('bookbar');
  var hero = document.querySelector('.hero');
  if (bookbar && hero && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      bookbar.hidden = entries[0].isIntersecting;
    }, { threshold: 0 });
    io.observe(hero);
  } else if (bookbar) {
    bookbar.hidden = false;
  }

  /* Date defaults: today / tomorrow; checkout min auto-follows check-in */
  var inEl = document.getElementById('bb-in');
  var outEl = document.getElementById('bb-out');
  function iso(d) { return d.toISOString().slice(0, 10); }
  if (inEl && outEl) {
    var today = new Date();
    var tomorrow = new Date(today.getTime() + 86400000);
    inEl.value = iso(today);
    inEl.min = iso(today);
    outEl.value = iso(tomorrow);
    outEl.min = iso(tomorrow);
    inEl.addEventListener('change', function () {
      var next = new Date(inEl.value + 'T00:00:00');
      next = new Date(next.getTime() + 86400000);
      outEl.min = iso(next);
      if (outEl.value <= inEl.value) outEl.value = iso(next);
    });
  }

  /* Book buttons */
  Array.prototype.forEach.call(document.querySelectorAll('[data-book]'), function (el) {
    el.addEventListener('click', function () {
      var url = BOOKING_ENGINE;
      if (ENGINE_ACCEPTS_DATES && inEl && outEl) {
        url += '?date_from=' + encodeURIComponent(inEl.value) + '&date_to=' + encodeURIComponent(outEl.value);
      }
      window.open(url, '_blank', 'noopener');
    });
  });

  /* Dynamic year */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
