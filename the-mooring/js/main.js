/* The Mooring B&B concept — vanilla ES6+, IIFE, zero .style assignments */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  /* ----- Sticky header shadow ----- */
  const header = document.getElementById('site-header');
  const onScrollHeader = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ----- Mobile drawer ----- */
  const burger = document.getElementById('nav-burger');
  const drawer = document.getElementById('nav-drawer');
  const closeDrawer = () => {
    drawer.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('body--locked');
  };
  const openDrawer = () => {
    drawer.hidden = false;
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('body--locked');
  };
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      if (drawer.hidden) { openDrawer(); } else { closeDrawer(); }
    });
    drawer.addEventListener('click', (e) => {
      if (e.target.closest('a')) { closeDrawer(); }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !drawer.hidden) { closeDrawer(); burger.focus(); }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && !drawer.hidden) { closeDrawer(); }
    });
  }

  /* ----- Logo fallback (real logo -> Prata wordmark) ----- */
  const logo = document.getElementById('brand-logo');
  const wordmark = document.getElementById('brand-wordmark');
  if (logo && wordmark) {
    logo.addEventListener('error', () => {
      logo.hidden = true;
      wordmark.hidden = false;
    });
  }

  /* ----- Broken photos degrade to branded plates ----- */
  document.querySelectorAll('img[data-plate]').forEach((img) => {
    img.addEventListener('error', () => {
      img.classList.add('img--plate');
    });
  });

  /* ----- Scroll reveals ----- */
  const revealTargets = document.querySelectorAll(
    '.section-head, .room-row, .breakfast__grid, .house__cols, .capemay__grid, .final__panel, .trust__inner'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('reveal--in'));
  }

  /* ----- Booking bar ----- */
  const bar = document.getElementById('booking-bar');
  const inField = document.getElementById('bb-in');
  const outField = document.getElementById('bb-out');
  const guestsField = document.getElementById('bb-guests');
  const goBtn = document.getElementById('bb-go');

  const iso = (d) => {
    const p = (n) => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  };
  if (inField && outField) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    inField.value = iso(today);
    inField.min = iso(today);
    outField.value = iso(tomorrow);
    outField.min = iso(tomorrow);
    inField.addEventListener('change', () => {
      const next = new Date(inField.value + 'T12:00:00');
      next.setDate(next.getDate() + 1);
      outField.min = iso(next);
      if (outField.value <= inField.value) { outField.value = iso(next); }
    });
  }

  if (goBtn) {
    goBtn.addEventListener('click', () => {
      /* ENGINE HOOK — ThinkReservations. start_date / end_date /
         number_of_adults are the commonly observed params; confirm
         against a live booking and adjust keys here if needed. */
      const base = 'https://secure.thinkreservations.com/themooring/reservations';
      const params = new URLSearchParams();
      if (inField && inField.value) { params.set('start_date', inField.value); }
      if (outField && outField.value) { params.set('end_date', outField.value); }
      if (guestsField && guestsField.value) { params.set('number_of_adults', guestsField.value); }
      const qs = params.toString();
      window.open(qs ? base + '?' + qs : base, '_blank', 'noopener');
    });
  }

  if (bar) {
    const hero = document.querySelector('.hero');
    const onScrollBar = () => {
      const past = hero ? window.scrollY > hero.offsetHeight * 0.6 : window.scrollY > 400;
      bar.classList.toggle('booking-bar--show', past);
    };
    window.addEventListener('scroll', onScrollBar, { passive: true });
    onScrollBar();
  }

  /* ----- Dynamic year ----- */
  const year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }
}());
