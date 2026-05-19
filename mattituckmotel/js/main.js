/**
 * The Mattituck Motel — main.js
 * Vanilla ES6+ · No frameworks · No inline handlers
 * Behaviors: sticky header state, mobile nav toggle, scroll reveal,
 * booking bar date defaults & submit handling
 */

(function () {
  'use strict';

  /* ----- 1. STICKY HEADER STATE ----- */
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 12) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ----- 2. MOBILE NAV TOGGLE ----- */
  const navToggle = document.getElementById('navToggle');
  const primaryMenu = document.getElementById('primaryMenu');

  if (navToggle && primaryMenu) {
    const closeMenu = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      primaryMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    const openMenu = () => {
      navToggle.setAttribute('aria-expanded', 'true');
      primaryMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu on link click (mobile)
    primaryMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 959px)').matches) {
          closeMenu();
        }
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        navToggle.focus();
      }
    });

    // Reset state if window resizes back to desktop
    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 960px)').matches) {
        closeMenu();
      }
    });
  }

  /* ----- 3. SCROLL REVEAL ----- */
  const revealTargets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ----- 4. BOOKING BAR ----- */
  const bookingForm = document.getElementById('bookingForm');
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');

  // Helper: format YYYY-MM-DD for date inputs
  const toISODate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  if (checkinInput && checkoutInput) {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(today.getDate() + 2);

    // Sensible default values
    checkinInput.value = toISODate(tomorrow);
    checkoutInput.value = toISODate(dayAfter);

    // Prevent past dates on check-in
    checkinInput.min = toISODate(today);
    checkoutInput.min = toISODate(tomorrow);

    // Keep checkout after checkin
    checkinInput.addEventListener('change', () => {
      const ci = new Date(checkinInput.value);
      const co = new Date(checkoutInput.value);
      const minCo = new Date(ci);
      minCo.setDate(ci.getDate() + 1);
      checkoutInput.min = toISODate(minCo);
      if (co <= ci) {
        checkoutInput.value = toISODate(minCo);
      }
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Property has no online booking engine — initiate phone call.
      // Future enhancement: POST dates to inquiry endpoint or open booking engine with prefilled dates.
      window.location.href = 'tel:+16312984131';
    });
  }

})();
