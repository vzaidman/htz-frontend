const path = require('path');
const { configure, } = require('@haaretz/htz-react-base/styleguide');

const htzComponentsPath = path.dirname(
  require.resolve('@haaretz/htz-components/package.json')
);

// When passed an object, `configure` will do a (shallow) extend of the default
// config. If you need to extend a particular value (e.g. `styleguideComponents`),
// pass a function to `configure` and use `Object.assign` on both the root
// object and the value. The first argument will be the default config. Note
// that Babel syntax like object rest spread can't be used here.

module.exports = configure(config => Object.assign(config, {
  title: 'haaretz.co.il Styleguide',
  sections: [
    {
      name: 'Site Components',
      components: 'components/**/[A-Z]*.{js,jsx}',
    },
    {
      name: 'Haaretz Shared Components',
      components: `${htzComponentsPath}/src/**/[A-Z]*.{js,jsx}`,
    },
  ],
  contextDependencies: config.contextDependencies.concat([
    path.join(htzComponentsPath, 'src'),
  ]),
})
);
