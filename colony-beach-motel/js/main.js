/* ============================================
   Colony Beach Motel — main.js
   Vanilla ES6+ · IIFE pattern · no dependencies
   ============================================ */

(function () {
  'use strict';

  // --------------------------------------------
  // 1. STICKY HEADER — add class after scroll
  // --------------------------------------------
  const header = document.getElementById('header');
  const SCROLL_THRESHOLD = 24;

  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --------------------------------------------
  // 2. MOBILE NAV TOGGLE
  // --------------------------------------------
  const navToggle = document.querySelector('.nav__toggle');
  const navList   = document.getElementById('primary-menu');

  const closeNav = () => {
    if (!navToggle || !navList) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    navList.classList.remove('is-open');
  };

  const openNav = () => {
    if (!navToggle || !navList) return;
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    navList.classList.add('is-open');
  };

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeNav() : openNav();
    });

    // Close on nav link click (mobile)
    navList.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 1023px)').matches) closeNav();
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });

    // Close on resize past desktop breakpoint
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.matchMedia('(min-width: 1024px)').matches) closeNav();
      }, 120);
    });
  }

  // --------------------------------------------
  // 3. BOOKING BAR — date defaults + validation
  // --------------------------------------------
  const checkinInput  = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  if (checkinInput && checkoutInput) {
    const today    = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Default check-in cannot be before today
    checkinInput.min = formatDate(today);
    checkoutInput.min = formatDate(tomorrow);

    // When check-in changes, push check-out forward if needed
    checkinInput.addEventListener('change', () => {
      if (!checkinInput.value) return;
      const inDate = new Date(checkinInput.value);
      const minOut = new Date(inDate);
      minOut.setDate(inDate.getDate() + 1);
      checkoutInput.min = formatDate(minOut);
      if (
        !checkoutInput.value ||
        new Date(checkoutInput.value) <= inDate
      ) {
        checkoutInput.value = formatDate(minOut);
      }
    });
  }

  // --------------------------------------------
  // 4. INTERSECTION OBSERVER — fade-in on scroll
  // --------------------------------------------
  const revealTargets = document.querySelectorAll(
    '.welcome__media, .room-card, .amenity, .gallery__item, .location__media'
  );

  if ('IntersectionObserver' in window && revealTargets.length) {
    // Set initial state via JS so non-JS users still see content
    revealTargets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }

})();
