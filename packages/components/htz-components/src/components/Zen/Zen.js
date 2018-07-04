/* eslint-disable react/no-unused-state */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import { Query, } from '../ApolloBoundary/ApolloBoundary';
import ToggleFade from '../Transitions/ToggleFade';
import { stylesPropType, } from '../../propTypes/stylesPropType';

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
    /**
     * A special property holding miscellaneous CSS values that
     * trump all default values. Processed by
     * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
     */
    miscStyles: stylesPropType,
  };

  static defaultProps = {
    animate: false,
    hide: false,
    miscStyles: null,
  };

  state = {
    animating: false,
    zenMode: false,
  };

  render() {
    const { children, hide, animate, miscStyles, } = this.props;
    return (
      <Query query={ZEN_QUERY}>
        {({ loading, error, data, }) => {
          if (loading) return null;
          if (error) return null;
          const { zenMode, } = data;
          if (hide) {
            return (
              <FelaComponent
                style={theme => ({
                  display: zenMode ? 'none' : 'block',
                  extend: [
                    ...(miscStyles
                      ? parseStyleProps(miscStyles, theme.mq, theme.type)
                      : []),
                  ],
                })}
              >
                {children}
              </FelaComponent>
            );
          }
          if (animate) {
            return <ToggleFade show={!zenMode}>{children}</ToggleFade>;
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
