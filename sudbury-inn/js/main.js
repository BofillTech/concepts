(function () {
  'use strict';
  var header = document.querySelector('.site-header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var nav = document.querySelector('.site-nav');
  var toggle = document.querySelector('.menu-toggle');
  if (nav && toggle) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    };
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setOpen(false); } });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) { setOpen(false); } });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1024) { setOpen(false); } });
  }

  // Booking bar: default dates and keep check-out after check-in
  var form = document.querySelector('.book-bar');
  if (form) {
    var inEl = form.querySelector('input[name="start_date"]');
    var outEl = form.querySelector('input[name="end_date"]');
    var iso = function (d) {
      var m = String(d.getMonth() + 1).padStart(2, '0');
      var day = String(d.getDate()).padStart(2, '0');
      return d.getFullYear() + '-' + m + '-' + day;
    };
    var addDays = function (str, n) {
      var p = str.split('-');
      var d = new Date(+p[0], +p[1] - 1, +p[2]);
      d.setDate(d.getDate() + n);
      return iso(d);
    };
    var today = iso(new Date());
    inEl.min = today;
    inEl.value = addDays(today, 1);
    outEl.min = addDays(inEl.value, 1);
    outEl.value = addDays(inEl.value, 2);
    inEl.addEventListener('change', function () {
      if (!inEl.value) { return; }
      outEl.min = addDays(inEl.value, 1);
      if (!outEl.value || outEl.value <= inEl.value) { outEl.value = addDays(inEl.value, 1); }
    });
  }

  // Hero slider
  var slider = document.querySelector('.hero__slides');
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.hero__bg'));
    var dots = Array.prototype.slice.call(document.querySelectorAll('.hero__dot'));
    var pauseBtn = document.querySelector('.hero__pause');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var current = 0;
    var timer = null;
    var paused = reduce;
    var show = function (i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        var on = k === current;
        s.classList.toggle('is-active', on);
        if (on) { s.removeAttribute('aria-hidden'); } else { s.setAttribute('aria-hidden', 'true'); }
      });
      dots.forEach(function (d, k) {
        d.classList.toggle('is-active', k === current);
        if (k === current) { d.setAttribute('aria-current', 'true'); } else { d.removeAttribute('aria-current'); }
      });
    };
    var stop = function () { if (timer) { clearInterval(timer); timer = null; } };
    var start = function () { stop(); if (!paused) { timer = setInterval(function () { show(current + 1); }, 6000); } };
    document.querySelectorAll('.hero__arrow').forEach(function (b) {
      b.addEventListener('click', function () { show(current + Number(b.getAttribute('data-dir'))); start(); });
    });
    dots.forEach(function (d, k) { d.addEventListener('click', function () { show(k); start(); }); });
    if (pauseBtn) {
      var syncPause = function () {
        pauseBtn.textContent = paused ? 'Play' : 'Pause';
        pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
      };
      syncPause();
      pauseBtn.addEventListener('click', function () { paused = !paused; syncPause(); start(); });
    }
    var hero = slider.parentElement;
    hero.addEventListener('mouseenter', stop);
    hero.addEventListener('mouseleave', start);
    hero.addEventListener('focusin', stop);
    hero.addEventListener('focusout', start);
    start();
  }

  // Image fallback
  var handleError = function (img) {
    var fallback = img.getAttribute('data-fallback');
    if (fallback && img.src !== fallback) {
      img.removeAttribute('data-fallback');
      img.src = fallback;
    } else {
      img.classList.add('img-missing');
    }
  };
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () { handleError(img); });
    if (img.complete && img.naturalWidth === 0 && img.src) { handleError(img); }
  });
})();
