#!/usr/bin/env python3
"""
Resolves the DTCG token export (tokens.tokens.json) into real CSS custom
properties. Run from the repo root: python3 generate-tokens-css.py

Source of truth: src/styles/tokens/tokens.tokens.json (exported from Figma).
Output: src/styles/generated/tokens-light.css, tokens-dark.css,
        tokens-desktop.css, tokens-mobile.css  (per tokens.config.json splitByMode)

Alias resolution note: DTCG aliases in this export omit the collection
prefix, e.g. `{cobalt.300}` actually means `01-primitives.cobalt.300`, not a
fully-qualified path. Aliases are resolved by searching 01-primitives first,
then falling back to the same collection, by suffix path.
"""
import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent
TOKENS_PATH = REPO_ROOT / "src/styles/tokens/tokens.tokens.json"
OUT_DIR = REPO_ROOT / "src/styles/generated"

ALIAS_RE = re.compile(r"^\{(.+)\}$")


def slugify(parts):
    return "--" + "-".join(parts)


def is_token(node):
    return isinstance(node, dict) and "$value" in node


def walk_tokens(node, path, out):
    """Flatten a token tree into {dotted.path: token_node}."""
    if not isinstance(node, dict):
        return
    for key, val in node.items():
        if key.startswith("$"):
            continue
        new_path = path + [key]
        if is_token(val):
            out[".".join(new_path)] = val
        else:
            walk_tokens(val, new_path, out)


def resolve_value(value, all_tokens, depth=0):
    """Resolve a $value, following alias references until a literal is found."""
    if depth > 10:
        raise ValueError(f"Alias resolution too deep, possible cycle at {value}")
    if not isinstance(value, str):
        return value
    m = ALIAS_RE.match(value.strip())
    if not m:
        return value
    ref_path = m.group(1)
    # Aliases omit the collection prefix. Try primitives first (suffix match),
    # then fall back to a direct/full match anywhere in the flattened map.
    candidates = [k for k in all_tokens if k == ref_path or k.endswith("." + ref_path)]
    primitive_candidates = [k for k in candidates if k.startswith("01-primitives.") or "." not in ref_path and k == ref_path]
    pick = None
    for k in all_tokens:
        if k == f"01-primitives.{ref_path}":
            pick = k
            break
    if not pick:
        for k in candidates:
            pick = k
            break
    if not pick:
        raise KeyError(f"Could not resolve alias {{{ref_path}}}")
    target = all_tokens[pick]
    return resolve_value(target["$value"], all_tokens, depth + 1)


def css_var_name(dotted_path, collection_prefix_to_strip):
    path = dotted_path
    if path.startswith(collection_prefix_to_strip + "."):
        path = path[len(collection_prefix_to_strip) + 1:]
    parts = re.split(r"[.\-]", path)
    return slugify(parts)


def format_value(token_type, resolved):
    if token_type == "color" and isinstance(resolved, str) and resolved.startswith("#"):
        return resolved
    if isinstance(resolved, (int, float)):
        if token_type == "dimension":
            return f"{resolved}px" if resolved != 0 else "0"
        return str(resolved)
    return str(resolved)


def build_collection_css(collection_name, collection_node, all_tokens_flat_global, selector):
    flat = {}
    walk_tokens(collection_node, [], flat)
    lines = [f"{selector} {{"]
    for dotted_path, token in sorted(flat.items()):
        try:
            resolved = resolve_value(token["$value"], all_tokens_flat_global)
        except KeyError as e:
            print(f"  ! skipping {dotted_path}: {e}", file=sys.stderr)
            continue
        var_name = css_var_name(dotted_path, "")
        value_str = format_value(token.get("$type"), resolved)
        desc = token.get("$description")
        if desc:
            lines.append(f"  /* {desc} */")
        lines.append(f"  {var_name}: {value_str};")
    lines.append("}")
    return "\n".join(lines)


def main():
    data = json.loads(TOKENS_PATH.read_text())

    # Build one global flattened map (collection.path -> token) for alias resolution.
    all_tokens_flat = {}
    for coll_name, coll_node in data.items():
        if coll_name.startswith("$"):
            continue
        flat = {}
        walk_tokens(coll_node, [], flat)
        for k, v in flat.items():
            all_tokens_flat[f"{coll_name}.{k}"] = v

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    # Primitives: emitted as :root, always loaded (everything else aliases into these).
    primitives_css = build_collection_css(
        "01-primitives", data["01-primitives"], all_tokens_flat, ":root"
    )
    (OUT_DIR / "tokens-primitives.css").write_text(primitives_css + "\n")
    print(f"wrote tokens-primitives.css ({len(primitives_css.splitlines())} lines)")

    # Colour: split by mode (light default :root, dark under [data-theme='dark']).
    light_css = build_collection_css(
        "02-color-light", data["02-color-light"], all_tokens_flat, ":root"
    )
    dark_css = build_collection_css(
        "02-color-dark", data["02-color-dark"], all_tokens_flat, "[data-theme='dark']"
    )
    (OUT_DIR / "tokens-light.css").write_text(light_css + "\n")
    (OUT_DIR / "tokens-dark.css").write_text(dark_css + "\n")
    print(f"wrote tokens-light.css ({len(light_css.splitlines())} lines)")
    print(f"wrote tokens-dark.css ({len(dark_css.splitlines())} lines)")

    # Dimensions: split by mode (desktop default :root, mobile under [data-density='mobile']).
    desktop_css = build_collection_css(
        "02-dimensions-desktop", data["02-dimensions-desktop"], all_tokens_flat, ":root"
    )
    mobile_css = build_collection_css(
        "02-dimensions-mobile", data["02-dimensions-mobile"], all_tokens_flat, "[data-density='mobile']"
    )
    (OUT_DIR / "tokens-desktop.css").write_text(desktop_css + "\n")
    (OUT_DIR / "tokens-mobile.css").write_text(mobile_css + "\n")
    print(f"wrote tokens-desktop.css ({len(desktop_css.splitlines())} lines)")
    print(f"wrote tokens-mobile.css ({len(mobile_css.splitlines())} lines)")


if __name__ == "__main__":
    main()
