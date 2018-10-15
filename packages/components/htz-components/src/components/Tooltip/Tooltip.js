/* global window */
/* global document */
import React, { Component, } from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import IconClose from '../Icon/icons/IconClose';

const tooltip = ({ theme, tooltipPosition, arrowStyle, hide, offset, }) => ({
  ...tooltipPosition,
  position: 'absolute',
  zIndex: '100',
  whiteSpace: 'nowrap',
  display: hide ? 'none' : 'inline-block',
  backgroundColor: theme.color('primary', 'base'),
  transform: 'translateX(-50%)',
  color: '#FFF',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  paddingLeft: '8rem',
  paddingRight: '3rem',
  ':after': {
    content: "''",
    left: `calc(50% + ${offset * -1}px)`,
    transform: 'translateX(-50%)',
    borderStyle: 'solid',
    position: 'absolute',
    ...arrowStyle,
  },
  extend: [
    theme.type(-1),
  ],
});

const close = theme => ({
  height: '100%',
  width: '35px',
  position: 'absolute',
  left: '0',
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
    storageParam: PropTypes.string.isRequired,
    /* Amount of time to show the tooltip after closing */
    closingCount: PropTypes.number,
    /** horizentol openning side (auto | T | B) */
    openSide: PropTypes.string,
    /** change left offset */
    offset: PropTypes.number,
    children: PropTypes.node.isRequired,

  }

  static defaultProps = {
    openSide: 'auto',
    closingCount: 2,
    offset: 0,
  }

  state = {
    arrowStyle: {},
    tooltipPosition: {},
    hide: true,
  };

  componentDidMount = () => {
    setTimeout(() => {
      if (parseInt(window.localStorage.getItem(this.props.storageParam), 10) > this.props.closingCount) {
        return;
      }
      const el = this.targetElement.firstChild;
      this.setState({ hide: false, });
      let horizontal;
      if (this.props.openSide === 'auto') {
        horizontal = el.offsetTop > document.body.scrollHeight / 2 ? 'T' : 'B';
      }
      else {
        horizontal = this.props.openSide;
      }
      const left = `calc(50% + ${this.props.offset}px)`;

      let bottom;
      let top;
      const delta = 5;
      if (horizontal !== 'T') {
        bottom = 'auto';
        top = `calc(100% + ${delta}px)`;
        this.setState({
          tooltipPosition: { bottom, top, left, },
        });
        this.setState({
          arrowStyle: {
            borderWidth: '0px 7px 7px 7px',
            borderColor: `transparent transparent ${this.theme.color('primary', 'base')} transparent`,
            bottom: '100%',
          },
        });
      }
      else {
        bottom = `calc(100% + ${delta}px)`;
        top = 'auto';
        this.setState({
          tooltipPosition: {
            bottom,
            top,
            left,
          },
        });
        this.setState({
          arrowStyle: {
            borderWidth: '7px 7px 0 7px',
            borderColor: `${this.theme.color('primary', 'base')} transparent transparent transparent`,
            top: '100%',
          },
        });
      }
    });
  }

  onClose = () => {
    this.setState({ hide: true, });
    const oldCount = parseInt(window.localStorage.getItem(this.params.storageParam), 10);
    const updateCount = oldCount && !Number.isNaN(oldCount) ? oldCount + 1 : 1;
    window.localStorage.setItem(this.params.storageParam, updateCount);
    clearInterval(this.interval);
  }

  render() {
    const id = `aria${parseInt(Math.random() * 10000000, 10)}`;
    const { text, children, offset, } = this.props;
    return (
      <FelaComponent render="span" style={{ position: 'relative', }}>
        <span aria-describedby={id} ref={el => { this.targetElement = el; }} >
          {children}
        </span>
        <FelaComponent
          style={
            theme => {
                this.theme = theme;
                return tooltip({ theme, tooltipPosition: this.state.tooltipPosition, arrowStyle: this.state.arrowStyle, hide: this.state.hide, offset, });
              }
            }
          render={({ className, }) => (
            <div className={className} ref={el => { this.tooltipElement = el; }}>
              <FelaComponent style={close}>
                <IconClose size={2} miscStyles={closeInner} attrs={{ onClick: () => this.onClose(), }} />
              </FelaComponent>
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
