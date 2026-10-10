// Ocean Sands Resort - Main JavaScript
// Ledger #170: full-bleed-slideshow-dots, slide-in-sides motion, sticky booking bar

(function() {
    'use strict';

    // Hero Slideshow
    const slideshow = {
        slides: document.querySelectorAll('.hero__slide'),
        dots: document.querySelectorAll('.hero__dot'),
        currentSlide: 0,
        slideInterval: null,
        
        init() {
            if (this.slides.length === 0) return;
            
            // Dot click handlers
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.goToSlide(index);
                    this.resetInterval();
                });
            });
            
            // Auto-advance
            this.startInterval();
            
            // Pause on hover
            const heroElement = document.querySelector('.hero');
            if (heroElement) {
                heroElement.addEventListener('mouseenter', () => this.stopInterval());
                heroElement.addEventListener('mouseleave', () => this.startInterval());
            }
        },
        
        goToSlide(index) {
            this.slides[this.currentSlide].classList.remove('hero__slide--active');
            this.dots[this.currentSlide].classList.remove('hero__dot--active');
            
            this.currentSlide = index;
            
            this.slides[this.currentSlide].classList.add('hero__slide--active');
            this.dots[this.currentSlide].classList.add('hero__dot--active');
        },
        
        nextSlide() {
            const next = (this.currentSlide + 1) % this.slides.length;
            this.goToSlide(next);
        },
        
        startInterval() {
            this.slideInterval = setInterval(() => this.nextSlide(), 5000);
        },
        
        stopInterval() {
            if (this.slideInterval) {
                clearInterval(this.slideInterval);
                this.slideInterval = null;
            }
        },
        
        resetInterval() {
            this.stopInterval();
            this.startInterval();
        }
    };

    // Navigation
    const nav = {
        header: document.getElementById('main-header'),
        toggle: document.querySelector('.header__toggle'),
        navMenu: document.getElementById('main-nav'),
        navLinks: document.querySelectorAll('.header__nav-link'),
        lastScrollY: 0,
        
        init() {
            if (!this.header) return;
            
            // Shrink header on scroll
            window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
            
            // Mobile toggle
            if (this.toggle && this.navMenu) {
                this.toggle.addEventListener('click', () => this.toggleMenu());
            }
            
            // Close menu on link click
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
        },
        
        handleScroll() {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                this.header.classList.add('header--shrink');
            } else {
                this.header.classList.remove('header--shrink');
            }
            
            this.lastScrollY = scrollY;
        },
        
        toggleMenu() {
            const isOpen = this.toggle.getAttribute('aria-expanded') === 'true';
            
            if (isOpen) {
                this.closeMenu();
            } else {
                this.openMenu();
            }
        },
        
        openMenu() {
            this.toggle.setAttribute('aria-expanded', 'true');
            this.navMenu.classList.add('header__nav--open');
            document.body.style.overflow = 'hidden';
        },
        
        closeMenu() {
            this.toggle.setAttribute('aria-expanded', 'false');
            this.navMenu.classList.remove('header__nav--open');
            document.body.style.overflow = '';
        }
    };

    // Booking Bar
    const bookingBar = {
        bar: document.getElementById('booking-bar'),
        hero: document.querySelector('.hero'),
        visible: false,
        
        init() {
            if (!this.bar || !this.hero) return;
            
            window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
            this.handleScroll(); // Check initial state
        },
        
        handleScroll() {
            const heroBottom = this.hero.offsetTop + this.hero.offsetHeight;
            const scrollY = window.scrollY;
            
            if (scrollY > heroBottom && !this.visible) {
                this.show();
            } else if (scrollY <= heroBottom && this.visible) {
                this.hide();
            }
        },
        
        show() {
            this.bar.classList.add('visible');
            this.visible = true;
        },
        
        hide() {
            this.bar.classList.remove('visible');
            this.visible = false;
        }
    };

    // Scroll Animations (slide-in-sides motion)
    const scrollAnimations = {
        elements: [],
        
        init() {
            // Collect all elements to animate
            this.elements = [
                ...document.querySelectorAll('.suites__item'),
                ...document.querySelectorAll('.rooms-showcase__item'),
                ...document.querySelectorAll('.amenities__feature'),
                ...document.querySelectorAll('.gallery__tile'),
                ...document.querySelectorAll('.oceanfront__image'),
                ...document.querySelectorAll('.oceanfront__content'),
                ...document.querySelectorAll('.location__content'),
                ...document.querySelectorAll('.location__map')
            ];
            
            if (this.elements.length === 0) return;
            
            // Use Intersection Observer for performance
            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -100px 0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('slide-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            this.elements.forEach(element => observer.observe(element));
        }
    };

    // Smooth Scroll Offset (account for fixed header)
    const smoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#' || !href) return;
                    
                    const target = document.querySelector(href);
                    if (!target) return;
                    
                    e.preventDefault();
                    
                    const headerHeight = document.getElementById('main-header')?.offsetHeight || 0;
                    const navHeight = document.getElementById('main-nav')?.offsetHeight || 0;
                    const offset = headerHeight + navHeight + 20;
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                });
            });
        }
    };

    // Lazy Load Images
    const lazyLoad = {
        init() {
            const images = document.querySelectorAll('img[loading="lazy"]');
            
            if ('loading' in HTMLImageElement.prototype) {
                // Native lazy loading supported
                return;
            }
            
            // Fallback for browsers without native lazy loading
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.src;
                        img.removeAttribute('loading');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    };

    // Initialize everything when DOM is ready
    function init() {
        slideshow.init();
        nav.init();
        bookingBar.init();
        scrollAnimations.init();
        smoothScroll.init();
        lazyLoad.init();
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
