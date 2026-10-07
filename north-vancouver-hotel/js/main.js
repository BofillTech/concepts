/**
 * North Vancouver Hotel - Main JavaScript
 * Carousel, Navigation, Animations, Booking Bar
 */

(function() {
    'use strict';

    // ============================================
    // Multi-Panel Carousel
    // ============================================
    class HeroCarousel {
        constructor() {
            this.panels = document.querySelectorAll('.hero__panel');
            this.dots = document.querySelectorAll('.hero__dot');
            this.currentPanel = 0;
            this.autoplayInterval = null;
            this.autoplayDelay = 5000;
            
            this.init();
        }
        
        init() {
            if (this.panels.length === 0) return;
            
            // Attach dot click handlers
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToPanel(index));
            });
            
            // Start autoplay
            this.startAutoplay();
            
            // Pause autoplay on user interaction
            document.querySelector('.hero').addEventListener('mouseenter', () => {
                this.stopAutoplay();
            });
            
            document.querySelector('.hero').addEventListener('mouseleave', () => {
                this.startAutoplay();
            });
        }
        
        goToPanel(index) {
            if (index === this.currentPanel) return;
            
            // Remove active class from current panel and dot
            this.panels[this.currentPanel].classList.remove('hero__panel--active');
            this.dots[this.currentPanel].classList.remove('hero__dot--active');
            
            // Add active class to new panel and dot
            this.currentPanel = index;
            this.panels[this.currentPanel].classList.add('hero__panel--active');
            this.dots[this.currentPanel].classList.add('hero__dot--active');
        }
        
        nextPanel() {
            const nextIndex = (this.currentPanel + 1) % this.panels.length;
            this.goToPanel(nextIndex);
        }
        
        startAutoplay() {
            this.stopAutoplay();
            this.autoplayInterval = setInterval(() => {
                this.nextPanel();
            }, this.autoplayDelay);
        }
        
        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        }
    }

    // ============================================
    // Sticky Booking Bar
    // ============================================
    class BookingBar {
        constructor() {
            this.bookingBar = document.getElementById('bookingBar');
            this.hero = document.querySelector('.hero');
            this.threshold = 100;
            
            this.init();
        }
        
        init() {
            if (!this.bookingBar || !this.hero) return;
            
            window.addEventListener('scroll', () => this.handleScroll());
            this.handleScroll();
        }
        
        handleScroll() {
            const heroBottom = this.hero.offsetTop + this.hero.offsetHeight;
            const scrollPosition = window.scrollY + window.innerHeight;
            
            if (scrollPosition > heroBottom + this.threshold) {
                this.bookingBar.classList.add('booking-bar--visible');
            } else {
                this.bookingBar.classList.remove('booking-bar--visible');
            }
        }
    }

    // ============================================
    // Clip-Path Wipe Animations
    // ============================================
    class ClipPathAnimations {
        constructor() {
            this.sections = document.querySelectorAll('.section');
            this.observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };
            
            this.init();
        }
        
        init() {
            if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver(
                    (entries) => this.handleIntersection(entries),
                    this.observerOptions
                );
                
                // Add data-animate attribute to sections
                this.sections.forEach(section => {
                    const content = section.querySelector('.section__content');
                    const imageWrap = section.querySelector('.section__image-wrap');
                    
                    if (content) {
                        content.setAttribute('data-animate', '');
                        this.observer.observe(content);
                    }
                    
                    if (imageWrap) {
                        imageWrap.setAttribute('data-animate', '');
                        this.observer.observe(imageWrap);
                    }
                });
                
                // Observe room cards
                const roomCards = document.querySelectorAll('.room-card');
                roomCards.forEach(card => {
                    card.setAttribute('data-animate', '');
                    this.observer.observe(card);
                });
                
                // Observe gallery items
                const galleryItems = document.querySelectorAll('.gallery-item');
                galleryItems.forEach(item => {
                    item.setAttribute('data-animate', '');
                    this.observer.observe(item);
                });
            }
        }
        
        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    // Optionally unobserve after animation
                    // this.observer.unobserve(entry.target);
                }
            });
        }
    }

    // ============================================
    // Smooth Scroll for Navigation Links
    // ============================================
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') return;
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // Navigation Background on Scroll
    // ============================================
    function initNavScroll() {
        const nav = document.querySelector('.nav');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            
            // Add shadow on scroll
            if (scrollTop > 100) {
                nav.style.boxShadow = '0 6px 30px rgba(8, 8, 8, 0.15)';
            } else {
                nav.style.boxShadow = '';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // ============================================
    // Preload Critical Images
    // ============================================
    function preloadImages() {
        const criticalImages = [
            'img/hero-main.jpg',
            'img/wix-room-deluxe.jpg',
            'img/wix-exterior.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // ============================================
    // Check for Reduced Motion Preference
    // ============================================
    function checkReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduce-motion');
        }
        
        // Listen for changes
        prefersReducedMotion.addEventListener('change', () => {
            if (prefersReducedMotion.matches) {
                document.body.classList.add('reduce-motion');
            } else {
                document.body.classList.remove('reduce-motion');
            }
        });
    }

    // ============================================
    // Initialize Everything
    // ============================================
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        checkReducedMotion();
        preloadImages();
        
        // Initialize components
        new HeroCarousel();
        new BookingBar();
        new ClipPathAnimations();
        
        initSmoothScroll();
        initNavScroll();
        
        console.log('North Vancouver Hotel - Site initialized');
    }

    // Start initialization
    init();

})();
