import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { UserDispenser, Logout, } from '@haaretz/htz-components';
import { createComponent, FelaComponent, } from 'react-fela';
import { Query, } from 'react-apollo';
import Router, { withRouter, } from 'next/router';
import gql from 'graphql-tag';
import { getCampaignFromPath, } from '../OfferPage/OfferPageDataGetter';

const GET_PURCHASE_PAGE_DATA = gql`
  query PageData($path: String!) {
    purchasePage(path: $path)
  }
`;

const userBannerStyle = theme => ({
  backgroundColor: theme.color('userBanner', 'bg'),
  paddingTop: '2rem',
  paddingBottom: '2.5rem',
  textAlign: 'center',
  color: theme.color('neutral', '-10'),
});

const userNameStyle = () => ({
  fontWeight: '700',
  marginEnd: '0.5rem',
});
const UserName = createComponent(userNameStyle, 'span');

const switchUserStyle = {
  textDecoration: 'underline',
  lineSkip: 'ink',
};

const propTypes = {
  /**
   * Children nodes
   */
  router: PropTypes.shape().isRequired,
};

function UserBanner({ router, }) {
  const path = router.asPath || '/promotions-page';
  return (
    <UserDispenser
      render={({ user, isLoggedIn, }) => (
        <Fragment>
          {isLoggedIn && (
            <FelaComponent
              style={userBannerStyle}
              render={({ className, theme, }) => (
                <div className={className}>
                  <UserName>
                    {theme.offerPage.userBanner.hello(user.firstName)}
                  </UserName>
                  <Query
                    query={GET_PURCHASE_PAGE_DATA}
                    variables={{ path: getCampaignFromPath(path), }}
                  >
                    {({ data, loading, }) => (
                      <Fragment>
                        <Logout
                          render={({ logout, }) => (
                            <FelaComponent
                              style={switchUserStyle}
                              render={({ className, }) => (
                                <button
                                  className={className}
                                  type="button"
                                  onClick={() =>
                                    logout().then(() => {
                                      // todo: take care of getting fresh data
                                      // refetch();
                                      Router.push(
                                        '/promotions-page/offers',
                                        router.asPath
                                      );
                                    })
                                  }
                                >
                                  {theme.offerPage.userBanner.switch}
                                </button>
                              )}
                            />
                          )}
                        />
                      </Fragment>
                    )}
                  </Query>
                </div>
              )}
            />
          )}
        </Fragment>
      )}
    />
  );
}

UserBanner.propTypes = propTypes;

export default withRouter(UserBanner);
