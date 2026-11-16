(function () {
  var doc = document;
  doc.documentElement.classList.add('js');

  var header = doc.querySelector('.site-header');
  var toggle = doc.querySelector('.menu-toggle');
  var nav = doc.querySelector('#site-navigation');
  if (toggle && header && nav) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        header.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    Array.prototype.forEach.call(doc.querySelectorAll('.reveal'), function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(doc.querySelectorAll('.reveal'), function (el) { el.classList.add('is-in'); });
  }
})();
