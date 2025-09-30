#!/usr/bin/env bash
set -euo pipefail

fail(){ echo "✗ $1"; exit 1; }

# 1) JS/mobile detection must be gone
grep -r --exclude-dir=node_modules --exclude-dir=.next -q 'body\.is-mobile\|MobileDetector' app components styles src 2>/dev/null && fail "Found legacy mobile detection (body.is-mobile/MobileDetector)."

# 2) No !important in layout/typography CSS (except visibility gates)
DISALLOWED_IMPORTANT=$(grep -rn --exclude-dir=node_modules --exclude-dir=.next '!important' styles app src 2>/dev/null | grep -v 'safe-area\|outline\|\.desktop-only\|\.mobile-only' || true)
if [ -n "$DISALLOWED_IMPORTANT" ]; then
  fail "Found disallowed !important in styles/app/src."
fi

# 3) Check for duplicate mobile media blocks (warn if more than 3 logical blocks)
DUPS_GLOBALS=$(grep -n '@media.*max-width.*var(--bp-mobile-max)' app/globals.css 2>/dev/null | wc -l | tr -d ' ')
if [ "$DUPS_GLOBALS" -gt 3 ]; then
  echo "⚠ Found $DUPS_GLOBALS @media (max-width: var(--bp-mobile-max)) blocks in app/globals.css. Consider consolidating."
fi

# 4) No vh/svh min-height on wrappers
if grep -rn --exclude-dir=node_modules --exclude-dir=.next 'min-height.*100.*vh\|100svh\|height.*calc.*vh' styles app src 2>/dev/null >/dev/null; then
  echo "⚠ Found vh/svh height rules. Verify they are not on page wrappers (.em/.mobile-stack)."
fi

echo "✓ Responsive checks passed."
