/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { execSync, } = require('child_process');

const chalk = require('chalk');
const dir = require('node-dir');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const spawn = require('cross-spawn');
const template = require('lodash.template');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: `Package Name (it will be automatically "@haaretz/" namespaced):\n  ${chalk.magenta(
        '❯'
      )}`,
      default: process.argv[2],
      validate: answer => answer !== '',
    },
    {
      type: 'input',
      name: 'description',
      message: `Package Description:\n  ${chalk.magenta('❯')}`,
      default: process.argv[3],
    },
    {
      type: 'list',
      name: 'pkgType',
      message: 'What kind of package are you building?',
      choices: [
        { name: 'A component', value: 'components', },
        { name: 'An app', value: 'apps', },
        { name: 'A library/utility', value: 'libs', },
      ],
    },
    {
      type: 'input',
      name: 'author',
      message: `Your name please?\n  ${chalk.magenta('❯')}`,
      default: execSync('git config user.name', { encoding: 'utf8', }).split('\n')[0],
    },
    {
      type: 'confirm',
      name: 'allowPublish',
      message: 'Is this package intended to be published on "npm"?',
      default: answers => answers.pkgType !== 'apps',
    },
    {
      type: 'confirm',
      name: 'continue',
      message: 'Create package?',
      default: true,
    },
  ])
  .then(answers => {
    if (answers.continue) {
      const { name, pkgType, } = answers;
      const safeName = name.replace(' ', '-');
      const packagePath = path.join(process.cwd(), 'packages/', pkgType, safeName);

      console.log(`Creating ${chalk.cyan(name)} package in ${chalk.cyan(packagePath)}...`);
      console.log('');

      // Create package directory
      createDirs('/', packagePath);

      const filterOutByType = {
        libs: {
          dirs: [ 'components', 'config', 'styleguide', ],
          files: [ 'next.config.js', 'styleguide.config.js', ],
        },
        components: {
          dirs: [ 'components', ],
          files: [ 'next.config.js', ],
        },
        apps: {
          dirs: [],
          files: [],
        },
      };

      const filterOut = filterOutByType[pkgType];
      const templatesPath = path.join(process.cwd(), 'pkg_templates');

      dir.readFiles(
        templatesPath,
        { exclude: filterOut.files, excludeDir: filterOut.dirs, },
        (error, content, filename, next) => {
          if (error) {
            console.error(error);
          }
          const compiledTemplate = template(content, {
            interpolate: /<%=([\s\S]+?)%>/g,
          });
          const processedContent = compiledTemplate({ ...answers, safeName, });
          const outputPath = path.join(packagePath, path.relative(templatesPath, filename));

          if (fse.existsSync(outputPath)) {
            inquirer
              .prompt([
                {
                  name: 'overwrite',
                  message: `${chalk.red(outputPath)} already exists.\n  ${chalk.yellow(
                    'Would you like to overwrite it?'
                  )}`,
                  type: 'confirm',
                  default: false,
                },
              ])
              .then(({ overwrite, }) => {
                if (overwrite) {
                  writeFile(outputPath, processedContent);
                  next();
                }
                else {
                  inquirer
                    .prompt([
                      {
                        name: 'abort',
                        message: `${chalk.red('Do you want to abort?')}`,
                        type: 'confirm',
                        default: true,
                      },
                    ])
                    .then(({ abort, }) => {
                      if (!abort) {
                        next();
                      }
                      else {
                        console.log('\nAbort! Abort!\n');
                      }
                    });
                }
              });
          }
          else {
            writeFile(outputPath, processedContent);
            next();
          }
        },
        (err, files) => {
          // create empty directories based on package type file structure
          if (pkgType === 'apps') {
            createDirs(packagePath, 'layouts', 'lib', 'pages');
          }
          if ([ 'components', 'libs', ].includes(pkgType)) {
            createDirs(packagePath, 'src');
          }

          // Initialize the new package
          console.log(`\n${chalk.yellow(`Initializing ${name}`)}`);

          const result = spawn.sync(
            'cross-env',
            [ 'yarn', 'run', 'sync', '--scope', `@haaretz/${safeName}`, ],
            {
              stdio: 'inherit',
            }
          );

          if (result.error) {
            throw result.error;
          }
          if (result.signal) {
            console.error(result.signal);
            process.exit(1);
          }
          if (result.status) {
            process.exit(result.status);
          }
          // Say goodbye
          console.log(
            `\n\n${chalk.magenta('Thank you. Come again!')}\n- Dr. Apu Nahasapeemapetilon\n`
          );
        }
      );
    }
    else {
      console.log('\nAbort! Abort!\n');
    }
  });

function writeFile(outputPath, content) {
  console.log(`Writing ${chalk.cyan(outputPath)}...`);
  fse.outputFileSync(outputPath, content);
}

function createDirs(pkgPath, ...dirNames) {
  dirNames.forEach(dirName => {
    if (!fse.existsSync(path.join(pkgPath, dirName))) {
      fse.mkdirSync(path.join(pkgPath, dirName));
    }
  });
}
