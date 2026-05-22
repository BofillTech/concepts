/**
 * Terrace By The Sea — main.js
 * Vanilla ES6+ · No jQuery · No inline handlers
 * Nav/footer/booking-bar are in the HTML (WordPress header.php/footer.php pattern)
 * This file handles BEHAVIOR ONLY: dropdowns, mobile menu, hero, reveal, dates, gallery tabs
 */

'use strict';

/* ============================================================
   CONSTANTS
   ============================================================ */
const BOOK_URL = 'https://terracebythesea.client.innroad.com/';

/* ============================================================
   DROPDOWN NAVIGATION
   ============================================================ */
const initDropdowns = () => {
  const items = document.querySelectorAll('.nav-primary .menu-item-has-children');
  if (!items.length) return;

  items.forEach(li => {
    if (li.dataset.navBound) return;
    li.dataset.navBound = '1';

    const trigger = li.querySelector(':scope > a');
    const submenu = li.querySelector('.sub-menu');
    if (!trigger || !submenu) return;

    trigger.addEventListener('click', e => {
      e.preventDefault();
      const isOpen = li.classList.contains('open');
      items.forEach(el => {
        el.classList.remove('open');
        const t = el.querySelector(':scope > a');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        li.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    li.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        li.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    });
  });

  if (!document.body.dataset.navGlobalBound) {
    document.body.dataset.navGlobalBound = '1';
    document.addEventListener('click', e => {
      if (!e.target.closest('.nav-primary')) {
        items.forEach(el => {
          el.classList.remove('open');
          const t = el.querySelector(':scope > a');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        items.forEach(el => {
          el.classList.remove('open');
          const t = el.querySelector(':scope > a');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }
};

/* ============================================================
   MOBILE MENU TOGGLE
   ============================================================ */
const initMobileMenu = () => {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
};

/* ============================================================
   ACTIVE NAV HIGHLIGHT
   ============================================================ */
const setActiveNavItem = () => {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-primary .menu-item > a').forEach(a => {
    const href = (a.getAttribute('href') || '').replace('.html', '').replace('#', '').split('/').pop();
    const page = path.replace('.html', '').split('/').pop() || 'index';
    if (href && href !== 'index' && page.includes(href)) {
      a.closest('.menu-item').classList.add('current-menu-item');
    }
  });
};

/* ============================================================
   BOOKING BAR DATES
   ============================================================ */
const initBookingBar = () => {
  const ci  = document.getElementById('checkinDate');
  const co  = document.getElementById('checkoutDate');
  const btn = document.getElementById('bookNowBtn');
  if (!ci || !co) return;

  const today    = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const fmt = d => d.toISOString().split('T')[0];

  ci.value = fmt(today);
  co.value = fmt(tomorrow);
  ci.min   = fmt(today);
  co.min   = fmt(tomorrow);

  ci.addEventListener('change', () => {
    const next = new Date(ci.value);
    next.setDate(next.getDate() + 1);
    co.min = fmt(next);
    if (co.value <= ci.value) co.value = fmt(next);
  });

  if (btn) {
    btn.addEventListener('click', () => window.open(BOOK_URL, '_blank', 'noopener'));
  }
};

/* ============================================================
   HERO SLIDESHOW
   ============================================================ */
const initHero = () => {
  // Apply data-bg as background-image
  document.querySelectorAll('.hero__slide[data-bg]').forEach(slide => {
    const bg = slide.getAttribute('data-bg');
    if (bg) slide.style.backgroundImage = `url("${bg}")`;
  });

  const slides = document.querySelectorAll('.hero__slide');
  const dots   = document.querySelectorAll('.hero__dot');
  if (!slides.length || !dots.length) return;

  let current = 0;
  let timer;

  const goTo = n => {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    dots[current].setAttribute('aria-selected', 'false');
    current = n;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-selected', 'true');
    clearInterval(timer);
    timer = setInterval(() => goTo((current + 1) % slides.length), 5500);
  };

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  timer = setInterval(() => goTo((current + 1) % slides.length), 5500);
};

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const initReveal = () => {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
};

/* ============================================================
   GALLERY TAB SWITCHER
   ============================================================ */
const initGalleryTabs = () => {
  const tabs = document.querySelectorAll('.gallery-tab[data-tab]');
  if (!tabs.length) return;

  const showPanel = (tab, btn) => {
    document.querySelectorAll('.gallery-panel').forEach(p => {
      p.classList.remove('is-active');
      p.setAttribute('hidden', '');
    });
    document.querySelectorAll('.gallery-tab').forEach(t => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    const panel = document.getElementById('panel-' + tab);
    if (panel) { panel.classList.add('is-active'); panel.removeAttribute('hidden'); }
    if (btn)   { btn.classList.add('is-active'); btn.setAttribute('aria-selected', 'true'); }
    history.replaceState(null, null, '#' + tab);
  };

  tabs.forEach(btn => btn.addEventListener('click', () => showPanel(btn.dataset.tab, btn)));

  const restoreFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const match = document.querySelector(`.gallery-tab[data-tab="${hash}"]`);
      if (match) showPanel(hash, match);
    }
  };

  if (document.readyState === 'complete') restoreFromHash();
  else window.addEventListener('load', restoreFromHash);
  window.addEventListener('hashchange', restoreFromHash);
};

/* ============================================================
   INIT ON DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initDropdowns();
  initMobileMenu();
  setActiveNavItem();
  initBookingBar();
  initHero();
  initReveal();
  initGalleryTabs();
});
