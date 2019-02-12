/* global document */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import { rgba, } from 'polished';

import ToolBar from './elements/ToolBar';
import IconArrow from '../Icon/icons/IconArrow';

const propTypes = {
  captionElement: PropTypes.node,
  /**
   * The name of the shown item.
   */
  itemName: PropTypes.string.isRequired,
  /**
   * The path to the of the shown item.
   */
  itemUrl: PropTypes.string.isRequired,
  /**
   * A render prop that passes down `isFullScreen` (Boolean).
   */
  render: PropTypes.func.isRequired,
  /**
   * Should the media be displayed as full-screen only.
   */
  fullScreenOnly: PropTypes.bool,
  /**
   * Should the full-screen option be disabled.
   */
  disableFullScreen: PropTypes.bool,
  exitAction: PropTypes.func,
};

const defaultProps = {
  captionElement: null,
  fullScreenOnly: false,
  disableFullScreen: false,
  exitAction: null,
};

const containerStyle = ({ isFullScreen, disableFullScreen, theme, }) => ({
  overflow: 'hidden',
  position: 'relative',
  ...(isFullScreen
    ? {
      backgroundColor: theme.color('neutral'),
      display: 'flex',
      height: '100%',
      position: 'fixed',
      top: '0',
      start: '0',
      end: '0',
      bottom: '0',
      width: '100%',
      zIndex: '6',
      extend: [
        parseComponentProp(
          'flexDirection',
          [
            { until: 's', misc: 'portrait', value: 'column', },
            { from: 's', misc: 'portrait', value: 'row', },
            { until: 'm', misc: 'landscape', value: 'column', },
            { from: 'm', misc: 'landscape', value: 'row', },
          ],
          theme.mq,
          (prop, value) => ({ [prop]: value, })
        ),
      ],
    }
    : !disableFullScreen
      ? { cursor: 'zoom-in', }
      : {}
  ),
});

const iconStyle = ({ theme, }) => ({
  backgroundColor: rgba(theme.color('neutral'), 0.8),
  height: '5rem',
  marginBottom: '3rem',
  padding: '1rem',
  opacity: '1',
  width: '100%',
  zIndex: '6',
});

// eslint-disable-next-line react/prop-types
const Icon = props => (
  <FelaComponent
    rule={iconStyle}
    render={({ theme, className, }) => (
      <button type="button" className={className} {...props} aria-label={theme.zoomoutText} tabIndex="-1">
        <IconArrow
          color={[ 'neutral', '-10', ]}
          size={3}
          miscStyles={{
            display: 'block',
            margin: '0 auto',
          }}
        />
      </button>
    )}
  />
);

const mediaWrapperStyle = ({ isFullScreen, theme, }) => (isFullScreen
  ? {
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    extend: [
      theme.mq(
        { from: 's', },
        {
          display: 'flex',
          flexDirection: 'column',
        }
      ),
    ],
  }
  : {});

/**
 * This component receives a media component
 * ([Image](./#image), [Video](./#video), [Gallery](./#gallery), etc),
 * and displays it in a full-screen, with it's caption & credit, and some sharing buttons.
 */
class FullScreenMedia extends React.Component {
  state = {
    mediaWidth: null,
    isFullScreen: this.props.fullScreenOnly,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      mediaWidth: this.mediaRef.offsetWidth,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.mediaWidth !== nextState.mediaWidth
      || this.state.isFullScreen !== nextState.isFullScreen
      || this.props.captionElement !== nextProps.captionElement
    );
  }

  componentDidUpdate() {
    if (this.state.isFullScreen) {
      document.addEventListener('keydown', this.handleGlobalKeydown);
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }
    else {
      document.removeEventListener('keydown', this.handleGlobalKeydown);
      document.getElementsByTagName('html')[0].style.overflow = 'visible';
    }
  }

  handleGlobalKeydown = e => {
    const key = e.which || e.keyCode;
    if (key === 27) {
      this.toggleFullScreen();
    }
  };

  toggleFullScreen = () => {
    const { exitAction, } = this.props;
    const { isFullScreen, } = this.state;
    if (!exitAction || !isFullScreen) {
      this.setState(prevState => ({
        isFullScreen: !prevState.isFullScreen,
      }));
    }
    else {
      document.getElementsByTagName('html')[0].style.overflow = 'visible';
      exitAction();
    }
  };

  render() {
    const { render, captionElement, itemName, itemUrl, disableFullScreen, } = this.props;
    const { isFullScreen, } = this.state;

    return (
      <FelaComponent
        rule={containerStyle}
        isFullScreen={isFullScreen}
        disableFullScreen={disableFullScreen}
        render={({ className, }) => (
          <div className={className}>
            <div />
            <FelaComponent
              rule={mediaWrapperStyle}
              isFullScreen={isFullScreen}
              render={({ className, }) => (
                <div
                  ref={mediaRef => { this.mediaRef = mediaRef; }}
                  className={className}
                >
                  {render({ isFullScreen, toggleFullScreen: this.toggleFullScreen, })}
                </div>
              )}
            />
            {isFullScreen ? (
              <Fragment>
                <FelaComponent
                  style={{
                    position: 'absolute',
                    top: '2rem',
                    end: '2rem',
                  }}
                >
                  <Icon onClick={this.toggleFullScreen} />
                </FelaComponent>
                <ToolBar
                  itemName={itemName}
                  itemUrl={itemUrl}
                  closeButton={(
                    <Icon onClick={this.toggleFullScreen} />
                  )}
                  captionElement={captionElement}
                />
              </Fragment>
            ) : null}
          </div>
        )}
      />
    );
  }
}

FullScreenMedia.propTypes = propTypes;
FullScreenMedia.defaultProps = defaultProps;

export default FullScreenMedia;
