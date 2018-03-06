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
  step: PropTypes.number,
};

const defaultProps = {
  buttonsColor: null,
  componentAttrs: {},
  inView: 1,
  loop: false,
  miscStyles: null,
  onStateChangeCB: null,
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

const itemsStyle = ({ theme, }) => ({
  top: '0',
  width: '100%',
  position: 'absolute',
  transitionProperty: 'all',
  ...theme.getDelay('transition', 1),
  ...theme.getDuration('transition', 3),
  ...theme.getTimingFunction('transition', 'linear'),
});
const Items = createComponent(itemsStyle);

const nextItemsStyle = ({ moving, direction, }) => ({
  transform:
    moving ?
      direction === 'next' ?
        'translateX(0)'
        :
        'translateX(200%)'
      :
      'translateX(100%)',
});
const NextItems = createComponent(nextItemsStyle, Items);

const currentItemsStyle = ({ moving, direction, }) => ({
  position: 'static',
  transform:
    moving ?
      direction === 'next' ?
        'translateX(-100%)'
        :
        'translateX(100%)'
      :
      'translateX(0)',
});
const CurrentItems = createComponent(currentItemsStyle, Items);

const previousItemsStyle = ({ moving, direction, }) => ({
  transform:
    moving ?
      direction === 'next' ?
        'translateX(-200%)'
        :
        'translateX(0)'
      :
      'translateX(-100%)',
});
const PreviousItems = createComponent(previousItemsStyle, Items);

class Carousel extends React.Component {
  state = {
    displayItemNum: 0,
    moving: false,
    direction: null,
  };

  componentDidMount() {
    this.currentItems.addEventListener(
      'webkitTransitionEnd',
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
    console.log(this.state.moving);
    this.currentItems.addEventListener(
      'webkitTransitionEnd',
      this.changeState,
      false
    );
    this.props.onStateChangeCB(this.state.displayItemNum);
  }

  changeItem = direction => {
    this.setState({
      moving: true,
      direction,
    });
  };

  changeState = () => {
    console.log(this.state.direction);
    const newDisplay =
      this.state.moving ?
        this.state.direction === 'next' ?
          this.state.displayItemNum + this.props.step
          :
          this.state.displayItemNum - this.props.step
        :
        null;
    newDisplay &&
      this.setState({
        displayItemNum: newDisplay,
        moving: false,
      });
  }

  render() {
    const {
      buttonsColor,
      Component,
      componentAttrs,
      inView,
      items,
      step,
    } = this.props;

    return (
      <ItemsWrapper>
        {this.state.displayItemNum > 0 &&
          <Fragment>
            <PreviousButton
              buttonsColor={buttonsColor}
              onClick={() => this.changeItem('previous', step)}
            >
              <IconBack
                size={2.5}
                miscStyles={{
                  transform: 'rotateY(180deg)',
                }}
              />
            </PreviousButton>
            <PreviousItems
              moving={this.state.moving}
              direction={this.state.direction}
            >
              <Component {...componentAttrs} {...items[this.state.displayItemNum - step]} />
            </PreviousItems>
          </Fragment>
        }
        <CurrentItems
          moving={this.state.moving}
          direction={this.state.direction}
          // eslint-disable-next-line no-return-assign
          innerRef={currentItems => this.currentItems = currentItems}
        >
          <Component {...componentAttrs} {...items[this.state.displayItemNum]} />
        </CurrentItems>
        {this.state.displayItemNum < items.length &&
          <Fragment>
            <NextItems
              moving={this.state.moving}
              direction={this.state.direction}
            >
              <Component {...componentAttrs} {...items[this.state.displayItemNum + step]} />
            </NextItems>
            <NextButton
              buttonsColor={buttonsColor}
              onClick={() => this.changeItem('next', step)}
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
