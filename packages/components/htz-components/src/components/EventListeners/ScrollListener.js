/* global window */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Scroll, } from 'react-fns';
import PropTypes from 'prop-types';
import ScrollStoreMutator from './ScrollStoreMutator';

const propTypes = {
  /**
   * Throttle enforces a maximum number of times a function can be called over time.
   *
   * e.g execute this function at most every 100 milliseconds.
   *
   * The Throttle prop controls the throtolling of the scroll event listener.
   */
  throttle: PropTypes.number,
};
const defaultProps = {
  throttle: 100,
};

function ScrollListener({ throttle, }) {
  return (
    // This `<Scroll />` is from react-fns package
    <Scroll
      throttle={throttle}
      render={({ x, y, }) => (
        <ScrollStoreMutator x={x} y={y} throttle={throttle} />
      )}
    />
  );
}

ScrollListener.propTypes = propTypes;
ScrollListener.defaultProps = defaultProps;

export default ScrollListener;
