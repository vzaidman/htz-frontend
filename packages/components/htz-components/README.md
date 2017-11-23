# htz-components
> Base components for use in any Haaretz app.

This package contains a set of reusable UI component for Haaretz apps, as well 
as some generic utilities and consumable prop-types.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Development](#development)
  - [Testing Fela Components](#testing-fela-components)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

This package provides the core UI framework for Haaretz Apps through a set of 
themeable React components using Fela as its styling layer.

In addition to the consumable UI components, this package also makes available 
some helper utils for use within Haaretz apps.

For a list of all components and utils offered by this package, either visit the 
[published styleguide](https://haaretz.github.io/htz-frontend/htz-components),
or run `yarn run styleguide` within this directory, to fire up a live-server 
containing all components in the current state of development.

Components source files reside in `./src/components/` and utils are in `./src/utils/`.

## Development

### Testing Fela Components

The `src/test-helpers/` dir contains pre-configured helpers for testing Fela 
components.

Use the `felaSnapshotter` util generate a JSON snapshot of Fela compnents.
In addition, the `felaEnzymeRenderer` util exports two methods:
1) `felaMount` - for mounting a Fela-styled component with Enzyme
2) `felaShallow` - for shallow rendering a Fela-styled component with Enzyme.

See Enzyme's APIs for [fully rendered (mounted) components](http://airbnb.io/enzyme/docs/api/mount.html) 
and [shallow-rendered components](http://airbnb.io/enzyme/docs/api/shallow.html).
