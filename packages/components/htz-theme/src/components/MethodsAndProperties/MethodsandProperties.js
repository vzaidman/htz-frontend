import React from 'react';

export default function MethodsAndProperties() {
  return (
    <div>
      <p>
        The object exported by the htz-theme module contains the following
        methods and properties:
      </p>
      <ul>
        <li>
          bps (Object) - An immutable
          [mqoptions](https://haaretz.github.io/htz-frontend/htz-css-tools#mqoptions)
          object with breakpoint definitions
          <ul>
            <li>
              bps.width (Object) - An immutable
              [WidthBpsConfig](https://haaretz.github.io/htz-frontend/htz-css-tools#widthbpsconfig)
              object with values of boundary points between named
              width-breakpoints
            </li>
            <li>
              bps.misc (Object) - An immutable
              [MiscBpsConfig](https://haaretz.github.io/htz-frontend/htz-css-tools#miscbpsconfig)
              object with values named miscellaneous media-features media
              queries
            </li>
          </ul>
        </li>
        <li>direction ('rtl) - The application's flow direction</li>
        <li>
          typeConf (Object) - An immutable
          [TypeConf](https://haaretz.github.io/htz-frontend/htz-css-tools#typeconf)
          object per-breakpoint typographic and vertical-rhythm values
        </li>
        <li>
          typographicBaseline (string) - A css-like string for setting the
          typographic baseline on the `html` and `body` elements.
        </li>
        <li>
          color (function) - A
          [colorGetter](https://haaretz.github.io/htz-frontend/htz-css-tools#colorgetter)
          function for retrieving color values from the predefined color
          palette.
        </li>
        <li>
          mq (function) - A [media-query
          function](https://haaretz.github.io/htz-frontend/htz-css-tools#typeconf),
          which intelligently returns a media-query scoped css-in-js object
          based on breakpoints defined in [`theme.bps`]()
        </li>
        <li>
          pxToRem (function) - A function that [converts px values to
          rem](https://haaretz.github.io/htz-frontend/htz-css-tools#remfunctiontype)
          at given breakpoints while accounting to changes in vertical rhythm
        </li>
        <li>
          type (function) - A
          [Typesetter](https://haaretz.github.io/htz-frontend/htz-css-tools#typesetter)
          function that returns a CSS-in-JS object of typographic styles
          conforming to a global predefined typographic scale and vertical
          rhythm
        </li>
      </ul>
    </div>
  );
}
