/* eslint-disable react/no-unused-state */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import Query from '../ApolloBoundary/Query';
import ToggleFade from '../Transitions/ToggleFade';

export const ZEN_QUERY = gql`
  query GetZenStatus {
    zenMode @client
  }
`;

/**
 * This wrapper removes or hides its children when the user enters `Zen Mode`.
 * It listens to the field ZenMode at the Apollo store and hide/show according to the change.
 */
class Zen extends React.Component {
  static propTypes = {
    /**
     * Should the element be animated out.
     */
    animate: PropTypes.bool,
    /**
     * Nodes that ought to be hidden in 'Zen mode'.
     */
    children: PropTypes.node.isRequired,
    /**
     * Should the element be hidden or removed (default).
     */
    hide: PropTypes.bool,
  };

  static defaultProps = {
    animate: false,
    hide: false,
  };

  state = {
    animating: false,
    zenMode: false,
  };

  render() {
    const { children, hide, animate, } = this.props;
    return (
      <Query query={ZEN_QUERY}>
        {({ loading, error, data, }) => {
          if (loading) return null;
          if (error) return null;
          const { zenMode, } = data;
          if (hide) {
            return (
              <FelaComponent style={{ display: zenMode ? 'none' : 'block', }}>
                {children}
              </FelaComponent>
            );
          }
          if (animate) {
            return (
              <ToggleFade duration={0} show={!zenMode}>
                {children}
              </ToggleFade>
            );
          }
          if (!zenMode) {
            return <Fragment>{children}</Fragment>;
          }
          return null;
        }}
      </Query>
    );
  }
}

export default Zen;
