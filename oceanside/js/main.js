/* =========================================================================
   THE OCEANSIDE AT DENNIS PORT
   main.js — sticky nav, mobile menu, scroll reveals, booking form
   ========================================================================= */
(() => {
  'use strict';

  // ---------- Sticky header on scroll -------------------------------------
  const header = document.getElementById('siteHeader');
  let lastScroll = 0;

  const onScroll = () => {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 30);
    }
    lastScroll = y;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile menu toggle ------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    const closeMenu = () => {
      navToggle.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    };

    const openMenu = () => {
      navToggle.classList.add('is-open');
      mobileMenu.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
    };

    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  // ---------- Scroll reveal animations ------------------------------------
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    reveals.forEach((el) => io.observe(el));
  } else {
    // Fallback: show everything immediately if IO unsupported
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------- Footer year -------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Booking bar -------------------------------------------------
  const bookingForm = document.getElementById('bookingForm');
  const checkIn = document.getElementById('checkIn');
  const checkOut = document.getElementById('checkOut');

  if (bookingForm && checkIn && checkOut) {
    // Default min dates to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    checkIn.min = todayStr;
    checkOut.min = todayStr;

    // Update checkOut min when checkIn changes
    checkIn.addEventListener('change', () => {
      if (checkIn.value) {
        checkOut.min = checkIn.value;
        if (checkOut.value && checkOut.value < checkIn.value) {
          checkOut.value = '';
        }
      }
    });

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cin = checkIn.value;
      const cout = checkOut.value;

      // If dates given, prefill an email; otherwise just scroll to booking section
      if (cin && cout) {
        const subject = encodeURIComponent('Availability Request — The Oceanside');
        const body = encodeURIComponent(
          `Hi Tim,\n\nI'd like to check availability at The Oceanside for the following dates:\n\nCheck In: ${cin}\nCheck Out: ${cout}\n\nLooking forward to hearing back.\n\nThanks,\n`
        );
        window.location.href = `mailto:tim@jthospitalitymanagement.com?subject=${subject}&body=${body}`;
      } else {
        const target = document.getElementById('booking');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
})();
