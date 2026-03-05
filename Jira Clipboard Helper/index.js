var domain = '{{JIRA_DOMAIN}}';

async function processTicket(input) {
  var match = input.match(/([a-zA-Z]+-\d+)/);
  if (!match) return false;

  var ticket = match[1].toUpperCase();
  var url = 'https://' + domain + '/browse/' + ticket;
  var html = '<a href="' + url + '">' + ticket + '</a>';

  await navigator.clipboard.write([
    new ClipboardItem({
      'text/plain': new Blob([url], { type: 'text/plain' }),
      'text/html': new Blob([html], { type: 'text/html' })
    })
  ]);
  return true;
}

async function jiraClipboardHelper() {
  try {
    var text = await navigator.clipboard.readText();
    var found = await processTicket(text);
    if (!found) {
      var input = prompt('No ticket found. Enter ticket:');
      if (input) await processTicket(input);
    }
  } catch (e) {
    var input = prompt('Clipboard blocked. Enter ticket:');
    if (input) await processTicket(input);
  }
}

jiraClipboardHelper();
