/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import GoogleAnalyticsInit from './GoogleAnalyticsInit';

const GET_HOST_USER = gql`
  query {
    hostname @client
    user @client {
      type
    }
  }
`;

const propTypes = {
  // Set true to use enhanced ecommerce if needed
  withEC: PropTypes.bool,
};
const defaultProps = {
  withEC: false,
};

function GoogleAnalytics({ withEC, }) {
  return (
    <Query query={GET_HOST_USER}>
      {({ data: { hostname, user: { type, }, }, }) => {
        const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];

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

GoogleAnalytics.propTypes = propTypes;
GoogleAnalytics.defaultProps = defaultProps;

export default GoogleAnalytics;
