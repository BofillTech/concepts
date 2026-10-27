#!/bin/bash
# Schooner Inn - Real property photos from official website

# Download property images
wget -q -O hero-exterior.jpg "https://schoonerinnvb.com/wp-content/uploads/sites/5/2015/08/slider-schooner1.21.jpg"
wget -q -O exterior-sign.jpg "https://schoonerinnvb.com/wp-content/uploads/sites/5/2015/08/slider-schooner1.jpg"
wget -q -O beach-view.jpg "https://schoonerinnvb.com/wp-content/uploads/sites/5/2015/08/slider-schooner-new-beach.jpg"
wget -q -O room-king.jpg "https://schoonerinnvb.com/wp-content/uploads/sites/5/2015/08/slider-schooner-new-king.jpg"
wget -q -O restaurant-food.jpg "https://schoonerinnvb.com/wp-content/uploads/sites/5/2015/08/slider-schooner-rockafellers.jpg"
wget -q -O amenity-pool.jpg "https://schoonerinnvb.com/wp-content/uploads/sites/5/2015/08/slider-schooner3.jpg"
wget -q -O room-balcony.jpg "https://schoonerinnvb.com/wp-content/uploads/sites/5/2015/08/slider-schooner-new-champange.jpg"
wget -q -O lobby-lounge.jpg "https://schoonerinnvb.com/wp-content/uploads/sites/5/2015/08/slider-schooner41.jpg"

# Use for heroes and other slots
cp hero-exterior.jpg hero-room.jpg
cp hero-exterior.jpg exterior-dusk.jpg
cp room-king.jpg room-studio.jpg
cp room-king.jpg room-one-bedroom.jpg
cp room-balcony.jpg room-two-bedroom.jpg
cp room-king.jpg room-detail.jpg
cp lobby-lounge.jpg room-living.jpg
cp room-balcony.jpg room-kitchen.jpg
cp amenity-pool.jpg amenity-hot-tub.jpg

echo "Downloaded real Schooner Inn property photos"
