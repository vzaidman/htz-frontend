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

// Allow this module to be imported without starting the server.
if (require.main === module) {
  app
    .prepare()
    .then(() => {
      const server = express();
      server.use(compression()); // Compress responses.
      server.use(helmet()); // Various security-minded settings.

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
