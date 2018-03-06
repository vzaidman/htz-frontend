import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

import IconBack from '../Icon/icons/IconBack';
import { stylesPropType, } from '../../propTypes/stylesPropType';

const propTypes = {
  buttonsColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  Component: PropTypes.node.isRequired,
  componentAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  inView: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  loop: PropTypes.bool,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
  onStateChangeCB: PropTypes.func,
  startAt: PropTypes.number,
  step: PropTypes.number,
};

const defaultProps = {
  buttonsColor: null,
  componentAttrs: {},
  inView: 1,
  loop: false,
  miscStyles: null,
  onStateChangeCB: null,
  startAt: 0,
  step: 1,
};

const wrapperStyle = () => ({
  overflow: 'hidden',
  position: 'relative',
});
const ItemsWrapper = createComponent(wrapperStyle);

const navigationStyle = ({ theme, buttonsColor, }) => ({
  backgroundColor: buttonsColor,
  position: 'absolute',
  width: '4rem',
  height: '9rem',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: '3',
});
const NavigationButton = createComponent(navigationStyle, 'button');

const nextButtonStyle = () => ({
  end: '0',
});
const NextButton = createComponent(
  nextButtonStyle,
  NavigationButton,
  props => Object.keys(props)
);

const previousButtonStyle = () => ({
  start: '0',
});
const PreviousButton = createComponent(
  previousButtonStyle,
  NavigationButton,
  [ 'onClick', ]
);

const itemsStyle = ({ theme, position, moving, }) => ({
  top: '0',
  width: '100%',
  position: 'absolute',
  transform: `translateX(${position}%)`,
  ...moving && {
    transitionProperty: 'all',
    ...theme.getDelay('transition', 1),
    ...theme.getDuration('transition', 3),
    ...theme.getTimingFunction('transition', 'linear'),
  },
});
const Items = createComponent(itemsStyle);

const currentItemsStyle = ({ moving, direction, }) => ({
  position: 'static',
});
const CurrentItems = createComponent(
  currentItemsStyle,
  Items,
  props => Object.keys(props)
);

class Carousel extends React.Component {
  state = {
    displayItemNum: this.props.startAt,
    moving: false,
    direction: null,
  };

  componentDidMount() {
    this.currentItems.addEventListener(
      this.getTransitionEnd(),
      this.changeState,
      false
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.displayItemNum !== nextState.displayItemNum ||
      this.state.moving !== nextState.moving
    );
  }

  componentDidUpdate() {
    this.props.onStateChangeCB(this.state.displayItemNum);
  }

  getTransitionEnd = () => {
    if ('ontransitionend' in window) {
      // Firefox
      return 'transitionend';
    }
    else if ('onwebkittransitionend' in window) {
      // Chrome/Saf (+ Mobile Saf)/Android
      return 'webkitTransitionEnd';
    }
    else if ('onotransitionend' in this.currentItems || navigator.appName === 'Opera') {
      // Opera
      // As of Opera 10.61, there is no "onotransitionend" property added to DOM elements,
      // so it will always use the navigator.appName fallback
      return 'oTransitionEnd';
    }
    // IE - not implemented (even in IE9) :(
    return false;
  };

  getIndex = pos => {
    const current = this.state.displayItemNum;
    const total = this.props.items.length;
    const step = this.props.step;
    const loop = this.props.loop;

    let index;

    if (pos === 'next') {
      if (current + step < total) {
        index = current + step;
      }
      else if (loop) {
        index = (current + step) - total;
      }
      else {
        index = total;
      }
    }
    else if (current - step >= 0) {
      index = current - step;
    }
    else if (loop) {
      index = total + (current - step);
    }
    else index = 0;

    return index;
  };


  changeItem = direction => {
    this.setState({
      moving: true,
      direction,
    });
  };

  changeState = () => {
    const newDisplay =
      this.state.moving ?
        this.getIndex(this.state.direction)
        :
        null;
    newDisplay !== null &&
    this.setState({
      displayItemNum: newDisplay,
      moving: false,
      direction: null,
    });
  };

  render() {
    const {
      buttonsColor,
      Component,
      componentAttrs,
      inView,
      items,
      loop,
      startAt,
    } = this.props;

    const positionChange =
      this.state.direction === 'next' ?
        100
        :
        this.state.direction === 'previous' ?
          -100
          :
          0;

    return (
      <ItemsWrapper>
        {(this.state.displayItemNum > 0 || loop) &&
          <Fragment>
            <PreviousButton
              buttonsColor={buttonsColor}
              disabled={this.state.moving}
              onClick={() => this.changeItem('previous')}
            >
              <IconBack
                size={2.5}
                miscStyles={{
                  transform: 'rotateY(180deg)',
                }}
              />
            </PreviousButton>
            <Items
              position={100 + positionChange}
              moving={this.state.moving}
            >
              <Component {...componentAttrs} {...items[this.getIndex('prev')]} />
            </Items>
          </Fragment>
        }
        <CurrentItems
          position={positionChange}
          moving={this.state.moving}
          // eslint-disable-next-line no-return-assign
          innerRef={currentItems => this.currentItems = currentItems}
        >
          <Component {...componentAttrs} {...items[this.state.displayItemNum]} />
        </CurrentItems>
        {(this.state.displayItemNum < items.length - 1 || loop) &&
          <Fragment>
            <Items
              position={-100 + positionChange}
              moving={this.state.moving}
            >
              <Component {...componentAttrs} {...items[this.getIndex('next')]} />
            </Items>
            <NextButton
              buttonsColor={buttonsColor}
              disabled={this.state.moving}
              onClick={() => this.changeItem('next')}
            >
              <IconBack
                color={'neutral'}
                size={2.5}
              />
            </NextButton>
          </Fragment>
        }
      </ItemsWrapper>
    );
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Carousel;
