# FAQ

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Development](#development)
  - [Why aren’t my changes in one package being picked up in another?](#why-arent-my-changes-in-one-package-being-picked-up-in-another)
  - [Why is my package running old versions of the `htz-scripts` tasks?](#why-is-my-package-running-old-versions-of-the-htz-scripts-tasks)
  - [How do I see what code the Application Server is actually running?](#how-do-i-see-what-code-the-application-server-is-actually-running)
  - [How do I see the Babel, webpack, Jest, ESLint, etc. configuration?](#how-do-i-see-the-babel-webpack-jest-eslint-etc-configuration)
  - [Why does it take so long to change pages in development?](#why-does-it-take-so-long-to-change-pages-in-development)
  - [How can I easily run the server on a different port?](#how-can-i-easily-run-the-server-on-a-different-port)
  - [Why isn’t my component appearing in the styleguide?](#why-isnt-my-component-appearing-in-the-styleguide)
  - [Why does my code build correctly, but Jest still encounters a syntax error?](#why-does-my-code-build-correctly-but-jest-still-encounters-a-syntax-error)
- [State Management](#state-management)
  - [Why isn’t there a Redux store with actions, reducers, etc.?](#why-isnt-there-a-redux-store-with-actions-reducers-etc)
- [GraphQL](#graphql)
  - [How does the Page schema change depending on the page type?](#how-does-the-page-schema-change-depending-on-the-page-type)
- [Miscellaneous](#miscellaneous)
  - [Why do I get an error when trying to return an object from `getInitialProps`?](#why-do-i-get-an-error-when-trying-to-return-an-object-from-getinitialprops)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Development

### Why aren’t my changes in one package being picked up in another?

Even if you have a dependency like `htz-components` symlinked under `node_modules`,
your code still might not be importing the latest source files in the symlinked
package.

This is because regardless of symlinks, import resolution follows the `main`,
`module`, or `esnext` fields in `package.json` in order to find which files to
load. None of these point to the actual source files (usually under `src`). You
must `build` the changed package, even if it is symlinked.

### Why is my package running old versions of the `htz-scripts` tasks?

There are two possibilities:

* The version of `@haaretz/htz-react-base` in your package’s `devDependencies`
  does not align with the version under [packages/libs/htz-react-base][htz-react-base],
  so Lerna has not symlinked it, but installed the matching version from the npm
  registry.
* You’ve run `yarn install` in your package instead of `yarn run bootstrap` from
  the repository root, and it doesn’t perform any symlinking, but uses the matching
  version from the npm registry.

### How do I see what code the Application Server is actually running?

You may have noticed that files like `server.js` are written using natively
supported Node.js syntax and CommonJS modules, but the server is clearly running
code that uses ES Modules, JSX, and other syntax. How is it doing this?

If you’ve run the `dev` command, Next.js has automatically built your source
files into Node.js-runnable files. The Application Server is running transpiled
versions of your files from `.next/dist`, or in some cases has performed in-memory
transpilation.

The same is true for the production `start` command, except you must manually
run the `build` command beforehand to run the latest version of your code, and
it is all written to disk. Check the `.next/dist` directory to see what code
is actually running.

### How do I see the Babel, webpack, Jest, ESLint, etc. configuration?

If you are developing an app, most of the Babel and webpack configuration is
handled by Next.js, and you can explore its [`server/build` directory][Next.js
server/build] to find the appropriate configuration.

In the case of a component library or other module, the configuration files are
found in the [`htz-react-base`][htz-react-base] package. You can also check what
configuration path the `htz-scripts` command is passing to underlying program.

In the case of Jest, a configuration object is [created directly in the `test`
script][test script].

### Why does it take so long to change pages in development?

In development, the multiple webpack bundles created by Next.js are built
on-demand, when your browser requests them. If you browse to a page that
requires a bundle you haven’t downloaded yet, you’ll have to wait for it to be
built. In production, all the bundles are pre-built, so you won’t see this delay.

### How can I easily run the server on a different port?

The server reads its configuration using [dotenv][], so you can create a `.env`
file in the package, which Git should ignore. See the [sample .env file][dotenv
sample] for reference.

### Why isn’t my component appearing in the styleguide?

Your component must be under `/components` or `/src/components` (relative to
the package) and its filename must start with an uppercase letter.

If you want to find components in a different location, you may add a
`styleguide.config.js` file to the package and [configure it to locate
them][Styleguidist components].

### Why does my code build correctly, but Jest still encounters a syntax error?

You need a `.babelrc` file in your package for Jest to transpile the code correctly.
Some commands like `build` can just default to the correct Babel configuration, but
Jest requires `.babelrc`.

## State Management

### Why isn’t there a Redux store with actions, reducers, etc.?

A decision was made to start off without Redux in the code base, in order to
delegate all state data management duties to Apollo. This simplifies the question
of how to do certain things – if your data and actions can be described in GraphQL
queries and mutations, then consider adding them to the schema.

On the other hand, you may encounter certain complexities in the future that
necessitate a more low-level system like Redux. This is not a problem, it just
adds an extra way of doing things. You might also consider using the [`withState()`
and `withReducer()` functions from Recompose][Recompose withState]
instead of adopting Redux.

## GraphQL

### How does the Page schema change depending on the page type?

It doesn’t. A single GraphQL schema is used that supports every page type, even
when different page types have different slots. In the GraphQL schema, a page’s
slots aren’t predefined – the `slots` field simply returns a list of all the slots
that a page happens to have.

## Miscellaneous

### Why do I get an error when trying to return an object from `getInitialProps`?

In general, the props returned from `getInitialProps` should be serializable to
JSON, because they will be sent in the initial HTML and used to recreate the
component tree on the client. You might instead return a simple JavaScript object,
then recreate whatever class instance you need in the page’s `constructor`.


[htz-react-base]: https://github.com/Haaretz/htz-frontend/tree/master/packages/libs/htz-react-base
[Recompose withState]: https://github.com/acdlite/recompose#lift-state-into-functional-wrappers
[test script]: https://github.com/Haaretz/htz-frontend/blob/master/packages/libs/htz-react-base/scripts/test.js
[Next.js server/build]: https://github.com/zeit/next.js/tree/master/server/build
[dotenv]: https://www.npmjs.com/package/dotenv
[dotenv sample]: https://github.com/Haaretz/htz-frontend/blob/master/packages/apps/haaretz.co.il/.env.sample
[Styleguidist components]: https://react-styleguidist.js.org/docs/components.html
