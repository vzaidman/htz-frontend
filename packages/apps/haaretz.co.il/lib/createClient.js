import { ApolloClient, createNetworkInterface, } from 'react-apollo';
import config from 'config';
// The client instance and loader instances are client-side globals, but created
// fresh for each request on the server.
const HostIP = config.get('HostIP');
let apolloClient;


export default function createClient({ initialState, } = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections.
  const client =
    apolloClient ||
    new ApolloClient({
      initialState,
      ssrMode: !process.browser,
      dataIdFromObject: ({ __typename, contentId, }) =>
        (contentId ? `${__typename}:${contentId}` : null),
      networkInterface: createNetworkInterface({
        uri: `http://${HostIP}:3000/graphql`,
        opts: {
          credentials: 'same-origin',
        },
      }).use([
        {
          applyMiddleware(req, next) {
            setTimeout(next, 500);
          },
        },
      ]),
      queryDeduplication: true,
    });

  // Only save the client for reuse on the client side.
  if (process.browser) {
    apolloClient = client;
  }

  return client;
}
