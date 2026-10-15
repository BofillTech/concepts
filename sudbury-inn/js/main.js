(function () {
  'use strict';
  var header = document.querySelector('.site-header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
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

  // Booking bar: default dates and keep check-out after check-in
  var form = document.querySelector('.book-bar');
  if (form) {
    var inEl = form.querySelector('input[name="start_date"]');
    var outEl = form.querySelector('input[name="end_date"]');
    var iso = function (d) {
      var m = String(d.getMonth() + 1).padStart(2, '0');
      var day = String(d.getDate()).padStart(2, '0');
      return d.getFullYear() + '-' + m + '-' + day;
    };
    var addDays = function (str, n) {
      var p = str.split('-');
      var d = new Date(+p[0], +p[1] - 1, +p[2]);
      d.setDate(d.getDate() + n);
      return iso(d);
    };
    var today = iso(new Date());
    inEl.min = today;
    inEl.value = addDays(today, 1);
    outEl.min = addDays(inEl.value, 1);
    outEl.value = addDays(inEl.value, 2);
    inEl.addEventListener('change', function () {
      if (!inEl.value) { return; }
      outEl.min = addDays(inEl.value, 1);
      if (!outEl.value || outEl.value <= inEl.value) { outEl.value = addDays(inEl.value, 1); }
    });
  }

  // Hero slider
  var slider = document.querySelector('.hero__slides');
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.hero__bg'));
    var dots = Array.prototype.slice.call(document.querySelectorAll('.hero__dot'));
    var pauseBtn = document.querySelector('.hero__pause');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var current = 0;
    var timer = null;
    var paused = reduce;
    var show = function (i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        var on = k === current;
        s.classList.toggle('is-active', on);
        if (on) { s.removeAttribute('aria-hidden'); } else { s.setAttribute('aria-hidden', 'true'); }
      });
      dots.forEach(function (d, k) {
        d.classList.toggle('is-active', k === current);
        if (k === current) { d.setAttribute('aria-current', 'true'); } else { d.removeAttribute('aria-current'); }
      });
    };
    var stop = function () { if (timer) { clearInterval(timer); timer = null; } };
    var start = function () { stop(); if (!paused) { timer = setInterval(function () { show(current + 1); }, 6000); } };
    document.querySelectorAll('.hero__arrow').forEach(function (b) {
      b.addEventListener('click', function () { show(current + Number(b.getAttribute('data-dir'))); start(); });
    });
    dots.forEach(function (d, k) { d.addEventListener('click', function () { show(k); start(); }); });
    if (pauseBtn) {
      var syncPause = function () {
        pauseBtn.textContent = paused ? 'Play' : 'Pause';
        pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
      };
      syncPause();
      pauseBtn.addEventListener('click', function () { paused = !paused; syncPause(); start(); });
    }
    var hero = slider.parentElement;
    hero.addEventListener('mouseenter', stop);
    hero.addEventListener('mouseleave', start);
    hero.addEventListener('focusin', stop);
    hero.addEventListener('focusout', start);
    start();
  }

  // Pub calendar (month + list views, styled like The Events Calendar)
  var cal = document.querySelector('.tribe-events');
  if (cal) {
    var RECURRING = [
      { dow: 4, type: 'hoot', title: 'Hoot Night with Denny Breau', time: 'Evening', desc: 'The weekly open mic. Bring an instrument, sign up for a slot or just come listen.' },
      { dow: 5, type: 'music', title: 'Live music at Suds', time: 'Evening', desc: 'Local bands and musicians in the pub. Call the pub for this week\u2019s lineup.' },
      { dow: 6, type: 'music', title: 'Live music at Suds', time: 'Evening', desc: 'Local bands and musicians in the pub. Call the pub for this week\u2019s lineup.' }
    ];
    var CLOSED = [2, 3];
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var monthEl = cal.querySelector('.tribe-events-calendar-month');
    var listEl = cal.querySelector('.tribe-events-calendar-list');
    var labelEl = cal.querySelector('.tribe-events-c-top-bar__datepicker');
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var cursor = new Date(today.getFullYear(), today.getMonth(), 1);
    var view = window.innerWidth < 768 ? 'list' : 'month';
    var eventsOn = function (d) { return RECURRING.filter(function (e) { return e.dow === d.getDay(); }); };
    var esc = function (t) { var el = document.createElement('span'); el.textContent = t; return el.innerHTML; };

    var renderMonth = function () {
      var first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
      var start = new Date(first); start.setDate(1 - first.getDay());
      var html = '<table class="tribe-events-calendar-month__table"><caption class="skip">' + MONTHS[cursor.getMonth()] + ' ' + cursor.getFullYear() + '</caption><thead><tr>';
      DAYS.forEach(function (d) { html += '<th scope="col">' + d + '</th>'; });
      html += '</tr></thead><tbody>';
      var d = new Date(start);
      for (var w = 0; w < 6; w++) {
        if (w > 3 && d.getMonth() !== cursor.getMonth()) { break; }
        html += '<tr>';
        for (var i = 0; i < 7; i++) {
          var cls = 'tribe-events-calendar-month__day';
          if (d.getMonth() !== cursor.getMonth()) { cls += ' tribe-events-calendar-month__day--other-month'; }
          if (d < today) { cls += ' tribe-events-calendar-month__day--past'; }
          if (d.getTime() === today.getTime()) { cls += ' tribe-events-calendar-month__day--current'; }
          html += '<td class="' + cls + '"><span class="tribe-events-calendar-month__day-date">' + d.getDate() + '</span>';
          eventsOn(d).forEach(function (e) {
            html += '<span class="tribe-events-calendar-month__event tribe-events-calendar-month__event--' + e.type + '">' + esc(e.title) + '<span class="tribe-events-calendar-month__event-time">' + e.time + '</span></span>';
          });
          if (CLOSED.indexOf(d.getDay()) !== -1) { html += '<span class="tribe-events-calendar-month__closed">Pub closed</span>'; }
          html += '</td>';
          d.setDate(d.getDate() + 1);
        }
        html += '</tr>';
      }
      monthEl.innerHTML = html + '</tbody></table>';
    };

    var renderList = function () {
      var from = cursor.getMonth() === today.getMonth() && cursor.getFullYear() === today.getFullYear() ? new Date(today) : new Date(cursor);
      var html = '';
      var lastMonth = -1;
      var d = new Date(from);
      for (var n = 0; n < 35; n++) {
        eventsOn(d).forEach(function (e) {
          if (d.getMonth() !== lastMonth) {
            html += '<li class="tribe-events-calendar-list__month-separator">' + MONTHS[d.getMonth()] + ' ' + d.getFullYear() + '</li>';
            lastMonth = d.getMonth();
          }
          html += '<li class="tribe-events-calendar-list__event"><div class="tribe-events-calendar-list__event-date-tag"><span class="tribe-events-calendar-list__event-date-tag-weekday">' + DAYS[d.getDay()] + '</span><span class="tribe-events-calendar-list__event-date-tag-daynum">' + d.getDate() + '</span></div>' +
            '<div><p class="tribe-events-calendar-list__event-datetime">' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ' \u00b7 ' + e.time + ' \u00b7 Suds Pub</p><h3 class="tribe-events-calendar-list__event-title">' + esc(e.title) + '</h3><p class="tribe-events-calendar-list__event-description">' + esc(e.desc) + '</p></div></li>';
        });
        d.setDate(d.getDate() + 1);
      }
      listEl.innerHTML = html;
    };

    var render = function () {
      labelEl.textContent = (view === 'list' ? 'From ' : '') + MONTHS[cursor.getMonth()] + ' ' + cursor.getFullYear();
      monthEl.hidden = view !== 'month';
      listEl.hidden = view !== 'list';
      cal.setAttribute('data-view', view);
      cal.querySelectorAll('.tribe-events-c-view-selector__button').forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-view') === view ? 'true' : 'false');
      });
      if (view === 'month') { renderMonth(); } else { renderList(); }
    };

    cal.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) { return; }
      var act = btn.getAttribute('data-cal');
      if (act === 'prev') { cursor = new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1); }
      if (act === 'next') { cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1); }
      if (act === 'today') { cursor = new Date(today.getFullYear(), today.getMonth(), 1); }
      if (btn.hasAttribute('data-view') && btn.classList.contains('tribe-events-c-view-selector__button')) { view = btn.getAttribute('data-view'); }
      render();
    });
    render();
  }

  // Image fallback
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
