/* eslint-disable react/prop-types */
import React from 'react';
import { Query as ApolloQuery, } from 'react-apollo';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const Query = props => (
  <ErrorBoundary>
    <ApolloQuery {...props}>{props.children}</ApolloQuery>
  </ErrorBoundary>
);

export default Query;
