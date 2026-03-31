# Bookmarklets

A collection of browser bookmarklets with a build system that converts readable JavaScript source into minified, clipboard-ready bookmarklet code.

## Setup

1. Create a `.env` file in the project root:

```
JIRA_DOMAIN=your-company.atlassian.net
```

2. Make sure you have Node.js installed.

## Building

```bash
node build.js
```

This shows a numbered menu of all available projects. Pick one and the project's build handles the rest — minifying and copying the bookmarklet to your clipboard.

To install in your browser, create a new bookmark and paste the clipboard contents as the URL.

## Current Projects

### Jira Ticket Helper

A single bookmarklet that works across Jira and Appian pages:

- On Jira: extracts the ticket code from the URL and name from the page, copies `CODE: Name` as plain text and as a clickable rich link
- On Appian: reads the ticket from clipboard, clicks the "Create Package" button if needed, waits for the form, and fills the Name and Link to Ticket fields

### SAIL Snippets

A collection of Appian SAIL code snippets. The build shows a sub-menu of available snippets. Each copies a ready-to-paste SAIL layout to your clipboard.

Available snippets:
- `sideBySideLayout` — `a!sideBySideLayout` with two `a!sideBySideItem` entries
- `columnsLayout` — `a!columnsLayout` with two `a!columnLayout` entries

## Project Structure

```
├── build.js                          # Root build (project discovery, global shared loading, delegation)
├── .env                              # Environment config (gitignored)
├── shared/
│   └── snackbar.js                   # Toast notification UI (shared across all projects)
└── src/
    ├── Jira Ticket Helper/
    │   ├── build.js                  # Project build (env replacement, minify, clipboard)
    │   ├── index.js                  # Bookmarklet source
    │   └── README.md
    └── SAIL Snippets/
        ├── build.js                  # Project build (snippet sub-menu, minify, clipboard)
        └── snippets/
            ├── columnsLayout.js
            └── sideBySideLayout.js
```

## Adding a New Project

1. Create a folder inside `src/` (e.g. `src/My Bookmarklet/`)
2. Add a `build.js` that exports `module.exports = function(projectPath, env, globalShared) { ... }`
3. For single-purpose bookmarklets, add an `index.js` with the source
4. For multi-entry projects, add a subfolder with individual `.js` files and handle the sub-menu in `build.js`
5. Use `{{TOKEN}}` placeholders for values from `.env`
6. The `globalShared` parameter contains pre-loaded code from `shared/` — prepend it to your source
7. Run `node build.js` — your project will appear in the menu
