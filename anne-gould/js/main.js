/* =====================================================================
   ANNE GOULD COLLEGE ADVISOR — Main JS
   Vanilla ES6+ · IIFE pattern · zero dependencies
   ===================================================================== */

(function () {
    'use strict';

    /* ---------- 1. MOBILE NAV TOGGLE -------------------------------- */
    const navToggle = document.querySelector('.nav__toggle');
    const navList   = document.getElementById('primaryMenu');

    if (navToggle && navList) {
        const closeNav = () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navList.classList.remove('is-open');
            document.body.classList.remove('is-nav-locked');
        };

        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
            if (isOpen) {
                closeNav();
            } else {
                navToggle.setAttribute('aria-expanded', 'true');
                navList.classList.add('is-open');
                document.body.classList.add('is-nav-locked');
            }
        });

        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
                closeNav();
                navToggle.focus();
            }
        });

        // Close on link click (mobile)
        navList.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.matchMedia('(max-width: 1023px)').matches) {
                    closeNav();
                }
            });
        });

        // Reset if user resizes to desktop
        const desktopMq = window.matchMedia('(min-width: 1024px)');
        desktopMq.addEventListener('change', (e) => {
            if (e.matches) { closeNav(); }
        });
    }

    /* ---------- 2. STICKY HEADER SHADOW ON SCROLL ------------------- */
    const header = document.getElementById('siteHeader');
    if (header) {
        let lastY = 0;
        let ticking = false;

        const onScroll = () => {
            lastY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    header.classList.toggle('is-scrolled', lastY > 8);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- 3. FOOTER YEAR -------------------------------------- */
    const yearEl = document.getElementById('footerYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ---------- 4. SCROLL-IN REVEALS (lightweight) ------------------ */
    // Honor reduced-motion users by skipping the observer entirely.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced && 'IntersectionObserver' in window) {
        const revealTargets = document.querySelectorAll(
            '.phase, .quote, .meet__media, .meet__body, .creds__item'
        );

        revealTargets.forEach((el) => {
            el.classList.add('reveal');
        });

        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--in');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealTargets.forEach((el) => io.observe(el));
    }

})();
