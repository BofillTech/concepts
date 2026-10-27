#!/bin/bash
# Isla Grand Beach Resort - Download property photos from official website

# Download all the images currently hotlinked
wget -q -O hero.jpg "https://islagrand.com/wp-content/uploads/2023/02/homepage-headerv1.jpg"
wget -q -O exterior-facade.jpg "https://islagrand.com/wp-content/uploads/2024/01/Isla-Grand-Exterior-Facade-scaled.jpg"
wget -q -O room-ocean.jpg "https://islagrand.com/wp-content/uploads/2023/02/Partial-Ocean-View-Double-870x580.jpg"
wget -q -O room-pool-view.jpg "https://islagrand.com/wp-content/uploads/2023/02/Double-Pool-View-870x580.jpg"
wget -q -O room-condo.jpg "https://islagrand.com/wp-content/uploads/2023/02/High-Rise-2BR-Condo-870x580.jpg"
wget -q -O room-king.jpg "https://islagrand.com/wp-content/uploads/2023/02/Cabana-King-Bed-870x580.jpg"
wget -q -O windjammers.jpg "https://islagrand.com/wp-content/uploads/2023/02/Windjammers-patio-870x580.jpg"
wget -q -O whiskey-shack.jpg "https://islagrand.com/wp-content/uploads/2023/02/whiskey-shack-870x580.jpg"
wget -q -O quarterdeck.jpg "https://islagrand.com/wp-content/uploads/2023/02/quarterdeck-870x580.jpg"

echo "Downloaded Isla Grand Beach Resort property photos"
