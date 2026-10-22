/* Hudson Valley Charter Bus & Van Services — homepage JS (vanilla, no dependencies) */
(function () {
  'use strict';
  var doc = document;
  var PHASE1 = doc.body.getAttribute('data-phase') === '1'; // inner pages not built yet

  /* Footer year */
  var y = doc.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  /* Toast (Phase 1 preview notices) */
  var toast = doc.getElementById('toast');
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 4200);
  }

  /* Mobile menu */
  var toggle = doc.querySelector('.menu-toggle');
  var nav = doc.getElementById('primary-nav');
  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('is-open', open);
    doc.body.classList.toggle('nav-open', open);
    if (open) { var first = nav.querySelector('a'); if (first) first.focus(); }
  }
  if (toggle) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 1040) setMenu(false); });
  }

  /* Conversion events: hook for GA4 / Google Ads [[CONFIRM analytics]] */
  doc.addEventListener('click', function (e) {
    var cta = e.target.closest('[data-cta]');
    if (!cta) return;
    var name = cta.getAttribute('data-cta') === 'call' ? 'click_to_call' : 'quote_click';
    if (typeof window.gtag === 'function') window.gtag('event', name, { link_url: cta.getAttribute('href') || '' });
  });

  /* Trip ideas rail: prev/next buttons, disabled at the ends. No autoplay. */
  var rail = doc.getElementById('trip-rail');
  if (rail) {
    var prev = doc.querySelector('[data-rail="prev"]');
    var next = doc.querySelector('[data-rail="next"]');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function step() { var card = rail.querySelector('.trip-card'); return card ? card.getBoundingClientRect().width + 20 : 300; }
    function update() {
      var max = rail.scrollWidth - rail.clientWidth - 2;
      if (prev) prev.disabled = rail.scrollLeft <= 2;
      if (next) next.disabled = rail.scrollLeft >= max;
    }
    function go(dir) { rail.scrollBy({ left: dir * step(), behavior: reduce ? 'auto' : 'smooth' }); }
    if (prev) prev.addEventListener('click', function () { go(-1); });
    if (next) next.addEventListener('click', function () { go(1); });
    rail.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    });
    rail.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* Quick quote: validate, save, carry values to /get-a-quote/ */
  var form = doc.getElementById('quick-quote');
  var dateInput = doc.getElementById('qq-date');
  if (dateInput) {
    var t = new Date(); t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
    dateInput.min = t.toISOString().slice(0, 10);
  }
  function check(input) {
    var err = doc.getElementById(input.id + '-err');
    var ok = input.value.trim() !== '' && input.checkValidity();
    input.setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (err) err.hidden = ok;
    return ok;
  }
  if (form) {
    var inputs = Array.prototype.slice.call(form.querySelectorAll('input'));
    inputs.forEach(function (i) { i.addEventListener('blur', function () { if (i.value) check(i); }); });
    form.addEventListener('submit', function (e) {
      var bad = inputs.filter(function (i) { return !check(i); });
      if (bad.length) { e.preventDefault(); bad[0].focus(); return; }
      var data = {};
      inputs.forEach(function (i) { data[i.name] = i.value.trim(); });
      try { sessionStorage.setItem('hvc-quote-start', JSON.stringify(data)); } catch (err) { /* storage unavailable: URL params still carry the values */ }
      if (PHASE1) {
        e.preventDefault();
        var status = doc.getElementById('qq-status');
        var d = new Date(data.date + 'T12:00:00');
        var nice = isNaN(d) ? data.date : d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        var msg = 'Got it: ' + data.passengers + ' passengers on ' + nice + ' from ' + data.pickup_town +
          '. On the live site this opens Get a Quote with these details filled in (that page is built in Phase 2).';
        if (status) status.textContent = msg;
      }
      // Otherwise the form submits normally: /get-a-quote/?passengers=..&date=..&pickup_town=..
    });
  }

  /* Phase 1 only: inner pages don't exist yet */
  if (PHASE1) {
    doc.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="/"]');
      if (!a) return;
      var href = a.getAttribute('href');
      e.preventDefault();
      if (nav && nav.classList.contains('is-open')) setMenu(false);
      if (href === '/get-a-quote/') {
        var qq = doc.getElementById('quick-quote');
        if (qq) {
          qq.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(function () { var f = doc.getElementById('qq-passengers'); if (f) f.focus({ preventScroll: true }); }, 450);
        }
        return;
      }
      if (href === '/') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      showToast('The ' + (a.textContent.trim() || 'linked') + ' page is part of Phase 2 (inner pages).');
    });
  }
})();
