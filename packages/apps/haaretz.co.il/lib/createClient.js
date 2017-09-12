import { execute, } from 'graphql';
import { ApolloClient, } from 'react-apollo';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import DataLoader from 'dataloader';
import appSchema from './schema';

// The client instance and loader instances are client-side globals, but created
// fresh for each request on the server.
let apolloClient;
let contextLoaders;

export function createLoaders() {
  // By default, `DataLoader` just caches the results forever, but we should
  // eventually expunge them from the cache.
  const pageLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(path => {
        // Until we switch to `fetch()` here, use `import()` on the local fixture.
        // These `import()` calls need to be static paths or Next will blow up.
        switch (path) {
          case '/': {
            return import('../fixtures/home.json');
          }
          case '/news/world/asia/.premium-1.5527': {
            return import('../fixtures/article.json');
          }
          // Intentionally fall through to default case.
          // eslint-disable-next-line no-fallthrough
          default: {
            return Promise.reject(new Error('Not Found'));
          }
        }
      })
    )
  );
  return { pageLoader, };
}

export function createContext(url, cookies) {
  const loaders = contextLoaders || createLoaders();
  if (process.browser) {
    contextLoaders = loaders;
  }
  return {
    url,
    cookies,
    ...loaders,
  };
}

export function createLocalInterface(schema, rootValue, context) {
  return {
    query({ query, variables, operationName, }) {
      let browserContext;
      // Don't reassign `context`, because it will permanently reassign it in
      // the outer scope and future queries using this same object will reuse
      // it! On the client, we want the context to be fresh for every GraphQL
      // query that occurs. These APIs only work on the client; the server
      // should pass its own context.
      if (!context) {
        browserContext = createContext({
          url: {
            pathname: Router.pathname,
            query: Router.query,
            asPath: Router.asPath,
          },
          cookies: new Cookies(),
        });
      }
      try {
        return execute(
          schema,
          query,
          rootValue,
          context || browserContext,
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
      networkInterface: createLocalInterface(appSchema, null, context),
      queryDeduplication: true,
    });

  // Only save the client for reuse on the client side.
  if (process.browser) {
    apolloClient = client;
  }

  return client;
}
