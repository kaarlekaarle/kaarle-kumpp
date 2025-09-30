const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const excelPath = path.join(process.cwd(), 'content', 'works_content.xlsx');

if (!fs.existsSync(excelPath)) {
  console.error('❌ Excel file not found:', excelPath);
  process.exit(1);
}

console.log('📖 Reading Excel file:', excelPath);

// Load the workbook
const workbook = XLSX.readFile(excelPath);

// Get all sheet names
const sheetNames = workbook.SheetNames;
console.log('📋 Found sheets:', sheetNames);

// Create output directory
const outputDir = path.join(process.cwd(), 'content', 'csv');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Convert each sheet to CSV
sheetNames.forEach(sheetName => {
  console.log(`\n🔄 Processing sheet: ${sheetName}`);
  
  // Get the worksheet
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert to CSV
  const csvContent = XLSX.utils.sheet_to_csv(worksheet);
  
  // Create filename (sanitize sheet name)
  const filename = sheetName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') + '.csv';
  
  const outputPath = path.join(outputDir, filename);
  
  // Write CSV file
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  
  console.log(`✅ Created: ${filename}`);
  console.log(`   📁 Path: ${outputPath}`);
  console.log(`   📊 Rows: ${csvContent.split('\n').length - 1}`);
});

console.log(`\n🎉 Successfully converted ${sheetNames.length} sheets to CSV!`);
console.log(`📁 Output directory: ${outputDir}`);

// List all created files
console.log('\n📋 Created files:');
const createdFiles = fs.readdirSync(outputDir);
createdFiles.forEach(file => {
  const filePath = path.join(outputDir, file);
  const stats = fs.statSync(filePath);
  console.log(`   - ${file} (${stats.size} bytes)`);
});
