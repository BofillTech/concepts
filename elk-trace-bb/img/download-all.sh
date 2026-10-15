#!/bin/bash
set -e

# Download images from official site
curl -s -L -o "01-exterior-main.jpg" "https://www.elktracebedandbreakfast.com/uploads/1/4/1/0/141053655/elk-trace-036-126124441-std_orig.jpg"
curl -s -L -o "02-sign-entrance.jpg" "https://www.elktracebedandbreakfast.com/uploads/1/4/1/0/141053655/elktracesign_orig.jpg"
curl -s -L -o "03-ranch-view.jpg" "https://www.elktracebedandbreakfast.com/uploads/1/4/1/0/141053655/polish-20220309-141706968_orig.jpg"
curl -s -L -o "04-wedding-setup.jpg" "https://www.elktracebedandbreakfast.com/uploads/1/4/1/0/141053655/wedding.jpg"
curl -s -L -o "05-sleigh-ride.jpg" "https://www.elktracebedandbreakfast.com/uploads/1/4/1/0/141053655/sleigh10.jpg"
curl -s -L -o "06-interior-room.jpg" "https://www.elktracebedandbreakfast.com/uploads/1/4/1/0/141053655/img-0401.jpeg"
curl -s -L -o "07-exterior-winter.jpg" "https://www.elktracebedandbreakfast.com/uploads/1/4/1/0/141053655/polish-20220309-152128664.jpg"
curl -s -L -o "08-deck-view.jpg" "https://www.elktracebedandbreakfast.com/uploads/1/4/1/0/141053655/img-20220627-105509-1.jpg"
curl -s -L -o "09-mountain-view.jpg" "https://www.elktracebedandbreakfast.com/uploads/1/4/1/0/141053655/img-20220627-105544.jpg"
curl -s -L -o "10-hero-bg.jpg" "https://www.elktracebedandbreakfast.com/uploads/1/4/1/0/141053655/background-images/1226630583.jpg"

# Count successful downloads
ls -1 *.jpg *.jpeg 2>/dev/null | wc -l
ls -lh *.jpg *.jpeg 2>/dev/null | tail -10
