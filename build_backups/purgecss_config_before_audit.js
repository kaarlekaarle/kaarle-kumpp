module.exports = {
  content: [
    './*.html',
    './client-*.html',
    './js/*.js',
    './build/css/*.css'
  ],
  css: ['./styles.css'],
  safelist: [
    // === ACCESSIBILITY ===
    // Dot navigation elements (used in 49 instances across client pages)
    '[role="tab"]',
    '[aria-selected="true"]',
    '[aria-selected]',
    
    // === CLIENT PAGE NAVIGATION ===
    // Background classes for dot states (bg-current: 10, bg-gray-400: 39 instances)
    'bg-current',
    'bg-gray-400',
    
    // === LAYOUT ELEMENTS ===
    // Figure elements (used in 52 instances)
    'figure',
    
    // Work card elements (used in 16 instances)
    '.work-card',
    
    // Client page container (used throughout client pages)
    '.client-page',
    
    // Grid layout elements
    '[data-id="left-middle"]',
    
    // === MOBILE UTILITIES ===
    // Flexbox utilities (heavily used: .flex: 165, .flex-col: 32, .items-center: 99, .justify-center: 84)
    '.mx-auto',
    '.flex',
    '.flex-col',
    '.items-center',
    '.h-full',
    '.justify-center',
    
    // Spacing utilities (gap-2: 10, pb-4: 22, mb-6: 16 instances)
    '.pb-4',
    '.gap-2',
    '.flex-1',
    '.max-w-full',
    '.relative.mb-6', // Combined class, more specific than separate entries
    
    // === GALLERY ELEMENTS ===
    // Image dimensions (w-[720px]: 16, h-[450px]: 16 instances)
    '.w-\\[720px\\]',
    '.h-\\[450px\\]',
    
    // Image states
    '.slide-image',
    '.active'
  ]
}