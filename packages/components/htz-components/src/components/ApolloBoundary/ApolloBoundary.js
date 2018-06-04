/* eslint-disable react/prop-types */
import React from 'react';
import { Query as ApolloQuery, } from 'react-apollo';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export function Query(props) {
  return (
    <ErrorBoundary FallbackComponent={() => <p>Error</p>}>
      <ApolloQuery {...props}>{props.children}</ApolloQuery>
    </ErrorBoundary>
  );
}
