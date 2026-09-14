(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  /* sticky header shadow */
  var head = document.getElementById('siteHead');
  var onScroll = function () {
    if (window.scrollY > 12) head.classList.add('site-head--scrolled');
    else head.classList.remove('site-head--scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile/desktop drawer (hamburger-only nav, every breakpoint) */
  var toggle = document.getElementById('navToggle');
  var drawer = document.getElementById('drawer');
  function closeDrawer() {
    drawer.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openDrawer() {
    drawer.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      if (drawer.hidden) openDrawer(); else closeDrawer();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !drawer.hidden) closeDrawer();
  });
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeDrawer);
  });

  /* booking bar: reveal once the hero has scrolled past */
  var bar = document.getElementById('bookbar');
  var heroEl = document.querySelector('.hero');
  if (bar && heroEl && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        bar.hidden = entry.isIntersecting;
      });
    }, { rootMargin: '-10% 0px 0px 0px' });
    io.observe(heroEl);
  } else if (bar) {
    bar.hidden = false;
  }

  /* pause the marquee ticker for anyone who prefers reduced motion
     is already handled by CSS; this just pauses on hover/focus for
     anyone reading it closely */
  var track = document.querySelector('.ticker__track');
  var tickerWrap = document.querySelector('.ticker');
  if (track && tickerWrap) {
    tickerWrap.addEventListener('mouseenter', function () { track.style.animationPlayState = 'paused'; });
    tickerWrap.addEventListener('mouseleave', function () { track.style.animationPlayState = 'running'; });
  }

  /* broken-image fallback: hide gracefully rather than show a broken icon */
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function () {
      var host = img.closest('.plate') || img.closest('.room-card__photo') || img.closest('.hero__photo');
      if (host) host.style.background = '#33513A';
      img.style.display = 'none';
    }, { once: true });
  });

  /* dynamic year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
