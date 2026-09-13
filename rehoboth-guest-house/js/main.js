(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  /* sticky header shadow */
  var head = document.getElementById('siteHead');
  var onScroll = function () {
    if (window.scrollY > 12) head.classList.add('site-head--scrolled');
    else head.classList.remove('site-head--scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile drawer */
  var toggle = document.getElementById('navToggle');
  var drawer = document.getElementById('drawer');
  function closeDrawer() {
    drawer.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openDrawer() {
    drawer.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      if (drawer.hidden) openDrawer(); else closeDrawer();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !drawer.hidden) closeDrawer();
  });
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeDrawer);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024 && !drawer.hidden) closeDrawer();
  });

  /* room register hover/focus preview */
  var previewImg = document.getElementById('previewImg');
  var previewCap = document.getElementById('previewCap');
  var rooms = document.querySelectorAll('.room');
  rooms.forEach(function (r) {
    var setPreview = function () {
      var photo = r.getAttribute('data-photo');
      var name = r.getAttribute('data-name');
      if (photo && previewImg) {
        previewImg.src = photo;
        previewImg.alt = name || 'A guest room at the Rehoboth Guest House';
      }
      if (previewCap && name) previewCap.textContent = name + ' — see photos & details.';
      rooms.forEach(function (o) { o.classList.remove('is-active'); });
      r.classList.add('is-active');
    };
    r.addEventListener('mouseenter', setPreview);
    r.addEventListener('focus', setPreview);
  });

  /* booking bar: reveal after hero, sensible default dates */
  var bar = document.getElementById('bookbar');
  var ci = document.getElementById('ciDate');
  var co = document.getElementById('coDate');
  var heroEl = document.querySelector('.hero');

  function pad(n) { return String(n).padStart(2, '0'); }
  function toISO(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }

  if (ci && co) {
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    ci.value = toISO(today);
    co.value = toISO(tomorrow);
    ci.addEventListener('change', function () {
      var next = new Date(ci.value);
      next.setDate(next.getDate() + 1);
      co.min = toISO(next);
      if (co.value <= ci.value) co.value = toISO(next);
    });
  }

  if (bar && heroEl && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        bar.hidden = entry.isIntersecting;
      });
    }, { rootMargin: '-10% 0px 0px 0px' });
    io.observe(heroEl);
  } else if (bar) {
    bar.hidden = false;
  }

  /* broken-image fallback: hide gracefully rather than show a broken icon */
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function () {
      img.closest('.plate').style.background = '#2B1B28';
      img.style.display = 'none';
    }, { once: true });
  });

  /* dynamic year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
