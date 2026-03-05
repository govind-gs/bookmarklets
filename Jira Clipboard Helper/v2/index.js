var domain = '{{JIRA_DOMAIN}}';

async function jiraClipboardHelper() {
  var pageUrl = window.location.href;

  // Match selectedIssue param (e.g. board view)
  var match = pageUrl.match(/[?&]selectedIssue=([a-zA-Z]+-\d+)/)
    || pageUrl.match(/\/browse\/([a-zA-Z]+-\d+)/);

  if (!match) {
    alert('Not on a Jira page with a ticket.');
    return;
  }

  var ticket = match[1].toUpperCase();
  var url = 'https://' + domain + '/browse/' + ticket;
  var html = '<a href="' + url + '">' + ticket + '</a>';

  await navigator.clipboard.write([
    new ClipboardItem({
      'text/plain': new Blob([url], { type: 'text/plain' }),
      'text/html': new Blob([html], { type: 'text/html' })
    })
  ]);
}

jiraClipboardHelper();
