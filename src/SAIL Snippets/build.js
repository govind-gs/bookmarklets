var fs = require('fs');
var path = require('path');
var readline = require('readline');
var spawnSync = require('child_process').spawnSync;

module.exports = function(projectPath, env, globalShared) {
  // Discover snippets
  var snippetsDir = path.join(projectPath, 'snippets');
  var snippets = fs.readdirSync(snippetsDir)
    .filter(function(f) { return f.endsWith('.js'); })
    .sort()
    .map(function(f) {
      return { name: f.replace('.js', ''), file: path.join(snippetsDir, f) };
    });

  if (snippets.length === 0) {
    console.error('No snippets found');
    process.exit(1);
  }

  console.log('\nSelect a snippet:\n');
  snippets.forEach(function(s, i) { console.log('  ' + (i + 1) + '. ' + s.name); });

  var rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('\nEnter number: ', function(answer) {
    rl.close();
    var index = parseInt(answer, 10) - 1;
    if (isNaN(index) || index < 0 || index >= snippets.length) {
      console.error('Invalid selection');
      process.exit(1);
    }

    var selected = snippets[index];
    var source = globalShared + fs.readFileSync(selected.file, 'utf8');

    // Minify
    var minified = source
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/[^\n]*/gm, '')
      .replace(/\s+/g, ' ')
      .trim();

    var bookmarklet = 'javascript:(function(){' + minified + '})()';

    var result = spawnSync('pbcopy', [], { input: bookmarklet });
    if (result.status === 0) {
      console.log('\n\u2713 "' + selected.name + '" snippet copied to clipboard');
    } else {
      console.error('\n\u2717 Failed to copy to clipboard');
    }
  });
};
