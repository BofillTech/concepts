/**
 * Silver Creek Hotel - Main JavaScript
 * Vanilla JS with mobile-first approach
 */

(function() {
    'use strict';

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('is-active');
            navList.classList.toggle('is-open');
            
            // Update ARIA attribute
            const isOpen = navList.classList.contains('is-open');
            this.setAttribute('aria-expanded', isOpen);
        });
        
        // Close menu when clicking nav links
        const navLinks = navList.querySelectorAll('.header__nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('is-active');
                navList.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = menuToggle.contains(event.target) || navList.contains(event.target);
            if (!isClickInside && navList.classList.contains('is-open')) {
                menuToggle.classList.remove('is-active');
                navList.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ========================================
    // Sticky Bottom Booking Bar with Date Picker
    // Shows after scrolling past hero section
    // ========================================
    
    const bookingBar = document.getElementById('bookingBar');
    const hero = document.getElementById('hero');
    
    if (bookingBar && hero) {
        // Initialize date picker
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        const guestsSelect = document.getElementById('guests');
        
        if (checkinInput && checkoutInput) {
            // Set default dates (tomorrow and day after)
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
        
        // Handle booking button click (link-only)
        const bookingButton = document.getElementById('booking-bar-submit');
        if (bookingButton) {
            bookingButton.addEventListener('click', function() {
                const bookingUrl = 'https://www.silvercreek-granby.com/book-now/';
                console.log('Silver Creek Hotel booking URL:', bookingUrl);
                window.open(bookingUrl, '_blank', 'noopener,noreferrer');
            });
        }
        
        let heroBottom = hero.offsetHeight;
        
        // Recalculate on resize
        window.addEventListener('resize', function() {
            heroBottom = hero.offsetHeight;
        });
        
        // Show/hide booking bar based on scroll position
        let ticking = false;
        
        function updateBookingBar() {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollPosition > heroBottom) {
                bookingBar.classList.add('is-visible');
            } else {
                bookingBar.classList.remove('is-visible');
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateBookingBar);
                ticking = true;
            }
        });
        
        // Initial check
        updateBookingBar();
    }

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty hash or javascript:void(0)
            if (href === '#' || href.startsWith('javascript:')) {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Get header height for offset
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Lazy Loading Images
    // Fallback for browsers without native lazy loading
    // ========================================
    
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(function(img) {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for very old browsers - load all images immediately
            lazyImages.forEach(function(img) {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    }

    // ========================================
    // Accessible Focus Management
    // ========================================
    
    // Add visible focus indicator for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('user-is-tabbing');
    });

    // ========================================
    // Performance: Reduce motion for users who prefer it
    // ========================================
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleReducedMotion() {
        if (prefersReducedMotion.matches) {
            // Disable smooth scroll
            document.documentElement.style.scrollBehavior = 'auto';
        }
    }
    
    handleReducedMotion();
    prefersReducedMotion.addEventListener('change', handleReducedMotion);

    // ========================================
    // Log initialization
    // ========================================
    
    console.log('Silver Creek Hotel - Website initialized');

})();
