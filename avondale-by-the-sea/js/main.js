/* Avondale by the Sea — homepage concept behaviour (vanilla ES6+, no dependencies) */
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.remove('no-js');

  // The property has no online booking engine — reservations are by phone or email.
  // Date requests compose a pre-filled email. Swap RESERVE_EMAIL for an engine URL
  // here if one is added (e.g. a BookifyPro / Cloudbeds deep link).
  const RESERVE_EMAIL = 'avondalebythesea@gmail.com';

  /* ---------- Sticky header shadow ---------- */
  const bar = document.querySelector('[data-header]');
  const onScroll = () => {
    if (bar) bar.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  const burger = document.querySelector('[data-burger]');
  const drawer = document.querySelector('[data-drawer]');
  const setDrawer = (open) => {
    if (!burger || !drawer) return;
    burger.setAttribute('aria-expanded', String(open));
    drawer.hidden = !open;
    root.classList.toggle('is-locked', open);
  };
  if (burger && drawer) {
    burger.addEventListener('click', () => setDrawer(drawer.hidden));
    drawer.addEventListener('click', (e) => {
      if (e.target.closest('a')) setDrawer(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !drawer.hidden) {
        setDrawer(false);
        burger.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1180 && !drawer.hidden) setDrawer(false);
    });
  }

  /* ---------- Dates ---------- */
  const iso = (d) => {
    const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return z.toISOString().slice(0, 10);
  };
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 86400000);
  const twoNights = new Date(today.getTime() + 2 * 86400000);

  document.querySelectorAll('[data-request-form]').forEach((form) => {
    const arrive = form.querySelector('[data-arrive]');
    const depart = form.querySelector('[data-depart]');
    if (!arrive || !depart) return;
    arrive.min = iso(today);
    arrive.value = iso(today);
    // Two nights by default: beach passes are included on stays of 2+ nights.
    depart.min = iso(tomorrow);
    depart.value = iso(twoNights);
    arrive.addEventListener('change', () => {
      if (!arrive.value) return;
      const a = new Date(arrive.value + 'T12:00:00');
      const next = new Date(a.getTime() + 86400000);
      depart.min = iso(next);
      if (!depart.value || depart.value <= arrive.value) {
        depart.value = iso(new Date(a.getTime() + 2 * 86400000));
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const guests = data.get('guests') || '2';
      const room = data.get('room') || 'Any room';
      const subject = `Availability request: ${data.get('arrive')} to ${data.get('depart')}`;
      const body = [
        'Hello Avondale by the Sea,',
        '',
        'I would like to check availability for:',
        `Arrive: ${data.get('arrive')}`,
        `Depart: ${data.get('depart')}`,
        `Guests: ${guests}`,
        `Room: ${room}`,
        '',
        'Name:',
        'Phone:',
        '',
        'Thank you!'
      ].join('\n');
      window.location.href = `mailto:${RESERVE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  });

  /* ---------- Booking bar reveal ---------- */
  const bookingBar = document.querySelector('[data-booking-bar]');
  const hero = document.querySelector('[data-hero]');
  const reserve = document.getElementById('reserve');
  if (bookingBar && hero && 'IntersectionObserver' in window) {
    let heroVisible = true;
    let reserveVisible = false;
    const update = () => {
      bookingBar.classList.toggle('is-visible', !heroVisible && !reserveVisible);
    };
    new IntersectionObserver((entries) => {
      heroVisible = entries[0].isIntersecting;
      update();
    }, { threshold: 0.15 }).observe(hero);
    if (reserve) {
      new IntersectionObserver((entries) => {
        reserveVisible = entries[0].isIntersecting;
        update();
      }, { threshold: 0.35 }).observe(reserve);
    }
  } else if (bookingBar) {
    bookingBar.classList.add('is-visible');
  }

  /* ---------- Pool photo fallback (hotlinked from the live site) ---------- */
  document.querySelectorAll('img[data-fallback]').forEach((img) => {
    const swap = () => {
      const fb = img.getAttribute('data-fallback');
      if (!fb || img.getAttribute('src') === fb) return;
      img.setAttribute('src', fb);
      img.setAttribute('alt', img.getAttribute('data-fallback-alt') || '');
    };
    if (img.complete && img.naturalWidth === 0) swap();
    else img.addEventListener('error', swap, { once: true });
  });

  /* ---------- Footer year ---------- */
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
