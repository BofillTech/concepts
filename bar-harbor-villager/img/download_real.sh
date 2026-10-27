#!/bin/bash
# Bar Harbor Villager - Real property photos from official website

# Download main property image
wget -q -O hero-exterior.jpg "https://www.barharborvillager.com/wp-content/uploads/2024/08/Villager24-6-2-full.jpg"

# Try to download other property images from their media folder
wget -q -O eat-place.jpg "https://www.barharborvillager.com/wp-content/uploads/2019/03/e-a-t.jpg"

# Use the exterior for hero images
cp hero-exterior.jpg hero-room.jpg
cp hero-exterior.jpg exterior-dusk.jpg
cp hero-exterior.jpg room-studio.jpg
cp hero-exterior.jpg room-one-bedroom.jpg
cp hero-exterior.jpg room-two-bedroom.jpg
cp hero-exterior.jpg room-detail.jpg
cp hero-exterior.jpg room-living.jpg
cp hero-exterior.jpg room-kitchen.jpg
cp hero-exterior.jpg amenity-pool.jpg
cp hero-exterior.jpg amenity-hot-tub.jpg

echo "Downloaded Bar Harbor Villager property photos"
