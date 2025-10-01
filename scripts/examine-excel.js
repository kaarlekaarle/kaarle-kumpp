const XLSX = require('xlsx');
const path = require('path');

// Read the Excel file
const filePath = path.join(process.cwd(), 'content', 'works_content.xlsx');
const workbook = XLSX.readFile(filePath);

console.log('Excel file sheets:', workbook.SheetNames);

// Examine each sheet
workbook.SheetNames.forEach(sheetName => {
  console.log(`\n=== Sheet: ${sheetName} ===`);
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
  console.log('First 5 rows:');
  jsonData.slice(0, 5).forEach((row, i) => {
    console.log(`Row ${i + 1}:`, row);
  });
  
  console.log(`Total rows: ${jsonData.length}`);
});
