const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Load .env from project root
const envPath = path.resolve(__dirname, '.env');
const env = fs.readFileSync(envPath, 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const [key, val] = line.split('=');
    if (key && val) acc[key.trim()] = val.trim();
    return acc;
  }, {});

const jiraDomain = env.JIRA_DOMAIN;
if (!jiraDomain) {
  console.error('Missing JIRA_DOMAIN in .env');
  process.exit(1);
}

// Discover bookmarklets: folders containing an index.js
const bookmarklets = fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('.') && d.name !== 'node_modules')
  .filter(d => fs.existsSync(path.join(__dirname, d.name, 'index.js')))
  .map(d => d.name);

if (bookmarklets.length === 0) {
  console.error('No bookmarklets found (folders with index.js)');
  process.exit(1);
}

console.log('\nSelect a bookmarklet to build:\n');
bookmarklets.forEach((name, i) => console.log(`  ${i + 1}. ${name}`));

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('\nEnter number: ', (answer) => {
  rl.close();
  const index = parseInt(answer, 10) - 1;
  if (isNaN(index) || index < 0 || index >= bookmarklets.length) {
    console.error('Invalid selection');
    process.exit(1);
  }

  const selected = bookmarklets[index];
  const inputFile = path.join(__dirname, selected, 'index.js');
  let source = fs.readFileSync(inputFile, 'utf8');
  source = source.replace('{{JIRA_DOMAIN}}', jiraDomain);

  const minified = source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/[^\n]*/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  const bookmarklet = `javascript:(function(){${minified}})()`;

  const { spawnSync } = require('child_process');
  const pbcopy = spawnSync('pbcopy', [], { input: bookmarklet });
  if (pbcopy.status === 0) {
    console.log(`\n✓ "${selected}" bookmarklet copied to clipboard`);
  } else {
    console.error('\n✗ Failed to copy to clipboard');
  }
});
