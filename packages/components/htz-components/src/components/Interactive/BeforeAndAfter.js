import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { border, borderRight, } from '@haaretz/htz-css-tools';
import Image from '../Image/Image';

const wrapperStyle = () => ({
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
});
const Wrapper = createComponent(wrapperStyle, 'div', [ 'onDragOver', ]);

const sliderPseudoStyles = {
  content: '""',
  width: '0',
  height: '0',
  position: 'absolute',
  top: '50%',
  marginTop: '-10px',
  transition: 'right .2s, left .2s',
  border: '10px inset transparent',
};

const sliderStyle = ({ theme, }) => ({
  userDrag: 'none',
  width: '50px',
  height: '50px',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'absolute',
  overflow: 'hidden',
  zIndex: '6',
  cursor: 'col-resize',
  opacity: '1',
  boxShadow: `3px 0 5px ${theme.color('neutral', '-1')}`,
  backgroundColor: theme.color('neutral', '-1'),
  ...border('3px', 0.1, 'solid', theme.color('neutral', '-10')),
  borderRadius: '50%',
  transitionProperty: 'opacity',
  ...theme.getDuration('transition', -1),
  ...theme.getTimingFunction('transition', 'swiftIn'),
  ':before': {
    ...sliderPseudoStyles,
    left: '-2px',
    borderRight: `10px solid ${theme.color('neutral', '-10')}`,
  },
  ':after': {
    ...sliderPseudoStyles,
    right: '-2px',
    borderLeft: `10px solid ${theme.color('neutral', '-10')}`,
  },
  ':active': {
    opacity: '0.2',
  },
  ':active:before': {
    left: '-6px',
  },
  ':active:after': {
    right: '-6px',
  },
});
const Slider = createComponent(sliderStyle, 'div', [ 'draggable', ]);

const afterStyle = ({ theme, width, }) => ({
  display: 'inline-block',
  position: 'absolute',
  overflow: 'hidden',
  ...borderRight('3px', 'solid', theme.color('neutral', '-10')),
  height: '100%',
  top: '0',
  left: '0',
  width: '100%',
  boxSizing: 'content-box',
  boxShadow: '3px 0 5px 0 rgba(0,0,0,.75)',
});
const After = createComponent(afterStyle, 'div', [ 'draggable', ]);

const imageWrapperStyle = ({ theme, width, }) => ({
  position: 'absolute',
  overflow: 'hidden',
  width: '100%',
  top: '0',
  left: '0',
});
const ImageWrapper = createComponent(imageWrapperStyle, 'div', [ 'draggable', ]);

const imgOptions = {
  transforms: {
    width: '700',
    aspect: 'regular',
    quality: 'auto',
  },
};

/*
 * This component accepts an array of (at least) 2 images,
 * and renders them on top of each other with a slider
 * that controls how much to expose from each of them.
 */
export default class BeforeAndAfter extends React.Component {
  state = {
    lineX: this.props.linePos.replace('%', ''),
  };

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      wrapperWidth: this.wrapper.offsetWidth,
      wrapperX: this.wrapper.offsetLeft,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.lineX !== nextState.lineX;
  }

  dragging = e => {
    e.preventDefault();
    const sliderRelativeX = e.clientX - this.state.wrapperX;
    // prettier-ignore
    const newLineX = (sliderRelativeX / this.state.wrapperWidth) * 100;
    this.setState({
      lineX: newLineX,
    });
  };

  render() {
    return (
      <Wrapper
        innerRef={wrapper => (this.wrapper = wrapper)} // eslint-disable-line no-return-assign
        onDragOver={this.dragging}
      >
        <Slider
          innerRef={slider => (this.slider = slider)} // eslint-disable-line no-return-assign
          style={{ left: `${this.state.lineX}%`, }}
          draggable
        />
        <Image
          data={this.props.elementsList[0]}
          imgOptions={imgOptions}
          attrs={{ draggable: false, }}
        />
        <After
          draggable={false}
          style={{ transform: `translateX(-${100 - this.state.lineX}%)`, }}
        >
          {/* Temporary wrapper, until the image wrapper will be able to get MiscStyles. */}
          <ImageWrapper
            style={{ transform: `translateX(${100 - this.state.lineX}%)`, }}
            draggable={false}
          >
            <Image
              data={this.props.elementsList[1]}
              imgOptions={imgOptions}
              attrs={{ draggable: false, }}
            />
          </ImageWrapper>
        </After>
      </Wrapper>
    );
  }
}

BeforeAndAfter.propTypes = {
  /**
   * The initial position of the slider controller.
   */
  linePos: PropTypes.string,
  /**
   * List of images (takes only the first 2), the first one goes to the right,
   * and the second goes to the left.
   */
  elementsList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

BeforeAndAfter.defaultProps = {
  linePos: '50%',
};
