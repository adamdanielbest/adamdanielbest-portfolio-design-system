# Design System — adamdanielbest.com

Design tokens and coded components for [adamdanielbest.com](https://adamdanielbest.com), Adam Daniel Best's product design portfolio. Token source of truth is Figma; everything in this repo is generated or derived from it.

## What's in here

- `src/styles/tokens/tokens.tokens.json` — canonical token export in [DTCG](https://design-tokens.github.io/community-group/format/) format, generated from Figma Variables via the Figma Plugin API
- `src/styles/bundle.css` — compiled stylesheet: token custom properties + all component styles
- `src/icons/sprite.svg` — SVG sprite, exported from the Figma icon set
- `*-component/` — one directory per component, each with CSS and an HTML preview page
- `stories/` — Storybook story files and shared render functions

## Token collections

440 tokens across 5 collections. Primitives are raw scale values; the semantic layers alias primitives only — no raw hex or pixel values at the semantic layer.

| Collection | Modes | Tokens |
|---|---|---|
| `01-primitives` | Value | 104 |
| `02-color-light` | Light | 78 |
| `02-color-dark` | Dark | 78 |
| `02-dimensions-desktop` | Desktop | 90 |
| `02-dimensions-mobile` | Mobile | 90 |

## Components

23 component directories, all token-driven with no hardcoded values. Storybook stories cover 20 components (some have multiple story files for variant groups).

| Component | Directory | Stories |
|---|---|---|
| ActionChip | ✓ | ✓ |
| Button | ✓ | ✓ |
| Card | ✓ | ✓ |
| CardItem | ✓ | ✓ |
| CaseStudyHero | ✓ | ✓ |
| CaseStudySummary | ✓ | ✓ |
| Checkbox | ✓ | ✓ |
| ContentSection | ✓ | ✓ |
| Header | ✓ | ✓ |
| Icon | ✓ | — |
| Input | ✓ | ✓ |
| Layout | ✓ | — |
| MediaBlock | ✓ | ✓ |
| NavLink | ✓ | ✓ |
| PageNav | ✓ | ✓ |
| Radio | ✓ | ✓ |
| Select | ✓ | ✓ |
| Sidebar | ✓ | ✓ |
| Table | ✓ | — |
| TextLink | ✓ | ✓ |
| Timeline | ✓ | ✓ |
| Toggle | ✓ | ✓ |

## Provenance

Tokens last exported October 2026 as part of ongoing portfolio build. The full design-to-code pipeline — Figma → token export → CSS generation → Storybook → GitHub Pages — is documented in the [Figma to code case study](https://adamdanielbest.com/case-studies/figma-to-code).
