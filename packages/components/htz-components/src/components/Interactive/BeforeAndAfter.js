import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { border, borderRight, } from '@haaretz/htz-css-tools';
import Image from '../Image/Image';
import { buildUrl, } from '../../utils/buildImgURLs';

const wrapperStyle = () => ({
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
});
const Wrapper = createComponent(wrapperStyle, 'div', [ 'onDragOver', ]);

const pointerPseudoStyles = {
  content: '""',
  width: '0',
  height: '0',
  position: 'absolute',
  top: '50%',
  marginTop: '-10px',
  transition: 'right .2s, left .2s',
  border: '10px inset transparent',
};

const pointerStyle = ({ theme, }) => ({
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
  ...(border('3px', 0.1, 'solid', theme.color('neutral', '-10'))),
  borderRadius: '50%',
  transitionProperty: 'opacity',
  ...(theme.getDuration('transition', -1)),
  ...(theme.getTimingFunction('transition', 'swiftIn')),
  ':before': {
    ...pointerPseudoStyles,
    left: '-2px',
    borderRight: `10px solid ${theme.color('neutral', '-10')}`,
  },
  ':after': {
    ...pointerPseudoStyles,
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
const Pointer = createComponent(pointerStyle, 'div', [ 'draggable', ]);

const afterStyle = ({ theme, width, imgUrl, }) => ({
  display: 'inline-block',
  position: 'absolute',
  overflow: 'hidden',
  ...borderRight('3px', 'solid', theme.color('neutral', '-10')),
  height: '100%',
  top: '0',
  left: '0',
  boxSizing: 'content-box',
  boxShadow: '3px 0 5px 0 rgba(0,0,0,.75)',
  backgroundImage: `url('${imgUrl}')`,
  backgroundSize: 'cover',
});
const After = createComponent(afterStyle, 'div', [ 'draggable', ]);

const imgOptions = {
  transforms: {
    width: '700',
    aspect: 'regular',
    quality: 'auto',
  },
};

export default class BeforeAndAfter extends React.Component {
  state = {
    lineX: this.props.linePos.replace('%', ''),
  };

  componentDidMount() {
    this.setState({
      wrapperWidth: this.wrapper.offsetWidth,
      wrapperX: this.wrapper.offsetLeft,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.lineX !== nextState.lineX;
  }

  afterImg = this.props.elementsList[1];

  afterImgUrl = buildUrl(this.afterImg.contentId, {
    ...this.afterImg.imgArray[0],
    aspects: this.afterImg.aspects,
  }, imgOptions.transforms).replace('.image/', '.'); // The `replace` method is temporary! shall be removed when `buildUrl` function will be fixed.

  dragging = e => {
    const pointerRelativeX = (e.clientX - this.state.wrapperX);
    const newLineX = (pointerRelativeX / this.state.wrapperWidth) * 100;
    this.setState({
      lineX: newLineX,
    });
  };

  render() {
    return (
      <Wrapper
        innerRef={wrapper => this.wrapper = wrapper}
        onDragOver={this.dragging}
      >
        <Pointer
          innerRef={pointer => this.pointer = pointer}
          style={{ left: `${this.state.lineX}%`, }}
          draggable
        />
        <Image
          data={this.props.elementsList[0]}
          imgOptions={imgOptions}
          attrs={{ draggable: false, }}
        />
        <After
          imgUrl={this.afterImgUrl}
          draggable={false}
          style={{ width: `${this.state.lineX}%`, }}
        />
      </Wrapper>
    );
  }
}

BeforeAndAfter.propTypes = {
  linePos: PropTypes.string,
  elementsList: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

BeforeAndAfter.defaultProps = {
  linePos: '50%',
};
