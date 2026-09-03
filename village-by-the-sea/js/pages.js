/* Village by the Sea — inner-page behaviour: gallery filter + lightbox,
   and the contact form hand-off. Vanilla ES6+, no libraries, no inline handlers. */
(function () {
  'use strict';

  /* ------------------------------------------------------------- lightbox */
  function initLightbox() {
    var lb = document.getElementById('lightbox');
    var grid = document.getElementById('galGrid');
    if (!lb || !grid) return;

    var img = lb.querySelector('.lightbox__img');
    var cap = lb.querySelector('.lightbox__caption');
    var idx = 0, lastFocus = null;

    function visible() {
      return Array.prototype.filter.call(grid.querySelectorAll('.gal__cell'), function (c) {
        return !c.hidden;
      });
    }

    function show(i) {
      var list = visible();
      if (!list.length) return;
      idx = (i + list.length) % list.length;
      var cell = list[idx];
      var pic = cell.querySelector('img');
      img.setAttribute('src', cell.getAttribute('data-full'));
      img.setAttribute('alt', pic ? pic.getAttribute('alt') : 'Photograph of Village by the Sea');
      cap.textContent = cell.getAttribute('data-cap') + ' · ' + (idx + 1) + ' of ' + list.length;
    }

    function open(cell) {
      lastFocus = document.activeElement;
      show(visible().indexOf(cell));
      lb.hidden = false;
      document.documentElement.classList.add('is-locked');
      document.body.classList.add('is-locked');
      window.requestAnimationFrame(function () { lb.classList.add('is-open'); });
      lb.querySelector('.lightbox__close').focus();
    }

    function close() {
      lb.classList.remove('is-open');
      document.documentElement.classList.remove('is-locked');
      document.body.classList.remove('is-locked');
      window.setTimeout(function () { lb.hidden = true; }, 260);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    grid.addEventListener('click', function (e) {
      var cell = e.target.closest('.gal__cell');
      if (cell) open(cell);
    });
    lb.querySelector('.lightbox__nav--prev').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('.lightbox__nav--next').addEventListener('click', function () { show(idx + 1); });
    lb.querySelector('.lightbox__close').addEventListener('click', close);
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lightbox__stage')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* -------------------------------------------------------- gallery filter */
  function initFilters() {
    var wrap = document.querySelector('.gal-filters');
    var grid = document.getElementById('galGrid');
    var empty = document.getElementById('galEmpty');
    if (!wrap || !grid) return;

    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('.gal-filter');
      if (!btn) return;
      var want = btn.getAttribute('data-filter');

      Array.prototype.forEach.call(wrap.querySelectorAll('.gal-filter'), function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });

      var shown = 0;
      Array.prototype.forEach.call(grid.querySelectorAll('.gal__cell'), function (c) {
        var match = want === 'all' || c.getAttribute('data-cat') === want;
        c.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    });
  }

  /* ----------------------------------------------------------- contact form */
  function initContact() {
    var btn = document.querySelector('[data-contact]');
    var note = document.querySelector('[data-contact-note]');
    if (!btn || !note) return;

    btn.addEventListener('click', function () {
      var get = function (id) { var el = document.getElementById(id); return el ? el.value : ''; };
      var lines = [];
      if (get('c-name')) lines.push('Name: ' + get('c-name'));
      if (get('c-email')) lines.push('Email: ' + get('c-email'));
      if (get('c-phone')) lines.push('Phone: ' + get('c-phone'));
      if (get('c-topic')) lines.push('About: ' + get('c-topic'));
      if (get('c-note')) lines.push('', get('c-note'));

      var topic = get('c-topic');
      var to = (topic === 'Weddings & events') ? 'eventplanner@vbts.com' : 'eventplanner@vbts.com';
      var href = 'mailto:' + to +
        '?subject=' + encodeURIComponent('Website enquiry' + (topic ? ' — ' + topic : '')) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      /* Concept behaviour: hand off to the visitor's mail client. On the live
         build this posts to the real form endpoint instead. */
      window.location.href = href;
      note.classList.add('is-sent');
      note.textContent = 'Opening your email app — if nothing happens, call 207-646-1100.';
    });
  }

  /* ------------------------------------------------- events page inquiry form */
  function initEvent() {
    var btn = document.querySelector('[data-event-inquire]');
    var note = document.querySelector('[data-event-note]');
    if (!btn || !note) return;
    btn.addEventListener('click', function () {
      var g = function (id) { var e = document.getElementById(id); return e ? e.value : ''; };
      var lines = [];
      if (g('e-name')) lines.push('Name: ' + g('e-name'));
      if (g('e-email')) lines.push('Email: ' + g('e-email'));
      if (g('e-type')) lines.push('Event type: ' + g('e-type'));
      if (g('e-guests')) lines.push('Approx. guests: ' + g('e-guests'));
      if (g('e-date')) lines.push('Dates: ' + g('e-date'));
      if (g('e-note')) lines.push('', g('e-note'));
      var href = 'mailto:eventplanner@vbts.com'
        + '?subject=' + encodeURIComponent('Event inquiry' + (g('e-type') ? ' - ' + g('e-type') : ''))
        + '&body=' + encodeURIComponent(lines.join('\n'));
      window.location.href = href;
      note.classList.add('is-sent');
      note.textContent = 'Opening your email app. If nothing happens, call 207-646-1100.';
    });
  }

  function boot() { initLightbox(); initFilters(); initContact(); initEvent(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}());
