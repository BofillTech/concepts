/*
 * Sea Chambers — Concept Site
 * Main JavaScript
 *
 * One file serves every page. Each module is wrapped in a feature-detection
 * guard so behaviors only initialize when the relevant DOM elements exist.
 *
 *   1. Shared nav scroll behavior         (every page)
 *   2. Scroll-reveal observer             (any page with .reveal)
 *   3. Anchor smooth scrolling            (any page with #sc anchors)
 *   4. Booking date defaults              (pages with #sc-ci/#sc-co)
 *   5. Gallery filter & lightbox          (gallery.html)
 *   6. Interactive building map           (rooms.html)
 *   7. Per-room detail page               (room.html)
 */

(function(){
  'use strict';

  document.addEventListener('DOMContentLoaded', function(){

    // ============================================
    // 1. SHARED NAV SCROLL BEHAVIOR
    // ============================================
    var nav = document.getElementById('sc-nav');
    if(nav){
      window.addEventListener('scroll', function(){
        nav.classList.toggle('scrolled', window.scrollY > 60);
      });
    }

    // ============================================
    // 2. SCROLL-REVEAL OBSERVER
    // ============================================
    var reveals = document.querySelectorAll('.reveal');
    if(reveals.length && 'IntersectionObserver' in window){
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if(en.isIntersecting){
            en.target.classList.add('visible');
            obs.unobserve(en.target);
          }
        });
      }, {threshold:.1, rootMargin:'0px 0px -40px 0px'});
      reveals.forEach(function(el){ obs.observe(el); });
    }

    // ============================================
    // 3. ANCHOR SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#sc"]').forEach(function(a){
      a.addEventListener('click', function(e){
        e.preventDefault();
        var t = document.querySelector(a.getAttribute('href'));
        if(t) t.scrollIntoView({behavior:'smooth', block:'start'});
      });
    });

    // ============================================
    // 4. BOOKING DATE DEFAULTS
    // ============================================
    var ci = document.getElementById('sc-ci');
    var co = document.getElementById('sc-co');
    if(ci && co){
      var today = new Date();
      var tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      var fmt = function(d){ return d.toISOString().split('T')[0]; };
      ci.value = fmt(today);
      co.value = fmt(tomorrow);
    }

    // ============================================
    // 5. GALLERY FILTER & LIGHTBOX
    // ============================================
    if(document.querySelector('.sc-gallery-tabs')){
      // Filter tabs
      document.querySelectorAll('.sc-gallery-tab').forEach(function(tab){
        tab.addEventListener('click', function(){
          var cat = tab.dataset.cat;
          document.querySelectorAll('.sc-gallery-tab').forEach(function(t){ t.classList.remove('active'); });
          tab.classList.add('active');
          document.querySelectorAll('.sc-gallery-section').forEach(function(section){
            section.style.display = (cat === 'all' || section.dataset.cat === cat) ? 'block' : 'none';
          });
        });
      });

      // Delegated lightbox open (replaces inline onclick="openLightbox(this)")
      var lightbox = document.getElementById('lightbox');
      var lightboxImg = document.getElementById('lightbox-img');
      document.querySelectorAll('.sc-gallery-grid img').forEach(function(img){
        img.addEventListener('click', function(){
          if(!lightbox || !lightboxImg) return;
          lightboxImg.src = img.src;
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
      });

      // Close handlers
      function closeLightbox(){
        if(lightbox) lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
      var closeBtn = document.querySelector('.sc-lightbox-close');
      if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
      if(lightbox) lightbox.addEventListener('click', function(e){
        if(e.target === lightbox) closeLightbox();
      });
      document.addEventListener('keydown', function(e){
        if(e.key === 'Escape') closeLightbox();
      });
    }

    // ============================================
    // 6. INTERACTIVE BUILDING MAP (rooms.html)
    // ============================================
    if(document.getElementById('sc-rmap')){
      initBuildingMap();
    }

    // ============================================
    // 7. PER-ROOM DETAIL PAGE (room.html)
    // ============================================
    if(document.getElementById('sc-room-main')){
      initRoomDetail();
    }

    // ============================================
    // 8. TESTIMONIALS CAROUSEL (homepage)
    // ============================================
    var testimonialsRoot = document.querySelector('.sc-testimonials');
    if(testimonialsRoot){
      var items = testimonialsRoot.querySelectorAll('.sc-testimonial');
      var dots = testimonialsRoot.querySelectorAll('.sc-testimonials__dot');
      var current = 0;
      var timer = null;
      var DURATION = 6000;
      function show(idx){
        items.forEach(function(el, i){ el.classList.toggle('sc-testimonial--active', i === idx); });
        dots.forEach(function(el, i){ el.classList.toggle('sc-testimonials__dot--active', i === idx); });
        current = idx;
      }
      function next(){ show((current + 1) % items.length); }
      function start(){ stop(); timer = setInterval(next, DURATION); }
      function stop(){ if(timer){ clearInterval(timer); timer = null; } }
      dots.forEach(function(dot){
        dot.addEventListener('click', function(){
          show(parseInt(dot.dataset.idx, 10));
          start();
        });
      });
      testimonialsRoot.addEventListener('mouseenter', stop);
      testimonialsRoot.addEventListener('mouseleave', start);
      start();
    }

  });

  // ============================================
  // BUILDING MAP MODULE
  // ============================================
  function initBuildingMap(){
    // ROOM DATA — bed config, level, ocean view, optional notes
var ROOM_UPDATES = {
    "1":{b:"Queen, Double + Queen Sofa Bed",f:"a queen, a double plus a queen sofa bed",v:"Ocean View",sqft:375,connecting:null,special:null},
    "2":{b:"Queen, Double + Queen Sofa Bed",f:"a queen, a double plus a queen sofa bed",v:"Ocean View",sqft:375,connecting:null,special:null},
    "3":{b:"Queen, Double + Queen Sofa Bed",f:"a queen, a double plus a queen sofa bed",v:"Ocean View",sqft:375,connecting:null,special:null},
    "4":{b:"Two Queens + Trundle Bed",f:"a first room with two queen beds, plus a second room with a trundle bed",v:"Non-Ocean View",sqft:345,connecting:null,special:"Two-room suite."},
    "5":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "6":{b:"King Bed",f:"a king bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "7":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "8":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "9":{b:"Queen, Double & Trundle Beds",f:"a queen, a double and a trundle bed",v:"Ocean View",sqft:400,connecting:null,special:"Two-room suite."},
    "10":{b:"King Bed",f:"a king bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "11":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "12":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "14":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "15":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "16":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "17":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "18":{b:"Queen & Double Beds",f:"a queen and a double bed, and a wrap-around private balcony",v:"Bold Ocean View",sqft:340,connecting:null,special:"Private ocean view balcony."},
    "19":{b:"Queen, Double + Queen Sofa Bed",f:"a queen, a double plus a queen sofa bed",v:"Ocean View",sqft:375,connecting:null,special:null},
    "20":{b:"Queen, Double + Queen Sofa Bed",f:"a queen, a double plus a queen sofa bed",v:"Ocean View",sqft:375,connecting:null,special:null},
    "21":{b:"Queen, Double + Queen Sofa Bed",f:"a queen, a double plus a queen sofa bed",v:"Ocean View",sqft:375,connecting:null,special:null},
    "22":{b:"Two Queens + Trundle Bed",f:"a first room with two queen beds, plus a second room with a trundle bed",v:"Non-Ocean View",sqft:345,connecting:null,special:"Two-room suite."},
    "23":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "24":{b:"King + Twin Sofa Bed",f:"a king bed plus a twin sofa bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "25":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "26":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "27":{b:"Queen, Double & Trundle Beds",f:"a queen, a double and a trundle bed",v:"Ocean View",sqft:400,connecting:null,special:"Two-room suite."},
    "28":{b:"King Bed",f:"a king bed",v:"Ocean View",sqft:320,connecting:null,special:null},
    "29":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "30":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "31":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "32":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "34":{b:"Two Queen Beds",f:"two queen beds plus a table inside and out",v:"Ocean View",sqft:377,connecting:null,special:null},
    "35":{b:"Two Queen Beds",f:"two queen beds plus a table inside and out",v:"Ocean View",sqft:377,connecting:null,special:null},
    "36":{b:"King Bed",f:"a king bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "37":{b:"King Bed",f:"a king bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "38":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "39":{b:"Queen & Double Beds",f:"a queen and a double bed, and a wrap-around private balcony",v:"Bold Ocean View",sqft:340,connecting:null,special:"Private ocean view balcony."},
    "41":{b:"King Bed",f:"a king bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "42":{b:"King Bed",f:"a king bed, and a spectacular seating area",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "70":{b:"King + Twin Sofa Bed",f:"a king bed plus a twin sofa bed, and a private balcony",v:"Ocean View",sqft:414,connecting:null,special:"Private ocean view balcony."},
    "71":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:255,connecting:null,special:"Street view balcony."},
    "72":{b:"Two Queen Beds",f:"two queen beds plus a table inside and out",v:"Non-Ocean View",sqft:264,connecting:null,special:null},
    "73":{b:"King Bed",f:"a king bed. This room connects with Room 74",v:"Non-Ocean View",sqft:252,connecting:"Connecting option with 74",special:null},
    "74":{b:"King & Trundle Beds",f:"a king and a trundle bed. This room connects with Room 73",v:"Ocean View",sqft:330,connecting:"Connecting option with 73",special:"Two-room suite."},
    "75":{b:"King + Queen Sofa Bed",f:"a king bed plus a queen sofa bed",v:"Ocean View",sqft:396,connecting:null,special:null},
    "76":{b:"King & Trundle Beds",f:"a king and a trundle bed",v:"Ocean View",sqft:306,connecting:null,special:"Two-room suite."},
    "77":{b:"King + Twin Sofa Bed",f:"a king bed plus a twin sofa bed",v:"Non-Ocean View",sqft:240,connecting:null,special:null},
    "78":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:180,connecting:null,special:null},
    "33A":{b:"Two Queen Beds",f:"two queen beds plus a table inside and out. This room connects with Room 33B",v:"Partial Ocean View",sqft:377,connecting:"Connecting option with 33B",special:null},
    "33B":{b:"Two Queen Beds",f:"two queen beds plus a table inside and out. This room connects with Room 33A",v:"Partial Ocean View",sqft:377,connecting:"Connecting option with 33A",special:null},
    "40A":{b:"King, Trundle + Queen Sofa Bed",f:"a king and a trundle bed, plus a queen sofa bed",v:"Ocean View",sqft:396,connecting:null,special:null},
    "40B":{b:"King Bed",f:"a king bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "501":{b:"King + Double Sofa Bed",f:"a king bed plus a double sofa bed, full kitchen and a patio.",v:"Non-Ocean View",sqft:391,connecting:null,special:"Full kitchen and patio seating."},
    "502":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:null},
    "503":{b:"King Bed",f:"a king bed and a patio.",v:"Non-Ocean View",sqft:144,connecting:null,special:"Patio seating."},
    "504":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:null},
    "506":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:null},
    "507":{b:"King Bed",f:"a king bed and a patio.",v:"Non-Ocean View",sqft:144,connecting:null,special:"Patio seating."},
    "508":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:null},
    "522":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:"Street view balcony."},
    "523":{b:"King + Double Sofa Bed",f:"a king bed plus a double sofa bed",v:"Non-Ocean View",sqft:332,connecting:null,special:"Two-room suite, balcony with distant ocean view."},
    "524":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:"Balcony",special:"Street view balcony."},
    "525":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:"Balcony with distant ocean view."},
    "526":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:null},
    "527":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:"Balcony with distant ocean view."},
    "528":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:null},
    "530":{b:"King + 2 Twin Beds",f:"two bedrooms, a full kitchen, dining and living room areas",v:"Distant Ocean View",sqft:972,connecting:null,special:"Penthouse apartment."},
  };

    const BLDG = {
      oceanside: {
        name: "The Oceanside Building",
        desc: "Our largest building — most rooms face the Atlantic with unobstructed ocean views.",
        diagram: "img/diagrams/diagram-oceanside.png",
        info: [
          "Rooms 1-18 are on our Main Level, with no stairs.",
          "Rooms 19-32 are on our Upper Level, one staircase up from our Main Level.",
          "Rooms 33A-35 are on our Terrace Level, down a ramp from the parking lot, with one step into the room.",
          "Rooms 36-39 are on our Terrace Level, down a ramp from the parking lot, with no steps into the room.",
          "Rooms 40A-42 are on our Sea Level, down a ramp and a staircase."
        ],
        roomAreas: {"22":{left:6.71,top:2.5,width:4.54,height:16.45},"23":{left:12.66,top:2.5,width:4.54,height:16.45},"24":{left:18.55,top:2.5,width:4.54,height:16.45},"25":{left:24.5,top:2.5,width:4.54,height:16.45},"26":{left:30.45,top:2.5,width:4.54,height:16.45},"27":{left:36.45,top:2.5,width:4.54,height:16.45},"28":{left:44.78,top:2.5,width:4.54,height:16.45},"29":{left:50.68,top:2.5,width:4.54,height:16.45},"30":{left:56.79,top:2.5,width:4.54,height:16.45},"31":{left:62.9,top:2.5,width:4.54,height:16.45},"32":{left:68.69,top:2.5,width:4.54,height:16.45},"4":{left:7.3,top:19.93,width:4.54,height:16.45},"5":{left:13.3,top:19.93,width:4.54,height:16.45},"6":{left:19.25,top:19.93,width:4.54,height:16.45},"7":{left:25.2,top:19.93,width:4.54,height:16.45},"8":{left:31.26,top:19.93,width:4.54,height:16.45},"9":{left:37.1,top:19.93,width:4.54,height:16.45},"10":{left:50.95,top:19.93,width:4.54,height:16.45},"11":{left:57.06,top:19.93,width:4.54,height:16.45},"12":{left:62.84,top:19.93,width:4.54,height:16.45},"14":{left:68.79,top:19.93,width:4.54,height:16.45},"15":{left:74.74,top:19.93,width:4.54,height:16.45},"16":{left:80.69,top:19.93,width:4.54,height:16.45},"17":{left:86.7,top:19.93,width:4.54,height:16.45},"18":{left:92.64,top:19.93,width:4.54,height:16.45},"33A":{left:51.16,top:37.69,width:4.54,height:16.45},"33B":{left:57.11,top:37.69,width:4.54,height:16.45},"34":{left:63.06,top:37.69,width:4.54,height:16.45},"35":{left:69.01,top:37.69,width:4.54,height:16.45},"36":{left:74.96,top:37.69,width:4.54,height:16.45},"37":{left:80.91,top:37.69,width:4.54,height:16.45},"38":{left:86.86,top:37.69,width:4.54,height:16.45},"39":{left:92.81,top:37.69,width:4.54,height:16.45},"40A":{left:51.97,top:56.03,width:4.54,height:16.45},"40B":{left:57.92,top:56.03,width:4.54,height:16.45},"41":{left:63.87,top:56.03,width:4.54,height:16.45},"42":{left:69.82,top:56.03,width:4.54,height:16.45},"21":{left:1.14,top:37.69,width:5.41,height:16.45},"20":{left:1.14,top:56.03,width:5.41,height:16.45},"19":{left:1.14,top:74.38,width:5.41,height:16.45},"3":{left:7.08,top:37.69,width:5.41,height:16.45},"2":{left:7.08,top:56.03,width:5.41,height:16.45},"1":{left:7.08,top:74.38,width:5.41,height:16.45}},
        photo: "img/buildings/oceanside-photo.jpg",
        levels: [
          { name: "Main Level", meta: "No stairs", rooms: [
            {n:"1", b:"Q/D + Queen Sofa", v:false},
            {n:"2", b:"Q/D + Queen Sofa", v:false},
            {n:"3", b:"Q/D + Queen Sofa", v:false},
            {n:"4", b:"Q/Q + Trundle", note:"Two-room suite", v:false},
            {n:"5", b:"Queen + Double", v:false},
            {n:"6", b:"King", v:false},
            {n:"7", b:"Queen + Double", v:true},
            {n:"8", b:"Queen + Double", v:true},
            {n:"9", b:"Q/D + Trundle", note:"Two-room suite", v:true},
            {n:"10", b:"King", v:true, special:"Sofa bed, oversized"},
            {n:"11", b:"Queen + Double", v:true},
            {n:"12", b:"Queen + Double", v:true},
            {n:"14", b:"Queen + Double", v:true},
            {n:"15", b:"Queen + Double", v:true},
            {n:"16", b:"Queen + Double", v:true},
            {n:"17", b:"Queen + Double", v:true},
            {n:"18", b:"Queen + Double", v:true}
          ]},
          { name: "Upper Level", meta: "One staircase up from Main Level", rooms: [
            {n:"19", b:"Q/D + Queen Sofa", v:false},
            {n:"20", b:"Q/D + Queen Sofa", v:false},
            {n:"21", b:"Q/D + Queen Sofa", v:false},
            {n:"22", b:"Q/Q + Trundle", note:"Two-room suite", v:false},
            {n:"23", b:"Queen + Double", v:false},
            {n:"24", b:"King + Twin Sofa Bed", v:true, special:"Love seat"},
            {n:"25", b:"Queen + Double", v:true},
            {n:"26", b:"Queen + Double", v:true},
            {n:"27", b:"Q/D + Trundle", note:"Two-room suite", v:true},
            {n:"28", b:"Queen + Double", v:true},
            {n:"29", b:"Queen + Double", v:true},
            {n:"30", b:"Queen + Double", v:true},
            {n:"31", b:"Queen + Double", v:true},
            {n:"32", b:"Queen + Double", v:true}
          ]},
          { name: "Terrace Level", meta: "Down a ramp from the parking lot", rooms: [
            {n:"33A", b:"Two Queens", note:"Adjoining option with 33B", v:true, access:"Down a ramp from the parking lot, with one step into the room"},
            {n:"33B", b:"Two Queens", note:"Adjoining option with 33A", v:true, access:"Down a ramp from the parking lot, with one step into the room"},
            {n:"34", b:"Queen + Double", v:true, access:"Down a ramp from the parking lot, with one step into the room"},
            {n:"35", b:"Two Queens", v:true, sqft:"~377 sq ft", special:"Extra large", access:"Down a ramp from the parking lot, with one step into the room"},
            {n:"36", b:"King", v:true, access:"Down a ramp from the parking lot, with no steps into the room"},
            {n:"37", b:"King", v:true, special:"Bold ocean view", access:"Down a ramp from the parking lot, with no steps into the room"},
            {n:"38", b:"Queen + Double", v:true, access:"Down a ramp from the parking lot, with no steps into the room"},
            {n:"39", b:"Queen + Double", v:true, access:"Down a ramp from the parking lot, with no steps into the room"}
          ]},
          { name: "Sea Level", meta: "Down a ramp and a staircase — closest to the water", rooms: [
            {n:"40A", b:"King/Twin + Queen Sofa", note:"Two-room suite", v:true},
            {n:"40B", b:"King", v:true},
            {n:"41", b:"King", v:true},
            {n:"42", b:"King", v:true, special:"Bold ocean view, closest to water"}
          ]}
        ]
      },
      poolside: {
        name: "The Poolside Building",
        desc: "Home to the Front Desk — steps from the pool, hot tub, and fire pits.",
        diagram: "img/diagrams/diagram-poolside.png",
        info: [
          "Our Front Desk may be reached by ramp or by a half staircase.",
          "Rooms 70 and 71 are on the Top Level, with a full staircase.",
          "Rooms 72-76 are on the Ground Level, but all require stairs to enter.",
          "Rooms 77 and 78 are on a Lower Level with no steps."
        ],
        roomAreas: {"78":{left:3.25,top:6.42,width:7.03,height:38.85},"77":{left:10.82,top:6.42,width:7.03,height:38.85},"72":{left:18.18,top:6.42,width:5.95,height:38.85},"73":{left:18.18,top:48.64,width:5.95,height:32.09},"75":{left:24.19,top:6.42,width:5.95,height:38.85},"74":{left:24.19,top:48.64,width:5.95,height:32.09},"71":{left:30.74,top:6.42,width:5.95,height:38.85},"70":{left:36.74,top:6.42,width:5.95,height:38.85},"76":{left:24.19,top:-35.82,width:5.95,height:38.85},"_pool":{left:52.27,top:22.29,width:20.45,height:57.77},"_firepits":{left:77.71,top:29.23,width:17.15,height:43.92}},
        imageAreas: [
          {label: "Seasonal Ocean View Heated Pool and Hot Tub", href: "amenities.html#pool", left: 52.27, top: 22.29, width: 20.45, height: 57.77},
          {label: "Two Ocean View Fire Pits", href: "amenities.html#firepits", left: 77.71, top: 29.23, width: 17.15, height: 43.92}
        ],
        photo: "img/buildings/poolside-photo.png",
        levels: [
          { name: "Top Level", meta: "Full staircase up", rooms: [
            {n:"70", b:"King + Sofa Bed", v:true, special:"Balcony with ocean view"},
            {n:"71", b:"King + Sofa Bed", v:true, special:"Balcony"}
          ]},
          { name: "Ground Level", meta: "Stairs required to enter", rooms: [
            {n:"72", b:"Two Queens", v:false},
            {n:"73", b:"King", note:"Adjoining option with 74", v:true},
            {n:"74", b:"King + Twin Sofa Bed", note:"Two-room suite, adjoining 73", v:true},
            {n:"75", b:"King + Queen Sofa Bed", v:true},
            {n:"76", b:"King + Twin Sofa Bed", note:"Two-room suite", v:true}
          ]},
          { name: "Lower Level", meta: "No steps", rooms: [
            {n:"77", b:"King + Twin Sofa Bed", v:false},
            {n:"78", b:"King", v:false}
          ]}
        ]
      },
      inn: {
        name: "The Inn Building",
        desc: "Charming standalone building across Shore Road — larger suites and apartment-style rooms.",
        diagram: "img/diagrams/diagram-inn.png",
        photo: "img/buildings/inn-photo.png",
        info: [
          "Our Guest Utility Room is one full staircase below the First Floor.",
          "Rooms 501-508 are on the First Floor, with two steps into the building.",
          "Rooms 522-528 are on the Second Floor, up one full staircase.",
          "Room 530 is the entire Third Floor, up two full staircases."
        ],
        roomAreas: {"507":{left:30.28,top:17.54,width:9.1,height:20.19},"508":{left:39.38,top:17.54,width:9.1,height:20.19},"503":{left:30.28,top:39.19,width:9.1,height:20.19},"506":{left:39.38,top:39.19,width:9.1,height:20.19},"501":{left:30.28,top:60.82,width:9.1,height:20.19},"504":{left:39.38,top:60.82,width:9.1,height:20.19},"502":{left:39.38,top:82.45,width:9.1,height:20.19},"527":{left:51.52,top:17.54,width:9.1,height:20.19},"528":{left:60.67,top:17.54,width:9.1,height:20.19},"525":{left:51.52,top:39.19,width:9.1,height:20.19},"526":{left:60.67,top:39.19,width:9.1,height:20.19},"523":{left:51.52,top:60.82,width:9.1,height:20.19},"524":{left:60.67,top:60.82,width:9.1,height:20.19},"522":{left:60.67,top:82.45,width:9.1,height:20.19},"530":{left:73.13,top:108.18,width:21.67,height:60.1}},
        levels: [
          { name: "First Floor", meta: "Two steps into the building", rooms: [
            {n:"501", b:"King + Double Sofa Bed", note:"Kitchen + patio", v:false, special:"Apartment-style with full kitchen"},
            {n:"502", b:"King", v:false},
            {n:"503", b:"King", note:"Patio", v:false, special:"Private patio"},
            {n:"504", b:"King", v:false},
            {n:"506", b:"King", v:false},
            {n:"507", b:"King", note:"Patio", v:false, special:"Private patio"},
            {n:"508", b:"King", v:false}
          ]},
          { name: "Second Floor", meta: "One full staircase up", rooms: [
            {n:"522", b:"King", note:"Balcony", v:true, special:"Private ocean view balcony"},
            {n:"523", b:"King + Double Sofa Bed", note:"Two-room suite, balcony", v:true, sqft:"~332 sq ft", special:"Two-room suite with private ocean view balcony"},
            {n:"524", b:"King", note:"Balcony", v:true, special:"Balcony"},
            {n:"525", b:"King", note:"Balcony", v:true, special:"Balcony with ocean view"},
            {n:"526", b:"King", v:false},
            {n:"527", b:"King", note:"Balcony", v:true, special:"Balcony with ocean view"},
            {n:"528", b:"King", v:false}
          ]},
          { name: "Third Floor", meta: "Up two full staircases — entire floor apartment", rooms: [
            {n:"530", b:"King + 2 Twin", note:"2-bedroom apartment, full kitchen", v:true, special:"Entire third-floor apartment — largest accommodation, two bedrooms, full kitchen and dining area"}
          ]}
        ]
      }
    };

    // Apply per-room updates from ROOM_UPDATES lookup (source of truth)
    Object.keys(BLDG).forEach(function(bkey){
      BLDG[bkey].levels.forEach(function(level){
        level.rooms.forEach(function(room){
          var u = ROOM_UPDATES[room.n];
          if(u){
            if(u.b) room.b = u.b;
            if(u.f) room.f = u.f;
            if(u.v) room.v = u.v;
            if(u.sqft) room.sqft = u.sqft;
            // special + connecting always overwrite — null clears prior
            room.special = u.special;
            room.connecting = u.connecting;
            // Auto-append period if missing so template reads cleanly
            if(room.special && !/[.!?]$/.test(room.special)) room.special += '.';
          }
        });
      });
    });



    // Photo sets — keyed by bed config or specific room number override
    const PHOTOS = {
      // Specific real photos from seachambers.com
      "35": {
        interior: [
          "https://www.seachambers.com/wp-content/uploads/2023/03/1-34-3.jpg",
          "https://www.seachambers.com/wp-content/uploads/2023/03/34tableandchairs.jpg",
          "https://www.seachambers.com/wp-content/uploads/2023/03/34tableandchairsreversed.jpg",
          "https://www.seachambers.com/wp-content/uploads/2023/03/3-34-3.jpg",
          "https://www.seachambers.com/wp-content/uploads/2023/03/4-34-3.jpg"
        ],
        view: "img/beach-view.jpg"
      },
      // Fallback by category — each has an interior hero set + a "view from room" photo
      king: {
        interior: ["img/room-king.jpg", "img/room-2-view.jpg", "img/room-46-pool.jpg"],
        view: "img/beach-view.jpg"
      },
      queendouble: {
        interior: ["img/room-double.jpg", "img/room-2-view.jpg", "img/room-46-pool.jpg"],
        view: "img/beach-view.jpg"
      },
      twoqueens: {
        interior: [
          "https://www.seachambers.com/wp-content/uploads/2023/03/1-34-3.jpg",
          "https://www.seachambers.com/wp-content/uploads/2023/03/34tableandchairs.jpg",
          "https://www.seachambers.com/wp-content/uploads/2023/03/3-34-3.jpg"
        ],
        view: "img/beach-view.jpg"
      },
      suite: {
        interior: ["img/room-suite.jpg", "img/room-2-view.jpg", "img/room-46-pool.jpg"],
        view: "img/beach-view.jpg"
      },
      // Non-ocean-view fallback uses the property grounds shot since there's no Atlantic view
      standardview: {
        interior: ["img/room-king.jpg", "img/room-double.jpg"],
        view: "img/building-wide.jpg"
      }
    };

    function getPhotos(room){
      if(PHOTOS[room.n]) return PHOTOS[room.n];
      const b = (room.b || "").toLowerCase();
      let set;
      if(b.includes("two queens") || b.includes("q/q")) set = PHOTOS.twoqueens;
      else if(b.includes("suite") || b.includes("apartment")) set = PHOTOS.suite;
      else if(b.startsWith("king") || b === "king") set = PHOTOS.king;
      else set = PHOTOS.queendouble;
      // Non-ocean-view rooms get the standard grounds shot instead of the beach view
      // v is a string like "Ocean View" / "Bold Ocean View" / "Non-Ocean View"
      var isOceanView = room.v && room.v.toLowerCase().indexOf("non-ocean") === -1;
      if(!isOceanView) return {interior: set.interior, view: PHOTOS.standardview.view};
      return set;
    }

    function renderBuilding(key){
      const b = BLDG[key];
      document.getElementById('sc-rmap-diagram-img').src = b.diagram;
      document.getElementById('sc-rmap-diagram-img').alt = b.name + ' floor diagram';
      var photoEl = document.getElementById('sc-rmap-photo-img');
      if(photoEl){
        photoEl.src = b.photo;
        photoEl.alt = b.name + ' exterior';
      }
      document.getElementById('sc-rmap-bldg-name').textContent = b.name;
      document.getElementById('sc-rmap-bldg-desc').textContent = b.desc;

      // Populate the level-info panel that lives under the diagram
      const infoWrap = document.getElementById('sc-rmap-info');
      if(infoWrap){
        var infoBullets = (b.info || []).map(function(text){ return '<li>' + text + '</li>'; }).join('');
        infoWrap.innerHTML = '<ul class="sc-rmap-info-list">' + infoBullets + '</ul>';
      }

      // Build lookup of room details by number for click handlers
      const roomByNum = {};
      b.levels.forEach(function(lvl){
        lvl.rooms.forEach(function(r){ roomByNum[r.n] = Object.assign({}, r, {_level: lvl.name}); });
      });

      // Debug mode: append ?debug=1 to URL to see all clickable boxes outlined
      const debug = new URLSearchParams(window.location.search).get('debug') === '1';

      // Render clickable areas over the diagram image
      const areasWrap = document.getElementById('sc-rmap-diagram-areas');
      if(areasWrap){
        const parts = [];
        // 1. Non-room imageAreas (Pool, Firepits, etc.) — external links
        (b.imageAreas || []).forEach(function(a){
          parts.push(
            '<a class="sc-rmap-diagram-area sc-rmap-diagram-area--link' + (debug ? ' sc-rmap-diagram-area--debug' : '') + '" ' +
            'href="' + a.href + '" ' +
            'aria-label="' + a.label + '" title="' + a.label + '" ' +
            'style="left:' + a.left + '%;top:' + a.top + '%;width:' + a.width + '%;height:' + a.height + '%">' +
              '<span class="sc-rmap-diagram-area-label">' + a.label + '</span>' +
            '</a>'
          );
        });
        // 2. Per-room clickable boxes from BLDG.roomAreas
        const roomAreas = b.roomAreas || {};
        Object.keys(roomAreas).forEach(function(n){
          // Skip pseudo-rooms (e.g., '_pool' / '_firepits' — those are legacy handled by imageAreas)
          if(n.charAt(0) === '_') return;
          if(!roomByNum[n]) return;
          const a = roomAreas[n];
          parts.push(
            '<button type="button" class="sc-rmap-diagram-area sc-rmap-diagram-area--room' + (debug ? ' sc-rmap-diagram-area--debug' : '') + '" ' +
            'data-bldg="' + key + '" data-room="' + n + '" ' +
            'aria-label="Room ' + n + '" title="Room ' + n + '" ' +
            'style="left:' + a.left + '%;top:' + a.top + '%;width:' + a.width + '%;height:' + a.height + '%">' +
              (debug ? '<span class="sc-rmap-diagram-area-debug-num">' + n + '</span>' : '') +
            '</button>'
          );
        });
        areasWrap.innerHTML = parts.join('');
      }

      // Wire up per-room click handlers
      document.querySelectorAll('.sc-rmap-diagram-area--room').forEach(function(el){
        el.addEventListener('click', function(e){
          e.preventDefault();
          const num = el.dataset.room;
          const room = roomByNum[num];
          if(!room) return;
          showRoom(b, key, room, el);
          if(window.matchMedia('(max-width: 900px)').matches){
            setTimeout(function(){
              document.getElementById('sc-rmap-panel').scrollIntoView({behavior:'smooth', block:'start'});
            }, 30);
          }
        });
      });

      // Reset panel
      document.getElementById('sc-rmap-panel').innerHTML = `
        <div class="sc-rmap-empty">
          <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 11.25v1.5M15 11.25v1.5M9.75 17.25h4.5M3.75 21h16.5M4.5 3.75v17.25M19.5 3.75v17.25M3 8.25h18M3 13.5h18"/></svg>
          <p>Tap a room on the diagram to see photos and details.</p>
        </div>`;
    }

    function showRoom(bldg, bldgKey, room, chipEl){
      document.querySelectorAll('.sc-rmap-chip.active').forEach(c => c.classList.remove('active'));
      if(chipEl) chipEl.classList.add('active');

      const photos = getPhotos(room);
      const tags = [];
      var viewLabel = room.v || "Non-Ocean View";
      var isOcean = viewLabel.toLowerCase().indexOf("non-ocean") === -1 && viewLabel !== "";
      tags.push(`<span class="sc-rmap-detail-tag${isOcean ? " ocean" : ""}">${viewLabel}</span>`);
      tags.push(`<span class="sc-rmap-detail-tag">${room._level}</span>`);
      if(room.connecting) tags.push(`<span class="sc-rmap-detail-tag">${room.connecting}</span>`);
      else if(room.special) tags.push(`<span class="sc-rmap-detail-tag">${room.special.replace(/\.$/,'')}</span>`);

      // New description template per client PDFs (April 30 round):
      //   [Special] This [view lowercased] room features [features text]. All reservations include...
      var featuresText = (room.f || room.b || '').replace(/\.$/, '');
      var viewLabelLower = (room.v || 'non-ocean view').toLowerCase();
      var specialPrefix = room.special ? `<strong>${room.special}</strong> ` : '';
      const desc = `${specialPrefix}This ${viewLabelLower} room features <strong>${featuresText}</strong>. All reservations include continental breakfast, one parking space, our firepits and ocean view seating areas, plus seasonal heated pool and hot tub.`;

      document.getElementById('sc-rmap-panel').innerHTML = `
        <div class="sc-rmap-detail">
          <div class="sc-rmap-detail-tags">${tags.join('')}</div>
          <h3>Room ${room.n}</h3>
          <div class="sc-rmap-detail-subtitle">${room.b}</div>
          <div class="sc-rmap-hero">
            <img src="${photos.interior[0]}" alt="Room ${room.n}" loading="lazy">
          </div>
          <div class="sc-rmap-view-row">
            <div class="sc-rmap-view">
              <img src="${photos.view}" alt="View from Room ${room.n}" loading="lazy">
              <div class="sc-rmap-view-label">View from room</div>
            </div>
            <p class="sc-rmap-detail-desc">${desc}</p>
          </div>
          <div class="sc-rmap-actions">
            <a href="https://reservations.seachambers.com" class="sc-rmap-btn sc-rmap-btn-primary">Book Now</a>
            <a href="room.html?id=${room.n}&bldg=${bldgKey}" class="sc-rmap-btn sc-rmap-btn-secondary">More Info</a>
          </div>
        </div>`;
    }

    // Tab switching
    document.querySelectorAll('.sc-rmap-tab').forEach(t => t.addEventListener('click', () => {
      document.querySelectorAll('.sc-rmap-tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      renderBuilding(t.dataset.bldg);
    }));

    // Init
    renderBuilding('oceanside');
  }

  // ============================================
  // ROOM DETAIL MODULE
  // ============================================
  function initRoomDetail(){
    // Mirror BLDG data from rooms.html (single source — small enough to inline)
var ROOM_UPDATES = {
    "1":{b:"Queen, Double + Queen Sofa Bed",f:"a queen, a double plus a queen sofa bed",v:"Ocean View",sqft:375,connecting:null,special:null},
    "2":{b:"Queen, Double + Queen Sofa Bed",f:"a queen, a double plus a queen sofa bed",v:"Ocean View",sqft:375,connecting:null,special:null},
    "3":{b:"Queen, Double + Queen Sofa Bed",f:"a queen, a double plus a queen sofa bed",v:"Ocean View",sqft:375,connecting:null,special:null},
    "4":{b:"Two Queens + Trundle Bed",f:"a first room with two queen beds, plus a second room with a trundle bed",v:"Non-Ocean View",sqft:345,connecting:null,special:"Two-room suite."},
    "5":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "6":{b:"King Bed",f:"a king bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "7":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "8":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "9":{b:"Queen, Double & Trundle Beds",f:"a queen, a double and a trundle bed",v:"Ocean View",sqft:400,connecting:null,special:"Two-room suite."},
    "10":{b:"King Bed",f:"a king bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "11":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "12":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "14":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "15":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "16":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "17":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "18":{b:"Queen & Double Beds",f:"a queen and a double bed, and a wrap-around private balcony",v:"Bold Ocean View",sqft:340,connecting:null,special:"Private ocean view balcony."},
    "19":{b:"Queen, Double + Queen Sofa Bed",f:"a queen, a double plus a queen sofa bed",v:"Ocean View",sqft:375,connecting:null,special:null},
    "20":{b:"Queen, Double + Queen Sofa Bed",f:"a queen, a double plus a queen sofa bed",v:"Ocean View",sqft:375,connecting:null,special:null},
    "21":{b:"Queen, Double + Queen Sofa Bed",f:"a queen, a double plus a queen sofa bed",v:"Ocean View",sqft:375,connecting:null,special:null},
    "22":{b:"Two Queens + Trundle Bed",f:"a first room with two queen beds, plus a second room with a trundle bed",v:"Non-Ocean View",sqft:345,connecting:null,special:"Two-room suite."},
    "23":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "24":{b:"King + Twin Sofa Bed",f:"a king bed plus a twin sofa bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "25":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "26":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Ocean View",sqft:340,connecting:null,special:null},
    "27":{b:"Queen, Double & Trundle Beds",f:"a queen, a double and a trundle bed",v:"Ocean View",sqft:400,connecting:null,special:"Two-room suite."},
    "28":{b:"King Bed",f:"a king bed",v:"Ocean View",sqft:320,connecting:null,special:null},
    "29":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "30":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "31":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "32":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "34":{b:"Two Queen Beds",f:"two queen beds plus a table inside and out",v:"Ocean View",sqft:377,connecting:null,special:null},
    "35":{b:"Two Queen Beds",f:"two queen beds plus a table inside and out",v:"Ocean View",sqft:377,connecting:null,special:null},
    "36":{b:"King Bed",f:"a king bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "37":{b:"King Bed",f:"a king bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "38":{b:"Queen & Double Beds",f:"a queen and a double bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "39":{b:"Queen & Double Beds",f:"a queen and a double bed, and a wrap-around private balcony",v:"Bold Ocean View",sqft:340,connecting:null,special:"Private ocean view balcony."},
    "41":{b:"King Bed",f:"a king bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "42":{b:"King Bed",f:"a king bed, and a spectacular seating area",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "70":{b:"King + Twin Sofa Bed",f:"a king bed plus a twin sofa bed, and a private balcony",v:"Ocean View",sqft:414,connecting:null,special:"Private ocean view balcony."},
    "71":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:255,connecting:null,special:"Street view balcony."},
    "72":{b:"Two Queen Beds",f:"two queen beds plus a table inside and out",v:"Non-Ocean View",sqft:264,connecting:null,special:null},
    "73":{b:"King Bed",f:"a king bed. This room connects with Room 74",v:"Non-Ocean View",sqft:252,connecting:"Connecting option with 74",special:null},
    "74":{b:"King & Trundle Beds",f:"a king and a trundle bed. This room connects with Room 73",v:"Ocean View",sqft:330,connecting:"Connecting option with 73",special:"Two-room suite."},
    "75":{b:"King + Queen Sofa Bed",f:"a king bed plus a queen sofa bed",v:"Ocean View",sqft:396,connecting:null,special:null},
    "76":{b:"King & Trundle Beds",f:"a king and a trundle bed",v:"Ocean View",sqft:306,connecting:null,special:"Two-room suite."},
    "77":{b:"King + Twin Sofa Bed",f:"a king bed plus a twin sofa bed",v:"Non-Ocean View",sqft:240,connecting:null,special:null},
    "78":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:180,connecting:null,special:null},
    "33A":{b:"Two Queen Beds",f:"two queen beds plus a table inside and out. This room connects with Room 33B",v:"Partial Ocean View",sqft:377,connecting:"Connecting option with 33B",special:null},
    "33B":{b:"Two Queen Beds",f:"two queen beds plus a table inside and out. This room connects with Room 33A",v:"Partial Ocean View",sqft:377,connecting:"Connecting option with 33A",special:null},
    "40A":{b:"King, Trundle + Queen Sofa Bed",f:"a king and a trundle bed, plus a queen sofa bed",v:"Ocean View",sqft:396,connecting:null,special:null},
    "40B":{b:"King Bed",f:"a king bed",v:"Bold Ocean View",sqft:340,connecting:null,special:null},
    "501":{b:"King + Double Sofa Bed",f:"a king bed plus a double sofa bed, full kitchen and a patio.",v:"Non-Ocean View",sqft:391,connecting:null,special:"Full kitchen and patio seating."},
    "502":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:null},
    "503":{b:"King Bed",f:"a king bed and a patio.",v:"Non-Ocean View",sqft:144,connecting:null,special:"Patio seating."},
    "504":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:null},
    "506":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:null},
    "507":{b:"King Bed",f:"a king bed and a patio.",v:"Non-Ocean View",sqft:144,connecting:null,special:"Patio seating."},
    "508":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:null},
    "522":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:"Street view balcony."},
    "523":{b:"King + Double Sofa Bed",f:"a king bed plus a double sofa bed",v:"Non-Ocean View",sqft:332,connecting:null,special:"Two-room suite, balcony with distant ocean view."},
    "524":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:"Balcony",special:"Street view balcony."},
    "525":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:"Balcony with distant ocean view."},
    "526":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:null},
    "527":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:"Balcony with distant ocean view."},
    "528":{b:"King Bed",f:"a king bed",v:"Non-Ocean View",sqft:144,connecting:null,special:null},
    "530":{b:"King + 2 Twin Beds",f:"two bedrooms, a full kitchen, dining and living room areas",v:"Distant Ocean View",sqft:972,connecting:null,special:"Penthouse apartment."},
  };

    const BLDG = {
      oceanside: {
        name: "The Oceanside Building",
        levels: [
          { name: "Main Level", meta: "No stairs", rooms: [
            {n:"1", b:"Q/D + Queen Sofa", v:false},
            {n:"2", b:"Q/D + Queen Sofa", v:false},
            {n:"3", b:"Q/D + Queen Sofa", v:false},
            {n:"4", b:"Q/Q + Trundle", note:"Two-room suite", v:false},
            {n:"5", b:"Queen + Double", v:false},
            {n:"6", b:"King", v:false},
            {n:"7", b:"Queen + Double", v:true},
            {n:"8", b:"Queen + Double", v:true},
            {n:"9", b:"Q/D + Trundle", note:"Two-room suite", v:true},
            {n:"10", b:"King", v:true, special:"Sofa bed, oversized"},
            {n:"11", b:"Queen + Double", v:true},
            {n:"12", b:"Queen + Double", v:true},
            {n:"14", b:"Queen + Double", v:true},
            {n:"15", b:"Queen + Double", v:true},
            {n:"16", b:"Queen + Double", v:true},
            {n:"17", b:"Queen + Double", v:true},
            {n:"18", b:"Queen + Double", v:true}
          ]},
          { name: "Upper Level", meta: "One staircase up from Main Level", rooms: [
            {n:"19", b:"Q/D + Queen Sofa", v:false},
            {n:"20", b:"Q/D + Queen Sofa", v:false},
            {n:"21", b:"Q/D + Queen Sofa", v:false},
            {n:"22", b:"Q/Q + Trundle", note:"Two-room suite", v:false},
            {n:"23", b:"Queen + Double", v:false},
            {n:"24", b:"King + Twin Sofa Bed", v:true, special:"Love seat"},
            {n:"25", b:"Queen + Double", v:true},
            {n:"26", b:"Queen + Double", v:true},
            {n:"27", b:"Q/D + Trundle", note:"Two-room suite", v:true},
            {n:"28", b:"Queen + Double", v:true},
            {n:"29", b:"Queen + Double", v:true},
            {n:"30", b:"Queen + Double", v:true},
            {n:"31", b:"Queen + Double", v:true},
            {n:"32", b:"Queen + Double", v:true}
          ]},
          { name: "Terrace Level", meta: "Down a ramp from the parking lot", rooms: [
            {n:"33A", b:"Two Queens", note:"Adjoining option with 33B", v:true, access:"Down a ramp from the parking lot, with one step into the room"},
            {n:"33B", b:"Two Queens", note:"Adjoining option with 33A", v:true, access:"Down a ramp from the parking lot, with one step into the room"},
            {n:"34", b:"Queen + Double", v:true, access:"Down a ramp from the parking lot, with one step into the room"},
            {n:"35", b:"Two Queens", v:true, sqft:"~377 sq ft", special:"Extra large", access:"Down a ramp from the parking lot, with one step into the room"},
            {n:"36", b:"King", v:true, access:"Down a ramp from the parking lot, with no steps into the room"},
            {n:"37", b:"King", v:true, special:"Bold ocean view", access:"Down a ramp from the parking lot, with no steps into the room"},
            {n:"38", b:"Queen + Double", v:true, access:"Down a ramp from the parking lot, with no steps into the room"},
            {n:"39", b:"Queen + Double", v:true, access:"Down a ramp from the parking lot, with no steps into the room"}
          ]},
          { name: "Sea Level", meta: "Down a ramp and a staircase — closest to the water", rooms: [
            {n:"40A", b:"King/Twin + Queen Sofa", note:"Two-room suite", v:true},
            {n:"40B", b:"King", v:true},
            {n:"41", b:"King", v:true},
            {n:"42", b:"King", v:true, special:"Bold ocean view, closest to water"}
          ]}
        ]
      },
      poolside: {
        name: "The Poolside Building",
        levels: [
          { name: "Top Level", meta: "Full staircase up", rooms: [
            {n:"70", b:"King + Sofa Bed", v:true, special:"Balcony with ocean view"},
            {n:"71", b:"King + Sofa Bed", v:true, special:"Balcony"}
          ]},
          { name: "Ground Level", meta: "Stairs required to enter", rooms: [
            {n:"72", b:"Two Queens", v:false},
            {n:"73", b:"King", note:"Adjoining option with 74", v:true},
            {n:"74", b:"King + Twin Sofa Bed", note:"Two-room suite, adjoining 73", v:true},
            {n:"75", b:"King + Queen Sofa Bed", v:true},
            {n:"76", b:"King + Twin Sofa Bed", note:"Two-room suite", v:true}
          ]},
          { name: "Lower Level", meta: "No steps", rooms: [
            {n:"77", b:"King + Twin Sofa Bed", v:false},
            {n:"78", b:"King", v:false}
          ]}
        ]
      },
      inn: {
        name: "The Inn Building",
        levels: [
          { name: "First Floor", meta: "Two steps into the building", rooms: [
            {n:"501", b:"King + Double Sofa Bed", note:"Kitchen + patio", v:false, special:"Apartment-style with full kitchen"},
            {n:"502", b:"King", v:false},
            {n:"503", b:"King", note:"Patio", v:false, special:"Private patio"},
            {n:"504", b:"King", v:false},
            {n:"506", b:"King", v:false},
            {n:"507", b:"King", note:"Patio", v:false, special:"Private patio"},
            {n:"508", b:"King", v:false}
          ]},
          { name: "Second Floor", meta: "One full staircase up", rooms: [
            {n:"522", b:"King", note:"Balcony", v:true, special:"Private ocean view balcony"},
            {n:"523", b:"King + Double Sofa Bed", note:"Two-room suite, balcony", v:true, sqft:"~332 sq ft", special:"Two-room suite with private ocean view balcony"},
            {n:"524", b:"King", note:"Balcony", v:true, special:"Balcony"},
            {n:"525", b:"King", note:"Balcony", v:true, special:"Balcony with ocean view"},
            {n:"526", b:"King", v:false},
            {n:"527", b:"King", note:"Balcony", v:true, special:"Balcony with ocean view"},
            {n:"528", b:"King", v:false}
          ]},
          { name: "Third Floor", meta: "Up two full staircases — entire floor apartment", rooms: [
            {n:"530", b:"King + 2 Twin", note:"2-bedroom apartment, full kitchen", v:true, special:"Entire third-floor apartment — largest accommodation, two bedrooms, full kitchen and dining area"}
          ]}
        ]
      }
    };

    // Apply per-room updates from ROOM_UPDATES lookup (source of truth)
    Object.keys(BLDG).forEach(function(bkey){
      BLDG[bkey].levels.forEach(function(level){
        level.rooms.forEach(function(room){
          var u = ROOM_UPDATES[room.n];
          if(u){
            if(u.b) room.b = u.b;
            if(u.f) room.f = u.f;
            if(u.v) room.v = u.v;
            if(u.sqft) room.sqft = u.sqft;
            // special + connecting always overwrite — null clears prior
            room.special = u.special;
            room.connecting = u.connecting;
            // Auto-append period if missing so template reads cleanly
            if(room.special && !/[.!?]$/.test(room.special)) room.special += '.';
          }
        });
      });
    });


    // PHOTOS: each entry is {src, caption}. Real per-room sets keyed by room number;
    // fallback sets keyed by bed type. All sets target 12 photos.
    const PHOTOS = {
      // Real photos from seachambers.com/room35/
      "35": [
        {src:"https://www.seachambers.com/wp-content/uploads/2023/03/1-34-3.jpg", caption:"Two queen beds with ocean view"},
        {src:"https://www.seachambers.com/wp-content/uploads/2023/03/34tableandchairs.jpg", caption:"Sitting area facing the ocean"},
        {src:"https://www.seachambers.com/wp-content/uploads/2023/03/34tableandchairsreversed.jpg", caption:"Sitting area looking back into the room"},
        {src:"https://www.seachambers.com/wp-content/uploads/2023/03/3-34-3.jpg", caption:"Bedroom from the entry"},
        {src:"https://www.seachambers.com/wp-content/uploads/2023/03/4-34-3.jpg", caption:"Wider room view with kitchenette"},
        {src:"img/room-2-view.jpg", caption:"Wake-up ocean view from bed"},
        {src:"img/room-46-pool.jpg", caption:"View toward the pool and Atlantic"},
        {src:"img/room-38-deck.jpg", caption:"Private deck-side view"},
        {src:"img/room-king.jpg", caption:"Coastal-decor finishes"},
        {src:"img/room-suite.jpg", caption:"Sitting nook with exposed brick"},
        {src:"img/firepit-dusk.jpg", caption:"Property fire pits at dusk"},
        {src:"img/building-wide.jpg", caption:"Adirondack chairs along the water"}
      ]
    };

    // Fallback caption templates
    const CAPTION_TEMPLATES = {
      king: ["King bed with coastal decor","Sitting area and reading chair","Kitchenette with mini-fridge","Private bathroom","Flat-screen TV and dresser","Closet and storage","View from the doorway","Window seating","Property pool and ocean view","Oceanfront fire pits","Adirondack chairs by the water","Sea Chambers oceanfront grounds"],
      queendouble: ["Queen and double beds","Kitchenette with mini-fridge","Sitting area","Private bathroom","Flat-screen TV and dresser","View toward the ocean","Closet and storage","Door view of the room","Property pool and ocean view","Oceanfront fire pits","Private deck access","Sea Chambers oceanfront grounds"],
      twoqueens: ["Two queen beds with ocean view","Sitting area facing the ocean","Sitting area looking into the room","Bedroom from the entry","Wider room view with kitchenette","Kitchenette and table","Private bathroom","Closet and storage","Window with ocean view","Property pool and grounds","Oceanfront fire pits","Adirondack chairs by the water"],
      suite: ["Suite living room with sleeper sofa","King bedroom","Sitting area with table and chairs","Kitchenette","Private bathroom","Flat-screen TV","Sleeping area from the doorway","Window with ocean view","Property pool and grounds","Oceanfront fire pits","Adirondack chairs along the water","Sea Chambers oceanfront grounds"],
      apartment: ["Living room with full kitchen","Master bedroom","Second bedroom","Dining area","Full kitchen","Sitting area","Private bathroom","Window views over the property","Apartment entry","Property pool and grounds","Oceanfront fire pits","Sea Chambers oceanfront grounds"]
    };

    // Photo pools by bed type for fallback (cycled to fill 12 with rotation)
    const PHOTO_POOLS = {
      king: ["img/room-king.jpg","img/room-2-view.jpg","img/room-suite.jpg","img/room-46-pool.jpg","img/room-38-deck.jpg","img/room-double.jpg","img/firepit-dusk.jpg","img/building-wide.jpg","img/terrace-ramp.jpg","img/lounge-grass.jpg","img/beach-view.jpg","img/main-building.jpg"],
      queendouble: ["img/room-double.jpg","img/room-38-deck.jpg","img/room-2-view.jpg","img/room-46-pool.jpg","img/room-king.jpg","img/room-suite.jpg","img/firepit-dusk.jpg","img/building-wide.jpg","img/terrace-ramp.jpg","img/lounge-grass.jpg","img/beach-view.jpg","img/main-building.jpg"],
      twoqueens: ["https://www.seachambers.com/wp-content/uploads/2023/03/1-34-3.jpg","https://www.seachambers.com/wp-content/uploads/2023/03/34tableandchairs.jpg","https://www.seachambers.com/wp-content/uploads/2023/03/34tableandchairsreversed.jpg","https://www.seachambers.com/wp-content/uploads/2023/03/3-34-3.jpg","https://www.seachambers.com/wp-content/uploads/2023/03/4-34-3.jpg","img/room-2-view.jpg","img/room-46-pool.jpg","img/room-38-deck.jpg","img/firepit-dusk.jpg","img/building-wide.jpg","img/terrace-ramp.jpg","img/main-building.jpg"],
      suite: ["img/room-suite.jpg","img/room-2-view.jpg","img/room-46-pool.jpg","img/room-38-deck.jpg","img/room-king.jpg","img/room-double.jpg","img/firepit-dusk.jpg","img/building-wide.jpg","img/terrace-ramp.jpg","img/lounge-grass.jpg","img/beach-view.jpg","img/main-building.jpg"],
      apartment: ["img/room-suite.jpg","img/room-king.jpg","img/room-double.jpg","img/room-2-view.jpg","img/room-38-deck.jpg","img/room-46-pool.jpg","img/firepit-dusk.jpg","img/building-wide.jpg","img/terrace-ramp.jpg","img/lounge-grass.jpg","img/beach-view.jpg","img/main-building.jpg"]
    };

    function getCategoryKey(room){
      const b = (room.b || "").toLowerCase();
      const sp = (room.special || "").toLowerCase();
      if(b.includes("apartment") || sp.includes("apartment")) return "apartment";
      if(b.includes("two queens") || b.includes("q/q")) return "twoqueens";
      if(sp.includes("two-room suite") || (b.includes("sofa bed") && b.includes("king"))) return "suite";
      if(b.startsWith("king") || b === "king") return "king";
      return "queendouble";
    }

    function getPhotos(room){
      // Specific room override
      if(PHOTOS[room.n]){
        let arr = PHOTOS[room.n].slice(0,12);
        let i = 0;
        while(arr.length < 12){ arr.push(arr[i % PHOTOS[room.n].length]); i++; }
        return arr;
      }
      const cat = getCategoryKey(room);
      const pool = PHOTO_POOLS[cat];
      const captions = CAPTION_TEMPLATES[cat];
      return pool.slice(0,12).map((src, i) => ({src, caption: captions[i] || ""}));
    }

    // Per-client Individual_room_page.pdf spec: use bullet points modeled on the
    // current seachambers.com — bed configuration + universal base + special items.
    // Sqft moves to the metadata box (not a bullet).
    //
    // Building-specific bullet patterns verified from ~15 room samples on seachambers.com
    // (rooms 5, 9, 12, 18, 20, 22, 31, 32, 37 for Oceanside; 75, 76 for Poolside;
    //  502, 504, 507, 508, 522, 523, 527, 528 for Inn):
    //
    // OCEANSIDE:  microwave and refrigerator → coffee maker → TV & DVD → iron/rack → carpeted → outdoor seating
    // POOLSIDE:   same as Oceanside but hard surface flooring
    // INN:        refrigerator and microwave (reversed) → TV & DVD → private bath → carpeted → ceiling fan → balcony/patio → non-ocean note

    function getAmenities(room, bldgKey){
      const list = [];

      // 1. Bed configuration bullets from features_text. Split on ". " (period+space)
      //    so notes like "This room connects with Room 33B" become their own bullet.
      const features = (room.f || room.b || '').trim();
      if(features){
        features.split(/\.\s+/).forEach(function(s){
          const t = s.replace(/\.$/,'').trim();
          if(t) list.push(t);
        });
      }

      const isTwoRoom = /(two[- ]room|second room|first room)/i.test(features) ||
                        /two[- ]room/i.test(room.special || '');
      const view = (room.v || '').toLowerCase();
      const isOceanView = view && view.indexOf('non-ocean') === -1;
      const special = (room.special || '').toLowerCase();
      const hasBalcony = /balcony/.test(special) || /balcony/.test(features.toLowerCase());
      const hasPatio = /patio/.test(special) || /patio/.test(features.toLowerCase());

      if(bldgKey === 'inn'){
        // Inn: minimal, room-focused list
        list.push('refrigerator and microwave');
        list.push('flat screen TV and DVD player' + (isTwoRoom ? ' in each room' : ''));
        list.push('private bath with shower, no tub');
        list.push('carpeted flooring');
        list.push('ceiling fan' + (isTwoRoom ? 's' : ''));
        // Balcony/patio line matching seachambers wording
        if(hasBalcony && isOceanView) list.push('sliding door to private ocean view balcony');
        else if(hasBalcony) list.push('sliding door to private balcony');
        else if(hasPatio && isOceanView) list.push('sliding door to designated patio with partial ocean view seating');
        else if(hasPatio) list.push('sliding door to designated patio');
        // Non-ocean-view closing line (only for Inn since Inn Building has the ocean-view lounges reference)
        if(!isOceanView){
          const seatingClause = (hasBalcony || hasPatio) ? '.' : ' nor designated outdoor seating.';
          list.push('This room does not have an ocean view' + seatingClause +
                    ' The Inn Building has two interior ocean view lounges for guest use.');
        }
      } else {
        // Oceanside + Poolside: standard fuller list
        list.push('microwave and refrigerator');
        list.push('four-cup drip coffee maker, toaster, dishes and silverware');
        list.push('flat screen TV and DVD player' + (isTwoRoom ? ' in each bedroom' : ''));
        list.push('iron and board, drying rack and luggage rack');
        list.push(bldgKey === 'poolside' ? 'hard surface flooring' : 'carpeted flooring');
        // Outdoor seating rule
        if(isOceanView){
          list.push('indoor seating plus designated outdoor seating');
        } else if(bldgKey === 'oceanside'){
          const label = isTwoRoom ? 'This suite' : 'This room';
          list.push(label + ' does not have an ocean view nor designated outdoor seating');
        }
      }

      return list;
    }

    // Parse query params
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get('id');
    const bldgKey = params.get('bldg') || 'oceanside';

    const bldg = BLDG[bldgKey];
    let room = null, level = null;
    if(bldg){
      for(const lvl of bldg.levels){
        const r = lvl.rooms.find(x => x.n === roomId);
        if(r){ room = r; level = lvl; break; }
      }
    }

    const main = document.getElementById('sc-room-main');
    const bcBldg = document.getElementById('sc-bc-bldg');
    const bcRoom = document.getElementById('sc-bc-room');

    if(!room){
      document.title = "Room not found — Sea Chambers";
      bcBldg.textContent = '—';
      bcRoom.textContent = 'Not found';
      main.innerHTML = `
        <div class="sc-rd-notfound">
          <h1>Room Not Found</h1>
          <p>We couldn't find the room you're looking for.</p>
          <a href="rooms.html" class="sc-rd-btn sc-rd-btn-primary" style="display:inline-block;max-width:280px;">← Back to All Rooms</a>
        </div>`;
    } else {
      document.title = `Room ${room.n} — Sea Chambers, Ogunquit Maine`;
      bcBldg.innerHTML = `<a href="rooms.html">${bldg.name}</a>`;
      bcRoom.textContent = `Room ${room.n}`;
      const photos = getPhotos(room);
      const amenities = getAmenities(room, bldgKey);
      // Tags row: View · Level · Connecting (from Column I) OR Special (if no connecting)
      const viewLabel = room.v || "Non-Ocean View";
      const isOceanView = viewLabel.toLowerCase().indexOf("non-ocean") === -1 && viewLabel !== "";
      const thirdTag = room.connecting || (room.special ? room.special.replace(/\.$/,'') : '');
      const tags = [
        `<span class="sc-rd-tag${isOceanView?' ocean':''}">${viewLabel}</span>`,
        `<span class="sc-rd-tag">${level.name}</span>`,
        thirdTag ? `<span class="sc-rd-tag">${thirdTag}</span>` : ''
      ].filter(Boolean).join('');

      main.innerHTML = `
        <section class="sc-room-page">
          <div class="sc-rd-gallery">
            <div class="sc-rd-hero">
              <img id="sc-rd-hero-img" src="${photos[0].src}" alt="${photos[0].caption}" data-idx="0">
              <div class="sc-rd-hero-counter">1 / ${photos.length}</div>
              <div class="sc-rd-hero-caption" id="sc-rd-hero-caption">${photos[0].caption}</div>
            </div>
            <div class="sc-rd-grid">
              ${photos.map((p, i) => `
                <div class="sc-rd-card${i===0?' active':''}" data-idx="${i}">
                  <div class="sc-rd-card-img"><img src="${p.src}" alt="${p.caption}" loading="lazy"></div>
                  <div class="sc-rd-card-caption">${p.caption}</div>
                </div>`).join('')}
            </div>
            <p class="sc-rd-photo-note">Please note: the photos above are representative of the room. Actual rooms may vary slightly from what is shown.</p>
          </div>

          <aside class="sc-rd-details">
            <div class="sc-rd-tags">${tags}</div>
            <p class="sc-rd-eyebrow">${bldg.name}</p>
            <h1 class="sc-rd-title">Room ${room.n}</h1>
            <p class="sc-rd-subtitle">${room.b}</p>

            <div class="sc-rd-meta">
              <div class="sc-rd-meta-item">
                <div class="sc-rd-meta-label">Building</div>
                <div class="sc-rd-meta-value">${bldg.name.replace('The ','')}</div>
              </div>
              <div class="sc-rd-meta-item">
                <div class="sc-rd-meta-label">Level</div>
                <div class="sc-rd-meta-value">${level.name}</div>
              </div>
              <div class="sc-rd-meta-item">
                <div class="sc-rd-meta-label">Bedding</div>
                <div class="sc-rd-meta-value">${room.b}</div>
              </div>
              <div class="sc-rd-meta-item">
                <div class="sc-rd-meta-label">View</div>
                <div class="sc-rd-meta-value">${room.v || 'Non-Ocean View'}</div>
              </div>
              <div class="sc-rd-meta-item">
                <div class="sc-rd-meta-label">Access</div>
                <div class="sc-rd-meta-value">${room.access || level.meta}</div>
              </div>
              ${room.sqft ? `<div class="sc-rd-meta-item"><div class="sc-rd-meta-label">Room Size</div><div class="sc-rd-meta-value">${room.sqft} square feet</div></div>` : ''}
            </div>

            <p class="sc-rd-amen-title">Room ${room.n}'s Amenities</p>
            <ul class="sc-rd-amen">
              ${amenities.map(a => `<li>${a}</li>`).join('')}
            </ul>

            <p class="sc-rd-included">All reservations include continental breakfast, one parking space, our firepits and ocean view seating areas, plus seasonal heated pool and hot tub.</p>

            <p class="sc-rd-availability"><a href="https://s006085.officialbookings.com/room/${room.n}">Click here to check Room ${room.n}'s availability for the entire season.</a></p>

            <div class="sc-rd-actions">
              <a href="https://s006085.officialbookings.com/room/${room.n}" class="sc-rd-btn sc-rd-btn-primary">Book Now</a>
              <a href="rooms.html" class="sc-rd-btn sc-rd-btn-secondary">All Rooms</a>
            </div>
          </aside>
        </section>

        <div class="sc-rd-lightbox" id="sc-rd-lightbox" role="dialog" aria-modal="true">
          <button class="sc-rd-lightbox-close" aria-label="Close" id="sc-rd-lb-close">×</button>
          <button class="sc-rd-lightbox-nav sc-rd-lightbox-prev" aria-label="Previous" id="sc-rd-lb-prev">‹</button>
          <img class="sc-rd-lightbox-img" id="sc-rd-lb-img" src="" alt="">
          <button class="sc-rd-lightbox-nav sc-rd-lightbox-next" aria-label="Next" id="sc-rd-lb-next">›</button>
          <div class="sc-rd-lightbox-caption" id="sc-rd-lb-caption">
            <span id="sc-rd-lb-text"></span>
            <span class="sc-rd-lightbox-counter" id="sc-rd-lb-counter"></span>
          </div>
        </div>`;

      // Hero <-> grid sync
      let currentIdx = 0;
      function setHero(idx){
        currentIdx = idx;
        const p = photos[idx];
        const heroImg = document.getElementById('sc-rd-hero-img');
        heroImg.src = p.src;
        heroImg.alt = p.caption;
        heroImg.dataset.idx = idx;
        document.getElementById('sc-rd-hero-caption').textContent = p.caption;
        document.querySelector('.sc-rd-hero-counter').textContent = `${idx+1} / ${photos.length}`;
        document.querySelectorAll('.sc-rd-card').forEach(c => c.classList.toggle('active', parseInt(c.dataset.idx) === idx));
      }
      document.querySelectorAll('.sc-rd-card').forEach(c => c.addEventListener('click', () => {
        const idx = parseInt(c.dataset.idx);
        setHero(idx);
        openLightbox(idx);
      }));
      document.getElementById('sc-rd-hero-img').addEventListener('click', () => openLightbox(currentIdx));

      // Lightbox
      const lb = document.getElementById('sc-rd-lightbox');
      const lbImg = document.getElementById('sc-rd-lb-img');
      const lbText = document.getElementById('sc-rd-lb-text');
      const lbCounter = document.getElementById('sc-rd-lb-counter');
      let lbIdx = 0;
      function openLightbox(idx){
        lbIdx = idx;
        showLightbox();
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
      function closeLightbox(){
        lb.classList.remove('open');
        document.body.style.overflow = '';
      }
      function showLightbox(){
        const p = photos[lbIdx];
        lbImg.src = p.src;
        lbImg.alt = p.caption;
        lbText.textContent = p.caption;
        lbCounter.textContent = `Photo ${lbIdx+1} of ${photos.length}`;
      }
      function navLightbox(dir){
        lbIdx = (lbIdx + dir + photos.length) % photos.length;
        showLightbox();
        setHero(lbIdx);
      }
      document.getElementById('sc-rd-lb-close').addEventListener('click', closeLightbox);
      document.getElementById('sc-rd-lb-prev').addEventListener('click', () => navLightbox(-1));
      document.getElementById('sc-rd-lb-next').addEventListener('click', () => navLightbox(1));
      lb.addEventListener('click', (e) => { if(e.target === lb) closeLightbox(); });
      document.addEventListener('keydown', (e) => {
        if(!lb.classList.contains('open')) return;
        if(e.key === 'Escape') closeLightbox();
        if(e.key === 'ArrowLeft') navLightbox(-1);
        if(e.key === 'ArrowRight') navLightbox(1);
      });
    }
  }

})();
