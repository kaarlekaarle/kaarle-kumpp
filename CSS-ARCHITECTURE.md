# CSS Architecture and Naming Conventions

This document explains how styles are organized in the static HTML site (kaarle-site) so changes remain predictable and easy to maintain.

## 1) Structure Overview

- Single main stylesheet: `styles.css`
- Desktop and mobile rules are grouped with media queries inside the same file
  - Desktop: `@media (min-width: 1024px) { ... }`
  - Mobile: `@media (max-width: 1023px) { ... }`
- Page-specific sections are grouped at the end of the file:
  - About page rules
  - Works page rules
  - Client page rules

## 2) Design Tokens (CSS Variables)

Defined in `:root`:
- Spacing scale: `--space-2xs` → `--space-4xl` plus micro steps (e.g., `--space-micro`)
- Typography: `--fs-logo`, `--fs-desktop`, `--fs-mobile`, `--fs-small`
- Colors: `--ink`, `--accent`, `--paper`
- Layout helpers: `--edge-fluid`, `--measure`, safe areas for padding

Always prefer variables over hardcoded values. If a new size is needed, add a token.

## 3) Layout System

- Desktop grid container: `.em`
  - 5 columns: `1fr var(--measure) var(--space-lg) var(--measure) 1fr`
  - 3 rows: `minmax(var(--edge-fluid), 1fr) max-content minmax(var(--edge-fluid), 1fr)`
- Areas are targeted using data attributes:
  - Left column: `[data-id="left-top" | "left-middle" | "left-bottom"]`
  - Right column: `[data-id="right-top" | "right-middle" | "right-bottom"]`
- Mobile uses a simplified single-column grid under `@media (max-width: 1023px)`

Guideline: prefer aligning elements with `align-self`, `justify-self`, `place-self` instead of absolute positioning.

## 4) Visibility Model

- `.desktop-only` and `.mobile-only` classes control visibility at the breakpoint
- Avoid JavaScript-driven visibility flags; rely on CSS media queries

## 5) Typography System

- Desktop text: `--fs-desktop` (matches legacy right-column sizing)
- Mobile text: `--fs-mobile` (unified mobile size)
- Small text: `--fs-small` (14px eq.)
- Serif vs. Sans:
  - Serif: longform content, captions, phone/email
  - Sans: names, navigation, headings, logo

## 6) Spacing System

- Use spacing tokens exclusively (e.g., `margin-top: var(--space-md)`)
- Keep vertical rhythm consistent across pages (mobile and desktop)

## 7) Utilities

Common utility classes exist to remove inline styles:
- Alignment/layout: `.text-center`, `.flex`, `.flex-col`, `.items-center`, `.justify-between`
- Images: `.logo-img`, `.logo-img-centered`, `.slide-image`, `.min-h-150`
- Social: `.social-icon-sm`, `.social-icon-md`
- Spacing helpers: `.gap-1rem`, `.mobile-gallery-top`, `.mobile-caption-top`, `.mobile-caption-padding`
- Contacts/nav: `.contact-name`, `.contact-phone`, `.contact-email`, `.contact-link`, `.nav-link`

Guideline: If you need the same style twice, promote it to a utility.

## 8) Naming Conventions

- Page scope modifiers on `body > main`:
  - `.about-page`, `.works-page`, `.client-page`
- Section targeting with data attributes inside `.em`:
  - `[data-id="left-*"]`, `[data-id="right-*"]`, `[data-id="mobile-*"]`
- Utilities: short, action-oriented names (`.text-center`, `.gap-1rem`)
- Avoid BEM for now; page scopes and utilities are sufficient and simpler here

## 9) Specificity & !important Policy

- Prefer low-specificity selectors and page scopes over `!important`
- `!important` is allowed only for deliberate overrides where external or legacy specificity is too high
- If you add a new `!important`, leave a short inline note explaining why

## 10) Media Query Strategy

- Desktop-first organization with explicit mobile blocks
- Keep related mobile rules close to their desktop counterparts, but inside the mobile sections
- Avoid duplicated nested media queries (prefer one level deep)

## 11) Page-Specific Notes

- About page: consistent spacing among prose, contacts, image, and links; links match universal nav sizing on mobile
- Works page: desktop hover logic handled in JS; CSS controls type and spacing; mobile fields/client list use serif
- Client pages: keep gallery, caption, and social spacing consistent; captions in serif; bottom links consistent with other pages

## 12) How to Add Styles Safely

1. Check for an existing utility that fits before creating a new rule
2. Use tokens (`var(--space-*)`, `var(--fs-*)`) instead of raw values
3. Scope component/page rules under `.about-page`, `.works-page`, or `.client-page`
4. For desktop/mobile differences, keep both rules near their sections
5. Avoid `!important` unless absolutely necessary; prefer better scoping

## 13) Debugging Tips

- Use the grid area data attributes to quickly target misaligned items
- Inspect computed values for `place-self`/`align-self` when alignment seems off
- Confirm no inline styles are reintroducing specificity problems

---

This doc reflects the current, production-focused static HTML architecture. Keep it updated when adding utilities, tokens, or page scopes.


[2025-10-29] Dot indicators fix:
Safelisted [role="tab"] and [aria-selected="true"] selectors to prevent PurgeCSS removal.
Added explicit gray/black background rules at end of styles.css.

The issue was that PurgeCSS was removing dynamic selectors that aren't present in static HTML at build time.
Solution: Use --safelist flag to preserve these selectors during minification.

Fixed rules in minified CSS:
- .client-page [role=tab]{background:#9ca3af;display:inline-block}
- .client-page [role=tab][aria-selected=true]{background:#000}


## [2025-10-30] Dot Navigation Permanent Fix

**Problem**: Dots disappeared in minified CSS due to `background: currentColor` conflicts overriding explicit background colors.

**Solution Applied**:
- Removed all `background: currentColor` declarations from source CSS
- Added explicit dot background rules at end of `styles.css` with highest cascade priority:
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
- Enforced build order with `styles.css` last in minification pipeline
- Added post-build safety test (`test-css-clean.sh`) to detect `currentColor` reintroduction

**Build Process**:
```bash
npx clean-css-cli -O2 --source-map \
  _ios_and_ua_overrides.css _mobile_spacing_overrides.css styles.css \
  -o build/styles.min.css
./test-css-clean.sh
```

**Result**: Dots now visible and toggle correctly in all minified builds without manual intervention.
