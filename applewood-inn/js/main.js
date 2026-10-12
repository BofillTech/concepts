/**
 * Applewood Inn - Main JavaScript
 * Vanilla ES6+ IIFE pattern
 * No inline styles, no DOM .style assignments
 */

(function() {
  'use strict';

  // ==========================================================================
  // Navigation active state on scroll
  // ==========================================================================
  
  const nav = document.querySelector('.nav-primary');
  const navLinks = document.querySelectorAll('.menu-item a[href^="#"]');
  
  if (nav && navLinks.length > 0) {
    const sections = Array.from(navLinks)
      .map(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#main') {
          const section = document.querySelector(href);
          return section ? { link, section } : null;
        }
        return null;
      })
      .filter(Boolean);
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeSection = sections.find(item => item.section === entry.target);
          if (activeSection) {
            navLinks.forEach(link => link.classList.remove('active'));
            activeSection.link.classList.add('active');
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(item => observer.observe(item.section));
  }
  
  // ==========================================================================
  // Image fallback for broken images
  // ==========================================================================
  
  const images = document.querySelectorAll('img[data-fallback-text]');
  
  images.forEach(img => {
    img.addEventListener('error', function() {
      const fallbackText = this.getAttribute('data-fallback-text');
      if (fallbackText) {
        const parent = this.parentElement;
        parent.classList.add('image-fallback');
        const textNode = document.createElement('span');
        textNode.textContent = fallbackText;
        textNode.classList.add('image-fallback__text');
        parent.replaceChild(textNode, this);
      }
    });
  });
  
  // ==========================================================================
  // Smooth scroll polyfill for older browsers (graceful enhancement)
  // ==========================================================================
  
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without triggering scroll
          if (history.pushState) {
            history.pushState(null, null, href);
          }
          
          // Focus target for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      }
    });
  });
  
  // ==========================================================================
  // Staggered reveal animation on scroll (for sections with data attribute)
  // ==========================================================================
  
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  if (revealElements.length > 0) {
    const revealOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };
    
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => {
      el.classList.add('will-reveal');
      revealObserver.observe(el);
    });
  }
  
  // ==========================================================================
  // Lazy loading enhancement (native lazy load with IntersectionObserver fallback)
  // ==========================================================================
  
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported, nothing to do
  } else {
    // Fallback for browsers without native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if (lazyImages.length > 0) {
      const lazyOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0
      };
      
      const lazyCallback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('src');
            if (src) {
              img.src = src;
            }
            observer.unobserve(img);
          }
        });
      };
      
      const lazyObserver = new IntersectionObserver(lazyCallback, lazyOptions);
      lazyImages.forEach(img => lazyObserver.observe(img));
    }
  }
  
  // ==========================================================================
  // Booking Bar with Date Picker
  // ==========================================================================

  const bookingBar = document.getElementById('bookingBar');
  const hero = document.querySelector('.hero');

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
        const bookingUrl = 'https://www.applewoodbb.com/book-now/';
        console.log('Applewood Inn booking URL:', bookingUrl);
        window.open(bookingUrl, '_blank', 'noopener,noreferrer');
      });
    }

    // Show/hide booking bar on scroll
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

  // ==========================================================================
  // Prefers reduced motion - disable animations
  // ==========================================================================
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.documentElement.classList.add('reduce-motion');
  }
  
  prefersReducedMotion.addEventListener('change', () => {
    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  });
  
  // ==========================================================================
  // Console signature
  // ==========================================================================
  
  console.log(
    '%c🍎 Applewood Inn',
    'font-size: 16px; font-weight: bold; color: #8e5646;'
  );
  console.log(
    '%cVictorian elegance in Freeport, Maine\nA BofillTech Concepts reimagining',
    'font-size: 12px; color: #2d5f4a;'
  );
  
})();
