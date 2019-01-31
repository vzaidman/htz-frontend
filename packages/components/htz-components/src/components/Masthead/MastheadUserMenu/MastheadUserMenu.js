/* global document */
import React, { Fragment, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import Button from '../../Button/Button';
import DropdownList from '../../DropdownList/DropdownList';
import Item from '../../DropdownList/DropdownItem';
import HtzLink from '../../HtzLink/HtzLink';
import Logout from '../../User/Logout';
import UserButton from './UserButton';
import { dropdownItemStyle, dropdownListStyle, } from '../mastheadDropdownListStyle';
import UserDispenser from '../../User/UserDispenser';

/**
 * A user menu component for the page header. A component which receives
 * a user name to generate a welcome string,
 * an array of links to generate a menu list,
 * and it also generate a signout function.
 */
export default class MastheadUserMenu extends React.Component {
  render() {
    return (
      <UserDispenser
        render={({ user, }) => {
          if (!(user && user.firstName)) {
            return (
              <FelaTheme
                render={theme => (
                  <HtzLink
                    href={theme.userMenuI18n.loginUrl}
                    content={
                      <UserButton isOpen={false} userName={this.props.userName} role="button" />
                    }
                  />
                )}
              />
            );
          }

          return (
            <FelaTheme
              render={theme => {
                const items = theme.userMenuI18n.menuItems;
                const initialCombinedItems = items.map(item => <Item key={item.name} {...item} />);
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
                        {isOpen && !!this.props.userName ? (
                          <FelaTheme
                            render={theme => (
                              <ListWrapper
                                listStyle={{
                                  ...dropdownListStyle(theme),
                                  end: '0',
                                }}
                                itemStyle={dropdownItemStyle(theme)}
                              >
                                {combinedItems}
                              </ListWrapper>
                            )}
                          />
                        ) : null}
                      </Fragment>
                    )}
                  />
                );
              }}
            />
          );
        }}
      />
    );
  }
}
