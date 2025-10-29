// Dev/Prod console control for Node: silence console.log in production
const __IS_DEV__ = process.env.NODE_ENV !== 'production';
if (!__IS_DEV__) {
  // Keep errors visible, silence logs/debug/warn
  console.log = () => {};
  console.debug = () => {};
}
const fs = require('fs');
const path = require('path');

// Read clients data
const clientsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/clients.json'), 'utf8'));

// Copy all client images
clientsData.forEach(client => {
  const clientFolder = client.slug.toUpperCase().replace(/-/g, ' ');
  const sourcePath = path.join(__dirname, '../html-static-test/public/clients', clientFolder);
  const destPath = path.join(__dirname, 'images/clients', clientFolder);
  
  // Create destination folder
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true });
  }
  
  // Copy all files from source to destination
  if (fs.existsSync(sourcePath)) {
    const files = fs.readdirSync(sourcePath);
    files.forEach(file => {
      const src = path.join(sourcePath, file);
      const dest = path.join(destPath, file);
      if (fs.statSync(src).isFile()) {
        fs.copyFileSync(src, dest);
        console.log(`Copied: ${file} for ${client.name}`);
      }
    });
  } else {
    console.warn(`Warning: Source folder not found for ${client.name}: ${sourcePath}`);
  }
});

// Generate HTML for each client
function generateClientHTML(client) {
  const clientFolder = client.slug.toUpperCase().replace(/-/g, ' ');
  const slideCount = client.slides ? client.slides.length : 0;
  const hasMultipleSlides = slideCount > 1;
  
  // Generate dots HTML
  let dotsHTML = '';
  if (hasMultipleSlides) {
    dotsHTML = `
                <div class="flex justify-center pb-4">
                  <div role="tablist" aria-label="Slides" class="flex justify-center gap-2">
${client.slides.map((_, idx) => `                    <button role="tab" aria-selected="${idx === 0 ? 'true' : 'false'}" aria-label="Slide ${idx + 1} of ${slideCount}" class="h-2 w-2 rounded-full ${idx === 0 ? 'bg-current' : 'bg-gray-400'}" data-slide="${idx}"></button>`).join('\n')}
                  </div>
                </div>`;
  }
  
  // Generate slides HTML
  let slidesHTML = '';
  if (client.slides && client.slides.length > 0) {
    slidesHTML = client.slides.map((slide, idx) => {
      const src = slide.src.replace('/clients/', 'images/clients/');
      return `                        <img src="${src}" alt="${slide.alt || client.name + ' project image ' + (idx + 1)}" class="slide-image${idx === 0 ? ' active' : ''}" data-slide="${idx}" style="display: ${idx === 0 ? 'block' : 'none'}; object-fit: contain; width: 100%; height: 100%;" />`;
    }).join('\n');
  }
  
  // Generate arrows HTML
  let arrowsHTML = '';
  if (hasMultipleSlides) {
    arrowsHTML = `
                      <button aria-label="Previous slide" class="nav-right" data-action="prev">←</button>
                      <button aria-label="Next slide" class="nav-right" data-action="next">→</button>`;
  }
  
  // Generate links HTML
  let linksHTML = '';
  if (client.links && client.links.length > 0) {
    linksHTML = `
                <div class="flex justify-center pb-4" style="gap: 1rem;">
${client.links.map(link => `                  <a href="${link.url}" target="_blank" rel="noreferrer" aria-label="${link.icon}" class="opacity-80 hover:opacity-100">
                    <img src="images/icons/${link.icon}.svg" alt="${link.icon}" style="width: 1.25rem; height: 1.25rem;" />
                  </a>`).join('\n')}
                </div>`;
  }
  
  // Generate mobile links HTML
  let mobileLinksHTML = '';
  if (client.links && client.links.length > 0) {
    mobileLinksHTML = `
                <div class="flex justify-center" style="gap: 1rem;">
${client.links.map(link => `                  <a href="${link.url}" target="_blank" rel="noreferrer" aria-label="${link.icon}" class="opacity-80 hover:opacity-100">
                    <img src="images/icons/${link.icon}.svg" alt="${link.icon}" style="width: 1rem; height: 1rem;" />
                  </a>`).join('\n')}
                </div>`;
  }
  
  const logoSrc = client.logo ? client.logo.replace('/clients/', 'images/clients/') : '';
  const logoHTML = logoSrc ? 
    `<img src="${logoSrc}" alt="${client.name}" style="height: 3rem; width: auto; object-fit: contain;" />` :
    `<div class="sans fs-logo uppercase tracking-wide font-normal">${client.name}</div>`;
  
  const summary = Array.isArray(client.summary) ? client.summary.join(' ') : client.summary;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${client.name} - Kaarle & Kumpp.</title>
  <meta name="description" content="Problem solving and storytelling.">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="icon" type="image/svg+xml" href="icon.svg">
  <link rel="apple-touch-icon" href="icon.svg">
  
  <link rel="stylesheet" href="styles.css">
  
  <!-- Load Google Font EB Garamond for serif -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
</head>
<body data-page="client">
  <div class="site-frame">
    <main class="bg-paper text-ink client-page">
      <div id="root">
        <main class="em">
          
          <!-- Desktop Layout - Left Column -->
          <aside class="desktop-only">
            <!-- Left Top - Client Header -->
            <div data-id="left-top">
              <div class="client-header">
                <div class="flex items-center justify-between w-full">
                  <div>
                    ${logoHTML}
                  </div>
                  <div>
                    <a href="works.html" aria-label="Close" class="nav-right leading-none">×</a>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Left Middle - Client Gallery -->
            <div data-id="left-middle">
              <div class="work-card mx-auto flex flex-col items-center h-full">
                <!-- Dots row -->${dotsHTML}

                <!-- Spacer to center content -->
                <div class="flex-1 flex items-center">
                  <div class="max-w-full">
                    <!-- Media region with fixed size -->
                    <div class="relative mb-6">
                      <!-- Navigation arrows -->${arrowsHTML}
                      
                      <!-- Fixed size image container -->
                      <figure class="mx-auto w-[720px] h-[450px] flex items-center justify-center relative">
${slidesHTML}
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Left Bottom - Client Caption -->
            <div data-id="left-bottom">
              <div class="h-full flex flex-col items-center justify-between" style="min-height: 150px;">
                <!-- Caption -->
                <figcaption>
                  <div class="mx-auto max-w-[73ch] text-black text-sm leading-relaxed space-y-1 text-center font-serif mobile:text-xs mobile:max-w-[60ch]">
                    <p>${summary}</p>
                  </div>
                </figcaption>

                <!-- Spacer to push links down -->
                <div class="flex-1"></div>

                <!-- Links row -->${linksHTML}
              </div>
            </div>
          </aside>

          <!-- Desktop Layout - Right Column -->
          <article class="desktop-only">
            <!-- Right Top - Logo Link -->
            <div data-id="right-top">
              <a href="/" class="nav-right leading-none">
                KAARLE <span class="apple-mark">&#xF8FF;</span> KUMPP.
              </a>
            </div>
            
            <!-- Right Middle - Client List -->
            <div data-id="right-middle">
              <div id="clients-list" class="about-prose" role="listbox" aria-label="Clients">
                <!-- Clients will be dynamically loaded here -->
              </div>
            </div>
            
            <!-- Right Bottom - About Link -->
            <div data-id="right-bottom">
              <a href="about.html" class="nav-right">ABOUT</a>
            </div>
          </article>

          <!-- Mobile Layout -->
          <div data-id="left-middle" class="mobile-only">
            <div class="left-cell flex items-center justify-center logo">
              <div class="text-center leading-tight">
                ${logoHTML}
              </div>
            </div>
          </div>
          
          <!-- Mobile Additional Content -->
          <div class="mobile-only">
            <div class="mobile-content">
              <!-- Mobile Gallery -->
              <div data-id="right-middle" style="margin-top: 1.25rem; margin-bottom: 0;">
                <div class="mobile-gallery">
                  <!-- Mobile gallery content will be added here -->
                </div>
              </div>
              
              <!-- Mobile Caption -->
              <div data-id="right-middle" style="margin-top: 0.375rem; margin-bottom: 1.25rem;">
                <div class="text-black text-xs leading-relaxed space-y-1 text-center font-serif max-w-[60ch] mx-auto" style="padding-bottom: 1rem;">
                  <p>${summary}</p>
                </div>
                ${mobileLinksHTML}
              </div>
              
              <!-- Mobile Client List -->
              <div id="mobile-clients" style="width: 100%; padding-right: 1.5rem; margin-bottom: 2.5rem; text-align: center;">
                <!-- Mobile clients will be dynamically loaded here -->
              </div>
              
              <!-- Kaarle logo -->
              <div data-id="mobile-kaarle-logo" style="margin-bottom: 2.5rem; text-align: center;">
                <a href="/" style="text-decoration: none; color: inherit; display: block;">
                  <div class="text-center leading-tight">
                    <div class="sans fs-logo uppercase tracking-wide font-normal">KAARLE</div>
                    <div class="my-1 flex justify-center fs-logo">
                      <span aria-hidden="true" title="Logo" class="apple-mark">&#xF8FF;</span>
                    </div>
                    <div class="sans fs-logo uppercase tracking-wide font-normal">KUMPP.</div>
                  </div>
                </a>
              </div>

              <!-- About link -->
              <div data-id="mobile-nav" class="mobile-nav" style="text-align: center; width: 100%; margin-bottom: 2.5rem;">
                <a href="about.html" class="nav-right">ABOUT</a>
              </div>
            </div>
          </div>
          
        </main>
      </div>
    </main>
  </div>

  <!-- Client Page JavaScript -->
  <script type="text/javascript">
    // Embed clients data to avoid CORS issues
    window.CLIENTS_DATA = JSON.parse(${JSON.stringify(JSON.stringify(clientsData.map(c => ({
      slug: c.slug,
      name: c.name,
      summary: c.summary,
      fields: c.fields,
      slides: c.slides,
      logo: c.logo,
      links: c.links
    }))))});
    window.CURRENT_CLIENT_SLUG = ${JSON.stringify(client.slug)};
    window.TOTAL_SLIDES = ${slideCount};
  </script>
  <script src="client.js"></script>
  
  <!-- Debug toggle script (press 'd' key) -->
  <script>
    (function(){
      try {
        var q = new URLSearchParams(window.location.search);
        if (q.get('debug') === '1') document.documentElement.classList.add('debug');
        if (q.get('debug') === '2') document.body.classList.add('debug-on');

        window.addEventListener('keydown', function(e){
          if (e.key.toLowerCase() === 'd' && !(e.metaKey || e.ctrlKey || e.altKey)) {
            if (e.shiftKey) {
              document.body.classList.toggle('debug-on');
            } else {
              document.documentElement.classList.toggle('debug');
            }
          }
        }, {passive:true});
      } catch(err) {}
    })();
  </script>
</body>
</html>`;
}

// Generate all client pages
clientsData.forEach(client => {
  const html = generateClientHTML(client);
  const filename = `client-${client.slug}.html`;
  fs.writeFileSync(path.join(__dirname, filename), html);
  console.log(`Generated: ${filename}`);
});

console.log('\nAll client pages generated successfully!');

