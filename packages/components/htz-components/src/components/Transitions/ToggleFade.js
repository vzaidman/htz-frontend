import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import getTransitionEnd from '../../utils/getTransitionEnd';

class ToggleFade extends React.Component {
  static propTypes = {
    /**
     * The element that should be faded.
     */
    children: PropTypes.node.isRequired,
    /**
     * The duration of the trnasition.
     */
    duration: PropTypes.number,
    /**
     * The trigger of the trnasition.
     */
    show: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    duration: 0,
  };

  state = {
    animating: false,
  };

  componentDidMount() {
    this.element &&
      this.element.addEventListener(
        getTransitionEnd(this.element),
        this.changeState,
        false
      );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      this.changeState();
    }
  }

  changeState = () => {
    this.setState(prevState => ({
      animating: !prevState.animating,
    }));
  };

  render() {
    const { animating, } = this.state;
    const { children, duration, show, } = this.props;
    return (
      <FelaComponent
        rule={({ theme, }) => ({
          opacity: show ? '1' : '0',
          ...(animating
            ? {
                transitionProperty: 'opacity',
                ...theme.getDuration('transition', duration),
                ...theme.getTimingFunction('transition', 'linear'),
              }
            : {}),
        })}
        render={({ className, }) => (
          <div
            className={className}
            // eslint-disable-next-line no-return-assign
            ref={element => (this.element = element)}
          >
            {!show && !animating ? null : children}
          </div>
        )}
      />
    );
  }
}

export default ToggleFade;
