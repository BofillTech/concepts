/* =========================================================================
   Finger Lakes Lodging — concept behaviours
   Vanilla ES6+, single IIFE. No libraries. No inline handlers.
   All visual state is expressed as class toggles / attributes — never
   element.style — so the stylesheet stays the single source of truth.
   ========================================================================= */
(function () {
  'use strict';

  var doc = document;
  var body = doc.body;

  body.classList.remove('no-js');

  /* ---------------------------------------------------------------------
     BOOKING ENGINE HOOK
     The live engine is Agilysys "onecart". Its published deep link opens the
     property's calendar; the query-parameter names it accepts for arrival /
     departure / occupancy are NOT documented publicly and were not confirmed
     against a live booking. Until they are, the bar opens the engine cleanly
     and the chosen dates are carried no further.
     TO WIRE UP: set ENGINE_ACCEPTS_DATES to true and correct the three key
     names below once a real booking has been watched in the network tab.
     --------------------------------------------------------------------- */
  var ENGINE_URL = 'https://book.onagilysys.com/onecart/wbe/calendar/2230/fingerlakeslodging/FLLROOM';
  var ENGINE_ACCEPTS_DATES = false;
  var ENGINE_KEYS = { arrive: 'arrivalDate', depart: 'departureDate', guests: 'adults' };

  /* ---------- sticky header ---------- */
  var header = doc.getElementById('site-header');
  var bar = doc.getElementById('booking-bar');
  var hero = doc.querySelector('.hero');

  function onScroll() {
    var y = window.pageYOffset || doc.documentElement.scrollTop;
    if (header) { header.classList.toggle('is-scrolled', y > 12); }
    if (bar) {
      var trigger = hero ? hero.offsetHeight * 0.7 : 400;
      bar.classList.toggle('is-visible', y > trigger);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile drawer ---------- */
  var burger = doc.getElementById('burger');
  var drawer = doc.getElementById('drawer');
  var drawerClose = doc.getElementById('drawer-close');

  function openDrawer() {
    if (!drawer) { return; }
    drawer.removeAttribute('hidden');
    body.classList.add('is-locked');
    if (burger) { burger.setAttribute('aria-expanded', 'true'); }
    if (drawerClose) { drawerClose.focus(); }
  }

  function closeDrawer() {
    if (!drawer || drawer.hasAttribute('hidden')) { return; }
    drawer.setAttribute('hidden', '');
    body.classList.remove('is-locked');
    if (burger) {
      burger.setAttribute('aria-expanded', 'false');
      burger.focus();
    }
  }

  if (burger) { burger.addEventListener('click', openDrawer); }
  if (drawerClose) { drawerClose.addEventListener('click', closeDrawer); }
  if (drawer) {
    Array.prototype.forEach.call(drawer.querySelectorAll('a'), function (a) {
      a.addEventListener('click', closeDrawer);
    });
  }
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') { closeDrawer(); }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1040) { closeDrawer(); }
  });

  /* ---------- reveals (subtle fade) ---------- */
  var revealables = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  }

  /* ---------- logo fallback ---------- */
  Array.prototype.forEach.call(doc.querySelectorAll('.site-brand-mark, .footer-mark'), function (img) {
    img.addEventListener('error', function () {
      img.setAttribute('hidden', '');
      var fallback = doc.querySelector('.site-brand-fallback');
      if (fallback) { fallback.removeAttribute('hidden'); }
    });
  });

  /* ---------- booking bar dates ---------- */
  function iso(date) {
    var m = String(date.getMonth() + 1);
    var d = String(date.getDate());
    if (m.length < 2) { m = '0' + m; }
    if (d.length < 2) { d = '0' + d; }
    return date.getFullYear() + '-' + m + '-' + d;
  }

  var checkin = doc.getElementById('checkin');
  var checkout = doc.getElementById('checkout');
  var guests = doc.getElementById('guests');
  var go = doc.getElementById('booking-go');

  if (checkin && checkout) {
    var today = new Date();
    var tomorrow = new Date(today.getTime() + 86400000);

    checkin.value = iso(today);
    checkin.min = iso(today);
    checkout.value = iso(tomorrow);
    checkout.min = iso(tomorrow);

    checkin.addEventListener('change', function () {
      if (!checkin.value) { return; }
      var next = new Date(checkin.value + 'T00:00:00');
      next.setDate(next.getDate() + 1);
      checkout.min = iso(next);
      if (!checkout.value || checkout.value <= checkin.value) {
        checkout.value = iso(next);
      }
    });
  }

  function engineHref() {
    if (!ENGINE_ACCEPTS_DATES) { return ENGINE_URL; }
    var parts = [];
    if (checkin && checkin.value) { parts.push(ENGINE_KEYS.arrive + '=' + encodeURIComponent(checkin.value)); }
    if (checkout && checkout.value) { parts.push(ENGINE_KEYS.depart + '=' + encodeURIComponent(checkout.value)); }
    if (guests && guests.value) { parts.push(ENGINE_KEYS.guests + '=' + encodeURIComponent(guests.value)); }
    return parts.length ? ENGINE_URL + '?' + parts.join('&') : ENGINE_URL;
  }

  if (go) {
    go.addEventListener('click', function () {
      go.setAttribute('href', engineHref());
    });
  }

  /* ---------- footer year ---------- */
  var year = doc.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
