/* global document */
import React from 'react';
import PropTypes from 'prop-types';
import { UserService, } from '@haaretz/htz-user-utils';
import UserDispenser from './UserDispenser';

const propTypes = {
  render: PropTypes.func.isRequired,
};
const defaultProps = {};

class Logout extends React.Component {
  getLogoutFunction = (user, plantImages, handleImgOnload) => function logout() {
    const userService = new UserService({
      plantImagesCallback: plantImages,
      onImageLoadCallback: handleImgOnload,
    });
    return userService.logout({ user, });
  };

  render() {
    return (
      <UserDispenser
        render={({ isLoggedIn, user, plantImages, handleImgOnload, }) => {
          const logout = this.getLogoutFunction(user, plantImages, handleImgOnload);
          const logoutAndReload = () => logout().then(reloadPage);
          return this.props.render({ logout: logoutAndReload, });
        }}
      />
    );
  }
}

Logout.propTypes = propTypes;
Logout.defaultProps = defaultProps;

function reloadPage() {
  try {
    document.location.reload();
  }
  catch (error) {
    // fails silently
  }
}

export default Logout;
