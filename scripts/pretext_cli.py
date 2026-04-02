#!/usr/bin/env python3
"""Compatibility wrapper for the npm-based Pretext CLI."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent
REPO_ROOT = ROOT.parent


def main() -> int:
    command = ["npm", "run", "cli", "--", *sys.argv[1:]]
    return subprocess.call(command, cwd=REPO_ROOT)


if __name__ == "__main__":
    raise SystemExit(main())
