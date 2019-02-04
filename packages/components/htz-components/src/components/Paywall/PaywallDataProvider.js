// @flow
/* global document */
import * as React from 'react';
import gql from 'graphql-tag';
import { ReadArticleService, CookieUtils, } from '@haaretz/htz-user-utils';
import Query from '../ApolloBoundary/Query';
import NoSSR from '../NoSSR/NoSSR';

const paywallDataQuery = gql`
  query getPaywallData(
    $referrer: String!
    $isSuperContent: Boolean!
    $userType: String!
    $userId: String!
    $useragent: String!
    $articleCount: Int!
  ) {
    paywall(
      referrer: $referrer
      isSuperContent: $isSuperContent
      userType: $userType
      userId: $userId
      useragent: $useragent
      articleCount: $articleCount
      ) {
      slotLocation
      colorScheme
      title
      text
      confirm {
        text
        url
      }
      deny {
        text
        url
      }
    }
  }
`;

const getPaywallArgs = gql`
  query GetPaywallArgs {
      isSuperContent @client
      user @client {
        type
        id
      }
      platform @client
  }
`;

export type PaywallLink = {
  text: string,
  url: string,
};

export type SlotLocation =
  | 'bot-persist'
  | 'top'
  | 'popup'
  | 'mid-page'
  | 'email-activation';

export type PaywallData = {
  slotLocation: ?SlotLocation,
  colorScheme: 'primary' | 'secondary',
  title: string,
  text: string,
  confirm: PaywallLink,
  deny: PaywallLink,
};

function isNewsletterRef(referrer) {
  const query = /[?&]utm_source=newsletter/;
  return query.test(referrer);
}

type Props = {
  children: PaywallData => React.Node,
};

const PaywallDataProvider = ({ children, }: Props): React.Node => (
  <NoSSR>
    <Query query={getPaywallArgs}>
      {({ data, loading, error, }) => {
        if (error) {
          console.log('[PaywallDataProvider] error %o', error);
          return null;
        }
        if (loading) {
          return null;
        }
        console.log('[PaywallDataProvider] userId', data.user.id);
        const tmssoData = CookieUtils.getCookie('tmsso');
        const userProductsData = JSON.parse(CookieUtils.getCookie('userProducts') || 'null');
        console.log('[PaywallDataProvider] userProductsData', userProductsData);
        const isValidEmail = tmssoData && tmssoData.emailValidity === 'valid';
        const isFreeTrial = (userProductsData && userProductsData.products instanceof Array)
          ? userProductsData.products.some(prod => prod.trial)
          : false;
        let userType = (data.user && data.user.type) || 'anonymous';
        if (isValidEmail === false) {
          if (isFreeTrial) {
            userType = 'fswvm';
          }
          else if (userType === 'registered') {
            userType = 'rnv';
          }
        }
        return (
          <Query
            query={paywallDataQuery}
            variables={{
              referrer: isNewsletterRef(document.referrer)
                ? 'newsletter'
                : 'direct',
              isSuperContent: data.isSuperContent || false,
              userType,
              userId: data.user.id,
              useragent: data.platform === 'web'
                ? 'desktop'
                : data.platform,
              articleCount: ReadArticleService.getArticleCount() || 1,
            }}
          >
            {({ data, loading, error, }) => {
              if (error) {
                console.log('[PaywallDataProvider] error %o', error);
              }
              return loading || error
                ? null
                : children(data.paywall);
            }
            }
          </Query>
        );
      }}
    </Query>

  </NoSSR>
);

export default PaywallDataProvider;
