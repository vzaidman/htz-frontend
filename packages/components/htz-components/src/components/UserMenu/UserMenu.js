/* global document */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';
import Button from '../Button/Button';
import DropdownList from '../DropdownList/DropdownList';
import IconAvatar from '../Icon/icons/IconAvatar';
import Item from '../DropdownList/DropdownItem';
import HtzLink from '../HtzLink/HtzLink';
import Logout from '../User/Logout';
import UserButton from './UserButton';
import {
  dropdownItemStyle,
  dropdownListStyle,
} from '../Masthead/mastheadDropdownListStyle';

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

  render() {
    if (!this.props.userName) {
      return (
        <FelaComponent
          render={({ theme, className, }) => (
            <div className={className}>
              <FelaComponent
                style={noUserButtonStyle}
                render={({ theme, className, }) => (
                  <HtzLink
                    className={className}
                    href="https://www.haaretz.co.il/misc/login-page"
                  >
                    <span>{theme.userMenuI18n.noUserData}</span>
                    <IconAvatar size={3} miscStyles={{ marginRight: '2rem', }} />
                  </HtzLink>
                )}
              />
            </div>
          )}
        />
      );
    }
    return (
      <FelaTheme
        render={theme => {
          const items = theme.userMenuI18n.menuItems;
          const initialCombinedItems = items.map(item => (
            <Item key={item.name} {...item} />
          ));
          const combinedItems = [
            ...initialCombinedItems,
            <Logout
              key="logout"
              render={({ logout, }) => (
                <Button
                  boxModel={{ vp: 1, hp: 2, }}
                  isFlat
                  isFull
                  isHard
                  fontSize={-2}
                  variant="negativeOpaque"
                  miscStyles={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                  }}
                  // eslint-disable-next-line react/prop-types
                  onClick={() => logout().then(() => this.props.onLogout())}
                >
                  <FelaComponent
                    render="span"
                    style={theme => ({
                      marginInlineEnd: 'auto',
                      color: theme.color('neutral', '-10'),
                    })}
                  >
                    {theme.userMenuI18n.logout}
                  </FelaComponent>
                </Button>
              )}
            />,
          ];

          return (
            <DropdownList
              mainMenuStyle={{ position: 'relative', }}
              onLogout={() => this.changeState()}
              render={({ renderButton, ListWrapper, isOpen, }) => (
                <Fragment>
                  {renderButton(({ toggleState, }) => (
                    <UserButton
                      isOpen={isOpen}
                      onClick={toggleState}
                      userName={this.props.userName}
                      role="button"
                    />
                  ))}
                  {isOpen && (
                    <FelaTheme
                      render={theme => (
                        <ListWrapper
                          listStyle={{ ...dropdownListStyle(theme), end: '0', }}
                          itemStyle={dropdownItemStyle(theme)}
                        >
                          {combinedItems}
                        </ListWrapper>
                      )}
                    />
                  )}
                </Fragment>
              )}
            />
          );
        }}
      />
    );
  }
}

export default UserMenu;
