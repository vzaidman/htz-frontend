// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import Query from '../ApolloBoundary/Query';
import NoSSR from '../NoSSR/NoSSR';
import type { PaywallData, } from './PaywallDataProvider';

const paywallDebugQuery = gql`
  query getPaywallDebug {
    paywall @client {
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

type Props = {
  children: PaywallData => React.Node,
};

const PaywallDebugProvider = ({ children, }: Props): React.Node => (
  <NoSSR>
    <Query
      query={paywallDebugQuery}
    >
      {({ data, loading, error, }) => {
        if (error) {
          console.log('[PaywallDebugProvider] error %o', error);
        }
        return data && data.paywall
          ? children(data.paywall)
          : null;
      }
      }
    </Query>
  </NoSSR>
);

export default PaywallDebugProvider;
