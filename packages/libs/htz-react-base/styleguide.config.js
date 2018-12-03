/* eslint-disable global-require, import/no-dynamic-require */

const path = require('path');
const resolveFrom = require('resolve-from');
const config = require('config');
const webpack = require('webpack');
const serialize = require('serialize-javascript');

const emptyShim = require.resolve('./webpack/configShim');

const color = {
  bg: '#EBF2F5',
  bgDark: '#E6EDF0',
  border: '#666',
  danger: '#A8001C',
  primaryLight: '#289DD3',
  primary: '#0B7EB5',
  primaryDark: '#006B96',
  secondary: '#00537A',
  secondaryDark: '#003D59',
};

const Wrapper = resolveFrom.silent(
  process.cwd(),
  './styleguide/StyleGuideProvider.js'
);

const defaultIgnore = [
  '**/__tests__/**',
  '**/*.test.{js,jsx,ts,tsx}',
  '**/*.spec.{js,jsx,ts,tsx}',
  '**/*.d.ts',
];
/*
  The following ignore attempts to remedy some components that are spamming with the following warning:
  Warning: matches a pattern defined in “components” or “sections” options in your style guide config
  but doesn’t export a component.
  It usually happens when using third-party libraries, see possible solutions here:
  https://react-styleguidist.js.org/docs/thirdparties.html
*/
const additionalIgnore = [
  '**/Animations/Ripple.js',
  '**/ArticleImage/ArticleImage.js',
  '**/AutoLevels/LevelContext.js',
  '**/Note/Note.js',
  '**/User/CheckEmailExists.js',
  '**/RadioButton/RadioButtonPropType.js',
  '**/Image/Picture.js',
  '**/Credit/Credit.js',
  '**/RadioButton/RadioButtonPropType.js',
  '**/Image/Picture.js',
  '**/Credit/Credit.js',
];
/*
  TODO the following ignores are problems to be rectified
   Error: [{type: ImportSpecifier, start: 276, end: 295, loc: [object Object],
    imported: [object Object], importKind: null, local: [object Object],
     leadingComments: null, id: null, name: null}] does not match type Printable
    It usually means that react-docgen does not understand your source code, try to file an issue here:
    https://github.com/reactjs/react-docgen/issues
*/
const errorsIgnore = [ '**/RadioButton/RadioGroup.js', ];

module.exports = {
  components: path.join(process.cwd(), '{,src/}components/**/[A-Z]*.{js,jsx}'),
  ignore: [ ...defaultIgnore, ...additionalIgnore, ...errorsIgnore, ],
  title: 'Haaretz Components',
  usageMode: 'expand',
  exampleMode: 'collapse',

  editorConfig: {
    theme: 'monokai',
  },

  theme: {
    borderRadius: 0,
    maxWidth: '100%',
    sidebarWidth: 260,
    color: {
      link: color.primary,
      linkHover: color.secondary,
      sidebarBackground: color.secondary,
    },
    fontFamily: {
      base: [ '"Open Sans Hebrew"', 'sans-serif', ],
    },
  },
  styles: {
    StyleGuide: {
      root: {
        color: 'inherit',
        '& main>section>section': {
          marginBottom: '12rem',
        },
        '& main>section>section>section': {
          marginBottom: '4rem',
        },
      },
      sidebar: {
        '&::-webkit-scrollbar': {
          width: 12,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: color.secondary,
        },
        '&::-webkit-scrollbar-thumb': {
          border: `4px solid ${color.secondary}`,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          backgroundColor: color.primaryDark,
          '&:active': {
            borderLeftWidth: 2,
            borderWightWidth: 2,
          },
        },
      },
      logo: {
        border: 'none',
        paddingBottm: 0,
        backgroundColor: color.secondaryDark,
      },
    },

    Logo: {
      logo: {
        color: '#fff',
        fontWeight: 700,
        fontSize: '18px',
      },
    },

    TableOfContents: {
      input: {
        backgroundColor: 'transparent',
        border: '1px solid #fff',
        color: '#fff',
        padding: 'calc(.5rem - 1px) 1rem',
        opacity: 0.4,

        '&::-webkit-input-placeholder': {
          opacity: 1,
          color: 'rgba(255, 255, 255, 0.7)',
        },
        '&::placeholder': {
          opacity: 1,
          color: 'rgba(255, 255, 255, 0.7)',
        },

        '&:hover': {
          opacity: 0.7,
        },

        '&:focus': {
          opacity: 1,
          border: '1px solid #fff',
          outline: 'none',
        },
      },
    },

    ComponentsList: {
      heading: {
        color: '#fff !important',
        fontSize: '16px',
        fontWeight: '700 !important',
        textTransform: 'uppercase !important',
      },
      list: {
        '& ul ul': {
          paddingLeft: 0,
          fontSize: '12px !important',
        },
      },
      item: {
        color: 'rgba(255, 255, 255, .75) !important',
        fontSize: '12px',
        marginBottom: '2rem',
        textTransform: 'none',
        margin: 0,

        '& > a': {
          color: 'inherit !important',
          '&:hover': {
            color: '#fff !important',
            textDecoration: 'underline',
          },
          '&:focus': {
            color: '#fff !important',
            outline: 'none',
            textDecoration: 'underline',
          },
        },
      },

      link: {
        color: 'inherit !important',
        '&:hover': {
          color: '#fff !important',
          textDecoration: 'underline',
        },
        '&:focus': {
          color: '#fff !important',
          outline: 'none',
          textDecoration: 'underline',
        },
      },

      isChild: {
        marginBottom: 0,
      },
    },

    Heading: {
      fontWeight: '700 !important',

      sectionName: {
        '&:hover': {
          textDecoration: 'none !important',
        },
      },

      heading1: {
        fontSize: '5rem',
        marginBottom: '3rem',
        textTransform: 'uppercase',
        '&:hover': {
          fontSize: '5rem',
          marginBottom: '3rem',
          textTransform: 'uppercase',
        },
      },
      heading2: {
        fontSize: '4rem',
        marginBottom: 0,
        paddingBottom: '2rem',
        position: 'relative',
        '&:hover': {
          fontSize: '4rem',
          marginBottom: '0rem',
          paddingBottom: '2rem',
          position: 'relative',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '0',
          left: '0',
          height: '1rem',
          width: '20rem',
          backgroundColor: color.primary,
        },
      },
      heading3: {
        fontSize: '3rem !important',
        '&:hover': {
          fontSize: '3rem !important',
        },
      },
    },

    ReactComponent: {
      header: {
        marginBottom: '2rem',

        '& h3': {
          marginBottom: '0 !important',
        },
      },

      docs: {
        '& p': {
          marginBottom: '2rem',
        },
      },
      tabButtons: {
        marginTop: '2rem',
        marginBottom: '1rem',

        '& button': {
          borderBottom: `1px solid ${color.primary}`,
          cursor: 'pointer',
          paddingRight: '3rem',
        },
      },
    },

    Table: {
      table: {
        fontFamily: 'monospace',
        maxWidth: '1000px',
        backgroundColor: color.bg,
      },
      tableHead: {
        backgroundColor: color.bgDark,
      },
      cellHeading: {
        border: '1px solid #ddd',
        padding: '.5rem 2rem !important',
      },
      cell: {
        border: '1px solid #ddd',
        fontSize: '12px',
        padding: '.5rem 2rem !important',
      },
    },

    Markdown: {
      h3: {
        display: 'inline-block',
        fontSize: '1em',
        marginTop: '2rem',
        marginBottom: '1rem',
        borderBottom: `1px solid ${color.primary}`,
        paddingRight: '3rem',
      },
      code: {
        backgroundColor: color.bg,
        borderRadius: '4px',
        fontSize: '14px',
        padding: '.5rem 1rem',
      },
      pre: {
        backgroundColor: color.bg,
        border: 0,
        borderRadius: '4px',
        fontSize: '14px',
      },
      para: {
        maxWidth: '700px',
      },
      table: {
        maxWidth: '1000px',
        backgroundColor: color.bg,
      },
      thead: {
        backgroundColor: color.bgDark,
      },
      td: {
        fontFamily: 'monospace',
        border: '1px solid #ddd',
        fontSize: '12px',
        padding: '.5rem 2rem',

        '& > code': {
          fontSize: '12px',
          backgroundColor: '#dedede',
          borderRadius: '4px',
          padding: '0 .5rem',
        },
      },
      th: {
        fontFamily: 'monospace',
        border: '1px solid #ddd',
        fontSize: '12px',
        padding: '.5rem 2rem',
      },
      a: {
        color: color.primary,
        '&:hover': {
          color: `${color.primary} !important`,
        },
        '&:focus': {
          color: color.primary,
        },
      },
    },

    Playground: {
      preview: {
        /* Make component views resizeable */
        margin: '0 auto',
        overflow: 'hidden',
        resize: 'horizontal',

        /* Make styleguide syles less obtrusive */
        border: 'none',
        borderBottom: '1px solid #e8e8e8',
        padding: '0 0 4rem',
      },
    },
  },

  // Styleguidist sends webpack this option in such a way that it errors out
  // if one of the values is null or undefined, so we can't just use the raw
  // value of `Wrapper`. Instead, exclude `Wrapper` altogether if it's null.
  styleguideComponents: Wrapper ? { Wrapper, } : {},
  getComponentPathLine(componentPath) {
    // Styleguidist will show a `componentPath` relative to the config file,
    // which is not what we want when using the default config.
    if (componentPath.indexOf('..') === 1) {
      // eslint-disable-next-line no-param-reassign
      componentPath =
        resolveFrom.silent(__dirname, componentPath) || componentPath;
    }
    // eslint-disable-next-line no-param-reassign
    componentPath = path.relative(process.cwd(), componentPath);
    const pathSegments = componentPath.split(path.sep);
    // If the component is coming from another module, render an `import`
    // statement rather than the file path. This makes a big assumption, which
    // is that any component can be imported from that module's `main` entry
    // point as a named export matching the name of the file.
    if (pathSegments[1] === 'node_modules') {
      const isScoped = pathSegments[2].startsWith('@');
      const packagePath = path.join(
        process.cwd(),
        ...pathSegments.slice(1, isScoped ? 3 : 2),
        'package.json'
      );
      const packageName = require(packagePath).name;
      const extension = path.extname(componentPath);
      const componentName = path.basename(
        pathSegments[pathSegments.length - 2],
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
  ],
  styleguideDir: path.join(process.cwd(), 'docs'),
  // Ideally, we'd be able to use Next's webpack config, so everything works
  // the same when used in a Next app, but they don't expose it.
  webpackConfig: {
    devServer: {
      allowedHosts: [ '.haaretz.co.il', '.haaretz.com', '.themarker.com', ],
    },
    resolve: {
      extensions: [ '.webpack.js', '.web.js', '.mjs', '.js', '.json', ],
      alias: {
        config$: require.resolve('./webpack/configShim'),
        // These shims are needed for bunyan (logging)
        'dtrace-provider': emptyShim,
        fs: emptyShim,
        'safe-json-stringify': emptyShim,
        mv: emptyShim,
        'source-map-support': emptyShim,
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [ ...require('./babel')().presets, 'next/babel', ],
            plugins: require('./babel')().plugins,
          },
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        // The only module that should be accessing this directly is
        // `./webpack/browserConfig` - this provides an easy way to get this
        // value into the shimmed `config` module.
        // NOTE: webpack already has support for stringifying an object value
        // provided here, but we want to make sure it serializes it the exact
        // same way that a real app will, using `serialize-javascript`.
        'window.__HTZ_DATA__': serialize({ config, }),
      }),
    ],
  },
};
