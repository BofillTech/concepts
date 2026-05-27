/* ============================================================
   Unlimited Car Rental — main.js
   Vanilla ES6+ · IIFE · No dependencies
   ============================================================ */
(function () {
  'use strict';

  // ----- 1. Mobile nav toggle ----------------------------------------------
  const navToggle = document.querySelector('.site-nav__toggle');
  const navList   = document.getElementById('primary-nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      const isOpen = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is tapped (mobile only)
    navList.querySelectorAll('.site-nav__link, .site-nav__item--cta a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.matchMedia('(max-width: 767px)').matches) {
          navList.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ----- 2. Sticky header scrolled state -----------------------------------
  const header = document.getElementById('site-header');
  if (header) {
    const updateHeader = function () {
      if (window.scrollY > 12) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  // ----- 3. Dynamic copyright year ------------------------------------------
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ----- 4. Open / Closed indicator in hero --------------------------------
  // Business hours: Mon-Fri 8:00 AM - 5:00 PM, weekends closed
  const hoursEl = document.querySelector('[data-hours-today]');
  if (hoursEl) {
    const now = new Date();
    const day = now.getDay(); // 0 Sun ... 6 Sat
    const hour = now.getHours();
    const isWeekday = day >= 1 && day <= 5;
    const isOpen = isWeekday && hour >= 8 && hour < 17;

    let label = 'Mon – Fri · 8 AM – 5 PM';
    if (isOpen) {
      label = 'Open now · closes 5 PM';
    } else if (isWeekday && hour < 8) {
      label = 'Opens today at 8 AM';
    } else if (!isWeekday) {
      label = 'Closed · opens Monday 8 AM';
    } else if (isWeekday && hour >= 17) {
      label = 'Closed · opens tomorrow 8 AM';
    }
    hoursEl.textContent = label;
  }

  // ----- 5. Reveal-on-scroll for sections ----------------------------------
  if ('IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.section__header, .fleet__card, .why__item, .visit__info, .visit__map, .cta__inner'
    );
    revealTargets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity 600ms cubic-bezier(0.2,0.7,0.2,1), transform 600ms cubic-bezier(0.2,0.7,0.2,1)';
    });

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealTargets.forEach(function (el) { io.observe(el); });
  }

}());
