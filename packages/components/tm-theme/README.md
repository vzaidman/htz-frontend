# [htz-theme](https://haaretz.github.io/htz-frontend/htz-theme)

Style theme for haaretz branded apps

Haaretz applications use [Fela](https://fela.js.org) for styling components, and this package is
designed to integrate with that workflow, specifically through a `themeProvider`. While it is
possible that `htz-theme` will work out of the box with other CSS-in-JS solutions, please take into
account that your millage may vary.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

* [Installation](#installation)
* [Usage](#usage)
  * [Properties](#properties)
  * [Methods](#methods)
* [cssReset](#cssreset)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```bash
yarn add @haaretz/htz-theme
```

or alternatively,

```bash
npm install --save @haaretz/htz-theme
```

## Usage

The default export of `@haaretz/htz-theme` is a theme object meant to be used for styling
UIs in line with Haaretz brand guidelines. It contains several methods and properties:

```js static
import htzTheme from '@haaretz/htz-theme'
```

### Properties

* `bps` (`Object`) - An immutable [`MqOptions`](https://haaretz.github.io/htz-frontend/htz-css-tools#mqoptions)
  object with breakpoint definitions
  * `bps.width` `(Object`) - An immutable [`WidthBpsConfig`](https://haaretz.github.io/htz-frontend/htz-css-tools#widthbpsconfig)
    object with values of boundary points between named width-breakpoints
  * bps.misc (Object) - An immutable [`MiscBpsConfig`](https://haaretz.github.io/htz-frontend/htz-css-tools#miscbpsconfig)
    object with values named miscellaneous media-features media queries
* `fontStacks` (`Object`) - An object containing font-family stacks for different use cases
* `direction` (`rtl`) - The application's flow direction
* `typeConf` (`Object`) - An immutable [`TypeConf`](https://haaretz.github.io/htz-frontend/htz-css-tools#typeconf)
  object per-breakpoint typographic and vertical-rhythm values

### Methods

* `color` - A [`colorGetter`](https://haaretz.github.io/htz-frontend/htz-css-tools#colorgetter)
  function for retrieving color values from the predefined color palette.
* `mq` - A [media-query function](https://haaretz.github.io/htz-frontend/htz-css-tools/#mqfunc),
  which intelligently returns a media-query scoped css-in-js object based on breakpoints defined
  in [`theme.bps`]()
* `pxToRem` - A function that
  [converts px values to rem](https://haaretz.github.io/htz-frontend/htz-css-tools#remfunctiontype)
  at given breakpoints while accounting to changes in vertical rhythm
* `type` - A [Typesetter](https://haaretz.github.io/htz-frontend/htz-css-tools#typesetter)
  function that returns a CSS-in-JS object of typographic styles conforming to a global predefined
  typographic scale and vertical rhythm

## cssReset

In addition to the default theme object, `htz-theme` also exports a secondary `cssReset` module,
which helps reset default user-agent styles and provide a clear canvas, so to speak, as a basis to
build upon.

```js static
import {cssReset} from '@haaretz/htz-theme';
```

`cssReset` is a css-like string that can be injected directly inside a `<style>`, either using
the Fela renderer's [`renderStatic()` method](https://github.com/rofrischmann/fela/blob/master/docs/api/fela/Renderer.md#renderstaticstyle-selector):

```js static
renderer.renderStatic(cssReset);
```
