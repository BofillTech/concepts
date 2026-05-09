/* Beachcomber Resort at Montauk — Shared site JS */
(function() {
  'use strict';

  // Sticky header on scroll (only if header has data-scroll-effect)
  const header = document.getElementById('header');
  if (header && !header.classList.contains('solid')) {
    const onScroll = () => {
      if (window.scrollY > 80) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      menuToggle.classList.toggle('open', open);
      mobileMenu.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  // IntersectionObserver for reveals
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(r => io.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('visible'));
  }

  // Booking bar dates — set defaults to today / tomorrow
  const ci = document.getElementById('bbCheckIn');
  const co = document.getElementById('bbCheckOut');
  if (ci && co) {
    const today = new Date();
    const tmrw = new Date(today.getTime() + 86400000);
    const fmt = d => d.toISOString().slice(0, 10);
    ci.value = fmt(today);
    co.value = fmt(tmrw);
    ci.min = fmt(today);
    co.min = fmt(tmrw);
    ci.addEventListener('change', () => {
      const next = new Date(new Date(ci.value).getTime() + 86400000);
      co.min = fmt(next);
      if (new Date(co.value) <= new Date(ci.value)) co.value = fmt(next);
    });
  }
  // Booking bar submit handler (global so inline onsubmit can find it)
  window.submitBooking = function(e) {
    e.preventDefault();
    const checkin = document.getElementById('bbCheckIn').value;
    const checkout = document.getElementById('bbCheckOut').value;
    const url = `https://secure.irm1.net/irmng?resort=2g&checkin=${checkin}&checkout=${checkout}`;
    window.open(url, '_blank', 'noopener');
    return false;
  };

  // Reviews carousel (only on pages where it exists)
  const quoteEl = document.getElementById('reviewQuote');
  const sourceEl = document.getElementById('reviewSource');
  const tabs = document.querySelectorAll('.review-tabs button');
  if (quoteEl && sourceEl && tabs.length) {
    const reviews = [
      {
        quote: "Beachcomber exceeded our expectations with a memorable stay and great location that's clean and friendly. Our room was very clean, comfortable, and spacious — with a great view of the ocean.",
        source: "— Beachcomber Guest"
      },
      {
        quote: "Exceptional. The place was perfect, the location, the room was beautiful. I fell in love with the room as soon as we got there. I would highly recommend the Beachcomber.",
        source: "— Beachcomber Guest"
      },
      {
        quote: "Room was clean and tastefully decorated. I enjoyed having my own private patio to sit outside and listen to the ocean waves.",
        source: "— Beachcomber Guest"
      }
    ];
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const i = parseInt(btn.dataset.r, 10);
        quoteEl.style.opacity = 0;
        sourceEl.style.opacity = 0;
        setTimeout(() => {
          quoteEl.textContent = reviews[i].quote;
          sourceEl.textContent = reviews[i].source;
          quoteEl.style.opacity = 1;
          sourceEl.style.opacity = 1;
        }, 220);
      });
    });
    quoteEl.style.transition = 'opacity .25s ease';
    sourceEl.style.transition = 'opacity .25s ease';
  }

  // Gallery lightbox (only on pages where it exists)
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbCap = lightbox.querySelector('.lb-caption');
    const lbClose = lightbox.querySelector('.lb-close');
    document.querySelectorAll('[data-lightbox]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const src = item.getAttribute('data-src') || item.getAttribute('href');
        const cap = item.getAttribute('data-caption') || '';
        lbImg.src = src;
        lbImg.alt = cap;
        lbCap.textContent = cap;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLb() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { lbImg.src = ''; }, 300);
    }
    lbClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLb(); });
  }

  // Gallery filter (only on pages where it exists)
  const filterButtons = document.querySelectorAll('[data-filter]');
  if (filterButtons.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('[data-category]').forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Contact form (visual only — submits to mailto since no backend)
  const cf = document.getElementById('contactForm');
  if (cf) {
    cf.addEventListener('submit', (e) => {
      e.preventDefault();
      const fn = cf.querySelector('[name=firstName]').value;
      const ln = cf.querySelector('[name=lastName]').value;
      const em = cf.querySelector('[name=email]').value;
      const msg = cf.querySelector('[name=message]').value;
      const subject = encodeURIComponent(`Inquiry from ${fn} ${ln}`);
      const body = encodeURIComponent(`From: ${fn} ${ln}\nEmail: ${em}\n\n${msg}`);
      window.location.href = `mailto:info@beachcombermontauk.com?subject=${subject}&body=${body}`;
    });
  }
})();
