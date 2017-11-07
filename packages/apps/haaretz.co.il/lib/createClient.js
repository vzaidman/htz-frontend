import { ApolloClient, } from 'apollo-client';
import { HttpLink, InMemoryCache, } from 'apollo-client-preset';
import fetch from 'isomorphic-unfetch';
import config from 'config';

const HostIP = config.get('HostIP');
let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  const link = new HttpLink({
    uri: `http://${HostIP}:3000/graphql`, // Server URL (must be absolute)
    opts: {
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    },
  });

  const cache = new InMemoryCache({
    dataIdFromObject: ({ __typename, contentId, }) =>
      (contentId ? `${__typename}:${contentId}` : null),
  }).restore(initialState || {});

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache,
    queryDeduplication: true,
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }
  return apolloClient;
}
