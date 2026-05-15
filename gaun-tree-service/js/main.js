/* =============================================================
   Gaun's Tree Service — main.js
   Vanilla ES6+, no external dependencies
   ============================================================= */

(() => {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
      if (isOpen) {
        mobileMenu.setAttribute('hidden', '');
      } else {
        mobileMenu.removeAttribute('hidden');
      }
    });

    /* Close mobile menu when an internal link is clicked */
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        mobileMenu.setAttribute('hidden', '');
      });
    });

    /* Close mobile menu on Escape */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        mobileMenu.setAttribute('hidden', '');
        toggle.focus();
      }
    });
  }

  /* ---------- Dynamic year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Smooth-scroll for in-page links
       (in addition to CSS scroll-behavior, so we also
       account for the sticky header offset) ---------- */
  const navHeight = () => {
    const nav = document.querySelector('.nav');
    return nav ? nav.getBoundingClientRect().height : 0;
  };

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight() - 8;
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    });
  });

  /* ---------- Reveal-on-scroll for sections ---------- */
  const supportsIO = 'IntersectionObserver' in window;
  if (supportsIO) {
    const observed = document.querySelectorAll(
      '.service, .why__card, .area__item, .trust__item, .clients__row'
    );

    observed.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 600ms cubic-bezier(0.65,0,0.35,1), transform 600ms cubic-bezier(0.65,0,0.35,1)';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Slight stagger based on position within parent
          const delay = Math.min(i * 60, 240);
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    observed.forEach(el => observer.observe(el));
  }

  /* ---------- Respect reduced motion ---------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) {
    document.querySelectorAll('.service, .why__card, .area__item, .trust__item, .clients__row').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.transition = 'none';
    });
  }
})();
