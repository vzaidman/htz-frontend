/* global window */
import React, { Component, } from 'react';
import { Scroll, } from 'react-fns';
import PropTypes from 'prop-types';
import { graphql, } from 'react-apollo';
import gql from 'graphql-tag';

const UPDATE_SCROLL = gql`
  mutation updateScroll($x: Int!, $y: Int!, $direction: String!, $velocity: Int!) {
    updateScroll(x: $x, y: $y, direction: $direction, velocity: $velocity) @client {
      scroll {
        x
        y
        velocity
      }
    }
  }
`;

const propTypes = {
  throttle: PropTypes.number,
};
const defaultProps = {
  throttle: null,
};

const scrollStoreMutatorPropTypes = {
  throttle: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  mutate: PropTypes.func.isRequired,
};

class ScrollStoreMutator extends Component {
  componentWillReceiveProps(nextProps) {
    const { x, y, mutate, throttle, } = this.props;
    const velocity = (y - nextProps.y) / throttle;
    if (y !== nextProps.y) mutate({ variables: { x, y, velocity, }, });
  }
  render() {
    return null;
  }
}

ScrollStoreMutator.propTypes = scrollStoreMutatorPropTypes;

ScrollListener.propTypes = propTypes;
ScrollListener.defaultProps = defaultProps;

const WrappedScrollListener = graphql(UPDATE_SCROLL)(ScrollStoreMutator);

function ScrollListener({ throttle, }) {
  return (
    <Scroll
      {...throttle && { throttle, }}
      render={({ x, y, }) => <WrappedScrollListener x={x} y={y} throttle={throttle || 100} />}
    />
  );
}

export default ScrollListener;
