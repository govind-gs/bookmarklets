var snippet = 'a!sideBySideLayout(\n'
  + '  items: {\n'
  + '    a!sideBySideItem(\n'
  + '      item: {}\n'
  + '    ),\n'
  + '    a!sideBySideItem(\n'
  + '      item: {}\n'
  + '    )\n'
  + '  }\n'
  + '),';

async function sailSnippet() {
  try {
    await navigator.clipboard.writeText(snippet);
    showSnackbar('Copied: sideBySideLayout');
  } catch (e) {
    showSnackbar('Failed to copy: ' + e.message, true);
  }
}

sailSnippet();
