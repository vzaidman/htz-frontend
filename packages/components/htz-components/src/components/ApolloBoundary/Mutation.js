/* eslint-disable react/prop-types */
import React from 'react';
import { Mutation as ApolloMutation, } from 'react-apollo';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const Mutation = props => (
  <ErrorBoundary>
    <ApolloMutation {...props}>{props.children}</ApolloMutation>
  </ErrorBoundary>
);

export default Mutation;
