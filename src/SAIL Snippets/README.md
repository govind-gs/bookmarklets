# SAIL Snippets

Bookmarklets that copy common Appian SAIL layout code to your clipboard, ready to paste into the Expression Editor.

## Available Snippets

### sideBySideLayout

Copies an `a!sideBySideLayout` with two `a!sideBySideItem` entries.

### columnsLayout

Copies an `a!columnsLayout` with two `a!columnLayout` entries.

All snippets include a trailing comma for easy inline pasting.

## Build

From the workspace root:

```bash
node build.js
```

Select "SAIL Snippets", then pick the snippet you want. The minified bookmarklet is copied to your clipboard.
