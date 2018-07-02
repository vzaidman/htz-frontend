/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, } from '../ApolloBoundary/ApolloBoundary';
import GoogleAnalyticsInit from './GoogleAnalyticsInit';

const GET_HOST_USER = gql`
  query GetHostAndUserForGoogleAnalytics {
    hostname @client
    user @client {
      type
    }
  }
`;

GoogleAnalytics.propTypes = {
  // enable ecommerce features
  withEC: PropTypes.bool,
};

GoogleAnalytics.defaultProps = {
  withEC: false,
};

function GoogleAnalytics({ withEC, }) {
  return (
    <Query query={GET_HOST_USER}>
      {({ data: { hostname, user: { type, }, }, }) => {
        const host = hostname.match(/^(?:.*?\.)?(.*)/)[1];

        if (!host || !type) {
          return null;
        }

        return (
          <GoogleAnalyticsInit host={host} userType={type} withEC={withEC} />
        );
      }}
    </Query>
  );
}

export default GoogleAnalytics;
