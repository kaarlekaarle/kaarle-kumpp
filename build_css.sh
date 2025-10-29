#!/bin/bash
# CSS Build Script with Verification
# Rebuilds the unified CSS and verifies it's complete

echo "🔨 Building unified CSS..."

# Create unified CSS via automated concatenation
(echo '/* === styles.css === */'; cat styles.css;
 echo '/* === _ios_and_ua_overrides.css === */'; cat _ios_and_ua_overrides.css;
 echo '/* === _mobile_spacing_overrides.css === */'; cat _mobile_spacing_overrides.css) \
  > build/styles_unified.css

# Remove @import statements (content already concatenated)
sed -i '' '/^@import/d' build/styles_unified.css

# Minify safely
npx clean-css-cli -O2 --source-map -o build/styles_unified.min.css build/styles_unified.css

# Adopt as production
cp build/styles_unified.min.css build/styles.min.css

# Verify the build
echo "🔍 Verifying CSS build..."
./verify_css_build.sh

if [ $? -eq 0 ]; then
    echo "✅ CSS build complete and verified!"
    echo "   Production file: build/styles.min.css"
    echo "   Reference file: build/styles_unified.min.css"
else
    echo "❌ CSS build verification failed!"
    echo "   Check the output above for missing sections."
    exit 1
fi
