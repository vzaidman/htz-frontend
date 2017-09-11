# FAQ

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Development](#development)
  - [Why aren’t my changes in one package being picked up in another?](#why-arent-my-changes-in-one-package-being-picked-up-in-another)
  - [Why is my package running old versions of the `htz-scripts` tasks?](#why-is-my-package-running-old-versions-of-the-htz-scripts-tasks)
  - [How do I see what code the Application Server is actually running?](#how-do-i-see-what-code-the-application-server-is-actually-running)
  - [How do I see the configuration for Babel, webpack, Jest, ESLint, etc.?](#how-do-i-see-the-configuration-for-babel-webpack-jest-eslint-etc)
  - [Why does it take so long to change pages in development?](#why-does-it-take-so-long-to-change-pages-in-development)
  - [How can I easily run the server on a different port?](#how-can-i-easily-run-the-server-on-a-different-port)
  - [Why isn’t my component appearing in the styleguide?](#why-isnt-my-component-appearing-in-the-styleguide)
  - [Why does my code build correctly, but Jest still encounters a syntax error?](#why-does-my-code-build-correctly-but-jest-still-encounters-a-syntax-error)
- [React](#react)
  - [How can I inspect the props and state of React components?](#how-can-i-inspect-the-props-and-state-of-react-components)
  - [Why is the Highlight Updates option highlighting my component?](#why-is-the-highlight-updates-option-highlighting-my-component)
  - [Is it bad to use stateful components and `setState()`?](#is-it-bad-to-use-stateful-components-and-setstate)
- [State Management](#state-management)
  - [Why isn’t there a Redux store with actions, reducers, etc.?](#why-isnt-there-a-redux-store-with-actions-reducers-etc)
  - [How can I inspect what Apollo is doing?](#how-can-i-inspect-what-apollo-is-doing)
- [GraphQL](#graphql)
  - [How does the Page schema change depending on the page type?](#how-does-the-page-schema-change-depending-on-the-page-type)
  - [How can I test out GraphQL queries?](#how-can-i-test-out-graphql-queries)
  - [How do I represent an object with arbitrary keys and values in the schema?](#how-do-i-represent-an-object-with-arbitrary-keys-and-values-in-the-schema)
- [Miscellaneous](#miscellaneous)
  - [Why do I get an error when trying to return an object from `getInitialProps`?](#why-do-i-get-an-error-when-trying-to-return-an-object-from-getinitialprops)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Development

### Why aren’t my changes in one package being picked up in another?

Even if you have a dependency like `htz-components` symlinked in `node_modules`,
you still might not be importing the latest code from the symlinked package.

This is because regardless of symlinks, import resolution follows the `main`,
`module`, or `esnext` fields in `package.json` in order to find which files to
load. None of these point to the actual source files (usually under `src`). You
must `build` the changed package, even if it is symlinked.

### Why is my package running old versions of the `htz-scripts` tasks?

There are two possibilities:

* The version of `@haaretz/htz-react-base` in your package’s `devDependencies`
  does not align with the version under [packages/libs/htz-react-base][htz-react-base],
  so Lerna has not symlinked it, but installed the matching version from the npm
  registry instead.
* You’ve run `yarn install` in your package instead of `yarn run bootstrap` from
  the repository root, and it doesn’t perform any symlinking, but installs the
  matching version from the npm registry instead.

### How do I see what code the Application Server is actually running?

You may have noticed that files like `server.js` are written using natively
supported Node.js syntax and CommonJS modules, but the server is clearly running
code that uses ES Modules, JSX, and other syntax. How is it doing this?

If you’ve run the `dev` command, Next.js has automatically built your source
files into Node.js-runnable files. The Application Server is running transpiled
versions of your files from `.next/dist`, or in some cases has performed in-memory
transpilation.

The same is true for the production `start` command, except you must manually
run the `build` command beforehand, and it is all written to disk. Check the
`.next/dist` directory to see what code is actually running.

### How do I see the configuration for Babel, webpack, Jest, ESLint, etc.?

If you are developing an app, most of the Babel and webpack configuration is
handled by Next.js, and you can explore its [`server/build` directory][Next.js
server/build] to find the appropriate file.

In the case of a component library or other module, the configuration files are
found in the [`htz-react-base`][htz-react-base] package. You can always check
what configuration path the relevant `htz-scripts` command is passing to the
underlying program by looking at its source in the [scripts directory][htz-react-base
scripts].

In the case of Jest, a configuration object is [created directly in the `test`
script][test script].

### Why does it take so long to change pages in development?

In development, the multiple webpack bundles created by Next.js are built
on-demand, when your browser requests them. If you browse to a page that
requires a bundle you haven’t downloaded yet, you’ll have to wait for it to
build while the page loads. In production, all the bundles are pre-built, so
you won’t see this delay.

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

## React

### How can I inspect the props and state of React components?

Install the [React Developer Tools][React devtools] and find the component in
the tree. Note that if you are inspecting components in production, the names
of components will be shortened due to minification.

### Why is the Highlight Updates option highlighting my component?

The [Highlight Updates][] option in the React Developer Tools shows when React
is *checking* whether a component should update, so your component may be
highlighted even if its `shouldComponentUpdate` method returns `false`.

### Is it bad to use stateful components and `setState()`?

No, and often it is the only solution that makes sense. If a piece of state is
primarily related to the user’s interaction with that component’s UI, or the
component needs to remember something from one render to the next, or it is
a very localized concern to that part of the component tree, it is probably a
fine use case for a stateful component.

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

### How can I inspect what Apollo is doing?

Install the [Apollo Client Developer Tools][Apollo devtools] and browse through
the Queries, Mutations, and Store tabs.

If the Apollo panel seems to have trouble connecting or showing the correct
information, try closing and reopening the browser’s Developer Tools once the
page has loaded.

## GraphQL

### How does the Page schema change depending on the page type?

It doesn’t. A single GraphQL schema is used that supports every page type, even
when different page types have different slots. In the GraphQL schema, a page’s
slots aren’t predefined – the `slots` field simply returns a list of all the slots
that a page happens to have (returned by the Page API).

### How can I test out GraphQL queries?

Install the [Apollo Client Developer Tools][Apollo devtools] and select the
GraphiQL tab.

### How do I represent an object with arbitrary keys and values in the schema?

Objects without predefined fields (“Indexable Types” in TypeScript terms) are
not supported in GraphQL schemas and you will need to find another way to
represent your type. You can:

* Make the field retrieve one key at a time by accepting a key name as an
  argument, then using that argument when accessing the source object in the
  resolver. You’ll still be able to retrieve multiple keys in a single query
  using [aliases][GraphQL aliases].
* Make the field type a list of objects, where the object type includes a field
  for the key name.
* Make the field a JSON scalar using [graphql-type-json][]. You won’t be able to
  choose which fields of the JSON object to retrieve (the entire object will
  always be returned), but sometimes this is not a problem.

The last approach is used by Content type’s `properties` field to collect
the many possible fields seen on different types of content elements.

## Miscellaneous

### Why do I get an error when trying to return an object from `getInitialProps`?

In general, the props returned from `getInitialProps` should be serializable to
JSON, because they will be sent in the initial HTML and used to recreate the
component tree on the client. You might instead return a plain JavaScript object,
then recreate whatever class instance you need in the page’s `constructor`.


[htz-react-base]: https://github.com/Haaretz/htz-frontend/tree/master/packages/libs/htz-react-base
[htz-react-base scripts]: https://github.com/Haaretz/htz-frontend/tree/master/packages/libs/htz-react-base/scripts
[Recompose withState]: https://github.com/acdlite/recompose#lift-state-into-functional-wrappers
[test script]: https://github.com/Haaretz/htz-frontend/blob/master/packages/libs/htz-react-base/scripts/test.js
[Next.js server/build]: https://github.com/zeit/next.js/tree/master/server/build
[dotenv]: https://www.npmjs.com/package/dotenv
[dotenv sample]: https://github.com/Haaretz/htz-frontend/blob/master/packages/apps/haaretz.co.il/.env.sample
[Styleguidist components]: https://react-styleguidist.js.org/docs/components.html
[React devtools]: https://github.com/facebook/react-devtools
[Apollo devtools]: https://github.com/apollographql/apollo-client-devtools
[graphql-type-json]: https://github.com/taion/graphql-type-json
[GraphQL aliases]: http://graphql.org/learn/queries/#aliases
[Highlight Updates]: https://github.com/facebook/react-devtools#does-highlight-updates-trace-renders
