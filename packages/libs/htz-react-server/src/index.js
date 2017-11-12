import 'dotenv/config';
import express from 'express';
import { graphqlExpress, graphiqlExpress, } from 'graphql-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import next from 'next';
import Cookies from 'universal-cookie';
import config from 'config';
// Even though this isn't used directly in this package, this file acts as the
// server entry point, so it should make any environment adjustments (like
// adding this `fetch` global) here. That way they'll be available to any
// modules that Next.js imports while routing and rendering pages.
import 'isomorphic-fetch';
import schema from './schema/schema';
import createContext from './createContext';

const DEV = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = next({ dev: DEV, });
const handler = app.getRequestHandler();

const hostIp = config.get('hostIp');
app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression()); // Compress responses.
    server.use(helmet()); // Various security-minded settings.

    server.use(
      '/graphql',
      bodyParser.json(),
      graphqlExpress(req => {
        const cookies = new Cookies(req.headers.cookie);
        return { schema, context: createContext(cookies), };
      })
    );

    server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql', }));

    server.get(/^(\/(?!_next\/).*)$/, (req, res) => {
      const query = {
        path: req.params[0],
      };
      return app.render(req, res, '/', query);
    });

    // Use static assets from the `static` dir
    // server.use('/static', express.static('/next'));

    server.get('*', handler);

    server.listen(PORT, err => {
      if (err) throw err;

      // eslint-disable-next-line no-console
      console.log(`> Ready on http://${hostIp}:${PORT}`);
    });
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    process.exit(1);
  });
