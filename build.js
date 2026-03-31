var fs = require('fs');
var path = require('path');
var readline = require('readline');

// Load .env from workspace root
var envPath = path.resolve(__dirname, '.env');
var env = fs.readFileSync(envPath, 'utf8')
  .split('\n')
  .reduce(function(acc, line) {
    var parts = line.split('=');
    if (parts[0] && parts[1]) acc[parts[0].trim()] = parts[1].trim();
    return acc;
  }, {});

// Discover projects (folders with a build.js)
var projects = [];
fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(function(d) { return d.isDirectory() && !d.name.startsWith('.') && d.name !== 'node_modules'; })
  .forEach(function(d) {
    var projectBuild = path.join(__dirname, d.name, 'build.js');
    if (fs.existsSync(projectBuild)) {
      projects.push({ name: d.name, path: path.join(__dirname, d.name) });
    }
  });

if (projects.length === 0) {
  console.error('No projects found');
  process.exit(1);
}

console.log('\nSelect a project to build:\n');
projects.forEach(function(p, i) { console.log('  ' + (i + 1) + '. ' + p.name); });

var rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('\nEnter number: ', function(answer) {
  rl.close();
  var index = parseInt(answer, 10) - 1;
  if (isNaN(index) || index < 0 || index >= projects.length) {
    console.error('Invalid selection');
    process.exit(1);
  }

  var selected = projects[index];
  var projectBuild = require(path.join(selected.path, 'build.js'));
  projectBuild(selected.path, env);
});
