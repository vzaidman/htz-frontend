const fs = require('fs');
const resolveFrom = require('resolve-from');
const chalk = require('chalk');
const inquirer = require('inquirer');

const SCRIPTS = {
  build: 'htz-scripts build',
  clean: 'htz-scripts clean',
  format: 'htz-scripts format',
  flow: 'htz-scripts flow',
  gc: 'htz-scripts commitizen',
  lint: 'htz-scripts lint',
  prepare: 'npm run build',
  styleguide: 'htz-scripts styleguide',
  'styleguide:build': 'htz-scripts styleguide:build',
  test: 'htz-scripts test',
  'update-scripts': 'htz-scripts update-scripts',
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

async function mapPackages() {
  const keys = Object.keys(SCRIPTS);
  for (const name of keys) {
    const command = SCRIPTS[name];
    if (name in packageInfo.scripts) {
      const existingCommand = packageInfo.scripts[name];
      if (existingCommand === command) {
        skipped.push(name);
      }
      else if (noOverwrite) {
        console.warn(
          `\nThe existing "${name}" script  in "${chalk.bold(
            packagePath
          )}" was skipped, use --overwrite to update. It is currently:`
        );
        console.warn(
          `  ${JSON.stringify(name)}: ${JSON.stringify(existingCommand)}`
        );
        console.warn('Overwriting will update it to:');
        console.warn(`  ${JSON.stringify(name)}: ${JSON.stringify(command)}`);
        skipped.push(name);
      }
      else {
        const { overwrite, } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            default: false,
            message: `${`The "${name}" script already exists in:` +
              `"${chalk.magenta(packagePath)}".\n` +
              'Overwrite '}${chalk.cyan(
              `${JSON.stringify(name)}: ${JSON.stringify(existingCommand)}`
            )}\nwith ${chalk.cyan(
              `${JSON.stringify(name)}: ${JSON.stringify(command)}`
            )}?`,
          },
        ]);
        if (overwrite) {
          packageInfo.scripts[name] = command;
          updated.push(name);
        }
      }
    }
    else {
      packageInfo.scripts[name] = command;
      added.push(name);
    }
  }
}

mapPackages().then(() => {
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
    `Added ${added.length}, updated ${updated.length}, skipped ${skipped.length} script(s) in\n` +
      `"${chalk.bold(packagePath)}"\n\n`
  );
});
