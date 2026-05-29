/* ==========================================================================
   Beachcomber Store — main.js
   Vanilla ES6+, no inline handlers
   ========================================================================== */
(function () {
  'use strict';

  // ==========================================================================
  // Reveal-on-scroll
  // ==========================================================================
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // ==========================================================================
  // Scrim helpers (shared overlay for cart drawer + mobile menu)
  // ==========================================================================
  const scrim = document.getElementById('scrim');
  const showScrim = () => scrim && scrim.classList.add('is-visible');
  const hideScrim = () => scrim && scrim.classList.remove('is-visible');

  // ==========================================================================
  // Mobile menu drawer
  // ==========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    const closeMenu = () => {
      mobileMenu.classList.remove('mobile-menu--open');
      menuToggle.classList.remove('menu-toggle--open');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      hideScrim();
    };
    menuToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('mobile-menu--open');
      menuToggle.classList.toggle('menu-toggle--open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      mobileMenu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) { showScrim(); } else { hideScrim(); }
    });
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  }

  // ==========================================================================
  // Cart drawer (front-end only — adds product names to a count)
  // ==========================================================================
  const cartToggle = document.getElementById('cart-toggle');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartClose = document.getElementById('cart-close');
  const cartCount = document.querySelector('.cart-count');
  const cartBody = document.getElementById('cart-body');
  const cart = []; // [{name, price, qty}]

  const renderCart = () => {
    if (!cartBody) return;
    if (cart.length === 0) {
      cartBody.innerHTML = '<div class="cart-drawer__empty"><p>Your bag is empty.</p><p>Add a hoodie, a hat, or the Relaxation Bundle to get started.</p></div>';
    } else {
      const items = cart.map((item) => (
        '<div class="cart-line">' +
        '<div><div class="cart-line__name">' + item.name + '</div>' +
        '<div class="cart-line__qty">Qty ' + item.qty + '</div></div>' +
        '<div class="cart-line__price">$' + (item.price * item.qty) + '</div>' +
        '</div>'
      )).join('');
      const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
      cartBody.innerHTML = items +
        '<div class="cart-totals"><span>Subtotal</span><span>$' + total + '</span></div>' +
        '<button type="button" class="cart-checkout">Check Out</button>';
    }
    if (cartCount) {
      const qty = cart.reduce((s, i) => s + i.qty, 0);
      cartCount.textContent = String(qty);
      cartCount.classList.toggle("cart-count--empty", qty === 0);
    }
  };

  const openCart = () => {
    if (!cartDrawer) return;
    cartDrawer.classList.add('cart-drawer--open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    showScrim();
  };
  const closeCart = () => {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('cart-drawer--open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    hideScrim();
  };

  if (cartToggle && cartDrawer) {
    cartToggle.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
  }

  if (scrim) {
    scrim.addEventListener('click', () => {
      closeCart();
      if (mobileMenu && mobileMenu.classList.contains('mobile-menu--open')) {
        mobileMenu.classList.remove('mobile-menu--open');
        if (menuToggle) menuToggle.classList.remove('menu-toggle--open');
        document.body.style.overflow = '';
      }
      hideScrim();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (cartDrawer && cartDrawer.classList.contains('cart-drawer--open')) closeCart();
    }
  });

  // ==========================================================================
  // Add to cart (product card quick-add button)
  // ==========================================================================
  document.querySelectorAll('[data-add-to-cart]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('[data-product]');
      if (!card) return;
      const name = card.dataset.product;
      const price = parseInt(card.dataset.price, 10) || 0;
      const existing = cart.find((i) => i.name === name);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ name: name, price: price, qty: 1 });
      }
      renderCart();
      openCart();
    });
  });

  // ==========================================================================
  // Category filter
  // ==========================================================================
  const chips = document.querySelectorAll('.category-chip');
  const productCards = document.querySelectorAll('[data-category]');
  const productCount = document.getElementById('product-count');

  const updateCount = () => {
    if (!productCount) return;
    const visible = Array.from(productCards).filter((c) => !c.hasAttribute('hidden')).length;
    productCount.textContent = visible + ' product' + (visible === 1 ? '' : 's');
  };
  updateCount();

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      productCards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.removeAttribute('hidden');
        } else {
          card.setAttribute('hidden', '');
        }
      });
      updateCount();
    });
  });

  // ==========================================================================
  // Newsletter (concept-only mailto fallback)
  // ==========================================================================
  const newsletter = document.getElementById('newsletter-form');
  if (newsletter) {
    newsletter.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletter.querySelector('input[type="email"]');
      const note = newsletter.querySelector('.newsletter-band__note');
      if (input && input.value) {
        if (note) note.textContent = "Thanks — we'll be in touch with new arrivals and seasonal drops.";
        input.value = '';
      }
    });
  }
})();
