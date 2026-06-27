---
name: review-code
description: Reviews component HTML/CSS against design system standards for this project. Use whenever the user asks to review, audit, check, or QA a component's code — token references, semantic HTML, responsive behaviour, font rules, design parity. Trigger on phrases like "review the code", "audit the component", "check the HTML", "does this follow standards", "QA the CSS".
---

# Review Code

Audits a component's HTML and CSS against the design system coding standards for this project.

## Repo root
`/Users/adamdanielbest/Documents/adamdanielbest-portfolio-design-system`

If a specific component is named, audit that component's directory. Otherwise ask which component to review.

---

## Checks

### 1. Token references — no hard-coded values

Every colour, spacing, radius, and typography value in CSS must use `var(--token-name)`. Hard-coded values are only acceptable for:
- `0` (unitless zero)
- `1` (e.g. `line-height: 1`)
- `999px` for pill radius
- `2px` for the page-header divider border
- `12px` for `code` font-size (set once in sheet.css)

```bash
grep -n '[^-]\b[0-9]\+px\b\|#[0-9a-fA-F]\{3,6\}\|rgb(' <component-dir>/*.css
```

### 2. Token resolution — all var() references exist

```bash
cd /Users/adamdanielbest/Documents/adamdanielbest-portfolio-design-system
python3 scripts/check-token-refs.py
```

List any unresolved references.

### 3. Font rules

Named font files have weight baked in — the filename IS the weight:
- `var(--type-family-bold)` or `var(--type-family-semibold)` → must pair with `font-weight: 400`
- Never use `font-weight: 600` or `700` alongside a named font-family token
- `var(--type-family-primary)` can use font-weight tokens normally

```bash
grep -n 'type-family-bold\|type-family-semibold' <component-dir>/*.css
```
Flag any that aren't paired with `font-weight: 400`.

### 4. Semantic HTML

Check the component's HTML for:
- Headings in correct order (no skipping h1 → h3)
- Buttons use `<button type="button">` (not `<div>` or `<a>`)
- Icons have `aria-hidden="true"` and `focusable="false"` on the `<svg>`
- Lists use `<ul>`/`<ol>` + `<li>`, not `<div>` stacks
- Form fields have associated `<label>` elements

### 5. Responsive behaviour

- Spacing uses `var(--spacing-*)` tokens with mobile overrides in `tokens-mobile.css`
- No `@media` with hard-coded breakpoints other than `max-width: 767px`
- No fixed pixel widths that break at 390px
- `overflow-x: auto` or `white-space: nowrap` where horizontal overflow is possible on mobile

### 6. Page-header structure (if applicable)

Verify it matches the boilerplate:

```html
<header class="page-header">
  <h1>[title]</h1>
  <hr class="page-header__divider">
  <div class="page-header__metadata">
    <p class="breadcrumb">...</p>
    <p class="meta">...</p>
    <p class="usage">...</p>
  </div>
</header>
```

`page-header__metadata` wrapper is required. Breadcrumb/meta/usage as direct children of `.page-header` is wrong.

### 7. Flex gap pattern

Spacing between flex siblings should use `gap`, not `margin-top`/`margin-bottom` on children. Established exceptions (don't flag these):
- `margin-bottom` on `.demo-section`
- `margin-bottom` on `.page-header`

---

## Reporting format

```
## Code review — [component-name]

### Token references
✅ No hard-coded values  (or)
❌ 2 hard-coded values:
   - button.css:34  padding: 12px 24px
   - button.css:67  color: #333

### Token resolution
✅ All var() references resolve

### Font rules
✅ Named fonts paired with font-weight: 400

### Semantic HTML
⚠️ 1 issue:
   - Icon SVG missing aria-hidden="true" (line 45)

### Responsive
✅ Passes mobile checks

### Page-header structure
✅ Correct

### Flex gap
✅ Gap used correctly

---
Total: 3 issues (1 ❌, 2 ⚠️)
```

Zero issues → "Component passes all checks ✅"

## After reporting

Ask: "Would you like me to fix these?" Token-reference and font-weight issues can be fixed automatically. Semantic HTML issues may need discussion first.
