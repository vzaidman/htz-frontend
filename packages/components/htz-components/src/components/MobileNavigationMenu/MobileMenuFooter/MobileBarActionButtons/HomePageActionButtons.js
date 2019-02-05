import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { borderRight, } from '@haaretz/htz-css-tools';

import ActionButtons from '../../../ActionButtons/ActionButtons';
import { Button, } from '../../../ActionButtons/actionList';
import IconAvatar from '../../../Icon/icons/IconAvatar';
import UserDispenser from '../../../User/UserDispenser';
import Logout from '../../../User/Logout';

const iconSize = 4;

const propTypes = {
  shouldMainNavBarDisplay: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const LoginButton = ({ buttonStyles, size, iconStyles, isLoggedIn, hrefLogin, ...props }) => (
  <Logout
    key="logout"
    render={({ logout, }) => (
      <Button
        miscStyles={buttonStyles}
        isFlat
        {...(isLoggedIn ? { onClick: logout, } : { href: hrefLogin, })}
      >
        <IconAvatar size={size} miscStyles={iconStyles} />
        <FelaComponent
          style={theme => ({
            color: theme.color('neutral', '-2'),
            paddingInlineStart: '0.5rem',
            extend: [ theme.type(-2), ],
          })}
          render={({ className, theme, }) => (
            <span className={className}>
              {isLoggedIn
                ? theme.mobileUserMenuI18n.userLoggedIn
                : theme.mobileUserMenuI18n.noUserData}
            </span>
          )}
        />
      </Button>
    )}
  />
);

function MobileBarActionButtons({ shouldMainNavBarDisplay, isLoggedIn, }) {
  return (
    // <UserDispenser
    //   render={({ isLoggedIn, }) => (
    <FelaComponent
      style={theme => ({
        display: 'flex',
        flexGrow: '1',
      })}
      render={({ theme, className, }) => (
        <div className={className}>
          {/* {!isLoggedIn ? null : (
                <ActionButtons
                  isFlat
                  size={iconSize}
                  miscStyles={{
                    justifyContent: 'center',
                    flexGrow: '1',
                  }}
                  buttons={{
                    name: 'readinglist',
                    buttonStyles: {
                      color: theme.color('neutral', '-10'),
                    },
                    iconStyles: {
                      color: theme.color('primary'),
                      marginInlineEnd: '1rem',
                    },
                  }}
                />
              )} */}

          <FelaComponent
            style={{
              display: 'flex',
              marginBlockStart: '1.5rem',
              marginBlockEnd: '1.5rem',
              flexGrow: 1,
              justifyContent: 'center',
              // ...(isLoggedIn
              //   ? { ...borderRight('1px', 'solid', theme.color('neutral', '-4')), }
              //   : {}),
            }}
            render={({ className, }) => (
              <span className={className}>
                <LoginButton
                  isLoggedIn={isLoggedIn}
                  size={iconSize}
                  hrefLogin={theme.userMenuI18n.loginUrl}
                  buttonStyles={{
                    color: theme.color('neutral', '-10'),
                    display: 'flex',
                  }}
                  iconStyles={{
                    color: theme.color('primary'),
                  }}
                />
              </span>
            )}
          />
        </div>
      )}
    />
    // )}
    // />
  );
}

MobileBarActionButtons.propTypes = propTypes;

export default MobileBarActionButtons;
