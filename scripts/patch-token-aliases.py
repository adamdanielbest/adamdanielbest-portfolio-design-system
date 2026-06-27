#!/usr/bin/env python3
"""
Patches cross-collection aliases dropped by the Figma export tool.

The Figma DTCG exporter silently drops tokens whose $value references a
variable in a different collection. This script re-injects the known
missing tokens after every export, before CSS generation.

Run from repo root: python3 scripts/patch-token-aliases.py
"""
import json
from pathlib import Path

TOKENS_PATH = Path("src/styles/tokens/tokens.tokens.json")

# Each entry: (collection_key, token_path_tuple, alias_value, type, description)
# collection_key must match the top-level key in tokens.tokens.json
PATCHES = [
    # spacing/badge-padding — aliases space.100 (4px) in both desktop and mobile
    ("02-dimensions-desktop", ("spacing", "badge-padding"), "{space.100}", "dimension", "Badge padding. 4px."),
    ("02-dimensions-mobile",  ("spacing", "badge-padding"), "{space.100}", "dimension", "Badge padding. 4px."),

    # spacing/page-margin-x — min horizontal page padding (32px desktop, 16px mobile)
    # Container centering is handled by margin: auto + max-content-width, not this value
    ("02-dimensions-desktop", ("spacing", "page-margin-x"), "{space.800}", "dimension", "Min horizontal page padding. 32px desktop."),
    ("02-dimensions-mobile",  ("spacing", "page-margin-x"), "{space.400}", "dimension", "Min horizontal page padding. 16px mobile."),

    # spacing/page-margin-y — vertical page padding (80px desktop, 40px mobile)
    ("02-dimensions-desktop", ("spacing", "page-margin-y"), "{space.1100}", "dimension", "Page vertical padding. 80px desktop."),
    ("02-dimensions-mobile",  ("spacing", "page-margin-y"), "{space.800}",  "dimension", "Page vertical padding. 40px mobile."),
]


def set_nested(d, keys, value):
    """Set a value at a nested dict path, creating intermediate dicts if needed."""
    for key in keys[:-1]:
        d = d.setdefault(key, {})
    if keys[-1] not in d:
        d[keys[-1]] = value
        return True  # inserted
    return False  # already exists


def main():
    data = json.loads(TOKENS_PATH.read_text())
    patched = 0

    for coll_key, path, alias, token_type, desc in PATCHES:
        if coll_key not in data:
            print(f"  ! collection '{coll_key}' not found — skipping {'/'.join(path)}")
            continue

        token_node = {
            "$type": token_type,
            "$value": alias,
            "$description": desc,
        }

        inserted = set_nested(data[coll_key], path, token_node)
        if inserted:
            print(f"  + patched {coll_key} / {'/'.join(path)} = {alias}")
            patched += 1
        else:
            print(f"  = {coll_key} / {'/'.join(path)} already present — skipping")

    TOKENS_PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    print(f"\nDone — {patched} token(s) patched.")


if __name__ == "__main__":
    main()
