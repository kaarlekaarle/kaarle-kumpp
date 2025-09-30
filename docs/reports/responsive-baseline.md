# Responsive Baseline 2025-09-30T12:38Z
## Media blocks
  app/globals.css:85:@media (min-width: calc(var(--bp-mobile-max) + 1px)) {
  app/globals.css:97:@media (min-width: calc(var(--bp-mobile-max) + 1px)) {
  app/globals.css:114:@media (max-width: var(--bp-mobile-max)) {
  styles/tokens.css:32:@media (max-width: var(--bp-mobile-max)){ :root{ --is-mobile: 1; } }
  styles/tokens.css:33:@media (min-width: calc(var(--bp-mobile-max) + 1px)){ :root{ --is-desktop: 1; } }
## Tokens
  styles/tokens.css:3:  --bp-mobile-max: 1023px;
  styles/tokens.css:32:@media (max-width: var(--bp-mobile-max)){ :root{ --is-mobile: 1; } }
  styles/tokens.css:33:@media (min-width: calc(var(--bp-mobile-max) + 1px)){ :root{ --is-desktop: 1; } }
  app/globals.css:85:@media (min-width: calc(var(--bp-mobile-max) + 1px)) {
  app/globals.css:97:@media (min-width: calc(var(--bp-mobile-max) + 1px)) {
  app/globals.css:114:@media (max-width: var(--bp-mobile-max)) {
  styles/tokens.css:6:  --space-2xs: 0.25rem;
  styles/tokens.css:7:  --space-xs:  0.5rem;
  styles/tokens.css:8:  --space-sm:  0.75rem;
  styles/tokens.css:9:  --space-md:  1rem;
  styles/tokens.css:10:  --space-lg:  1.5rem;
  styles/tokens.css:11:  --space-xl:  2rem;
  styles/tokens.css:12:  --space-2xl: 3rem;
  app/globals.css:46:.space-y-sm > * + * { margin-top: var(--space-sm); }
  app/globals.css:47:.space-y-md > * + * { margin-top: var(--space-md); }
  app/globals.css:48:.space-y-lg > * + * { margin-top: var(--space-lg); }
  app/globals.css:49:.mt-md { margin-top: var(--space-md); }
  app/globals.css:50:.mb-lg { margin-bottom: var(--space-lg); }
  app/globals.css:90:    gap: var(--space-md);
  app/globals.css:92:    padding: var(--space-xl);
  app/globals.css:118:    padding: var(--space-md);
  app/globals.css:124:    gap: var(--space-md);
  app/globals.css:125:    padding: clamp(var(--space-sm), 3vh, var(--space-xl)) var(--space-md);
  app/globals.css:141:    gap: var(--space-xs);
  app/globals.css:149:    gap: var(--space-xl);
  app/globals.css:164:    gap: var(--space-md);
  styles/tokens.css:15:  --text-xs:   0.75rem;
  styles/tokens.css:16:  --text-sm:   0.875rem;
  styles/tokens.css:17:  --text-base: 1rem;
  styles/tokens.css:18:  --text-lg:   1.125rem;
  styles/tokens.css:19:  --text-xl:   1.25rem;
  styles/tokens.css:20:  --text-2xl:  1.5rem;
  styles/tokens.css:21:  --text-3xl:  1.875rem;
  styles/tokens.css:22:  --text-4xl:  2.25rem;
  styles/type.css:7:.h1{ font: 700 var(--text-4xl)/1.05 var(--font-sans); letter-spacing:.02em; text-transform:uppercase; }
  styles/type.css:8:.kicker{ font: 600 var(--text-base)/1.1 var(--font-sans); letter-spacing:.06em; text-transform:uppercase; color:var(--accent); }
  styles/type.css:10:.body{ font: 500 var(--text-base)/1.4 var(--font-serif); }
  styles/type.css:11:.body-sm{ font: 500 var(--text-sm)/1.35 var(--font-serif); }
  styles/type.css:14:.contact__name{ font: 700 var(--text-sm)/1 var(--font-sans); }
  styles/type.css:15:.contact__phone{ font: 500 var(--text-sm)/1 var(--font-serif); }
  styles/type.css:16:.contact__email{ font: italic 500 var(--text-sm)/1 var(--font-serif); text-decoration:none; color:inherit; }
## Classes
  app/globals.css:98:  .desktop-only { display: contents; }
  app/globals.css:99:  .mobile-only { display: none !important; }
  app/globals.css:121:  .mobile-stack {
  app/globals.css:128:  .mobile-stack .logo { 
  app/globals.css:132:  .mobile-bottom {
  app/globals.css:159:  .desktop-only { display: none !important; }
  app/globals.css:160:  .mobile-only { display: contents; }
  app/globals.css:163:  .route-about .mobile-stack {
