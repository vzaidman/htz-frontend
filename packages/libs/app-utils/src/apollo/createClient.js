import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from 'apollo-client-preset';
import { withClientState, } from 'apollo-link-state';
import fetch from 'isomorphic-unfetch';
import config from 'config';

const hostIp = config.get('hostIp');
let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  const link = new HttpLink({
    uri: `http://${hostIp}:3000/graphql`, // Server URL (must be absolute)
    opts: {
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    },
  });

  const inMemoryCache = new InMemoryCache({
    dataIdFromObject: ({ __typename, contentId, }) =>
      (contentId ? `${__typename}:${contentId}` : null),
  }).restore(initialState || {});

  const stateLink = withClientState({
    cache: inMemoryCache,
    defaults: {
      scroll: {
        velocity: null,
        x: 0,
        y: 0,
        __typename: 'Scroll',
      },
      user: {
        type: null,
        id: null,
        email: null,
        firstName: null,
        lastName: null,
        emailStatus: null,
        token: null,
        anonymousId: null,
        __typename: 'User',
      },
    },
    resolvers: {
      Mutation: {
        updateScroll: (_, { x, y, velocity, }, { cache, }) => {
          const data = {
            scroll: {
              velocity,
              x,
              y,
              __typename: 'Scroll',
            },
          };
          cache.writeData({ data, });
          // resolver needs to return something / null https://github.com/apollographql/apollo-link-state/issues/160
          return null;
        },
        updateUser: (_, { user, }, { cache, }) => {
          // console.log('update User:', user);
          const data = {
            user: {
              ...user,
              __typename: 'User',
            },
          };
          cache.writeData({ data, });
          // resolver needs to return something / null https://github.com/apollographql/apollo-link-state/issues/160
          return null;
        },
      },
    },
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([ stateLink, link, ]),
    cache: inMemoryCache,
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
