/* The Olympia Lodge — Things to Do · concept #79 · Bofill Technologies
   Vanilla ES6+ IIFE. Sticky nav, mobile drawer, scroll reveals, dynamic year. */
(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (nav) { nav.classList.toggle('is-scrolled', window.scrollY > 40); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var drawer = document.getElementById('drawer');
  var toggle = document.getElementById('navToggle');
  var close = document.getElementById('drawerClose');

  var openDrawer = function () {
    if (!drawer) { return; }
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    if (toggle) { toggle.setAttribute('aria-expanded', 'true'); }
  };
  var closeDrawer = function () {
    if (!drawer) { return; }
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    if (toggle) { toggle.setAttribute('aria-expanded', 'false'); }
  };

  if (toggle) { toggle.addEventListener('click', openDrawer); }
  if (close) { close.addEventListener('click', closeDrawer); }
  if (drawer) {
    Array.prototype.forEach.call(drawer.querySelectorAll('a'), function (a) {
      a.addEventListener('click', closeDrawer);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeDrawer(); }
  });

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
  }

  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
