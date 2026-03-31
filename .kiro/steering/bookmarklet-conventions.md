---
inclusion: always
---

# Bookmarklet Project Conventions

## Project Structure
- Each bookmarklet project gets its own folder at the workspace root
- Every project must have a `build.js` that exports a function: `module.exports = function(projectPath, env) { ... }`
- Single-purpose projects have an `index.js` at the project root
- Multi-entry projects (like SAIL Snippets) store entries in a subfolder (e.g. `snippets/`) and their `build.js` handles the sub-menu
- Shared code goes in a `shared/` folder within the project — project `build.js` prepends these files

## Source Code Rules
- Write clean, readable JavaScript — no `javascript:` prefix, no manual minification
- Use `var` and string concatenation instead of `let`/`const`/template literals to avoid backtick issues during bookmarklet minification
- Use `{{TOKEN}}` style placeholders for env values (e.g. `{{JIRA_DOMAIN}}`) — `build.js` replaces them at build time from `.env`

## Code Architecture
- Separate concerns: parsing logic, clipboard writing, and UI feedback should be distinct functions
- Extract reusable logic into the `shared/` folder

## SAIL Snippets
- Always add a trailing comma after the closing parenthesis of SAIL snippet components so they're ready to paste inline

## User Feedback
- Never use `alert()` — use the shared snackbar for all user feedback
- Always provide both success and error feedback

## Build System
- `build.js` at the root discovers projects (folders with a `build.js`), shows a project menu, and delegates to the selected project's `build.js`
- Each project's `build.js` exports `module.exports = function(projectPath, env) { ... }` and handles its own source loading, sub-menus (if needed), env replacement, minification, and clipboard copy
- Don't log bookmarklet code to terminal — just copy to clipboard and confirm with a message
- `.env` is gitignored and holds domain-specific config
