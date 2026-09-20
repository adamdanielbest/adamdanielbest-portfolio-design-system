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

## Components

Coded, token-driven component pages sit alongside the tokens, each with its own README covering coverage and known simplifications against the Figma source.

| Component | Status |
|---|---|
| Button | Built |
| Layout | Built |
| Select | In progress (not yet committed) |
| Input | Not started |

## Status

Tokens plus two coded components in this repo so far — Button and Layout, both fully token-driven with no hardcoded values. Select is built locally but not yet committed; Input hasn't been started.
