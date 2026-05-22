/* ==========================================================================
   Beachcomber Resort at Montauk — main.js
   Vanilla ES6+, no external dependencies
   No inline event handlers — everything bound via addEventListener
   ========================================================================== */
(function () {
  'use strict';

  // ==========================================================================
  // Sticky header — toggle .site-header--scrolled past 80px scroll
  // ==========================================================================
  const header = document.getElementById('header');
  if (header && !header.classList.contains('site-header--solid')) {
    const onScroll = () => {
      if (window.scrollY > 80) {
        header.classList.add('site-header--scrolled');
      } else {
        header.classList.remove('site-header--scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ==========================================================================
  // Mobile menu drawer toggle
  // ==========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('mobile-menu--open');
      menuToggle.classList.toggle('menu-toggle--open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      mobileMenu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close drawer on any link click inside
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('mobile-menu--open');
        menuToggle.classList.remove('menu-toggle--open');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================================================
  // Reveal-on-scroll using IntersectionObserver
  // ==========================================================================
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // ==========================================================================
  // Booking bar — defaults today/tomorrow, validates check-out > check-in,
  // submits to booking engine (replaces former inline onsubmit handler)
  // ==========================================================================
  const checkin = document.getElementById('booking-bar-checkin');
  const checkout = document.getElementById('booking-bar-checkout');
  const bookingBar = document.getElementById('booking-bar');

  if (checkin && checkout) {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 86400000);
    const fmt = (d) => d.toISOString().slice(0, 10);
    checkin.value = fmt(today);
    checkout.value = fmt(tomorrow);
    checkin.min = fmt(today);
    checkout.min = fmt(tomorrow);
    checkin.addEventListener('change', () => {
      const next = new Date(new Date(checkin.value).getTime() + 86400000);
      checkout.min = fmt(next);
      if (new Date(checkout.value) <= new Date(checkin.value)) {
        checkout.value = fmt(next);
      }
    });
  }

  if (bookingBar) {
    bookingBar.addEventListener('submit', (event) => {
      event.preventDefault();
      const ci = checkin ? checkin.value : '';
      const co = checkout ? checkout.value : '';
      const url = 'https://secure.irm1.net/irmng?resort=2g' +
        '&checkin=' + encodeURIComponent(ci) +
        '&checkout=' + encodeURIComponent(co);
      window.open(url, '_blank', 'noopener');
    });
  }

  // ==========================================================================
  // Reviews carousel (homepage)
  // ==========================================================================
  const reviewQuote = document.getElementById('review-quote');
  const reviewSource = document.getElementById('review-source');
  const reviewTabs = document.querySelectorAll('.reviews__tabs button');

  if (reviewQuote && reviewSource && reviewTabs.length) {
    const reviews = [
      {
        quote: "Beachcomber exceeded our expectations with a memorable stay and great location that's clean and friendly. Our room was very clean, comfortable, and spacious — with a great view of the ocean.",
        source: '— Beachcomber Guest'
      },
      {
        quote: 'Exceptional. The place was perfect, the location, the room was beautiful. I fell in love with the room as soon as we got there. I would highly recommend the Beachcomber.',
        source: '— Beachcomber Guest'
      },
      {
        quote: 'Room was clean and tastefully decorated. I enjoyed having my own private patio to sit outside and listen to the ocean waves.',
        source: '— Beachcomber Guest'
      }
    ];
    reviewQuote.style.transition = 'opacity .25s ease';
    reviewSource.style.transition = 'opacity .25s ease';
    reviewTabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        reviewTabs.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const i = parseInt(btn.dataset.r, 10);
        reviewQuote.style.opacity = '0';
        reviewSource.style.opacity = '0';
        setTimeout(() => {
          reviewQuote.textContent = reviews[i].quote;
          reviewSource.textContent = reviews[i].source;
          reviewQuote.style.opacity = '1';
          reviewSource.style.opacity = '1';
        }, 220);
      });
    });
  }

  // ==========================================================================
  // Lightbox (gallery page)
  // ==========================================================================
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('.lightbox__img');
    const lbCaption = lightbox.querySelector('.lightbox__caption');
    const lbClose = lightbox.querySelector('.lightbox__close');

    const open = (src, caption) => {
      lbImg.src = src;
      lbImg.alt = caption || '';
      lbCaption.textContent = caption || '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => { lbImg.src = ''; }, 300);
    };

    document.querySelectorAll('[data-lightbox]').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        open(
          item.getAttribute('data-src') || item.getAttribute('href'),
          item.getAttribute('data-caption') || ''
        );
      });
    });
    lbClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) close();
    });
  }

  // ==========================================================================
  // Gallery filter (gallery page)
  // ==========================================================================
  const filterButtons = document.querySelectorAll('[data-filter]');
  if (filterButtons.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterButtons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        document.querySelectorAll('[data-category]').forEach((item) => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.removeAttribute('hidden');
          } else {
            item.setAttribute('hidden', '');
          }
        });
      });
    });
  }

  // ==========================================================================
  // Contact form — mailto fallback (no backend on a static concept site)
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const fn = contactForm.querySelector('[name="firstName"]').value;
      const ln = contactForm.querySelector('[name="lastName"]').value;
      const em = contactForm.querySelector('[name="email"]').value;
      const msg = contactForm.querySelector('[name="message"]').value;
      const subject = encodeURIComponent('Inquiry from ' + fn + ' ' + ln);
      const body = encodeURIComponent(
        'From: ' + fn + ' ' + ln + '\nEmail: ' + em + '\n\n' + msg
      );
      window.location.href =
        'mailto:info@beachcombermontauk.com?subject=' + subject + '&body=' + body;
    });
  }
})();
