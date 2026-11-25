/* Madison Resort Wildwood Crest — concept #208 */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.remove('no-js');
  doc.classList.add('js');

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-navigation');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && window.matchMedia('(max-width: 1023px)').matches) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
  }

  // Highlight current section in the rail
  var links = Array.prototype.slice.call(document.querySelectorAll('.menu-item a[href^="#"]'));
  if ('IntersectionObserver' in window && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a.parentElement; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (a) { a.parentElement.classList.remove('current-menu-item'); });
          map[en.target.id].classList.add('current-menu-item');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) { io.observe(el); } });
  }

  // Booking bar -> Cloudbeds with dates
  var form = document.getElementById('booking-bar');
  var inEl = document.getElementById('bb-in');
  var outEl = document.getElementById('bb-out');
  var iso = function (d) { return d.toISOString().slice(0, 10); };
  if (form && inEl && outEl) {
    var today = new Date();
    inEl.min = iso(today);
    outEl.min = iso(new Date(today.getTime() + 864e5));
    inEl.addEventListener('change', function () {
      if (!inEl.value) { return; }
      var next = new Date(inEl.value + 'T12:00:00');
      next.setDate(next.getDate() + 1);
      outEl.min = iso(next);
      if (!outEl.value || outEl.value <= inEl.value) { outEl.value = iso(next); }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var url = 'https://hotels.cloudbeds.com/en/reservation/1HRxVo?currency=usd';
      if (inEl.value && outEl.value) { url += '#checkin=' + inEl.value + '&checkout=' + outEl.value; }
      window.location.href = url;
    });
  }

  var y = document.querySelector('[data-year]');
  if (y) { y.textContent = String(new Date().getFullYear()); }
})();
