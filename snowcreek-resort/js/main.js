(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sticky nav shadow on scroll
  var header = document.querySelector('[data-nav]');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu toggle — reveals both link groups stacked under the header
  var toggle = document.querySelector('[data-menu-toggle]');
  var groups = document.querySelectorAll('.site-header__group');
  if (toggle && groups.length) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      groups.forEach(function (group) {
        group.classList.toggle('is-open');
      });
    });
  }

  // Single orchestrated motion moment: gentle parallax on the hero photo
  if (!reduceMotion) {
    var heroImg = document.querySelector('[data-parallax] img');
    if (heroImg) {
      var updateParallax = function () {
        var offset = Math.min(window.scrollY * 0.15, 80);
        heroImg.style.transform = 'translateY(' + offset + 'px)';
      };
      document.addEventListener('scroll', updateParallax, { passive: true });
      updateParallax();
    }
  }
})();
