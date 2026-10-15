#!/bin/bash

# Download hero and room images from official site
curl -L -A "Mozilla/5.0" -o hero-exterior.jpg "https://www.harpoonhousehamptons.com/wp-content/uploads/2019/05/harpoon-house-amenities.jpg"
curl -L -A "Mozilla/5.0" -o room-junior-suite.jpeg "https://www.harpoonhousehamptons.com/wp-content/uploads/2025/10/deluxe-king-junior-suite.jpeg"
curl -L -A "Mozilla/5.0" -o room-king.jpeg "https://www.harpoonhousehamptons.com/wp-content/uploads/2025/10/deluxe-king-guestroom.jpeg"
curl -L -A "Mozilla/5.0" -o room-queen.jpeg "https://www.harpoonhousehamptons.com/wp-content/uploads/2025/10/superior-queen-guestroom.jpeg"

# Try to get more images from various sections
curl -L -A "Mozilla/5.0" "https://www.harpoonhousehamptons.com" 2>/dev/null | grep -oP 'https://www.harpoonhousehamptons.com/wp-content/uploads/[^"'\'']+\.(jpg|jpeg|png|webp)' | sort -u > image-urls.txt

# Download additional unique images
i=5
while read url && [ $i -le 12 ]; do
  filename="property-$i.jpg"
  echo "Downloading $url to $filename"
  curl -L -A "Mozilla/5.0" -o "$filename" "$url" && i=$((i+1))
done < image-urls.txt

rm image-urls.txt
