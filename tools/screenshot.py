#!/usr/bin/env python3
"""
Generate preview screenshot for concept sites.
Usage: python3 screenshot.py <slug>
"""

import sys
import time
from pathlib import Path
from playwright.sync_api import sync_playwright


def screenshot_concept(slug, output_path):
    """Take a 1200x750 screenshot of a concept site with booking bar visible."""
    url = f"https://bofilltech.github.io/concepts/{slug}/"
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1200, "height": 750})
        page = context.new_page()
        
        try:
            print(f"Loading {url}")
            page.goto(url, wait_until="domcontentloaded", timeout=45000)
            
            # Wait for images and initial render
            time.sleep(5)
            
            # Scroll to ensure booking bar is visible (it's fixed at bottom)
            page.evaluate('window.scrollTo(0, 0);')
            time.sleep(1)
            
            # Take screenshot at exact viewport size
            page.screenshot(path=output_path, full_page=False)
            print(f"Screenshot saved to {output_path}")
            
        except Exception as e:
            print(f"Error screenshotting {url}: {e}", file=sys.stderr)
            raise
        finally:
            browser.close()


def main():
    if len(sys.argv) != 2:
        print("Usage: python3 screenshot.py <slug>", file=sys.stderr)
        sys.exit(1)
    
    slug = sys.argv[1]
    output_path = Path(slug) / "preview.png"
    output_path.parent.mkdir(exist_ok=True)
    
    screenshot_concept(slug, output_path)
    print(f"SUCCESS: {output_path}")


if __name__ == "__main__":
    main()
