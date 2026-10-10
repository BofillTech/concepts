/* =====================================================================
   SEA CLIFF HOUSE - SITE MENUS
   One place for the header menus and footer links on every page.
   Each page sets <body data-root="../" data-page="page-slug">.
   ===================================================================== */
(function () {
  'use strict';
  var WEBCAM = 'https://webcam.seacliffhouse.com/camera/index.html#/video';
  var ROOMS = [
    ['accommodations', 'All rooms & suites'],
    ['old-orchard-beach-maine-kitchenette-motel-rooms', 'Two-Room Kitchenettes'],
    ['old-orchard-beach-maine-oceanview-rooms', 'Ocean View Rooms'],
    ['old-orchard-beach-maine-whirlpool-hot-tub-motel-rooms', 'Whirlpool Tub Rooms'],
    ['old-orchard-beach-maine-honeymoon-suite', 'Honeymoon Suite'],
    ['old-orchard-beach-maine-penthouse-suite', 'Penthouse Suite'],
    ['old-orchard-beach-maine-grand-suite', 'Grand Suite']
  ];
  var AMENITIES = [
    ['location-and-amenities', 'Location & amenities'],
    ['old-orchard-beach-attractions', 'Nearby attractions'],
    ['ocean-park-maine-hotels-vacation-rentals-motels', 'Ocean Park']
  ];
  var TOURS = [
    ['old-orchard-beach-motel-virtual-photo-tour', 'Virtual tour'],
    ['old-orchard-beach-motel-drone-video', 'Drone aerial video'],
    [WEBCAM, 'Live beach webcam']
  ];
  var SPECIALS = [
    ['old-orchard-beach-maine-motel-specials', 'Seasonal specials'],
    ['old-orchard-beach-maine-motel-rates', 'Reservation policies']
  ];
  var CONTACT = [
    ['old-orchard-beach-motel-contact-information', 'Contact & directions'],
    ['old-orchard-beach-maine-motel-accessibility-statement', 'Accessibility statement']
  ];

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
      parent('accommodations', 'Rooms & suites', ROOMS) +
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
})();
