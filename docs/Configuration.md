# Configuration

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Summary](#summary)
- [Motivation](#motivation)
  - [Objects vs. Environment Variables](#objects-vs-environment-variables)
  - [Global vs. Contextual](#global-vs-contextual)
- [Usage](#usage)
- [Overriding a connection preset](#overriding-a-connection-preset)
- [Secrets and Internal Values](#secrets-and-internal-values)
- [Browser Support](#browser-support)
- [Testing](#testing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Summary

- We use the popular [node-config][] module to load environment-specific
  configuration files and merge them into a single object. Modules anywhere
  in the dependency tree can simply `import config from 'config'` to read the
  resulting values.
- Since node-config is a server-side module (it reads files), in the browser we
  alias the `config` module to [a shim][shim] that has access to the serialized
  output of the real node-config. Note that all values in the resulting config
  are public information shipped with the client code (anyone can view the
  source to look at the config).
- Sensitive values (session secrets, database passwords, etc.) and server-only
  concerns should continue to be loaded via environment variables. These will
  not be public unless explicitly made so in the webpack config.

## Motivation

### Objects vs. Environment Variables

There are several reasons to use a more fully-featured solution like [node-config][]
rather than just supplying everything via environment variables:

- Environment variables are not typed, they are always strings. If you need to
  store a number, date, `null`, etc. in an environment variable, it needs to be
  parsed wherever you use it. Configuration files loaded from a format like JSON
  or JavaScript already have all the types you need.
- Environment variables don’t support any data structures like objects or arrays.
  It is inevitable that a configuration value will come along that can’t just be
  a flat scalar. Sometimes you need a list of tracking events, a list of links,
  a mapping of old URL patterns to new URL patterns… to name a few examples.
- It is clearer to say that configuration objects are always sent to the browser,
  while environment variables aren’t. This will hopefully prevent people from
  accidentally exposing secrets and other internal values.

### Global vs. Contextual

In React, the expectation is often that application-wide concerns (like a Redux
store, for example) are kept in a root provider component’s `context` and then
accessed elsewhere in the component tree via a Higher Order Component. This
provides relief from globals and circular dependencies, and makes testing those
components easier.

However, components are not the only code that needs access to the app
configuration. Server-side code (like the [Application Server][]), the Next.js
[Document][] class, and GraphQL resolvers are all examples of non-components
that will need access to configuration values. Application configuration is such
a broad and low-level concern that it might determine whether or not a particular
component is even defined in the first place. If configuration is entirely
React-based, then an additional solution is needed for these other scenarios.

That said, to make testing and demoing components under different application
configurations easier, nothing prevents one from writing components in a way that
accepts config values from `props`, then using a Higher Order Component that
provides access to the global `config` value. Tests and demos can then easily
pass different config values to the component. See the [Testing](#testing) section
for more possibilities.

## Usage

First, you should familiarize yourself with [how node-config works][node-config],
as this document only goes over the basics.

Packages that need access to configuration values – whether they are libraries
or apps – should add a production dependency on the `config` module:

```console
$ yarn add config
```

Then, just import `config` in whatever modules need it:

```js
import config from 'config';
```

Every config value is then accessible from the `config` object, although you
should prefer using the [`get()` and `has()` helper methods][node-config common usage]. The former will throw easier to debug errors when you try to access an
undefined value, and the latter will tell you if a property is defined first
without tedious checks and potential errors.

```js
// Check both config and browser support.
if (config.get('serviceWorker.enabled') && window.navigator.serviceWorker) {
  window.navigator.serviceWorker.register(...);
}
```

In its default configuration, node-config will look for config files in the
`config` folder of the current working directory. The exact files loaded and
merged depend on [various environment variables][node-config configuration files],
but the most basic setup looks like:

```
config
└── default.js
```

If you are writing a reusable library, it’s likely the above is all you need,
because the configuration will only be used for your package’s tests and
styleguide (or any other demo). There is usually no need to supply a production
configuration in a library, because when it is imported by an app, that package’s
own configuration will be used.

**You should document any config properties that your modules use, so that
consumers know what values their configuration must define.**

If you want to run tests with some values, but see other values in the styleguide,
you could have:

```
config
├── development.js
└── test.js
```

The loaded config will be based on the `NODE_ENV` environment variable, which is
`development` by default, and `test` when running the test suite. If the
`development` and `test` configs share a lot of the same values, then you can
additionally have `config/default.js`, and the environment configs will contain
only overrides. See the node-config [Configuration Files][node-config configuration files] docs for more details.

In an app package, you might have even more scenarios:

```
config
├── default.js
├── development.js
├── production.js
└── test.js
```

Note that config values should not change during the execution of an application,
only over the lifetime of multiple deployments! In a running app, they should be
considered frozen. If you need changing values while the application is running,
you should use _state_, not configuration (although the initial value could be
supplied by the config).

## Overriding a connection preset

Some scenarios, requires you to run your app from one environment, but have it
connect to another (i.e. a staging environment that connects to production);
For this matter, a `local.js` configuration will inspect a provided environment
variable called `CONNECTION_PRESET` which can take the following values:
`dev`, `stage` and `prod`. This will start the application with another
connection preset.

## Secrets and Internal Values

Some configuration values should be kept secure (like session secrets, database
passwords, etc.), and others are just unnecessary to ship alongside the
application code (like configurable absolute file paths, internal IP addresses
and port numbers, etc.). Since these are almost always just simple strings, and
they should be harder to add to the Git repository by mistake, they should be kept
in environment variables. Setting these variables can be part of the deployment
process, or they can be loaded via [dotenv][], which the Application Server will
use automatically. The Git repository will ignore `.env` files by default.

## Browser Support

Browser support for the `config` module is supplied by [a shim module][shim] that
we load using webpack’s [resolve.alias][] feature. This shim module loads the
configuration object from the `config` property on the `window.__HTZ_DATA__`
global. But how does this global get defined?

Since only the real server-side version of node-config can perform the correct
file lookup and merging procedure, we need a way to serialize the final object
it generates and send it to the browser. There are multiple ways to accomplish
this:

- For apps, the [custom Document class][haaretzdocument], which only runs
  server-side, renders a `<script>` tag that sets `__HTZ_DATA__`. This makes
  it very easy to inspect the page to see what configuration is supplied (as
  opposed to digging around in the generated bundle).
- For component styleguides, since there may not be any server-side logic to
  override, it is defined in [the webpack config][styleguide.config.js].

## Testing

It may be necessary to test pieces of code under multiple configuration
scenarios. There are a few different ways to approach this:

- Mock the `config` module using Jest’s [Manual Mocks][] or the [moduleNameMapper][]
  option (the documentation there conveniently uses the `config` module as an
  example).
- Mutate the returned configuration into the desired state directly in each test,
  before the code using it is executed.
- For components, use a `config` prop that defaults to the global config, but
  can be overridden for tests. Or, supply it via a Higher Order Component.
- The crudest option: run your test suite multiple times with different `NODE_ENV`,
  `NODE_CONFIG`, or `--NODE_CONFIG` settings.

[node-config]: https://github.com/lorenwest/node-config
[node-config configuration files]: https://github.com/lorenwest/node-config/wiki/Configuration-Files
[node-config common usage]: https://github.com/lorenwest/node-config/wiki/Common-Usage
[dotenv]: https://www.npmjs.com/package/dotenv
[application server]: https://github.com/Haaretz/htz-frontend/blob/master/docs/SystemOverview.md#application-server
[document]: https://github.com/zeit/next.js#custom-document
[shim]: ../packages/libs/htz-react-base/webpack/configShim.js
[resolve.alias]: https://webpack.js.org/configuration/resolve/#resolve-alias
[haaretzdocument]: ../packages/components/htz-components/src/document.js
[styleguide.config.js]: ../packages/libs/htz-react-base/styleguide.config.js
[manual mocks]: https://facebook.github.io/jest/docs/en/manual-mocks.html
[modulenamemapper]: https://facebook.github.io/jest/docs/en/webpack.html#a-webpack-example
