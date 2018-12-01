import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Mutation from '../ApolloBoundary/Mutation';

export const UPDATE_SCROLL = gql`
  mutation updateScroll(
    $x: Int!
    $y: Int!
    $direction: String!
    $velocity: Int!
  ) {
    updateScroll(x: $x, y: $y, direction: $direction, velocity: $velocity)
      @client
  }
`;

const propTypes = {
  /**
   *  The Throttling used by `<ScrollListener/>` on the scroll event listener,
   *  needed to calculate the velocity.
   */
  throttle: PropTypes.number.isRequired,
  /**
   * The x scroll position
   */
  x: PropTypes.number.isRequired,
  /**
   * The y scroll position
   */
  y: PropTypes.number.isRequired,
  /**
   * A function that calls the Mutation that updates the Apollo store.
   *
   * Passed implicitly by Apollo, not directly as an attribute on the component.
   */
  mutate: PropTypes.func.isRequired,
};

export class ScrollStoreMutator extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { x, y, mutate, throttle, } = this.props;
    const velocity = (y - nextProps.y) / throttle;
    if (!(y === nextProps.y && x === nextProps.x)) {
      mutate({ variables: { x: nextProps.x, y: nextProps.y, velocity, }, });
    }
  }

  render() {
    return null;
  }
}

ScrollStoreMutator.propTypes = propTypes;

// eslint-disable-next-line react/prop-types
function WrappedScrollMutator({ x, y, throttle, }) {
  return (
    <Mutation mutation={UPDATE_SCROLL}>
      {updateScroll => (
        <ScrollStoreMutator
          x={x}
          y={y}
          throttle={throttle}
          mutate={updateScroll}
        />
      )}
    </Mutation>
  );
}

export default WrappedScrollMutator;
