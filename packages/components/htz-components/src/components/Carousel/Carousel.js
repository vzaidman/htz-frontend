import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

import IconBack from '../Icon/icons/IconBack';
import { stylesPropType, } from '../../propTypes/stylesPropType';

const propTypes = {
  /**
   * Change the default color of the next/previous buttons as you wish.
   */
  buttonsColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * The render component who should render the received items.
   */
  Component: PropTypes.node.isRequired,
  /**
   * Misc attributes who'd pass down to the renderer component.
   */
  componentAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /**
   * How many items should be rendered in the carousel's view.
   */
  inView: PropTypes.number,
  /**
   * An array of items objects who should populate the carousel.
   */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Should the carousel iterate over the given items in a loop, or start at 0 and end with n.
   */
  loop: PropTypes.bool,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
  /**
   * A method given from the parent component, which will be fired whenever the
   * carousel's state changes, and send back the item's index who's currently displayed.
   */
  onStateChangeCB: PropTypes.func,
  /**
   * At which position in the item's array (index) should the carousel start at mounting time.
   */
  startAt: PropTypes.number,
  /**
   * How many steps should the carousel iterate over the items list, whenever a next/previous button is fired.
   */
  step: PropTypes.number,
};

const defaultProps = {
  buttonsColor: 'neutral',
  componentAttrs: {},
  inView: 1,
  loop: false,
  miscStyles: null,
  onStateChangeCB: null,
  startAt: 0,
  step: 1,
};

const wrapperStyle = () => ({
  height: '100%',
  maxHeight: '100%',
  overflow: 'hidden',
  position: 'relative',
});
const ItemsWrapper = createComponent(wrapperStyle, 'div', [ 'tabindex', ]);

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
  props => Object.keys(props)
);

const itemsStyle = ({ theme, position, moving, }) => ({
  height: '100%',
  position: 'absolute',
  top: '0',
  transform: `translateX(${position}%)`,
  width: '100%',
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

/**
 * The Carousel component takes an array of objects and a renderer component, and renders
 * to its view **only** the amount of items specified by the props, and some extra items from
 * each side of its view, according to the settings given to it (loop, step, inView, etc).
 */
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
    document.addEventListener('click', this.handleGlobalClick); // eslint-disable-line no-undef
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.displayItemNum !== nextState.displayItemNum ||
      this.state.moving !== nextState.moving
    );
  }

  /* componentDidUpdate() {
    this.props.onStateChangeCB && this.props.onStateChangeCB(this.state.displayItemNum);
    console.log(this.wrapper);
    this.wrapper.focus();
  } */

  componentWillUnmount() {
  /* eslint-disable no-undef */
    document.removeEventListener('click', this.handleGlobalClick);
    document.removeEventListener('keydown', this.handleGlobalKeydown);
  /* eslint-enable no-undef */
  }

  getIndex = pos => {
    const current = this.state.displayItemNum;
    const total = this.props.items.length;
    const { step, loop, } = this.props.step;

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

  getTransitionEnd = () => {
    /* eslint-disable no-undef */
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
    /* eslint-enable no-undef */
  };

  handleGlobalClick = e => {
  /* eslint-disable no-undef */
    this.wrapper && this.wrapper.contains(e.target) ?
      document.addEventListener('keydown', this.handleGlobalKeydown)
      :
      document.removeEventListener('keydown', this.handleGlobalKeydown);
  /* eslint-enable no-undef */
  };

  handleGlobalKeydown = e => {
    const key = e.which || e.keyCode;
    const direction = key === 37 ? 'next' : 'previous';
    (key === 37 || key === 39) && this.changeItem(direction);
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
      // IndicationComponent,
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
      <ItemsWrapper
        innerRef={wrapper => this.wrapper = wrapper} // eslint-disable-line no-return-assign
        tabindex="0"
      >
        {(this.state.displayItemNum > 0 || loop) &&
          <Fragment>
            <PreviousButton
              // eslint-disable-next-line no-return-assign
              buttonsColor={buttonsColor}
              // disabled={this.state.moving}
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
              // eslint-disable-next-line no-return-assign
              buttonsColor={buttonsColor}
              // disabled={this.state.moving}
              onClick={() => this.changeItem('next')}
            >
              <IconBack
                color="neutral"
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
