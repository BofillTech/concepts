/* Ambassadors Inn & Suites — concept by Bofill Technologies */
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

  /* Image fallback — failed photos hide so the navy plate shows */
  Array.prototype.forEach.call(document.querySelectorAll('[data-plate]'), function (img) {
    img.addEventListener('error', function () {
      img.setAttribute('hidden', '');
    });
  });

  /* Brand fallback — swap to wordmark if the logo fails */
  Array.prototype.forEach.call(document.querySelectorAll('[data-brand-img]'), function (img) {
    img.addEventListener('error', function () {
      img.setAttribute('hidden', '');
      var word = img.parentNode.querySelector('[data-brand-word]');
      if (word) word.removeAttribute('hidden');
    });
  });

  /* Staggered reveal */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var siblings = Array.prototype.filter.call(
            el.parentNode.children,
            function (c) { return c.classList && c.classList.contains('reveal'); }
          );
          var idx = siblings.indexOf(el);
          el.style.transitionDelay = (idx > 0 ? Math.min(idx * 90, 360) : 0) + 'ms';
          el.classList.add('is-in');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
  }

  /* Footer year */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
