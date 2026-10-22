#!/usr/bin/env python3
"""
Generate before/after comparison images for website redesigns.
Usage: python3 before_after.py <slug> <current_url>
"""

import sys
import time
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout


def screenshot_site(url, output_path, hide_css="", wait_time=7):
    """Take a screenshot of a website."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 860})
        page = context.new_page()
        
        try:
            # Navigate with timeout
            page.goto(url, wait_until="domcontentloaded", timeout=45000)
            
            # Inject CSS to hide elements if needed
            if hide_css:
                page.add_style_tag(content=hide_css)
            
            # Hide common cookie banners
            cookie_selectors = [
                '.cookie-banner', '#cookie-banner', '[class*="cookie"]',
                '.gdpr-banner', '#gdpr-banner', '[class*="gdpr"]',
                '.cc-banner', '#cookieConsent', '.cookie-notice'
            ]
            for selector in cookie_selectors:
                try:
                    page.evaluate(f'''
                        document.querySelectorAll("{selector}").forEach(el => {{
                            if (el.textContent.toLowerCase().includes("cookie") || 
                                el.textContent.toLowerCase().includes("gdpr")) {{
                                el.style.display = "none";
                            }}
                        }});
                    ''')
                except:
                    pass
            
            # Wait for images and animations
            time.sleep(wait_time)
            
            # Check if page is mostly blank/white
            is_blank = page.evaluate('''() => {
                const body = document.body;
                const text = body.innerText.trim();
                return text.length < 100;
            }''')
            
            if is_blank:
                # Try scrolling and waiting longer
                page.evaluate('window.scrollTo(0, 500);')
                time.sleep(2)
                page.evaluate('window.scrollTo(0, 0);')
                time.sleep(2)
            
            # Take screenshot
            page.screenshot(path=output_path, full_page=False)
            
        except PlaywrightTimeout as e:
            print(f"Timeout loading {url}: {e}", file=sys.stderr)
            raise
        except Exception as e:
            print(f"Error screenshotting {url}: {e}", file=sys.stderr)
            raise
        finally:
            browser.close()


def compose_image(before_path, after_path, output_path):
    """Compose before/after comparison image at 2x resolution."""
    # Work at 2x for crispness: 2400px wide
    W = 2400
    pad = 48
    top = 140
    cw = (W - pad * 3) // 2
    ch = int(cw * 800 / 1280)
    H = top + ch + 60 + 112 + 56
    
    img = Image.new("RGB", (W, H), "#f4f1ea")
    d = ImageDraw.Draw(img)
    
    f = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 52)
    
    for i, (p, label, col) in enumerate([
        (before_path, "YOUR SITE TODAY", "#8a8a8a"),
        (after_path, "YOUR NEW SITE", "#1f5c3a")
    ]):
        x = pad + i * (cw + pad)
        s = Image.open(p).convert("RGB").crop((0, 0, 1280, 800)).resize((cw, ch), Image.LANCZOS)
        d.text((x, top - 88), label, font=f, fill=col)
        img.paste(s, (x, top))
        d.rectangle([x - 2, top - 2, x + cw + 1, top + ch + 1], outline="#cccccc", width=2)
    
    y = top + ch + 60
    f2 = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 48)
    t = "Click to see your full redesigned homepage, live"
    w = d.textlength(t, font=f2)
    bw = w + 120
    d.rounded_rectangle([(W - bw) / 2, y, (W + bw) / 2, y + 112], 24, fill="#1f5c3a")
    d.text(((W - w) / 2, y + 28), t, font=f2, fill="white")
    
    img.save(output_path, optimize=True)


def main():
    if len(sys.argv) != 3:
        print("Usage: python3 before_after.py <slug> <current_url>", file=sys.stderr)
        sys.exit(1)
    
    slug = sys.argv[1]
    current_url = sys.argv[2]
    concept_url = f"https://bofilltech.github.io/concepts/{slug}/"
    
    # Create temp directory
    temp_dir = Path("/tmp/before_after")
    temp_dir.mkdir(exist_ok=True)
    
    before_temp = temp_dir / f"{slug}_before.png"
    after_temp = temp_dir / f"{slug}_after.png"
    
    print(f"Screenshotting current site: {current_url}")
    try:
        screenshot_site(current_url, before_temp)
    except Exception as e:
        print(f"FAILED: Could not screenshot current site", file=sys.stderr)
        sys.exit(1)
    
    print(f"Screenshotting concept site: {concept_url}")
    try:
        screenshot_site(
            concept_url,
            after_temp,
            hide_css=""  # Keep booking bar visible
        )
    except Exception as e:
        print(f"FAILED: Could not screenshot concept site", file=sys.stderr)
        sys.exit(1)
    
    # Output path
    output_path = Path(slug) / "before-after.png"
    output_path.parent.mkdir(exist_ok=True)
    
    print(f"Composing comparison image: {output_path}")
    compose_image(before_temp, after_temp, output_path)
    
    print(f"SUCCESS: {output_path}")


if __name__ == "__main__":
    main()
