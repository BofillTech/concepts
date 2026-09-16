/* Village by the Sea — unit data, picker, and unit-detail renderer.
   Generated from the client's Unit Photos folder: 303 real photographs across
   50 units in 11 buildings. Per unit: b = building, l = letter, p = photo files
   (interior first, exterior last), v = count of trailing "view from the deck"
   shots (auto-detected), n = total photos.
   NOTE: bedrooms / tier / floor are deliberately absent — awaiting the
   property's unit roster. Do not invent them. */
(function () {
  'use strict';

  var UNITS = {"1B":{"b":1,"l":"B","p":["suite-village-by-the-sea-wells-maine-unit-1b-01.jpg","suite-village-by-the-sea-wells-maine-unit-1b-02.jpg","suite-village-by-the-sea-wells-maine-unit-1b-03.jpg","suite-village-by-the-sea-wells-maine-unit-1b-04.jpg","suite-village-by-the-sea-wells-maine-unit-1b-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-1b-01.jpg"],"v":1,"n":6},"1E":{"b":1,"l":"E","p":["suite-village-by-the-sea-wells-maine-unit-1e-01.jpg","suite-village-by-the-sea-wells-maine-unit-1e-02.jpg","suite-village-by-the-sea-wells-maine-unit-1e-03.jpg","suite-village-by-the-sea-wells-maine-unit-1e-04.jpg","suite-village-by-the-sea-wells-maine-unit-1e-05.jpg","suite-village-by-the-sea-wells-maine-unit-1e-06.jpg","suite-village-by-the-sea-wells-maine-unit-1e-07.jpg","marsh-view-village-by-the-sea-wells-maine-unit-1e-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-1e-02.jpg"],"v":2,"n":9},"2A":{"b":2,"l":"A","p":["suite-village-by-the-sea-wells-maine-unit-2a-01.jpg","suite-village-by-the-sea-wells-maine-unit-2a-02.jpg","suite-village-by-the-sea-wells-maine-unit-2a-03.jpg","suite-village-by-the-sea-wells-maine-unit-2a-04.jpg","suite-village-by-the-sea-wells-maine-unit-2a-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-2a-01.jpg"],"v":1,"n":6},"2B":{"b":2,"l":"B","p":["suite-village-by-the-sea-wells-maine-unit-2b-01.jpg","suite-village-by-the-sea-wells-maine-unit-2b-02.jpg","suite-village-by-the-sea-wells-maine-unit-2b-03.jpg","suite-village-by-the-sea-wells-maine-unit-2b-04.jpg","suite-village-by-the-sea-wells-maine-unit-2b-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-2b-01.jpg"],"v":1,"n":6},"2C":{"b":2,"l":"C","p":["suite-village-by-the-sea-wells-maine-unit-2c-01.jpg","suite-village-by-the-sea-wells-maine-unit-2c-02.jpg","suite-village-by-the-sea-wells-maine-unit-2c-03.jpg","suite-village-by-the-sea-wells-maine-unit-2c-04.jpg","suite-village-by-the-sea-wells-maine-unit-2c-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-2c-01.jpg"],"v":1,"n":6},"2D":{"b":2,"l":"D","p":["suite-village-by-the-sea-wells-maine-unit-2d-01.jpg","suite-village-by-the-sea-wells-maine-unit-2d-02.jpg","suite-village-by-the-sea-wells-maine-unit-2d-03.jpg","suite-village-by-the-sea-wells-maine-unit-2d-04.jpg","suite-village-by-the-sea-wells-maine-unit-2d-05.jpg","suite-village-by-the-sea-wells-maine-unit-2d-06.jpg","marsh-view-village-by-the-sea-wells-maine-unit-2d-01.jpg"],"v":1,"n":7},"2E":{"b":2,"l":"E","p":["suite-village-by-the-sea-wells-maine-unit-2e-01.jpg","suite-village-by-the-sea-wells-maine-unit-2e-02.jpg","suite-village-by-the-sea-wells-maine-unit-2e-03.jpg","suite-village-by-the-sea-wells-maine-unit-2e-04.jpg","suite-village-by-the-sea-wells-maine-unit-2e-05.jpg"],"v":0,"n":5},"2F":{"b":2,"l":"F","p":["suite-village-by-the-sea-wells-maine-unit-2f-01.jpg","suite-village-by-the-sea-wells-maine-unit-2f-02.jpg","suite-village-by-the-sea-wells-maine-unit-2f-03.jpg","suite-village-by-the-sea-wells-maine-unit-2f-04.jpg","suite-village-by-the-sea-wells-maine-unit-2f-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-2f-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-2f-02.jpg"],"v":2,"n":7},"3B":{"b":3,"l":"B","p":["suite-village-by-the-sea-wells-maine-unit-3b-01.jpg","suite-village-by-the-sea-wells-maine-unit-3b-02.jpg","suite-village-by-the-sea-wells-maine-unit-3b-03.jpg","suite-village-by-the-sea-wells-maine-unit-3b-04.jpg","suite-village-by-the-sea-wells-maine-unit-3b-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-3b-01.jpg"],"v":1,"n":6},"3C":{"b":3,"l":"C","p":["suite-village-by-the-sea-wells-maine-unit-3c-01.jpg","suite-village-by-the-sea-wells-maine-unit-3c-02.jpg","suite-village-by-the-sea-wells-maine-unit-3c-03.jpg","suite-village-by-the-sea-wells-maine-unit-3c-04.jpg","suite-village-by-the-sea-wells-maine-unit-3c-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-3c-01.jpg"],"v":1,"n":6},"3D":{"b":3,"l":"D","p":["suite-village-by-the-sea-wells-maine-unit-3d-01.jpg","suite-village-by-the-sea-wells-maine-unit-3d-02.jpg","suite-village-by-the-sea-wells-maine-unit-3d-03.jpg","suite-village-by-the-sea-wells-maine-unit-3d-04.jpg","suite-village-by-the-sea-wells-maine-unit-3d-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-3d-01.jpg"],"v":1,"n":6},"3E":{"b":3,"l":"E","p":["suite-village-by-the-sea-wells-maine-unit-3e-01.jpg","suite-village-by-the-sea-wells-maine-unit-3e-02.jpg","suite-village-by-the-sea-wells-maine-unit-3e-03.jpg","suite-village-by-the-sea-wells-maine-unit-3e-04.jpg","suite-village-by-the-sea-wells-maine-unit-3e-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-3e-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-3e-02.jpg"],"v":2,"n":7},"4B":{"b":4,"l":"B","p":["suite-village-by-the-sea-wells-maine-unit-4b-01.jpg","suite-village-by-the-sea-wells-maine-unit-4b-02.jpg","suite-village-by-the-sea-wells-maine-unit-4b-03.jpg","suite-village-by-the-sea-wells-maine-unit-4b-04.jpg","suite-village-by-the-sea-wells-maine-unit-4b-05.jpg"],"v":0,"n":5},"4C":{"b":4,"l":"C","p":["suite-village-by-the-sea-wells-maine-unit-4c-01.jpg","suite-village-by-the-sea-wells-maine-unit-4c-02.jpg","suite-village-by-the-sea-wells-maine-unit-4c-03.jpg","suite-village-by-the-sea-wells-maine-unit-4c-04.jpg","suite-village-by-the-sea-wells-maine-unit-4c-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-4c-01.jpg"],"v":1,"n":6},"4D":{"b":4,"l":"D","p":["suite-village-by-the-sea-wells-maine-unit-4d-01.jpg","suite-village-by-the-sea-wells-maine-unit-4d-02.jpg","suite-village-by-the-sea-wells-maine-unit-4d-03.jpg","suite-village-by-the-sea-wells-maine-unit-4d-04.jpg","suite-village-by-the-sea-wells-maine-unit-4d-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-4d-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-4d-02.jpg"],"v":2,"n":7},"4E":{"b":4,"l":"E","p":["suite-village-by-the-sea-wells-maine-unit-4e-01.jpg","suite-village-by-the-sea-wells-maine-unit-4e-02.jpg","suite-village-by-the-sea-wells-maine-unit-4e-03.jpg","suite-village-by-the-sea-wells-maine-unit-4e-04.jpg","suite-village-by-the-sea-wells-maine-unit-4e-05.jpg","suite-village-by-the-sea-wells-maine-unit-4e-06.jpg"],"v":0,"n":6},"5A":{"b":5,"l":"A","p":["suite-village-by-the-sea-wells-maine-unit-5a-01.jpg","suite-village-by-the-sea-wells-maine-unit-5a-02.jpg","suite-village-by-the-sea-wells-maine-unit-5a-03.jpg","suite-village-by-the-sea-wells-maine-unit-5a-04.jpg","suite-village-by-the-sea-wells-maine-unit-5a-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-5a-01.jpg"],"v":1,"n":6},"5B":{"b":5,"l":"B","p":["suite-village-by-the-sea-wells-maine-unit-5b-01.jpg","suite-village-by-the-sea-wells-maine-unit-5b-02.jpg","suite-village-by-the-sea-wells-maine-unit-5b-03.jpg","suite-village-by-the-sea-wells-maine-unit-5b-04.jpg","suite-village-by-the-sea-wells-maine-unit-5b-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-5b-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-5b-02.jpg"],"v":2,"n":7},"5C":{"b":5,"l":"C","p":["suite-village-by-the-sea-wells-maine-unit-5c-01.jpg","suite-village-by-the-sea-wells-maine-unit-5c-02.jpg","suite-village-by-the-sea-wells-maine-unit-5c-03.jpg","suite-village-by-the-sea-wells-maine-unit-5c-04.jpg","suite-village-by-the-sea-wells-maine-unit-5c-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-5c-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-5c-02.jpg"],"v":2,"n":7},"5D":{"b":5,"l":"D","p":["suite-village-by-the-sea-wells-maine-unit-5d-01.jpg","suite-village-by-the-sea-wells-maine-unit-5d-02.jpg","suite-village-by-the-sea-wells-maine-unit-5d-03.jpg","suite-village-by-the-sea-wells-maine-unit-5d-04.jpg","suite-village-by-the-sea-wells-maine-unit-5d-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-5d-01.jpg"],"v":1,"n":6},"5E":{"b":5,"l":"E","p":["suite-village-by-the-sea-wells-maine-unit-5e-01.jpg","suite-village-by-the-sea-wells-maine-unit-5e-02.jpg","suite-village-by-the-sea-wells-maine-unit-5e-03.jpg","suite-village-by-the-sea-wells-maine-unit-5e-04.jpg","marsh-view-village-by-the-sea-wells-maine-unit-5e-01.jpg"],"v":1,"n":5},"5F":{"b":5,"l":"F","p":["suite-village-by-the-sea-wells-maine-unit-5f-01.jpg","suite-village-by-the-sea-wells-maine-unit-5f-02.jpg","suite-village-by-the-sea-wells-maine-unit-5f-03.jpg","suite-village-by-the-sea-wells-maine-unit-5f-04.jpg","suite-village-by-the-sea-wells-maine-unit-5f-05.jpg","suite-village-by-the-sea-wells-maine-unit-5f-06.jpg"],"v":0,"n":6},"6A":{"b":6,"l":"A","p":["suite-village-by-the-sea-wells-maine-unit-6a-01.jpg","suite-village-by-the-sea-wells-maine-unit-6a-02.jpg","suite-village-by-the-sea-wells-maine-unit-6a-03.jpg","suite-village-by-the-sea-wells-maine-unit-6a-04.jpg","suite-village-by-the-sea-wells-maine-unit-6a-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-6a-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-6a-02.jpg"],"v":2,"n":7},"6C":{"b":6,"l":"C","p":["suite-village-by-the-sea-wells-maine-unit-6c-01.jpg","suite-village-by-the-sea-wells-maine-unit-6c-02.jpg","suite-village-by-the-sea-wells-maine-unit-6c-03.jpg","suite-village-by-the-sea-wells-maine-unit-6c-04.jpg","suite-village-by-the-sea-wells-maine-unit-6c-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-6c-01.jpg"],"v":1,"n":6},"6F":{"b":6,"l":"F","p":["suite-village-by-the-sea-wells-maine-unit-6f-01.jpg","suite-village-by-the-sea-wells-maine-unit-6f-02.jpg","suite-village-by-the-sea-wells-maine-unit-6f-03.jpg","suite-village-by-the-sea-wells-maine-unit-6f-04.jpg","suite-village-by-the-sea-wells-maine-unit-6f-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-6f-01.jpg"],"v":1,"n":6},"7C":{"b":7,"l":"C","p":["suite-village-by-the-sea-wells-maine-unit-7c-01.jpg","suite-village-by-the-sea-wells-maine-unit-7c-02.jpg","suite-village-by-the-sea-wells-maine-unit-7c-03.jpg","suite-village-by-the-sea-wells-maine-unit-7c-04.jpg","suite-village-by-the-sea-wells-maine-unit-7c-05.jpg","suite-village-by-the-sea-wells-maine-unit-7c-06.jpg","suite-village-by-the-sea-wells-maine-unit-7c-07.jpg"],"v":0,"n":7},"7E":{"b":7,"l":"E","p":["suite-village-by-the-sea-wells-maine-unit-7e-01.jpg","suite-village-by-the-sea-wells-maine-unit-7e-02.jpg"],"v":0,"n":2},"7F":{"b":7,"l":"F","p":["suite-village-by-the-sea-wells-maine-unit-7f-01.jpg","suite-village-by-the-sea-wells-maine-unit-7f-02.jpg","suite-village-by-the-sea-wells-maine-unit-7f-03.jpg","suite-village-by-the-sea-wells-maine-unit-7f-04.jpg","suite-village-by-the-sea-wells-maine-unit-7f-05.jpg","suite-village-by-the-sea-wells-maine-unit-7f-06.jpg","marsh-view-village-by-the-sea-wells-maine-unit-7f-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-7f-02.jpg"],"v":2,"n":8},"8A":{"b":8,"l":"A","p":["suite-village-by-the-sea-wells-maine-unit-8a-01.jpg","suite-village-by-the-sea-wells-maine-unit-8a-02.jpg","suite-village-by-the-sea-wells-maine-unit-8a-03.jpg","marsh-view-village-by-the-sea-wells-maine-unit-8a-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-8a-02.jpg"],"v":2,"n":5},"8B":{"b":8,"l":"B","p":["suite-village-by-the-sea-wells-maine-unit-8b-01.jpg","suite-village-by-the-sea-wells-maine-unit-8b-02.jpg","suite-village-by-the-sea-wells-maine-unit-8b-03.jpg","marsh-view-village-by-the-sea-wells-maine-unit-8b-01.jpg"],"v":1,"n":4},"8C":{"b":8,"l":"C","p":["suite-village-by-the-sea-wells-maine-unit-8c-01.jpg","suite-village-by-the-sea-wells-maine-unit-8c-02.jpg","suite-village-by-the-sea-wells-maine-unit-8c-03.jpg","suite-village-by-the-sea-wells-maine-unit-8c-04.jpg","suite-village-by-the-sea-wells-maine-unit-8c-05.jpg"],"v":0,"n":5},"8D":{"b":8,"l":"D","p":["suite-village-by-the-sea-wells-maine-unit-8d-01.jpg","suite-village-by-the-sea-wells-maine-unit-8d-02.jpg","suite-village-by-the-sea-wells-maine-unit-8d-03.jpg","suite-village-by-the-sea-wells-maine-unit-8d-04.jpg","suite-village-by-the-sea-wells-maine-unit-8d-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-8d-01.jpg"],"v":1,"n":6},"8E":{"b":8,"l":"E","p":["suite-village-by-the-sea-wells-maine-unit-8e-01.jpg","suite-village-by-the-sea-wells-maine-unit-8e-02.jpg","suite-village-by-the-sea-wells-maine-unit-8e-03.jpg","suite-village-by-the-sea-wells-maine-unit-8e-04.jpg","marsh-view-village-by-the-sea-wells-maine-unit-8e-01.jpg"],"v":1,"n":5},"8F":{"b":8,"l":"F","p":["suite-village-by-the-sea-wells-maine-unit-8f-01.jpg","suite-village-by-the-sea-wells-maine-unit-8f-02.jpg","suite-village-by-the-sea-wells-maine-unit-8f-03.jpg","suite-village-by-the-sea-wells-maine-unit-8f-04.jpg","suite-village-by-the-sea-wells-maine-unit-8f-05.jpg"],"v":0,"n":5},"8H":{"b":8,"l":"H","p":["suite-village-by-the-sea-wells-maine-unit-8h-01.jpg","suite-village-by-the-sea-wells-maine-unit-8h-02.jpg","suite-village-by-the-sea-wells-maine-unit-8h-03.jpg","suite-village-by-the-sea-wells-maine-unit-8h-04.jpg","suite-village-by-the-sea-wells-maine-unit-8h-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-8h-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-8h-02.jpg"],"v":2,"n":7},"9A":{"b":9,"l":"A","p":["suite-village-by-the-sea-wells-maine-unit-9a-01.jpg","suite-village-by-the-sea-wells-maine-unit-9a-02.jpg","suite-village-by-the-sea-wells-maine-unit-9a-03.jpg","marsh-view-village-by-the-sea-wells-maine-unit-9a-01.jpg"],"v":1,"n":4},"9E":{"b":9,"l":"E","p":["suite-village-by-the-sea-wells-maine-unit-9e-01.jpg","suite-village-by-the-sea-wells-maine-unit-9e-02.jpg","suite-village-by-the-sea-wells-maine-unit-9e-03.jpg","suite-village-by-the-sea-wells-maine-unit-9e-04.jpg","suite-village-by-the-sea-wells-maine-unit-9e-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-9e-01.jpg"],"v":1,"n":6},"9F":{"b":9,"l":"F","p":["suite-village-by-the-sea-wells-maine-unit-9f-01.jpg","suite-village-by-the-sea-wells-maine-unit-9f-02.jpg","suite-village-by-the-sea-wells-maine-unit-9f-03.jpg","suite-village-by-the-sea-wells-maine-unit-9f-04.jpg","suite-village-by-the-sea-wells-maine-unit-9f-05.jpg"],"v":0,"n":5},"9G":{"b":9,"l":"G","p":["suite-village-by-the-sea-wells-maine-unit-9g-01.jpg","suite-village-by-the-sea-wells-maine-unit-9g-02.jpg","suite-village-by-the-sea-wells-maine-unit-9g-03.jpg","suite-village-by-the-sea-wells-maine-unit-9g-04.jpg","suite-village-by-the-sea-wells-maine-unit-9g-05.jpg","suite-village-by-the-sea-wells-maine-unit-9g-06.jpg","marsh-view-village-by-the-sea-wells-maine-unit-9g-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-9g-02.jpg"],"v":2,"n":8},"9H":{"b":9,"l":"H","p":["suite-village-by-the-sea-wells-maine-unit-9h-01.jpg","suite-village-by-the-sea-wells-maine-unit-9h-02.jpg","suite-village-by-the-sea-wells-maine-unit-9h-03.jpg","suite-village-by-the-sea-wells-maine-unit-9h-04.jpg","suite-village-by-the-sea-wells-maine-unit-9h-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-9h-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-9h-02.jpg"],"v":2,"n":7},"10A":{"b":10,"l":"A","p":["suite-village-by-the-sea-wells-maine-unit-10a-01.jpg","suite-village-by-the-sea-wells-maine-unit-10a-02.jpg","suite-village-by-the-sea-wells-maine-unit-10a-03.jpg","suite-village-by-the-sea-wells-maine-unit-10a-04.jpg","marsh-view-village-by-the-sea-wells-maine-unit-10a-01.jpg"],"v":1,"n":5},"10B":{"b":10,"l":"B","p":["suite-village-by-the-sea-wells-maine-unit-10b-01.jpg","suite-village-by-the-sea-wells-maine-unit-10b-02.jpg","suite-village-by-the-sea-wells-maine-unit-10b-03.jpg","suite-village-by-the-sea-wells-maine-unit-10b-04.jpg","suite-village-by-the-sea-wells-maine-unit-10b-05.jpg"],"v":0,"n":5},"10C":{"b":10,"l":"C","p":["suite-village-by-the-sea-wells-maine-unit-10c-01.jpg","suite-village-by-the-sea-wells-maine-unit-10c-02.jpg","suite-village-by-the-sea-wells-maine-unit-10c-03.jpg","suite-village-by-the-sea-wells-maine-unit-10c-04.jpg","marsh-view-village-by-the-sea-wells-maine-unit-10c-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-10c-02.jpg"],"v":2,"n":6},"10D":{"b":10,"l":"D","p":["suite-village-by-the-sea-wells-maine-unit-10d-01.jpg","suite-village-by-the-sea-wells-maine-unit-10d-02.jpg","suite-village-by-the-sea-wells-maine-unit-10d-03.jpg","suite-village-by-the-sea-wells-maine-unit-10d-04.jpg","suite-village-by-the-sea-wells-maine-unit-10d-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-10d-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-10d-02.jpg"],"v":2,"n":7},"10G":{"b":10,"l":"G","p":["suite-village-by-the-sea-wells-maine-unit-10g-01.jpg","suite-village-by-the-sea-wells-maine-unit-10g-02.jpg","suite-village-by-the-sea-wells-maine-unit-10g-03.jpg","suite-village-by-the-sea-wells-maine-unit-10g-04.jpg","suite-village-by-the-sea-wells-maine-unit-10g-05.jpg","suite-village-by-the-sea-wells-maine-unit-10g-06.jpg","suite-village-by-the-sea-wells-maine-unit-10g-07.jpg","suite-village-by-the-sea-wells-maine-unit-10g-08.jpg","marsh-view-village-by-the-sea-wells-maine-unit-10g-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-10g-02.jpg"],"v":2,"n":10},"11B":{"b":11,"l":"B","p":["suite-village-by-the-sea-wells-maine-unit-11b-01.jpg","suite-village-by-the-sea-wells-maine-unit-11b-02.jpg","suite-village-by-the-sea-wells-maine-unit-11b-03.jpg","marsh-view-village-by-the-sea-wells-maine-unit-11b-01.jpg"],"v":1,"n":4},"11E":{"b":11,"l":"E","p":["suite-village-by-the-sea-wells-maine-unit-11e-01.jpg","suite-village-by-the-sea-wells-maine-unit-11e-02.jpg","suite-village-by-the-sea-wells-maine-unit-11e-03.jpg","suite-village-by-the-sea-wells-maine-unit-11e-04.jpg","marsh-view-village-by-the-sea-wells-maine-unit-11e-01.jpg"],"v":1,"n":5},"11F":{"b":11,"l":"F","p":["suite-village-by-the-sea-wells-maine-unit-11f-01.jpg","suite-village-by-the-sea-wells-maine-unit-11f-02.jpg","suite-village-by-the-sea-wells-maine-unit-11f-03.jpg","suite-village-by-the-sea-wells-maine-unit-11f-04.jpg","suite-village-by-the-sea-wells-maine-unit-11f-05.jpg","suite-village-by-the-sea-wells-maine-unit-11f-06.jpg","marsh-view-village-by-the-sea-wells-maine-unit-11f-01.jpg"],"v":1,"n":7},"11G":{"b":11,"l":"G","p":["suite-village-by-the-sea-wells-maine-unit-11g-01.jpg","suite-village-by-the-sea-wells-maine-unit-11g-02.jpg","suite-village-by-the-sea-wells-maine-unit-11g-03.jpg","suite-village-by-the-sea-wells-maine-unit-11g-04.jpg","suite-village-by-the-sea-wells-maine-unit-11g-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-11g-01.jpg"],"v":1,"n":6},"11H":{"b":11,"l":"H","p":["suite-village-by-the-sea-wells-maine-unit-11h-01.jpg","suite-village-by-the-sea-wells-maine-unit-11h-02.jpg","suite-village-by-the-sea-wells-maine-unit-11h-03.jpg","suite-village-by-the-sea-wells-maine-unit-11h-04.jpg","suite-village-by-the-sea-wells-maine-unit-11h-05.jpg","marsh-view-village-by-the-sea-wells-maine-unit-11h-01.jpg","marsh-view-village-by-the-sea-wells-maine-unit-11h-02.jpg"],"v":2,"n":7}};

  var IMG = 'img/units/';

/* ---------------------------------------------------------- SEO alt + title
     Per the site's photo-SEO system: alt text is a natural, location-specific
     sentence; the title attribute is a shorter, differently-worded variant
     (mirrors a CMS "image title" field). Both rotate through a small set of
     honest templates, since the exact room shown per photo isn't tagged, we
     never claim "bedroom" / "kitchen" here, only what we know: suite
     interior vs. the real view from that unit's deck. */
  var ALT_INTERIOR = [
    'Suite interior at Village by the Sea in Wells, Maine, Unit {u}',
    'Inside a condominium suite at Village by the Sea, Wells, Maine, Unit {u}',
    'One and two bedroom vacation suite at Village by the Sea, Wells, Maine, Unit {u}',
    'Village by the Sea suite in Wells, Maine, Unit {u}, Building {b}'
  ];
  var ALT_VIEW = [
    'Marsh and grounds view from a suite deck at Village by the Sea, Wells, Maine, Unit {u}',
    'View from a private deck at Village by the Sea in Wells, Maine, Unit {u}',
    'The view from the deck of Unit {u} at Village by the Sea, Wells, Maine',
    'Tidal marsh view from Unit {u} at Village by the Sea near Wells Beach, Maine'
  ];
  var TITLE_INTERIOR = [
    'Suite at Village by the Sea in Wells Maine',
    'Village by the Sea Vacation Suite Unit {u}',
    'Condo Suite in Wells Maine, Unit {u}',
    'Village by the Sea Suite Near Wells Beach'
  ];
  var TITLE_VIEW = [
    'Marsh View at Village by the Sea Wells Maine',
    'Private Deck View, Village by the Sea Unit {u}',
    'Tidal Salt Marsh View in Wells Maine',
    'Suite Deck View at Village by the Sea'
  ];

  function fill(tpl, u, i) {
    var b = (UNITS[u] || {}).b || '';
    return tpl.replace('{u}', u).replace('{b}', b);
  }
  function pick(list, u, i) {
    /* deterministic rotation, not random, so re-renders stay stable */
    var n = (parseInt((u.match(/\d+/) || ['0'])[0], 10) || 0) + i;
    return fill(list[n % list.length], u, i);
  }
  function alt(u, i, isView) {
    return pick(isView ? ALT_VIEW : ALT_INTERIOR, u, i);
  }
  function imgTitle(u, i, isView) {
    return pick(isView ? TITLE_VIEW : TITLE_INTERIOR, u, i);
  }


  function unitKeys() {
    return Object.keys(UNITS).sort(function (a, b) {
      return UNITS[a].b - UNITS[b].b || (UNITS[a].l < UNITS[b].l ? -1 : 1);
    });
  }

  function buildings() {
    var out = [];
    unitKeys().forEach(function (u) {
      if (out.indexOf(UNITS[u].b) === -1) out.push(UNITS[u].b);
    });
    return out;
  }

  function unitsIn(b) {
    return unitKeys().filter(function (u) { return UNITS[u].b === b; });
  }

  /* ------------------------------------------------------------ picker page */
  function initPicker() {
    var tabsEl = document.getElementById('bldgTabs');
    var gridEl = document.getElementById('unitGrid');
    var prevEl = document.getElementById('preview');
    if (!tabsEl || !gridEl || !prevEl) return;

    var current = buildings()[0];
    var selected = null;
    var displayed = null;



    function renderPreview(u) {
      if (u && u === displayed) return;
      displayed = u;
      if (!u) {
        prevEl.innerHTML =
          '<div class="preview__empty">' +
          '<p class="preview__empty-title">Pick a unit</p>' +
          '<p>Choose any unit on the left to see its photographs. Every set ends with the real view from that unit&rsquo;s deck.</p>' +
          '</div>';
        return;
      }
      var d = UNITS[u];
      var firstView = d.p.length - d.v;

      var lead = d.p[0];
      var rest = d.p.slice(1);

      var thumbs = rest.map(function (src, i) {
        var isView = (i + 1) >= firstView;
        return '<button class="preview__thumb' + (isView ? ' preview__thumb--view' : '') +
               '" type="button" data-full="' + src + '" data-i="' + (i + 1) + '" data-u="' + u + '">' +
               '<img src="' + IMG + src + '" alt="' + alt(u, i + 1, isView) + '" title="' + imgTitle(u, i + 1, isView) + '" loading="lazy">' +
               (isView ? '<span class="preview__thumb-tag">View</span>' : '') +
               '</button>';
      }).join('');

      prevEl.innerHTML =
        '<div class="preview__head">' +
          '<div>' +
            '<p class="preview__label">Building ' + d.b + '</p>' +
            '<h3 class="preview__name">Unit ' + u + '</h3>' +
          '</div>' +
          '<p class="preview__meta">' + d.n + ' photographs' +
            (d.v ? '<span class="preview__flag">Includes the view from the deck</span>' : '') +
          '</p>' +
        '</div>' +
        '<button class="preview__lead" type="button" data-full="' + lead + '" data-i="0" data-u="' + u + '">' +
          '<img src="' + IMG + lead + '" alt="' + alt(u, 0, false) + '" title="' + imgTitle(u, 0, false) + '">' +
          '<span class="preview__zoom" aria-hidden="true">Click to enlarge</span>' +
        '</button>' +
        '<div class="preview__strip">' + thumbs + '</div>' +
        '<div class="preview__actions">' +
          '<a class="btn btn--primary" href="unit.html?u=' + encodeURIComponent(u) + '">See the full unit ' + u + ' page</a>' +
          '<a class="btn btn--ghost btn--dark-ghost" href="tel:+12076461100">Request unit ' + u + '</a>' +
        '</div>';
    }

    function renderGrid() {
      var list = unitsIn(current);
      gridEl.innerHTML = list.map(function (u, i) {
        var d = UNITS[u];
        return '<button class="unit-btn' + (i === 0 ? ' is-selected' : '') + '" type="button" data-unit="' + u + '"' +
               ' aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' +
               '<span class="unit-btn__id">' + u + '</span>' +
               '<span class="unit-btn__meta">' + d.n + ' photos</span>' +
               (d.v ? '<span class="unit-btn__view" title="Includes the view from the deck" aria-label="Includes the view from the deck"></span>' : '') +
               '</button>';
      }).join('');
      selected = list[0];
      renderPreview(selected);
    }

    function select(btn) {
      Array.prototype.forEach.call(gridEl.querySelectorAll('.unit-btn'), function (b) {
        var on = b === btn;
        b.classList.toggle('is-selected', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      selected = btn.getAttribute('data-unit');
      renderPreview(selected);
      /* on narrow screens the panel sits below the grid — bring it into view */
      if (window.matchMedia('(max-width: 759px)').matches) {
        prevEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    tabsEl.innerHTML = buildings().map(function (b, i) {
      return '<button class="bldg-tab' + (i === 0 ? ' is-active' : '') + '" type="button" role="tab" data-b="' + b + '"' +
             ' aria-selected="' + (i === 0 ? 'true' : 'false') + '">' +
             '<span class="bldg-tab__n">' + b + '</span>' +
             '<span class="bldg-tab__c">' + unitsIn(b).length + '</span></button>';
    }).join('');

    tabsEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.bldg-tab');
      if (!btn) return;
      current = parseInt(btn.getAttribute('data-b'), 10);
      Array.prototype.forEach.call(tabsEl.querySelectorAll('.bldg-tab'), function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      renderGrid();
      markMap(current);
    });

    gridEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.unit-btn');
      if (btn) select(btn);
    });

    /* hovering still previews on pointer devices, without stealing the selection */
    if (window.matchMedia('(hover: hover)').matches) {
      gridEl.addEventListener('mouseover', function (e) {
        var btn = e.target.closest('.unit-btn');
        if (btn && !btn.classList.contains('is-selected')) renderPreview(btn.getAttribute('data-unit'));
      });
      gridEl.addEventListener('mouseleave', function () {
        var sel = gridEl.querySelector('.unit-btn.is-selected');
        if (sel) renderPreview(sel.getAttribute('data-unit'));
      });
    }

    /* ------------------------------------------------------------- lightbox */
    var lb = document.getElementById('lightbox');
    if (lb) {
      var lbImg = lb.querySelector('.lightbox__img');
      var lbCap = lb.querySelector('.lightbox__caption');
      var lbPrev = lb.querySelector('.lightbox__nav--prev');
      var lbNext = lb.querySelector('.lightbox__nav--next');
      var lbUnit = null, lbIdx = 0, lastFocus = null;

      function show(i) {
        var d = UNITS[lbUnit];
        if (!d) return;
        lbIdx = (i + d.p.length) % d.p.length;
        var isView = lbIdx >= d.p.length - d.v;
        lbImg.setAttribute('src', IMG + d.p[lbIdx]);
        lbImg.setAttribute('alt', alt(lbUnit, lbIdx, isView));
        lbImg.setAttribute('title', imgTitle(lbUnit, lbIdx, isView));
        lbCap.innerHTML = 'Unit ' + lbUnit + ' &middot; ' + (lbIdx + 1) + ' of ' + d.p.length +
                          (isView ? ' &middot; <strong>the view from this deck</strong>' : '');
      }

      function openLb(u, i) {
        lastFocus = document.activeElement;
        lbUnit = u;
        show(i);
        lb.hidden = false;
        document.documentElement.classList.add('is-locked');
        document.body.classList.add('is-locked');
        window.requestAnimationFrame(function () { lb.classList.add('is-open'); });
        lb.querySelector('.lightbox__close').focus();
      }

      function closeLb() {
        lb.classList.remove('is-open');
        document.documentElement.classList.remove('is-locked');
        document.body.classList.remove('is-locked');
        window.setTimeout(function () { lb.hidden = true; }, 260);
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      }

      prevEl.addEventListener('click', function (e) {
        var t = e.target.closest('[data-full]');
        if (!t) return;
        openLb(t.getAttribute('data-u'), parseInt(t.getAttribute('data-i'), 10));
      });

      lbPrev.addEventListener('click', function () { show(lbIdx - 1); });
      lbNext.addEventListener('click', function () { show(lbIdx + 1); });
      lb.querySelector('.lightbox__close').addEventListener('click', closeLb);
      lb.addEventListener('click', function (e) {
        if (e.target === lb || e.target.classList.contains('lightbox__stage')) closeLb();
      });
      document.addEventListener('keydown', function (e) {
        if (lb.hidden) return;
        if (e.key === 'Escape') closeLb();
        if (e.key === 'ArrowLeft') show(lbIdx - 1);
        if (e.key === 'ArrowRight') show(lbIdx + 1);
      });
    }

    /* ----------------------------------------------------------------- map */
    /* Hotspots are static markup in the page; their positions live in
       style.css as .spot--bN rules. JS only toggles classes. */
    var mapEl = document.getElementById('siteMap');

    function markMap(b) {
      if (!mapEl) return;
      Array.prototype.forEach.call(mapEl.querySelectorAll('.spot[data-b]'), function (el) {
        el.classList.toggle('is-active', parseInt(el.getAttribute('data-b'), 10) === b);
      });
    }

    if (mapEl) {
      mapEl.addEventListener('click', function (e) {
        var btn = e.target.closest('.spot');
        if (!btn || btn.disabled || !btn.hasAttribute('data-b')) return;
        var b = parseInt(btn.getAttribute('data-b'), 10);
        var tab = tabsEl.querySelector('.bldg-tab[data-b="' + b + '"]');
        if (tab) tab.click();
        var rail = document.querySelector('.unit-rail');
        if (rail) rail.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      markMap(current);
    }

    renderGrid();
  }

  /* ------------------------------------------------------- unit detail page */
  function initUnit() {
    var root = document.getElementById('unitMain');
    if (!root) return;

    var q = new URLSearchParams(window.location.search).get('u');
    var u = null;
    if (q) {
      var want = q.toUpperCase();
      unitKeys().forEach(function (k) { if (k.toUpperCase() === want) u = k; });
    }

    if (!u) {
      root.innerHTML =
        '<section class="container unit-missing">' +
        '<h1 class="section-title">We couldn&rsquo;t find that unit.</h1>' +
        '<p class="section-lede">It may not be in the rental program, or the link may be out of date.</p>' +
        '<p class="unit-missing__actions"><a class="btn btn--primary" href="rooms.html">Browse every unit</a>' +
        '<a class="btn btn--ghost btn--dark-ghost" href="tel:+12076461100">207-646-1100</a></p>' +
        '</section>';
      document.title = 'Unit not found - Village by the Sea';
      return;
    }

    var d = UNITS[u];
    var interior = d.p.slice(0, d.p.length - d.v);
    var views = d.v ? d.p.slice(d.p.length - d.v) : [];

    document.title = 'Unit ' + u + ' Suite at Village by the Sea | Wells, Maine';
    var desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute('content',
        'Real photographs of Unit ' + u + ' (Building ' + d.b + '), a condo suite at Village by the Sea in Wells, Maine, near Wells Beach' +
        (d.v ? ', including the actual marsh view from the deck.' : '.'));
    }

    var bc = document.getElementById('bcUnit');
    if (bc) bc.textContent = 'Unit ' + u;

    /* neighbours for prev / next within the whole property */
    var all = unitKeys();
    var idx = all.indexOf(u);
    var prev = all[(idx - 1 + all.length) % all.length];
    var next = all[(idx + 1) % all.length];

    var lead = interior[0] || d.p[0];
    var restShots = interior.slice(1);

    var html =
      '<section class="unit-hero">' +
        '<div class="container unit-hero__grid">' +
          '<div class="unit-hero__copy">' +
            '<p class="eyebrow"><svg class="egret" viewBox="0 0 40 24" aria-hidden="true" focusable="false"><path d="M2 22h13c4.6 0 8.3-2.6 10.4-6.4l2.6-4.7 4.6-1.4a3 3 0 0 0 2-2.3l.4-2.2-3.6 1.5-1.6-2.6-1.7 3.4-4 1.2-6.5 3.1c-2.4 1.1-5 1.7-7.6 1.7H2z"/></svg> Building ' + d.b + '</p>' +
            '<h1 class="unit-hero__title">Unit ' + u + '</h1>' +
            '<p class="unit-hero__lede">Individually owned and individually decorated. These are photographs of this exact unit, not a sample of the category.</p>' +
            '<dl class="spec-rows spec-rows--tight">' +
              '<div class="spec-row"><dt>Building</dt><dd>' + d.b + '</dd></div>' +
              '<div class="spec-row"><dt>Photographs</dt><dd>' + d.n + '</dd></div>' +
              '<div class="spec-row"><dt>In every suite</dt><dd>Full kitchen &middot; living room &middot; deck</dd></div>' +
            '</dl>' +
            '<p class="unit-hero__actions">' +
              '<a class="btn btn--primary" href="https://hotels.cloudbeds.com/reservation/IoseEY">Check availability</a>' +
              '<a class="btn btn--ghost btn--dark-ghost" href="tel:+12076461100">Request unit ' + u + '</a>' +
            '</p>' +
          '</div>' +
          '<figure class="unit-hero__plate">' +
            '<img src="' + IMG + lead + '" alt="Suite interior at Village by the Sea in Wells, Maine, Unit ' + u + '" title="Village by the Sea Vacation Suite Unit ' + u + '" width="1100" height="800">' +
          '</figure>' +
        '</div>' +
      '</section>';

    if (restShots.length) {
      html +=
        '<section class="unit-shots">' +
          '<div class="container">' +
            '<h2 class="minor-title">Inside unit ' + u + '</h2>' +
            '<div class="shot-grid">' +
              restShots.map(function (src, i) {
                return '<figure class="shot"><img src="' + IMG + src + '" alt="' + alt(u, i + 1, false) +
                       '" title="' + imgTitle(u, i + 1, false) + '" loading="lazy"></figure>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</section>';
    }

    if (views.length) {
      html +=
        '<section class="unit-view">' +
          '<div class="container">' +
            '<div class="section-head">' +
              '<p class="eyebrow">From this deck</p>' +
              '<h2 class="section-title">The actual view.</h2>' +
              '<p class="section-lede">Not a stock shot of the property. This is what you see standing on the deck of unit ' + u + '.</p>' +
            '</div>' +
            '<div class="view-grid">' +
              views.map(function (src, i) {
                return '<figure class="shot shot--view"><img src="' + IMG + src + '" alt="' + alt(u, i + 1, true) +
                       '" title="' + imgTitle(u, i + 1, true) + '" loading="lazy"></figure>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</section>';
    }

    html +=
      '<section class="unit-book">' +
        '<div class="container unit-book__grid">' +
          '<div>' +
            '<p class="eyebrow">How to get this one</p>' +
            '<h2 class="section-title">Book the type,<br>then ask for ' + u + '.</h2>' +
            '<p class="section-lede">Individual units aren&rsquo;t bookable online, so you reserve a suite type and level. Call the front desk and request unit ' + u + ' by number and we&rsquo;ll do our best to hold it for your dates.</p>' +
            '<p class="unit-hero__actions">' +
              '<a class="btn btn--primary" href="https://hotels.cloudbeds.com/reservation/IoseEY">Check availability</a>' +
              '<a class="btn btn--ghost btn--dark-ghost" href="tel:+12076461100">Call 207-646-1100</a>' +
            '</p>' +
          '</div>' +
          '<div class="unit-nav">' +
            '<h3 class="minor-title">Keep looking</h3>' +
            '<a class="unit-nav__link" href="unit.html?u=' + encodeURIComponent(prev) + '"><span>Previous</span><strong>Unit ' + prev + '</strong></a>' +
            '<a class="unit-nav__link" href="unit.html?u=' + encodeURIComponent(next) + '"><span>Next</span><strong>Unit ' + next + '</strong></a>' +
            '<a class="unit-nav__link unit-nav__link--all" href="rooms.html"><span>All units</span><strong>Browse all ' + all.length + '</strong></a>' +
          '</div>' +
        '</div>' +
      '</section>';

    root.innerHTML = html;

    var ld = document.getElementById('unitLd');
    if (ld) {
      ld.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Accommodation',
        name: 'Unit ' + u + ', Village by the Sea',
        description: 'An individually owned and decorated condominium suite at Village by the Sea in Wells, Maine.',
        image: window.location.origin + window.location.pathname.replace(/unit\.html.*$/, '') + IMG + lead,
        numberOfRooms: 1,
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Full kitchen', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Living room', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Private deck or patio', value: true }
        ],
        containedInPlace: {
          '@type': 'Resort',
          name: 'Village by the Sea',
          url: 'https://www.vbts.com/',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '1373 Post Road',
            addressLocality: 'Wells',
            addressRegion: 'ME',
            postalCode: '04090',
            addressCountry: 'US'
          }
        }
      });
    }

    /* let the shared reveal observer pick up the injected sections */
    document.dispatchEvent(new CustomEvent('vbts:rendered'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initPicker(); initUnit(); });
  } else {
    initPicker(); initUnit();
  }
}());
