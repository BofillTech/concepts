(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Apply photo slots from js/photos.js */
  var photos = window.SEA_CLIFF_PHOTOS || {};
  var showSlots = /[?&]slots\b/.test(window.location.search);
  document.querySelectorAll('img[data-photo]').forEach(function (img) {
    var slot = img.getAttribute('data-photo');
    var p = photos[slot];
    if (p) {
      if (p.src && img.getAttribute('src') !== p.src) { img.src = p.src; }
      if (typeof p.alt === 'string') { img.alt = p.alt; }
    }
    var markMissing = function () { img.classList.add('img-missing'); };
    if (img.complete && img.naturalWidth === 0) { markMissing(); }
    img.addEventListener('error', markMissing);
    if (showSlots && img.parentElement) {
      var tag = document.createElement('span');
      tag.className = 'slot-tag';
      tag.textContent = slot;
      var n = img.parentElement.querySelectorAll('.slot-tag').length;
      tag.style.marginTop = (n * 1.9) + 'rem';
      img.parentElement.appendChild(tag);
    }
  });

  /* 2. Header state on scroll */
  var header = document.querySelector('.site-header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 3. Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-navigation--left');
  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      toggle.focus();
    }
  });

  /* 4. Room cards: room <-> view */
  document.querySelectorAll('.room__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(on));
      btn.textContent = on ? btn.dataset.labelOn : btn.dataset.labelOff;
      btn.closest('.room').classList.toggle('is-alt', on);
    });
  });

  /* 5. Gentle parallax on framed photos and colour plates */
  var layers = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (!reduceMotion && layers.length) {
    var ticking = false;
    var update = function () {
      var vh = window.innerHeight;
      layers.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) { return; }
        var offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
        el.style.setProperty('--py', offset.toFixed(1) + 'px');
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  var y = document.querySelector('[data-year]');
  if (y) { y.textContent = new Date().getFullYear(); }
})();
