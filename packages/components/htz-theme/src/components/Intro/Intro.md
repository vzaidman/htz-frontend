Haaretz applications use [Fela](https://fela.js.org) for styling components, and this package is 
designed to integrate with that workflow, specifically through a `themeProvider`. While it is 
possible that `htz-theme` will work out of the box with other CSS-in-JS solutions, please take into 
account that your millage may vary.

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
* **bps** (`Object`) - An immutable [`MqOptions`](https://haaretz.github.io/htz-frontend/htz-css-tools#mqoptions)
  object with breakpoint definitions
  * `bps.widths` (`Object`) - An immutable [`WidthBpsConfig`](https://haaretz.github.io/htz-frontend/htz-css-tools#widthbpsconfig)
    object with values of boundary points between named width-breakpoints
  * `bps.misc` (`Object`) - An immutable [`MiscBpsConfig`](https://haaretz.github.io/htz-frontend/htz-css-tools#miscbpsconfig)
    object with values named miscellaneous media-features media queries
* **btnStyle** (`object`) - An immutable object with button style definitions
  * `btnStyle.borderWidth` (`number`) - The width of a button's outline, in pixels
  * `btnStyle.borderStyle` (`string`) - The `border-style` of a button's outline
  * `btnStyle.radius` (`number`) - A button's `border-radius`, in pixels.
* **fontStacks** (`Object`) - An object containing font-family stacks for different use cases
* **direction** (`rtl`) - The application's flow direction
* **gridStyle** (`Object`) - An immutable object containing grid related style definitions.
  * `gridStyle.gutterWidth` (`number`) - The default width of the gutter between grid items
  * `gridStyle.ruleWidth` (`number`) - The default width of a vertical rule separating two grid items.
  * `gridStyle.ruleWidth` (`string[]`) - The default color of a vertical rule separating two grid items.
* **inputStyle** (`object`) - An immutable Object with input style definitions
  * `inputStyle.borderWidth` (`number`) - The width of an input's outline, in pixels
  * `inputStyle.borderStyle` (`string`) - The `border-style` of an input's outline
  * `inputStyle.radius` (`number`) - An input's `border-radius`, in pixels.
* **typeConf** (`Object`) - An immutable [`TypeConf`](https://haaretz.github.io/htz-frontend/htz-css-tools#typeconf)
  object per-breakpoint typographic and vertical-rhythm values

### Methods

* **color** - A [`colorGetter`](https://haaretz.github.io/htz-frontend/htz-css-tools#colorgetter)
  function for retrieving color values from the predefined color palette.
* **getTransition** - A function that returns an object of transition-related properties generated 
  based on the arguments passed to the function.

  * _Arguments_ (all optional, as long as at least one is present):  
    * `duration` (`number`) - The transition duration step.  
      duration steps start at `0`, with `0.25s`, which is generally considered
      the minimal time a person needs for completing the eye-movement towards the element
      and preserving the animation itself. The next step up, `1` is a very subtle increment
      of `50ms` to `0.3s`, for when the user's eye is expected to travel larger distances,
      when the animation is somewhat more complex. These two steps will usually be the
      adequate choice for micro-interactions. Each step above is a multiple of `0.25s`,
      e.g., `0.5s`, `0.75s`, etc. These maybe useful for more complex animations.  
      A `-1` step is available for nearly instantaneous transitions that are 1 frame in
      a 60fps budget (~`0.166666s`).

    * `easing` ('linear'|'swiftIn'|'swiftOut'|'easeIn'|'easeOut'|'easeInOut') - A named 
      timing-function describing how the intermediate values of the CSS properties
      being affected by a transition effect are calculated.

    * `delay` (`number`) - The transition delay step. Uses the same steps as `duration` to determine 
      the amount of delay before a transition is initiated.

* **getDuration** - A function that returns an object of animation or transition duration-related
  properties generated based on the arguments passed to the function.

  * _Arguments_:  
    * `type` (`'animation'|'transition'`) - Indicates if the duration is applied to an `animation` 
      or a `transition`.

    * `duration` (`number`) - A duration step.  
      duration steps start at `0`, with `0.25s`, which is generally considered
      the minimal time a person needs for completing the eye-movement towards the element
      and preserving the animation itself. The next step up, `1` is a very subtle increment
      of `50ms` to `0.3s`, for when the user's eye is expected to travel larger distances,
      when the animation is somewhat more complex. These two steps will usually be the
      adequate choice for micro-interactions. Each step above is a multiple of `0.25s`,
      e.g., `0.5s`, `0.75s`, etc. These maybe useful for more complex animations.  
      A `-1` step is available for nearly instantaneous transitions that are 1 frame in
      a 60fps budget (~`0.166666s`).

* **getDelay** - A function that returns an object of animation or transition delay-related
  properties, generated based on the arguments passed to the function.

  * _Arguments_:  
    * `type` (`'animation'|'transition'`) - Indicates if the duration is applied to an `animation` 
      or a `transition`.

    * `delay` (`number`) - A delay step.  
      delay steps start at `0`, with `0.25s`, which is generally considered
      the minimal time a person needs for completing the eye-movement towards the element
      and preserving the animation itself. The next step up, `1` is a very subtle increment
      of `50ms` to `0.3s`, for when the user's eye is expected to travel larger distances,
      when the animation is somewhat more complex. These two steps will usually be the
      adequate choice for micro-interactions. Each step above is a multiple of `0.25s`,
      e.g., `0.5s`, `0.75s`, etc. These maybe useful for more complex animations.  
      A `-1` step is available for nearly instantaneous transitions that are 1 frame in
      a 60fps budget (~`0.166666s`).

* **getTimingFunction** - return an object with a precunfigured timing-function for a 
   transition or animation takes a `type` (`'animation'`|`'transition'`) argument and an 
   `easing` argument (`string`) that is a named timing-function.
* **getMqString** - A function that intelligently returns a media-query string
  based on breakpoints defined in `theme.bps`
* **mq** - A [media-query function](https://haaretz.github.io/htz-frontend/htz-css-tools/#mqfunc),
  which intelligently returns a media-query scoped css-in-js object based on breakpoints defined 
  in `theme.bps`
* **pxToRem** - A function that 
  [converts px values to rem](https://haaretz.github.io/htz-frontend/htz-css-tools#remfunctiontype)
  at given breakpoints while accounting to changes in vertical rhythm
* **type** - A [Typesetter](https://haaretz.github.io/htz-frontend/htz-css-tools#typesetter)
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

```js
<MethodsAndProperties />
```
