#!/usr/bin/env python3
"""
CSS Complexity Analysis Script
Analyzes styles.css for redundant selectors, unused rules, and simplification opportunities.
"""

import re
import os
from collections import defaultdict, Counter

def extract_selectors(css_content):
    """Extract all CSS selectors from content."""
    # Pattern to match CSS selectors (including complex ones)
    selector_pattern = r'([.#]?[a-zA-Z0-9_-]+(?:\[[^\]]+\])?(?:\s*[.#][a-zA-Z0-9_-]+)*)\s*\{'
    selectors = re.findall(selector_pattern, css_content)
    return [s.strip() for s in selectors]

def extract_classes_from_html(html_files):
    """Extract all class names used in HTML files."""
    classes = set()
    for html_file in html_files:
        if os.path.exists(html_file):
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
                # Find all class attributes
                class_matches = re.findall(r'class="([^"]*)"', content)
                for match in class_matches:
                    # Split by spaces and add individual classes
                    for cls in match.split():
                        classes.add(cls)
    return classes

def analyze_css_complexity():
    """Main analysis function."""
    print("=== CSS COMPLEXITY ANALYSIS ===")
    
    # Read styles.css
    with open('styles.css', 'r', encoding='utf-8') as f:
        css_content = f.read()
    
    # Extract selectors
    selectors = extract_selectors(css_content)
    print(f"Total CSS rules: {len(selectors)}")
    
    # Find duplicate selectors
    selector_counts = Counter(selectors)
    duplicates = {sel: count for sel, count in selector_counts.items() if count > 1}
    
    print(f"\n=== DUPLICATE SELECTORS ===")
    if duplicates:
        for sel, count in duplicates.items():
            print(f"  {sel}: {count} times")
    else:
        print("  No exact duplicate selectors found")
    
    # Find similar selectors (same base class)
    base_selectors = defaultdict(list)
    for sel in selectors:
        # Extract base class name (before any pseudo-selectors or combinators)
        base = re.split(r'[:\s>+~]', sel)[0]
        base_selectors[base].append(sel)
    
    similar_groups = {base: sels for base, sels in base_selectors.items() if len(sels) > 1}
    
    print(f"\n=== SIMILAR SELECTOR GROUPS ===")
    for base, sels in list(similar_groups.items())[:10]:  # Show first 10
        print(f"  {base}: {len(sels)} variants")
        for sel in sels[:3]:  # Show first 3 variants
            print(f"    - {sel}")
        if len(sels) > 3:
            print(f"    ... and {len(sels) - 3} more")
    
    # Check for unused selectors
    html_files = ['index.html', 'about.html', 'works.html', 'client.html'] + \
                 [f for f in os.listdir('.') if f.startswith('client-') and f.endswith('.html')]
    
    used_classes = extract_classes_from_html(html_files)
    print(f"\n=== USAGE ANALYSIS ===")
    print(f"Classes found in HTML: {len(used_classes)}")
    
    # Check which CSS classes are used
    css_classes = set()
    for sel in selectors:
        # Extract class names from selectors
        class_matches = re.findall(r'\.([a-zA-Z0-9_-]+)', sel)
        for cls in class_matches:
            css_classes.add(cls)
    
    unused_classes = css_classes - used_classes
    print(f"CSS classes defined: {len(css_classes)}")
    print(f"Potentially unused classes: {len(unused_classes)}")
    
    if unused_classes:
        print("\nPotentially unused classes:")
        for cls in sorted(list(unused_classes))[:20]:  # Show first 20
            print(f"  .{cls}")
        if len(unused_classes) > 20:
            print(f"  ... and {len(unused_classes) - 20} more")
    
    # Look for conflicting declarations
    print(f"\n=== CONFLICTING DECLARATIONS ===")
    # This would require more complex parsing to find same selector with different values
    print("  (Requires deeper analysis of property-value pairs)")
    
    return {
        'total_rules': len(selectors),
        'duplicates': duplicates,
        'similar_groups': similar_groups,
        'unused_classes': unused_classes,
        'used_classes': used_classes
    }

if __name__ == "__main__":
    results = analyze_css_complexity()
