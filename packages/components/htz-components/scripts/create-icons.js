/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const async = require('async');

const md5 = require('md5');
const svgr = require('svgr').default;

console.log();

const IconDir = path.relative(
  process.cwd(),
  path.join('src', 'components', 'Icon')
);

const IconsTestsDir = path.join(IconDir, 'icons', '__tests__');

const inDir = path.join(IconDir, 'svgs');
const outDir = path.join(IconDir, 'icons');
const cacheFilePath = path.join(
  process.cwd(),
  IconDir,
  '.iconHashesCache.json'
);

const componentTemplate = require(path.join(
  process.cwd(),
  IconDir,
  'iconTemplate.js'
));

const componentTestTemplate = require(path.join(
  process.cwd(),
  IconDir,
  'iconTestTemplate.js'
));
const exampleTemplate = require(path.join(
  process.cwd(),
  IconDir,
  'exampleTemplate.js'
));

const cache = fs.existsSync(cacheFilePath) ? require(cacheFilePath) : {};

const svgFiles = fs
  .readdirSync(inDir)
  .filter(fileName => {
    if (/[A-Z]/.test(fileName)) {
      throw new Error(
        `svg icon file names may not contain capital letters (in "${fileName}")`
      );
    }

    return (
      !fileName.startsWith('.') &&
      path.extname(fileName) === '.svg' &&
      fs.lstatSync(path.join(inDir, fileName)).isFile()
    );
  })
  .map(fileName => path.join(inDir, fileName));

const componentFiles = fs
  .readdirSync(outDir)
  .map(fileName => path.join(outDir, fileName));

// Remove cache entries for files that no longer exist
Object.keys(cache).filter(filePath => {
  if (!componentFiles.includes(filePath)) {
    delete cache[filePath];
    return false;
  }
  return true;
});

Promise.all(
  svgFiles.map(
    filePath =>
      new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, svg) => {
          if (err) {
            console.error(
              `${err.stack}\n\n${chalk.red(
                `Failed to read the "${chalk.cyan(
                  path.basename(filePath)
                )}" from disk. Please try again later\n`
              )}`
            );
            resolve(err.message);
          }
          const componentPath = getCorrespondingComponent(
            path.basename(filePath),
            outDir
          );
          const componentName = path.basename(componentPath, '.js');
          svgr(svg, {
            componentName,
            prettier: false,
            semi: true,
            singleQuote: true,
            svgo: true,
            tabs: false,
            tabWidth: 2,
            template: componentTemplate,
            title: false,
            trailingComma: 'all',
            bracketSpacing: true,
            jsxBracketSameLine: false,
          })
            // eslint-disable-next-line consistent-return
            .then(component => {
              const componentHash = md5(component);
              const cachedHash = cache[componentPath];
              console.log(fs.existsSync(componentPath));
              const noOverWrite =
                fs.existsSync(componentPath) &&
                fs
                  .readFileSync(componentPath, 'utf8')
                  .startsWith('/* noOverWrite */');

              // Check if the component needs to be create or updated
              // We check the against component hases instead of svg hashes,
              // so that changes to the template automatically affect all generated
              // components, even if the svg itself hasn't changed.
              if (componentHash !== cachedHash && !noOverWrite) {
                const iconTestFile = componentTestTemplate(componentName);
                const IconTestFilePath = path.join(
                  IconsTestsDir,
                  `${componentName}.test.js`
                );
                async.each(
                  [
                    { file: component, path: componentPath, },
                    { file: iconTestFile, path: IconTestFilePath, },
                  ],
                  (icon, callback) => {
                    fs.writeFile(icon.path, icon.file, error => {
                      if (error) {
                        console.error(
                          `${error.stack}\n\n${chalk.red(
                            `Failed to write the updated "${chalk.yellow(
                              path.basename(componentPath)
                            )}" component to disk. Please try again later\n`
                          )}`
                        );
                        callback(error);
                      }
                      callback();
                    });
                  },
                  error => {
                    if (error) resolve(error.message);
                    // Update the cache
                    cache[componentPath] = componentHash;

                    // Inform the user
                    console.log(
                      componentFiles.includes(componentPath)
                        ? chalk.yellow(
                          `The source svg of "${chalk.magenta(
                            path.basename(componentPath)
                          )}" has changed. Updating the icon component.\n`
                        )
                        : `${chalk.yellow(
                          `Generated a new "${chalk.magenta(
                            chalk.bold(path.basename(componentPath))
                          )}" component.`
                        )}\nDon't forget to add it to the exported component in "src/index.js"..\n`
                    );
                    resolve(component);
                  }
                );
              }
              else {
                resolve(component);
              }
            });
        });
      })
  )
).then(values => {
  // Write cache file
  fs.writeFile(cacheFilePath, JSON.stringify(cache, null, 2), err => {
    if (err) {
      console.error(
        `${err.stack}\n\nFailed to write the updated icon cache to disk.`
      );
    }
    else {
      console.log(`${chalk.yellow(chalk.bold('Updating cache file'))}`);
    }
  });

  // Write styleguide example file
  const examples = exampleTemplate(
    Object.keys(cache).map(filePath => path.basename(filePath, '.js'))
  );
  const examplesPath = path.join(IconDir, 'Icon.js');
  fs.writeFile(examplesPath, examples, err => {
    if (err) {
      console.error(
        `${err.stack}\n${chalk.yellow(
          chalk.bold(
            'Failed to write the updated styleguide example file to disk.'
          )
        )}`
      );
    }
    else {
      console.log(
        `${chalk.yellow(chalk.bold('Writing example to styleguide'))}`
      );
    }
  });
});

function getCorrespondingComponent(svgPath, componentsDir) {
  const baseName = path
    .basename(svgPath, 'svg')
    .replace(/^(.)/g, (match, g1) => g1.toUpperCase())
    .replace(/(?:-|_)+(.)/g, (m, g) => g.toUpperCase());
  return `${path.join(componentsDir, baseName)}js`;
}

// function getCorrespondingSvg(componentPath, svgsDir) {
//   const baseName = path
//     .basename(componentPath, 'js')
//     .replace(/^(.)/g, (match, g1) => g1.toLowerCase())
//     .replace(/([A-Z])/g, (matchs, g1) => `-${g1.toLowerCase()}`);
//   return `${path.join(svgsDir, baseName)}svg`;
// }
