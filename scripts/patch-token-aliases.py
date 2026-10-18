#!/usr/bin/env python3
"""
Patches cross-collection aliases dropped by the Figma export tool, and
normalises token names that the exporter expands or drops.

Run from repo root: python3 scripts/patch-token-aliases.py
"""
import json
from pathlib import Path

TOKENS_PATH = Path("src/styles/tokens/tokens.tokens.json")

# Tokens missing due to cross-collection alias bug — injected after every export.
# Each entry: (collection_key, token_path_tuple, alias_or_value, type, description, overwrite)
# overwrite=True: always write (token exists but Figma exports it with a stale alias that can't resolve)
# overwrite=False (default): only insert if absent
PATCHES = [
    # spacing/badge-padding — exported with stale {space.100}; overwrite with correct size primitive
    ("02-dimensions-desktop", ("spacing", "badge-padding"), "{01-primitives.size.200}", "dimension", "Badge padding. 4px.", True),
    ("02-dimensions-mobile",  ("spacing", "badge-padding"), "{01-primitives.size.200}", "dimension", "Badge padding. 4px.", True),

    # spacing/page-margin-x — exported with stale {space.*}; overwrite with correct size primitive
    ("02-dimensions-desktop", ("spacing", "page-margin-x"), "{01-primitives.size.1200}", "dimension", "Min horizontal page padding. 32px desktop.", True),
    ("02-dimensions-mobile",  ("spacing", "page-margin-x"), "{01-primitives.size.800}",  "dimension", "Min horizontal page padding. 16px mobile.",  True),

    # spacing/page-margin-y — exported with stale {space.*}; overwrite with correct size primitive
    ("02-dimensions-desktop", ("spacing", "page-margin-y"), "{01-primitives.size.1600}", "dimension", "Page vertical padding. 80px desktop.", True),
    ("02-dimensions-mobile",  ("spacing", "page-margin-y"), "{01-primitives.size.1300}", "dimension", "Page vertical padding. 40px mobile.",  True),

    # border/inverse — export tool drops this; cobalt/950 in light, cobalt/50 in dark
    ("02-color-light", ("border", "inverse"), "{01-primitives.cobalt.950}", "color", "Inverted border — card edges on dark/inverse surfaces.", False),
    ("02-color-dark",  ("border", "inverse"), "{01-primitives.cobalt.50}",  "color", "Inverted border — card edges on dark/inverse surfaces.", False),

    # type/body-md/line-height — export tool returns stale 26px; correct value is 22px
    ("02-dimensions-desktop", ("type", "body-md", "line-height"), 22, "dimension", "Body md line height. 22px.", True),
    ("02-dimensions-mobile",  ("type", "body-md", "line-height"), 22, "dimension", "Body md line height. 22px.", True),

    # icon/size/xs and icon/size/lg — export tool drops these entirely
    ("02-dimensions-desktop", ("icon", "size", "xs"), 16, "dimension", "Icon size xs. 16px.", False),
    ("02-dimensions-mobile",  ("icon", "size", "xs"), 16, "dimension", "Icon size xs. 16px.", False),
    ("02-dimensions-desktop", ("icon", "size", "lg"), 48, "dimension", "Icon size lg. 48px.", False),
    ("02-dimensions-mobile",  ("icon", "size", "lg"), 48, "dimension", "Icon size lg. 48px.", False),

    # spacing t-shirt scale — dropped by cross-collection alias bug (aliases size/* primitives)
    ("02-dimensions-desktop", ("spacing", "3xs"),  2,   "dimension", "Hairline gaps, tight inline. 2px.", False),
    ("02-dimensions-desktop", ("spacing", "2xs"),  4,   "dimension", "Icon padding, badge padding. 4px.", False),
    ("02-dimensions-desktop", ("spacing", "xs"),   8,   "dimension", "Input padding, inline gaps. 8px.", False),
    ("02-dimensions-desktop", ("spacing", "sm"),   16,  "dimension", "Default stack/row gap, cell padding. 16px.", False),
    ("02-dimensions-desktop", ("spacing", "md"),   24,  "dimension", "Card padding, paragraph gap. 24px.", False),
    ("02-dimensions-desktop", ("spacing", "lg"),   32,  "dimension", "Content gap, sheet margin x. 32px.", False),
    ("02-dimensions-desktop", ("spacing", "xl"),   40,  "dimension", "Form input height. 40px.", False),
    ("02-dimensions-desktop", ("spacing", "2xl"),  48,  "dimension", "Section gap. 48px.", False),
    ("02-dimensions-desktop", ("spacing", "3xl"),  64,  "dimension", "64px.", False),
    ("02-dimensions-desktop", ("spacing", "4xl"),  80,  "dimension", "Sheet margin y. 80px.", False),
    ("02-dimensions-desktop", ("spacing", "5xl"),  96,  "dimension", "96px.", False),
    ("02-dimensions-desktop", ("spacing", "6xl"),  120, "dimension", "120px.", False),
    ("02-dimensions-mobile",  ("spacing", "3xs"),  2,   "dimension", "Hairline gaps, tight inline. 2px.", False),
    ("02-dimensions-mobile",  ("spacing", "2xs"),  4,   "dimension", "Icon padding, badge padding. 4px.", False),
    ("02-dimensions-mobile",  ("spacing", "xs"),   8,   "dimension", "Input padding, inline gaps. 8px.", False),
    ("02-dimensions-mobile",  ("spacing", "sm"),   16,  "dimension", "Default stack/row gap, cell padding. 16px.", False),
    ("02-dimensions-mobile",  ("spacing", "md"),   24,  "dimension", "Card padding, paragraph gap. 24px.", False),
    ("02-dimensions-mobile",  ("spacing", "lg"),   32,  "dimension", "Content gap, sheet margin x. 32px.", False),
    ("02-dimensions-mobile",  ("spacing", "xl"),   40,  "dimension", "Form input height. 40px.", False),
    ("02-dimensions-mobile",  ("spacing", "2xl"),  48,  "dimension", "Section gap. 48px.", False),
    ("02-dimensions-mobile",  ("spacing", "3xl"),  64,  "dimension", "64px.", False),
    ("02-dimensions-mobile",  ("spacing", "4xl"),  80,  "dimension", "Sheet margin y. 80px.", False),
    ("02-dimensions-mobile",  ("spacing", "5xl"),  96,  "dimension", "96px.", False),
    ("02-dimensions-mobile",  ("spacing", "6xl"),  120, "dimension", "120px.", False),
]

# The exporter expands abbreviations and strips suffixes from token names.
# Each entry: (collection_key, parent_path_tuple, old_key, new_key)
RENAMES = [
    # icon/size: sm→small, md→medium expanded by exporter
    ("02-dimensions-desktop", ("icon", "size"), "small",  "sm"),
    ("02-dimensions-desktop", ("icon", "size"), "medium", "md"),
    ("02-dimensions-mobile",  ("icon", "size"), "small",  "sm"),
    ("02-dimensions-mobile",  ("icon", "size"), "medium", "md"),
    # type/body: exporter strips -md suffix and expands body-sm → body-small
    ("02-dimensions-desktop", ("type",), "body",       "body-md"),
    ("02-dimensions-desktop", ("type",), "body-small", "body-sm"),
    ("02-dimensions-mobile",  ("type",), "body",       "body-md"),
    ("02-dimensions-mobile",  ("type",), "body-small", "body-sm"),
    # radius: exporter expands xs→x-small, sm→small, md→medium, lg→large
    ("02-dimensions-desktop", ("radius",), "x-small", "xs"),
    ("02-dimensions-desktop", ("radius",), "small",   "sm"),
    ("02-dimensions-desktop", ("radius",), "medium",  "md"),
    ("02-dimensions-desktop", ("radius",), "large",   "lg"),
    ("02-dimensions-mobile",  ("radius",), "x-small", "xs"),
    ("02-dimensions-mobile",  ("radius",), "small",   "sm"),
    ("02-dimensions-mobile",  ("radius",), "medium",  "md"),
    ("02-dimensions-mobile",  ("radius",), "large",   "lg"),
]


def get_nested(d, keys):
    for key in keys:
        if not isinstance(d, dict) or key not in d:
            return None
        d = d[key]
    return d


def set_nested(d, keys, value, overwrite=False):
    for key in keys[:-1]:
        d = d.setdefault(key, {})
    if keys[-1] not in d:
        d[keys[-1]] = value
        return "inserted"
    if overwrite:
        d[keys[-1]] = value
        return "overwritten"
    return "skipped"


def main():
    data = json.loads(TOKENS_PATH.read_text())
    patched = 0
    renamed = 0

    # Apply renames first so PATCHES can target the corrected names
    for coll_key, parent_path, old_key, new_key in RENAMES:
        parent = get_nested(data.get(coll_key, {}), parent_path)
        if parent is None:
            print(f"  ! {coll_key} / {'/'.join(parent_path)} not found — skipping rename {old_key}→{new_key}")
            continue
        if old_key in parent and new_key not in parent:
            parent[new_key] = parent.pop(old_key)
            print(f"  ~ renamed {coll_key} / {'/'.join(parent_path)}/{old_key} → {new_key}")
            renamed += 1
        elif new_key in parent:
            print(f"  = {coll_key} / {'/'.join(parent_path)}/{new_key} already correct — skipping")
        else:
            print(f"  ! {coll_key} / {'/'.join(parent_path)}/{old_key} not found — skipping rename")

    # Inject missing tokens (or overwrite stale ones)
    for coll_key, path, value, token_type, desc, overwrite in PATCHES:
        if coll_key not in data:
            print(f"  ! collection '{coll_key}' not found — skipping {'/'.join(path)}")
            continue

        token_node = {"$type": token_type, "$value": value, "$description": desc}
        result = set_nested(data[coll_key], path, token_node, overwrite=overwrite)
        if result == "inserted":
            print(f"  + patched {coll_key} / {'/'.join(path)} = {value}")
            patched += 1
        elif result == "overwritten":
            print(f"  ~ overwrite {coll_key} / {'/'.join(path)} = {value}")
            patched += 1
        else:
            print(f"  = {coll_key} / {'/'.join(path)} already present — skipping")

    TOKENS_PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    print(f"\nDone — {renamed} rename(s), {patched} token(s) patched.")


if __name__ == "__main__":
    main()
