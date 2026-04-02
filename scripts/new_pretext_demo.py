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

PRESETS = {
    "predictive-ui": {
        "signal-bubbles": {
            "__MODE_LABEL__": "Predictive UI",
            "__INTRO__": "A width-tight message wall with bubble heights predicted from Pretext instead of DOM measurement.",
            "__MESSAGE_1__": "Measured before paint, not guessed after paint.",
            "__MESSAGE_2__": "Multilingual bubbles stay compact without layout flash. 你好，مرحبا，hello.",
            "__MESSAGE_3__": "Pretext gives the shell a stable height before the message ever lands on screen.",
        },
        "tight-masonry": {
            "__MODE_LABEL__": "Predictive UI",
            "__INTRO__": "A masonry bulletin where card height is computed from measured copy before the layout commits.",
            "__MESSAGE_1__": "Editorial cards can pack tightly when text height is known up front.",
            "__MESSAGE_2__": "A narrow card, a long note, and a stable grid can coexist without jitter.",
            "__MESSAGE_3__": "The point is not the grid. The point is the measured text geometry.",
        },
        "multilingual-feed": {
            "__MODE_LABEL__": "Predictive UI",
            "__INTRO__": "A live feed surface sized from cached text metrics across mixed scripts and emoji.",
            "__MESSAGE_1__": "Arabic, Chinese, English, and emoji should not force the layout to guess.",
            "__MESSAGE_2__": "Prepared text handles keep resize cheap even when the feed gets dense.",
            "__MESSAGE_3__": "Stable heights make scroll anchoring and virtualization less fragile.",
        },
    },
    "editorial-routing": {
        "orbital-essay": {
            "__MODE_LABEL__": "Editorial Routing",
            "__INTRO__": "Drag the orb. The paragraph reroutes line by line around the obstacle using Pretext geometry instead of DOM flow.",
            "__BODY_TEXT__": "The page should feel like a living editorial spread, not a template. A routed headline, a carved body column, and a moving circular obstacle create the point of view. Pretext computes each line against the available width so the story bends around the shape instead of pretending the shape is not there. Resize the page or move the circle and the geometry can be recomputed cleanly.",
        },
        "pull-quote-spread": {
            "__MODE_LABEL__": "Editorial Routing",
            "__INTRO__": "Treat the floating shape like a pull quote anchor and reroute the article around it in real time.",
            "__BODY_TEXT__": "A good editorial demo does not simply stack text blocks. It stages tension between columns, quotes, and empty space. Here the circular object acts like an inserted quote or mark. Each line is recomputed against the width that remains open in that band, so the article can bend around the interruption and still hold rhythm across the page.",
        },
        "routed-manifesto": {
            "__MODE_LABEL__": "Editorial Routing",
            "__INTRO__": "A manifesto style page where the body copy keeps its cadence while geometry cuts through the column.",
            "__BODY_TEXT__": "Manifesto pages work when their structure is forceful but still legible. The obstacle here is not decoration. It is a compositional pressure point. Pretext lays out each next line against the available slot, which lets the block keep moving with intent as the circle shifts, the viewport changes, and the column width tightens on smaller screens.",
        },
    },
    "kinetic-typography": {
        "pulse-type": {
            "__MODE_LABEL__": "Kinetic Typography",
            "__INTRO__": "Move the pointer across the canvas. Glyphs drift away from the cursor and then settle back to measured anchors produced by Pretext.",
            "__PHRASE_LINE_1__": "__DEMO_TITLE__",
            "__PHRASE_LINE_2__": "TEXT WANTS MOTION",
        },
        "ribbon-ascii": {
            "__MODE_LABEL__": "Kinetic Typography",
            "__INTRO__": "A poster-like canvas where measured text anchors become the base state for a loose ASCII ribbon field.",
            "__PHRASE_LINE_1__": "__DEMO_TITLE__",
            "__PHRASE_LINE_2__": "ASCII RIBBON FIELD",
        },
        "pointer-poster": {
            "__MODE_LABEL__": "Kinetic Typography",
            "__INTRO__": "A motion poster where the pointer bends the measured text cloud without destroying the underlying line layout.",
            "__PHRASE_LINE_1__": "__DEMO_TITLE__",
            "__PHRASE_LINE_2__": "POINTER DRIVEN POSTER",
        },
    },
}

DEFAULT_PRESETS = {
    "predictive-ui": "signal-bubbles",
    "editorial-routing": "orbital-essay",
    "kinetic-typography": "pulse-type",
}


def replace_tokens(root: Path, replacements: dict[str, str]) -> None:
    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in {".ts", ".tsx", ".js", ".jsx", ".json", ".html", ".css", ".md"}:
            continue
        content = path.read_text(encoding="utf-8")
        for old, new in replacements.items():
            content = content.replace(old, new)
        path.write_text(content, encoding="utf-8")


def print_kinds() -> None:
    print("Available kinds:")
    for kind in sorted(KINDS):
        print(f"  - {kind}")


def print_presets(kind: str | None) -> None:
    if kind is not None:
        if kind not in PRESETS:
            raise SystemExit(f"Unknown kind for presets: {kind}")
        print(f"Available presets for {kind}:")
        for preset in sorted(PRESETS[kind]):
            marker = " (default)" if DEFAULT_PRESETS[kind] == preset else ""
            print(f"  - {preset}{marker}")
        return

    print("Available presets:")
    for current_kind in sorted(PRESETS):
        print(f"- {current_kind}:")
        for preset in sorted(PRESETS[current_kind]):
            marker = " (default)" if DEFAULT_PRESETS[current_kind] == preset else ""
            print(f"    - {preset}{marker}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Create a Pretext demo starter.")
    parser.add_argument("--kind", choices=sorted(KINDS))
    parser.add_argument("--out", help="Output directory")
    parser.add_argument("--title", default="Pretext Demo")
    parser.add_argument("--preset", help="Named preset for the selected kind")
    parser.add_argument("--list-kinds", action="store_true")
    parser.add_argument("--list-presets", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    if args.list_kinds:
        print_kinds()
        return 0

    if args.list_presets:
        print_presets(args.kind)
        return 0

    if args.kind is None:
        raise SystemExit("--kind is required unless using --list-kinds")
    if args.out is None:
        raise SystemExit("--out is required unless listing kinds or presets")

    script_dir = Path(__file__).resolve().parent
    root = script_dir.parent
    starter_dir = root / "assets" / KINDS[args.kind]
    out_dir = Path(args.out).expanduser().resolve()
    preset = args.preset or DEFAULT_PRESETS[args.kind]

    if not starter_dir.exists():
        raise SystemExit(f"Starter not found: {starter_dir}")
    if out_dir.exists():
        raise SystemExit(f"Output already exists: {out_dir}")
    if preset not in PRESETS[args.kind]:
        raise SystemExit(f"Unknown preset for {args.kind}: {preset}")

    shutil.copytree(starter_dir, out_dir)
    replacements = {"__DEMO_TITLE__": args.title}
    replacements.update(PRESETS[args.kind][preset])
    replace_tokens(out_dir, replacements)

    print(f"Created {args.kind} demo at {out_dir}")
    print(f"Preset: {preset}")
    print("Next steps:")
    print(f"  cd {out_dir}")
    print("  npm install")
    print("  npm start")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
