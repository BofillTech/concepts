/**
 * The General Palmer Hotel
 * Ledger #164: fullbleed-crossfade hero, parallax motion
 */

// Hero Crossfade
function initHeroCrossfade() {
    const heroImages = document.querySelectorAll('.hero__image');
    if (heroImages.length < 2) return;
    
    let currentIndex = 0;
    const fadeInterval = 6000; // 6 seconds
    
    setInterval(() => {
        heroImages[currentIndex].style.opacity = '0';
        currentIndex = (currentIndex + 1) % heroImages.length;
        heroImages[currentIndex].style.opacity = '1';
    }, fadeInterval);
}

// Sticky Booking Bar
function initBookingBar() {
    const bookingBar = document.getElementById('bookingBar');
    const hero = document.getElementById('hero');
    
    if (!bookingBar || !hero) return;
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    bookingBar.classList.add('is-visible');
                } else {
                    bookingBar.classList.remove('is-visible');
                }
            });
        },
        { threshold: 0.1 }
    );
    
    observer.observe(hero);
}

// Parallax Scroll Effects
function initParallax() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const parallaxElements = document.querySelectorAll('.parallax-img');
    
    function updateParallax() {
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isInViewport) {
                const speed = parseFloat(element.dataset.speed) || 0.2;
                const yPos = -(rect.top * speed);
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial parallax
    updateParallax();
}

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.getElementById('hamburgerBtn');
    const nav = document.getElementById('headerNav');
    const navLinks = document.querySelectorAll('.header__nav-list a');
    
    if (!hamburger || !nav) return;
    
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('is-open');
        hamburger.classList.toggle('is-active');
    });
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('is-open');
            hamburger.classList.remove('is-active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            nav.classList.remove('is-open');
            hamburger.classList.remove('is-active');
        }
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('header').offsetHeight;
                const navHeight = document.getElementById('headerNav').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Lazy Load Images
function initLazyLoad() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Image will load automatically due to native lazy loading
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initHeroCrossfade();
    initBookingBar();
    initParallax();
    initMobileNav();
    initSmoothScroll();
    initLazyLoad();
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Re-initialize parallax on resize if not reduced motion
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const parallaxElements = document.querySelectorAll('.parallax-img');
            parallaxElements.forEach(element => {
                element.style.transform = 'translateY(0)';
            });
        }
    }, 250);
});
