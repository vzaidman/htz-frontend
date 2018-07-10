/* eslint-disable react/prop-types */
import React from 'react';
import {
  Query as ApolloQuery,
  Mutation as ApolloMutation,
  ApolloConsumer as Consumer,
} from 'react-apollo';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export const Query = props => (
  <ErrorBoundary>
    <ApolloQuery {...props}>{props.children}</ApolloQuery>
  </ErrorBoundary>
);

export const Mutation = props => (
  <ErrorBoundary>
    <ApolloMutation {...props}>{props.children}</ApolloMutation>
  </ErrorBoundary>
);

export const ApolloConsumer = props => (
  <ErrorBoundary>
    <Consumer {...props}>{props.children}</Consumer>
  </ErrorBoundary>
);
