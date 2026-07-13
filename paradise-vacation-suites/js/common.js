// Shared helpers: promo-banner dismiss + data-bg background images
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.promo-banner-close');
  if (btn) { var b = document.getElementById('promoBanner'); if (b) b.classList.add('dismissed'); }
});
document.querySelectorAll('[data-bg]').forEach(function (el) {
  el.style.backgroundImage = "url('" + el.getAttribute('data-bg') + "')";
});
