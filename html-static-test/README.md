# Static HTML Test - Homepage

This is a **standalone HTML version** of your Next.js homepage for testing purposes.

## What's Included

- `index.html` - Complete homepage HTML structure
- `styles.css` - All necessary CSS (combined from your Next.js project)
- This works completely standalone, no build process needed

## How to Test

### Option 1: Open directly in browser
Simply double-click `index.html` or drag it into your browser.

### Option 2: Use a local server (recommended)
```bash
# Using Python (already on macOS)
cd "/Users/kaarlehurtig/Desktop/SAITTI PROJEKTI/html-static-test"
python3 -m http.server 8000

# Then open: http://localhost:8000
```

### Option 3: VS Code Live Server
Right-click `index.html` and select "Open with Live Server"

## Features

✅ **Desktop Layout** (1024px+): Six-cell grid with left column (logo + contact) and right column (nav + content)

✅ **Mobile Layout** (<1024px): Stacked vertical layout with touch-friendly navigation

✅ **Apple Logo**: Uses the Apple logo character (  / U+F8FF)

✅ **Debug Mode**: Press `d` to toggle debug grid view

✅ **Responsive**: Fully responsive from 320px to desktop sizes

## Fonts

- **Sans-serif (headings/nav)**: Currently uses system font fallback
  - To use your custom font, copy `kk_regular.otf` to this folder and add @font-face rule
- **Serif (body text)**: EB Garamond (loaded from Google Fonts)

## Adding Your Custom Font

If you want to use your custom "Kaarle & Kumpp" font:

1. Copy the font file to this folder:
```bash
cp "../kaarle-site/public/fonts/kaarle-kumppanit/kk_regular.otf" ./
```

2. Add this to the top of `styles.css`:
```css
@font-face {
  font-family: 'KaarleKumppanit';
  src: url('kk_regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## Differences from Next.js Version

- No React/JavaScript interactivity (just vanilla JS for debug mode)
- No client-side routing (would need actual `works.html` and `about.html` files)
- Fonts: Uses system fallback for sans-serif unless you copy the custom font
- No build optimization (but it's also very lightweight)

## File Size Comparison

- This HTML version: ~10-15KB (HTML + CSS)
- Next.js version: ~90-130KB (includes React runtime)

## Next Steps

To convert the entire site:
1. Create `works.html` and `about.html` with similar structure
2. Copy the custom font file and add @font-face rule
3. If needed: Add any JavaScript interactivity (carousels, galleries, etc.)
4. Deploy: Can be hosted on ANY web server (no Node.js needed)

---

**Note:** This is a test version. Your Next.js project remains untouched.

