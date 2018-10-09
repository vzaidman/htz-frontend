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
      assetId: req.params.id,
      section: 'bonds',
    };
    return app.render(req, res, '/asset/bonds', query);
  });

  /* Crypto Quote */
  server.get('/crypto/:id', (req, res) => {
    const query = {
      assetId: req.params.id,
      section: 'crypto',
    };
    return app.render(req, res, '/asset/exchange', query);
  });

  /* Exchange Traded Funds Quote */
  server.get('/etf/:id', (req, res) => {
    const query = {
      assetId: req.params.id,
      section: 'etf',
    };
    return app.render(req, res, '/asset/etf', query);
  });

  /* Exchange Quote */
  server.get('/exchange/:id', (req, res) => {
    const query = {
      assetId: req.params.id,
      section: 'exchange',
    };
    return app.render(req, res, '/asset/exchange', query);
  });

  /* Indices Quote */
  server.get('/indices/:id', (req, res) => {
    const query = {
      assetId: req.params.id,
      section: 'indices',
    };
    return app.render(req, res, '/asset/indices', query);
  });

  /* Mutual Funds Quote */
  server.get('/mtf/:id', (req, res) => {
    const query = {
      assetId: req.params.id,
      section: 'mtf',
    };
    return app.render(req, res, '/asset/mtf', query);
  });

  /* Options Quote */
  server.get('/options/:id', (req, res) => {
    const query = {
      assetId: req.params.id,
      section: 'options',
    };
    return app.render(req, res, '/asset/options', query);
  });

  /* Stock Quote */
  server.get('/stocks/:id', (req, res) => {
    const query = {
      assetId: req.params.id,
      section: 'stocks',
    };
    return app.render(req, res, '/asset/stocks', query);
  });

  /* SECTION PAGES */

  /* Bond Page */
  server.get('/bonds', (req, res) => {
    const query = {
      section: 'bonds',
    };
    return app.render(req, res, '/section/bonds', query);
  });

  /* Crypto Page */
  server.get('/crypto', (req, res) => {
    const query = {
      section: 'crypto',
    };
    return app.render(req, res, '/section/exchange', query);
  });

  /* Exchange Traded Funds Page */
  server.get('/etf', (req, res) => {
    const query = {
      section: 'etf',
    };
    return app.render(req, res, '/section/etf', query);
  });

  /* Exchange Page */
  server.get('/exchange', (req, res) => {
    const query = {
      section: 'exchange',
    };
    return app.render(req, res, '/section/exchange', query);
  });

  /* Indices Page */
  server.get('/indices', (req, res) => {
    const query = {
      section: 'indices',
    };
    return app.render(req, res, '/section/indices', query);
  });

  /* Mutual Funds Page */
  server.get('/mtf', (req, res) => {
    const query = {
      section: 'mtf',
    };
    return app.render(req, res, '/section/mtf', query);
  });

  /* Options Page */
  server.get('/options', (req, res) => {
    const query = {
      section: 'options',
    };
    return app.render(req, res, '/section/options', query);
  });

  /* Stock Page */
  server.get('/stocks', (req, res) => {
    const query = {
      section: 'stocks',
    };
    return app.render(req, res, '/section/stocks', query);
  });
}
