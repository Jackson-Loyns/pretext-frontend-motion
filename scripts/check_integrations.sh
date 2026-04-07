#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

for integration in \
  "$ROOT_DIR/integrations/vanilla-bubbles" \
  "$ROOT_DIR/integrations/react-bubbles" \
  "$ROOT_DIR/integrations/vue-bubbles" \
  "$ROOT_DIR/integrations/svelte-bubbles"
do
  echo "Checking $(basename "$integration")"
  npm install --no-package-lock --prefix "$integration"
  npm run build --prefix "$integration"
  rm -rf "$integration/node_modules" "$integration/dist" "$integration/tsconfig.tsbuildinfo"
done
