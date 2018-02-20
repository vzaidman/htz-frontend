import React from 'react';
import PropTypes from 'prop-types';
import { UserService, } from '@haaretz/htz-user-utils';

const propTypes = {
  render: PropTypes.func.isRequired,
  user: PropTypes.shape({
    __typename: PropTypes.string,
    userName: PropTypes.string,
    id: PropTypes.string,
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    emailStatus: PropTypes.string,
    premiumArticlesCount: PropTypes.number,
    type: PropTypes.string,
    anonymousId: PropTypes.string,
  }).isRequired,
  // isLoggedIn: PropTypes.bool.isRequired,
};
const defaultProps = {};

class Logout extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(plantImages, handleImgOnload) {
    const userService = new UserService({
      plantImagesCallback: plantImages,
      onImageLoadCallback: handleImgOnload,
    });
    // console.log('MAIN RENDER - LOGUT - isLoggedIn:', this.props.isLoggedIn);
    userService.logout(this.props.user).then(result => {
      console.log('logging out...');
    });
  }

  render() {
    // console.log('MAIN RENDER - LOGUT - isLoggedIn:', this.props.isLoggedIn);
    return this.props.render({
      logout: this.logout,
    });
  }
}

Logout.propTypes = propTypes;
Logout.defaultProps = defaultProps;

export default Logout;
