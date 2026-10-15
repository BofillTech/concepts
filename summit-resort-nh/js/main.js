// Set default dates
function setDefaultDates() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        checkinInput.value = tomorrow.toISOString().split('T')[0];
        checkoutInput.value = dayAfter.toISOString().split('T')[0];
        
        checkinInput.min = tomorrow.toISOString().split('T')[0];
        checkoutInput.min = dayAfter.toISOString().split('T')[0];
    }
}

// Show/hide booking bar on scroll
function handleBookingBarVisibility() {
    const bookingBar = document.getElementById('bookingBar');
    const hero = document.querySelector('.hero');
    
    if (!bookingBar || !hero) return;
    
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > heroBottom) {
        bookingBar.classList.add('is-visible');
    } else {
        bookingBar.classList.remove('is-visible');
    }
}

// Handle booking button click
function handleBookNowClick() {
    const bookingUrl = 'https://bookings.summitresortnh.com/';
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
}

// Update checkout date when checkin changes
function handleCheckinChange(event) {
    const checkinInput = event.target;
    const checkoutInput = document.getElementById('checkout');
    
    if (!checkoutInput) return;
    
    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);
    
    const minCheckout = new Date(checkinDate);
    minCheckout.setDate(minCheckout.getDate() + 1);
    
    checkoutInput.min = minCheckout.toISOString().split('T')[0];
    
    if (checkoutDate <= checkinDate) {
        checkoutInput.value = minCheckout.toISOString().split('T')[0];
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setDefaultDates();
    
    const bookNowBtn = document.getElementById('bookNowBtn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', handleBookNowClick);
    }
    
    const checkinInput = document.getElementById('checkin');
    if (checkinInput) {
        checkinInput.addEventListener('change', handleCheckinChange);
    }
    
    window.addEventListener('scroll', handleBookingBarVisibility);
    handleBookingBarVisibility();
});
