/* global document, window */
/* eslint-disable camelcase */
import React, { Fragment, } from 'react';
import { pagePropTypes, } from '@haaretz/app-utils';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import ReactGA from 'react-ga';
import { IconSadSmiley, LayoutContainer, UserDispenser, Query, pixelEvent, } from '@haaretz/htz-components';
import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import ThankYouStage from '../../components/OfferPage/Stages/ThankYouStage';
import StageTransition from '../../components/OfferPage/StageTransition/StageTransition';
import ArrayLinesToString from '../../components/ArrayLinesToString/ArrayLinesToString';


const GET_HOSTNAME = gql`
  query {
    hostname @client
  }
`;

const GET_FB_PAYLOAD = gql`
  query FB_PAYLOAD(
    $account_linking_token: String!
    $subscription_status: Int!
    $publisher_user_id: ID
    $facebook_user_id: ID
    $subscribe_from_server: Boolean
    $site: String!
  ) {
    fbSubscribePayload(
      account_linking_token: $account_linking_token
      subscription_status: $subscription_status
      publisher_user_id: $publisher_user_id
      facebook_user_id: $facebook_user_id
      subscribe_from_server: $subscribe_from_server
      site: $site
    )
  }
`;

// eslint-disable-next-line react/prop-types
const ErrorOccurredElement = ({ messageType, fbFullRedirectUri, }) => (
  <FelaComponent style={{ textAlign: 'center', }}>
    <LayoutContainer bgc="white" miscStyles={{ paddingTop: '6rem', }}>
      <StageTransition
        stage="thankYou"
        displayPhones={false}
        headerElement={(
          <Fragment>
            <IconSadSmiley color="negative" size={10} />
            <FelaComponent
              style={theme => ({
                maxWidth: '70rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '3rem',
                extend: [ theme.type(2), ],
              })}
              render={({
                className,
                theme: {
                  generalError: { message: generalError, },
                  userHasDebt: { message: userHasDebt, },
                  userHasProduct: { message: userHasProduct, },
                  paypalError: { message: paypalError, },
                },

              }) => {
                const message = (messageType === 'generalError') ? generalError
                  : (messageType === 'userHasDebt') ? userHasDebt
                    : (messageType === 'paypalError') ? paypalError
                      : (messageType === 'userHasProduct') ? userHasProduct : [ '', ];

                return (
                  <ArrayLinesToString className={className} data={message} />
                );
              }
              }
            />
          </Fragment>
        )}
        stageElement={<ThankYouStage fbFullRedirectUri={fbFullRedirectUri} />}
      />
    </LayoutContainer>
  </FelaComponent>
);


class StageErrorOccurred extends React.Component {
  componentDidMount() {
    pixelEvent('track', 'PageView');
    // remove 'HtzRusr' cookie or TmRusr
    document.cookie = 'HtzRusr=; domain=.haaretz.co.il; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'TmRusr=; domain=.themarker.com; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    if (window && window.sessionStorage.getItem('htz-paypal')) {
      const paypalAddProduct = window.sessionStorage.getItem('htz-add-product');
      ReactGA.ga('ec:addProduct', JSON.parse(paypalAddProduct));
      ReactGA.ga('ec:setAction', 'purchase', {
        id: `${Math.floor(Math.random() * 1000000000000)}`, // (Required) Transaction id (string).
        list: 'Product Stage Results',
        revenue: window.sessionStorage.getItem('htz-revenue'),
        coupon: window.sessionStorage.getItem('htz-paypal'),
      });
      ReactGA.ga('send', 'pageview');
      // set htz-paypal to null to prevent sending the same data if user reload thankYou page.
      window.sessionStorage.removeItem('htz-paypal');
      window.sessionStorage.removeItem('htz-revenue');
      window.sessionStorage.removeItem('htz-add-product');
    }
  }

  static getInitialProps({ url, }) {
    console.log('FROM_GET_INITIAL_PROPS: ', url);
    return { url, };
  }

  render() {
    let fbRedirectUri = null;
    let accountLinkToken = null;
    let queryMsgType = '';


    if (this.props.url.query) {
      const {
        url: {
          query: { redirect_uri, account_linking_token, messageType, },
        },
      } = this.props;

      fbRedirectUri = redirect_uri;
      accountLinkToken = account_linking_token;
      queryMsgType = messageType;
    }
    return (
      <MainLayout>
        <UserDispenser
          render={({ user, }) => (
            <Query query={GET_HOSTNAME}>
              {({ data: { hostname, }, }) => (
                <Query
                  query={GET_FB_PAYLOAD}
                  skip={!accountLinkToken}
                  variables={{
                    account_linking_token: accountLinkToken,
                    subscription_status: 1,
                    publisher_user_id: user.id,
                    subscribe_from_server: true,
                    site: hostname.includes('themarker') ? 'TM' : 'HTZ',
                  }}
                >
                  {({ data, loading, error, }) => {
                    if (error) return null;
                    if (loading) return null;
                    const fbFullRedirectUri = accountLinkToken && data.fbSubscribePayload
                      ? `${fbRedirectUri}?account_linking_token=${accountLinkToken}&subscription_payload=${
                        data.fbSubscribePayload
                      }`
                      : null;
                    return (
                      <OfferPageDataGetter
                        render={({
                          data: {
                            purchasePage: { userMessage, },
                          },
                          loading,
                          error,
                        }) => {
                          if (loading) return <div> Loading...</div>;
                          if (error) return <div> Error...</div>;
                          return (
                            <ErrorOccurredElement
                              messageType={queryMsgType}
                              fbFullRedirectUri={fbFullRedirectUri}
                            />
                          );
                        }}
                      />
                    );
                  }}
                </Query>
              )}
            </Query>
          )}
        />
      </MainLayout>
    );
  }
}

StageErrorOccurred.propTypes = pagePropTypes;

StageErrorOccurred.defaultProps = {};

export default StageErrorOccurred;
