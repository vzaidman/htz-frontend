import React, { Children, isValidElement, cloneElement, } from 'react';
import PropTypes from 'prop-types';
import { Provider, ThemeProvider, } from 'react-fela';

const propTypes = {
  /* Should only contain one child, so that we can pass on props */
  children: PropTypes.node,
  /**
   * A fela renderer. Allows tailoring of the renderer to different
   * environments and needs, e.g., RTL vs LTR, testing, etc.
   */
  renderer: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  theme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
const defaultProps = {
  children: null,
  theme: null,
};

/*
 * Provider component that makes the Fela renderer available via `context`.
 */
export default function StyleProvider({ children, renderer, theme, ...props }) {
  /* This allows us to pass down props */
  const child = Children.only(children);
  return (
    <Provider renderer={renderer}>
      <ThemeProvider theme={theme || {}}>
        {isValidElement(child) ? cloneElement(child, { ...props, }) : child}
      </ThemeProvider>
    </Provider>
  );
}

StyleProvider.propTypes = propTypes;
StyleProvider.defaultProps = defaultProps;
