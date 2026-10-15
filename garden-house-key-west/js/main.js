// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close menu when clicking a nav link
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Booking bar visibility
const bookingBar = document.getElementById('bookingBar');
const hero = document.querySelector('.hero');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            bookingBar.classList.add('visible');
        } else {
            bookingBar.classList.remove('visible');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(hero);

// Date inputs - set defaults to tomorrow and day after
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfter = new Date();
dayAfter.setDate(dayAfter.getDate() + 2);

checkinInput.valueAsDate = tomorrow;
checkoutInput.valueAsDate = dayAfter;

// Enforce check-out after check-in
checkinInput.addEventListener('change', () => {
    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);
    
    if (checkoutDate <= checkinDate) {
        const newCheckout = new Date(checkinDate);
        newCheckout.setDate(newCheckout.getDate() + 1);
        checkoutInput.valueAsDate = newCheckout;
    }
});

// Book Now button handler - WebRez format
function handleBooking() {
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    
    if (!checkin || !checkout) {
        window.location.href = 'https://secure.webrez.com/hotel/2680/book';
        return;
    }
    
    // Convert YYYY-MM-DD to YYYYMMDD for WebRez
    const checkinFormatted = checkin.replace(/-/g, '');
    const checkoutFormatted = checkout.replace(/-/g, '');
    
    const bookingUrl = `https://secure.webrez.com/hotel/2680/book?date_from=${checkinFormatted}&date_to=${checkoutFormatted}`;
    window.location.href = bookingUrl;
}

// Attach to both header button and booking bar button
document.querySelector('.header__cta').addEventListener('click', (e) => {
    e.preventDefault();
    handleBooking();
});

document.getElementById('bookNowBtn').addEventListener('click', handleBooking);
