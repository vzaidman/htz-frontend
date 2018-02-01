/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, } from 'react-apollo';
import gql from 'graphql-tag';

const SCROLL_QUERY = gql`
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
   * Passed implicitly by Apollo, not directly as an attribute on the component
   */

  /** Indicates data loading state */
  loading: PropTypes.bool.isRequired,
  /** Indicates data error state */
  error: PropTypes.bool,

  /** Holds the scroll Object with x and y coords */
  scroll: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number, }).isRequired,

  /**
   * The render Props callback
   * This component was built using the render props pattern together with prop getters pattern
   *
   * Checkout the following link to learn about render props pattern http://bit.ly/2CSxs7g
   *
   * And the following link to learn about prop getters http://bit.ly/2Fk27bY
   *
   * The Scroll Component passes an Object to its render function.
   * @param {Object} - holds the getInputProps, handleSubmit, and clearForm functions
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
