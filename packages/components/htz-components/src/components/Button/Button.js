import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: null,
};

export default function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
