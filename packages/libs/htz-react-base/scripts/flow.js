const fs = require('fs');

const flowconfig = './.flowconfig';

if (!fs.existsSync(flowConfig)) {
  console.log('Initializing flow...');
  const flowconfigString = `[ignore]

[include]

[libs]

[lints]

[options]`;

  fs.writeFileSync(flowconfig, flowconfigString);
}

require('flow-bin/bin/cli');
