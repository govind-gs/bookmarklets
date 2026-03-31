// v1.0.0
var domain = '{{JIRA_DOMAIN}}';

function parseTicketFromUrl(url) {
  var match = url.match(/[?&]selectedIssue=([a-zA-Z]{2,}-\d+)/)
    || url.match(/\/browse\/([a-zA-Z]{2,}-\d+)/);
  return match ? match[1].toUpperCase() : null;
}

function getTicketName() {
  var el = document.querySelector('h1[data-testid="issue.views.issue-base.foundation.summary.heading"]');
  return el ? el.textContent.trim() : null;
}

function parseTicketFromPlainText(text) {
  if (!text) return null;
  var idx = text.indexOf(': ');
  if (idx === -1) return null;
  var code = text.substring(0, idx).trim();
  var name = text.substring(idx + 2).trim();
  if (!code.match(/^[a-zA-Z]{2,}-\d+$/)) return null;
  return { code: code, name: name, url: 'https://' + domain + '/browse/' + code };
}

function findInputByLabel(labelText) {
  var labels = document.querySelectorAll('label');
  for (var i = 0; i < labels.length; i++) {
    if (labels[i].textContent.trim() === labelText) {
      var inputId = labels[i].getAttribute('for');
      if (inputId) return document.getElementById(inputId);
    }
  }
  return null;
}

function setInputValue(input, value) {
  var nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  nativeSetter.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

function isJiraPage() {
  return window.location.hostname.indexOf(domain) !== -1;
}

function isAppianForm() {
  var headers = document.querySelectorAll('h1.TitleText---page_header');
  for (var i = 0; i < headers.length; i++) {
    if (headers[i].textContent.trim() === 'Create Package') return true;
  }
  return false;
}

async function handleJiraPage() {
  var code = parseTicketFromUrl(window.location.href);
  if (!code) {
    showSnackbar('Could not find ticket code in URL.', true);
    return;
  }

  var name = getTicketName();
  if (!name) {
    showSnackbar('Could not read ticket name from page.', true);
    return;
  }

  try {
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

async function handleAppianForm() {
  var ticket;
  try {
    var text = await navigator.clipboard.readText();
    ticket = parseTicketFromPlainText(text);
  } catch (e) {
    showSnackbar('Clipboard access blocked. Allow clipboard permission and try again.', true);
    return;
  }

  if (!ticket) {
    showSnackbar('No ticket in clipboard. Copy a Jira ticket first.', true);
    return;
  }

  var nameInput = findInputByLabel('Name');
  if (!nameInput) {
    showSnackbar('Could not find Name field.', true);
    return;
  }

  var linkInput = findInputByLabel('Link to Ticket');
  if (!linkInput) {
    showSnackbar('Could not find Link to Ticket field.', true);
    return;
  }

  setInputValue(nameInput, ticket.code + ' ' + ticket.name);
  setInputValue(linkInput, ticket.url);
  showSnackbar('Filled: ' + ticket.code);
}

async function jiraClipboardHelper() {
  if (isJiraPage()) {
    await handleJiraPage();
  } else if (isAppianForm()) {
    await handleAppianForm();
  } else {
    showSnackbar('Not on a supported page (Jira or Appian Create Package form).', true);
  }
}

jiraClipboardHelper();
