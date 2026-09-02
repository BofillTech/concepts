/* The Spring House Hotel — homepage concept
   Vanilla ES6+, no libraries. Zero inline handlers; all state via classes. */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  /* ---------- Sticky header shadow ---------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  const burger = document.querySelector('.site-header__burger');
  const drawer = document.getElementById('mobile-drawer');
  const closeDrawer = () => {
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    drawer.hidden = true;
    document.body.classList.remove('u-lock');
  };
  const openDrawer = () => {
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    drawer.hidden = false;
    document.body.classList.add('u-lock');
  };
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      (burger.getAttribute('aria-expanded') === 'true') ? closeDrawer() : openDrawer();
    });
    drawer.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeDrawer();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') closeDrawer();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) closeDrawer();
    });
  }

  /* ---------- Logo fallback: swap in the text wordmark if the file fails ---------- */
  const logo = document.querySelector('.site-header__logo');
  const wordmark = document.querySelector('.site-header__wordmark');
  if (logo && wordmark) {
    const swapLogo = () => {
      logo.hidden = true;
      wordmark.hidden = false;
    };
    logo.addEventListener('error', swapLogo);
    if (logo.complete && logo.naturalWidth === 0) swapLogo(); /* failed before listener attached */
  }

  /* ---------- Photo fallbacks: full-size guess -> documented thumbnail ---------- */
  document.querySelectorAll('img[data-fallback]').forEach((img) => {
    const swap = () => {
      if (img.src !== img.dataset.fallback) img.src = img.dataset.fallback;
    };
    img.addEventListener('error', swap, { once: true });
    if (img.complete && img.naturalWidth === 0) swap();
  });

  /* ---------- Scroll reveals (subtle fade) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Bottom booking bar ---------- */
  const bar = document.getElementById('book-bar');
  const inEl = document.getElementById('bb-in');
  const outEl = document.getElementById('bb-out');
  const guestsEl = document.getElementById('bb-guests');
  const goBtn = document.getElementById('bb-go');
  const fmt = (d) => d.toISOString().slice(0, 10);

  if (inEl && outEl) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    inEl.value = fmt(today);
    inEl.min = fmt(today);
    outEl.value = fmt(tomorrow);
    outEl.min = fmt(tomorrow);
    inEl.addEventListener('change', () => {
      const next = new Date(inEl.value);
      next.setDate(next.getDate() + 1);
      outEl.min = fmt(next);
      if (outEl.value <= inEl.value) outEl.value = fmt(next);
    });
  }

  if (goBtn) {
    goBtn.addEventListener('click', () => {
      /* ENGINE HOOK: direct-book.com accepts the property slug; the date/guest
         param names below are the engine's common format — confirm against a
         live booking and correct here if it rewrites them upstream. */
      const base = 'https://direct-book.com/properties/SpringHouseHotelDIRECT';
      const params = new URLSearchParams({
        locale: 'en',
        checkInDate: inEl ? inEl.value : '',
        checkOutDate: outEl ? outEl.value : ''
      });
      if (guestsEl) params.set('items[0][adults]', guestsEl.value);
      window.open(base + '?' + params.toString(), '_blank', 'noopener');
    });
  }

  if (bar) {
    const hero = document.querySelector('.hero');
    if ('IntersectionObserver' in window && hero) {
      const barIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          bar.classList.toggle('is-visible', !entry.isIntersecting);
        });
      }, { threshold: 0.05 });
      barIO.observe(hero);
    } else {
      bar.classList.add('is-visible');
    }
  }

  /* ---------- Dynamic year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}());
