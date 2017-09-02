const express = require('express');
const next = require('next');
require('isomorphic-fetch');

const DEV = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = next({ dev: DEV, });
const handler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // The optional `.premium-` part was throwing `path-to-regexp` for a loop,
    // so we have a handwritten regex here.
    server.get(
      /^\/((?:[^/]+\/)*(?:[^/]+))\/((?:\.premium-)?\d+\.\d+)$/,
      (req, res) => {
        const query = {
          section: req.params[0],
          contentId: req.params[1],
        };
        return app.render(req, res, '/article', query);
      }
    );

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
