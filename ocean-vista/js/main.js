(function() {
  "use strict";

// Hero load animation
  window.addEventListener('load', () => {
    document.querySelector('.hero')?.classList.add('loaded');
  });

  // Sticky nav state
  const nav = document.getElementById('nav');
  let scrolled = false;
  window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 40;
    if (isScrolled !== scrolled) {
      scrolled = isScrolled;
      nav.classList.toggle('scrolled', isScrolled);
    }
  });

  // Mobile menu
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  const close = document.getElementById('menuClose');
  toggle?.addEventListener('click', () => menu.classList.add('open'));
  close?.addEventListener('click', () => menu.classList.remove('open'));
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Booking bar
  const ci = document.getElementById('bb-checkin');
  const co = document.getElementById('bb-checkout');
  const ciDisp = document.getElementById('bb-checkin-display');
  const coDisp = document.getElementById('bb-checkout-display');
  const bookBtn = document.getElementById('bb-book');
  const fmt = (iso) => {
    if (!iso) return 'Add Date';
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 86400000);
  const toISO = (d) => d.toISOString().slice(0, 10);
  ci.min = toISO(today);
  co.min = toISO(tomorrow);
  ci.addEventListener('change', () => {
    ciDisp.textContent = fmt(ci.value);
    if (ci.value) {
      const next = new Date(ci.value + 'T00:00:00');
      next.setDate(next.getDate() + 1);
      co.min = toISO(next);
      if (!co.value || co.value <= ci.value) {
        co.value = toISO(next);
        coDisp.textContent = fmt(co.value);
      }
    }
  });
  co.addEventListener('change', () => { coDisp.textContent = fmt(co.value); });
  bookBtn.addEventListener('click', () => {
    const base = 'https://oceanvistaresort.client.innroad.com/';
    let url = base;
    if (ci.value && co.value) {
      const params = new URLSearchParams({ arrivalDate: ci.value, departureDate: co.value });
      url = base + '?' + params.toString();
    }
    window.open(url, '_blank', 'noopener');
  });
})();

(function(){
  "use strict";
  // Page-hero load animation (inner pages)
  window.addEventListener('load', function(){
    var ph = document.getElementById('pageHero');
    if (ph) ph.classList.add('loaded');
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function(item){
    var btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      // Close siblings (optional - comment out for multi-open behavior)
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        if (o !== item) o.classList.remove('open');
      });
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
})();
