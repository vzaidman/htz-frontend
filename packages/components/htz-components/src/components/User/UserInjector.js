import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { UserFactory, } from '@haaretz/htz-user-utils';
import { Mutation, } from '../ApolloBoundary/ApolloBoundary';

export const UPDATE_USER = gql`
  mutation updateUser($user: User!) {
    updateUser(user: $user) @client {
      user {
        user
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    user @client {
      type
      id
      email
      firstName
      lastName
      emailStatus
      token
      anonymousId
    }
  }
`;

const propTypes = {
  /** A mutate function for updating the currently set user */
  updateUser: PropTypes.func.isRequired,
};

const defaultProps = {};

class UserInjector extends Component {
  state = {
    shouldRender: false,
  };

  componentDidMount() {
    if (!this.state.shouldRender) {
      // Build a user from a newly parsed (hence :'true' param) cookie state
      const user = new UserFactory(true).build();
      this.props.updateUser({ variables: { user, }, });
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ shouldRender: true, });
    }
  }

  render() {
    return null;
  }
}
UserInjector.propTypes = propTypes;
UserInjector.defaultProps = defaultProps;

function Wrapper() {
  return (
    <Mutation mutation={UPDATE_USER}>
      {updateUser => <UserInjector updateUser={updateUser} />}
    </Mutation>
  );
}

export default Wrapper;
