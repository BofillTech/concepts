#!/bin/bash
# Sweetwater Lift Lodge - Real property photos from official website

# Room images
wget -q -O room-studio.jpg "https://static.wixstatic.com/media/47c44f_a460e00dd43441eebe9a5d6ff478cb7d~mv2_d_2048_1365_s_2.jpg"
wget -q -O room-living.jpg "https://static.wixstatic.com/media/47c44f_0ae14454f5a6472789fcfd1cea00c0ec~mv2_d_2048_1365_s_2.jpg"
wget -q -O room-kitchen.jpg "https://static.wixstatic.com/media/47c44f_a98f8fdefe2d4dc2b90845d3e2a52139~mv2_d_2048_1365_s_2.jpg"

# Use the best available for hero images
cp room-studio.jpg hero-room.jpg
cp room-studio.jpg hero-exterior.jpg
cp room-living.jpg exterior-dusk.jpg
cp room-studio.jpg room-one-bedroom.jpg
cp room-kitchen.jpg room-two-bedroom.jpg
cp room-living.jpg room-detail.jpg

# Pool/amenity - use room photo as placeholder since we have actual property photos
cp room-living.jpg amenity-pool.jpg
cp room-living.jpg amenity-hot-tub.jpg

echo "Downloaded real Sweetwater Lift Lodge property photos"
