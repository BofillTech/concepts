/* The Spring House Hotel — homepage concept
   Vanilla ES6+, no libraries. Zero inline handlers; all state via classes. */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  /* ---------- Sticky header shadow ---------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  const burger = document.querySelector('.site-header__burger');
  const drawer = document.getElementById('mobile-drawer');
  const closeDrawer = () => {
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    drawer.hidden = true;
    document.body.classList.remove('u-lock');
  };
  const openDrawer = () => {
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    drawer.hidden = false;
    document.body.classList.add('u-lock');
  };
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      (burger.getAttribute('aria-expanded') === 'true') ? closeDrawer() : openDrawer();
    });
    drawer.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeDrawer();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') closeDrawer();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) closeDrawer();
    });
  }

  /* ---------- Logo fallback: swap in the text wordmark if the file fails ---------- */
  const logo = document.querySelector('.site-header__logo');
  const wordmark = document.querySelector('.site-header__wordmark');
  if (logo && wordmark) {
    const swapLogo = () => {
      logo.hidden = true;
      wordmark.hidden = false;
    };
    logo.addEventListener('error', swapLogo);
    if (logo.complete && logo.naturalWidth === 0) swapLogo(); /* failed before listener attached */
  }

  /* ---------- Photo fallbacks: full-size guess -> documented thumbnail ---------- */
  document.querySelectorAll('img[data-fallback]').forEach((img) => {
    const swap = () => {
      if (img.src !== img.dataset.fallback) img.src = img.dataset.fallback;
    };
    img.addEventListener('error', swap, { once: true });
    if (img.complete && img.naturalWidth === 0) swap();
  });

  /* ---------- Scroll reveals (subtle fade) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Dynamic year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}());

/* ==========================================================================
   Rev 3 — property-grid ordering, slideshows, lazy video embeds, nav dropdowns
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- PROPERTY ORDER (EDIT ME) ----------
     One config array controls the order of the property grid on BOTH the
     homepage and the Stay page. Cards carry data-prop="<key>"; list keys
     here closest-to-the-main-Spring-House first. */
  var PROPERTY_ORDER = [
    'main',      // Spring House Main Building (the anchor)
    'barn',      // Barn Apartments — on the hotel property
    'seaside',   // Seaside Homes — on the property
    'mott',      // Mott House — directly across from the main building
    'inn',       // The Inn at Spring House — just down the driveway
    'seawinds',  // Seawinds Townhouses — 5-minute walk, High Street
    'newharbor', // Spring House in New Harbor — 585 Beach Ave
    'cooneymus'  // The Cooneymus Cottage — west side of the island
  ];

  document.querySelectorAll('[data-ordered-grid]').forEach(function (grid) {
    var cards = {};
    grid.querySelectorAll('[data-prop]').forEach(function (c) { cards[c.getAttribute('data-prop')] = c; });
    PROPERTY_ORDER.forEach(function (key) { if (cards[key]) grid.appendChild(cards[key]); });
  });

  /* ---------- Crossfade slideshows ----------
     <div class="slideshow" data-interval="4500"><img class="is-active">… */
  document.querySelectorAll('.slideshow').forEach(function (show) {
    var slides = show.querySelectorAll('img');
    if (slides.length < 2) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var i = 0;
    var delay = parseInt(show.getAttribute('data-interval') || '4500', 10);
    slides[0].classList.add('is-active');
    setInterval(function () {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
    }, delay);
  });

  /* ---------- Lazy video embeds ----------
     <div class="video-embed" data-src="https://drive.google.com/file/d/ID/preview">
     The iframe is only created when scrolled near the viewport. */
  var embeds = document.querySelectorAll('.video-embed[data-src]');
  function loadEmbed(el) {
    if (el.dataset.loaded) return;
    var src = el.getAttribute('data-src');
    if (!src || src.indexOf('TODO') === 0) return; /* stub tile — poster + badge only until a real file ID is set */
    el.dataset.loaded = '1';
    var f = document.createElement('iframe');
    f.src = el.getAttribute('data-src');
    f.setAttribute('title', el.getAttribute('data-title') || 'Video');
    f.setAttribute('allow', 'autoplay; fullscreen');
    f.setAttribute('allowfullscreen', '');
    f.setAttribute('loading', 'lazy');
    el.appendChild(f);
    el.classList.add('is-loaded');
  }
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { loadEmbed(e.target); vio.unobserve(e.target); } });
    }, { rootMargin: '300px' });
    embeds.forEach(function (e) { vio.observe(e); });
  } else {
    embeds.forEach(loadEmbed);
  }

  /* ---------- Lazy autoplay loop stubs (short dining clips) ----------
     <video class="loop-clip" data-clip-src="TODO.mp4" poster="…" muted loop playsinline> */
  var clips = document.querySelectorAll('video.loop-clip[data-clip-src]');
  function loadClip(v) {
    var src = v.getAttribute('data-clip-src');
    if (!src || src.indexOf('TODO') === 0 || v.dataset.loaded) return;
    v.dataset.loaded = '1';
    v.src = src;
    v.muted = true;
    v.play().catch(function () {});
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { loadClip(e.target); cio.unobserve(e.target); } });
    }, { rootMargin: '200px' });
    clips.forEach(function (c) { cio.observe(c); });
  }

  /* ---------- Nav dropdowns (touch/click toggle; hover handled in CSS) ---------- */
  document.querySelectorAll('.menu-item--has-sub > a').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var li = a.parentElement;
      var isDesktopHover = window.matchMedia('(min-width: 1024px) and (hover: hover)').matches;
      if (!isDesktopHover) {
        if (!li.classList.contains('is-open')) {
          ev.preventDefault();
          document.querySelectorAll('.menu-item--has-sub.is-open').forEach(function (o) { o.classList.remove('is-open'); });
          li.classList.add('is-open');
        }
      }
    });
  });
  document.addEventListener('click', function (ev) {
    if (!ev.target.closest('.menu-item--has-sub')) {
      document.querySelectorAll('.menu-item--has-sub.is-open').forEach(function (o) { o.classList.remove('is-open'); });
    }
  });

  /* ---------- Photo galleries + lightbox ----------
     Property galleries: edit the photo lists below (paths are relative to the site root).
     Any other data-gallery="name" group (e.g. the Private Events grid) is built from the
     <img> elements inside the matching triggers on the page. "all" = every property photo. */
  var GALLERIES = {
    main: { title: 'Spring House Main Building', photos: [
      { src: 'img/stay/main-exterior.jpg', alt: 'The Spring House Hotel main building' },
      { src: 'img/stay/main-room-bed.jpg', alt: 'A guest room in the main building' },
      { src: 'img/stay/main-room-window.jpg', alt: 'A main-building guest room with a window view' },
      { src: 'img/stay/main-lawn.jpg', alt: 'Adirondack chairs on the Spring House lawn' }
    ] },
    barn: { title: 'Barn Apartments', photos: [
      { src: 'img/stay/barn-apt-3.jpg', alt: 'A bedroom in the Barn Apartments' },
      { src: 'img/stay/barn-apt-2.jpg', alt: 'Inside the Barn Apartments' },
      { src: 'img/stay/barn-apt-4.jpg', alt: 'Inside the Barn Apartments' }
    ] },
    seaside: { title: 'Seaside Homes', photos: [
      { src: 'img/stay/seaside-exterior.jpg', alt: 'A Seaside Home on the Spring House property' },
      { src: 'img/stay/seaside-living.jpg', alt: 'A Seaside Home living room' },
      { src: 'img/stay/seaside-dining.jpg', alt: 'A Seaside Home dining area' },
      { src: 'img/stay/seaside-bedroom.jpg', alt: 'A Seaside Home bedroom' },
      { src: 'img/stay/chaffee-30.jpg', alt: 'Chaffee House exterior' },
      { src: 'img/stay/chaffee-31.jpg', alt: 'Chaffee House exterior' },
      { src: 'img/stay/chaffee-32.jpg', alt: 'Chaffee House exterior' },
      { src: 'img/stay/chaffee-01.jpg', alt: 'The deck at Chaffee House' },
      { src: 'img/stay/chaffee-33.jpg', alt: 'Deck chairs at Chaffee House' },
      { src: 'img/stay/chaffee-38.jpg', alt: 'The living room at Chaffee House' },
      { src: 'img/stay/chaffee-39.jpg', alt: 'The living room at Chaffee House' },
      { src: 'img/stay/chaffee-36.jpg', alt: 'The dining area at Chaffee House' },
      { src: 'img/stay/chaffee-37.jpg', alt: 'The dining area at Chaffee House' },
      { src: 'img/stay/chaffee-34.jpg', alt: 'The kitchen at Chaffee House' },
      { src: 'img/stay/chaffee-35.jpg', alt: 'The kitchen at Chaffee House' },
      { src: 'img/stay/chaffee-26.jpg', alt: 'A bedroom at Chaffee House' },
      { src: 'img/stay/chaffee-27.jpg', alt: 'A bedroom at Chaffee House' },
      { src: 'img/stay/chaffee-28.jpg', alt: 'A bedroom at Chaffee House' },
      { src: 'img/stay/chaffee-29.jpg', alt: 'A bedroom at Chaffee House' }
    ] },
    mott: { title: 'The Mott House', photos: [
      { src: 'img/stay/mott-exterior.jpg', alt: 'The Mott House framed by hydrangeas' },
      { src: 'img/stay/mott-room.jpg', alt: 'A guest room in the Mott House' }
    ] },
    inn: { title: 'The Inn at the Spring House', photos: [
      { src: 'img/stay/inn-exterior.jpg', alt: 'The Inn at the Spring House' },
      { src: 'img/stay/inn-sign.jpg', alt: 'The Inn at Spring House sign' },
      { src: 'img/stay/inn-balcony.jpg', alt: 'A balcony at the Inn' },
      { src: 'img/stay/inn-room.jpg', alt: 'A guest room at the Inn' }
    ] },
    seawinds: { title: 'Seawinds Townhouses', photos: [
      { src: 'img/stay/seawinds-front.jpg', alt: 'The front of the Seawinds Townhouses' },
      { src: 'img/stay/seawinds-view.jpg', alt: 'The view from Seawinds' },
      { src: 'img/stay/seawinds-living.jpg', alt: 'A Seawinds living room' },
      { src: 'img/stay/seawinds-kitchen.jpg', alt: 'A Seawinds kitchen' }
    ] },
    newharbor: { title: 'The Spring House in New Harbor', photos: [
      { src: 'img/stay/newharbor-exterior.jpg', alt: 'The Spring House in New Harbor' },
      { src: 'img/stay/newharbor-lobby.jpg', alt: 'The New Harbor lobby' },
      { src: 'img/stay/newharbor-room.jpg', alt: 'A guest room in New Harbor' }
    ] },
    cooneymus: { title: 'The Cooneymus Cottage', photos: [
      { src: 'img/stay/cooneymus-3.jpg', alt: 'The Cooneymus Cottage' },
      { src: 'img/stay/cooneymus-1.jpg', alt: 'The Cooneymus Cottage' },
      { src: 'img/stay/cooneymus-2.jpg', alt: 'The Cooneymus Cottage' },
      { src: 'img/stay/cooneymus-4.jpg', alt: 'The Cooneymus Cottage' }
    ] }
  };
  (function () {
    var all = [];
    Object.keys(GALLERIES).forEach(function (k) {
      GALLERIES[k].photos.forEach(function (p) { all.push({ src: p.src, alt: p.alt, caption: GALLERIES[k].title }); });
    });
    GALLERIES.all = { title: 'The Spring House Collection', photos: all };
  }());

  var lb = null, lbImg, lbCap, lbCount, lbList = [], lbIdx = 0, lbReturn = null;
  function buildLightbox() {
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Photo gallery');
    lb.hidden = true;
    lb.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close gallery">&times;</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous photo">&#8249;</button>' +
      '<figure class="lightbox__figure"><img class="lightbox__img" alt=""><figcaption class="lightbox__cap"><span class="lightbox__title"></span><span class="lightbox__count"></span></figcaption></figure>' +
      '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next photo">&#8250;</button>';
    document.body.appendChild(lb);
    lbImg = lb.querySelector('.lightbox__img');
    lbCap = lb.querySelector('.lightbox__title');
    lbCount = lb.querySelector('.lightbox__count');
    lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox__nav--prev').addEventListener('click', function () { showPhoto(lbIdx - 1); });
    lb.querySelector('.lightbox__nav--next').addEventListener('click', function () { showPhoto(lbIdx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lb || lb.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') showPhoto(lbIdx - 1);
      else if (e.key === 'ArrowRight') showPhoto(lbIdx + 1);
    });
  }
  function showPhoto(i) {
    if (!lbList.length) return;
    lbIdx = (i + lbList.length) % lbList.length;
    var p = lbList[lbIdx];
    lbImg.src = p.src;
    lbImg.alt = p.alt || '';
    lbCap.textContent = p.caption || '';
    lbCount.textContent = (lbIdx + 1) + ' / ' + lbList.length;
  }
  function openLightbox(list, start, trigger) {
    if (!list.length) return;
    if (!lb) buildLightbox();
    lbList = list;
    lbReturn = trigger || null;
    lb.hidden = false;
    document.documentElement.classList.add('has-lightbox');
    showPhoto(start || 0);
    lb.querySelector('.lightbox__close').focus();
  }
  function closeLightbox() {
    lb.hidden = true;
    document.documentElement.classList.remove('has-lightbox');
    if (lbReturn) lbReturn.focus();
  }
  document.querySelectorAll('[data-gallery]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var key = btn.getAttribute('data-gallery');
      var list;
      if (GALLERIES[key]) {
        list = GALLERIES[key].photos.map(function (p) { return { src: p.src, alt: p.alt, caption: p.caption || GALLERIES[key].title }; });
      } else {
        list = [];
        var holder = btn.closest('[data-credit]');
        var credit = holder ? ' \u00b7 ' + holder.getAttribute('data-credit') : '';
        document.querySelectorAll('[data-gallery="' + key + '"] img').forEach(function (im) {
          list.push({ src: im.getAttribute('src'), alt: im.getAttribute('alt'), caption: im.getAttribute('alt') + credit });
        });
      }
      openLightbox(list, parseInt(btn.getAttribute('data-index') || '0', 10), btn);
    });
  });
}());
