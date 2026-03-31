---
inclusion: always
---

# Bookmarklet Project Conventions

## Project Structure
- Projects live inside the `src/` folder at the workspace root
- Every project must have a `build.js` that exports a function: `module.exports = function(projectPath, env, globalShared) { ... }`
- Single-purpose projects have an `index.js` at the project root
- Multi-entry projects (like SAIL Snippets) store entries in a subfolder (e.g. `snippets/`) and their `build.js` handles the sub-menu
- Global shared code (e.g. snackbar) lives in `shared/` at the workspace root — the root `build.js` loads and passes it to project builds

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

## Documentation
- Always update the relevant README files when making changes to a project (features, structure, build, etc.)
- Each project inside `src/` should have its own `README.md`
- The root `README.md` should reflect the current project list, structure, and setup instructions

## Build System
- `build.js` at the root discovers projects inside `src/`, loads global shared files from `shared/`, shows a project menu, and delegates to the selected project's `build.js`
- Each project's `build.js` exports `module.exports = function(projectPath, env, globalShared) { ... }` and handles its own source loading, sub-menus (if needed), env replacement, minification, and clipboard copy
- Don't log bookmarklet code to terminal — just copy to clipboard and confirm with a message
- `.env` is gitignored and holds domain-specific config
