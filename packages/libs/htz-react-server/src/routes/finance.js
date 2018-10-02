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
  server.get([ '/', '/index', '/index/:id', ], (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/index', query);
  });

  /* stock Page */
  server.get('/stock/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/stock', query);
  });

  /* bond Page */
  server.get('/bond/:id', (req, res) => {
    const query = {
      id: req.params.id,
    };
    return app.render(req, res, '/bond', query);
  });
}
