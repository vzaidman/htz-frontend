import React from 'react';
import PropTypes from 'prop-types';
import { UserService, } from '@haaretz/htz-user-utils';
import UserDispenser from './UserDispenser';

const propTypes = {
  render: PropTypes.func.isRequired,
  //   initLogin: PropTypes.func.isRequired,
};
const defaultProps = {};

class Register extends React.Component {
  getRegisterFunction = (user, plantImages, handleImgOnload) =>
    function register(
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      mobilePrefix,
      mobileNumber,
      termsChk,
      gRecaptchaResponse
    ) {
      const userService = new UserService({
        plantImagesCallback: plantImages,
        onImageLoadCallback: handleImgOnload,
      });
      return userService.register({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        mobilePrefix,
        mobileNumber,
        termsChk,
        gRecaptchaResponse,
        user,
      });
    };

  render() {
    return (
      <UserDispenser
        render={({ user, plantImages, handleImgOnload, }) =>
          this.props.render({
            register: this.getRegisterFunction(
              user,
              plantImages,
              handleImgOnload
            ),
          })
        }
      />
    );
  }
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;
