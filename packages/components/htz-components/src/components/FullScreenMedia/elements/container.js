import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import { createMqFunc, } from '@haaretz/htz-css-tools';

import IconClose from '../../Icon/icons/IconClose';
import IconZoomIn from '../../Icon/icons/IconZoomIn';

const propTypes = {
  /**
   * Nested children inside this component.
   */
  caption: PropTypes.node.isRequired,
  /**
   * Nested children inside this component.
   */
  media: PropTypes.node.isRequired,
  /**
   *
   */
  toggleFullScreen: PropTypes.func.isRequired,
};

const containerStyle = ({ isFullScreen, theme, }) => {
  const mq = createMqFunc();
  return ({
    position: 'relative',
    ...(isFullScreen && {
      alignItems: 'center',
      backgroundColor: theme.color('neutral'),
      display: 'flex',
      height: '100%',
      position: 'fixed',
      start: '0',
      top: '0',
      width: '100%',
      zIndex: '6',
      ...mq({ until: 'm', }, {
        flexDirection: 'column',
        justifyContent: 'center',
      }),
      ...mq({ from: 'm', }, {
        justifyContent: 'flex-end',
      }),
    }),
  });
};
const Container = createComponent(containerStyle, 'figure');

const iconStyle = ({ theme, }) => ({
  backgroundColor: theme.color('neutral'),
  borderRadius: '50%',
  cursor: 'zoom-out',
  end: '1rem',
  height: '5rem',
  padding: '1rem',
  position: 'absolute',
  top: '1rem',
  width: '5rem',
  zIndex: '1',
  ':hover': {
    backgroundColor: theme.color('neutral', '+1'),
  },
});

// eslint-disable-next-line react/prop-types
const IconUnstyled = ({ theme, isFullScreen, ...props }) => {
  const ToggleIcon = isFullScreen ? IconClose : IconZoomIn;
  return (
    <button {...props} aria-label={theme.zoomoutText}>
      <ToggleIcon
        color={[ 'neutral', '-10', ]}
        size={2.5}
        miscStyles={{
          display: 'block',
          margin: '0 auto',
        }}
      />
    </button>
  );
};

const Icon = createComponent(
  iconStyle,
  withTheme(IconUnstyled),
  props => Object.keys(props)
);


class FullScreenContainer extends React.Component {
  state = {
    isFullScreen: false,
  };

  toggleFullScreen = () => {
    this.props.toggleFullScreen();
    this.setState({
      isFullScreen: !this.state.isFullScreen,
    });
  };

  render() {
    const { isFullScreen, } = this.state;
    return (
      <Container isFullScreen={isFullScreen}>
        <Icon
          isFullScreen={isFullScreen}
          onClick={this.toggleFullScreen}
        />
        {this.props.media}
        {isFullScreen && this.props.caption}
      </Container>
    );
  }
}

FullScreenContainer.propTypes = propTypes;

export default FullScreenContainer;
