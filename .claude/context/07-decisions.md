# Decisions

Key decisions made during this project and why. Extracted from `docs/progress.md` and session history.

---

## Analytics and tracking stack

**Date:** Sep 2026

Three tools, no more:

- **Google Analytics 4** — sessions, page views, geography, device split, case study engagement. Free.
- **Microsoft Clarity** — session recordings and heatmaps. Shows whether people scroll to outcome sections, how the sidebar layout performs. Free.
- **GA4 contact form submission event** — custom event trigger on form submit so conversions are tracked. GA4 doesn't capture this by default.

Setup deferred until the site has a live URL (GA4 and Clarity need it to verify the tracking snippet).

**Cookie consent decision pending** — UK GDPR may require a consent banner for Clarity session recordings. Options: add a lightweight consent banner, or configure GA4 in cookieless/consent mode and skip Clarity until needed.

---

## Portfolio structure decisions

**Date:** Sep 2026

- **4 case studies max** — down from 12. Curated selection over comprehensive archive.
- **Case study order:** design system first (recency + differentiator), giffgaff second (strategic depth + outcome), one more product case study (small-team credibility), Burberry/Harrods optional.
- **Career timeline** carries historical brand names (Burberry, Harrods) without requiring old case studies to hold up to current scrutiny.
- **No filters** — at 4–5 projects, filters signal volume over curation. Order is the editorial statement.
- **Navigation exploration:** wireframing 3 approaches — fixed sidebar, top nav with full-bleed cards, and a third option. Fixed sidebar (bio + timeline always visible, case studies scrolling in main panel) is the leading idea.
- **Hosting:** moving from IONOS to Netlify (free tier, custom domain, CI/CD from GitHub repo). IONOS hosting cost eliminated.

---

## Figma MCP: switch to Desktop Bridge

**Date:** 30 Jun 2026

Official Figma MCP (`mcp.figma.com`) hit Starter plan rate limit mid-build during the Input component set construction. Switched permanently to `figma-console` (southleft Desktop Bridge — local WebSocket, no rate limits).

Rule: always use `mcp__figma-console__*` tools. `mcp__figma__*` and `Figma:use_figma` are prohibited.

---

## Light and dark as separate collections, not modes

**Date:** 10 Jul 2026

The token system uses `02 Color/Light` and `02 Color/Dark` as two distinct Figma variable collections rather than one collection with light/dark modes. This means:

- No single-mode-switch in Figma — dark sheets require explicit fill/stroke remapping per node
- CSS layer serves separate files (`tokens-light.css`, `tokens-dark.css`) loaded conditionally
- Component instances default to light collection; dark sheets need the `lightToDark` name-matched remap applied

This was not a deliberate upfront choice — it emerged from how the collections were originally set up. Restructuring would require rebuilding all component instance overrides; deferred.

---

## GRID layout for variant matrices (FIXED cell sizing)

**Date:** 10 Jul 2026

Variant matrix grids use Figma's `layoutMode: 'GRID'`. `FILL` and `HUG` cell sizing behave differently to auto-layout — `FILL` cells collapse to minimum height (~14px), `HUG` cells only work if content exactly matches row height.

Decision: all cells use `FIXED` sizing with explicit pixel heights. This is the only reliable approach in Figma's GRID implementation. `FILL`/`HUG` is rejected as an option for matrix cells.

---

## Label column width: 96px

**Date:** Sep 2026 (corrected during style guide work)

Initially set at 168px, corrected to 96px to match the space required for the label text without waste. Both input and select grids now use 96px FIXED for the label column, with remaining columns as equal-width FLEX. Consistent across all component sheets.

---

## Dark sheet token remap pattern

**Date:** 10 Jul 2026 (formalised)

When a dark component sheet has fills/strokes bound to `02 Color/Light` variables, the fix is a name-matched `lightToDark` map: iterate all local variables, build a map of `lightVar.id → darkVar.id` keyed by matching `variable.name`, then walk the node tree and rebind paints.

This approach is preferred over manually reassigning token by token. The `remapNode()` function is the canonical implementation, documented in the `/review-design` skill.

---

## Checkbox icon colour: text/primary instead of background/action-primary

**Date:** 23 Sep 2026

The selected-state checkmark was originally `--background-action-primary` (cobalt blue). Changed to `--text-primary`. Reason: the blue read as an accent colour rather than a confirmation state, and `--text-primary` adapts automatically across light and dark without additional overrides.

---

## Global focus ring via :focus-visible

**Date:** 23 Sep 2026

Applied a consistent focus ring to all focusable elements in `sheet.css` via `:focus-visible`. Uses `color-mix(in srgb, var(--border-focus) 20%, transparent)` for the soft outer halo and `0 0 0 1.5px var(--border-focus)` for the inner ring. Browser default outline suppressed.

The open-state select has a matching box-shadow applied via higher-specificity rule (`.select--open .select__field`) — visually identical, no conflict.

---

## Dark prototype support deferred

**Date:** 23 Sep 2026

Dark mode in Figma prototype preview doesn't work for the select component. Root cause: Figma's prototype player renders component fills directly from the master component's collection — instance-level overrides are ignored. The open-state component (`2695:1536`) has all fills bound to `02 Color/Light`, which has no dark mode.

Options explored:
- NAVIGATE to dark frame — rejected: navigate destinations must be top-level frames on the same page; nested frames in auto-layout containers are not valid targets
- Add dark variants to the component set — the correct fix, ~30–45 min effort, deferred

For now: prototype reactions removed from the dark demo instance. Prototype preview doesn't reflect dark mode until dark component variants are built.

---

## Open state border: visual weight from colour, not width

**Date:** 23 Sep 2026

The open state select border appears heavier than other states but is still 1px. The apparent weight comes from the colour shift (`--border-default` neutral grey → `--border-focus` cobalt) plus a 3px outer halo box-shadow sitting outside the element. Deliberate visual hierarchy — no border-width change needed.

---

## text-box-trim: explicit element list, not * selector

**Date:** 27 Jun 2026

`text-box-trim: trim-both; text-box-edge: cap alphabetic` applied for tight typographic spacing. The `*` selector does not cascade `text-box-trim` reliably in Chrome. Must use an explicit element list: `h1–h6, p, span, a, li, code, th, td`, etc. Applied globally in `sheet.css`.

---

## Skills as globally installed, project-agnostic tools

**Date:** 27 Jun 2026

All workflow skills installed at `~/.claude/skills/` rather than per-project. Each skill reads config from `.claude/design-system.json` at runtime. This makes the same skills reusable across multiple projects (this design system, the metadata app, etc.) without duplication.

---

## Eina04 font loading workaround

**Date:** 30 Jun 2026

`figma.loadFontAsync()` fails for uploaded custom fonts (Eina04). The workaround: set `node.characters` and `node.fills` before calling `await node.setTextStyleIdAsync(id)`. Style application handles font loading internally.

This is the established pattern for all text node creation in Figma scripts. `loadFontAsync` is not used for Eina04.
