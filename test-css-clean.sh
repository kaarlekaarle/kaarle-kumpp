#!/bin/bash
echo "🔍 Checking for currentColor conflicts in minified CSS..."
if grep -q "currentColor" build/styles.min.css; then
  echo "⚠️  Warning: background: currentColor found in minified CSS — check cascade order."
  exit 1
else
  echo "✅  No currentColor conflicts found. Build safe."
fi

echo "🔍 Verifying dot background rules..."
if grep -q "background:#9ca3af\|background-color:#9ca3af" build/styles.min.css && grep -q "background:#000\|background-color:#000" build/styles.min.css; then
  echo "✅  Dot background rules present: gray (#9ca3af) and black (#000)"
else
  echo "⚠️  Warning: Missing explicit dot background rules"
  exit 1
fi

echo "🎉 CSS build verification complete!"
