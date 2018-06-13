import App, { Container, } from 'next/app';
import React from 'react';
import { ApolloProvider, } from 'react-apollo';

const createApp = () =>
  class MyApp extends App {
    render() {
      const { Component, initialProps, apolloClient, router, } = this.props;
      return (
        <Container>
          <ApolloProvider client={apolloClient}>
            <Component {...initialProps} url={router} />
          </ApolloProvider>
        </Container>
      );
    }
  };

export default createApp;
