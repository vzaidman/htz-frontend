import React from 'react';
import gql from 'graphql-tag';
import Query from '../ApolloBoundary/Query';
import GoogleAnalytics from './GoogleAnalytics';
import GaDimensions from './GaDimensions';

const GET_USER_TYPE = gql`
  query GetUserId {
    user @client {
      type
    }
  }
`;

function GaHomePage() {
  return (
    <Query query={GET_USER_TYPE}>
      {({ loading, error, data, client, }) => {
        if (loading) return null;
        if (error) return null;
        return (
          <React.Fragment>
            <GoogleAnalytics withEC />
            <GaDimensions
              pageType="HomePage"
              authors="HomePage"
              articlePaywallMode="HomePage"
              userType={data.user.type}
              withPageView
            />
          </React.Fragment>
        );
      }}
    </Query>
  );
}

export default GaHomePage;
