# Changelog

## 2025-10-29

### Verified: Safe !important cleanup (Client pages only)
- Caption typography:
  - Replaced `.client-page figcaption, .client-page figcaption p { font-family: var(--font-serif) !important; color: var(--ink) !important; }`
  - With `.client-page .em [data-id="left-bottom"] figcaption, .client-page .em [data-id="left-bottom"] figcaption p { font-family: var(--font-serif); color: var(--ink); }`
- Black nav links:
  - Replaced `.client-page .nav-right { color: #000000 !important; background: none !important; border: 0/none !important; box-shadow: none !important; outline: none !important; padding: 0 !important; }`
  - With `.client-page .em [data-id="right-top"] .nav-right, .client-page .em [data-id="right-bottom"] .nav-right { color: #000; background: none; border: none; box-shadow: none; outline: none; padding: 0; }`
- Arrow button chrome removal:
  - Replaced `.client-page button.nav-right { background: transparent !important; border: none !important; box-shadow: none !important; outline: none !important; padding: 0 !important; margin: 0 !important; }`
  - With `.client-page .em [data-id="left-middle"] button.nav-right { background: transparent; border: none; box-shadow: none; outline: none; padding: 0; margin: 0; }`

Result: Visuals verified unchanged across client pages (desktop and mobile). No unrelated rules modified.
