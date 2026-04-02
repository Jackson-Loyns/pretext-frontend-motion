#!/usr/bin/env python3
"""Unified CLI for the Pretext Frontend Motion skill."""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent


def run_script(script: str, *args: str) -> int:
    command = [sys.executable, str(ROOT / script), *args]
    return subprocess.call(command)


def run_shell(script: str, *args: str) -> int:
    command = [str(ROOT / script), *args]
    return subprocess.call(command)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Unified CLI for the Pretext Frontend Motion skill.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    scaffold = subparsers.add_parser("scaffold", help="Create a starter demo")
    scaffold.add_argument("--kind", required=True)
    scaffold.add_argument("--preset")
    scaffold.add_argument("--title", default="Pretext Demo")
    scaffold.add_argument("--out", required=True)

    list_kinds = subparsers.add_parser("list-kinds", help="List available starter kinds")
    list_kinds.set_defaults(command="list-kinds")

    list_presets = subparsers.add_parser("list-presets", help="List presets for one or all kinds")
    list_presets.add_argument("--kind")

    validate = subparsers.add_parser("validate", help="Validate the skill layout")
    validate.add_argument("path", nargs="?", default=".")

    install = subparsers.add_parser("install-symlink", help="Install the skill via symlink")
    install.set_defaults(command="install-symlink")

    update = subparsers.add_parser("update", help="Fast-forward from a configured git remote")
    update.add_argument("remote", nargs="?", default="origin")
    update.add_argument("branch", nargs="?", default="main")

    return parser.parse_args()


def main() -> int:
    args = parse_args()

    if args.command == "scaffold":
        command = ["--kind", args.kind, "--title", args.title, "--out", args.out]
        if args.preset:
            command.extend(["--preset", args.preset])
        return run_script("new_pretext_demo.py", *command)

    if args.command == "list-kinds":
        return run_script("new_pretext_demo.py", "--list-kinds")

    if args.command == "list-presets":
        command: list[str] = ["--list-presets"]
        if args.kind:
            command.extend(["--kind", args.kind])
        return run_script("new_pretext_demo.py", *command)

    if args.command == "validate":
        return run_script("validate_skill.py", args.path)

    if args.command == "install-symlink":
        return run_shell("install_symlink.sh")

    if args.command == "update":
        return run_shell("update_from_git.sh", args.remote, args.branch)

    raise SystemExit(f"Unknown command: {args.command}")


if __name__ == "__main__":
    raise SystemExit(main())
