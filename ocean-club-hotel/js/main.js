/**
 * Ocean Club Hotel - Main JavaScript
 * Ledger #165: subtle-fade motion, top-transparent-to-solid nav
 */

(function() {
  'use strict';

  // ==========================================
  // Navigation Scroll Behavior
  // ==========================================
  function initNavigation() {
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!nav) return;

    // Handle scroll state
    function handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 50) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }

    // Initial check
    handleScroll();

    // Listen to scroll events with throttle
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('nav__menu--open');
      });

      // Close menu when clicking a link
      const navLinks = navMenu.querySelectorAll('.nav__link');
      navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          navMenu.classList.remove('nav__menu--open');
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) {
          navMenu.classList.remove('nav__menu--open');
        }
      });
    }
  }

  // ==========================================
  // Sticky Bottom Booking Bar
  // ==========================================
  function initBookingBar() {
    const bookingBar = document.getElementById('bookingBar');
    const hero = document.getElementById('hero');
    
    if (!bookingBar || !hero) return;

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

    // Recalculate on resize
    window.addEventListener('resize', function() {
      toggleBookingBar();
    });
  }

  // ==========================================
  // Smooth Scroll for Anchor Links
  // ==========================================
  function initSmoothScroll() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return; // Skip smooth scroll if user prefers reduced motion
    }

    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const navHeight = document.getElementById('mainNav').offsetHeight;
          const targetPosition = target.offsetTop - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ==========================================
  // Fade-in Animation on Scroll (Subtle)
  // ==========================================
  function initScrollAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return; // Skip animations if user prefers reduced motion
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
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

    // Observe room cards, amenity cards, and dining cards
    const animatableElements = document.querySelectorAll(
      '.room-card, .amenity-card, .dining-card, .gallery__item'
    );

    animatableElements.forEach(function(el, index) {
      // Set initial state
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.transitionDelay = (index % 6) * 0.1 + 's';
      
      observer.observe(el);
    });
  }

  // ==========================================
  // Lazy Load Images
  // ==========================================
  function initLazyLoad() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // If browser doesn't support native lazy loading, use IntersectionObserver
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading, nothing to do
      return;
    }

    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.removeAttribute('loading');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  // ==========================================
  // Initialize All
  // ==========================================
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initBookingBar();
        initSmoothScroll();
        initScrollAnimations();
        initLazyLoad();
      });
    } else {
      // DOM is already ready
      initNavigation();
      initBookingBar();
      initSmoothScroll();
      initScrollAnimations();
      initLazyLoad();
    }
  }

  // Start the app
  init();

})();
