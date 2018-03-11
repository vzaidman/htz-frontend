/* global window */
import { Component, } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose, } from 'react-apollo';
import gql from 'graphql-tag';
import { UserFactory, } from '@haaretz/htz-user-utils';

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
  query {
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
  /** Indicates data loading state */
  loading: PropTypes.bool,
  /** Indicates data error state */
  error: PropTypes.bool,
  /** A user object that the injector holds */
  user: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, ]),
    email: PropTypes.email,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    emailStatus: PropTypes.bool,
    token: PropTypes.string,
    anonymousId: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, ]),
    __typename: PropTypes.string.isRequired,
  }),
  /** A mutate function for updating the currently set user */
  mutate: PropTypes.func.isRequired,
};
const defaultProps = {
  loading: false,
  error: false,
  user: {
    email: null,
    emailStatus: null,
    firstName: null,
    lastName: null,
    id: null,
    anonymousId: null,
    type: null,
    token: null,
  },
};

class UserInjector extends Component {
  state = { shouldRender: false, };

  componentDidMount() {
    if (!this.state.shouldRender) {
      // Build a user from a newly parsed (hence :'true' param) cookie state
      const user = new UserFactory(true).build();
      // Change apollo's user data in memory (store)
      this.props.mutate({ variables: { user, }, });
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ shouldRender: true, });
    }
  }

  render() {
    if (this.state.shouldRender) {
      const { loading, error, user, } = this.props;
      if (loading) return null;
      if (error) {
        console.error(error);
        return null;
      }
      if (user) {
        return null;
      }
      console.error('User Injector failed creating a user:', this.props.user);
      return null;
    }
    return null;
  }
}

UserInjector.propTypes = propTypes;
UserInjector.defaultProps = defaultProps;
const WrappedUserInjector = compose(
  graphql(UPDATE_USER),
  graphql(GET_USER, {
    props: ({ data, }) => data,
  })
)(UserInjector);

export default WrappedUserInjector;
