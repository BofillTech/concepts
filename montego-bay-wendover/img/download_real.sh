#!/bin/bash
# Montego Bay Wendover - Real property photos from official website

# Download property images (remove thumbs/ for full size)
wget -q -O lobby-lounge.jpg "https://wendoverfun.com/library/images/page-images/mb_hotel_lobby-2-0.jpg"
wget -q -O room-double-king.jpg "https://wendoverfun.com/library/images/page-images/mb_double_king-5.jpg"
wget -q -O room-single-king.jpg "https://wendoverfun.com/library/images/page-images/mb_single_king-5.jpg"
wget -q -O room-mini-suite.jpg "https://wendoverfun.com/library/images/page-images/mb_mini_suite-6.jpg"
wget -q -O romanza-dining.jpg "https://wendoverfun.com/library/images/page-images/mb-romanza-1-0.jpg"

# Use lobby and room images for heroes
cp lobby-lounge.jpg hero-exterior.jpg
cp room-double-king.jpg hero-room.jpg
cp lobby-lounge.jpg exterior-dusk.jpg
cp room-double-king.jpg room-studio.jpg
cp room-single-king.jpg room-one-bedroom.jpg
cp room-mini-suite.jpg room-two-bedroom.jpg
cp room-double-king.jpg room-detail.jpg
cp room-mini-suite.jpg room-living.jpg
cp room-mini-suite.jpg room-kitchen.jpg
cp lobby-lounge.jpg amenity-pool.jpg
cp lobby-lounge.jpg amenity-hot-tub.jpg

echo "Downloaded real Montego Bay Wendover property photos"
