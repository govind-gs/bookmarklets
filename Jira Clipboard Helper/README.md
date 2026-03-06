# Jira Clipboard Helper

A set of bookmarklets for quickly generating and using Jira ticket links.

## Versions

### v1 — Clipboard Reader

Reads a Jira ticket ID (e.g. `PROJ-1234`) from your clipboard and copies a formatted link back. Copies both plain text (the URL) and rich text (a clickable HTML link), so pasting into Slack, Confluence, or Google Docs gives you a proper hyperlink.

Falls back to a prompt if no ticket is found in the clipboard.

### v2 — Page URL Reader

Extracts the ticket ID directly from the current Jira page URL. Works on:
- `/browse/PROJ-1234` pages
- Board and backlog views with `?selectedIssue=PROJ-1234`

Copies the same rich link format as v1. Shows an error if you're not on a Jira page.

### v3 — Ticket Dropper (Jira → Appian)

A two-click workflow for filling Appian's "Create Package" form with Jira ticket data.

1. Click the bookmarklet on a Jira ticket page — grabs the ticket code from the URL and the ticket name from the page heading, stores both in the clipboard
2. Open the "Create Package" form in Appian and click the bookmarklet again — reads the ticket data from the clipboard and fills in the Name field (`CODE-1234 Ticket Name`) and the Link to Ticket field (the browse URL)

## Shared Code

- `shared/copyTicketLink.js` — clipboard write logic used by v1 and v2
- `shared/snackbar.js` — toast notification UI used by all versions

## Build

From the project root:

```bash
node build.js
```

Select the version you want and the minified bookmarklet is copied to your clipboard.

## Configuration

Set your Jira domain in the root `.env` file:

```
JIRA_DOMAIN=your-company.atlassian.net
```
