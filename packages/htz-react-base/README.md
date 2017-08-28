# htz-react-base

Encapsulated development scripts and dependencies for building React apps and
components.

## Installation

This module should be installed in `devDependencies`:

```console
$ yarn add -D @haaretz/htz-react-base
```

## Usage

Installing `htz-react-base` will make an `htz-scripts` executable available to
the consuming package, which can be run like so:

```console
$ ./node_modules/.bin/htz-scripts <command>
```

However, for ease of use, it is recommended to add scripts mirroring the
available `htz-scripts` commands to the `scripts` field of your `package.json`
file. Scripts run this way will automatically have `htz-scripts` in their
`$PATH`.

A helper command is provided to do this for you. Run this once (or when
`htz-react-base` is updated with new scripts), and you will henceforth be able
to use `yarn run <command>` or `npm run <command>` instead of running `htz-scripts`
directly:

```console
$ ./node_modules/.bin/htz-scripts update-scripts
```

Some commands accept arguments, which should be passed after the command name.
Note that if running via Yarn or npm `scripts`, you will need to add `--`
after the script name to add arguments, for example:

```console
$ yarn run test -- --verbose
```

## Commands

### build

Build production distributable files. For apps, this will involve running the
[Next.js](https://github.com/zeit/next.js) build process. For modules, this will
usually involve running Babel and/or webpack.

### format

Format code in the current directory with [Prettier](https://prettier.io/).
You should do this before opening any pull request that contains code, for
consistency.

### lint

Lint code in the current directory with [ESLint](https://eslint.org/). See
[eslint.js](eslint.js) for the default rules.

### styleguide

Run the styleguide development server, which renders previews and documentation
for components found in the package.

### styleguide:build

Build a production-ready page rendering the component styleguide for the module.
The output will be written to `dist/styleguide`.

### test

Run the package’s test suite with [Jest](https://facebook.github.io/jest/).

### update-scripts

Update the `scripts` field in `package.json` to contain aliases for `htz-scripts`
commands. Use `--no-overwrite` to avoid clobbering any existing scripts with the
same name.

## Development

Before opening a pull request for this package, make sure to run the `lint`,
`format`, and `test` scripts as necessary.

To add scripts to this module, place them in [/scripts](/scripts). The command
will be mapped to a file of the same name. Commands namespaced with a `:`
character are mapped to subdirectories. For example:

| Command | File                                       |
|---------|--------------------------------------------|
| foo     | `scripts/foo.js` or `scripts/foo/index.js` |
| foo:bar | `scripts/foo/bar.js`                       |
