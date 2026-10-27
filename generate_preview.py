#!/usr/bin/env python3
"""
Generate preview.png files for hotel concepts
Creates 1200x750 preview images with hotel branding
"""
import os
from PIL import Image, ImageDraw, ImageFont
import requests
from io import BytesIO

# Hotel configurations
HOTELS = {
    'boulder-dam-hotel': {
        'name': 'Boulder Dam Hotel',
        'tagline': 'Historic Boulder City Hotel',
        'bg_color': '#2c3e50',
        'text_color': '#ffffff',
        'hero_url': None  # Will try to find local images
    },
    'the-lodge-at-riverside': {
        'name': 'The Lodge at Riverside',
        'tagline': 'Riverside Retreat',
        'bg_color': '#3d5a4c',
        'text_color': '#ffffff',
        'hero_url': None
    },
    'isla-grand': {
        'name': 'Isla Grand Beach Resort',
        'tagline': 'South Padre Island Beachfront',
        'bg_color': '#1565a6',
        'text_color': '#ffffff',
        'hero_url': 'https://islagrand.com/wp-content/uploads/2023/02/homepage-headerv1.jpg'
    },
    'avondale-by-the-sea': {
        'name': 'Avondale by the Sea',
        'tagline': 'Cape May Beachfront',
        'bg_color': '#2c5d87',
        'text_color': '#ffffff',
        'hero_url': 'https://avondalebythesea.com/wp-content/uploads/2020/04/cropped-avondale.jpg'
    },
    'windward-passage': {
        'name': 'Windward Passage Resort',
        'tagline': 'Fort Myers Beach Paradise',
        'bg_color': '#3a6ea5',
        'text_color': '#ffffff',
        'hero_url': None
    },
    'adventure-suites': {
        'name': 'Adventure Suites',
        'tagline': 'Themed Boutique Hotel',
        'bg_color': '#8b4513',
        'text_color': '#ffffff',
        'hero_url': 'https://www.adventuresuites.com//images22/social-logo.jpg'
    },
    'wharf-masters-inn': {
        'name': "Wharf Master's Inn",
        'tagline': 'Point Arena Oceanfront',
        'bg_color': '#4a7c8f',
        'text_color': '#ffffff',
        'hero_url': None
    }
}

def create_preview(hotel_slug, config):
    """Create a preview image for a hotel"""
    width, height = 1200, 750
    
    # Create base image
    img = Image.new('RGB', (width, height), color=config['bg_color'])
    
    # Try to load hero image if URL provided
    hero_img = None
    if config['hero_url']:
        try:
            response = requests.get(config['hero_url'], timeout=10)
            if response.status_code == 200:
                hero_img = Image.open(BytesIO(response.content))
        except Exception as e:
            print(f"  Could not load hero image for {hotel_slug}: {e}")
    
    # If we have a hero image, use it as background
    if hero_img:
        # Resize to cover the canvas
        img_ratio = hero_img.width / hero_img.height
        canvas_ratio = width / height
        
        if img_ratio > canvas_ratio:
            # Image is wider, fit to height
            new_height = height
            new_width = int(height * img_ratio)
        else:
            # Image is taller, fit to width
            new_width = width
            new_height = int(width / img_ratio)
        
        hero_img = hero_img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Center crop
        left = (new_width - width) // 2
        top = (new_height - height) // 2
        hero_img = hero_img.crop((left, top, left + width, top + height))
        
        # Paste onto base image
        img = hero_img
        
        # Add dark overlay for text readability
        overlay = Image.new('RGBA', (width, height), (0, 0, 0, 120))
        img = img.convert('RGBA')
        img = Image.alpha_composite(img, overlay)
        img = img.convert('RGB')
    
    # Add text overlay
    draw = ImageDraw.Draw(img)
    
    # Try to use a nice font, fall back to default
    try:
        title_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 72)
        tagline_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 36)
    except:
        title_font = ImageFont.load_default()
        tagline_font = ImageFont.load_default()
    
    # Draw hotel name
    title_bbox = draw.textbbox((0, 0), config['name'], font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_height = title_bbox[3] - title_bbox[1]
    title_x = (width - title_width) // 2
    title_y = height // 2 - 80
    
    # Add text shadow
    draw.text((title_x + 3, title_y + 3), config['name'], font=title_font, fill=(0, 0, 0, 200))
    draw.text((title_x, title_y), config['name'], font=title_font, fill=config['text_color'])
    
    # Draw tagline
    tagline_bbox = draw.textbbox((0, 0), config['tagline'], font=tagline_font)
    tagline_width = tagline_bbox[2] - tagline_bbox[0]
    tagline_x = (width - tagline_width) // 2
    tagline_y = title_y + title_height + 20
    
    draw.text((tagline_x + 2, tagline_y + 2), config['tagline'], font=tagline_font, fill=(0, 0, 0, 200))
    draw.text((tagline_x, tagline_y), config['tagline'], font=tagline_font, fill=config['text_color'])
    
    # Add "Homepage Concept" label at bottom
    label = "Homepage Concept Preview"
    try:
        label_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 24)
    except:
        label_font = ImageFont.load_default()
    
    label_bbox = draw.textbbox((0, 0), label, font=label_font)
    label_width = label_bbox[2] - label_bbox[0]
    label_x = (width - label_width) // 2
    label_y = height - 60
    
    draw.text((label_x + 1, label_y + 1), label, font=label_font, fill=(0, 0, 0, 180))
    draw.text((label_x, label_y), label, font=label_font, fill=(255, 255, 255, 220))
    
    # Save the image
    output_path = f'{hotel_slug}/preview.png'
    img.save(output_path, 'PNG', optimize=True)
    
    return output_path

def main():
    """Generate all preview images"""
    print("Generating preview images...")
    
    for hotel_slug, config in HOTELS.items():
        if not os.path.exists(hotel_slug):
            print(f"⚠️  Skipping {hotel_slug} - folder not found")
            continue
        
        print(f"Creating preview for {config['name']}...")
        output_path = create_preview(hotel_slug, config)
        file_size = os.path.getsize(output_path)
        print(f"  ✓ Created {output_path} ({file_size:,} bytes)")
    
    print("\n✅ All preview images generated!")

if __name__ == '__main__':
    main()
