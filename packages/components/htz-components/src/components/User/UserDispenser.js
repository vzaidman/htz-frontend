import React, { Fragment, } from 'react';
import { UserFactory, UserTypes, } from '@haaretz/htz-user-utils';
import PropTypes from 'prop-types';
import { graphql, compose, } from 'react-apollo';
import { UPDATE_USER, GET_USER, } from './UserInjector';
import ImageCookies from './ImageCookies';

export const userScheme = {
  type: null,
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  emailStatus: null,
  token: null,
  anonymousId: null,
  __typename: 'User',
};

const propTypes = {
  render: PropTypes.func.isRequired,
  /** Indicates data loading state */
  loading: PropTypes.bool,
  /** Indicates data error state */
  error: PropTypes.bool,
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
  mutate: PropTypes.func.isRequired,
};
const defaultProps = {
  loading: false,
  error: false,
};

class LoginStateWrapper extends React.Component {
  state = {
    shouldRender: false,
    // isLoggedIn: false,
    images: [],
  };

  componentDidMount() {
    if (!this.state.shouldRender) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ shouldRender: true, });
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps', nextProps.user);
  }

  // toggleLoginState = () => {
  //   this.setState((prevState, props) => ({ isLoggedIn: !prevState.isLoggedIn, }));
  // };

  handleImgOnload = () => {
    const user = new UserFactory(true).build();
    console.log('handleImgOnload user:', user);
    this.props.mutate({
      variables: { user, },
      // TODO check if there's a way to pass a real object reference for overriding (no-skeleton)
      update: (proxy, { data: { updateUser, }, }) => {
        // Read the data from our cache for this query.
        const data = proxy.readQuery({ query: GET_USER, });

        // Add our data from the mutation to the data object.
        data.user = { ...userScheme, ...user, };

        // Write our data back to the cache.
        proxy.writeQuery({ query: GET_USER, data, });
      },
    });
    return Promise.resolve(console.log('onload handleImgOnload'));
  };

  plantImages = images =>
    new Promise((resolve, reject) => {
      console.log('planting Images...', images);
      this.setState((prevState, props) => ({ ...prevState, images, }));
      resolve();
    });

  render() {
    if (this.state.shouldRender && !this.props.loading) {
      if (this.props.error) {
        console.error(this.props.error);
        return null;
      }
      const isLoggedIn =
        this.props.user &&
        (this.props.user.type === UserTypes.paying ||
          this.props.user.type === UserTypes.registered);
      const { user, } = this.props;
      console.log(
        'MAIN RENDER - LOGIN STATE WRAPPER - isLoggedIn:',
        isLoggedIn,
        'user from props:',
        user
      );
      return (
        <Fragment>
          <ImageCookies
            images={this.state.images}
            onload={this.handleImgOnload}
          />
          {this.props.render({
            isLoggedIn,
            user: this.props.user,
            plantImages: this.plantImages,
            handleImgOnload: this.handleImgOnload,
          })}
        </Fragment>
      );
    }
    return null;
  }
}

LoginStateWrapper.propTypes = propTypes;
LoginStateWrapper.defaultProps = defaultProps;

const UserDispenser = compose(
  graphql(UPDATE_USER),
  graphql(GET_USER, {
    props: ({ data, }) => data,
  })
)(LoginStateWrapper);
export default UserDispenser;
