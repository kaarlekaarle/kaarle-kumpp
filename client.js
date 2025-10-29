// Client Page Interactive Logic
// ===========================

// Global state
let currentSlide = 0;
let totalSlides = window.TOTAL_SLIDES || 1;
let clients = [];
let currentClientSlug = window.CURRENT_CLIENT_SLUG || 'keskusteluohjelma';

// Order clients in pyramid pattern (same as works page)
function orderClientsPyramid(clientsList) {
  const sorted = [...clientsList].sort((a, b) => a.name.length - b.name.length);
  const oddRanked = sorted.filter((_, idx) => idx % 2 === 0);
  const evenRankedReversed = sorted.filter((_, idx) => idx % 2 === 1).reverse();
  return [...oddRanked, ...evenRankedReversed];
}

// Render clients list (desktop)
function renderClients() {
  const clientsList = document.getElementById('clients-list');
  if (!clientsList) return;
  
  clientsList.innerHTML = '';
  
  const orderedClients = orderClientsPyramid(clients);
  
  orderedClients.forEach(client => {
    const isCurrent = client.slug === currentClientSlug;
    const button = document.createElement('button');
    button.setAttribute('data-kind', 'client');
    button.setAttribute('data-slug', client.slug);
    button.setAttribute('role', 'option');
    button.setAttribute('tabindex', '0');
    button.className = 'client-button';
    button.style.fontFamily = 'var(--font-sans)';
    button.style.fontSize = 'var(--fs-desktop)';
    button.style.fontWeight = '400';
    button.style.textTransform = 'uppercase';
    button.style.letterSpacing = '.04em';
    button.style.cursor = isCurrent ? 'default' : 'pointer';
    button.style.display = 'block';
    button.style.textAlign = 'left';
    button.style.marginBottom = '0.5em';
    button.style.color = '#0000EE';
    button.style.opacity = isCurrent ? '1' : '0.4';
    button.style.textDecoration = 'none';
    button.style.border = 'none';
    button.style.background = 'none';
    button.style.padding = '0';
    button.textContent = client.name;
    
    // Event listeners - navigate to client page
    if (!isCurrent) {
      button.addEventListener('click', () => {
        window.location.href = buildClientUrl(client.slug);
      });
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          window.location.href = buildClientUrl(client.slug);
        }
      });
    }
    
    clientsList.appendChild(button);
  });
}

// Render mobile clients
function renderMobileClients() {
  const mobileClients = document.getElementById('mobile-clients');
  if (!mobileClients) return;
  
  const orderedClients = orderClientsPyramid(clients);
  const height = orderedClients.length * 1.4;

  let html = `<div style="display: inline-block; text-align: left; height: ${height}rem; position: relative;">`;
  
  orderedClients.forEach((client, index) => {
    const isCurrent = client.slug === currentClientSlug;
    const opacity = isCurrent ? 1 : 0.4;
    const cursor = isCurrent ? 'default' : 'pointer';
    
    html += `<div class="mobile-client" data-slug="${client.slug}" style="font-family: var(--font-sans); font-size: var(--fs-desktop); font-weight: 400; line-height: 1.2; text-transform: uppercase; letter-spacing: .04em; cursor: ${cursor}; color: #0000EE; opacity: ${opacity}; position: absolute; top: ${index * 1.4}rem; left: 0; white-space: nowrap;">${client.name}</div>`;
  });
  
  html += '</div>';
  mobileClients.innerHTML = html;
  
  // Add click handlers with mobile-optimized event handling
  document.querySelectorAll('.mobile-client').forEach(div => {
    const slug = div.getAttribute('data-slug');
    if (slug !== currentClientSlug) {
      // Use both click and touchend for better mobile compatibility
      const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = buildClientUrl(slug);
      };
      
      div.addEventListener('click', handleClick);
      div.addEventListener('touchend', handleClick);
    }
  });
}

// Render mobile gallery
function renderMobileGallery() {
  const mobileGallery = document.querySelector('.mobile-gallery');
  if (!mobileGallery) {
    return;
  }
  
  // Get current client data
  const currentClient = clients.find(client => client.slug === currentClientSlug);
  if (!currentClient || !currentClient.slides) {
    return;
  }
  
  const slides = currentClient.slides;
  totalSlides = slides.length;
  
  let html = '';
  
  // Add dots if more than one slide
  if (slides.length > 1) {
    html += '<div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 6px;">';
    slides.forEach((_, index) => {
      html += `<button class="mobile-dot" data-slide="${index}" style="width: 8px; height: 8px; border-radius: 50%; border: none; background-color: ${index === 0 ? '#000' : '#ccc'}; cursor: pointer; padding: 0;" aria-label="Go to slide ${index + 1}"></button>`;
    });
    html += '</div>';
  }
  
  // Add image container
  html += `<div class="mobile-image-container" style="position: relative; width: 100%; aspect-ratio: 4/3; touch-action: manipulation;">`;
  
  slides.forEach((slide, index) => {
    const displayStyle = index === 0 ? 'block' : 'none';
    // Fix image path to use images/ prefix for HTML static version
    const imageSrc = slide.src.startsWith('/clients/') ? slide.src.replace('/clients/', 'images/clients/') : slide.src;
    html += `<img src="${imageSrc}" alt="${slide.alt || ''}" class="mobile-slide-image" data-slide="${index}" style="width: 100%; height: 100%; object-fit: contain; display: ${displayStyle};" />`;
  });
  
  html += '</div>';
  
  mobileGallery.innerHTML = html;
  
  // Add click handlers for dots with mobile-optimized event handling
  document.querySelectorAll('.mobile-dot').forEach(button => {
    const handleDotClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const slideIndex = parseInt(button.getAttribute('data-slide'));
      showSlide(slideIndex);
    };
    
    button.addEventListener('click', handleDotClick);
    button.addEventListener('touchend', handleDotClick);
  });
}

// Helper function to build navigation URLs
function buildClientUrl(slug) {
  // Check if we're in htmlpreview mode by checking multiple indicators
  const currentUrl = window.location.href;
  const referrer = document.referrer;
  
  
  // Check both current URL and referrer for htmlpreview
  const isHtmlPreview = currentUrl.includes('htmlpreview.github.io') || 
                        currentUrl.includes('html-preview.github.io') ||
                        referrer.includes('htmlpreview.github.io') ||
                        referrer.includes('html-preview.github.io');
  
  if (isHtmlPreview) {
    
    // Try to extract from current URL first, then referrer
    let urlMatch = currentUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/html-static-test/);
    if (!urlMatch && referrer) {
      urlMatch = referrer.match(/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/html-static-test/);
    }
    
    
    if (urlMatch) {
      const [, owner, repo, branch] = urlMatch;
      const newUrl = `https://html-preview.github.io/?url=https://github.com/${owner}/${repo}/blob/${branch}/html-static-test/client-${slug}.html`;
      return newUrl;
    }
  }
  
  // Fallback: check if we're on GitHub at all (even raw)
  if (currentUrl.includes('github') || referrer.includes('github')) {
    // Assume we're on kaarlekaarle/kaarle-kumpp/mobile-ready-for-collab
    const newUrl = `https://html-preview.github.io/?url=https://github.com/kaarlekaarle/kaarle-kumpp/blob/mobile-ready-for-collab/html-static-test/client-${slug}.html`;
    return newUrl;
  }
  
  // Default to relative URL for local/direct access
  return `client-${slug}.html`;
}

function buildWorksUrl() {
  const currentUrl = window.location.href;
  const referrer = document.referrer;
  
  const isHtmlPreview = currentUrl.includes('htmlpreview.github.io') || 
                        currentUrl.includes('html-preview.github.io') ||
                        referrer.includes('htmlpreview.github.io') ||
                        referrer.includes('html-preview.github.io');
  
  if (isHtmlPreview) {
    let urlMatch = currentUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/html-static-test/);
    if (!urlMatch && referrer) {
      urlMatch = referrer.match(/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/html-static-test/);
    }
    
    if (urlMatch) {
      const [, owner, repo, branch] = urlMatch;
      return `https://html-preview.github.io/?url=https://github.com/${owner}/${repo}/blob/${branch}/html-static-test/works.html`;
    }
  }
  
  // Fallback for GitHub
  if (currentUrl.includes('github') || referrer.includes('github')) {
    return `https://html-preview.github.io/?url=https://github.com/kaarlekaarle/kaarle-kumpp/blob/mobile-ready-for-collab/html-static-test/works.html`;
  }
  
  return 'works.html';
}

// Gallery functionality
function initGallery() {
  const desktopSlides = document.querySelectorAll('.desktop-only .slide-image');
  const mobileSlides = document.querySelectorAll('.mobile-only .mobile-slide-image');
  const desktopDots = document.querySelectorAll('.desktop-only [data-slide]');
  const mobileDots = document.querySelectorAll('.mobile-only .mobile-dot');
  const prevButton = document.querySelector('[data-action="prev"]');
  const nextButton = document.querySelector('[data-action="next"]');
  
  function showSlide(index) {
    // Hide all desktop slides
    desktopSlides.forEach(img => {
      img.style.display = 'none';
      img.classList.remove('active');
    });
    
    // Show current desktop slide
    if (desktopSlides[index]) {
      desktopSlides[index].style.display = 'block';
      desktopSlides[index].classList.add('active');
    }
    
    // Hide all mobile slides
    mobileSlides.forEach(img => {
      img.style.display = 'none';
      img.classList.remove('active');
    });
    
    // Show current mobile slide
    if (mobileSlides[index]) {
      mobileSlides[index].style.display = 'block';
      mobileSlides[index].classList.add('active');
    }
    
    // Update desktop dots
    desktopDots.forEach((btn, i) => {
      if (i === index) {
        btn.classList.remove('bg-gray-400');
        btn.classList.add('bg-current');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('bg-current');
        btn.classList.add('bg-gray-400');
        btn.setAttribute('aria-selected', 'false');
      }
    });
    
    // Update mobile dots
    mobileDots.forEach((btn, i) => {
      if (i === index) {
        btn.style.backgroundColor = '#000';
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.style.backgroundColor = '#ccc';
        btn.setAttribute('aria-selected', 'false');
      }
    });
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('slide', index);
    window.history.replaceState({}, '', url);
    
    currentSlide = index;
  }
  
  function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
  }
  
  function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
  }
  
  // Desktop button event listeners
  desktopDots.forEach((btn, index) => {
    btn.addEventListener('click', () => showSlide(index));
  });
  
  // Mobile button event listeners
  mobileDots.forEach((btn, index) => {
    btn.addEventListener('click', () => showSlide(index));
  });
  
  
  if (prevButton) {
    prevButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      prevSlide();
    });
  }
  if (nextButton) {
    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      nextSlide();
    });
  }
  
  // Desktop image click to advance
  desktopSlides.forEach(img => {
    img.addEventListener('click', nextSlide);
  });
  
  // Mobile image click to advance
  mobileSlides.forEach(img => {
    img.addEventListener('click', nextSlide);
  });
  
  // Touch/swipe support for mobile galleries
  let touchStartX = null;
  let touchEndX = null;
  
  const mobileGalleries = document.querySelectorAll('.mobile-only .mobile-gallery');
  mobileGalleries.forEach(gallery => {
    gallery.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    
    gallery.addEventListener('touchmove', (e) => {
      touchEndX = e.changedTouches[0].clientX;
    }, { passive: true });
    
    gallery.addEventListener('touchend', () => {
      if (!touchStartX || !touchEndX) return;
      
      const distance = touchStartX - touchEndX;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;
      
      if (isLeftSwipe && totalSlides > 1) {
        nextSlide();
      }
      if (isRightSwipe && totalSlides > 1) {
        prevSlide();
      }
      
      touchStartX = null;
      touchEndX = null;
    }, { passive: true });
  });
  
  // Keyboard navigation
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      window.location.href = buildWorksUrl();
      return;
    }
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
    
    // Handle up/down for client navigation
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const currentIndex = clients.findIndex(client => client.slug === currentClientSlug);
      if (currentIndex !== -1) {
        let newIndex;
        if (e.key === 'ArrowUp') {
          newIndex = currentIndex <= 0 ? clients.length - 1 : currentIndex - 1;
        } else {
          newIndex = currentIndex >= clients.length - 1 ? 0 : currentIndex + 1;
        }
        const nextClient = clients[newIndex];
        if (nextClient) {
          window.location.href = buildClientUrl(nextClient.slug);
        }
      }
    }
  }
  
  window.addEventListener('keydown', handleKeydown);
  
  // Initialize with slide from URL or 0
  const urlParams = new URLSearchParams(window.location.search);
  const slideParam = urlParams.get('slide');
  const initialSlide = slideParam ? Math.max(0, Math.min(totalSlides - 1, parseInt(slideParam))) : 0;
  showSlide(initialSlide);
}

// Initialize the page
async function init() {
  try {
    // Load clients data
    clients = window.CLIENTS_DATA || [];
    
    // Use the embedded current client slug
    if (!window.CURRENT_CLIENT_SLUG) {
      // Fallback: Get current client from URL
      const urlParams = new URLSearchParams(window.location.search);
      const slugParam = urlParams.get('slug');
      if (slugParam) {
        currentClientSlug = slugParam;
      }
    }
    
    // Render desktop and mobile views
    renderClients();
    renderMobileClients();
    renderMobileGallery();
    
    // Initialize gallery
    initGallery();
    
  } catch (error) {
    console.error('Error initializing client page:', error);
  }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
