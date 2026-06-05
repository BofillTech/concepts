(function () {
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
(function () {
  var btn = document.getElementById('menuToggle');
  var menu = document.getElementById('mobileMenu');
  var icon = document.getElementById('menuIcon');
  var open = false;
  btn.addEventListener('click', function () {
    open = !open;
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    icon.innerHTML = open
      ? '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
      : '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
  });
})();
(function () {
  var flyouts = document.querySelectorAll('.nav-flyout');
  flyouts.forEach(function (wrap) {
    var btn = wrap.querySelector('.nav-flyout-btn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var nowOpen = !wrap.classList.contains('open');
      // close all flyouts before toggling
      flyouts.forEach(function (other) {
        other.classList.remove('open');
        var b = other.querySelector('.nav-flyout-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      wrap.classList.toggle('open', nowOpen);
      btn.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function () {
    flyouts.forEach(function (wrap) {
      wrap.classList.remove('open');
      var b = wrap.querySelector('.nav-flyout-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });
})();
(function () {
  var bar = document.getElementById('bottomBar');
  var hero = document.querySelector('.hero, .page-hero');
  if (!bar) return;
  function update() {
    if (!hero) { bar.classList.add('visible'); return; }
    var heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom < 120) bar.classList.add('visible');
    else bar.classList.remove('visible');
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
(function () {
  var form = document.getElementById('bookForm');
  if (!form) return;
  var ci = document.getElementById('bb-checkin');
  var co = document.getElementById('bb-checkout');
  var btn = form.querySelector('.bb-cta');
  var bookUrl = btn.getAttribute('data-book-url');
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  var today = new Date();
  var tomorrow = new Date(today.getTime() + 86400000);
  ci.min = ymd(today);
  co.min = ymd(tomorrow);
  ci.addEventListener('change', function () {
    if (!ci.value) return;
    var d = new Date(ci.value + 'T00:00:00');
    d.setDate(d.getDate() + 1);
    co.min = ymd(d);
    if (co.value && co.value <= ci.value) co.value = '';
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var url = bookUrl;
    var params = [];
    if (ci.value) params.push('check-in=' + encodeURIComponent(ci.value));
    if (co.value) params.push('check-out=' + encodeURIComponent(co.value));
    if (params.length) url += (url.indexOf('?') > -1 ? '&' : '?') + params.join('&');
    window.open(url, '_blank', 'noopener');
  });
})();
(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fade-in').forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in').forEach(function (el) { io.observe(el); });
})();
(function () {
  var tabs = document.querySelectorAll('[data-tab-group]');
  tabs.forEach(function (group) {
    var buttons = group.querySelectorAll('.tab-btn');
    var panels = group.querySelectorAll('.tab-panel');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        buttons.forEach(function (b) { b.classList.toggle('active', b === btn); });
        panels.forEach(function (p) { p.classList.toggle('active', p.getAttribute('data-panel') === target); });
      });
    });
  });
})();
(function () {
  var lb = document.getElementById('lightbox');
  if (!lb) return;
  var img = lb.querySelector('img');
  var closeBtn = lb.querySelector('.lb-close');
  document.querySelectorAll('[data-lightbox]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      img.src = a.getAttribute('href') || a.getAttribute('data-lightbox');
      lb.classList.add('open');
    });
  });
  function close() { lb.classList.remove('open'); img.src = ''; }
  closeBtn.addEventListener('click', close);
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ============================================================
   Form handlers (registered conditionally by ID)
   ============================================================ */
(function () {
  function bind(id, label) {
    var f = document.getElementById(id);
    if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you — your ' + label + ' inquiry has been received. We will follow up shortly. (Concept demo)');
    });
  }
  bind('contactForm',  'message');
  bind('eventsForm',   'event');
  bind('weddingsForm', 'wedding');
  bind('resalesForm',  'resales');
})();
