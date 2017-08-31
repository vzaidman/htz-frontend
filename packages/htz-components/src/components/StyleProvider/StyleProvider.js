import React from 'react';
import PropTypes from 'prop-types';
import { Provider, } from 'react-fela';
import styleRenderer from './renderer';

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: null,
};

/*
 * Provider component that makes the Fela renderer available via `context`.
 */
export default function StyleProvider({ children, }) {
  return (
    <Provider renderer={styleRenderer}>
      {children}
    </Provider>
  );
}

StyleProvider.propTypes = propTypes;
StyleProvider.defaultProps = defaultProps;
