/* York Harbor Inn clone — header drawer, submenu slide, dropdown, FAQ accordion.
   Reproduces the interactions the live theme's menu.js wires up against the
   real CSS hooks (.menu_wrap.active / .nav-primary.open / .sub-menu.active /
   .layer-icon.on / .menu-toggle.open / .sub-menu-toggle / .sub-menu-close). */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var header = document.querySelector('.site-header');
    var menuWrap = header && header.querySelector('.menu_wrap');
    var navPrimary = header && header.querySelector('.nav-primary');
    var toggle = header && header.querySelector('.menu-toggle');
    var layer = toggle && toggle.querySelector('.layer-icon');

    /* --- Hamburger drawer --- */
    function setDrawer(open) {
      if (!menuWrap || !navPrimary) return;
      menuWrap.classList.toggle('active', open);
      navPrimary.classList.toggle('open', open);
      if (toggle) {
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      if (layer) layer.classList.toggle('on', open);
      document.documentElement.style.overflow = open ? 'hidden' : '';
    }
    if (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        setDrawer(!navPrimary.classList.contains('open'));
      });
    }
    // Esc closes the drawer (and any open submenu)
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAllSubs();
        setDrawer(false);
      }
    });

    /* --- Submenus: inject a toggle + close button into each parent item --- */
    var parents = navPrimary
      ? navPrimary.querySelectorAll('.menu-item-has-children')
      : [];

    function closeAllSubs() {
      if (!navPrimary) return;
      navPrimary.querySelectorAll('.sub-menu.active').forEach(function (s) {
        s.classList.remove('active');
      });
      navPrimary.querySelectorAll('.menu-item.open').forEach(function (m) {
        m.classList.remove('open');
      });
    }

    Array.prototype.forEach.call(parents, function (item) {
      var sub = item.querySelector(':scope > .sub-menu');
      if (!sub) return;

      // chevron toggle (theme injects this; CSS positions it at row right)
      var tog = document.createElement('button');
      tog.type = 'button';
      tog.className = 'sub-menu-toggle';
      tog.setAttribute('aria-label', 'Open submenu');
      item.insertBefore(tog, sub);

      // back/close control for the mobile full-screen submenu
      var close = document.createElement('button');
      close.type = 'button';
      close.className = 'sub-menu-close';
      close.setAttribute('aria-label', 'Close submenu');
      close.innerHTML = '<i class="icofont-thin-left"></i>';
      sub.insertBefore(close, sub.firstChild);

      tog.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var willOpen = !sub.classList.contains('active');
        sub.classList.toggle('active', willOpen);
        item.classList.toggle('open', willOpen);
      });
      close.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        sub.classList.remove('active');
        item.classList.remove('open');
      });
    });

    /* --- "Book a Table" dropdown in the header right --- */
    var ddToggle = document.querySelector('.header-right .dropdown__toggle');
    var ddMenu = document.querySelector('.header-right .dropdown__menu');
    if (ddToggle && ddMenu) {
      ddToggle.addEventListener('click', function (e) {
        e.preventDefault();
        var open = ddMenu.classList.toggle('is-open');
        ddMenu.hidden = !open;
        ddToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.header-right .dropdown')) {
          ddMenu.classList.remove('is-open');
          ddMenu.hidden = true;
          ddToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    /* --- Sticky-on-scroll shadow (mirrors theme .scroll-header behaviour) --- */
    var lastY = 0;
    window.addEventListener(
      'scroll',
      function () {
        if (!header) return;
        var y = window.pageYOffset || document.documentElement.scrollTop;
        header.classList.toggle('scroll-header', y > 80);
        lastY = y;
      },
      { passive: true }
    );

    /* --- Booking bar: swap the two date text inputs to native date pickers --- */
    Array.prototype.forEach.call(
      document.querySelectorAll('.booking-form-block .booking__input[type="text"]'),
      function (inp) {
        inp.addEventListener('focus', function () {
          this.type = 'date';
        });
      }
    );

    /* --- FAQ accordion --- */
    var questions = document.querySelectorAll('.yhi-aeo__q');
    Array.prototype.forEach.call(questions, function (q) {
      q.addEventListener('click', function () {
        var item = q.closest('.yhi-aeo__item');
        var open = item.classList.toggle('is-open');
        q.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  });
})();
