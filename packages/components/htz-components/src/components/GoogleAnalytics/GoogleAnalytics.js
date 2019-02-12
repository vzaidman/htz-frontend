/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Query from '../ApolloBoundary/Query';
import GoogleAnalyticsInit from './GoogleAnalyticsInit';

const GET_HOST_USER = gql`
  query GetHostAndUserForGoogleAnalytics {
    hostname @client
    user @client {
      type
    }
    googleAnalyticsId @client {
      htzUa
      tmUa
    }
  }
`;

GoogleAnalytics.propTypes = {
  // enable ecommerce features
  withEC: PropTypes.bool,
  // Set true to Track pageView manually
  withPageView: PropTypes.bool,
};

GoogleAnalytics.defaultProps = {
  withEC: false,
  withPageView: false,
};

function GoogleAnalytics({ withEC, withPageView, }) {
  return (
    <Query query={GET_HOST_USER} ssr={false}>
      {({
        data: {
          hostname,
          user: { type, },
          googleAnalyticsId,
        },
      }) => {
        const host = hostname.match(/^(?:.*?\.)?(.*)/)[1];
        // GaHost has defaults with test env id's, and get the production id's from ENV variables
        // see createClient in app-utils for implementation
        const GaHost = googleAnalyticsId[host === 'themarker.com' ? 'tmUa' : 'htzUa'];
        if (!host || !type) {
          return null;
        }

        return (
          <GoogleAnalyticsInit
            GaHost={GaHost}
            host={host}
            userType={type}
            withEC={withEC}
            withPageView={withPageView}
          />
        );
      }}
    </Query>
  );
}

export default GoogleAnalytics;
