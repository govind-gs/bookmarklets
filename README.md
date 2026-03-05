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

This shows a numbered menu of all available bookmarklets. Pick one and the minified bookmarklet code is copied to your clipboard automatically.

To install it in your browser, create a new bookmark and paste the clipboard contents as the URL.

## Current Bookmarklets

### Jira Clipboard Helper

Generates a Jira ticket link and copies it to your clipboard in both plain text (the URL) and rich text (a clickable HTML link), so pasting into a rich text editor gives you a proper hyperlink.

**v1 — Clipboard reader**
Reads a ticket ID (e.g. `PROJ-1234`) from your clipboard and converts it into a link. Falls back to a prompt if nothing is found.

**v2 — Page URL reader**
Extracts the ticket from the current Jira page URL. Works on `/browse/PROJ-1234` pages and board/backlog views with `?selectedIssue=PROJ-1234`. Shows an error if you're not on a Jira page.

## Project Structure

```
├── build.js                          # Build script (discovery, minification, clipboard copy)
├── .env                              # Environment config (gitignored)
├── Jira Clipboard Helper/
│   ├── shared/                       # Code shared across versions
│   │   ├── copyTicketLink.js         # Clipboard write logic
│   │   └── snackbar.js               # Toast notification UI
│   ├── v1/
│   │   └── index.js                  # Clipboard-based version
│   └── v2/
│       └── index.js                  # URL-based version
```

## Adding a New Bookmarklet

1. Create a new folder at the project root (e.g. `My New Bookmarklet/`)
2. Add a version subfolder with an `index.js` (e.g. `My New Bookmarklet/v1/index.js`)
3. Optionally add a `shared/` folder for code reused across versions
4. Use `{{TOKEN}}` placeholders for any values that should come from `.env`
5. Run `node build.js` — your new bookmarklet will appear in the menu
