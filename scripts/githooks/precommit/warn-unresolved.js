/* eslint-disable import/no-extraneous-dependencies */
const { execSync, } = require('child_process');

const chalk = require('chalk');
const inquirer = require('inquirer');

function warnUnresolved() {
  const haveUnresolved = execSync(
    'git diff-index --cached --name-only -S">>>>>>>" HEAD', { encoding: 'utf8', }
  ).split('\n')
    .filter(file => !!file);

  const numOfUnresolved = haveUnresolved.length;
  if (numOfUnresolved > 0) {
    const message =
      `${chalk.yellow(
        `The ${haveUnresolved
          .reduce((output, file, i, files) => (
            (files.length === 1)
              ? `"${file}" file seems`
              : output + ((i === files.length - 1)
                ? ` and "${file}" files seem`
                : i === 0 ? `"${file}"` : `, "${file}"`)
          ), '')
        } to have unresolved merge conflicts.`)
      }\n${
        chalk.white(`Are you sure you want to commit ${numOfUnresolved === 1 ? 'it' : 'them'}?`)
      }`;

    return inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message,
        default: false,
      },
    ])
      .then(answers => {
        if (!answers.continue) {
          const errorMsg = `Aborting commit due to merge conflicts in ${
            numOfUnresolved > 1 ?
              'committed files' :
              haveUnresolved[0]
          }`;
          console.error(`${chalk.red(errorMsg)}`);
          process.exit(1);
        }
      });
  }

  return Promise.resolve();
}

module.exports = warnUnresolved;
