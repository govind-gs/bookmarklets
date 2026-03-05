async function copyTicketLink(ticket) {
  var domain = '{{JIRA_DOMAIN}}';
  var url = 'https://' + domain + '/browse/' + ticket;
  var html = '<a href="' + url + '">' + ticket + '</a>';
  await navigator.clipboard.write([
    new ClipboardItem({
      'text/plain': new Blob([url], { type: 'text/plain' }),
      'text/html': new Blob([html], { type: 'text/html' })
    })
  ]);
}
