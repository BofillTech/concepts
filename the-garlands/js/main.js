
/* ========== index.html ========== */
(function() {
  if (!document.body.classList.contains('page-home')) return;
// Sticky nav
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Show booking bar immediately (with brief delay for graceful entry)
  const bar = document.getElementById('bookingBar');
  setTimeout(() => bar.classList.add('in'), 400);

  // Hero slideshow
  (function heroSlideshow() {
    const slides = document.querySelectorAll('.hero__slide');
    const dots = document.querySelectorAll('.hero__dot');
    if (!slides.length) return;
    const hero = document.querySelector('.hero');
    let idx = 0;
    let timer;
    const SLIDE_DURATION = 6000;

    function show(i) {
      slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
      dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
      idx = i;
    }
    function next() { show((idx + 1) % slides.length); }
    function start() { stop(); timer = setInterval(next, SLIDE_DURATION); }
    function stop() { if (timer) clearInterval(timer); }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { show(i); start(); });
    });
    hero.addEventListener('mouseenter', stop);
    hero.addEventListener('mouseleave', start);

    start();
  })();

  // Default check-in/check-out
  const today = new Date();
  const tomorrow = new Date(Date.now() + 86400000);
  const iso = d => d.toISOString().split('T')[0];
  const ci = document.getElementById('bb-checkin');
  const co = document.getElementById('bb-checkout');
  ci.min = iso(today);
  co.min = iso(tomorrow);
  ci.addEventListener('change', () => {
    const next = new Date(ci.value);
    next.setDate(next.getDate() + 1);
    co.min = iso(next);
    if (co.value && new Date(co.value) <= new Date(ci.value)) co.value = iso(next);
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();



/* ========== rooms/index.html ========== */
(function() {
  if (!document.body.classList.contains('page-rooms')) return;
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

const bookingBar = document.getElementById('bookingBar');
window.addEventListener('scroll', () => {
  if (window.scrollY > window.innerHeight * 0.5) bookingBar.classList.add('show');
  else bookingBar.classList.remove('show');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Room photo gallery — main image swaps when a thumbnail is clicked
document.querySelectorAll('.room__gallery').forEach(gallery => {
  const mainImg = gallery.querySelector('.room__media img');
  const tag = gallery.querySelector('.room__media-tag');
  const thumbs = gallery.querySelectorAll('.room__thumb');
  if (!thumbs.length) return;
  // Preload main images so swaps are instant
  thumbs.forEach(t => { const src = t.dataset.src; if (src) { const p = new Image(); p.src = src; } });
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.dataset.src;
      if (!src || mainImg.src.endsWith(src.split('/').pop())) {
        // already showing — still update active state
      } else {
        mainImg.style.opacity = '0';
        const next = new Image();
        next.onload = () => {
          mainImg.src = src;
          if (thumb.dataset.alt) mainImg.alt = thumb.dataset.alt;
          mainImg.style.opacity = '1';
        };
        next.src = src;
      }
      if (tag && thumb.dataset.tag) tag.innerHTML = thumb.dataset.tag;
      thumbs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      thumb.classList.add('is-active');
      thumb.setAttribute('aria-selected', 'true');
    });
  });
});
})();



/* ========== room-tours/index.html ========== */
(function() {
  if (!document.body.classList.contains('page-room-tours')) return;
// ---------- DATA: 20 UNITS ----------
const UNITS = [
  // OCEANFRONT (4)
  { slug:'unit-a',  label:'Unit A',  type:'oceanfront', beds:'2BR', poster:'img/roomtours-unit-a.jpg',  video:null },
  { slug:'unit-b',  label:'Unit B',  type:'oceanfront', beds:'2BR', poster:'img/property_from_beach.jpg', video:null, comingSoon:true },
  { slug:'unit-c',  label:'Unit C',  type:'oceanfront', beds:'2BR', poster:'img/roomtours-unit-c.jpg',  video:null },
  { slug:'unit-d',  label:'Unit D',  type:'oceanfront', beds:'1BR', poster:'img/property_from_beach.jpg', video:null, comingSoon:true },
  // OCEAN VIEW (16)
  { slug:'unit-01', label:'Unit 1',  type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-01.jpg', video:null },
  { slug:'unit-02', label:'Unit 2',  type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-02.jpg', video:null },
  { slug:'unit-03', label:'Unit 3',  type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-03.jpg', video:null },
  { slug:'unit-04', label:'Unit 4',  type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-04.jpg', video:null },
  { slug:'unit-05', label:'Unit 5',  type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-05.jpg', video:null },
  { slug:'unit-06', label:'Unit 6',  type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-06.jpg', video:null },
  { slug:'unit-07', label:'Unit 7',  type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-07.jpg', video:null },
  { slug:'unit-08', label:'Unit 8',  type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-08.jpg', video:null },
  { slug:'unit-09', label:'Unit 9',  type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-09.jpg', video:null },
  { slug:'unit-10', label:'Unit 10', type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-10.jpg', video:null },
  { slug:'unit-11', label:'Unit 11', type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-11.jpg', video:null },
  { slug:'unit-12', label:'Unit 12', type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-12.jpg', video:null },
  { slug:'unit-13', label:'Unit 13', type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-13.jpg', video:null },
  { slug:'unit-14', label:'Unit 14', type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-14.jpg', video:null },
  { slug:'unit-15', label:'Unit 15', type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-15.jpg', video:null },
  { slug:'unit-16', label:'Unit 16', type:'oceanview',  beds:'2BR', poster:'img/roomtours-unit-16.jpg', video:null }
];

// ---------- RENDER ----------
const grid = document.getElementById('grid');
function typeLabel(t) { return t === 'oceanfront' ? 'Ocean Front' : 'Ocean View'; }
function bedsLabel(b) { return b === '2BR' ? 'Two Bedroom' : 'One Bedroom'; }

UNITS.forEach((u, idx) => {
  const card = document.createElement('button');
  card.className = 'unit-card';
  card.dataset.idx = idx;
  card.dataset.type = u.type;
  card.dataset.beds = u.beds;
  card.innerHTML = `
    <div class="unit-card__media">
      <img src="${u.poster}" alt="${u.label} walk-through preview" loading="lazy">
      <div class="unit-card__media-overlay"></div>
      <div class="unit-card__badges">
        <span class="badge ${u.type === 'oceanfront' ? 'badge--coral' : ''}">${typeLabel(u.type)}</span>
        <span class="badge">${u.beds}</span>
      </div>
      <div class="unit-card__play">
        <svg viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
      </div>
      <div class="unit-card__count">${u.comingSoon ? 'Photos Coming Soon' : 'Walk-Through'}</div>
    </div>
    <div class="unit-card__body">
      <div class="unit-card__title">${u.label}</div>
      <div class="unit-card__meta">${typeLabel(u.type)} &middot; ${bedsLabel(u.beds)}</div>
    </div>
  `;
  card.addEventListener('click', () => openLb(idx));
  grid.appendChild(card);
});

// ---------- FILTERS ----------
const filters = document.querySelectorAll('.filter');
const cards = () => Array.from(document.querySelectorAll('.unit-card'));
const noResults = document.getElementById('noResults');
const countShown = document.getElementById('countShown');

filters.forEach(f => {
  f.addEventListener('click', () => {
    filters.forEach(x => x.classList.remove('active'));
    f.classList.add('active');
    const filter = f.dataset.filter;
    let visible = 0;
    cards().forEach(card => {
      const t = card.dataset.type;
      const b = card.dataset.beds;
      const match = filter === 'all'
        || (filter === 'oceanfront' && t === 'oceanfront')
        || (filter === 'oceanview'  && t === 'oceanview')
        || (filter === '2BR'        && b === '2BR')
        || (filter === '1BR'        && b === '1BR');
      if (match) { card.classList.remove('hidden'); visible++; }
      else card.classList.add('hidden');
    });
    countShown.textContent = visible;
    noResults.classList.toggle('show', visible === 0);
  });
});

// ---------- LIGHTBOX PLAYER ----------
const lb = document.getElementById('lb');
const lbVideo = document.getElementById('lbVideo');
const lbPoster = document.getElementById('lbPoster');
const lbNotice = document.getElementById('lbNotice');
const lbTitle = document.getElementById('lbTitle');
const lbEyebrow = document.getElementById('lbEyebrow');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
let currentIdx = 0;

function visibleIndices() {
  return cards()
    .map((c, i) => c.classList.contains('hidden') ? -1 : Number(c.dataset.idx))
    .filter(i => i !== -1);
}

function loadUnit(idx) {
  const u = UNITS[idx];
  currentIdx = idx;
  lbTitle.innerHTML = `${u.label} <em>&middot; ${typeLabel(u.type)}</em>`;
  lbEyebrow.textContent = `${bedsLabel(u.beds)} Walk-Through`;
  lbPoster.style.backgroundImage = `url('${u.poster}')`;
  lbPoster.classList.remove('hidden');

  // Pause and reset video
  lbVideo.pause();
  lbVideo.removeAttribute('src');
  lbVideo.load();

  if (u.video) {
    lbVideo.src = u.video;
    lbVideo.poster = u.poster;
    lbVideo.style.display = 'block';
    lbNotice.classList.add('hidden');
    // hide poster div so the video shows
    lbPoster.classList.add('hidden');
  } else {
    // No video yet — show poster + "coming soon" notice
    lbVideo.style.display = 'none';
    lbNotice.classList.remove('hidden');
  }

  // Update prev/next disabled state
  const visible = visibleIndices();
  const pos = visible.indexOf(idx);
  lbPrev.disabled = pos <= 0;
  lbNext.disabled = pos >= visible.length - 1;
}

function openLb(idx) {
  loadUnit(idx);
  lb.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  lb.classList.remove('show');
  lbVideo.pause();
  lbVideo.removeAttribute('src');
  lbVideo.load();
  document.body.style.overflow = '';
}
function navLb(dir) {
  const visible = visibleIndices();
  const pos = visible.indexOf(currentIdx);
  const next = pos + dir;
  if (next < 0 || next >= visible.length) return;
  loadUnit(visible[next]);
}

document.getElementById('lbClose').addEventListener('click', closeLb);
lbPrev.addEventListener('click', () => navLb(-1));
lbNext.addEventListener('click', () => navLb(1));
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('show')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') navLb(-1);
  if (e.key === 'ArrowRight') navLb(1);
});

// ---------- NAV SCROLL ----------
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ---------- REVEAL ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in'); });
}, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();



/* ========== amenities/index.html ========== */
(function() {
  if (!document.body.classList.contains('page-amenities')) return;
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

const bookingBar = document.getElementById('bookingBar');
window.addEventListener('scroll', () => {
  if (window.scrollY > window.innerHeight * 0.5) bookingBar.classList.add('show');
  else bookingBar.classList.remove('show');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();



/* ========== the-cape/index.html ========== */
(function() {
  if (!document.body.classList.contains('page-the-cape')) return;
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in'); });
}, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();



/* ========== gallery/index.html ========== */
(function() {
  if (!document.body.classList.contains('page-gallery')) return;
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// Filters
const filters = document.querySelectorAll('.filter');
const items = document.querySelectorAll('.gallery__item');
filters.forEach(f => {
  f.addEventListener('click', () => {
    filters.forEach(x => x.classList.remove('active'));
    f.classList.add('active');
    const cat = f.dataset.filter;
    items.forEach(item => {
      const cats = item.dataset.cat.split(' ');
      if (cat === 'all' || cats.includes(cat)) item.classList.remove('hidden');
      else item.classList.add('hidden');
    });
  });
});

// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');
let currentIdx = 0;
const visible = () => Array.from(items).filter(i => !i.classList.contains('hidden'));

function openLb(idx) {
  const list = visible();
  currentIdx = idx;
  lbImg.src = list[idx].dataset.src;
  lbCap.textContent = list[idx].dataset.cap;
  lb.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeLb() { lb.classList.remove('show'); document.body.style.overflow = ''; }
function next(d) {
  const list = visible();
  currentIdx = (currentIdx + d + list.length) % list.length;
  lbImg.src = list[currentIdx].dataset.src;
  lbCap.textContent = list[currentIdx].dataset.cap;
}
items.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const list = visible();
    const idx = list.indexOf(item);
    if (idx !== -1) openLb(idx);
  });
});
document.getElementById('lbClose').addEventListener('click', closeLb);
document.getElementById('lbPrev').addEventListener('click', () => next(-1));
document.getElementById('lbNext').addEventListener('click', () => next(1));
lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('show')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') next(-1);
  if (e.key === 'ArrowRight') next(1);
});

// Reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in'); });
}, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();



/* ========== contact/index.html ========== */
(function() {
  if (!document.body.classList.contains('page-contact')) return;
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in'); });
}, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();



/* ========== policies/index.html ========== */
(function() {
  if (!document.body.classList.contains('page-policies')) return;
const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
