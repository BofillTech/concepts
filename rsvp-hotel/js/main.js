// RSVP Hotel - Bozeman, MT
// Ledger #167: staggered-reveal motion + sticky booking bar

(function() {
  'use strict';

  // ========================================
  // Mobile Menu Toggle
  // ========================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      
      if (isOpen) {
        mobileMenu.style.display = 'block';
      } else {
        setTimeout(() => {
          mobileMenu.style.display = 'none';
        }, 300);
      }
    });

    // Close mobile menu when clicking links
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        setTimeout(() => {
          mobileMenu.style.display = 'none';
        }, 300);
      });
    });
  }

  // ========================================
  // Sticky Booking Bar
  // ========================================
  const bookingBar = document.getElementById('booking-bar');
  const hero = document.querySelector('.hero');
  let heroHeight = 0;

  if (bookingBar && hero) {
    // Calculate hero height
    heroHeight = hero.offsetHeight;

    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY || window.pageYOffset;

      if (scrollY > heroHeight) {
        bookingBar.classList.add('is-visible');
        bookingBar.setAttribute('aria-hidden', 'false');
      } else {
        bookingBar.classList.remove('is-visible');
        bookingBar.setAttribute('aria-hidden', 'true');
      }
    });

    // Recalculate hero height on resize
    window.addEventListener('resize', function() {
      heroHeight = hero.offsetHeight;
    });
  }

  // ========================================
  // Staggered Reveal Animation (Intersection Observer)
  // ========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const revealCallback = function(entries, observer) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add stagger delay based on index
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * 100);
        
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, observerOptions);

  // Observe all sections except hero
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    revealObserver.observe(section);
  });

  // ========================================
  // Smooth Scroll Enhancement
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Don't prevent default for just "#"
      if (href === '#' || href === '') return;
      
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // Room Cards Horizontal Scroll Enhancement
  // ========================================
  const roomsScroll = document.querySelector('.rooms-scroll');
  
  if (roomsScroll) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse drag to scroll (desktop)
    roomsScroll.addEventListener('mousedown', (e) => {
      isDown = true;
      roomsScroll.style.cursor = 'grabbing';
      startX = e.pageX - roomsScroll.offsetLeft;
      scrollLeft = roomsScroll.scrollLeft;
    });

    roomsScroll.addEventListener('mouseleave', () => {
      isDown = false;
      roomsScroll.style.cursor = 'grab';
    });

    roomsScroll.addEventListener('mouseup', () => {
      isDown = false;
      roomsScroll.style.cursor = 'grab';
    });

    roomsScroll.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - roomsScroll.offsetLeft;
      const walk = (x - startX) * 2;
      roomsScroll.scrollLeft = scrollLeft - walk;
    });

    // Add grab cursor hint
    roomsScroll.style.cursor = 'grab';
  }

  // ========================================
  // Prefers Reduced Motion Support
  // ========================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    // Instantly show all sections if user prefers reduced motion
    sections.forEach(section => {
      section.classList.add('is-visible');
    });
  }

  // ========================================
  // Initialize on Load
  // ========================================
  window.addEventListener('load', function() {
    // Trigger scroll check in case page loads mid-scroll
    window.dispatchEvent(new Event('scroll'));
  });

})();
