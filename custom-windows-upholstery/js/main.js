/* Custom Windows LLC — concept #156 rev. 5 — Bofill Technologies */
(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile drawer
  const burger = document.querySelector('.burger');
  const drawer = document.getElementById('drawer');
  const setDrawer = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    drawer.hidden = !open;
    document.body.classList.toggle('is-locked', open);
  };
  burger.addEventListener('click', () => setDrawer(drawer.hidden));
  drawer.addEventListener('click', (e) => { if (e.target.closest('a')) setDrawer(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) { setDrawer(false); burger.focus(); } });
  window.addEventListener('resize', () => { if (window.innerWidth >= 1120 && !drawer.hidden) setDrawer(false); });

  // Desktop: floating call-to-action appears once the hero form is out of view
  const bar = document.getElementById('actionBar');
  const card = document.getElementById('consult');
  if ('IntersectionObserver' in window && bar && card) {
    new IntersectionObserver(([entry]) => {
      bar.classList.toggle('is-visible', !entry.isIntersecting);
    }, { threshold: 0 }).observe(card);
  } else if (bar) {
    bar.classList.add('is-visible');
  }

  // Broken photo handling (class toggles only)
  document.querySelectorAll('.frame img, .work__item img').forEach((img) => {
    const fail = () => img.classList.add('is-broken');
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  // Consultation form. FORM_ENDPOINT: wire to the WordPress form handler at launch.
  const form = document.getElementById('consultForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = 'Add your name, phone and town so we can reach you.';
      return;
    }
    status.textContent = 'Thank you. We will call you to set up your visit.';
    form.reset();
  });

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
