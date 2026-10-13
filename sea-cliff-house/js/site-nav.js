/* =====================================================================
   SEA CLIFF HOUSE - SITE MENUS
   One place for the header menus and footer links on every page.
   Each page sets <body data-root="../" data-page="page-slug">.
   ===================================================================== */
(function () {
  'use strict';
  var WEBCAM = 'https://webcam.seacliffhouse.com/camera/index.html#/video';
  /* Booking engine. The two date names are how the dates are passed to
     RezStream; change them here if RezStream uses different names. */
  var BOOKING = {
    url: 'https://guest.rezstream.com/search/sea-cliff-house-motel',
    checkIn: 'arrival',
    checkOut: 'departure'
  };
  var ROOMS = [
    ['accommodations', 'All Rooms & Suites'],
    ['old-orchard-beach-maine-kitchenette-motel-rooms', 'Two-Room Kitchenettes'],
    ['old-orchard-beach-maine-oceanview-rooms', 'Ocean View Rooms'],
    ['old-orchard-beach-maine-whirlpool-hot-tub-motel-rooms', 'Whirlpool Tub Rooms'],
    ['old-orchard-beach-maine-penthouse-suite', 'Penthouse Suite'],
    ['old-orchard-beach-maine-honeymoon-suite', 'Honeymoon Suite'],
    ['old-orchard-beach-maine-grand-suite', 'Grand Suite']
  ];
  var AMENITIES = [
    ['location-and-amenities', 'Location & Amenities'],
    ['old-orchard-beach-attractions', 'Nearby Attractions'],
    ['ocean-park-maine-hotels-vacation-rentals-motels', 'Ocean Park']
  ];
  var TOURS = [
    ['old-orchard-beach-motel-virtual-photo-tour', 'Virtual Tour'],
    ['old-orchard-beach-motel-drone-video', 'Drone Aerial Video'],
    [WEBCAM, 'Live Beach Webcam']
  ];
  var SPECIALS = [
    ['old-orchard-beach-maine-motel-specials', 'Seasonal Specials'],
    ['old-orchard-beach-maine-motel-rates', 'Reservation Policies']
  ];
  var CONTACT = [
    ['old-orchard-beach-motel-contact-information', 'Contact & Directions'],
    ['old-orchard-beach-maine-motel-accessibility-statement', 'Accessibility Statement']
  ];

  /* Make sure the menu font is loaded on every page */
  if (!document.querySelector('link[href*="family=Ubuntu"]')) {
    var fl = document.createElement('link');
    fl.rel = 'stylesheet';
    fl.href = 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap';
    document.head.appendChild(fl);
  }

  var body = document.body;
  var root = body.getAttribute('data-root') || '';
  var page = body.getAttribute('data-page') || '';

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function link(slug, label) {
    var ext = /^http/.test(slug);
    var href = ext || slug.charAt(0) === '#' ? slug : root + slug + '/';
    var cur = slug === page ? ' aria-current="page"' : '';
    var tgt = ext ? ' target="_blank" rel="noopener"' : '';
    return '<a href="' + href + '"' + cur + tgt + '>' + esc(label) + '</a>';
  }
  function parent(slug, label, items, extraClass) {
    var active = items.some(function (i) { return i[0] === page; });
    var cls = 'menu-item menu-item-has-children' + (extraClass || '') + (active ? ' current-menu-ancestor' : '');
    var sub = items.map(function (i) { return '<li class="menu-item">' + link(i[0], i[1]) + '</li>'; }).join('');
    return '<li class="' + cls + '">' + link(slug, label) + '<ul class="sub-menu">' + sub + '</ul></li>';
  }
  var photos = (root ? root : '') + '#gallery';

  var left = document.querySelector('[data-nav="left"]');
  if (left) {
    left.innerHTML =
      parent('accommodations', 'Rooms & Suites', ROOMS) +
      parent('location-and-amenities', 'Amenities', AMENITIES) +
      '<li class="menu-item"><a href="' + photos + '">Photos</a></li>' +
      parent('old-orchard-beach-motel-virtual-photo-tour', 'Tours', TOURS) +
      parent('old-orchard-beach-maine-motel-specials', 'Specials', SPECIALS, ' menu-item--mobile') +
      parent('old-orchard-beach-motel-contact-information', 'Contact', CONTACT, ' menu-item--mobile');
  }
  var right = document.querySelector('[data-nav="right"]');
  if (right) {
    right.innerHTML =
      parent('old-orchard-beach-maine-motel-specials', 'Specials', SPECIALS) +
      parent('old-orchard-beach-motel-contact-information', 'Contact', CONTACT);
  }
  var foot = document.querySelector('[data-nav="footer"]');
  if (foot) {
    var cols = [
      ['Stay', ROOMS],
      ['Explore', AMENITIES.concat(TOURS)],
      ['Plan', SPECIALS.concat(CONTACT)]
    ];
    foot.outerHTML = cols.map(function (c) {
      return '<div class="site-footer__col"><p class="site-footer__h">' + c[0] + '</p><ul class="menu menu--footer">' +
        c[1].map(function (i) { return '<li class="menu-item">' + link(i[0], i[1]) + '</li>'; }).join('') + '</ul></div>';
    }).join('');
  }
  /* Compact booking bar: check-in, check-out, check availability */
  function iso(d) {
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day;
  }
  function addDays(str, n) {
    var p = str.split('-'), d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() + n);
    return iso(d);
  }
  var today = iso(new Date());
  var bar = document.createElement('form');
  bar.className = 'book-bar';
  bar.setAttribute('aria-label', 'Check availability');
  bar.innerHTML =
    '<a class="book-bar__call" href="tel:+12079344874" aria-label="Call Sea Cliff House"><svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg></a>' +
    '<label class="book-bar__field"><span class="book-bar__label">Check-In</span><input class="book-bar__date" type="date" name="in" required min="' + today + '" value="' + today + '"></label>' +
    '<label class="book-bar__field"><span class="book-bar__label">Check-Out</span><input class="book-bar__date" type="date" name="out" required min="' + addDays(today, 1) + '" value="' + addDays(today, 1) + '"></label>' +
    '<button class="book-bar__go" type="submit">Check Availability</button>';
  document.body.appendChild(bar);
  document.body.classList.add('has-book-bar');
  var inEl = bar.querySelector('[name="in"]'), outEl = bar.querySelector('[name="out"]');
  inEl.addEventListener('change', function () {
    if (!inEl.value) { return; }
    var next = addDays(inEl.value, 1);
    outEl.min = next;
    if (!outEl.value || outEl.value <= inEl.value) { outEl.value = next; }
  });
  bar.addEventListener('submit', function (e) {
    e.preventDefault();
    var url = BOOKING.url;
    if (inEl.value && outEl.value) {
      url += '?' + BOOKING.checkIn + '=' + encodeURIComponent(inEl.value) + '&' + BOOKING.checkOut + '=' + encodeURIComponent(outEl.value);
    }
    window.open(url, '_blank', 'noopener');
  });
  var showBar = function () { bar.classList.toggle('is-visible', window.scrollY > 240 || !document.querySelector('.hero')); };
  window.addEventListener('scroll', showBar, { passive: true });
  showBar();
})();
