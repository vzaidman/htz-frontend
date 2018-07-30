import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { border, borderRight, } from '@haaretz/htz-css-tools';
import Image from '../../Image/Image';

const sliderPseudoStyles = {
  content: '""',
  width: '0',
  height: '0',
  position: 'absolute',
  top: '50%',
  marginTop: '-10px',
  transition: 'start .2s, end .2s',
  border: '10px inset transparent',
};

// eslint-disable-next-line react/prop-types
const Slider = ({ innerRef, linePos, }) => (
  <FelaComponent
    style={theme => ({
      end: `${linePos}%`,
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
        end: '-2px',
        borderRight: `10px solid ${theme.color('neutral', '-10')}`,
      },
      ':after': {
        ...sliderPseudoStyles,
        start: '-2px',
        borderLeft: `10px solid ${theme.color('neutral', '-10')}`,
      },
      ':active': {
        opacity: '0.2',
      },
      ':active:before': {
        end: '-6px',
      },
      ':active:after': {
        start: '-6px',
      },
    })}
    render={({ className, }) => (
      <div ref={innerRef} className={className} draggable />
    )}
  />
);

// eslint-disable-next-line react/prop-types
const After = ({ linePos, children, }) => (
  <FelaComponent
    style={theme => ({
      transform: `translateX(-${100 - linePos}%)`,
      display: 'inline-block',
      position: 'absolute',
      overflow: 'hidden',
      ...borderRight('3px', 'solid', theme.color('neutral', '-10')),
      height: '100%',
      top: '0',
      end: '0',
      width: '100%',
      boxSizing: 'content-box',
      boxShadow: '3px 0 5px 0 rgba(0,0,0,.75)',
    })}
    render={({ className, }) => (
      <div className={className} draggable={false}>
        {children}
      </div>
    )}
  />
);

// eslint-disable-next-line react/prop-types
const ImageWrapper = ({ linePos, children, }) => (
  <FelaComponent
    style={theme => ({
      transform: `translateX(${100 - linePos}%)`,
      position: 'absolute',
      overflow: 'hidden',
      width: '100%',
      top: '0',
      end: '0',
    })}
    render={({ className, }) => (
      <div className={className} draggable={false}>
        {children}
      </div>
    )}
  />
);

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
    lineX: this.props.properties.linePos.replace('%', ''),
  };

  dragging = e => {
    e.preventDefault();
    const wrapperWidth = this.wrapper.offsetWidth;
    const wrapperX = this.wrapper.offsetLeft;
    const offSetX = this.wrapper.getBoundingClientRect().left;
    const sliderOffset = this.slider.offsetWidth;
    // prettier-ignore
    const sliderRelativeX = ((e.clientX - offSetX) - wrapperX) + (sliderOffset * 0.5);
    // prettier-ignore
    const newLineX = (sliderRelativeX / wrapperWidth) * 100;
    this.setState({
      lineX: newLineX,
    });
  };

  render() {
    const { properties: { elementsList, }, } = this.props;
    return (
      <FelaComponent
        style={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
        render={({ className, }) => (
          <div
            className={className}
            ref={wrapper => (this.wrapper = wrapper)} // eslint-disable-line no-return-assign
            onDragOver={this.dragging}
          >
            <Slider
              // eslint-disable-next-line no-return-assign
              innerRef={slider => (this.slider = slider)}
              linePos={this.state.lineX}
            />
            <Image
              data={elementsList[0]}
              imgOptions={imgOptions}
              attrs={{ draggable: false, }}
            />
            <After linePos={this.state.lineX}>
              {/* Temporary wrapper, until the image wrapper will be able to get MiscStyles. */}
              <ImageWrapper linePos={this.state.lineX}>
                <Image
                  data={elementsList[1]}
                  imgOptions={imgOptions}
                  attrs={{ draggable: false, }}
                />
              </ImageWrapper>
            </After>
          </div>
        )}
      />
    );
  }
}

BeforeAndAfter.propTypes = {
  properties: PropTypes.shape({
    /**
     * The initial position of the slider controller.
     */
    linePos: PropTypes.string,
    /**
     * List of images (takes only the first 2), the first one goes to the right,
     * and the second goes to the left.
     */
    elementsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
