// ============================
// Booking Bar Visibility
// ============================

document.addEventListener('DOMContentLoaded', function() {
    const bookingBar = document.getElementById('bookingBar');
    const hero = document.querySelector('.hero');
    
    if (bookingBar && hero) {
        const heroHeight = hero.offsetHeight;
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition > heroHeight) {
                bookingBar.classList.add('booking-bar--visible');
            } else {
                bookingBar.classList.remove('booking-bar--visible');
            }
        });
    }
    
    // ============================
    // Booking Form Submission
    // ============================
    
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;
            
            // LuxuryRes booking engine URL parameters
            // h=10149 (hotel ID)
            // a=YYYY-MM-DD (arrival/check-in)
            // d=YYYY-MM-DD (departure/check-out)
            // ad=N (adults)
            const baseUrl = 'https://www.luxuryres.com/BookingEngines/V16/index.asp';
            let bookingUrl = `${baseUrl}?h=10149`;
            
            if (checkin && checkout) {
                bookingUrl += `&a=${checkin}&d=${checkout}`;
            }
            
            if (guests) {
                bookingUrl += `&ad=${guests}`;
            }
            
            window.open(bookingUrl, '_blank', 'noopener,noreferrer');
        });
    }
    
    // ============================
    // Set Default Dates
    // ============================
    
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        const dayAfter = new Date(today);
        
        tomorrow.setDate(today.getDate() + 1);
        dayAfter.setDate(today.getDate() + 2);
        
        checkinInput.value = tomorrow.toISOString().split('T')[0];
        checkoutInput.value = dayAfter.toISOString().split('T')[0];
        
        checkinInput.min = tomorrow.toISOString().split('T')[0];
        
        checkinInput.addEventListener('change', function() {
            const selectedCheckin = new Date(this.value);
            const minCheckout = new Date(selectedCheckin);
            minCheckout.setDate(selectedCheckin.getDate() + 1);
            
            checkoutInput.min = minCheckout.toISOString().split('T')[0];
            
            if (new Date(checkoutInput.value) <= selectedCheckin) {
                checkoutInput.value = minCheckout.toISOString().split('T')[0];
            }
        });
    }
    
    // ============================
    // Mobile Navigation Toggle
    // ============================
    
    const mobileToggle = document.querySelector('.header__mobile-toggle');
    const nav = document.querySelector('.header__nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('header__nav--open');
            mobileToggle.classList.toggle('header__mobile-toggle--active');
        });
    }
    
    // ============================
    // Smooth Scroll for Navigation Links
    // ============================
    
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    if (nav && nav.classList.contains('header__nav--open')) {
                        nav.classList.remove('header__nav--open');
                        if (mobileToggle) {
                            mobileToggle.classList.remove('header__mobile-toggle--active');
                        }
                    }
                }
            }
        });
    });
});
