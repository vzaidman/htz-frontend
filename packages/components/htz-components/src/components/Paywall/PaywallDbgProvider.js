import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Query from '../ApolloBoundary/Query';
import NoSSR from '../NoSSR/NoSSR';

const getPaywallDbgData = gql`
  query getPaywallData {
    paywall @client {
      slotLocation
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

const PaywallDbgProvider = ({ children, }) => (
  <NoSSR>
    <Query query={getPaywallDbgData}>
      {({ data, loading, error, }) => {
        if (error) {
          console.log('[PaywallDataProvider] error %o', error);
        }
        if (error || loading) {
          return null;
        }
        return (data && data.paywall)
          ? children(data.paywall)
          : null;
      }
      }
    </Query>
  </NoSSR>
);

PaywallDbgProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PaywallDbgProvider;
