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
  server.get('/', (req, res) => {
    if (req.params[0] && !req.params[0].startsWith('/')) {
      req.params[0] = `/${req.params[0]}`;
    }
    else {
      req.params[0] = '/';
    }
    const query = {
      path: req.params[0],
    };
    return app.render(req, res, '/', query);
  });
}
