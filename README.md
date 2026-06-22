# Design Tokens — adamdanielbest.com

Design tokens exported from the Figma source of truth for [adamdanielbest.com](https://adamdanielbest.com), Adam Daniel Best's product design portfolio.

## What's in here

- `src/styles/tokens/tokens.tokens.json` — the canonical token export, in [DTCG](https://design-tokens.github.io/community-group/format/) format, generated directly from Figma Variables via the Figma Plugin API.
- `tokens.config.json` — config consumed by the export tooling (source/output directories, generation format).

## Collections

| Collection | Modes | Token count |
|---|---|---|
| `01-primitives` | Value | 106 |
| `02-color-light` | Light | 61 |
| `02-color-dark` | Dark | 61 |
| `02-dimensions-desktop` | Desktop | 63 |
| `02-dimensions-mobile` | Mobile | 63 |

Primitives are raw scale values (colour ramps, spacing scale). The Light/Dark and Desktop/Mobile collections are semantic tokens that alias primitives — no raw hex or pixel values at the semantic layer.

## Provenance

Exported 22 June 2026, immediately after a full four-part design system audit (hardcoded-value sweep, naming consistency, WCAG AA contrast, component structural review) — see the [design system case study](https://adamdanielbest.com) for the full process writeup.

## Status

Tokens only, for now. A first coded component consuming these tokens (e.g. Button) is a planned next step, not yet in this repo.
