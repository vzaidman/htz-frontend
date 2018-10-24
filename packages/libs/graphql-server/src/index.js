import { schema, } from '@haaretz/app-utils';
import { HttpLink, } from 'apollo-link-http';
import fetch from 'node-fetch';
import config from 'config';
import {
  ApolloServer,
  makeRemoteExecutableSchema,
  introspectSchema,
  mergeSchemas,
} from 'apollo-server';
// Even though this isn't used directly in this package, this file acts as the
// server entry point, so it should make any environment adjustments (like
// adding this `fetch` global) here. That way they'll be available to any
// modules that Next.js imports while routing and rendering pages.
import 'isomorphic-fetch';
import createContext from './createContext';
import dataSources from './dataSources';

const port = parseInt(process.env.GRAPHQL_PORT || (config.has('graphQLPort') ? config.get('graphQLPort') : '4000'), 10);
const userInfoUri = config.get('service.userInfoUri');

async function run() {
  const createRemoteSchema = async (uri, fetch) => {
    const fetcher = new HttpLink({ uri, fetch, });
    return makeRemoteExecutableSchema({
      schema: await introspectSchema(fetcher),
      link: fetcher,
    });
  };
  let schemas = [ schema, ];
  let userInfo;
  let fbInstantSubscribe;
  try {
<<<<<<< HEAD
    userInfo = await createRemoteSchema(userInfoUri, fetch);
    schemas.push(userInfo);
=======
    const userInfo = await createRemoteSchema(userInfoUri, fetch);
    const fbInstantSubscribe = await createRemoteSchema('https://ms-apps.haaretz.co.il/ms-fb-instant/subscribe', fetch);
    schemas = mergeSchemas({
      schemas: [ userInfo, schema, fbInstantSubscribe, ],
    });
>>>>>>> feat(login): wIP dockerify
  }
  catch (err) {
    console.log(`ms-apps user info / : ${err}`);
  }
  try {
    fbInstantSubscribe = await createRemoteSchema(
      'https://ms-apps.haaretz.co.il/ms-fb-instant/subscribe',
      fetch
    );
    schemas.push(fbInstantSubscribe);
  }
  catch (err) {
    console.log(`ms-fb-instant error  / : ${err}`);
  }

  schemas = mergeSchemas({
    schemas,
  });

  const server = new ApolloServer({
    schema: schemas,
    introspection: true,
    dataSources,
    context: async req => {
      // this request and the headers on it are passed from create client in app-utils
      const context = await createContext(req.req.headers);
      return context;
    },
    tracing: true,
    cacheControl: true,
  });

  server.listen({ port, }).then(({ url, }) => {
    console.log(`🚀 Server ready at ${url} (local machine) and ${config.get('hostIp')}:${port} `);
  });
}

try {
  run();
}
catch (e) {
  console.error(e, e.message, e.stack);
  process.exit(1);
}
