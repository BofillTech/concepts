(() => {
  'use strict';

  const toggle = document.querySelector('.menu-toggle');
  const overlay = document.getElementById('site-menu');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    overlay.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    if (open) { const first = overlay.querySelector('a'); if (first) first.focus(); }
  };
  if (toggle && overlay) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    overlay.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.hidden) { setMenu(false); toggle.focus(); }
    });
  }

  // Highlight the rail link for the section in view
  const links = [...document.querySelectorAll('.menu-item a')];
  const items = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && items.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => {
          a.parentElement.classList.toggle('current-menu-item', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    items.forEach((el) => io.observe(el));
  }

  const year = document.querySelector('.js-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
