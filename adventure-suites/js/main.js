/**
 * Isla Grand Beach Resort - Homepage JavaScript
 * Hamburger navigation, Ken Burns motion, Sticky booking bar
 */

(function() {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initNavigation() {
        const navToggle = document.querySelector('.nav__toggle');
        const navMenu = document.querySelector('.nav__menu');
        const navLinks = document.querySelectorAll('.nav__link');
        const body = document.body;

        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                body.classList.add('no-scroll');
            } else {
                body.classList.remove('no-scroll');
            }
        });

        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                body.classList.remove('no-scroll');
            });
        });

        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                body.classList.remove('no-scroll');
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                body.classList.remove('no-scroll');
            }
        });
    }

    function initBookingBar() {
        const bookingBar = document.querySelector('.booking-bar');
        const hero = document.querySelector('.hero');
        const body = document.body;
        
        if (!bookingBar || !hero) return;

        let heroHeight = hero.offsetHeight;

        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        
        if (checkinInput && checkoutInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const dayAfter = new Date();
            dayAfter.setDate(dayAfter.getDate() + 2);
            
            checkinInput.value = tomorrow.toISOString().split('T')[0];
            checkoutInput.value = dayAfter.toISOString().split('T')[0];
            checkinInput.min = tomorrow.toISOString().split('T')[0];
            
            checkinInput.addEventListener('change', function() {
                const checkinDate = new Date(this.value);
                const checkoutDate = new Date(checkoutInput.value);
                
                if (checkoutDate <= checkinDate) {
                    const newCheckout = new Date(checkinDate);
                    newCheckout.setDate(newCheckout.getDate() + 1);
                    checkoutInput.value = newCheckout.toISOString().split('T')[0];
                }
                
                checkoutInput.min = this.value;
            });
            
            checkoutInput.addEventListener('change', function() {
                const checkinDate = new Date(checkinInput.value);
                const checkoutDate = new Date(this.value);
                
                if (checkoutDate <= checkinDate) {
                    const newCheckout = new Date(checkinDate);
                    newCheckout.setDate(newCheckout.getDate() + 1);
                    this.value = newCheckout.toISOString().split('T')[0];
                }
            });
        }
        
        const submitButton = document.getElementById('booking-bar-submit');
        if (submitButton) {
            submitButton.addEventListener('click', function() {
                const bookingUrl = 'https://adventuresuites.com/reservations/';
                window.open(bookingUrl, '_blank', 'noopener,noreferrer');
            });
        }

        function toggleBookingBar() {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition > heroHeight * 0.6) {
                bookingBar.classList.add('visible');
                body.classList.add('booking-bar-visible');
            } else {
                bookingBar.classList.remove('visible');
                body.classList.remove('booking-bar-visible');
            }
        }

        toggleBookingBar();

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

        window.addEventListener('resize', function() {
            heroHeight = hero.offsetHeight;
            toggleBookingBar();
        });
    }

    function initKenBurnsEffect() {
        if (prefersReducedMotion) return;

        const heroImages = document.querySelectorAll('.hero__image');
        
        if (!heroImages.length) return;

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

    function initSmoothScroll() {
        const navHeight = document.querySelector('.nav').offsetHeight;
        
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
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

    function init() {
        initNavigation();
        initBookingBar();
        initKenBurnsEffect();
        initSmoothScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
