module.exports = {
  /* Extend airbnb's style-guide enforcement */
  extends: [ 'airbnb', 'plugin:flowtype/recommended', ],
  plugins: [ 'jsdoc', 'flowtype', ],
  parser: 'babel-eslint',
  settings: {
    flowType: {
      onlyFilesWithFlowAnnotation: true,
    },
  },

  rules: {
    'linebreak-style': 0,
    'brace-style': [ 2, 'stroustrup', { allowSingleLine: true, }, ],
    'function-paren-newline': 0,
    /* Warn about long line */
    'max-len': [
      'warn',
      {
        code: 100,
        comments: 110,
        tabWidth: 2,
        ignoreComments: false,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    /* Warn about use of console */
    'no-console': [ 'off', ],
    /* Warn about use of debugger */
    'no-debugger': [ 1, ],
    /* Allow nested ternaries */
    'no-nested-ternary': 0,
    /* Warn when declaring a variable with a name that already exists in the containing scope */
    'no-shadow': [ 1, ],
    /* Forbid referencing a variable before it is defined, but allow using declared functions */
    'no-use-before-define': [ 2, 'nofunc', ],
    /* Warn when referencing an undefined variable */
    'no-undef': [ 2, ],
    /* Forbid expressions that are never used */
    'no-unused-expressions': [
      2,
      { allowShortCircuit: true, allowTernary: true, },
    ],
    /* Throw when declaring a variable without using it */
    'no-unused-vars': [
      2,
      { vars: 'local', args: 'none', ignoreRestSiblings: true, },
    ],
    'no-warning-comments': [ 1, { terms: [ 'fixme', 'todo', ], location: 'start', }, ],
    'object-curly-newline': 0,
    'prefer-destructuring': 0,

    /* JSDoc rules */
    'jsdoc/check-param-names': 1,
    'jsdoc/check-tag-names': 0,
    'jsdoc/check-types': 0,
    'jsdoc/newline-after-description': 0,
    'jsdoc/require-description-complete-sentence': 0,
    'jsdoc/require-example': 0,
    'jsdoc/require-hyphen-before-param-description': 0,
    'jsdoc/require-param': 1,
    'jsdoc/require-param-description': 0,
    'jsdoc/require-param-type': 0,
    'jsdoc/require-returns-description': 0,
    'jsdoc/require-returns-type': 0,
    // 'valid-jsdoc': 0,
    // 'valid-jsdoc': [
    //   2,
    //   {
    //     requireReturn: false,
    //     requireParamDescription: false,
    //     requireReturnDescription: false,
    //   },
    // ],
    /* Opinionated comma dangling rules */
    'comma-dangle': [
      'error',
      {
        arrays: 'always',
        objects: 'always',
        imports: 'always',
        exports: 'always',
        functions: 'ignore',
      },
    ],
    /* Array brackets */
    'array-bracket-spacing': [ 'error', 'always', ],
    /* Arrow function rules */
    'arrow-parens': [ 'error', 'as-needed', ],
    /* disallow certain syntax forms */
    'no-restricted-syntax': [
      2,
      'DebuggerStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    /* Allow __HTZ_DATA__ name */
    'no-underscore-dangle': [ 'error', { allow: [ '__HTZ_DATA__', ], }, ],

    /* eslint/import related rules */
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: true,
      },
    ],
    // ensure imports point to files/modules that can be resolved
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
    'import/no-unresolved': [
      'error',
      { commonjs: true, caseSensitive: true, ignore: [ '^@haaretz/.*', ], },
    ],

    // Turn off checks on imported files' extensions, as it fails with internal monorepo
    // packages that are symlinked by Lerna and there is currently no 'ignore' option.
    // Once github.com/benmosher/eslint-plugin-import/pull/827 is merged, this rule can
    // be re-instated.
    'import/extensions': 'off',
    'import/prefer-default-export': 0,

    /* eslint/react related rules */
    'react/jsx-filename-extension': [ 1, { extensions: [ '.js', '.jsx', ], }, ],

    /* eslint/jsx-11y related rules */
    'jsx-a11y/anchor-is-valid': 0,

    // Flow-type rules
    'flowtype/space-after-type-colon': [
      'error',
      'always',
      { allowLineBreak: true, },
    ],
  },

  overrides: [
    {
      files: [ '**/__tests__/*.js', '*.test.js', ],
      plugins: [ 'jest', ],
      env: {
        jest: true,
      },
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            optionalDependencies: false,
            peerDependencies: true,
          },
        ],
      },
    },
    {
      files: [ 'styleguide.config.js', ],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            optionalDependencies: false,
            peerDependencies: true,
          },
        ],
      },
    },
    {
      files: [ '**/*.js', ],
      rules: {
        'global-require': 'off',
        'import/no-dynamic-require': 'off',
      },
    },
  ],
};
