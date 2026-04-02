#!/usr/bin/env python3
"""Validate the local Pretext skill structure without extra dependencies."""

from __future__ import annotations

import argparse
import stat
from pathlib import Path


REQUIRED_FILES = [
    "SKILL.md",
    "README.md",
    "agents/openai.yaml",
    "docs/install.md",
    "docs/update.md",
    "docs/guide.md",
    "docs/design-rules.md",
    "docs/examples.md",
    "references/capabilities.md",
    "references/patterns.md",
    "references/design-rules.md",
    "references/react-migration.md",
    "evals/evals.json",
    "scripts/new_pretext_demo.py",
    "scripts/install_symlink.sh",
    "scripts/update_from_git.sh",
]

STARTERS = [
    "assets/starter-predictive-ui",
    "assets/starter-editorial-routing",
    "assets/starter-kinetic-typography",
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate Pretext skill structure.")
    parser.add_argument("path", nargs="?", default=".", help="Skill root directory")
    return parser.parse_args()


def has_frontmatter_field(text: str, field: str) -> bool:
    if not text.startswith("---\n"):
        return False
    try:
        _, body = text.split("---\n", 1)
        frontmatter, _ = body.split("\n---", 1)
    except ValueError:
        return False
    return any(line.startswith(f"{field}:") for line in frontmatter.splitlines())


def main() -> int:
    args = parse_args()
    root = Path(args.path).resolve()
    errors: list[str] = []

    for rel in REQUIRED_FILES:
        path = root / rel
        if not path.exists():
            errors.append(f"Missing required file: {rel}")

    skill_md = root / "SKILL.md"
    if skill_md.exists():
        text = skill_md.read_text(encoding="utf-8")
        if not has_frontmatter_field(text, "name"):
            errors.append("SKILL.md is missing frontmatter field: name")
        if not has_frontmatter_field(text, "description"):
            errors.append("SKILL.md is missing frontmatter field: description")

    for rel in [
        "scripts/new_pretext_demo.py",
        "scripts/install_symlink.sh",
        "scripts/update_from_git.sh",
    ]:
        script = root / rel
        if script.exists():
            mode = script.stat().st_mode
            if not (mode & stat.S_IXUSR):
                errors.append(f"{rel} is not executable")

    for starter in STARTERS:
        base = root / starter
        if not base.exists():
            errors.append(f"Missing starter directory: {starter}")
            continue
        for rel in ["package.json", "index.html", "src/main.ts", "src/styles.css"]:
            if not (base / rel).exists():
                errors.append(f"Starter missing {rel}: {starter}")

    if errors:
        print("Validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Validation passed.")
    print(f"Skill root: {root}")
    print("Checked files:", len(REQUIRED_FILES))
    print("Checked starters:", len(STARTERS))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
