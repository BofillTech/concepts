(function(){
  var BASE = '/concepts/terrace-by-the-sea';
  var LOGO = 'https://bofilltech.github.io/concepts/terrace-by-the-sea/img/logo-primary.png';
  var SEAL = 'https://bofilltech.github.io/concepts/terrace-by-the-sea/img/logo-circle.png';

  var NAV = '<nav id="mainNav">'
    + '<a href="'+BASE+'/" class="nav-logo"><img src="'+LOGO+'" alt="Terrace By The Sea"></a>'
    + '<div class="nav-right">'
    + '<ul class="nav-links">'
    // Accommodations dropdown
    + '<li><a href="'+BASE+'/buildings/">Accommodations <span class="nav-chevron"></span></a>'
    + '<div class="nav-dropdown-menu">'
    + '<a href="'+BASE+'/buildings/">All Buildings</a>'
    + '<a href="'+BASE+'/buildings/main-inn/">The Main Inn</a>'
    + '<a href="'+BASE+'/buildings/deluxe-motel/">Deluxe Motel</a>'
    + '<a href="'+BASE+'/buildings/suites/">The Suites</a>'
    + '<a href="'+BASE+'/buildings/side-motel-cottage/">Side Motel &amp; Cottage</a>'
    + '<a href="'+BASE+'/buildings/court-motel/">Court Motel</a>'
    + '</div></li>'
    + '<li><a href="'+BASE+'/amenities/">Amenities</a></li>'
    // Gallery dropdown
    + '<li><a href="'+BASE+'/gallery/">Gallery <span class="nav-chevron"></span></a>'
    + '<div class="nav-dropdown-menu">'
    + '<a href="'+BASE+'/gallery/#buildings">Buildings</a>'
    + '<a href="'+BASE+'/gallery/#rooms">Rooms</a>'
    + '<a href="'+BASE+'/gallery/#grounds">Grounds</a>'
    + '<a href="'+BASE+'/gallery/#video">Video</a>'
    + '</div></li>'
    + '<li><a href="'+BASE+'/attractions/">Attractions</a></li>'
    + '<li><a href="'+BASE+'/virtual-tour/">Virtual Tour</a></li>'
    + '<li><a href="'+BASE+'/weddings/">Weddings</a></li>'
    + '<li><a href="'+BASE+'/contact/">Contact</a></li>'
    + '</ul>'
    + '<a href="tel:2076463232" class="nav-phone">207-646-3232</a>'
    + '<a href="https://terracebythesea.client.innroad.com/" class="nav-book-btn" target="_blank">Book Now</a>'
    + '</div>'
    + '<div class="nav-hamburger" id="hamburger"><span></span><span></span><span></span></div>'
    + '</nav>';

  var MOB = '<div class="mobile-menu" id="mobileMenu">'
    + '<span class="mob-section-head">Accommodations</span>'
    + '<a class="mob-sub" href="'+BASE+'/buildings/">All Buildings</a>'
    + '<a class="mob-sub" href="'+BASE+'/buildings/main-inn/">The Main Inn</a>'
    + '<a class="mob-sub" href="'+BASE+'/buildings/deluxe-motel/">Deluxe Motel</a>'
    + '<a class="mob-sub" href="'+BASE+'/buildings/suites/">The Suites</a>'
    + '<a class="mob-sub" href="'+BASE+'/buildings/side-motel-cottage/">Side Motel &amp; Cottage</a>'
    + '<a class="mob-sub" href="'+BASE+'/buildings/court-motel/">Court Motel</a>'
    + '<a href="'+BASE+'/amenities/">Amenities</a>'
    + '<span class="mob-section-head">Gallery</span>'
    + '<a class="mob-sub" href="'+BASE+'/gallery/#buildings">Buildings</a>'
    + '<a class="mob-sub" href="'+BASE+'/gallery/#rooms">Rooms</a>'
    + '<a class="mob-sub" href="'+BASE+'/gallery/#grounds">Grounds</a>'
    + '<a class="mob-sub" href="'+BASE+'/gallery/#video">Video</a>'
    + '<a href="'+BASE+'/attractions/">Attractions</a>'
    + '<a href="'+BASE+'/virtual-tour/">Virtual Tour</a>'
    + '<a href="'+BASE+'/weddings/">Weddings</a>'
    + '<a href="'+BASE+'/contact/">Contact</a>'
    + '<a href="tel:2076463232">207-646-3232</a>'
    + '<a href="https://terracebythesea.client.innroad.com/" target="_blank">Book Now</a>'
    + '</div>';

  var FOOTER = '<footer>'
    + '<div class="footer-brand"><img src="'+SEAL+'" class="footer-seal" alt="Terrace By The Sea Est 1920"><p>A special place on the Maine coast since 1920. Deluxe motel comfort with colonial inn elegance, directly overlooking Ogunquit Beach.</p></div>'
    + '<div class="footer-col"><h4>Accommodations</h4><ul>'
    + '<li><a href="'+BASE+'/buildings/main-inn/">The Main Inn</a></li>'
    + '<li><a href="'+BASE+'/buildings/deluxe-motel/">Deluxe Motel</a></li>'
    + '<li><a href="'+BASE+'/buildings/side-motel-cottage/">Side Motel &amp; Cottage</a></li>'
    + '<li><a href="'+BASE+'/buildings/court-motel/">Court Motel</a></li>'
    + '<li><a href="'+BASE+'/buildings/suites/">The Suites</a></li>'
    + '</ul></div>'
    + '<div class="footer-col"><h4>Explore</h4><ul>'
    + '<li><a href="'+BASE+'/amenities/">Amenities</a></li>'
    + '<li><a href="'+BASE+'/gallery/">Gallery</a></li>'
    + '<li><a href="'+BASE+'/virtual-tour/">Virtual Tour</a></li>'
    + '<li><a href="'+BASE+'/weddings/">Weddings &amp; Events</a></li>'
    + '<li><a href="'+BASE+'/attractions/">Nearby Attractions</a></li>'
    + '</ul></div>'
    + '<div class="footer-col"><h4>Find Us</h4><address>23 Wharf Lane<br>Ogunquit, Maine 03907<br><br><a href="tel:2076463232">207-646-3232</a><br><a href="mailto:info@terracebythesea.com">info@terracebythesea.com</a></address></div>'
    + '</footer>'
    + '<div class="footer-bottom"><span>&copy; 2025 Terrace By The Sea. All rights reserved.</span><div class="footer-social"><a href="https://www.facebook.com/TerraceOgunquit" target="_blank">Facebook</a><a href="https://www.youtube.com/watch?v=Gek-lAB1DSM" target="_blank">YouTube</a></div></div>';

  var BOOKING = '<div class="booking-bar-wrapper"><div class="booking-bar">'
    + '<div class="booking-field"><label for="checkin">Check In</label><input type="date" id="checkin"></div>'
    + '<div class="booking-field"><label for="checkout">Check Out</label><input type="date" id="checkout"></div>'
    + '<button class="booking-bar-btn" onclick="window.open(\'https://terracebythesea.client.innroad.com/\',\'_blank\')">Book Now</button>'
    + '</div></div>';

  // Inject
  document.body.insertAdjacentHTML('afterbegin', NAV + MOB);
  document.body.insertAdjacentHTML('beforeend', FOOTER + BOOKING);

  // Set active nav
  var path = window.location.pathname;
  document.querySelectorAll('.nav-links > li > a').forEach(function(a){
    if(path.indexOf(a.getAttribute('href').split('/').filter(Boolean).pop()) > -1) a.parentElement.classList.add('active');
  });

  // Dropdown click toggles
  document.querySelectorAll('.nav-links > li').forEach(function(li){
    var link = li.querySelector('a');
    var menu = li.querySelector('.nav-dropdown-menu');
    if(!menu) return;
    link.addEventListener('click', function(e){
      e.preventDefault();
      var isOpen = li.classList.contains('open');
      document.querySelectorAll('.nav-links > li').forEach(function(l){ l.classList.remove('open'); });
      if(!isOpen) li.classList.add('open');
    });
  });
  // Close dropdowns on outside click or Escape
  document.addEventListener('click', function(e){
    if(!e.target.closest('.nav-links')){
      document.querySelectorAll('.nav-links > li').forEach(function(l){ l.classList.remove('open'); });
    }
  });
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape') document.querySelectorAll('.nav-links > li').forEach(function(l){ l.classList.remove('open'); });
  });

  // Mobile menu
  document.getElementById('hamburger').addEventListener('click', function(){
    document.getElementById('mobileMenu').classList.toggle('open');
  });

  // Dates
  var today = new Date(), tomorrow = new Date(today);
  tomorrow.setDate(today.getDate()+1);
  var fmt = function(d){return d.toISOString().split('T')[0]};
  var ci = document.getElementById('checkin'), co = document.getElementById('checkout');
  ci.value = fmt(today); co.value = fmt(tomorrow);
  ci.min = fmt(today); co.min = fmt(tomorrow);
  ci.addEventListener('change', function(e){
    var next = new Date(e.target.value); next.setDate(next.getDate()+1);
    co.min = fmt(next); if(co.value <= e.target.value) co.value = fmt(next);
  });

  // Scroll reveals
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  },{threshold:0.1});
  document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });
})();
