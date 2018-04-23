import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';

AboveBlockLink.propTypes = {
  /**
   * a function that returns a component to render.
   * The `children` prop trumps the `render` prop.
   * @prop {object} props
   * @prop {string} props.theme
   *   A Fela theme object
   * @prop {string} props.className
   *   classes for styling an element above the block-link
   * @return JSX to render above the block-link
   */
  children: PropTypes.func,
  /**
   * a function that returns a component to render.
   * The `children` prop trumps the `render` prop.
   * @prop {object} props
   * @prop {string} props.theme
   *   A Fela theme object
   * @prop {string} props.className
   *   classes for styling an element above the block-link
   * @return JSX to render above the block-link
   */
  render: PropTypes.func,
};

AboveBlockLink.defaultProps = {
  children: null,
  render: null,
};

export default function AboveBlockLink({ children, render, }) {
  return (
    <FelaComponent
      style={{
        position: 'relative',
        zIndex: '1',
      }}
      render={children || render}
    />
  );
}
