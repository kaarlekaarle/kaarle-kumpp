const fs = require('fs');
const path = require('path');

// Helper function to slugify strings
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

// Helper function to parse CSV
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    data.push(row);
  }
  
  return data;
}

// Read CSV files
const contentDir = path.join(process.cwd(), 'content');

// Read clients CSV
const clientsCSV = fs.readFileSync(path.join(contentDir, 'clients.csv'), 'utf8');
const clientsData = parseCSV(clientsCSV);

// Read fields CSV
const fieldsCSV = fs.readFileSync(path.join(contentDir, 'fields.csv'), 'utf8');
const fieldsData = parseCSV(fieldsCSV);

// Create fields array
const fields = fieldsData.map(field => ({
  id: slugify(field.name),
  name: field.name,
  blurb: field.description || `Description for ${field.name}`
}));

// Create clients array
const clients = clientsData.map(client => {
  // Parse fields (comma-separated)
  const clientFields = client.fields ? 
    client.fields.split(',').map(f => slugify(f.trim())).filter(f => f) : [];
  
  // Parse links (comma-separated)
  const links = client.links ? 
    client.links.split(',').map(link => {
      const trimmed = link.trim();
      if (trimmed.startsWith('http')) {
        return { url: trimmed, icon: 'homepage' };
      }
      return { url: `https://${trimmed.toLowerCase()}.com`, icon: trimmed.toLowerCase() };
    }) : [];
  
  // Parse team (comma-separated)
  const team = client.team ? 
    client.team.split(',').map(member => ({
      name: member.trim(),
      role: 'Team Member'
    })) : [];

  return {
    slug: slugify(client.name),
    name: client.name.toUpperCase(),
    fields: clientFields,
    summary: client.description || '',
    slides: [
      {
        src: `/images/portrait.jpg`,
        alt: `${client.name} work example`
      }
    ],
    links: links,
    team: team
  };
});

// Create the final data structure
const siteData = {
  fields: fields,
  clients: clients
};

// Write to files
const outputDir = path.join(process.cwd(), 'data');

// Write fields.json
fs.writeFileSync(
  path.join(outputDir, 'fields.json'),
  JSON.stringify(fields, null, 2)
);

// Write clients.json
fs.writeFileSync(
  path.join(outputDir, 'clients.json'),
  JSON.stringify(clients, null, 2)
);

console.log('✅ Successfully converted CSV to JSON!');
console.log(`📁 Fields: ${fields.length}`);
console.log(`📁 Clients: ${clients.length}`);
console.log('\n📋 Fields:');
fields.forEach(field => console.log(`  - ${field.name} (${field.id})`));
console.log('\n👥 Clients:');
clients.forEach(client => console.log(`  - ${client.name} (${client.slug})`));
