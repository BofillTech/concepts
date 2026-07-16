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
    var setMenuState = function (open) {
      menu.classList.toggle('open', open);
      document.body.classList.toggle('no-scroll', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', function () {
      setMenuState(!menu.classList.contains('open'));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        setMenuState(false);
      });
    });
    // Close menu on Escape for keyboard users
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        setMenuState(false);
        toggle.focus();
      }
    });
  }

  // Year
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
