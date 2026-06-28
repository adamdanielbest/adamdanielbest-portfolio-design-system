
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
