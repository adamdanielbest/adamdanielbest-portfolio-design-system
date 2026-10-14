---
name: build-figma-guideline-page
description: Builds a guideline reference page in Figma for any approved design — component, organism, pattern, or layout. Use whenever the user says "build the guideline page", "create the guide sheet", "/build-figma-guideline-page", or when a design has been approved and needs a reference page on the Style Guide. The page shows all variants in a state×type matrix grid with full token binding, text styles, and kebab-case layer names.
---

# Make Component Sheet

Builds a complete Branding page guide sheet for an approved design system component — outer shell, header with metadata, section, content row, and a CSS Grid table of all variant combinations.

## Figma MCP rule
Always use `mcp__figma-console__figma_execute`. Never use `Figma:use_figma`, `mcp__figma__*`, or `mcp__1a3cf694__*` tools.

---

## Inputs

Ask for any that aren't provided:

| Input | Example |
|---|---|
| Component name | `Input`, `Select`, `Button` |
| Component set node ID | `2687:1994` |
| Target page | `Branding` (default) |
| One-line description | `Text field for capturing user input` |

---

## Step 1 — Analyse the component set

Read the component set to understand its variant structure:

```javascript
await figma.loadAllPagesAsync();
const set = figma.root.findOne(n => n.id === '{componentSetId}');
// Read componentPropertyDefinitions to get all property keys + values
const props = set.componentPropertyDefinitions;
// Each variant child: variant.name = "type=text, state=default"
const variants = set.children.map(v => v.name);
```

Determine the two axes:
- **Columns** → the `state` property (default, hover, focus, filled, disabled, error, open, pressed, etc.)
- **Rows** → the `type`, `size`, or `style` property (text, password, search; primary/small, etc.)

If there's only one property, use it as columns with a single row.

Count: **N** unique state values → N columns, **M** unique type/size values → M rows.

---

## Step 2 — Build the outer shell

```javascript
await figma.loadAllPagesAsync();
const allVars = await figma.variables.getLocalVariablesAsync();

// makePaint helper — always resolves the variable's actual color as base
const LIGHT = '2612:4', PRIM = '2612:2';
function resolveColor(v, depth = 0) {
  if (depth > 5) return { r: 1, g: 1, b: 1 };
  const val = v.valuesByMode[LIGHT] ?? v.valuesByMode[PRIM] ?? Object.values(v.valuesByMode)[0];
  if (!val) return { r: 1, g: 1, b: 1 };
  if (val.type === 'VARIABLE_ALIAS') {
    const ref = allVars.find(x => x.id === val.id);
    return ref ? resolveColor(ref, depth + 1) : { r: 1, g: 1, b: 1 };
  }
  return { r: val.r ?? 0, g: val.g ?? 0, b: val.b ?? 0 };
}
function makePaint(varId) {
  const v = allVars.find(x => x.id === varId);
  if (!v) return [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  return [{ type: 'SOLID', color: resolveColor(v), boundVariables: { color: { type: 'VARIABLE_ALIAS', id: varId } } }];
}

// Find target page
const page = figma.root.children.find(p => p.name === '{targetPage}');
await figma.setCurrentPageAsync(page);

// Outer frame
const sheet = figma.createFrame();
sheet.name = 'Component - {Category} - {Name}'; // e.g. "Component - Form - Input"
sheet.layoutMode = 'HORIZONTAL';
sheet.layoutSizingHorizontal = 'FIXED';
sheet.layoutSizingVertical   = 'FIXED';
sheet.resize(1440, 1024);
sheet.paddingTop    = 80; sheet.setBoundVariable('paddingTop',    allVars.find(v => v.id === 'VariableID:2632:48674')); // spacing/4xl
sheet.paddingBottom = 80; sheet.setBoundVariable('paddingBottom', allVars.find(v => v.id === 'VariableID:2632:48674')); // spacing/4xl
sheet.paddingLeft   = 32; sheet.setBoundVariable('paddingLeft',   allVars.find(v => v.id === 'VariableID:2612:3730'));  // spacing/lg
sheet.paddingRight  = 32; sheet.setBoundVariable('paddingRight',  allVars.find(v => v.id === 'VariableID:2612:3730'));  // spacing/lg
sheet.fills = makePaint('VariableID:2612:3611'); // background/page
page.appendChild(sheet);

// Container
const container = figma.createFrame();
container.name = 'container';
container.layoutMode = 'VERTICAL';
container.fills = [];
container.paddingTop = container.paddingBottom = container.paddingLeft = container.paddingRight = 0;
container.itemSpacing = 32;
sheet.appendChild(container);
container.layoutSizingHorizontal = 'FILL';
container.layoutSizingVertical   = 'FILL';
container.maxWidth = 1200;
container.setBoundVariable('itemSpacing', allVars.find(v => v.id === 'VariableID:2612:3730')); // spacing/lg (32px)
// Bind maxWidth — find the variable by inspecting an existing container if needed
```

---

## Step 3 — Build the Header

```javascript
// Header
const header = figma.createFrame();
header.name = 'Header';
header.layoutMode = 'VERTICAL';
header.fills = [];
header.itemSpacing = 16;
container.appendChild(header);
header.layoutSizingHorizontal = 'FIXED'; // stays 1200px wide
header.layoutSizingVertical   = 'HUG';
header.setBoundVariable('itemSpacing', allVars.find(v => v.id === 'VariableID:2612:3733')); // spacing/sm (16px)

// Toolbar
const toolbar = figma.createFrame();
toolbar.name = 'toolbar';
toolbar.layoutMode = 'VERTICAL';
toolbar.paddingBottom = 24;
toolbar.itemSpacing = 8;
toolbar.fills   = makePaint('VariableID:2612:3611'); // background/page
toolbar.strokes = makePaint('VariableID:2632:26129'); // border/divider
toolbar.strokeAlign = 'INSIDE';
toolbar.strokeTopWeight = toolbar.strokeLeftWeight = toolbar.strokeRightWeight = 0;
toolbar.strokeBottomWeight = 1;
header.appendChild(toolbar);
toolbar.layoutSizingHorizontal = 'FILL';
toolbar.layoutSizingVertical   = 'HUG';
toolbar.setBoundVariable('paddingBottom', allVars.find(v => v.id === 'VariableID:2612:3731')); // spacing/md (24px)
toolbar.setBoundVariable('itemSpacing',   allVars.find(v => v.id === 'VariableID:2612:3734')); // spacing/xs (8px)

// Page title text — set characters and fills BEFORE setTextStyleIdAsync (Eina04 workaround)
const pageTitle = figma.createText();
pageTitle.name = 'page-title';
pageTitle.characters = '{ComponentName}';
pageTitle.fills = makePaint('VariableID:2612:3619'); // text/primary
toolbar.appendChild(pageTitle);
pageTitle.layoutSizingHorizontal = 'FILL';
await pageTitle.setTextStyleIdAsync('S:2c403d9628ca87d7a7b1d8328f2bb71395370903,');

// Metadata frame
const meta = figma.createFrame();
meta.name = 'page-header__metadata';
meta.layoutMode = 'VERTICAL';
meta.fills = [];
meta.itemSpacing = 8;
header.appendChild(meta);
meta.layoutSizingHorizontal = 'HUG';
meta.layoutSizingVertical   = 'HUG';
meta.setBoundVariable('itemSpacing', allVars.find(v => v.id === 'VariableID:2612:3734')); // spacing/xs  (8px)

// 3 metadata text nodes — same Eina04 workaround: set characters + fills first
const bodyStyleId = 'S:10a9fa8d63d6b6bc6c60d27b4fa2b42bd9dc1bfa,';
const metaLines = [
  { name: 'breadcrumb',   text: 'adamdanielbest.com  ·  {Name}  ·  Light',                                           fillId: 'VariableID:2616:6612' },
  { name: 'metadata',     text: 'Eina04 · 4px base unit · v1.0 Stable · Updated {YYYY-MM-DD} · Contrast: WCAG 1.4.3 (AA) — verified', fillId: 'VariableID:2612:3628' },
  { name: 'description',  text: '{one-line component description}',                                                   fillId: 'VariableID:2612:3628' },
];
for (const line of metaLines) {
  const t = figma.createText();
  t.name = line.name;
  t.characters = line.text;
  t.fills = makePaint(line.fillId);
  meta.appendChild(t);
  t.layoutSizingHorizontal = 'HUG';
  await t.setTextStyleIdAsync(bodyStyleId);
}
```

---

## Step 4 — Build section + Content Row

```javascript
// Section
const section = figma.createFrame();
section.name = 'section';
section.layoutMode = 'VERTICAL';
section.fills = [];
section.itemSpacing = 96;
container.appendChild(section);
section.layoutSizingHorizontal = 'FILL';
section.layoutSizingVertical   = 'FILL';
section.setBoundVariable('itemSpacing', allVars.find(v => v.id === 'VariableID:2635:2852')); // spacing/2xl (48px)

// Content Row
const contentRow = figma.createFrame();
contentRow.name = 'content-row';
contentRow.layoutMode = 'HORIZONTAL';
contentRow.paddingTop = contentRow.paddingBottom = contentRow.paddingLeft = contentRow.paddingRight = 24;
contentRow.itemSpacing = 16;
contentRow.fills   = makePaint('VariableID:2612:3612'); // background/card
contentRow.strokes = makePaint('VariableID:2632:26129'); // border/divider (light) or VariableID:2612:3680 border/default for the card outline
contentRow.strokeAlign = 'INSIDE';
contentRow.strokeTopWeight = contentRow.strokeBottomWeight = contentRow.strokeLeftWeight = contentRow.strokeRightWeight = 1;
contentRow.cornerRadius = 16; // card corner radius — matches button sheet reference
contentRow.clipsContent = true; // clips grid corners to match card radius
section.appendChild(contentRow);
contentRow.layoutSizingHorizontal = 'FILL';
contentRow.layoutSizingVertical   = 'HUG';
const cpVar = allVars.find(v => v.id === 'VariableID:2612:3731'); // spacing/md (24px)
contentRow.setBoundVariable('paddingTop', cpVar); contentRow.setBoundVariable('paddingBottom', cpVar);
contentRow.setBoundVariable('paddingLeft', cpVar); contentRow.setBoundVariable('paddingRight', cpVar);
contentRow.setBoundVariable('itemSpacing', allVars.find(v => v.id === 'VariableID:2612:3734')); // spacing/xs (8px)
```

---

## Step 5 — Build the grid

```javascript
// Grid frame — kebab-case name e.g. "input-grid", "select-grid"
const grid = figma.createFrame();
grid.name = '{component-name}-grid';
grid.fills = [];

// IMPORTANT: set gridRowCount BEFORE gridRowSizes — API requires length match
grid.layoutMode     = 'GRID';
grid.gridColumnCount = N + 1; // N state cols + 1 label col
grid.gridRowCount    = M + 1; // M type rows + 1 header row

grid.gridColumnSizes = [
  { type: 'FIXED', value: 168 },                  // label column
  ...Array(N).fill({ type: 'FLEX', value: 1 }),   // state columns (equal width)
];
grid.gridRowSizes = [
  { type: 'FIXED', value: 40 },                   // header row
  ...Array(M).fill({ type: 'FIXED', value: 98 }), // variant rows
];
grid.gridRowGap    = 0;
grid.gridColumnGap = 0;
grid.cornerRadius = 0; // no grid radius — content-row cornerRadius+clipsContent handles visual rounding
grid.strokes = makePaint('VariableID:2632:26129'); // border/divider — all 4 sides form the outer table border
grid.strokeAlign = 'INSIDE';
grid.strokeTopWeight = grid.strokeBottomWeight = grid.strokeLeftWeight = grid.strokeRightWeight = 1;

contentRow.appendChild(grid);
grid.layoutSizingHorizontal = 'FILL';
grid.layoutSizingVertical   = 'FIXED';
```

---

## Step 6 — Populate cells

Append cells in reading order (left → right, top → bottom) — GRID auto-flow places them by DOM order.

```javascript
const tcVar  = allVars.find(v => v.id === 'VariableID:2612:3733'); // spacing/sm (16px)
const divVar = allVars.find(v => v.id === 'VariableID:2632:26129'); // border/divider

// Cells have different structure depending on row type:
// - Header row (row 0): HORIZONTAL, FILL×FILL, 0 vertical padding, fill=background/page
// - Label column (col 0, data rows): HORIZONTAL, FILL×FILL, 16px vertical padding, fill=background/card
// - Data cells (col 1+, data rows): HORIZONTAL, FILL×HUG, 16px padding all sides, fill=background/card
// Cell strokes: bottom+right only (grid outer border provides top+left)

const BG_PAGE_VAR = 'VariableID:2612:3611'; // background/page (light) — header row fill
const BG_CARD_VAR = 'VariableID:2612:3612'; // background/card (light) — data rows fill

function makeHeaderCell(name) {
  const cell = figma.createFrame();
  cell.name = name;
  cell.fills = makePaint(BG_PAGE_VAR);
  cell.strokes = makePaint('VariableID:2632:26129');
  cell.strokeAlign = 'INSIDE';
  cell.strokeTopWeight = cell.strokeLeftWeight = 0;
  cell.strokeBottomWeight = cell.strokeRightWeight = 1;
  cell.paddingTop = 0; cell.paddingBottom = 0;
  cell.paddingLeft = 16; cell.paddingRight = 16;
  cell.layoutMode = 'HORIZONTAL';
  cell.primaryAxisAlignItems = 'MIN';
  cell.counterAxisAlignItems = 'CENTER';
  grid.appendChild(cell);
  cell.layoutSizingHorizontal = 'FILL';
  cell.layoutSizingVertical   = 'FILL';
  return cell;
}

function makeLabelCell(name) {
  const cell = figma.createFrame();
  cell.name = name;
  cell.fills = makePaint(BG_CARD_VAR);
  cell.strokes = makePaint('VariableID:2632:26129');
  cell.strokeAlign = 'INSIDE';
  cell.strokeTopWeight = cell.strokeLeftWeight = 0;
  cell.strokeBottomWeight = cell.strokeRightWeight = 1;
  cell.paddingTop = 16; cell.paddingBottom = 16;
  cell.paddingLeft = 16; cell.paddingRight = 16;
  cell.layoutMode = 'HORIZONTAL';
  cell.primaryAxisAlignItems = 'MIN';
  cell.counterAxisAlignItems = 'CENTER';
  grid.appendChild(cell);
  cell.layoutSizingHorizontal = 'FILL';
  cell.layoutSizingVertical   = 'FILL'; // FILL so it stretches to match tallest data cell in row
  return cell;
}

function makeDataCell(name) {
  const cell = figma.createFrame();
  cell.name = name;
  cell.fills = makePaint(BG_CARD_VAR);
  cell.strokes = makePaint('VariableID:2632:26129');
  cell.strokeAlign = 'INSIDE';
  cell.strokeTopWeight = cell.strokeLeftWeight = 0;
  cell.strokeBottomWeight = cell.strokeRightWeight = 1;
  cell.paddingTop = 16; cell.paddingBottom = 16;
  cell.paddingLeft = 16; cell.paddingRight = 16;
  cell.layoutMode = 'HORIZONTAL';
  cell.primaryAxisAlignItems = 'MIN';
  cell.counterAxisAlignItems = 'CENTER';
  grid.appendChild(cell);
  cell.layoutSizingHorizontal = 'FILL';
  cell.layoutSizingVertical   = 'HUG'; // HUG — drives row height from component's natural size
  return cell;
}

async function addLabel(cell, text, fillVarId) {
  const t = figma.createText();
  t.name = 'label';
  t.characters = text;
  t.fills = makePaint(fillVarId ?? 'VariableID:2612:3619'); // text/primary
  cell.appendChild(t);
  t.layoutSizingHorizontal = 'HUG';
  await t.setTextStyleIdAsync(bodyStyleId);
}

// Row 0 — corner + state headers
const corner = makeHeaderCell('corner');
corner.strokes = []; // no stroke on corner — grid outer border covers it
for (const state of states) {
  const cell = makeHeaderCell(`header-${state}`);
  await addLabel(cell, capitalize(state));
}

// Rows 1–M — type label + component instances
for (const type of types) {
  const labelCell = makeLabelCell(`label-${type}`);
  await addLabel(labelCell, capitalize(type));

  for (const state of states) {
    const cell = makeDataCell(`{component}-cell-${type}-${state}`);
    const instance = componentSet.defaultVariant.createInstance();
    instance.setProperties({ type, state }); // use actual property keys from Step 1
    cell.appendChild(instance);
    instance.layoutSizingHorizontal = 'FILL';
    instance.layoutSizingVertical   = 'HUG';
  }
}
```

---

## Step 6b — Dark sheet: remap instance tokens

**Run this step only when building a dark sheet** (sheet name contains `dark`).

Component instances are created from the master component, which uses `02 Color/Light` variables. On a dark sheet they will render in light mode unless their fills and strokes are explicitly overridden with `02 Color/Dark` equivalents. This step does that remapping.

Build with dark token IDs from the start (use the dark token reference table below for `BG_PAGE_VAR`, `BG_CARD_VAR`, `border/divider`, `text/primary`, `text/accent`). Then after all cells are populated, remap the instance nodes inside every `cell-*` cell:

```javascript
// Dark token remap — run after all cells are populated
const colls = await figma.variables.getLocalVariableCollectionsAsync();
const lightColl = colls.find(c => c.name === '02 Color/Light');
const darkColl  = colls.find(c => c.name === '02 Color/Dark');
const lightVars = allVars.filter(v => v.variableCollectionId === lightColl.id);
const darkVars  = allVars.filter(v => v.variableCollectionId === darkColl.id);

// Map light ID → dark ID by matching token name
const lightToDark = {};
for (const lv of lightVars) {
  const dv = darkVars.find(d => d.name === lv.name);
  if (dv) lightToDark[lv.id] = dv.id;
}

const DARK_MODE = '2612:5', PRIM_MODE = '2612:2';
function resolveDarkColor(varId, depth = 0) {
  if (depth > 6) return { r: 0, g: 0, b: 0 };
  const v = allVars.find(x => x.id === varId);
  if (!v) return { r: 0, g: 0, b: 0 };
  const val = v.valuesByMode[DARK_MODE] ?? v.valuesByMode[PRIM_MODE] ?? Object.values(v.valuesByMode)[0];
  if (!val) return { r: 0, g: 0, b: 0 };
  if (val.type === 'VARIABLE_ALIAS') return resolveDarkColor(val.id, depth + 1);
  return { r: val.r ?? 0, g: val.g ?? 0, b: val.b ?? 0 };
}

function remapPaint(p) {
  if (p.type === 'SOLID' && p.boundVariables?.color) {
    const darkId = lightToDark[p.boundVariables.color.id];
    if (darkId) return {
      type: 'SOLID', color: resolveDarkColor(darkId),
      opacity: p.opacity ?? 1, visible: p.visible ?? true, blendMode: p.blendMode ?? 'NORMAL',
      boundVariables: { color: { type: 'VARIABLE_ALIAS', id: darkId } }
    };
  }
  return null;
}

function remapNode(node) {
  try {
    if (node.fills?.length) {
      const nf = node.fills.map(f => remapPaint(f) ?? f);
      if (nf.some((f, i) => f !== node.fills[i])) node.fills = nf;
    }
    if (node.strokes?.length) {
      const ns = node.strokes.map(s => remapPaint(s) ?? s);
      if (ns.some((s, i) => s !== node.strokes[i])) node.strokes = ns;
    }
  } catch (_) { /* instance override constraints — skip */ }
  if (node.children) for (const c of node.children) remapNode(c);
}

// Remap the entire grid — every node on a dark sheet must use dark collection tokens
remapNode(grid);
```

---

## Step 7 — Screenshot and verify

```javascript
// Resize sheet height to fit content
sheet.layoutSizingVertical = 'HUG';
// Then fix it back so it doesn't grow unexpectedly
sheet.layoutSizingVertical = 'FIXED';
```

Take a screenshot with `figma_capture_screenshot` on the sheet node ID. Verify:
- Title, breadcrumb, and metadata render in the header
- Grid matrix shows all N×M variants with correct state and type labels
- No black borders (strokes should render as light neutral gray)
- White card background on the content row

If anything looks wrong, read the node tree and fix before reporting done.

---

## Token reference

### Spacing (02 Dimensions/Desktop)

| Token | Variable ID | Value |
|---|---|---|
| `spacing/3xs` | VariableID:2633:53042 | 2px   |
| `spacing/2xs` | VariableID:2617:708   | 4px   |
| `spacing/xs`  | VariableID:2612:3734  | 8px   |
| `spacing/sm`  | VariableID:2612:3733  | 16px  |
| `spacing/md`  | VariableID:2612:3731  | 24px  |
| `spacing/lg`  | VariableID:2612:3730  | 32px  |
| `spacing/xl`  | VariableID:2694:81    | 40px  |
| `spacing/2xl` | VariableID:2635:2852  | 48px  |
| `spacing/3xl` | VariableID:3053:14945 | 64px  |
| `spacing/4xl` | VariableID:2632:48674 | 80px  |
| `spacing/5xl` | VariableID:3053:14946 | 96px  |
| `spacing/6xl` | VariableID:3053:14947 | 120px |

**Common layout uses:**
- Sheet padding top/bottom → `spacing/4xl` (80px)
- Sheet padding left/right → `spacing/lg` (32px)
- Container item spacing → `spacing/lg` (32px)
- Header item spacing → `spacing/sm` (16px)
- Toolbar padding bottom / card padding → `spacing/md` (24px)
- Toolbar / metadata / cell item spacing → `spacing/xs` (8px)
- Section gap → `spacing/2xl` (48px)
- Table cell padding → `spacing/sm` (16px)

### Colour

| Token | Variable ID |
|---|---|
| `background/page`  | VariableID:2612:3611 |
| `background/card`  | VariableID:2612:3612 |
| `border/divider`   | VariableID:2632:26129 |
| `text/primary`     | VariableID:2612:3619 |
| `text/accent`      | VariableID:2616:6612 |
| `text/secondary`   | VariableID:2612:3628 |

Light collection modeId: `2612:4` | Dark collection modeId: `2612:5` | Primitives modeId: `2612:2`

### Dark sheet tokens (use instead of light equivalents above)

| Token | Variable ID |
|---|---|
| `background/page` (dark)  | VariableID:2612:3653 |
| `background/card` (dark)  | VariableID:2612:3654 |
| `border/divider` (dark)   | VariableID:2632:26130 |
| `text/primary` (dark)     | VariableID:2612:3669 |
| `text/accent` (dark)      | VariableID:2616:6613 |
| `text/secondary` (dark)   | VariableID:2612:3678 |

## Text styles

| Use | Style ID |
|---|---|
| Page title | `S:2c403d9628ca87d7a7b1d8328f2bb71395370903,` |
| Body / labels / metadata | `S:10a9fa8d63d6b6bc6c60d27b4fa2b42bd9dc1bfa,` |

---

## Rules

1. **Tokens everywhere** — fills, strokes, spacing must be variable-bound. No hardcoded hex or px values.
2. **Text styles on every text node** — always `await node.setTextStyleIdAsync(id)`. Never set `fontSize`, `fontName`, or `lineHeight` manually.
3. **Kebab-case layer names** — lowercase with hyphens throughout. No spaces, no Title Case, no Figma defaults (`Frame 1`, `Text`, etc.).
4. **Grid for tables** — rows × columns organisms always use `layoutMode: 'GRID'`, never absolute positioning.
5. **makePaint for all paints** — always resolve variable color via `resolveColor()` before constructing the paint object. Never leave `{r:0,g:0,b:0}` as the base color on a bound stroke — it renders black when the variable fails to resolve.
6. **Set gridRowCount before gridRowSizes** — Figma's API requires the array length to match the count; set the count first or you'll get an error.
7. **FIXED outer frame at 1440px** — the sheet's `layoutSizingHorizontal` must stay `'FIXED'`. If it's `'HUG'` the frame expands past 1440px.
8. **Eina04 font workaround** — `loadFontAsync` fails on this custom uploaded font. Set `characters` and `fills` before calling `setTextStyleIdAsync`; the style application will handle font loading internally.
