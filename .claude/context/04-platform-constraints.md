# Platform Constraints

The design system must satisfy these constraints to build the portfolio. Where a constraint is already implemented in the current token structure, it is noted.

## Platform

The portfolio is a responsive web product. There are no native apps.

- **Web (desktop)** — Primary. Most hiring managers and design leads browse on MacBook or external monitor.
- **Web (mobile)** — Secondary. Recruiters and founders often check on iPhone, frequently in the evening. Must be clean, fully navigable, and comfortable to read — not just technically responsive.

## Desktop-First Design

The primary audience (Marcus, Priya, Yemi) is on desktop. This is where deeper reading happens and where design decisions will be most scrutinised.

Design implications:
- Layouts are designed for desktop first and adapted down to mobile
- Generous whitespace is a feature, not a problem to solve
- Hover states are valid and expected on desktop
- Reading comfort matters: line length, line height, and type size should be tuned for sustained reading
- Mouse/trackpad interaction assumed on desktop; touch on mobile

Mobile is not an afterthought. The long-form case study reading experience on mobile must be genuinely good — larger type, generous line height, and well-paced paragraph spacing are required, not optional.

## Screen Sizes

### Mobile
- **Minimum supported:** 375px (iPhone SE, standard Android)
- **Standard:** 390–430px (iPhone 14/15 range)

### Tablet
- **Standard:** 768–1024px (iPad, small windows)
- Treated as a transitional breakpoint — layout adapts but is not a primary design target

### Desktop
- **Compact:** 1024–1280px (MacBook 13"/14")
- **Standard:** 1280–1440px (MacBook 16", external monitors)
- **Wide:** 1440px+ — content width caps, never stretches infinitely

**Max content width:** 1200px, centred. Case study body copy caps narrower (see Typography).

## Spacing System

Use a 4px base unit. All spacing values must be multiples of 4. Currently implemented in the `02 Dimensions` token collection.

| Token name | Value | Use |
|---|---|---|
| spacing/inline-gap | 8px | Tight gaps within compact components |
| spacing/stack-gap | 16px | Between stacked items |
| spacing/content-gap | 32px | Between related content groups |
| spacing/section-gap | 96px | Between major sections on desktop |
| spacing/page-margin-x | 32px | Outer horizontal page margin |
| spacing/page-margin-y | 80px | Outer vertical page margin (desktop) |
| spacing/card-padding | 24px | Card internal padding |
| spacing/input-padding | 8px | Input field padding |
| spacing/input-height | 40px | Input field height (desktop) |

## Grid

### Mobile
- Margins: 20px left and right
- Single-column layout
- Full-width content blocks minus margins

### Tablet
- Margins: 32px
- Single or 2-column layout depending on content type

### Desktop
- Max content width: 1200px, centred on viewport
- Outer margins: 32px (token: `spacing/page-margin-x`)
- 12-column grid, 24px gutters
- Case study pages: single main column, max 720px wide for body copy (reading column)
- Homepage and project grid: 2–3 column layouts within the 12-column system

## Typography Constraints

Case study pages contain long-form content. Reading comfort is as important as visual hierarchy — on both desktop and mobile.

### Desktop
- **Minimum body text:** 16px
- **Minimum secondary/caption text:** 12px
- **Body line height:** 1.6–1.7
- **Heading line height:** 1.1–1.3
- **Maximum body line length:** 65–72 characters. Cap the reading column width to enforce this.

### Mobile
- **Minimum body text:** 16px
- **Body line height:** 1.75–1.85 — more generous than desktop
- **Paragraph spacing:** 1.5× the body line height between paragraphs

## Colour Modes

Both light and dark mode are first-class requirements. Currently implemented as separate Figma variable collections (`02 Color/Light` and `02 Color/Dark`).

- All colour tokens must be defined in both light and dark
- Light mode is the design default; dark mode must match it in quality and intention, not just invert it
- Test every component and page template in both modes before considering it complete
- Dark mode background should not be pure black — use a slightly lifted dark surface to reduce eye strain

## Colour Constraints

- All colour combinations must meet WCAG 2.1 AA in both light and dark modes (4.5:1 for body text, 3:1 for large text and UI components)
- Do not use colour as the sole indicator of meaning — pair with labels or icons

## Image and Media Constraints

- Images should be responsive and never overflow their container
- Case study hero images: full-width within the content column, or optionally bleed wider for visual impact
- Lazy load all images below the fold
- Always define width/height attributes to prevent layout shift
- White-background mockups may need a subtle inset frame or shadow in dark mode

## Performance Constraints

- No heavy JavaScript frameworks required — the portfolio is primarily static content
- Animations should be purposeful and brief; respect `prefers-reduced-motion`
- No loading screens — the site should feel instant

## Accessibility

- Keyboard navigable throughout
- Focus states visible and styled in both light and dark modes (global focus ring implemented in `sheet.css`)
- All images have descriptive alt text
- Semantic HTML structure (headings in order, landmark regions used correctly)
- Contact forms must have labelled inputs
