const path = require('path');
const resolveFrom = require('resolve-from');

const Wrapper =
  resolveFrom.silent(
    process.cwd(),
    './components/StyleProvider/StyleProvider'
  ) ||
  resolveFrom.silent(
    process.cwd(),
    './src/components/StyleProvider/StyleProvider'
  ) ||
  // This is tricky: really, we should assume `htz-components` is a normally
  // installed module and not a symlink, and thus get `StyleProvider` from
  // `@haaretz/htz-components/dist/lib`. But if it is symlinked, we want to
  // detect changes to it without needing to rebuild `htz-components`. This
  // currently prioritizes the version under `src` for that reason.
  resolveFrom.silent(
    process.cwd(),
    '@haaretz/htz-components/src/components/StyleProvider/StyleProvider'
  ) ||
  resolveFrom.silent(
    process.cwd(),
    '@haaretz/htz-components/dist/lib/components/StyleProvider/StyleProvider'
  );

module.exports = {
  title: 'Haaretz Components',
  showCode: true,
  showUsage: true,
  components: path.join(process.cwd(), '{,src/}components/**/*.{js,jsx}'),
  theme: {
    sidebarWidth: 260
  },
  // Styleguidist sends webpack this option in such a way that it errors out
  // if one of the values is null or undefined, so we can't just use the raw
  // value of `Wrapper`. Instead, exclude `Wrapper` altogether if it's null.
  styleguideComponents: Wrapper ? { Wrapper } : {},
  getComponentPathLine(componentPath) {
    // Styleguidist will show a `componentPath` relative to the config file,
    // which is not what we want when using the default config.
    if (componentPath.indexOf('..') === 0) {
      componentPath =
        resolveFrom.silent(__dirname, componentPath) || componentPath;
    }
    componentPath = path.relative(process.cwd(), componentPath);
    const pathSegments = componentPath.split(path.sep);
    // If the component is coming from another module, render an `import`
    // statement rather than the file path. This makes a big assumption, which
    // is that any component can be imported from that module's `main` entry
    // point as a named export matching the name of the file.
    if (pathSegments[0] === 'node_modules') {
      const isScoped = pathSegments[1].startsWith('@');
      const packagePath = path.join(
        process.cwd(),
        ...pathSegments.slice(0, isScoped ? 3 : 2),
        'package.json'
      );
      const packageName = require(packagePath).name;
      const extension = path.extname(componentPath);
      const componentName = path.basename(
        pathSegments[pathSegments.length - 1],
        extension
      );
      return `import { ${componentName} } from '${packageName}';`;
    }
    return componentPath;
  },
  // By default, Styleguidist will watch the common parent directory of all
  // the component files discovered to know when to recompile. In cases where
  // components come from node_modules (like `htz-components`), this ends up
  // causing unnecessary recompiles and extremely slow builds, because that ends
  // up being the `packages` directory. So force a more focused subset of
  // directories here.
  contextDependencies: [
    path.join(process.cwd(), 'components'),
    path.join(process.cwd(), 'src', 'components'),
    path.join(
      process.cwd(),
      'node_modules',
      '@haaretz',
      'htz-components',
      'src'
    )
  ],
  styleguideDir: path.join(process.cwd(), 'dist', 'styleguide'),
  // Ideally, we'd be able to use Next's webpack config, so everything works
  // the same when used in a Next app, but they don't expose it.
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: require('./babel')
        }
      ]
    }
  }
};
