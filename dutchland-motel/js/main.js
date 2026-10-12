/**
 * Dutchland Motel - Main JavaScript
 * Homepage Concept Redesign
 */

(function() {
  'use strict';

  // DOM Elements
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const bookingBar = document.getElementById('bookingBar');
  const hero = document.querySelector('.hero');

  // Mobile Navigation Toggle
  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('is-active');
      nav.classList.toggle('is-open');
      
      // Prevent body scroll when menu is open
      if (nav.classList.contains('is-open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking a link
    const menuLinks = document.querySelectorAll('.header__menu-link');
    menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('is-active');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Sticky Booking Bar - Show after scrolling past hero
  let heroHeight = 0;
  let bookingBarVisible = false;

  function updateHeroHeight() {
    if (hero) {
      heroHeight = hero.offsetHeight;
    }
  }

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
  
  // Handle booking submission - SiteMinder with date params
  const submitButton = document.getElementById('booking-bar-submit');
  if (submitButton) {
    submitButton.addEventListener('click', function() {
      const checkin = checkinInput.value;
      const checkout = checkoutInput.value;
      const adults = guestsSelect.value;
      const bookingUrl = 'https://direct-book.com/properties/dutchlandmoteldirect?locale=en&checkInDate=' + checkin + 
          '&checkOutDate=' + checkout + 
          '&items%5B0%5D%5Badults%5D=' + adults + 
          '&items%5B0%5D%5Bchildren%5D=0&items%5B0%5D%5Binfants%5D=0&currency=USD';
      console.log('Booking URL (SiteMinder):', bookingUrl);
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    });
  }

  function handleBookingBarVisibility() {
    if (!bookingBar || !hero) return;

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollPosition > heroHeight && !bookingBarVisible) {
      bookingBar.classList.add('is-visible');
      document.body.classList.add('booking-bar-visible');
      bookingBarVisible = true;
    } else if (scrollPosition <= heroHeight && bookingBarVisible) {
      bookingBar.classList.remove('is-visible');
      document.body.classList.remove('booking-bar-visible');
      bookingBarVisible = false;
    }
  }

  // Initialize hero height and set up scroll listener
  updateHeroHeight();
  window.addEventListener('resize', updateHeroHeight);
  window.addEventListener('scroll', handleBookingBarVisibility, { passive: true });
  
  // Check initial state
  handleBookingBarVisibility();

  // Intersection Observer for fade-up animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  function handleIntersection(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optionally unobserve after animating once
        observer.unobserve(entry.target);
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  // Observe elements for fade-up animation
  const animatedElements = document.querySelectorAll('.room-card, .amenity-card, .gallery__image');
  animatedElements.forEach(function(element) {
    observer.observe(element);
  });

  // Smooth scroll polyfill check (smooth scroll is in CSS, but this ensures programmatic scrolls work)
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Don't prevent default for empty hash
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80; // header height
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Detect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    // User prefers reduced motion - animations are already disabled via CSS
    // This is just a placeholder for any JS-based animations we might add
    console.log('Reduced motion preference detected');
  }

  // Handle window resize events (debounced)
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Close mobile menu on resize to larger screen
      if (window.innerWidth > 968 && nav && nav.classList.contains('is-open')) {
        hamburger.classList.remove('is-active');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    }, 250);
  });

})();
