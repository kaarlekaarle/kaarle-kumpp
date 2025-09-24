#!/usr/bin/env node

/**
 * Tool to fix line breaks in the main page text to match the reference image exactly
 * 
 * Usage: node scripts/fix-line-breaks.js
 * 
 * This script will:
 * 1. Read the current page.tsx file
 * 2. Replace the text content with the exact line breaks from the reference image
 * 3. Write the updated content back to the file
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/page.tsx');

// Read the current file
let content = fs.readFileSync(filePath, 'utf8');

// The exact text with line breaks from the reference image
const updatedText = `          <div className="mt-4 space-y-3 leading-[1.55] text-[16px] text-accent" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
            <p>Everything starts with a question: <em>What are we doing here?</em> Once we agree on the task, I lay out a plan. You need clarity, the right perspective, and the right people. When we&apos;ve got those, we&apos;re halfway there.</p>
            <p>Too often, projects get tangled<br />
            in too many hands, wasted time,<br />
            and money spent. Budgets grow,<br />
            meetings multiply, and the focus shifts<br />
            from solving the problem to justifying the invoices.</p>
            <p>I do the work like it&apos;s mine. If I&apos;m not the man for the job,<br />
            I&apos;ll say so. I don&apos;t drag things out to look busy.<br />
            I don&apos;t bill by the hour. I charge by the solution.</p>
          </div>`;

// Find and replace the text content
const textRegex = /<div className="mt-4 space-y-3 leading-\[1\.55\] text-\[16px\] text-accent" style=\{\{fontFamily: "'Garamond Premier', 'Times New Roman', serif"\}\}>[\s\S]*?<\/div>/;

if (textRegex.test(content)) {
  content = content.replace(textRegex, updatedText);
  
  // Write the updated content back
  fs.writeFileSync(filePath, content, 'utf8');
  
  console.log('✅ Line breaks updated successfully!');
  console.log('📝 Changes made:');
  console.log('   - Second paragraph: 5 lines with proper breaks');
  console.log('   - Third paragraph: 3 lines with proper breaks');
  console.log('   - Maintains all existing styling and classes');
} else {
  console.log('❌ Could not find the text content to replace');
  console.log('🔍 Please check the file structure');
}

console.log('\n🚀 Next steps:');
console.log('   1. Review the changes in app/page.tsx');
console.log('   2. Test the page to ensure line breaks are correct');
console.log('   3. Commit and push the changes');
