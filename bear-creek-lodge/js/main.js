// Booking bar visibility
const bookingBar = document.getElementById('bookingBar');
const hero = document.querySelector('.hero');

if (bookingBar && hero) {
    const observerOptions = {
        threshold: 0,
        rootMargin: '0px'
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                bookingBar.classList.add('booking-bar--visible');
            } else {
                bookingBar.classList.remove('booking-bar--visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(hero);
}

// Set default dates
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

if (checkinInput && checkoutInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    checkinInput.value = formatDate(tomorrow);
    checkoutInput.value = formatDate(dayAfter);
    
    checkinInput.min = formatDate(tomorrow);
    checkoutInput.min = formatDate(dayAfter);
}

// Book Now button functionality
const bookNowBtn = document.getElementById('bookNowBtn');
const guestsSelect = document.getElementById('guests');

if (bookNowBtn && checkinInput && checkoutInput && guestsSelect) {
    bookNowBtn.addEventListener('click', () => {
        const checkin = checkinInput.value;
        const checkout = checkoutInput.value;
        const guests = guestsSelect.value;
        
        // Booking Center uses hash parameters
        const baseUrl = 'https://book.bookingcenter.com/04/?site=BEARCRE';
        
        if (checkin && checkout) {
            // Format: #checkin=YYYY-MM-DD&checkout=YYYY-MM-DD&adults=N
            const bookingUrl = `${baseUrl}#checkin=${checkin}&checkout=${checkout}&adults=${guests}`;
            window.open(bookingUrl, '_blank', 'noopener,noreferrer');
        } else {
            window.open(baseUrl, '_blank', 'noopener,noreferrer');
        }
    });
}

// Header book button
const headerBookBtn = document.querySelector('.header__book-btn');
if (headerBookBtn) {
    headerBookBtn.addEventListener('click', (e) => {
        const checkin = checkinInput?.value;
        const checkout = checkoutInput?.value;
        const guests = guestsSelect?.value || '2';
        
        if (checkin && checkout) {
            e.preventDefault();
            const baseUrl = 'https://book.bookingcenter.com/04/?site=BEARCRE';
            const bookingUrl = `${baseUrl}#checkin=${checkin}&checkout=${checkout}&adults=${guests}`;
            window.open(bookingUrl, '_blank', 'noopener,noreferrer');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header').offsetHeight;
            const bookingBarHeight = bookingBar?.classList.contains('booking-bar--visible') 
                ? bookingBar.offsetHeight 
                : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight - bookingBarHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Update checkout min date when checkin changes
if (checkinInput && checkoutInput) {
    checkinInput.addEventListener('change', () => {
        const checkinDate = new Date(checkinInput.value);
        const minCheckout = new Date(checkinDate);
        minCheckout.setDate(minCheckout.getDate() + 1);
        
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        checkoutInput.min = formatDate(minCheckout);
        
        if (new Date(checkoutInput.value) <= checkinDate) {
            checkoutInput.value = formatDate(minCheckout);
        }
    });
}
