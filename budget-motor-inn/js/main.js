(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var menuBtn = document.querySelector('.deskbar__menu');
  var sheet = document.getElementById('deskbar-sheet');

  if (menuBtn && sheet) {
    menuBtn.addEventListener('click', function () {
      var open = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!open));
      sheet.hidden = open;
    });

    sheet.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        menuBtn.setAttribute('aria-expanded', 'false');
        sheet.hidden = true;
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !sheet.hidden) {
        menuBtn.setAttribute('aria-expanded', 'false');
        sheet.hidden = true;
        menuBtn.focus();
      }
    });
  }

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
