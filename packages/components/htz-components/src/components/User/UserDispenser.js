import React, { Component, Fragment, } from 'react';
import { UserFactory, UserTypes, } from '@haaretz/htz-user-utils';
import PropTypes from 'prop-types';
import { Mutation, Query, } from 'react-apollo';
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
  // /** Indicates data loading state */
  // loading: PropTypes.bool,
  // /** Indicates data error state */
  // error: PropTypes.bool,
  // user: PropTypes.shape({
  //   __typename: PropTypes.string,
  //   userName: PropTypes.string,
  //   id: PropTypes.string,
  //   lastName: PropTypes.string,
  //   firstName: PropTypes.string,
  //   emailStatus: PropTypes.string,
  //   premiumArticlesCount: PropTypes.number,
  //   type: PropTypes.string,
  //   anonymousId: PropTypes.string,
  // }).isRequired,
  // mutate: PropTypes.func.isRequired,
};
const defaultProps = {
  // loading: false,
  // error: false,
};

class UserDispenser extends Component {
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

  handleImgOnload = () => {
    // console.log('handleImgOnload user:', user);
    console.log('hsdgsdgsdgsdg');
    // this.props.mutate({
    //   variables: { user, },
    //   // TODO check if there's a way to pass a real object reference for overriding (no-skeleton)
    //   update: (proxy, { data: { updateUser, }, }) => {
    //     // Read the data from our cache for this query.
    //     const data = proxy.readQuery({ query: GET_USER, });

    //     // Add our data from the mutation to the data object.
    //     data.user = { ...userScheme, ...user, };

    //     // Write our data back to the cache.
    //     proxy.writeQuery({ query: GET_USER, data, });
    //   },
    // });
    return Promise.resolve(console.log('onload handleImgOnload'));
  };

  plantImages = images =>
    new Promise((resolve, reject) => {
      console.log('planting Images...', images);
      this.setState((prevState, props) => ({ ...prevState, images, }));
      resolve();
    });

  render() {
    // if (this.state.shouldRender && !this.props.loading) {
    if (this.state.shouldRender) {
      // if (this.props.error) {
      //   console.error(this.props.error);
      //   return null;
      // }
      // const isLoggedIn =
      //   this.props.user &&
      //   (this.props.user.type === UserTypes.paying ||
      //     this.props.user.type === UserTypes.registered);
      return (
        <Fragment>
          <Mutation mutation={UPDATE_USER}>
            {updateUser => (
              <ImageCookies
                images={this.state.images}
                onload={() => {
                  const newUser = new UserFactory(true).build();
                  updateUser({
                    variables: { user: { ...userScheme, ...newUser, }, },
                  });
                  this.state.resolveOnImageLoad();
                }}
              />
            )}
          </Mutation>
          <Query query={GET_USER} ssr={false}>
            {({ data: { user, }, }) =>
              this.props.render({
                isLoggedIn:
                  user &&
                  (user.type === UserTypes.paying ||
                    user.type === UserTypes.registered),
                user,
                plantImages: this.plantImages,
                // handleImgOnload: this.handleImgOnload,
              })
            }
          </Query>
        </Fragment>
      );
    }
    return null;
  }
}

UserDispenser.propTypes = propTypes;
UserDispenser.defaultProps = defaultProps;

// const WrappedUserDispenser = compose(
//   graphql(GET_USER, {
//     props: ({ data, }) => data,
//   })
// )(UserDispenser);
// export default WrappedUserDispenser;
export default UserDispenser;
