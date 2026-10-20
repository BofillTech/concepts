// Shashi Hotel - Main JS

(function() {
  'use strict';

  // Menu overlay toggle
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navOverlay = document.querySelector('[data-nav-overlay]');
  const navClose = document.querySelector('[data-nav-close]');
  
  if (menuToggle && navOverlay) {
    menuToggle.addEventListener('click', function() {
      navOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (navClose && navOverlay) {
    navClose.addEventListener('click', function() {
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close on link click
    const navLinks = navOverlay.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close on overlay click
    navOverlay.addEventListener('click', function(e) {
      if (e.target === navOverlay) {
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('[data-header]')?.offsetHeight || 0;
        const bookingBarHeight = document.querySelector('[data-book-bar]')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Set min date for booking inputs
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  
  if (checkinInput && checkoutInput) {
    const today = new Date().toISOString().split('T')[0];
    checkinInput.setAttribute('min', today);
    checkoutInput.setAttribute('min', today);

    checkinInput.addEventListener('change', function() {
      const checkinDate = new Date(this.value);
      checkinDate.setDate(checkinDate.getDate() + 1);
      checkoutInput.setAttribute('min', checkinDate.toISOString().split('T')[0]);
      
      if (checkoutInput.value && new Date(checkoutInput.value) <= new Date(this.value)) {
        checkoutInput.value = '';
      }
    });
  }

  // Parallax effect for hero image (subtle)
  const heroImage = document.querySelector('.hero__image img');
  if (heroImage) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });
  }

  // Fade-in animation for sections on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.room-item, .amenity-card, .dining-card, .sustain-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  console.log('Shashi Hotel - Site loaded');
})();
