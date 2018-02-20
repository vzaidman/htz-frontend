import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { UserService, } from '@haaretz/htz-user-utils';

const propTypes = {
  render: PropTypes.func.isRequired,
  //   initLogin: PropTypes.func.isRequired,
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
};
const defaultProps = {};

class Register extends React.Component {
  constructor() {
    super();
    this.register = this.register.bind(this);
  }
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    mobilePrefix: '',
    mobileNumber: '',
    termsChk: false,
    gRecaptchaResponse: '',
  };

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  register(
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    mobilePrefix,
    mobileNumber,
    termsChk,
    gRecaptchaResponse,
    plantImages,
    handleImgOnload
  ) {
    const userService = new UserService(
      { plantImagesCallback: plantImages,
        onImageLoadCallback: handleImgOnload,
      });
    const user = this.props.user;
    userService
      .register({
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
      })
      .then(result => {
        console.log(result);
      });
  }

  render() {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      mobilePrefix,
      mobileNumber,
      termsChk,
      gRecaptchaResponse,
    } = this.state;

    return (
      <Fragment>
        {this.props.render({
          register: this.register,
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          mobilePrefix,
          mobileNumber,
          termsChk,
          gRecaptchaResponse,
          user: this.props.user,
          handleInputChange: this.handleInputChange,
        })}
      </Fragment>
    );
  }
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;
