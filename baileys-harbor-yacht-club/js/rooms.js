/**
 * BHYCR Rooms Page — Interactive Map & Panel Logic
 * ES6+ · Vanilla JS · IIFE
 * Descriptions sourced from Individual Room Descriptions doc (Drive)
 */
(function () {
  'use strict';

  /* ── ROOM DATA ── */
  const ROOMS = {
    102:{num:102,building:'Christianne',floor:1,type:'Stateroom',beds:'1 King + Sleeper Sofa',view:'Ground View',title:'King Kitchenette Fireplace Stateroom Patio',desc:'This spacious, newly updated Deluxe King Stateroom is located on the 1st floor in the Christianne Lodge, near the outdoor pool. It has a King Bed and a full sized pull-out sofa, a sitting area with gas fireplace, large flat-screen TV, kitchenette, and a small dining table. Just a short walk to the waterfront, it also includes a patio with table and two chairs. Best for couples and families with young children.',stairs:false,color:'#7BA7C2'},
    103:{num:103,building:'Christianne',floor:1,type:'Deluxe Stateroom',beds:'2 Queens + Sleeper Sofa',view:'Water View',title:'Two Queen Water View Deluxe Stateroom',desc:'This large Deluxe Stateroom has 2 Queen beds, a full size sofa sleeper, sitting area with a dining table, kitchenette with a stove top and 2 burners, small refrigerator, microwave, and a coffee maker. This ground floor room has a patio with a beautiful view overlooking the harbor, just a short walk to the waterfront and the seasonal outdoor pool. Room #103',stairs:false,color:'#4E86A8'},
    104:{num:104,building:'Christianne',floor:1,type:'Junior Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'Junior Suite',desc:'Our water view Junior Suites have a private bedroom with 1 King bed, a seperate living area with a kitchenette with a stove top with 2 burners, small refirdgerator, microwave, and coffee maker, and a full size sofa sleeper in the sitting area. These ground floor suites have a patio with a beautiful view overlooking the harbor, just steps from the water front and the outdoor heated pool. Includes Free WiFi and Free Parking.',stairs:false,color:'#8AB5A0'},
    105:{num:105,building:'Christianne',floor:1,type:'Deluxe Stateroom',beds:'1 King + Sleeper Sofa',view:'Water View',title:'King Kitchenette Water View Deluxe Stateroom',desc:'Deluxe Stateroom with 1 King bed with a full size sofa sleeper, sitting area, kitchenette with a small refrigerator, microwave, and coffee maker. This ground floor room has a patio with a beautiful view overlooking the harbor. Includes Free WiFi and Free Parking and is a short walk to the outdoor pool.',stairs:false,color:'#4E86A8'},
    106:{num:106,building:'Christianne',floor:1,type:'Deluxe Stateroom',beds:'1 King + Sleeper Sofa',view:'Water View',title:'King Fireplace Water View Deluxe Stateroom',desc:'Deluxe Stateroom with 1 King bed with a full size sofa sleeper, small refrigerator, microwave, and coffee maker, and sitting area with a gas fireplace. This ground floor room has a patio with a beautiful view overlooking the harbor. Includes Free WiFi, Free Parking, and is a close walk to the outdoor pool.',stairs:false,color:'#4E86A8'},
    107:{num:107,building:'Christianne',floor:1,type:'Deluxe Stateroom',beds:'1 King + Sleeper Sofa',view:'Water View',title:'King Water View Fireplace Deluxe Stateroom',desc:'Deluxe Stateroom with 1 King bed with a full size sofa sleeper, small refrigerator, microwave, and coffee maker, and sitting area with a gas fireplace. This ground floor room has a patio with a beautiful view overlooking the harbor. Includes Free WiFi, Free Parking, and is a close walk to the outdoor pool.',stairs:false,color:'#4E86A8'},
    108:{num:108,building:'Christianne',floor:1,type:'Stateroom',beds:'1 King + Small Sleeper',view:'Water View',title:'King Water View Stateroom',desc:'Stateroom with 1 King bed, a small sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker. This 1st floor room has a private patio overlooking the water. Includes Free WiFi, Free Parking, and is a close walk to the outdoor pool. Room #108',stairs:false,color:'#7BA7C2'},
    109:{num:109,building:'Christianne',floor:1,type:'Junior Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'Junior Suite',desc:'Our water view Junior Suites have a private bedroom with 1 King bed, a seperate living area with a kitchenette with a stove top with 2 burners, small refirdgerator, microwave, and coffee maker, and a full size sofa sleeper in the sitting area. These ground floor suites have a patio with a beautiful view overlooking the harbor, just steps from the water front and the outdoor heated pool. Includes Free WiFi and Free Parking.',stairs:false,color:'#8AB5A0'},
    110:{num:110,building:'Christianne',floor:1,type:'Stateroom',beds:'2 Queens + Small Sleeper',view:'Water View',title:'Two Queen Water View Stateroom',desc:'Updated Stateroom with 2 Queen beds, a new walk-in shower, a small sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker. Corner unit with incredible views of the harbor. This 1st floor room has a private patio overlooking the water. Includes Free WiFi, Free Parking, and is a close walk to the outdoor pool. Room #110',stairs:false,color:'#7BA7C2'},
    111:{num:111,building:'Christianne',floor:1,type:'Deluxe Stateroom',beds:'1 King + Sleeper Sofa',view:'Courtyard View',title:'King Kitchenette Fireplace Stateroom Patio',desc:'This spacious, newly updated Deluxe King Stateroom is located on the 1st floor in the Christianne Lodge, near the outdoor pool. It includes a King Bed and a full sized pull-out sofa, a sitting area with gas fireplace, large flat-screen TV, kitchenette, and a small dining table. Just a short walk to the waterfront, unit #111 also includes a patio with table and two chairs. Perfect for couples.',stairs:false,color:'#4E86A8'},
    112:{num:112,building:'Christianne',floor:1,type:'Stateroom',beds:'1 King + Sleeper Sofa',view:'Pool View',title:'King Stateroom',desc:'This beautiful Stateroom has 1 King bed, a full size sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker with a courtyard view overlooking the outdoor pool. Free WiFi, Free Parking, just a short walk to the waterfront. Room #112',stairs:false,color:'#7BA7C2'},
    114:{num:114,building:'Christianne',floor:2,type:'Deluxe Stateroom',beds:'2 Queens + Sleeper Sofa',view:'Water View',title:'Two Queen Water View Deluxe Stateroom (2nd Floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. This beautifully decorated Deluxe Stateroom has 2 Queen beds, a full size sofa sleeper, sitting area, kitchenette with a small refrigerator, microwave, and coffee maker. This 2nd floor room has a private balcony with a wonderful view overlooking the harbor and marina. Includes Free WiFi, Free Parking, and is a close walk to the indoor pool. Room #114',stairs:true,color:'#4E86A8'},
    115:{num:115,building:'Christianne',floor:2,type:'Junior Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'Junior Suite (2nd Floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. Junior Suites have a private bedroom with 1 King bed, a seperate living area with a kitchenette with a small refirdgerator, microwave, and coffee maker, and a full size sofa sleeper in the sitting area. These 2nd floor suites have a private balcony with a beautiful view overlooking the harbor. Includes Free WiFi and Free Parking and is a short walk to the water front and outdoor pool.',stairs:true,color:'#8AB5A0'},
    116:{num:116,building:'Christianne',floor:2,type:'Stateroom',beds:'2 Queens',view:'Water View',title:'Two Queen Water View Stateroom (2nd Floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. Stateroom with 2 Queen beds, sitting area, small refrigerator, microwave, and coffee maker. This 2nd floor room has a private balcony overlooking the water. Requires use of stairs. Includes Free WiFi, Free Parking, and is a short walk to the outdoor pool. Room #116',stairs:true,color:'#7BA7C2'},
    117:{num:117,building:'Christianne',floor:2,type:'Stateroom',beds:'1 King + Small Sleeper',view:'Water View',title:'King Water View Stateroom (2nd Floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. Stateroom with 1 King bed, a small sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker. This 2nd floor room has a private balcony overlooking the water. Includes Free WiFi, Free Parking, and is a close walk to the outdoor pool. #117',stairs:true,color:'#7BA7C2'},
    118:{num:118,building:'Christianne',floor:2,type:'Premier Stateroom',beds:'1 King',view:'Water View',title:'King Water View Premier Stateroom (2nd Floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. This Premier Stateroom has 1 King bed, whirlpool, gas fireplace, and a kitchenette. On the second level they do require some stairs, but they have a private balcony with a beautiful harbor view. Perfect for romantic getaways, they sleep up to 2 people.',stairs:true,color:'#2E6A9E'},
    119:{num:119,building:'Christianne',floor:2,type:'Premier Stateroom',beds:'1 King',view:'Lake View',title:'King Water View Premier Stateroom (2nd Floor)',desc:'Thie King Water View Stateroom is on the 2nd floor and requires the use of stairs. This beautiful room had a gas fireplace, kitchenette, double whirlpool, sitting area, and a balcony with faces the marina and harbor. Perfect for a romantic getway.',stairs:true,color:'#2E6A9E'},
    120:{num:120,building:'Christianne',floor:2,type:'Junior Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'Junior Suite (2nd Floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. Junior Suites have a private bedroom with 1 King bed, a seperate living area with a kitchenette with a small refirdgerator, microwave, and coffee maker, and a full size sofa sleeper in the sitting area. These 2nd floor suites have a private balcony with a beautiful view overlooking the harbor. Includes Free WiFi and Free Parking and is a short walk to the water front and outdoor pool.',stairs:true,color:'#8AB5A0'},
    201:{num:201,building:'Main Lodge',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Ground View',title:'King Suite',desc:'One Bedroom Suite with 1 King bed in a private bedroom. Suite includes a full kitchen and livingroom with a full size sofa sleeper. This 1st floor suite has a private patio which is close to parking, which is good for guests with limited mobility. It\'s also directly across from the playgound, and just steps away from the indoor pool, which is great for families with young children. The fitness room is right next door, as it the front desk, making this one of the most conviently located condos at the resort. All suites include free WiFi and parking.',stairs:false,color:'#C8A84B'},
    202:{num:202,building:'Main Lodge',floor:1,type:'Loft Suite',beds:'1 King + 2 Twins in Loft',view:'Wood View',title:'One King, Two Twins Loft Suite One Bath',desc:'This beautiful updated Lofted Suite has a private bedroom with 1 King bed, and a loft with 2 twin beds overlooking the dining area and living area below. New flooring, countertops, sofa, and backsplash in the kitchen, updated lighting. This suite has 1 full bath, full kitchen, and living room with a gas fireplace and full-size sofa sleeper. A ground floor suite, it has a patio close to parking which is convenient for guests with limited mobility, and is also close to the indoor pool and fitness room.',stairs:false,color:'#9E8AB5'},
    203:{num:203,building:'Main Lodge',floor:1,type:'Loft Suite',beds:'1 King + 2 Twins in Loft',view:'Wood View',title:'One King, Two Twins Loft Suite One Bath',desc:'Lofted Suite with a private bedroom with 1 King bed, and a loft with 2 twin beds overlooking the dining area and living area below. Suites include 1 full bath, a full kitchen, and livingroom with a full size sofa sleeper. This ground floor suite has a patio with a wooded view.',stairs:false,color:'#9E8AB5'},
    204:{num:204,building:'Main Lodge',floor:1,type:'Stateroom',beds:'1 King + Sleeper Sofa',view:'Pool View',title:'King Stateroom with Patio',desc:'Large Stateroom with 1 King bed, sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker. This room has a private patio overlooking the courtyard and outdoor pool. Includes Free WiFi, free parking, and a short walk to the Indoor pool.',stairs:false,color:'#7BA7C2'},
    205:{num:205,building:'Main Lodge',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Others',title:'King Suite',desc:'This spacious updated One Bedroom Suite has 1 King bed in a private bedroom, full kitchen, large dining room table, and beautiful living room with a full size sofa sleeper. This ground floor suite has a private patio with a courtyard view, and is close to the indoor and outdoor pools.',stairs:false,color:'#C8A84B'},
    206:{num:206,building:'Main Lodge',floor:1,type:'One Bedroom Suite',beds:'1 Queen + Sleeper Sofa',view:'Ground View',title:'Deluxe Queen Suite',desc:'Recently updated One Bedroom Suites in the Main Lodge with 1 Queen bed in a private bedroom. Suites includes a full kitchen with updated appliances and livingroom with a gas fireplace. These ground floor suites have a private patio with a courtyard or wooded view. Just a short walk to the indoor and outdoor pools, all suites include Free WiFi and Free Parking. Perfect for couples! Suite #206',stairs:false,color:'#C8A84B'},
    208:{num:208,building:'Main Lodge',floor:1,type:'One Bedroom Suite',beds:'1 Queen + Sleeper Sofa',view:'Ground View',title:'Queen Suite',desc:'Updated One Bedroom Suite with 1 Queen bed in a private bedroom. Suite includes a full kitchen and living room with a new full size sofa sleeper. This 1st floor suite has a private patio with a courtyard view. Conveniently located near the indoor and outdoor pools, and just a short walk to the fitness room. All suites include free WiFi and parking.',stairs:false,color:'#C8A84B'},
    210:{num:210,building:'Main Lodge',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Others',title:'King Suite',desc:'This spacious updated One Bedroom Suite has 1 King bed in a private bedroom, full kitchen, large dining room table, and beautiful living room with a full size sofa sleeper. This ground floor suite has a private patio with a courtyard view, and is close to the indoor and outdoor pools.',stairs:false,color:'#C8A84B'},
    211:{num:211,building:'Main Lodge',floor:1,type:'Stateroom',beds:'1 King + Sleeper Sofa',view:'Pool View',title:'King Stateroom (with patio)',desc:'Large Stateroom with 1 King bed, sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker. This room has a private patio overlooking the courtyard and outdoor pool. Includes Free WiFi, free parking, and a short walk to the Indoor pool.',stairs:false,color:'#7BA7C2'},
    212:{num:212,building:'Main Lodge',floor:1,type:'Loft Suite',beds:'1 King + 1 Queen in Loft',view:'Others',title:'One King, One Queen, Loft Suite 1 Bath',desc:'Lofted Suite with a private bedroom with 1 King bed, and a loft with 1 Queen bed overlooking the dining area and living area below. Suite includes 1 full bath, a full kitchen, and livingroom with a pull-out sofa. This ground floor suite has a patio with a wooded view. Suite #212',stairs:false,color:'#9E8AB5'},
    214:{num:214,building:'Main Lodge',floor:1,type:'Loft Suite',beds:'1 King + 2 Twins in Loft',view:'Wood View',title:'One King, Two Twins Loft Suite One Bath',desc:'This recently updated Lofted Suite has a private bedroom with 1 King bed, and a loft with 2 twin beds overlooking the dining area and living area below. This suite has 1 full bath, full kitchen, and living room with a new gas fireplace and full-size sofa sleeper. A ground floor suite, it has a patio close to parking which is convenient for guests with limited mobility, and is also close to the indoor pool and fitness room.',stairs:false,color:'#9E8AB5'},
    215:{num:215,building:'Main Lodge',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Wood View',title:'King Suite',desc:'Updated King Wooded View Suite with 1 private bedroom with 1 King bed, full livingroom with a sofa sleeper, dining area and full kitchen with patio which faces the parking area.',stairs:false,color:'#C8A84B'},
    216:{num:216,building:'Main Lodge',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Courtyard View',title:'King Suite (2nd Floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. One Bedroom Suite with 1 King bed in a private bedroom. Suite has a full kitchen and livingroom with a full size sofa sleeper. This 2nd floor suite has a private balcony and overlooks the courtyard and outdoor pool. Requires use of stairs.',stairs:true,color:'#C8A84B'},
    217:{num:217,building:'Main Lodge',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Ground View',title:'King Suite (2nd Floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. One Bedroom Suite with 1 King bed in a private bedroom. Suite has a full kitchen and livingroom with a full size sofa sleeper. This 2nd floor suite has a private balcony and overlooks the courtyard and outdoor pool. Requires use of stairs.',stairs:true,color:'#C8A84B'},
    218:{num:218,building:'Main Lodge',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Courtyard View',title:'King Suite (2nd Floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. King Suite with 1 private bedroom with 1 King bed, livingroom with sofa sleeper, dining area and full kitchen with balcony which faces the courtyard.',stairs:true,color:'#C8A84B'},
    219:{num:219,building:'Main Lodge',floor:2,type:'Stateroom',beds:'1 King + Small Sleeper',view:'Pool View',title:'King Stateroom (2nd floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. Stateroom with 1 King bed, a small sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker. This 2nd floor room has a private balcony overlooking the courtyard and outdoor pool. Requires use of stairs. Includes Free WiFi, Free Parking, and is a close walk to the indoor pool.',stairs:true,color:'#7BA7C2'},
    220:{num:220,building:'Main Lodge',floor:2,type:'One Bedroom Suite',beds:'1 Queen + Sleeper Sofa',view:'Courtyard View',title:'Queen Suite (2nd Floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. One Bedroom Suite with 1 Queen bed in a private bedroom. Suite has a full kitchen and livingroom with a full size sofa sleeper. This 2nd floor suite has a private balcony and overlooks the courtyard and outdoor pool. Requires use of stairs.',stairs:true,color:'#C8A84B'},
    221:{num:221,building:'Main Lodge',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Courtyard View',title:'King Suite (2nd Floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. King Suite with 1 private bedroom with 1 King bed, livingroom with sofa sleeper, dining area and full kitchen with balcony which faces the courtyard.',stairs:true,color:'#C8A84B'},
    222:{num:222,building:'Main Lodge',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Courtyard View',title:'King Suite (2nd Floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. King Suite with 1 private bedroom with 1 King bed, livingroom with sofa sleeper, dining area and full kitchen with balcony which faces the courtyard.',stairs:true,color:'#C8A84B'},
    223:{num:223,building:'Main Lodge',floor:2,type:'Stateroom',beds:'1 King + Small Sleeper',view:'Pool View',title:'King Stateroom (2nd floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. Large Stateroom with 1 King bed, a small twin-sized sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker. This 2nd floor room has a private balcony overlooking the courtyard and outdoor pool. Includes Free WiFi, Free Parking, and is a close walk to the indoor pool.',stairs:true,color:'#7BA7C2'},
    302:{num:302,building:'Brighton',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'King Water View Suite',desc:'One Bedroom Suite with 1 King bed in a private bedroom. Suite has a full kitchen and livingroom with a gas fireplace and full size sofa sleeper. This ground floor suite has a private patio with a beautiful view overlooking the harbor.',stairs:false,color:'#C8A84B'},
    303:{num:303,building:'Brighton',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'King Water View Suite',desc:'One Bedroom Suite with 1 King bed in a private bedroom. Suite has a full kitchen and livingroom with a gas fireplace and full size sofa sleeper. This ground floor suite has a private patio with a beautiful view overlooking the harbor.',stairs:false,color:'#C8A84B'},
    304:{num:304,building:'Brighton',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'King Water View Suite',desc:'One Bedroom Suite with 1 King bed in a private bedroom. Suite has a full kitchen and livingroom with a gas fireplace and full size sofa sleeper. Recetly renovated bathroom has a beautifiul walk-in shower and double vanity. This ground floor suite has a private patio with a beautiful view overlooking the harbor.',stairs:false,color:'#C8A84B'},
    305:{num:305,building:'Brighton',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'King Water View Suite',desc:'One Bedroom Suite with 1 King bed in a private bedroom. Suite has a full kitchen and livingroom with a gas fireplace and full size sofa sleeper. This ground floor suite has a private patio with a beautiful view overlooking the harbor.',stairs:false,color:'#C8A84B'},
    307:{num:307,building:'Brighton',floor:2,type:'Deluxe Stateroom',beds:'1 King',view:'Water View',title:'- King Fireplace Deluxe Stateroom (2nd floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. Deluxe Stateroom with 1 King bed, sitting area, gas fireplace, small refrigerator, microwave, and coffee maker. Has a private balcony or patio overlooking the harbor. Includes Free WiFi, Free Parking, and is a close walk to the water and heated outdoor pool. Room #307',stairs:true,color:'#4E86A8'},
    308:{num:308,building:'Brighton',floor:2,type:'Loft Suite',beds:'2 Queens (loft layout)',view:'Water View',title:'Two Queen Water View Loft Suite',desc:'This is a 2nd floor room- REQUIRES STAIRS. Lofted Suite with a private bedroom with 1 Queen bed and a loft with 1 Queen bed overlooking the dining area and living area below. Suites include 2 full baths, a full kitchen, and livingroom with a gas fireplace and full size sofa sleeper. This 2nd floor suite has a private balcony with a beautiful harbor view.',stairs:true,color:'#9E8AB5'},
    309:{num:309,building:'Brighton',floor:2,type:'Loft Suite',beds:'2 Queens (loft layout)',view:'Water View',title:'Two Queens Water View Loft Suite',desc:'Requires use of stairs. Updated Lofted Suite with a private bedroom with 1 queen bed, and a loft with 1 queen bed overlooking the dining area and living area below. Suites include 2 full baths, a full kitchen, and livingroom with a gas fireplace and full size sofa sleeper. This 2nd floor suite has a private balcony with a beautiful harbor view. Suite #309',stairs:true,color:'#9E8AB5'},
    310:{num:310,building:'Brighton',floor:2,type:'Loft Suite',beds:'1 King + 2 Twins in Loft',view:'Water View',title:'One King, Two Twins Water View Loft Suite',desc:'Requires use of stairs. Lofted Suite with a private bedroom with 1 King bed, and a loft with 2 Twin beds overlooking the dining area and living area below. Suite includes 2 full baths, a full kitchen, and livingroom with a gas fireplace and full size sofa sleeper. This 2nd floor suite has a private balcony with a beautiful harbor view. Suite #310',stairs:true,color:'#9E8AB5'},
    312:{num:312,building:'Brighton',floor:1,type:'Premier Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'Premier King Water View Suite',desc:'The Premier King Suite has a beautiful four poster King bed in a private bedroom and a fully equipt kitchen and livingroom with a double-sided gas fireplace. The large bath has a separate walk-in shower and double whirlpool. This ground floor suite has a private patio with a beautiful view overlooking the harbor. Suite #312',stairs:false,color:'#5A9E80'},
    314:{num:314,building:'Brighton',floor:1,type:'Two Bedroom Suite',beds:'1 King + 1 Queen + Sleeper Sofa',view:'Water View',title:'Two Bedroom Water View Suite',desc:'Two Bedroom Suite with 1 King in one bedroom and 1 Queen in the other, and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper. This ground floor suite has a private patio with a beautiful harbor view. Suite #314',stairs:false,color:'#B07D3C'},
    315:{num:315,building:'Brighton',floor:1,type:'Two Bedroom Suite',beds:'1 Queen + 2 Twins + Sleeper Sofa',view:'Wood View',title:'One Queen, Two Twins Two Bedroom Suite',desc:'Two Bedroom Suite with 1 Queen in one bedroom and 2 Twins in the other, and 2 full baths. Suites include a full kitchen and livingroom with a gas fireplace and full size sofa sleeper. This ground floor suite has a patio with a wooded view. Suite #315',stairs:false,color:'#B07D3C'},
    316:{num:316,building:'Brighton',floor:2,type:'Loft Suite',beds:'1 King + 1 Queen in Loft',view:'Water View',title:'One King, One Queen Loft Suite Water View',desc:'Requires use of stairs. Lofted Suite with a private bedroom with 1 King bed, and a loft with 1 Queen bed overlooking the dining area and living area below. Suite includes 2 full baths, a full kitchen, and livingroom with a gas fireplace and full size sofa sleeper. This 2nd floor suite has a private balcony with a beautiful harbor view.',stairs:true,color:'#9E8AB5'},
    317:{num:317,building:'Brighton',floor:2,type:'Loft Suite',beds:'1 King + 1 Queen in Loft',view:'Water View',title:'One King. One Queen Loft Suite Water View',desc:'Requires use of stairs. Lofted Suite with a private bedroom with 1 King bed, and a loft with 1 Queen bed overlooking the dining area and living area below. Suite includes 2 full baths, a full kitchen, and livingroom with a gas fireplace and full size sofa sleeper. This 2nd floor suite has a private balcony with a beautiful harbor view.',stairs:true,color:'#9E8AB5'},
    318:{num:318,building:'Brighton',floor:2,type:'Loft Suite',beds:'1 King + 2 Twins in Loft',view:'Wood View',title:'One King, Two Twin Loft Suite Two Bath',desc:'Requires use of stairs. Lofted Suite with a private bedroom with 1 King bed, and a loft with 2 twin beds overlooking the dining area and living area below. Suites include 2 full baths, a full kitchen, and livingroom with a gas fireplace and full size sofa sleeper. This 2nd floor suite has a private balcony with a wooded view. Suite #318',stairs:true,color:'#9E8AB5'},
    401:{num:401,building:'Adriana',floor:1,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Wood View',title:'Two King, Two Bedroom Suite',desc:'Two Bedroom Suite with 1 King bed in each bedroom and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper.',stairs:false,color:'#B07D3C'},
    402:{num:402,building:'Adriana',floor:1,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Wood View',title:'Two King, Two Bedroom Suite',desc:'Two Bedroom Suite with 1 King bed in each bedroom and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper.',stairs:false,color:'#B07D3C'},
    403:{num:403,building:'Adriana',floor:1,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Wood View',title:'Two King, Two Bedroom Suite',desc:'Two Bedroom Suite with 1 King bed in each bedroom and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper.',stairs:false,color:'#B07D3C'},
    405:{num:405,building:'Adriana',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Wood View',title:'Two King, Two Bedroom Suite (2nd Floor)',desc:'Two Bedroom Suite with 1 King bed in each bedroom and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper.',stairs:false,color:'#B07D3C'},
    406:{num:406,building:'Adriana',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Wood View',title:'Two King, Two Bedroom Suite (2nd Floor)',desc:'Two Bedroom Suite with 1 King bed in each bedroom and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper.',stairs:false,color:'#B07D3C'},
    407:{num:407,building:'Adriana',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Wood View',title:'Two King, Two Bedroom Suite (2nd Floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. Two Bedroom Suite with 1 King bed in each bedroom and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper.',stairs:true,color:'#B07D3C'},
    408:{num:408,building:'Adriana',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Wood View',title:'Two King, Two Bedrooms Suite (2nd Floor)',desc:'This is a 2nd floor room- REQUIRES STAIRS. Two Bedroom Suite with 1 King bed in each bedroom and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper.',stairs:true,color:'#B07D3C'},
  };


  const TYPE_COLORS = {
    'Stateroom':         '#7BA7C2',
    'Deluxe Stateroom':  '#4E86A8',
    'Premier Stateroom': '#2E6A9E',
    'Junior Suite':      '#8AB5A0',
    'Premier Suite':     '#5A9E80',
    'Loft Suite':        '#9E8AB5',
    'One Bedroom Suite': '#C8A84B',
    'Two Bedroom Suite': '#B07D3C',
  };

  const BUILDING_DESCS = {
    'Christianne': "The Christianne Lodge hugs the harbor's edge, offering the closest proximity to the water. Most rooms face Lake Michigan directly with private patios and balconies overlooking the harbor.",
    'Main Lodge':  "The heart of the resort — home to the Front Desk, lobby, and the most diverse mix of room types. The Main Lodge offers harbor views, courtyard views, and pool views.",
    'Brighton':    "The Brighton Lodge sits slightly north on the property, offering a quieter setting with harbor and woodland views. All suites feature full kitchens, gas fireplaces, and generous living spaces.",
    'Adriana':     "The Adriana Lodge occupies the highest point of the property for exceptional views. All units are spacious two-bedroom suites — ideal for families and groups.",
  };

  const BUILDING_ROOMS = {
    'Christianne': 'Rooms 102–120',
    'Main Lodge':  'Rooms 201–223 · Front Desk',
    'Brighton':    'Rooms 302–318',
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
    mapViews.forEach((mv) => mv.classList.toggle('map-view--active', mv.id === tabId));
    if (targetBuilding !== 'all') showBuildingPanel(targetBuilding);
    else showDefaultPanel();
  }
  buildingTabs.forEach((tab) => tab.addEventListener('click', () => switchTab(tab.dataset.building)));

  /* ── MAP BUILDING CLICKS ── */
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
      btn.closest('.floor-toggle').querySelectorAll('.floor-btn').forEach((b) => b.classList.toggle('floor-btn--active', b === btn));
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
      const typeMatch = filter === 'all' || room.type === filter ||
        (filter === 'Stateroom' && ['Stateroom','Deluxe Stateroom','Premier Stateroom'].includes(room.type)) ||
        (filter === 'Suite' && room.type.includes('Suite'));
      cell.classList.toggle('room-cell--dimmed', filter !== 'all' && !typeMatch && filter !== room.type);
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
    panelBuildingDesc.textContent  = BUILDING_DESCS[building] || '';
    const counts = {};
    Object.values(ROOMS).forEach((r) => {
      if (r.building === building) counts[r.type] = (counts[r.type] || 0) + 1;
    });
    panelBuildingCounts.innerHTML = Object.entries(counts).map(([type, count]) =>
      `<div class="room-panel__count-item"><span class="room-panel__count-swatch" style="background:${TYPE_COLORS[type] || '#888'}"></span><span>${count} ${type}${count > 1 ? 's' : ''}</span></div>`
    ).join('');
  }

  function showRoomPanel(roomNum) {
    const room = ROOMS[roomNum];
    if (!room) return;
    panelDefault.style.display  = 'none';
    panelBuilding.style.display = 'none';
    panelDetail.style.display   = '';
    roomCells.forEach((cell) => cell.classList.toggle('room-cell--active', parseInt(cell.dataset.room, 10) === roomNum));
    const color = TYPE_COLORS[room.type] || '#888';
    panelBadge.textContent     = `${room.building} Lodge · Floor ${room.floor}`;
    panelRoomNum.textContent   = `Room ${room.num}`;
    panelType.textContent      = room.type;
    panelType.style.background = color;

    // Build specs from real description data
    const stairsNote = room.stairs ? '<li style="color:#c8722a;font-weight:600">⚠ 2nd Floor — Requires use of stairs</li>' : '';
    const descHtml = room.desc ? `<li style="border-top:1px solid rgba(11,31,58,0.08);padding-top:12px;margin-top:4px">${room.desc}</li>` : '';
    const viewHtml = room.view ? `<li><strong>View:</strong>&nbsp; ${room.view}</li>` : '';
    const bedsHtml = room.beds ? `<li><strong>Beds:</strong>&nbsp; ${room.beds}</li>` : '';
    const floorHtml = `<li><strong>Floor:</strong>&nbsp; ${room.floor === 1 ? '1st Floor (Ground)' : '2nd Floor'}</li>`;

    panelSpecs.innerHTML = stairsNote + bedsHtml + viewHtml + floorHtml + descHtml;

    const panel = document.getElementById('roomPanel');
    if (panel) panel.scrollTop = 0;
  }

  /* ── INIT ── */
  showDefaultPanel();

}());
