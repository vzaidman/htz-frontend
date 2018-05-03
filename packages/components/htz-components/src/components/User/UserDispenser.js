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
};
const defaultProps = {};

class UserDispenser extends Component {
  state = {
    shouldRender: false,
    images: [],
  };

  componentDidMount() {
    if (!this.state.shouldRender) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ shouldRender: true, });
    }
  }

  handleImgOnload = () =>
    Promise.resolve(console.log('onload handleImgOnload resolved'));

  plantImages = images =>
    new Promise((resolve, reject) => {
      console.log('planting Images...', images);
      this.setState((prevState, props) => ({ ...prevState, images, }));
      this.state.resolveMeWhenImageWasLoaded = resolve;
    });

  render() {
    if (this.state.shouldRender) {
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
                  if (this.state.resolveMeWhenImageWasLoaded) {
                    this.state.resolveMeWhenImageWasLoaded();
                  }
                }}
              />
            )}
          </Mutation>
          <Query query={GET_USER} ssr={false}>
            {({ data: { user, }, }) =>
              this.props.render({
                isLoggedIn: !!(
                  user &&
                  (user.type === UserTypes.paying ||
                    user.type === UserTypes.registered)
                ),
                user,
                plantImages: this.plantImages,
                handleImgOnload: this.handleImgOnload,
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

export default UserDispenser;
