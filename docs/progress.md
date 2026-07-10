
## 27 Jun 2026 — adamdanielbest Design System

### What changed
- **Tokens:** `spacing/sheet-margin-y` mobile updated to 40px (half of desktop 80px), aliased to `space.800`
- **Skills:** Built full project-agnostic design system skill suite — `design-system-setup`, `export-tokens`, `export-icons`, `build-page`, `preview`, `log-progress`, `review-code`, `review-design`. All skills read from `.claude/design-system.json` with first-time setup wizard and error logging to `.claude/design-system-errors.log`
- **Config:** `.claude/design-system.json` created for this project with Figma file ID, token paths, preview config
- **Figma:** Ran `/review-design` on both Layout frames — fixed default frame names, bound annotation fills to correct tokens (`background/code` for bars, `text/code` for labels). Both frames pass all checks ✅

### Context & decisions
- Skills are now globally installed at `~/.claude/skills/` — project-agnostic and reusable for the metadata app project
- Figma export tool doesn't persist `setValueForMode` changes — mobile `spacing/sheet-margin-y` must be patched in the JSON post-export (added to permanent patch list)
- `review-design` skill working well as a live audit + fix tool — caught naming issues and unbound fills in the mobile frame built last session

### Next session
- Pick up with the metadata app design system — run `/design-system-setup` in that project to get started
- Consider running `/review-design` on remaining Figma frames (button, typography) to bring them up to standard

---

## 27 Jun 2026 — adamdanielbest Design System

### What changed
- Token Reference page built out (uncommitted working tree)

### Context & decisions
- Applied `text-box-trim: trim-both; text-box-edge: cap alphabetic` globally to all text elements. The `*` selector does not cascade `text-box-trim` reliably in Chrome — must use an explicit element list (h1–h6, p, span, a, li, code, th, td, etc.)
- Fixed borders on semantic swatch cards and primitive swatches
- Updated swatch/label names to label style (Eina04-SemiBold, 12/16) across the board
- Removed trailing slashes from overline group labels (e.g. `foreground/` → `Foreground`)
- Restructured link states into a 3-column table (State / Token / Example) matching Figma button-grid table style — `border-collapse: collapse` on `<table>` prevents `border-radius`, so wrapped in a container div
- Fixed code badge colours to use `--background-code` / `--text-code` tokens (were incorrectly using brand accent)
- Full spacing audit against Figma: section header gap 8→16px, swatch grid gap 8→16px, group label bottom padding +8px, type row meta gap 2→8px, spacing list gap 8→16px, radius grid gap 24→16px
- Removed `overflow: hidden` from `.type-row__sample` — was clipping heading text after text-box-trim was applied

### Next session
- Commit token-reference/ files to a feature branch
- Token Reference page is otherwise visually complete — consider a final Figma diff before committing

---

## 28 Jun 2026 — adamdanielbest Design System

### What changed
- **Token reference:** Rebuilt Elevation, Border Radius, Spacing, and Layout & Grid sections to match Figma — semantic token names, card layouts, visual demos, code badges
- **Token reference:** Added `title` attributes to all text elements across the entire page (232 total) — headings, breadcrumbs, table cells, swatch names, descriptions, code badges
- **Boilerplate:** Updated `component-sheet.html` with mandatory `title` rule in comments
- **Tooling:** Updated `/review-code` skill to check for missing `title` attributes on text elements
- **CSS:** Elevation dark swatches use inverted code badges (`rgba(255,255,255,0.08)`); spacing code badges hug content (`align-self: flex-start`)

### Context & decisions
- Dark elevation swatches hardcode `#141C27` / `#FAF9F6` as light-mode CSS vars don't resolve correctly for the dark-surface context
- `min-height: 52px` on `.elevation-item__meta` prevents the `high` card from floating when text wraps differently across columns
- Layout & Grid table now uses the same `link-state-table` pattern as link states — approved design going forward for all token tables

### Next session
- Commit `token-reference/` files to a feature branch
- Run `/log-progress` is already done — go straight to commit

---

## 30 Jun 2026 — adamdanielbest Design System

### What changed
- **Token reference:** Typography table padding corrected to equal 24px (`spacing/card-padding`); `type-row` padding also equalised to 24px all sides
- **Token reference:** Table border-radius corrected to `radius/small` (4px) — was inheriting outer card 16px, now correctly nested
- **CSS:** `code` font-size tokenised to `--type-caption-size` in `sheet.css` (was hardcoded 12px)
- **Boilerplate:** `component-sheet.html` RULES block updated with `<code>` element guidance (parent needs defined width for truncation)
- **Tooling:** `figma-console` MCP (Desktop Bridge) configured in `~/.claude.json` — switches from rate-limited official Figma MCP to local WebSocket bridge with no rate limits
- **Figma:** Input component set built — 20 variants (4 types × 5 states), all fills/strokes/text token-bound, auto-wired `Type` and `State` variant properties

### Context & decisions
- Official Figma MCP (`mcp.figma.com`) hit Starter plan rate limit mid-build — switched permanently to `figma-console-mcp` (southleft Desktop Bridge). Rule saved to memory.
- Custom font Eina04 requires text content to be set before calling `setTextStyleIdAsync` — `loadFontAsync` fails for uploaded fonts. Content → style order is now the established pattern.
- `combineAsVariants` auto-extracts variant properties from `Type=X, State=Y` naming convention — no manual property wiring needed.

### Next session
- Review Input component in Figma and give feedback
- Place Input component on page template (node 2680-1882)
- Build Input CSS component sheet

---

## 10 Jul 2026 — adamdanielbest Design System

### What changed
- **Figma:** Light input grid (`2702:13009`) fully rebuilt from scratch — all 24 cells using `FIXED` sizing with explicit row heights `[40, 106, 106, 89]`. Fixed persistent border misalignment caused by Figma GRID layout's `FILL`/`HUG` cell sizing behaving differently to auto-layout. Text-type cells have `Icon#2694:0: false` (no dropdown chevron).
- **Figma:** Dark input grid (`2703:38937`) rebuilt with the same FIXED-cell approach.
- **Figma:** Dark grid instance tokens remapped — 85 fills and 30 strokes overridden from `02 Color/Light` to `02 Color/Dark` equivalents across all nested instance nodes. Root cause: master component uses light collection variables; dark sheets require explicit node-level overrides since collections can't be mode-switched.
- **Skills:** `/review-design` (global + project) updated — new check 1b detects `wrong-collection` fails on any dark sheet; all nodes at depth > 0 must use `02 Color/Dark`. Includes fix script in `## Dark token remap` section.
- **Skills:** `/build-figma-guideline-page` updated — new Step 6b runs `remapNode(grid)` after cell population on dark sheets; dark token reference table added.

### Context & decisions
- Figma GRID layout mode does not follow the same sizing rules as auto-layout: `FILL` cells collapse to minimum height (~14px), `HUG` cells only work if content exactly matches row height. `FIXED` sizing with explicit pixel heights is the only reliable approach for variant matrix grids.
- Light/dark as separate collections (not modes within one collection) means dark sheet instances can't inherit the correct tokens automatically. The name-matched light→dark remap (`lightToDark` map by token name) is the established pattern until collections are restructured.

### Food for thought
- The variant matrix grid keeps causing friction — cell sizing, border alignment, row height mismatches. Worth considering building the grid as a **reusable Figma component or organism** rather than constructing it fresh each time via script. A parameterised grid component (with slot cells, fixed header row, configurable column count) could be instantiated rather than built, reducing drift and debugging time per component sheet.

### Next session
- Build `input-component/input.html` and `input.css` — HTML guideline page for the input component
- Check dark Select sheet for same light-token issue and apply remap if needed

---
