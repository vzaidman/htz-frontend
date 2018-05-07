import 'dotenv/config';
import path from 'path';
import express from 'express';
import proxy from 'http-proxy-middleware';
import { graphqlExpress, graphiqlExpress, } from 'graphql-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import { schema, } from '@haaretz/app-utils';
import helmet from 'helmet';
import next from 'next';
import cors from 'cors';
import config from 'config';
// Even though this isn't used directly in this package, this file acts as the
// server entry point, so it should make any environment adjustments (like
// adding this `fetch` global) here. That way they'll be available to any
// modules that Next.js imports while routing and rendering pages.
import 'isomorphic-fetch';
import createContext from './createContext';

const DEV = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const hostname = config.get('hostname') || 'www';
const domain = config.get('domain');
const app = next({ dev: DEV, });
const handler = app.getRequestHandler();

const htz = require('./routes/htz');
const tm = require('./routes/tm');
const hdc = require('./routes/hdc');
const purchase = require('./routes/purchase');

const sitesRouting = new Map([
  [ 'htz', htz, ],
  [ 'tm', tm, ],
  [ 'hdc', hdc, ],
  [ 'purchase', purchase, ],
]);

// proxy middleware options
const options = {
  target: `http://${hostname}.${domain}:8080`, // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  // pathRewrite: {
  //   '^/api/old-path': '/api/new-path', // rewrite path
  //   '^/api/remove/path': '/path', // remove base path
  // },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    [`${hostname}.${domain}:${PORT}`]: `http://${hostname}.${domain}:8080`,
  },
};
// create the proxy (without context)
const tomcatProxy = proxy(options);

const hostIp = config.get('hostIp');
app
  .prepare()
  // eslint-disable-next-line consistent-return
  .then(() => {
    const server = express();
    server.use(compression()); // Compress responses.
    server.use(helmet()); // Various security-minded settings.
    // cors allows querying the server from different ports and aliases.
    server.use(cors());
    server.use(
      '/graphql',
      bodyParser.json(),
      graphqlExpress(req =>
        // const purchasePageUrlOptions = req.headers.host.includes('haaretz')
        //   ? { domain: 'haaretz.co.il', subDomain: 'pre', }
        //   : { domain: 'themarker.com', subDomain: 'tmtest', };
        // console.log('req.headers.host', req.headers.host);
        // console.log('purchase url options Domain', purchasePageUrlOptions.domain);
        // console.log('purchase url options subDomain', purchasePageUrlOptions.subDomain);
        ({ schema, context: createContext(req), })
      )
    );
    if (DEV) {
      server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql', }));
    }

    server.get([ /^((\/_next\/).*)+$/, ], (req, res) => {
      const query = {
        path: req.params[0],
      };
      return app.render(req, res, '/', query);
    });

    // Get the current app's routing module.
    sitesRouting.get(process.argv[2])(app, server, DEV);

    // Use static assets from the `static` directory
    server.use(
      '/static',
      express.static(
        path.join(__dirname, `../../../../../packages/apps/${domain}/static`),
        {
          redirect: false,
        }
      )
    );

    server.get('/', handler);

    // Fallback to tomcat via proxy
    server.all('*', tomcatProxy);
    // For Zones
    app.setAssetPrefix('');

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
