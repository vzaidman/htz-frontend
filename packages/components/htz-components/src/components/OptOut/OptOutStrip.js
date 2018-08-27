/* global document */
import React, { Fragment, } from 'react';
// import PropTypes from 'prop-types';
import config from 'config';
import { FelaComponent, } from 'react-fela';
import { CookieUtils, } from '@haaretz/htz-user-utils';
import gql from 'graphql-tag';
import Mutation from '../ApolloBoundary/Mutation';
import Query from '../ApolloBoundary/Query';
import IconAlefLogoTransparent from '../Icon/icons/IconAlefLogoTransparent';

import UserDispenser from '../User/UserDispenser';
import Button from '../Button/Button';
// import IconClose from '../Icon/icons/IconClose';

const OPT_OUT = gql`
  mutation SetReactHtzArticleOptIn($id: String!, $value: Boolean!) {
    setReactHtzArticleOptOut(id: $id, value: $value)
  }
`;

const CHECK_OPT_OUT = gql`
  query GetOptOut($id: String!) {
    userInfo(id: $id) {
      reactHtzArticleOptOut
    }
  }
`;

const optOutStripStyle = theme => ({
  position: 'relative',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  backgroundColor: theme.color('primary'),
});

// const closeButtonStyle = {
//   position: 'absolute',
//   color: 'white',
//   left: '2rem',
//   backgroundColor: 'transparent',
// };

class OptOutStrip extends React.PureComponent {
  state = {
    isStripVisible: true,
    // shouldRender: false,
  };

  // componentDidMount() {
  //   if (!this.state.shouldRender) {
  //     this.setState({ shouldRender: true, });
  //   }
  // }

  optOut = (id, optOutMutation) => {
    const domain = config.has('domain') && config.get('domain');
    // CookieUtils.deleteCookie('react');
    CookieUtils.modifyCookie('react', false, '/', `.${domain}`);
    // mutation function MongoDB
    optOutMutation({ variables: { id, value: true, }, })
      .then(success => {
        document.location.reload();
      })
      .catch(err => console.warn('err mutation:', err));
  };

  // closeOptOutStrip = (id, optOutMutation) => {
  //   this.setState({ isStripVisible: false, }, () => {
  //     optOutMutation({ variables: { id, value: false, }, });
  //   });
  // };

  render() {
    const { isStripVisible, } = this.state;
    if (isStripVisible) {
      return (
        <Fragment>
          <UserDispenser
            render={({ user, isLoggedIn, }) =>
              (!isLoggedIn || typeof user.id !== 'string' ? null : (
                <Query query={CHECK_OPT_OUT} variables={{ id: user.id, }}>
                  {({ loading, error, data, }) => {
                    if (loading) return null;
                    if (error) return null;
                    if (
                      data.userInfo.reactHtzArticleOptOut === undefined ||
                      (data.userInfo.reactHtzArticleOptOut !== null &&
                        data.userInfo.reactHtzArticleOptOut !== true)
                    ) {
                      return null;
                    }
                    return (
                      <Mutation mutation={OPT_OUT}>
                        {(optOutMutation, { data, }) => (
                          <FelaComponent
                            style={theme => optOutStripStyle(theme)}
                            render="div"
                          >
                            <IconAlefLogoTransparent
                              size={3}
                              color="white"
                              miscStyles={{
                                marginInlineStart: 'auto',
                                marginInlineEnd: '2rem',
                              }}
                            />
                            <FelaComponent
                              style={theme => ({
                                color: theme.color('neutral', '-10'),
                                marginInlineEnd: '2rem',
                              })}
                              render={({ theme, className, }) => (
                                <span className={className}>
                                  <FelaComponent
                                    style={{
                                      extend: [
                                        theme.mq(
                                          { until: 'm', },
                                          { display: 'none', }
                                        ),
                                      ],
                                    }}
                                    render="span"
                                  >
                                    התקדמנו מהר מדי?{' '}
                                  </FelaComponent>
                                  לחצו כאן כדי לחזור לגרסה הישנה
                                </span>
                              )}
                            />
                            <Button
                              onClick={() =>
                                this.optOut(user.id, optOutMutation)
                              }
                              miscStyles={{
                                marginInlineEnd: 'auto',
                                fontSize: '2rem',
                              }}
                              boxModel={{ hp: 2, vp: 0, }}
                              variant="inverseOpaque"
                            >
                              קחו אותי מכאן
                            </Button>
                            {/* <FelaComponent
                                style={closeButtonStyle}
                                render={({ className, }) => (
                                  <button
                                    className={className}
                                    onClick={() =>
                                      this.closeOptOutStrip(
                                        user.id,
                                        optOutMutation
                                      )
                                    }
                                  >
                                    <IconClose size={2} />
                                  </button>
                                )}
                              /> */}
                          </FelaComponent>
                        )}
                      </Mutation>
                    );
                  }}
                </Query>
              ))
            }
          />
        </Fragment>
      );
    }
    return null;
  }
}

export default OptOutStrip;
