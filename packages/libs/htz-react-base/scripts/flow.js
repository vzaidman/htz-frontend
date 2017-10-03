const fs = require('fs');

const noRunIndex = process.argv.indexOf('--no-run');
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

// Remove the `--no-run` argument
if (noRunIndex === -1) {
  require('flow-bin/cli');
}
