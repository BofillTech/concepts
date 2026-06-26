/* ============================================================
   Big Pine Motel — main.js
   Bofill Technologies
   Vanilla ES6+ IIFE pattern.
   ============================================================ */

(function () {
  'use strict';

  // ---------- Sticky nav background ----------
  var nav = document.getElementById('topnav');
  var onScroll = function () {
    if (window.scrollY > 60) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile menu ----------
  var links = document.getElementById('navlinks');
  var toggle = document.getElementById('menutoggle');

  function openMenu() {
    links.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-locked');
  }
  function closeMenu() {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
  }
  toggle.addEventListener('click', function () {
    if (links.classList.contains('is-open')) closeMenu();
    else openMenu();
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && links.classList.contains('is-open')) closeMenu();
  });

  // ---------- Booking bar dates ----------
  var ci = document.getElementById('checkin');
  var co = document.getElementById('checkout');
  var fmt = function (d) { return d.toISOString().split('T')[0]; };

  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  ci.value = fmt(today);
  ci.min = fmt(today);
  co.value = fmt(tomorrow);
  co.min = fmt(tomorrow);

  ci.addEventListener('change', function (e) {
    var newCheckin = new Date(e.target.value);
    var next = new Date(newCheckin);
    next.setDate(newCheckin.getDate() + 1);
    co.min = fmt(next);
    if (new Date(co.value) <= newCheckin) co.value = fmt(next);
  });

  // ---------- Booking bar submit ----------
  var bookingbar = document.getElementById('bookingbar');
  bookingbar.addEventListener('submit', function (e) {
    e.preventDefault();
    var checkin = ci.value;
    var checkout = co.value;
    var guests = document.getElementById('guests').value;
    var url = 'https://availabilityonline.com/availability_search.php?un=bigpinemotel&origin=gha&checkin=' +
              encodeURIComponent(checkin) +
              '&checkout=' + encodeURIComponent(checkout) +
              '&numpeople=' + encodeURIComponent(guests);
    window.open(url, '_blank', 'noopener');
  });

  // ---------- Dynamic year in footer ----------
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ---------- IntersectionObserver reveals (optional) ----------
  // Soft fade-up for story rows + room cards as they enter view.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.story__row, .room-card, .ame-cell').forEach(function (el) {
      io.observe(el);
    });
  }
})();
