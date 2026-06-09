/**
 * Fairfield Technology — Main JS
 * Vanilla ES6+, no external dependencies.
 */

(function () {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  const initMobileNav = () => {
    const toggle = document.querySelector('[data-nav-toggle]');
    const drawer = document.querySelector('[data-nav-mobile]');
    if (!toggle || !drawer) return;

    toggle.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close drawer when clicking a link inside it
    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  };

  /* ---------- Toast helper ---------- */
  const showToast = (title, body) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    const h = document.createElement('p');
    h.className = 'toast__title';
    h.textContent = title;

    const p = document.createElement('p');
    p.className = 'toast__body';
    p.textContent = body;

    toast.appendChild(h);
    toast.appendChild(p);
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('is-visible'));

    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  /* ---------- Contact form (demo handler) ---------- */
  const initContactForm = () => {
    const form = document.querySelector('[data-contact-form]');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending…';
      }
      setTimeout(() => {
        showToast('Message sent!', "We'll get back to you within 24 hours.");
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalText || 'Send Message';
        }
      }, 900);
    });
  };

  /* ---------- Active nav link based on current page ---------- */
  const initActiveNav = () => {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-primary .menu-item').forEach((li) => {
      const link = li.querySelector('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        li.classList.add('current-menu-item');
      }
    });
  };

  /* ---------- Set current year in footer ---------- */
  const initYear = () => {
    const el = document.querySelector('[data-current-year]');
    if (el) el.textContent = String(new Date().getFullYear());
  };

  /* ---------- Bootstrap on DOM ready ---------- */
  const ready = (fn) => {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  };

  ready(() => {
    initMobileNav();
    initContactForm();
    initActiveNav();
    initYear();
  });
})();
