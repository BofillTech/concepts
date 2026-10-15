// Booking bar functionality
(function() {
    const bookingBar = document.getElementById('bookingBar');
    const bookingForm = document.getElementById('bookingForm');
    const hero = document.querySelector('.hero');
    
    // Set default dates (tomorrow and day after)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    checkinInput.value = formatDate(tomorrow);
    checkoutInput.value = formatDate(dayAfter);
    checkinInput.min = formatDate(new Date());
    
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Show booking bar after scrolling past hero
    function handleScroll() {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > heroBottom) {
            bookingBar.classList.add('is-visible');
        } else {
            bookingBar.classList.remove('is-visible');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const checkin = checkinInput.value;
        const checkout = checkoutInput.value;
        const guests = document.getElementById('guests').value;
        
        // ResNexus doesn't support date parameters in their standard booking link
        // Open the plain booking engine URL
        const bookingUrl = 'https://resnexus.com/resnexus/reservations/book/B0973C2D-6D0A-49F7-A354-2F39BEF11A16';
        
        window.open(bookingUrl, '_blank');
    });
    
    // Update checkout min date when checkin changes
    checkinInput.addEventListener('change', function() {
        const checkinDate = new Date(this.value);
        checkinDate.setDate(checkinDate.getDate() + 1);
        checkoutInput.min = formatDate(checkinDate);
        
        if (checkoutInput.value && new Date(checkoutInput.value) <= new Date(this.value)) {
            checkoutInput.value = formatDate(checkinDate);
        }
    });
})();
