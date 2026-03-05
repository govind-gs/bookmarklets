var domain = '{{JIRA_DOMAIN}}';

function parseTicketFromUrl(url) {
  var match = url.match(/[?&]selectedIssue=([a-zA-Z]{2,}-\d+)/)
    || url.match(/\/browse\/([a-zA-Z]{2,}-\d+)/);
  return match ? match[1].toUpperCase() : null;
}

async function copyTicketLink(ticket) {
  var url = 'https://' + domain + '/browse/' + ticket;
  var html = '<a href="' + url + '">' + ticket + '</a>';
  await navigator.clipboard.write([
    new ClipboardItem({
      'text/plain': new Blob([url], { type: 'text/plain' }),
      'text/html': new Blob([html], { type: 'text/html' })
    })
  ]);
}

async function jiraClipboardHelper() {
  var ticket = parseTicketFromUrl(window.location.href);

  if (!ticket) {
    alert('Not on a Jira page with a ticket.');
    return;
  }

  try {
    await copyTicketLink(ticket);
    alert('Copied: ' + ticket);
  } catch (e) {
    alert('Failed to copy: ' + e.message);
  }
}

jiraClipboardHelper();
