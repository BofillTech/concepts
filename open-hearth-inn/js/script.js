// Open Hearth Inn - JavaScript
// Sticky booking bar, navigation, and interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Sticky Booking Bar - Show After Hero
    // ========================================
    const bookingBar = document.getElementById('bookingBar');
    const hero = document.querySelector('.hero');
    
    function toggleBookingBar() {
        if (!hero || !bookingBar) return;
        
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show booking bar when user scrolls past the hero
        if (scrollTop > heroBottom - 100) {
            bookingBar.classList.add('visible');
        } else {
            bookingBar.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleBookingBar, { passive: true });
    toggleBookingBar(); // Initial check
    
    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    const hamburger = document.querySelector('.nav__hamburger');
    const navMenu = document.querySelector('.nav__menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const isActive = navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // ========================================
    // Active Navigation Link
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.nav__link');
    
    function setActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navHeight = document.querySelector('.nav').offsetHeight;
            
            if (window.pageYOffset >= sectionTop - navHeight - 50) {
                currentSection = section.getAttribute('id');
            }
        });
        
        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink(); // Initial check
    
    // ========================================
    // Smooth Scroll with Offset
    // ========================================
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle hash links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================================
    // Staggered Reveal Animation on Scroll
    // ========================================
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for staggered reveal
        const revealElements = document.querySelectorAll('.room-card, .amenity-card, .review-card, .gallery-grid__item');
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // ========================================
    // Lazy Load Images
    // ========================================
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
        
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }
    
    // ========================================
    // Performance: Throttle Scroll Events
    // ========================================
    function throttle(func, wait) {
        let timeout;
        let previous = 0;
        
        return function executedFunction() {
            const now = Date.now();
            const remaining = wait - (now - previous);
            
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(this, arguments);
            } else if (!timeout) {
                timeout = setTimeout(() => {
                    previous = Date.now();
                    timeout = null;
                    func.apply(this, arguments);
                }, remaining);
            }
        };
    }
    
    // Apply throttle to expensive scroll handlers if needed
    const throttledToggleBar = throttle(toggleBookingBar, 100);
    const throttledSetActive = throttle(setActiveLink, 100);
    
    // ========================================
    // Console Log for Development
    // ========================================
    console.log('%c🏡 Open Hearth Inn', 'font-size: 20px; font-weight: bold; color: #022643;');
    console.log('%cWelcome to Ohana! Built with ❤️ for Acadia travelers.', 'color: #A67C52;');
});
