/* global window, document, navigator */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer, } from 'react-apollo';
import { createComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import { stylesPropType, } from '../../propTypes/stylesPropType';

const propTypes = {
  /**
   * How many items should be rendered in the carousel's view.
   */
  inView: PropTypes.number,
  /**
   * The length property of the items array.
   */
  itemsLength: PropTypes.number.isRequired,
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
   * A render prop  that passes down the Carousel parts' render functions.
   */
  render: PropTypes.func.isRequired,
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
  inView: 1,
  loop: false,
  miscStyles: null,
  startAt: 0,
  step: 1,
};

const wrapperStyle = ({ miscStyles, theme, }) => ({
  extend: [
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});
const ItemsWrapper = createComponent(wrapperStyle);

const itemsStyle = ({ theme, position, moving, }) => ({
  height: '100%',
  position: 'absolute',
  top: '0',
  transform: `translateX(${position}%)`,
  width: '100%',
  ...(moving ? {
    transitionProperty: 'all',
    ...theme.getDuration('transition', 3),
    ...theme.getTimingFunction('transition', 'swiftOut'),
  } : {}),
});
const Items = createComponent(itemsStyle);

const currentItemsStyle = ({ moving, direction, }) => ({
  position: 'static',
});
const CurrentItems = createComponent(currentItemsStyle, Items, props =>
  Object.keys(props)
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
    startTouchX: null,
  };

  componentDidMount() {
    this.wrapper.addEventListener(
      'touchstart',
      event => {
        const startTouchX = event.touches[0].clientX;
        this.setState({
          startTouchX,
        });
      },
      false
    );
    this.wrapper.addEventListener(
      'touchend',
      event => {
        const endTouchX = event.changedTouches[0].clientX;
        if (endTouchX > this.state.startTouchX) {
          this.changeItem('next');
        }
        else if (endTouchX < this.state.startTouchX) {
          this.changeItem('previous');
        }
      },
      false
    );
    this.currentItems.addEventListener(
      this.getTransitionEnd(),
      this.changeState,
      false
    );
    document.addEventListener('click', this.handleGlobalClick);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.displayItemNum !== nextState.displayItemNum ||
      this.state.moving !== nextState.moving
    );
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleGlobalClick);
    document.removeEventListener('keydown', this.handleGlobalKeydown);
  }

  getIndex = pos => {
    const current = this.state.displayItemNum;
    const total = this.props.itemsLength;
    const { step, loop, } = this.props;

    let index;

    if (pos === 'next') {
      if (current + step < total) {
        index = current + step;
      }
      else if (loop) {
        index = current + (step - total);
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
    if ('ontransitionend' in window) {
      // Firefox
      return 'transitionend';
    }
    else if ('onwebkittransitionend' in window) {
      // Chrome/Saf (+ Mobile Saf)/Android
      return 'webkitTransitionEnd';
    }
    else if (
      'onotransitionend' in this.currentItems ||
      navigator.appName === 'Opera'
    ) {
      // Opera
      // As of Opera 10.61, there is no "onotransitionend" property added to DOM elements,
      // so it will always use the navigator.appName fallback
      return 'oTransitionEnd';
    }
    // IE - not implemented (even in IE9) :(
    return false;
  };

  handleGlobalClick = e => {
    this.wrapper && this.wrapper.contains(e.target)
      ? document.addEventListener('keydown', this.handleGlobalKeydown)
      : document.removeEventListener('keydown', this.handleGlobalKeydown);
  };

  handleGlobalKeydown = e => {
    const key = e.which || e.keyCode;
    const direction = key === 37 ? 'next' : 'previous';
    if (key === 37 || key === 39) this.changeItem(direction);
  };

  changeItem = direction => {
    this.setState({
      moving: true,
      direction,
    });
  };

  changeState = () => {
    const newDisplay = this.state.moving
      ? this.getIndex(this.state.direction)
      : null;
    if (newDisplay !== null) {
      this.setState({
        displayItemNum: newDisplay,
        moving: false,
        direction: null,
      });
    }
  };

  render() {
    const {
      inView, // eslint-disable-line no-unused-vars
      itemsLength,
      loop,
      miscStyles,
      render,
      startAt, // eslint-disable-line no-unused-vars
    } = this.props;

    const positionChange =
      this.state.direction === 'next'
        ? 100
        : this.state.direction === 'previous' ? -100 : 0;

    const renderPreviousItems = itemsRenderer =>
      (this.state.displayItemNum > 0 || loop) && (
        <Items position={100 + positionChange} moving={this.state.moving}>
          {itemsRenderer({ itemIndex: this.getIndex('prev'), })}
        </Items>
      );

    const renderNextItems = itemsRenderer => (
      (this.state.displayItemNum < itemsLength - 1 || loop) ? (
        <Items position={-100 + positionChange} moving={this.state.moving}>
          {itemsRenderer({ itemIndex: this.getIndex('next'), })}
        </Items>
      ) : null
    );

    const renderCurrentItems = (ariaText, itemsRenderer) => (
      <ApolloConsumer>
        {cache => {
          cache.writeData({
            data: {
              ariaLive: {
                politeMessage: ariaText || '',
                __typename: 'AriaLive',
              },
            },
          });
          return (
            <CurrentItems
              position={positionChange}
              moving={this.state.moving}
              // eslint-disable-next-line no-return-assign
              innerRef={currentItems => (this.currentItems = currentItems)}
            >
              {itemsRenderer({ itemIndex: this.state.displayItemNum, })}
            </CurrentItems>
          );
        }}
      </ApolloConsumer>
    );

    const renderButton = buttonRenderer =>
      buttonRenderer({ changeItem: this.changeItem, });

    const renderIndicator = indicatorRenderer => indicatorRenderer();

    return (
      <Fragment>
        <ItemsWrapper
          innerRef={wrapper => (this.wrapper = wrapper)} // eslint-disable-line no-return-assign
          miscStyles={miscStyles}
          tabindex="0"
        >
          {render({
            renderPreviousItems,
            renderNextItems,
            renderCurrentItems,
            renderButton,
            renderIndicator,
            displayItemNum: this.state.displayItemNum,
            direction: this.state.direction,
            moving: this.state.moving,
            previousItemIndex: this.getIndex('prev'),
            nextItemIndex: this.getIndex('next'),
          })}
        </ItemsWrapper>
      </Fragment>
    );
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Carousel;
