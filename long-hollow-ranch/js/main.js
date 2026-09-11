/* Long Hollow Ranch — concept behavior (vanilla ES6+, no libraries) */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  /* Sticky header shadow */
  const header = document.querySelector('[data-header]');
  const onScroll = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Logo fallback → styled wordmark */
  const logo = document.querySelector('[data-logo]');
  const wordmark = document.querySelector('[data-wordmark]');
  if (logo && wordmark) {
    logo.addEventListener('error', () => {
      logo.setAttribute('hidden', '');
      wordmark.removeAttribute('hidden');
    });
  }

  /* Broken photo tiles degrade to brand plates (sandbox/QA safety) */
  document.querySelectorAll('img[data-img]').forEach((img) => {
    img.addEventListener('error', () => {
      img.classList.add('img--failed');
      img.removeAttribute('src');
      img.alt = '';
    });
  });

  /* Mobile drawer */
  const burger = document.querySelector('[data-burger]');
  const drawer = document.querySelector('[data-drawer]');
  const closeDrawer = () => {
    burger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('hidden', '');
    document.body.classList.remove('drawer-open');
  };
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') === 'true';
      if (open) {
        closeDrawer();
      } else {
        burger.setAttribute('aria-expanded', 'true');
        drawer.removeAttribute('hidden');
        document.body.classList.add('drawer-open');
      }
    });
    drawer.querySelectorAll('[data-drawer-link]').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') closeDrawer();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) closeDrawer();
    });
  }

  /* Scroll reveals */
  const revealables = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('is-visible'));
  }

  /* Bottom inquiry bar — reveals after the hero; mailto with the chosen home.
     No online booking engine exists for this property (stays are booked by
     email, phone, or the three Airbnb listings) — ENGINE HOOK: wire a real
     engine URL here if one is added. */
  const bar = document.querySelector('[data-bookbar]');
  const hero = document.querySelector('.hero');
  if (bar && hero && 'IntersectionObserver' in window) {
    const barIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bar.setAttribute('hidden', '');
        } else {
          bar.removeAttribute('hidden');
        }
      });
    }, { threshold: 0.05 });
    barIO.observe(hero);
  } else if (bar) {
    bar.removeAttribute('hidden');
  }
  const bookBtn = document.querySelector('[data-book-btn]');
  const homeSelect = document.querySelector('[data-book-home]');
  if (bookBtn && homeSelect) {
    bookBtn.addEventListener('click', () => {
      const home = homeSelect.value;
      const subject = encodeURIComponent(home + ' | Rates & Availability');
      const body = encodeURIComponent(
        'Hello Long Hollow Ranch,\n\nI\u2019d like to check rates and availability for: ' +
        home + '.\n\nDates:\nGuests:\n\nThank you!'
      );
      window.location.href = 'mailto:info@thelonghollowranch.com?subject=' + subject + '&body=' + body;
    });
  }

  /* Dynamic year */
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
}());
