// Booking Bar Visibility
document.addEventListener('DOMContentLoaded', function() {
  const bookingBar = document.getElementById('bookingBar');
  const hero = document.querySelector('.hero');
  const bookingForm = document.getElementById('bookingForm');
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  const guestsInput = document.getElementById('guests');
  
  // Set default dates (tomorrow and day after)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);
  
  checkinInput.value = formatDate(tomorrow);
  checkoutInput.value = formatDate(dayAfter);
  
  // Format date as YYYY-MM-DD
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Show booking bar after scrolling past hero
  function checkBookingBarVisibility() {
    if (!hero || !bookingBar) return;
    
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;
    
    if (scrollPosition > heroBottom) {
      bookingBar.classList.add('booking-bar--visible');
    } else {
      bookingBar.classList.remove('booking-bar--visible');
    }
  }
  
  window.addEventListener('scroll', checkBookingBarVisibility);
  checkBookingBarVisibility();
  
  // Handle booking form submission
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const guests = guestsInput.value;
    
    // Cloudbeds URL format: #checkin=YYYY-MM-DD&checkout=YYYY-MM-DD&adults=N
    const baseUrl = 'https://hotels.cloudbeds.com/reservation/P7bT9X';
    const bookingUrl = `${baseUrl}#checkin=${checkin}&checkout=${checkout}&adults=${guests}`;
    
    window.open(bookingUrl, '_blank', 'noopener');
  });
  
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
