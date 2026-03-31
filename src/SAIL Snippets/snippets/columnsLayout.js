var snippet = 'a!columnsLayout(\n'
  + '  columns: {\n'
  + '    a!columnLayout(\n'
  + '      contents: {}\n'
  + '    ),\n'
  + '    a!columnLayout(\n'
  + '      contents: {}\n'
  + '    )\n'
  + '  }\n'
  + '),';

async function sailSnippet() {
  try {
    await navigator.clipboard.writeText(snippet);
    showSnackbar('Copied: columnsLayout');
  } catch (e) {
    showSnackbar('Failed to copy: ' + e.message, true);
  }
}

sailSnippet();
