/* global document */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import { rgba, } from 'polished';

import ToolBar from './elements/ToolBar';
import IconArrow from '../Icon/icons/IconArrow';
import IconZoomIn from '../Icon/icons/IconZoomIn';

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
};

const defaultProps = {
  captionElement: null,
};

const containerStyle = ({ isFullScreen, theme, }) => ({
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
    : { cursor: 'zoom-in', }),
});

const iconStyle = ({ theme, isFullScreen, hide, }) => ({
  backgroundColor: rgba(theme.color('neutral'), 0.8),
  height: '5rem',
  marginBottom: '3rem',
  padding: '1rem',
  opacity: hide ? '0' : '1',
  width: '100%',
  zIndex: '1',
  extend: [
    { transitionProperty: 'opacity', },
    theme.getDuration('transition', 0),
    theme.getTimingFunction('transition', 'linear'),
  ],
  ...(!isFullScreen
    ? {
      borderRadius: '50%',
      end: '1rem',
      position: 'absolute',
      top: '1rem',
      width: '5rem',
    }
    : {}),
});

// eslint-disable-next-line react/prop-types
const Icon = ({ isFullScreen, hide, ...props }) => (
  <FelaComponent
    rule={iconStyle}
    hide={hide}
    isFullScreen={isFullScreen}
    render={({ theme, className, }) => {
      const ToggleIcon = isFullScreen ? IconArrow : IconZoomIn;
      const label = isFullScreen ? theme.zoomoutText : theme.zoominText;
      return (
        <button type="button" className={className} {...props} aria-label={label} tabIndex="-1">
          <ToggleIcon
            color={[ 'neutral', '-10', ]}
            size={isFullScreen ? 3 : 2.5}
            miscStyles={{
              display: 'block',
              margin: '0 auto',
            }}
          />
        </button>
      );
    }}
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
    isFullScreen: false,
    hide: true,
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
      || this.state.hide !== nextState.hide
      || this.props.captionElement !== nextProps.captionElement
    );
  }

  componentDidUpdate() {
    this.state.isFullScreen
      ? document.addEventListener('keydown', this.handleGlobalKeydown)
      : document.removeEventListener('keydown', this.handleGlobalKeydown);
  }

  handleGlobalKeydown = e => {
    const key = e.which || e.keyCode;
    if (key === 27) {
      this.toggleFullScreen();
    }
  };

  toggleFullScreen = () => {
    this.setState(prevState => ({
      isFullScreen: !prevState.isFullScreen,
    }));
  };

  toggleHide = hide => this.setState({
    hide,
  });

  render() {
    const { render, captionElement, itemName, itemUrl, } = this.props;
    const { isFullScreen, } = this.state;

    return (
      <FelaComponent
        rule={containerStyle}
        isFullScreen={isFullScreen}
        render={({ className, }) => (
          <span
            className={className}
            onMouseEnter={() => this.toggleHide(false)}
            onMouseLeave={() => this.toggleHide(true)}
          >
            {!isFullScreen ? (
              <Icon isFullScreen={false} hide={this.state.hide} onClick={this.toggleFullScreen} />
            ) : null}
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
                  <Icon isFullScreen onClick={this.toggleFullScreen} hide={false} />
                </FelaComponent>
                <ToolBar
                  itemName={itemName}
                  itemUrl={itemUrl}
                  closeButton={(
                    <Icon
                      isFullScreen
                      onClick={this.toggleFullScreen}
                      hide={false}
                    />
)}
                  captionElement={captionElement}
                />
              </Fragment>
            ) : null}
          </span>
        )}
      />
    );
  }
}

FullScreenMedia.propTypes = propTypes;
FullScreenMedia.defaultProps = defaultProps;

export default FullScreenMedia;
