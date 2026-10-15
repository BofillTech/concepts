#!/bin/bash

# Official site images
curl -s -o "01-exterior-lodge.jpg" "https://www.elktracebedandbreakfast.com/uploads/1/4/1/0/141053655/elk-trace-036-126124441-std_orig.jpg"
curl -s -o "02-sign.jpg" "https://www.elktracebedandbreakfast.com/uploads/1/4/1/0/141053655/elktracesign_orig.jpg"
curl -s -o "03-exterior-ranch.jpg" "https://www.elktracebedandbreakfast.com/uploads/1/4/1/0/141053655/polish-20220309-141706968_orig.jpg"

# Find more images from the site
curl -s "https://www.elktracebedandbreakfast.com/book-a-room.html" | grep -oP 'src="[^"]*\.(jpg|jpeg|png|JPG|JPEG|PNG)"' | grep -oP '"[^"]*"' | tr -d '"' | while read url; do
    if [[ $url == http* ]]; then
        echo "$url"
    else
        echo "https://www.elktracebedandbreakfast.com$url"
    fi
done > room-urls.txt

# Download room images
i=4
while read url && [ $i -le 12 ]; do
    curl -s -o "$(printf '%02d' $i)-room-$(basename "$url")" "$url"
    i=$((i+1))
done < room-urls.txt

# Check what we got
ls -lh *.jpg 2>/dev/null | wc -l
