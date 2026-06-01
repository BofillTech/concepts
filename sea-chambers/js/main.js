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
    const BLDG = {
      oceanside: {
        name: "The Oceanside Building",
        desc: "Our largest building — most rooms face the Atlantic with unobstructed ocean views.",
        diagram: "img/diagrams/diagram-oceanside.jpg",
        photo: "img/buildings/oceanside-exterior.jpg",
        levels: [
          { name: "Upper Level", meta: "One staircase up from Ground Level", rooms: [
            {n:"22", b:"Q/Q + Trundle", note:"Two-room suite", v:false, sqft:""},
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
          { name: "Ground Level", meta: "No stairs", rooms: [
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
          { name: "Terrace Level", meta: "Down a ramp from the parking lot", rooms: [
            {n:"33A", b:"Two Queens", note:"Adjoining option with 33B", v:true},
            {n:"33B", b:"Two Queens", note:"Adjoining option with 33A", v:true},
            {n:"34", b:"Queen + Double", v:true},
            {n:"35", b:"Two Queens", v:true, sqft:"~377 sq ft", special:"Extra large"},
            {n:"36", b:"King", v:true},
            {n:"37", b:"King", v:true, special:"Bold ocean view"},
            {n:"38", b:"Queen + Double", v:true},
            {n:"39", b:"Queen + Double", v:true}
          ]},
          { name: "Sea Level", meta: "Down a ramp and a staircase — closest to the water", rooms: [
            {n:"40A", b:"King/Twin + Queen Sofa", note:"Two-room suite", v:true},
            {n:"40B", b:"King", v:true},
            {n:"41", b:"King", v:true},
            {n:"42", b:"King", v:true, special:"Bold ocean view, closest to water"}
          ]},
          { name: "Annex Wing", meta: "Side rooms with sofa beds — various levels", rooms: [
            {n:"1", b:"Q/D + Queen Sofa", v:false},
            {n:"2", b:"Q/D + Queen Sofa", v:false},
            {n:"3", b:"Q/D + Queen Sofa", v:false},
            {n:"19", b:"Q/D + Queen Sofa", v:false},
            {n:"20", b:"Q/D + Queen Sofa", v:false},
            {n:"21", b:"Q/D + Queen Sofa", v:false}
          ]}
        ]
      },
      poolside: {
        name: "The Poolside Building",
        desc: "Home to the Front Desk — steps from the pool, hot tub, and fire pits.",
        diagram: "img/diagrams/diagram-poolside.png",
        photo: "img/buildings/poolside-exterior.jpg",
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
        photo: "img/buildings/inn-exterior.jpg",
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
      if(!room.v) return {interior: set.interior, view: PHOTOS.standardview.view};
      return set;
    }

    function renderBuilding(key){
      const b = BLDG[key];
      document.getElementById('sc-rmap-diagram-img').src = b.diagram;
      document.getElementById('sc-rmap-diagram-img').alt = b.name + ' floor diagram';
      document.getElementById('sc-rmap-banner-img').src = b.photo;
      document.getElementById('sc-rmap-banner-img').alt = b.name + ' exterior';
      document.getElementById('sc-rmap-bldg-name').textContent = b.name;
      document.getElementById('sc-rmap-bldg-desc').textContent = b.desc;

      const wrap = document.getElementById('sc-rmap-chips-container');
      wrap.innerHTML = '';
      b.levels.forEach(lvl => {
        const lvlDiv = document.createElement('div');
        lvlDiv.className = 'sc-rmap-chips-level';
        const chips = lvl.rooms.map(r => {
          const cls = 'sc-rmap-chip' + (r.v ? ' ocean' : '');
          return `<button class="${cls}" data-bldg="${key}" data-room="${r.n}">${r.n}</button>`;
        }).join('');
        lvlDiv.innerHTML = `<div class="sc-rmap-chips-level-name">${lvl.name}</div><div class="sc-rmap-chips">${chips}</div>`;
        wrap.appendChild(lvlDiv);
      });

      // Reset panel
      document.getElementById('sc-rmap-panel').innerHTML = `
        <div class="sc-rmap-empty">
          <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 11.25v1.5M15 11.25v1.5M9.75 17.25h4.5M3.75 21h16.5M4.5 3.75v17.25M19.5 3.75v17.25M3 8.25h18M3 13.5h18"/></svg>
          <p>Select a room number from the list on the left to see photos and details.</p>
        </div>`;

      // Bind chip clicks
      wrap.querySelectorAll('.sc-rmap-chip').forEach(c => c.addEventListener('click', e => {
        const num = c.dataset.room;
        const room = b.levels.flatMap(l => l.rooms.map(r => ({...r, _level:l.name}))).find(r => r.n === num);
        showRoom(b, key, room, c);
        // On mobile (stacked layout), jump down to the room details panel
        if(window.matchMedia('(max-width: 900px)').matches){
          setTimeout(() => {
            document.getElementById('sc-rmap-panel').scrollIntoView({behavior:'smooth', block:'start'});
          }, 30);
        }
      }));
    }

    function showRoom(bldg, bldgKey, room, chipEl){
      document.querySelectorAll('.sc-rmap-chip.active').forEach(c => c.classList.remove('active'));
      if(chipEl) chipEl.classList.add('active');

      const photos = getPhotos(room);
      const tags = [];
      if(room.v) tags.push(`<span class="sc-rmap-detail-tag ocean">Ocean View</span>`);
      else tags.push(`<span class="sc-rmap-detail-tag">Standard View</span>`);
      tags.push(`<span class="sc-rmap-detail-tag">${room._level}</span>`);
      if(room.note) tags.push(`<span class="sc-rmap-detail-tag">${room.note}</span>`);

      const desc = [
        room.special ? `<strong>${room.special}.</strong>` : '',
        `Located in the ${bldg.name.replace('The ','')}, this room features <strong>${room.b}</strong>${room.sqft ? ' and ' + room.sqft : ''}. Continental breakfast, in-room mini-fridge & microwave, flat-screen TV, and full use of the heated oceanfront pool, hot tub, and fire pits are included.`
      ].filter(Boolean).join(' ');

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
    const BLDG = {
      oceanside: {
        name: "The Oceanside Building",
        levels: [
          { name: "Upper Level", meta: "One staircase up from Ground Level", rooms: [
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
          { name: "Ground Level", meta: "No stairs", rooms: [
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
          { name: "Terrace Level", meta: "Down a ramp from the parking lot", rooms: [
            {n:"33A", b:"Two Queens", note:"Adjoining option with 33B", v:true},
            {n:"33B", b:"Two Queens", note:"Adjoining option with 33A", v:true},
            {n:"34", b:"Queen + Double", v:true},
            {n:"35", b:"Two Queens", v:true, sqft:"~377 sq ft", special:"Extra large"},
            {n:"36", b:"King", v:true},
            {n:"37", b:"King", v:true, special:"Bold ocean view"},
            {n:"38", b:"Queen + Double", v:true},
            {n:"39", b:"Queen + Double", v:true}
          ]},
          { name: "Sea Level", meta: "Down a ramp and a staircase — closest to the water", rooms: [
            {n:"40A", b:"King/Twin + Queen Sofa", note:"Two-room suite", v:true},
            {n:"40B", b:"King", v:true},
            {n:"41", b:"King", v:true},
            {n:"42", b:"King", v:true, special:"Bold ocean view, closest to water"}
          ]},
          { name: "Annex Wing", meta: "Side rooms with sofa beds", rooms: [
            {n:"1", b:"Q/D + Queen Sofa", v:false},
            {n:"2", b:"Q/D + Queen Sofa", v:false},
            {n:"3", b:"Q/D + Queen Sofa", v:false},
            {n:"19", b:"Q/D + Queen Sofa", v:false},
            {n:"20", b:"Q/D + Queen Sofa", v:false},
            {n:"21", b:"Q/D + Queen Sofa", v:false}
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

    const BASE_AMENITIES = [
      "Continental breakfast included",
      "Heated oceanfront pool",
      "Hot tub & ocean-view fire pits",
      "Free WiFi throughout property",
      "Mini-fridge & microwave",
      "Flat-screen cable TV",
      "Coffee maker & in-room amenities",
      "Free on-site parking",
      "Iron & ironing board on request",
      "Daily housekeeping",
      "24-hour front desk",
      "Direct beach access"
    ];

    function getAmenities(room){
      const list = [...BASE_AMENITIES];
      if(room.v) list.unshift("Ocean view");
      if((room.note||"").toLowerCase().includes("balcony") || (room.special||"").toLowerCase().includes("balcony")) list.unshift("Private balcony");
      if((room.note||"").toLowerCase().includes("patio") || (room.special||"").toLowerCase().includes("patio")) list.unshift("Private patio");
      if((room.note||"").toLowerCase().includes("two-room") || (room.note||"").toLowerCase().includes("2rms")) list.unshift("Two-room layout");
      if((room.b||"").toLowerCase().includes("sofa bed")) list.push("Sleeper sofa");
      if((room.note||"").toLowerCase().includes("kitchen") || (room.special||"").toLowerCase().includes("kitchen")) list.push("Full kitchen");
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
      const amenities = getAmenities(room);
      const tags = [
        room.v ? '<span class="sc-rd-tag ocean">Ocean View</span>' : '<span class="sc-rd-tag">Standard View</span>',
        `<span class="sc-rd-tag">${level.name}</span>`,
        room.note ? `<span class="sc-rd-tag">${room.note}</span>` : ''
      ].filter(Boolean).join('');

      const desc = room.special
        ? `<strong>${room.special}.</strong> Located in the ${bldg.name.replace('The ','')}, this room features <strong>${room.b}</strong>${room.sqft ? ' and is ' + room.sqft : ''}. All Sea Chambers stays include a continental breakfast, full use of our heated oceanfront pool, hot tub, and fire pits, plus direct beach access from the property.`
        : `Located in the ${bldg.name.replace('The ','')}, this room features <strong>${room.b}</strong>${room.sqft ? ' and is ' + room.sqft : ''}. All Sea Chambers stays include a continental breakfast, full use of our heated oceanfront pool, hot tub, and fire pits, plus direct beach access from the property.`;

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
                <div class="sc-rd-meta-value">${room.v ? 'Ocean View' : 'Standard'}</div>
              </div>
              ${room.sqft ? `<div class="sc-rd-meta-item"><div class="sc-rd-meta-label">Size</div><div class="sc-rd-meta-value">${room.sqft}</div></div>` : ''}
              <div class="sc-rd-meta-item">
                <div class="sc-rd-meta-label">Access</div>
                <div class="sc-rd-meta-value">${level.meta}</div>
              </div>
            </div>

            <p class="sc-rd-description">${desc}</p>

            <p class="sc-rd-amen-title">Room Amenities</p>
            <ul class="sc-rd-amen">
              ${amenities.map(a => `<li>${a}</li>`).join('')}
            </ul>

            <div class="sc-rd-actions">
              <a href="https://reservations.seachambers.com" class="sc-rd-btn sc-rd-btn-primary">Book Now</a>
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
