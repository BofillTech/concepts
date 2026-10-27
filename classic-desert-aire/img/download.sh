#!/bin/bash
# Try to download real images from hotels.com/tripadvisor/public sources
curl -L -s -o "hero-exterior.jpg" "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/4e/f7/25/exterior.jpg?w=1200&h=-1&s=1" || echo "Failed hero-exterior"
curl -L -s -o "hero-room.jpg" "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/4e/f7/1d/guest-room.jpg?w=1200&h=-1&s=1" || echo "Failed hero-room"
curl -L -s -o "room-king.jpg" "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/4e/f7/1d/guest-room.jpg?w=1000&h=-1&s=1" || echo "Failed"
curl -L -s -o "cafe-interior.jpg" "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/4e/f7/22/the-classic-cafe.jpg?w=1000&h=-1&s=1" || echo "Failed"
echo "Classic Desert Aire images attempted"
