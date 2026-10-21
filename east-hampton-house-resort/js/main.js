// East Hampton House Resort

(function() {
  'use strict';

  // Mobile menu
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('.nav');
  
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });

    nav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Booking bar dates
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

  console.log('East Hampton House Resort loaded');
})();
