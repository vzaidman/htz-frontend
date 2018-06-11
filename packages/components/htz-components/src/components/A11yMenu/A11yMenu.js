/* global document */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import List from './A11yMenuList';
import IconAccessibility from '../Icon/icons/IconAccessibility';

const a11yButtonStyle = ({ theme, isOpen, }) => ({
  display: 'flex',
  color: theme.color('a11yMenu', 'text'),
  border: 'none',
  padding: '1rem',
  ...(isOpen && {
    backgroundColor: theme.color('a11yMenu', 'bgOpen'),
    color: theme.color('a11yMenu', 'textOpenOrHover'),
  }),
  ':hover': {
    backgroundColor: theme.color('a11yMenu', 'bgHover'),
    color: theme.color('a11yMenu', 'textOpenOrHover'),
  },
  extend: [ ...theme.type(-2), ],
});

/**
 * A menu component for the page header. A component which generate
 * two options: toggle accessibility on apollo link state and report a problem via email
 */
class A11yMenu extends React.Component {
  state = { isOpen: false, };

  shouldComponentUpdate(nextState) {
    return this.state.isOpen !== nextState.isOpen;
  }

  componentDidUpdate() {
    if (this.state.isOpen) {
      document.addEventListener('click', this.handleOutsideClick);
      document.addEventListener('keydown', this.handleEscape);
    }
    else {
      document.removeEventListener('click', this.handleOutsideClick);
      document.removeEventListener('keydown', this.handleEscape);
    }
  }

  handleOutsideClick = e => {
    if (!this.wrapper.contains(e.target)) {
      this.changeState();
    }
  };

  handleEscape = e => {
    const key = e.which || e.keyCode;
    if (key === 27) {
      this.changeState();
      this.navButt.focus();
    }
  };

  changeState = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    return (
      <div
        ref={wrapper => {
          this.wrapper = wrapper;
        }}
      >
        <FelaComponent
          rule={a11yButtonStyle}
          isOpen={this.state.isOpen}
          render={({ className, }) => (
            <button
              className={className}
              onClick={this.changeState}
              aria-expanded={this.state.isOpen}
              ref={navButt => {
                this.navButt = navButt;
              }}
            >
              <IconAccessibility size={3} />
            </button>
          )}
        />
        {this.state.isOpen ? (
          <FelaComponent
            style={{ position: 'relative', }}
            render={({ className, theme, }) => (
              <div className={className}>
                <List theme={theme} items={theme.a11yMenuI18n.menuItems} />
              </div>
            )}
          />
        ) : null}
      </div>
    );
  }
}

export default A11yMenu;
