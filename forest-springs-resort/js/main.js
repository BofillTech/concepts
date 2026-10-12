/**
 * Forest Springs Resort Concept
 * Interactive enhancements with parallax motion
 */

(function() {
    'use strict';
    
    // === PARALLAX SCROLL EFFECT ===
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    function initParallax() {
        const parallaxElements = [
            { selector: '.hero-main img', speed: 0.5 },
            { selector: '.hero-secondary img', speed: 0.3 },
            { selector: '.wellness-image img', speed: 0.2 },
            { selector: '.gallery-item img', speed: 0.15 }
        ];
        
        function updateParallax() {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(({ selector, speed }) => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const elementTop = rect.top + scrollY;
                    const elementHeight = rect.height;
                    const windowHeight = window.innerHeight;
                    
                    // Only apply parallax if element is in or near viewport
                    if (rect.top < windowHeight && rect.bottom > 0) {
                        const scrolled = scrollY - elementTop + windowHeight;
                        const parallaxValue = (scrolled * speed);
                        el.style.transform = `translateY(${parallaxValue}px) scale(1.1)`;
                    }
                });
            });
            
            ticking = false;
        }
        
        function requestParallaxUpdate() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        // Throttled scroll listener
        window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
        
        // Initial call
        updateParallax();
    }
    
    // === SMOOTH SCROLL FOR ANCHOR LINKS ===
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#main-content') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.nav-centered-split').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // === INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ===
    function initFadeInObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements that should fade in
        const fadeElements = document.querySelectorAll('.room-card, .amenity-item, .voice-card, .wellness-feature');
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // === LAZY LOADING ENHANCEMENT ===
    function initLazyLoad() {
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            return;
        }
        
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // === ACTIVE NAV STATE ===
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-left a, .nav-right a');
        
        function updateActiveNav() {
            const scrollY = window.scrollY;
            const navHeight = document.querySelector('.nav-centered-split').offsetHeight;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNav, { passive: true });
        updateActiveNav();
    }
    
    // === MOBILE NAVIGATION TOGGLE ===
    function initMobileNav() {
        // Check if we're on mobile
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        function handleMobileNav(e) {
            const nav = document.querySelector('.nav-container');
            
            if (e.matches) {
                // Mobile view
                nav.classList.add('mobile-nav');
            } else {
                // Desktop view
                nav.classList.remove('mobile-nav');
            }
        }
        
        mediaQuery.addListener(handleMobileNav);
        handleMobileNav(mediaQuery);
    }
    
    // === RATING STARS ANIMATION ===
    function initRatingAnimation() {
        const ratingStars = document.querySelector('.rating-stars');
        if (!ratingStars) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stars = entry.target.textContent;
                    entry.target.textContent = '';
                    
                    stars.split('').forEach((star, index) => {
                        setTimeout(() => {
                            entry.target.textContent += star;
                        }, index * 100);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(ratingStars);
    }
    
    // === WELLNESS NUMERAL TREATMENT ===
    function initWellnessNumerals() {
        const numerals = document.querySelectorAll('.section-number, .stat-number, .rating-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('numeral-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        numerals.forEach(numeral => {
            numeral.style.opacity = '0';
            numeral.style.transform = 'translateY(20px)';
            numeral.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(numeral);
            
            numeral.addEventListener('transitionend', function handleTransition(e) {
                if (e.propertyName === 'opacity') {
                    this.classList.add('numeral-visible');
                    this.removeEventListener('transitionend', handleTransition);
                }
            });
        });
        
        // Add visible class to trigger animation
        document.addEventListener('DOMContentLoaded', () => {
            numerals.forEach(numeral => {
                if (numeral.classList.contains('numeral-visible')) {
                    numeral.style.opacity = '1';
                    numeral.style.transform = 'translateY(0)';
                }
            });
        });
    }
    
    // === PERFORMANCE: REDUCE MOTION FOR USERS WHO PREFER IT ===
    function respectMotionPreference() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable parallax and complex animations
            document.body.classList.add('reduce-motion');
            
            // Override parallax
            const parallaxImages = document.querySelectorAll('.hero-main img, .hero-secondary img, .wellness-image img');
            parallaxImages.forEach(img => {
                img.style.transform = 'none';
            });
        }
    }
    
    // === STICKY BOOKING BAR ===
    function initBookingBar() {
        const bookingBar = document.getElementById('bookingBar');
        const hero = document.querySelector('.hero-asymmetric-collage, .hero, #hero');
        
        if (!bookingBar || !hero) return;
        
        // Initialize date inputs with tomorrow and day after
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        const guestsSelect = document.getElementById('guests');
        
        if (checkinInput && checkoutInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const dayAfter = new Date();
            dayAfter.setDate(dayAfter.getDate() + 2);
            
            checkinInput.value = tomorrow.toISOString().split('T')[0];
            checkoutInput.value = dayAfter.toISOString().split('T')[0];
            checkinInput.min = tomorrow.toISOString().split('T')[0];
            
            // Ensure checkout is always after checkin
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
        
        // Handle booking submission - Cloudbeds with date params
        const submitButton = document.getElementById('booking-bar-submit');
        if (submitButton) {
            submitButton.addEventListener('click', function() {
                const checkin = checkinInput ? checkinInput.value : '';
                const checkout = checkoutInput ? checkoutInput.value : '';
                const guests = guestsSelect ? guestsSelect.value : '2';
                
                const baseUrl = 'https://hotels.cloudbeds.com/reservation/4eNEUA';
                const bookingUrl = baseUrl + '#checkin=' + checkin + '&checkout=' + checkout + '&adults=' + guests;
                
                console.log('Forest Springs Resort booking URL:', bookingUrl);
                window.open(bookingUrl, '_blank', 'noopener,noreferrer');
            });
        }
        
        function toggleBookingBar() {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > heroBottom) {
                bookingBar.classList.add('booking-bar--visible');
            } else {
                bookingBar.classList.remove('booking-bar--visible');
            }
        }
        
        // Initial check
        toggleBookingBar();
        
        // Listen to scroll events with throttle
        let bookingTicking = false;
        window.addEventListener('scroll', function() {
            if (!bookingTicking) {
                window.requestAnimationFrame(function() {
                    toggleBookingBar();
                    bookingTicking = false;
                });
                bookingTicking = true;
            }
        });
        
        // Recalculate on resize
        window.addEventListener('resize', function() {
            toggleBookingBar();
        });
    }

    // === INIT ALL ===
    function init() {
        // Check motion preference first
        respectMotionPreference();
        
        // Initialize features
        initParallax();
        initSmoothScroll();
        initFadeInObserver();
        initLazyLoad();
        initActiveNav();
        initMobileNav();
        initRatingAnimation();
        initWellnessNumerals();
        initBookingBar();
        
        // Log for debugging (remove in production)
        console.log('Forest Springs Resort: All interactive features initialized');
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Handle page visibility changes (pause animations when tab is hidden)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Pause expensive operations
            ticking = false;
        }
    });
    
})();
