#!/usr/bin/env python3
"""
Screenshot tool for hotel concept pages
Captures both preview.png (1200x750 top of page with booking bar visible)
and before-after.png (side-by-side comparison)
"""
import sys
import os
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image

def capture_concept_preview(hotel_slug, output_path):
    """Capture the top of the concept page including booking bar"""
    base_url = f"file://{Path('/workspace').absolute()}/{hotel_slug}/index.html"
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1200, 'height': 750})
        
        page.goto(base_url, wait_until='networkidle')
        page.wait_for_timeout(1000)
        
        # Scroll to ensure booking bar is visible
        page.evaluate("window.scrollTo(0, document.querySelector('.hero, .masthead, .hero-section, .hero-area, .hero-block')?.offsetHeight - window.innerHeight + 100 || 500)")
        page.wait_for_timeout(500)
        
        page.screenshot(path=output_path, full_page=False)
        browser.close()
        
    print(f"✓ Captured preview: {output_path}")

def capture_real_site(url, output_path):
    """Capture screenshot of the real hotel site"""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1200, 'height': 750})
        
        try:
            page.goto(url, wait_until='networkidle', timeout=15000)
            page.wait_for_timeout(1000)
            page.screenshot(path=output_path, full_page=False)
            browser.close()
            print(f"✓ Captured real site: {url}")
            return True
        except Exception as e:
            print(f"✗ Failed to capture {url}: {e}")
            browser.close()
            return False

def create_before_after(hotel_slug, real_url, output_path):
    """Create side-by-side before/after comparison"""
    temp_real = f"/tmp/{hotel_slug}_real.png"
    temp_concept = f"/tmp/{hotel_slug}_concept.png"
    
    # Capture both screenshots
    if not capture_real_site(real_url, temp_real):
        print(f"⚠ Skipping before-after for {hotel_slug} - couldn't capture real site")
        return
    
    base_url = f"file://{Path('/workspace').absolute()}/{hotel_slug}/index.html"
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1200, 'height': 750})
        page.goto(base_url, wait_until='networkidle')
        page.wait_for_timeout(1000)
        
        # Show booking bar in concept screenshot
        page.evaluate("window.scrollTo(0, document.querySelector('.hero, .masthead, .hero-section, .hero-area, .hero-block')?.offsetHeight - window.innerHeight + 100 || 500)")
        page.wait_for_timeout(500)
        
        page.screenshot(path=temp_concept, full_page=False)
        browser.close()
    
    # Create side-by-side image
    real_img = Image.open(temp_real).convert('RGB')
    concept_img = Image.open(temp_concept).convert('RGB')
    
    # Resize to same height if needed
    height = min(real_img.height, concept_img.height, 750)
    real_img = real_img.crop((0, 0, real_img.width, height))
    concept_img = concept_img.crop((0, 0, concept_img.width, height))
    
    # Create combined image
    total_width = real_img.width + concept_img.width
    combined = Image.new('RGB', (total_width, height))
    combined.paste(real_img, (0, 0))
    combined.paste(concept_img, (real_img.width, 0))
    
    combined.save(output_path, 'PNG', optimize=True)
    
    # Cleanup
    os.remove(temp_real)
    os.remove(temp_concept)
    
    print(f"✓ Created before-after: {output_path}")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python screenshot.py <hotel-slug> [real-url]")
        sys.exit(1)
    
    hotel_slug = sys.argv[1]
    real_url = sys.argv[2] if len(sys.argv) > 2 else None
    
    hotel_dir = Path(f"/workspace/{hotel_slug}")
    if not hotel_dir.exists():
        print(f"Error: {hotel_dir} does not exist")
        sys.exit(1)
    
    # Capture preview
    preview_path = hotel_dir / "preview.png"
    capture_concept_preview(hotel_slug, str(preview_path))
    
    # Create before-after if URL provided
    if real_url:
        before_after_path = hotel_dir / "before-after.png"
        create_before_after(hotel_slug, real_url, str(before_after_path))
