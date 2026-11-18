/* Custom Windows & Upholstery — site — Bofill Technologies */
(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');

  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Menu drawer
  const burger = document.querySelector('.burger');
  const drawer = document.getElementById('drawer');
  if (burger && drawer) {
    const setDrawer = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      drawer.hidden = !open;
      document.body.classList.toggle('is-locked', open);
    };
    burger.addEventListener('click', () => setDrawer(drawer.hidden));
    drawer.addEventListener('click', (e) => { if (e.target.closest('a')) setDrawer(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) { setDrawer(false); burger.focus(); } });
  }

  // Floating call-to-action: after the hero form scrolls away, or always on pages without one
  const bar = document.getElementById('actionBar');
  const card = document.getElementById('consult');
  if (bar) {
    if (card && 'IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => bar.classList.toggle('is-visible', !entry.isIntersecting), { threshold: 0 }).observe(card);
    } else if (!card) {
      bar.classList.add('is-visible');
    }
  }

  // Broken photo handling
  document.querySelectorAll('.frame img, .work__item img').forEach((img) => {
    const fail = () => img.classList.add('is-broken');
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
