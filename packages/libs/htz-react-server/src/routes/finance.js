import path from 'path';

export default function finance(app, server) {
  // send robots.txt file
  const options = {
    root: path.join(`${process.cwd()}/static`),
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    },
  };
  server.get('/robots.txt', (req, res) =>
    res.status(200).sendFile('robots.txt', options)
  );

  /* Home Page */
  server.get([ '/', '/index', ], (req, res) => app.render(req, res, '/index'));

  /* QUOTE PAGES */

  /* Bond Quote */
  server.get('/bonds/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/quote/bonds', query);
  });

  /* Crypto Quote */
  server.get('/crypto/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/quote/crypto', query);
  });

  /* Exchange Traded Funds Quote */
  server.get('/etf/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/quote/etf', query);
  });

  /* Exchange Quote */
  server.get('/exchange/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/quote/exchange', query);
  });

  /* Indices Quote */
  server.get('/indices/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/quote/indices', query);
  });

  /* Mutual Funds Quote */
  server.get('/mtf/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/quote/mtf', query);
  });

  /* Options Quote */
  server.get('/options/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/quote/options', query);
  });

  /* Stock Quote */
  server.get('/stocks/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/quote/stocks', query);
  });

  /* MADOR PAGES */

  /* Bond Page */
  server.get('/bonds', (req, res) => app.render(req, res, '/mador/bonds'));

  /* Crypto Page */
  server.get('/crypto', (req, res) => app.render(req, res, '/mador/crypto'));

  /* Exchange Traded Funds Page */
  server.get('/etf', (req, res) => app.render(req, res, '/mador/etf'));

  /* Exchange Page */
  server.get('/exchange', (req, res) => app.render(req, res, '/mador/exchange'));

  /* Indices Page */
  server.get('/indices', (req, res) => app.render(req, res, '/mador/indices'));

  /* Mutual Funds Page */
  server.get('/mtf', (req, res) => app.render(req, res, '/mador/mtf'));

  /* Options Page */
  server.get('/options', (req, res) => app.render(req, res, '/mador/options'));

  /* Stock Page */
  server.get('/stocks', (req, res) => app.render(req, res, '/mador/stocks'));
}
