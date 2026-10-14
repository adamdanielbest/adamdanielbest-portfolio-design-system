---
name: commit-code
description: Commits approved local changes to a feature branch and pushes for review. Use when the user says "commit", "commit the code", "ship it", "/commit-code", or confirms they are happy with the preview. Runs review-code first as a gate, then commits to a feature branch. Never commits without explicit user approval.
---

# Commit Code

Gates on `review-code` passing, then commits approved local changes to a feature branch ready for PR.

---

## Step 0 — Load config

```bash
REPO_ROOT=$(git rev-parse --show-toplevel)
CONFIG="$REPO_ROOT/.claude/design-system.json"
```

---

## Step 1 — Gate: run review-code

Invoke `/review-code` on the changed files before committing. If any ❌ fails are found, stop and report them to the user — do not commit until they are resolved.

⚠️ warnings are acceptable to commit with user acknowledgement.

---

## Step 2 — Confirm with user

Show the user a summary of what will be committed:

```bash
cd "$REPO_ROOT" && git status --short && git diff --stat
```

Ask: "These are the files that will be committed. Happy to go ahead?"

Do not proceed without explicit confirmation.

---

## Step 3 — Create feature branch and commit

```bash
cd "$REPO_ROOT"
BRANCH="feat/<component-name>-page"
git checkout -b "$BRANCH" 2>/dev/null || git checkout "$BRANCH"
git add <changed files>
git commit -m "feat: <component name> page"
```

Derive the branch and commit message from the file/component name — ask the user to confirm if unclear.

---

## Step 4 — Push

```bash
git push -u origin "$BRANCH"
```

On failure:
```bash
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [commit-code] ERROR: git push failed | Branch: $BRANCH | $(git push 2>&1)" >> "$REPO_ROOT/.claude/design-system-errors.log"
```

---

## Report back

Tell the user:
- Branch name and commit message
- Link to the pushed branch for PR creation
- Any issues encountered

If anything failed, point to `.claude/design-system-errors.log`.
