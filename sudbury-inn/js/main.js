(function () {
  'use strict';
  var header = document.querySelector('.site-header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  var markMissing = function (img) { img.classList.add('img-missing'); };
  document.querySelectorAll('img').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) { markMissing(img); }
    img.addEventListener('error', function () { markMissing(img); });
  });
})();
