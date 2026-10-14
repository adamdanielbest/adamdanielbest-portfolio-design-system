---
name: build-page
description: Generates a local HTML page from a Figma frame and opens a preview for approval before committing. Use whenever the user says "build this page", "build the page", "/build-page", "turn this frame into a page", "implement this design", or shares a Figma frame and wants it coded up. Gates on tokens and icons being exported first, then generates semantic HTML with token-driven CSS and serves it locally for review.
---

# Build Page

Generates an HTML page from a Figma frame, wired up to the project's token system, and opens a local preview for approval. Does **not** commit — use `commit-code` once the page is approved.

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
- `figma.fileId` — to confirm the right Figma file
- `tokens.generated` — to find token CSS files for path references
- `tokens.checkScript` — to verify token refs after building
- `components` — existing components directory
- `templates` — boilerplate template location
- `preview.port` — for the preview URL after building

---

## Step 1 — Gate: verify tokens and icons are exported

Before building, confirm the repo has up-to-date token CSS and icon SVGs — the page references both and will be broken without them.

```bash
REPO_ROOT=$(git rev-parse --show-toplevel)
CONFIG="$REPO_ROOT/.claude/design-system.json"
TOKENS_DIR=$(jq -r '.tokens.generated' "$CONFIG")
ICONS_DIR=$(jq -r '.icons.output' "$CONFIG")

# Check tokens exist
[ -d "$REPO_ROOT/$TOKENS_DIR" ] && ls "$REPO_ROOT/$TOKENS_DIR"/*.css 2>/dev/null || echo "MISSING: token CSS not found"

# Check icons exist
[ -d "$REPO_ROOT/$ICONS_DIR" ] && ls "$REPO_ROOT/$ICONS_DIR"/*.svg 2>/dev/null | head -3 || echo "MISSING: icons not found"
```

If tokens are missing → invoke `/export-tokens` first.
If icons are missing → invoke `/export-icons` first.
Only proceed once both are confirmed present.

---

## Step 2 — Identify the Figma frame

If a node ID or Figma URL was provided, use it. Otherwise ask:
> "Which Figma frame should I build? You can paste a Figma link or give me the frame name."

Extract the node ID from the URL if needed: `figma.com/file/<fileId>/...?node-id=<nodeId>`

---

## Step 3 — Inspect the frame

Use `figma_execute` to read the frame structure:

```javascript
const node = await figma.getNodeByIdAsync('<nodeId>');
return {
  name: node.name,
  type: node.type,
  width: node.width,
  children: node.children?.map(c => ({
    name: c.name,
    type: c.type,
    layoutMode: c.layoutMode,
    children: c.children?.map(cc => ({ name: cc.name, type: cc.type }))
  }))
};
```

Understand the frame's structure before generating HTML — identify sections, headings, components, and layout patterns.

---

## Step 4 — Check existing components

Look in `<REPO_ROOT>/<components>` for existing component CSS and HTML that can be referenced rather than rebuilt:

```bash
find "$REPO_ROOT/<components>" -name "*.css" -o -name "*.html" | grep -v node_modules
```

Map Figma layer names to existing component files where there's a match.

---

## Step 5 — Check boilerplate template

Read the template from `<REPO_ROOT>/<templates>/component-sheet.html` (or the equivalent file in the templates directory). Use this as the base structure for the new page — it contains the correct token CSS link order, page-header structure, and script setup.

If no template exists, use this baseline:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Category] – [Component] – Design System</title>
  <!-- Token CSS links go here — check tokens.generated for file names -->
</head>
<body>
  <div class="container">
    <header class="page-header">
      <h1>[Component name]</h1>
      <hr class="page-header__divider">
      <div class="page-header__metadata">
        <p class="breadcrumb">...</p>
        <p class="meta">...</p>
        <p class="usage">...</p>
      </div>
    </header>
    <!-- Component content -->
  </div>
</body>
</html>
```

---

## Step 6 — Generate HTML and CSS

Generate semantic HTML following these rules:
- All spacing, colour, radius, and typography values use `var(--token-name)` — no hard-coded px or hex
- Named bold/semibold font-family tokens pair with `font-weight: 400`
- Auto layout in Figma → flexbox in CSS, with `gap` matching `itemSpacing` token
- `FILL` sizing in Figma → `flex: 1` or `width: 100%` in CSS
- `HUG` sizing → no explicit width (natural content width)
- Buttons use `<button type="button">`
- Icons use `<svg aria-hidden="true" focusable="false"><use href="#icon-name"/></svg>`

Determine output path from the frame name:
- Frame named "Button" → `button-component/button.html` + `button-component/button.css`
- Ask the user to confirm the path if unclear

---

## Step 7 — Verify token references

```bash
cd "$REPO_ROOT" && python3 "<tokens.checkScript>"
```

If unresolved references are found:
```bash
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [build-page] ERROR: unresolved token refs after build | Component: <name> | Refs: <list>" >> "$REPO_ROOT/.claude/design-system-errors.log"
```
Fix the references before committing — don't ship broken var() calls.

---

## Step 8 — Start local preview

```bash
cd "$REPO_ROOT"
PORT=$(jq -r '.preview.port // 4321' "$CONFIG")
python3 -m http.server $PORT --bind 127.0.0.1 &
```

Tell the user the preview URL and ask them to review it:
> "Preview is running at http://localhost:<port>/<path-to-html> — take a look and let me know if it's approved. Once you're happy, run `/commit-code` to commit."

Do **not** commit. The page stays local until the user explicitly approves via `commit-code`.

If anything failed, point to `.claude/design-system-errors.log`.
