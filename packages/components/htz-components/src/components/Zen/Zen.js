/* eslint-disable react/no-unused-state */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import { Query, } from '../ApolloBoundary/ApolloBoundary';
import getTransitionEnd from '../../utils/getTransitionEnd';

export const ZEN_QUERY = gql`
  query GetZenStatus {
    zenMode @client
  }
`;

const propTypes = {
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

const defaultProps = {
  animate: false,
  hide: false,
};

/**
 * This wrapper removes or hides its children when the user enters `Zen Mode`.
 * It listens to the field ZenMode at the Apollo store and hide/show according to the change.
 */
class Zen extends React.Component {
  state = {
    animating: false,
    display: true,
    zenMode: false,
  };

  componentDidMount() {
    this.element &&
      this.element.addEventListener(
        getTransitionEnd(this.element),
        this.changeState,
        false
      );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.animate && prevState.zenMode !== this.state.zenMode) {
      this.changeState();
    }
  }

  changeState = () => {
    this.setState(prevState => ({
      animating: !prevState.animating,
      display: !prevState.display,
    }));
  };

  render() {
    const { children, hide, animate, } = this.props;
    return (
      <Query query={ZEN_QUERY}>
        {({ loading, error, data, }) => {
          if (loading) return null;
          if (error) return null;
          const { zenMode, } = data;
          if (zenMode !== this.state.zenMode) this.setState({ zenMode, });
          if (hide) {
            return (
              <FelaComponent
                style={{
                  display: zenMode ? 'none' : 'block',
                }}
              >
                {children}
              </FelaComponent>
            );
          }
          if (animate) {
            const { animating, } = this.state;
            return (
              <FelaComponent
                rule={({ theme, zen, }) => ({
                  opacity: zen ? '0' : '1',
                  ...(animating && {
                    transitionProperty: 'opacity',
                    ...theme.getDuration('transition', 0),
                    ...theme.getTimingFunction('transition', 'linear'),
                  }),
                })}
                zen={this.state.zenMode}
                render={({ className, }) => (
                  <div
                    className={className}
                    // eslint-disable-next-line no-return-assign
                    ref={element => (this.element = element)}
                  >
                    {this.state.zenMode && !animating ? null : children}
                  </div>
                )}
              />
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

Zen.propTypes = propTypes;
Zen.defaultProps = defaultProps;

export default Zen;
