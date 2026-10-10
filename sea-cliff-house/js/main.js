(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Apply photo slots from js/photos.js */
  var photos = window.SEA_CLIFF_PHOTOS || {};
  var showSlots = /[?&]slots\b/.test(window.location.search);
  document.querySelectorAll('img[data-photo]').forEach(function (img) {
    var slot = img.getAttribute('data-photo');
    var p = photos[slot];
    if (p) {
      if (p.src && img.getAttribute('src') !== p.src) { img.src = p.src; }
      if (typeof p.alt === 'string') { img.alt = p.alt; }
    }
    var markMissing = function () { img.classList.add('img-missing'); };
    if (img.complete && img.naturalWidth === 0) { markMissing(); }
    img.addEventListener('error', markMissing);
    if (showSlots && img.parentElement) {
      var tag = document.createElement('span');
      tag.className = 'slot-tag';
      tag.textContent = slot;
      var n = img.parentElement.querySelectorAll('.slot-tag').length;
      tag.style.marginTop = (n * 1.9) + 'rem';
      img.parentElement.appendChild(tag);
    }
  });

  /* 1b. Hero drone video (addresses live in js/photos.js) */
  var hero = document.querySelector('.hero');
  var video = document.querySelector('.hero__video');
  var pauseBtn = document.querySelector('.hero__pause');
  var videos = window.SEA_CLIFF_VIDEOS || {};
  var saveData = navigator.connection && navigator.connection.saveData;
  if (hero && video && !reduceMotion && !saveData) {
    var cfg = videos[video.getAttribute('data-video')] || {};
    var isPhone = window.matchMedia('(max-width: 767px)').matches;
    var src = isPhone ? cfg.mobile : cfg.desktop;
    if (src) {
      video.muted = true;
      video.setAttribute('autoplay', '');
      if (cfg.label) { video.setAttribute('title', cfg.label); }
      video.src = src;
      video.addEventListener('playing', function () { hero.classList.add('is-playing'); });
      video.addEventListener('error', function () { hero.classList.remove('is-playing'); pauseBtn.hidden = true; });
      var attempt = video.play();
      if (attempt && attempt.catch) { attempt.catch(function () { pauseBtn.hidden = true; }); }
      pauseBtn.hidden = false;
      pauseBtn.addEventListener('click', function () {
        var paused = pauseBtn.getAttribute('aria-pressed') === 'true';
        if (paused) { video.play(); } else { video.pause(); }
        pauseBtn.setAttribute('aria-pressed', String(!paused));
        pauseBtn.textContent = paused ? 'Pause video' : 'Play video';
      });
      if (showSlots) {
        var vt = document.createElement('span');
        vt.className = 'slot-tag';
        vt.textContent = 'hero-video (see SEA_CLIFF_VIDEOS)';
        vt.style.marginTop = '1.9rem';
        video.parentElement.appendChild(vt);
      }
    }
  }

  /* 2. Header state on scroll */
  var header = document.querySelector('.site-header');
  if (!header) { return; }
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 3. Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-navigation--left');
  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      toggle.focus();
    }
  });

  /* 4. Room cards: room <-> view */
  document.querySelectorAll('.room__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(on));
      btn.textContent = on ? btn.dataset.labelOn : btn.dataset.labelOff;
      btn.closest('.room').classList.toggle('is-alt', on);
    });
  });

  /* 5. Gentle parallax on framed photos and colour plates */
  var layers = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (!reduceMotion && layers.length) {
    var ticking = false;
    var update = function () {
      var vh = window.innerHeight;
      layers.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) { return; }
        var offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
        el.style.setProperty('--py', offset.toFixed(1) + 'px');
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* 6. Galleries: home gallery rebuilds from js/photos.js; every [data-gallery]
        grid gets the lightbox; filter tabs and "show all" only where present */
  var box = document.querySelector('.lightbox');
  var grids = Array.prototype.slice.call(document.querySelectorAll('[data-gallery]'));
  var lb = { list: [], current: 0, lastFocus: null };
  grids.forEach(function (grid) {
    var data = window.SEA_CLIFF_GALLERY;
    if (grid.hasAttribute('data-gallery-home') && data && data.length) {
      grid.innerHTML = '';
      data.forEach(function (g, i) {
        var li = document.createElement('li');
        li.className = 'gallery__item';
        li.dataset.cat = g.cat;
        var b = document.createElement('button');
        b.className = 'gallery__open';
        b.type = 'button';
        b.dataset.index = i;
        var im = document.createElement('img');
        im.className = 'gallery__img';
        im.src = g.src; im.alt = g.alt || ''; im.loading = 'lazy'; im.decoding = 'async';
        b.appendChild(im); li.appendChild(b); grid.appendChild(li);
      });
    }
    var section = grid.closest('section') || document;
    var items = Array.prototype.slice.call(grid.querySelectorAll('.gallery__item'));
    var tabs = section.querySelectorAll('.gallery__tab');
    var moreBtn = section.querySelector('.gallery__more-btn');
    var filter = 'all';
    var expanded = !moreBtn;
    var LIMIT = window.matchMedia('(max-width: 767px)').matches ? 8 : (window.matchMedia('(min-width: 1024px)').matches ? 16 : 15);
    grid._visible = function () { return items.filter(function (li) { return filter === 'all' || li.dataset.cat === filter; }); };
    var apply = function () {
      var vis = grid._visible();
      items.forEach(function (li) { li.hidden = true; });
      vis.forEach(function (li, n) { li.hidden = !expanded && filter === 'all' && n >= LIMIT; });
      if (moreBtn) {
        var more = !expanded && filter === 'all' && vis.length > LIMIT;
        moreBtn.hidden = !more;
        if (more) { moreBtn.textContent = 'Show all ' + vis.length + ' photos'; }
      }
    };
    Array.prototype.forEach.call(tabs, function (t) {
      t.addEventListener('click', function () {
        filter = t.dataset.filter;
        Array.prototype.forEach.call(tabs, function (o) { o.setAttribute('aria-pressed', String(o === t)); });
        apply();
      });
    });
    if (moreBtn) { moreBtn.addEventListener('click', function () { expanded = true; apply(); }); }
    apply();
    grid.addEventListener('click', function (e) {
      var b = e.target.closest('.gallery__open');
      if (!b || !box) { return; }
      lb.list = grid._visible().map(function (li) { return li.querySelector('img'); });
      lb.lastFocus = b;
      show(lb.list.indexOf(b.querySelector('img')));
      box.hidden = false;
      document.body.style.overflow = 'hidden';
      box.querySelector('.lightbox__close').focus();
    });
  });

  function show(n) {
    if (!lb.list.length) { return; }
    lb.current = (n + lb.list.length) % lb.list.length;
    var img = lb.list[lb.current];
    var boxImg = box.querySelector('.lightbox__img');
    boxImg.src = img.getAttribute('data-full') || img.src;
    boxImg.alt = img.alt;
    var cap = img.getAttribute('data-caption') || img.alt;
    box.querySelector('.lightbox__cap').textContent = cap + '  (' + (lb.current + 1) + ' of ' + lb.list.length + ')';
  }
  if (box) {
    var close = function () {
      box.hidden = true;
      document.body.style.overflow = '';
      if (lb.lastFocus) { lb.lastFocus.focus(); }
    };
    box.querySelector('.lightbox__close').addEventListener('click', close);
    box.querySelector('.lightbox__nav--prev').addEventListener('click', function () { show(lb.current - 1); });
    box.querySelector('.lightbox__nav--next').addEventListener('click', function () { show(lb.current + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) { close(); } });
    document.addEventListener('keydown', function (e) {
      if (box.hidden) { return; }
      if (e.key === 'Escape') { close(); }
      else if (e.key === 'ArrowLeft') { show(lb.current - 1); }
      else if (e.key === 'ArrowRight') { show(lb.current + 1); }
      else if (e.key === 'Tab') {
        var f = Array.prototype.slice.call(box.querySelectorAll('button'));
        var i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    var touchX = null;
    box.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (touchX === null) { return; }
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) { show(lb.current + (dx < 0 ? 1 : -1)); }
      touchX = null;
    });
  }

  var y = document.querySelector('[data-year]');
  if (y) { y.textContent = new Date().getFullYear(); }
})();
