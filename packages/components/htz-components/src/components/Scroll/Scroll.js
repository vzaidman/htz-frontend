import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, } from '../ApolloBoundary/ApolloBoundary';

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

export function Scroll({ render, }) {
  return (
    <Query query={SCROLL_QUERY}>
      {({ loading, error, data: { scroll, }, }) => {
        if (loading) return null;
        if (error) return null;
        const { x, y, velocity, } = scroll;
        return render({ x, y, velocity, });
      }}
    </Query>
  );
}

Scroll.propTypes = propTypes;

export default Scroll;
