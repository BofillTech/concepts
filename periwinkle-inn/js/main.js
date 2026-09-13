/* Periwinkle Inn — concept by Bofill Technologies */
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
      if (window.innerWidth >= 1024) setDrawer(false);
    });
  }

  /* Subtle-fade reveal — one orchestrated scroll motion */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    Array.prototype.forEach.call(revealEls, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(revealEls, function (el) { el.classList.add('is-visible'); });
  }

  /* Image fallback — failed photos hide so the cream/plum frame still holds its shape */
  Array.prototype.forEach.call(document.querySelectorAll('[data-plate]'), function (img) {
    img.addEventListener('error', function () {
      img.setAttribute('hidden', '');
    });
  });

  /* Footer year */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
