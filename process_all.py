#!/usr/bin/env python3
"""Process all 8 concept sites in parallel."""

import sys
import subprocess
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

SITES = [
    ("casa-rubio", "https://casarubio.com/"),
    ("east-hampton-house-resort", "http://www.easthamptonhouseresort.com/"),
    ("duplin-inn", "http://www.duplininn.com/"),
    ("sierra-woods-lodge", "http://www.sierrawoodslodge.com/"),
    ("ship-harbor-inn", "http://www.shipharborinn.com/"),
    ("requa-inn", "https://www.requainn.com/"),
    ("pheasant-park-resort", "https://www.pheasantparkresort.com/"),
    ("bayview-inn-crescent-city", "https://ccbvi.com/"),
]


def process_site(slug, url):
    """Process a single site."""
    print(f"[{slug}] Starting...")
    try:
        result = subprocess.run(
            ["python3", "tools/before_after.py", slug, url],
            cwd="/workspace",
            capture_output=True,
            text=True,
            timeout=120
        )
        
        if result.returncode == 0:
            print(f"[{slug}] ✓ SUCCESS")
            return (slug, "success", None)
        else:
            error = result.stderr.strip() or result.stdout.strip()
            print(f"[{slug}] ✗ FAILED: {error}")
            return (slug, "failed", error)
    except subprocess.TimeoutExpired:
        print(f"[{slug}] ✗ TIMEOUT")
        return (slug, "timeout", "Process timed out after 120s")
    except Exception as e:
        print(f"[{slug}] ✗ ERROR: {e}")
        return (slug, "error", str(e))


def main():
    print("Processing 8 concept sites in parallel...\n")
    
    results = []
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = {executor.submit(process_site, slug, url): slug for slug, url in SITES}
        
        for future in as_completed(futures):
            results.append(future.result())
    
    # Summary
    print("\n" + "="*60)
    print("SUMMARY:")
    print("="*60)
    
    success = [r for r in results if r[1] == "success"]
    failed = [r for r in results if r[1] != "success"]
    
    if success:
        print(f"\n✓ SUCCESS ({len(success)}):")
        for slug, _, _ in success:
            print(f"  - {slug}")
    
    if failed:
        print(f"\n✗ FAILED/SKIPPED ({len(failed)}):")
        for slug, status, error in failed:
            print(f"  - {slug}: {status}")
            if error:
                print(f"    {error[:100]}")
    
    return 0 if len(success) > 0 else 1


if __name__ == "__main__":
    sys.exit(main())
