/**
 * Common date-picker booking bar JavaScript
 * Can be adapted for each hotel's specific booking engine
 */

function initDatePickerBookingBar(config) {
    const { bookingBarId, bookingUrl, engine, heroSelector } = config;
    
    const bookingBar = document.getElementById(bookingBarId || 'bookingBar');
    const hero = document.querySelector(heroSelector || '.hero');
    const body = document.body;
    
    if (!bookingBar || !hero) {
        console.warn('Booking bar or hero not found');
        return;
    }

    let heroHeight = hero.offsetHeight;

    // Initialize date inputs with tomorrow and day after
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const guestsSelect = document.getElementById('guests');
    
    if (checkinInput && checkoutInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfter = new Date();
        dayAfter.setDate(dayAfter.getDate() + 2);
        
        checkinInput.value = tomorrow.toISOString().split('T')[0];
        checkoutInput.value = dayAfter.toISOString().split('T')[0];
        checkinInput.min = tomorrow.toISOString().split('T')[0];
        
        // Ensure checkout is always after checkin
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            const checkoutDate = new Date(checkoutInput.value);
            
            if (checkoutDate <= checkinDate) {
                const newCheckout = new Date(checkinDate);
                newCheckout.setDate(newCheckout.getDate() + 1);
                checkoutInput.value = newCheckout.toISOString().split('T')[0];
            }
            
            checkoutInput.min = this.value;
        });
        
        checkoutInput.addEventListener('change', function() {
            const checkinDate = new Date(checkinInput.value);
            const checkoutDate = new Date(this.value);
            
            if (checkoutDate <= checkinDate) {
                const newCheckout = new Date(checkinDate);
                newCheckout.setDate(newCheckout.getDate() + 1);
                this.value = newCheckout.toISOString().split('T')[0];
            }
        });
    }
    
    // Handle booking submission
    const submitButton = document.getElementById('booking-bar-submit');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            let finalUrl = bookingUrl;
            
            if (engine === 'cloudbeds' && checkinInput && checkoutInput && guestsSelect) {
                const checkin = checkinInput.value;
                const checkout = checkoutInput.value;
                const adults = guestsSelect.value;
                finalUrl = `${bookingUrl}#checkin=${checkin}&checkout=${checkout}&adults=${adults}`;
                console.log('Booking URL (Cloudbeds):', finalUrl);
            } else if (engine === 'siteminder' && checkinInput && checkoutInput && guestsSelect) {
                const checkin = checkinInput.value;
                const checkout = checkoutInput.value;
                const adults = guestsSelect.value;
                finalUrl = `${bookingUrl}?locale=en&checkInDate=${checkin}&checkOutDate=${checkout}&items%5B0%5D%5Badults%5D=${adults}&items%5B0%5D%5Bchildren%5D=0&items%5B0%5D%5Binfants%5D=0&currency=USD`;
                console.log('Booking URL (SiteMinder):', finalUrl);
            } else if (engine === 'synxis' && checkinInput && checkoutInput && guestsSelect) {
                const checkin = checkinInput.value;
                const checkout = checkoutInput.value;
                const adults = guestsSelect.value;
                finalUrl = `${bookingUrl}&arrive=${checkin}&depart=${checkout}&adult=${adults}&rooms=1`;
                console.log('Booking URL (SynXis):', finalUrl);
            } else {
                console.log('Booking URL (link only):', finalUrl);
            }
            
            window.open(finalUrl, '_blank', 'noopener,noreferrer');
        });
    }

    function toggleBookingBar() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > heroHeight * 0.6) {
            bookingBar.classList.add('visible');
            body.classList.add('booking-bar-visible');
        } else {
            bookingBar.classList.remove('visible');
            body.classList.remove('booking-bar-visible');
        }
    }

    // Check initial state
    toggleBookingBar();

    // Throttle scroll event for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                toggleBookingBar();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Recalculate hero height on resize and recheck visibility
    window.addEventListener('resize', function() {
        heroHeight = hero.offsetHeight;
        toggleBookingBar();
    });
}
