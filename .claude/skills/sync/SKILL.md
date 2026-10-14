---
name: sync
description: Master downstream sync from Figma to code. Exports tokens, rebuilds the icon sprite, and syncs Storybook story files from Figma component sets. Run this after any Figma change — tokens, icons, or component variants — to keep the codebase in sync. Use whenever the user says "sync", "pull from Figma", or "update the design system".
---

# Sync (Downstream)

Runs the full Figma → Code pipeline in order: tokens → icons → stories → commit.

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
- `figma.iconNodeId`
- `tokens.source`, `tokens.generated`, `tokens.generateScript`, `tokens.checkScript`
- `components` array (each entry: `name`, `figmaNodeId`, `storiesDir`, `sharedFile`, `cssFile`)

If `components` is missing or empty, run Step 3a to discover components before continuing.

---

## Step 0.5 — Discover new components

Scan the Figma file for component sets that aren't yet in the registry, and check for local CSS files that aren't registered either.

### Figma scan

```javascript
// figma_execute
await figma.loadAllPagesAsync();
// Include both COMPONENT_SET (has variants) and top-level COMPONENT (no variants,
// i.e. not a child of a COMPONENT_SET) — both can be registered as components.
const sets = figma.root.findAll(n =>
  n.type === 'COMPONENT_SET' ||
  (n.type === 'COMPONENT' && n.parent?.type !== 'COMPONENT_SET')
);
return sets.map(s => ({ id: s.id, name: s.name, type: s.type, page: s.parent?.name }));
```

Compare the returned list against the `components` array in `design-system.json`. Any entry whose `name` doesn't match an existing `name` entry is new.

### Local CSS scan

```bash
find "$REPO_ROOT" -name "*.css" -path "*-component/*" | sort | sed "s|$REPO_ROOT/||"
```

Compare against registered `cssFile` values. Any CSS file not matched to a component entry is unregistered.

### Register new components

For each unregistered component found by either scan:
1. Derive `name` from the CSS file path (e.g. `sidebar-component/sidebar.css` → `sidebar`) or the Figma component set name.
2. Match CSS file to Figma node by name (kebab-case component name → component set name).
3. Add an entry to `design-system.json` with `name`, `figmaNodeId` (if matched), `cssFile`, and `htmlFile`.
4. Write the updated config back to disk.

Report which components were newly registered before continuing.

---

## Step 1 — Export tokens

Call `figma_export_tokens`:
```
format: dtcg
outputPath: <REPO_ROOT>/<tokens.source>
scope: file
strategy: replace
colorFormat: hex
```

If it fails, log and stop:
```bash
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [sync] ERROR: token export failed" >> "$REPO_ROOT/.claude/design-system-errors.log"
```

If `scripts/patch-token-aliases.py` exists, run it:
```bash
python3 "$REPO_ROOT/scripts/patch-token-aliases.py"
```

Regenerate CSS:
```bash
cd "$REPO_ROOT" && python3 "<tokens.generateScript>"
```

Run token reference check:
```bash
python3 "$REPO_ROOT/<tokens.checkScript>"
```

Stop if unresolved references are found — do not commit broken tokens.

---

## Step 2 — Export icons

```javascript
// figma_execute
await figma.loadAllPagesAsync();
const compSet = await figma.getNodeByIdAsync('<iconNodeId>');
const icons = compSet.children;
const results = [];
for (const icon of icons) {
  const svg = await icon.exportAsync({ format: 'SVG', svgOutlineText: false });
  const svgString = String.fromCharCode(...new Uint8Array(svg));
  results.push({ name: icon.name, svg: svgString });
}
return results;
```

Build the sprite — for each exported SVG:
1. Extract the `viewBox`
2. Extract inner content
3. Strip all `fill="..."` attributes
4. Parse the Figma variant name (`"icon=search, size=xs"`) into icon name + size
5. Convert to symbol id using this convention:
   - `size=xs` → `icon-{name}` (no size suffix — xs is the default inline size used in components)
   - `size=sm/md/lg` → `icon-{name}-{size}`
   - Example: `"icon=search, size=xs"` → `icon-search`, `"icon=search, size=sm"` → `icon-search-sm`
6. Wrap: `<symbol id="{id}" viewBox="...">`

Write to `src/icons/sprite.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <!-- {N} icons exported from Figma node {iconNodeId} (xs=no suffix, sm/md/lg=size suffix) -->
  <symbol id="icon-..." viewBox="...">...</symbol>
</svg>
```

Verify: count `<symbol` tags matches export count, no stray `fill=` attributes.

---

## Step 2.5 — Check stale `<use>` references in shared files

After rebuilding the sprite, scan all `*.shared.js` files in `<storiesDir>` (and any top-level `stories/` directory) for `<use href="#icon-...">` references and cross-reference them against the symbol IDs now in the sprite.

### 2.5a — Extract current sprite IDs

```bash
grep -oE 'id="icon-[^"]*"' "$REPO_ROOT/src/icons/sprite.svg" | sed 's/id="//;s/"//' | sort > /tmp/sprite-ids.txt
```

### 2.5b — Extract `<use>` references from shared files

```bash
grep -roh 'href="#icon-[^"]*"' "$REPO_ROOT/stories/" | sed 's/href="#//;s/"//' | sort -u > /tmp/use-refs.txt
```

### 2.5c — Compare stale refs

```bash
comm -23 /tmp/use-refs.txt /tmp/sprite-ids.txt
```

Any line output by `comm` is a `<use>` reference whose ID no longer exists in the sprite — the icon was renamed or removed in Figma.

For each stale reference found:
1. Search the sprite for a likely replacement (same root name, different suffix convention, or a close fuzzy match).
2. Report the stale reference, the file(s) containing it, and the suggested replacement ID.
3. Update the reference in the shared file if a clear 1:1 replacement exists.
4. If ambiguous, report it and ask the user to resolve manually before committing.

Example output:
```
⚠️ Stale icon reference: #icon-eye-slash → not in sprite
   Found in: stories/input.shared.js
   Suggested replacement: #icon-visibility-off
   → Auto-updated ✅
```

### 2.5d — Check for inline SVGs that should use the sprite

Icons must always be referenced from the sprite via `<use href="#icon-*"/>`. Scan all `*.shared.js` files and `*-component/*.html` files for SVG elements that carry an icon class name (`*__icon`, `*__check`) but contain an inline `<path>` or `<polygon>` instead of a sprite ref — these bypass the sprite and can't be updated centrally.

```bash
grep -rn 'class="[^"]*__icon[^"]*"\|class="[^"]*__check[^"]*"' \
  "$REPO_ROOT/stories/"*.shared.js \
  "$REPO_ROOT"/*-component/*.html \
  2>/dev/null | grep '<path\|<polygon' | grep -v 'use href="#icon-'
```

For each match found:
1. Note the file, line, and class name.
2. Search the sprite for the likely correct ID based on the icon's role (e.g. `.select__icon` used as a chevron → `#icon-arrow-drop-down` / `#icon-arrow-drop-up`).
3. Report as ❌ — do not auto-fix (replacing inline SVG paths requires understanding context). Ask the user to update manually before committing.

Example output:
```
❌ Inline SVG found — should use sprite:
   stories/select.shared.js line 12: <svg class="select__icon"> uses inline <path>
   Suggested: #icon-arrow-drop-down / #icon-arrow-drop-up
   → Fix manually before committing
```

If any inline SVG issues are found, warn before the final commit step and ask the user to confirm they want to proceed anyway.

---

## Step 3 — Sync stories

For each component in the `components` array:

### 3a — Discover component sets (first run or missing figmaNodeId)

If `figmaNodeId` is missing for a component, search by name:
```javascript
// figma_execute
await figma.loadAllPagesAsync();
const sets = figma.root.findAll(n => n.type === 'COMPONENT_SET');
return sets.map(s => ({ id: s.id, name: s.name, page: s.parent?.name }));
```

Match by component name, write the found `figmaNodeId` back to `design-system.json`.

### 3b — Read component set variant structure

```javascript
// figma_execute
await figma.loadAllPagesAsync();
const set = figma.root.findOne(n => n.id === '<figmaNodeId>');
const props = set.componentPropertyDefinitions;
const variantNames = set.children.map(v => v.name);
return { props, variantNames };
```

Extract variant axes. Standard mapping:
- `type` or `style` → variant groups (one story file per value)
- `size` → named exports within each group (Small / Medium / Large)
- `state` → state exports (Focus / Disabled) plus argType control

### 3c — Generate or update story files

Story files use flat dot-naming in the `stories/` root: `<ComponentName>.<TypeName>.stories.js`
(e.g. `Button.Primary.stories.js`, `Input.Text.stories.js`). Never create subdirectories.

For each variant type value (e.g. `primary`, `secondary`, `ghost`, `destructive`):

**Check if a story file already exists** at `stories/<ComponentName>.<TypeName>.stories.js`:
- If it does: compare existing exports against Figma variants. Add missing exports, remove stale ones. Do not touch the render logic or argTypes.
- If it doesn't: generate a stub (see template below).

**Story file template** (generated for new components):
```js
import { render<ComponentName>, stateArgTypes, defaultArgs } from './<name>.shared.js';

export default {
  title: 'Components/<ComponentName>/<TypeName>',
  argTypes: stateArgTypes,
  args: { ...defaultArgs, type: '<typeName>' },
};

const render = (args) => render<ComponentName>(args);

// Sizes
export const Small  = { args: { size: 'small'  }, render };
export const Medium = { args: { size: 'medium' }, render };
export const Large  = { args: { size: 'large'  }, render };

// Icon (if component has icon variant)
// export const Icon = { args: { size: 'medium', showIcon: true }, render };

// States
export const Focus    = { args: { size: 'medium', state: 'focus'    }, render };
export const Disabled = { args: { size: 'medium', state: 'disabled' }, render };
```

**Shared file** (`stories/<name>.shared.js`):
- **NEVER overwrite an existing shared file.** Check with `fs.existsSync` or `[ -f path ]` first.
- Only create it if the file does not exist. A shared file contains working render functions that are not derivable from Figma — overwriting one destroys hand-written HTML structure.
- If a shared file already exists but is missing exports that new story files need, report it and ask the user to update it manually.

**Shared file template** (only written if the file does not already exist):
```js
import '../<name>-component/<name>.css';
import { swapIcon } from './sprite.js';
// swapIcon(svgEl, '#icon-name') — use this whenever an icon needs to change at runtime.
// Never swap icons by replacing innerHTML or href directly; always use swapIcon.

// TODO: implement render<ComponentName> for this component's HTML structure
export const render<ComponentName> = (args) => {
  return `<!-- TODO: render ${args.type} ${args.size} <name> -->`;
};

export const stateArgTypes = {
  label: { control: 'text' },
  state: {
    control: 'select',
    options: ['default', 'hover', 'focus', 'focus-hover', 'pressed', 'disabled'],
    description: 'Simulated interaction state',
  },
};

export const defaultArgs = { label: '<ComponentName>', state: 'default' };
```

Tell the user which files were generated as stubs (render function needs manual implementation) vs which were updated automatically. For any shared file that already existed and was left untouched, confirm it was skipped.

---

## Step 3.5 — Update component stylesheets

For each component in the `components` array that has a `cssFile` entry:

1. Read the current CSS file at `<REPO_ROOT>/<cssFile>`.
2. Read the component's Figma node to get the current token bindings on fills, strokes, spacing, radius, and stroke weights (use the same `figma_execute` pattern from Step 3b).
3. Cross-reference every `var(--token-name)` in the CSS against the Figma bindings:
   - If a token was renamed in Figma (e.g. `--border-default` → `--border-focus`), update all usages in the CSS.
   - If a new semantic token was added (e.g. `--border-focus-inner`), check whether the CSS already references it; add it where the Figma structure implies it should appear.
   - If the CSS references a token that no longer exists in the generated files, flag it — do not silently remove it.
4. Check the focus ring pattern specifically:
   - Figma focus states use a two-layer ring: outer `border/focus` (3px) on `container`, inner `border/focus-inner` (2px) on `input-field`.
   - The CSS `:focus-visible` rule should use `box-shadow` or `outline` to replicate this. If it doesn't, update it.
5. Write any changes back to the CSS file. If no changes are needed, skip without touching the file.

**Do not** rewrite the entire CSS file — make targeted edits only. Preserve comments, existing structure, and any intentional hard-coded values that are documented.

If a component has no `cssFile` in the registry, skip it and note it in the report.

---

## Step 4 — Update component registry

Write any newly discovered `figmaNodeId` values back to `design-system.json` under the `components` array.

---

## Step 5 — Commit and push

```bash
cd "$REPO_ROOT"
git add \
  "<tokens.source>" \
  "<tokens.generated>" \
  "src/icons/sprite.svg" \
  "stories/" \
  ".claude/design-system.json"

# Stage any component CSS files that were updated in Step 3.5
for cssFile in <space-separated list of cssFile paths from components array>; do
  git add "$REPO_ROOT/$cssFile"
done

git commit -m "chore: sync from Figma — tokens, icons, stories, stylesheets"
git push
```

---

## Report back

Summarise:
- Tokens: how many exported, any unresolved refs
- Icons: how many in sprite; any stale `<use>` references found, auto-fixed, or flagged for manual resolution
- Stories: which files updated, which are stubs needing manual render work
- Stylesheets: which CSS files were updated and what changed (token renames, focus ring pattern, new tokens); which had no changes; which were skipped due to missing cssFile
- Any errors → point to `.claude/design-system-errors.log`
