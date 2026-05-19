/* =====================================================
   MANRESA CASTLE — main.js
   Vanilla ES6+ in IIFE pattern
   ===================================================== */

(function () {
  'use strict';

  // ---------------------------------------------------
  // 1. Sticky header: toggle is-scrolled class
  // ---------------------------------------------------
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 24) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------------------------------------------------
  // 2. Mobile menu toggle
  // ---------------------------------------------------
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      const next = !isOpen;
      navToggle.setAttribute('aria-expanded', String(next));
      navToggle.setAttribute('aria-label', next ? 'Close menu' : 'Open menu');
      if (next) {
        mobileMenu.hidden = false;
      } else {
        mobileMenu.hidden = true;
      }
    });

    // Close mobile menu when a link is tapped
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        mobileMenu.hidden = true;
      });
    });
  }

  // ---------------------------------------------------
  // 3. Scroll reveal — IntersectionObserver
  // ---------------------------------------------------
  const revealSelectors = [
    '.story__intro',
    '.story__column',
    '.story__image-block',
    '.rooms__intro',
    '.room-card',
    '.estate__header',
    '.feature',
    '.bleed__content',
    '.gallery__header',
    '.gallery__item',
    '.location__text',
    '.location__media',
    '.final-cta__inner'
  ];

  const revealTargets = document.querySelectorAll(revealSelectors.join(','));
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    // Fallback: reveal everything immediately
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------------------------------------------------
  // 4. Smooth scroll for in-page anchors (sticky header offset)
  // ---------------------------------------------------
  const headerHeight = () => (header ? header.offsetHeight : 72);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight() - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---------------------------------------------------
  // 5. Booking bar — sensible default dates + CTA passthrough
  // ---------------------------------------------------
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  const bookingCta = document.querySelector('[data-booking-cta]');

  const formatDate = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const twoNights = new Date();
  twoNights.setDate(today.getDate() + 3);

  if (checkinInput) {
    checkinInput.min = formatDate(today);
    checkinInput.value = formatDate(tomorrow);
  }
  if (checkoutInput) {
    checkoutInput.min = formatDate(tomorrow);
    checkoutInput.value = formatDate(twoNights);
  }

  // Keep checkout after checkin
  if (checkinInput && checkoutInput) {
    checkinInput.addEventListener('change', () => {
      const ci = new Date(checkinInput.value);
      if (!isNaN(ci.getTime())) {
        const nextDay = new Date(ci);
        nextDay.setDate(ci.getDate() + 1);
        checkoutInput.min = formatDate(nextDay);
        const co = new Date(checkoutInput.value);
        if (isNaN(co.getTime()) || co <= ci) {
          checkoutInput.value = formatDate(nextDay);
        }
      }
    });
  }

  // ---------------------------------------------------
  // 6. Header height CSS var (in case of layout shifts)
  // ---------------------------------------------------
  const setHeaderVar = () => {
    if (!header) return;
    document.documentElement.style.setProperty('--header-h-actual', header.offsetHeight + 'px');
  };
  setHeaderVar();
  window.addEventListener('resize', setHeaderVar);

})();
