/* global window document */
import App, { Container, } from 'next/app';
// import Head from 'next/head';
import React from 'react';
import { ApolloProvider, } from 'react-apollo';
import { LevelProvider, } from './components/AutoLevels/LevelContext';

const createApp = (AdditionalComponent = () => null) => class NextApp extends App {
  componentDidCatch(error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING !!!!:: ', error);
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      console.timeEnd('!!!time:');
      window.setTimeout(() => {
        const hider = document.getElementById('chartbeat-flicker-control-style');
        console.warn('!!!cdm createApp');
        if (hider) {
          hider.parentNode.removeChild(hider);
        }
      }, 1500);
    }
  }

  render() {
    const { Component, initialProps, apolloClient, router, } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <LevelProvider value={1}>
            <Component {...initialProps} url={router} />
            <AdditionalComponent />
          </LevelProvider>
        </ApolloProvider>
      </Container>
    );
  }
};

export default createApp;
