#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 Building data from Excel file...');

try {
  // Run the Excel to JSON conversion
  execSync('node scripts/excel-to-json.js', { stdio: 'inherit' });
  
  console.log('✅ Data built successfully from Excel!');
  console.log('📁 Generated files:');
  console.log('  - data/fields.json');
  console.log('  - data/clients.json');
  
} catch (error) {
  console.error('❌ Error building data from Excel:', error.message);
  process.exit(1);
}
