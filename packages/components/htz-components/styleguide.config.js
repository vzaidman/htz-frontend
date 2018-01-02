const path = require('path');
const { readdirSync, lstatSync, } = require('fs');
const { configure, } = require('@haaretz/htz-react-base/styleguide');

// When passed an object, `configure` will do a (shallow) extend of the default
// config. If you need to extend a particular value (e.g. `styleguideComponents`),
// pass a function to `configure` and use `Object.assign` on both the root
// object and the value. The first argument will be the default config. Note
// that Babel syntax like object rest spread can't be used here.

const utilsPath = path.join(process.cwd(), 'src/utils');
const componentSectionsPath = path.join(process.cwd(), 'src', 'components');
const isDir = file =>
  lstatSync(path.join(componentSectionsPath, file)).isDirectory();

const sectionPatterns = {
  Icon: path.join(componentSectionsPath, 'Icon', 'Icon.js'),
};

function getSectionPattern(section) {
  return (
    sectionPatterns[section] ||
    `${path.join(componentSectionsPath, section)}**/[A-Z]*.js{,x}`
  );
}

module.exports = configure(config =>
  Object.assign(config, {
    getComponentPathLine(componentPath) {
      // Styleguidist will show a `componentPath` relative to the config file,
      // which is not what we want when using the default config.
      if (componentPath.indexOf('..') !== 0) {
        // const nonExampleComponentPath = componentPath;
        const nonExampleComponentPath = componentPath.replace('example', '');
        // eslint-disable-next-line no-param-reassign
        componentPath = nonExampleComponentPath;

        const packageName = require('./package.json').name;
        const extension = path.extname(nonExampleComponentPath);
        const componentName = path.basename(nonExampleComponentPath, extension);

        if (componentPath.indexOf('Icon') !== -1) {
          return `import { <IconName>, } from '${packageName}';`;
        }

        return `import { ${componentName}, } from '${packageName}';  (${
          nonExampleComponentPath
          })`;
      }

      return componentPath;
    },
    sections: [
      {
        name: 'Utils',
        sections: readdirSync(utilsPath)
          .filter(file => file.match(/\.md$/))
          .map(file => ({
            name: path.parse(file).name,
            content: path.join(utilsPath, file),
          })),
      },
      {
        name: 'Components',
        // components: config.components,
        // components: path.join(
        //   process.cwd(),
        //   '{,src/}components#<{(||)}>#[A-Z]*.{js,jsx}'
        //   // '{,src/}components#<{(||)}>#example[A-Z]*.{js,jsx}'
        // ),
        sections: readdirSync(componentSectionsPath)
          .filter(file => isDir(file) && file[0] === file[0].toUpperCase())
          .map(file => ({
            name: file,
            components: getSectionPattern(file),
          })),
      },
    ],
  })
);
