# Responsive Layout & Typography Audit

## 1. Overview

### Project Breakpoints Summary
- **Mobile**: `max-width: 1023px` (CSS media query)
- **Desktop**: `min-width: 1024px` (CSS media query)
- **Additional**: `body.is-mobile` class (JavaScript-driven, same breakpoint)

### Shell Descriptions
- **Desktop shell**: 4x4 CSS Grid (`.em`) with fixed positioning utilities for content placement
- **Mobile shell**: Vertical flexbox stack (`.mobile-stack`) with fixed bottom navigation bar

## 2. Custom Properties

| Name | Value | Defined In | Referenced In |
|------|-------|------------|---------------|
| `--color-accent` | `#1f37ff` | `app/globals.css:13` | Throughout CSS and TSX files |
| `--font-serif` | `ui-serif, Georgia, serif` | `app/globals.css:14` | Typography classes and components |
| `--font-sans` | `ui-sans-serif, system-ui, sans-serif` | `app/globals.css:15` | Typography classes and components |

## 3. Media Queries

| Query | File:Line | Purpose |
|-------|-----------|---------|
| `@media (max-width: 1023px)` | `app/globals.css:47` | Mobile layout activation - hide desktop, show mobile |
| `@media (max-width: 1023px)` | `app/globals.css:164` | About page mobile prose styling - hide br tags |
| `@media (min-width: 1024px)` | `app/globals.css:234` | Large screen utilities - lg:block, lg:hidden |

## 4. Visibility Mechanisms

| Selector | Default | Mobile | Desktop | Notes |
|----------|---------|--------|---------|-------|
| `.desktop-only` | `display: block` | `display: none !important` | `display: block` | Primary desktop content gate |
| `.mobile-only` | `display: none` | `display: block !important` | `display: none` | Primary mobile content gate |
| `body.is-mobile` | Not set | `is-mobile` class added | `is-mobile` class removed | JavaScript-driven, redundant with CSS |

## 5. Layout Systems

### Desktop Grid
```css
.em {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  gap: 1rem;
  min-height: 100vh;
  padding: 2rem;
}
```

| Grid Utility | Property | File:Line |
|--------------|----------|-----------|
| `.row-start-1` | `grid-row-start: 1` | `app/globals.css:182` |
| `.row-start-2` | `grid-row-start: 2` | `app/globals.css:183` |
| `.row-start-3` | `grid-row-start: 3` | `app/globals.css:184` |
| `.row-start-4` | `grid-row-start: 4` | `app/globals.css:185` |
| `.col-start-1` | `grid-column-start: 1` | `app/globals.css:187` |
| `.col-start-2` | `grid-column-start: 2` | `app/globals.css:188` |
| `.col-start-3` | `grid-column-start: 3` | `app/globals.css:189` |
| `.col-start-4` | `grid-column-start: 4` | `app/globals.css:190` |

### Mobile Stack
```css
.mobile-stack {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 80px;
}
```

| Bottom Bar Property | Value | File:Line |
|---------------------|-------|-----------|
| Position | `position: fixed` | `app/globals.css:69` |
| Height | `padding-bottom: 80px` (on container) | `app/globals.css:65` |
| Safe area | Not used | - |
| Shadow/Border | `border-top: 1px solid #e5e5e5` | `app/globals.css:74` |

## 6. Typography

### Font Families
| Name | Value | Usage |
|------|-------|-------|
| Serif | `ui-serif, Georgia, serif` | Body text, about prose |
| Sans | `ui-sans-serif, system-ui, sans-serif` | Headings, navigation, contact info |

### Font Sizes
| Size | CSS Value | Utility Class | Usage |
|------|-----------|---------------|-------|
| XS | `12px` | `.text-\[12px\]` | Contact info, CV links |
| Base | `16px` | `.text-\[16px\]` | Body text |
| LG | `18px` | `.text-\[18px\]` | Contact names |
| XL | `20px` | `.text-\[20px\]` | Navigation, headings |
| 2XL | `30px` | `.text-\[30px\]` | Logo text |

### Font Weights
| Weight | Value | Utility Class | Usage |
|--------|-------|---------------|-------|
| Normal | `400` | `.font-normal` | Default text |
| Medium | `500` | `.font-medium` | Body text emphasis |
| Semibold | `600` | `.font-semibold` | Headings |
| Bold | `700` | `.font-bold` | Strong emphasis |
| Extra Bold | `800` | `.font-800` | CV download link |

### Letter Spacing
| Name | Value | Utility Class | Usage |
|------|-------|---------------|-------|
| Wide | `0.025em` | `.tracking-wide` | All uppercase text |

### Line Heights
| Name | Value | Utility Class | Usage |
|------|-------|---------------|-------|
| None | `1` | `.leading-none` | Navigation links |
| Tight | `1.25` | `.leading-tight` | Logo, contact info |
| Base | `1.4` | `.leading-\[1\.4\]` | Body text |
| Relaxed | `1.45` | Custom | About prose |

## 7. Spacing

### Spacing Scale (No Systematic Scale)
| Utility | Value | Usage |
|---------|-------|-------|
| `.mt-1` | `0.25rem` | Small margins |
| `.mt-4` | `1rem` | Standard margins |
| `.pt-3` | `0.75rem` | Padding |
| `.my-1` | `0.25rem` | Vertical margins |

### Common Margins/Paddings
| Selector | Property | Value | File:Line |
|----------|----------|-------|-----------|
| `.em` | `padding` | `2rem` | `app/globals.css:34` |
| `.em` (mobile) | `padding` | `1rem` | `app/globals.css:58` |
| `.mobile-stack` | `gap` | `1.5rem` | `app/globals.css:64` |
| `.mobile-bottom` | `padding` | `1rem` | `app/globals.css:75` |

### Viewport Usage
| Property | Value | File:Line | Purpose |
|----------|-------|-----------|---------|
| `min-height` | `100vh` | `app/globals.css:33` | Full viewport height |

## 8. Route-Scoped Rules

### About Page (`.route-about`)
| Selector | Declaration | File:Line | Differs From Global |
|----------|-------------|-----------|-------------------|
| `.route-about .about-prose` | `color: var(--color-accent) !important` | `app/globals.css:102` | Yes - blue text |
| `.route-about .about-prose` | `font-family: var(--font-serif) !important` | `app/globals.css:103` | Yes - serif font |
| `.route-about .about-prose` | `font-weight: 500 !important` | `app/globals.css:104` | Yes - medium weight |
| `.route-about .about-prose` | `line-height: 1.45 !important` | `app/globals.css:105` | Yes - custom line height |
| `.route-about .about-prose p:last-of-type` | `font-style: italic !important` | `app/globals.css:111` | Yes - italic last paragraph |
| `.route-about .about-contact .name` | `font-family: var(--font-sans) !important` | `app/globals.css:120` | Yes - sans font |
| `.route-about .about-contact .name` | `font-weight: 700 !important` | `app/globals.css:121` | Yes - bold weight |
| `.route-about .about-contact .phone` | `font-family: var(--font-serif) !important` | `app/globals.css:126` | Yes - serif font |
| `.route-about .about-contact .email` | `font-style: italic !important` | `app/globals.css:133` | Yes - italic style |
| `.route-about .about-photo img` | `width: min(260px, 78%) !important` | `app/globals.css:141` | Yes - responsive width |
| `.route-about .about-photo img` | `box-shadow: 0 0 0 3px #eee inset, 0 0 0 1px #dcdcdc !important` | `app/globals.css:142` | Yes - frame styling |
| `.route-about .about-cv a` | `text-underline-offset: 3px !important` | `app/globals.css:153` | Yes - custom underline |
| `.route-about .mobile-bottom .mobile-nav a[href="/about"]` | `display: none !important` | `app/globals.css:160` | Yes - hide ABOUT link |
| `.route-about .about-prose br` | `display: none !important` | `app/globals.css:166` | Yes - hide line breaks |

## 9. Important Declarations

| Selector | Property:Value !important | File:Line | Reason (Inferred) |
|----------|---------------------------|-----------|-------------------|
| `.desktop-only` (mobile) | `display: none !important` | `app/globals.css:49` | Override conflicting display rules |
| `.mobile-only` (mobile) | `display: block !important` | `app/globals.css:53` | Override conflicting display rules |
| `.route-about .about-prose` | `color: var(--color-accent) !important` | `app/globals.css:102` | Override inherited text color |
| `.route-about .about-prose` | `font-family: var(--font-serif) !important` | `app/globals.css:103` | Override inherited font family |
| `.route-about .about-prose` | `font-weight: 500 !important` | `app/globals.css:104` | Override inherited font weight |
| `.route-about .about-prose` | `line-height: 1.45 !important` | `app/globals.css:105` | Override inherited line height |
| `.route-about .about-prose` | `margin: 1rem 0 !important` | `app/globals.css:106` | Override inherited margins |
| `.route-about .about-prose p:last-of-type` | `color: var(--color-accent) !important` | `app/globals.css:110` | Override inherited text color |
| `.route-about .about-prose p:last-of-type` | `font-style: italic !important` | `app/globals.css:111` | Override inherited font style |
| `.route-about .about-prose p:last-of-type` | `margin-top: 1em !important` | `app/globals.css:112` | Override inherited margin |
| `.route-about .about-contact .name` | `font-family: var(--font-sans) !important` | `app/globals.css:120` | Override inherited font family |
| `.route-about .about-contact .name` | `font-weight: 700 !important` | `app/globals.css:121` | Override inherited font weight |
| `.route-about .about-contact .name` | `display: block !important` | `app/globals.css:122` | Override inherited display |
| `.route-about .about-contact .phone` | `font-family: var(--font-serif) !important` | `app/globals.css:127` | Override inherited font family |
| `.route-about .about-contact .phone` | `font-weight: 500 !important` | `app/globals.css:128` | Override inherited font weight |
| `.route-about .about-contact .phone` | `display: block !important` | `app/globals.css:129` | Override inherited display |
| `.route-about .about-contact .email` | `font-family: var(--font-serif) !important` | `app/globals.css:133` | Override inherited font family |
| `.route-about .about-contact .email` | `font-style: italic !important` | `app/globals.css:134` | Override inherited font style |
| `.route-about .about-contact .email` | `display: block !important` | `app/globals.css:135` | Override inherited display |
| `.route-about .about-contact .email` | `text-decoration: none !important` | `app/globals.css:136` | Override inherited text decoration |
| `.route-about .about-contact .email` | `color: inherit !important` | `app/globals.css:137` | Override inherited color |
| `.route-about .about-photo img` | `display: block !important` | `app/globals.css:140` | Override inherited display |
| `.route-about .about-photo img` | `width: min(260px, 78%) !important` | `app/globals.css:141` | Override inherited width |
| `.route-about .about-photo img` | `box-shadow: 0 0 0 3px #eee inset, 0 0 0 1px #dcdcdc !important` | `app/globals.css:142` | Override inherited box shadow |
| `.route-about .about-photo img` | `margin: 1rem 0 !important` | `app/globals.css:143` | Override inherited margin |
| `.route-about .about-cv` | `display: block !important` | `app/globals.css:147` | Override inherited display |
| `.route-about .about-cv` | `margin: 0.75rem 0 !important` | `app/globals.css:148` | Override inherited margin |
| `.route-about .about-cv a` | `text-decoration: underline !important` | `app/globals.css:152` | Override inherited text decoration |
| `.route-about .about-cv a` | `text-underline-offset: 3px !important` | `app/globals.css:153` | Override inherited underline offset |
| `.route-about .about-cv a` | `font-family: var(--font-sans) !important` | `app/globals.css:154` | Override inherited font family |
| `.route-about .about-cv a` | `font-weight: 800 !important` | `app/globals.css:155` | Override inherited font weight |
| `.route-about .mobile-bottom .mobile-nav a[href="/about"]` | `display: none !important` | `app/globals.css:160` | Hide ABOUT link on about page |
| `.route-about .about-prose br` | `display: none !important` | `app/globals.css:166` | Hide line breaks in mobile prose |

## 10. Conflicts & Redundancies

• **Duplicate media queries** → Two identical `@media (max-width: 1023px)` blocks at lines 47 and 164 → Merge into single block

• **Mixed visibility systems** → CSS media queries and JavaScript `body.is-mobile` class both control same breakpoint → Remove JavaScript system, rely on CSS only

• **Excessive !important usage** → 32 `!important` declarations in about page styles → Indicates specificity conflicts that should be resolved with better selectors

• **Shadowed rule** → `.text-ink` defined twice at lines 8 and 227 → Remove duplicate definition

• **Inconsistent spacing system** → Mix of Tailwind utilities (`mt-1`, `pt-3`) and custom CSS (`margin: 1rem 0`) → Standardize on single spacing system

• **Arbitrary font sizes** → `text-[12px]`, `text-[18px]`, etc. instead of systematic scale → Create CSS custom properties for font size scale

• **No systematic spacing scale** → Ad-hoc margin/padding values throughout → Create CSS custom properties for spacing scale

• **Duplicate content rendering** → Logo and navigation rendered in both desktop and mobile stacks in EMLayout → Optimize to render once and show/hide with CSS

• **Inconsistent typography mixing** → About page contact info mixes fonts without clear pattern → Define systematic typography mixing rules

• **Missing mobile-first approach** → Desktop-first media queries → Consider mobile-first media queries for better performance

## 11. Normalization Suggestions

• **Consolidate breakpoints** - Use single `@media (max-width: 1023px)` block and remove duplicate media query at line 164

• **Choose single visibility mechanism** - Remove `body.is-mobile` JavaScript system, rely exclusively on CSS `.desktop-only`/`.mobile-only` classes

• **Create systematic spacing scale** - Define CSS custom properties for spacing (`--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`) and replace arbitrary values

• **Create systematic typography scale** - Define CSS custom properties for font sizes (`--text-xs`, `--text-sm`, `--text-base`, `--text-lg`, `--text-xl`, `--text-2xl`) and replace arbitrary `text-[XXpx]` utilities

• **Remove !important declarations** - Resolve specificity conflicts in about page styles by improving selector specificity instead of using `!important`

• **Standardize typography mixing** - Define clear rules for when to use serif vs sans fonts in contact information and other mixed content

• **Optimize content rendering** - Remove duplicate logo and navigation rendering in EMLayout, render once and show/hide with CSS

• **Add safe-area support** - Consider adding `env(safe-area-inset-bottom)` to mobile bottom bar for better mobile device support

• **Create layout naming convention** - Use named CSS Grid areas instead of row/col-start utilities for better maintainability

• **Implement mobile-first media queries** - Change from desktop-first to mobile-first approach for better performance and maintainability