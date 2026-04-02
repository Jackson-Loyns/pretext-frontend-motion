#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CODEX_HOME_DIR="${CODEX_HOME:-$HOME/.codex}"
DEST_DIR="$CODEX_HOME_DIR/skills"
DEST_LINK="$DEST_DIR/pretext-frontend-motion"

mkdir -p "$DEST_DIR"

if [ -L "$DEST_LINK" ] || [ -e "$DEST_LINK" ]; then
  rm -rf "$DEST_LINK"
fi

ln -s "$ROOT_DIR" "$DEST_LINK"

echo "Installed symlink:"
echo "  $DEST_LINK -> $ROOT_DIR"
echo "Restart Codex to ensure the updated skill is reloaded."
