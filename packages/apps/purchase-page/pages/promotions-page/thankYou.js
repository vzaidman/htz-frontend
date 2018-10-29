/* global document */
/* eslint-disable camelcase */
import React, { Fragment, } from 'react';
import { pagePropTypes, } from '@haaretz/app-utils';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import { IconCheck, LayoutContainer, UserDispenser, Query, } from '@haaretz/htz-components';
import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import ThankYouStage from '../../components/OfferPage/Stages/ThankYouStage';
import StageTransition from '../../components/OfferPage/StageTransition/StageTransition';

const GET_FB_PAYLOAD = gql`
  query FB_PAYLOAD(
    $account_linking_token: String!
    $subscription_status: Int!
    $publisher_user_id: ID
    $facebook_user_id: ID
    $subscribe_from_server: Boolean
  ) {
    fbSubscribePayload(
      account_linking_token: $account_linking_token
      subscription_status: $subscription_status
      publisher_user_id: $publisher_user_id
      facebook_user_id: $facebook_user_id
      subscribe_from_server: $subscribe_from_server
    )
  }
`;

// eslint-disable-next-line react/prop-types
const ThankYouElement = ({ product, userMessage, fbFullRedirectUri, }) => (
  <FelaComponent style={{ textAlign: 'center', }}>
    <LayoutContainer bgc="white" miscStyles={{ paddingTop: '6rem', }}>
      <StageTransition
        chosenSubscription={product}
        stage="thankYou"
        displayPhones={false}
        headerElement={
          <Fragment>
            <IconCheck color="positive" size={10} />
            <FelaComponent
              style={theme => ({
                marginTop: '3rem',
                extend: [ theme.type(3), ],
              })}
              render={({
                className,
                theme: {
                  thankYou: { afterPurchase, secondaryHeader, },
                },
              }) => (
                <div className={className}>
                  {product ? (
                    <p>{afterPurchase(product)}</p>
                  ) : userMessage ? (
                    userMessage.map(line => <p>{line}</p>)
                  ) : null}
                </div>
              )}
            />
          </Fragment>
        }
        stageElement={
          <ThankYouStage fbFullRedirectUri={fbFullRedirectUri} />
        }
      />
    </LayoutContainer>
  </FelaComponent>
);

class StageThankYou extends React.Component {
  componentDidMount() {
    // remove 'HtzRusr' cookie or TmRusr
    document.cookie =
      'HtzRusr=; domain=.haaretz.co.il; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'TmRusr=; domain=.themarker.com; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  static getInitialProps({ url, }) {
    return { url, };
  }

  render() {
    let productId = null;
    let fbRedirectUri = null;
    let accountLinkToken = null;

    if (this.props.url.query) {
      const {
        url: {
          query: { product, redirect_uri, account_linking_token, },
        },
      } = this.props;

      productId =
        product === '243' ? 'HTZ' : product === '273' ? 'TM' : product === '274' ? 'BOTH' : null;
      fbRedirectUri = redirect_uri;
      accountLinkToken = account_linking_token;
    }
    return (
      <MainLayout isThankYou product={productId || false}>
        <UserDispenser
          render={({ user, }) => (
            <Query
              query={GET_FB_PAYLOAD}
              skip={!accountLinkToken}
              variables={{
                account_linking_token: accountLinkToken,
                subscription_status: 1,
                publisher_user_id: user.id,
                subscribe_from_server: true,
              }}
            >
              {({ data, loading, error, }) => {
                if (error) return null;
                if (loading) return null;
                const fbFullRedirectUri =
                  accountLinkToken && data.fbSubscribePayload
                    ? `${fbRedirectUri}?account_linking_token=${accountLinkToken}&subscription_payload=${
                        data.fbSubscribePayload
                      }`
                    : null;
                return productId ? (
                  <ThankYouElement product={productId} fbFullRedirectUri={fbFullRedirectUri} />
                ) : (
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
                        <ThankYouElement
                          userMessage={userMessage}
                          fbFullRedirectUri={fbFullRedirectUri}
                        />
                      );
                    }}
                  />
                );
              }}
            </Query>
          )}
        />
      </MainLayout>
    );
  }
}

StageThankYou.propTypes = pagePropTypes;

StageThankYou.defaultProps = {};

export default StageThankYou;
