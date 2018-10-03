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

  /* ASSET PAGES */

  /* Bond Quote */
  server.get('/bonds/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/asset/bonds', query);
  });

  /* Crypto Quote */
  server.get('/crypto/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/asset/crypto', query);
  });

  /* Exchange Traded Funds Quote */
  server.get('/etf/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/asset/etf', query);
  });

  /* Exchange Quote */
  server.get('/exchange/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/asset/exchange', query);
  });

  /* Indices Quote */
  server.get('/indices/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/asset/indices', query);
  });

  /* Mutual Funds Quote */
  server.get('/mtf/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/asset/mtf', query);
  });

  /* Options Quote */
  server.get('/options/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/asset/options', query);
  });

  /* Stock Quote */
  server.get('/stocks/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/asset/stocks', query);
  });

  /* SECTION PAGES */

  /* Bond Page */
  server.get('/bonds', (req, res) => app.render(req, res, '/section/bonds'));

  /* Crypto Page */
  server.get('/crypto', (req, res) => app.render(req, res, '/section/crypto'));

  /* Exchange Traded Funds Page */
  server.get('/etf', (req, res) => app.render(req, res, '/section/etf'));

  /* Exchange Page */
  server.get('/exchange', (req, res) => app.render(req, res, '/section/exchange'));

  /* Indices Page */
  server.get('/indices', (req, res) => app.render(req, res, '/section/indices'));

  /* Mutual Funds Page */
  server.get('/mtf', (req, res) => app.render(req, res, '/section/mtf'));

  /* Options Page */
  server.get('/options', (req, res) => app.render(req, res, '/section/options'));

  /* Stock Page */
  server.get('/stocks', (req, res) => app.render(req, res, '/section/stocks'));
}
