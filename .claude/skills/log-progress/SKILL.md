---
name: log-progress
description: Updates the running progress log for the design system project by reading recent git commits and asking what context to add, then appending a new dated entry. Use whenever the user says "log progress", "/log-progress", "update the progress log", "log what we did", "wrap up the session", or any phrase indicating they want to record what was done before switching context or finishing for the day. Also use proactively when a substantial piece of work has just completed.
---

# Log Progress

Appends a dated entry to the project progress log, combining recent git commits with the user's own notes.

---

## Step 0 — Load config

```bash
REPO_ROOT=$(git rev-parse --show-toplevel)
CONFIG="$REPO_ROOT/.claude/design-system.json"
```

If `design-system.json` does not exist → invoke `/setup-design-system` first.

Read from config:
- `name` — project name (used as log header)
- `log.path` — path to progress log file (default: `docs/progress.md`)

If `log.path` is not set in config, default to `docs/progress.md` and ask if the user wants to save this preference.

---

## Step 1 — Read recent commits

```bash
cd "$REPO_ROOT" && git log --oneline --since="7 days ago"
```

Summarise what changed in plain language — group by theme (tokens, components, Figma, tooling).

---

## Step 2 — Ask for context

Say:
> "Here's what git shows from the last session:
> [commit summary]
>
> What else should I log? Any decisions made, things tried that didn't work, or context for next time?"

Wait for the user's response. This is the most important step — the git log gives the what, the user provides the why.

---

## Step 3 — Write log entry

Append to `<REPO_ROOT>/<log.path>`. Create the file and `docs/` directory if needed.

Format:

```markdown
## <date> — <project name>

### What changed
- <commit summary in plain language>

### Context & decisions
<user's notes verbatim, lightly formatted>

### Next session
<any "pick up here" notes the user mentioned>

---
```

Date format: `27 Jun 2026`

---

## Step 4 — Commit the log

```bash
cd "$REPO_ROOT"
git add "<log.path>"
git commit -m "docs: log progress <date>"
git push
```

On failure:
```bash
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [log-progress] ERROR: git commit/push failed | $(git push 2>&1)" >> "$REPO_ROOT/.claude/design-system-errors.log"
```

---

## Report back

Confirm the log was written and pushed. Tell the user where the log lives: `<log.path>`.
