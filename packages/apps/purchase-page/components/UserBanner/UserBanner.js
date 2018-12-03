/* global sessionStorage */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { UserDispenser, Logout, } from '@haaretz/htz-components';
import { createComponent, FelaComponent, } from 'react-fela';
import Router, { withRouter, } from 'next/router';
import pathGenerator from '../OfferPage/Stages/utils/pathGenerator';
import OfferPageDataGetter from '../OfferPage/OfferPageDataGetter';

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
   * should the path generator for logout ignore the query params.
   */
  ignoreQueryParam: PropTypes.bool,
  /**
   * Children nodes
   */
  router: PropTypes.shape().isRequired,
};

const defaultProps = {
  ignoreQueryParam: false,
};

function UserBanner({ router, ignoreQueryParam, }) {
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
                  <OfferPageDataGetter
                    render={({ refetch, }) => (
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
                                    console.log('clearing SessionStorage from user banner logout');
                                    sessionStorage.clear();
                                    const { pathName, asPath, } = pathGenerator(
                                      'stage1',
                                      router,
                                      null,
                                      ignoreQueryParam
                                    );
                                    refetch().then(() => {
                                      Router.push(pathName, asPath);
                                    });
                                  })
                                }
                              >
                                {theme.offerPage.userBanner.switch}
                              </button>
                            )}
                          />
                        )}
                      />
                    )}
                  />
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
UserBanner.defaultProps = defaultProps;

export default withRouter(UserBanner);
