---
name: export-tokens
description: Exports design tokens from Figma, regenerates CSS token files, verifies all var() references resolve, then commits and pushes. Use whenever the user says "export tokens", "/export-tokens", "sync tokens from Figma", "update tokens", or anything indicating Figma variable changes need syncing to the repo.
---

# Export Tokens

Runs the full token sync pipeline for any design system project.

## Figma MCP rule
Always use `mcp__figma-console__*` tools. Never use `Figma:use_figma` or `Figma:get_design_context`.

---

## Step 0 — Load config

```bash
REPO_ROOT=$(git rev-parse --show-toplevel)
CONFIG="$REPO_ROOT/.claude/design-system.json"
```

If `design-system.json` does not exist:
> "No design system config found. Let me run the setup wizard first."
Then invoke `/setup-design-system` and stop — the user will re-run `/export-tokens` after setup completes.

Read the config and extract:
- `tokens.source` → token JSON output directory
- `tokens.generated` → generated CSS directory
- `tokens.generateScript` → CSS generation script path
- `tokens.checkScript` → token reference checker path
- `figma.fileId` → Figma file ID

If `figma.fileId` is null, ask: "What is your Figma file ID? I'll save it to the config."

---

## Step 1 — Export from Figma

Call `figma_export_tokens` with:
```
format: dtcg
outputPath: <REPO_ROOT>/<tokens.source>
scope: file
strategy: replace
colorFormat: hex
```

If this fails, log the error and stop:
```bash
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [export-tokens] ERROR: figma_export_tokens failed | FileId: <fileId> | Response: <error>" >> "$REPO_ROOT/.claude/design-system-errors.log"
```
Tell the user: "Figma export failed — error logged to `.claude/design-system-errors.log`."

---

## Step 2 — Apply patches (if any)

Check if a patch script exists at `$REPO_ROOT/scripts/patch-token-aliases.py`. If it does, run it:

```bash
python3 "$REPO_ROOT/scripts/patch-token-aliases.py"
```

This handles cross-collection alias bugs in the Figma export tool. If the project has documented manual patches (check for comments in the token JSON or a `patches` key in `design-system.json`), apply them now.

If the patch script fails, log and stop:
```bash
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [export-tokens] ERROR: patch script failed | Script: scripts/patch-token-aliases.py | $(python3 "$REPO_ROOT/scripts/patch-token-aliases.py" 2>&1)" >> "$REPO_ROOT/.claude/design-system-errors.log"
```

---

## Step 3 — Regenerate CSS

If `tokens.generateScript` is set:
```bash
cd "$REPO_ROOT" && python3 "<tokens.generateScript>"
```

If null, look for common alternatives in order:
- `generate-tokens-css.py`
- `scripts/generate-tokens.py`
- `node_modules/.bin/style-dictionary build`

If nothing is found, log and ask the user to specify the script path.

On failure:
```bash
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [export-tokens] ERROR: CSS generation failed | Script: <script> | Output: <error output>" >> "$REPO_ROOT/.claude/design-system-errors.log"
```

---

## Step 4 — Verify token references

If `tokens.checkScript` is set:
```bash
cd "$REPO_ROOT" && python3 "<tokens.checkScript>"
```

If it reports unresolved references, log them and stop — do not commit:
```bash
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [export-tokens] ERROR: unresolved token refs | $(python3 <checkScript> 2>&1)" >> "$REPO_ROOT/.claude/design-system-errors.log"
```

Tell the user which tokens are unresolved and ask: "A token referenced in your component CSS no longer exists in Figma. Would you like me to find what it was renamed to?"

---

## Step 5 — Commit and push

```bash
cd "$REPO_ROOT"
git add <tokens.source> <tokens.generated>
git commit -m "chore: sync tokens from Figma"
git push
```

On failure:
```bash
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [export-tokens] ERROR: git push failed | $(git push 2>&1)" >> "$REPO_ROOT/.claude/design-system-errors.log"
```

---

## Report back

Confirm:
- How many tokens were exported (collections × token counts)
- How many CSS files were written
- That the reference check passed
- That the push succeeded

If anything failed, point the user to `.claude/design-system-errors.log`.
