/* North Harbor Montauk — concept behaviors (vanilla ES6+, no libraries) */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  /* ----- logo fallback: swap to the wordmark if the hotlinked file fails ----- */
  const logo = document.querySelector('[data-logo]');
  const wordmark = document.querySelector('[data-wordmark]');
  if (logo && wordmark) {
    logo.addEventListener('error', () => {
      logo.hidden = true;
      wordmark.hidden = false;
    });
  }

  /* ----- drawer (opens from the harbor rail) ----- */
  const drawer = document.getElementById('drawer');
  const openBtn = document.querySelector('[data-drawer-open]');
  const closeBtn = document.querySelector('[data-drawer-close]');

  const openDrawer = () => {
    if (!drawer) return;
    drawer.hidden = false;
    document.body.classList.add('drawer-open');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
  };
  const closeDrawer = () => {
    if (!drawer) return;
    drawer.hidden = true;
    document.body.classList.remove('drawer-open');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
  };

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (drawer) {
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeDrawer));
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && !drawer.hidden) closeDrawer();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && drawer && !drawer.hidden) closeDrawer();
  });

  /* ----- header shadow on scroll ----- */
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----- scroll reveals (light support to the parallax) ----- */
  const reveals = document.querySelectorAll('[data-reveal]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reveals.length && 'IntersectionObserver' in window && !reduce) {
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

  /* ----- dynamic year ----- */
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
