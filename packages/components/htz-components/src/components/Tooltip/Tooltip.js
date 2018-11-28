/* global window, document */
import React, { Component, } from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import IconClose from '../Icon/icons/IconClose';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { attrsPropType, } from '../../propTypes/attrsPropType';

const close = (theme, side) => ({  
  flexBasis: '0 0 auto',    
  paddingStart: '1.5rem',
  paddingEnd: '1.5rem',
  order: '1',  
  cursor: 'pointer',    
  background: theme.color('secondary', 'base'),
  textAlign: 'center',
});

const closeInner = {
  margin: 'auto',
};

const tooltipInner = {
  paddingTop: '1rem',
  paddingBottom: '1rem',
  paddingEnd: '3rem',
  flexBasis: 'fill',
  paddingStart: '3rem',
  display: 'inline-block'
};

class Tooltip extends Component {
  static propTypes = {
    /** The text of the tooltip */
    text: PropTypes.string.isRequired,
    /** The local storage parameter */
    storageParam: PropTypes.string,
    /** number of times to show the tooltip after closing */
    closingCount: PropTypes.number,
    /** horizentol openning side (auto | top | bottom | inlineEnd | inlineStart) */
    openSide: PropTypes.string,
    /** change X offset */
    offsetX: PropTypes.number,
    /** change Y offset */
    offsetY: PropTypes.number,
    /** adding style to the wrapper of the source element */
    miscStyles: stylesPropType,
    /** display status of the tooltip */
    hide: PropTypes.bool,
    /** Style the tooltip box */
    tooltipMiscStyles: PropTypes.func,
    /** the children node */
    children: PropTypes.node.isRequired,
    /** Determine whethe the tooltip will open automatically or on mouse over\out */
    openOnMouseOver: PropTypes.bool,
    attrs: attrsPropType,
  };

  static defaultProps = {
    openSide: 'auto',
    closingCount: 2,
    miscStyles: null,
    hide: false,
    storageParam: null,
    tooltipMiscStyles: () => [ {}, ],
    offsetX: 0,
    offsetY: 1,
    attrs: {},
    openOnMouseOver: false,
  };

  state = {
    hide: true,
  };

  componentDidMount = () => {
    if (parseInt(window.localStorage.getItem(this.storageParam), 10) > this.props.closingCount) {
      return;
    }

    const el = this.targetElement.firstChild;
    if (this.props.openOnMouseOver) {
      el.addEventListener('mouseover', () => this.showTooltip());
      el.addEventListener('mouseout', () => this.hideTooltip());
    }
    let openSide;
    if (this.props.openSide === 'auto') {
      openSide = el.offsetTop > document.body.scrollHeight / 2 ? 'BOTTOM' : 'TOP';
    }
    else {
      openSide = this.props.openSide;
    }
    const insetInlineEnd = `calc(50% + ${this.props.offsetX}rem)`;

    let bottom;
    let top;
    const insetInlineStart = 'auto';
    const delta = this.props.offsetY;
    switch (openSide) {
      case 'top':
        bottom = `calc(100% + ${delta}rem)`;
        top = 'auto';
        this.tooltipPosition = { bottom, top, insetInlineEnd, transform: 'translateX(-50%)', };
        this.arrowStyle = {
          borderWidth: '7px 7px 0 7px',
          borderColor: `${this.theme.color('primary', 'base')} transparent transparent transparent`,
          transform: 'translateX(-50%)',
          top: '100%',
          insetInlineEnd: `calc(50% - ${this.props.offsetX}rem)`,
        };
        break;
      case 'bottom':
        bottom = 'auto';
        top = `calc(100% + ${delta}rem)`;
        this.tooltipPosition = { bottom, top, insetInlineEnd, transform: 'translateX(-50%)', };
        this.arrowStyle = {
          borderWidth: '0px 7px 7px 7px',
          borderColor: `transparent transparent ${this.theme.color('primary', 'base')} transparent`,
          transform: 'translateX(-50%)',
          bottom: '100%',
          insetInlineEnd: `calc(50% - ${this.props.offsetX}rem)`,
        };
        break;
      case 'inlineEnd':
        bottom = 'auto';
        top = '50%';
        insetInlineEnd = 'auto';
        insetInlineStart = `calc(100% + ${this.props.offsetX}rem)`;
        this.tooltipPosition = {
          bottom,
          top,
          insetInlineEnd,
          insetInlineStart,
          transform: 'translateY(-50%)',
        };
        this.arrowStyle = {
          top: `calc(50% - ${this.props.offsetY}rem)`,
          borderWidth: '7px 0px 7px 7px',
          borderColor: `transparent transparent transparent ${this.theme.color('primary', 'base')}`,
          transform: 'translateY(-50%)',
          insetInlineEnd: '100%',
        };
        break;
      case 'inlineStart':
        bottom = 'auto';
        top = `calc(50% + ${this.props.offsetY}rem)`;
        insetInlineEnd = `calc(100% + ${this.props.offsetX}rem)`;
        insetInlineStart = 'auto';
        this.tooltipPosition = {
          bottom,
          top,
          insetInlineEnd,
          insetInlineStart,
          transform: 'translateY(-50%)',
        };
        this.arrowStyle = {
          top: `calc(50% - ${this.props.offsetY}rem)`,
          borderWidth: '7px 7px 7px 0px',
          borderColor: `transparent ${this.theme.color('primary', 'base')} transparent transparent`,
          transform: 'translateY(-50%)',
          insetInlineStart: '100%',
          insetInlineEnd: 'auto',
        };
        break;
      default:
        break;
    }
    if (!this.props.openOnMouseOver) {
      this.setState({ hide: false, });
    }
  };

  onClose = () => {
    this.setState({ hide: true, });
    const oldCount = parseInt(window.localStorage.getItem(this.storageParam), 10);
    const updateCount = oldCount && !Number.isNaN(oldCount) ? oldCount + 1 : 1;
    window.localStorage.setItem(this.storageParam, updateCount);
  };

  tooltip = ({
    theme,
    tooltipPosition,
    arrowStyle,
    hide,
    offsetX,
    tooltipMiscStyles,
    openSide,
  }) => ({
    ...tooltipPosition,
    position: 'absolute',
    zIndex: theme.getZIndex('above'),
    display: hide ? 'none' : 'flex',
    alignItems: 'stretch',    
    backgroundColor: theme.color('primary', 'base'),
    color: theme.color('white'),
    minWidth: '25rem',  
    textAlign: 'center',
    ':after': {
      content: "''",
      borderStyle: 'solid',
      position: 'absolute',
      ...arrowStyle,
    },
    extend: [ theme.type(-1), ...tooltipMiscStyles(theme), ],
  });

  b64EncodeUnicode = str =>
    window.btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
        String.fromCharCode(`0x${p1}`)
      )
    );

  showTooltip = () => {
    this.setState({ hide: false, });
  };

  hideTooltip = () => {
    this.setState({ hide: true, });
  };
  
  render() {
    if (!this.id) {
      this.id = `aria${parseInt(Math.random() * 10000000, 10)}`;
    }
    const { text, children, offsetX, attrs, miscStyles, tooltipMiscStyles, openSide, } = this.props;
    this.storageParam = this.props.storageParam
      ? this.props.storageParam
      : this.b64EncodeUnicode(text);

    return (
      <FelaComponent
        render="span"
        style={theme => ({ position: 'relative', ...miscStyles(theme), })}
      >
        <span
          aria-describedby={this.id}
          ref={el => {
            this.targetElement = el;
          }}
          {...attrs}
        >
          {children}
        </span>
        <FelaComponent
          style={theme => {
            this.theme = theme; // make the theme available trou out the class
            const isDimentionsAvailable = this.tooltipPosition !== undefined;
            const hide = !isDimentionsAvailable || this.state.hide || this.props.hide;
            return this.tooltip({
              theme,
              tooltipPosition: this.tooltipPosition,
              arrowStyle: this.arrowStyle,
              hide,
              offsetX,
              tooltipMiscStyles,
              openSide,
            });
          }}
          render={({ className, }) => (
            <div
              className={className}
              ref={el => {
                this.tooltipElement = el;
              }}
            >
              {this.props.openOnMouseOver ? null : (
                <FelaComponent
                  style={theme => close(theme, this.props.openSide)}
                  render={({ className, }) => (
                    <button className={className} onClick={() => this.onClose()}>
                      <IconClose size={2} miscStyles={closeInner} />
                    </button>
                  )}
                />
              )}

            <FelaComponent style={tooltipInner} render={({className,}) =>(
              <span class={className} id={this.id}>{text}</span>
            )}/>
            </div>
          )}
        />
      </FelaComponent>
    );
  }
}

export default Tooltip;
