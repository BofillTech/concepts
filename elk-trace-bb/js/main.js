document.addEventListener('DOMContentLoaded', function() {
    const bookingBar = document.getElementById('bookingBar');
    const bookNowBtn = document.getElementById('bookNowBtn');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const guestsSelect = document.getElementById('guests');
    const hero = document.querySelector('.hero');

    function setDefaultDates() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfter = new Date(today);
        dayAfter.setDate(dayAfter.getDate() + 2);

        checkinInput.value = formatDateForInput(tomorrow);
        checkoutInput.value = formatDateForInput(dayAfter);
        checkinInput.min = formatDateForInput(today);
    }

    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function handleScroll() {
        if (!hero || !bookingBar) return;
        
        const heroRect = hero.getBoundingClientRect();
        const heroBottom = heroRect.bottom;

        if (heroBottom <= 0) {
            bookingBar.classList.add('booking-bar--visible');
        } else {
            bookingBar.classList.remove('booking-bar--visible');
        }
    }

    function handleBookNow() {
        window.location.href = 'tel:+19709463031';
    }

    checkinInput.addEventListener('change', function() {
        if (checkinInput.value && checkoutInput.value) {
            const checkin = new Date(checkinInput.value);
            const checkout = new Date(checkoutInput.value);
            
            if (checkout <= checkin) {
                const newCheckout = new Date(checkin);
                newCheckout.setDate(newCheckout.getDate() + 1);
                checkoutInput.value = formatDateForInput(newCheckout);
            }
        }
        
        checkoutInput.min = checkinInput.value;
    });

    setDefaultDates();
    
    window.addEventListener('scroll', handleScroll);
    
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', handleBookNow);
    }
});
