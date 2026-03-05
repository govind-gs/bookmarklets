function parseTicketFromUrl(url) {
  var match = url.match(/[?&]selectedIssue=([a-zA-Z]{2,}-\d+)/)
    || url.match(/\/browse\/([a-zA-Z]{2,}-\d+)/);
  return match ? match[1].toUpperCase() : null;
}

async function jiraClipboardHelper() {
  var ticket = parseTicketFromUrl(window.location.href);

  if (!ticket) {
    showSnackbar('Not on a Jira page with a ticket.', true);
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
