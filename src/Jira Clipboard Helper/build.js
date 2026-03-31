var fs = require('fs');
var path = require('path');
var spawnSync = require('child_process').spawnSync;

module.exports = function(projectPath, env, globalShared) {
  if (!env.JIRA_DOMAIN) {
    console.error('Missing JIRA_DOMAIN in .env');
    process.exit(1);
  }

  var source = globalShared + fs.readFileSync(path.join(projectPath, 'index.js'), 'utf8');
  source = source.replace(/\{\{JIRA_DOMAIN\}\}/g, env.JIRA_DOMAIN);

  // Minify
  var minified = source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/[^\n]*/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  var bookmarklet = 'javascript:(function(){' + minified + '})()';

  var result = spawnSync('pbcopy', [], { input: bookmarklet });
  if (result.status === 0) {
    console.log('\n\u2713 Jira Clipboard Helper copied to clipboard');
  } else {
    console.error('\n\u2717 Failed to copy to clipboard');
  }
};
