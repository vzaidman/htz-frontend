/* global window */
/* global document */
import React, { Component, } from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import IconClose from '../Icon/icons/IconClose';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { attrsPropType, } from '../../propTypes/attrsPropType';

const tooltip = ({ theme, tooltipPosition, arrowStyle, hide, offsetX, tooltipMiscStyles, openSide, }) => ({
  ...tooltipPosition,
  position: 'absolute',
  zIndex: '1',
  display: hide ? 'none' : 'inline-block',
  backgroundColor: theme.color('primary', 'base'),
  color: '#FFF',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  paddingLeft: openSide === 'RIGHT' ? '3rem' : '8rem',
  paddingRight: openSide === 'RIGHT' ? '8rem' : '3rem',
  ':after': {
    content: "''",
    borderStyle: 'solid',
    position: 'absolute',
    ...arrowStyle,
  },
  extend: [
    theme.type(-1),
    ...tooltipMiscStyles(theme),
  ],
});

const close = (theme, side) => ({
  height: '100%',
  width: '35px',
  position: 'absolute',
  left: side === 'RIGHT' ? 'auto' : '0',
  right: side === 'RIGHT' ? '0' : 'auto',
  cursor: 'pointer',
  top: 0,
  display: 'flex',
  background: theme.color('secondary', 'base'),
  textAlign: 'center',
});

const closeInner = {
  margin: 'auto',
};

class Tooltip extends Component {
  static propTypes = {
    /* The text of the tooltip */
    text: PropTypes.string.isRequired,
    /* The local storage paramter */
    storageParam: PropTypes.string,
    /* Amount of time to show the tooltip after closing */
    closingCount: PropTypes.number,
    /** horizentol openning side (auto | T | B) */
    openSide: PropTypes.string,
    /** change X offset */
    offsetX: PropTypes.number,
    /** change Y offset */
    offsetY: PropTypes.number,
    /* adding style to the wrapper of the source element */
    miscStyles: stylesPropType,
    /* display status of the tooltip */
    hide: PropTypes.bool,
    tooltipMiscStyles: PropTypes.func,
    /* the children node */
    children: PropTypes.node.isRequired,
    attrs: attrsPropType,
  }

  static defaultProps = {
    openSide: 'auto',
    closingCount: 2,
    miscStyles: null,
    hide: false,
    storageParam: null,
    tooltipMiscStyles: () => ([ {}, ]),
    offsetX: 0,
    offsetY: 5,
    attrs: {},
  }

  state = {
    arrowStyle: {},
    tooltipPosition: {},
    hide: true,
  };

  componentDidMount = () => {
    if (parseInt(window.localStorage.getItem(this.storageParam), 10) > this.props.closingCount) {
      return;
    }
    const el = this.targetElement.firstChild;
    let openSide;
    if (this.props.openSide === 'auto') {
      openSide = el.offsetTop > document.body.scrollHeight / 2 ? 'TOP' : 'BOTTOM';
    }
    else {
      openSide = this.props.openSide;
    }
    let left = `calc(50% + ${this.props.offsetX}px)`;

    let bottom;
    let top;
    let right = 'auto';
    const delta = this.props.offsetY;
    switch (openSide) {
      case 'TOP':
        bottom = `calc(100% + ${delta}px)`;
        top = 'auto';
        this.tooltipPosition = { bottom, top, left, transform: 'translateX(-50%)', };
        this.arrowStyle = {
          borderWidth: '7px 7px 0 7px',
          borderColor: `${this.theme.color('primary', 'base')} transparent transparent transparent`,
          transform: 'translateX(-50%)',
          top: '100%',
          left: `calc(50% - ${this.props.offsetX}px)`,
        };
        break;
      case 'BOTTOM':
        bottom = 'auto';
        top = `calc(100% + ${delta}px)`;
        this.tooltipPosition = { bottom, top, left, transform: 'translateX(-50%)', };
        this.arrowStyle = {
          borderWidth: '0px 7px 7px 7px',
          borderColor: `transparent transparent ${this.theme.color('primary', 'base')} transparent`,
          transform: 'translateX(-50%)',
          bottom: '100%',
          left: `calc(50% - ${this.props.offsetX}px)`,
        };
        break;
      case 'LEFT':
        bottom = 'auto';
        top = '50%';
        left = 'auto';
        right = `calc(100% + ${this.props.offsetX}px)`;
        this.tooltipPosition = { bottom, top, left, right, transform: 'translateY(-50%)', };
        this.arrowStyle = {
          top: `calc(50% - ${this.props.offsetY}px)`,
          borderWidth: '7px 0px 7px 7px',
          borderColor: `transparent transparent transparent ${this.theme.color('primary', 'base')}`,
          transform: 'translateY(-50%)',
          left: '100%',
        };
        break;
      case 'RIGHT':
        bottom = 'auto';
        top = `calc(50% + ${this.props.offsetY}px)`;
        left = `calc(100% + ${this.props.offsetX}px)`;
        right = 'auto';
        this.tooltipPosition = { bottom, top, left, right, transform: 'translateY(-50%)', };
        this.arrowStyle = {
          top: `calc(50% - ${this.props.offsetY}px)`,
          borderWidth: '7px 7px 7px 0px',
          borderColor: `transparent ${this.theme.color('primary', 'base')} transparent transparent`,
          transform: 'translateY(-50%)',
          right: '100%',
          left: 'auto',
        };
        break;
      default:
        break;
    }
    this.setState({ hide: false, });
  }


  onClose = () => {
    this.setState({ hide: true, });
    const oldCount = parseInt(window.localStorage.getItem(this.storageParam), 10);
    const updateCount = oldCount && !Number.isNaN(oldCount) ? oldCount + 1 : 1;
    window.localStorage.setItem(this.storageParam, updateCount);
  }

  b64EncodeUnicode = str => (
    window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      (match, p1) => String.fromCharCode(`0x${p1}`)))
  );

  render() {
    const id = `aria${parseInt(Math.random() * 10000000, 10)}`;
    const { text, children, offsetX, attrs, miscStyles, tooltipMiscStyles, openSide, } = this.props;
    this.storageParam =  this.props.storageParam ? this.props.storageParam: this.b64EncodeUnicode(text);
    let wrapperStyle;
    if (miscStyles) {
      wrapperStyle = miscStyles;
    }

    return (
      <FelaComponent render="span" style={theme => ({ position: 'relative', ...wrapperStyle, })}>
        <span aria-describedby={id} ref={el => { this.targetElement = el; }} {...attrs}>
          {children}
        </span>
        <FelaComponent
          style={
            theme => {
                this.theme = theme; // make the theme available trou out the class
                const isDimentionsAvailable = this.tooltipPosition !== undefined;
                const hide = !isDimentionsAvailable || this.state.hide || this.props.hide;
                return tooltip({ theme, tooltipPosition: this.tooltipPosition, arrowStyle: this.arrowStyle, hide, offsetX, tooltipMiscStyles, openSide, });
              }
            }
          render={({ className, }) => (
            <div className={className} ref={el => { this.tooltipElement = el; }}>
              <FelaComponent
                style={theme => close(theme, this.props.openSide)}
                render={({ className, }) => (
                  <button className={className} onClick={() => this.onClose()}>
                    <IconClose size={2} miscStyles={closeInner} />
                  </button>
                )}
              />

              <span id={id}>
                {text}
              </span>
            </div>
        )}
        />
      </FelaComponent>
    );
  }
}

export default Tooltip;
