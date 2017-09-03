# htz-frontend

## Haaretz Frontend Modules

These packages are managed with [Lerna](https://lernajs.io/) and organized like so:

* [Apps](packages/apps) – React-powered sites.
  * [haaretz.co.il](packages/apps/haaretz.co.il) – Site app for the Hebrew edition of Haaretz.
* [Components](packages/components) – Collections of React components.
  * [htz-components](packages/components/htz-components) – Components and other shared parts.
* [Libraries](packages/libs) – Helpers, utilities, and any other shared code.
  * [htz-react-base](packages/libs/htz-react-base) – Development helpers.

## Getting Started

### Requirements

* [Node.js](https://nodejs.org/) 8.0.0 or higher.
* [Yarn](https://yarnpkg.com/en/docs/install) 0.27.0 or higher.

### Setup

Clone this repo:

```console
$ git@github.com:Haaretz/htz-frontend.git
$ cd htz-frontend
```

Use [Yarn](https://yarnpkg.com/) to install Lerna:

```console
$ yarn
```

Now use Lerna to set up the managed packages:

```console
$ yarn run bootstrap
```

Interdependent projects managed in the same monorepo will be symlinked.

Then work on whichever package(s) you like:

```console
$ cd packages/components/htz-components
$ yarn run styleguide
```

## Scripts

These are found in [package.json](package.json) and may be run with `yarn run <script>`
or `npm run run <script>`.

### bootstrap

Run `clean`, then install the dependencies for each package, and symlink any
package found in the `packages` directory if the dependency version matches.

### clean

Remove the `node_modules` directory, built distribution files, and Jest cache
directory for each package.

### format

Run the [format](packages/libs/htz-react-base#format) script in every package.

### lint

Run the [lint](packages/libs/htz-react-base#lint) script in every package.

### sync

Set the dependency versions for each matching package based on the `syncDependencies`
field of [package.json](package.json), in order to make across-the-board upgrades.

### update

Like `bootstrap`, but doesn’t `clean` first.

## Developer Tools

### [React Developer Tools](https://github.com/facebook/react-devtools)

Environments: [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi), [Firefox](https://addons.mozilla.org/firefox/addon/react-devtools/)

A panel for inspecting the React component tree.

### [Apollo Client Developer Tools](https://github.com/apollographql/apollo-client-devtools)

Environments: [Chrome](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)

A panel for inspecting GraphQL queries and the store.
