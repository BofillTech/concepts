/**
 * Coyote Mountain Lodge — main.js
 * Motion: parallax-layers
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Mobile menu toggle
   */
  const menuToggle = document.querySelector('.header__toggle');
  const navMenu = document.querySelector('.header__nav');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isOpen);
      navMenu.classList.toggle('is-open');
    });

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      });
    });
  }

  /**
   * Sticky bottom booking bar
   * Appears after scrolling past hero
   */
  const bookingBar = document.getElementById('booking-bar');
  const hero = document.querySelector('.hero');

  function toggleBookingBar() {
    if (!bookingBar || !hero) return;

    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;

    if (scrolled > heroBottom - 100) {
      bookingBar.classList.add('is-visible');
      bookingBar.setAttribute('aria-hidden', 'false');
    } else {
      bookingBar.classList.remove('is-visible');
      bookingBar.setAttribute('aria-hidden', 'true');
    }
  }

  window.addEventListener('scroll', toggleBookingBar);
  toggleBookingBar(); // Check on load

  /**
   * Parallax layers
   * Elements with data-parallax attribute move at different speeds
   */
  if (!prefersReducedMotion) {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    function updateParallax() {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(function(el) {
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const elementHeight = el.offsetHeight;
        const windowHeight = window.innerHeight;

        // Only apply parallax when element is in viewport or near it
        if (rect.top < windowHeight && rect.bottom > 0) {
          const parallaxType = el.getAttribute('data-parallax');
          let speed = 0.3; // default medium

          switch(parallaxType) {
            case 'slow':
              speed = 0.5;
              break;
            case 'medium':
              speed = 0.3;
              break;
            case 'fast':
              speed = 0.15;
              break;
            case 'layer':
              speed = 0.2;
              break;
            default:
              speed = 0.3;
          }

          // Calculate parallax offset
          const offset = (scrolled - elementTop + windowHeight) * speed;
          
          // For hero slow parallax, move down as you scroll
          if (parallaxType === 'slow') {
            const yPos = offset * -0.4;
            el.style.transform = 'translateY(' + yPos + 'px)';
          } else {
            // For layer elements, subtle upward motion
            const yPos = (scrolled - elementTop) * speed * -0.5;
            el.style.transform = 'translateY(' + yPos + 'px)';
          }
        }
      });
    }

    // Throttle scroll handler for performance
    let ticking = false;
    function requestParallaxUpdate() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestParallaxUpdate);
    updateParallax(); // Initial position
  }

  /**
   * Lazy loading images below the fold
   */
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // If src is already set (by browser native lazy loading), do nothing
          // This is a progressive enhancement for older browsers
          if (!img.complete) {
            img.addEventListener('load', function() {
              img.style.opacity = '1';
            });
          }
          
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  /**
   * Smooth scroll for anchor links (polyfill for browsers without CSS scroll-behavior)
   */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /**
   * Add loaded class to body for any CSS transitions on page load
   */
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

})();
