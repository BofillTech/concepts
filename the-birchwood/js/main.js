// Set default dates
function setDefaultDates() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    
    checkinInput.value = tomorrow.toISOString().split('T')[0];
    checkoutInput.value = dayAfter.toISOString().split('T')[0];
    
    checkinInput.min = new Date().toISOString().split('T')[0];
}

// Sticky booking bar visibility
function handleBookingBar() {
    const bookingBar = document.getElementById('bookingBar');
    const hero = document.querySelector('.hero');
    
    if (!bookingBar || !hero) return;
    
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > heroBottom) {
            bookingBar.classList.add('booking-bar--visible');
        } else {
            bookingBar.classList.remove('booking-bar--visible');
        }
    });
}

// Build booking URL with dates
function buildBookingUrl() {
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;
    
    if (!checkin || !checkout) {
        return 'https://hotels.cloudbeds.com/en/reservation/jQi5N3';
    }
    
    const baseUrl = 'https://hotels.cloudbeds.com/en/reservation/jQi5N3';
    const params = `#checkin=${checkin}&checkout=${checkout}&adults=${guests}`;
    
    return baseUrl + params;
}

// Book now button handler
function setupBookingButtons() {
    const bookNowBtn = document.getElementById('bookNowBtn');
    
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', () => {
            window.location.href = buildBookingUrl();
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setDefaultDates();
    handleBookingBar();
    setupBookingButtons();
});
