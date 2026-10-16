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

// Sticky booking bar
function handleStickyBooking() {
    const stickyBooking = document.getElementById('stickyBooking');
    const hero = document.querySelector('.hero');
    
    if (!stickyBooking || !hero) return;
    
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > heroBottom) {
            stickyBooking.classList.add('sticky-booking--active');
        } else {
            stickyBooking.classList.remove('sticky-booking--active');
        }
    });
}

// Book now - Frank Hotels doesn't support date parameters in URL
function handleBooking() {
    const stickyBookBtn = document.getElementById('stickyBookBtn');
    const bookingUrl = 'https://book.frankhotels.com/results.cfm/mode/details/id/2757';
    
    if (stickyBookBtn) {
        stickyBookBtn.addEventListener('click', () => {
            window.location.href = bookingUrl;
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setDefaultDates();
    handleStickyBooking();
    handleBooking();
});
