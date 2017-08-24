# htz-frontend

## Haaretz Frontend Modules

These packages are managed with [Lerna](https://lernajs.io/).

* [htz-react-base](packages/htz-react-base) – Development helpers.
* [htz-components](packages/htz-components) – Components and other shared parts.

## Getting Started

Clone this repo:

```shell
$ git@github.com:Haaretz/htz-frontend.git
$ cd htz-frontend
```

Use [Yarn](https://yarnpkg.com/) to install Lerna:

```shell
$ yarn
```

Now use Lerna to set up the managed packages:

```shell
$ lerna bootstrap
```

Interdependent projects managed in the same monorepo will be symlinked.

Then work on whichever package(s) you like:

```shell
$ cd packages/htz-components
$ yarn run styleguide
```
