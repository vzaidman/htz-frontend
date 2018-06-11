/* global document */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Link from '../Link/Link';
import IconAvatar from '../Icon/icons/IconAvatar';
import List from './UserMenuList';
import UserButton from './UserButton';

const noUserButtonStyle = theme => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  color: theme.color('userMenu', 'iconColor'),
  border: 'none',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  paddingInlineStart: '1rem',
  paddingInlineEnd: '1rem',
  ':hover': {
    backgroundColor: theme.color('userMenu', 'bgHover'),
    color: theme.color('userMenu', 'textOpenOrHover'),
  },
  extend: [ theme.type(-2), ],
});

/**
 * A user menu component for the page header. A component which receives
 * a user name to generate a welcome string,
 * an array of links to generate a menu list,
 * and it also generate a signout function.
 */
class UserMenu extends React.Component {
  static propTypes = {
    /**
     * A `string` of the user name to display.
     */
    userName: PropTypes.string,
  };

  static defaultProps = {
    userName: null,
  };
  state = { isOpen: false, };

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
    if (!this.props.userName) {
      return (
        <FelaComponent
          render={({ theme, className, }) => (
            <div className={className}>
              <FelaComponent
                style={noUserButtonStyle}
                render={({ theme, className, }) => (
                  <Link
                    className={className}
                    href="https://www.haaretz.co.il/misc/login-page"
                  >
                    <span>{theme.userMenuI18n.noUserData}</span>
                    <IconAvatar size={3} miscStyles={{ marginRight: '2rem', }} />
                  </Link>
                )}
              />
            </div>
          )}
        />
      );
    }
    return (
      <FelaComponent
        style={{ display: 'inline', }}
        render={({ theme, className, }) => (
          <div
            className={className}
            ref={wrapper => (this.wrapper = wrapper)} // eslint-disable-line no-return-assign
          >
            <UserButton
              isOpen={this.state.isOpen}
              onClick={this.changeState}
              userName={this.props.userName}
              role="button"
              innerRef={navButt => (this.navButt = navButt)} // eslint-disable-line no-return-assign
            />
            <FelaComponent style={{ position: 'relative', }}>
              {this.state.isOpen && (
                <List
                  theme={theme}
                  items={theme.userMenuI18n.menuItems}
                  onLogout={() => this.changeState()}
                />
              )}
            </FelaComponent>
          </div>
        )}
      />
    );
  }
}

export default UserMenu;
