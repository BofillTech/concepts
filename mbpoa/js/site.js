/* MBPOA concept — shared behavior. No dependencies except Leaflet (map page only). */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  /* ---------- Drawer ---------- */
  var drawer = document.getElementById('drawer');
  var openBtn = document.getElementById('menuBtn');
  var closeBtn = document.getElementById('menuClose');
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('is-open', open);
    openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('is-locked', open);
    if (open) { closeBtn.focus(); } else { openBtn.focus(); }
  }
  if (drawer && openBtn) {
    openBtn.addEventListener('click', function () { setDrawer(true); });
    closeBtn.addEventListener('click', function () { setDrawer(false); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) { drawer.classList.remove('is-open'); openBtn.setAttribute('aria-expanded', 'false'); document.body.classList.remove('is-locked'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('is-open')) setDrawer(false); });
  }

  /* ---------- Broken-image plates ---------- */
  function watchImages(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('img[data-plate]'), function (img) {
      if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) img.classList.add('is-broken');
      img.addEventListener('error', function () { img.classList.add('is-broken'); });
    });
  }
  watchImages();

  /* ---------- Events: 4 active teasers, drop off at local midnight ---------- */
  var grid = document.getElementById('eventGrid');
  var events = window.MBPOA_EVENTS || [];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function todayStr(d) { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parse(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fmtDate(ev) {
    var a = parse(ev.start), b = parse(ev.end || ev.start);
    if (ev.start === (ev.end || ev.start)) return DAYS[a.getDay()] + ', ' + MONTHS[a.getMonth()] + ' ' + a.getDate();
    if (a.getMonth() === b.getMonth()) return MONTHS[a.getMonth()] + ' ' + a.getDate() + '–' + b.getDate();
    return MONTHS[a.getMonth()].slice(0, 3) + ' ' + a.getDate() + ' – ' + MONTHS[b.getMonth()].slice(0, 3) + ' ' + b.getDate();
  }
  var TYPE = { social: 'Social', cleanup: 'Clean-up', info: 'Members' };

  function upcoming(now) {
    var t = todayStr(now);
    return events
      .filter(function (e) { return (e.end || e.start) >= t; })
      .sort(function (a, b) { return a.start < b.start ? -1 : a.start > b.start ? 1 : 0; });
  }
  function card(ev) {
    var img = ev.image ? '<img src="' + esc(ev.image) + '" alt="" width="400" height="224" loading="lazy" data-plate>' : '';
    return '<article class="ecard ecard--' + esc(ev.type) + '">' +
      '<div class="ecard__img">' + img + '</div>' +
      '<div class="ecard__body">' +
      '<span class="ecard__date">' + esc(fmtDate(ev)) + '</span>' +
      '<h3><a href="event-' + esc(ev.slug) + '.html">' + esc(ev.title) + '</a></h3>' +
      '<p class="ecard__meta">' + esc(ev.time ? ev.time + ' · ' : '') + esc(ev.place) + '</p>' +
      (ev.sample ? '<span class="badge badge--sample">Sample event</span>' : '') +
      '<span class="ecard__cta">Details &amp; gallery →</span>' +
      '</div></article>';
  }
  function render(animate) {
    if (!grid) return;
    var list = upcoming(new Date()).slice(0, 4);
    grid.innerHTML = list.length ? list.map(card).join('') :
      '<p class="events__empty">No events are scheduled right now. Check back soon, or browse past events &amp; galleries.</p>';
    watchImages(grid);
    if (animate) {
      grid.classList.add('is-sliding');
      window.setTimeout(function () { grid.classList.remove('is-sliding'); }, 700);
    }
  }
  function scheduleMidnight() {
    var n = new Date();
    var next = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 0, 0, 1);
    window.setTimeout(function () { render(true); scheduleMidnight(); }, next - n);
  }
  if (grid) { render(false); scheduleMidnight(); }

  /* Event pages: show the album once the event has ended */
  var status = document.getElementById('eventStatus');
  if (status) {
    var endStr = status.getAttribute('data-end');
    var past = endStr < todayStr();
    var up = document.getElementById('eventUpcoming'), gal = document.getElementById('eventAlbum');
    if (up && gal) { up.hidden = past; gal.hidden = !past; }
  }

  /* ---------- Archive filters ---------- */
  var chips = document.querySelectorAll('.chip[data-filter]');
  if (chips.length) {
    var albums = document.querySelectorAll('.alb'), blocks = document.querySelectorAll('.year-block'), count = document.getElementById('albCount');
    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener('click', function () {
        var f = chip.getAttribute('data-filter'), n = 0;
        Array.prototype.forEach.call(chips, function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
        Array.prototype.forEach.call(albums, function (a) { var show = f === 'all' || a.getAttribute('data-type') === f; a.hidden = !show; if (show) n++; });
        Array.prototype.forEach.call(blocks, function (b) { b.hidden = !b.querySelector('.alb:not([hidden])'); });
        if (count) count.textContent = n + (n === 1 ? ' album' : ' albums');
      });
    });
  }

  /* ---------- Lightbox ---------- */
  var shots = document.querySelectorAll('.shot button');
  var lb = document.getElementById('lightbox');
  if (shots.length && lb) {
    var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('.lightbox__cap'), idx = 0, last = null;
    var items = Array.prototype.slice.call(shots);
    var show = function (i) {
      idx = (i + items.length) % items.length;
      var im = items[idx].querySelector('img');
      lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt;
      lbCap.textContent = im.alt + '  (' + (idx + 1) + ' of ' + items.length + ')';
    };
    var close = function () { lb.classList.remove('is-open'); document.body.classList.remove('is-locked'); if (last) last.focus(); };
    items.forEach(function (b, i) { b.addEventListener('click', function () { last = b; show(i); lb.classList.add('is-open'); document.body.classList.add('is-locked'); lb.querySelector('.lightbox__close').focus(); }); });
    lb.querySelector('.lightbox__close').addEventListener('click', close);
    lb.querySelector('.lightbox__prev').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('.lightbox__next').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* ---------- Coastline map (Leaflet + OpenStreetMap) ---------- */
  function initCoast() {
    var el = document.getElementById('coastMap');
    if (!el || !window.L || el.getAttribute('data-ready')) return;
    el.setAttribute('data-ready', '1');
    var fb = document.getElementById('coastFallback'); if (fb) fb.remove();
    var A = [41.0135, -72.0045], B = [41.0235, -71.9865]; // approximate, pending the real sign inventory
    function lerp(t) { return [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t]; }
    var map = L.map(el, { scrollWheelZoom: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
    function pin(cls, label) { return L.divIcon({ className: '', html: '<div class="map-pin map-pin--' + cls + '">' + label + '</div>', iconSize: [26, 26], iconAnchor: [13, 13] }); }
    var pts = [], i, c;
    for (i = 0; i < 9; i++) {
      c = lerp(i / 8);
      pts.push(L.marker(c, { icon: pin('m', (i + 1) + 'M') }).bindPopup('<strong>Beach entrance ' + (i + 1) + 'M</strong><br>Orange M location sign at the top and bottom of the path. In an emergency, relay this number to Public Safety: <a href="tel:631-537-7575">631-537-7575</a>.'));
    }
    [0.06, 0.32, 0.62, 0.9].forEach(function (t, k) { var p = lerp(t); pts.push(L.marker([p[0] + 0.0009, p[1]], { icon: pin('p', 'P' + (k + 1)) }).bindPopup('<strong>Member parking lot P' + (k + 1) + '</strong><br>MBPOA members only — locks maintained and keys provided by the association.')); });
    [0.22, 0.74].forEach(function (t, k) { var p = lerp(t); pts.push(L.marker([p[0] - 0.0007, p[1]], { icon: pin('s', 'S' + (k + 1)) }).bindPopup('<strong>SUNY erosion study site S' + (k + 1) + '</strong><br>Marine erosion research along the MBPOA bluffs.')); });
    var group = L.featureGroup(pts).addTo(map);
    map.fitBounds(group.getBounds().pad(0.18));
  }
  if (window.L) { initCoast(); } else { window.addEventListener('load', initCoast); }

  var y = document.getElementById('year'); if (y) y.textContent = String(new Date().getFullYear());
})();
