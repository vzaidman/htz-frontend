import React from 'react';
import Error from 'next/error';
import PropTypes from 'prop-types';
import { ApolloProvider, getDataFromTree, gql, } from 'react-apollo';
import Head from 'next/head';
import Cookies from 'universal-cookie';
import createClient from './createClient';

// This set of queries represents what to refetch when the page changes. If
// some data can be reused, then exclude it here.
// TODO: There are two issues here:
// - It is very verbose and repetitive.
// - How do we know that the new page will require all of these fields?
//   Does Apollo fetch all of this even even it is not being observed by any
//   active queries? Find out.
const refetchSlots = [
  'header',
  'topwide',
  'topwidesecondary',
  'aside',
  'main',
  'bottom',
];
const ChangedPageData = gql`
  query ChangedPageData {
    page {
      contentId
      contentName
      inputTemplate
      lineage {
        contentId
        name
        pathSegment
        url
      }
      pageType
      seoData {
        canonicalLink
        metaDescription
        metaImage
        metaKeywords
        metaTitle
        obTitle
        ogImages
        socialDescription
        socialTitle
      }
    }
  }
`;
const ChangedSlotContent = gql`
  query ChangedSlotContent($name: String!) {
    page {
      contentId
      slotContent(slot: $name) {
        contentId
        contentName
        inputTemplate
        properties
      }
    }
  }
`;
const ChangePage = gql`
  mutation ChangePage($pathname: String!, $section: String, $contentId: ID) {
    changePage(pathname: $pathname, section: $section, contentId: $contentId)
  }
`;

const pageRefetchQueries = [ { query: ChangedPageData, }, ].concat(
  refetchSlots.map(name => ({
    query: ChangedSlotContent,
    variables: { name, },
  }))
);

export default Component => {
  const componentName = Component.displayName || Component.name || 'Unknown';

  return class WithData extends React.Component {
    static displayName = `WithData(${componentName})`;

    static propTypes = {
      /* eslint-disable react/forbid-prop-types */
      serverState: PropTypes.object.isRequired,
      serverError: PropTypes.shape({
        statusCode: PropTypes.number
      }),
      url: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        query: PropTypes.object.isRequired,
      }).isRequired,
      /* eslint-enable react/forbid-prop-types */
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
     * @param {string} asPath - String of the actual path (including the query)
     *                          shown in the browser.
     * @param {Object} req - HTTP request object (server only).
     * @param {Object} res - HTTP response object (server only).
     * @param {Object} jsonPageRes - Fetch Response object (client only).
     * @param {Object} err - Error object if any error is encountered during the rendering.
     * @returns {Promise} Promise resolving to an object containing the initial props.
     */
    static async getInitialProps(context) {
      let serverState = {};
      let serverError;

      const url = {
        query: context.query,
        pathname: context.pathname,
        asPath: context.asPath,
      };

      // Evaluate the composed component's `getInitialProps()`.
      let initialProps = { url, };

      if (Component.getInitialProps) {
        initialProps = {
          ...initialProps,
          ...(await Component.getInitialProps(context)),
        };
      }

      // Run all GraphQL queries in the component tree, extract the resulting
      // data, and save it as the initial state.
      if (!process.browser) {
        const cookies = new Cookies(context.req.headers.cookie || '');
        const apolloClient = createClient({
          context: {
            url,
            cookies,
          },
        });
        try {
          await getDataFromTree(
            <ApolloProvider client={apolloClient}>
              <Component {...initialProps} />
            </ApolloProvider>
          );
        }
        catch (err) {
          console.error('getDataFromTree() failed!');
          console.error(err);
          serverError = { statusCode: err && err.statusCode || 500 };
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the `data.error` prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        }
        Head.rewind();

        serverState = {
          apollo: {
            data: apolloClient.getInitialState().data,
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
      this.apolloClient = createClient({ initialState: serverState, });
      // If this component is being constructed, it means that a route change is
      // in progress - unless this is just the initial bootup after being rendered
      // on the server.
      if (!serverState.apollo) {
        this.invalidatePage();
      }
    }

    /**
     * Send a mutation query that will force a refetch of any changed page data.
     */
    invalidatePage() {
      this.apolloClient.mutate({
        mutation: ChangePage,
        variables: {
          ...this.props.url.query,
          pathname: this.props.url.pathname,
        },
        refetchQueries: pageRefetchQueries,
      });
    }

    render() {
      const { serverError } = this.props;
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
