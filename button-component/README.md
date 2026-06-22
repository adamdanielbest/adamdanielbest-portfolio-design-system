# Button component

A plain HTML/CSS/JS Button, built directly from the live Figma master component (`COMPONENT_SET 2624:6375`), with every visual value sourced from the real token export rather than approximated from memory or screenshots.

## How it's wired

`button.css` contains zero hardcoded colours. Every colour, shadow and radius value is a CSS custom property — generated from `tokens.tokens.json` by `generate-tokens-css.py` into:

- `src/styles/generated/tokens-primitives.css`
- `src/styles/generated/tokens-light.css` / `tokens-dark.css`
- `src/styles/generated/tokens-desktop.css` / `tokens-mobile.css`

Dark mode and mobile density are activated by setting `data-theme="dark"` / `data-density="mobile"` on `<html>` — see the toggle buttons in `button.html` for a working example. This means the light/dark toggle and the desktop/mobile switch in the demo page are real — they swap actual CSS variable values, not a staged screenshot.

Regenerate the CSS after any token change in Figma:

```
python3 generate-tokens-css.py
```

## Coverage

Full matrix verified against the live Figma component before writing any CSS — 4 variants × 3 sizes × 5 states (60 combinations):

- **Variants:** Primary, Secondary, Ghost, Destructive
- **Sizes:** Small (32px), Medium (40px), Large (48px)
- **States:** Default, Hover, Pressed, Focus, Disabled

Per-size font-size/letter-spacing pairs (13px/0.5, 14px/0.75, 16px/1) and the fixed heights are bespoke overrides on the source component, not aliased to a shared type token — confirmed by inspecting bound variables on the live node, so they're hardcoded here deliberately rather than left out.

## Known simplification

Pressed state drops the resting 1px bottom shadow (matches the source component exactly — confirmed per-variant, not an oversight). Focus state stacks the resting shadow with a two-layer ring (`border-focus` + `background-page`) to reproduce the offset/gap look Figma achieves with two drop shadows.
