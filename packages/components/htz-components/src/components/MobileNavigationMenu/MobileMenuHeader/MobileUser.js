import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { borderEnd, } from '@haaretz/htz-css-tools';
import Logout from '../../User/Logout';
import IconAvatar from '../../Icon/icons/IconAvatar';
import Button from '../../Button/Button';

MobileUserButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default function MobileUserButton({ isLoggedIn, }) {
  return (
    <FelaComponent
      style={theme => ({
        display: 'flex',
        ...(!isLoggedIn
          ? {
              extend: [ borderEnd('1px', 'solid', theme.color('primary', '+1')), ],
            }
          : {}),
      })}
      render={({ theme, className, }) => {
        const { userLoggedIn, noUserData, url, } = theme.mobileUserMenuI18n;

        return (
          <Logout
            key="logout"
            render={({ logout, }) => (
              <div className={className}>
                <Button
                  boxModel={{ vp: 2, hp: 2, }}
                  variant="secondaryOpaque"
                  fontSize={-1}
                  {...(isLoggedIn
                    ? { onClick: () => logout(), }
                    : { href: url, })}
                >
                  <IconAvatar size={3} miscStyles={{ marginLeft: '1rem', }} />
                  <span>{isLoggedIn ? userLoggedIn : noUserData}</span>
                </Button>
              </div>
            )}
          />
        );
      }}
    />
  );
}
