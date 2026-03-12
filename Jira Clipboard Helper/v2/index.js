function parseTicketFromUrl(url) {
  var match = url.match(/[?&]selectedIssue=([a-zA-Z]{2,}-\d+)/)
    || url.match(/\/browse\/([a-zA-Z]{2,}-\d+)/);
  return match ? match[1].toUpperCase() : null;
}

function getTicketName() {
  var el = document.querySelector('h1[data-testid="issue.views.issue-base.foundation.summary.heading"]');
  return el ? el.textContent.trim() : null;
}

async function jiraClipboardHelper() {
  var code = parseTicketFromUrl(window.location.href);

  if (!code) {
    showSnackbar('Not on a Jira page with a ticket.', true);
    return;
  }

  var name = getTicketName();
  if (!name) {
    showSnackbar('Could not read ticket name from page.', true);
    return;
  }

  try {
    var domain = '{{JIRA_DOMAIN}}';
    var url = 'https://' + domain + '/browse/' + code;
    var text = code + ': ' + name;
    var html = '<a href="' + url + '">' + code + ': ' + name + '</a>';
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/plain': new Blob([text], { type: 'text/plain' }),
        'text/html': new Blob([html], { type: 'text/html' })
      })
    ]);
    showSnackbar('Copied: ' + text);
  } catch (e) {
    showSnackbar('Failed to copy: ' + e.message, true);
  }
}

jiraClipboardHelper();
