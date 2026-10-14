---
name: setup-design-system
description: First-time setup wizard for any design system project. Creates .claude/design-system.json with all paths and Figma config. Use when starting a new design system project, when another skill can't find a config, or when the user says "set up design system", "initialise the project", "/setup-design-system", "configure the design system", or "getting started".
---

# Design System Setup

Interactive wizard that creates `.claude/design-system.json` — the config file all design system skills read to find token paths, Figma files, component directories, and more.

## When this runs

- User explicitly invokes `/setup-design-system`
- Another skill detects no config exists and delegates here
- User starts a new project and wants to get up and running

---

## Step 1 — Detect repo root

```bash
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
```

If this fails (not a git repo), ask the user to run `git init` first, then stop.

---

## Step 2 — Check for existing config

```bash
CONFIG="$REPO_ROOT/.claude/design-system.json"
```

If `design-system.json` already exists, show the current values and ask:
> "A config already exists. Do you want to (1) keep it and continue, (2) update specific fields, or (3) start fresh?"

---

## Step 3 — Interactive wizard

Ask these questions one at a time. Each has a sensible default shown in brackets — if the user just hits enter, use the default.

**Project name**
> What is this design system called? (e.g. "Metadata App Design System")

**Token source directory**
> Where does the token JSON file live? [`src/styles/tokens/`]
> (This is where Figma exports the DTCG JSON)

**Generated CSS directory**
> Where should generated CSS token files be written? [`src/styles/generated/`]

**Token generate script**
> Path to the CSS generation script, relative to repo root? [`generate-tokens-css.py`]
> (Enter "none" if you don't have one yet — we can create it later)

**Token check script**
> Path to the token reference checker, relative to repo root? [`scripts/check-token-refs.py`]
> (Enter "none" if you don't have one yet)

**Figma file ID**
> What is your Figma file ID?
> (Open your Figma file → copy the ID from the URL: figma.com/file/**FILE_ID**/...)
> (Enter "none" to skip for now)

**Components directory**
> Where do component files live? [`src/components/`]
> (Used by build-page and review-code to find existing components)

**Templates directory**
> Where does the component sheet boilerplate template live? [`src/templates/`]

**Preview script**
> Path to the local preview server script? [`preview.sh`]
> (Enter "none" if you don't have one)

**Preview port**
> Which port does the preview server run on? [`4321`]

---

## Step 4 — Write config

Create `.claude/` directory if needed, then write the config:

```bash
mkdir -p "$REPO_ROOT/.claude"
```

Write `.claude/design-system.json`:

```json
{
  "name": "<project name>",
  "version": "1.0",
  "tokens": {
    "source": "<token source dir>",
    "generated": "<generated CSS dir>",
    "generateScript": "<generate script or null>",
    "checkScript": "<check script or null>"
  },
  "figma": {
    "fileId": "<figma file ID or null>"
  },
  "components": "<components dir>",
  "templates": "<templates dir>",
  "preview": {
    "script": "<preview script or null>",
    "port": <port>
  }
}
```

Null out any fields the user skipped.

---

## Step 5 — Add to .gitignore (optional)

Ask: "Should `.claude/design-system-errors.log` be added to .gitignore? (Recommended — error logs contain local paths)"

If yes, append to `.gitignore`:
```
.claude/design-system-errors.log
```

The config file itself (`design-system.json`) should be committed — it's safe to share.

---

## Step 6 — Confirm and next steps

Show a summary of what was written, then say:

> "You're set up! Here's what you can do next:
> - `/export-tokens` — sync tokens from Figma
> - `/export-icons` — sync icon sprite from Figma
> - `/start-preview` — start the local preview server
> - `/review-code` — audit a component's HTML/CSS
> - `/review-design` — audit a Figma frame
>
> If anything goes wrong, check `.claude/design-system-errors.log` — it logs all skill errors with enough context to diagnose or share for support."

---

## Error logging

If any step fails, log it:

```bash
mkdir -p "$REPO_ROOT/.claude"
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [design-system-setup] ERROR: <what failed> | Context: <relevant detail>" >> "$REPO_ROOT/.claude/design-system-errors.log"
```

Then tell the user: "Something went wrong during setup — the error has been logged to `.claude/design-system-errors.log`. You can paste that file's contents back to me for diagnosis."
