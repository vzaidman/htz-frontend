require('dotenv').config();
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const next = require('next');
require('isomorphic-fetch');

const DEV = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = next({ dev: DEV, });
const handler = app.getRequestHandler();

const routePattern = /^\/(?:((?:[^/]+\/)*(?:[^/]+))\/)?(\.premium-)?(\d+\.\d+)?$/;

// Allow this module to be imported without starting the server.
if (require.main === module) {
  app
    .prepare()
    .then(() => {
      const server = express();
      server.use(compression()); // Compress responses.
      server.use(helmet()); // Various security-minded settings.

      // The optional `.premium-` part was throwing `path-to-regexp` for a loop,
      // so we have a handwritten regex here.
      server.get(routePattern, (req, res) => {
        const query = {
          section: req.params[0],
          // This is a URL query parameter, so while we could attempt to make
          // it an `isPremium` flag, it will inevitably be converted into
          // a string by various URL functions, and our code would be dealing
          // with the string values 'true' and 'false', which invites developers
          // to introduce bugs by accidentally treating it as a Boolean.
          // Instead, we make it very clearly a string. These constants would
          // ideally be defined in a central place.
          tier: req.params[1] ? 'premium' : 'free',
          contentId: req.params[2],
        };
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
  routePattern,
};
