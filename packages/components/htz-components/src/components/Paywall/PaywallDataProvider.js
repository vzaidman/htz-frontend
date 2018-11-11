import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Query from '../ApolloBoundary/Query';
import NoSSR from '../NoSSR/NoSSR';

const getPaywallData = gql`
  query getPaywallData {
    paywall {
      slotLocation
      title
      text
      confirm {
        text
        url
      }
    }
  }
`;

const PaywallDataProvider = ({ children, }) => (
  <NoSSR>
    <Query query={getPaywallData} >
      {({ data, loading, error, }) => {
          if (error) {
            console.log('[PaywallDataProvider] error %o', error);
          }
          if (loading || error) {
            return null;
          }
          return loading || error
            ? null
            : children(data.paywall);
        }
      }
    </Query>
  </NoSSR>
);

PaywallDataProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PaywallDataProvider;
