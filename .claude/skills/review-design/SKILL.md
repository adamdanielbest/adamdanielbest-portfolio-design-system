---
name: review-design
description: Reviews a Figma frame against design system standards. Use whenever the user asks to review, audit, check, or QA a Figma frame, component, or page for token binding, text styles, auto layout, naming conventions, or design parity. Trigger on phrases like "review the design", "audit the Figma", "check the frame", "QA this component", "is this following standards".
---

# Review Design

Audits the currently selected Figma frame (or a specified node ID) against the design system standards for this project.

## Figma MCP rule
Always use `mcp__figma-console__*` tools. Never use `Figma:use_figma` or `Figma:get_design_context`.

## What to audit

Run `figma_execute` to walk the node tree and check the following. Report each finding as a pass ✅, warning ⚠️, or fail ❌.

### 1. Token binding — fills & strokes
Every fill and stroke colour must be bound to a variable (not a hard-coded hex). Check `node.fills` and `node.strokes` — each paint object should have `boundVariables.color` set.

Fail if any SOLID fill or stroke is unbound. Ignore IMAGE and GRADIENT fills (they can't be variable-bound).

### 2. Text styles
Every text node should have a `textStyleId` applied. A node with manually set `fontSize`, `fontWeight`, or `lineHeight` but no style applied is a fail.

### 3. Auto layout
Frames containing child elements should use auto layout (`layoutMode !== 'NONE'`) rather than manually positioned children. Manual position is only acceptable for canvas-level frames (the outermost artboard).

Check: does the frame use `layoutMode: 'HORIZONTAL'` or `'VERTICAL'`? Are `paddingTop/Bottom/Left/Right` and `itemSpacing` bound to spacing tokens via `boundVariables`?

### 4. Sizing — no fixed px widths on flex children
Children inside auto-layout frames should use `layoutSizingHorizontal: 'FILL'` or `'HUG'`, not `'FIXED'` with a hardcoded pixel value. Flag any child with `FIXED` sizing inside an auto-layout parent.

### 5. Naming conventions
- Frames and groups: `kebab-case` or `Title Case` (no "Frame 1", "Group 3", "Rectangle 5")
- Components: `PascalCase` for the component set name, `variant=value` for properties
- Layers with default Figma names are a warning

### 6. Spacing token binding
`paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`, `itemSpacing` on frames should each be bound to a variable in `boundVariables`.

## How to run the audit

```javascript
// Run via figma_execute — walks from current selection or page root
async function auditNode(node, depth = 0) {
  const issues = [];

  // Fills
  if (node.fills) {
    for (const f of node.fills) {
      if (f.type === 'SOLID' && !f.boundVariables?.color) {
        const c = f.color;
        issues.push({ node: node.name, type: 'unbound-fill', detail: `rgb(${Math.round(c.r*255)},${Math.round(c.g*255)},${Math.round(c.b*255)})` });
      }
    }
  }

  // Strokes
  if (node.strokes) {
    for (const s of node.strokes) {
      if (s.type === 'SOLID' && !s.boundVariables?.color) {
        issues.push({ node: node.name, type: 'unbound-stroke' });
      }
    }
  }

  // Text style
  if (node.type === 'TEXT' && !node.textStyleId) {
    issues.push({ node: node.name, type: 'missing-text-style' });
  }

  // Auto layout (skip outermost frame)
  if (node.type === 'FRAME' && depth > 0 && node.layoutMode === 'NONE' && node.children?.length > 1) {
    issues.push({ node: node.name, type: 'no-auto-layout' });
  }

  // Default naming
  if (/^(Frame|Group|Rectangle|Ellipse|Vector|Text|Component)\s+\d+$/.test(node.name)) {
    issues.push({ node: node.name, type: 'default-name' });
  }

  // Recurse
  if (node.children) {
    for (const child of node.children) {
      issues.push(...await auditNode(child, depth + 1));
    }
  }

  return issues;
}

const selection = figma.currentPage.selection;
const root = selection.length > 0 ? selection[0] : figma.currentPage;
const issues = await auditNode(root);
return { frameName: root.name, total: issues.length, issues };
```

## Reporting format

```
## Design review — [Frame name]

### Token binding
✅ All fills bound to variables  (or)
❌ 3 unbound fills:
   - Button/Label: rgb(30,30,30)
   - Card/Border: rgb(200,200,200)

### Text styles
✅ All text nodes have styles applied  (or)
⚠️ 2 text nodes missing styles:
   - Caption text
   - Meta line

### Auto layout
✅ All frames use auto layout

### Naming
⚠️ 1 default name found:
   - Frame 47

---
Total issues: 5 (2 ❌ fails, 3 ⚠️ warnings)
```

If there are zero issues: "Frame passes all checks ✅"

## After reporting

If there are fails, ask: "Would you like me to fix these automatically?"

Key fixes for this project:
- **Unbound fills**: embed `boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } }` inside the paint object — do NOT use `node.setBoundVariable('fills', ...)`
- **Missing text styles**: use `await node.setTextStyleIdAsync(id)` — do NOT use the `textStyleId` setter
- **layoutSizingHorizontal FILL**: must be set AFTER appending the node to its parent
