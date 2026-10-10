(function () {
  'use strict';
  var header = document.querySelector('.site-header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var nav = document.querySelector('.site-nav');
  var toggle = document.querySelector('.menu-toggle');
  if (nav && toggle) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    };
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setOpen(false); } });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) { setOpen(false); } });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1024) { setOpen(false); } });
  }

  var handleError = function (img) {
    var fallback = img.getAttribute('data-fallback');
    if (fallback && img.src !== fallback) {
      img.removeAttribute('data-fallback');
      img.src = fallback;
    } else {
      img.classList.add('img-missing');
    }
  };
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () { handleError(img); });
    if (img.complete && img.naturalWidth === 0 && img.src) { handleError(img); }
  });
})();
