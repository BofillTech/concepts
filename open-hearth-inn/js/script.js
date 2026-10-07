// Open Hearth Inn - JavaScript
// Horizontal drag gallery, sticky booking bar, and navigation

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Horizontal Drag Gallery
    // ========================================
    const gallery = document.getElementById('gallery-slider');
    let isDown = false;
    let startX;
    let scrollLeft;
    
    if (gallery) {
        gallery.addEventListener('mousedown', (e) => {
            isDown = true;
            gallery.style.cursor = 'grabbing';
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });
        
        gallery.addEventListener('mouseleave', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });
        
        gallery.addEventListener('mouseup', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });
        
        gallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2;
            gallery.scrollLeft = scrollLeft - walk;
        });
        
        // Touch support for mobile
        let touchStartX = 0;
        let touchScrollLeft = 0;
        
        gallery.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX - gallery.offsetLeft;
            touchScrollLeft = gallery.scrollLeft;
        }, { passive: true });
        
        gallery.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - gallery.offsetLeft;
            const walk = (x - touchStartX) * 2;
            gallery.scrollLeft = touchScrollLeft - walk;
        }, { passive: true });
    }
    
    // ========================================
    // Sticky Booking Bar
    // ========================================
    const bookingBar = document.getElementById('bookingBar');
    let lastScrollTop = 0;
    let scrollThreshold = 500;
    
    function toggleBookingBar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            bookingBar.classList.add('visible');
        } else {
            bookingBar.classList.remove('visible');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
    
    window.addEventListener('scroll', toggleBookingBar, { passive: true });
    
    // ========================================
    // Active Navigation Link
    // ========================================
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();
    
    // ========================================
    // Smooth Scroll with Offset
    // ========================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // Parallax Effect for Hero Polaroids
    // ========================================
    const polaroids = document.querySelectorAll('[data-parallax]');
    
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        
        polaroids.forEach(polaroid => {
            const rate = parseFloat(polaroid.getAttribute('data-parallax'));
            const yPos = -(scrolled * rate);
            polaroid.style.transform = polaroid.style.transform.replace(/translateY\([^)]*\)/, '');
            polaroid.style.transform += ` translateY(${yPos}px)`;
        });
    }
    
    // Only apply parallax on non-mobile devices
    if (window.matchMedia('(min-width: 1024px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', parallaxScroll, { passive: true });
    }
    
    // ========================================
    // Lazy Load Images (optional enhancement)
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
    // Performance: Debounce Scroll Events
    // ========================================
    function debounce(func, wait = 10) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debounce to scroll handlers if needed for performance
    const debouncedToggleBar = debounce(toggleBookingBar, 10);
    const debouncedSetActive = debounce(setActiveLink, 10);
    const debouncedParallax = debounce(parallaxScroll, 10);
    
    // ========================================
    // Console Log for Development
    // ========================================
    console.log('%c🏡 Open Hearth Inn', 'font-size: 20px; font-weight: bold; color: #022643;');
    console.log('%cWelcome to Ohana! Built with ❤️ for Acadia travelers.', 'color: #A67C52;');
});
