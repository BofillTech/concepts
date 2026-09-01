/* Village by the Sea — concept behaviour
   Vanilla ES6+, no libraries, no inline handlers, no .style assignments. */
(function () {
  'use strict';

  var BOOKING_URL = 'https://hotels.cloudbeds.com/reservation/IoseEY';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------- sticky header */
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------- hamburger-only nav (all sizes) */
  var toggle = document.getElementById('menuToggle');
  var drawer = document.getElementById('navDrawer');

  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('is-locked');
    document.body.classList.remove('is-locked');
    window.setTimeout(function () { drawer.hidden = true; }, 320);
  }

  function openDrawer() {
    if (!drawer) return;
    drawer.hidden = false;
    /* next frame so the opacity transition runs */
    window.requestAnimationFrame(function () {
      drawer.classList.add('is-open');
    });
    toggle.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('is-locked');
    document.body.classList.add('is-locked');
    var first = drawer.querySelector('.drawer__close') || drawer.querySelector('a');
    if (first) first.focus();
  }

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') { closeDrawer(); } else { openDrawer(); }
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeDrawer();
      if (e.target.closest('.drawer__close')) closeDrawer();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  /* --------------------------------------------------------- scroll reveals */
  var revealObserver = null;
  if (!reduced && 'IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  }

  function bindReveals() {
    var els = document.querySelectorAll('[data-reveal]:not(.is-in)');
    if (!revealObserver) {
      Array.prototype.forEach.call(els, function (el) { el.classList.add('is-in'); });
      return;
    }
    Array.prototype.forEach.call(els, function (el) { revealObserver.observe(el); });
  }
  bindReveals();

  /* client-rendered pages (unit.html) announce when their markup lands */
  document.addEventListener('vbts:rendered', bindReveals);

  /* ------------------------------------- reed divider draws itself (signature) */
  var reeds = document.querySelectorAll('[data-reeds]');
  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(reeds, function (el) { el.classList.add('is-drawn'); });
  } else {
    var reedObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-drawn');
          reedObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    Array.prototype.forEach.call(reeds, function (el) { reedObserver.observe(el); });
  }

  /* -------------------------------------------------------------- book bar */
  var bar = document.getElementById('bookbar');
  var checkin = document.querySelector('[data-checkin]');
  var checkout = document.querySelector('[data-checkout]');
  var guests = document.querySelector('[data-guests]');
  var bookBtn = document.querySelector('[data-book]');

  function iso(d) { return d.toISOString().slice(0, 10); }

  if (checkin && checkout) {
    var today = new Date();
    var tomorrow = new Date(today.getTime() + 86400000);
    checkin.value = iso(today);
    checkin.min = iso(today);
    checkout.value = iso(tomorrow);
    checkout.min = iso(tomorrow);

    checkin.addEventListener('change', function () {
      var start = new Date(checkin.value + 'T00:00:00');
      var next = new Date(start.getTime() + 86400000);
      checkout.min = iso(next);
      if (!checkout.value || checkout.value <= checkin.value) checkout.value = iso(next);
    });
  }

  function openBooking() {
    var url = BOOKING_URL;
    var params = [];
    /* Cloudbeds accepts checkin / checkout / adults — confirm against a live
       booking if the engine ever rewrites these upstream. */
    if (checkin && checkin.value) params.push('checkin=' + encodeURIComponent(checkin.value));
    if (checkout && checkout.value) params.push('checkout=' + encodeURIComponent(checkout.value));
    if (guests && guests.value) params.push('adults=' + encodeURIComponent(guests.value));
    if (params.length) url += '?' + params.join('&');
    window.open(url, '_blank', 'noopener');
  }

  if (bookBtn) bookBtn.addEventListener('click', openBooking);

  /* reveal the bar once the hero has scrolled past */
  var hero = document.querySelector('.hero');
  if (bar && hero && 'IntersectionObserver' in window) {
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        bar.classList.toggle('is-visible', !entry.isIntersecting);
      });
    }, { threshold: 0, rootMargin: '-70% 0px 0px 0px' });
    barObserver.observe(hero);
  } else if (bar) {
    bar.classList.add('is-visible');
  }

  /* --------------------------------------------- weddings page inquiry form */
  var inquireBtn = document.querySelector('[data-inquire]');
  var inquireNote = document.querySelector('[data-inquire-note]');
  if (inquireBtn && inquireNote) {
    inquireBtn.addEventListener('click', function () {
      var name = document.getElementById('f-name');
      var email = document.getElementById('f-email');
      var date = document.getElementById('f-date');
      var guests = document.getElementById('f-guests');
      var note = document.getElementById('f-note');

      var lines = [];
      if (name && name.value) lines.push('Name: ' + name.value);
      if (date && date.value) lines.push('Date in mind: ' + date.value);
      if (guests && guests.value) lines.push('Approx. guests: ' + guests.value);
      if (note && note.value) lines.push('', note.value);

      var subject = 'Wedding inquiry' + (date && date.value ? ' — ' + date.value : '');
      var href = 'mailto:eventplanner@vbts.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(lines.join('\n'));

      /* Concept behaviour: hand off to the guest's mail client. On the live
         build this posts to the real form endpoint instead. */
      window.location.href = href;
      inquireNote.classList.add('is-sent');
      inquireNote.textContent = 'Opening your email app — if nothing happens, write to eventplanner@vbts.com or call 207-646-1100.';
      if (email && email.value) { /* captured for the live endpoint */ }
    });
  }

  /* ------------------------------------------------------------- dynamic year */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}());
