#!/bin/bash
# Download property images from official site

# Exterior/Building
curl -s -o "exterior-main.jpg" "https://mountainviewlodgemontana.com/wp-content/uploads/2019/08/Mountainview-Lodge-and-Suites-Bozeman-Montana.jpg"

# Room photos
curl -s -o "room-1.jpg" "https://mountainviewlodgemontana.com/wp-content/uploads/2019/08/Saul-Creative-Mountainview-Lodge-and-Suites-0110.jpg"
curl -s -o "room-2.jpg" "https://mountainviewlodgemontana.com/wp-content/uploads/2019/08/Saul-Creative-Mountainview-Lodge-and-Suites-0122.jpg"
curl -s -o "room-3.jpg" "https://mountainviewlodgemontana.com/wp-content/uploads/2019/08/Saul-Creative-Mountainview-Lodge-and-Suites-7610.jpg"
curl -s -o "room-4.jpg" "https://mountainviewlodgemontana.com/wp-content/uploads/2019/08/Saul-Creative-Mountainview-Lodge-and-Suites-7616.jpg"
curl -s -o "room-5.jpg" "https://mountainviewlodgemontana.com/wp-content/uploads/2019/08/Saul-Creative-Mountainview-Lodge-and-Suites-7648.jpg"

# Pool/Amenities
curl -s -o "pool-1.jpg" "https://mountainviewlodgemontana.com/wp-content/uploads/2019/08/Saul-Creative-Mountainview-Lodge-and-Suites-7668.jpg"
curl -s -o "breakfast.jpg" "https://mountainviewlodgemontana.com/wp-content/uploads/2019/08/Saul-Creative-Mountainview-Lodge-and-Suites-7691.jpg"

# Additional rooms/suites
curl -s -o "suite-1.jpg" "https://mountainviewlodgemontana.com/wp-content/uploads/2019/08/Saul-Creative-Mountainview-Lodge-and-Suites-7694.jpg"
curl -s -o "suite-2.jpg" "https://mountainviewlodgemontana.com/wp-content/uploads/2019/08/Saul-Creative-Mountainview-Lodge-and-Suites-7699.jpg"

echo "Downloaded 10 images"
