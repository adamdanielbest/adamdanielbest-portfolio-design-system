---
name: check-drift
description: Cross-stack drift report comparing Figma (source of truth) against tokens, icons, and Storybook stories in the codebase. Runs four checks — token drift, story drift, component parity, token binding parity — and produces a single report. Use whenever the user asks "what's out of sync", "check drift", or "is the code up to date with Figma".
---

# Check Drift

Compares Figma (source of truth) against the codebase across three layers and produces a single report.

## Figma MCP rule
Always use `mcp__figma-console__*` tools. Never use `Figma:use_figma` or `Figma:get_design_context`.

---

## Step 0 — Load config

```bash
REPO_ROOT=$(git rev-parse --show-toplevel)
CONFIG="$REPO_ROOT/.claude/design-system.json"
```

Read:
- `figma.fileId`
- `tokens.source`, `tokens.generated`
- `components` array

---

## Step 1 — Token drift

### 1a — Get Figma variables

```javascript
// figma_execute
const vars = await figma.variables.getLocalVariablesAsync();
return vars.map(v => ({ name: v.name, id: v.id }));
```

Flatten names to CSS custom property format: `background/page` → `--background-page`.

### 1b — Get CSS custom properties

```bash
grep -rh 'var(--[^)]\+)' "$REPO_ROOT/src/styles/generated/" | \
  grep -oP 'var\(--[^)]+\)' | sort -u | sed 's/var(//;s/)//'
```

Also collect all defined properties:
```bash
grep -rh '^\s*--' "$REPO_ROOT/src/styles/generated/" | \
  grep -oP '--[\w-]+' | sort -u
```

### 1c — Compare

- **In Figma, missing from CSS** → token exported from Figma but not yet generated into CSS (run `/sync` to fix)
- **In CSS, missing from Figma** → stale token; was renamed or deleted in Figma
- **Used in component CSS (`var(--x)`) but not defined** → broken reference (blocks component rendering)

### 1d — HTML page token audit

Scan all component HTML pages and the template for `var(--x)` references that aren't in the generated token files. These cause silent layout breakage (elements collapse to zero spacing, invisible borders, etc.) and are distinct from component CSS issues because they live in page-level `<style>` blocks rather than component stylesheets.

```bash
# Collect all var() references from HTML files (inline <style> blocks)
grep -roh 'var(--[a-zA-Z0-9-]*)' \
  "$REPO_ROOT"/*-component/*.html \
  "$REPO_ROOT"/src/templates/*.html \
  2>/dev/null | grep -oE '\-\-[a-zA-Z0-9-]+' | sort -u > /tmp/html-used.txt

# Compare against defined tokens
comm -23 /tmp/html-used.txt /tmp/css-defined.txt
```

Any token in the output is used in an HTML page but undefined — flag as ❌ with the token name and suggest the current equivalent from the t-shirt scale.

Add to report under **Token drift**:
```
### HTML page token audit
✅ No stale tokens in HTML pages  (or)
❌ 3 undefined tokens in HTML pages:
   - --spacing-card-padding (not defined — use --spacing-md)
   - --spacing-content-gap (not defined — use --spacing-lg)
   - --spacing-table-cell-padding (not defined — use --spacing-sm)
```

---

## Step 2 — Story drift

For each component in the `components` array:

### 2a — Get Figma variant properties

```javascript
// figma_execute
await figma.loadAllPagesAsync();
const set = figma.root.findOne(n => n.id === '<figmaNodeId>');
const props = set.componentPropertyDefinitions;
return props;
```

Extract the key variant axes (`type`, `size`, `state`).

### 2b — Read current story exports

For each `.stories.js` file in `<storiesDir>`:
```bash
grep -E '^export const ' "$file" | sed "s/export const //;s/ =.*//"
```

### 2c — Compare

Expected story exports per variant type file: Small, Medium, Large, Icon, Focus, Disabled.

Map Figma `type` values → story files. For each:
- **Figma type missing from stories** → no story file for this variant
- **Story file with no matching Figma type** → stale story (variant removed in Figma)
- **Missing size exports** → Figma has a size the story doesn't cover
- **Missing state exports** → Figma has a state the story doesn't cover

---

## Step 3 — Component parity

Runs `scripts/check-component-parity.py` for each component in the registry.

```bash
python3 "$REPO_ROOT/scripts/check-component-parity.py" \
  --config "$CONFIG" \
  --component "<name>"
```

The script (see below) reads the Figma component set structure and the local CSS file and reports:
- BEM class names in CSS that have no matching Figma layer name
- Figma variant property values that have no matching CSS modifier class (`btn--primary`, `btn--small`, etc.)
- CSS custom properties referenced in the component file that don't exist in the generated token files

If the script doesn't exist yet, create it (see **Script: check-component-parity.py** below).

---

## Step 4 — Token binding parity

For each component in the `components` array that has both a `figmaNodeId` and a `cssFile`, compare the variable bindings on the Figma component's default variant against the tokens actually used in the CSS.

### 4a — Read Figma variable bindings

```javascript
// figma_execute
await figma.loadAllPagesAsync();
const allVars = await figma.variables.getLocalVariablesAsync();

const set = figma.root.findOne(n => n.id === '<figmaNodeId>');
// Use the first child (default variant) as the reference
const defaultVariant = set.children[0];

function resolveVarName(varId) {
  const v = allVars.find(x => x.id === varId);
  return v ? v.name.replace(/\//g, '-') : null; // background/page → background-page
}

const bindings = [];

function walkNode(node) {
  // Fills
  if (node.fills) {
    for (const f of node.fills) {
      if (f.boundVariables?.color) {
        const name = resolveVarName(f.boundVariables.color.id);
        if (name) bindings.push({ node: node.name, property: 'fill', token: `--${name}` });
      }
    }
  }
  // Strokes
  if (node.strokes) {
    for (const s of node.strokes) {
      if (s.boundVariables?.color) {
        const name = resolveVarName(s.boundVariables.color.id);
        if (name) bindings.push({ node: node.name, property: 'stroke', token: `--${name}` });
      }
    }
  }
  // Dimensional bindings
  const dimProps = [
    'strokeWeight','strokeTopWeight','strokeBottomWeight','strokeLeftWeight','strokeRightWeight',
    'cornerRadius','itemSpacing',
    'paddingTop','paddingBottom','paddingLeft','paddingRight',
    'width','height'
  ];
  for (const prop of dimProps) {
    if (node.boundVariables?.[prop]) {
      const name = resolveVarName(node.boundVariables[prop].id);
      if (name) bindings.push({ node: node.name, property: prop, token: `--${name}` });
    }
  }
  if (node.children) {
    for (const child of node.children) walkNode(child);
  }
}

walkNode(defaultVariant);
return bindings;
```

This returns every token bound to a visual property on the default variant, keyed by node name and property type.

### 4b — Read CSS token usage

```bash
grep -oE 'var\(--[a-zA-Z0-9-]+\)' "$REPO_ROOT/<cssFile>" | \
  grep -oE '\-\-[a-zA-Z0-9-]+' | sort -u
```

This gives the flat list of tokens the CSS actually references.

### 4c — Compare

For each `token` returned by Figma bindings:
- If it is **not present** in the CSS token list → **❌ Figma binds `--token-name` on `<node>.<property>` but CSS does not use it**

This catches the case where Figma has `icon/size/xs` bound to the icon node's width/height, but the CSS uses `var(--icon-size-sm)` instead — a semantic mismatch that token existence checks cannot catch.

**Important caveats:**
- A Figma binding missing from CSS is not always a bug — some tokens apply via inherited cascade or are set on the HTML element directly. Flag as ⚠️ warning, not ❌ fail, unless the property is a fill or stroke (those must be explicit).
- Dimensional tokens (width, height, padding, spacing, radius) that appear in Figma but not CSS should be flagged as ⚠️ warning with the node and property name so the discrepancy can be assessed manually.
- Fill and stroke token mismatches are ❌ fail — colour is never inherited in a way that would legitimately omit an explicit reference.

Skip this step for components without a `figmaNodeId` or `cssFile` in the registry, and note them in the report.

---

## Report format

```
## Drift Report — <date>

### Token drift
✅ No token drift  (or)
❌ 3 tokens in Figma missing from CSS:
   - background/overlay → --background-overlay
⚠️ 2 stale tokens in CSS (deleted from Figma):
   - --border-subtle-light
❌ 1 broken reference in component CSS:
   - button.css uses var(--btn-focus-ring) — not defined anywhere

### Story drift
✅ No story drift  (or)
❌ Primary variant: missing Icon export
⚠️ Ghost variant: story file exists but Figma type 'ghost' not found in component set

### Component parity
✅ button: 0 issues  (or)
❌ button: 2 issues
   - CSS class .btn--loading has no matching Figma variant
   - Figma variant type=link has no CSS modifier class
```

### Token binding parity
✅ button: all Figma bindings matched in CSS  (or)
⚠️ button: 1 dimensional mismatch:
   - icon (width/height) → Figma binds --icon-size-xs, CSS uses --icon-size-sm
❌ button: 1 colour mismatch:
   - label (fill) → Figma binds --text-on-action, not found in button.css

Zero issues across all four → "Stack is in sync with Figma ✅"

## After reporting

If there are fixable issues (token drift, story drift), ask:
> "Would you like me to run `/sync` to fix the token and story issues automatically?"

Component parity issues (CSS class ↔ Figma layer mismatches) need manual review — surface them for the user to decide.

---

## Script: check-component-parity.py

Create at `<REPO_ROOT>/scripts/check-component-parity.py` if it doesn't exist:

```python
#!/usr/bin/env python3
"""
check-component-parity.py
Compares a component's CSS modifier classes and token references
against its entry in design-system.json (Figma node ID must be populated).
Usage: python3 scripts/check-component-parity.py --config .claude/design-system.json --component button
"""
import argparse, json, re, sys
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--config', required=True)
parser.add_argument('--component', required=True)
args = parser.parse_args()

config = json.loads(Path(args.config).read_text())
components = config.get('components', [])
comp = next((c for c in components if c['name'] == args.component), None)

if not comp:
    print(f"ERROR: component '{args.component}' not in registry")
    sys.exit(1)

repo_root = Path(args.config).parent.parent
css_file  = repo_root / comp.get('cssFile', '')
gen_dir   = repo_root / config['tokens']['generated']

if not css_file.exists():
    print(f"ERROR: CSS file not found: {css_file}")
    sys.exit(1)

css = css_file.read_text()

# Collect BEM modifier classes from component CSS
modifier_classes = set(re.findall(r'\.([\w]+--[\w-]+)', css))

# Collect var() references
var_refs = set(re.findall(r'var\(--([\w-]+)\)', css))

# Collect defined custom properties from generated token files
defined_vars = set()
for f in gen_dir.glob('*.css'):
    for m in re.findall(r'--([\w-]+)\s*:', f.read_text()):
        defined_vars.add(m)

issues = []

# Check for broken token references
for ref in sorted(var_refs):
    if ref not in defined_vars:
        issues.append(f"broken token reference: var(--{ref}) not defined in {gen_dir}")

if not issues:
    print(f"{args.component}: 0 issues ✅")
else:
    print(f"{args.component}: {len(issues)} issue(s)")
    for i in issues:
        print(f"  ❌ {i}")
    sys.exit(1)
```

Note: BEM class ↔ Figma variant matching requires the Figma node data (fetched in Step 3 via the MCP); the script only checks what it can read locally (token references). The full parity check is done by the skill comparing Figma API output against the script's CSS analysis.
