/* Farmers Guest House concept — vanilla ES6+ IIFE */
(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');

  const header = document.querySelector('.site-header');
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('drawer');
  const drawerClose = document.getElementById('drawerClose');
  const bookbar = document.getElementById('bookbar');
  const hero = document.querySelector('.hero');
  const brandLogo = document.getElementById('brandLogo');
  const brandWord = document.getElementById('brandWord');

  /* Logo fallback — swap to wordmark if the hotlinked file ever fails */
  if (brandLogo && brandWord) {
    brandLogo.addEventListener('error', () => {
      brandLogo.hidden = true;
      brandWord.hidden = false;
    });
  }

  /* Sticky header shadow */
  const onScrollHeader = () => {
    header.classList.toggle('is-stuck', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* Drawer */
  const openDrawer = () => {
    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add('is-open'));
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-locked');
    drawerClose.focus();
  };
  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-locked');
    window.setTimeout(() => { drawer.hidden = true; }, 350);
    toggle.focus();
  };
  if (toggle && drawer && drawerClose) {
    toggle.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => closeDrawer()));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !drawer.hidden) closeDrawer();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && !drawer.hidden) closeDrawer();
    });
  }

  /* Scroll reveals */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* Bottom booking bar — reveals after the hero */
  const showBar = () => {
    if (!hero || !bookbar) return;
    const past = window.scrollY > hero.offsetHeight * 0.8;
    bookbar.classList.toggle('is-shown', past);
  };
  window.addEventListener('scroll', showBar, { passive: true });
  showBar();

  /* Date defaults: today / tomorrow */
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const inEl = document.getElementById('bbIn');
  const outEl = document.getElementById('bbOut');
  const bookBtn = document.getElementById('bbBook');
  const BOOK_URL = 'https://resnexus.com/resnexus/reservations/book/3E5DD7E7-C05B-4511-A408-F030071CC5EC';
  if (inEl && outEl) {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 86400000);
    inEl.value = iso(today);
    inEl.min = iso(today);
    outEl.value = iso(tomorrow);
    outEl.min = iso(tomorrow);
    inEl.addEventListener('change', () => {
      const next = new Date(inEl.value);
      if (!Number.isNaN(next.getTime())) {
        const min = new Date(next.getTime() + 86400000);
        outEl.min = iso(min);
        if (outEl.value <= inEl.value) outEl.value = iso(min);
      }
    });
  }
  if (bookBtn) {
    /* ENGINE HOOK: ResNexus's public booking URL exposes no documented
       date parameters — the bar opens the live engine cleanly. If a live
       booking reveals query params (e.g. ?startdate=), append them here. */
    bookBtn.addEventListener('click', () => {
      bookBtn.href = BOOK_URL;
    });
  }
})();
