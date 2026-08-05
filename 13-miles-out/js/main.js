/* =========================================================================
   13 MILES OUT — main.js
   Vanilla ES6+, single IIFE. No libraries. All state via class toggles —
   zero inline styles, zero .style assignments, zero onclick handlers.
   ========================================================================= */

(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  /* ---------------------------------------------------------------------
     1. Header scroll state
     --------------------------------------------------------------------- */
  const header = document.querySelector('[data-header]');

  /* ---------------------------------------------------------------------
     2. Mobile drawer (side rail replaces it at >=1180px)
     --------------------------------------------------------------------- */
  const burger = document.querySelector('[data-burger]');
  const drawer = document.querySelector('[data-drawer]');

  function closeDrawer() {
    if (!drawer || !burger) return;
    drawer.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
  }

  function toggleDrawer() {
    if (!drawer || !burger) return;
    const open = drawer.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('is-locked', open);
  }

  if (burger && drawer) {
    burger.addEventListener('click', toggleDrawer);
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeDrawer();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1180) closeDrawer();
    });
  }

  /* ---------------------------------------------------------------------
     2b. Image fallbacks — a few slots hotlink the client's own higher-res
     Weebly file and fall back to the copy we hold in /img/.
     --------------------------------------------------------------------- */
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function handle() {
      img.removeEventListener('error', handle);
      img.src = img.getAttribute('data-fallback');
    });
  });

  /* ---------------------------------------------------------------------
     3. Scroll reveals + booking-bar reveal (IntersectionObserver)
     --------------------------------------------------------------------- */
  const revealables = document.querySelectorAll('[data-reveal]');
  const bookbar = document.querySelector('[data-bookbar]');
  const hero = document.querySelector('[data-hero]');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    revealables.forEach(function (el) { io.observe(el); });

    if (bookbar && hero) {
      const barIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          bookbar.classList.toggle('is-up', !entry.isIntersecting);
        });
      }, { threshold: 0 });
      barIO.observe(hero);
    }

    if (header) {
      const sentinel = document.querySelector('[data-sentinel]');
      if (sentinel) {
        const stickIO = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            header.classList.toggle('is-stuck', !entry.isIntersecting);
          });
        }, { threshold: 0 });
        stickIO.observe(sentinel);
      }
    }
  } else {
    // No IntersectionObserver — show everything rather than hide it.
    revealables.forEach(function (el) { el.classList.add('is-in'); });
    if (bookbar) bookbar.classList.add('is-up');
  }

  /* ---------------------------------------------------------------------
     3b. Hero photograph slider — crossfade, with a dot picker. Autoplay
     stops as soon as the visitor picks a frame, and never runs at all
     under prefers-reduced-motion or when the tab is hidden.
     --------------------------------------------------------------------- */
  (function heroSlider() {
    const stage = document.querySelector('[data-slider]');
    if (!stage) return;
    const slides = Array.prototype.slice.call(stage.querySelectorAll('[data-slide]'));
    const dots = Array.prototype.slice.call(document.querySelectorAll('[data-dot]'));
    if (slides.length < 2) return;

    let index = 0;
    let timer = null;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-live', i === index); });
      dots.forEach(function (d, i) { d.setAttribute('aria-selected', i === index ? 'true' : 'false'); });
    }

    function start() {
      if (calm.matches || timer) return;
      timer = window.setInterval(function () { show(index + 1); }, 6500);
    }
    function stop() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }

    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { stop(); show(i); });
    });
    stage.addEventListener('mouseenter', stop);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stop(); } else { start(); }
    });

    start();
  })();

  /* ---------------------------------------------------------------------
     4. Booking bar
     The property rents Sunday-to-Sunday during high and most of shoulder
     season, so the bar asks for an arriving SUNDAY + a number of weeks
     rather than an arbitrary check-in / check-out pair.

     There is no online booking engine on the live site — reservations are
     taken by email and phone, and the live /reserve.html page carries the
     inquiry form. So the bar composes a pre-filled enquiry email.
     >>> HOOK: if a real engine (Cloudbeds, Lodgify, ResNexus…) is wired up
     later, swap the mailto build in openEnquiry() for the engine URL.
     --------------------------------------------------------------------- */
  const ENQUIRY_EMAIL = 'thirteenmilesout@gmail.com';

  const houseSel = document.querySelector('[data-house]');
  const dateInput = document.querySelector('[data-arrive]');
  const weeksSel = document.querySelector('[data-weeks]');
  const bookBtns = document.querySelectorAll('[data-book]');

  function nextSunday(from) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const shift = (7 - d.getDay()) % 7 || 7;
    d.setDate(d.getDate() + shift);
    return d;
  }

  function iso(d) {
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  }

  function pretty(d) {
    return d.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
  }

  if (dateInput) {
    const first = nextSunday(new Date());
    dateInput.value = iso(first);
    dateInput.min = iso(new Date());
  }

  function openEnquiry(preferredHouse) {
    const house = preferredHouse ||
      (houseSel ? houseSel.value : 'Either house');
    const weeks = weeksSel ? weeksSel.value : '1';
    let arriveLine = 'Dates: (flexible)';

    if (dateInput && dateInput.value) {
      const parts = dateInput.value.split('-');
      const arrive = new Date(+parts[0], +parts[1] - 1, +parts[2]);
      const depart = new Date(arrive.getTime());
      depart.setDate(depart.getDate() + 7 * parseInt(weeks, 10));
      arriveLine = 'Arriving: ' + pretty(arrive) +
        '\nDeparting: ' + pretty(depart) +
        '\nLength of stay: ' + weeks + (weeks === '1' ? ' week' : ' weeks');
    }

    const subject = '13 Miles Out — availability enquiry (' + house + ')';
    const body =
      'Hello,\n\n' +
      'I would like to check availability at 13 Miles Out.\n\n' +
      'House: ' + house + '\n' +
      arriveLine + '\n' +
      'Number of guests: \n\n' +
      'Name: \nPhone: \n\n' +
      'Thank you.';

    window.location.href = 'mailto:' + ENQUIRY_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  }

  bookBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openEnquiry(btn.getAttribute('data-book') || null);
      closeDrawer();
    });
  });

  /* ---------------------------------------------------------------------
     5. Dynamic copyright year
     --------------------------------------------------------------------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
