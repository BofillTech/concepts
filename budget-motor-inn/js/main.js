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
})();
