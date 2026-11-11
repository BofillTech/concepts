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

  function check(el) {
    if (!el.hasAttribute('required')) return true;
    if (el.type === 'checkbox' || el.type === 'radio') return el.checked;
    return String(el.value || '').trim().length > 0 && el.checkValidity();
  }

  Array.prototype.forEach.call(doc.querySelectorAll('.js-preview-form'), function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var hp = form.querySelector('input[name="website"]');
      if (hp && hp.value) return;
      var fields = Array.prototype.filter.call(form.querySelectorAll('input, select, textarea'), function (i) {
        return i.name !== 'website';
      });
      var bad = fields.filter(function (i) { return !check(i); });
      if (bad.length) {
        bad[0].focus();
        if (bad[0].reportValidity) bad[0].reportValidity();
        return;
      }
      var status = form.querySelector('[data-form-status]');
      if (status) {
        status.hidden = false;
        status.setAttribute('tabindex', '-1');
        status.focus();
      }
    });
  });

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
