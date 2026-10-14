// Hotel Captain Cook - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Booking bar functionality
    const bookingBar = document.getElementById('bookingBar');
    const hero = document.querySelector('.hero');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const bookingBarBtn = document.getElementById('bookingBarBtn');

    // Set default dates (tomorrow and day after)
    function setDefaultDates() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfter = new Date();
        dayAfter.setDate(dayAfter.getDate() + 2);

        checkinInput.valueAsDate = tomorrow;
        checkoutInput.valueAsDate = dayAfter;
        
        // Set min dates
        checkinInput.min = tomorrow.toISOString().split('T')[0];
        checkoutInput.min = dayAfter.toISOString().split('T')[0];
    }

    setDefaultDates();

    // Update checkout min date when checkin changes
    checkinInput.addEventListener('change', function() {
        const checkinDate = new Date(this.value);
        const minCheckout = new Date(checkinDate);
        minCheckout.setDate(minCheckout.getDate() + 1);
        checkoutInput.min = minCheckout.toISOString().split('T')[0];
        
        // Update checkout if it's before new min
        if (new Date(checkoutInput.value) <= checkinDate) {
            checkoutInput.valueAsDate = minCheckout;
        }
    });

    // Show/hide booking bar on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroBottom = hero.offsetTop + hero.offsetHeight;

        if (scrollTop > heroBottom) {
            bookingBar.classList.add('is-visible');
        } else {
            bookingBar.classList.remove('is-visible');
        }

        lastScrollTop = scrollTop;
    });

    // Handle booking button clicks
    function handleBooking() {
        const checkin = checkinInput.value;
        const checkout = checkoutInput.value;
        const guests = document.getElementById('guests').value;

        if (!checkin || !checkout) {
            alert('Please select check-in and check-out dates.');
            return;
        }

        // Format dates for AZDS booking engine
        const checkinFormatted = checkin;
        const checkoutFormatted = checkout;

        // Build booking URL
        const bookingUrl = `https://newbooking.azds.com/captain-cook/#checkin=${checkinFormatted}&checkout=${checkoutFormatted}&adults=${guests}`;

        // Open booking engine
        window.open(bookingUrl, '_blank', 'noopener');
    }

    bookingBarBtn.addEventListener('click', handleBooking);

    // Header book now buttons
    const headerBookBtn = document.querySelector('.header__btn-book');
    const ctaBtn = document.querySelector('.cta__btn');

    headerBookBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleBooking();
    });

    ctaBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleBooking();
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.header__menu-toggle');
    const nav = document.querySelector('.header__nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            this.classList.toggle('is-active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const bookingBarHeight = bookingBar.classList.contains('is-visible') ? 
                        bookingBar.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight - bookingBarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (window.innerWidth <= 768 && nav) {
                        nav.style.display = 'none';
                        menuToggle.classList.remove('is-active');
                    }
                }
            }
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});
