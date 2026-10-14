---
name: export-icons
description: Exports all icons from a Figma icon component set, strips fill attributes so they inherit currentColor, builds a master SVG sprite, then commits and pushes. Use whenever the user says "export icons", "/export-icons", "update the sprite", "sync icons from Figma", "rebuild the icon sprite", or icons have been added, removed, or renamed in Figma.
---

# Export Icons

Rebuilds the SVG sprite from the Figma icon component set for any design system project.

## Figma MCP rule
Always use `mcp__figma-console__*` tools. Never use `Figma:use_figma` or `Figma:get_design_context`.

---

## Step 0 — Load config

```bash
REPO_ROOT=$(git rev-parse --show-toplevel)
CONFIG="$REPO_ROOT/.claude/design-system.json"
```

If `design-system.json` does not exist → invoke `/setup-design-system` first.

Read from config:
- `figma.fileId` — to confirm we're targeting the right file
- `figma.iconNodeId` — the component set node ID for icons (may not exist yet)
- `icons.spritePath` — output path for the sprite (default: `src/icons/sprite.svg`)

If `figma.iconNodeId` is missing from the config, ask:
> "What is the node ID of your Figma icon component set? (Right-click the component set in Figma → Copy/Paste → Copy link, then extract the node ID from the URL, or select it and I can find it.)"

Save the node ID back to `design-system.json` under `figma.iconNodeId` for future runs.

---

## Step 1 — Export SVGs from Figma

```javascript
// figma_execute
const compSet = await figma.getNodeByIdAsync('<iconNodeId>');
if (!compSet) throw new Error('Icon component set not found: <iconNodeId>');
const icons = compSet.children;

const results = [];
for (const icon of icons) {
  const svg = await icon.exportAsync({ format: 'SVG', svgOutlineText: false });
  const svgString = String.fromCharCode(...new Uint8Array(svg));
  results.push({ name: icon.name, svg: svgString });
}
return results;
```

If export fails or returns 0 icons:
```bash
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [export-icons] ERROR: icon export failed | NodeId: <iconNodeId> | Count: 0" >> "$REPO_ROOT/.claude/design-system-errors.log"
```
Stop — do not write a broken sprite.

---

## Step 2 — Build the sprite

For each exported SVG:
1. Extract the `viewBox` from the `<svg>` tag
2. Extract inner content between `<svg ...>` and `</svg>`
3. Strip all `fill="..."` attributes (so icons inherit `currentColor` from CSS)
4. Convert icon name to kebab-case id: `"Arrow Right"` → `icon-arrow-right`
5. Wrap in `<symbol id="icon-{name}" viewBox="{viewBox}">...</symbol>`

Final sprite wrapper:
```xml
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <!-- {N} icons exported from Figma node <iconNodeId> -->
  <symbol id="icon-..." viewBox="...">...</symbol>
</svg>
```

---

## Step 3 — Write the sprite

Write to `<REPO_ROOT>/<icons.spritePath>` (default: `src/icons/sprite.svg`). Overwrite entirely.

---

## Step 4 — Verify

- Count `<symbol` occurrences — must match icon export count
- Confirm no `fill="` attributes remain (stray fills break dark mode)

If either check fails:
```bash
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [export-icons] ERROR: sprite verification failed | Expected: <N> symbols | Found: <M> | Stray fills: <yes/no>" >> "$REPO_ROOT/.claude/design-system-errors.log"
```

---

## Step 5 — Commit and push

```bash
cd "$REPO_ROOT"
git add <icons.spritePath>
git commit -m "chore: rebuild icon sprite from Figma export (<N> icons)"
git push
```

---

## Report back

Confirm icon count, fill-strip success, sprite written, push succeeded. If anything failed, point to `.claude/design-system-errors.log`.

## How icons are used in HTML

```html
<svg width="16" height="16" aria-hidden="true" focusable="false">
  <use href="#icon-arrow-right"/>
</svg>
```

The sprite must be fetch-injected at page load (requires HTTP server, not `file://`):
```javascript
fetch('/src/icons/sprite.svg')
  .then(r => r.text())
  .then(svg => {
    const div = document.createElement('div');
    div.style.display = 'none';
    div.setAttribute('aria-hidden', 'true');
    div.innerHTML = svg;
    document.body.insertBefore(div, document.body.firstChild);
  });
```
