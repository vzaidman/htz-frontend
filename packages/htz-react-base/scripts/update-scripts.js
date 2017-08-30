/* eslint-disable import/no-dynamic-require, no-console */
const fs = require('fs');
const resolveFrom = require('resolve-from');

const SCRIPTS = {
  build: 'htz-scripts build',
  format: 'htz-scripts format',
  lint: 'htz-scripts lint',
  prepare: 'npm run build',
  test: 'htz-scripts test',
  styleguide: 'htz-scripts styleguide',
  'styleguide:build': 'htz-scripts styleguide:build',
};

const packagePath = resolveFrom(process.cwd(), './package.json');
const packageInfo = require(packagePath);

// If --no-overwrite is specified, skip updating any scripts that already exist
// with the same name.
const noOverwrite = process.argv.indexOf('--no-overwrite') >= 2;
// If --no-sort is specified, the scripts won't be sorted by name before writing
// them back to `package.json`.
const noSort = process.argv.indexOf('--no-sort') >= 2;
const added = [];
const updated = [];
const skipped = [];

console.log('Updating package.json...');

Object.keys(SCRIPTS).forEach(name => {
  const command = SCRIPTS[name];
  if (name in packageInfo.scripts) {
    const existingCommand = packageInfo.scripts[name];
    if (existingCommand === command) {
      skipped.push(name);
    }
    else if (noOverwrite) {
      console.warn(
        `\nThe existing "${name}" script was skipped, use --overwrite to update. It is currently:`
      );
      console.warn(
        `  ${JSON.stringify(name)}: ${JSON.stringify(existingCommand)}`
      );
      console.warn('Overwriting will update it to:');
      console.warn(`  ${JSON.stringify(name)}: ${JSON.stringify(command)}`);
      skipped.push(name);
    }
    else {
      console.warn(
        `\nThe existing "${name}" script was overwritten. It was previously:`
      );
      console.warn(
        `  ${JSON.stringify(name)}: ${JSON.stringify(existingCommand)}`
      );
      packageInfo.scripts[name] = command;
      updated.push(name);
    }
  }
  else {
    packageInfo.scripts[name] = command;
    added.push(name);
  }
});

if (!noSort) {
  packageInfo.scripts = Object.keys(packageInfo.scripts)
    .sort()
    .reduce((sortedScripts, name) => {
      // eslint-disable-next-line no-param-reassign
      sortedScripts[name] = packageInfo.scripts[name];
      return sortedScripts;
    }, {});
}

const packageString = `${JSON.stringify(packageInfo, null, 2)}\n`;
fs.writeFileSync(packagePath, packageString);

console.log(
  `\nAdded ${added.length}, updated ${updated.length}, skipped ${skipped.length} script(s).`
);
