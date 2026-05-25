/* ============================================================
   Cape Ann Whale Watch — Main Script
   Vanilla JS · ES6+ · No dependencies
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Hero Slideshow ---------- */
  function initSlideshow() {
    const slides = $$('.hero__slide');
    const dots = $$('.hero__dot');
    const video = $('#hero-video');
    const heroMedia = $('#hero-media');

    if (video) {
      // Video mode active — hide dots, show audio toggle
      const dotsContainer = $('#hero-dots');
      const audioToggle = $('#hero-audio-toggle');
      if (dotsContainer) dotsContainer.hidden = true;
      if (audioToggle) audioToggle.classList.add('hero__audio-toggle--visible');
      return;
    }

    if (slides.length <= 1) return;

    let currentIndex = 0;
    let timer = null;
    const INTERVAL = 5000;

    function showSlide(index) {
      slides[currentIndex].classList.remove('hero__slide--active');
      dots[currentIndex].classList.remove('hero__dot--active');
      dots[currentIndex].setAttribute('aria-current', 'false');

      currentIndex = (index + slides.length) % slides.length;

      slides[currentIndex].classList.add('hero__slide--active');
      dots[currentIndex].classList.add('hero__dot--active');
      dots[currentIndex].setAttribute('aria-current', 'true');
    }

    function next() {
      showSlide(currentIndex + 1);
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(next, INTERVAL);
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        startTimer();
      });
    });

    if (heroMedia) {
      heroMedia.addEventListener('mouseenter', stopTimer);
      heroMedia.addEventListener('mouseleave', startTimer);
    }

    // Pause when tab hidden (battery / data friendly)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopTimer();
      else startTimer();
    });

    startTimer();
  }

  /* ---------- Video Audio Toggle (Hero) ---------- */
  function initAudioToggle() {
    const video = $('#hero-video');
    const toggle = $('#hero-audio-toggle');
    if (!video || !toggle) return;

    const iconOff = $('#hero-audio-off');
    const iconOn = $('#hero-audio-on');

    toggle.addEventListener('click', () => {
      video.muted = !video.muted;
      const muted = video.muted;
      if (iconOff) iconOff.hidden = !muted;
      if (iconOn) iconOn.hidden = muted;
      toggle.setAttribute('aria-pressed', String(!muted));
      toggle.setAttribute(
        'aria-label',
        muted ? 'Unmute video' : 'Mute video'
      );
    });
  }

  /* ---------- Live Video Section ---------- */
  function initLiveVideo() {
    const video = $('#live-video');
    const toggle = $('#live-audio-toggle');
    const stage = $('#live-video-stage');

    if (!toggle || !stage) return;

    // Only show audio toggle if a real video is present (placeholder skips this)
    if (!video) return;

    toggle.classList.add('live-video__audio-toggle--visible');

    const iconOff = $('#live-audio-off');
    const iconOn = $('#live-audio-on');

    toggle.addEventListener('click', () => {
      video.muted = !video.muted;
      const muted = video.muted;
      if (iconOff) iconOff.hidden = !muted;
      if (iconOn) iconOn.hidden = muted;
      toggle.setAttribute('aria-pressed', String(!muted));
      toggle.setAttribute(
        'aria-label',
        muted ? 'Unmute video' : 'Mute video'
      );
    });

    // Auto-play when scrolled into view, pause when out of view
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {
                /* autoplay can fail; that's fine — user can tap */
              });
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.3 }
      );
      obs.observe(stage);
    }
  }

  /* ---------- Mobile Drawer ---------- */
  function initMobileDrawer() {
    const toggle = $('#menu-toggle');
    const drawer = $('#mobile-drawer');
    const overlay = $('#mobile-drawer-overlay');
    const closeBtn = $('#mobile-drawer-close');

    if (!toggle || !drawer || !overlay) return;

    function open() {
      drawer.classList.add('mobile-drawer--open');
      overlay.classList.add('mobile-drawer__overlay--visible');
      toggle.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-scroll-locked');
    }

    function close() {
      drawer.classList.remove('mobile-drawer--open');
      overlay.classList.remove('mobile-drawer__overlay--visible');
      toggle.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-scroll-locked');
    }

    toggle.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('mobile-drawer--open')) {
        close();
      }
    });

    // Close when clicking a menu link
    $$('a', drawer).forEach((a) => {
      a.addEventListener('click', close);
    });
  }

  /* ---------- Boot ---------- */
  function init() {
    initSlideshow();
    initAudioToggle();
    initLiveVideo();
    initMobileDrawer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
