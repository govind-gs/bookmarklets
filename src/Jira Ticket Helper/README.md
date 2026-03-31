# Jira Ticket Helper

A bookmarklet that bridges Jira and Appian — copy ticket info from Jira, paste it into Appian's "Create Package" form.

Current version: v1.1.0

## How It Works

### On a Jira page

Extracts the ticket code from the URL and the ticket name from the page heading. Copies `CODE: Name` to clipboard in two formats:

- Plain text: `PROJ-1234: Fix the login bug`
- Rich HTML: the full text as a clickable link to the Jira ticket

Works on `/browse/PROJ-1234` pages and board/backlog views with `?selectedIssue=PROJ-1234`.

### On an Appian page

Reads the clipboard for a previously copied ticket (in `CODE: Name` format). Then:

1. If the "Create Package" button is visible, clicks it and waits for the form to open
2. Fills the Name field with `CODE Name`
3. Fills the Link to Ticket field with the Jira browse URL
4. Does not submit — lets you review first

### Anywhere else

Shows an error snackbar: "Not on a supported page."

## Configuration

Set your Jira domain in the root `.env` file:

```
JIRA_DOMAIN=your-company.atlassian.net
```

## Build

From the workspace root:

```bash
node build.js
```

Select "Jira Ticket Helper" and the minified bookmarklet is copied to your clipboard.
