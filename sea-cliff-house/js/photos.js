/* =====================================================================
   SEA CLIFF HOUSE - PHOTO SLOTS
   This is the ONLY place photos need to change.
   To swap a photo: replace the src URL (and update the alt text so it
   describes the new picture). Every <img data-photo="slot-name"> on the
   page picks up the new value when the page loads.
   Tip: open the page with ?slots at the end of the address to see each
   slot name printed on top of its photo.
   Recommended sizes: hero slots 2400px wide, room slots 1400px wide,
   everything else 1200px wide. JPG or WebP.
   ===================================================================== */
window.SEA_CLIFF_PHOTOS = {
  'logo': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/seaclifflogo.jpg',
    alt: "Sea Cliff House" },
  'hero-1': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/poolindexbanner.jpg',
    alt: "The heated pool, hot tub and dunes at Sea Cliff House with the ocean beyond" },
  'welcome-main': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/honeymoonpageheaderimage.jpg',
    alt: "View from an upper deck over the pool, cabanas and dunes to the ocean" },
  'welcome-inset': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/hottubandflowerslocationpage.jpg',
    alt: "The outdoor hot tub framed by flowers" },
  'panel-grill': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/homepagepanorama.jpg',
    alt: "Panorama of the pool, grounds and ocean at Sea Cliff House" },
  'room-grand': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/grandsuitelivingroom.jpeg',
    alt: "Grand Suite living room with ocean-facing windows" },
  'room-grand-alt': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/grandsuitedeck.jpg',
    alt: "Grand Suite private deck under the teal awning, overlooking the pool" },
  'room-penthouse': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/penthouselivingroom.jpg',
    alt: "Penthouse Suite living room with gas fireplace and balcony doors" },
  'room-penthouse-alt': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/penthousedeckbannerimage.jpg',
    alt: "Penthouse Suite balcony with table and chairs looking out to the ocean" },
  'room-honeymoon': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/honeymoonlivingroom.jpg',
    alt: "Honeymoon Suite living room with dining table and ocean view" },
  'room-honeymoon-alt': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/honeymoonview.jpg',
    alt: "View from the Honeymoon Suite over the pool and hot tub to the beach" },
  'room-whirlpool': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/room1jacuzzi.jpg',
    alt: "Whirlpool tub beside a window under the teal awning" },
  'room-whirlpool-alt': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/room4deckview.jpg',
    alt: "Private deck view from a whirlpool tub room toward the beach" },
  'room-oceanview': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/room5.jpg',
    alt: "Ocean view room with king bed and slider to the deck" },
  'room-oceanview-alt': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/oceanviewroomsheaderimage.jpg',
    alt: "Shared deck outside the ocean view rooms, overlooking the pool and ocean" },
  'room-kitchenette': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/room16accommodationsheader.jpg',
    alt: "Two-room kitchenette with dining table, kitchen area and bed" },
  'room-kitchenette-alt': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/34kitchenette.jpg',
    alt: "Kitchenette with microwave, refrigerator and stove top" },
  'beach-band': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/aerialfromoceanclose.jpg',
    alt: "Aerial view from the ocean of the beach in front of Sea Cliff House" },
  'beach-path': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/beachentranceupthepath.jpg',
    alt: "Sandy path through the dune grass to the beach" },
  'explore-attractions': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/attractionspagebannerimage.jpg',
    alt: "The Pier sign and fountain in downtown Old Orchard Beach" },
  'explore-specials': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/2ndfloordeck.jpg',
    alt: "Second-floor deck overlooking the pool and ocean" },
  'explore-webcam': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/slidesunrise.jpg',
    alt: "Sunrise over the ocean from the beach" },
  'explore-tour': { src: 'https://www.mainevisitorattractions.com/wp-content/uploads/poolfromabove.jpg',
    alt: "The pool, hot tub and dunes seen from above" },
};

/* =====================================================================
   GALLERY ("Around the property")
   cat must be one of: pool, suites, rooms, decks, beach
   Add, remove or reorder lines to change the gallery.
   ===================================================================== */
window.SEA_CLIFF_GALLERY = [
  { cat: 'pool', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/poolfromdeckcorner.jpg', alt: "The pool and lounge chairs with the ocean beyond" },
  { cat: 'suites', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/grandsuitebedroom.jpg', alt: "Grand Suite bedroom with fireplace" },
  { cat: 'decks', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/room7deck.jpeg', alt: "Deck with table and chairs overlooking the ocean" },
  { cat: 'rooms', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/room4.jpg', alt: "Whirlpool tub room with king bed" },
  { cat: 'beach', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/The_Beach_At_Sunrise.jpg', alt: "The beach at sunrise" },
  { cat: 'pool', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/hottubtowardpool.jpg', alt: "The hot tub looking toward the pool" },
  { cat: 'suites', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/grandsuitekitchen.jpg', alt: "Grand Suite kitchen" },
  { cat: 'decks', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/room9deckpoolview.jpg', alt: "Deck view down to the pool" },
  { cat: 'rooms', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/room9.jpg', alt: "Ocean view room with two beds" },
  { cat: 'beach', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/beachentrance-3.jpg', alt: "Beach access path onto the sand" },
  { cat: 'pool', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/poolpatioandgrills.jpg', alt: "Pool patio with umbrella tables and grills" },
  { cat: 'suites', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/grandsuitediningtable.jpg', alt: "Grand Suite dining table and brick hearth" },
  { cat: 'decks', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/room8and9deck.jpeg', alt: "Shared deck outside rooms 8 and 9" },
  { cat: 'rooms', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/room7.jpg', alt: "Ocean view room with slider to the deck" },
  { cat: 'beach', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/motelfrombeach.jpg', alt: "Sea Cliff House seen from the dunes" },
  { cat: 'pool', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/poolgrillpavilion.jpg', alt: "Grill pavilion beside the pool" },
  { cat: 'suites', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/grandsuitebunkroom.jpg', alt: "Grand Suite bunk room" },
  { cat: 'decks', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/honeymoondeck.jpg', alt: "Honeymoon Suite balcony" },
  { cat: 'rooms', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/room33bedroom.jpg', alt: "Bright guest room with king bed" },
  { cat: 'beach', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/beachtopier700.jpg', alt: "The beach looking toward the Pier" },
  { cat: 'pool', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/grillcanopytowardhouse.jpg', alt: "Grills under the teal canopy, looking toward the house" },
  { cat: 'suites', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/grandsuitefromhottub.jpg', alt: "The Grand Suite seen from the hot tub" },
  { cat: 'decks', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/penthousesidedeck.jpg', alt: "Penthouse Suite side deck" },
  { cat: 'rooms', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/19bedroom.jpg', alt: "Kitchenette unit bedroom" },
  { cat: 'beach', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/pier800.jpg', alt: "The entrance to the Pier" },
  { cat: 'pool', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/hottubroomsbuilding.jpg', alt: "Walkway beside the whirlpool rooms building" },
  { cat: 'suites', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/honeymoonbedroom.jpg', alt: "Honeymoon Suite bedroom" },
  { cat: 'decks', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/room6deckview.jpeg', alt: "Covered deck with a view of the dunes" },
  { cat: 'rooms', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/efficiencykitchen.jpg', alt: "Efficiency kitchen with microwave and refrigerator" },
  { cat: 'beach', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/Rides__Amusements.jpg', alt: "Amusement rides downtown" },
  { cat: 'pool', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/signandlighthouseforwebsite.jpg', alt: "The Sea Cliff House motel sign and lighthouse" },
  { cat: 'suites', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/honeymoonkitchen.jpg', alt: "Honeymoon Suite kitchen" },
  { cat: 'decks', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/uppersidedeck.jpg', alt: "Upper side deck with chairs" },
  { cat: 'beach', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/buildinglongview.jpg', alt: "The motel building and parking area" },
  { cat: 'suites', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/penthousebedroom.jpg', alt: "Penthouse Suite bedroom" },
  { cat: 'suites', src: 'https://www.mainevisitorattractions.com/wp-content/uploads/penthousekitchen.jpg', alt: "Penthouse Suite kitchen" },
];

/* =====================================================================
   HERO DRONE VIDEO
   desktop: shown on screens 768px and wider
   mobile:  shown on phones. Leave it as '' to show the still photo
            (slot 'hero-1' above) on phones instead of the video.
   The video always plays muted and loops. Visitors who ask their device
   for reduced motion, or who have data saver on, see the still photo.
   Best practice: use a compressed, sound-free copy (under about 8 MB)
   rather than the original 91 MB file.
   ===================================================================== */

window.SEA_CLIFF_VIDEOS = {
  'hero-video': {
    desktop: 'https://www.seacliffhouse.com/dronevideoseacliffmotel.mp4',
    mobile: '',
    label: 'Aerial drone video of Sea Cliff House and Old Orchard Beach'
  }
};
