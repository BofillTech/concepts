/* The Hudson Paper Company — homepage concept
   Concept by Bofill Technologies
   Vanilla ES6+, no dependencies. */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- sticky masthead state ------------------------------------------- */
  var masthead = document.getElementById('masthead');
  if (masthead) {
    var setStuck = function () {
      masthead.classList.toggle('is-stuck', window.scrollY > 24);
    };
    setStuck();
    window.addEventListener('scroll', setStuck, { passive: true });
  }

  /* --- mobile drawer ---------------------------------------------------- */
  var toggle = document.getElementById('navToggle');
  var drawer = document.getElementById('navDrawer');

  if (toggle && drawer) {
    var closeDrawer = function () {
      toggle.setAttribute('aria-expanded', 'false');
      drawer.hidden = true;
      document.body.classList.remove('is-locked');
    };

    var openDrawer = function () {
      toggle.setAttribute('aria-expanded', 'true');
      drawer.hidden = false;
      document.body.classList.add('is-locked');
    };

    toggle.addEventListener('click', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) { closeDrawer(); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeDrawer();
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && toggle.getAttribute('aria-expanded') === 'true') {
        closeDrawer();
      }
    });
  }

  /* --- staggered scroll reveals ---------------------------------------- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    var batch = 0;
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) { return; }
      var el = entry.target;
      var delay = batch * 90;
      batch += 1;
      window.setTimeout(function () { el.classList.add('is-in'); }, delay);
      observer.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  items.forEach(function (el) { observer.observe(el); });
})();
