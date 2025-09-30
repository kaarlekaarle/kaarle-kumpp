#!/usr/bin/env bash
set -euo pipefail

fail(){ echo "✗ $1"; exit 1; }

# 1) legacy JS mobile detection not allowed
if grep -RIn -E 'body\.is-mobile|MobileDetector' app components styles >/dev/null 2>&1; then
  fail "Found legacy mobile detection (body.is-mobile/MobileDetector)."
fi

# 2) disallowed !important (allow only gates and safe-area notes)
if grep -RIn -E '!important' app styles | grep -Ev 'desktop-only|mobile-only|safe-area' >/dev/null 2>&1; then
  fail "Disallowed !important found in styles/app."
fi

# 3) globals single canonical mobile block (warn if many)
MCOUNT=$(grep -n '@media.*max-width.*var(--bp-mobile-max)' app/globals.css | wc -l | tr -d ' ')
if [ "${MCOUNT:-0}" -gt 1 ]; then
  echo "⚠ Multiple mobile blocks in app/globals.css (${MCOUNT}). Consider consolidating."
fi

# 4) vh/svh traps on wrappers
if grep -RIn -E 'min-height:\s*100(s|)vh|100svh|height:\s*calc\(.*vh' app styles >/dev/null 2>&1; then
  echo "⚠ Found vh/svh usage. Verify not applied to page shells (.em/.mobile-stack)."
fi

echo "✓ Responsive checks passed."
