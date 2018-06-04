import React from 'react';
import { getDataFromTree, } from 'react-apollo';
import Head from 'next/head';
import createClient from './createClient';
import pagePropTypes from './pagePropTypes';

export default Component => {
  const componentName = Component.displayName || Component.name || 'Unknown';

  return class WithData extends React.Component {
    static displayName = `WithData(${componentName})`;
    static propTypes = pagePropTypes;

    /**
     * `getInitialProps` is a Next.js feature that can only be used on pages.
     * For the initial page load, this will execute on the server only. It will
     * then be executed on the client when navigating to a different route via
     * the `Link` component or using the routing APIs.
     *
     * @param {Object} context - Information about the request.
     * @param {string} context.pathname - Path section of URL.
     * @param {Object} context.query - Query string section of URL parsed as an object.
     * @param {string} context.asPath - String of the actual path (including the query)
     *                                  shown in the browser.
     * @param {Object} context.req - HTTP request object (server only).
     * @param {Object} context.res - HTTP response object (server only).
     * @param {Object} context.jsonPageRes - Fetch Response object (client only).
     * @param {Object} context.err - Error object if any error is encountered during the rendering.
     * @returns {Promise} Promise resolving to an object containing the initial props.
     */
    static async getInitialProps(context) {
      let serverState = { apollo: {}, };

      // Evaluate the composed component's `getInitialProps()`.
      let initialProps = {};

      const { req, } = context;

      if (Component.getInitialProps) {
        initialProps = await Component.getInitialProps(context);
      }

      // Run all GraphQL queries in the component tree, extract the resulting
      // data, and save it as the initial state.

      const apolloClient = createClient({}, req);
      try {
        const url = {
          query: context.query,
          asPath: context.asPath,
          pathname: context.pathname,
        };
        await getDataFromTree(
          <Component
            context={context}
            {...initialProps}
            url={url}
            router={{
              asPath: context.asPath,
              pathname: context.pathname,
              query: context.query,
            }}
            apolloState={serverState || {}}
            apolloClient={apolloClient || {}}
          />
        );
      }
      catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        console.error('Error while running `getDataFromTree`', error);
      }

      if (!process.browser) {
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      serverState = {
        apollo: {
          data: apolloClient.cache.extract(),
        },
      };

      return {
        serverState,
        ...initialProps,
      };
    }

    constructor(props) {
      super(props);
      const { serverState, } = this.props;
      this.apolloClient =
        this.apolloClient || createClient(serverState.apollo.data);
    }

    render() {
      return <Component {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
