#!/usr/bin/env python3
"""
Check which image files are referenced in HTML files.
This script properly handles root-relative paths like /img/... in the quillstay/ folder.

Usage:
    python check_referenced_images.py [--unreferenced]
    
    --unreferenced: List files that appear to be unreferenced (conservative check)
"""

import os
import re
import sys
from pathlib import Path
from typing import Set, Dict, List

REPO_ROOT = Path(__file__).parent.parent.parent
SITE_ROOTS = {
    'quillstay': REPO_ROOT / 'quillstay',
}


def find_html_files(directory: Path) -> List[Path]:
    """Find all HTML files in a directory recursively."""
    html_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.html', '.htm')):
                html_files.append(Path(root) / file)
    return html_files


def find_all_image_files(directory: Path) -> Set[Path]:
    """Find all image files in img/ subdirectories."""
    image_files = set()
    for root, _, files in os.walk(directory):
        # Only consider files in img/ directories
        if '/img/' in str(root) or root.endswith('/img'):
            for file in files:
                if file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico')):
                    image_files.add(Path(root) / file)
    return image_files


def extract_image_references(html_file: Path, site_root: Path) -> Set[Path]:
    """
    Extract all image references from an HTML file.
    Handles:
    - Relative paths: img/logo.png
    - Root-relative paths: /img/logo.png (resolved against site_root)
    - Absolute paths: https://... (ignored)
    """
    try:
        content = html_file.read_text(encoding='utf-8')
    except Exception as e:
        print(f"Warning: Could not read {html_file}: {e}", file=sys.stderr)
        return set()
    
    referenced = set()
    
    # Match src="..." and href="..." attributes
    # Pattern captures: src="/img/logo.png" or href="img/style.css"
    patterns = [
        r'(?:src|href)\s*=\s*["\']([^"\']+)["\']',
        r'url\(["\']?([^)"\']+)["\']?\)',  # CSS url()
    ]
    
    for pattern in patterns:
        for match in re.finditer(pattern, content, re.IGNORECASE):
            path = match.group(1)
            
            # Skip absolute URLs
            if path.startswith(('http://', 'https://', '//', 'data:')):
                continue
            
            # Skip mailto: and tel: links
            if path.startswith(('mailto:', 'tel:', '#')):
                continue
            
            # Skip non-image extensions for src/href (but keep all url() matches)
            if 'url(' not in pattern:
                ext = Path(path).suffix.lower()
                if ext not in {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico'}:
                    continue
            
            # Handle root-relative paths (e.g., /img/logo.png)
            if path.startswith('/'):
                # Resolve against the site root
                resolved = site_root / path.lstrip('/')
                if resolved.exists():
                    referenced.add(resolved.resolve())
            else:
                # Handle relative paths (e.g., ../img/logo.png or img/logo.png)
                resolved = (html_file.parent / path).resolve()
                if resolved.exists() and resolved.is_relative_to(REPO_ROOT):
                    referenced.add(resolved)
    
    return referenced


def check_references_in_site(site_name: str, site_root: Path) -> Dict[str, Set[Path]]:
    """
    Check which images are referenced in a site.
    Returns a dict with 'referenced' and 'unreferenced' sets.
    """
    print(f"\n{'='*60}")
    print(f"Checking {site_name}/ site")
    print(f"{'='*60}")
    
    # Find all HTML files
    html_files = find_html_files(site_root)
    print(f"Found {len(html_files)} HTML files")
    
    # Find all image files
    image_files = find_all_image_files(site_root)
    print(f"Found {len(image_files)} image files")
    
    # Extract all references
    all_referenced = set()
    for html_file in html_files:
        refs = extract_image_references(html_file, site_root)
        all_referenced.update(refs)
    
    print(f"Found {len(all_referenced)} referenced images")
    
    # Find unreferenced images
    unreferenced = image_files - all_referenced
    
    if unreferenced:
        print(f"\n⚠️  {len(unreferenced)} images appear unreferenced:")
        for img in sorted(unreferenced):
            rel_path = img.relative_to(REPO_ROOT)
            print(f"  - {rel_path}")
    else:
        print("✓ All images are referenced")
    
    return {
        'referenced': all_referenced,
        'unreferenced': unreferenced,
        'all_images': image_files,
    }


def main():
    """Main entry point."""
    show_unreferenced = '--unreferenced' in sys.argv
    
    print("Image Reference Checker")
    print(f"Repository root: {REPO_ROOT}")
    
    all_results = {}
    
    # Check each site with its own root
    for site_name, site_root in SITE_ROOTS.items():
        if site_root.exists():
            results = check_references_in_site(site_name, site_root)
            all_results[site_name] = results
        else:
            print(f"\n⚠️  Site root not found: {site_root}")
    
    # Summary
    print(f"\n{'='*60}")
    print("Summary")
    print(f"{'='*60}")
    
    total_images = sum(len(r['all_images']) for r in all_results.values())
    total_referenced = sum(len(r['referenced']) for r in all_results.values())
    total_unreferenced = sum(len(r['unreferenced']) for r in all_results.values())
    
    print(f"Total images: {total_images}")
    print(f"Referenced: {total_referenced}")
    print(f"Unreferenced: {total_unreferenced}")
    
    if total_unreferenced > 0:
        print("\n⚠️  Some images may be unreferenced. Review carefully before deleting.")
        print("    This check is conservative and may miss references in:")
        print("    - JavaScript files")
        print("    - CSS files")
        print("    - Dynamic/template content")
        print("    - External stylesheets")
        return 1
    else:
        print("\n✓ All images appear to be referenced")
        return 0


if __name__ == '__main__':
    sys.exit(main())
