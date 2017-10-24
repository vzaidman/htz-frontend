import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';
import { createComponent, } from 'react-fela';

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: null,
};
const rule = props => ({
  // This is just a demo usage of `config`.
  outline:
    config.has('debugButtons') && config.get('debugButtons')
      ? '1px solid #09a5d9'
      : '1px solid crimson',
});

export function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

const StyledButton = createComponent(rule, Button);

export default StyledButton;
