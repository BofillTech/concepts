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

// Sticky booking strip
function handleBookingStrip() {
    const bookingStrip = document.getElementById('bookingStrip');
    const hero = document.querySelector('.hero');
    
    if (!bookingStrip || !hero) return;
    
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > heroBottom) {
            bookingStrip.classList.add('booking-strip--show');
        } else {
            bookingStrip.classList.remove('booking-strip--show');
        }
    });
}

// Book by phone (no online booking)
function handleBooking() {
    const bookingBtn = document.getElementById('bookingBtn');
    
    if (bookingBtn) {
        bookingBtn.addEventListener('click', () => {
            window.location.href = 'tel:+18023756532';
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setDefaultDates();
    handleBookingStrip();
    handleBooking();
});
