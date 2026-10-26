/* Hudson Valley Coach, site JS (vanilla, no dependencies) */
(function () {
  'use strict';
  var doc = document;
  doc.documentElement.classList.add('js');

  /* Footer year */
  var y = doc.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  /* Mobile menu */
  var toggle = doc.querySelector('.menu-toggle');
  var nav = doc.getElementById('primary-nav');
  var header = doc.querySelector('.site-header');
  function setMenu(open) {
    if (!toggle || !nav) return;
    if (open && header) nav.style.top = Math.max(0, header.getBoundingClientRect().bottom) + 'px';
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

  /* Conversion events: hook for GA4 / Google Ads (analytics to be confirmed) */
  doc.addEventListener('click', function (e) {
    var cta = e.target.closest('[data-cta]');
    if (!cta) return;
    var name = cta.getAttribute('data-cta') === 'call' ? 'click_to_call' : 'quote_click';
    if (typeof window.gtag === 'function') window.gtag('event', name, { link_url: cta.getAttribute('href') || '' });
  });

  /* Trip ideas rail */
  var rail = doc.getElementById('trip-rail');
  if (rail) {
    var prev = doc.querySelector('[data-rail="prev"]');
    var next = doc.querySelector('[data-rail="next"]');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var step = function () { var card = rail.querySelector('.trip-card'); return card ? card.getBoundingClientRect().width + 20 : 300; };
    var update = function () {
      var max = rail.scrollWidth - rail.clientWidth - 2;
      if (prev) prev.disabled = rail.scrollLeft <= 2;
      if (next) next.disabled = rail.scrollLeft >= max;
    };
    var go = function (dir) { rail.scrollBy({ left: dir * step(), behavior: reduce ? 'auto' : 'smooth' }); };
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

  /* Date fields: no past dates */
  var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  var iso = today.toISOString().slice(0, 10);
  Array.prototype.forEach.call(doc.querySelectorAll('input[type="date"]:not([name="trip_date"])'), function (d) { d.min = iso; });

  function check(input) {
    var err = doc.getElementById(input.id + '-err');
    var ok = input.checkValidity() && (input.type === 'checkbox' || input.type === 'radio' || input.value.trim() !== '' || !input.required);
    input.setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (err) err.hidden = ok;
    return ok;
  }

  /* Quick quote forms (home strip + sticky bar): validate, save, carry values to Get a Quote */
  Array.prototype.forEach.call(doc.querySelectorAll('.js-quick-quote'), function (form) {
    var inputs = Array.prototype.slice.call(form.querySelectorAll('input'));
    inputs.forEach(function (i) { i.addEventListener('blur', function () { if (i.value) check(i); }); });
    form.addEventListener('submit', function (e) {
      var visible = inputs.filter(function (i) { return i.offsetParent !== null; });
      var bad = visible.filter(function (i) { return !check(i); });
      if (bad.length) { e.preventDefault(); bad[0].focus(); return; }
      inputs.forEach(function (i) { if (i.offsetParent === null) i.disabled = true; });
      var data = {};
      visible.forEach(function (i) { data[i.name] = i.value.trim(); });
      try { sessionStorage.setItem('hvc-quote-start', JSON.stringify(data)); } catch (err) { /* URL params still carry the values */ }
    });
  });

  /* Get a Quote: prefill from URL or saved quick quote */
  var qf = doc.querySelector('[data-quote-form]');
  if (qf) {
    var params = new URLSearchParams(window.location.search);
    var saved = {};
    try { saved = JSON.parse(sessionStorage.getItem('hvc-quote-start') || '{}') || {}; } catch (err) { saved = {}; }
    var val = function (k) { return params.get(k) || saved[k] || ''; };
    var set = function (id, v) { var el = doc.getElementById(id); if (el && v) el.value = v; };
    set('q-passengers', val('passengers'));
    set('q-date', val('date'));
    set('q-pickup-city', val('pickup_town'));
    var trip = params.get('trip'); if (trip) set('q-trip', trip);
    var veh = params.get('vehicle'); if (veh === '25') veh = '24'; if (veh) set('q-vehicle', veh);

    /* Multi-step: one step at a time with JS, single page without it */
    var steps = Array.prototype.slice.call(qf.querySelectorAll('.step'));
    var dots = qf.querySelectorAll('[data-step-dot]');
    var progress = qf.querySelector('[data-progress]');
    if (progress) progress.hidden = false;
    var show = function (n, focus) {
      steps.forEach(function (s, i) { s.classList.toggle('is-active', i === n); });
      Array.prototype.forEach.call(dots, function (d, i) {
        if (i === n) d.setAttribute('aria-current', 'step'); else d.removeAttribute('aria-current');
        d.classList.toggle('is-done', i < n);
      });
      if (focus) { var f = steps[n].querySelector('input, select, textarea'); if (f) f.focus(); }
    };
    var validStep = function (s) {
      var bad = Array.prototype.filter.call(s.querySelectorAll('input, select, textarea'), function (i) { return i.name !== 'website' && !check(i); });
      if (bad.length) { bad[0].focus(); if (bad[0].reportValidity) bad[0].reportValidity(); return false; }
      return true;
    };
    steps.forEach(function (s, i) {
      var n = s.querySelector('[data-next]'); var p = s.querySelector('[data-prev]');
      if (n) n.addEventListener('click', function () { if (validStep(s)) show(i + 1, true); });
      if (p) p.addEventListener('click', function () { show(i - 1, true); });
    });
    show(0, false);
  }

  /* Preview forms: nothing is sent; show a confirmation */
  Array.prototype.forEach.call(doc.querySelectorAll('.js-preview-form'), function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = Array.prototype.filter.call(form.querySelectorAll('input, select, textarea'), function (i) { return i.name !== 'website'; });
      var bad = fields.filter(function (i) { return !check(i); });
      if (bad.length) {
        var st = bad[0].closest('.step');
        if (st && !st.classList.contains('is-active') && qf) {
          var idx = Array.prototype.indexOf.call(form.querySelectorAll('.step'), st);
          form.querySelectorAll('.step').forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
        }
        bad[0].focus(); if (bad[0].reportValidity) bad[0].reportValidity();
        return;
      }
      var status = form.querySelector('[data-form-status]');
      if (status) { status.hidden = false; status.setAttribute('tabindex', '-1'); status.focus(); }
    });
  });

  /* Fleet helper: suggest a vehicle */
  var helper = doc.querySelector('.js-vehicle-helper');
  if (helper) {
    var pax = helper.querySelector('#vh-pax'); var bags = helper.querySelector('#vh-bags'); var out = helper.querySelector('[data-helper-out]');
    var suggest = function () {
      var n = parseInt(pax.value, 10); var heavy = bags.value === 'heavy';
      if (!n || n < 1) { out.textContent = 'Enter your passenger count to see a suggested vehicle.'; return; }
      var msg;
      if (n <= 14 && !heavy) msg = 'Suggested: our 14-passenger Mercedes-Benz Sprinter.' + (n <= 13 ? ' Celebrating? Ask about our 13-passenger Party Sprinter.' : '');
      else if (n <= 24 && !heavy) msg = 'Suggested: our 24-passenger minibus.';
      else if (n <= 40) msg = 'Suggested: our 40-passenger midsize coach, with under-floor luggage bays.';
      else if (n <= 56) msg = 'Suggested: our 56-passenger motor coach, with a restroom and large luggage bays.';
      else msg = 'Suggested: ' + Math.ceil(n / 56) + ' or more vehicles, coordinated as one trip. Our office will plan the right mix.';
      out.textContent = msg;
    };
    pax.addEventListener('input', suggest); bags.addEventListener('change', suggest);
  }

  /* Sticky quote bar: tuck it while the page's own quote form is in view */
  var mainForm = doc.querySelector('main .quick-quote, main [data-quote-form]');
  if (mainForm && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { doc.body.classList.toggle('qb-tucked', en.isIntersecting); });
    }, { threshold: 0.15 }).observe(mainForm);
  }

  /* Reviews filter chips */
  var chips = doc.querySelectorAll('.chip[data-filter]');
  var list = doc.querySelector('[data-review-list]');
  if (chips.length && list) {
    var empty = doc.querySelector('[data-review-empty]');
    Array.prototype.forEach.call(chips, function (c) {
      c.addEventListener('click', function () {
        var f = c.getAttribute('data-filter'); var shown = 0;
        Array.prototype.forEach.call(chips, function (o) { o.setAttribute('aria-pressed', o === c ? 'true' : 'false'); });
        Array.prototype.forEach.call(list.children, function (li) {
          var on = f === 'all' || li.getAttribute('data-cat') === f; li.hidden = !on; if (on) shown++;
        });
        if (empty) empty.hidden = shown > 0;
      });
    });
  }
})();
