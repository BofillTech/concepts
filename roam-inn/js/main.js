/**
 * Roam Inn - Homepage JavaScript
 * Hamburger navigation, Ken Burns motion, Sticky booking bar
 */

(function() {
    'use strict';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Hamburger Menu Toggle
     */
    function initNavigation() {
        const navToggle = document.querySelector('.nav__toggle');
        const navMenu = document.querySelector('.nav__menu');
        const navLinks = document.querySelectorAll('.nav__link');
        const body = document.body;

        if (!navToggle || !navMenu) return;

        // Toggle menu
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Prevent body scroll when menu is open
            if (!isExpanded) {
                body.classList.add('no-scroll');
            } else {
                body.classList.remove('no-scroll');
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                body.classList.remove('no-scroll');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                body.classList.remove('no-scroll');
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                body.classList.remove('no-scroll');
            }
        });
    }

    /**
     * Sticky Booking Bar
     * Shows after scrolling past hero section
     */
    function initBookingBar() {
        const bookingBar = document.querySelector('.booking-bar');
        const hero = document.querySelector('.hero');
        
        if (!bookingBar || !hero) return;

        let heroHeight = hero.offsetHeight;

        function toggleBookingBar() {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition > heroHeight * 0.8) {
                bookingBar.classList.add('visible');
            } else {
                bookingBar.classList.remove('visible');
            }
        }

        // Throttle scroll event for performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    toggleBookingBar();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Recalculate hero height on resize
        window.addEventListener('resize', function() {
            heroHeight = hero.offsetHeight;
        });
    }

    /**
     * Ken Burns Effect Control
     * Pauses animations when section is not visible (performance)
     */
    function initKenBurnsEffect() {
        if (prefersReducedMotion) return;

        const heroImages = document.querySelectorAll('.hero__image');
        
        if (!heroImages.length) return;

        // Intersection Observer to pause animations when not visible
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, observerOptions);

        heroImages.forEach(function(image) {
            observer.observe(image);
        });
    }

    /**
     * Smooth Scroll Enhancement
     * Adds offset for fixed navigation
     */
    function initSmoothScroll() {
        const navHeight = document.querySelector('.nav').offsetHeight;
        
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Ignore empty hash or just "#"
                if (href === '#' || href === '#hero') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }

                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Lazy Load Images
     * Basic implementation for performance
     */
    function initLazyLoad() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        
                        if (image.dataset.src) {
                            image.src = image.dataset.src;
                            image.removeAttribute('data-src');
                        }
                        
                        imageObserver.unobserve(image);
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(function(image) {
                imageObserver.observe(image);
            });
        }
    }

    /**
     * Add subtle fade-in effect for sections
     */
    function initSectionAnimations() {
        if (prefersReducedMotion) return;

        const sections = document.querySelectorAll('.section');
        
        if (!sections.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        sections.forEach(function(section) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }

    /**
     * Initialize all functions when DOM is ready
     */
    function init() {
        initNavigation();
        initBookingBar();
        initKenBurnsEffect();
        initSmoothScroll();
        initLazyLoad();
        initSectionAnimations();
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
