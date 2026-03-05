async function jiraClipboardHelper() {
  const text = (await navigator.clipboard.readText()).trim();
  const match = text.match(/([A-Z]+-\d+)/);
  if (!match) return alert('No Jira ticket found in clipboard');
  const ticket = match[1];
  const url = `https://{{JIRA_DOMAIN}}/browse/${ticket}`;
  const link = `<a href="${url}">${ticket}</a>`;
  await navigator.clipboard.writeText(link);
  alert(`Copied: ${link}`);
}

jiraClipboardHelper();
