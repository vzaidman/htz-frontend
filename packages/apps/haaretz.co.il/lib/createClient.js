import { execute, } from 'graphql';
import { ApolloClient, } from 'react-apollo';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import DataLoader from 'dataloader';
import schema from './schema';

let apolloClient;

// By default, `DataLoader` just caches the results forever, but we should
// eventually expunge them from the cache.
const pageLoader = new DataLoader(keys =>
  Promise.all(
    keys.map(key => {
      // Until we switch to `fetch()` here, use `import()` on the local fixture.
      // These `import()` calls need to be static paths or Next will blow up.
      switch (key) {
        case 'home':
          return import('../fixtures/home.json');
        case 'article':
          return import('../fixtures/article.json');
        default:
          return Promise.reject({ statusCode: 404, });
      }
    })
  )
);

export function createLocalInterface(schema, rootValue, context) {
  return {
    query({ query, variables, operationName, }) {
      let queryContext;
      if (!context) {
        // On the client, we want the context to be fresh for every GraphQL
        // query that occurs. These APIs only work on the client; the server
        // should pass its own context.
        queryContext = {
          url: {
            pathname: Router.pathname,
            query: Router.query,
            asPath: Router.asPath,
          },
          cookies: new Cookies(),
        };
      }
      try {
        return execute(
          schema,
          query,
          rootValue,
          { ...(context || queryContext), pageLoader, },
          variables,
          operationName
        );
      }
      catch (err) {
        return Promise.reject(err);
      }
    },
  };
}

export default function createClient({ initialState, context, } = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections.
  const client =
    apolloClient ||
    new ApolloClient({
      initialState,
      ssrMode: !process.browser,
      dataIdFromObject: ({ __typename, contentId, }) =>
        (contentId ? `${__typename}:${contentId}` : null),
      networkInterface: createLocalInterface(schema, null, context),
      queryDeduplication: true,
    });

  // Only save the client for reuse on the client side.
  if (process.browser) {
    apolloClient = client;
  }

  return client;
}
