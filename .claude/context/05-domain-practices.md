# Domain Practices

How this design system is actually architected and built. Describes reality, not the plan.

---

## Token Architecture

### Collection structure

Tokens live in five Figma variable collections, each exported separately to CSS:

| Collection | CSS file | Purpose |
|---|---|---|
| `01 Primitives` | `tokens-primitives.css` | Raw scale values — neutral/0, cobalt/300, space/800, etc. No semantic meaning. |
| `02 Color/Light` | `tokens-light.css` | Semantic colour tokens for light mode contexts |
| `02 Color/Dark` | `tokens-dark.css` | Semantic colour tokens for dark mode contexts |
| `02 Dimensions/Desktop` | `tokens-desktop.css` | Spacing, sizing, radius — desktop density |
| `02 Dimensions/Mobile` | `tokens-mobile.css` | Spacing, sizing, radius — mobile density (reduced) |

**Important:** `02 Color/Light` and `02 Color/Dark` are separate collections, not modes within a single collection. There is no mode switching in the CSS layer. A component's colour tokens in Figma are bound to one collection. Dark sheets require explicit node-level overrides — instances cannot automatically adopt the dark collection.

### Naming convention

Tokens use slash-separated semantic paths: `category/variant` or `category/subcategory/variant`.

Examples: `text/primary`, `background/card`, `border/focus`, `spacing/content-gap`, `radius/small`.

In CSS: `--text-primary`, `--background-card`, `--border-focus`, `--spacing-content-gap`, `--radius-small`.

### DTCG format

Figma exports in W3C Design Token Community Group (DTCG) format. Alias resolution in the export omits collection prefixes (e.g. `{cobalt.300}` means `01-primitives.cobalt.300`). The Python generation script resolves aliases by searching `01-primitives` first, then falls back to the same collection by suffix path.

---

## Token Pipeline

### Figma → CSS → GitHub

1. **Export from Figma** — `figma_export_tokens` via figma-console MCP, DTCG format, output to `src/styles/tokens/tokens.tokens.json`
2. **Apply patches** — `python3 scripts/patch-token-aliases.py` — fixes Figma export edge cases (e.g. `spacing/sheet-margin-y` mobile value not persisted by `setValueForMode`)
3. **Generate CSS** — `python3 generate-tokens-css.py` — resolves aliases and writes 5 CSS files to `src/styles/generated/`
4. **Check references** — `python3 token-reference/check-token-refs.py` — verifies every `var(--token)` in component CSS resolves against the generated files; stops pipeline if any break
5. **Commit + push** — `git add` token source and generated files, commit with `chore: sync tokens from Figma`, push

This entire pipeline is automated by the `/export-tokens` skill.

### Known patch requirement

`spacing/sheet-margin-y` mobile value must be patched post-export — Figma's export tool doesn't persist `setValueForMode` changes for this token. Patch script handles it permanently.

---

## Figma → MCP tooling

Always use `mcp__figma-console__*` tools (Desktop Bridge, local WebSocket). Never use `Figma:use_figma`, `mcp__figma__*`, or the official `mcp.figma.com` server. The official server hits Starter plan rate limits mid-session.

---

## Component Sheet Structure (Figma)

Every component has a light and dark reference sheet on the `Style Guide` page.

### Layer tree

```
Component - {Category} - {Name}            ← outer frame, 1440px FIXED, HORIZONTAL
  container                                ← FILL, VERTICAL, max-width 1200px
    Header                                 ← FIXED, VERTICAL
      toolbar                              ← FILL, VERTICAL
        page-title                         ← text, page title style
      page-header__metadata                ← HUG, VERTICAL
        breadcrumb                         ← text, body style
        metadata                           ← text, body style
        description                        ← text, body style
    section                                ← FILL, VERTICAL, section-gap spacing
      content-row                          ← FILL, HORIZONTAL, card-padding
        {component}-grid                   ← FILL, GRID
          corner                           ← cell
          header-{state} × N              ← header cells
          label-{type} × M               ← row label cells
          cell-{type}-{state} × N×M      ← variant instance cells
```

### Grid layout

Component variant matrices always use `layoutMode: 'GRID'`, never absolute positioning or nested auto-layout. Cell sizing must be `FIXED` — `FILL` and `HUG` cells collapse or misalign in Figma's GRID layout mode.

Column widths: first column is label, 96px FIXED. Remaining columns are FLEX equal-width.

Row heights: header row 40px FIXED. Variant rows 98px FIXED (or height-matched to component instance).

### Token binding rules

- All fills and strokes must be variable-bound — no hardcoded hex
- Text nodes must have a text style applied via `setTextStyleIdAsync`
- Spacing (padding, itemSpacing) must be variable-bound where possible
- Layer names must be kebab-case throughout

### Dark sheet token rule

On any sheet whose name contains `dark`, all fills and strokes at depth > 0 must use `02 Color/Dark` collection variables. Component instances default to light collection variables and require explicit remapping via the `lightToDark` name-matched map pattern.

---

## Custom Font Handling (Eina04)

`loadFontAsync` fails for uploaded custom fonts in Figma's plugin environment. The established workaround: set `node.characters` and `node.fills` before calling `await node.setTextStyleIdAsync(id)`. The style application handles font loading internally.

This applies to all text node creation in Figma scripts. Never attempt `await figma.loadFontAsync({ family: 'Eina04', ... })`.

---

## HTML/CSS Component Pages

Each component has a corresponding HTML guideline page alongside its CSS.

### File structure

```
{component}-component/
  {component}.html    ← guideline page
  {component}.css     ← component styles
```

### Token CSS loading order

```html
<link rel="stylesheet" href="../src/styles/generated/tokens-primitives.css">
<link rel="stylesheet" href="../src/styles/generated/tokens-light.css">   <!-- or dark via data-theme -->
<link rel="stylesheet" href="../src/styles/generated/tokens-desktop.css"> <!-- or mobile via data-density -->
<link rel="stylesheet" href="../src/styles/tokens/sheet.css">
```

Light/dark switching is handled by `data-theme` on `<html>`. Mobile density by `data-density`.

### Code standards

- All colour, spacing, radius, and typography values use `var(--token-name)` — no hardcoded hex or px
- Named bold/semibold font-family tokens (e.g. `Eina04-SemiBold`) must pair with `font-weight: 400` — weight is baked into the filename
- Semantic HTML throughout
- All component states shown and labelled
- Checked with `/review-code` before marking complete

---

## Layer Naming Conventions

- kebab-case everywhere — lowercase, hyphens for word separation
- Never use Figma default names (`Frame 1`, `Group`, `Text`, `Rectangle 1`, etc.)
- Semantic and descriptive — `input-field`, `select-grid`, `header-hover`, `label-password`
- Component instances inside cells named by variant: `cell-{type}-{state}`

---

## Portfolio Website — Layout Architecture

The portfolio site (Figma page: `Website`) uses a fixed sidebar layout. The Figma layer structure mirrors the HTML/CSS structure directly.

### Desktop (1440px frame)

```
Homepage--Desktop                    ← <body>, HORIZONTAL auto-layout
  aside                              ← <aside>, 360px FIXED, full-height FILL
    aside__inner                     ← padding container, VERTICAL, 32px padding
  main                               ← <main>, FILL, VERTICAL
    container                        ← <div class="container">, FILL, page margins + top/bottom padding
      section--work                  ← <section>, FILL, VERTICAL
        grid                         ← <ul>, VERTICAL (case study cards)
```

### Mobile (375px frame)

```
Homepage--Mobile                     ← <body>, VERTICAL auto-layout
  header                             ← <header>, 56px FIXED, sticky top bar
    site-name                        ← logo / name text, FILL
    hamburger-icon                   ← 24×24 icon placeholder
  main                               ← <main>, FILL, VERTICAL
    container                        ← <div class="container">, 16px l/r padding
      section--work                  ← <section>, VERTICAL
        list                         ← <ul>, VERTICAL (stacked cards)
  drawer--open                       ← overlay frame (absolute, z-top), open state
    drawer__panel                    ← <nav>, 300px FIXED, slides in from left
    dismiss-area                     ← transparent tap-to-close zone
```

### Layout tokens

| Token | Value | Use |
|---|---|---|
| `layout/sidebar-width` | 360px | `aside` fixed width on desktop |
| `layout/grid-margin` | 32px desktop / 16px mobile | Container l/r padding |
| `layout/breakpoint/tablet` | 900px | Sidebar collapses to `header` at this width |
| `layout/max-content-width` | 1200px | Container max-width (desktop) |

### Navigation pattern

- Desktop: sidebar always visible. Active case study highlighted in timeline via accent colour. No breadcrumb.
- Mobile: `header` sticky top bar with hamburger. Drawer slides in with positioning statement, timeline, contact links. Tap `dismiss-area` or `×` to close.
- Case study pages: "← Work" back link in main panel. No breadcrumb.

---

## Skill Suite

All recurring workflow steps are automated via globally installed skills at `~/.claude/skills/`. Each skill reads project config from `.claude/design-system.json`.

| Skill | What it does |
|---|---|
| `/export-tokens` | Full Figma → CSS → GitHub pipeline |
| `/review-design` | Audits a Figma frame against system standards |
| `/make-component-sheet` | Builds a light or dark component reference sheet in Figma |
| `/review-code` | Audits HTML/CSS against token and quality standards |
| `/preview` | Starts local HTTP server for component pages |
| `/setup-project` | Scaffolds `.claude/context/` files for a new project |
