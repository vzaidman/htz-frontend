import React from 'react';
import Error from 'next/error';
import PropTypes from 'prop-types';
import { ApolloProvider, getDataFromTree, } from 'react-apollo';
import Head from 'next/head';
import createClient from './createClient';

export const pagePropTypes = {
  /* eslint-disable react/forbid-prop-types */
  serverState: PropTypes.object.isRequired,
  serverError: PropTypes.shape({
    statusCode: PropTypes.number,
  }),
  url: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    query: PropTypes.object.isRequired,
  }).isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default Component => {
  const componentName = Component.displayName || Component.name || 'Unknown';

  return class WithData extends React.Component {
    static displayName = `WithData(${componentName})`;
    static propTypes = pagePropTypes;
    static defaultProps = {
      serverError: null,
    };

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
      let serverState = {};
      let serverError;

      // Evaluate the composed component's `getInitialProps()`.
      let initialProps = {};

      if (Component.getInitialProps) {
        initialProps = await Component.getInitialProps(context);
      }

      // Run all GraphQL queries in the component tree, extract the resulting
      // data, and save it as the initial state.
      if (!process.browser) {
        const apolloClient = createClient();
        try {
          const url = {
            query: context.query,
            asPath: context.asPath,
            pathname: context.pathname,
          };
          await getDataFromTree(
            <Component context={context} {...initialProps} url={url} />,
            {
              router: {
                asPath: context.asPath,
                pathname: context.pathname,
                query: context.query,
              },
              client: apolloClient,
            }
          );
        }
        catch (err) {
          // Check if this is indeed a GraphQL error
          if (err.graphQLErrors) {
            // FIXME: There must be a better way to do this.
            // `err` is a wrapper Error created by Apollo that groups all errors
            // thrown while attempting to render. Even the `graphQLErrors` property
            // on this object have been rethrown at various layers of the stack, so
            // if we attached something like a `statusCode` property to an error,
            // it's gone now. For now, just throw a 404 if any error message is
            // 'Not Found', and a 500 otherwise.
            console.error('getDataFromTree() failed!');
            console.error(err);

            const isNotFound = err.graphQLErrors.some(
              ({ message, }) => message === 'Not Found'
            );
            serverError = {
              statusCode: isNotFound ? 404 : 500,
            };
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the `data.error` prop:
            // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
          }
        }
        Head.rewind();

        serverState = {
          apollo: {
            data: apolloClient.cache.extract(),
          },
        };
      }

      return {
        serverState,
        serverError,
        ...initialProps,
      };
    }

    constructor(props) {
      super(props);
      const { serverState, } = this.props;
      this.apolloClient = createClient(serverState.apollo.data);
    }

    render() {
      const { serverError, } = this.props;
      if (serverError) {
        return <Error statusCode={serverError.statusCode} />;
      }
      return (
        <ApolloProvider client={this.apolloClient}>
          <Component {...this.props} />
        </ApolloProvider>
      );
    }
  };
};
