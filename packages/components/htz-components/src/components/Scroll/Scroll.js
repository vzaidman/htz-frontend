/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, } from 'react-apollo';
import gql from 'graphql-tag';

export const SCROLL_QUERY = gql`
  query {
    scroll @client {
      x
      y
      velocity
    }
  }
`;

const propTypes = {
  /**
   * Indicates data loading state
   * Passed implicitly by Apollo, not directly as an attribute on the component
   */
  loading: PropTypes.bool.isRequired,
  /**
   * Indicates data error state
   * Passed implicitly by Apollo, not directly as an attribute on the component
   */
  error: PropTypes.bool,

  /**
   * Holds the scroll Object with x, y coords and scroll velocity
   * Passed implicitly by Apollo, not directly as an attribute on the component
   */
  scroll: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number, velocity: PropTypes.number, })
    .isRequired,
  /**
   * The render Props callback
   * This component was built using the render props pattern
   *
   * Checkout the following link to learn about render props pattern http://bit.ly/2CSxs7g
   *
   * The Scroll Component passes an Object to its render function.
   * @param {Object} - holds the scroll x coordinates, scroll y coordinates and scroll velocity
   */
  render: PropTypes.func.isRequired,
};
const defaultProps = {
  error: false,
};

export function Scroll({ loading, error, scroll, render, }) {
  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error</div>;
  if (scroll) {
    const { x, y, velocity, } = scroll;
    return render({ x, y, velocity, });
  }
}

Scroll.propTypes = propTypes;
Scroll.defaultProps = defaultProps;

const WrappedScroll = graphql(SCROLL_QUERY, {
  props: ({ data, }) => data,
})(Scroll);

export default WrappedScroll;
