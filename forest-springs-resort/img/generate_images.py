#!/usr/bin/env python3
"""Generate placeholder images for Forest Springs Resort concept"""

from PIL import Image, ImageDraw, ImageFont
import os

# Color palette for Forest Springs (Ozark pine, sauna cedar, spring mist, parchment cream)
colors = {
    'pine': '#2a3f2f',
    'pine_light': '#4a6b4a',
    'cedar': '#8b6f47',
    'cedar_light': '#c9a875',
    'mist': '#9cc5c5',
    'mist_dark': '#6b8e8e',
    'cream': '#f5f3ef',
    'ink': '#1a1a1a',
}

images_to_create = [
    # (filename, size, gradient_colors, text, text_color)
    ('hero-1.jpg', (1920, 1200), [colors['pine'], colors['pine_light']], 'FOREST EXTERIOR', colors['cream']),
    ('hero-2.jpg', (1920, 1200), [colors['pine_light'], colors['pine']], 'FOREST VIEW', colors['cream']),
    ('sauna-1.jpg', (1600, 1200), [colors['cedar_light'], colors['cedar']], 'NORDIC SAUNA', colors['ink']),
    ('wellness-1.jpg', (1600, 1200), [colors['cedar'], colors['cedar_light']], 'WELLNESS DECK', colors['cream']),
    ('pool-1.jpg', (1600, 1200), [colors['mist_dark'], colors['mist']], 'FOREST POOL', colors['ink']),
    ('room-suite.jpg', (1600, 1200), [colors['cedar'], '#a89078'], 'KING SUITE', colors['cream']),
    ('room-king.jpg', (1600, 1200), ['#9a8972', '#b5a896'], 'KING ROOM', colors['ink']),
    ('room-queen.jpg', (1600, 1200), ['#8f8170', '#aca393'], 'DOUBLE QUEEN', colors['ink']),
    ('lounge-1.jpg', (1600, 1200), [colors['cedar'], '#4a3625'], 'FOREST LOUNGE', colors['cream']),
    ('firepit-1.jpg', (1600, 1200), ['#5a3e2b', colors['cedar']], 'FIRE PIT', colors['cream']),
    ('trails-1.jpg', (1600, 1200), [colors['pine_light'], '#6b8e6b'], 'FOREST TRAILS', colors['cream']),
    ('pets-1.jpg', (1600, 1200), ['#6b8e6b', '#9cb89c'], 'PET FRIENDLY', colors['ink']),
]

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_gradient_image(size, color1, color2, text='', text_color='#000000'):
    """Create an image with a vertical gradient"""
    width, height = size
    img = Image.new('RGB', size)
    draw = ImageDraw.Draw(img)
    
    rgb1 = hex_to_rgb(color1)
    rgb2 = hex_to_rgb(color2)
    
    # Create gradient
    for y in range(height):
        ratio = y / height
        r = int(rgb1[0] * (1 - ratio) + rgb2[0] * ratio)
        g = int(rgb1[1] * (1 - ratio) + rgb2[1] * ratio)
        b = int(rgb1[2] * (1 - ratio) + rgb2[2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Add text label
    if text:
        try:
            font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 72)
        except:
            font = ImageFont.load_default()
        
        # Get text bounding box
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        # Center text
        x = (width - text_width) // 2
        y = (height - text_height) // 2
        
        text_rgb = hex_to_rgb(text_color)
        draw.text((x, y), text, fill=text_rgb, font=font)
    
    return img

# Create all images
for filename, size, gradient, text, text_color in images_to_create:
    img = create_gradient_image(size, gradient[0], gradient[1], text, text_color)
    img.save(filename, 'JPEG', quality=90)
    print(f"Created {filename} ({size[0]}x{size[1]})")

print(f"\nTotal: {len(images_to_create)} images created")
