/* eslint-disable react/prop-types */
import React from 'react';
import { ApolloConsumer as Consumer, } from 'react-apollo';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const ApolloConsumer = props => (
  <ErrorBoundary>
    <Consumer {...props}>{props.children}</Consumer>
  </ErrorBoundary>
);

export default ApolloConsumer;
