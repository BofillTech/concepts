document.addEventListener('DOMContentLoaded', function() {
    const bookingBar = document.getElementById('bookingBar');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const guestsSelect = document.getElementById('guests');
    const bookingBarBtn = document.getElementById('bookingBarBtn');
    const hero = document.querySelector('.hero');
    
    const BASE_BOOKING_URL = 'https://app.thebookingbutton.com/properties/mountainviewlodgeandsuitesdirect';
    
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    function setDefaultDates() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const dayAfterTomorrow = new Date(tomorrow);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
        
        checkinInput.value = formatDate(tomorrow);
        checkinInput.min = formatDate(today);
        
        checkoutInput.value = formatDate(dayAfterTomorrow);
        checkoutInput.min = formatDate(tomorrow);
    }
    
    checkinInput.addEventListener('change', function() {
        const checkinDate = new Date(this.value);
        const minCheckout = new Date(checkinDate);
        minCheckout.setDate(minCheckout.getDate() + 1);
        
        checkoutInput.min = formatDate(minCheckout);
        
        const currentCheckout = new Date(checkoutInput.value);
        if (currentCheckout <= checkinDate) {
            checkoutInput.value = formatDate(minCheckout);
        }
    });
    
    function buildBookingUrl() {
        const checkin = checkinInput.value;
        const checkout = checkoutInput.value;
        const guests = guestsSelect.value;
        
        if (!checkin || !checkout) {
            return BASE_BOOKING_URL;
        }
        
        const url = new URL(BASE_BOOKING_URL);
        url.searchParams.set('check_in_date', checkin);
        url.searchParams.set('check_out_date', checkout);
        url.searchParams.set('number_adults', guests);
        
        return url.toString();
    }
    
    function handleBookingClick(e) {
        e.preventDefault();
        const bookingUrl = buildBookingUrl();
        window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    }
    
    bookingBarBtn.addEventListener('click', handleBookingClick);
    
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) {
                bookingBar.classList.add('booking-bar--visible');
            } else {
                bookingBar.classList.remove('booking-bar--visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    if (hero) {
        heroObserver.observe(hero);
    }
    
    setDefaultDates();
    
    const mobileToggle = document.querySelector('.header__mobile-toggle');
    const headerNav = document.querySelector('.header__nav');
    
    if (mobileToggle && headerNav) {
        mobileToggle.addEventListener('click', function() {
            const isOpen = headerNav.style.display === 'flex';
            headerNav.style.display = isOpen ? 'none' : 'flex';
            
            if (!isOpen) {
                headerNav.style.position = 'absolute';
                headerNav.style.top = '100%';
                headerNav.style.left = '0';
                headerNav.style.right = '0';
                headerNav.style.background = 'var(--color-white)';
                headerNav.style.flexDirection = 'column';
                headerNav.style.padding = 'var(--spacing-md)';
                headerNav.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }
        });
    }
});
