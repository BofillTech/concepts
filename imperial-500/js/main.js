/* Imperial 500 Motel — concept by Bofill Technologies */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  /* Sticky header shadow */
  var head = document.getElementById('siteHead');
  var onScroll = function () {
    if (head) head.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Drawer */
  var toggle = document.querySelector('[data-drawer-toggle]');
  var drawer = document.getElementById('drawer');
  var setDrawer = function (open) {
    if (!toggle || !drawer) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) { drawer.removeAttribute('hidden'); } else { drawer.setAttribute('hidden', ''); }
    document.body.classList.toggle('drawer-open', open);
  };
  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      setDrawer(toggle.getAttribute('aria-expanded') !== 'true');
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('[data-drawer-link]')) setDrawer(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setDrawer(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1200) setDrawer(false);
    });
  }

  /* Image fallback — failed photos hide so the branded plate shows */
  Array.prototype.forEach.call(document.querySelectorAll('[data-plate]'), function (img) {
    img.addEventListener('error', function () {
      img.setAttribute('hidden', '');
    });
  });

  /* Brand image fallback — swap to wordmark if the logo fails */
  Array.prototype.forEach.call(document.querySelectorAll('[data-brand-img]'), function (img) {
    img.addEventListener('error', function () {
      img.setAttribute('hidden', '');
      var word = img.parentNode.querySelector('[data-brand-word]');
      if (word) word.removeAttribute('hidden');
    });
  });

  /* Staggered reveals */
  var reveals = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduced) {
    var pending = [];
    var flush = function () {
      pending.forEach(function (el, i) {
        window.setTimeout(function () { el.classList.add('is-in'); }, i * 90);
      });
      pending = [];
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          pending.push(entry.target);
          io.unobserve(entry.target);
        }
      });
      if (pending.length) flush();
    }, { rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
  }

  /* Bottom reserve bar — reveals once the hero scrolls out */
  var bar = document.getElementById('bookBar');
  var hero = document.querySelector('.hero');
  if (bar && hero && 'IntersectionObserver' in window) {
    var barIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        bar.classList.toggle('is-visible', !entry.isIntersecting);
      });
    }, { threshold: 0.05 });
    barIo.observe(hero);
  } else if (bar) {
    bar.classList.add('is-visible');
  }

  /* Dynamic year */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
