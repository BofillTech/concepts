/* SAFFIRE — Shared interactions */

document.addEventListener('DOMContentLoaded', () => {
  // Sticky nav scroll behavior
  const nav = document.querySelector('.nav');
  if (nav && !nav.classList.contains('solid')) {
    const onScroll = () => {
      if (window.scrollY > 60) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu toggle
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-close');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // Menu tabs
  const tabs = document.querySelectorAll('.menu-tab');
  const tabContents = document.querySelectorAll('.menu-tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const content = document.querySelector(`.menu-tab-content[data-tab="${target}"]`);
      if (content) content.classList.add('active');
    });
  });

  // Sticky reservation CTA on menu page
  const stickyCta = document.querySelector('.sticky-cta');
  if (stickyCta) {
    const trigger = document.querySelector('.menu-section');
    if (trigger) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            stickyCta.classList.add('show');
          } else if (entry.isIntersecting) {
            stickyCta.classList.remove('show');
          }
        });
      }, { threshold: 0 });
      observer.observe(trigger);
    }
    const closeStickyBtn = stickyCta.querySelector('.sticky-cta-close');
    if (closeStickyBtn) {
      closeStickyBtn.addEventListener('click', () => stickyCta.classList.remove('show'));
    }
  }

  // Order toggle
  const orderToggle = document.querySelectorAll('.order-toggle button');
  orderToggle.forEach(btn => {
    btn.addEventListener('click', () => {
      orderToggle.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Filter pills
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(p => {
    p.addEventListener('click', () => {
      filterPills.forEach(x => x.classList.remove('active'));
      p.classList.add('active');
    });
  });

  // Denomination buttons
  const denomBtns = document.querySelectorAll('.denom-btn');
  denomBtns.forEach(b => {
    b.addEventListener('click', () => {
      denomBtns.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    });
  });

  // Form submission stub (prevents actual submit on demo forms)
  document.querySelectorAll('form[data-demo]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const successMsg = form.querySelector('.form-success');
      if (successMsg) successMsg.style.display = 'block';
      else alert('Thanks — this is a demo form. We\'ll wire up real submission during launch.');
    });
  });
});
