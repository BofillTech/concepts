/* Custom Windows LLC — concept #156 rev. 2 — Bofill Technologies */
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

  // Logo fallback + broken photo handling (class toggles only)
  const brand = document.querySelector('.brand');
  const logo = document.querySelector('.brand__logo');
  const failLogo = () => brand.classList.add('is-fallback');
  if (logo) {
    logo.addEventListener('error', failLogo);
    if (logo.complete && logo.naturalWidth === 0) failLogo();
  }
  document.querySelectorAll('.frame img').forEach((img) => {
    const fail = () => img.classList.add('is-broken');
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  // Try-a-treatment studio
  const shade = document.getElementById('shade');
  const floor = document.getElementById('floor');
  const range = document.getElementById('drop');
  const label = document.getElementById('dropLabel');
  const note = document.getElementById('studioNote');
  const chips = document.querySelectorAll('.chip');
  const TYPES = {
    roller:   { block: 0.85, verb: 'Lower it',  name: 'Roller shades', text: 'give the cleanest line, from light-filtering to full blackout.' },
    cellular: { block: 0.8,  verb: 'Lower it',  name: 'Duette® honeycomb shades', text: 'trap air in their cells to keep rooms warmer in winter and cooler in summer.' },
    sheer:    { block: 0.45, verb: 'Close it',  name: 'Silhouette® shadings', text: 'soften daylight and keep your view.' },
    shutter:  { block: 0.85, verb: 'Close it',  name: 'Custom shutters', text: 'are built for one window and last for decades.' },
    drape:    { block: 0.95, verb: 'Draw them', name: 'Custom drapery', text: 'in almost any fabric, on almost any hardware.' }
  };
  let current = 'roller';

  const render = () => {
    const drop = Number(range.value);
    shade.dataset.drop = String(drop);
    floor.dataset.glow = String(Math.round(10 * (1 - (drop / 100) * TYPES[current].block)));
  };
  const describe = () => {
    const t = TYPES[current];
    note.textContent = '';
    const strong = document.createElement('strong');
    strong.textContent = t.name;
    note.append(strong, ' ' + t.text);
    label.textContent = t.verb;
  };
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      current = chip.dataset.type;
      chips.forEach((c) => c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'));
      shade.className = 'shade shade--' + current;
      describe();
      render();
    });
  });
  range.addEventListener('input', render);
  render();

  // Consultation form. FORM_ENDPOINT: wire to the WordPress form handler at launch.
  const form = document.getElementById('consultForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = 'Add your name, phone, email and town so we can reach you.';
      return;
    }
    status.textContent = 'Thank you. We will call you to set up your visit.';
    form.reset();
  });

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
