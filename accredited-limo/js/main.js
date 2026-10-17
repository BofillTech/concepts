/* Accredited Limousine Service — homepage behavior (vanilla ES6, no dependencies) */
(function () {
  'use strict';

  var dataLayer = (window.dataLayer = window.dataLayer || []);
  function track(event, params) {
    var payload = { event: event };
    if (params) { Object.keys(params).forEach(function (k) { payload[k] = params[k]; }); }
    dataLayer.push(payload);
  }

  /* ---- Navigation ---- */
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('primary-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
    });
  }
  document.querySelectorAll('.menu-item__toggle').forEach(function (btn) {
    var sub = document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if (sub) { sub.classList.toggle('is-open', !open); }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') { return; }
    document.querySelectorAll('.menu-item__toggle[aria-expanded="true"]').forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
      var sub = document.getElementById(btn.getAttribute('aria-controls'));
      if (sub) { sub.classList.remove('is-open'); }
      btn.focus();
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.menu-item__toggle[aria-expanded="true"]').forEach(function (btn) {
      if (!btn.parentElement.contains(e.target)) {
        btn.setAttribute('aria-expanded', 'false');
        var sub = document.getElementById(btn.getAttribute('aria-controls'));
        if (sub) { sub.classList.remove('is-open'); }
      }
    });
  });

  /* ---- Live New York time (the "a real person answers" clock) ---- */
  var clocks = document.querySelectorAll('.js-ny-time');
  function tick() {
    var t;
    try {
      t = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' }).format(new Date());
    } catch (err) { t = ''; }
    clocks.forEach(function (el) { el.textContent = t; });
  }
  if (clocks.length) { tick(); setInterval(tick, 15000); }

  /* ---- Year ---- */
  document.querySelectorAll('.js-year').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ---- Tracking hooks (no personal data, no trip details) ---- */
  document.querySelectorAll('.js-call').forEach(function (a) {
    a.addEventListener('click', function () { track('click_call', { phone_number: a.getAttribute('data-number') }); });
  });
  document.querySelectorAll('.js-book').forEach(function (a) {
    a.addEventListener('click', function () { track('click_book'); });
  });
  document.querySelectorAll('.js-outbound-hv').forEach(function (a) {
    a.addEventListener('click', function () { track('outbound_hudson_valley'); });
  });
  /* Booking forms: hero, header bar, sticky bar. All submit to the same Limo Anywhere flow. */
  var today = new Date();
  var minDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
  document.querySelectorAll('.js-date-min').forEach(function (el) { el.min = minDate; });
  var quoteStarted = false;
  document.querySelectorAll('.js-quote-form').forEach(function (form) {
    form.addEventListener('focusin', function () {
      if (!quoteStarted) { quoteStarted = true; track('quote_start', { source: form.getAttribute('data-source') }); }
    });
    form.addEventListener('submit', function () { track('click_book', { source: form.getAttribute('data-source') }); });
  });

  /* Sticky booking bar */
  var dock = document.getElementById('booking-dock');
  var heroForm = document.getElementById('quick-quote');
  var dockToggle = document.querySelector('.dock__toggle');
  var dockForm = document.getElementById('dock-form');
  if (dock && heroForm && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var past = !en.isIntersecting && en.boundingClientRect.bottom < 0;
        dock.classList.toggle('is-visible', past);
      });
    }).observe(heroForm);
  } else if (dock) {
    dock.classList.add('is-visible');
  }
  if (dockToggle && dockForm) {
    dockToggle.addEventListener('click', function () {
      var open = dockToggle.getAttribute('aria-expanded') === 'true';
      dockToggle.setAttribute('aria-expanded', String(!open));
      dockToggle.textContent = open ? 'Book a ride' : 'Close';
      dock.classList.toggle('is-open', !open);
      if (!open) { track('click_book', { source: 'sticky_bar_mobile' }); var f = document.getElementById('d-pickup'); if (f) { f.focus(); } }
    });
  }

  /* Limo Anywhere reservation confirmation (iframe postMessage).
     Message format still to be verified with Limo Anywhere. Never forward PII. */
  window.addEventListener('message', function (e) {
    if (e.origin !== 'https://book.mylimobiz.com') { return; }
    // TODO: inspect the real confirmation payload, then: track('reservation_complete');
  });

  /* ---- Hero video: desktop only, after load, respects reduced motion + save-data ---- */
  var video = document.querySelector('.hero__video');
  var vToggle = document.querySelector('.hero__video-toggle');
  function canPlayVideo() {
    if (!video) { return false; }
    if (window.matchMedia('(max-width: 767px)').matches) { return false; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return false; }
    var c = navigator.connection;
    if (c && c.saveData) { return false; }
    return true;
  }
  function hasSource() {
    return !!(video && (video.getAttribute('data-webm') || video.getAttribute('data-mp4')));
  }
  function loadVideo() {
    if (!hasSource() || !canPlayVideo()) { return; }
    [['webm', 'video/webm'], ['mp4', 'video/mp4']].forEach(function (pair) {
      var src = video.getAttribute('data-' + pair[0]);
      if (!src) { return; }
      var s = document.createElement('source');
      s.src = src; s.type = pair[1];
      video.appendChild(s);
    });
    video.load();
    video.addEventListener('playing', function () { video.classList.add('is-playing'); }, { once: true });
    var p = video.play();
    if (p && p.catch) { p.catch(function () {}); }
    if (vToggle) {
      vToggle.hidden = false;
      vToggle.addEventListener('click', function () {
        if (video.paused) { video.play(); vToggle.textContent = 'Pause video'; vToggle.setAttribute('aria-pressed', 'false'); }
        else { video.pause(); vToggle.textContent = 'Play video'; vToggle.setAttribute('aria-pressed', 'true'); }
      });
    }
  }
  if (video) {
    var start = function () { ('requestIdleCallback' in window) ? window.requestIdleCallback(loadVideo, { timeout: 2500 }) : setTimeout(loadVideo, 1200); };
    if (document.readyState === 'complete') { start(); } else { window.addEventListener('load', start); }
  }
}());
