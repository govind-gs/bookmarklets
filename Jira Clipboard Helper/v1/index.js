function parseTicket(input) {
  var match = input.match(/([a-zA-Z]{2,}-\d+)/);
  return match ? match[1].toUpperCase() : null;
}

async function jiraClipboardHelper() {
  var ticket = null;

  try {
    var text = await navigator.clipboard.readText();
    ticket = parseTicket(text);
  } catch (e) {
    console.warn('Clipboard read failed:', e);
  }

  if (!ticket) {
    var input = prompt('No ticket found in clipboard. Enter ticket:');
    if (input) ticket = parseTicket(input);
  }

  if (!ticket) {
    showSnackbar('Invalid ticket format.', true);
    return;
  }

  try {
    await copyTicketLink(ticket);
    showSnackbar('Copied: ' + ticket);
  } catch (e) {
    showSnackbar('Failed to copy: ' + e.message, true);
  }
}

jiraClipboardHelper();
