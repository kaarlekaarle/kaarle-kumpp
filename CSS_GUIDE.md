# CSS Guide

> Unified from CSS-ARCHITECTURE.md and CSS_STRUCTURE.md — last updated 2025-10-29.

This document explains how styles are organized, built, and maintained in the static HTML site (kaarle-site).

---


## Overview and File Roles (Legacy)

### Main Stylesheet
- **File:** `styles.css` (deprecated)
- **Size:** ~1,428 lines (31.9 KB)
- **Purpose:** Core layout, typography, and responsive design
- **Structure:** Desktop-first with mobile media queries (`@media (max-width: 1023px)`)
- **Imports:** Loads override partials at end for cascade control

### Override Partials (Deprecated)
Created to isolate legacy `!important` declarations for future refactoring.

#### iOS & UA Overrides
- **File:** `_ios_and_ua_overrides.css` (deprecated)
- **Size:** ~40 lines
- **Purpose:** Prevents iOS auto-linking phone numbers/emails
- **Status:** ✅ Required (cannot be removed without breaking mobile UX)

#### Mobile Spacing Overrides
- **File:** `_mobile_spacing_overrides.css` (deprecated)
- **Size:** ~25 lines
- **Purpose:** Mobile-specific spacing adjustments for About/Works pages
- **Status:** 🟡 Future review (could be replaced with higher specificity)

---

## Build and Minify Workflow

### Build Process
The production CSS is built by combining and minifying all CSS files:

```bash
# Combine files (removing @import statements)
cat styles.css _ios_and_ua_overrides.css _mobile_spacing_overrides.css > build/styles.combined.css
sed -i '' '/^@import/d' build/styles.combined.css

# Minify with clean-css
npx clean-css-cli -o build/styles.min.css build/styles.combined.css

# Fix font path (ensure absolute path)
sed -i '' "s|url('fonts/kk_regular.otf')|url('/fonts/kk_regular.otf')|g" build/styles.min.css

# Clean up intermediate files
rm build/styles.combined.css
```

### Build Directory Layout
The `build/` directory contains only essential production files:

```
build/
├── styles.min.css     (22KB) - Production minified CSS
└── _utilities.css     (2.6KB) - Utility classes (imported by minified CSS)
```

**Removed files:** Intermediate files (`combined.css`, `styles.combined.css`) and audit artifacts are automatically cleaned up after each build.

### File Size Comparison
```
Source files total .................... ~32KB
styles.min.css (compressed) ........... 22KB (31% reduction)
```

### Deployment Strategy
1. **Development:** Use original files with `@import` statements
2. **Production:** Use `build/styles.min.css` (all 19 HTML files link to this)
3. **Testing:** Compare coverage in DevTools before deployment

### Regenerating Minified CSS
To rebuild the production CSS after changes:

```bash
# Full rebuild process
cd /path/to/kaarle-site
cat styles.css _ios_and_ua_overrides.css _mobile_spacing_overrides.css > build/styles.combined.css
sed -i '' '/^@import/d' build/styles.combined.css
npx clean-css-cli -o build/styles.min.css build/styles.combined.css
sed -i '' "s|url('fonts/kk_regular.otf')|url('/fonts/kk_regular.otf')|g" build/styles.min.css
rm build/styles.combined.css
echo "✅ Production CSS rebuilt"
```

---

## PurgeCSS Configuration

The project maintains a PurgeCSS configuration for future CSS optimization. The configuration is optimized to preserve all necessary selectors while ensuring comprehensive coverage.

**Note:** PurgeCSS is **not currently used** in the build process (which uses `clean-css-cli` only). This configuration is prepared for future integration when CSS purging is needed.

### Configuration File
- **File:** `purgecss.config.js`
- **Purpose:** Safelist selectors that must be preserved during minification
- **Strategy:** Group entries by function with logical categorization

### Safelist Categories

#### Accessibility (3 entries)
- `[role="tab"]`, `[aria-selected="true"]`, `[aria-selected]` - Dot navigation elements
- Used in 49 instances across client pages

#### Client Page Navigation (5 entries)  
- `bg-current`, `bg-gray-400` - Background classes for dot states (49 instances)
- `.h-2`, `.w-2` - Dot size classes (49 instances each)
- `.rounded-full` - Dot shape class (49 instances)

#### Layout Elements (4 entries)
- `figure` - Used in 52 instances
- `.work-card` - Used in 16 instances  
- `.client-page` - Container class
- `[data-id="left-middle"]` - Grid layout element

#### Visibility Classes (2 entries)
- `.mobile-only` - Mobile visibility (38 instances)
- `.desktop-only` - Desktop visibility (38 instances)

#### Mobile Utilities (10 entries)
- Flexbox utilities: `.mx-auto`, `.flex`, `.flex-col`, `.items-center`, `.h-full`, `.justify-center`
- Spacing utilities: `.pb-4`, `.gap-2`, `.flex-1`, `.max-w-full`, `.relative.mb-6`
- Navigation data attributes: `[data-id="mobile-nav"]` (19 instances), `[data-id="mobile-contact"]` (1 instance)

#### Gallery Elements (4 entries)
- `.w-\[720px\]`, `.h-\[450px\]` - Image dimensions (16 instances each)
- `.slide-image`, `.active` - Image states

### Configuration Summary
- **Total entries:** 29 safelist entries
- **Added in audit:** 7 entries (dot size/shape, visibility classes, mobile nav attributes)
- **Status:** All critical selectors preserved

### Why These Selectors Are Safelisted
1. **Dynamic content:** Many classes are added/removed via JavaScript
2. **Tailwind-style utilities:** Custom classes not detected by static analysis (.h-2, .w-2, .rounded-full)
3. **Accessibility attributes:** Required for screen readers and keyboard navigation
4. **Responsive breakpoints:** Mobile-specific classes that may not be detected (.mobile-only, .desktop-only)
5. **Data attributes:** Used for mobile navigation and contact sections

### Rebuild Command (When PurgeCSS is Integrated)
```bash
# If PurgeCSS is added to build process:
npx purgecss --config purgecss.config.js --css styles.css --output build/
npx clean-css-cli -o build/styles.min.css build/styles.css
```

---

## Complexity Audit Results

The CSS system was analyzed for redundant selectors, unused rules, and simplification opportunities.

### Analysis Summary
- **Total CSS rules analyzed:** 203
- **Duplicate selectors found:** 26 (most are intentional responsive design patterns)
- **Unused classes identified:** 17 (verified against HTML and JavaScript usage)
- **Safe optimizations applied:** 4 unused classes removed

### Categories of Duplicates

#### ✅ Keep (Intentional Duplicates)
- **`.desktop-only`/`.mobile-only`** - Different values in media queries (responsive design)
- **`.text-center`** - Utility class vs. context-specific overrides
- **`.flex`** - Utility class vs. context-specific implementations

#### ⚠️ Merge (Safe Consolidations)
- **`.text-right`** - Identical declarations but different contexts (kept separate)
- Most "duplicates" are actually different contexts requiring separate rules

#### 🗑 Remove (Unused Classes)
- **`.inset-0`** - Not referenced in HTML or JavaScript
- **`.pointer-events-none`** - Not referenced in HTML or JavaScript  
- **`.last-kicker`** - Not referenced in HTML or JavaScript
- **`.html`** - Not referenced in HTML or JavaScript

### Optimization Results
- **Lines saved:** 4 CSS rules removed
- **File size reduction:** 108 bytes (source), 81 bytes (minified)
- **Rules before:** 203
- **Rules after:** 199
- **Visual changes:** None (all pages render identically)

### Classes Preserved (Used in JavaScript)
- **`.mobile-dot`** - Used in `client.js` for mobile gallery navigation
- **`.field-button`** - Used in `works.js` for field selection
- **`.client-button`** - Used in `client.js` for client navigation
- **`.fs-desktop`** - Used in JavaScript for dynamic font sizing
- **`.absolute`** - Used in JavaScript for positioning

### Next Review Interval
**Recommended:** Every 3-6 months or when adding significant new features.

**Review triggers:**
- New page templates added
- Major JavaScript functionality changes
- Performance optimization needs
- CSS file size growth beyond 35KB

---

## CSS Architecture and Cascade Order

### Load Order
```
styles.css
  ↓ (main styles)
  ↓
@import "_ios_and_ua_overrides.css"
  ↓ (OS/browser overrides)
  ↓
@import "_mobile_spacing_overrides.css"
  ↓ (responsive adjustments)
```

Final CSS applied in cascade order, ensuring partial overrides take precedence.

### Design Tokens (CSS Variables)
Defined in `:root`:
- **Spacing scale:** `--space-2xs` → `--space-4xl` plus micro steps (`--space-micro`, `--space-tiny`)
- **Typography:** `--fs-logo`, `--fs-desktop`, `--fs-mobile`, `--fs-small`
- **Colors:** `--ink`, `--accent`, `--paper`
- **Layout helpers:** `--edge-fluid`, `--measure`, safe areas for padding

**Guideline:** Always prefer variables over hardcoded values. If a new size is needed, add a token.

### Layout System
- **Desktop grid container:** `.em`
  - 5 columns: `1fr var(--measure) var(--space-lg) var(--measure) 1fr`
  - 3 rows: `minmax(var(--edge-fluid), 1fr) max-content minmax(var(--edge-fluid), 1fr)`
- **Areas targeted via data attributes:**
  - Left column: `[data-id="left-top" | "left-middle" | "left-bottom"]`
  - Right column: `[data-id="right-top" | "right-middle" | "right-bottom"]`
- **Mobile:** Simplified single-column grid under `@media (max-width: 1023px)`

**Guideline:** Prefer `align-self`, `justify-self`, `place-self` over absolute positioning.

### Typography System
- **Desktop text:** `--fs-desktop` (matches legacy right-column sizing)
- **Mobile text:** `--fs-mobile` (unified mobile size)
- **Small text:** `--fs-small` (14px eq.)
- **Font usage:**
  - Serif: longform content, captions, phone/email
  - Sans: names, navigation, headings, logo

### Spacing System
- Use spacing tokens exclusively (e.g., `margin-top: var(--space-md)`)
- Keep vertical rhythm consistent across pages (mobile and desktop)

### Utilities
Common utility classes to replace inline styles:
- **Alignment/layout:** `.text-center`, `.flex`, `.flex-col`, `.items-center`, `.justify-between`
- **Images:** `.logo-img`, `.logo-img-centered`, `.slide-image`, `.min-h-150`
- **Social:** `.social-icon-sm`, `.social-icon-md`
- **Spacing helpers:** `.gap-1rem`, `.mobile-gallery-top`, `.mobile-caption-top`, `.mobile-caption-padding`
- **Contacts/nav:** `.contact-name`, `.contact-phone`, `.contact-email`, `.contact-link`, `.nav-link`

**Guideline:** If you need the same style twice, promote it to a utility.

### Naming Conventions
- **Page scope modifiers:** `.about-page`, `.works-page`, `.client-page` (on `body > main`)
- **Section targeting:** `[data-id="left-*"]`, `[data-id="right-*"]`, `[data-id="mobile-*"]`
- **Utilities:** Short, action-oriented names (`.text-center`, `.gap-1rem`)
- **Avoid BEM** for now; page scopes and utilities are sufficient

### Visibility Model
- `.desktop-only` and `.mobile-only` classes control visibility at breakpoint
- Avoid JavaScript-driven visibility flags; rely on CSS media queries

### Media Query Strategy
- Desktop-first organization with explicit mobile blocks
- Keep related mobile rules close to their desktop counterparts, but inside mobile sections
- Avoid duplicated nested media queries (prefer one level deep)

### Specificity & !important Policy
- Prefer low-specificity selectors and page scopes over `!important`
- `!important` allowed only for deliberate overrides where external/legacy specificity is too high
- If you add a new `!important`, leave a short inline note explaining why

**Current Status:** 41 `!important` instances isolated in override partials for controlled future removal.

### Page-Specific Notes
- **About page:** Consistent spacing among prose, contacts, image, and links; links match universal nav sizing on mobile
- **Works page:** Desktop hover logic handled in JS; CSS controls type and spacing; mobile fields/client list use serif
- **Client pages:** Keep gallery, caption, and social spacing consistent; captions in serif; bottom links consistent with other pages

---

## Testing and Verification

### PurgeCSS Audit
- **Original:** 1,428 lines
- **After Purge:** 1,313 lines (8.1% reduction)
- **Coverage:** 91.9% used

**False Positives (Keep):**
- `.client-button:hover` - Used via JavaScript dynamic classes
- `[data-id="mobile-nav"]` - Used via HTML data attributes
- `.slide-image.active` - Toggled via JS for gallery
- Pseudo-classes (`:hover`, `:focus`, `:last-child`) - Browser-deployed

### Post-Build Safety Test
Run `test-css-clean.sh` to verify:
- No `currentColor` conflicts in minified CSS
- Explicit dot background rules present (gray `#9ca3af` and black `#000`)

### Known Issues & Fixes

#### Dot Navigation Indicators
**Problem:** Dots disappeared in minified CSS due to `background: currentColor` conflicts.

**Solution Applied:**
- Removed all `background: currentColor` declarations from source CSS
- Added explicit dot background rules at end of `styles.css`:
  ```css
  .client-page [role="tab"] {
    background: none; /* neutralize previous shorthand */
    background-color: #9ca3af; /* gray inactive */
    display: inline-block;
  }
  .client-page [role="tab"][aria-selected="true"] {
    background: none;
    background-color: #000; /* black active */
  }
  ```
- Safelisted `[role="tab"]` and `[aria-selected="true"]` in PurgeCSS config
- Enforced build order with `styles.css` last in minification pipeline

**Result:** Dots now visible and toggle correctly in all minified builds.

---

## How to Add Styles Safely

1. Check for an existing utility that fits before creating a new rule
2. Use tokens (`var(--space-*)`, `var(--fs-*)`) instead of raw values
3. Scope component/page rules under `.about-page`, `.works-page`, or `.client-page`
4. For desktop/mobile differences, keep both rules near their sections
5. Avoid `!important` unless absolutely necessary; prefer better scoping

### Debugging Tips
- Use grid area data attributes to quickly target misaligned items
- Inspect computed values for `place-self`/`align-self` when alignment seems off
- Confirm no inline styles are reintroducing specificity problems
- Compare coverage in DevTools before deployment

---

## Future Improvements

1. Review remaining 41 `!important` declarations for safe removal
2. Consider CSS variables for remaining hardcoded spacing
3. Replace mobile spacing overrides with higher specificity selectors
4. Add source map generation for production debugging
5. Consider consolidating CSS architecture further if complexity grows

---

This doc reflects the current, production-focused static HTML architecture. Keep it updated when adding utilities, tokens, page scopes, or changing the build process.


## Production Adoption — Unified Build (2025-10)

### Verified Test Results
- ✅ **Visual Identity**: All pages (index, about, works, client pages) render identically
- ✅ **Font Loading**: `/fonts/kk_regular.otf` loads correctly (200 OK)
- ✅ **Grid System**: `.em` layout functions properly
- ✅ **Interactive Elements**: Dots visible and toggling correctly
- ✅ **No Errors**: No console errors or 404s in server logs
- ✅ **File Size**: 21,406 bytes (510 bytes smaller than original)

### Safe Unification Workflow
**Manual merging is deprecated.** All future builds must use automated concatenation to preserve cascade order:

```bash
# 1. Create unified CSS via automated concatenation
(echo '/* === styles.css === */'; cat styles.css;
 echo '/* === _ios_and_ua_overrides.css === */'; cat _ios_and_ua_overrides.css;
 echo '/* === _mobile_spacing_overrides.css === */'; cat _mobile_spacing_overrides.css) \
  > build/styles_unified.css

# 2. Remove @import statements (content already concatenated)
sed -i '' '/^@import/d' build/styles_unified.css

# 3. Minify safely
npx clean-css-cli -O2 --source-map -o build/styles_unified.min.css build/styles_unified.css

# 4. Adopt as production
cp build/styles_unified.min.css build/styles.min.css
```

### Key Benefits
- **Preserved Cascade Order**: Automated concatenation maintains exact rule precedence
- **No Manual Errors**: Eliminates human reconstruction mistakes
- **Reproducible**: Same command produces identical results every time
- **Smaller Bundle**: Better minification due to unified structure
- **Maintainable**: Clear section headers show origin of each rule group

### Future Maintenance
- Always append new overrides to the end of `styles.css`
- Use section comments to maintain organization
- Test with unified build before committing changes
- Keep `build_backups/css_before_safe_consolidation/` for reference


## Build Verification

### Purpose
The `verify_css_build.sh` script ensures that every CSS build is complete, intact, and safe for deployment. It automatically checks for critical sections that must be present for the site to function correctly.

### Critical Checks Performed
- **@font-face**: Font loading declarations
- **.em{**: Grid layout system
- **\[role=tab\]**: Dot navigation functionality
- **font-sans**: Root font variable
- **url('/fonts/kk_regular.otf')**: Font file reference
- **:root{**: CSS custom properties
- **grid-template-columns/rows**: Grid system properties
- **.mobile-only/.desktop-only**: Responsive utilities

### Usage
```bash
# Verify current production CSS
./verify_css_build.sh

# Build and verify in one command
./build_css.sh
```

### Integration
The verification script is automatically integrated into the build process:
```bash
# Manual build with verification
./build_css.sh

# Or verify existing build
./verify_css_build.sh
```

### What Happens on Failure
If verification fails, the script will:
1. Print "❌ Missing critical section: [section]"
2. Explain what the missing section indicates
3. Exit with code 1 to stop deployment

### Recovery
If verification fails:
1. Check the output for the missing section
2. Re-run the build: `./build_css.sh`
3. Verify again: `./verify_css_build.sh`
4. Only commit after verification passes

### File Size Validation
The script also validates that the CSS file is at least 10KB, preventing deployment of incomplete builds.

---

## Fix Log

### 2025-10-29 — Transparent PNG visual consistency fix
- **Issue:** Gray background visible through transparent PNG areas on client pages
- **Root cause:** `.client-page figure` had `background-color: transparent`, allowing parent `.bg-paper` gray to show through
- **Solution:** Scoped `.client-page .slide-image` and `.client-page .slide-image figure` background color to match `--paper` variable
- **CSS added:**
  ```css
  .client-page .slide-image,
  .client-page .slide-image figure {
    background-color: var(--paper, #f5f3f0);
  }
  ```
- **Result:** PNG transparency areas now blend seamlessly with site's warm paper background

