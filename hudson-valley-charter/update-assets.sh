#!/bin/bash
# Asset replacement script for Seth's real photos

set -e

cd /workspace/hudson-valley-charter

echo "Updating Hudson Valley Coach assets with Seth's real photos..."

# Step 1: Update logo references sitewide
# Keep using .webp/.png references but point to new coach logo
# For now, we'll copy the logo as a simple replacement
echo "→ Copying logo files..."
cp img/hudson-valley-coach-logo.jpg img/hudson-valley-coach-logo-640.jpg
cp img/hudson-valley-coach-logo.jpg img/hudson-valley-coach-logo-320.jpg  
cp img/hudson-valley-coach-logo.jpg img/hudson-valley-coach-logo-960.jpg

# Step 2: For fleet images, we'll selectively replace specific references
# We'll do this via targeted HTML updates in the main script

echo "→ Asset files prepared"
echo "→ Now updating HTML references..."

# Count files to update
LOGO_COUNT=$(grep -r "hudson-valley-charter-logo" --include="*.html" | wc -l)
echo "   Found $LOGO_COUNT logo references to update"

# We'll use sed/find for bulk updates, but carefully
# Let's update the JSON-LD schema logo references first
find . -name "index.html" -type f -exec sed -i 's|"logo": "https://hudsonvalleycharter.com/img/hudson-valley-charter-logo-640.png"|"logo": "https://hudsonvalleycharter.com/img/hudson-valley-coach-logo-640.jpg"|g' {} +

echo "→ Updated JSON-LD schema logo references"
echo "✓ Basic asset preparation complete"
echo ""
echo "Now performing targeted HTML updates for fleet photos..."
