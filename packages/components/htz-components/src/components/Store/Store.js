/* eslint-disable react/prop-types */

import React from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer, } from 'react-apollo';
import Query from '../ApolloBoundary/Query';

function SetStore({ data, }) {
  return (
    <ApolloConsumer>
      {client => {
        client.writeData({ data, });
        return null;
      }}
    </ApolloConsumer>
  );
}

function GetStore({ storeKey, children, }) {
  const GET_KEY = gql`
    query getKey {
      ${storeKey} @client
    }
  `;

  return (
    <Query query={GET_KEY}>
      {({ data, error, loading, }) => children(data[storeKey])}
    </Query>
  );
}

export { SetStore, GetStore, };

export default GetStore;
