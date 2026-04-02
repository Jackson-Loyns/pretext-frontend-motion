#!/usr/bin/env python3
"""Scaffold a Pretext demo from a bundled starter."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path


KINDS = {
    "predictive-ui": "starter-predictive-ui",
    "editorial-routing": "starter-editorial-routing",
    "kinetic-typography": "starter-kinetic-typography",
}


def replace_tokens(root: Path, title: str) -> None:
    replacements = {
        "__DEMO_TITLE__": title,
    }
    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in {".ts", ".tsx", ".js", ".jsx", ".json", ".html", ".css", ".md"}:
            continue
        content = path.read_text(encoding="utf-8")
        for old, new in replacements.items():
            content = content.replace(old, new)
        path.write_text(content, encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Create a Pretext demo starter.")
    parser.add_argument("--kind", choices=sorted(KINDS), required=True)
    parser.add_argument("--out", required=True, help="Output directory")
    parser.add_argument("--title", default="Pretext Demo")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    script_dir = Path(__file__).resolve().parent
    root = script_dir.parent
    starter_dir = root / "assets" / KINDS[args.kind]
    out_dir = Path(args.out).expanduser().resolve()

    if not starter_dir.exists():
        raise SystemExit(f"Starter not found: {starter_dir}")
    if out_dir.exists():
        raise SystemExit(f"Output already exists: {out_dir}")

    shutil.copytree(starter_dir, out_dir)
    replace_tokens(out_dir, args.title)

    print(f"Created {args.kind} demo at {out_dir}")
    print("Next steps:")
    print(f"  cd {out_dir}")
    print("  npm install")
    print("  npm run dev")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
