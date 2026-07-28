/* ===========================================================================
   Masterpiece Charters — concept behaviour
   Vanilla ES6+, no libraries, no inline handlers, no JS style assignments.
   ======================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- 1. Mobile nav drawer -------------------------------------------- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var drawer = document.getElementById('mobile-nav');

  function closeDrawer() {
    if (!drawer) { return; }
    drawer.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }
  }

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var open = drawer.classList.toggle('is-open');
      document.body.classList.toggle('is-locked', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) { closeDrawer(); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeDrawer(); }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1080) { closeDrawer(); }
    });
  }

  /* --- 2. Scroll reveals + sounder trace -------------------------------- */
  var revealTargets = document.querySelectorAll('[data-reveal], [data-sounder]');

  if (!('IntersectionObserver' in window) || reduce) {
    Array.prototype.forEach.call(revealTargets, function (el) {
      el.classList.add('is-in');
    });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(revealTargets, function (el) { io.observe(el); });
  }

  /* --- 3. Booking bar --------------------------------------------------- */
  var bar = document.querySelector('[data-bookbar]');
  var hero = document.querySelector('.hero');

  if (bar) {
    if (hero && 'IntersectionObserver' in window) {
      var heroIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          bar.classList.toggle('is-up', !entry.isIntersecting);
        });
      }, { threshold: 0.08 });
      heroIO.observe(hero);
    } else {
      bar.classList.add('is-up');
    }

    /* sensible default date: tomorrow */
    var dateField = bar.querySelector('[data-bb-date]');
    if (dateField) {
      var d = new Date();
      d.setDate(d.getDate() + 1);
      var iso = d.toISOString().slice(0, 10);
      dateField.value = iso;
      dateField.min = new Date().toISOString().slice(0, 10);
    }

    var bookBtn = bar.querySelector('[data-book]');
    if (bookBtn) {
      bookBtn.addEventListener('click', function () {
        var people = bar.querySelector('[data-bb-people]');
        var n = people ? people.value : '2';
        /* HOOK: FishingBooker accepts booking_persons + booking_days on the
           listing URL. A date / trip-type param is not documented, so the
           chosen date and trip are not yet passed through — wire them in here
           once the correct query keys are confirmed with FishingBooker. */
        var url = 'https://fishingbooker.com/charters/view/33134'
                + '?booking_persons=' + encodeURIComponent(n)
                + '&booking_days=1';
        window.open(url, '_blank', 'noopener');
      });
    }
  }

  /* --- 4. Dynamic year -------------------------------------------------- */
  var year = document.querySelector('[data-year]');
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
