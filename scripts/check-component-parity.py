#!/usr/bin/env python3
"""
check-component-parity.py
Checks a component's CSS for broken token references and reports modifier classes.
The full Figma ↔ CSS variant comparison is done by the /check-drift skill using MCP data.

Usage:
  python3 scripts/check-component-parity.py --config .claude/design-system.json --component button
"""
import argparse, json, re, sys
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--config', required=True)
parser.add_argument('--component', required=True)
args = parser.parse_args()

config_path = Path(args.config)
config = json.loads(config_path.read_text())
repo_root = config_path.parent.parent

components = config.get('components', [])
comp = next((c for c in components if c['name'] == args.component), None)

if not comp:
    print(f"ERROR: component '{args.component}' not found in registry")
    sys.exit(1)

css_file = repo_root / comp.get('cssFile', '')
gen_dir  = repo_root / config['tokens']['generated']

if not css_file.exists():
    print(f"ERROR: CSS file not found: {css_file}")
    sys.exit(1)

css = css_file.read_text()

# Collect BEM modifier classes (e.g. .btn--primary, .btn--small)
modifier_classes = sorted(set(re.findall(r'\.([\w]+--[\w-]+)', css)))

# Collect var() references
var_refs = sorted(set(re.findall(r'var\(--([\w-]+)\)', css)))

# Collect all defined custom properties from generated token CSS files
defined_vars = set()
for f in gen_dir.glob('*.css'):
    for m in re.findall(r'--([\w-]+)\s*:', f.read_text()):
        defined_vars.add(m)

issues = []

for ref in var_refs:
    if ref not in defined_vars:
        issues.append(f"broken token reference: var(--{ref}) not defined in generated tokens")

print(f"\n── {args.component} ──")
print(f"Modifier classes: {', '.join(modifier_classes) or 'none'}")
print(f"Token references: {len(var_refs)} var() calls")

if issues:
    print(f"\n❌ {len(issues)} issue(s):")
    for i in issues:
        print(f"   {i}")
    sys.exit(1)
else:
    print("✅ No broken token references")
