require('dotenv').config();
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const next = require('next');
require('isomorphic-fetch');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, });
const handler = app.getRequestHandler();

// Allow this module to be imported without starting the server.
if (require.main === module) {
  app
    .prepare()
    .then(() => {
      const server = express();
      server.use(compression()); // Compress responses.
      server.use(helmet()); // Various security-minded settings.
      server.use(morgan('dev')); // Request logging.

      // Note that the service worker must be loaded on the same origin from
      // which end users are accessing the application. It can't be loaded
      // from a special 'static assets' origin, for example. That doesn't mean
      // we always need to serve it using `sendFile` from Express, just that the
      // CDN/proxy/load balancer/etc. are properly configured to serve it at a
      // very specific top-level URL.
      server.get('/sw.js', (req, res) => {
        res.sendFile('.next/sw.js', { root: '.', }, err => {
          if (err) {
            console.error('Error sending .next/sw.js');
            console.error(err);
          }
        });
      });

      server.get(/^(\/(?!_next\/).*)$/, (req, res) => {
        const query = { path: req.params[0], };
        return app.render(req, res, '/', query);
      });

      server.get('*', handler);

      server.listen(PORT, err => {
        if (err) throw err;
        // eslint-disable-next-line no-console
        console.log(`> Ready on http://localhost:${PORT}`);
      });
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err.stack);
      process.exit(1);
    });
}

module.exports = {
  app,
};
