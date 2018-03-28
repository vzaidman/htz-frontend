import React, { Children, isValidElement, cloneElement, } from 'react';
import PropTypes from 'prop-types';
import { Provider, ThemeProvider, } from 'react-fela';

/**
 * @typedef {Object} StyleProviderPropTypes
 *   The shape of the props object passed to the `StyleProvider` component
 *
 * @prop {Object} renderer
 *   A [fela renderer](http://fela.js.org//docs/api/fela/Renderer.html).
 *   Allows tailoring of the renderer to different environments and needs,
 *   e.g., rtl vs. ltr, plugins, enhancers, etc.
 * @prop {node} [children=null]
 *   May only contain a single child to which, any non-standard props
 *   passed to `<StyleProvider />` will be passed down
 * @prop {Object} [theme=null]
 *   A theme object tailored for the use-case.
 */
StyleProvider.propTypes = {
  children: PropTypes.node,
  renderer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  theme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

StyleProvider.defaultProps = {
  children: null,
  renderer: null,
  theme: null,
};

StyleProvider.contextTypes = {
  renderer: PropTypes.object,
};

/**
 * A Fela `Provider` component that makes the Fela renderer and theme available via `context`.
 *
 * @param {StyleProviderPropTypes} The properties passed to the `<StyleProvider />` component
 *
 * @return {ReactElement}
 */
export default function StyleProvider(
  { children, renderer, theme, ...props },
  context
) {
  /* This allows us to pass down props */
  const child = Children.only(children);

  return context.renderer ? (
    <ThemeProvider theme={theme || {}}>
      {isValidElement(child) ? cloneElement(child, { ...props, }) : child}
    </ThemeProvider>
  ) : (
    <Provider renderer={renderer}>
      <ThemeProvider theme={theme || {}}>
        {isValidElement(child) ? cloneElement(child, { ...props, }) : child}
      </ThemeProvider>
    </Provider>
  );
}
