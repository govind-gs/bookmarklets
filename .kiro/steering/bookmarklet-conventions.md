---
inclusion: always
---

# Bookmarklet Project Conventions

## Project Structure
- Each bookmarklet project gets its own folder at the workspace root
- Versions live in subfolders (`v1/`, `v2/`, etc.), each containing an `index.js`
- Shared code between versions goes in a `shared/` folder within the project — the build auto-prepends these files

## Source Code Rules
- Write clean, readable JavaScript — no `javascript:` prefix, no manual minification
- Use `var` and string concatenation instead of `let`/`const`/template literals to avoid backtick issues during bookmarklet minification
- Use `{{TOKEN}}` style placeholders for env values (e.g. `{{JIRA_DOMAIN}}`) — `build.js` replaces them at build time from `.env`

## Code Architecture
- Separate concerns: parsing logic, clipboard writing, and UI feedback should be distinct functions
- Extract reusable logic into the `shared/` folder

## User Feedback
- Never use `alert()` — use the shared snackbar for all user feedback
- Always provide both success and error feedback

## Build System
- `build.js` at the root handles discovery, env injection, minification, and clipboard copy
- Don't log bookmarklet code to terminal — just copy to clipboard and confirm with a message
- `.env` is gitignored and holds domain-specific config
