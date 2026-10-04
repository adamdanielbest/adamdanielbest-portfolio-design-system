# Visual Standards

Two surfaces to maintain: Figma style guide sheets, and HTML/CSS guideline pages. Both are portfolio-quality work — they are part of what the system is demonstrating, not internal scaffolding.

---

## Figma Style Guide Sheets

When creating visual reference frames for design tokens or components in Figma, treat them as something a senior designer would be proud to share.

### Presentation rules

- Use auto-layout on everything. No manually positioned elements.
- Group related tokens together with clear section titles.
- Every swatch or sample should show: the token name, the value, and the description.
- Give tokens generous spacing. Cramped displays are hard to scan and look unfinished.
- Use the design system's own typography and colours for labels and frames. The token display should feel like it belongs to the system it's documenting.
- Align everything to a consistent grid. No orphaned elements floating in space.
- Size frames intentionally. A colour swatch that's 20×20px communicates nothing.
- Use visual hierarchy in the labels. Token name most prominent, value secondary, description tertiary.
- Keep backgrounds clean. Use the system's surface tokens for the frame background.
- **Show both light and dark mode.** Every component sheet has a light and dark variant side by side.

### Component sheets

Component sheets follow a fixed structure:
- Outer frame: `Component - {Category} - {Name}` at 1440px wide
- Inner container: max-width 1200px, centred
- Header: page title, breadcrumb, metadata (date, version, contrast rating)
- Content row: card with padding, holding the variant matrix grid
- Variant matrix: CSS GRID layout, one column per state, one row per type/size
- Label column: 96px fixed width; state columns: equal-width FLEX

Layer names must be kebab-case throughout. Fills and strokes must be variable-bound. Text nodes must have text styles applied.

### What to avoid

- Walls of tiny rectangles with hex codes
- Inconsistent sizing between similar tokens
- Missing labels or descriptions on any token
- Flat, lifeless layouts that don't reflect the quality of the system
- Dark mode frames that are just inverted light mode — they require deliberate decisions

---

## HTML/CSS Guideline Pages

Each component has a corresponding HTML/CSS page that documents it in code. These pages live alongside the component files in the repo and are served via the local preview server.

### Presentation rules

- Pages use the same token CSS as the live portfolio — they demonstrate the system working, not a simulation of it
- Both light and dark mode must work on every page (toggle via `data-theme` attribute)
- Both desktop and mobile density must work (toggle via `data-density` attribute)
- All component states must be represented and labelled
- The page structure mirrors the Figma style guide sheet: header with metadata, then component demos
- Spacing, typography, and layout all come from tokens — no hardcoded values

### Code standards

- All colour, spacing, radius, and typography values use `var(--token-name)` — no hardcoded hex or px
- Semantic HTML throughout (correct heading hierarchy, `<button>` not `<div>`, labelled form fields)
- Icons have `aria-hidden="true"` and `focusable="false"`
- Flex gaps use `gap`, not margins on children
- Checked with `/review-code` before marking complete

### What to avoid

- Hardcoded values anywhere in component CSS
- Component states that exist in Figma but aren't demonstrated in the HTML page
- Interactive states (hover, focus) that only work in the browser but aren't shown statically for reference
