# htz-frontend

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Packages](#packages)
- [Documentation](#documentation)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Setup](#setup)
- [Scripts](#scripts)
  - [bootstrap](#bootstrap)
  - [clean](#clean)
  - [docs](#docs)
  - [format](#format)
  - [lint](#lint)
  - [sync](#sync)
  - [update](#update)
- [Developer Tools](#developer-tools)
  - [React Developer Tools](#react-developer-tools)
  - [Apollo Client Developer Tools](#apollo-client-developer-tools)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Packages

These packages are managed with [Lerna](https://lernajs.io/) and organized like so:

* [Apps](packages/apps) – React-powered sites.
  * [haaretz.co.il](packages/apps/haaretz.co.il) – Site app for the Hebrew edition of Haaretz.
* [Components](packages/components) – Collections of React components.
  * [htz-components](packages/components/htz-components) – Components and other shared parts.
* [Libraries](packages/libs) – Helpers, utilities, and any other shared code.
  * [htz-react-base](packages/libs/htz-react-base) – Development helpers.

## Documentation

* For help with individual packages, use the links to those packages above.
* For general documentation, see [docs/README.md](docs/README.md).

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

Interdependent packages managed in the same monorepo will be symlinked.

Then work on whichever package(s) you like:

```console
$ cd packages/components/htz-components
$ yarn run styleguide
```

## Scripts

These are found in [package.json](package.json) and may be run with `yarn run <script>`
or `npm run <script>`.

### bootstrap

Run `clean`, then install the dependencies for each package, and symlink any
package found in the `packages` directory if the dependency version matches.

### clean

Remove the `node_modules` directory, built distribution files, and Jest cache
directory for each package.

### docs

Add or update the *Table of Contents* section in any Markdown file with section
headings. For best results, move the primary document heading and description
to just before the generated table of contents (before `<!-- START doctoc -->`).

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
