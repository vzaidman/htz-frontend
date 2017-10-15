const fs = require('fs');

const isNoRun = process.argv.includes('--no-run');
const flowconfig = './.flowconfig';

if (!fs.existsSync(flowconfig)) {
  console.log('Initializing flow...');
  const flowconfigString = `[ignore]

[include]

[libs]

[lints]

[options]`;

  fs.writeFileSync(flowconfig, flowconfigString);
}

if (!isNoRun) {
  require('flow-bin/cli');
}
