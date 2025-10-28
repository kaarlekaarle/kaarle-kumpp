// Works Page Interactive Logic
// ===========================

// Global state
let fields = [];
let clients = [];
let hoveredItem = null;
let selectedField = null; // For mobile filtering
let fieldRefs = new Map();
let clientRefs = new Map();
let adjacencyMap = { byField: new Map(), byClient: new Map() };
let hoverTimeout = null;

// Utility: Slugify function
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Utility: Hash string for seeded random
function hashStr(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Utility: Seeded random number generator
function rng(seed) {
  return function() {
    let t = (seed += 0x6D2B79F5) | 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Bezier path generator (with seeded variation for organic look)
function bezierPath(S, E, seedKey) {
  const rnd = rng(hashStr(seedKey));
  
  const dx = E.x - S.x;
  const dy = E.y - S.y;
  const d = Math.hypot(dx, dy) || 1;
  
  // Unit normal to the chord
  let nx = -dy / d;
  let ny = dx / d;
  
  // Bend direction (stable per edge)
  const bendSign = rnd() < 0.5 ? 1 : -1;
  nx *= bendSign;
  ny *= bendSign;
  
  // Curvature with variation
  const r = Math.max(40, Math.min(500, 0.35 * d * (0.4 + 1.2 * rnd())));
  
  // Monotone X for controls
  const c1x = S.x + (0.2 + 0.1 * rnd()) * dx;
  const c2x = E.x - (0.2 + 0.1 * rnd()) * dx;
  
  // Add variation to avoid stacking
  const fanJitter = (rnd() - 0.5) * Math.min(150, 0.3 * d);
  const jitterY = fanJitter * ny;
  
  // Control points
  const c1y = S.y + 0.25 * dy + (0.3 + 0.8 * rnd()) * r * ny + jitterY;
  const c2y = E.y - 0.25 * dy + (0.5 + 1.0 * rnd()) * r * ny;
  
  const dStr = `M ${S.x},${S.y} C ${c1x},${c1y} ${c2x},${c2y} ${E.x},${E.y}`;
  const width = 1 + 0.4 * rnd();
  
  return { d: dStr, width };
}

// Build adjacency map from clients data
function buildAdjacencyMap() {
  adjacencyMap = { byField: new Map(), byClient: new Map() };
  
  clients.forEach(client => {
    const clientSlug = client.slug;
    
    if (client.fields && Array.isArray(client.fields)) {
      client.fields.forEach(fieldId => {
        // Map field to clients
        if (!adjacencyMap.byField.has(fieldId)) {
          adjacencyMap.byField.set(fieldId, new Set());
        }
        adjacencyMap.byField.get(fieldId).add(clientSlug);
        
        // Map client to fields
        if (!adjacencyMap.byClient.has(clientSlug)) {
          adjacencyMap.byClient.set(clientSlug, new Set());
        }
        adjacencyMap.byClient.get(clientSlug).add(fieldId);
      });
    }
  });
}

// Get related items
function getRelatedClients(fieldSlug) {
  const related = Array.from(adjacencyMap.byField.get(fieldSlug) || []);
  console.log(`Field "${fieldSlug}" is related to clients:`, related);
  return related;
}

function getRelatedFields(clientSlug) {
  const related = Array.from(adjacencyMap.byClient.get(clientSlug) || []);
  console.log(`Client "${clientSlug}" is related to fields:`, related);
  return related;
}

// Helper function to build navigation URLs
function buildClientUrl(slug) {
  // Check if we're in htmlpreview mode by checking multiple indicators
  const currentUrl = window.location.href;
  const referrer = document.referrer;
  
  console.log('[works.js buildClientUrl] Current URL:', currentUrl);
  console.log('[works.js buildClientUrl] Referrer:', referrer);
  console.log('[works.js buildClientUrl] Target slug:', slug);
  
  // Check both current URL and referrer for htmlpreview
  const isHtmlPreview = currentUrl.includes('htmlpreview.github.io') || 
                        currentUrl.includes('html-preview.github.io') ||
                        referrer.includes('htmlpreview.github.io') ||
                        referrer.includes('html-preview.github.io');
  
  if (isHtmlPreview) {
    console.log('[works.js buildClientUrl] Detected htmlpreview mode');
    
    // Try to extract from current URL first, then referrer
    let urlMatch = currentUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/html-static-test/);
    if (!urlMatch && referrer) {
      urlMatch = referrer.match(/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/html-static-test/);
    }
    
    console.log('[works.js buildClientUrl] URL match result:', urlMatch);
    
    if (urlMatch) {
      const [, owner, repo, branch] = urlMatch;
      const newUrl = `https://html-preview.github.io/?url=https://github.com/${owner}/${repo}/blob/${branch}/html-static-test/client-${slug}.html`;
      console.log('[works.js buildClientUrl] Returning preview URL:', newUrl);
      return newUrl;
    }
  }
  
  // Fallback: check if we're on GitHub at all (even raw)
  if (currentUrl.includes('github') || referrer.includes('github')) {
    // Assume we're on kaarlekaarle/kaarle-kumpp/mobile-ready-for-collab
    const newUrl = `https://html-preview.github.io/?url=https://github.com/kaarlekaarle/kaarle-kumpp/blob/mobile-ready-for-collab/html-static-test/client-${slug}.html`;
    console.log('[works.js buildClientUrl] GitHub detected, using hardcoded preview URL:', newUrl);
    return newUrl;
  }
  
  // Default to relative URL for local/direct access
  console.log('[works.js buildClientUrl] Returning relative URL:', `client-${slug}.html`);
  return `client-${slug}.html`;
}

// Order clients in pyramid pattern (shortest at ends, longest in middle)
function orderClientsPyramid(clientsList) {
  const sorted = [...clientsList].sort((a, b) => a.name.length - b.name.length);
  const oddRanked = sorted.filter((_, idx) => idx % 2 === 0);
  const evenRankedReversed = sorted.filter((_, idx) => idx % 2 === 1).reverse();
  return [...oddRanked, ...evenRankedReversed];
}

// Render fields list (desktop)
function renderFields() {
  const fieldsList = document.getElementById('fields-list');
  fieldsList.innerHTML = '';
  
  fields.forEach((field, index) => {
    const fieldSlug = field.id;
    const isLast = index === fields.length - 1;
    
    const button = document.createElement('button');
    button.setAttribute('data-kind', 'field');
    button.setAttribute('data-slug', fieldSlug);
    button.setAttribute('role', 'option');
    button.setAttribute('tabindex', '0');
    button.className = `field-button${!isLast ? ' mb-6' : ''}`;
    button.style.fontFamily = 'var(--font-serif)';
    button.style.fontSize = '1em';
    button.style.fontVariant = 'small-caps';
    button.style.fontWeight = '400';
    button.style.textAlign = 'right';
    button.style.display = 'block';
    button.style.width = '100%';
    button.style.letterSpacing = '.04em';
    button.style.lineHeight = '1.2'; /* Tighter line height */
    button.style.transition = 'color 0.2s ease';
    button.style.cursor = 'default';
    button.style.border = 'none';
    button.style.background = 'none';
    button.style.padding = '0';
    button.style.margin = '0';
    button.style.color = 'inherit';
    button.textContent = field.name;
    
    // Event listeners
    button.addEventListener('mouseenter', () => handleFieldHover(fieldSlug));
    button.addEventListener('mouseleave', handleFieldLeave);
    button.addEventListener('focus', () => handleFieldHover(fieldSlug));
    button.addEventListener('blur', handleFieldLeave);
    
    fieldsList.appendChild(button);
    fieldRefs.set(fieldSlug, button);
  });
}

// Render clients list (desktop)
function renderClients() {
  const clientsList = document.getElementById('clients-list');
  clientsList.innerHTML = '';
  
  const orderedClients = orderClientsPyramid(clients);
  
  orderedClients.forEach(client => {
    const button = document.createElement('button');
    button.setAttribute('data-kind', 'client');
    button.setAttribute('data-slug', client.slug);
    button.setAttribute('role', 'option');
    button.setAttribute('tabindex', '0');
    button.className = 'client-button';
    button.style.fontFamily = 'var(--font-sans)';
    button.style.fontSize = 'var(--fs-right)';
    button.style.fontWeight = '400';
    button.style.textTransform = 'uppercase';
    button.style.letterSpacing = '.04em';
    button.style.cursor = 'pointer';
    button.style.display = 'block';
    button.style.textAlign = 'left';
    button.style.marginBottom = '0.5em';
    button.style.color = '#0000EE';
    button.style.textDecoration = 'none';
    button.style.border = 'none';
    button.style.background = 'none';
    button.style.padding = '0';
    button.textContent = client.name;
    
    // Event listeners
    button.addEventListener('mouseenter', () => handleClientHover(client.slug));
    button.addEventListener('mouseleave', handleClientLeave);
    button.addEventListener('focus', () => handleClientHover(client.slug));
    button.addEventListener('blur', handleClientLeave);
    button.addEventListener('click', () => {
      window.location.href = buildClientUrl(client.slug);
    });
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        window.location.href = buildClientUrl(client.slug);
      }
    });
    
    clientsList.appendChild(button);
    clientRefs.set(client.slug, button);
  });
}

// Render mobile fields
function renderMobileFields() {
  const mobileFields = document.getElementById('mobile-fields');
  if (!mobileFields) return;
  
  const style = {
    fontFamily: 'var(--font-serif)',
    fontSize: '0.7em',
    fontVariant: 'small-caps',
    fontWeight: '400',
    color: '#000000',
    lineHeight: '1.68'
  };
  
  let html = '<div style="' + Object.entries(style).map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v}`).join('; ') + '">';
  
  // Line 1: ALL CLIENTS, first field
  html += '<div>';
  html += `<span class="mobile-field-selector ${selectedField === null ? 'selected' : ''}" data-field="null" style="cursor: pointer;">ALL CLIENTS</span>, `;
  if (fields[0]) {
    html += `<span class="mobile-field-selector ${selectedField === fields[0].id ? 'selected' : ''}" data-field="${fields[0].id}" style="cursor: pointer;">${fields[0].name.toUpperCase()}</span>, `;
  }
  html += '</div>';
  
  // Line 2: fields 1 and 2
  html += '<div>';
  if (fields[1]) {
    html += `<span class="mobile-field-selector ${selectedField === fields[1].id ? 'selected' : ''}" data-field="${fields[1].id}" style="cursor: pointer;">${fields[1].name.toUpperCase()}</span>, `;
  }
  if (fields[2]) {
    html += `<span class="mobile-field-selector ${selectedField === fields[2].id ? 'selected' : ''}" data-field="${fields[2].id}" style="cursor: pointer;">${fields[2].name.toUpperCase()}</span>, `;
  }
  html += '</div>';
  
  // Line 3: fields 3 and 4
  html += '<div>';
  if (fields[3]) {
    html += `<span class="mobile-field-selector ${selectedField === fields[3].id ? 'selected' : ''}" data-field="${fields[3].id}" style="cursor: pointer;">${fields[3].name.toUpperCase()}</span>, `;
  }
  if (fields[4]) {
    html += `<span class="mobile-field-selector ${selectedField === fields[4].id ? 'selected' : ''}" data-field="${fields[4].id}" style="cursor: pointer;">${fields[4].name.toUpperCase()}</span>, `;
  }
  html += '</div>';
  
  // Line 4: fields 5 and 6
  html += '<div>';
  if (fields[5]) {
    html += `<span class="mobile-field-selector ${selectedField === fields[5].id ? 'selected' : ''}" data-field="${fields[5].id}" style="cursor: pointer;">${fields[5].name.toUpperCase()}</span>, `;
  }
  if (fields[6]) {
    html += `<span class="mobile-field-selector ${selectedField === fields[6].id ? 'selected' : ''}" data-field="${fields[6].id}" style="cursor: pointer;">${fields[6].name.toUpperCase()}</span>`;
  }
  html += '</div>';
  
  html += '</div>';
  mobileFields.innerHTML = html;
  
  // Add click handlers
  document.querySelectorAll('.mobile-field-selector').forEach(span => {
    span.addEventListener('click', () => {
      const fieldId = span.getAttribute('data-field');
      handleMobileFieldClick(fieldId === 'null' ? null : fieldId);
    });
  });
}

// Render mobile clients
function renderMobileClients() {
  const mobileClients = document.getElementById('mobile-clients');
  if (!mobileClients) return;
  
  const orderedClients = orderClientsPyramid(clients);
  const height = orderedClients.length * 1.4;
  
  let html = `<div style="display: inline-block; vertical-align: top; text-align: left; height: ${height}rem; position: relative;">`;
  
  orderedClients.forEach((client, index) => {
    const isMatch = !selectedField || (client.fields && client.fields.includes(selectedField));
    const opacity = isMatch ? 1 : 0.25;
    
    html += `<div class="mobile-client" data-slug="${client.slug}" style="font-family: var(--font-sans); font-size: var(--fs-right); font-weight: 400; line-height: 1.2; text-transform: uppercase; letter-spacing: .04em; cursor: pointer; opacity: ${opacity}; transition: opacity 0.3s ease; color: #0000EE; position: absolute; top: ${index * 1.4}rem; left: 0; white-space: nowrap;">${client.name}</div>`;
  });
  
  html += '</div>';
  mobileClients.innerHTML = html;
  
  // Add click handlers
  document.querySelectorAll('.mobile-client').forEach(div => {
    div.addEventListener('click', () => {
      const slug = div.getAttribute('data-slug');
      handleClientClick(slug);
    });
  });
}

// Handle mobile field click
function handleMobileFieldClick(fieldId) {
  selectedField = fieldId;
  renderMobileFields();
  renderMobileClients();
}

// Hover handlers
function handleFieldHover(fieldSlug) {
  if (hoverTimeout) clearTimeout(hoverTimeout);
  hoveredItem = { kind: 'field', slug: fieldSlug };
  updateHighlighting();
  drawConnections();
}

function handleClientHover(clientSlug) {
  if (hoverTimeout) clearTimeout(hoverTimeout);
  hoveredItem = { kind: 'client', slug: clientSlug };
  updateHighlighting();
  drawConnections();
}

function handleFieldLeave() {
  hoverTimeout = setTimeout(() => {
    hoveredItem = null;
    updateHighlighting();
    clearConnections();
  }, 100);
}

function handleClientLeave() {
  hoverTimeout = setTimeout(() => {
    hoveredItem = null;
    updateHighlighting();
    clearConnections();
  }, 100);
}

function handleClientClick(clientSlug) {
  window.location.href = buildClientUrl(clientSlug);
}

// Update highlighting based on hover
function updateHighlighting() {
  if (!hoveredItem) {
    // Reset all
    fieldRefs.forEach(el => {
      el.style.opacity = '1';
      el.style.color = '';
    });
    clientRefs.forEach(el => {
      el.style.opacity = '1';
    });
    return;
  }
  
  let highlightedSlugs = [];
  
  if (hoveredItem.kind === 'field') {
    highlightedSlugs = [hoveredItem.slug, ...getRelatedClients(hoveredItem.slug)];
  } else {
    highlightedSlugs = [hoveredItem.slug, ...getRelatedFields(hoveredItem.slug)];
  }
  
  // Update fields
  fieldRefs.forEach((el, slug) => {
    const isHighlighted = highlightedSlugs.includes(slug);
    el.style.opacity = isHighlighted ? '1' : '0.3';
  });
  
  // Update clients
  clientRefs.forEach((el, slug) => {
    const isHighlighted = highlightedSlugs.includes(slug);
    el.style.opacity = isHighlighted ? '1' : '0.3';
  });
}

// Draw SVG connections
function drawConnections() {
  console.log('drawConnections called, hoveredItem:', hoveredItem);
  
  if (!hoveredItem) {
    clearConnections();
    return;
  }
  
  const container = document.getElementById('main-container');
  const linesGroup = document.getElementById('lines-group');
  
  console.log('Container:', container, 'LinesGroup:', linesGroup);
  
  if (!container || !linesGroup) {
    console.error('Missing container or linesGroup');
    return;
  }
  
  // For absolute positioned SVG, we need coordinates relative to the container
  const containerRect = container.getBoundingClientRect();
  console.log('Container rect:', containerRect);
  
  linesGroup.innerHTML = '';
  
  const startPad = 8, endPad = 8;
  
  if (hoveredItem.kind === 'field') {
    console.log('Drawing field connections for:', hoveredItem.slug);
    const fieldEl = fieldRefs.get(hoveredItem.slug);
    if (!fieldEl) {
      console.error('Field element not found for:', hoveredItem.slug);
      return;
    }
    
    const fieldRect = fieldEl.getBoundingClientRect();
    const fieldStartX = fieldRect.right - containerRect.left + startPad;
    const fieldMidY = fieldRect.top + fieldRect.height / 2 - containerRect.top;
    
    console.log('Field element:', fieldEl);
    console.log('Field rect:', fieldRect);
    console.log('Container rect:', containerRect);
    console.log('Calculated start point:', fieldStartX, fieldMidY);
    
    const relatedClients = getRelatedClients(hoveredItem.slug);
    console.log('Related clients:', relatedClients);
    
    relatedClients.forEach(clientSlug => {
      const clientEl = clientRefs.get(clientSlug);
      if (!clientEl) {
        console.error('Client element not found for:', clientSlug);
        return;
      }
      
      const clientRect = clientEl.getBoundingClientRect();
      const clientEndX = clientRect.left - containerRect.left - endPad;
      const clientMidY = clientRect.top + clientRect.height / 2 - containerRect.top;
      
      console.log('Client element for', clientSlug, ':', clientEl);
      console.log('Client rect for', clientSlug, ':', clientRect);
      console.log('Calculated end point:', clientEndX, clientMidY);
      
      const S = { x: fieldStartX, y: fieldMidY };
      const E = { x: clientEndX, y: clientMidY };
      const seedKey = `${hoveredItem.slug}->${clientSlug}`;
      const { d, width } = bezierPath(S, E, seedKey);
      
      console.log('Creating path:', d);
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#000000');
      path.setAttribute('stroke-width', width);
      path.setAttribute('stroke-opacity', '0.9');
      linesGroup.appendChild(path);
    });
  } else {
    console.log('Drawing client connections for:', hoveredItem.slug);
    const clientEl = clientRefs.get(hoveredItem.slug);
    if (!clientEl) {
      console.error('Client element not found for:', hoveredItem.slug);
      return;
    }
    
    const clientRect = clientEl.getBoundingClientRect();
    const clientStartX = clientRect.left - containerRect.left - endPad;
    const clientMidY = clientRect.top + clientRect.height / 2 - containerRect.top;
    
    console.log('Client rect:', clientRect, 'Start point:', clientStartX, clientMidY);
    
    const relatedFields = getRelatedFields(hoveredItem.slug);
    console.log('Related fields:', relatedFields);
    
    relatedFields.forEach(fieldSlug => {
      const fieldEl = fieldRefs.get(fieldSlug);
      if (!fieldEl) {
        console.error('Field element not found for:', fieldSlug);
        return;
      }
      
      const fieldRect = fieldEl.getBoundingClientRect();
      const fieldEndX = fieldRect.right - containerRect.left + startPad;
      const fieldMidY = fieldRect.top + fieldRect.height / 2 - containerRect.top;
      
      console.log('Field rect for', fieldSlug, ':', fieldRect, 'End point:', fieldEndX, fieldMidY);
      
      const S = { x: clientStartX, y: clientMidY };
      const E = { x: fieldEndX, y: fieldMidY };
      const seedKey = `${fieldSlug}->${hoveredItem.slug}`;
      const { d, width } = bezierPath(S, E, seedKey);
      
      console.log('Creating path:', d);
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#1F37FF'); // Blue for client->field
      path.setAttribute('stroke-width', width);
      path.setAttribute('stroke-opacity', '0.9');
      linesGroup.appendChild(path);
    });
  }
}

// Clear SVG connections
function clearConnections() {
  const linesGroup = document.getElementById('lines-group');
  if (linesGroup) linesGroup.innerHTML = '';
}

// Initialize the page
async function init() {
  try {
    // Load data from embedded window variables
    fields = window.FIELDS_DATA || [];
    clients = window.CLIENTS_DATA || [];
    
    // Build adjacency map
    buildAdjacencyMap();
    
    // Render desktop views
    renderFields();
    renderClients();
    
    // Render mobile views
    renderMobileFields();
    renderMobileClients();
    
    // SVG is working, no test needed
    
    // Set up resize/scroll handlers for redrawing connections
    window.addEventListener('resize', () => {
      if (hoveredItem) drawConnections();
    });
    
    window.addEventListener('scroll', () => {
      if (hoveredItem) drawConnections();
    });
    
    console.log('Works page initialized successfully');
  } catch (error) {
    console.error('Error initializing works page:', error);
  }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

