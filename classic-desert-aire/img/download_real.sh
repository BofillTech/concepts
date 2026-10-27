#!/bin/bash
# Classic Desert Aire Hotel - Real property photos from official website

# Download property images
wget -q -O hero-exterior.jpg "https://images.squarespace-cdn.com/content/v1/65c163fd1b1d7250b58267bf/3c5f7b95-1f07-4c04-988f-d3e4a5b8c8e9/Classic-Desert-Aire-Hotel-Gallery-2.jpg"
wget -q -O room-king.jpg "https://images.squarespace-cdn.com/content/v1/65c163fd1b1d7250b58267bf/c943cd1e-c829-47ce-ad67-193dcaa3b124/IMG_3422.jpg"
wget -q -O room-double.jpg "https://images.squarespace-cdn.com/content/v1/65c163fd1b1d7250b58267bf/8e1cbc5c-450f-4a8f-8e95-03943f6d5ffd/3a5ad85270df960ed466d3c56fc45691.jpg"
wget -q -O exterior-sign.jpg "https://images.squarespace-cdn.com/content/v1/65c163fd1b1d7250b58267bf/1708610667395-CBTDHK6B8UZGL5IUHZ6Q/image-asset.jpeg"
wget -q -O lobby-lounge.jpg "https://images.squarespace-cdn.com/content/v1/65c163fd1b1d7250b58267bf/1707179833565-B1014DJ3STZHCMU47TD8/image-asset.jpeg"
wget -q -O amenity-pool.jpg "https://images.squarespace-cdn.com/content/v1/65c163fd1b1d7250b58267bf/300f735c-8560-4802-a148-e9b533102162/IMG_3463.jpg"

# Use the best images for heroes and other slots
cp hero-exterior.jpg hero-room.jpg
cp hero-exterior.jpg exterior-dusk.jpg
cp room-king.jpg room-studio.jpg
cp room-double.jpg room-one-bedroom.jpg
cp room-king.jpg room-two-bedroom.jpg
cp room-king.jpg room-detail.jpg
cp room-king.jpg room-living.jpg
cp room-double.jpg room-kitchen.jpg
cp amenity-pool.jpg amenity-hot-tub.jpg

echo "Downloaded real Classic Desert Aire Hotel property photos"
