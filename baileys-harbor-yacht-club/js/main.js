/**
 * Baileys Harbor Yacht Club Resort — Main JavaScript
 * ES6+ · Vanilla JS · IIFE · No external libraries
 * All interactions via addEventListener — zero inline handlers
 */
(function () {
  'use strict';

  /* ── STICKY NAV ── */
  function initStickyNav() {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    const onScroll = () => header.classList.toggle('site-header--scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── MOBILE NAV TOGGLE ── */
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const menu   = document.getElementById('primaryMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── HERO SLIDESHOW ── */
  function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero__slide');
    const dots   = document.querySelectorAll('.hero__dot');
    if (!slides.length || !dots.length) return;

    let current = 0;
    let timer   = null;

    function goTo(index) {
      slides[current].classList.remove('hero__slide--active');
      dots[current].classList.remove('hero__dot--active');
      dots[current].setAttribute('aria-pressed', 'false');
      current = index;
      slides[current].classList.add('hero__slide--active');
      dots[current].classList.add('hero__dot--active');
      dots[current].setAttribute('aria-pressed', 'true');
    }

    function startTimer() {
      timer = setInterval(() => goTo((current + 1) % slides.length), 5500);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); clearInterval(timer); startTimer(); });
    });

    startTimer();
  }

  /* ── SCROLL REVEAL ── */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      elements.forEach((el) => observer.observe(el));
    } else {
      elements.forEach((el) => el.classList.add('reveal--visible'));
    }
  }

  /* ── BOOKING BAR ── */
  function initBookingBar() {
    const submitBtn  = document.getElementById('bookingSubmit');
    const checkinEl  = document.getElementById('checkin');
    const checkoutEl = document.getElementById('checkout');
    if (!submitBtn) return;

    const today = new Date().toISOString().split('T')[0];
    if (checkinEl)  checkinEl.setAttribute('min', today);
    if (checkoutEl) checkoutEl.setAttribute('min', today);

    if (checkinEl && checkoutEl) {
      checkinEl.addEventListener('change', () => {
        checkoutEl.setAttribute('min', checkinEl.value);
        if (checkoutEl.value && checkoutEl.value <= checkinEl.value) checkoutEl.value = '';
      });
    }

    submitBtn.addEventListener('click', (e) => {
      const checkin  = checkinEl  ? checkinEl.value  : '';
      const checkout = checkoutEl ? checkoutEl.value : '';
      if (checkin && checkout) {
        e.preventDefault();
        window.open(`https://reservations.verticalbooking.com/premium/index.html?id_albergo=22708&dc=4444&lingua_int=usa&id_stile=22148?checkin=${checkin}&checkout=${checkout}`, '_blank', 'noopener noreferrer');
      }
    });
  }

  /* ── INIT ── */
  document.addEventListener('DOMContentLoaded', () => {
    initStickyNav();
    initMobileNav();
    initHeroSlideshow();
    initScrollReveal();
    initBookingBar();
  });

}());
