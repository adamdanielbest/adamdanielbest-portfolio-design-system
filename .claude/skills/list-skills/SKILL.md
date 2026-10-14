---
name: list-skills
description: Lists all available skills with their purpose and when to use them. Use when the user says "list skills", "what skills do we have?", "show me the skills", "/list-skills", or wants to browse available commands.
---

# List Skills

Reads all installed skills and presents them in a structured, browsable summary.

---

## Step 1 — Read all skills

```bash
for dir in ~/.claude/skills/*/; do
  name=$(grep '^name:' "$dir/SKILL.md" 2>/dev/null | head -1 | sed 's/name: //')
  desc=$(grep '^description:' "$dir/SKILL.md" 2>/dev/null | head -1 | sed 's/description: //')
  echo "SKILL: $name | $desc"
done
```

---

## Step 2 — Present as a grouped table

Group by verb prefix. Use the live output from Step 1 — never hardcode skill names or descriptions here.

Common groupings (add new groups as needed):

- **Audit** — `audit-*`
- **Build** — `build-*`
- **Commit** — `commit-*`
- **Export** — `export-*`
- **List** — `list-*`
- **Log** — `log-*`
- **Rename** — `rename-*`
- **Review** — `review-*`
- **Setup** — `setup-*`
- **Start** — `start-*`

For each skill show: `` `/skill-name` `` and a short one-line purpose derived from the description (trim the trigger phrases — just keep the "what it does" part).

---

## Step 3 — Show the workflow

After listing, remind the user of the standard workflow:

```
review-design
  → build-figma-guideline-page
    → review-design
      → build-page  (gates: export-tokens, export-icons)
        → review-code
          → commit-code
```

Offer: "Want details on any specific skill?"
