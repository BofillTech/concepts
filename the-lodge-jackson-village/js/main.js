/* ============================================================
   The Lodge at Jackson Village — main.js
   Vanilla ES6+, IIFE, no external dependencies.
   ============================================================ */
(function () {
  'use strict';

  var doc = document;

  /* ---------- sticky header state ---------- */
  var header = doc.querySelector('[data-header]');
  function setHeaderState() {
    if (!header) return;
    header.setAttribute('data-state', window.scrollY > 40 ? 'scrolled' : 'top');
  }
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  /* ---------- mobile drawer ---------- */
  var toggle = doc.querySelector('[data-nav-toggle]');
  var drawer = doc.querySelector('[data-nav-drawer]');
  var scrim = doc.querySelector('[data-nav-scrim]');
  var drawerLinks = doc.querySelectorAll('[data-drawer-link]');

  function openDrawer() {
    if (!drawer || !scrim) return;
    drawer.hidden = false;
    scrim.hidden = false;
    /* force reflow so the transition runs */
    void drawer.offsetWidth;
    drawer.classList.add('is-open');
    scrim.classList.add('is-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    doc.body.classList.add('no-scroll');
  }
  function closeDrawer() {
    if (!drawer || !scrim) return;
    drawer.classList.remove('is-open');
    scrim.classList.remove('is-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    doc.body.classList.remove('no-scroll');
    window.setTimeout(function () {
      drawer.hidden = true;
      scrim.hidden = true;
    }, 380);
  }

  if (toggle) toggle.addEventListener('click', openDrawer);
  if (scrim) scrim.addEventListener('click', closeDrawer);
  drawerLinks.forEach(function (link) { link.addEventListener('click', closeDrawer); });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) closeDrawer();
  });

  /* ---------- scroll reveals ---------- */
  var revealEls = doc.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- booking bar reveal (after hero scrolls out) ---------- */
  var bar = doc.querySelector('[data-booking-bar]');
  var hero = doc.querySelector('.hero');
  if (bar && hero && 'IntersectionObserver' in window) {
    var heroIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        bar.classList.toggle('is-visible', !entry.isIntersecting);
      });
    }, { threshold: 0 });
    heroIO.observe(hero);
  } else if (bar) {
    bar.classList.add('is-visible');
  }

  /* ---------- booking date defaults + validation ---------- */
  function toISO(d) { return d.toISOString().split('T')[0]; }
  var checkin = doc.querySelector('[data-checkin]');
  var checkout = doc.querySelector('[data-checkout]');
  if (checkin && checkout) {
    var today = new Date();
    var tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
    var dayAfter = new Date(); dayAfter.setDate(today.getDate() + 2);

    checkin.min = toISO(today);
    checkin.value = toISO(tomorrow);
    checkout.min = toISO(dayAfter);
    checkout.value = toISO(dayAfter);

    checkin.addEventListener('change', function () {
      var ci = new Date(checkin.value);
      var next = new Date(ci); next.setDate(ci.getDate() + 1);
      checkout.min = toISO(next);
      if (new Date(checkout.value) <= ci) checkout.value = toISO(next);
    });
  }

  /* ---------- booking submit -> Little Hotelier ---------- */
  var bookingForm = doc.querySelector('[data-booking-form]');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      /* NOTE: Little Hotelier's check-in/check-out URL parameter format is not
         confirmed. Dates are captured here and the engine opens; wire the real
         params in below once confirmed. */
      var base = 'https://app.littlehotelier.com/properties/jacksonvillagedirect';
      window.open(base, '_blank', 'noopener');
    });
  }

  /* ---------- dynamic year ---------- */
  var yearEl = doc.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
