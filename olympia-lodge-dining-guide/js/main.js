/* The Olympia Lodge — Dining Guide · concept #81 · Bofill Technologies
   Vanilla ES6+ IIFE. Sticky nav, mobile drawer, scroll reveals, year, meal filter. */
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
  var closeBtn = document.getElementById('drawerClose');

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
  if (closeBtn) { closeBtn.addEventListener('click', closeDrawer); }
  if (drawer) {
    Array.prototype.forEach.call(drawer.querySelectorAll('a'), function (a) {
      a.addEventListener('click', closeDrawer);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeDrawer(); }
  });

  // Scroll reveals
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
  }

  // Meal filter
  var buttons = document.querySelectorAll('.filter__btn');
  var dishes = document.querySelectorAll('.dish');
  var countEl = document.getElementById('diningCount');
  var updateCount = function (n) {
    if (countEl) { countEl.textContent = n + (n === 1 ? ' place' : ' places') + ' to eat'; }
  };
  var applyFilter = function (meal) {
    var shown = 0;
    Array.prototype.forEach.call(dishes, function (d) {
      var meals = (d.getAttribute('data-meals') || '');
      var match = (meal === 'all') || meals.indexOf(meal) !== -1;
      d.classList.toggle('is-hidden', !match);
      if (match) { shown++; }
    });
    updateCount(shown);
  };
  Array.prototype.forEach.call(buttons, function (btn) {
    btn.addEventListener('click', function () {
      Array.prototype.forEach.call(buttons, function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      applyFilter(btn.getAttribute('data-filter'));
    });
  });
  updateCount(dishes.length);

  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
