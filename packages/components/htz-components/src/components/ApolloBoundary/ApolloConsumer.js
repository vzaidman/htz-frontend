/* eslint-disable react/prop-types */
import React from 'react';
import { ApolloConsumer, } from 'react-apollo';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const ApolloBoundaryConsumer = props => (
  <ErrorBoundary>
    <ApolloConsumer {...props}>{props.children}</ApolloConsumer>
  </ErrorBoundary>
);

export default ApolloBoundaryConsumer;
