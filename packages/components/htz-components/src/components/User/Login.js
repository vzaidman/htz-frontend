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

class Login extends React.Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }
  state = {
    email: '',
    password: '',
  };

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  login(username, password, plantImages, handleImgOnload) {
    const userService = new UserService({
      plantImagesCallback: plantImages,
      onImageLoadCallback: handleImgOnload,
    });
    const user = this.props.user;
    userService.login({ username, password, user, }).then(result => {
      console.log(result);
    });
  }

  render() {
    const { email, password, } = this.state;

    return (
      <Fragment>
        {this.props.render({
          login: this.login,
          email,
          password,
          handleInputChange: this.handleInputChange,
        })}
      </Fragment>
    );
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
