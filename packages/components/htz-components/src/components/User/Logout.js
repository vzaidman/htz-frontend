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
        render={({ isLoggedIn, user, plantImages, handleImgOnload, }) => this.props.render({
          logout: this.getLogoutFunction(user, plantImages, handleImgOnload),
        })
        }
      />
    );
  }
}

Logout.propTypes = propTypes;
Logout.defaultProps = defaultProps;

export default Logout;
