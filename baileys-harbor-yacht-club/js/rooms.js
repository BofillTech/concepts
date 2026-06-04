/**
 * BHYCR Rooms Page — Image Map Interaction
 * Real property map + real floor plans with clickable hotspots
 */
(function () {
  'use strict';

  /* ── ROOM DATA ── */
  const ROOMS = {
    102:{num:102,building:'Christianne',floor:1,type:'Stateroom',beds:'1 King + Sleeper Sofa',view:'Ground View',title:'King Kitchenette Fireplace Stateroom',stairs:false,color:'#7BA7C2',desc:"This spacious, newly updated Deluxe King Stateroom is located on the 1st floor in the Christianne Lodge, near the outdoor pool. It has a King Bed and a full sized pull-out sofa, a sitting area with gas fireplace, large flat-screen TV, kitchenette, and a small dining table. Just a short walk to the waterfront, it also includes a patio with table and two chairs. Best for couples and families with young children."},
    103:{num:103,building:'Christianne',floor:1,type:'Deluxe Stateroom',beds:'2 Queens + Sleeper Sofa',view:'Water View',title:'Two Queen Water View Deluxe Stateroom',stairs:false,color:'#4E86A8',desc:"This large Deluxe Stateroom has 2 Queen beds, a full size sofa sleeper, sitting area with a dining table, kitchenette with a stove top and 2 burners, small refrigerator, microwave, and a coffee maker. This ground floor room has a patio with a beautiful view overlooking the harbor, just a short walk to the waterfront and the seasonal outdoor pool."},
    104:{num:104,building:'Christianne',floor:1,type:'Junior Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'Junior Suite',stairs:false,color:'#8AB5A0',desc:"Our water view Junior Suites have a private bedroom with 1 King bed, a separate living area with a kitchenette with a stove top with 2 burners, small refrigerator, microwave, and coffee maker, and a full size sofa sleeper in the sitting area. These ground floor suites have a patio with a beautiful view overlooking the harbor, just steps from the water front and the outdoor heated pool."},
    105:{num:105,building:'Christianne',floor:1,type:'Deluxe Stateroom',beds:'1 King + Sleeper Sofa',view:'Water View',title:'King Kitchenette Water View Deluxe Stateroom',stairs:false,color:'#4E86A8',desc:"Deluxe Stateroom with 1 King bed with a full size sofa sleeper, sitting area, kitchenette with a small refrigerator, microwave, and coffee maker. This ground floor room has a patio with a beautiful view overlooking the harbor. Includes Free WiFi and Free Parking and is a short walk to the outdoor pool."},
    106:{num:106,building:'Christianne',floor:1,type:'Deluxe Stateroom',beds:'1 King + Sleeper Sofa',view:'Water View',title:'King Fireplace Water View Deluxe Stateroom',stairs:false,color:'#4E86A8',desc:"Deluxe Stateroom with 1 King bed with a full size sofa sleeper, small refrigerator, microwave, and coffee maker, and sitting area with a gas fireplace. This ground floor room has a patio with a beautiful view overlooking the harbor. Includes Free WiFi, Free Parking, and is a close walk to the outdoor pool."},
    107:{num:107,building:'Christianne',floor:1,type:'Deluxe Stateroom',beds:'1 King + Sleeper Sofa',view:'Water View',title:'King Water View Fireplace Deluxe Stateroom',stairs:false,color:'#4E86A8',desc:"Deluxe Stateroom with 1 King bed with a full size sofa sleeper, small refrigerator, microwave, and coffee maker, and sitting area with a gas fireplace. This ground floor room has a patio with a beautiful view overlooking the harbor. Includes Free WiFi, Free Parking, and is a close walk to the outdoor pool."},
    108:{num:108,building:'Christianne',floor:1,type:'Stateroom',beds:'1 King + Small Sleeper',view:'Water View',title:'King Water View Stateroom',stairs:false,color:'#7BA7C2',desc:"Stateroom with 1 King bed, a small sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker. This 1st floor room has a private patio overlooking the water. Includes Free WiFi, Free Parking, and is a close walk to the outdoor pool."},
    109:{num:109,building:'Christianne',floor:1,type:'Junior Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'Junior Suite',stairs:false,color:'#8AB5A0',desc:"Our water view Junior Suites have a private bedroom with 1 King bed, a separate living area with a kitchenette with a stove top with 2 burners, small refrigerator, microwave, and coffee maker, and a full size sofa sleeper in the sitting area. These ground floor suites have a patio with a beautiful view overlooking the harbor, just steps from the water front and the outdoor heated pool."},
    110:{num:110,building:'Christianne',floor:1,type:'Stateroom',beds:'2 Queens + Small Sleeper',view:'Water View',title:'Two Queen Water View Stateroom',stairs:false,color:'#7BA7C2',desc:"Updated Stateroom with 2 Queen beds, a new walk-in shower, a small sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker. Corner unit with incredible views of the harbor. This 1st floor room has a private patio overlooking the water. Includes Free WiFi, Free Parking, and is a close walk to the outdoor pool."},
    111:{num:111,building:'Christianne',floor:1,type:'Deluxe Stateroom',beds:'1 King + Sleeper Sofa',view:'Courtyard View',title:'King Kitchenette Fireplace Stateroom Patio',stairs:false,color:'#4E86A8',desc:"This spacious, newly updated Deluxe King Stateroom is located on the 1st floor in the Christianne Lodge, near the outdoor pool. It includes a King Bed and a full sized pull-out sofa, a sitting area with gas fireplace, large flat-screen TV, kitchenette, and a small dining table. Just a short walk to the waterfront, unit #111 also includes a patio with table and two chairs. Perfect for couples."},
    112:{num:112,building:'Christianne',floor:1,type:'Stateroom',beds:'1 King + Sleeper Sofa',view:'Pool View',title:'King Stateroom',stairs:false,color:'#7BA7C2',desc:"This beautiful Stateroom has 1 King bed, a full size sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker with a courtyard view overlooking the outdoor pool. Free WiFi, Free Parking, just a short walk to the waterfront."},
    114:{num:114,building:'Christianne',floor:2,type:'Deluxe Stateroom',beds:'2 Queens + Sleeper Sofa',view:'Water View',title:'Two Queen Water View Deluxe Stateroom (2nd Floor)',stairs:true,color:'#4E86A8',desc:"This beautifully decorated Deluxe Stateroom has 2 Queen beds, a full size sofa sleeper, sitting area, kitchenette with a small refrigerator, microwave, and coffee maker. This 2nd floor room has a private balcony with a wonderful view overlooking the harbor and marina. Includes Free WiFi, Free Parking, and is a close walk to the indoor pool."},
    115:{num:115,building:'Christianne',floor:2,type:'Junior Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'Junior Suite (2nd Floor)',stairs:true,color:'#8AB5A0',desc:"Junior Suites have a private bedroom with 1 King bed, a separate living area with a kitchenette with a small refrigerator, microwave, and coffee maker, and a full size sofa sleeper in the sitting area. These 2nd floor suites have a private balcony with a beautiful view overlooking the harbor. Includes Free WiFi and Free Parking and is a short walk to the water front and outdoor pool."},
    116:{num:116,building:'Christianne',floor:2,type:'Stateroom',beds:'2 Queens',view:'Water View',title:'Two Queen Water View Stateroom (2nd Floor)',stairs:true,color:'#7BA7C2',desc:"Stateroom with 2 Queen beds, sitting area, small refrigerator, microwave, and coffee maker. This 2nd floor room has a private balcony overlooking the water. Requires use of stairs. Includes Free WiFi, Free Parking, and is a short walk to the outdoor pool."},
    117:{num:117,building:'Christianne',floor:2,type:'Stateroom',beds:'1 King + Small Sleeper',view:'Water View',title:'King Water View Stateroom (2nd Floor)',stairs:true,color:'#7BA7C2',desc:"Stateroom with 1 King bed, a small sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker. This 2nd floor room has a private balcony overlooking the water. Includes Free WiFi, Free Parking, and is a close walk to the outdoor pool."},
    118:{num:118,building:'Christianne',floor:2,type:'Premier Stateroom',beds:'1 King',view:'Water View',title:'King Water View Premier Stateroom (2nd Floor)',stairs:true,color:'#2E6A9E',desc:"This Premier Stateroom has 1 King bed, whirlpool, gas fireplace, and a kitchenette. On the second level they do require some stairs, but they have a private balcony with a beautiful harbor view. Perfect for romantic getaways, they sleep up to 2 people."},
    119:{num:119,building:'Christianne',floor:2,type:'Premier Stateroom',beds:'1 King',view:'Lake View',title:'King Water View Premier Stateroom (2nd Floor)',stairs:true,color:'#2E6A9E',desc:"This King Water View Stateroom is on the 2nd floor and requires the use of stairs. This beautiful room has a gas fireplace, kitchenette, double whirlpool, sitting area, and a balcony which faces the marina and harbor. Perfect for a romantic getaway."},
    120:{num:120,building:'Christianne',floor:2,type:'Junior Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'Junior Suite (2nd Floor)',stairs:true,color:'#8AB5A0',desc:"Junior Suites have a private bedroom with 1 King bed, a separate living area with a kitchenette with a small refrigerator, microwave, and coffee maker, and a full size sofa sleeper in the sitting area. These 2nd floor suites have a private balcony with a beautiful view overlooking the harbor. Includes Free WiFi and Free Parking and is a short walk to the water front and outdoor pool."},
    201:{num:201,building:'Main Lodge',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Ground View',title:'King Suite',stairs:false,color:'#C8A84B',desc:"One Bedroom Suite with 1 King bed in a private bedroom. Suite includes a full kitchen and livingroom with a full size sofa sleeper. This 1st floor suite has a private patio which is close to parking, which is good for guests with limited mobility. It's also directly across from the playground, and just steps away from the indoor pool, which is great for families with young children. The fitness room is right next door, as is the front desk, making this one of the most conveniently located condos at the resort."},
    202:{num:202,building:'Main Lodge',floor:1,type:'Loft Suite',beds:'1 King + 2 Twins in Loft',view:'Wood View',title:'One King, Two Twins Loft Suite',stairs:false,color:'#9E8AB5',desc:"This beautiful updated Lofted Suite has a private bedroom with 1 King bed, and a loft with 2 twin beds overlooking the dining area and living area below. New flooring, countertops, sofa, and backsplash in the kitchen, updated lighting. This suite has 1 full bath, full kitchen, and living room with a gas fireplace and full-size sofa sleeper. A ground floor suite, it has a patio close to parking which is convenient for guests with limited mobility, and is also close to the indoor pool and fitness room."},
    203:{num:203,building:'Main Lodge',floor:1,type:'Loft Suite',beds:'1 King + 2 Twins in Loft',view:'Wood View',title:'One King, Two Twins Loft Suite',stairs:false,color:'#9E8AB5',desc:"Lofted Suite with a private bedroom with 1 King bed, and a loft with 2 twin beds overlooking the dining area and living area below. Suites include 1 full bath, a full kitchen, and livingroom with a full size sofa sleeper. This ground floor suite has a patio with a wooded view."},
    204:{num:204,building:'Main Lodge',floor:1,type:'Stateroom',beds:'1 King + Sleeper Sofa',view:'Pool View',title:'King Stateroom with Patio',stairs:false,color:'#7BA7C2',desc:"Large Stateroom with 1 King bed, sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker. This room has a private patio overlooking the courtyard and outdoor pool. Includes Free WiFi, free parking, and a short walk to the Indoor pool."},
    205:{num:205,building:'Main Lodge',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Courtyard View',title:'King Suite',stairs:false,color:'#C8A84B',desc:"This spacious updated One Bedroom Suite has 1 King bed in a private bedroom, full kitchen, large dining room table, and beautiful living room with a full size sofa sleeper. This ground floor suite has a private patio with a courtyard view, and is close to the indoor and outdoor pools."},
    206:{num:206,building:'Main Lodge',floor:1,type:'One Bedroom Suite',beds:'1 Queen + Sleeper Sofa',view:'Courtyard View',title:'Deluxe Queen Suite',stairs:false,color:'#C8A84B',desc:"Recently updated One Bedroom Suites in the Main Lodge with 1 Queen bed in a private bedroom. Suites includes a full kitchen with updated appliances and livingroom with a gas fireplace. These ground floor suites have a private patio with a courtyard or wooded view. Just a short walk to the indoor and outdoor pools. Perfect for couples!"},
    208:{num:208,building:'Main Lodge',floor:1,type:'One Bedroom Suite',beds:'1 Queen + Sleeper Sofa',view:'Courtyard View',title:'Queen Suite',stairs:false,color:'#C8A84B',desc:"Updated One Bedroom Suite with 1 Queen bed in a private bedroom. Suite includes a full kitchen and living room with a new full size sofa sleeper. This 1st floor suite has a private patio with a courtyard view. Conveniently located near the indoor and outdoor pools, and just a short walk to the fitness room."},
    210:{num:210,building:'Main Lodge',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Courtyard View',title:'King Suite',stairs:false,color:'#C8A84B',desc:"This spacious updated One Bedroom Suite has 1 King bed in a private bedroom, full kitchen, large dining room table, and beautiful living room with a full size sofa sleeper. This ground floor suite has a private patio with a courtyard view, and is close to the indoor and outdoor pools."},
    211:{num:211,building:'Main Lodge',floor:1,type:'Stateroom',beds:'1 King + Sleeper Sofa',view:'Pool View',title:'King Stateroom (with patio)',stairs:false,color:'#7BA7C2',desc:"Large Stateroom with 1 King bed, sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker. This room has a private patio overlooking the courtyard and outdoor pool. Includes Free WiFi, free parking, and a short walk to the Indoor pool."},
    212:{num:212,building:'Main Lodge',floor:1,type:'Loft Suite',beds:'1 King + 1 Queen in Loft',view:'Wood View',title:'One King, One Queen, Loft Suite',stairs:false,color:'#9E8AB5',desc:"Lofted Suite with a private bedroom with 1 King bed, and a loft with 1 Queen bed overlooking the dining area and living area below. Suite includes 1 full bath, a full kitchen, and livingroom with a pull-out sofa. This ground floor suite has a patio with a wooded view."},
    214:{num:214,building:'Main Lodge',floor:1,type:'Loft Suite',beds:'1 King + 2 Twins in Loft',view:'Wood View',title:'One King, Two Twins Loft Suite',stairs:false,color:'#9E8AB5',desc:"This recently updated Lofted Suite has a private bedroom with 1 King bed, and a loft with 2 twin beds overlooking the dining area and living area below. This suite has 1 full bath, full kitchen, and living room with a new gas fireplace and full-size sofa sleeper. A ground floor suite, it has a patio close to parking which is convenient for guests with limited mobility, and is also close to the indoor pool and fitness room."},
    215:{num:215,building:'Main Lodge',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Wood View',title:'King Suite',stairs:false,color:'#C8A84B',desc:"Updated King Wooded View Suite with 1 private bedroom with 1 King bed, full livingroom with a sofa sleeper, dining area and full kitchen with patio which faces the parking area."},
    216:{num:216,building:'Main Lodge',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Courtyard View',title:'King Suite (2nd Floor)',stairs:true,color:'#C8A84B',desc:"One Bedroom Suite with 1 King bed in a private bedroom. Suite has a full kitchen and livingroom with a full size sofa sleeper. This 2nd floor suite has a private balcony and overlooks the courtyard and outdoor pool. Requires use of stairs."},
    217:{num:217,building:'Main Lodge',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Courtyard View',title:'King Suite (2nd Floor)',stairs:true,color:'#C8A84B',desc:"One Bedroom Suite with 1 King bed in a private bedroom. Suite has a full kitchen and livingroom with a full size sofa sleeper. This 2nd floor suite has a private balcony and overlooks the courtyard and outdoor pool. Requires use of stairs."},
    218:{num:218,building:'Main Lodge',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Courtyard View',title:'King Suite (2nd Floor)',stairs:true,color:'#C8A84B',desc:"King Suite with 1 private bedroom with 1 King bed, livingroom with sofa sleeper, dining area and full kitchen with balcony which faces the courtyard. Requires use of stairs."},
    219:{num:219,building:'Main Lodge',floor:2,type:'Stateroom',beds:'1 King + Small Sleeper',view:'Pool View',title:'King Stateroom (2nd Floor)',stairs:true,color:'#7BA7C2',desc:"Stateroom with 1 King bed, a small sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker. This 2nd floor room has a private balcony overlooking the courtyard and outdoor pool. Requires use of stairs. Includes Free WiFi, Free Parking, and is a close walk to the indoor pool."},
    220:{num:220,building:'Main Lodge',floor:2,type:'One Bedroom Suite',beds:'1 Queen + Sleeper Sofa',view:'Courtyard View',title:'Queen Suite (2nd Floor)',stairs:true,color:'#C8A84B',desc:"One Bedroom Suite with 1 Queen bed in a private bedroom. Suite has a full kitchen and livingroom with a full size sofa sleeper. This 2nd floor suite has a private balcony and overlooks the courtyard and outdoor pool. Requires use of stairs."},
    221:{num:221,building:'Main Lodge',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Courtyard View',title:'King Suite (2nd Floor)',stairs:true,color:'#C8A84B',desc:"King Suite with 1 private bedroom with 1 King bed, livingroom with sofa sleeper, dining area and full kitchen with balcony which faces the courtyard. Requires use of stairs."},
    222:{num:222,building:'Main Lodge',floor:2,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Courtyard View',title:'King Suite (2nd Floor)',stairs:true,color:'#C8A84B',desc:"King Suite with 1 private bedroom with 1 King bed, livingroom with sofa sleeper, dining area and full kitchen with balcony which faces the courtyard. Requires use of stairs."},
    223:{num:223,building:'Main Lodge',floor:2,type:'Stateroom',beds:'1 King + Small Sleeper',view:'Pool View',title:'King Stateroom (2nd Floor)',stairs:true,color:'#7BA7C2',desc:"Large Stateroom with 1 King bed, a small twin-sized sofa sleeper, sitting area, small refrigerator, microwave, and coffee maker. This 2nd floor room has a private balcony overlooking the courtyard and outdoor pool. Includes Free WiFi, Free Parking, and is a close walk to the indoor pool."},
    302:{num:302,building:'Brighton',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'King Water View Suite',stairs:false,color:'#C8A84B',desc:"One Bedroom Suite with 1 King bed in a private bedroom. Suite has a full kitchen and livingroom with a gas fireplace and full size sofa sleeper. This ground floor suite has a private patio with a beautiful view overlooking the harbor."},
    303:{num:303,building:'Brighton',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'King Water View Suite',stairs:false,color:'#C8A84B',desc:"One Bedroom Suite with 1 King bed in a private bedroom. Suite has a full kitchen and livingroom with a gas fireplace and full size sofa sleeper. This ground floor suite has a private patio with a beautiful view overlooking the harbor."},
    304:{num:304,building:'Brighton',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'King Water View Suite',stairs:false,color:'#C8A84B',desc:"One Bedroom Suite with 1 King bed in a private bedroom. Suite has a full kitchen and livingroom with a gas fireplace and full size sofa sleeper. Recently renovated bathroom has a beautiful walk-in shower and double vanity. This ground floor suite has a private patio with a beautiful view overlooking the harbor."},
    305:{num:305,building:'Brighton',floor:1,type:'One Bedroom Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'King Water View Suite',stairs:false,color:'#C8A84B',desc:"One Bedroom Suite with 1 King bed in a private bedroom. Suite has a full kitchen and livingroom with a gas fireplace and full size sofa sleeper. This ground floor suite has a private patio with a beautiful view overlooking the harbor."},
    307:{num:307,building:'Brighton',floor:2,type:'Deluxe Stateroom',beds:'1 King',view:'Water View',title:'King Fireplace Deluxe Stateroom (2nd Floor)',stairs:true,color:'#4E86A8',desc:"Deluxe Stateroom with 1 King bed, sitting area, gas fireplace, small refrigerator, microwave, and coffee maker. Has a private balcony or patio overlooking the harbor. Includes Free WiFi, Free Parking, and is a close walk to the water and heated outdoor pool."},
    308:{num:308,building:'Brighton',floor:2,type:'Loft Suite',beds:'2 Queens (Loft layout)',view:'Water View',title:'Two Queen Water View Loft Suite',stairs:true,color:'#9E8AB5',desc:"Lofted Suite with a private bedroom with 1 Queen bed and a loft with 1 Queen bed overlooking the dining area and living area below. Suites include 2 full baths, a full kitchen, and livingroom with a gas fireplace and full size sofa sleeper. This 2nd floor suite has a private balcony with a beautiful harbor view."},
    309:{num:309,building:'Brighton',floor:2,type:'Loft Suite',beds:'2 Queens (Loft layout)',view:'Water View',title:'Two Queens Water View Loft Suite',stairs:true,color:'#9E8AB5',desc:"Updated Lofted Suite with a private bedroom with 1 queen bed, and a loft with 1 queen bed overlooking the dining area and living area below. Suites include 2 full baths, a full kitchen, and livingroom with a gas fireplace and full size sofa sleeper. This 2nd floor suite has a private balcony with a beautiful harbor view."},
    310:{num:310,building:'Brighton',floor:2,type:'Loft Suite',beds:'1 King + 2 Twins in Loft',view:'Water View',title:'One King, Two Twins Water View Loft Suite',stairs:true,color:'#9E8AB5',desc:"Lofted Suite with a private bedroom with 1 King bed, and a loft with 2 Twin beds overlooking the dining area and living area below. Suite includes 2 full baths, a full kitchen, and livingroom with a gas fireplace and full size sofa sleeper. This 2nd floor suite has a private balcony with a beautiful harbor view."},
    312:{num:312,building:'Brighton',floor:1,type:'Premier Suite',beds:'1 King + Sleeper Sofa',view:'Water View',title:'Premier King Water View Suite',stairs:false,color:'#5A9E80',desc:"The Premier King Suite has a beautiful four poster King bed in a private bedroom and a fully equipped kitchen and livingroom with a double-sided gas fireplace. The large bath has a separate walk-in shower and double whirlpool. This ground floor suite has a private patio with a beautiful view overlooking the harbor."},
    314:{num:314,building:'Brighton',floor:1,type:'Two Bedroom Suite',beds:'1 King + 1 Queen + Sleeper Sofa',view:'Water View',title:'Two Bedroom Water View Suite',stairs:false,color:'#B07D3C',desc:"Two Bedroom Suite with 1 King in one bedroom and 1 Queen in the other, and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper. This ground floor suite has a private patio with a beautiful harbor view."},
    315:{num:315,building:'Brighton',floor:1,type:'Two Bedroom Suite',beds:'1 Queen + 2 Twins + Sleeper Sofa',view:'Wood View',title:'One Queen, Two Twins Two Bedroom Suite',stairs:false,color:'#B07D3C',desc:"Two Bedroom Suite with 1 Queen in one bedroom and 2 Twins in the other, and 2 full baths. Suites include a full kitchen and livingroom with a gas fireplace and full size sofa sleeper. This ground floor suite has a patio with a wooded view."},
    316:{num:316,building:'Brighton',floor:2,type:'Loft Suite',beds:'1 King + 1 Queen in Loft',view:'Water View',title:'One King, One Queen Loft Suite Water View',stairs:true,color:'#9E8AB5',desc:"Lofted Suite with a private bedroom with 1 King bed, and a loft with 1 Queen bed overlooking the dining area and living area below. Suite includes 2 full baths, a full kitchen, and livingroom with a gas fireplace and full size sofa sleeper. This 2nd floor suite has a private balcony with a beautiful harbor view."},
    317:{num:317,building:'Brighton',floor:2,type:'Loft Suite',beds:'1 King + 1 Queen in Loft',view:'Water View',title:'One King, One Queen Loft Suite Water View',stairs:true,color:'#9E8AB5',desc:"Lofted Suite with a private bedroom with 1 King bed, and a loft with 1 Queen bed overlooking the dining area and living area below. Suite includes 2 full baths, a full kitchen, and livingroom with a gas fireplace and full size sofa sleeper. This 2nd floor suite has a private balcony with a beautiful harbor view."},
    318:{num:318,building:'Brighton',floor:2,type:'Loft Suite',beds:'1 King + 2 Twins in Loft',view:'Wood View',title:'One King, Two Twin Loft Suite Two Bath',stairs:true,color:'#9E8AB5',desc:"Lofted Suite with a private bedroom with 1 King bed, and a loft with 2 twin beds overlooking the dining area and living area below. Suites include 2 full baths, a full kitchen, and livingroom with a gas fireplace and full size sofa sleeper. This 2nd floor suite has a private balcony with a wooded view."},
    401:{num:401,building:'Adriana',floor:1,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Wood View',title:'Two King, Two Bedroom Suite',stairs:false,color:'#B07D3C',desc:"Two Bedroom Suite with 1 King bed in each bedroom and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper."},
    402:{num:402,building:'Adriana',floor:1,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Wood View',title:'Two King, Two Bedroom Suite',stairs:false,color:'#B07D3C',desc:"Two Bedroom Suite with 1 King bed in each bedroom and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper."},
    403:{num:403,building:'Adriana',floor:1,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Wood View',title:'Two King, Two Bedroom Suite',stairs:false,color:'#B07D3C',desc:"Two Bedroom Suite with 1 King bed in each bedroom and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper."},
    405:{num:405,building:'Adriana',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Wood View',title:'Two King, Two Bedroom Suite (2nd Floor)',stairs:true,color:'#B07D3C',desc:"Two Bedroom Suite with 1 King bed in each bedroom and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper."},
    406:{num:406,building:'Adriana',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Wood View',title:'Two King, Two Bedroom Suite (2nd Floor)',stairs:true,color:'#B07D3C',desc:"Two Bedroom Suite with 1 King bed in each bedroom and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper."},
    407:{num:407,building:'Adriana',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Wood View',title:'Two King, Two Bedroom Suite (2nd Floor)',stairs:true,color:'#B07D3C',desc:"This is a 2nd floor room - REQUIRES STAIRS. Two Bedroom Suite with 1 King bed in each bedroom and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper."},
    408:{num:408,building:'Adriana',floor:2,type:'Two Bedroom Suite',beds:'2 Kings + Sleeper Sofa',view:'Wood View',title:'Two King, Two Bedrooms Suite (2nd Floor)',stairs:true,color:'#B07D3C',desc:"This is a 2nd floor room - REQUIRES STAIRS. Two Bedroom Suite with 1 King bed in each bedroom and 2 full baths. Suite includes a full kitchen and livingroom with a gas fireplace and full size sofa sleeper."},
  };

  const TYPE_COLORS = {
    'Stateroom':'#7BA7C2','Deluxe Stateroom':'#4E86A8','Premier Stateroom':'#2E6A9E',
    'Junior Suite':'#8AB5A0','Premier Suite':'#5A9E80','Loft Suite':'#9E8AB5',
    'One Bedroom Suite':'#C8A84B','Two Bedroom Suite':'#B07D3C',
  };

  const BUILDING_DESCS = {
    'Christianne':"The Christianne Lodge hugs the harbor's edge — the closest accommodations to the water. Most rooms face Lake Michigan directly with private patios and balconies overlooking the harbor and marina.",
    'Main Lodge':  "The heart of the resort — home to the Front Desk, lobby, indoor pool, and a diverse mix of room types including suites, loft suites, and staterooms with harbor, courtyard, and pool views.",
    'Brighton':    "The Brighton Lodge offers a quieter setting with stunning harbor and woodland views. All suites feature full kitchens, gas fireplaces, and generous living spaces. Some of the resort's most popular premier suites are here.",
    'Adriana':     "The Adriana Lodge occupies the highest point of the property. All units are spacious two-bedroom suites — ideal for families and groups — with full kitchens and gas fireplaces.",
  };
  const BUILDING_ROOMS = {
    'Christianne':'Rooms 102\u2013120','Main Lodge':'Rooms 201\u2013223',
    'Brighton':'Rooms 302\u2013318','Adriana':'Rooms 401\u2013408',
  };

  /* ── DOM ── */
  const btnSiteMap   = document.getElementById('btnSiteMap');
  const btnFloorPlans= document.getElementById('btnFloorPlans');
  const imapSite     = document.getElementById('imapSite');
  const imapFloor    = document.getElementById('imapFloor');
  const mapLegend    = document.getElementById('mapLegend');
  const panelDefault = document.getElementById('panelDefault');
  const panelBuilding= document.getElementById('panelBuilding');
  const panelDetail  = document.getElementById('panelDetail');
  const panelBuildingName  = document.getElementById('panelBuildingName');
  const panelBuildingRooms = document.getElementById('panelBuildingRooms');
  const panelBuildingDesc  = document.getElementById('panelBuildingDesc');
  const panelBuildingCounts= document.getElementById('panelBuildingCounts');
  const panelBldgToFloor   = document.getElementById('panelBldgToFloor');
  const panelBadge   = document.getElementById('panelBadge');
  const panelRoomNum = document.getElementById('panelRoomNum');
  const panelType    = document.getElementById('panelType');
  const panelPhoto   = document.getElementById('panelPhoto');
  const panelStairsWarn = document.getElementById('panelStairsWarn');
  const panelSpecs   = document.getElementById('panelSpecs');
  const roomPanel    = document.getElementById('roomPanel');

  let activeFilter   = 'all';
  let activeBuilding = null;

  /* ── MAP TOGGLE ── */
  function showSiteMap() {
    imapSite.classList.add('imap--active');
    imapFloor.classList.remove('imap--active');
    mapLegend.style.display = 'none';
    btnSiteMap.classList.add('map-toggle-btn--active');
    btnFloorPlans.classList.remove('map-toggle-btn--active');
    btnSiteMap.setAttribute('aria-pressed', 'true');
    btnFloorPlans.setAttribute('aria-pressed', 'false');
  }
  function showFloorPlans() {
    imapFloor.classList.add('imap--active');
    imapSite.classList.remove('imap--active');
    mapLegend.style.display = '';
    btnFloorPlans.classList.add('map-toggle-btn--active');
    btnSiteMap.classList.remove('map-toggle-btn--active');
    btnFloorPlans.setAttribute('aria-pressed', 'true');
    btnSiteMap.setAttribute('aria-pressed', 'false');
  }
  btnSiteMap.addEventListener('click', showSiteMap);
  btnFloorPlans.addEventListener('click', showFloorPlans);

  /* ── BUILDING HOTSPOTS (site map) ── */
  document.querySelectorAll('.imap__building').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.imap__building').forEach((b) => b.classList.remove('imap__building--active'));
      btn.classList.add('imap__building--active');
      activeBuilding = btn.dataset.building;
      showBuildingPanel(activeBuilding);
    });
  });

  /* ── ROOM HOTSPOTS (floor plan) ── */
  document.querySelectorAll('.imap__room').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.imap__room').forEach((b) => b.classList.remove('imap__room--active'));
      btn.classList.add('imap__room--active');
      showRoomPanel(parseInt(btn.dataset.room, 10));
    });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  /* ── ROOM TYPE FILTER CARDS ── */
  document.querySelectorAll('.room-type-card').forEach((card) => {
    card.addEventListener('click', () => {
      const filter = card.dataset.filter;
      activeFilter = activeFilter === filter ? 'all' : filter;
      document.querySelectorAll('.room-type-card').forEach((c) => c.classList.toggle('room-type-card--active', c.dataset.filter === activeFilter));
      showFloorPlans();
      applyFilter(activeFilter);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });

  /* ── LEGEND FILTER ── */
  document.querySelectorAll('.map-legend__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-legend__btn').forEach((b) => b.classList.remove('map-legend__btn--active'));
      btn.classList.add('map-legend__btn--active');
      activeFilter = btn.dataset.filter;
      applyFilter(activeFilter);
    });
  });

  function applyFilter(filter) {
    document.querySelectorAll('.imap__room').forEach((btn) => {
      const room = ROOMS[parseInt(btn.dataset.room, 10)];
      if (!room) return;
      let match = filter === 'all';
      if (!match) {
        if (filter === 'Stateroom') match = room.type.includes('Stateroom');
        else match = room.type === filter;
      }
      btn.style.opacity = (filter !== 'all' && !match) ? '0.2' : '';
      btn.style.pointerEvents = (filter !== 'all' && !match) ? 'none' : '';
    });
  }

  /* ── "View Floor Plan" button in building panel ── */
  panelBldgToFloor && panelBldgToFloor.addEventListener('click', showFloorPlans);

  /* ── PANELS ── */
  function showDefaultPanel() {
    panelDefault.style.display = '';
    panelBuilding.style.display = 'none';
    panelDetail.style.display = 'none';
  }

  function showBuildingPanel(building) {
    panelDefault.style.display = 'none';
    panelBuilding.style.display = '';
    panelDetail.style.display = 'none';
    panelBuildingName.textContent  = building + ' Lodge';
    panelBuildingRooms.textContent = BUILDING_ROOMS[building] || '';
    panelBuildingDesc.textContent  = BUILDING_DESCS[building] || '';
    const counts = {};
    Object.values(ROOMS).forEach((r) => {
      if (r.building === building) counts[r.type] = (counts[r.type] || 0) + 1;
    });
    panelBuildingCounts.innerHTML = Object.entries(counts).map(([type, count]) =>
      `<div class="room-panel__count-item"><span class="room-panel__count-swatch" style="background:${TYPE_COLORS[type]||'#888'}"></span><span>${count} ${type}${count>1?'s':''}</span></div>`
    ).join('');
    scrollPanelTop();
  }

  function showRoomPanel(roomNum) {
    const room = ROOMS[roomNum];
    if (!room) return;
    panelDefault.style.display = 'none';
    panelBuilding.style.display = 'none';
    panelDetail.style.display = '';
    const color = TYPE_COLORS[room.type] || '#888';
    panelBadge.textContent   = `${room.building} Lodge \u00b7 Floor ${room.floor}`;
    panelRoomNum.textContent = `Room ${room.num}`;
    panelType.textContent    = room.type;
    panelType.style.background = color;
    panelStairsWarn.style.display = room.stairs ? '' : 'none';
    // Photo slot
    const photoPath = `img/rooms/room-${roomNum}-1.jpg`;
    panelPhoto.innerHTML = `<img src="${photoPath}" alt="Room ${roomNum}" style="width:100%;aspect-ratio:16/10;object-fit:cover;display:block" onerror="this.parentElement.innerHTML='<div style=\\'width:100%;aspect-ratio:16/10;background:var(--color-warm-white);display:flex;align-items:center;justify-content:center;font-family:var(--font-ui);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:rgba(11,31,58,.25)\\'>Photo Coming Soon</div>'">`;
    panelSpecs.innerHTML = [
      room.beds   ? `<li><strong>Beds:</strong> ${room.beds}</li>` : '',
      room.view   ? `<li><strong>View:</strong> ${room.view}</li>` : '',
      `<li><strong>Floor:</strong> ${room.floor === 1 ? '1st Floor (Ground Level)' : '2nd Floor'}</li>`,
      room.desc   ? `<li style="border-top:1px solid rgba(11,31,58,.08);padding-top:10px;margin-top:4px">${room.desc}</li>` : '',
    ].join('');
    // Update Learn More link
    const learnMoreBtn = document.getElementById('panelLearnMore');
    if (learnMoreBtn) learnMoreBtn.href = `rooms/room-${roomNum}.html`;
    scrollPanelTop();
  }

  function scrollPanelTop() {
    if (roomPanel) roomPanel.scrollTop = 0;
  }

  /* ── INIT ── */
  showDefaultPanel();
  showSiteMap();

  // Apply filter from URL param e.g. rooms.html?filter=Loft+Suite
  (function () {
    const params = new URLSearchParams(window.location.search);
    const f = params.get('filter');
    if (f) {
      activeFilter = f;
      // Activate matching legend btn
      document.querySelectorAll('.map-legend__btn').forEach((btn) => {
        btn.classList.toggle('map-legend__btn--active', btn.dataset.filter === f || (f.includes('Stateroom') && btn.dataset.filter === 'Stateroom'));
      });
      // Activate matching type card
      document.querySelectorAll('.room-type-card').forEach((card) => {
        card.classList.toggle('room-type-card--active', card.dataset.filter === f);
      });
      showFloorPlans();
      applyFilter(f);
    }
  }());

}());
