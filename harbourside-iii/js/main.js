/* ==========================================================================
   Harbourside III concept — behaviour
   Vanilla ES6+, single IIFE. No inline handlers, no .style assignments.
   ========================================================================== */

(function () {
  'use strict';

  var doc = document;
  var BOOKING_URL = 'https://secure2.irm1.net/irmng/index.html?resort=91';

  /* ---------------------------------------------------------------- helpers */

  function on(el, type, fn) { if (el) { el.addEventListener(type, fn); } }
  function all(sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); }

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function addDays(d, n) {
    var out = new Date(d.getTime());
    out.setDate(out.getDate() + n);
    return out;
  }

  /* ------------------------------------------------------------ sticky nav */

  var header = doc.querySelector('.site-header');

  function onScroll() {
    if (!header) { return; }
    header.classList.toggle('is-stuck', window.scrollY > 8);
  }
  on(window, 'scroll', onScroll);
  onScroll();

  /* --------------------------------------------------------------- drawer */

  var burger = doc.querySelector('.burger');
  var drawer = doc.querySelector('.drawer');
  var closeBtn = doc.querySelector('.drawer__close');

  function setDrawer(open) {
    if (!drawer || !burger) { return; }
    drawer.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    doc.body.classList.toggle('is-locked', open);
    if (open) {
      var first = drawer.querySelector('a');
      if (first) { first.focus(); }
    } else {
      burger.focus();
    }
  }

  on(burger, 'click', function () {
    setDrawer(!drawer.classList.contains('is-open'));
  });
  on(closeBtn, 'click', function () { setDrawer(false); });

  all('.drawer__list a').forEach(function (link) {
    on(link, 'click', function () { setDrawer(false); });
  });

  on(doc, 'keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
      setDrawer(false);
    }
  });

  on(window, 'resize', function () {
    if (window.innerWidth >= 1024 && drawer && drawer.classList.contains('is-open')) {
      setDrawer(false);
    }
  });

  /* ---------------------------------------------------------- view picker */

  var tabs = all('.tab');
  var panels = all('.panel');

  function selectTab(index) {
    tabs.forEach(function (tab, i) {
      var active = i === index;
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.setAttribute('tabindex', active ? '0' : '-1');
    });
    panels.forEach(function (panel, i) {
      panel.classList.toggle('is-active', i === index);
      panel.hidden = i !== index;
    });
  }

  tabs.forEach(function (tab, i) {
    on(tab, 'click', function () { selectTab(i); });
    on(tab, 'keydown', function (e) {
      var next = -1;
      if (e.key === 'ArrowRight') { next = (i + 1) % tabs.length; }
      if (e.key === 'ArrowLeft') { next = (i - 1 + tabs.length) % tabs.length; }
      if (next > -1) {
        e.preventDefault();
        selectTab(next);
        tabs[next].focus();
      }
    });
  });

  if (tabs.length) { selectTab(0); }

  /* ------------------------------------------------------- scroll reveals */

  var revealables = all('.reveal');

  if ('IntersectionObserver' in window && revealables.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------------------------------------------------------- booking bar */

  var bar = doc.querySelector('.book-bar');
  var hero = doc.querySelector('.hero');
  var inEl = doc.getElementById('bb-in');
  var outEl = doc.getElementById('bb-out');
  var goEl = doc.querySelector('[data-book]');

  /* Harbourside III books Sunday-to-Sunday weeks, at least 14 days out,
     so the defaults land on the first bookable Sunday and the next. */
  function firstBookableSunday() {
    var d = addDays(new Date(), 14);
    while (d.getDay() !== 0) { d = addDays(d, 1); }
    return d;
  }

  if (inEl && outEl) {
    var start = firstBookableSunday();
    var end = addDays(start, 7);
    inEl.value = iso(start);
    inEl.min = iso(addDays(new Date(), 14));
    outEl.value = iso(end);
    outEl.min = iso(end);

    on(inEl, 'change', function () {
      if (!inEl.value) { return; }
      var picked = new Date(inEl.value + 'T00:00:00');
      var week = addDays(picked, 7);
      outEl.min = iso(addDays(picked, 1));
      if (!outEl.value || new Date(outEl.value + 'T00:00:00') <= picked) {
        outEl.value = iso(week);
      }
    });
  }

  function openBooking() {
    var url = BOOKING_URL;
    if (inEl && inEl.value) { url += '&checkin=' + encodeURIComponent(inEl.value); }
    if (outEl && outEl.value) { url += '&checkout=' + encodeURIComponent(outEl.value); }
    /* NOTE: the irm1 engine's own date-param names are unconfirmed — it opens
       to the correct resort either way. Confirm against a live booking and
       adjust the two keys above if the engine expects different names. */
    window.open(url, '_blank', 'noopener');
  }

  on(goEl, 'click', openBooking);

  if (bar) {
    if ('IntersectionObserver' in window && hero) {
      var barIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          bar.classList.toggle('is-up', !entry.isIntersecting);
        });
      }, { threshold: 0 });
      barIO.observe(hero);
    } else {
      bar.classList.add('is-up');
    }
  }

  /* ------------------------------------------------------- logo fallbacks */

  all('[data-logo]').forEach(function (img) {
    on(img, 'error', function () {
      var fb = img.parentNode.querySelector('.brand__fallback');
      img.hidden = true;
      if (fb) { fb.hidden = false; }
    });
  });

  /* ------------------------------------------------------------ footer yr */

  var yr = doc.getElementById('yr');
  if (yr) { yr.textContent = String(new Date().getFullYear()); }
}());
