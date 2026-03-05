// Project-specific build transform
// Receives source code and env object, returns transformed source
module.exports = function(source, env) {
  var jiraDomain = env.JIRA_DOMAIN;
  if (!jiraDomain) {
    console.error('Missing JIRA_DOMAIN in .env');
    process.exit(1);
  }
  return source.replace(/\{\{JIRA_DOMAIN\}\}/g, jiraDomain);
};
