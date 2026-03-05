var fs = require('fs');
var path = require('path');
var readline = require('readline');

// Load .env from project root
var envPath = path.resolve(__dirname, '.env');
var env = fs.readFileSync(envPath, 'utf8')
  .split('\n')
  .reduce(function(acc, line) {
    var parts = line.split('=');
    if (parts[0] && parts[1]) acc[parts[0].trim()] = parts[1].trim();
    return acc;
  }, {});

// Discover bookmarklets
var bookmarklets = [];
fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(function(d) { return d.isDirectory() && !d.name.startsWith('.') && d.name !== 'node_modules'; })
  .forEach(function(d) {
    var project = d.name;
    var projectPath = path.join(__dirname, project);
    var versions = fs.readdirSync(projectPath, { withFileTypes: true })
      .filter(function(v) { return v.isDirectory() && /^v\d+$/.test(v.name); })
      .sort(function(a, b) { return a.name.localeCompare(b.name, undefined, { numeric: true }); });
    versions.forEach(function(v) {
      var indexFile = path.join(projectPath, v.name, 'index.js');
      if (fs.existsSync(indexFile)) {
        bookmarklets.push({ label: project + ' (' + v.name + ')', file: indexFile, project: projectPath });
      }
    });
  });

if (bookmarklets.length === 0) {
  console.error('No bookmarklets found');
  process.exit(1);
}

console.log('\nSelect a bookmarklet to build:\n');
bookmarklets.forEach(function(b, i) { console.log('  ' + (i + 1) + '. ' + b.label); });

var rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('\nEnter number: ', function(answer) {
  rl.close();
  var index = parseInt(answer, 10) - 1;
  if (isNaN(index) || index < 0 || index >= bookmarklets.length) {
    console.error('Invalid selection');
    process.exit(1);
  }

  var selected = bookmarklets[index];

  // Load shared files
  var shared = '';
  var sharedDir = path.join(selected.project, 'shared');
  if (fs.existsSync(sharedDir)) {
    fs.readdirSync(sharedDir)
      .filter(function(f) { return f.endsWith('.js'); })
      .sort()
      .forEach(function(f) { shared += fs.readFileSync(path.join(sharedDir, f), 'utf8') + '\n'; });
  }

  var source = shared + fs.readFileSync(selected.file, 'utf8');

  // Check for project-level build.js
  var projectBuild = path.join(selected.project, 'build.js');
  if (fs.existsSync(projectBuild)) {
    var transform = require(projectBuild);
    source = transform(source, env);
  }

  // Minify
  var minified = source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/[^\n]*/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  var bookmarklet = 'javascript:(function(){' + minified + '})()';

  var spawnSync = require('child_process').spawnSync;
  var result = spawnSync('pbcopy', [], { input: bookmarklet });
  if (result.status === 0) {
    console.log('\n\u2713 "' + selected.label + '" bookmarklet copied to clipboard');
  } else {
    console.error('\n\u2717 Failed to copy to clipboard');
  }
});
