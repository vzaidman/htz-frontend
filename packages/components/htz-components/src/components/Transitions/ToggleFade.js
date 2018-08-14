import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import getTransitionEnd from '../../utils/getTransitionEnd';
import { stylesPropType, } from '../../propTypes/stylesPropType';

class ToggleFade extends React.Component {
  static propTypes = {
    /**
     * The element that should be faded.
     */
    children: PropTypes.node,
    /**
     * The duration of the transition.
     */
    duration: PropTypes.number,
    /**
     * The duration of the transition-In (Trumps the `duration` prop).
     */
    durationIn: PropTypes.number,
    /**
     * The duration of the transition-Out (Trumps the `duration` prop).
     */
    durationOut: PropTypes.number,
    /**
     * A special property holding miscellaneous CSS values that
     * trump all default values. Processed by
     * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
     */
    miscStyles: stylesPropType,
    render: PropTypes.func,
    /**
     * The trigger of the transition.
     */
    show: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    children: null,
    duration: null,
    durationIn: null,
    durationOut: null,
    miscStyles: null,
    render: null,
  };

  state = {
    animating: null,
    show: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { show, } = nextProps;
    const animating = prevState.show !== show;
    return {
      show,
      animating,
    };
  }

  componentDidMount() {
    this.element &&
      this.element.addEventListener(
        getTransitionEnd(this.element),
        () => this.isAnimating(false),
        false
      );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextState.animating || nextProps.show !== this.props.show;
  }

  isAnimating = animating => {
    this.setState({
      animating,
    });
  };

  render() {
    const { animating, } = this.state;
    const {
      children,
      duration,
      durationIn,
      durationOut,
      show,
      miscStyles,
      render,
    } = this.props;
    return (
      <FelaComponent
        rule={({ theme, }) => ({
          opacity: show ? '1' : '0',
          ...(!((show && durationIn === 0) || (!show && durationOut === 0))
            ? {
                transitionProperty: 'opacity',
                ...theme.getDuration(
                  'transition',
                  show ? durationIn || duration : durationOut || duration
                ),
                ...theme.getTimingFunction('transition', 'linear'),
              }
            : {}),
          extend: [
            ...(miscStyles
              ? parseStyleProps(miscStyles, theme.mq, theme.type)
              : []),
          ],
        })}
        render={({ className, }) => (
          <div
            className={className}
            // eslint-disable-next-line no-return-assign
            ref={element => (this.element = element)}
          >
            {children ? (
              <FelaComponent
                style={{ display: !show && !animating ? 'none' : 'block', }}
              >
                {children}
              </FelaComponent>
            ) : render ? (
              render({ animating, })
            ) : null}
          </div>
        )}
      />
    );
  }
}

export default ToggleFade;
