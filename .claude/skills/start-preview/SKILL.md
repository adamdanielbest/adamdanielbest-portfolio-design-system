---
name: start-preview
description: Starts a local HTTP server so any page in the project renders correctly in the browser (assets, fonts, and SVG sprites require HTTP — file:// won't work). Use when the user says "preview", "start the server", "open preview", "/start-preview", or wants to view any local page in the browser.
---

# Preview

Starts a local HTTP server for the design system so component pages render correctly (icon sprite requires HTTP, not `file://`).

---

## Step 0 — Load config

```bash
REPO_ROOT=$(git rev-parse --show-toplevel)
CONFIG="$REPO_ROOT/.claude/design-system.json"
```

If `design-system.json` does not exist → invoke `/setup-design-system` first.

Read from config:
- `preview.script` — path to server script (e.g. `preview.sh`)
- `preview.port` — port number (default: `4321`)

---

## Step 1 — Start the server

If `preview.script` is set and the file exists:
```bash
cd "$REPO_ROOT" && bash "<preview.script>"
```

If not set or not found, fall back to common alternatives in order:
1. `python3 -m http.server <port> --bind 127.0.0.1`
2. `npx serve . --listen <port>`
3. `npx http-server . -p <port>`

Use whichever is available. If none work:
```bash
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [preview] ERROR: no server method available | Tried: preview.sh, python3 http.server, npx serve, npx http-server" >> "$REPO_ROOT/.claude/design-system-errors.log"
```
Tell the user what's missing and ask them to install one.

---

## Step 2 — List available pages

```bash
find "$REPO_ROOT" -name "*.html" | grep -v node_modules | grep -v .git
```

Present each as a clickable URL at `http://localhost:<port>/`:

For example:
- http://localhost:4321/button-component/button.html
- http://localhost:4321/layout-component/layout.html

Derive the URL path by stripping `$REPO_ROOT` from the absolute path.

---

## Step 3 — Tell the user

> "Server running at http://localhost:<port>
>
> Available pages:
> - [list of URLs]
>
> Press Ctrl+C in Terminal to stop the server."

If the server fails to start:
```bash
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [preview] ERROR: server failed to start | Port: <port> | Script: <script> | Output: <error>" >> "$REPO_ROOT/.claude/design-system-errors.log"
```
