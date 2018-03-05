import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

import IconBack from '../Icon/icons/IconBack';

const propTypes = {
  buttonsColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  Component: PropTypes.node.isRequired,
  componentAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  items: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  loop: PropTypes.bool,
  onView: PropTypes.number,
  step: PropTypes.number,
};

const defaultProps = {
  buttonsColor: null,
  componentAttrs: {},
  loop: false,
  onView: 1,
  step: 1,
};

const wrapperStyle = () => ({
  position: 'relative',
});
const ImageWrapper = createComponent(wrapperStyle);

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

class Carousel extends React.Component {
  state = {
    displayImageNum: 0,
  };

  changeImage = (direction, step) => {
    direction === 'next' ?
      this.setState({
        displayImageNum: this.state.displayImageNum + step,
      }) :
      this.setState({
        displayImageNum: this.state.displayImageNum - step,
      });
  };

  render() {
    const {
      buttonsColor,
      Component,
      componentAttrs,
      items,
      onView,
      step,
    } = this.props;
    return (
      <ImageWrapper>
        <PreviousButton
          buttonsColor={buttonsColor}
          onClick={() => this.changeImage('previous', step)}
        >
          <IconBack
            size={2.5}
            miscStyles={{
              transform: 'rotateY(180deg)',
            }}
          />
        </PreviousButton>
        <Component {...componentAttrs} {...items[this.state.displayImageNum]} />

        <NextButton
          buttonsColor={buttonsColor}
          onClick={() => this.changeImage('next', step)}
        >
          <IconBack
            color={'neutral'}
            size={2.5}
          />
        </NextButton>
      </ImageWrapper>
    );
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Carousel;
