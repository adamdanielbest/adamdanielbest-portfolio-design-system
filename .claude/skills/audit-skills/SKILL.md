---
name: audit-skills
description: Audits all installed skills for staleness — dead file paths, missing scripts, outdated token IDs, workflow mismatches, and naming convention violations. Use when the user says "audit skills", "are the skills up to date?", "/audit-skills", or when something in a skill isn't working as expected.
---

# Audit Skills

Lightweight audit of all installed skills. Checks for common staleness signals without requiring a live Figma connection.

If you're finding frequent drift across multiple skills (token IDs wrong, paths broken, workflow steps out of order), consider running a thorough audit instead — that cross-references each skill against the live Figma variables and design system config. Flag it to the user and offer to build one if needed.

---

## Step 1 — Load config

```bash
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
CONFIG="$REPO_ROOT/.claude/design-system.json"
SKILLS_DIR="$HOME/.claude/skills"
```

Config is optional — some checks only apply if a project config exists.

---

## Step 2 — For each skill, run these checks

```bash
for dir in "$SKILLS_DIR"/*/; do
  skill=$(basename "$dir")
  file="$dir/SKILL.md"
  echo "=== $skill ==="

  # 1. name: field matches directory name
  name=$(grep '^name:' "$file" | head -1 | sed 's/name: //')
  [ "$name" != "$skill" ] && echo "  ⚠️  name mismatch: '$name' vs directory '$skill'"

  # 2. Naming convention — should be verb-noun kebab-case (e.g. build-page, export-tokens)
  #    Flag if it looks like noun-verb (e.g. design-system-setup) or a bare noun
  if ! echo "$skill" | grep -qE '^(audit|build|commit|export|list|log|preview|rename|review|setup|watch)-'; then
    echo "  ⚠️  naming: '$skill' doesn't start with a recognised verb — consider verb-noun convention"
  fi

  # 3. File paths referenced in the skill still exist
  grep -oE '\$REPO_ROOT/[^"` ]+' "$file" | while read path; do
    expanded="${path/\$REPO_ROOT/$REPO_ROOT}"
    [ ! -e "$expanded" ] && echo "  ⚠️  dead path: $path"
  done

  # 4. Scripts referenced with python3 / bash still exist
  grep -oE '(python3|bash)\s+"?[^"` \n]+"?' "$file" | while read cmd; do
    script=$(echo "$cmd" | awk '{print $2}' | tr -d '"')
    [[ "$script" == *"$REPO_ROOT"* ]] && [ ! -f "${script/\$REPO_ROOT/$REPO_ROOT}" ] && echo "  ⚠️  missing script: $script"
  done

  # 5. VariableID references — flag any that look hardcoded
  count=$(grep -c 'VariableID:' "$file" 2>/dev/null || echo 0)
  [ "$count" -gt 0 ] && echo "  ℹ️  $count hardcoded VariableID refs — verify still valid in Figma"

  # 6. Skill references other skills — check those skills exist
  grep -oE '`/[a-z-]+`' "$file" | sed "s/\`//g;s/\///g" | while read ref; do
    [ ! -d "$SKILLS_DIR/$ref" ] && echo "  ❌  references missing skill: /$ref"
  done

  echo ""
done
```

---

## Step 3 — Report findings

Present results grouped by severity:

**❌ Fails** — must fix before the skill will work (missing referenced skills, critically broken paths)

**⚠️ Warnings** — likely stale, should review (dead paths, missing scripts, name mismatches, naming convention)

**ℹ️ Info** — worth a manual check but not broken (hardcoded VariableIDs, token references)

---

## Step 4 — Recommend fixes

For each issue found, suggest the specific fix:
- Name mismatch → offer to run `/rename-skill` to fix directory + `name:` field + all cross-references in one step
- Naming convention violation → suggest the corrected verb-noun name and offer to run `/rename-skill`
- Dead path → update the path or note that the file needs to be created
- Missing referenced skill → create the skill stub or update the reference
- Hardcoded VariableIDs → note which skill and suggest verifying against current Figma variables

**For any rename suggestion, always gate on user confirmation before invoking `/rename-skill`.**
Show the proposed old → new mapping and ask: "Want me to rename these now?"

If more than 3 skills have warnings, note:
> "There's significant drift across multiple skills. Consider a thorough audit that cross-references live Figma variables and the design system config — flag this and I can build that capability."

Zero issues → "All skills look healthy ✅"
