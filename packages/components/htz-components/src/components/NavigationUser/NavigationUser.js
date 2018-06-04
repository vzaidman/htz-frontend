/* global document */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Link from '../Link/Link';
import IconAvatar from '../Icon/icons/IconAvatar';
import List from './navigationUserList';
import UserButton from './UserButton';

const propTypes = {
  /**
   * A `string` of the user name to display.
   */
  userName: PropTypes.string,
};

const defaultProps = {
  userName: null,
};

const noUserButtonStyle = theme => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  color: theme.color('navigationUser', 'iconColor'),
  border: 'none',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  paddingInlineStart: '1rem',
  paddingInlineEnd: '1rem',
  ':hover': {
    backgroundColor: theme.color('navigationUser', 'bgHover'),
    color: theme.color('navigationUser', 'textOpenOrHover'),
  },
  extend: [ theme.type(-2), ],
});

/**
 * A user menu component for the page header. A component which receives
 * a user name to generate a welcome string,
 * an array of links to generate a menu list,
 * and it also generate a signout function.
 */
class NavigationUser extends React.Component {
  state = { isOpen: false, };

  componentDidUpdate() {
    if (this.state.isOpen) {
      document.addEventListener('click', this.handleGlobalClick);
      document.addEventListener('keydown', this.handleGlobalKeydown);
    }
    else {
      document.removeEventListener('click', this.handleGlobalClick);
      document.removeEventListener('keydown', this.handleGlobalKeydown);
    }
  }

  handleGlobalClick = e => {
    if (!this.wrapper.contains(e.target)) {
      this.changeState();
    }
  };

  handleGlobalKeydown = e => {
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
                    <span>{theme.navigationUserI18n.noUserData}</span>
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
                  items={theme.navigationUserI18n.menuItems}
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

NavigationUser.propTypes = propTypes;
NavigationUser.defaultProps = defaultProps;

export default NavigationUser;
