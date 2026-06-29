// =========================================================
// Courtney's Place Key West — Shared interactions
// =========================================================
(function () {
  'use strict';

  // Sticky nav background swap (only for pages with a hero overlay)
  var nav = document.getElementById('nav');
  if (nav && nav.classList.contains('is-hero')) {
    var onScroll = function () {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
        nav.classList.remove('is-hero');
      } else {
        nav.classList.remove('scrolled');
        nav.classList.add('is-hero');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Year
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
