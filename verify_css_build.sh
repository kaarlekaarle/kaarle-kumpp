#!/bin/bash
# CSS Build Verification Script
# Ensures production CSS build is complete, intact, and safe for deployment

echo "🔍 Running CSS build verification..."

FILE="build/styles.min.css"

# Check if CSS file exists
if [ ! -f "$FILE" ]; then
    echo "❌ CSS file not found: $FILE"
    exit 1
fi

# Critical selectors and rules that must be present
CHECKS=(
    "@font-face"
    ".em{"
    "\[role=tab\]"
    "font-sans"
    "url('/fonts/kk_regular.otf')"
    ":root{"
    "grid-template-columns"
    "grid-template-rows"
    ".mobile-only"
    ".desktop-only"
)

# Additional checks for specific functionality
FUNCTIONAL_CHECKS=(
    "background-color"
    "font-family"
    "display:grid"
    "display:flex"
    "position:absolute"
    "transition:"
)

echo "📋 Checking critical CSS sections..."

# Check critical selectors
for CHECK in "${CHECKS[@]}"; do
    if ! grep -q "$CHECK" "$FILE"; then
        echo "❌ Missing critical section: $CHECK"
        echo "   This indicates the CSS build is incomplete or corrupted."
        exit 1
    fi
done

echo "📋 Checking functional CSS properties..."

# Check functional properties
for CHECK in "${FUNCTIONAL_CHECKS[@]}"; do
    if ! grep -q "$CHECK" "$FILE"; then
        echo "⚠️  Missing functional property: $CHECK"
        echo "   This may indicate incomplete CSS but not critical."
    fi
done

# Check file size (should be reasonable)
FILE_SIZE=$(wc -c < "$FILE")
if [ "$FILE_SIZE" -lt 10000 ]; then
    echo "❌ CSS file too small: $FILE_SIZE bytes"
    echo "   This indicates the build may be incomplete."
    exit 1
fi

# Check for common build errors
if grep -q "undefined" "$FILE"; then
    echo "❌ Found 'undefined' in CSS - build error detected"
    exit 1
fi

if grep -q "null" "$FILE"; then
    echo "❌ Found 'null' in CSS - build error detected"
    exit 1
fi

echo "✅ CSS verification passed!"
echo "   File size: $FILE_SIZE bytes"
echo "   All critical sections present"
echo "   Ready for deployment"

exit 0
