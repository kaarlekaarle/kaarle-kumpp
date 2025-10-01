const XLSX = require('xlsx');
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

// Helper function to parse links
function parseLinks(linksStr) {
  if (!linksStr || linksStr.trim() === '') return [];
  
  const links = linksStr.split(',').map(link => link.trim());
  return links.map(link => {
    // Check if it's a URL
    if (link.startsWith('http')) {
      return {
        url: link,
        icon: 'homepage'
      };
    }
    // Otherwise it's a platform name
    return {
      url: `https://${link.toLowerCase()}.com`,
      icon: link.toLowerCase()
    };
  });
}

// Helper function to parse team members
function parseTeam(teamStr) {
  if (!teamStr || teamStr.trim() === '') return [];
  
  return teamStr.split(',').map(member => ({
    name: member.trim(),
    role: 'Team Member'
  }));
}

// Read the Excel file
const filePath = path.join(process.cwd(), 'content', 'works_content.xlsx');
const workbook = XLSX.readFile(filePath);

// Get data from each sheet
const categoriesSheet = workbook.Sheets['CATEGORIES'];
const descriptionSheet = workbook.Sheets['DESCRIPTION'];
const materialsSheet = workbook.Sheets['MATERIALS'];
const linksSheet = workbook.Sheets['LINKS'];
const teamSheet = workbook.Sheets['TEAM'];

// Convert to JSON
const categoriesData = XLSX.utils.sheet_to_json(categoriesSheet, { header: 1 });
const descriptionData = XLSX.utils.sheet_to_json(descriptionSheet, { header: 1 });
const materialsData = XLSX.utils.sheet_to_json(materialsSheet, { header: 1 });
const linksData = XLSX.utils.sheet_to_json(linksSheet, { header: 1 });
const teamData = XLSX.utils.sheet_to_json(teamSheet, { header: 1 });

// Get field names from first row (skip the first column which is "Client")
const fieldNames = categoriesData[0].slice(1);

// Create fields array
const fields = fieldNames.map(name => ({
  id: slugify(name),
  name: name,
  blurb: `Description for ${name}`
}));

// Create clients array
const clients = [];

// Process each client (skip header row)
for (let i = 1; i < categoriesData.length; i++) {
  const row = categoriesData[i];
  const clientName = row[0];
  
  if (!clientName || clientName.trim() === '') continue;
  
  // Get client's fields (X marks indicate which fields apply)
  const clientFields = [];
  for (let j = 1; j < row.length; j++) {
    if (row[j] === 'X') {
      clientFields.push(slugify(fieldNames[j - 1]));
    }
  }
  
  // Get description
  const descriptionRow = descriptionData.find(row => row[0] === clientName);
  const description = descriptionRow ? descriptionRow[1] : '';
  
  // Get materials
  const materialsRow = materialsData.find(row => row[0] === clientName);
  const materials = materialsRow ? materialsRow[1] : '';
  
  // Get links
  const linksRow = linksData.find(row => row[0] === clientName);
  const links = linksRow ? parseLinks(linksRow[1]) : [];
  
  // Get team
  const teamRow = teamData.find(row => row[0] === clientName);
  const team = teamRow ? parseTeam(teamRow[1]) : [];
  
  // Create client object
  const client = {
    slug: slugify(clientName),
    name: clientName.toUpperCase(),
    fields: clientFields,
    summary: description,
    slides: [
      {
        src: `/images/portrait.jpg`,
        alt: `${clientName} work example`
      }
    ],
    links: links,
    team: team
  };
  
  clients.push(client);
}

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

console.log('✅ Successfully converted Excel to JSON!');
console.log(`📁 Fields: ${fields.length}`);
console.log(`📁 Clients: ${clients.length}`);
console.log('\n📋 Fields:');
fields.forEach(field => console.log(`  - ${field.name} (${field.id})`));
console.log('\n👥 Clients:');
clients.forEach(client => console.log(`  - ${client.name} (${client.slug})`));
