/**
 * The Hotel Chalet at the Choo Choo
 * Main JavaScript
 */

(function() {
    'use strict';

    // DOM Elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const mainNav = document.getElementById('main-nav');
    const bookingBar = document.getElementById('booking-bar');
    const hero = document.querySelector('.hero');

    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav__menu--active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('nav__menu--active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('nav__menu--active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Booking Bar - Show after scrolling past hero
    let lastScrollTop = 0;
    const utilityBarHeight = 50;
    const navHeight = 80;
    const headerHeight = utilityBarHeight + navHeight;

    function handleBookingBar() {
        if (!bookingBar || !hero) return;

        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Show booking bar after scrolling past hero
        if (scrollTop > heroBottom - headerHeight) {
            bookingBar.classList.add('booking-bar--visible');
        } else {
            bookingBar.classList.remove('booking-bar--visible');
        }
    }

    // Throttle function for scroll performance
    function throttle(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            if (!timeout) {
                timeout = setTimeout(function() {
                    timeout = null;
                    func.apply(context, args);
                }, wait);
            }
        };
    }

    // Scroll event listener with throttle
    window.addEventListener('scroll', throttle(function() {
        handleBookingBar();
    }, 100));

    // Initial check on page load
    handleBookingBar();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hash or just "#"
            if (href === '#' || href === '') {
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading class removal when images load
    const images = document.querySelectorAll('img');
    let loadedImages = 0;

    function imageLoaded() {
        loadedImages++;
        if (loadedImages === images.length) {
            document.body.classList.add('images-loaded');
        }
    }

    images.forEach(function(img) {
        if (img.complete) {
            imageLoaded();
        } else {
            img.addEventListener('load', imageLoaded);
            img.addEventListener('error', imageLoaded); // Count errors too
        }
    });

    // Intersection Observer for fade-in animations (optional enhancement)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        // Observe photo bands and gallery items
        const animatedElements = document.querySelectorAll('.photo-band, .gallery__item');
        animatedElements.forEach(function(el) {
            observer.observe(el);
        });
    }

})();
