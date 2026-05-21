/**
 * BHYCR Rooms Page — Interactive Map & Panel Logic
 * ES6+ · Vanilla JS · IIFE
 */
(function () {
  'use strict';

  /* ── ROOM DATA ── */
  const ROOMS = {
    101:{num:101,building:'Christianne',floor:1,type:'Stateroom',beds:'1 King or 2 Queens',view:'Harbor / Courtyard',features:['Private patio or balcony','Refrigerator, microwave & coffee maker','Private bathroom','Harbor or courtyard views']},
    102:{num:102,building:'Christianne',floor:1,type:'Stateroom',beds:'1 King or 2 Queens',view:'Harbor / Courtyard',features:['Private patio or balcony','Refrigerator, microwave & coffee maker','Private bathroom']},
    103:{num:103,building:'Christianne',floor:1,type:'Stateroom',beds:'1 King',view:'Courtyard',features:['Patio','Refrigerator, microwave & coffee maker','Private bathroom','Courtyard view']},
    104:{num:104,building:'Christianne',floor:1,type:'Stateroom',beds:'1 King',view:'Courtyard',features:['Patio','Refrigerator, microwave & coffee maker','Private bathroom']},
    105:{num:105,building:'Christianne',floor:1,type:'Stateroom',beds:'2 Queens',view:'Courtyard',features:['Patio','Refrigerator, microwave & coffee maker','Private bathroom']},
    106:{num:106,building:'Christianne',floor:1,type:'Stateroom',beds:'1 King',view:'Harbor',features:['Harbor view','Balcony','Refrigerator, microwave & coffee maker']},
    107:{num:107,building:'Christianne',floor:1,type:'Stateroom',beds:'1 King',view:'Harbor',features:['Harbor view','Balcony','Refrigerator, microwave & coffee maker']},
    108:{num:108,building:'Christianne',floor:1,type:'Stateroom',beds:'2 Queens',view:'Harbor',features:['Harbor view','Balcony','Refrigerator, microwave & coffee maker']},
    109:{num:109,building:'Christianne',floor:1,type:'Stateroom',beds:'1 King',view:'Harbor',features:['Harbor view','Balcony','Refrigerator, microwave & coffee maker']},
    110:{num:110,building:'Christianne',floor:1,type:'Stateroom',beds:'1 King',view:'Harbor',features:['Harbor view','Balcony','Refrigerator, microwave & coffee maker']},
    111:{num:111,building:'Christianne',floor:1,type:'One Bedroom Suite',beds:'1 King',view:'Harbor',features:['Full kitchen','Gas fireplace','Private patio or balcony','Harbor view','Sleeper sofa in living area']},
    112:{num:112,building:'Christianne',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Harbor',features:['Full kitchen','Gas fireplace','Private patio or balcony','Harbor view','Separate living area']},
    114:{num:114,building:'Christianne',floor:2,type:'Stateroom',beds:'1 King',view:'Harbor',features:['2nd floor harbor view','Balcony','Refrigerator, microwave & coffee maker']},
    115:{num:115,building:'Christianne',floor:2,type:'Stateroom',beds:'2 Queens',view:'Harbor',features:['2nd floor harbor view','Balcony','Refrigerator, microwave & coffee maker']},
    116:{num:116,building:'Christianne',floor:2,type:'Stateroom',beds:'1 King',view:'Harbor',features:['2nd floor harbor view','Balcony','Refrigerator, microwave & coffee maker']},
    117:{num:117,building:'Christianne',floor:2,type:'Stateroom',beds:'1 King',view:'Harbor',features:['2nd floor harbor view','Balcony']},
    118:{num:118,building:'Christianne',floor:2,type:'Stateroom',beds:'2 Queens',view:'Harbor',features:['2nd floor harbor view','Balcony']},
    119:{num:119,building:'Christianne',floor:2,type:'Stateroom',beds:'1 King',view:'Harbor',features:['2nd floor harbor view','Balcony']},
    120:{num:120,building:'Christianne',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Harbor',features:['Full kitchen','Gas fireplace','Private balcony','2nd floor harbor view','Separate living area']},
    121:{num:121,building:'Christianne',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Harbor',features:['Full kitchen','Gas fireplace','Private balcony','2nd floor harbor view','Separate living area']},
    201:{num:201,building:'Main Lodge',floor:1,type:'Stateroom',beds:'1 King',view:'Courtyard / Pool',features:['Pool & courtyard view','Kitchenette available','Private bathroom','Patio']},
    202:{num:202,building:'Main Lodge',floor:1,type:'Stateroom',beds:'2 Queens',view:'Courtyard / Pool',features:['Pool & courtyard view','Kitchenette available','Private bathroom','Patio']},
    203:{num:203,building:'Main Lodge',floor:1,type:'Deluxe Stateroom',beds:'1 King',view:'Harbor',features:['Harbor view','Enhanced furnishings','Kitchenette','Patio or balcony','Private bathroom']},
    204:{num:204,building:'Main Lodge',floor:1,type:'Junior Suite',beds:'1 King + Sleeper Sofa',view:'Harbor',features:['Separate living room area','Kitchenette','Harbor & marina view','Private patio or balcony']},
    205:{num:205,building:'Main Lodge',floor:1,type:'Junior Suite',beds:'1 King + Sleeper Sofa',view:'Harbor',features:['Separate living room area','Kitchenette','Harbor & marina view','Private patio or balcony']},
    206:{num:206,building:'Main Lodge',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Harbor',features:['Full kitchen','Gas fireplace','Harbor view','Private patio or balcony','Separate living area']},
    207:{num:207,building:'Main Lodge',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Harbor',features:['Full kitchen','Gas fireplace','Harbor view','Private patio or balcony','Separate living area']},
    209:{num:209,building:'Main Lodge',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Courtyard',features:['Full kitchen','Gas fireplace','Courtyard view','Private patio','Separate living area']},
    210:{num:210,building:'Main Lodge',floor:1,type:'Junior Suite',beds:'1 King + Sleeper Sofa',view:'Courtyard',features:['Separate living room','Kitchenette','Courtyard view','Private patio']},
    211:{num:211,building:'Main Lodge',floor:1,type:'Junior Suite',beds:'1 King + Sleeper Sofa',view:'Harbor',features:['Separate living room','Kitchenette','Harbor view','Private balcony']},
    212:{num:212,building:'Main Lodge',floor:1,type:'Stateroom',beds:'1 King',view:'Courtyard',features:['Courtyard view','Kitchenette','Private bathroom']},
    214:{num:214,building:'Main Lodge',floor:1,type:'Stateroom',beds:'2 Queens',view:'Courtyard',features:['Courtyard view','Kitchenette','Private bathroom']},
    215:{num:215,building:'Main Lodge',floor:1,type:'Stateroom',beds:'1 King',view:'Harbor',features:['Harbor view','Kitchenette','Private bathroom']},
    216:{num:216,building:'Main Lodge',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Harbor',features:['2nd floor harbor view','Full kitchen','Gas fireplace','Private balcony','Separate living area']},
    217:{num:217,building:'Main Lodge',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Harbor',features:['2 private bedrooms','Full kitchen','Gas fireplace','2nd floor harbor view','Balcony or screened porch']},
    218:{num:218,building:'Main Lodge',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Harbor',features:['2 private bedrooms','Full kitchen','Gas fireplace','2nd floor harbor view','Balcony or screened porch']},
    219:{num:219,building:'Main Lodge',floor:2,type:'Junior Suite',beds:'1 King + Sleeper Sofa',view:'Harbor',features:['2nd floor harbor view','Kitchenette','Separate living area','Private balcony']},
    220:{num:220,building:'Main Lodge',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Courtyard',features:['Full kitchen','Gas fireplace','Courtyard view','Private balcony','Separate living area']},
    221:{num:221,building:'Main Lodge',floor:2,type:'Junior Suite',beds:'1 King + Sleeper Sofa',view:'Courtyard',features:['Courtyard view','Kitchenette','Separate living area','Private balcony']},
    222:{num:222,building:'Main Lodge',floor:2,type:'Stateroom',beds:'1 King',view:'Courtyard',features:['2nd floor courtyard view','Kitchenette','Private bathroom']},
    223:{num:223,building:'Main Lodge',floor:2,type:'Stateroom',beds:'2 Queens',view:'Courtyard',features:['2nd floor courtyard view','Kitchenette','Private bathroom']},
    301:{num:301,building:'Brighton',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Harbor / Woods',features:['Full kitchen','Gas fireplace','Harbor or woods view','Private patio','Separate living area']},
    302:{num:302,building:'Brighton',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Harbor / Woods',features:['Full kitchen','Gas fireplace','Harbor or woods view','Private patio','Separate living area']},
    303:{num:303,building:'Brighton',floor:1,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Harbor',features:['2 private bedrooms','Full kitchen','Gas fireplace','Harbor view','Patio or screened porch']},
    304:{num:304,building:'Brighton',floor:1,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Harbor',features:['2 private bedrooms','Full kitchen','Gas fireplace','Harbor view','Patio or screened porch']},
    305:{num:305,building:'Brighton',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Woods',features:['Full kitchen','Gas fireplace','Serene woods view','Private patio']},
    306:{num:306,building:'Brighton',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Woods',features:['Full kitchen','Gas fireplace','Serene woods view','Private patio']},
    307:{num:307,building:'Brighton',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Harbor',features:['2nd floor harbor view','2 bedrooms','Full kitchen','Gas fireplace','Private balcony']},
    308:{num:308,building:'Brighton',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Harbor',features:['2nd floor harbor view','2 bedrooms','Full kitchen','Gas fireplace','Private balcony']},
    309:{num:309,building:'Brighton',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Harbor',features:['2nd floor harbor view','Full kitchen','Gas fireplace','Private balcony']},
    310:{num:310,building:'Brighton',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Harbor',features:['2nd floor harbor view','Full kitchen','Gas fireplace','Private balcony']},
    311:{num:311,building:'Brighton',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Woods',features:['2nd floor woods view','2 bedrooms','Full kitchen','Gas fireplace','Private balcony']},
    312:{num:312,building:'Brighton',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Woods',features:['2nd floor woods view','2 bedrooms','Full kitchen','Gas fireplace','Private balcony']},
    314:{num:314,building:'Brighton',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Harbor',features:['2nd floor harbor view','Full kitchen','Gas fireplace','Balcony']},
    315:{num:315,building:'Brighton',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Harbor',features:['2nd floor harbor view','Full kitchen','Gas fireplace','Balcony']},
    316:{num:316,building:'Brighton',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Harbor',features:['2nd floor harbor view','2 bedrooms','Full kitchen','Gas fireplace','Balcony']},
    317:{num:317,building:'Brighton',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Harbor',features:['2nd floor harbor view','2 bedrooms','Full kitchen','Gas fireplace','Balcony']},
    318:{num:318,building:'Brighton',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Harbor / Woods',features:['2nd floor harbor or woods view','Full kitchen','Gas fireplace','Balcony']},
    401:{num:401,building:'Adriana',floor:1,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Harbor / Woods',features:['2 private bedrooms or 1 bedroom + loft','Full kitchen','Gas fireplace','Patio','Harbor or woods view']},
    402:{num:402,building:'Adriana',floor:1,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Harbor / Woods',features:['2 private bedrooms or 1 bedroom + loft','Full kitchen','Gas fireplace','Patio','Harbor or woods view']},
    403:{num:403,building:'Adriana',floor:1,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Woods',features:['2 bedrooms','Full kitchen','Gas fireplace','Serene woods view','Patio']},
    404:{num:404,building:'Adriana',floor:1,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Woods',features:['2 bedrooms','Full kitchen','Gas fireplace','Serene woods view','Patio']},
    405:{num:405,building:'Adriana',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Harbor / Woods',features:['2nd floor','2 bedrooms','Full kitchen','Gas fireplace','Private balcony','Harbor or woods view']},
    406:{num:406,building:'Adriana',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Harbor / Woods',features:['2nd floor','2 bedrooms','Full kitchen','Gas fireplace','Private balcony','Harbor or woods view']},
    407:{num:407,building:'Adriana',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Woods',features:['2nd floor','2 bedrooms','Full kitchen','Gas fireplace','Balcony','Serene woods view']},
    408:{num:408,building:'Adriana',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Woods',features:['2nd floor','2 bedrooms','Full kitchen','Gas fireplace','Balcony','Serene woods view']},
  };

  const TYPE_COLORS = {
    'Stateroom':        '#7BA7C2',
    'Deluxe Stateroom': '#4E86A8',
    'Junior Suite':     '#8AB5A0',
    'One Bedroom Suite':'#C8A84B',
    'Two Bedroom Suite':'#B07D3C',
  };

  const BUILDING_DESCS = {
    'Christianne': 'The Christianne Lodge hugs the harbor&rsquo;s edge, offering the closest proximity to the water. Most rooms face Lake Michigan directly, with private patios and balconies overlooking the harbor.',
    'Main Lodge':  'The heart of the resort — home to the Front Desk, lobby, and the most diverse mix of room types. The Main Lodge offers harbor views, courtyard views, and easy access to the indoor pool.',
    'Brighton':    'The Brighton Lodge sits slightly north on the property, offering a quieter setting with harbor and woodland views. All suites feature full kitchens, gas fireplaces, and generous living spaces.',
    'Adriana':     'The Adriana Lodge occupies the highest point of the property for exceptional views. All units are spacious two-bedroom suites — ideal for families and groups.',
  };

  const BUILDING_ROOMS = {
    'Christianne': 'Rooms 101–121',
    'Main Lodge':  'Rooms 201–223 · Front Desk',
    'Brighton':    'Rooms 301–318',
    'Adriana':     'Rooms 401–408',
  };

  /* ── DOM REFS ── */
  const buildingTabs   = document.querySelectorAll('.building-tab');
  const mapViews       = document.querySelectorAll('.map-view');
  const floorBtns      = document.querySelectorAll('.floor-btn');
  const legendBtns     = document.querySelectorAll('.legend-btn');
  const mapBuildings   = document.querySelectorAll('.map-building');
  const roomCells      = document.querySelectorAll('.room-cell');

  const panelDefault   = document.getElementById('panelDefault');
  const panelBuilding  = document.getElementById('panelBuilding');
  const panelDetail    = document.getElementById('panelDetail');
  const panelBuildingName  = document.getElementById('panelBuildingName');
  const panelBuildingRooms = document.getElementById('panelBuildingRooms');
  const panelBuildingDesc  = document.getElementById('panelBuildingDesc');
  const panelBuildingCounts= document.getElementById('panelBuildingCounts');
  const panelBadge     = document.getElementById('panelBadge');
  const panelRoomNum   = document.getElementById('panelRoomNum');
  const panelType      = document.getElementById('panelType');
  const panelSpecs     = document.getElementById('panelSpecs');

  let activeFilter = 'all';

  /* ── BUILDING TAB SWITCHING ── */
  function switchTab(targetBuilding) {
    buildingTabs.forEach((tab) => {
      const active = tab.dataset.building === targetBuilding;
      tab.classList.toggle('building-tab--active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    const tabId = {
      'all':        'map-all',
      'Christianne':'map-chrs',
      'Main Lodge': 'map-main',
      'Brighton':   'map-brig',
      'Adriana':    'map-adri',
    }[targetBuilding];

    mapViews.forEach((mv) => {
      mv.classList.toggle('map-view--active', mv.id === tabId);
    });

    if (targetBuilding !== 'all') {
      showBuildingPanel(targetBuilding);
    } else {
      showDefaultPanel();
    }
  }

  buildingTabs.forEach((tab) => {
    tab.addEventListener('click', () => switchTab(tab.dataset.building));
  });

  /* ── MAP BUILDING CLICKS (property overview) ── */
  mapBuildings.forEach((bldg) => {
    bldg.addEventListener('click', () => switchTab(bldg.dataset.building));
    bldg.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchTab(bldg.dataset.building); }
    });
  });

  /* ── FLOOR SWITCHING ── */
  floorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const floor    = btn.dataset.floor;
      const building = btn.dataset.building;

      // Update button states within this building's floor toggle
      btn.closest('.floor-toggle').querySelectorAll('.floor-btn').forEach((b) => {
        b.classList.toggle('floor-btn--active', b === btn);
      });

      // Show/hide floor groups
      const prefix = { 'Christianne':'chrs', 'Main Lodge':'main', 'Brighton':'brig', 'Adriana':'adri' }[building];
      const f1 = document.getElementById(`${prefix}-f1`);
      const f2 = document.getElementById(`${prefix}-f2`);
      if (f1) f1.style.display = floor === '1' ? '' : 'none';
      if (f2) f2.style.display = floor === '2' ? '' : 'none';

      applyFilter(activeFilter);
    });
  });

  /* ── ROOM CELL CLICKS ── */
  roomCells.forEach((cell) => {
    cell.addEventListener('click', () => showRoomPanel(parseInt(cell.dataset.room, 10)));
    cell.setAttribute('role', 'button');
    cell.setAttribute('tabindex', '0');
    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showRoomPanel(parseInt(cell.dataset.room, 10)); }
    });
  });

  /* ── LEGEND FILTER ── */
  legendBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      legendBtns.forEach((b) => b.classList.remove('legend-btn--active'));
      btn.classList.add('legend-btn--active');
      activeFilter = btn.dataset.filter;
      applyFilter(activeFilter);
    });
  });

  function applyFilter(filter) {
    roomCells.forEach((cell) => {
      const roomNum = parseInt(cell.dataset.room, 10);
      const room = ROOMS[roomNum];
      if (!room) return;
      if (filter === 'all') {
        cell.classList.remove('room-cell--dimmed');
      } else {
        cell.classList.toggle('room-cell--dimmed', room.type !== filter);
      }
    });
  }

  /* ── PANEL FUNCTIONS ── */
  function showDefaultPanel() {
    panelDefault.style.display  = '';
    panelBuilding.style.display = 'none';
    panelDetail.style.display   = 'none';
  }

  function showBuildingPanel(building) {
    panelDefault.style.display  = 'none';
    panelBuilding.style.display = '';
    panelDetail.style.display   = 'none';

    panelBuildingName.textContent  = building + ' Lodge';
    panelBuildingRooms.textContent = BUILDING_ROOMS[building] || '';
    panelBuildingDesc.innerHTML    = BUILDING_DESCS[building] || '';

    // Count room types
    const counts = {};
    Object.values(ROOMS).forEach((r) => {
      if (r.building === building) {
        counts[r.type] = (counts[r.type] || 0) + 1;
      }
    });

    panelBuildingCounts.innerHTML = Object.entries(counts).map(([type, count]) =>
      `<div class="room-panel__count-item">
        <span class="room-panel__count-swatch" style="background:${TYPE_COLORS[type] || '#888'}"></span>
        <span>${count} ${type}${count > 1 ? 's' : ''}</span>
      </div>`
    ).join('');
  }

  function showRoomPanel(roomNum) {
    const room = ROOMS[roomNum];
    if (!room) return;

    panelDefault.style.display  = 'none';
    panelBuilding.style.display = 'none';
    panelDetail.style.display   = '';

    // Highlight selected cell
    roomCells.forEach((cell) => {
      cell.classList.toggle('room-cell--active', parseInt(cell.dataset.room, 10) === roomNum);
    });

    const color = TYPE_COLORS[room.type] || '#888';

    panelBadge.textContent        = `${room.building} Lodge · Floor ${room.floor}`;
    panelRoomNum.textContent      = `Room ${room.num}`;
    panelType.textContent         = room.type;
    panelType.style.background    = color;

    panelSpecs.innerHTML = [
      `<li><strong>Beds:</strong>&nbsp; ${room.beds}</li>`,
      `<li><strong>View:</strong>&nbsp; ${room.view}</li>`,
      ...room.features.map((f) => `<li>${f}</li>`),
      `<li style="font-style:italic;opacity:0.7">All units are individually owned &amp; decorated &mdash; photos coming soon.</li>`,
    ].join('');

    // Scroll panel to top
    const panel = document.getElementById('roomPanel');
    if (panel) panel.scrollTop = 0;
  }

  /* ── INIT ── */
  showDefaultPanel();

}());
