var domain = '{{JIRA_DOMAIN}}';

function parseTicket(input) {
  var match = input.match(/([a-zA-Z]{2,}-\d+)/);
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
    alert('Invalid ticket format.');
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
