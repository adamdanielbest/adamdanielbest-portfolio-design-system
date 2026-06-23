#!/usr/bin/env python3
"""
Verify that every var(--x) reference in component CSS files resolves to a token
defined in src/styles/generated/tokens-*.css. Exits non-zero on any missing ref.

Run from repo root: python3 scripts/check-token-refs.py
"""
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
TOKEN_GLOB = "src/styles/generated/tokens-*.css"

defined_re = re.compile(r'(--[\w-]+)\s*:')
ref_re = re.compile(r'var\((--[\w-]+)\)')

# Collect every custom property defined across all token files.
defined = set()
token_files = sorted(REPO_ROOT.glob(TOKEN_GLOB))
if not token_files:
    print(f"ERROR: no token files matched {TOKEN_GLOB}", file=sys.stderr)
    sys.exit(1)
for f in token_files:
    for m in defined_re.finditer(f.read_text()):
        defined.add(m.group(1))

# Scan all CSS files outside the generated directory for var() references.
css_files = sorted(
    f for f in REPO_ROOT.rglob("*.css")
    if "generated" not in f.parts and ".git" not in f.parts
)

missing: dict[str, list[str]] = {}
for f in css_files:
    refs = ref_re.findall(f.read_text())
    unknown = sorted({r for r in refs if r not in defined})
    if unknown:
        missing[str(f.relative_to(REPO_ROOT))] = unknown

if missing:
    print("ERROR: undefined token references found in component CSS:", file=sys.stderr)
    for path, refs in missing.items():
        for ref in refs:
            print(f"  {path}: {ref}", file=sys.stderr)
    sys.exit(1)

print(
    f"OK: all var() references resolve "
    f"({len(defined)} tokens defined, {len(css_files)} CSS file(s) checked)"
)
