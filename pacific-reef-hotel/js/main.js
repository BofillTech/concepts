/* Pacific Reef Hotel concept: nav, reveals, sticky booking bar. */
(function () {
  var REVEAL_SELECTOR = '.reveal';
  function mdy(v, z) { if (!v) { return ''; } var p = v.split('-'); return z ? p[1] + '/' + p[2] + '/' + p[0] : (+p[1]) + '/' + (+p[2]) + '/' + p[0]; }
  function nights(a, b) { if (!a || !b) { return 1; } var x = a.split('-'), y = b.split('-'); return Math.max(1, Math.round((new Date(+y[0], +y[1] - 1, +y[2]) - new Date(+x[0], +x[1] - 1, +x[2])) / 864e5)); }
  function buildBookingUrl(ci, co, g) {
    var q = [];
    if (ci) { q.push('StartDate=' + mdy(ci)); }
    if (co) { q.push('EndDate=' + mdy(co)); }
    q.push('Adults=' + g);
    return 'https://resnexus.com/resnexus/reservations/lodging/F87F9D5E-E31B-4EF6-AAD9-9CB077ACD851?' + q.join('&');
  }
  'use strict';

  var header = document.querySelector('[data-header]');
  var hero = document.querySelector('[data-hero]');
  var bar = document.querySelector('[data-book-bar]');
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('main-nav');
  var checkin = document.querySelector('[data-checkin]');
  var checkout = document.querySelector('[data-checkout]');
  var guests = document.querySelector('[data-guests]');

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parse(v) { var p = v.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function addDays(d, n) { var c = new Date(d.getTime()); c.setDate(c.getDate() + n); return c; }

  /* Mobile menu */
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      document.body.classList.toggle('nav-open', !open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        toggle.focus();
      }
    });
  }

  /* Header state + booking bar visibility, driven by the hero leaving the viewport */
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var past = !entries[0].isIntersecting;
      if (header) { header.classList.toggle('is-solid', past || window.scrollY > 40); }
      if (bar) {
        bar.classList.toggle('is-visible', past);
        bar.setAttribute('aria-hidden', String(!past));
        document.body.classList.toggle('has-book-bar', past);
      }
    }, { rootMargin: '-80px 0px 0px 0px', threshold: 0 }).observe(hero);
  } else if (bar) {
    bar.classList.add('is-visible');
    bar.setAttribute('aria-hidden', 'false');
  }
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* Reveal-on-scroll */
  var revealEls = document.querySelectorAll(REVEAL_SELECTOR);
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); ro.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { el.classList.add('will-reveal'); ro.observe(el); });
  }

  /* Booking dates */
  if (checkin && checkout) {
    var today = new Date();
    checkin.min = iso(today);
    checkin.value = iso(addDays(today, 7));
    checkout.min = iso(addDays(today, 8));
    checkout.value = iso(addDays(today, 9));
    checkin.addEventListener('change', function () {
      if (!checkin.value) { return; }
      var next = addDays(parse(checkin.value), 1);
      checkout.min = iso(next);
      if (!checkout.value || parse(checkout.value) <= parse(checkin.value)) { checkout.value = iso(addDays(next, 1)); }
    });
  }

  function currentUrl() {
    var ci = checkin && checkin.value ? checkin.value : '';
    var co = checkout && checkout.value ? checkout.value : '';
    if (ci && co && parse(co) <= parse(ci)) { co = iso(addDays(parse(ci), 1)); }
    var g = guests ? parseInt(guests.value, 10) || 2 : 2;
    return buildBookingUrl(ci, co, g);
  }

  if (bar) {
    bar.addEventListener('submit', function (e) {
      e.preventDefault();
      window.open(currentUrl(), '_blank', 'noopener');
    });
  }

  var y = document.querySelector('[data-year]');
  if (y) { y.textContent = String(new Date().getFullYear()); }
})();
