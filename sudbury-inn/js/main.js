(function () {
  'use strict';
  var header = document.querySelector('.site-header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
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
