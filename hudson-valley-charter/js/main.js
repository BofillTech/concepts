(function () {
  'use strict';

  var toggle = document.querySelector('.rail__toggle');
  var nav = document.getElementById('primary-menu');
  if (!toggle || !nav) { return; }

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.textContent = open ? 'Close' : 'Menu';
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a') && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
    }
  });
})();
